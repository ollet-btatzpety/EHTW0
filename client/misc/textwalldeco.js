! function(e) {
    
    function(e) {
        var n = t;
        class r {
            constructor(e, n) {
                var r = t;
                this["charMap"] = new Map, this["scale"] = 1, this.spaceMissingCharacters = !1, this["forceSharpPixels"] = !1, this["bold"] = !1, this["italic"] = !1, null != e && this["fetchFont"](e, n)
            } ["fetchFont"](e, t) {
                var r = n,
                    a = this,
                    o = new XMLHttpRequest;
                o["onreadystatechange"] = function() {
                    var e = r;
                    4 == o["readyState"] && 200 == o["status"] && (a["parseFont"](o["responseText"]), null != t && t())
                }, o["open"]("GET", e, !0), o.send(null)
            }
            parseFont(e) {
                var t = n,
                    r = e.split("\n");
                const a = r["length"];
                for (var o = 0; o < a; o++) {
                    var i = r[o];
                    if (!i["startsWith"]("#")) {
                        var c = i["split"](":");
                        if (2 == c["length"]) {
                            for (var l = parseInt(c[0], 16), u = c[1], s = u.length, f = new Uint8Array(s / 2), d = 0; d < s; d += 2) f[d / 2] = parseInt(u["slice"](d, d + 2), 16);
                            this["charMap"]["set"](l, f)
                        }
                    }
                }
            } ["exportFont"]() {
                var e = n,
                    t = "";
                for (const [n, o] of this["charMap"].entries()) {
                    var r = "";
                    r += n["toString"](16)["padStart"](4, "0")["toUpperCase"](), r += ":";
                    for (var a = 0; a < o["length"]; a++) r += o[a].toString(16)["padStart"](2, "0")["toUpperCase"]();
                    t += r += "\n"
                }
                return t
            }
            drawChar(e, t, r, a) {
                var o = n,
                    i = e["codePointAt"](),
                    c = this["charMap"]["get"](i);
                if (null == c) return this.spaceMissingCharacters ? 8 * this["scale"] : 0;
                var l = c["length"],
                    u = l / 16,
                    s = (this["bold"] ? 2 : 1) * this["scale"],
                    f = 1 * this.scale;
                this["forceSharpPixels"] && (s = Math["ceil"](s), f = Math["ceil"](f));
                for (var d = 0; d < l; d++) {
                    var v = c[d],
                        m = this["italic"] ? Math["round"]((d - l) / 3) : 0,
                        h = Math["floor"](d / u) * this["scale"];
                    this["forceSharpPixels"] && (h = Math["round"](h));
                    for (var y = 0; y < 8; y++)
                        if (v >> y & 1) {
                            var p = (8 * (Math["floor"](d % u) + 1) - y - m) * this["scale"];
                            this["forceSharpPixels"] && (p = Math["round"](p)), t["fillRect"](r + p, a + h, s, f)
                        }
                }
                return 8 * u * this.scale
            } ["drawText"](e, t, r, a) {
                for (var o = n, i = r, c = a, l = Array.from(e), u = 0; u < l["length"]; u++) {
                    var s = l[u];
                    "\r" != s && ("\n" != s ? r += this["drawChar"](s, t, r, a) : (a += 16 * this.scale, r = i))
                }
                return {
                    x: r - i,
                    y: (a += 16 * this["scale"]) - c
                }
            }
        }
        var a, o = "/";
        const i = document["getElementById"]("textarea"),
            c = document["getElementById"]("connecting"),
            l = document["getElementById"]("captchabox"),
            u = document.getElementById("info"),
            s = -1 != navigator["userAgent"]["indexOf"]("iPhone") || -1 != navigator.userAgent["indexOf"]("iPod") || -1 != navigator.userAgent["indexOf"]("iPad"),
            f = -1 != navigator.userAgent["indexOf"]("Firefox"),
            d = s ? 40 : 200,
            v = new Date;
        var m = devicePixelRatio,
            h = !1,
            y = document["title"],
            p = !0;
        const g = document.getElementById("toast");
        var x;
        const w = document["getElementById"]("clipboard"),
            b = document["getElementById"]("usermenu"),
            M = document["getElementById"]("colourlist"),
            k = document["getElementById"]("teleport");
        var E = document["getElementById"]("canvas");
        E.removeAttribute("id");
        var S = E["getContext"]("2d", {
            alpha: !1
        });
        E["width"] = Math["round"](window.innerWidth * m), E["height"] = Math.round(window.innerHeight * m), E.style["width"] = window["innerWidth"] + "px", E.style["height"] = window["innerHeight"] + "px", S.imageSmoothingEnabled = !1;
        const I = "#FFFFFF",
            C = "#EBEBEB";
        var A = I,
            B = C,
            T = ia(B, -15),
            F = ia(B, 10);
        const P = document.getElementById("primary"),
            L = document["getElementById"]("secondary"),
            O = document["getElementById"]("themetext"),
            R = document["getElementById"]("thememenu"),
            D = document["getElementById"]("customfont"),
            N = document.getElementById("customfontsize"),
            j = document["getElementById"]("fontmenu");
        var U = 0;
        var H = 0;

        function W(e) {
            switch (e) {
                case 0:
                    return A;
                case 1:
                    return B;
                case 2:
                    return T
            }
            return A
        }

        function K(e) {
            switch (e) {
                case 0:
                case 1:
                case 2:
                    return !0;
                default:
                    return !1
            }
        }

        function Y(e) {
            const t = e[0];
            for (var n = 1; n < 200; n++)
                if (e[n] != t) return -1;
            return t
        }

        function X(e) {
            for (var t = new Array(200), n = 0; n < 200; n++) t[n] = e;
            return t
        }

        function q(e) {
            var t = n;
            if (1 == e["length"]) return parseInt(String["fromCharCode"](e[0]));
            const r = [];
            for (let t = 0; t < e.length; t++) {
                const n = e[t];
                for (let e = 0; e < 4; e++) {
                    const t = n >> 6 - 2 * e & 3;
                    r.push(t)
                }
            }
            return r
        }
        var z = !1,
            J = "",
            $ = "",
            Q = !1;
        const V = document["getElementById"]("wallsettings"),
            G = document["getElementById"]("addmembers"),
            _ = document["getElementById"]("walllist");
        var Z;
        const ee = document["getElementById"]("deletewall"),
            te = String["fromCharCode"](10240),
            ne = String.fromCharCode(27),
            re = {
                Inconsolata: 18,
                "IBM Plex Mono": 16,
                "Roboto Mono": 16,
                "Courier Prime": 16,
                Courier: 16,
                "Cutive Mono": 18,
                Cousine: 16,
                Unifont: 16,
                Terminus: 16,
                Fixed: 16,
                monospace: 18,
                "Ubuntu Mono": 20,
                "Libertinus Mono": 16,
                Fixedsys: 18,
                Pointfree: 16,
                Monofur: 18,
                "Fantasque Sans Mono": 18,
                Custom: 20
            };
        var ae = "Inconsolata",
            oe = Math["floor"](re[ae] * m) + "px " + ae + ", monospace, Special";
        const ie = new Map;
        ie.set("Unifont", void 0), ie["set"]("Terminus", void 0), ie["set"]("Fixed", void 0);
        const ce = Object["keys"](re)["length"],
            le = document["getElementById"]("fontselect");
        for (var ue = 0; le.length > 0; ue++);
        for (ue = 0; ue < ce; ue++) option = document.createElement("option"), option.text = Object["keys"](re)[ue], le["add"](option);
        le["value"] = ae;
        const se = document.getElementById("decorations");
        se["addEventListener"]("contextmenu", (function(e) {
            e["preventDefault"]()
        }));
        const fe = {
            bold: {
                el: document["getElementById"]("bold"),
                enabled: !1
            },
            italic: {
                el: document["getElementById"]("italic"),
                enabled: !1
            },
            underline: {
                el: document["getElementById"]("underline"),
                enabled: !1
            },
            strikethrough: {
                el: document.getElementById("strikethrough"),
                enabled: !1
            }
        };
        var de = Object["keys"](fe);
        for (ue = 0; ue < de["length"]; ue++) fe[de[ue]].el["addEventListener"]("click", Rr);
        var ve = 145,
            me = !1;

        function he(e) {
            var t, r, a = n;
            if (e) {
                me = !0;
                var o = (t = De.x, r = De.y, {
                    x: t * (10 * m) / devicePixelRatio + et.offset.x / devicePixelRatio,
                    y: r * (20 * m) / devicePixelRatio + et["offset"].y / devicePixelRatio
                });
                o.x + 15 * m + ve > window.innerWidth ? se["style"].left = o.x - ve - 5 * mt + "px" : se["style"]["left"] = o.x + 15 * mt + "px", se["style"].top = Math["max"](o.y - 30, 10) + "px", se["style"]["display"] = "flex", se["style"]["top"] = Math["max"](o.y - se.clientHeight, 0) + "px", ve = se["clientWidth"] || ve
            } else me && (me = !1, se.style["display"] = "none")
        }

        function ye() {
            var e = n,
                t = 0;
            return fe.bold["enabled"] && (t += 8), fe["italic"]["enabled"] && (t += 4), fe["underline"]["enabled"] && (t += 2), fe["strikethrough"]["enabled"] && (t += 1), t
        }

        function pe(e) {
            var t = n;
            Dr("bold", Boolean(8 & e)), Dr("italic", Boolean(4 & e)), Dr("underline", Boolean(2 & e)), Dr("strikethrough", Boolean(1 & e))
        }
        const ge = 192,
            xe = ["#000000", "#898D90", "#D4D7D9", "#FF99AA", "#FF4500", "#FFA800", "#9C6926", "#FFD635", "#7EED56", "#00CC78", "#51E9F4", "#3690EA", "#2450A4", "#B44AC0", "#811E9F", "#BE0039", "#00A368", "#00756F", "#009EAA", "#493AC1", "#6A5CFF", "#FF3881", "#6D482F", "#6D001A", "#FFF8B8", "#00CCC0", "#94B3FF", "#E4ABFF", "#DE107F", "#FFB470", "#515252"],
            we = ["black", "grey", "light grey", "light pink", "red", "orange", "brown", "yellow", "light green", "green", "light blue", "blue", "dark blue", "purple", "dark purple", "dark red", "dark green", "dark teal", "teal", "indigo", "periwinkle", "pink", "dark brown", "burgundy", "pale yellow", "light teal", "lavender", "pale purple", "magenta", "beige", "dark grey"],
            be = [0, 30, 1, 2, 23, 15, 4, 5, 7, 24, 16, 9, 8, 17, 18, 25, 12, 11, 10, 19, 20, 26, 14, 13, 27, 28, 21, 3, 22, 6, 29];

        function Me(e) {
            for (var t = n, r = 0; r < xe["length"]; r++)
                if (be[r] == e) return r;
            return -1
        }
        var ke = [];
        ! function() {
            var e = n;
            for (ue = 0; ue < xe["length"]; ue++) ke[ue] = ua(xe[ue], .2);
            ke[xe["length"]] = "rgba(255, 255, 255, 0.2)"
        }();
        var Ee, Se, Ie, Ce = 0,
            Ae = ua(xe[Ce], .6),
            Be = !1,
            Te = new Map,
            Fe = [],
            Pe = [],
            Le = new Map,
            Oe = new Worker("/static/ping.js"),
            Re = !1,
            De = {
                x: 0,
                y: 0,
                rawx: 0,
                rawy: 0,
                visible: !0,
                start: 0,
                lastedit: {
                    x: 0,
                    y: 0
                }
            },
            Ne = {
                x: 0,
                y: 0
            },
            je = {
                x: 0,
                y: 0
            },
            Ue = [],
            He = [],
            We = new Map,
            Ke = !0,
            Ye = !0,
            Xe = !0,
            qe = !1,
            ze = [],
            Je = "",
            $e = 0,
            Qe = 0,
            Ve = document["getElementById"]("coords"),
            Ge = document.getElementById("nearby"),
            _e = performance["now"](),
            Ze = {
                scale: 1,
                offset: {
                    x: 0,
                    y: 0
                }
            },
            et = {
                start: {
                    x: null,
                    y: null
                },
                offset: {
                    x: 0,
                    y: 0
                },
                coords: {
                    x: 0,
                    y: 0
                }
            },
            tt = !1,
            nt = !1,
            rt = !1,
            at = !1,
            ot = !1,
            it = {},
            ct = [],
            lt = null,
            ut = [];
        for (ue = 0; ue < 200; ue++) ut[ue] = " ";
        var st = [];
        for (ue = 0; ue < 200; ue++) st[ue] = 0;
        document["getElementById"]("fontselect").onchange = function(e) {
            var t = n;
            kt(e["target"]["value"])
        };
        const ft = {
            showothercurs: document["getElementById"]("showothercurs"),
            shownametags: document["getElementById"]("shownametags"),
            showchat: document.getElementById("showchat"),
            disablecolour: document["getElementById"]("disablecolour"),
            smoothpanning: document["getElementById"]("smoothpanning"),
            smoothcursors: document["getElementById"]("smoothcursors"),
            copycolour: document.getElementById("copycolour"),
            copydecorations: document["getElementById"]("copydecorations"),
            rainbow: document["getElementById"]("rainbow"),
            anonymous: document.getElementById("anonymous")
        };
        ft["showothercurs"]["checked"] = !0, ft["shownametags"]["checked"] = !0, ft["showchat"]["checked"] = !0, ft["disablecolour"]["checked"] = !1, ft["smoothpanning"]["checked"] = !0, ft.smoothcursors["checked"] = !0;
        const dt = {
            protect: document["getElementById"]("protect"),
            protectOwner: document["getElementById"]("protectowner"),
            clear: document.getElementById("clear"),
            readOnly: document["getElementById"]("readonly"),
            private: document.getElementById("private"),
            hideCursors: document["getElementById"]("hidecursors"),
            disableChat: document.getElementById("disablechat"),
            disableColour: document["getElementById"]("walldisablecolour"),
            disableBraille: document.getElementById("disablebraille")
        };
        var vt = 1,
            mt = 1,
            ht = document.getElementById("zoom");

        function yt(e, t) {
            vt = e < .5 ? .5 : e > 3 ? 3 : e, mt = Math["round"](100 * vt) / 100, localStorage.setItem("zoom", mt), ht.value = 10 * mt, t && kr(Math.round(100 * mt) + "% ", 1e3), On()
        }

        function pt() {
            yt(ht.value / 10, !0)
        }
        var gt = document["getElementById"]("registerlink"),
            xt = document["getElementById"]("loginlink"),
            wt = document.getElementById("logoutlink");

        function bt(e, t) {
            var r = n;
            e && (localStorage["removeItem"]("username"), localStorage["removeItem"]("token")), Je = "", H = 0, V["style"]["display"] = "none", a["readyState"] != a.OPEN || t || (dt.private["checked"] && Hn("textwall", "main"), a.send(Gr({
                logout: 0
            })), Xe = !0), document["getElementById"]("login").style["display"] = "block", document["getElementById"]("loggedin")["style"]["display"] = "none", En(!1), Fn(), h = !1, document["getElementById"]("admin")["style"].display = "none", Ie = !0
        }

        function Mt() {
            var e = n;
            return 16 * Math["round"](m) > 20 * m || 16 * Math.round(m) < 13 * m ? m : Math["round"](m)
        }

        function kt(e) {
            var t = n;
            if (ae = e, ie["has"](ae)) {
                var a = ie["get"](ae);
                if (null == a) {
                    switch (ae) {
                        case "Unifont":
                            a = new r(t(268), Dn);
                            break;
                        case "Terminus":
                            a = new r(t(377), Dn);
                            break;
                        default:
                            a = new r(t(535), Dn)
                    }
                    a["forceSharpPixels"] = !0, ie["set"](ae, a)
                }
                a.scale = Mt()
            }
            var o = ae,
                i = re[ae];
            "Custom" == ae ? (j.classList.remove("hidden"), o = D["value"], i = Math["max"](Math["min"](20, N["value"]), 1), localStorage["setItem"]("customfont", o), localStorage["setItem"]("customfontsize", i), o = '"' + (o || "monospace") + '"') : j["classList"]["add"]("hidden"), oe = Math["floor"](i * m) + "px " + o + ", monospace, Special", localStorage["setItem"]("font", ae), document["getElementById"]("fontselect")["value"] = ae, Ie = !0
        }

        function Et() {
            var e = n;
            return Math["ceil"](.1 * Math["round"](Rt * m / .1))
        }

        function St() {
            return Et()
        }

        function It(e) {
            var t = n;
            S["fillRect"](Math["round"](10 * e[0] * m), Math["round"](20 * e[1] * m), Et(), St())
        }

        function Ct(e) {
            var t = n;
            e["font"] = Math["round"](11 * m) + "px " + ae + ", monospace"
        }

        function At(e, t) {
            var r = n,
                a = Te["get"](e);
            if (a.empty) S["fillStyle"] = W(a.protected), It(t);
            else {
                var o = a["img"];
                f && (o = a["bmp"]), null != o ? (S["drawImage"](o, Math.round(10 * t[0] * m), Math["round"](20 * t[1] * m), Et(), St()), a["dpr"] == m && a["font"] == oe || Dt(e, !1)) : (S["fillStyle"] = F, It(t), Dt(e, !1))
            }
        }

        function Bt(e) {
            var t = n;
            return e = e || 0, {
                minx: -et["offset"].x / m / 10 - e,
                maxx: -et["offset"].x / m / 10 + window["innerWidth"] / mt / 10 + e - 20,
                miny: -et.offset.y / m / 20 - e,
                maxy: -et["offset"].y / m / 20 + window.innerHeight / mt / 20 + e - 10
            }
        }

        function Tt(e, t) {
            var r = n;
            return e[0] < t["minx"] || e[0] > t["maxx"] || e[1] < t["miny"] || e[1] > t["maxy"]
        }

        function Ft(e) {
            var t = n,
                r = 20 * Math["floor"](e[0] / 20),
                a = 10 * Math["floor"](e[1] / 10),
                o = r + "," + a,
                i = Te["get"](o);
            if (null != i && null != i["protected"]) {
                if (!K(i.protected)) {
                    var c = e[0] - r + 20 * (e[1] - a);
                    return 0 != i["protected"][c]
                }
                if (0 != i["protected"]) return !0
            }
            return !1
        }

        function Pt(e) {
            var t = n;
            return Te.get(e)["coords"] || e.split(",")
        }

        function Lt(e, t, r, a) {
            var o = n;
            if ("" != e) {
                S["fillStyle"] = "rgba(34, 34, 34, 0.4)";
                var i = S["measureText"](e);
                S["beginPath"](), S["roundRect"](Math["round"](t - i["width"] / 2), Math["round"](r + 21 * m), Math["round"](i["width"] + 10 * m), Math.round(14 * m), [a]), S.fill(), S["fillStyle"] = "#FFFFFF", S["fillText"](e, Math["round"](t - i["width"] / 2 + 5 * m), Math["round"](r + 31 * m))
            }
        }

        function Ot(e, t, r, a) {
            var o = n;
            S.fillRect(Math["round"](e), Math["round"](t), Math.round(r), Math["round"](a))
        }! function() {
            var e = n;
            S.font = "10px Special", S.fillText("abc", 0, 10), S.font = oe, S["fillText"]("abc", 0, 10);
            for (var t = 0; t < Object["keys"](re)["length"]; t++) S["font"] = "10px " + Object["keys"](re)[t], S["fillText"]("abc", 0, 10), S["font"] = "bold 10px " + Object["keys"](re)[t], S["fillText"]("abc", 0, 10), S.font = "italic 10px " + Object["keys"](re)[t], S["fillText"]("abc", 0, 10), S["font"] = "italic bold 10px " + Object["keys"](re)[t], S["fillText"]("abc", 0, 10)
        }();
        const Rt = 200;

        function Dt(e, t) {
            var r = n;
            Le["has"](e) ? 0 == Le.get(e) && t && Le["set"](e, t) : (Pe["push"](e), Le["set"](e, t))
        }

        function Nt(e, t) {
            var r = n;
            Le["has"](e) ? 0 == Le["get"](e) && t && Le.set(e, t) : (Pe["unshift"](e), Le.set(e, t))
        }
        var jt, Ut, Ht;
        try {
            jt = RegExp("\\p{Extended_Pictographic}", "u")
        } catch (e) {
            jt = !1
        }
        try {
            Ut = RegExp("\t", "gm")
        } catch (e) {
            Ut = !1
        }
        try {
            Ht = RegExp("\r", "gm")
        } catch (e) {
            Ht = !1
        }
        var Wt = RegExp("^[a-zA-Z0-9_-]{1,24}$");

        function Kt(e) {
            return 65 + Math["floor"](26 * e)
        }

        function Yt(e) {
            return 48 + Math["floor"](10 * e)
        }

        function Xt(e) {
            var t = n;
            return "AEIOU"[Math["floor"](5 * e)]["codePointAt"]()
        }

        function qt(e) {
            var t = n;
            return "BCDFGHJKLMNPQRSTVWXYZ"[Math["floor"](21 * e)]["codePointAt"]()
        }

        function zt(e) {
            const t = Math["random"]();
            switch (e - 58112) {
                case 0:
                    return t < .41 ? Kt(t) + 32 : t < .83 ? Kt(t) : Yt(t);
                case 1:
                    return t < .72 ? Kt(t) + 32 : Yt(t);
                case 2:
                    return t < .72 ? Kt(t) : Yt(t);
                case 3:
                    return t < .5 ? Kt(t) + 32 : Kt(t);
                case 4:
                    return Kt(t) + 32;
                case 5:
                    return Kt(t);
                case 6:
                    return Yt(t);
                case 7:
                    return t < .5 ? Xt(t) + 32 : Xt(t);
                case 8:
                    return Xt(t) + 32;
                case 9:
                    return Xt(t);
                case 10:
                    return t < .5 ? qt(t) + 32 : qt(t);
                case 11:
                    return qt(t) + 32;
                case 12:
                    return qt(t)
            }
            return 97
        }

        function Jt(e) {
            return (e + 2) % 20 < 2
        }

        function $t(e) {
            return Math.round(14 * e) + "px Courier"
        }

        function Qt(e, t, r, a, o) {
            var i = n;
            e["fillText"](t, Math["floor"](r), Math["floor"](a + 15 * o))
        }

        function Vt(e, t, r, a, o, i, c) {
            var l = n;
            e.drawChar(r, t, Math["floor"](a), Math["floor"](o + (10 * i - c / 2)))
        }

        function Gt(e) {
            var t = n;
            e["font"] = "bold " + e["font"]
        }

        function _t(e) {
            var t = n;
            e.font = "italic " + e["font"]
        }

        function Zt(e, t) {
            var r = n;
            ft["disablecolour"]["checked"] && (t = 0), e["fillStyle"] = Be && 0 == t ? "#FFFFFF" : xe[t]
        }

        function en(e, t, r) {
            var a = n;
            if (!K(r))
                for (var o = t % 20, i = Math["floor"](t / 20), c = Math.round(20 * i * m), l = !1; o < 20;) {
                    var u = r[o + 20 * i];
                    if (l || 0 != u) {
                        0 != u && (l = !0), e["fillStyle"] = W(u);
                        var s = Math["round"](10 * o * m);
                        e["fillRect"](s, c, Math["round"](10 * (o + 1) * m) - s, Math.round(20 * (i + 1) * m) - c), o++
                    } else o++
                }
        }

        function tn(e, t) {
            var r = n,
                a = Te.get(e);
            if (null != a && null != a["txt"]) {
                var o = nn(e);
                if (a["empty"] = o, o) {
                    rn(e);
                    var i = Pt(e),
                        c = i[0] + 20 + "," + i[1];
                    if (Te.has(c)) {
                        var l = Te["get"](c);
                        null != l.txt && (nn(c) ? (l.empty = !0, rn(c)) : t && Nt(c, !1))
                    }
                } else {
                    var u = Et(),
                        s = St();
                    null == a.img && (null != window["OffscreenCanvas"] ? a.img = new OffscreenCanvas(u, s) : a.img = document.createElement("canvas")), a.img["width"] = u, a["img"]["height"] = s,
                        function(e, t, n, a, o) {
                            var i = r,
                                c = Te["get"](a);
                            if (e["imageSmoothingEnabled"] = !1, e.textBaseline = "alphabetic", e["textAlign"] = "left", K(c.protected)) e["fillStyle"] = W(c["protected"]), e.fillRect(0, 0, t, n);
                            else {
                                e["fillStyle"] = A, e["fillRect"](0, 0, t, n);
                                for (var l = 0; l < 200; l++) {
                                    var u = l % 20,
                                        s = Math["floor"](l / 20);
                                    if (0 != c["protected"][l]) {
                                        e["fillStyle"] = W(c["protected"][l]);
                                        var f = Math["round"](10 * u * m),
                                            d = Math["round"](20 * s * m);
                                        e["fillRect"](f, d, Math["round"](10 * (u + 1) * m) - f, Math["round"](20 * (s + 1) * m) - d)
                                    }
                                }
                            }
                            var v, h = {},
                                y = !1,
                                p = Pt(a),
                                g = p[0] - 20 + "," + p[1],
                                x = Te["get"](g);
                            null != x && null != x["edge"] && (v = x["edge"]);
                            var w, b, M = t / Rt,
                                k = ie["get"](ae),
                                E = 16 * Mt();
                            for (l = 0; l < 10; l++)
                                for (var S = -2; S < 20; S++) {
                                    var I = t / 20 * S,
                                        C = n / 10 * l;
                                    if (S < 0 && null != v) {
                                        var B = K(c["protected"]),
                                            T = K(x["protected"]);
                                        if (B) {
                                            if (T && 0 == x["protected"] && 0 != c["protected"]) continue;
                                            if (!T) {
                                                var F = x["protected"][20 + S + 20 * l],
                                                    P = -1;
                                                if (-2 == S && (P = x["protected"][19 + 20 * l]), 0 == F && 0 != c["protected"] || -1 != P && 0 != P) continue
                                            }
                                        } else {
                                            if (T && 0 == x["protected"] && 0 != (L = c["protected"][20 * l])) continue;
                                            if (!T) {
                                                F = x["protected"][20 + S + 20 * l];
                                                var L = c["protected"][20 * l];
                                                if (P = -1, -2 == S && (P = x.protected[19 + 20 * l]), 0 == F && (0 != L || -1 != P && 0 != P)) continue
                                            }
                                        }
                                        var O = S + 20 * l;
                                        if (null != v[O]) {
                                            var R = v[O];
                                            Zt(e, R[2]), null != k && k.charMap["has"](R[0]["codePointAt"]()) ? (k["bold"] = R[3], k["italic"] = R[4], Vt(k, e, R[0], I, C, M, E)) : (e.font = R[1] ? $t(M) : oe, R[3] && Gt(e), R[4] && _t(e), Qt(e, R[0], I, C, M)), en(e, 1 + 20 * l, c.protected)
                                        }
                                    }
                                    if (!(S < 0)) {
                                        var D = c["txt"][S + 20 * l],
                                            N = da(c["clr"][S + 20 * l]),
                                            j = N[1];
                                        if (!hr(D, j)) {
                                            var U = D["codePointAt"](),
                                                H = N[0];
                                            Zt(e, H), e.font = oe;
                                            var Y = !1;
                                            8 & j && (Y = !0, Gt(e));
                                            var X = !1;
                                            if (4 & j && (X = !0, _t(e)), (w = U) >= 58112 && w <= 58124 && (U = zt(U), D = String["fromCodePoint"](U)), (b = U) >= 9472 && b <= 9632 && !(b >= 9476 && b <= 9483) && !(b >= 9548 && b <= 9551) || b >= 9698 && b <= 9701 || la(U)) e["font"] = Math["round"](20 * M) + "px Special", e["fillText"](D, Math["round"](I), Math.floor(C + 15 * M));
                                            else {
                                                var q = !1;
                                                jt && jt.test(D) && (q = !0, e.font = $t(M)), null != k && k.charMap["has"](U) ? (k["bold"] = Y, k["italic"] = X, Vt(k, e, D, I, C, M, E)) : Qt(e, D, I, C, M), S >= 18 && (h[S - 20 + 20 * l] = [D, q, H, Y, X], y = !0)
                                            }
                                            2 & j && e.fillRect(Math["floor"](I - .5 * M), Math["round"](C + 17.5 * M), Math["ceil"](11 * M), Math.ceil(M)), 1 & j && e["fillRect"](Math["floor"](I - .5 * M), Math["floor"](C + 9 * M), Math.ceil(11 * M), Math["ceil"](M)), S < 19 && !K(c.protected) && 0 == c["protected"][S + 20 * l] && en(e, S + 1 + 20 * l, c["protected"])
                                        }
                                    }
                                }
                            if (c.edge = y ? h : void 0, o) {
                                var z = p[0] + 20 + "," + p[1];
                                Te["has"](z) && null != Te["get"](z).txt && Nt(z, !1)
                            }
                        }(a["img"]["getContext"]("2d", {
                            alpha: !1
                        }), u, s, e, t), a["dpr"] = m, a["font"] = oe, f && createImageBitmap(a["img"]).then((function(t) {
                            var n = r;
                            if (Te["has"](e)) {
                                var a = Te["get"](e);
                                null != a["bmp"] && a["bmp"].close(), a["bmp"] = t, Ie = !0
                            }
                        })), a["empty"] = !1
                }
            }
        }

        function nn(e) {
            for (var t = n, r = Te["get"](e), a = !0, o = 0; o < 200; o++)
                if (!hr(r["txt"][o], da(r["clr"][o])[1])) {
                    a = !1;
                    break
                } if (a && !K(r["protected"]) && -1 == Y(r["protected"]) && (a = !1), a && (r["edge"] = void 0), a) {
                var i = Pt(e),
                    c = i[0] - 20 + "," + i[1];
                Te["has"](c) && null != Te.get(c)["edge"] && (a = !1)
            }
            return a
        }

        function rn(e) {
            var t = n;
            if (Te["has"](e)) {
                var r = Te.get(e);
                null != r["img"] && delete r["img"]
            }
        }
        var an = null;

        function on(e, t) {
            return e[0] === t[0] ? 0 : e[0] < t[0] ? -1 : 1
        }

        function cn(e) {
            for (var t = n, r = innerWidth / innerHeight, a = [], o = et["coords"].x, i = 2 * et["coords"].y * r, c = 0; c < e["length"]; c += 2) {
                var l = e[c] + 10,
                    u = 2 * (e[c + 1] + 5) * r,
                    s = Math["sqrt"](sa(o - l) + sa(i - u));
                a["push"]([s, c])
            }
            return a.sort(on), a
        }
        var ln, un = !1;

        function sn() {
            var e, t, r, o = n;
            if (!un) {
                for (var i = -120 - 20 * Math["floor"](et["offset"].x / (200 * m)), c = -60 - 10 * Math.floor(et["offset"].y / (200 * m)), l = c, u = Math["floor"](window["innerWidth"] / (10 * mt) - et["offset"].x / (10 * m) + 120), s = Math.floor(window.innerHeight / (20 * mt) - et["offset"].y / (20 * m) + 60), f = []; i < u;) {
                    for (; c < s;) {
                        var d = i + "," + c;
                        !Te["has"](d) && (e = i, t = c, r = void 0, r = n, null != an && an.minx <= e && e < an["maxx"] && an["miny"] <= t && t < an.maxy) && f.push(i, c), c += 10
                    }
                    c = l, i += 20
                }
                if (0 != f["length"]) {
                    var v = cn(f);
                    ln = [];
                    for (var h = 0, y = 0; y < v.length; y++) {
                        var p = v[y][1],
                            g = f[p],
                            x = f[p + 1];
                        if (d = g + "," + x, ln["push"](g / 20, x / 10), Te["set"](d, {}), 100 == ++h) break
                    }
                    h > 0 && (a.send(Gr({
                        r: ln
                    })), un = !0, Ie = !0)
                }
            }
        }

        function fn() {
            var e, t = n,
                r = Bt(250);
            for (const n of Te["keys"]()) {
                var a = Pt(n);
                !Tt(a, r) || (e = a)[0] > De.x - 20 && e[0] < De.x + 20 && e[1] > De.y - 10 && e[1] < De.y + 10 || Te["delete"](n)
            }
        }

        function dn() {
            var e = n;
            "ontouchstart" in window || i["focus"]()
        }
        var vn = !1;

        function mn() {
            i["focus"]()
        }

        function hn(e) {
            var t = n;
            return e.target["parentElement"].parentElement["dataset"].id
        }

        function yn(e) {
            h && a.send(Gr({
                i: hn(e)
            }))
        }

        function pn(e) {
            var t = n;
            h && a["send"](Gr({
                a: [hn(e), e.target["checked"]]
            }))
        }

        function gn(e) {
            h && a["send"](Gr({
                aa: hn(e)
            }))
        }

        function xn(e) {
            var t = n,
                r = hn(e),
                a = We["get"](r);
            null != a && h && (a["highlighted"] = e["target"]["checked"], Ie = !0)
        }

        function wn(e) {
            var t = n,
                r = e["target"]["parentElement"]["dataset"].id,
                a = We["get"](r);
            null != a && h && kr((a.n || r) + ": (" + a.l[0] + ", " + -a.l[1] + ")", 3e3)
        }

        function bn(e) {
            var t = n,
                r = e["target"]["parentElement"]["dataset"].id,
                a = We["get"](r);
            null != a && h && dr(a.l[0], a.l[1])
        }

        function Mn(e) {
            var t = n,
                r = document["createElement"]("tr"),
                a = document.createElement("td"),
                o = document["createElement"]("td"),
                i = document.createElement("td"),
                c = document["createElement"]("input"),
                l = document.createElement("input"),
                u = document["createElement"]("button"),
                s = document["createElement"]("button");
            l["type"] = "checkbox", l["checked"] = !1, u["innerText"] = "2", s["innerText"] = "3", l["addEventListener"]("click", pn), u.addEventListener("click", gn), s["addEventListener"]("click", yn), c["addEventListener"]("click", xn);
            var f = We["get"](e);
            c["type"] = "checkbox", c["checked"] = 1 == f["highlighted"], a["appendChild"](c);
            var d = f.c;
            o["style"]["backgroundColor"] = "#FFFFFF" == xe[d] ? "#222222" : xe[d], o["style"]["fontSize"] = "10px", o["style"]["userSelect"] = "all", o["innerText"] = f.n || e, o["addEventListener"]("click", wn), o["addEventListener"]("dblclick", bn), i["appendChild"](l), i["appendChild"](u), i["appendChild"](s), r["dataset"].id = e, r["appendChild"](a), r["appendChild"](o), r["appendChild"](i), document["getElementById"]("admintable").appendChild(r)
        }

        function kn(e) {
            e["preventDefault"]()
        }

        function En(e) {
            for (var t = n, r = ["loginbtn", "registerbtn", "loginname", "loginpass", "username", "password", "password2", "registerbtn", "chngusername", "chngeusrpass", "submitnamechange", "oldpass", "newpass", "newpass2", "submitpasschange", "deletepassword", "deleteaccount"], a = 0; a < r["length"]; a++) document["getElementById"](r[a])["disabled"] = e;
            if (!e) {
                var o = ["loginname", "loginpass", "username", "password", "password2", "chngusername", "chngeusrpass", "oldpass", "newpass", "newpass2", "deletepassword"];
                for (a = 0; a < o["length"]; a++) document["getElementById"](o[a])["value"] = ""
            }
        }
        E.addEventListener("pointerdown", (function(e) {
            var t = n;
            e["preventDefault"](), e["isTrusted"] && (he(!1), null != $n && 1 != e["pointerId"] || Gn || ($n = e["pointerId"], je = rr(e), nt ? (it["start"] = je, it.end = it.start) : (tt = !0, et["start"].x = e.clientX * m, et["start"].y = e.clientY * m, ct = [], lt = null, Vn(e), E.style["cursor"] = "move", function(e) {
                if (e.pointerId == $n && (xr(), !ot && !rt)) {
                    var t = rr(e);
                    if (De.x == t.x && De.y == t.y || (Ke = !0), De.x = t.x, De.y = t.y, De.start = De.x, tr(), e.altKey) {
                        var n = wr();
                        n && (hr(n[0], da(n[1])[1]) ? Fr(0) : Fr(da(n[1])[0]))
                    }
                    ar()
                }
            }(e)), Ie = !0))
        })), E["addEventListener"]("contextmenu", (function(e) {
            var t = n;
            e["preventDefault"](), rt ? (null != et["start"].x && null != et["start"].y && (Qn = !0), (at = !at) && (dt["clear"]["checked"] = !1, ot = !1), Ie = !0) : he(!0)
        })), document.addEventListener("pointermove", (function(e) {
            var t = n;
            if (e["isTrusted"] && (je = rr(e), (rt || ot) && (Ie = !0), e.pointerId == $n && !Gn)) {
                if (e["preventDefault"](), nt) it["end"] = je;
                else if (tt) {
                    var r = e["clientX"] * devicePixelRatio - et["start"].x / mt,
                        a = e["clientY"] * devicePixelRatio - et.start.y / mt;
                    et["offset"].x = Math["round"](Ze["offset"].x + r), et["offset"].y = Math["round"](Ze["offset"].y + a), er(), ft["smoothpanning"]["checked"] && Vn(e)
                }
                Ie = !0
            }
        })), E["addEventListener"]("click", mn), E["addEventListener"]("wheel", (function(e) {
            var t = n;
            if (e["isTrusted"] && (he(!1), !tt)) {
                if (e["preventDefault"](), e["ctrlKey"]) yt(vt - e["deltaY"] / 1e3, !0);
                else if (e["altKey"]) 1 == Math.sign(e.deltaY) ? Fr(Ce == be[xe["length"] - 1] ? be[0] : be[Me(Ce) + 1]) : Fr(Ce == be[0] ? be[xe["length"] - 1] : be[Me(Ce) - 1]);
                else {
                    var r = e["deltaX"],
                        a = e["deltaY"];
                    e.shiftKey && (r ^= a, r ^= a ^= r), Ln(et["offset"].x - r, et["offset"].y - a)
                }
                Ie = !0
            }
        }), {
            passive: !1
        }), document["addEventListener"]("pointerup", (function(e) {
            var t = n;
            if (e["isTrusted"] && (e["preventDefault"](), e["pointerId"] == $n && !Gn)) {
                if (nt && it["start"] && it["end"]) {
                    var r = Math.min(it["start"].x, it["end"].x),
                        o = Math["min"](it["start"].y, it["end"].y),
                        i = Math["max"](it["start"].x, it["end"].x),
                        c = Math["max"](it.start.y, it["end"].y);
                    if (nt = !1, it = {}, h && ot) vn = !0, a.send(Gr({
                        c: [r, o, i, c]
                    }));
                    else {
                        var l = De.x,
                            u = De.y;
                        De.x = r, De.y = o;
                        for (var s = "", f = "", d = !1, v = !1, y = o; y <= c; y++) {
                            for (var p = r; p <= i; p++) {
                                var g = wr();
                                if (g) {
                                    g[0] == ne ? s += " " : s += g[0];
                                    var [x, w] = da(g[1]);
                                    ft["copycolour"]["checked"] && ft["copydecorations"]["checked"] ? f += String.fromCharCode(ge + g[1]) : ft["copycolour"].checked ? f += String["fromCharCode"](ge + x) : ft["copydecorations"]["checked"] && (f += String["fromCharCode"](ge + fa(0, w))), hr(g[0], w) || (0 != w && (v = !0), 0 != x && (d = !0)), De.x++
                                }
                            }
                            De.x = r, De.y++, s += "\n", f += "�"
                        }
                        s = s["slice"](0, -1), f = f["slice"](0, -1), s["startsWith"]("http") && (d = v = !1), ft["copycolour"]["checked"] && d || ft["copydecorations"]["checked"] && v ? br(s + ne + f) : br(s), De.x = l, De.y = u, kr("Copied selection.", 1500);
                        var b = document["getElementById"]("copyico");
                        b.src = "/static/done.svg", setTimeout((function() {
                            b["src"] = "/static/copy.svg"
                        }), 1e3)
                    }
                } else if (Math["abs"](Math["round"](e.clientX - et["start"].x / m)) < 10 && Math.abs(Math["round"](e["clientY"] - et["start"].y / m)) < 10 && 0 == e["button"] && (Qn ? Qn = !1 : function(e) {
                        var n = t;
                        if (e["isTrusted"]) {
                            var r = rr(e),
                                o = 20 * Math["floor"](r.x / 20),
                                i = 10 * Math["floor"](r.y / 10),
                                c = o + "," + i;
                            if (Te.has(c)) {
                                var l = Te["get"](c);
                                if (rt && 0 != H)
                                    if (at) {
                                        var u = 0;
                                        u = K(l["protected"]) ? X(l["protected"]) : l["protected"]["slice"]();
                                        var s = r.x - o + 20 * (r.y - i);
                                        if (0 == u[s]) dt["protect"]["checked"] ? u[s] = 1 : u[s] = 2;
                                        else if (1 == u[s]) dt["protect"]["checked"] ? u[s] = 0 : u[s] = 2;
                                        else if (2 == u[s]) {
                                            if (2 != H && !h) return;
                                            dt.protectOwner["checked"] ? u[s] = 0 : u[s] = 1
                                        }
                                        var f = Y(u); - 1 != f ? a["send"](Gr({
                                            p: [c, f]
                                        })) : a["send"](Gr({
                                            p: [c, u[s], s]
                                        }))
                                    } else {
                                        if (u = 0, K(l["protected"])) {
                                            if (0 == l["protected"]) u = dt["protect"]["checked"] ? 1 : 2;
                                            else if (1 == l["protected"]) u = dt["protect"]["checked"] ? 0 : 2;
                                            else if (2 == l["protected"]) {
                                                if (2 != H && !h) return;
                                                u = dt.protectOwner.checked ? 0 : 1
                                            }
                                        } else {
                                            if (2 != H && function(e) {
                                                    if (K(e)) return 2 == e;
                                                    for (var t = 0; t < 200; t++)
                                                        if (2 == e[t]) return !0;
                                                    return !1
                                                }(l["protected"]) && !h) return;
                                            u = dt["protect"]["checked"] ? 1 : 2
                                        }
                                        a["send"](Gr({
                                            p: [c, u]
                                        }))
                                    } ot && (vn ? vn = !1 : (h || 0 != H) && a["send"](Gr({
                                    c: [o, i, o + 19, i + 9]
                                })))
                            }
                        }
                    }(e)), $n = void 0, tt = !1, et.start.x = null, et.start.y = null, Ln(et["offset"].x, et["offset"].y), ft["smoothpanning"]["checked"]) {
                    Vn(e);
                    var M = ct["length"] - 1;
                    ((lt = {
                        dx: ct[0][0] - ct[M][0],
                        dy: ct[0][1] - ct[M][1],
                        dt: ct[0][2] - ct[M][2]
                    }).dt > 90 || Math["abs"](lt.dx) < 5 && Math["abs"](lt.dy) < 5) && (lt = null)
                }
                E.style.cursor = "text", Ie = !0
            }
        })), document["addEventListener"]("pointerleave", Zn), document["addEventListener"]("pointercancel", Zn), i.addEventListener("input", (function(e) {
            var t = n;
            if (e["preventDefault"](), e.isTrusted) {
                if ("insertLineBreak" != e.inputType) return "deleteContentBackward" == e.inputType ? (De.x -= 1, fr(" ", 0, !1, !0) || (De.x += 1), void xr()) : void(null != e["data"] && "" != e["data"] && "insertFromPaste" != e["inputType"] && (xr(), Array["from"](e["data"])["length"] > 1 ? gr(e.data) : fr(e["data"], 1)));
                Er()
            }
        })), i["addEventListener"]("keydown", (function(e) {
            var t = n;
            if (e.isTrusted) {
                switch (e["keyCode"]) {
                    case 38:
                        De.y -= 1, xr(), he(!1), e.preventDefault();
                        break;
                    case 40:
                        De.y += 1, xr(), he(!1), e["preventDefault"]();
                        break;
                    case 37:
                        De.x -= 1, xr(), he(!1), e["preventDefault"]();
                        break;
                    case 39:
                        De.x += 1, xr(), he(!1), e.preventDefault();
                        break;
                    case 9:
                        De.x += 3, xr(), he(!1), e["preventDefault"]();
                        break;
                    case 36:
                        De.x = De["start"], xr(), he(!1), e["preventDefault"]();
                        break;
                    case 46:
                        fr(" ", 0, !1, !0), xr(), e.preventDefault()
                }
                tr(), (!e["ctrlKey"] && !e["shiftKey"] && !e.altKey || 37 == e["keyCode"] || 38 == e["keyCode"] || 39 == e["keyCode"] || 40 == e["keyCode"]) && ar()
            }
        })), document["addEventListener"]("keydown", (function(e) {
            var t = n;
            if (e["isTrusted"]) switch (e["keyCode"]) {
                case 90:
                    e["ctrlKey"] && (function() {
                        var e = t;
                        if (0 != Ue["length"]) {
                            var n = Ue["shift"]();
                            De.x = n[0], De.y = n[1];
                            var r = Ce,
                                a = ye(),
                                o = da(n[3]);
                            Ce = o[0], pe(o[1]), fr(n[2], 0, !0) || Ue.unshift(n), Ce = r, pe(a)
                        }
                    }(), e["preventDefault"]());
                    break;
                case 89:
                    e["ctrlKey"] && (function() {
                        var e = t;
                        if (0 != He["length"]) {
                            var n = He["shift"]();
                            De.x = n[0], De.y = n[1];
                            var r = Ce,
                                a = ye(),
                                o = da(n[3]);
                            Ce = o[0], pe(o[1]), fr(n[2], 1, !1) || He["unshift"](n), Ce = r, pe(a)
                        }
                    }(), e["preventDefault"]());
                    break;
                case 67:
                    e.altKey && Mr(e);
                    break;
                case 71:
                    e["ctrlKey"] && (e["preventDefault"](), Ar());
                    break;
                case 66:
                    e.ctrlKey && (e["preventDefault"](), Dr("bold"), he(!0));
                    break;
                case 73:
                    e["ctrlKey"] && (e["preventDefault"](), Dr("italic"), he(!0));
                    break;
                case 85:
                    e.ctrlKey && (e["preventDefault"](), Dr("underline"), he(!0));
                    break;
                case 83:
                    e.ctrlKey && (e["preventDefault"](), Dr("strikethrough"), he(!0));
                    break;
                case 18:
                    e["preventDefault"]();
                    break;
                case 27:
                    nt && (nt = !1, it = {}, E.style["cursor"] = "text", e["preventDefault"]()), k.classList["remove"]("open"), he(!1), xr();
                    break;
                case 107:
                case 187:
                    e["ctrlKey"] && (e.preventDefault(), yt(vt + .1, !0));
                    break;
                case 109:
                case 189:
                    e["ctrlKey"] && (e.preventDefault(), yt(vt - .1, !0))
            }
        })), i["addEventListener"]("paste", (function(e) {
            var t = n;
            e["isTrusted"] && gr((e["clipboardData"] || window["clipboardData"])["getData"]("text"))
        })), i["addEventListener"]("copy", (function(e) {
            var t = n,
                r = wr();
            if (r) {
                br(r[0]), e["preventDefault"](), e["clipboardData"] || kr("Copied character.", 1e3);
                var a = document["getElementById"]("copyico");
                a["src"] = "/static/done.svg", setTimeout((function() {
                    var e = t;
                    a["src"] = "/static/copy.svg"
                }), 1e3), i["focus"]()
            }
        })), Ge.addEventListener("click", (function() {
            kr(Qe + " online", 3e3)
        })), Ve["addEventListener"]("click", (function() {
            var e = n;
            history["pushState"]({}, null, o), br(location["protocol"] + "//" + location["host"] + o + "?x=" + De.x + "&y=" + -De.y), kr("Copied link.", 1e3), i["focus"]()
        })), document.getElementById("closemenu")["addEventListener"]("click", (function() {
            Ir(0)
        })), document.getElementById("openmenu")["addEventListener"]("click", (function() {
            Ir(1)
        })), document["getElementById"]("options").addEventListener("click", (function() {
            Ir(2)
        })), document.getElementById("home")["addEventListener"]("click", (function() {
            var e = n;
            vr(), 0 == De.x && 0 == De.y ? Hn("textwall", "main") && dr(0, 0) : dr(0, 0)
        })), document["getElementById"]("copy").addEventListener("click", Mr), document["getElementById"]("paste")["addEventListener"]("click", (function() {
            var e = n;
            navigator.clipboard["readText"]()["then"]((function(t) {
                var n = e;
                gr(t);
                var r = document.getElementById("pasteico");
                r["src"] = "/static/done.svg", setTimeout((function() {
                    r.src = "/static/paste.svg"
                }), 1e3), dn()
            }))
        })), document["getElementById"]("theme").addEventListener("click", (function() {
            Lr()
        })), P["addEventListener"]("input", Or), L["addEventListener"]("input", Or), O["addEventListener"]("change", (function(e) {
            Or(e), Lr(2)
        })), D["addEventListener"]("input", (function() {
            kt(ae)
        })), N["addEventListener"]("input", (function() {
            kt(ae)
        })), document["getElementById"]("goto")["addEventListener"]("click", Ar), b["addEventListener"]("click", (function(e) {
            var t = n,
                r = JSON["stringify"](e.target["checked"]);
            switch (e["target"]) {
                case ft["showothercurs"]:
                    localStorage.setItem("showothercurs", r), Ie = !0;
                    break;
                case ft["shownametags"]:
                    localStorage.setItem("shownametags", r), Ie = !0;
                    break;
                case ft["showchat"]:
                    localStorage.setItem("showchat", r), e["target"].checked ? In["classList"]["remove"]("hidden") : In["classList"]["add"]("hidden");
                    break;
                case ft["disablecolour"]:
                    localStorage["setItem"]("disablecolour", r), dt["disableColour"]["checked"] || Pr(ft["disablecolour"].checked), Ie = !0, Dn();
                    break;
                case ft["smoothpanning"]:
                    localStorage["setItem"]("smoothpanning", r), Ie = !0;
                    break;
                case ft["smoothcursors"]:
                    localStorage.setItem("smoothcursors", r);
                    break;
                case ft["copycolour"]:
                    localStorage["setItem"]("copycolour", r);
                    break;
                case ft["copydecorations"]:
                    localStorage["setItem"]("copydecorations", r);
                    break;
                case ft.rainbow:
                    localStorage["setItem"]("rainbow", r);
                    break;
                case ft["anonymous"]:
                    localStorage["setItem"]("anonymous", r), Xe = !0, Ie = !0;
                    break;
                case gt:
                    document["getElementById"]("login")["style"]["display"] = "none", document["getElementById"]("register")["style"]["display"] = "block";
                    break;
                case xt:
                    document["getElementById"]("login").style["display"] = "block", document["getElementById"]("register").style["display"] = "none";
                    break;
                case wt:
                    bt(!0)
            }
        })), document["getElementById"]("closeteleport")["addEventListener"]("click", (function() {
            var e = n;
            k["classList"]["remove"]("open")
        })), document["getElementById"]("tpwordgo").addEventListener("click", (function(e) {
            var t = n;
            e["preventDefault"]();
            var r = document.getElementById("tpword");
            Tr(r.value), r.blur()
        })), document["getElementById"]("tpword")["addEventListener"]("input", (function() {
            var e = n,
                t = document.getElementById("tpword")["value"]["replace"](/^\/|\/$/g, ""),
                r = 0 == t || t.startsWith("~") ? {
                    x: 0,
                    y: 0
                } : Vr(t);
            document["getElementById"]("tpx")["value"] = r.x, document["getElementById"]("tpy").value = -r.y
        })), document["getElementById"]("tpcoordgo")["addEventListener"]("click", (function(e) {
            var t = n;
            e["preventDefault"]();
            var r = document.getElementById("tpx"),
                a = document["getElementById"]("tpy"),
                i = parseInt(r["value"], 10),
                c = parseInt(a.value, 10);
            isNaN(i) && isNaN(c) || (0 !== i && (i = i || De.x), 0 !== c && (c = c || De.y), dr(i, -c), history["pushState"]({}, null, o), k["classList"]["remove"]("open"), r.blur(), a["blur"]())
        })), window["addEventListener"]("resize", On), window["addEventListener"]("orientationchange", On), window.addEventListener("popstate", (function() {
            Tr(Qr())
        })), window["addEventListener"]("focus", (function() {
            p = !0, Rn(), oa()
        })), window["addEventListener"]("blur", (function() {
            p = !1, Rn()
        })), ht["addEventListener"]("input", pt), ht.addEventListener("change", pt), Oe.addEventListener("message", (function(e) {
            var t = n;
            a && a["readyState"] == a["OPEN"] && a["send"](e.data)
        })), document["getElementById"]("chatbutton")["addEventListener"]("click", (function() {
            var e = n;
            In["classList"]["contains"]("open") ? In["classList"]["remove"]("open") : (In["classList"]["add"]("open"), Cn["classList"]["remove"]("show"), An())
        })), document["getElementById"]("sendmsg").addEventListener("click", Tn), document.getElementById("chatmsg")["addEventListener"]("keyup", (function(e) {
            13 == e["keyCode"] && Tn(e)
        })), document.getElementById("loginbtn")["addEventListener"]("click", (function(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document["getElementById"]("loginname"),
                    o = document["getElementById"]("loginpass");
                Sn["test"](r.value) ? 0 != r["value"]["length"] ? 0 != o["value"]["length"] ? (En(!0), a["send"](Gr({
                    login: [r.value, o.value]
                }))) : kr("Please type your password.", 3e3) : kr("Please type your username.", 3e3) : kr("Username is invalid.", 3e3)
            }
        })), document.getElementById("registerbtn").addEventListener("click", (function(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document.getElementById("username"),
                    o = document.getElementById("password"),
                    i = document.getElementById("password2");
                Sn["test"](r["value"]) ? 0 != r.value.length ? 0 != o["value"]["length"] ? o["value"] == i.value ? (En(!0), a["send"](Gr({
                    register: [r.value, o["value"]]
                }))) : kr("Passwords do not match.", 3e3) : kr("Please type a password.", 3e3) : kr("Please type a username.", 3e3) : kr("Username is invalid.", 3e3)
            }
        })), document.getElementById("login")["addEventListener"]("submit", kn), document["getElementById"]("register").addEventListener("submit", kn), document["getElementById"]("accsettinglink")["addEventListener"]("click", (function() {
            var e = n,
                t = document.getElementById("accountsettings");
            t.style["display"] = "block" == t["style"]["display"] ? "none" : "block", document.getElementById("optionsmenu")["scrollTop"] = t["clientHeight"] - 60
        })), document["getElementById"]("changenameform")["addEventListener"]("submit", kn), document["getElementById"]("submitnamechange")["addEventListener"]("click", (function(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document.getElementById("chngusername"),
                    o = document["getElementById"]("chngeusrpass");
                Sn["test"](r["value"]) ? 0 != r.value["length"] ? Je != r.value ? 0 != o["value"]["length"] ? (En(!0), a["send"](Gr({
                    namechange: [r.value, o["value"]]
                }))) : kr("Please type your password.", 3e3) : kr("You have typed in your current username.", 3e3) : kr("Please type a new username.", 3e3) : kr("Username is invalid.", 3e3)
            }
        })), document.getElementById("changepassform")["addEventListener"]("submit", kn), document["getElementById"]("submitpasschange")["addEventListener"]("click", (function(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document["getElementById"]("oldpass"),
                    o = document["getElementById"]("newpass"),
                    i = document["getElementById"]("newpass2");
                0 != r["value"].length ? 0 != o["value"]["length"] ? 0 != i.value["length"] ? o["value"] == i.value ? (En(!0), a["send"](Gr({
                    passchange: [r["value"], o["value"]]
                }))) : kr("New passwords do not match.", 3e3) : kr("Please type your new password again.", 3e3) : kr("Please type your new password.", 3e3) : kr("Please type your password.", 3e3)
            }
        })), document["getElementById"]("delaccountform")["addEventListener"]("submit", kn), document["getElementById"]("deleteaccount")["addEventListener"]("click", (function(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document["getElementById"]("deletepassword");
                0 != r["value"]["length"] ? (En(!0), a["send"](Gr({
                    deleteaccount: r.value
                }))) : kr("Please type your password.", 3e3)
            }
        })), dt.protect.addEventListener("click", (function(e) {
            var t = n;
            rt = e["target"]["checked"], dt["protectOwner"].checked = !1, Ie = !0
        })), dt["protectOwner"].addEventListener("click", (function(e) {
            var t = n;
            rt = e["target"]["checked"], dt["protect"].checked = !1, Ie = !0
        })), dt["clear"]["addEventListener"]("click", (function(e) {
            var t = n;
            ot = e["target"]["checked"], at = !1, Ie = !0
        })), dt["readOnly"]["addEventListener"]("click", (function(e) {
            var t = n;
            a.send(Gr({
                ro: e["target"]["checked"]
            }))
        })), dt["private"]["addEventListener"]("click", (function(e) {
            var t = n;
            a["send"](Gr({
                priv: e["target"].checked
            }))
        })), dt["hideCursors"]["addEventListener"]("click", (function(e) {
            var t = n;
            a.send(Gr({
                ch: e["target"]["checked"]
            }))
        })), dt.disableChat["addEventListener"]("click", (function(e) {
            var t = n;
            a["send"](Gr({
                dc: e["target"]["checked"]
            }))
        })), dt["disableColour"].addEventListener("click", (function(e) {
            var t = n;
            a["send"](Gr({
                dcl: e["target"].checked
            }))
        })), dt["disableBraille"].addEventListener("click", (function(e) {
            var t = n;
            a["send"](Gr({
                db: e["target"]["checked"]
            }))
        })), document["getElementById"]("addmemberbtn")["addEventListener"]("click", (function(e) {
            var t = n;
            e["preventDefault"](), document["getElementById"]("optionsmenu");
            var r = document["getElementById"]("inputmember"),
                o = document["getElementById"]("memberlist"),
                i = r["value"]["toLowerCase"]();
            r["value"] = "", (i["length"] = function(e) {
                for (var n = t, r = document["getElementById"]("memberlist"), a = 0; a < r["childElementCount"]; a++)
                    if (r["children"][a]["innerText"] == e) return !0;
                return !1
            }(i) || i == Je) || (Sn["test"](i) ? o["childElementCount"] >= 20 ? kr("You cannot add more than 20 members.", 3e3) : a["send"](Gr({
                addmem: i
            })) : kr("Username is invalid.", 3e3))
        })), ee["addEventListener"]("click", (function(e) {
            var t = n,
                r = document.getElementById("deletewallconfirm");
            if (null == r) {
                var o = document["createElement"]("br");
                return e.target["parentNode"]["insertBefore"](o, e.target.nextSibling), (r = document["createElement"]("input")).type = "text", r["placeholder"] = "type 'confirm' here", r["maxLength"] = 7, r.id = "deletewallconfirm", o["parentNode"].insertBefore(r, o["nextSibling"]), void r["focus"]()
            }
            "confirm" == r["value"].toLowerCase() ? (r.parentElement["removeChild"](r["previousSibling"]), r["parentNode"].removeChild(r), a.send(Gr({
                dw: 0
            })), Hn("textwall", "main"), kr("Deleting wall...", 3e3)) : kr("Please type 'confirm' in the text box if you would like to delete your wall.", 3e3)
        })), document["getElementById"]("l").addEventListener("click", (function(e) {
            var t = n;
            h && a["send"](Gr({
                l: e["target"]["checked"]
            }))
        })), document["getElementById"]("refresh").addEventListener("click", (function() {
            var e = n;
            if (h) {
                document["getElementById"]("admintable")["innerHTML"] = "";
                var t = !1;
                for (const n of We["keys"]()) Mn(n), t = !0;
                if (t) {
                    var r = document.getElementById("optionsmenu");
                    r.scrollTop = r["scrollHeight"]
                }
            }
        })), document["getElementById"]("sendalert")["addEventListener"]("click", (function() {
            var e = n,
                t = document.getElementById("alerttext")["value"];
            h && 0 != t.length && a["send"](Gr({
                alert: t
            }))
        })), document["getElementById"]("reload")["addEventListener"]("click", (function() {
            h && a.send(Gr({
                reload: !0
            }))
        })), document["getElementById"]("delete")["addEventListener"]("click", (function() {
            var e = n;
            if (h) {
                var t = document["getElementById"]("deletename")["value"];
                0 != t["length"] && a["send"](Gr({
                    aaa: t
                }))
            }
        })), document.getElementById("free").addEventListener("click", (function() {
            var e = n;
            if (h) {
                var t = document["getElementById"]("freename")["value"];
                0 != t.length && a["send"](Gr({
                    aaaa: t
                }))
            }
        })), w["setAttribute"]("id", "textarea"), i["setAttribute"]("id", "clipboard");
        var Sn = /^[\w.-]+$/;
        const In = document["getElementById"]("chat"),
            Cn = document["getElementById"]("unread");

        function An() {
            var e = n,
                t = document["getElementById"]("chatbox");
            t.scrollTop = t["scrollHeight"]
        }

        function Bn() {
            var e = n,
                t = document.getElementById("chatbox");
            null != t["lastElementChild"] && "HR" != t.lastElementChild["tagName"] && (t.appendChild(document.createElement("hr")), An())
        }

        function Tn(e) {
            var t = n;
            if (e["isTrusted"]) {
                var r = document["getElementById"]("chatmsg");
                An(), _e + 300 > performance["now"]() || (/^[\s?]*$/.test(r.value) ? r["value"] = "" : (a.send(Gr({
                    msg: r["value"]["substr"](0, 180)
                })), _e = performance["now"](), r["value"] = "", r["focus"]()))
            }
        }

        function Fn() {
            var e = n,
                t = document["getElementsByClassName"]("msgcontainer")[0];
            dt.readOnly["checked"] && 0 == H || z && "" == Je ? t["classList"]["add"]("hidden") : t["classList"]["remove"]("hidden")
        }

        function Pn(e) {
            var t = n;
            e["preventDefault"](), Hn(e["target"]["innerText"]["toLowerCase"](), "main") && dr(0, 0)
        }

        function Ln(e, t, r) {
            var a = n;
            r ? (et["offset"].x = e, et["offset"].y = t) : (et["offset"].x = Math.ceil(e), et["offset"].y = Math["ceil"](t)), er(), Ze["offset"].x = et["offset"].x, Ze["offset"].y = et["offset"].y;
            var o = et["coords"].x,
                i = et["coords"].y;
            et.coords.x = Math["floor"](window["innerWidth"] / mt / 20 - et["offset"].x / 10 / m), et["coords"].y = Math["floor"](window["innerHeight"] / mt / 40 - et["offset"].y / 20 / m), nr(), qe = o != et["coords"].x || i != et.coords.y
        }

        function On() {
            var e = n,
                t = m;
            if (m = devicePixelRatio * mt, E["width"] = Math["round"](window.innerWidth * devicePixelRatio), E["height"] = Math["round"](window.innerHeight * devicePixelRatio), E["style"]["width"] = Math["round"](E["width"] / devicePixelRatio) + "px", E.style["height"] = Math.round(E["height"] / devicePixelRatio) + "px", S["imageSmoothingEnabled"] = !1, Ie = !0, t != m) {
                he(!1);
                var r = Math.floor((et["offset"].x - E["width"] / 2) / t),
                    a = Math["floor"]((et["offset"].y - E["height"] / 2) / t);
                Ln((r + window["innerWidth"] / mt / 2) * m, (a + window.innerHeight / mt / 2) * m), kt(ae)
            }
        }

        function Rn() {
            var e = n,
                t = y;
            "textwall" != J && (t = "~" + J, "main" != $ && (t += "/" + $)), null == a || a["readyState"] == a["CLOSED"] ? document["title"] = y + " (disconnected)" : document.title = p ? "textwall" != J ? t : y : t + " (" + $e + " nearby)"
        }

        function Dn(e) {
            var t = n;
            Pe = [], Le["clear"]();
            var r = [];
            for (const e of Te["keys"]()) {
                var a = Pt(e);
                r.push(a[0], a[1])
            }
            for (var o = cn(r), i = 0; i < o["length"]; i++) {
                var c = o[i][1],
                    l = r[c] + "," + r[c + 1],
                    u = Te["get"](l);
                e ? u["protected"] && Dt(l, !1) : u["empty"] || Dt(l, !1)
            }
        }
        var Nn = "" != siteKey,
            jn = !1;

        function Un() {
            var e = n;
            if (document["getElementById"]("connecting1").innerText = "Connected.", document["getElementById"]("connecting2")["innerText"] = "", document["getElementById"]("admin")["style"].display = "none", Nn && "" != siteKey) return document["getElementById"]("connecting2").innerText = "Please complete the captcha below.", void grecaptcha.ready((function() {
                var t = e,
                    n = document["createElement"]("div");
                n.id = "recaptcha", l["appendChild"](n), grecaptcha.render("recaptcha", {
                    sitekey: siteKey,
                    callback: function(e) {
                        a.send(Gr({
                            verify: e
                        }))
                    }
                })
            }));
            "" == Je && null != localStorage.getItem("username") && null != localStorage["getItem"]("token") && (En(!0), a["send"](Gr({
                token: [localStorage["getItem"]("username"), localStorage["getItem"]("token")]
            })));
            var t = "textwall",
                r = "main",
                o = location["pathname"].split("/")["splice"](1, 2);
            o[0].startsWith("~") && "" == (t = o[0]["replace"]("~", "")) && (t = "textwall"), 2 == o["length"] && (r = o[1]), Hn(t, r)
        }

        function Hn(e, t) {
            var r = n;
            return !(J == e && $ == t || Q || (Q = !0, e = e["toLowerCase"](), t = t.toLowerCase(), clearInterval(Ee), clearInterval(Se), xr(), Bn(), an = null, a.send(Gr({
                j: [e, t]
            })), ir(), Te["clear"](), We["clear"](), Fe = [], 0))
        }

        function Wn() {
            var e = n,
                t = "Connection lost.";
            jn && (t = "CAPTCHA failed."), l["innerHTML"] = "", document["getElementById"]("connecting1")["innerText"] = t, document["getElementById"]("connecting2").innerText = "Click here to reconnect.", Nn = !0, Rn(), h = !1, un = !1, $ = "", J = "", Bn(), An(), c["style"]["display"] = "flex", setTimeout((function() {
                var t = e;
                c.style["opacity"] = "100%"
            }), 50), clearInterval(Ee), clearInterval(Se), xr(), bt(!1), c["onclick"] = oa
        }

        function Kn(e) {
            var t = n,
                r = new Uint8Array(e.data).buffer,
                a = _r(new Uint8Array(r));
            switch (Object["keys"](a)[0]) {
                case "verify":
                    var i = a.verify;
                    Nn = !i, jn = !i, l["innerHTML"] = "", i && Un();
                    break;
                case "b":
                    var u = a.b;
                    an = {
                        minx: u[0],
                        maxx: u[1],
                        miny: u[2],
                        maxy: u[3]
                    }, tr(), Ie = !0;
                    break;
                case "j":
                    var s = a.j;
                    J = s[0], $ = s[1], Rn(), "textwall" == J && (dt["private"]["disabled"] = !0), "textwall" != J ? "main" != $ ? (o = "/~" + J + "/" + $, history.pushState({}, null, o)) : (o = "/~" + J, history["pushState"]({}, null, o)) : (o = "/", Qr().startsWith("~") && history["pushState"]({}, null, o), ee.style["display"] = "none"), un = !1, Ee = setInterval(sn, 250), Se = setInterval(fn, 2e3), sn(), xr(), c.style["opacity"] = "0%", nt = !1, it = {}, E["style"]["cursor"] = "text", We["clear"](), Fe = [], Q = !1, Jn(), ft.showchat["checked"] && In.classList.remove("hidden"), b.classList["remove"]("hidden"), _["innerHTML"] = "", Ke = !0, Ye = !0, Xe = !0, setTimeout((function() {
                        var e = t;
                        c.style["display"] = "none"
                    }), 500);
                    break;
                case "alert":
                    kr(a["alert"], 8e3);
                    break;
                case "online":
                    Qe = a["online"], Ge["title"] = Qe + " online";
                    break;
                case "e":
                    var f = a.e.e;
                    null == f && (f = a.e);
                    for (var d = 0; d < f["length"]; d++) {
                        var v = (k = 20 * f[d][0]) + "," + (S = 10 * f[d][1]);
                        if (Te["has"](v) && null != (I = Te["get"](v))["txt"])
                            for (var m = 2; m < f[d]["length"]; m += 3) {
                                var y = String.fromCodePoint(f[d][m]),
                                    p = f[d][m + 1],
                                    g = f[d][m + 2];
                                I["txt"][p] == y && I["clr"][p] == g || (I["txt"][p] = y, I["clr"][p] = g, Nt(v, Jt(p))), setTimeout(or, (m - 2) / 3 * 25, k + (p - 20 * Math.floor(p / 20)), S + Math["floor"](p / 20), g, a.e.a)
                            }
                    }
                    break;
                case "chunks":
                    var x = (a = a.chunks)["length"];
                    for (d = 0; d < x; d += 5) {
                        var w = (k = 20 * a[d]) + "," + (S = 10 * a[d + 1]);
                        if (Te["has"](w))
                            if ((I = Te["get"](w)).coords = [k, S], I.protected = q(a[d + 4]), 0 !== a[d + 2])
                                for (Dt(w, !0), I["txt"] = Array.from(a[d + 2]), I["clr"] = Array["from"](a[d + 3]), m = 0; m < 200; m++) I["clr"][m] = I["clr"][m].codePointAt() - ge;
                            else I["txt"] = ut["slice"](), I["clr"] = st["slice"](), I["empty"] = K(I["protected"])
                    }
                    var M = ln["length"];
                    for (d = 0; d < M; d += 2) {
                        var k, S;
                        w = (k = 20 * ln[d]) + "," + (S = 10 * ln[d + 1]), Te["has"](w) && null == (I = Te["get"](w))["txt"] && Te["set"](w, {
                            txt: ut["slice"](),
                            clr: st.slice(),
                            empty: !0,
                            coords: [k, S],
                            protected: 0
                        })
                    }
                    un = !1, Ie = !0;
                    break;
                case "p":
                    var I, C = a.p;
                    if (w = C[0], null != (I = Te["get"](w))) {
                        var A = C[1];
                        null == (p = C[2]) ? I["protected"] = A : (K(I.protected) && (I["protected"] = X(I["protected"])), I["protected"][p] = A, -1 != Y(I["protected"]) && (I.protected = A)), Nt(w, !0)
                    }
                    break;
                case "c":
                    var B = (u = a.c)[4];
                    ! function(e, n, r, a, o) {
                        for (var i = t, c = n; c <= a; c++)
                            for (var l = e; l <= r; l++) {
                                var u = 20 * Math["floor"](l / 20),
                                    s = 10 * Math["floor"](c / 10),
                                    f = u + "," + s;
                                if (Te["has"](f)) {
                                    var d = Te["get"](f);
                                    if (null != d["txt"]) {
                                        var v = l - u + 20 * (c - s);
                                        o && !K(d["protected"]) && 2 == d["protected"][v] || (d["txt"][v] = " ", d["clr"][v] = 0, Dt(f, Jt(v)))
                                    }
                                }
                            }
                        Ie = !0
                    }(u[0], u[1], u[2], u[3], B);
                    break;
                case "cu":
                    var T = a.cu,
                        F = T.id;
                    We["has"](F) || We["set"](F, {
                        c: 0,
                        n: "",
                        l: [0, 0],
                        rawx: 0,
                        rawy: 0
                    });
                    var P = We["get"](F);
                    null != T.l && (P.l = T.l, ft.smoothcursors["checked"] || (P["rawx"] = P.l[0], P["rawy"] = P.l[1])), null != T.c && (P.c = T.c), null != T.n && (P.n = T.n), Ie = !0, Jn();
                    break;
                case "msg":
                    var L = a["msg"];
                    ! function(e, n, r, a) {
                        var o = t,
                            i = document["getElementById"]("chatbox"),
                            c = document["createElement"]("p"),
                            l = document["createElement"]("a");
                        l.innerText = e, l["style"]["color"] = "#FFFFFF" == xe[n] ? "#222222" : xe[n], a && (l["href"] = "/~" + e, l["addEventListener"]("click", Pn)), c["appendChild"](l), c["appendChild"](document["createTextNode"](" ~ " + r));
                        var u = Math["abs"](i.scrollHeight - i["scrollTop"] - i["clientHeight"]) < 5;
                        i["appendChild"](c), u && An(), In.classList.contains("open") || Cn.classList["add"]("show")
                    }(L[0], L[1], L[2], L[3]);
                    break;
                case "rc":
                    We.delete(a.rc), Ie = !0, Jn();
                    break;
                case "ro":
                    var O = a.ro;
                    dt.readOnly["checked"] = O, O && kr("This wall is in read-only mode.", 3e3), Fn();
                    break;
                case "priv":
                    dt["private"]["checked"] = a["priv"],
                        function() {
                            var e = t;
                            if (null != Z)
                                for (var n = 0; n < Z["length"]; n += 2)
                                    if (Z[n] == $) return Z[n + 1] = dt.private["checked"], void zn(Z)
                        }();
                    break;
                case "ch":
                    var R = a.ch;
                    dt["hideCursors"]["checked"] = R, h || (ft["showothercurs"]["disabled"] = R, ft["showothercurs"]["checked"] = !R && "false" != localStorage["getItem"]("showothercurs")), Ie = !0;
                    break;
                case "dc":
                    var D = a.dc;
                    dt["disableChat"].checked = D, ft["showchat"]["disabled"] = D, D ? (ft.showchat["checked"] = !1, In["classList"]["add"]("hidden")) : (ft["showchat"]["checked"] = "false" != localStorage["getItem"]("showchat"), ft.showchat["checked"] && In["classList"]["remove"]("hidden"));
                    break;
                case "dcl":
                    var N = a["dcl"];
                    dt["disableColour"].checked = N, Pr(!!N || ft["disablecolour"]["checked"]);
                    break;
                case "db":
                    var j = a.db;
                    dt["disableBraille"]["checked"] = j;
                    break;
                case "l":
                    z = !0, document.getElementById("l").checked = !0, Fn();
                    break;
                case "perms":
                    H = a["perms"], V["style"]["display"] = t(2 == H || 1 == H ? 556 : 212), 2 == H ? (G["style"]["display"] = "block", ee["style"].display = "block") : (G["style"]["display"] = "none", ee.style["display"] = "none"), document["getElementById"]("protectowneroption")["style"]["display"] = t(1 != H || h ? 556 : 212), dt.readOnly["disabled"] = dt["private"]["disabled"] = dt["hideCursors"]["disabled"] = dt["disableChat"]["disabled"] = dt["disableColour"]["disabled"] = dt["disableBraille"]["disabled"] = !(2 == H || h), h && (ee["style"]["display"] = "textwall" != J || Q ? "block" : "none"), 0 == H && (rt = !1, ot = !1), Ie = !0, Fn();
                    break;
                case "addmem":
                    Xn(a["addmem"]), optionsmenu["scrollTop"] = optionsmenu.clientHeight;
                    break;
                case "ml":
                    for (memberList = a.ml, document["getElementById"]("memberlist")["innerHTML"] = "", d = 0; d < memberList["length"]; d++) Xn(memberList[d]);
                    break;
                case "wl":
                    zn(Z = a.wl);
                    break;
                case "nametaken":
                    kr("Username is already in use.", 3e3), En(!1);
                    break;
                case "noreg":
                    kr("Registration is closed.", 3e3), En(!1);
                    break;
                case "wrongpass":
                    kr("Password is incorrect.", 3e3), En(!1);
                    break;
                case "loginfail":
                    kr("Username/Password is incorrect.", 3e3), En(!1);
                    break;
                case "tokenfail":
                    En(!1), localStorage["removeItem"]("username"), localStorage["removeItem"]("token");
                    break;
                case "namechanged":
                    En(!1), kr("Your username is now: " + (Je = a["namechanged"]), 3e3), localStorage["setItem"]("username", Je), Yn(), Ie = !0, Xe = !0;
                    break;
                case "passchanged":
                    kr("Password has been changed.", 3e3), En(!1);
                    break;
                case "accountdeleted":
                    kr("Your account has been deleted.", 3e3), En(!1), Xe = !0, bt(!0, !0);
                    break;
                case "cool":
                    kr("Rate limit", 3e3), En(!1);
                    break;
                case "token":
                    En(!1);
                    var U = a["token"];
                    Je = U[0], localStorage["setItem"]("username", Je), localStorage["setItem"]("token", U[1]), document["getElementById"]("login").style["display"] = "none", document["getElementById"]("register").style["display"] = "none", document["getElementById"]("loggedin")["style"].display = "block", Yn(), Ie = !0, Xe = !0;
                    break;
                case "admin":
                    a.admin ? (h = !0, document["getElementById"]("admin")["style"]["display"] = "block") : (h = !1, document["getElementById"]("admin")["style"]["display"] = "none");
                    break;
                case "t":
                    document["getElementById"]("t").value = a.t
            }
        }

        function Yn() {
            var e = n,
                t = document["getElementById"]("name");
            t["innerText"] = Je, t["href"] = "/~" + Je, t["onclick"] = function(e) {
                e.preventDefault(), Tr("~" + Je)
            }
        }

        function Xn(e) {
            var t = n,
                r = document["getElementById"]("memberlist"),
                a = document["createElement"]("div");
            a["classList"]["add"]("member"), a.innerText = e, a["addEventListener"]("click", qn), r["appendChild"](a)
        }

        function qn(e) {
            var t = n,
                r = e["target"]["innerText"];
            a["send"](Gr({
                rmmem: r
            })), e["target"].remove()
        }

        function zn(e) {
            for (var t = n, r = {}, a = [], o = !1, i = 0; i < e["length"]; i += 2) {
                var c = e[i],
                    l = e[i + 1];
                "main" == c ? o = !0 : a["push"](c), r[c] = l
            }
            a["sort"](), o && a["unshift"]("main"), _["innerHTML"] = "", _["appendChild"](document["createElement"]("hr"));
            var u = document["createElement"]("span");
            u["innerText"] = J + "'s walls", _["appendChild"](u);
            var s = _.appendChild(document["createElement"]("ul"));
            for (s["classList"]["add"]("walllist"), i = 0; i < a.length; i++) {
                l = r[c = a[i]];
                var f = s["appendChild"](document.createElement("li")),
                    d = document.createElement("a"),
                    v = document["createElement"]("img");
                l ? (v["src"] = "/static/lock.svg", v.alt = v["title"] = "Private") : (v["src"] = "/static/lock_open.svg", v["alt"] = v["title"] = "Public");
                const e = "~" + J + ("main" == c ? "" : "/" + c);
                d["appendChild"](v), d["appendChild"](document["createTextNode"](e)), d.href = "/" + d["innerText"], d["classList"]["add"]("buttonlink"), c == $ && d.classList["add"]("bold"), d["addEventListener"]("click", (function(t) {
                    t.preventDefault(), Tr(e)
                })), f["appendChild"](d), s["appendChild"](f)
            }
            if (J == Je["toLowerCase"]()) {
                var m = _["appendChild"](document["createElement"]("form"));
                m["style"]["display"] = "flex", m["style"]["justifyContent"] = "space-between";
                var h = m["appendChild"](document["createElement"]("input"));
                h.type = "text", h["placeholder"] = "Create a new wall", h["maxLength"] = 24, h["style"]["width"] = "100%";
                var y = m["appendChild"](document.createElement("input"));
                y["type"] = "submit", y["value"] = "Create", y.addEventListener("click", (function(e) {
                    var n = t;
                    e["preventDefault"]();
                    var r = h.value;
                    h["value"] = "", Wt["test"](r) ? (Hn(J, r), dr(0, 0), k["classList"]["remove"]("open")) : kr("Invalid wall name", 2e3)
                }))
            }
        }

        function Jn() {
            var e = n;
            $e = We["size"], Ge.innerText = $e + " nearby", document["getElementById"]("chatmsg")["placeholder"] = 0 == $e ? "chat to nobody" : 1 == $e ? "chat to 1 other user" : "chat to " + $e + " other users", p || Rn()
        }
        var $n, Qn = !1;

        function Vn(e) {
            var t = n;
            ct["unshift"]([e["clientX"] * m / mt, e["clientY"] * m / mt, performance["now"]()]), ct["length"] > 4 && ct["pop"]()
        }
        var Gn = !1,
            _n = 0;

        function Zn(e) {
            var t = n;
            e.isTrusted && (e.preventDefault(), e["pointerId"] == $n && ($n = void 0))
        }

        function er() {
            var e = n;
            null != an && (et["offset"].x = Math.max(Math["round"](10 * an.minx * m), et["offset"].x), et["offset"].x = Math["min"](Math.round(10 * an["maxx"] * m + E["width"]), et.offset.x), et.offset.y = Math.max(Math["round"](20 * an["miny"] * m), et.offset.y), et["offset"].y = Math["min"](Math["round"](20 * an["maxy"] * m + E["height"]), et["offset"].y))
        }

        function tr() {
            var e = n;
            null != an && (De.x = Math["max"](Math["min"](De.x, an.maxx), an["minx"] - 1), De.y = Math.max(Math.min(De.y, an["maxy"]), an["miny"] - 1))
        }

        function nr() {
            var e = n;
            null != an && (et["coords"].x = Math.max(Math["min"](et["coords"].x, an["maxx"]), an.minx - 1), et["coords"].y = Math["max"](Math["min"](et["coords"].y, an["maxy"]), an["miny"] - 1))
        }

        function rr(e) {
            var t = n;
            return {
                x: Math.floor((e["pageX"] * devicePixelRatio - et["offset"].x) / (10 * m)),
                y: Math["floor"]((e.pageY * devicePixelRatio - et.offset.y) / (20 * m))
            }
        }

        function ar() {
            var e = n;
            Ve["innerText"] = De.x + "," + -De.y, De.x + et["offset"].x / m / 10 <= 0 && Ln(10 * -De.x * m, et["offset"].y), De.x + et["offset"].x / m / 10 >= window["innerWidth"] / mt / 10 - 1 && Ln((10 * -De.x + window["innerWidth"] / mt - 10) * m, et["offset"].y), De.y + et["offset"].y / m / 20 <= 0 && Ln(et["offset"].x, 20 * -De.y * m);
            var t = window["innerWidth"] < 750 ? u["clientHeight"] : 0;
            De.y + et.offset.y / m / 20 >= (window.innerHeight - t) / mt / 20 - 1 && Ln(et["offset"].x, (20 * -De.y + window["innerHeight"] / mt - 20 - t / mt) * m), Ke = Ne.x != De.x || Ne.y != De.y || Ke, Ne.x = De.x, Ne.y = De.y, ft["smoothcursors"]["checked"] || (De.rawx = De.x, De.rawy = De.y), (Math["abs"](De["lastedit"].x - De.x) > 300 || Math.abs(De["lastedit"].y - De.y) > 300) && (De.start = De.x, ir()), De.x < De["start"] && (De["start"] = De.x), Ie = !0, localStorage["setItem"]("x", De.x), localStorage.setItem("y", De.y)
        }

        function or(e, t, r, a) {
            var o = n;
            ft["disablecolour"].checked && (r = 0), r = da(r)[0], Tt([e, t], Bt(20)) || ze["push"]([e, t, .1, r, a])
        }

        function ir() {
            Ue = [], He = []
        }
        E["addEventListener"]("touchstart", (function(e) {
            var t = n;
            2 === e["touches"].length && (Gn = !0, $n = void 0, _n = 0, i["blur"]())
        }), {
            passive: !0
        }), E["addEventListener"]("touchmove", (function(e) {
            var r = n;
            Gn && (function(e) {
                var n = t;
                if (e.touches["length"] > 1) {
                    var r = Math["sqrt"](sa(e["touches"][0]["pageX"] - e["touches"][1]["pageX"]) + sa(e["touches"][0].pageY - e["touches"][1]["pageY"]));
                    0 != _n && yt(vt - (_n - r) / 300, !0), $n = void 0, _n = r
                }
            }(e), i["blur"]())
        }), {
            passive: !0
        }), E["addEventListener"]("touchend", (function(e) {
            Gn && ($n = void 0, _n = 0, Gn = !1, i.blur())
        }));
        var cr = 0,
            lr = performance["now"](),
            ur = 0;
        const sr = [4, 5, 7, 8, 9, 18, 11, 20, 13, 28, 15];

        function fr(e, t, r, a) {
            var o = n;
            if (he(!1), performance["now"]() - lr >= 100 && (lr = performance.now(), cr = 0), !e || cr >= 3) return 0;
            cr++;
            var i = (e = Array.from(e)[0])["codePointAt"]();
            if (dt["disableBraille"].checked && la(i)) return 0;
            var c = 20 * Math.floor(De.x / 20),
                l = 10 * Math["floor"](De.y / 10),
                u = c + "," + l;
            if (!Te["has"](u)) return 0;
            var s = Te["get"](u),
                f = De.x - c + 20 * (De.y - l);
            if (!h) {
                if (null == s.txt || Q) return 0;
                if (z && "" == Je) return kr("Please log in before typing.", 3e3), 0;
                if (0 == H) {
                    if (dt.readOnly["checked"]) return 0;
                    if (K(s["protected"])) {
                        if (0 != s["protected"]) return 0
                    } else if (0 != s["protected"][f]) return 0
                }
                if (1 == H)
                    if (K(s["protected"])) {
                        if (2 == s["protected"]) return 0
                    } else if (2 == s.protected[f]) return 0
            }
            ft["rainbow"].checked && !r && (Fr(sr[ur]), ++ur == sr["length"] && (ur = 0));
            var d, v, m, y, p, g, x, w, b, M, k, E = 1,
                S = a ? 0 : ye(),
                I = fa(Ce, S),
                C = s["clr"][f],
                A = da(C),
                B = A[0],
                T = A[1],
                F = s["txt"][f];
            return F == e && C == I || hr(e, S) && hr(F, T) || (b = T, M = e, k = S, mr(F) && mr(M) && (2 & b) == (2 & k) && (1 & b) == (1 & k) && B == Ce) || (r ? (p = De.x, g = De.y, x = s["txt"][f], w = C, He["unshift"]([p, g, x, w]), He.length > 1e3 && He.pop()) : (d = De.x, v = De.y, m = s["txt"][f], y = C, Ue["unshift"]([d, v, m, y]), Ue.length > 1e3 && Ue.pop()), s["txt"][f] = e, s["clr"][f] = I, Fe["push"]([c / 20, l / 10, e["codePointAt"](), f, I]), E = 2, Nt(u, Jt(f))), De.lastedit.x = De.x, De["lastedit"].y = De.y, De.x += t, ar(), E
        }

        function dr(e, t) {
            var r = n;
            he(!1), De.x = e, De.y = t, tr(), Ln((10 * -De.x + window.innerWidth / mt / 2) * m, (20 * -De.y + window["innerHeight"] / mt / 2) * m), document["getElementById"]("tpword").value = "", document.getElementById("tpx")["value"] = 0, document["getElementById"]("tpy")["value"] = 0, xr(), ar(), dn(), fn()
        }

        function vr() {
            history.pushState({}, null, o)
        }

        function mr(e) {
            return " " == e || e == te
        }

        function hr(e, t) {
            return mr(e) && 0 == (2 & t) && 0 == (1 & t)
        }
        const yr = Math["log"](5 / 3) / 1e3;
        var pr = !1;

        function gr(e) {
            var t = n;
            if (!Re) {
                var r, a, o = (e = e["replace"](Ht, ""))["split"](ne),
                    i = !1;
                if (2 == o["length"] ? (i = !0, r = Array["from"](o[0]), a = Array["from"](o[1]), (r["length"] != a["length"] || ft["rainbow"]["checked"]) && (i = !1)) : (e = e["replace"](Ut, "   "), r = Array["from"](e)), 1 != r["length"]) {
                    if (Re = !0, !pr) {
                        pr = !0, De["start"] = De.x;
                        var c = Ce,
                            l = ye();
                        ! function e(n, o) {
                            var u = t;
                            if (n == r[u(692)] || !Re) return xr(), pr = !1, Fr(c), void pe(l);
                            if ("\n" == r[n]) return Er(), setTimeout(e, 20, n + 1, o);
                            var s, f, d = r[n];
                            if (i) {
                                var v = (s = a[n], f = s[u(356)](), ((f -= f < ge ? 65 : ge) < 0 || f > 495) && (f = 0), f),
                                    [m, h] = da(v);
                                hr(d, h) || Fr(m), pe(h)
                            }
                            switch (cr = 0, fr(d, 1)) {
                                case 0:
                                case 1:
                                    return setTimeout(e, 10, n + 1, o);
                                default:
                                    return setTimeout(e, 36 * Math[u(485)](Math.E, yr * o), n + 1, o + 1)
                            }
                        }(0, 0)
                    }
                } else fr(r[0], 1)
            }
        }

        function xr() {
            Re = !1
        }

        function wr() {
            var e = n,
                t = 20 * Math["floor"](De.x / 20),
                r = 10 * Math["floor"](De.y / 10),
                a = Te.get(t + "," + r);
            if (!a || null == a["txt"]) return !1;
            var o = De.x - t + 20 * (De.y - r);
            return [a.txt[o], a["clr"][o]]
        }

        function br(e) {
            var t = n;
            navigator["clipboard"] ? navigator.clipboard["writeText"](e) : (w["value"] = e, w["focus"](), w["select"](), document["execCommand"]("copy"))
        }

        function Mr(e) {
            var t = n;
            e["preventDefault"](), nt = !0, E["style"]["cursor"] = "crosshair", kr("Select an area to copy.", 1500)
        }

        function kr(e, t) {
            var r = n;
            clearTimeout(x), g["innerText"] = e, g["classList"]["add"]("toasting"), x = setTimeout((function() {
                var e = r;
                g["classList"]["remove"]("toasting")
            }), t)
        }

        function Er() {
            De.x = De.start, De.y++, tr(), ar()
        }
        null != navigator["clipboard"] && null != navigator["clipboard"]["readText"] || (document.getElementById("paste")["style"].display = "none");
        var Sr = 0;

        function Ir(e) {
            var t = n;
            switch (he(!1), (2 == e && 2 == Sr || 1 == e && 1 == Sr) && (e = 0), e) {
                case 0:
                    b["style"].transform = "translateX(-105%)";
                    break;
                case 1:
                    var r = document["getElementById"]("optionsmenu")["clientWidth"];
                    b["style"]["transform"] = "translateX(" + -r + "px)";
                    break;
                default:
                    b["style"]["transform"] = "translateX(0px)", k["classList"].contains("open") && k.classList["remove"]("open")
            }
            Sr = e, dn()
        }

        function Cr(e) {
            var t = n,
                r = document["createElement"]("div");
            r["classList"]["add"]("colour"), r.addEventListener("click", (function(t) {
                Fr(e), mn()
            })), r["setAttribute"]("id", e), r["style"]["backgroundColor"] = xe[e], r["title"] = we[e], M.appendChild(r)
        }

        function Ar() {
            var e = n;
            he(!1), k["classList"].contains("open") ? (k["classList"]["remove"]("open"), dn()) : (k.classList["add"]("open"), 2 == Sr && Ir(0), document["getElementById"]("tpword")["focus"]())
        }

        function Br(e) {
            return e.replace(/^\/|\/$/g, "")
        }

        function Tr(e) {
            var t = n,
                r = (e = (e = Br(e))["replace"](/\~\/*/, "~"))["split"]("/");
            if (e = r["shift"](), r["length"] > 0 && (e += "/" + r["shift"]()), (e = (e = Br(e))["toLowerCase"]()).startsWith("~") && "~main" != e) {
                var a = e.split("/"),
                    o = a[0]["replace"]("~", ""),
                    i = "main";
                a["length"] > 1 && (i = a[1]), Hn(o, i), dr(0, 0)
            } else {
                var c = Vr(e);
                dr(c.x, c.y), Hn("textwall", "main"), 0 == c.x && 0 == c.y ? vr() : history.pushState({}, null, e)
            }
            k["classList"]["remove"]("open")
        }

        function Fr(e) {
            var t = n;
            (ft.disablecolour["checked"] || dt.disableColour["checked"]) && (e = 0), Ce != e && (Ye = !0);
            var r = document["getElementById"](Ce);
            r.classList["remove"]("selected"), Ce = e, Ae = Be && 0 == Ce ? "rgba(255, 255, 255, 0.6)" : ua(xe[Ce], .6), (r = document.getElementById(Ce)).classList.add("selected"), r["offsetTop"] < M["scrollTop"] + 36 && (M["scrollTop"] = r["offsetTop"] - 36), r.offsetTop > M["scrollTop"] + M["clientHeight"] && (M.scrollTop = r["offsetTop"] - M["clientHeight"]), document["getElementById"]("theme-colour")["setAttribute"]("content", xe[e]), localStorage["setItem"]("col", e), Ie = !0
        }
        for (M.children["length"] > 0 && (a = !0), ue = 0; ue < xe.length; ue++) Cr(be[ue]);

        function Pr(e) {
            for (var t = n, r = 0; r < M["children"]["length"]; r++) "0" != M["children"][r].id && (e ? M.children[r]["classList"]["add"]("hidden") : M.children[r]["classList"].remove("hidden"));
            e && Fr(0)
        }

        function Lr(e) {
            var t = n;
            if (null != e) U = e;
            else switch (U) {
                case 0:
                    U = 1;
                    break;
                case 1:
                    U = 2;
                    break;
                case 2:
                    U = 0
            }
            0 == U && (Be = !1, document["getElementById"]("themeico")["src"] = "/static/sun.svg", A = I, B = C), 1 == U && (Be = !0, document["getElementById"]("themeico")["src"] = "/static/moon.svg", A = "#000000", B = "#292929"), 2 == U ? (Be = O["checked"], document["getElementById"]("themeico")["src"] = "/static/star.svg", A = P["value"], B = L["value"], R["classList"].remove("hidden")) : R["classList"]["add"]("hidden"), F = ia(B, 10), T = ia(B, -15), localStorage.setItem("theme", U), Ie = !0, dn(), Fr(Ce), Dn()
        }

        function Or(e) {
            var t = n;
            e["target"] == P ? (A = P["value"], Dn()) : e["target"] == L && (B = L["value"], F = ia(B, 10), T = ia(B, -15), Dn(!0)), localStorage["setItem"]("customtheme", JSON["stringify"]({
                primary: P["value"],
                secondary: L["value"],
                texttheme: O["checked"]
            }))
        }

        function Rr(e) {
            var t = n;
            Dr(e["target"]["parentElement"].id), dn()
        }

        function Dr(e, t) {
            var r = n,
                a = fe[e];
            a["enabled"] = null != t ? t : !a["enabled"], a["enabled"] ? a.el.classList.add("enabled") : a.el.classList.remove("enabled"), localStorage.setItem("dec", ye())
        }

        function Nr(e, t, r) {
            var a = n;
            if (Math["abs"](e - t) > .1) {
                for (var o = 0; o < r; o++) e += (t - e) / 20;
                return Ie = !0, Math["round"](100 * e) / 100
            }
            return e != t ? (Ie = !0, Math["round"](e)) : e
        }
        setInterval((function() {
            var e = n;
            if (a && a["readyState"] == a["OPEN"]) {
                if ((Ke || Ye || Xe || qe) && 0 != Te["size"]) {
                    var t = {};
                    Ke && (t.l = [De.x, De.y]), Ye && (t.c = Ce), Xe && (t.n = ft["anonymous"]["checked"]), qe && (nr(), t.p = [et["coords"].x, et["coords"].y]), a["send"](Gr({
                        ce: t
                    })), Ke = !1, Ye = !1, Xe = !1, qe = !1
                }
                if (Fe["length"] > 0) {
                    var r;
                    r = Fe["splice"](0, 5), t = [];
                    e: for (var o = 0; o < r["length"]; o++) {
                        for (var i = r[o][0], c = r[o][1], l = r[o][2], u = r[o][3], s = r[o][4], f = 0; f < t.length; f++)
                            if (t[f][0] == i && t[f][1] == c) {
                                t[f]["push"](l, u, s);
                                continue e
                            } if (t["push"]([i, c, l, u, s]), 4 == t["length"] && o + 1 < r["length"]) {
                            for (f = o + 1; f < r["length"]; f++) Fe["unshift"](r[f]);
                            break
                        }
                    }
                    a.send(Gr({
                        e: t
                    }))
                }
            }
        }), 200);
        var jr = performance["now"](),
            Ur = 100,
            Hr = performance["now"]() + 1e3;
        window["requestAnimationFrame"]((function e() {
            var t = n,
                r = Math["min"](Math["ceil"](performance["now"]() - jr), 100);
            if (jr = performance["now"](), (r < Ur || jr > Hr) && (Ur = r, Hr = performance["now"]() + 1e3), null != lt) {
                Ie = !0, Ln(et["offset"].x + lt.dx, et.offset.y + lt.dy, !0), 0 == lt.dx && 0 == lt.dy && Ln(et["offset"].x, et["offset"].y);
                for (var a = 0; a < r; a++) lt.dx *= .993, lt.dy *= .993;
                Math.abs(lt.dx) <= .3 && (lt.dx = 0), Math["abs"](lt.dy) <= .3 && (lt.dy = 0), 0 == lt.dy && 0 == lt.dx && (lt = null)
            }
            if (ft["smoothcursors"]["checked"]) {
                De["rawx"] = Nr(De.rawx, De.x, r), De["rawy"] = Nr(De.rawy, De.y, r);
                var o = Bt(20);
                for (const e of We["values"]()) null == e["rawx"] || null == e.rawy || Tt(e.l, o) || (e["rawx"] = Nr(e["rawx"], e.l[0], r), e["rawy"] = Nr(e["rawy"], e.l[1], r))
            }
            if (0 != ze["length"]) {
                for (var c = 0; c < ze["length"]; c++)
                    if (ze[c][2] < .01) ze.splice(c, 1);
                    else
                        for (a = 0; a < r; a++) ze[c][2] *= .995;
                Ie = !0
            }
            if (Ie && (function() {
                    var e = t;
                    S["setTransform"](1, 0, 0, 1, 0, 0), S.fillStyle = B, S["fillRect"](0, 0, E["width"], E["height"]), S["translate"](Math.ceil(et.offset.x), Math["ceil"](et["offset"].y));
                    const n = 10 * m,
                        r = 20 * m,
                        a = Math["round"](5 * m);
                    var o = Bt(20),
                        i = Bt(d);
                    for (const t of Te["keys"]()) Tt(c = Pt(t), o) ? Tt(c, i) && delete Te["get"](t).img : At(t, c);
                    if (ft["showothercurs"].checked && (!dt["hideCursors"]["checked"] || h)) {
                        Ct(S);
                        for (const t of We["values"]()) {
                            var c = t.l;
                            if (!Tt(c, o)) {
                                var l = Math.round(10 * t["rawx"] * m),
                                    u = Math.round(20 * t["rawy"] * m);
                                t["highlighted"] && (S["fillStyle"] = "rgba(239, 255, 71, 0.5)", S["fillRect"](l - 2 * m, u - 2 * m, Math.ceil(n) + 4 * m, Math["round"](r) + 4 * m));
                                var s = t.c;
                                ft["disablecolour"]["checked"] && (s = 0), 0 == s && Be && (s = xe["length"]), S.fillStyle = ke[s], Ot(l, u, n, r), !ft.shownametags.checked || Ft(c) && 0 == H || Lt(t.n, l, u, a)
                            }
                        }
                    }
                    for (var f = 0; f < ze["length"]; f++) {
                        0 == (s = ze[f][3]) && Be && (s = xe["length"]), S["fillStyle"] = ke[s].replace("0.2", ze[f][2]);
                        var v = 10 * ze[f][0] * m,
                            y = 20 * ze[f][1] * m;
                        if (ft["showothercurs"].checked && h) {
                            var p = We["get"](ze[f][4]);
                            null != p && p["highlighted"] && (S["lineWidth"] = 3 * m, S["strokeStyle"] = s == xe["length"] ? "#FFFFFF" : xe[s], S["beginPath"](), S["moveTo"](Math.round(10 * p["rawx"] * m + n / 2), Math["round"](20 * p.rawy * m + r)), S["lineTo"](Math["round"](v + n / 2), Math["round"](y + r)), S["stroke"]())
                        }
                        S["fillRect"](v, y, n, r)
                    }
                    if (S["fillStyle"] = Ae, Ot(l = Math["round"](10 * De["rawx"] * m), u = Math.round(20 * De["rawy"] * m), n, r), ft["shownametags"]["checked"] && !ft["anonymous"]["checked"] && (Ct(S), Lt(Je, l, u, a)), nt && it["start"] && it.end) {
                        S["fillStyle"] = "rgba(0,120,212,0.5)", l = Math["round"](10 * Math.min(it["start"].x, it["end"].x) * m), u = Math["round"](20 * Math["min"](it["start"].y, it["end"].y) * m);
                        var g = Math.round(10 * Math["max"](it["start"].x, it["end"].x) * m - l + 10 * m),
                            x = Math["round"](20 * Math["max"](it["start"].y, it["end"].y) * m - u + 20 * m);
                        S["fillRect"](l, u, g, x)
                    }
                    if (rt || ot)
                        if (S.fillStyle = rt && ot ? "rgba(195,219,224,0.5)" : e(rt ? 698 : 323), at) S["fillRect"](10 * je.x * m, 20 * je.y * m, 10 * m, 20 * m);
                        else {
                            var w = 20 * Math["floor"](je.x / 20),
                                b = 10 * Math.floor(je.y / 10);
                            S.fillRect(10 * w * m, 20 * b * m, 200 * m, 200 * m)
                        }
                }(), Ie = !1, "\n\n\n\n\n\n\n\n\n" != i.value && (i.value = "\n\n\n\n\n\n\n\n\n"), i["selectionEnd"] = 4), 0 != Le["size"]) {
                for (var l = jr + (Ur - 2);;) {
                    var u = Pe["shift"](),
                        s = Le["get"](u);
                    if (Le.delete(u), tn(u, s), 0 == Le["size"] || performance["now"]() >= l) break
                }
                Ie = !0
            }
            window["requestAnimationFrame"](e)
        })), null != localStorage["getItem"]("x") && (De.x = parseInt(localStorage["getItem"]("x"))), null != localStorage.getItem("y") && (De.y = parseInt(localStorage["getItem"]("y"))), null != localStorage.getItem("col") ? Fr(parseInt(localStorage["getItem"]("col"))) : Fr(0), null != localStorage["getItem"]("dec") && pe(localStorage["getItem"]("dec")), null != localStorage["getItem"]("customfont") && (D.value = localStorage.getItem("customfont")), null != localStorage["getItem"]("customfontsize") && (N["value"] = localStorage.getItem("customfontsize")), null != re[localStorage["getItem"]("font")] && kt(localStorage["getItem"]("font"));
        var Wr = Object["keys"](ft);
        for (ue = 0; ue < Wr["length"]; ue++) {
            var Kr = Wr[ue];
            null != localStorage["getItem"](Kr) && (ft[Kr]["checked"] = "true" == localStorage["getItem"](Kr))
        }
        if (ft.showchat["checked"] || In["classList"]["add"]("hidden"), ft["disablecolour"]["checked"] && Pr(!0), null != localStorage["getItem"]("customtheme")) {
            var Yr = localStorage["getItem"]("customtheme");
            try {
                var Xr = JSON["parse"](Yr);
                null != Xr["primary"] && (P["value"] = Xr["primary"]), null != Xr["secondary"] && (L["value"] = Xr["secondary"]), null != Xr["texttheme"] && (O["checked"] = Xr.texttheme)
            } catch (e) {}
        }
        if (null != localStorage.getItem("theme")) {
            var qr = localStorage["getItem"]("theme");
            Lr(0 == qr || 1 == qr || 2 == qr ? Number(qr) : U)
        }
        var zr, Jr = (zr = {}, window.location["href"]["replace"](/[?&]+([^=&]+)=([^&]*)/gi, (function(e, t, n) {
                zr[t] = n
            })), zr),
            $r = !1;

        function Qr() {
            return Br(location.pathname)
        }

        function Vr(e) {
            var r = n;
            if ("" == (e = decodeURI(e.toLowerCase())) || "~main" == e) return {
                x: 0,
                y: 0
            };
            var a = function(e) {
                    for (var n, r = t, a = [], o = e + "", i = 0; i < o.length;) a[255 & i] = 255 & (n ^= 19 * a[255 & i]) + o["codePointAt"](i++);
                    var c, l = a["length"],
                        u = this,
                        s = 0,
                        f = (i = u.i = u.j = 0, u.S = []);
                    for (l || (a = [l++]); s < 256;) f[s] = s++;
                    for (s = 0; s < 256; s++) f[s] = f[i = 255 & i + a[s % l] + (c = f[s])], f[i] = c;
                    var d = function(e) {
                        for (var t, n = 0, r = u.i, a = u.j, o = u.S; e--;) t = o[r = 255 & r + 1], n = 256 * n + o[255 & (o[r] = o[a = 255 & a + t]) + (o[a] = t)];
                        return u.i = r, u.j = a, n
                    };
                    return d(256),
                        function() {
                            for (var e = d(6), t = 281474976710656, n = 0; e < 4503599627370496;) e = 256 * (e + n), t *= 256, n = d(1);
                            for (; e >= 9007199254740992;) e /= 2, t /= 2, n >>>= 1;
                            return (e + n) / t
                        }
                }(e),
                o = null == an ? 2e5 : 2 * an.maxx,
                i = null == an ? 2e5 : 2 * an["maxy"];
            return {
                x: 20 * Math["floor"]((Math["floor"](a() * o) - o / 2) / 20),
                y: 10 * Math["floor"]((Math.floor(a() * i) - i / 2) / 10)
            }
        }
        null != Jr.x && (De.x = parseInt(Jr.x), $r = !0), null != Jr.y && (De.y = -1 * parseInt(Jr.y), $r = !0), Jr.noui && (u["classList"].add("hidden"), In["style"]["display"] = "none");
        var Gr, _r, Zr, ea, ta, na, ra = Qr();
        if (ra.length > 0)
            if (ra["startsWith"]("~")) o = "/" + ra, $r || dr(0, 0);
            else {
                var aa = Vr(ra);
                De.x = aa.x, De.y = aa.y
            }
        function oa() {
            var e = n;
            if (null == a || a["readyState"] != WebSocket["CONNECTING"] && a["readyState"] != WebSocket.OPEN) {
                var t = "wss://" + location["host"] + "/ws";
                "https:" !== location["protocol"] && (t = "ws://" + location["host"] + "/ws"), (a = new WebSocket(t))["binaryType"] = "arraybuffer", a["onmessage"] = Kn, a["onclose"] = Wn, a["onerror"] = Wn, a["onopen"] = Un, document["getElementById"]("connecting1").innerText = "Connecting...", document["getElementById"]("connecting2")["innerText"] = "", c["onclick"] = void 0
            }
        }

        function ia(e, t) {
            var r = n,
                a = parseInt(e["substring"](1, 3), 16),
                o = parseInt(e["substring"](3, 5), 16),
                i = parseInt(e["substring"](5, 7), 16);
            return a += t, o += t, i += t, a = Math["min"](a, 255), o = Math["min"](o, 255), i = Math.min(i, 255), a = Math["max"](a, 0), o = Math["max"](o, 0), i = Math["max"](i, 0), "#" + ca(a["toString"](16), 2) + ca(o["toString"](16), 2) + ca(i["toString"](16), 2)
        }

        function ca(e, t) {
            for (var r = n; e["length"] < t;) e = "0" + e;
            return e
        }

        function la(e) {
            return e >= 10240 && e <= 10495
        }

        function ua(e, t) {
            var r = n;
            if (3 == (e = e.replace("#", ""))["length"] && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), 6 != e.length) throw new Error("invalid hex length");
            var a = parseInt(e, 16),
                o = (16711680 & a) >> 16,
                i = (65280 & a) >> 8,
                c = 255 & a;
            return t ? "rgba(" + o + ", " + i + ", " + c + ", " + t + ")" : "rgb(" + o + ", " + i + ", " + c + ")"
        }

        function sa(e) {
            return e * e
        }

        function fa(e, t) {
            return 31 * t + e
        }

        function da(e) {
            return [e % 31, Math.floor(e / 31)]
        }
        isNaN(De.x) && (De.x = 0), isNaN(De.y) && (De.y = 0), De["start"] = De.x, setTimeout((function() {
            var e = n;
            window.history["replaceState"]({}, document.title, location["pathname"])
        }), 0), dr(De.x, De.y), null != localStorage["getItem"]("zoom") && yt(JSON["parse"](localStorage["getItem"]("zoom")), !1), oa(), Gr = function(e, r) {
            var a = n;
            if (r && r.multiple && !Array.isArray(e)) throw new Error;
            const o = 4294967296;
            let i, c, l = new Uint8Array(128),
                u = 0;
            if (r && r["multiple"])
                for (let t = 0; t < e["length"]; t++) s(e[t]);
            else s(e);
            return v(129), l.subarray(0, u);

            function s(e, n) {
                var l = a;
                switch (typeof e) {
                    case "undefined":
                        f();
                        break;
                    case "boolean":
                        v(e ? 195 : 194);
                        break;
                    case "number":
                        ! function(e) {
                            var t = l;
                            if (isFinite(e) && Math["floor"](e) === e)
                                if (e >= 0 && e <= 127) v(e);
                                else if (e < 0 && e >= -32) v(e);
                            else if (e > 0 && e <= 255) m([204, e]);
                            else if (e >= -128 && e <= 127) m([208, e]);
                            else if (e > 0 && e <= 65535) m([205, e >>> 8, e]);
                            else if (e >= -32768 && e <= 32767) m([209, e >>> 8, e]);
                            else if (e > 0 && e <= 4294967295) m([206, e >>> 24, e >>> 16, e >>> 8, e]);
                            else if (e >= -2147483648 && e <= 2147483647) m([210, e >>> 24, e >>> 16, e >>> 8, e]);
                            else if (e > 0 && e <= 0x10000000000000000) {
                                let t = e / o,
                                    n = e % o;
                                m([211, t >>> 24, t >>> 16, t >>> 8, t, n >>> 24, n >>> 16, n >>> 8, n])
                            } else e >= -0x8000000000000000 && e <= 0x8000000000000000 ? (v(211), h(e)) : m(e < 0 ? [211, 128, 0, 0, 0, 0, 0, 0, 0] : [207, 255, 255, 255, 255, 255, 255, 255, 255]);
                            else c || (i = new ArrayBuffer(8), c = new DataView(i)), c["setFloat64"](0, e), v(203), m(new Uint8Array(i))
                        }(e);
                        break;
                    case "string":
                        ! function(e) {
                            var n = l;
                            let r = function(e) {
                                    let n = !0,
                                        r = e["length"];
                                    for (let t = 0; t < r; t++)
                                        if (e.charCodeAt(t) > 127) {
                                            n = !1;
                                            break
                                        } let a = 0,
                                        o = new Uint8Array(e.length * (n ? 1 : 4));
                                    for (let t = 0; t !== r; t++) {
                                        let n = e.charCodeAt(t);
                                        if (n < 128) o[a++] = n;
                                        else {
                                            if (n < 2048) o[a++] = n >> 6 | 192;
                                            else {
                                                if (n > 55295 && n < 56320) {
                                                    if (++t >= r) throw new Error;
                                                    let i = e.charCodeAt(t);
                                                    if (i < 56320 || i > 57343) throw new Error;
                                                    n = 65536 + ((1023 & n) << 10) + (1023 & i), o[a++] = n >> 18 | 240, o[a++] = n >> 12 & 63 | 128
                                                } else o[a++] = n >> 12 | 224;
                                                o[a++] = n >> 6 & 63 | 128
                                            }
                                            o[a++] = 63 & n | 128
                                        }
                                    }
                                    return n ? o : o.subarray(0, a)
                                }(e),
                                a = r["length"];
                            a <= 31 ? v(160 + a) : m(a <= 255 ? [217, a] : a <= 65535 ? [218, a >>> 8, a] : [219, a >>> 24, a >>> 16, a >>> 8, a]), m(r)
                        }(e);
                        break;
                    case "object":
                        null === e ? f() : e instanceof Date ? function(e) {
                            var t = l;
                            let n = e["getTime"]() / 1e3;
                            if (0 === e["getMilliseconds"]() && n >= 0 && n < 4294967296) m([214, 255, n >>> 24, n >>> 16, n >>> 8, n]);
                            else if (n >= 0 && n < 17179869184) {
                                let r = 1e6 * e["getMilliseconds"]();
                                m([215, 255, r >>> 22, r >>> 14, r >>> 6, r << 2 >>> 0 | n / o, n >>> 24, n >>> 16, n >>> 8, n])
                            } else {
                                let r = 1e6 * e["getMilliseconds"]();
                                m([199, 12, 255, r >>> 24, r >>> 16, r >>> 8, r]), h(n)
                            }
                        }(e) : Array["isArray"](e) ? d(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                            let t = e["length"];
                            m(t <= 15 ? [196, t] : t <= 65535 ? [197, t >>> 8, t] : [198, t >>> 24, t >>> 16, t >>> 8, t]), m(e)
                        }(e) : e instanceof Int8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? d(e) : function(e) {
                            let t = 0;
                            for (let n in e) void 0 !== e[n] && t++;
                            t <= 15 ? v(128 + t) : m(t <= 65535 ? [222, t >>> 8, t] : [223, t >>> 24, t >>> 16, t >>> 8, t]);
                            for (let t in e) {
                                let n = e[t];
                                void 0 !== n && (s(t), s(n))
                            }
                        }(e);
                        break;
                    default:
                        if (n || !r || !r["invalidTypeReplacement"]) throw new Error;
                        "function" == typeof r.invalidTypeReplacement ? s(r.invalidTypeReplacement(e), !0) : s(r["invalidTypeReplacement"], !0)
                }
            }

            function f(e) {
                v(192)
            }

            function d(e) {
                let t = e.length;
                t <= 15 ? v(144 + t) : m(t <= 65535 ? [220, t >>> 8, t] : [221, t >>> 24, t >>> 16, t >>> 8, t]);
                for (let n = 0; n < t; n++) s(e[n])
            }

            function v(e) {
                var t = a;
                if (l["length"] < u + 1) {
                    let e = 2 * l["length"];
                    for (; e < u + 1;) e *= 2;
                    let n = new Uint8Array(e);
                    n["set"](l), l = n
                }
                l[u] = e, u++
            }

            function m(e) {
                var t = a;
                if (l["length"] < u + e["length"]) {
                    let n = 2 * l["length"];
                    for (; n < u + e["length"];) n *= 2;
                    let r = new Uint8Array(n);
                    r.set(l), l = r
                }
                l.set(e, u), u += e["length"]
            }

            function h(e) {
                var t = a;
                let n, r;
                e >= 0 ? (n = e / o, r = e % o) : (e++, n = Math["abs"](e) / o, r = Math["abs"](e) % o, n = ~n, r = ~r), m([n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r])
            }
        }, _r = function(e, r) {
            var a = n;
            let o, i = 0;
            if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), "object" != typeof e || void 0 === e["length"]) throw new Error;
            if (!e["length"]) throw new Error;
            if (e instanceof Uint8Array || (e = new Uint8Array(e)), r && r.multiple)
                for (o = []; i < e["length"];) o.push(c());
            else o = c();
            return o;

            function c() {
                var t = a;
                const n = e[i++];
                if (n >= 0 && n <= 127) return n;
                if (n >= 128 && n <= 143) return d(n - 128);
                if (n >= 144 && n <= 159) return v(n - 144);
                if (n >= 160 && n <= 191) return m(n - 160);
                if (192 === n) return null;
                if (193 === n) throw new Error;
                if (194 === n) return !1;
                if (195 === n) return !0;
                if (196 === n) return f(-1, 1);
                if (197 === n) return f(-1, 2);
                if (198 === n) return f(-1, 4);
                if (199 === n) return h(-1, 1);
                if (200 === n) return h(-1, 2);
                if (201 === n) return h(-1, 4);
                if (202 === n) return s(4);
                if (203 === n) return s(8);
                if (204 === n) return u(1);
                if (205 === n) return u(2);
                if (206 === n) return u(4);
                if (207 === n) return u(8);
                if (208 === n) return l(1);
                if (209 === n) return l(2);
                if (210 === n) return l(4);
                if (211 === n) return l(8);
                if (212 === n) return h(1);
                if (213 === n) return h(2);
                if (214 === n) return h(4);
                if (215 === n) return h(8);
                if (216 === n) return h(16);
                if (217 === n) return m(-1, 1);
                if (218 === n) return m(-1, 2);
                if (219 === n) return m(-1, 4);
                if (220 === n) return v(-1, 2);
                if (221 === n) return v(-1, 4);
                if (222 === n) return d(-1, 2);
                if (223 === n) return d(-1, 4);
                if (n >= 224 && n <= 255) return n - 256;
                throw console.debug("msgpack array:", e), new Error
            }

            function l(t) {
                let n = 0,
                    r = !0;
                for (; t-- > 0;)
                    if (r) {
                        let t = e[i++];
                        n += 127 & t, 128 & t && (n -= 128), r = !1
                    } else n *= 256, n += e[i++];
                return n
            }

            function u(t) {
                let n = 0;
                for (; t-- > 0;) n *= 256, n += e[i++];
                return n
            }

            function s(t) {
                var n = a;
                let r = new DataView(e.buffer, i + e["byteOffset"], t);
                return i += t, 4 === t ? r["getFloat32"](0, !1) : 8 === t ? r["getFloat64"](0, !1) : void 0
            }

            function f(t, n) {
                var r = a;
                t < 0 && (t = u(n));
                let o = e["subarray"](i, i + t);
                return i += t, o
            }

            function d(e, t) {
                e < 0 && (e = u(t));
                let n = {};
                for (; e-- > 0;) n[c()] = c();
                return n
            }

            function v(e, t) {
                var n = a;
                e < 0 && (e = u(t));
                let r = [];
                for (; e-- > 0;) r["push"](c());
                return r
            }

            function m(n, r) {
                n < 0 && (n = u(r));
                let a = i;
                return i += n,
                    function(e, n, r) {
                        var a = t;
                        let o = n,
                            i = "";
                        for (r += n; o < r;) {
                            let t = e[o++];
                            if (t > 127)
                                if (t > 191 && t < 224) {
                                    if (o >= r) throw new Error;
                                    t = (31 & t) << 6 | 63 & e[o++]
                                } else if (t > 223 && t < 240) {
                                if (o + 1 >= r) throw new Error;
                                t = (15 & t) << 12 | (63 & e[o++]) << 6 | 63 & e[o++]
                            } else {
                                if (!(t > 239 && t < 248)) throw new Error;
                                if (o + 2 >= r) throw new Error;
                                t = (7 & t) << 18 | (63 & e[o++]) << 12 | (63 & e[o++]) << 6 | 63 & e[o++]
                            }
                            if (t <= 65535) i += String["fromCharCode"](t);
                            else {
                                if (!(t <= 1114111)) throw new Error;
                                t -= 65536, i += String.fromCharCode(t >> 10 | 55296), i += String["fromCharCode"](1023 & t | 56320)
                            }
                        }
                        return i
                    }(e, a, n)
            }

            function h(e, n) {
                e < 0 && (e = u(n));
                let r = u(1),
                    a = f(e);
                return 255 === r ? function(e) {
                    var n = t;
                    if (4 === e["length"]) {
                        let t = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                        return new Date(1e3 * t)
                    }
                    if (8 === e.length) {
                        let t = (e[0] << 22 >>> 0) + (e[1] << 14 >>> 0) + (e[2] << 6 >>> 0) + (e[3] >>> 2),
                            n = 4294967296 * (3 & e[3]) + (e[4] << 24 >>> 0) + (e[5] << 16 >>> 0) + (e[6] << 8 >>> 0) + e[7];
                        return new Date(1e3 * n + t / 1e6)
                    }
                    if (12 === e["length"]) {
                        let t = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                        i -= 8;
                        let n = l(8);
                        return new Date(1e3 * n + t / 1e6)
                    }
                    throw new Error
                }(a) : {
                    type: r,
                    data: a
                }
            }
        }, Array.prototype["includes"] || (Array["prototype"]["includes"] = function(e) {
            return !!~this.indexOf(e)
        }), Array["prototype"].indexOf || (Array["prototype"]["indexOf"] = function(e, n, r) {
            "use strict";
            return function(a, o) {
                var i = t;
                if (null == this) throw TypeError("Array.prototype.indexOf called on null or undefined");
                var c = e(this),
                    l = c["length"] >>> 0,
                    u = r(0 | o, l);
                if (u < 0) u = n(0, l + u);
                else if (u >= l) return -1;
                if (void 0 === a) {
                    for (; u !== l; ++u)
                        if (void 0 === c[u] && u in c) return u
                } else if (a != a) {
                    for (; u !== l; ++u)
                        if (c[u] != c[u]) return u
                } else
                    for (; u !== l; ++u)
                        if (c[u] === a) return u;
                return -1
            }
        }(Object, Math["max"], Math["min"])), Array["from"] || (Array["from"] = (Zr = Object["prototype"].toString, ea = function(e) {
            var t = n;
            return "function" == typeof e || "[object Function]" === Zr["call"](e)
        }, ta = Math["pow"](2, 53) - 1, na = function(e) {
            var r, a, o = n,
                i = (r = t, a = Number(e), isNaN(a) ? 0 : 0 !== a && isFinite(a) ? (a > 0 ? 1 : -1) * Math["floor"](Math["abs"](a)) : a);
            return Math["min"](Math.max(i, 0), ta)
        }, function(e) {
            var t = n,
                r = this,
                a = Object(e);
            if (null == e) throw new TypeError("Array.from requires an array-like object - not null or undefined");
            var o, i = arguments.length > 1 ? arguments[1] : void 0;
            if (void 0 !== i) {
                if (!ea(i)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                arguments.length > 2 && (o = arguments[2])
            }
            for (var c, l = na(a["length"]), u = ea(r) ? Object(new r(l)) : new Array(l), s = 0; s < l;) c = a[s], u[s] = i ? void 0 === o ? i(c, s) : i["call"](o, c, s) : c, s += 1;
            return u["length"] = l, u
        })), Math.sign || (Math["sign"] = function(e) {
            return (e > 0) - (e < 0) || +e
        }), String["prototype"]["startsWith"] || Object["defineProperty"](String["prototype"], "startsWith", {
            value: function(e, t) {
                var r = n,
                    a = t > 0 ? 0 | t : 0;
                return this.substring(a, a + e["length"]) === e
            }
        }), String["prototype"]["codePointAt"] || function() {
            "use strict";
            var e = n,
                r = function() {
                    var e = t;
                    try {
                        var n = {},
                            r = Object["defineProperty"],
                            a = r(n, n, n) && r
                    } catch (e) {}
                    return a
                }(),
                a = function(e) {
                    var n = t;
                    if (null == this) throw TypeError();
                    var r = String(this),
                        a = r.length,
                        o = e ? Number(e) : 0;
                    if (o != o && (o = 0), !(o < 0 || o >= a)) {
                        var i, c = r["charCodeAt"](o);
                        return c >= 55296 && c <= 56319 && a > o + 1 && (i = r["charCodeAt"](o + 1)) >= 56320 && i <= 57343 ? 1024 * (c - 55296) + i - 56320 + 65536 : c
                    }
                };
            r ? r(String.prototype, "codePointAt", {
                value: a,
                configurable: !0,
                writable: !0
            }) : String.prototype.codePointAt = a
        }(), String["fromCodePoint"] || function(e) {
            var r = n,
                a = function(n) {
                    for (var r = t, a = [], o = 0, i = "", c = 0, l = arguments["length"]; c !== l; ++c) {
                        var u = +arguments[c];
                        if (!(u < 1114111 && u >>> 0 === u)) throw RangeError("Invalid code point: " + u);
                        u <= 65535 ? o = a["push"](u) : (u -= 65536, o = a.push(55296 + (u >> 10), u % 1024 + 56320)), o >= 16383 && (i += e["apply"](null, a), a.length = 0)
                    }
                    return i + e.apply(null, a)
                };
            try {
                Object.defineProperty(String, "fromCodePoint", {
                    value: a,
                    configurable: !0,
                    writable: !0
                })
            } catch (e) {
                String["fromCodePoint"] = a
            }
        }(String["fromCharCode"]), CanvasRenderingContext2D["prototype"]["roundRect"] || (CanvasRenderingContext2D["prototype"].roundRect = function(e, t, r, a, o) {
            var i = n,
                c = new Array(4);
            if ("object" == typeof o) switch (o["length"]) {
                case 1:
                    c.fill(o[0], 0, 4);
                    break;
                case 2:
                    c.fill(o[0], 0, 4), c[1] = c[3] = o[1];
                    break;
                case 3:
                    c[0] = o[0], c[1] = c[3] = o[1], c[2] = o[2];
                    break;
                case 4:
                    c = o;
                    break;
                default:
                    c["fill"](0, 0, 4)
            }
            this.beginPath(), this.moveTo(e + c[0], t), this["lineTo"](e + r - c[1], t), this["quadraticCurveTo"](e + r, t, e + r, t + c[1]), this["lineTo"](e + r, t + a - c[2]), this["quadraticCurveTo"](e + r, t + a, e + r - c[2], t + a), this["lineTo"](e + c[3], t + a), this.quadraticCurveTo(e, t + a, e, t + a - c[3]), this.lineTo(e, t + c[0]), this["quadraticCurveTo"](e, t, e + c[0], t), this.closePath()
        });
        const va = 10 == v["getMonth"]() && v["getDate"]() >= 28 || 11 == v["getMonth"]() || 0 == v["getMonth"]() && v.getDate() <= 6 || localStorage["getItem"]("christmas"),
            ma = ["-20,-10", "0,-10"],
            ha = [4, 7, 9, 12];
        va && setInterval((function() {
            var e = n;
            if ("textwall" == J && "main" == $ && !ft["disablecolour"]["checked"])
                for (var t = 0; t < ma.length; t++) {
                    var r = ma[t],
                        a = Te["get"](r);
                    if (null != a && null != a["txt"]) {
                        for (var o = 0; o < 200; o++) switch (a["txt"][o]) {
                            case "?":
                            case "'":
                                a["clr"][o] = ha[Math.floor(4 * Math["random"]())]
                        }
                        Dt(r, !1)
                    }
                }
        }), 400)
    }("undefined" == typeof browser ? browser = {} : browser)
}("undefined" == typeof browser ? browser = {} : browser);