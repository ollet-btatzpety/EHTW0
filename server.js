var fs = require("fs");
var http = require("http");
var express = require("express");
var querystring = require("querystring");
var url_parse = require("url");
var ws = require("ws");
const { Pool } = require('pg');
var crypto = require("crypto");
var msgpack = require("./msgpack.js");

console.log("Starting server...");

var port = process.env.PORT || 8080;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false 
  }
});


var pw_encryption = "sha512WithRSAEncryption";
function encryptHash(pass, salt) {
	if(!salt) {
		salt = crypto.randomBytes(10).toString("hex");
	}
	var hsh = crypto.createHmac(pw_encryption, salt).update(pass).digest("hex");
	var hash = pw_encryption + "$" + salt + "$" + hsh;
	return hash;
}

function checkHash(hash, pass) {
	if(typeof pass !== "string") return false;
	if(typeof hash !== "string") return false;
	hash = hash.split("$");
	if(hash.length !== 3) return false;
	return encryptHash(pass, hash[1]) === hash.join("$");
}



var server;

async function runserver() {
	var app = express();
	server = http.createServer(app);
	app.use(express.static(__dirname + "/client"));
	server.listen(port, function() {
		var addr = server.address();
		console.log("TextWall server is hosted on " + addr.address + ":" + addr.port);
	});
	init_ws();
}

function is_whole_number(x) {
	var isNumber = typeof x === "number" && !isNaN(x) && isFinite(x)
	if(isNumber) {
		return x === Math.trunc(x)
	}
	return false
}


var ipConnLim = {};



var wss;
var objects = {};

function broadcast(data, exclusion) {
	wss.clients.forEach(function(ws) {
		if(ws == exclusion) return;
		send(ws, data);
	});
}
function send(ws, data) {
	try {
		ws.send(data);
	} catch(e) {
		return;
	}
}

function constructChar(color, bold, italic, underline, strike) {
	var format = strike | underline << 1 | italic << 2 | bold << 3;
	var n = format * 31 + color;
	return String.fromCharCode(n + 192);
}

function parseChar(chr) {
	var col = chr % 31;
	var format = Math.floor(chr / 31);
	return {
		color: col,
		bold: (format & 8) == 8,
		italic: (format & 4) == 4,
		underline: (format & 2) == 2,
		strike: (format & 1) == 1
	};
}

function validateUsername(str) {
	if(str.length < 1 || str.length > 64) return false;
	var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-.";
	for(var i = 0; i < str.length; i++) {
		var chr = str[i];
		if(!validChars.includes(chr)) return false;
	}
	return true;
}

function generateToken() {
	var set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+";
	var str = "";
	for(var i = 0; i < 48; i++) {
		str += set[crypto.randomInt(set.length)];
	}
	return str;
}

function san_nbr(x) {
	if(typeof x == "string") x -= 0;
	if(typeof x == "bigint") x = Number(x);
	if(x === true) x = 1;
	if(x == Infinity) x = 9007199254740991;
	if(x == -Infinity) x = -9007199254740991;
	if(typeof x != "number") x = 0;
	if(!x || isNaN(x) || !isFinite(x)) x = 0;
	if(x > 9007199254740991) x = 9007199254740991;
	if(x < -9007199254740991) x = -9007199254740991;
	return Math.trunc(x);
}

var onlineCount = 0;


var chunkCache = {};
var modifiedChunks = {};

async function commitChunks() {
	const client = await pool.connect();
	var clonedModifiedChunks = { ...modifiedChunks };
	try {
		await client.query('BEGIN');
		for(var t in clonedModifiedChunks) {
			var tup = t.split(",");
			var worldId = parseInt(tup[0]);
			var chunkX = parseInt(tup[1]);
			var chunkY = parseInt(tup[2]);
			var data = chunkCache[t];
			var text = data.char.join("");
			var color = "";
			for(var i = 0; i < data.color.length; i++) {
				color += String.fromCharCode(data.color[i] + 192);
			}
			var prot = data.protected;
			if(data.exists) {
				await client.query("UPDATE chunks SET text=$1, colorFmt=$2, protected=$3 WHERE world_id=$4 AND x=$5 AND y=$6", [text, color, Number(prot), worldId, chunkX, chunkY]);
			} else {
				data.exists = true;
				//console.log(tup, worldId, chunkX, chunkY, text, color, prot);
				await client.query("INSERT INTO chunks (world_id, x, y, text, colorFmt, protected) VALUES($1, $2, $3, $4, $5, $6)", [worldId, chunkX, chunkY, text, color, Number(prot)]);
			}
			delete modifiedChunks[t];
		}
		await client.query("COMMIT");
	} catch (err) {
		await client.query("ROLLBACK");
	} finally {
		client.release();
	}
}

setInterval(function() {
	commitChunks();
}, 1000 * 10);

setInterval(function() {
	flushCache();
}, 1000 * 60 * 10);

function flushCache() {
	for(var t in chunkCache) {
		if(modifiedChunks[t]) continue;
		delete chunkCache[t];
	}
}

async function getChunk(worldId, x, y, canCreate) {
	var tuple = worldId + "," + x + "," + y;
	if(chunkCache[tuple]) {
		return chunkCache[tuple];
	} else {
		var data = (await pool.query("SELECT * FROM chunks WHERE world_id=$1 AND x=$2 AND y=$3", [worldId, x, y])).rows[0];
		if(data) {
			var colorRaw = data.colorfmt;
			var colorArray = [];
			for(var i = 0; i < colorRaw.length; i++) {
				colorArray.push(colorRaw[i].charCodeAt() - 192);
			}
			var cdata = {
				char: [...data.text],
				color: colorArray,
				protected: Boolean(data.protected),
				exists: true
			};
			chunkCache[tuple] = cdata;
			return cdata;
		} else {
			var cdata = {
				char: new Array(10*20).fill(" "),
				color: new Array(10*20).fill(0),
				protected: false
			};
			if(canCreate) {
				chunkCache[tuple] = cdata;
			}
			return cdata;
		}
	}
}
async function writeChunk(worldId, x, y, idx, char, colorFmt, isMember) {
	var tuple = worldId + "," + x + "," + y;
	var chunk = await getChunk(worldId, x, y, true);
	var prot = chunk.protected;
	if(prot && !isMember) return false;
	chunk.char[idx] = String.fromCodePoint(char);
	chunk.color[idx] = colorFmt;
	modifiedChunks[tuple] = true;
	return true;
}
async function toggleProtection(worldId, x, y) {
	var tuple = worldId + "," + x + "," + y;
	var chunk = await getChunk(worldId, x, y, true);
	chunk.protected = !chunk.protected;
	modifiedChunks[tuple] = true;
	return chunk.protected;
}
async function clearChunk(worldId, x, y) {
	var tuple = worldId + "," + x + "," + y;
	var chunk = await getChunk(worldId, x, y, false);
	if(!chunk.exists) return;
	for(var i = 0; i < chunk.char.length; i++) {
		chunk.char[i] = " ";
		chunk.color[i] = 0;
	}
	modifiedChunks[tuple] = true;
}

async function sendOwnerStuff(ws, connectedWorldId, connectedWorldNamespace) {
	var memberList = (await pool.query("SELECT * FROM members WHERE world_id=$1", [connectedWorldId])).rows;
	var normMemberList = [];
	for(var i = 0; i < memberList.length; i++) {
		normMemberList.push(memberList[i].username);
	}
	send(ws, msgpack.encode({
		ml: normMemberList
	}));
	await sendWorldList(ws, connectedWorldId, connectedWorldNamespace);
}

async function sendWorldList(ws, connectedWorldId, connectedWorldNamespace, noPrivate) {
	var worldList = (await pool.query("SELECT * FROM worlds WHERE LOWER(namespace) = LOWER($1)", [connectedWorldNamespace])).rows;
	var normWorldList = [];
	for(var i = 0; i < worldList.length; i++) {
		var world = worldList[i];
		var wname = world.name;
		var attr = world.attributes;
		if(noPrivate && attr.private) continue;
		normWorldList.push(wname, Boolean(attr.private));
	}
	
	send(ws, msgpack.encode({
		wl: normWorldList
	}));
}

async function editWorldAttr(worldId, prop, value) {
	var world = (await pool.query("SELECT attributes FROM worlds WHERE id=$1", [worldId])).rows[0];
	if(!world) return;
	var attr = world.attributes;
	attr[prop] = value;
	await pool.query("UPDATE worlds SET attributes=$1 WHERE id=$2", [attr, worldId]);
	
	wss.clients.forEach(function(sock) {
		if(!sock || !sock.sdata) return;
		if(sock.sdata.connectedWorldId == worldId) {
			sock.sdata.worldAttr[prop] = Boolean(value);
		}
	});
}
function sendWorldAttrs(ws, world) {
	var attr = world.attributes;
	send(ws, msgpack.encode({ ro: Boolean(attr.readonly) }));
	send(ws, msgpack.encode({ priv: Boolean(attr.private) }));
	send(ws, msgpack.encode({ ch: Boolean(attr.hideCursors) }));
	send(ws, msgpack.encode({ dc: Boolean(attr.disableChat) }));
	send(ws, msgpack.encode({ dcl: Boolean(attr.disableColor) }));
	send(ws, msgpack.encode({ db: Boolean(attr.disableBraille) }));
}

async function evictClient(ws) {
	worldBroadcast(ws.sdata.connectedWorldId, msgpack.encode({
		rc: ws.sdata.clientId
	}), ws);
				
	ws.sdata.connectedWorldNamespace = "textwall";
	ws.sdata.connectedWorldName = "main";
	ws.sdata.connectedWorldId = 1;
	ws.sdata.isMember = false;
	send(ws, msgpack.encode({
		j: ["textwall", "main"]
	}));
	send(ws, msgpack.encode({
		perms: 0
	}));
	send(ws, msgpack.encode({
		b: [-1000000000000, 1000000000000, -1000000000000, 1000000000000]
	}));
	ws.sdata.isConnected = true;
	var worldInfo = (await pool.query("SELECT * FROM worlds WHERE id=1")).rows[0];
	sendWorldAttrs(ws, worldInfo);
	dumpCursors(ws);
}

function worldBroadcast(connectedWorldId, data, excludeWs) {
	wss.clients.forEach(function(sock) {
		if(!sock || !sock.sdata) return;
		if(sock == excludeWs) return;
		if(sock.sdata.connectedWorldId == connectedWorldId) {
			send(sock, data);
		}
	});
}

function dumpCursors(ws) {
	wss.clients.forEach(function(sock) {
		if(!sock || !sock.sdata) return;
		if(sock == ws) return;
		if(sock.sdata.connectedWorldId == ws.sdata.connectedWorldId) {
			send(ws, msgpack.encode({
				cu: {
					id: sock.sdata.clientId,
					l: [sock.sdata.cursorX, sock.sdata.cursorY],
					c: sock.sdata.cursorColor,
					n: sock.sdata.cursorAnon ? "" : (sock.sdata.isAuthenticated ? sock.sdata.authUser : "")
				}
			}));
		}
	});
}

function init_ws() {
	wss = new ws.Server({ server });
	wss.on("connection", function(ws, req) {
		var ipAddr = ws._socket.remoteAddress;
		if(ipAddr == "127.0.0.1") {
			ipAddr = req.headers["x-real-ip"];
			if(!ipAddr) ipAddr = Math.random().toString();
		}
		
		if(!ipConnLim[ipAddr]) {
			ipConnLim[ipAddr] = [0, 0, 0]; // connections, blocks placed in current second period, second period
		}
		var connObj = ipConnLim[ipAddr];
		
		if(connObj[0] >= 50) {
			ws.close();
			return;
		}
		
		connObj[0]++;
		
		
		onlineCount++;
		
		var sdata = {
			isConnected: false,
			isAuthenticated: false,
			isMember: false,
			authUser: "",
			authUserId: 0,
			authToken: "",
			connectedWorldNamespace: "",
			connectedWorldName: "",
			connectedWorldId: 0,
			clientId: Math.floor(Math.random() * 1000000000).toString(),
			cursorX: 0,
			cursorY: 0,
			cursorColor: 0,
			cursorAnon: false,
			worldAttr: {}
		};
		ws.sdata = sdata;
		
		ws.on("message", async function(message, binary) {
			
			if(!binary) return;
			
			
			var per = Math.floor(Date.now() / 1000);
			if(connObj[2] == per) {
				if(connObj[1] >= 100) return;
			} else {
				connObj[1] = 0;
			}
			connObj[2] = per;
			connObj[1]++;
			
			try {
				var data = msgpack.decode(message);
			} catch {}
			
			if(typeof data != "object") return;
			if(Array.isArray(data)) return;
			
			if("j" in data) {
				var world = data.j;
				
				if(!Array.isArray(world)) return;
				
				var namespace = world[0];
				var pathname = world[1];
				if(typeof namespace != "string") return;
				if(typeof pathname != "string") return;
				if(namespace.length > 64) return;
				if(pathname.length > 64) return;
				
				sdata.isMember = false;
				sdata.isConnected = false;
				
				send(ws, msgpack.encode({
					online: onlineCount
				}));
				broadcast(msgpack.encode({
					online: onlineCount
				}), ws);
				
				
				if(sdata.connectedWorldId) {
					worldBroadcast(sdata.connectedWorldId, msgpack.encode({
						rc: sdata.clientId
					}), ws);
				}
				
				
				var world = (await pool.query("SELECT * FROM worlds WHERE LOWER(namespace) = LOWER($1) AND LOWER(name) = LOWER($2);", [namespace, pathname])).rows[0];
				console.log(world);
				if(!world) {
					sdata.worldAttr = {};
					if(sdata.isAuthenticated && namespace.toLowerCase() == sdata.authUser.toLowerCase()) {
						var insertInfo = await pool.query("INSERT INTO worlds (namespace, name, attributes) VALUES($1, $2, $3) RETURNING id", [sdata.authUser, pathname, {
							readonly: false,
							private: false,
							hideCursors: false,
							disableChat: false,
							disableColor: false,
							disableBraille: false
						}]).rows[0].id;
						var worldInfo = (await pool.query("SELECT * FROM worlds WHERE id=$1", [insertInfo])).rows[0];
						sdata.connectedWorldNamespace = worldInfo.namespace;
						sdata.connectedWorldName = worldInfo.name;
						sdata.connectedWorldId = worldInfo.id;
						send(ws, msgpack.encode({
							j: [sdata.connectedWorldNamespace, sdata.connectedWorldName]
						}));
						send(ws, msgpack.encode({
							perms: 2
						}));
						sdata.isMember = true;
						sdata.isConnected = true;
						await sendOwnerStuff(ws, sdata.connectedWorldId, sdata.connectedWorldNamespace);
						send(ws, msgpack.encode({
							b: [-1000000000000, 1000000000000, -1000000000000, 1000000000000]
						}));
						sendWorldAttrs(ws, worldInfo);
						dumpCursors(ws);
						return;
					} else {
						await evictClient(ws);
						return;
					}
				}
				
				var attr = world.attributes;
				sdata.worldAttr = attr;
				
				sdata.connectedWorldNamespace = world.namespace;
				sdata.connectedWorldName = world.name;
				sdata.connectedWorldId = world.id;
				
				send(ws, msgpack.encode({
					j: [sdata.connectedWorldNamespace, sdata.connectedWorldName]
				}));
				
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(isOwner) {
					send(ws, msgpack.encode({
						perms: 2
					}));
					sdata.isMember = true;
					
					await sendOwnerStuff(ws, sdata.connectedWorldId, sdata.connectedWorldNamespace);
				} else if(sdata.isAuthenticated) {
					if(attr.private) {
						await evictClient(ws);
						return;
					}
					var memberCheck = (await pool.query("SELECT * FROM members WHERE LOWER(username)=LOWER($1) AND world_id=$2", [sdata.authUser, sdata.connectedWorldId])).rows[0];
					if(memberCheck) {
						send(ws, msgpack.encode({
							perms: 1
						}));
						sdata.isMember = true;
					} else {
						send(ws, msgpack.encode({
							perms: 0
						}));
					}
					await sendWorldList(ws, sdata.connectedWorldId, sdata.connectedWorldNamespace, true);
				} else {
					if(attr.private) {
						await evictClient(ws);
						return;
					}
					send(ws, msgpack.encode({
						perms: 0
					}));
					await sendWorldList(ws, sdata.connectedWorldId, sdata.connectedWorldNamespace, true);
				}
				
				sendWorldAttrs(ws, world);
				
				send(ws, msgpack.encode({
					b: [-1000000000000, 1000000000000, -1000000000000, 1000000000000]
				}));
				dumpCursors(ws);
				sdata.isConnected = true;
			} else if("r" in data) {
				if(!sdata.isConnected) return;
				var regions = data.r;
				
				if(sdata.worldAttr.private && !sdata.isMember) return;
				
				if(!Array.isArray(regions)) return;
				
				var len = Math.floor(regions.length / 2);
				var chunks = [];
				if(len > 10 * 10 * 3) return;
				for(var i = 0; i < len; i++) {
					var x = san_nbr(regions[i * 2]);
					var y = san_nbr(regions[i * 2 + 1]);
					var cd = await getChunk(sdata.connectedWorldId, x, y);
					var char = cd.char;
					var color = cd.color;
					var color2 = "";
					for(var z = 0; z < color.length; z++) {
						color2 += String.fromCharCode(color[z] + 192);
					}
					var prot = cd.protected;
					//console.log(char, color, prot);
					chunks.push(x, y, char, color2, prot);
				}
				send(ws, msgpack.encode({
					chunks: chunks
				}));
			} else if("ce" in data) { // cursor
				if(!sdata.isConnected) return;
				
				if(sdata.worldAttr.private && !sdata.isMember) return;
				
				if("l" in data.ce) {
					var x = data.ce.l[0];
					var y = data.ce.l[1];
					sdata.cursorX = san_nbr(x);
					sdata.cursorY = san_nbr(y);
				}
				if("c" in data.ce) {
					var col = san_nbr(data.ce.c);
					if(col >= 0 && col <= 31) {
						sdata.cursorColor = col;
					}
				}
				if("n" in data.ce) {
					sdata.cursorAnon = Boolean(data.ce.n);
				}
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					cu: {
						id: sdata.clientId,
						l: [sdata.cursorX, sdata.cursorY],
						c: sdata.cursorColor,
						n: sdata.cursorAnon ? "" : (sdata.isAuthenticated ? sdata.authUser : "")
					}
				}), ws);
			} else if("e" in data) { // write edit
				if(!sdata.isConnected) return;
				var edits = data.e;
				
				if(!Array.isArray(edits)) return;
				
				if(sdata.worldAttr.readonly && !sdata.isMember) return;
				if(sdata.worldAttr.private && !sdata.isMember) return;
				
				var resp = [];
				var ecount = 0;
				for(var i = 0; i < edits.length; i++) {
					var chunk = edits[i];
					var x = chunk[0];
					var y = chunk[1];
					
					if(typeof x != "number" || typeof y != "number") return;
					if(!Number.isInteger(x) || !Number.isInteger(y)) return;
					
					var obj = [];
					obj.push(x, y);
					resp.push(obj);
					for(var j = 0; j < Math.floor((chunk.length - 2) / 3); j++) {
						if(ecount > 1000) return;
						var chr = chunk[j * 3 + 2];
						var idx = chunk[j * 3 + 3];
						var colfmt = chunk[j * 3 + 4];
						
						if(!Number.isInteger(chr)) return;
						if(!Number.isInteger(idx)) return;
						if(!Number.isInteger(colfmt)) return;
						if(!(chr >= 1 && chr <= 1114111)) return;
						if(!(idx >= 0 && idx <= (20*10)-1)) return;
						if(!(colfmt >= 0 && colfmt <= 960)) return;
						
						var stat = await writeChunk(sdata.connectedWorldId, x, y, idx, chr, colfmt, sdata.isMember);
						if(stat) {
							obj.push(chr, idx, colfmt);
							ecount++;
						}
					}
				}
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					e: {
						e: resp
					}
				}));
			} else if("msg" in data) {
				var message = data.msg;
				
				if(typeof message != "string") return;
				if(message.length > 256) return;
				
				var nick = sdata.clientId;
				if(sdata.isAuthenticated) {
					nick = sdata.authUser;
				}
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					msg: [nick, sdata.cursorColor, message, sdata.isAuthenticated]
				}));
			} else if("register" in data) {
				if(sdata.isAuthenticated) return;
				var cred = data.register;
				
				if(!Array.isArray(cred)) return;
				
				var user = cred[0];
				var pass = cred[1];
				
				if(typeof user != "string") return;
				if(typeof pass != "string") return;
				if(user.length > 64) return;
				if(pass.length > 64) return;
				
				
				var isValid = validateUsername(user);
				if(!isValid) {
					send(ws, msgpack.encode({
						alert: "Bad username - it must be 1-64 chars and have the following chars: A-Z a-z 0-9 - _ ."
					}));
					return;
				}
				
				var userObj = (await pool.query("SELECT * FROM users WHERE LOWER(username)=LOWER($1)", [user])).rows[0];
				if(userObj) {
					send(ws, msgpack.encode({
						nametaken: true
					}));
				} else {
					var rowid = (await pool.query("INSERT INTO users (username, password, date_joined) VALUES($1, $2, $3) RETURNING id", [user, encryptHash(pass), Date.now()])).rows[0].id;
					sdata.isAuthenticated = true;
					sdata.authUser = user;
					//sdata.authUserId = (await pool.query("SELECT id FROM users WHERE rowid=$1", [rowid])).rows[0].id;
					sdata.authUserId = rowid;
					var newToken = generateToken();
					await pool.query("INSERT INTO tokens (token, username, user_id) VALUES($1, $2, $3)", [newToken, sdata.authUser, sdata.authUserId]);
					send(ws, msgpack.encode({
						token: [user, newToken]
					}));
					sdata.authToken = newToken;
					
					await pool.query("INSERT INTO worlds (namespace, name, attributes) VALUES($1, $2, $3)", [sdata.authUser, "main", {
						readonly: false,
						private: false,
						hideCursors: false,
						disableChat: false,
						disableColor: false,
						disableBraille: false
					}]);
				}
				
				
				
			} else if("login" in data) {
				var cred = data.login;
				
				if(!Array.isArray(cred)) return;
				
				var user = cred[0];
				var pass = cred[1];
				
				if(typeof user != "string") return;
				if(typeof pass != "string") return;
				if(user.length > 64) return;
				if(pass.length > 64) return;

				var userObj = (await pool.query("SELECT * FROM users WHERE LOWER(username)=LOWER($1)")).get(user);
				if(userObj) {
					var db_user = userObj.username;
					var db_id = userObj.id;
					var db_pass = userObj.password;
					var isValid = checkHash(db_pass, pass);
					if(isValid) {
						sdata.isAuthenticated = true;
						sdata.authUser = db_user;
						sdata.authUserId = db_id;
						var newToken = generateToken();
						await pool.query("INSERT INTO tokens (token, username, user_id) VALUES($1, $2, $3)", [newToken, sdata.authUser, sdata.authUserId]);
						send(ws, msgpack.encode({
							token: [sdata.authUser, newToken]
						}));
						sdata.authToken = newToken;

						if(sdata.connectedWorldId) {
							var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
							if(isOwner) {
								send(ws, msgpack.encode({
									perms: 2
								}));
								sdata.isMember = true;
								await sendOwnerStuff(ws, sdata.connectedWorldId, sdata.connectedWorldNamespace);
							} else {
								/*var world = await pool.query("SELECT * FROM worlds WHERE id=?").get(sdata.connectedWorldId);
								var attr = JSON.parse(world.attributes);*/
								if(sdata.worldAttr.private) {
									await evictClient(ws);
									return;
								}
								var memberCheck = (await pool.query("SELECT * FROM members WHERE LOWER(username)=LOWER($1) AND world_id=$2", [sdata.authUser, sdata.connectedWorldId])).rows[0];
								if(memberCheck) {
									send(ws, msgpack.encode({
										perms: 1
									}));
									sdata.isMember = true;
								}
							}
						}
						
					} else {
						send(ws, msgpack.encode({
							loginfail: true
						}));
					}
				} else {
					send(ws, msgpack.encode({
						loginfail: true
					}));
				}
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					cu: {
						id: sdata.clientId,
						l: [sdata.cursorX, sdata.cursorY],
						c: sdata.cursorColor,
						n: sdata.cursorAnon ? "" : (sdata.isAuthenticated ? sdata.authUser : "")
					}
				}), ws);
			} else if("token" in data) {
				var token = data.token;
				
				if(!Array.isArray(token)) return;
				
				var tokenUser = token[0];
				var tokenToken = token[1];
				
				if(typeof tokenUser != "string") return;
				if(typeof tokenToken != "string") return;
				if(tokenUser.length > 64) return;
				if(tokenToken.length > 128) return;
				
				
				var tokenData = (await pool.query("SELECT * FROM tokens WHERE token=$1", [tokenToken])).rows[0];
				if(tokenData) {
					var userId = tokenData.user_id;
					send(ws, msgpack.encode({
						token: [tokenData.username, tokenData.token]
					}));
					sdata.isAuthenticated = true;
					sdata.authUser = tokenData.username;
					sdata.authUserId = userId;
					sdata.authToken = tokenData.token;
				} else {
					send(ws, msgpack.encode({
						tokenfail: true
					}));
				}
			} else if("logout" in data) {
				if(sdata.authToken) {
					await pool.query("DELETE FROM tokens WHERE token=$1", [sdata.authToken]);
				}
				send(ws, msgpack.encode({
					perms: 0
				}));
				sdata.isAuthenticated = false;
				sdata.authUser = "";
				sdata.authUserId = 0;
				sdata.isMember = false;
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					cu: {
						id: sdata.clientId,
						l: [sdata.cursorX, sdata.cursorY],
						c: sdata.cursorColor,
						n: sdata.cursorAnon ? "" : (sdata.isAuthenticated ? sdata.authUser : "")
					}
				}), ws);
			} else if("addmem" in data) {
				var member = data.addmem;
				
				if(typeof member != "string") return;
				if(member.length > 64) return;
				
				if(sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase()) {
					var exists = (await pool.query("SELECT * FROM members WHERE username=LOWER($1)", [member])).rows[0];
					if(!exists) {
						await pool.query("INSERT INTO members (world_id, username) VALUES($1, $2)", [sdata.connectedWorldId, member]);
						send(ws, msgpack.encode({
							addmem: member
						}));
					}
				}
			} else if("rmmem" in data) {
				var member = data.rmmem;
				
				if(typeof member != "string") return;
				if(member.length > 64) return;
				
				if(sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase()) {
					await pool.query("DELETE FROM members WHERE world_id=$1 AND LOWER(username)=LOWER($2)", [sdata.connectedWorldId, member]);
				}
			} else if("deleteaccount" in data) {
				var pass = data.deleteaccount;
				
				if(typeof pass != "string") return;
				if(pass.length > 64) return;
				
				var tokenData = (await pool.query("SELECT * FROM tokens WHERE token=$1", [sdata.authToken])).rows[0];
				if(tokenData) {
					var user_id = tokenData.user_id;
					var account = (await pool.query("SELECT * FROM users WHERE id=$1", [user_id])).rows[0];
					if(account) {
						var db_pass = account.password;
						var isValid = checkHash(db_pass, pass);
						if(isValid) {
							await pool.query("DELETE FROM users WHERE id=$1", [account.id]);
							await pool.query("UPDATE worlds SET namespace=$1 WHERE namespace=$2", ["del-" + Math.random() + "-" + account.username, account.username]);
							await pool.query("DELETE FROM tokens WHERE token=$1", [sdata.authToken]);
							send(ws, msgpack.encode({
								accountdeleted: true
							}));
							sdata.authToken = "";
							sdata.isAuthenticated = false;
							sdata.authUser = "";
							sdata.authUserId = 0;
							sdata.isMember = false;
							sdata.connectedWorldNamespace = "textwall";
							sdata.connectedWorldName = "main";
							sdata.connectedWorldId = 1;
							send(ws, msgpack.encode({
								perms: 0
							}));
						} else {
							send(ws, msgpack.encode({
								wrongpass: true
							}));
						}
					}
				}
			} else if("ro" in data) { // readonly
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "readonly", Boolean(data.ro));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					ro: Boolean(data.ro)
				}));
			} else if("priv" in data) { // private
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "private", Boolean(data.priv));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					priv: Boolean(data.priv)
				}));
			} else if("ch" in data) { // hide cursors
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "hideCursors", Boolean(data.ch));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					ch: Boolean(data.ch)
				}));
			} else if("dc" in data) { // disable chat
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "disableChat", Boolean(data.dc));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					dc: Boolean(data.dc)
				}));
			} else if("dcl" in data) { // disable color
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "disableColor", Boolean(data.dcl));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					dcl: Boolean(data.dcl)
				}));
			} else if("db" in data) { // disable braille
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await editWorldAttr(sdata.connectedWorldId, "disableBraille", Boolean(data.db));
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					db: Boolean(data.db)
				}));
			} else if("p" in data) { // protect
				var pos = data.p;
				if(typeof pos != "string") return;
				pos = pos.split(",");
				if(pos.length != 2) return;
				x = san_nbr(pos[0]);
				y = san_nbr(pos[1]);
				if(x % 20 != 0) return;
				if(y % 10 != 0) return;
				x /= 20;
				y /= 10;
				if(!sdata.isMember) {
					return;
				}
				var prot = await toggleProtection(sdata.connectedWorldId, x, y);
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					p: [(x * 20) + "," + (y * 10), Boolean(prot)]
				}));
			} else if("dw" in data) {
				var isOwner = sdata.isAuthenticated && sdata.connectedWorldNamespace && sdata.connectedWorldNamespace.toLowerCase() == sdata.authUser.toLowerCase();
				if(!isOwner) return;
				await pool.query("UPDATE worlds SET namespace=$1 WHERE id=$2", ["del-" + Math.random(), sdata.connectedWorldId]);
				var kWorld = sdata.connectedWorldId;
				wss.clients.forEach(async function(sock) {
					if(!sock || !sock.sdata) return;
					if(sock.sdata.connectedWorldId == kWorld) {
						await evictClient(sock);
					}
				});
			} else if("namechange" in data) {
				var set = data.namechange;
				
				if(!Array.isArray(set)) return;
				
				var newUser = set[0];
				var pass = set[1];
				
				if(typeof newUser != "string") return;
				if(typeof pass != "string") return;
				if(newUser.length > 64) return;
				if(pass.length > 128) return;
				
				
				var tokenData = (await pool.query("SELECT * FROM tokens WHERE token=$1", [sdata.authToken])).rows[0];
				if(tokenData) {
					var user_id = tokenData.user_id;
					var account = (await pool.query("SELECT * FROM users WHERE id=$1", [user_id])).rows[0];
					if(account) {
						var db_pass = account.password;
						var isValid = checkHash(db_pass, pass);
						if(isValid) {
							var userCheck = (await pool.query("SELECT * FROM users WHERE LOWER(username)=LOWER($1)", [newUser])).rows[0];
							if(userCheck) {
								send(ws, msgpack.encode({
									nametaken: true
								}));
							} else {
								var oldUser = account.username;
								await pool.query("UPDATE users SET username=$1 WHERE id=$2", [newUser, sdata.authUserId]);
								sdata.authUser = newUser;
								send(ws, msgpack.encode({
									namechanged: newUser
								}));
								await pool.query("UPDATE worlds SET namespace=$1 WHERE LOWER(namespace)=LOWER($2)", [newUser, oldUser]);
								await pool.query("UPDATE tokens SET username=$1 WHERE LOWER(user_id)=LOWER($2)", [newUser, account.id]);
								var kWorld = sdata.connectedWorldId;
								wss.clients.forEach(async function(sock) {
									if(!sock || !sock.sdata) return;
									if(sock.sdata.connectedWorldId == kWorld) {
										await evictClient(sock);
									}
								});
							}
						} else {
							send(ws, msgpack.encode({
								wrongpass: true
							}));
						}
					}
				}
			} else if("passchange" in data) {
				var set = data.passchange;
				
				if(!Array.isArray(set)) return;
				
				var oldPass = set[0];
				var newPass = set[1];
				
				if(typeof oldPass != "string") return;
				if(typeof newPass != "string") return;
				if(oldPass.length > 64) return;
				if(newPass.length > 128) return;
				
				
				var tokenData = (await pool.query("SELECT * FROM tokens WHERE token=$1", [sdata.authToken])).rows[0];
				if(tokenData) {
					var user_id = tokenData.user_id;
					var account = (await pool.query("SELECT * FROM users WHERE id=$1", [user_id])).rows[0];
					if(account) {
						var db_pass = account.password;
						var isValid = checkHash(db_pass, oldPass);
						if(isValid) {
							await pool.query("UPDATE users SET password=$1 WHERE id=$2", [encryptHash(newPass), user_id]);
							send(ws, msgpack.encode({
								passchanged: true
							}));
							
						} else {
							send(ws, msgpack.encode({
								wrongpass: true
							}));
						}
					}
				}
			} else if("c" in data) {
				var pos = data.c;
				
				if(!Array.isArray(pos)) return;
				
				var x = pos[0];
				var y = pos[1];
				
				if(!Number.isInteger(x)) return;
				if(!Number.isInteger(y)) return;
				
				if(x % 20 != 0) return;
				if(y % 10 != 0) return;
				x /= 20;
				y /= 10;
				if(!sdata.isMember) {
					return;
				}
				await clearChunk(sdata.connectedWorldId, x, y);
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					c: [x * 20, y * 10, x * 20 + 20 - 1, y * 10 + 10 - 1]
				}));
			} else {
				//console.log(data)
			}

		});
		
		ws.on("close", function() {
			closed = true;
			onlineCount--;
			broadcast(msgpack.encode({
				online: onlineCount
			}), ws);
			
			if(sdata && sdata.isConnected) {
				worldBroadcast(sdata.connectedWorldId, msgpack.encode({
					rc: sdata.clientId
				}), ws);
			}
			
			connObj[0]--;
		});
		ws.on("error", function() {
			console.log("Client error");
		});
	});
}


async function initServer() {
	const { rows } = await pool.query(
		"SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public' AND tablename = 'server_info'"
	);
	if (rows.length === 0) {
		await pool.query(`
			CREATE TABLE server_info (
				name TEXT,
				value TEXT
			);

			CREATE TABLE worlds (
				id SERIAL PRIMARY KEY,
				namespace TEXT,
				name TEXT,
				attributes JSONB
			);

			CREATE TABLE users (
				id SERIAL PRIMARY KEY,
				username TEXT,
				password TEXT,
				date_joined BIGINT
			);

			CREATE TABLE tokens (
				token TEXT,
				username TEXT,
				user_id INTEGER NOT NULL
			);

			CREATE TABLE members (
				world_id INTEGER,
				username TEXT
			);

			CREATE TABLE chunks (
				world_id INTEGER NOT NULL,
				x INTEGER NOT NULL,
				y INTEGER NOT NULL,
				text TEXT,
				colorFmt TEXT,
				protected INTEGER
			);

			CREATE INDEX ic ON chunks (world_id, x, y);
			CREATE INDEX iu ON users (username);
			CREATE INDEX it ON tokens (token);
			CREATE INDEX im ON members (world_id);
			CREATE INDEX im2 ON members (world_id, username);
			CREATE INDEX iw ON worlds (namespace);
			CREATE INDEX iw2 ON worlds (namespace, name);
		`);
		await pool.query(
			"INSERT INTO worlds (namespace, name, attributes) VALUES ($1, $2, $3)",
			[
				"textwall",
				"main",
				{
					readonly: false,
					private: false,
					hideCursors: false,
					disableChat: false,
					disableColor: false,
					disableBraille: false
				}
			]
		);
	}
	runserver();
}
initServer();

process.once("SIGINT", function() {
	console.log("Server is closing, saving...");
	commitChunks();
	process.exit();
});