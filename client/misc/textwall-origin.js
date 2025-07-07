! function(e) {
    
    function(e) {
        var n = t;
        class r {
            constructor(e, n) {
                var r = t;
                this[r(219)] = new Map, this[r(544)] = 1, this.spaceMissingCharacters = !1, this[r(238)] = !1, this[r(274)] = !1, this[r(251)] = !1, null != e && this[r(368)](e, n)
            } [n(368)](e, t) {
                var r = n,
                    a = this,
                    o = new XMLHttpRequest;
                o[r(388)] = function() {
                    var e = r;
                    4 == o[e(734)] && 200 == o[e(577)] && (a[e(459)](o[e(260)]), null != t && t())
                }, o[r(672)](r(445), e, !0), o.send(null)
            }
            parseFont(e) {
                var t = n,
                    r = e.split("\n");
                const a = r[t(692)];
                for (var o = 0; o < a; o++) {
                    var i = r[o];
                    if (!i[t(608)]("#")) {
                        var c = i[t(716)](":");
                        if (2 == c[t(692)]) {
                            for (var l = parseInt(c[0], 16), u = c[1], s = u.length, f = new Uint8Array(s / 2), d = 0; d < s; d += 2) f[d / 2] = parseInt(u[t(511)](d, d + 2), 16);
                            this[t(219)][t(430)](l, f)
                        }
                    }
                }
            } [n(727)]() {
                var e = n,
                    t = "";
                for (const [n, o] of this[e(219)].entries()) {
                    var r = "";
                    r += n[e(465)](16)[e(321)](4, "0")[e(216)](), r += ":";
                    for (var a = 0; a < o[e(692)]; a++) r += o[a].toString(16)[e(321)](2, "0")[e(216)]();
                    t += r += "\n"
                }
                return t
            }
            drawChar(e, t, r, a) {
                var o = n,
                    i = e[o(356)](),
                    c = this[o(219)][o(418)](i);
                if (null == c) return this.spaceMissingCharacters ? 8 * this[o(544)] : 0;
                var l = c[o(692)],
                    u = l / 16,
                    s = (this[o(274)] ? 2 : 1) * this[o(544)],
                    f = 1 * this.scale;
                this[o(238)] && (s = Math[o(400)](s), f = Math[o(400)](f));
                for (var d = 0; d < l; d++) {
                    var v = c[d],
                        m = this[o(251)] ? Math[o(311)]((d - l) / 3) : 0,
                        h = Math[o(193)](d / u) * this[o(544)];
                    this[o(238)] && (h = Math[o(311)](h));
                    for (var y = 0; y < 8; y++)
                        if (v >> y & 1) {
                            var p = (8 * (Math[o(193)](d % u) + 1) - y - m) * this[o(544)];
                            this[o(238)] && (p = Math[o(311)](p)), t[o(460)](r + p, a + h, s, f)
                        }
                }
                return 8 * u * this.scale
            } [n(637)](e, t, r, a) {
                for (var o = n, i = r, c = a, l = Array.from(e), u = 0; u < l[o(692)]; u++) {
                    var s = l[u];
                    "\r" != s && ("\n" != s ? r += this[o(305)](s, t, r, a) : (a += 16 * this.scale, r = i))
                }
                return {
                    x: r - i,
                    y: (a += 16 * this[o(544)]) - c
                }
            }
        }
        var a, o = "/";
        const i = document[n(450)](n(303)),
            c = document[n(450)](n(642)),
            l = document[n(450)](n(609)),
            u = document.getElementById(n(261)),
            s = -1 != navigator[n(457)][n(394)](n(562)) || -1 != navigator.userAgent[n(394)](n(466)) || -1 != navigator.userAgent[n(394)](n(452)),
            f = -1 != navigator.userAgent[n(394)](n(293)),
            d = s ? 40 : 200,
            v = new Date;
        var m = devicePixelRatio,
            h = !1,
            y = document[n(534)],
            p = !0;
        const g = document.getElementById(n(474));
        var x;
        const w = document[n(450)]("clipboard"),
            b = document[n(450)](n(431)),
            M = document[n(450)]("colourlist"),
            k = document[n(450)](n(708));
        var E = document[n(450)]("canvas");
        E.removeAttribute("id");
        var S = E[n(230)]("2d", {
            alpha: !1
        });
        E[n(624)] = Math[n(311)](window.innerWidth * m), E[n(307)] = Math.round(window.innerHeight * m), E.style[n(624)] = window[n(383)] + "px", E.style[n(307)] = window[n(435)] + "px", S.imageSmoothingEnabled = !1;
        const I = n(605),
            C = "#EBEBEB";
        var A = I,
            B = C,
            T = ia(B, -15),
            F = ia(B, 10);
        const P = document.getElementById("primary"),
            L = document[n(450)](n(500)),
            O = document[n(450)](n(646)),
            R = document[n(450)](n(179)),
            D = document[n(450)](n(551)),
            N = document.getElementById(n(386)),
            j = document[n(450)](n(674));
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
            if (1 == e[t(692)]) return parseInt(String[t(308)](e[0]));
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
        const V = document[n(450)](n(346)),
            G = document[n(450)](n(519)),
            _ = document[n(450)](n(715));
        var Z;
        const ee = document[n(450)](n(456)),
            te = String[n(308)](10240),
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
            oe = Math[n(193)](re[ae] * m) + n(514) + ae + ", monospace, Special";
        const ie = new Map;
        ie.set("Unifont", void 0), ie[n(430)](n(225), void 0), ie[n(430)](n(548), void 0);
        const ce = Object[n(697)](re)[n(692)],
            le = document[n(450)](n(700));
        for (var ue = 0; le.length > 0; ue++);
        for (ue = 0; ue < ce; ue++) option = document.createElement("option"), option.text = Object[n(697)](re)[ue], le[n(536)](option);
        le[n(496)] = ae;
        const se = document.getElementById(n(265));
        se[n(243)](n(363), (function(e) {
            e[n(432)]()
        }));
        const fe = {
            bold: {
                el: document[n(450)](n(274)),
                enabled: !1
            },
            italic: {
                el: document[n(450)](n(251)),
                enabled: !1
            },
            underline: {
                el: document[n(450)]("underline"),
                enabled: !1
            },
            strikethrough: {
                el: document.getElementById(n(728)),
                enabled: !1
            }
        };
        var de = Object[n(697)](fe);
        for (ue = 0; ue < de[n(692)]; ue++) fe[de[ue]].el[n(243)](n(191), Rr);
        var ve = 145,
            me = !1;

        function he(e) {
            var t, r, a = n;
            if (e) {
                me = !0;
                var o = (t = De.x, r = De.y, {
                    x: t * (10 * m) / devicePixelRatio + et.offset.x / devicePixelRatio,
                    y: r * (20 * m) / devicePixelRatio + et[a(497)].y / devicePixelRatio
                });
                o.x + 15 * m + ve > window.innerWidth ? se[a(670)].left = o.x - ve - 5 * mt + "px" : se[a(670)][a(297)] = o.x + 15 * mt + "px", se[a(670)].top = Math[a(207)](o.y - 30, 10) + "px", se[a(670)][a(208)] = a(683), se[a(670)][a(566)] = Math[a(207)](o.y - se.clientHeight, 0) + "px", ve = se[a(378)] || ve
            } else me && (me = !1, se.style[a(208)] = a(212))
        }

        function ye() {
            var e = n,
                t = 0;
            return fe.bold[e(396)] && (t += 8), fe[e(251)][e(396)] && (t += 4), fe[e(647)][e(396)] && (t += 2), fe[e(728)][e(396)] && (t += 1), t
        }

        function pe(e) {
            var t = n;
            Dr(t(274), Boolean(8 & e)), Dr("italic", Boolean(4 & e)), Dr(t(647), Boolean(2 & e)), Dr(t(728), Boolean(1 & e))
        }
        const ge = 192,
            xe = [n(616), n(634), "#D4D7D9", n(304), n(625), n(531), n(676), "#FFD635", n(529), n(210), n(498), n(689), n(623), n(612), n(662), "#BE0039", n(554), n(374), n(300), "#493AC1", n(573), n(513), n(599), n(489), n(358), n(517), n(596), n(283), n(209), n(447), n(406)],
            we = [n(506), n(701), "light grey", "light pink", n(687), n(206), n(601), "yellow", n(194), n(575), n(518), n(720), n(583), n(717), "dark purple", "dark red", n(412), n(595), "teal", n(295), "periwinkle", n(504), n(252), n(736), n(425), n(470), n(213), n(665), n(289), "beige", "dark grey"],
            be = [0, 30, 1, 2, 23, 15, 4, 5, 7, 24, 16, 9, 8, 17, 18, 25, 12, 11, 10, 19, 20, 26, 14, 13, 27, 28, 21, 3, 22, 6, 29];

        function Me(e) {
            for (var t = n, r = 0; r < xe[t(692)]; r++)
                if (be[r] == e) return r;
            return -1
        }
        var ke = [];
        ! function() {
            var e = n;
            for (ue = 0; ue < xe[e(692)]; ue++) ke[ue] = ua(xe[ue], .2);
            ke[xe[e(692)]] = e(564)
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
            Ve = document[n(450)](n(211)),
            Ge = document.getElementById(n(433)),
            _e = performance[n(588)](),
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
        document[n(450)](n(700)).onchange = function(e) {
            var t = n;
            kt(e[t(652)][t(496)])
        };
        const ft = {
            showothercurs: document[n(450)](n(591)),
            shownametags: document[n(450)](n(442)),
            showchat: document.getElementById(n(214)),
            disablecolour: document[n(450)](n(549)),
            smoothpanning: document[n(450)](n(644)),
            smoothcursors: document[n(450)](n(444)),
            copycolour: document.getElementById(n(695)),
            copydecorations: document[n(450)](n(487)),
            rainbow: document[n(450)](n(555)),
            anonymous: document.getElementById("anonymous")
        };
        ft[n(591)][n(232)] = !0, ft[n(442)][n(232)] = !0, ft[n(214)][n(232)] = !0, ft[n(549)][n(232)] = !1, ft[n(644)][n(232)] = !0, ft.smoothcursors[n(232)] = !0;
        const dt = {
            protect: document[n(450)](n(236)),
            protectOwner: document[n(450)](n(296)),
            clear: document.getElementById(n(472)),
            readOnly: document[n(450)](n(324)),
            private: document.getElementById(n(373)),
            hideCursors: document[n(450)](n(663)),
            disableChat: document.getElementById("disablechat"),
            disableColour: document[n(450)]("walldisablecolour"),
            disableBraille: document.getElementById(n(705))
        };
        var vt = 1,
            mt = 1,
            ht = document.getElementById(n(719));

        function yt(e, t) {
            vt = e < .5 ? .5 : e > 3 ? 3 : e, mt = Math[n(311)](100 * vt) / 100, localStorage.setItem("zoom", mt), ht.value = 10 * mt, t && kr(Math.round(100 * mt) + "% ", 1e3), On()
        }

        function pt() {
            yt(ht.value / 10, !0)
        }
        var gt = document[n(450)](n(302)),
            xt = document[n(450)]("loginlink"),
            wt = document.getElementById(n(680));

        function bt(e, t) {
            var r = n;
            e && (localStorage[r(359)]("username"), localStorage[r(359)]("token")), Je = "", H = 0, V[r(670)][r(208)] = "none", a[r(734)] != a.OPEN || t || (dt.private[r(232)] && Hn("textwall", r(699)), a.send(Gr({
                logout: 0
            })), Xe = !0), document[r(450)](r(380)).style[r(208)] = r(556), document[r(450)]("loggedin")[r(670)][r(208)] = "none", En(!1), Fn(), h = !1, document[r(450)](r(240))[r(670)].display = r(212), Ie = !0
        }

        function Mt() {
            var e = n;
            return 16 * Math[e(311)](m) > 20 * m || 16 * Math.round(m) < 13 * m ? m : Math[e(311)](m)
        }

        function kt(e) {
            var t = n;
            if (ae = e, ie[t(403)](ae)) {
                var a = ie[t(418)](ae);
                if (null == a) {
                    switch (ae) {
                        case t(617):
                            a = new r(t(268), Dn);
                            break;
                        case t(225):
                            a = new r(t(377), Dn);
                            break;
                        default:
                            a = new r(t(535), Dn)
                    }
                    a[t(238)] = !0, ie[t(430)](ae, a)
                }
                a.scale = Mt()
            }
            var o = ae,
                i = re[ae];
            t(650) == ae ? (j.classList.remove(t(215)), o = D[t(496)], i = Math[t(207)](Math[t(338)](20, N[t(496)]), 1), localStorage[t(579)]("customfont", o), localStorage[t(579)](t(386), i), o = '"' + (o || t(313)) + '"') : j[t(271)][t(536)](t(215)), oe = Math[t(193)](i * m) + t(514) + o + t(325), localStorage[t(579)](t(507), ae), document[t(450)](t(700))[t(496)] = ae, Ie = !0
        }

        function Et() {
            var e = n;
            return Math[e(400)](.1 * Math[e(311)](Rt * m / .1))
        }

        function St() {
            return Et()
        }

        function It(e) {
            var t = n;
            S[t(460)](Math[t(311)](10 * e[0] * m), Math[t(311)](20 * e[1] * m), Et(), St())
        }

        function Ct(e) {
            var t = n;
            e[t(507)] = Math[t(311)](11 * m) + t(514) + ae + t(703)
        }

        function At(e, t) {
            var r = n,
                a = Te[r(418)](e);
            if (a.empty) S[r(576)] = W(a.protected), It(t);
            else {
                var o = a[r(574)];
                f && (o = a[r(266)]), null != o ? (S[r(331)](o, Math.round(10 * t[0] * m), Math[r(311)](20 * t[1] * m), Et(), St()), a[r(686)] == m && a[r(507)] == oe || Dt(e, !1)) : (S[r(576)] = F, It(t), Dt(e, !1))
            }
        }

        function Bt(e) {
            var t = n;
            return e = e || 0, {
                minx: -et[t(497)].x / m / 10 - e,
                maxx: -et[t(497)].x / m / 10 + window[t(383)] / mt / 10 + e - 20,
                miny: -et.offset.y / m / 20 - e,
                maxy: -et[t(497)].y / m / 20 + window.innerHeight / mt / 20 + e - 10
            }
        }

        function Tt(e, t) {
            var r = n;
            return e[0] < t[r(600)] || e[0] > t[r(462)] || e[1] < t[r(438)] || e[1] > t[r(648)]
        }

        function Ft(e) {
            var t = n,
                r = 20 * Math[t(193)](e[0] / 20),
                a = 10 * Math[t(193)](e[1] / 10),
                o = r + "," + a,
                i = Te[t(418)](o);
            if (null != i && null != i[t(189)]) {
                if (!K(i.protected)) {
                    var c = e[0] - r + 20 * (e[1] - a);
                    return 0 != i[t(189)][c]
                }
                if (0 != i[t(189)]) return !0
            }
            return !1
        }

        function Pt(e) {
            var t = n;
            return Te.get(e)[t(211)] || e.split(",")
        }

        function Lt(e, t, r, a) {
            var o = n;
            if ("" != e) {
                S[o(576)] = "rgba(34, 34, 34, 0.4)";
                var i = S[o(690)](e);
                S[o(587)](), S[o(201)](Math[o(311)](t - i[o(624)] / 2), Math[o(311)](r + 21 * m), Math[o(311)](i[o(624)] + 10 * m), Math.round(14 * m), [a]), S.fill(), S[o(576)] = o(605), S[o(221)](e, Math[o(311)](t - i[o(624)] / 2 + 5 * m), Math[o(311)](r + 31 * m))
            }
        }

        function Ot(e, t, r, a) {
            var o = n;
            S.fillRect(Math[o(311)](e), Math[o(311)](t), Math.round(r), Math[o(311)](a))
        }! function() {
            var e = n;
            S.font = e(443), S.fillText("abc", 0, 10), S.font = oe, S[e(221)](e(610), 0, 10);
            for (var t = 0; t < Object[e(697)](re)[e(692)]; t++) S[e(507)] = e(233) + Object[e(697)](re)[t], S[e(221)]("abc", 0, 10), S[e(507)] = e(659) + Object[e(697)](re)[t], S[e(221)](e(610), 0, 10), S.font = e(494) + Object[e(697)](re)[t], S[e(221)](e(610), 0, 10), S[e(507)] = e(505) + Object[e(697)](re)[t], S[e(221)](e(610), 0, 10)
        }();
        const Rt = 200;

        function Dt(e, t) {
            var r = n;
            Le[r(403)](e) ? 0 == Le.get(e) && t && Le[r(430)](e, t) : (Pe[r(490)](e), Le[r(430)](e, t))
        }

        function Nt(e, t) {
            var r = n;
            Le[r(403)](e) ? 0 == Le[r(418)](e) && t && Le.set(e, t) : (Pe[r(367)](e), Le.set(e, t))
        }
        var jt, Ut, Ht;
        try {
            jt = RegExp(n(666), "u")
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
            return 65 + Math[n(193)](26 * e)
        }

        function Yt(e) {
            return 48 + Math[n(193)](10 * e)
        }

        function Xt(e) {
            var t = n;
            return t(486)[Math[t(193)](5 * e)][t(356)]()
        }

        function qt(e) {
            var t = n;
            return t(278)[Math[t(193)](21 * e)][t(356)]()
        }

        function zt(e) {
            const t = Math[n(550)]();
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
            e[i(221)](t, Math[i(193)](r), Math[i(193)](a + 15 * o))
        }

        function Vt(e, t, r, a, o, i, c) {
            var l = n;
            e.drawChar(r, t, Math[l(193)](a), Math[l(193)](o + (10 * i - c / 2)))
        }

        function Gt(e) {
            var t = n;
            e[t(507)] = t(409) + e[t(507)]
        }

        function _t(e) {
            var t = n;
            e.font = t(343) + e[t(507)]
        }

        function Zt(e, t) {
            var r = n;
            ft[r(549)][r(232)] && (t = 0), e[r(576)] = Be && 0 == t ? "#FFFFFF" : xe[t]
        }

        function en(e, t, r) {
            var a = n;
            if (!K(r))
                for (var o = t % 20, i = Math[a(193)](t / 20), c = Math.round(20 * i * m), l = !1; o < 20;) {
                    var u = r[o + 20 * i];
                    if (l || 0 != u) {
                        0 != u && (l = !0), e[a(576)] = W(u);
                        var s = Math[a(311)](10 * o * m);
                        e[a(460)](s, c, Math[a(311)](10 * (o + 1) * m) - s, Math.round(20 * (i + 1) * m) - c), o++
                    } else o++
                }
        }

        function tn(e, t) {
            var r = n,
                a = Te.get(e);
            if (null != a && null != a[r(585)]) {
                var o = nn(e);
                if (a[r(484)] = o, o) {
                    rn(e);
                    var i = Pt(e),
                        c = i[0] + 20 + "," + i[1];
                    if (Te.has(c)) {
                        var l = Te[r(418)](c);
                        null != l.txt && (nn(c) ? (l.empty = !0, rn(c)) : t && Nt(c, !1))
                    }
                } else {
                    var u = Et(),
                        s = St();
                    null == a.img && (null != window[r(424)] ? a.img = new OffscreenCanvas(u, s) : a.img = document.createElement(r(478))), a.img[r(624)] = u, a[r(574)][r(307)] = s,
                        function(e, t, n, a, o) {
                            var i = r,
                                c = Te[i(418)](a);
                            if (e[i(440)] = !1, e.textBaseline = i(660), e[i(691)] = i(297), K(c.protected)) e[i(576)] = W(c[i(189)]), e.fillRect(0, 0, t, n);
                            else {
                                e[i(576)] = A, e[i(460)](0, 0, t, n);
                                for (var l = 0; l < 200; l++) {
                                    var u = l % 20,
                                        s = Math[i(193)](l / 20);
                                    if (0 != c[i(189)][l]) {
                                        e[i(576)] = W(c[i(189)][l]);
                                        var f = Math[i(311)](10 * u * m),
                                            d = Math[i(311)](20 * s * m);
                                        e[i(460)](f, d, Math[i(311)](10 * (u + 1) * m) - f, Math[i(311)](20 * (s + 1) * m) - d)
                                    }
                                }
                            }
                            var v, h = {},
                                y = !1,
                                p = Pt(a),
                                g = p[0] - 20 + "," + p[1],
                                x = Te[i(418)](g);
                            null != x && null != x[i(611)] && (v = x[i(611)]);
                            var w, b, M = t / Rt,
                                k = ie[i(418)](ae),
                                E = 16 * Mt();
                            for (l = 0; l < 10; l++)
                                for (var S = -2; S < 20; S++) {
                                    var I = t / 20 * S,
                                        C = n / 10 * l;
                                    if (S < 0 && null != v) {
                                        var B = K(c[i(189)]),
                                            T = K(x[i(189)]);
                                        if (B) {
                                            if (T && 0 == x[i(189)] && 0 != c[i(189)]) continue;
                                            if (!T) {
                                                var F = x[i(189)][20 + S + 20 * l],
                                                    P = -1;
                                                if (-2 == S && (P = x[i(189)][19 + 20 * l]), 0 == F && 0 != c[i(189)] || -1 != P && 0 != P) continue
                                            }
                                        } else {
                                            if (T && 0 == x[i(189)] && 0 != (L = c[i(189)][20 * l])) continue;
                                            if (!T) {
                                                F = x[i(189)][20 + S + 20 * l];
                                                var L = c[i(189)][20 * l];
                                                if (P = -1, -2 == S && (P = x.protected[19 + 20 * l]), 0 == F && (0 != L || -1 != P && 0 != P)) continue
                                            }
                                        }
                                        var O = S + 20 * l;
                                        if (null != v[O]) {
                                            var R = v[O];
                                            Zt(e, R[2]), null != k && k.charMap[i(403)](R[0][i(356)]()) ? (k[i(274)] = R[3], k[i(251)] = R[4], Vt(k, e, R[0], I, C, M, E)) : (e.font = R[1] ? $t(M) : oe, R[3] && Gt(e), R[4] && _t(e), Qt(e, R[0], I, C, M)), en(e, 1 + 20 * l, c.protected)
                                        }
                                    }
                                    if (!(S < 0)) {
                                        var D = c[i(585)][S + 20 * l],
                                            N = da(c[i(499)][S + 20 * l]),
                                            j = N[1];
                                        if (!hr(D, j)) {
                                            var U = D[i(356)](),
                                                H = N[0];
                                            Zt(e, H), e.font = oe;
                                            var Y = !1;
                                            8 & j && (Y = !0, Gt(e));
                                            var X = !1;
                                            if (4 & j && (X = !0, _t(e)), (w = U) >= 58112 && w <= 58124 && (U = zt(U), D = String[i(468)](U)), (b = U) >= 9472 && b <= 9632 && !(b >= 9476 && b <= 9483) && !(b >= 9548 && b <= 9551) || b >= 9698 && b <= 9701 || la(U)) e[i(507)] = Math[i(311)](20 * M) + "px Special", e[i(221)](D, Math[i(311)](I), Math.floor(C + 15 * M));
                                            else {
                                                var q = !1;
                                                jt && jt.test(D) && (q = !0, e.font = $t(M)), null != k && k.charMap[i(403)](U) ? (k[i(274)] = Y, k[i(251)] = X, Vt(k, e, D, I, C, M, E)) : Qt(e, D, I, C, M), S >= 18 && (h[S - 20 + 20 * l] = [D, q, H, Y, X], y = !0)
                                            }
                                            2 & j && e.fillRect(Math[i(193)](I - .5 * M), Math[i(311)](C + 17.5 * M), Math[i(400)](11 * M), Math.ceil(M)), 1 & j && e[i(460)](Math[i(193)](I - .5 * M), Math[i(193)](C + 9 * M), Math.ceil(11 * M), Math[i(400)](M)), S < 19 && !K(c.protected) && 0 == c[i(189)][S + 20 * l] && en(e, S + 1 + 20 * l, c[i(189)])
                                        }
                                    }
                                }
                            if (c.edge = y ? h : void 0, o) {
                                var z = p[0] + 20 + "," + p[1];
                                Te[i(403)](z) && null != Te[i(418)](z).txt && Nt(z, !1)
                            }
                        }(a[r(574)][r(230)]("2d", {
                            alpha: !1
                        }), u, s, e, t), a[r(686)] = m, a[r(507)] = oe, f && createImageBitmap(a[r(574)]).then((function(t) {
                            var n = r;
                            if (Te[n(403)](e)) {
                                var a = Te[n(418)](e);
                                null != a[n(266)] && a[n(266)].close(), a[n(266)] = t, Ie = !0
                            }
                        })), a[r(484)] = !1
                }
            }
        }

        function nn(e) {
            for (var t = n, r = Te[t(418)](e), a = !0, o = 0; o < 200; o++)
                if (!hr(r[t(585)][o], da(r[t(499)][o])[1])) {
                    a = !1;
                    break
                } if (a && !K(r[t(189)]) && -1 == Y(r[t(189)]) && (a = !1), a && (r[t(611)] = void 0), a) {
                var i = Pt(e),
                    c = i[0] - 20 + "," + i[1];
                Te[t(403)](c) && null != Te.get(c)[t(611)] && (a = !1)
            }
            return a
        }

        function rn(e) {
            var t = n;
            if (Te[t(403)](e)) {
                var r = Te.get(e);
                null != r[t(574)] && delete r[t(574)]
            }
        }
        var an = null;

        function on(e, t) {
            return e[0] === t[0] ? 0 : e[0] < t[0] ? -1 : 1
        }

        function cn(e) {
            for (var t = n, r = innerWidth / innerHeight, a = [], o = et[t(211)].x, i = 2 * et[t(211)].y * r, c = 0; c < e[t(692)]; c += 2) {
                var l = e[c] + 10,
                    u = 2 * (e[c + 1] + 5) * r,
                    s = Math[t(245)](sa(o - l) + sa(i - u));
                a[t(490)]([s, c])
            }
            return a.sort(on), a
        }
        var ln, un = !1;

        function sn() {
            var e, t, r, o = n;
            if (!un) {
                for (var i = -120 - 20 * Math[o(193)](et[o(497)].x / (200 * m)), c = -60 - 10 * Math.floor(et[o(497)].y / (200 * m)), l = c, u = Math[o(193)](window[o(383)] / (10 * mt) - et[o(497)].x / (10 * m) + 120), s = Math.floor(window.innerHeight / (20 * mt) - et[o(497)].y / (20 * m) + 60), f = []; i < u;) {
                    for (; c < s;) {
                        var d = i + "," + c;
                        !Te[o(403)](d) && (e = i, t = c, r = void 0, r = n, null != an && an.minx <= e && e < an[r(462)] && an[r(438)] <= t && t < an.maxy) && f.push(i, c), c += 10
                    }
                    c = l, i += 20
                }
                if (0 != f[o(692)]) {
                    var v = cn(f);
                    ln = [];
                    for (var h = 0, y = 0; y < v.length; y++) {
                        var p = v[y][1],
                            g = f[p],
                            x = f[p + 1];
                        if (d = g + "," + x, ln[o(490)](g / 20, x / 10), Te[o(430)](d, {}), 100 == ++h) break
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
            for (const n of Te[t(697)]()) {
                var a = Pt(n);
                !Tt(a, r) || (e = a)[0] > De.x - 20 && e[0] < De.x + 20 && e[1] > De.y - 10 && e[1] < De.y + 10 || Te[t(276)](n)
            }
        }

        function dn() {
            var e = n;
            e(318) in window || i[e(310)]()
        }
        var vn = !1;

        function mn() {
            i[n(310)]()
        }

        function hn(e) {
            var t = n;
            return e.target[t(387)].parentElement[t(707)].id
        }

        function yn(e) {
            h && a.send(Gr({
                i: hn(e)
            }))
        }

        function pn(e) {
            var t = n;
            h && a[t(205)](Gr({
                a: [hn(e), e.target[t(232)]]
            }))
        }

        function gn(e) {
            h && a[n(205)](Gr({
                aa: hn(e)
            }))
        }

        function xn(e) {
            var t = n,
                r = hn(e),
                a = We[t(418)](r);
            null != a && h && (a[t(618)] = e[t(652)][t(232)], Ie = !0)
        }

        function wn(e) {
            var t = n,
                r = e[t(652)][t(387)][t(707)].id,
                a = We[t(418)](r);
            null != a && h && kr((a.n || r) + t(704) + a.l[0] + ", " + -a.l[1] + ")", 3e3)
        }

        function bn(e) {
            var t = n,
                r = e[t(652)][t(387)][t(707)].id,
                a = We[t(418)](r);
            null != a && h && dr(a.l[0], a.l[1])
        }

        function Mn(e) {
            var t = n,
                r = document[t(267)]("tr"),
                a = document.createElement("td"),
                o = document[t(267)]("td"),
                i = document.createElement("td"),
                c = document[t(267)](t(223)),
                l = document.createElement(t(223)),
                u = document[t(267)]("button"),
                s = document[t(267)](t(253));
            l[t(476)] = t(631), l[t(232)] = !1, u[t(246)] = "2", s[t(246)] = "3", l[t(243)](t(191), pn), u.addEventListener(t(191), gn), s[t(243)](t(191), yn), c[t(243)](t(191), xn);
            var f = We[t(418)](e);
            c[t(476)] = t(631), c[t(232)] = 1 == f[t(618)], a[t(258)](c);
            var d = f.c;
            o[t(670)][t(655)] = t(605) == xe[d] ? t(664) : xe[d], o[t(670)][t(345)] = "10px", o[t(670)][t(197)] = t(415), o[t(246)] = f.n || e, o[t(243)](t(191), wn), o[t(243)](t(247), bn), i[t(258)](l), i[t(258)](u), i[t(258)](s), r[t(707)].id = e, r[t(258)](a), r[t(258)](o), r[t(258)](i), document[t(450)](t(422)).appendChild(r)
        }

        function kn(e) {
            e[n(432)]()
        }

        function En(e) {
            for (var t = n, r = [t(411), t(516), t(436), "loginpass", t(369), t(560), t(294), t(516), "chngusername", t(671), "submitnamechange", "oldpass", "newpass", t(385), t(584), t(448), t(581)], a = 0; a < r[t(692)]; a++) document[t(450)](r[a])[t(326)] = e;
            if (!e) {
                var o = [t(436), t(176), "username", t(560), t(294), t(341), "chngeusrpass", "oldpass", t(553), t(385), t(448)];
                for (a = 0; a < o[t(692)]; a++) document[t(450)](o[a])[t(496)] = ""
            }
        }
        E.addEventListener(n(203), (function(e) {
            var t = n;
            e[t(432)](), e[t(495)] && (he(!1), null != $n && 1 != e[t(641)] || Gn || ($n = e[t(641)], je = rr(e), nt ? (it[t(353)] = je, it.end = it.start) : (tt = !0, et[t(353)].x = e.clientX * m, et[t(353)].y = e.clientY * m, ct = [], lt = null, Vn(e), E.style[t(259)] = t(441), function(e) {
                if (e.pointerId == $n && (xr(), !ot && !rt)) {
                    var t = rr(e);
                    if (De.x == t.x && De.y == t.y || (Ke = !0), De.x = t.x, De.y = t.y, De.start = De.x, tr(), e.altKey) {
                        var n = wr();
                        n && (hr(n[0], da(n[1])[1]) ? Fr(0) : Fr(da(n[1])[0]))
                    }
                    ar()
                }
            }(e)), Ie = !0))
        })), E[n(243)](n(363), (function(e) {
            var t = n;
            e[t(432)](), rt ? (null != et[t(353)].x && null != et[t(353)].y && (Qn = !0), (at = !at) && (dt[t(472)][t(232)] = !1, ot = !1), Ie = !0) : he(!0)
        })), document.addEventListener("pointermove", (function(e) {
            var t = n;
            if (e[t(495)] && (je = rr(e), (rt || ot) && (Ie = !0), e.pointerId == $n && !Gn)) {
                if (e[t(432)](), nt) it[t(235)] = je;
                else if (tt) {
                    var r = e[t(428)] * devicePixelRatio - et[t(353)].x / mt,
                        a = e[t(186)] * devicePixelRatio - et.start.y / mt;
                    et[t(497)].x = Math[t(311)](Ze[t(497)].x + r), et[t(497)].y = Math[t(311)](Ze[t(497)].y + a), er(), ft[t(644)][t(232)] && Vn(e)
                }
                Ie = !0
            }
        })), E[n(243)](n(191), mn), E[n(243)](n(185), (function(e) {
            var t = n;
            if (e[t(495)] && (he(!1), !tt)) {
                if (e[t(432)](), e[t(429)]) yt(vt - e[t(182)] / 1e3, !0);
                else if (e[t(559)]) 1 == Math.sign(e.deltaY) ? Fr(Ce == be[xe[t(692)] - 1] ? be[0] : be[Me(Ce) + 1]) : Fr(Ce == be[0] ? be[xe[t(692)] - 1] : be[Me(Ce) - 1]);
                else {
                    var r = e[t(477)],
                        a = e[t(182)];
                    e.shiftKey && (r ^= a, r ^= a ^= r), Ln(et[t(497)].x - r, et[t(497)].y - a)
                }
                Ie = !0
            }
        }), {
            passive: !1
        }), document[n(243)](n(526), (function(e) {
            var t = n;
            if (e[t(495)] && (e[t(432)](), e[t(641)] == $n && !Gn)) {
                if (nt && it[t(353)] && it[t(235)]) {
                    var r = Math.min(it[t(353)].x, it[t(235)].x),
                        o = Math[t(338)](it[t(353)].y, it[t(235)].y),
                        i = Math[t(207)](it[t(353)].x, it[t(235)].x),
                        c = Math[t(207)](it.start.y, it[t(235)].y);
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
                                    ft[t(695)][t(232)] && ft[t(487)][t(232)] ? f += String.fromCharCode(ge + g[1]) : ft[t(695)].checked ? f += String[t(308)](ge + x) : ft[t(487)][t(232)] && (f += String[t(308)](ge + fa(0, w))), hr(g[0], w) || (0 != w && (v = !0), 0 != x && (d = !0)), De.x++
                                }
                            }
                            De.x = r, De.y++, s += "\n", f += "À"
                        }
                        s = s[t(511)](0, -1), f = f[t(511)](0, -1), s[t(608)](t(681)) && (d = v = !1), ft[t(695)][t(232)] && d || ft[t(487)][t(232)] && v ? br(s + ne + f) : br(s), De.x = l, De.y = u, kr(t(320), 1500);
                        var b = document[t(450)]("copyico");
                        b.src = t(685), setTimeout((function() {
                            b[t(234)] = "/static/copy.svg"
                        }), 1e3)
                    }
                } else if (Math[t(413)](Math[t(311)](e.clientX - et[t(353)].x / m)) < 10 && Math.abs(Math[t(311)](e[t(186)] - et[t(353)].y / m)) < 10 && 0 == e[t(253)] && (Qn ? Qn = !1 : function(e) {
                        var n = t;
                        if (e[n(495)]) {
                            var r = rr(e),
                                o = 20 * Math[n(193)](r.x / 20),
                                i = 10 * Math[n(193)](r.y / 10),
                                c = o + "," + i;
                            if (Te.has(c)) {
                                var l = Te[n(418)](c);
                                if (rt && 0 != H)
                                    if (at) {
                                        var u = 0;
                                        u = K(l[n(189)]) ? X(l[n(189)]) : l[n(189)][n(511)]();
                                        var s = r.x - o + 20 * (r.y - i);
                                        if (0 == u[s]) dt[n(236)][n(232)] ? u[s] = 1 : u[s] = 2;
                                        else if (1 == u[s]) dt[n(236)][n(232)] ? u[s] = 0 : u[s] = 2;
                                        else if (2 == u[s]) {
                                            if (2 != H && !h) return;
                                            dt.protectOwner[n(232)] ? u[s] = 0 : u[s] = 1
                                        }
                                        var f = Y(u); - 1 != f ? a[n(205)](Gr({
                                            p: [c, f]
                                        })) : a[n(205)](Gr({
                                            p: [c, u[s], s]
                                        }))
                                    } else {
                                        if (u = 0, K(l[n(189)])) {
                                            if (0 == l[n(189)]) u = dt[n(236)][n(232)] ? 1 : 2;
                                            else if (1 == l[n(189)]) u = dt[n(236)][n(232)] ? 0 : 2;
                                            else if (2 == l[n(189)]) {
                                                if (2 != H && !h) return;
                                                u = dt.protectOwner.checked ? 0 : 1
                                            }
                                        } else {
                                            if (2 != H && function(e) {
                                                    if (K(e)) return 2 == e;
                                                    for (var t = 0; t < 200; t++)
                                                        if (2 == e[t]) return !0;
                                                    return !1
                                                }(l[n(189)]) && !h) return;
                                            u = dt[n(236)][n(232)] ? 1 : 2
                                        }
                                        a[n(205)](Gr({
                                            p: [c, u]
                                        }))
                                    } ot && (vn ? vn = !1 : (h || 0 != H) && a[n(205)](Gr({
                                    c: [o, i, o + 19, i + 9]
                                })))
                            }
                        }
                    }(e)), $n = void 0, tt = !1, et.start.x = null, et.start.y = null, Ln(et[t(497)].x, et[t(497)].y), ft[t(644)][t(232)]) {
                    Vn(e);
                    var M = ct[t(692)] - 1;
                    ((lt = {
                        dx: ct[0][0] - ct[M][0],
                        dy: ct[0][1] - ct[M][1],
                        dt: ct[0][2] - ct[M][2]
                    }).dt > 90 || Math[t(413)](lt.dx) < 5 && Math[t(413)](lt.dy) < 5) && (lt = null)
                }
                E.style.cursor = t(291), Ie = !0
            }
        })), document[n(243)](n(315), Zn), document[n(243)](n(483), Zn), i.addEventListener("input", (function(e) {
            var t = n;
            if (e[t(432)](), e.isTrusted) {
                if ("insertLineBreak" != e.inputType) return t(614) == e.inputType ? (De.x -= 1, fr(" ", 0, !1, !0) || (De.x += 1), void xr()) : void(null != e[t(248)] && "" != e[t(248)] && t(188) != e[t(426)] && (xr(), Array[t(198)](e[t(248)])[t(692)] > 1 ? gr(e.data) : fr(e[t(248)], 1)));
                Er()
            }
        })), i[n(243)](n(620), (function(e) {
            var t = n;
            if (e.isTrusted) {
                switch (e[t(696)]) {
                    case 38:
                        De.y -= 1, xr(), he(!1), e.preventDefault();
                        break;
                    case 40:
                        De.y += 1, xr(), he(!1), e[t(432)]();
                        break;
                    case 37:
                        De.x -= 1, xr(), he(!1), e[t(432)]();
                        break;
                    case 39:
                        De.x += 1, xr(), he(!1), e.preventDefault();
                        break;
                    case 9:
                        De.x += 3, xr(), he(!1), e[t(432)]();
                        break;
                    case 36:
                        De.x = De[t(353)], xr(), he(!1), e[t(432)]();
                        break;
                    case 46:
                        fr(" ", 0, !1, !0), xr(), e.preventDefault()
                }
                tr(), (!e[t(429)] && !e[t(362)] && !e.altKey || 37 == e[t(696)] || 38 == e[t(696)] || 39 == e[t(696)] || 40 == e[t(696)]) && ar()
            }
        })), document[n(243)]("keydown", (function(e) {
            var t = n;
            if (e[t(495)]) switch (e[t(696)]) {
                case 90:
                    e[t(429)] && (function() {
                        var e = t;
                        if (0 != Ue[e(692)]) {
                            var n = Ue[e(694)]();
                            De.x = n[0], De.y = n[1];
                            var r = Ce,
                                a = ye(),
                                o = da(n[3]);
                            Ce = o[0], pe(o[1]), fr(n[2], 0, !0) || Ue.unshift(n), Ce = r, pe(a)
                        }
                    }(), e[t(432)]());
                    break;
                case 89:
                    e[t(429)] && (function() {
                        var e = t;
                        if (0 != He[e(692)]) {
                            var n = He[e(694)]();
                            De.x = n[0], De.y = n[1];
                            var r = Ce,
                                a = ye(),
                                o = da(n[3]);
                            Ce = o[0], pe(o[1]), fr(n[2], 1, !1) || He[e(367)](n), Ce = r, pe(a)
                        }
                    }(), e[t(432)]());
                    break;
                case 67:
                    e.altKey && Mr(e);
                    break;
                case 71:
                    e[t(429)] && (e[t(432)](), Ar());
                    break;
                case 66:
                    e.ctrlKey && (e[t(432)](), Dr(t(274)), he(!0));
                    break;
                case 73:
                    e[t(429)] && (e[t(432)](), Dr(t(251)), he(!0));
                    break;
                case 85:
                    e.ctrlKey && (e[t(432)](), Dr("underline"), he(!0));
                    break;
                case 83:
                    e.ctrlKey && (e[t(432)](), Dr(t(728)), he(!0));
                    break;
                case 18:
                    e[t(432)]();
                    break;
                case 27:
                    nt && (nt = !1, it = {}, E.style[t(259)] = t(291), e[t(432)]()), k.classList[t(539)](t(672)), he(!1), xr();
                    break;
                case 107:
                case 187:
                    e[t(429)] && (e.preventDefault(), yt(vt + .1, !0));
                    break;
                case 109:
                case 189:
                    e[t(429)] && (e.preventDefault(), yt(vt - .1, !0))
            }
        })), i[n(243)](n(301), (function(e) {
            var t = n;
            e[t(495)] && gr((e[t(524)] || window[t(524)])[t(395)](t(291)))
        })), i[n(243)]("copy", (function(e) {
            var t = n,
                r = wr();
            if (r) {
                br(r[0]), e[t(432)](), e[t(524)] || kr(t(339), 1e3);
                var a = document[t(450)](t(632));
                a[t(234)] = t(685), setTimeout((function() {
                    var e = t;
                    a[e(234)] = e(561)
                }), 1e3), i[t(310)]()
            }
        })), Ge.addEventListener(n(191), (function() {
            kr(Qe + n(656), 3e3)
        })), Ve[n(243)](n(191), (function() {
            var e = n;
            history[e(471)]({}, null, o), br(location[e(416)] + "//" + location[e(593)] + o + "?x=" + De.x + e(423) + -De.y), kr("Copied link.", 1e3), i[e(310)]()
        })), document.getElementById(n(360))[n(243)](n(191), (function() {
            Ir(0)
        })), document.getElementById("openmenu")[n(243)]("click", (function() {
            Ir(1)
        })), document[n(450)](n(723)).addEventListener(n(191), (function() {
            Ir(2)
        })), document.getElementById("home")[n(243)](n(191), (function() {
            var e = n;
            vr(), 0 == De.x && 0 == De.y ? Hn(e(299), e(699)) && dr(0, 0) : dr(0, 0)
        })), document[n(450)]("copy").addEventListener("click", Mr), document[n(450)]("paste")[n(243)](n(191), (function() {
            var e = n;
            navigator.clipboard[e(528)]()[e(630)]((function(t) {
                var n = e;
                gr(t);
                var r = document.getElementById("pasteico");
                r[n(234)] = n(685), setTimeout((function() {
                    r.src = "/static/paste.svg"
                }), 1e3), dn()
            }))
        })), document[n(450)](n(263)).addEventListener(n(191), (function() {
            Lr()
        })), P[n(243)](n(223), Or), L[n(243)]("input", Or), O[n(243)]("change", (function(e) {
            Or(e), Lr(2)
        })), D[n(243)]("input", (function() {
            kt(ae)
        })), N[n(243)](n(223), (function() {
            kt(ae)
        })), document[n(450)](n(292))[n(243)](n(191), Ar), b[n(243)](n(191), (function(e) {
            var t = n,
                r = JSON[t(417)](e.target[t(232)]);
            switch (e[t(652)]) {
                case ft[t(591)]:
                    localStorage.setItem(t(591), r), Ie = !0;
                    break;
                case ft[t(442)]:
                    localStorage.setItem(t(442), r), Ie = !0;
                    break;
                case ft[t(214)]:
                    localStorage.setItem("showchat", r), e[t(652)].checked ? In[t(271)][t(539)](t(215)) : In[t(271)][t(536)](t(215));
                    break;
                case ft[t(549)]:
                    localStorage[t(579)](t(549), r), dt[t(488)][t(232)] || Pr(ft[t(549)].checked), Ie = !0, Dn();
                    break;
                case ft[t(644)]:
                    localStorage[t(579)](t(644), r), Ie = !0;
                    break;
                case ft[t(444)]:
                    localStorage.setItem(t(444), r);
                    break;
                case ft[t(695)]:
                    localStorage[t(579)]("copycolour", r);
                    break;
                case ft[t(487)]:
                    localStorage[t(579)]("copydecorations", r);
                    break;
                case ft.rainbow:
                    localStorage[t(579)](t(555), r);
                    break;
                case ft[t(392)]:
                    localStorage[t(579)]("anonymous", r), Xe = !0, Ie = !0;
                    break;
                case gt:
                    document[t(450)]("login")[t(670)][t(208)] = t(212), document[t(450)](t(364))[t(670)][t(208)] = t(556);
                    break;
                case xt:
                    document[t(450)]("login").style[t(208)] = t(556), document[t(450)](t(364)).style[t(208)] = t(212);
                    break;
                case wt:
                    bt(!0)
            }
        })), document[n(450)](n(711))[n(243)](n(191), (function() {
            var e = n;
            k[e(271)][e(539)]("open")
        })), document[n(450)]("tpwordgo").addEventListener("click", (function(e) {
            var t = n;
            e[t(432)]();
            var r = document.getElementById(t(421));
            Tr(r.value), r.blur()
        })), document[n(450)](n(421))[n(243)](n(223), (function() {
            var e = n,
                t = document.getElementById(e(421))[e(496)][e(437)](/^\/|\/$/g, ""),
                r = 0 == t || t.startsWith("~") ? {
                    x: 0,
                    y: 0
                } : Vr(t);
            document[e(450)]("tpx")[e(496)] = r.x, document[e(450)]("tpy").value = -r.y
        })), document[n(450)](n(187))[n(243)](n(191), (function(e) {
            var t = n;
            e[t(432)]();
            var r = document.getElementById(t(669)),
                a = document[t(450)](t(420)),
                i = parseInt(r[t(496)], 10),
                c = parseInt(a.value, 10);
            isNaN(i) && isNaN(c) || (0 !== i && (i = i || De.x), 0 !== c && (c = c || De.y), dr(i, -c), history[t(471)]({}, null, o), k[t(271)][t(539)](t(672)), r.blur(), a[t(184)]())
        })), window[n(243)](n(563), On), window[n(243)]("orientationchange", On), window.addEventListener("popstate", (function() {
            Tr(Qr())
        })), window[n(243)](n(310), (function() {
            p = !0, Rn(), oa()
        })), window[n(243)](n(184), (function() {
            p = !1, Rn()
        })), ht[n(243)](n(223), pt), ht.addEventListener(n(684), pt), Oe.addEventListener(n(306), (function(e) {
            var t = n;
            a && a[t(734)] == a[t(349)] && a[t(205)](e.data)
        })), document[n(450)]("chatbutton")[n(243)](n(191), (function() {
            var e = n;
            In[e(271)][e(287)](e(672)) ? In[e(271)][e(539)]("open") : (In[e(271)][e(536)](e(672)), Cn[e(271)][e(539)](e(242)), An())
        })), document[n(450)](n(725)).addEventListener(n(191), Tn), document.getElementById(n(347))[n(243)]("keyup", (function(e) {
            13 == e[n(696)] && Tn(e)
        })), document.getElementById(n(411))[n(243)](n(191), (function(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document[t(450)](t(436)),
                    o = document[t(450)](t(176));
                Sn[t(558)](r.value) ? 0 != r[t(496)][t(692)] ? 0 != o[t(496)][t(692)] ? (En(!0), a[t(205)](Gr({
                    login: [r.value, o.value]
                }))) : kr(t(408), 3e3) : kr(t(340), 3e3) : kr("Username is invalid.", 3e3)
            }
        })), document.getElementById(n(516)).addEventListener(n(191), (function(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document.getElementById(t(369)),
                    o = document.getElementById("password"),
                    i = document.getElementById("password2");
                Sn[t(558)](r[t(496)]) ? 0 != r.value.length ? 0 != o[t(496)][t(692)] ? o[t(496)] == i.value ? (En(!0), a[t(205)](Gr({
                    register: [r.value, o[t(496)]]
                }))) : kr(t(730), 3e3) : kr(t(279), 3e3) : kr("Please type a username.", 3e3) : kr(t(658), 3e3)
            }
        })), document.getElementById(n(380))[n(243)](n(594), kn), document[n(450)]("register").addEventListener("submit", kn), document[n(450)](n(410))[n(243)]("click", (function() {
            var e = n,
                t = document.getElementById(e(501));
            t.style[e(208)] = e(556) == t[e(670)][e(208)] ? e(212) : "block", document.getElementById("optionsmenu")[e(590)] = t[e(329)] - 60
        })), document[n(450)](n(344))[n(243)](n(594), kn), document[n(450)](n(419))[n(243)](n(191), (function(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document.getElementById(t(341)),
                    o = document[t(450)]("chngeusrpass");
                Sn[t(558)](r[t(496)]) ? 0 != r.value[t(692)] ? Je != r.value ? 0 != o[t(496)][t(692)] ? (En(!0), a[t(205)](Gr({
                    namechange: [r.value, o[t(496)]]
                }))) : kr(t(408), 3e3) : kr(t(226), 3e3) : kr(t(724), 3e3) : kr("Username is invalid.", 3e3)
            }
        })), document.getElementById(n(580))[n(243)](n(594), kn), document[n(450)](n(584))[n(243)](n(191), (function(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document[t(450)](t(257)),
                    o = document[t(450)]("newpass"),
                    i = document[t(450)](t(385));
                0 != r[t(496)].length ? 0 != o[t(496)][t(692)] ? 0 != i.value[t(692)] ? o[t(496)] == i.value ? (En(!0), a[t(205)](Gr({
                    passchange: [r[t(496)], o[t(496)]]
                }))) : kr(t(371), 3e3) : kr("Please type your new password again.", 3e3) : kr(t(735), 3e3) : kr(t(408), 3e3)
            }
        })), document[n(450)](n(458))[n(243)]("submit", kn), document[n(450)](n(581))[n(243)](n(191), (function(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document[t(450)](t(448));
                0 != r[t(496)][t(692)] ? (En(!0), a[t(205)](Gr({
                    deleteaccount: r.value
                }))) : kr(t(408), 3e3)
            }
        })), dt.protect.addEventListener("click", (function(e) {
            var t = n;
            rt = e[t(652)][t(232)], dt[t(464)].checked = !1, Ie = !0
        })), dt[n(464)].addEventListener(n(191), (function(e) {
            var t = n;
            rt = e[t(652)][t(232)], dt[t(236)].checked = !1, Ie = !0
        })), dt[n(472)][n(243)](n(191), (function(e) {
            var t = n;
            ot = e[t(652)][t(232)], at = !1, Ie = !0
        })), dt[n(390)][n(243)](n(191), (function(e) {
            var t = n;
            a.send(Gr({
                ro: e[t(652)][t(232)]
            }))
        })), dt[n(373)][n(243)](n(191), (function(e) {
            var t = n;
            a[t(205)](Gr({
                priv: e[t(652)].checked
            }))
        })), dt[n(619)][n(243)](n(191), (function(e) {
            var t = n;
            a.send(Gr({
                ch: e[t(652)][t(232)]
            }))
        })), dt.disableChat[n(243)](n(191), (function(e) {
            var t = n;
            a[t(205)](Gr({
                dc: e[t(652)][t(232)]
            }))
        })), dt[n(488)].addEventListener(n(191), (function(e) {
            var t = n;
            a[t(205)](Gr({
                dcl: e[t(652)].checked
            }))
        })), dt[n(393)].addEventListener("click", (function(e) {
            var t = n;
            a[t(205)](Gr({
                db: e[t(652)][t(232)]
            }))
        })), document[n(450)](n(479))[n(243)]("click", (function(e) {
            var t = n;
            e[t(432)](), document[t(450)](t(354));
            var r = document[t(450)](t(439)),
                o = document[t(450)](t(527)),
                i = r[t(496)][t(355)]();
            r[t(496)] = "", (i[t(692)] = function(e) {
                for (var n = t, r = document[n(450)](n(527)), a = 0; a < r[n(177)]; a++)
                    if (r[n(270)][a][n(246)] == e) return !0;
                return !1
            }(i) || i == Je) || (Sn[t(558)](i) ? o[t(177)] >= 20 ? kr(t(667), 3e3) : a[t(205)](Gr({
                addmem: i
            })) : kr(t(658), 3e3))
        })), ee[n(243)](n(191), (function(e) {
            var t = n,
                r = document.getElementById(t(180));
            if (null == r) {
                var o = document[t(267)]("br");
                return e.target[t(352)][t(256)](o, e.target.nextSibling), (r = document[t(267)]("input")).type = t(291), r[t(621)] = t(361), r[t(317)] = 7, r.id = t(180), o[t(352)].insertBefore(r, o[t(389)]), void r[t(310)]()
            }
            t(453) == r[t(496)].toLowerCase() ? (r.parentElement[t(249)](r[t(597)]), r[t(352)].removeChild(r), a.send(Gr({
                dw: 0
            })), Hn(t(299), t(699)), kr(t(217), 3e3)) : kr(t(381), 3e3)
        })), document[n(450)]("l").addEventListener(n(191), (function(e) {
            var t = n;
            h && a[t(205)](Gr({
                l: e[t(652)][t(232)]
            }))
        })), document[n(450)](n(202)).addEventListener(n(191), (function() {
            var e = n;
            if (h) {
                document[e(450)](e(422))[e(204)] = "";
                var t = !1;
                for (const n of We[e(697)]()) Mn(n), t = !0;
                if (t) {
                    var r = document.getElementById(e(354));
                    r.scrollTop = r[e(401)]
                }
            }
        })), document[n(450)]("sendalert")[n(243)](n(191), (function() {
            var e = n,
                t = document.getElementById(e(521))[e(496)];
            h && 0 != t.length && a[e(205)](Gr({
                alert: t
            }))
        })), document[n(450)]("reload")[n(243)](n(191), (function() {
            h && a.send(Gr({
                reload: !0
            }))
        })), document[n(450)](n(276))[n(243)](n(191), (function() {
            var e = n;
            if (h) {
                var t = document[e(450)](e(622))[e(496)];
                0 != t[e(692)] && a[e(205)](Gr({
                    aaa: t
                }))
            }
        })), document.getElementById("free").addEventListener("click", (function() {
            var e = n;
            if (h) {
                var t = document[e(450)](e(336))[e(496)];
                0 != t.length && a[e(205)](Gr({
                    aaaa: t
                }))
            }
        })), w[n(540)]("id", "textarea"), i[n(540)]("id", n(732));
        var Sn = /^[\w.-]+$/;
        const In = document[n(450)](n(688)),
            Cn = document[n(450)](n(525));

        function An() {
            var e = n,
                t = document[e(450)]("chatbox");
            t.scrollTop = t[e(401)]
        }

        function Bn() {
            var e = n,
                t = document.getElementById(e(322));
            null != t[e(434)] && "HR" != t.lastElementChild[e(275)] && (t.appendChild(document.createElement("hr")), An())
        }

        function Tn(e) {
            var t = n;
            if (e[t(495)]) {
                var r = document[t(450)](t(347));
                An(), _e + 300 > performance[t(588)]() || (/^[\s?]*$/.test(r.value) ? r[t(496)] = "" : (a.send(Gr({
                    msg: r[t(496)][t(726)](0, 180)
                })), _e = performance[t(588)](), r[t(496)] = "", r[t(310)]()))
            }
        }

        function Fn() {
            var e = n,
                t = document[e(731)](e(547))[0];
            dt.readOnly[e(232)] && 0 == H || z && "" == Je ? t[e(271)][e(536)](e(215)) : t[e(271)][e(539)](e(215))
        }

        function Pn(e) {
            var t = n;
            e[t(432)](), Hn(e[t(652)][t(246)][t(355)](), t(699)) && dr(0, 0)
        }

        function Ln(e, t, r) {
            var a = n;
            r ? (et[a(497)].x = e, et[a(497)].y = t) : (et[a(497)].x = Math.ceil(e), et[a(497)].y = Math[a(400)](t)), er(), Ze[a(497)].x = et[a(497)].x, Ze[a(497)].y = et[a(497)].y;
            var o = et[a(211)].x,
                i = et[a(211)].y;
            et.coords.x = Math[a(193)](window[a(383)] / mt / 20 - et[a(497)].x / 10 / m), et[a(211)].y = Math[a(193)](window[a(435)] / mt / 40 - et[a(497)].y / 20 / m), nr(), qe = o != et[a(211)].x || i != et.coords.y
        }

        function On() {
            var e = n,
                t = m;
            if (m = devicePixelRatio * mt, E[e(624)] = Math[e(311)](window.innerWidth * devicePixelRatio), E[e(307)] = Math[e(311)](window.innerHeight * devicePixelRatio), E[e(670)][e(624)] = Math[e(311)](E[e(624)] / devicePixelRatio) + "px", E.style[e(307)] = Math.round(E[e(307)] / devicePixelRatio) + "px", S[e(440)] = !1, Ie = !0, t != m) {
                he(!1);
                var r = Math.floor((et[e(497)].x - E[e(624)] / 2) / t),
                    a = Math[e(193)]((et[e(497)].y - E[e(307)] / 2) / t);
                Ln((r + window[e(383)] / mt / 2) * m, (a + window.innerHeight / mt / 2) * m), kt(ae)
            }
        }

        function Rn() {
            var e = n,
                t = y;
            e(299) != J && (t = "~" + J, "main" != $ && (t += "/" + $)), null == a || a[e(734)] == a[e(391)] ? document[e(534)] = y + e(455) : document.title = p ? "textwall" != J ? t : y : t + " (" + $e + " nearby)"
        }

        function Dn(e) {
            var t = n;
            Pe = [], Le[t(472)]();
            var r = [];
            for (const e of Te[t(697)]()) {
                var a = Pt(e);
                r.push(a[0], a[1])
            }
            for (var o = cn(r), i = 0; i < o[t(692)]; i++) {
                var c = o[i][1],
                    l = r[c] + "," + r[c + 1],
                    u = Te[t(418)](l);
                e ? u[t(189)] && Dt(l, !1) : u[t(484)] || Dt(l, !1)
            }
        }
        var Nn = "" != siteKey,
            jn = !1;

        function Un() {
            var e = n;
            if (document[e(450)](e(250)).innerText = "Connected.", document[e(450)]("connecting2")[e(246)] = "", document[e(450)]("admin")[e(670)].display = e(212), Nn && "" != siteKey) return document[e(450)](e(661)).innerText = e(733), void grecaptcha.ready((function() {
                var t = e,
                    n = document[t(267)]("div");
                n.id = "recaptcha", l[t(258)](n), grecaptcha.render(t(402), {
                    sitekey: siteKey,
                    callback: function(e) {
                        a.send(Gr({
                            verify: e
                        }))
                    }
                })
            }));
            "" == Je && null != localStorage.getItem(e(369)) && null != localStorage[e(262)](e(372)) && (En(!0), a[e(205)](Gr({
                token: [localStorage[e(262)]("username"), localStorage[e(262)](e(372))]
            })));
            var t = e(299),
                r = "main",
                o = location[e(509)].split("/")[e(729)](1, 2);
            o[0].startsWith("~") && "" == (t = o[0][e(437)]("~", "")) && (t = e(299)), 2 == o[e(692)] && (r = o[1]), Hn(t, r)
        }

        function Hn(e, t) {
            var r = n;
            return !(J == e && $ == t || Q || (Q = !0, e = e[r(355)](), t = t.toLowerCase(), clearInterval(Ee), clearInterval(Se), xr(), Bn(), an = null, a.send(Gr({
                j: [e, t]
            })), ir(), Te[r(472)](), We[r(472)](), Fe = [], 0))
        }

        function Wn() {
            var e = n,
                t = e(538);
            jn && (t = "CAPTCHA failed."), l[e(204)] = "", document[e(450)](e(250))[e(246)] = t, document[e(450)]("connecting2").innerText = e(480), Nn = !0, Rn(), h = !1, un = !1, $ = "", J = "", Bn(), An(), c[e(670)][e(208)] = e(683), setTimeout((function() {
                var t = e;
                c.style[t(541)] = t(181)
            }), 50), clearInterval(Ee), clearInterval(Se), xr(), bt(!1), c[e(244)] = oa
        }

        function Kn(e) {
            var t = n,
                r = new Uint8Array(e.data).buffer,
                a = _r(new Uint8Array(r));
            switch (Object[t(697)](a)[0]) {
                case "verify":
                    var i = a.verify;
                    Nn = !i, jn = !i, l[t(204)] = "", i && Un();
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
                    J = s[0], $ = s[1], Rn(), "textwall" == J && (dt[t(373)][t(326)] = !0), t(299) != J ? t(699) != $ ? (o = "/~" + J + "/" + $, history.pushState({}, null, o)) : (o = "/~" + J, history[t(471)]({}, null, o)) : (o = "/", Qr().startsWith("~") && history[t(471)]({}, null, o), ee.style[t(208)] = "none"), un = !1, Ee = setInterval(sn, 250), Se = setInterval(fn, 2e3), sn(), xr(), c.style[t(541)] = "0%", nt = !1, it = {}, E[t(670)][t(259)] = t(291), We[t(472)](), Fe = [], Q = !1, Jn(), ft.showchat[t(232)] && In.classList.remove(t(215)), b.classList[t(539)](t(215)), _[t(204)] = "", Ke = !0, Ye = !0, Xe = !0, setTimeout((function() {
                        var e = t;
                        c.style[e(208)] = e(212)
                    }), 500);
                    break;
                case "alert":
                    kr(a[t(493)], 8e3);
                    break;
                case "online":
                    Qe = a[t(365)], Ge[t(534)] = Qe + t(656);
                    break;
                case "e":
                    var f = a.e.e;
                    null == f && (f = a.e);
                    for (var d = 0; d < f[t(692)]; d++) {
                        var v = (k = 20 * f[d][0]) + "," + (S = 10 * f[d][1]);
                        if (Te[t(403)](v) && null != (I = Te[t(418)](v))[t(585)])
                            for (var m = 2; m < f[d][t(692)]; m += 3) {
                                var y = String.fromCodePoint(f[d][m]),
                                    p = f[d][m + 1],
                                    g = f[d][m + 2];
                                I[t(585)][p] == y && I[t(499)][p] == g || (I[t(585)][p] = y, I[t(499)][p] = g, Nt(v, Jt(p))), setTimeout(or, (m - 2) / 3 * 25, k + (p - 20 * Math.floor(p / 20)), S + Math[t(193)](p / 20), g, a.e.a)
                            }
                    }
                    break;
                case t(350):
                    var x = (a = a.chunks)[t(692)];
                    for (d = 0; d < x; d += 5) {
                        var w = (k = 20 * a[d]) + "," + (S = 10 * a[d + 1]);
                        if (Te[t(403)](w))
                            if ((I = Te[t(418)](w)).coords = [k, S], I.protected = q(a[d + 4]), 0 !== a[d + 2])
                                for (Dt(w, !0), I[t(585)] = Array.from(a[d + 2]), I[t(499)] = Array[t(198)](a[d + 3]), m = 0; m < 200; m++) I[t(499)][m] = I[t(499)][m].codePointAt() - ge;
                            else I[t(585)] = ut[t(511)](), I[t(499)] = st[t(511)](), I[t(484)] = K(I[t(189)])
                    }
                    var M = ln[t(692)];
                    for (d = 0; d < M; d += 2) {
                        var k, S;
                        w = (k = 20 * ln[d]) + "," + (S = 10 * ln[d + 1]), Te[t(403)](w) && null == (I = Te[t(418)](w))[t(585)] && Te[t(430)](w, {
                            txt: ut[t(511)](),
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
                    if (w = C[0], null != (I = Te[t(418)](w))) {
                        var A = C[1];
                        null == (p = C[2]) ? I[t(189)] = A : (K(I.protected) && (I[t(189)] = X(I[t(189)])), I[t(189)][p] = A, -1 != Y(I[t(189)]) && (I.protected = A)), Nt(w, !0)
                    }
                    break;
                case "c":
                    var B = (u = a.c)[4];
                    ! function(e, n, r, a, o) {
                        for (var i = t, c = n; c <= a; c++)
                            for (var l = e; l <= r; l++) {
                                var u = 20 * Math[i(193)](l / 20),
                                    s = 10 * Math[i(193)](c / 10),
                                    f = u + "," + s;
                                if (Te[i(403)](f)) {
                                    var d = Te[i(418)](f);
                                    if (null != d[i(585)]) {
                                        var v = l - u + 20 * (c - s);
                                        o && !K(d[i(189)]) && 2 == d[i(189)][v] || (d[i(585)][v] = " ", d[i(499)][v] = 0, Dt(f, Jt(v)))
                                    }
                                }
                            }
                        Ie = !0
                    }(u[0], u[1], u[2], u[3], B);
                    break;
                case "cu":
                    var T = a.cu,
                        F = T.id;
                    We[t(403)](F) || We[t(430)](F, {
                        c: 0,
                        n: "",
                        l: [0, 0],
                        rawx: 0,
                        rawy: 0
                    });
                    var P = We[t(418)](F);
                    null != T.l && (P.l = T.l, ft.smoothcursors[t(232)] || (P[t(316)] = P.l[0], P[t(737)] = P.l[1])), null != T.c && (P.c = T.c), null != T.n && (P.n = T.n), Ie = !0, Jn();
                    break;
                case "msg":
                    var L = a[t(357)];
                    ! function(e, n, r, a) {
                        var o = t,
                            i = document[o(450)](o(322)),
                            c = document[o(267)]("p"),
                            l = document[o(267)]("a");
                        l.innerText = e, l[o(670)][o(342)] = o(605) == xe[n] ? o(664) : xe[n], a && (l[o(407)] = "/~" + e, l[o(243)]("click", Pn)), c[o(258)](l), c[o(258)](document[o(239)](o(675) + r));
                        var u = Math[o(413)](i.scrollHeight - i[o(590)] - i[o(329)]) < 5;
                        i[o(258)](c), u && An(), In.classList.contains("open") || Cn.classList[o(536)](o(242))
                    }(L[0], L[1], L[2], L[3]);
                    break;
                case "rc":
                    We.delete(a.rc), Ie = !0, Jn();
                    break;
                case "ro":
                    var O = a.ro;
                    dt.readOnly[t(232)] = O, O && kr(t(312), 3e3), Fn();
                    break;
                case t(398):
                    dt[t(373)][t(232)] = a[t(398)],
                        function() {
                            var e = t;
                            if (null != Z)
                                for (var n = 0; n < Z[e(692)]; n += 2)
                                    if (Z[n] == $) return Z[n + 1] = dt.private[e(232)], void zn(Z)
                        }();
                    break;
                case "ch":
                    var R = a.ch;
                    dt[t(619)][t(232)] = R, h || (ft[t(591)][t(326)] = R, ft[t(591)][t(232)] = !R && t(332) != localStorage[t(262)](t(591))), Ie = !0;
                    break;
                case "dc":
                    var D = a.dc;
                    dt[t(314)].checked = D, ft[t(214)][t(326)] = D, D ? (ft.showchat[t(232)] = !1, In[t(271)][t(536)](t(215))) : (ft[t(214)][t(232)] = t(332) != localStorage[t(262)](t(214)), ft.showchat[t(232)] && In[t(271)][t(539)](t(215)));
                    break;
                case t(348):
                    var N = a[t(348)];
                    dt[t(488)].checked = N, Pr(!!N || ft[t(549)][t(232)]);
                    break;
                case "db":
                    var j = a.db;
                    dt[t(393)][t(232)] = j;
                    break;
                case "l":
                    z = !0, document.getElementById("l").checked = !0, Fn();
                    break;
                case t(351):
                    H = a[t(351)], V[t(670)][t(208)] = t(2 == H || 1 == H ? 556 : 212), 2 == H ? (G[t(670)][t(208)] = t(556), ee[t(670)].display = t(556)) : (G[t(670)][t(208)] = t(212), ee.style[t(208)] = "none"), document[t(450)](t(366))[t(670)][t(208)] = t(1 != H || h ? 556 : 212), dt.readOnly[t(326)] = dt[t(373)][t(326)] = dt[t(619)][t(326)] = dt[t(314)][t(326)] = dt[t(488)][t(326)] = dt[t(393)][t(326)] = !(2 == H || h), h && (ee[t(670)][t(208)] = t(299) != J || Q ? t(556) : t(212)), 0 == H && (rt = !1, ot = !1), Ie = !0, Fn();
                    break;
                case "addmem":
                    Xn(a[t(709)]), optionsmenu[t(590)] = optionsmenu.clientHeight;
                    break;
                case "ml":
                    for (memberList = a.ml, document[t(450)](t(527))[t(204)] = "", d = 0; d < memberList[t(692)]; d++) Xn(memberList[d]);
                    break;
                case "wl":
                    zn(Z = a.wl);
                    break;
                case t(414):
                    kr("Username is already in use.", 3e3), En(!1);
                    break;
                case t(571):
                    kr(t(337), 3e3), En(!1);
                    break;
                case t(520):
                    kr(t(224), 3e3), En(!1);
                    break;
                case t(530):
                    kr("Username/Password is incorrect.", 3e3), En(!1);
                    break;
                case t(264):
                    En(!1), localStorage[t(359)](t(369)), localStorage[t(359)]("token");
                    break;
                case t(635):
                    En(!1), kr(t(481) + (Je = a[t(635)]), 3e3), localStorage[t(579)]("username", Je), Yn(), Ie = !0, Xe = !0;
                    break;
                case t(491):
                    kr(t(645), 3e3), En(!1);
                    break;
                case t(592):
                    kr(t(633), 3e3), En(!1), Xe = !0, bt(!0, !0);
                    break;
                case t(309):
                    kr("Rate limit", 3e3), En(!1);
                    break;
                case t(372):
                    En(!1);
                    var U = a[t(372)];
                    Je = U[0], localStorage[t(579)](t(369), Je), localStorage[t(579)](t(372), U[1]), document[t(450)]("login").style[t(208)] = t(212), document[t(450)](t(364)).style[t(208)] = t(212), document[t(450)](t(682))[t(670)].display = t(556), Yn(), Ie = !0, Xe = !0;
                    break;
                case t(240):
                    a.admin ? (h = !0, document[t(450)](t(240))[t(670)][t(208)] = t(556)) : (h = !1, document[t(450)](t(240))[t(670)][t(208)] = "none");
                    break;
                case "t":
                    document[t(450)]("t").value = a.t
            }
        }

        function Yn() {
            var e = n,
                t = document[e(450)](e(178));
            t[e(246)] = Je, t[e(407)] = "/~" + Je, t[e(244)] = function(e) {
                e.preventDefault(), Tr("~" + Je)
            }
        }

        function Xn(e) {
            var t = n,
                r = document[t(450)](t(527)),
                a = document[t(267)](t(522));
            a[t(271)][t(536)](t(290)), a.innerText = e, a[t(243)](t(191), qn), r[t(258)](a)
        }

        function qn(e) {
            var t = n,
                r = e[t(652)][t(246)];
            a[t(205)](Gr({
                rmmem: r
            })), e[t(652)].remove()
        }

        function zn(e) {
            for (var t = n, r = {}, a = [], o = !1, i = 0; i < e[t(692)]; i += 2) {
                var c = e[i],
                    l = e[i + 1];
                "main" == c ? o = !0 : a[t(490)](c), r[c] = l
            }
            a[t(382)](), o && a[t(367)](t(699)), _[t(204)] = "", _[t(258)](document[t(267)]("hr"));
            var u = document[t(267)](t(673));
            u[t(246)] = J + t(552), _[t(258)](u);
            var s = _.appendChild(document[t(267)]("ul"));
            for (s[t(271)][t(536)]("walllist"), i = 0; i < a.length; i++) {
                l = r[c = a[i]];
                var f = s[t(258)](document.createElement("li")),
                    d = document.createElement("a"),
                    v = document[t(267)](t(574));
                l ? (v[t(234)] = t(702), v.alt = v[t(534)] = t(533)) : (v[t(234)] = t(598), v[t(532)] = v[t(534)] = "Public");
                const e = "~" + J + ("main" == c ? "" : "/" + c);
                d[t(258)](v), d[t(258)](document[t(239)](e)), d.href = "/" + d[t(246)], d[t(271)][t(536)](t(190)), c == $ && d.classList[t(536)]("bold"), d[t(243)](t(191), (function(t) {
                    t.preventDefault(), Tr(e)
                })), f[t(258)](d), s[t(258)](f)
            }
            if (J == Je[t(355)]()) {
                var m = _[t(258)](document[t(267)](t(712)));
                m[t(670)][t(208)] = t(683), m[t(670)][t(537)] = t(482);
                var h = m[t(258)](document[t(267)](t(223)));
                h.type = t(291), h[t(621)] = t(319), h[t(317)] = 24, h[t(670)][t(624)] = t(181);
                var y = m[t(258)](document.createElement(t(223)));
                y[t(476)] = "submit", y[t(496)] = t(582), y.addEventListener(t(191), (function(e) {
                    var n = t;
                    e[n(432)]();
                    var r = h.value;
                    h[n(496)] = "", Wt[n(558)](r) ? (Hn(J, r), dr(0, 0), k[n(271)][n(539)](n(672))) : kr(n(557), 2e3)
                }))
            }
        }

        function Jn() {
            var e = n;
            $e = We[e(615)], Ge.innerText = $e + e(515), document[e(450)](e(347))[e(621)] = 0 == $e ? e(183) : 1 == $e ? e(327) : e(714) + $e + e(269), p || Rn()
        }
        var $n, Qn = !1;

        function Vn(e) {
            var t = n;
            ct[t(367)]([e[t(428)] * m / mt, e[t(186)] * m / mt, performance[t(588)]()]), ct[t(692)] > 4 && ct[t(710)]()
        }
        var Gn = !1,
            _n = 0;

        function Zn(e) {
            var t = n;
            e.isTrusted && (e.preventDefault(), e[t(641)] == $n && ($n = void 0))
        }

        function er() {
            var e = n;
            null != an && (et[e(497)].x = Math.max(Math[e(311)](10 * an.minx * m), et[e(497)].x), et[e(497)].x = Math[e(338)](Math.round(10 * an[e(462)] * m + E[e(624)]), et.offset.x), et.offset.y = Math.max(Math[e(311)](20 * an[e(438)] * m), et.offset.y), et[e(497)].y = Math[e(338)](Math[e(311)](20 * an[e(648)] * m + E[e(307)]), et[e(497)].y))
        }

        function tr() {
            var e = n;
            null != an && (De.x = Math[e(207)](Math[e(338)](De.x, an.maxx), an[e(600)] - 1), De.y = Math.max(Math.min(De.y, an[e(648)]), an[e(438)] - 1))
        }

        function nr() {
            var e = n;
            null != an && (et[e(211)].x = Math.max(Math[e(338)](et[e(211)].x, an[e(462)]), an.minx - 1), et[e(211)].y = Math[e(207)](Math[e(338)](et[e(211)].y, an[e(648)]), an[e(438)] - 1))
        }

        function rr(e) {
            var t = n;
            return {
                x: Math.floor((e[t(288)] * devicePixelRatio - et[t(497)].x) / (10 * m)),
                y: Math[t(193)]((e.pageY * devicePixelRatio - et.offset.y) / (20 * m))
            }
        }

        function ar() {
            var e = n;
            Ve[e(246)] = De.x + "," + -De.y, De.x + et[e(497)].x / m / 10 <= 0 && Ln(10 * -De.x * m, et[e(497)].y), De.x + et[e(497)].x / m / 10 >= window[e(383)] / mt / 10 - 1 && Ln((10 * -De.x + window[e(383)] / mt - 10) * m, et[e(497)].y), De.y + et[e(497)].y / m / 20 <= 0 && Ln(et[e(497)].x, 20 * -De.y * m);
            var t = window[e(383)] < 750 ? u[e(329)] : 0;
            De.y + et.offset.y / m / 20 >= (window.innerHeight - t) / mt / 20 - 1 && Ln(et[e(497)].x, (20 * -De.y + window[e(435)] / mt - 20 - t / mt) * m), Ke = Ne.x != De.x || Ne.y != De.y || Ke, Ne.x = De.x, Ne.y = De.y, ft[e(444)][e(232)] || (De.rawx = De.x, De.rawy = De.y), (Math[e(413)](De[e(446)].x - De.x) > 300 || Math.abs(De[e(446)].y - De.y) > 300) && (De.start = De.x, ir()), De.x < De[e(353)] && (De[e(353)] = De.x), Ie = !0, localStorage[e(579)]("x", De.x), localStorage.setItem("y", De.y)
        }

        function or(e, t, r, a) {
            var o = n;
            ft[o(549)].checked && (r = 0), r = da(r)[0], Tt([e, t], Bt(20)) || ze[o(490)]([e, t, .1, r, a])
        }

        function ir() {
            Ue = [], He = []
        }
        E[n(243)](n(603), (function(e) {
            var t = n;
            2 === e[t(640)].length && (Gn = !0, $n = void 0, _n = 0, i[t(184)]())
        }), {
            passive: !0
        }), E[n(243)]("touchmove", (function(e) {
            var r = n;
            Gn && (function(e) {
                var n = t;
                if (e.touches[n(692)] > 1) {
                    var r = Math[n(245)](sa(e[n(640)][0][n(288)] - e[n(640)][1][n(288)]) + sa(e[n(640)][0].pageY - e[n(640)][1][n(469)]));
                    0 != _n && yt(vt - (_n - r) / 300, !0), $n = void 0, _n = r
                }
            }(e), i[r(184)]())
        }), {
            passive: !0
        }), E[n(243)](n(220), (function(e) {
            Gn && ($n = void 0, _n = 0, Gn = !1, i.blur())
        }));
        var cr = 0,
            lr = performance[n(588)](),
            ur = 0;
        const sr = [4, 5, 7, 8, 9, 18, 11, 20, 13, 28, 15];

        function fr(e, t, r, a) {
            var o = n;
            if (he(!1), performance[o(588)]() - lr >= 100 && (lr = performance.now(), cr = 0), !e || cr >= 3) return 0;
            cr++;
            var i = (e = Array.from(e)[0])[o(356)]();
            if (dt[o(393)].checked && la(i)) return 0;
            var c = 20 * Math.floor(De.x / 20),
                l = 10 * Math[o(193)](De.y / 10),
                u = c + "," + l;
            if (!Te[o(403)](u)) return 0;
            var s = Te[o(418)](u),
                f = De.x - c + 20 * (De.y - l);
            if (!h) {
                if (null == s.txt || Q) return 0;
                if (z && "" == Je) return kr("Please log in before typing.", 3e3), 0;
                if (0 == H) {
                    if (dt.readOnly[o(232)]) return 0;
                    if (K(s[o(189)])) {
                        if (0 != s[o(189)]) return 0
                    } else if (0 != s[o(189)][f]) return 0
                }
                if (1 == H)
                    if (K(s[o(189)])) {
                        if (2 == s[o(189)]) return 0
                    } else if (2 == s.protected[f]) return 0
            }
            ft[o(555)].checked && !r && (Fr(sr[ur]), ++ur == sr[o(692)] && (ur = 0));
            var d, v, m, y, p, g, x, w, b, M, k, E = 1,
                S = a ? 0 : ye(),
                I = fa(Ce, S),
                C = s[o(499)][f],
                A = da(C),
                B = A[0],
                T = A[1],
                F = s[o(585)][f];
            return F == e && C == I || hr(e, S) && hr(F, T) || (b = T, M = e, k = S, mr(F) && mr(M) && (2 & b) == (2 & k) && (1 & b) == (1 & k) && B == Ce) || (r ? (p = De.x, g = De.y, x = s[o(585)][f], w = C, He[o(367)]([p, g, x, w]), He.length > 1e3 && He.pop()) : (d = De.x, v = De.y, m = s[o(585)][f], y = C, Ue[o(367)]([d, v, m, y]), Ue.length > 1e3 && Ue.pop()), s[o(585)][f] = e, s[o(499)][f] = I, Fe[o(490)]([c / 20, l / 10, e[o(356)](), f, I]), E = 2, Nt(u, Jt(f))), De.lastedit.x = De.x, De[o(446)].y = De.y, De.x += t, ar(), E
        }

        function dr(e, t) {
            var r = n;
            he(!1), De.x = e, De.y = t, tr(), Ln((10 * -De.x + window.innerWidth / mt / 2) * m, (20 * -De.y + window[r(435)] / mt / 2) * m), document[r(450)]("tpword").value = "", document.getElementById(r(669))[r(496)] = 0, document[r(450)](r(420))[r(496)] = 0, xr(), ar(), dn(), fn()
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
        const yr = Math[n(254)](5 / 3) / 1e3;
        var pr = !1;

        function gr(e) {
            var t = n;
            if (!Re) {
                var r, a, o = (e = e[t(437)](Ht, ""))[t(716)](ne),
                    i = !1;
                if (2 == o[t(692)] ? (i = !0, r = Array[t(198)](o[0]), a = Array[t(198)](o[1]), (r[t(692)] != a[t(692)] || ft[t(555)][t(232)]) && (i = !1)) : (e = e[t(437)](Ut, "   "), r = Array[t(198)](e)), 1 != r[t(692)]) {
                    if (Re = !0, !pr) {
                        pr = !0, De[t(353)] = De.x;
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
                t = 20 * Math[e(193)](De.x / 20),
                r = 10 * Math[e(193)](De.y / 10),
                a = Te.get(t + "," + r);
            if (!a || null == a[e(585)]) return !1;
            var o = De.x - t + 20 * (De.y - r);
            return [a.txt[o], a[e(499)][o]]
        }

        function br(e) {
            var t = n;
            navigator[t(732)] ? navigator.clipboard[t(449)](e) : (w[t(496)] = e, w[t(310)](), w[t(454)](), document[t(379)](t(569)))
        }

        function Mr(e) {
            var t = n;
            e[t(432)](), nt = !0, E[t(670)][t(259)] = t(567), kr(t(508), 1500)
        }

        function kr(e, t) {
            var r = n;
            clearTimeout(x), g[r(246)] = e, g[r(271)][r(536)](r(653)), x = setTimeout((function() {
                var e = r;
                g[e(271)][e(539)](e(653))
            }), t)
        }

        function Er() {
            De.x = De.start, De.y++, tr(), ar()
        }
        null != navigator[n(732)] && null != navigator[n(732)][n(528)] || (document.getElementById(n(301))[n(670)].display = "none");
        var Sr = 0;

        function Ir(e) {
            var t = n;
            switch (he(!1), (2 == e && 2 == Sr || 1 == e && 1 == Sr) && (e = 0), e) {
                case 0:
                    b[t(670)].transform = "translateX(-105%)";
                    break;
                case 1:
                    var r = document[t(450)](t(354))[t(378)];
                    b[t(670)][t(467)] = "translateX(" + -r + t(335);
                    break;
                default:
                    b[t(670)][t(467)] = "translateX(0px)", k[t(271)].contains(t(672)) && k.classList[t(539)](t(672))
            }
            Sr = e, dn()
        }

        function Cr(e) {
            var t = n,
                r = document[t(267)](t(522));
            r[t(271)][t(536)]("colour"), r.addEventListener(t(191), (function(t) {
                Fr(e), mn()
            })), r[t(540)]("id", e), r[t(670)][t(655)] = xe[e], r[t(534)] = we[e], M.appendChild(r)
        }

        function Ar() {
            var e = n;
            he(!1), k[e(271)].contains("open") ? (k[e(271)][e(539)](e(672)), dn()) : (k.classList[e(536)](e(672)), 2 == Sr && Ir(0), document[e(450)]("tpword")[e(310)]())
        }

        function Br(e) {
            return e.replace(/^\/|\/$/g, "")
        }

        function Tr(e) {
            var t = n,
                r = (e = (e = Br(e))[t(437)](/\~\/*/, "~"))[t(716)]("/");
            if (e = r[t(694)](), r[t(692)] > 0 && (e += "/" + r[t(694)]()), (e = (e = Br(e))[t(355)]()).startsWith("~") && t(510) != e) {
                var a = e.split("/"),
                    o = a[0][t(437)]("~", ""),
                    i = t(699);
                a[t(692)] > 1 && (i = a[1]), Hn(o, i), dr(0, 0)
            } else {
                var c = Vr(e);
                dr(c.x, c.y), Hn(t(299), t(699)), 0 == c.x && 0 == c.y ? vr() : history.pushState({}, null, e)
            }
            k[t(271)][t(539)](t(672))
        }

        function Fr(e) {
            var t = n;
            (ft.disablecolour[t(232)] || dt.disableColour[t(232)]) && (e = 0), Ce != e && (Ye = !0);
            var r = document[t(450)](Ce);
            r.classList[t(539)](t(649)), Ce = e, Ae = Be && 0 == Ce ? "rgba(255, 255, 255, 0.6)" : ua(xe[Ce], .6), (r = document.getElementById(Ce)).classList.add(t(649)), r[t(282)] < M[t(590)] + 36 && (M[t(590)] = r[t(282)] - 36), r.offsetTop > M[t(590)] + M[t(329)] && (M.scrollTop = r[t(282)] - M[t(329)]), document[t(450)](t(668))[t(540)](t(473), xe[e]), localStorage[t(579)](t(722), e), Ie = !0
        }
        for (M.children[n(692)] > 0 && (a = !0), ue = 0; ue < xe.length; ue++) Cr(be[ue]);

        function Pr(e) {
            for (var t = n, r = 0; r < M[t(270)][t(692)]; r++) "0" != M[t(270)][r].id && (e ? M.children[r][t(271)][t(536)](t(215)) : M.children[r][t(271)].remove("hidden"));
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
            0 == U && (Be = !1, document[t(450)](t(199))[t(234)] = t(565), A = I, B = C), 1 == U && (Be = !0, document[t(450)]("themeico")[t(234)] = t(568), A = "#000000", B = t(679)), 2 == U ? (Be = O[t(232)], document[t(450)](t(199))[t(234)] = "/static/star.svg", A = P[t(496)], B = L[t(496)], R[t(271)].remove(t(215))) : R[t(271)][t(536)]("hidden"), F = ia(B, 10), T = ia(B, -15), localStorage.setItem(t(263), U), Ie = !0, dn(), Fr(Ce), Dn()
        }

        function Or(e) {
            var t = n;
            e[t(652)] == P ? (A = P[t(496)], Dn()) : e[t(652)] == L && (B = L[t(496)], F = ia(B, 10), T = ia(B, -15), Dn(!0)), localStorage[t(579)](t(638), JSON[t(417)]({
                primary: P[t(496)],
                secondary: L[t(496)],
                texttheme: O[t(232)]
            }))
        }

        function Rr(e) {
            var t = n;
            Dr(e[t(652)][t(387)].id), dn()
        }

        function Dr(e, t) {
            var r = n,
                a = fe[e];
            a[r(396)] = null != t ? t : !a[r(396)], a[r(396)] ? a.el.classList.add("enabled") : a.el.classList.remove(r(396)), localStorage.setItem("dec", ye())
        }

        function Nr(e, t, r) {
            var a = n;
            if (Math[a(413)](e - t) > .1) {
                for (var o = 0; o < r; o++) e += (t - e) / 20;
                return Ie = !0, Math[a(311)](100 * e) / 100
            }
            return e != t ? (Ie = !0, Math[a(311)](e)) : e
        }
        setInterval((function() {
            var e = n;
            if (a && a[e(734)] == a[e(349)]) {
                if ((Ke || Ye || Xe || qe) && 0 != Te[e(615)]) {
                    var t = {};
                    Ke && (t.l = [De.x, De.y]), Ye && (t.c = Ce), Xe && (t.n = ft[e(392)][e(232)]), qe && (nr(), t.p = [et[e(211)].x, et[e(211)].y]), a[e(205)](Gr({
                        ce: t
                    })), Ke = !1, Ye = !1, Xe = !1, qe = !1
                }
                if (Fe[e(692)] > 0) {
                    var r;
                    r = Fe[e(729)](0, 5), t = [];
                    e: for (var o = 0; o < r[e(692)]; o++) {
                        for (var i = r[o][0], c = r[o][1], l = r[o][2], u = r[o][3], s = r[o][4], f = 0; f < t.length; f++)
                            if (t[f][0] == i && t[f][1] == c) {
                                t[f][e(490)](l, u, s);
                                continue e
                            } if (t[e(490)]([i, c, l, u, s]), 4 == t[e(692)] && o + 1 < r[e(692)]) {
                            for (f = o + 1; f < r[e(692)]; f++) Fe[e(367)](r[f]);
                            break
                        }
                    }
                    a.send(Gr({
                        e: t
                    }))
                }
            }
        }), 200);
        var jr = performance[n(588)](),
            Ur = 100,
            Hr = performance[n(588)]() + 1e3;
        window[n(285)]((function e() {
            var t = n,
                r = Math[t(338)](Math[t(400)](performance[t(588)]() - jr), 100);
            if (jr = performance[t(588)](), (r < Ur || jr > Hr) && (Ur = r, Hr = performance[t(588)]() + 1e3), null != lt) {
                Ie = !0, Ln(et[t(497)].x + lt.dx, et.offset.y + lt.dy, !0), 0 == lt.dx && 0 == lt.dy && Ln(et[t(497)].x, et[t(497)].y);
                for (var a = 0; a < r; a++) lt.dx *= .993, lt.dy *= .993;
                Math.abs(lt.dx) <= .3 && (lt.dx = 0), Math[t(413)](lt.dy) <= .3 && (lt.dy = 0), 0 == lt.dy && 0 == lt.dx && (lt = null)
            }
            if (ft[t(444)][t(232)]) {
                De[t(316)] = Nr(De.rawx, De.x, r), De[t(737)] = Nr(De.rawy, De.y, r);
                var o = Bt(20);
                for (const e of We[t(241)]()) null == e[t(316)] || null == e.rawy || Tt(e.l, o) || (e[t(316)] = Nr(e[t(316)], e.l[0], r), e[t(737)] = Nr(e[t(737)], e.l[1], r))
            }
            if (0 != ze[t(692)]) {
                for (var c = 0; c < ze[t(692)]; c++)
                    if (ze[c][2] < .01) ze.splice(c, 1);
                    else
                        for (a = 0; a < r; a++) ze[c][2] *= .995;
                Ie = !0
            }
            if (Ie && (function() {
                    var e = t;
                    S[e(586)](1, 0, 0, 1, 0, 0), S.fillStyle = B, S[e(460)](0, 0, E[e(624)], E[e(307)]), S[e(492)](Math.ceil(et.offset.x), Math[e(400)](et[e(497)].y));
                    const n = 10 * m,
                        r = 20 * m,
                        a = Math[e(311)](5 * m);
                    var o = Bt(20),
                        i = Bt(d);
                    for (const t of Te[e(697)]()) Tt(c = Pt(t), o) ? Tt(c, i) && delete Te[e(418)](t).img : At(t, c);
                    if (ft[e(591)].checked && (!dt[e(619)][e(232)] || h)) {
                        Ct(S);
                        for (const t of We[e(241)]()) {
                            var c = t.l;
                            if (!Tt(c, o)) {
                                var l = Math.round(10 * t[e(316)] * m),
                                    u = Math.round(20 * t[e(737)] * m);
                                t[e(618)] && (S[e(576)] = e(451), S[e(460)](l - 2 * m, u - 2 * m, Math.ceil(n) + 4 * m, Math[e(311)](r) + 4 * m));
                                var s = t.c;
                                ft[e(549)][e(232)] && (s = 0), 0 == s && Be && (s = xe[e(692)]), S.fillStyle = ke[s], Ot(l, u, n, r), !ft.shownametags.checked || Ft(c) && 0 == H || Lt(t.n, l, u, a)
                            }
                        }
                    }
                    for (var f = 0; f < ze[e(692)]; f++) {
                        0 == (s = ze[f][3]) && Be && (s = xe[e(692)]), S[e(576)] = ke[s].replace(e(328), ze[f][2]);
                        var v = 10 * ze[f][0] * m,
                            y = 20 * ze[f][1] * m;
                        if (ft[e(591)].checked && h) {
                            var p = We[e(418)](ze[f][4]);
                            null != p && p[e(618)] && (S[e(227)] = 3 * m, S[e(384)] = s == xe[e(692)] ? e(605) : xe[s], S[e(587)](), S[e(678)](Math.round(10 * p[e(316)] * m + n / 2), Math[e(311)](20 * p.rawy * m + r)), S[e(628)](Math[e(311)](v + n / 2), Math[e(311)](y + r)), S[e(463)]())
                        }
                        S[e(460)](v, y, n, r)
                    }
                    if (S[e(576)] = Ae, Ot(l = Math[e(311)](10 * De[e(316)] * m), u = Math.round(20 * De[e(737)] * m), n, r), ft[e(442)][e(232)] && !ft[e(392)][e(232)] && (Ct(S), Lt(Je, l, u, a)), nt && it[e(353)] && it.end) {
                        S[e(576)] = e(255), l = Math[e(311)](10 * Math.min(it[e(353)].x, it[e(235)].x) * m), u = Math[e(311)](20 * Math[e(338)](it[e(353)].y, it[e(235)].y) * m);
                        var g = Math.round(10 * Math[e(207)](it[e(353)].x, it[e(235)].x) * m - l + 10 * m),
                            x = Math[e(311)](20 * Math[e(207)](it[e(353)].y, it[e(235)].y) * m - u + 20 * m);
                        S[e(460)](l, u, g, x)
                    }
                    if (rt || ot)
                        if (S.fillStyle = rt && ot ? "rgba(195,219,224,0.5)" : e(rt ? 698 : 323), at) S[e(460)](10 * je.x * m, 20 * je.y * m, 10 * m, 20 * m);
                        else {
                            var w = 20 * Math[e(193)](je.x / 20),
                                b = 10 * Math.floor(je.y / 10);
                            S.fillRect(10 * w * m, 20 * b * m, 200 * m, 200 * m)
                        }
                }(), Ie = !1, "\n\n\n\n\n\n\n\n\n" != i.value && (i.value = t(570)), i[t(280)] = 4), 0 != Le[t(615)]) {
                for (var l = jr + (Ur - 2);;) {
                    var u = Pe[t(694)](),
                        s = Le[t(418)](u);
                    if (Le.delete(u), tn(u, s), 0 == Le[t(615)] || performance[t(588)]() >= l) break
                }
                Ie = !0
            }
            window[t(285)](e)
        })), null != localStorage[n(262)]("x") && (De.x = parseInt(localStorage[n(262)]("x"))), null != localStorage.getItem("y") && (De.y = parseInt(localStorage[n(262)]("y"))), null != localStorage.getItem(n(722)) ? Fr(parseInt(localStorage[n(262)](n(722)))) : Fr(0), null != localStorage[n(262)](n(543)) && pe(localStorage[n(262)](n(543))), null != localStorage[n(262)](n(551)) && (D.value = localStorage.getItem("customfont")), null != localStorage[n(262)](n(386)) && (N[n(496)] = localStorage.getItem(n(386))), null != re[localStorage[n(262)](n(507))] && kt(localStorage[n(262)](n(507)));
        var Wr = Object[n(697)](ft);
        for (ue = 0; ue < Wr[n(692)]; ue++) {
            var Kr = Wr[ue];
            null != localStorage[n(262)](Kr) && (ft[Kr][n(232)] = n(503) == localStorage[n(262)](Kr))
        }
        if (ft.showchat[n(232)] || In[n(271)][n(536)](n(215)), ft[n(549)][n(232)] && Pr(!0), null != localStorage[n(262)](n(638))) {
            var Yr = localStorage[n(262)]("customtheme");
            try {
                var Xr = JSON[n(195)](Yr);
                null != Xr[n(399)] && (P[n(496)] = Xr[n(399)]), null != Xr[n(500)] && (L[n(496)] = Xr[n(500)]), null != Xr[n(545)] && (O[n(232)] = Xr.texttheme)
            } catch (e) {}
        }
        if (null != localStorage.getItem("theme")) {
            var qr = localStorage[n(262)](n(263));
            Lr(0 == qr || 1 == qr || 2 == qr ? Number(qr) : U)
        }
        var zr, Jr = (zr = {}, window.location[n(407)][n(437)](/[?&]+([^=&]+)=([^&]*)/gi, (function(e, t, n) {
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
                    for (var n, r = t, a = [], o = e + "", i = 0; i < o.length;) a[255 & i] = 255 & (n ^= 19 * a[255 & i]) + o[r(356)](i++);
                    var c, l = a[r(692)],
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
                i = null == an ? 2e5 : 2 * an[r(648)];
            return {
                x: 20 * Math[r(193)]((Math[r(193)](a() * o) - o / 2) / 20),
                y: 10 * Math[r(193)]((Math.floor(a() * i) - i / 2) / 10)
            }
        }
        null != Jr.x && (De.x = parseInt(Jr.x), $r = !0), null != Jr.y && (De.y = -1 * parseInt(Jr.y), $r = !0), Jr.noui && (u[n(271)].add(n(215)), In[n(670)][n(208)] = n(212));
        var Gr, _r, Zr, ea, ta, na, ra = Qr();
        if (ra.length > 0)
            if (ra[n(608)]("~")) o = "/" + ra, $r || dr(0, 0);
            else {
                var aa = Vr(ra);
                De.x = aa.x, De.y = aa.y
            }
        function oa() {
            var e = n;
            if (null == a || a[e(734)] != WebSocket[e(228)] && a[e(734)] != WebSocket.OPEN) {
                var t = e(651) + location[e(593)] + "/ws";
                "https:" !== location[e(416)] && (t = "ws://" + location[e(593)] + e(721)), (a = new WebSocket(t))[e(192)] = "arraybuffer", a[e(334)] = Kn, a[e(693)] = Wn, a[e(404)] = Wn, a[e(677)] = Un, document[e(450)]("connecting1").innerText = e(277), document[e(450)]("connecting2")[e(246)] = "", c[e(244)] = void 0
            }
        }

        function ia(e, t) {
            var r = n,
                a = parseInt(e[r(542)](1, 3), 16),
                o = parseInt(e[r(542)](3, 5), 16),
                i = parseInt(e[r(542)](5, 7), 16);
            return a += t, o += t, i += t, a = Math[r(338)](a, 255), o = Math[r(338)](o, 255), i = Math.min(i, 255), a = Math[r(207)](a, 0), o = Math[r(207)](o, 0), i = Math[r(207)](i, 0), "#" + ca(a[r(465)](16), 2) + ca(o[r(465)](16), 2) + ca(i[r(465)](16), 2)
        }

        function ca(e, t) {
            for (var r = n; e[r(692)] < t;) e = "0" + e;
            return e
        }

        function la(e) {
            return e >= 10240 && e <= 10495
        }

        function ua(e, t) {
            var r = n;
            if (3 == (e = e.replace("#", ""))[r(692)] && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), 6 != e.length) throw new Error(r(643));
            var a = parseInt(e, 16),
                o = (16711680 & a) >> 16,
                i = (65280 & a) >> 8,
                c = 255 & a;
            return t ? "rgba(" + o + ", " + i + ", " + c + ", " + t + ")" : r(218) + o + ", " + i + ", " + c + ")"
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
        isNaN(De.x) && (De.x = 0), isNaN(De.y) && (De.y = 0), De[n(353)] = De.x, setTimeout((function() {
            var e = n;
            window.history[e(713)]({}, document.title, location[e(509)])
        }), 0), dr(De.x, De.y), null != localStorage[n(262)](n(719)) && yt(JSON[n(195)](localStorage[n(262)]("zoom")), !1), oa(), Gr = function(e, r) {
            var a = n;
            if (r && r.multiple && !Array.isArray(e)) throw new Error;
            const o = 4294967296;
            let i, c, l = new Uint8Array(128),
                u = 0;
            if (r && r[a(523)])
                for (let t = 0; t < e[a(692)]; t++) s(e[t]);
            else s(e);
            return v(129), l.subarray(0, u);

            function s(e, n) {
                var l = a;
                switch (typeof e) {
                    case l(200):
                        f();
                        break;
                    case l(375):
                        v(e ? 195 : 194);
                        break;
                    case l(627):
                        ! function(e) {
                            var t = l;
                            if (isFinite(e) && Math[t(193)](e) === e)
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
                            else c || (i = new ArrayBuffer(8), c = new DataView(i)), c[t(572)](0, e), v(203), m(new Uint8Array(i))
                        }(e);
                        break;
                    case l(461):
                        ! function(e) {
                            var n = l;
                            let r = function(e) {
                                    let n = !0,
                                        r = e[t(692)];
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
                                a = r[n(692)];
                            a <= 31 ? v(160 + a) : m(a <= 255 ? [217, a] : a <= 65535 ? [218, a >>> 8, a] : [219, a >>> 24, a >>> 16, a >>> 8, a]), m(r)
                        }(e);
                        break;
                    case l(222):
                        null === e ? f() : e instanceof Date ? function(e) {
                            var t = l;
                            let n = e[t(606)]() / 1e3;
                            if (0 === e[t(636)]() && n >= 0 && n < 4294967296) m([214, 255, n >>> 24, n >>> 16, n >>> 8, n]);
                            else if (n >= 0 && n < 17179869184) {
                                let r = 1e6 * e[t(636)]();
                                m([215, 255, r >>> 22, r >>> 14, r >>> 6, r << 2 >>> 0 | n / o, n >>> 24, n >>> 16, n >>> 8, n])
                            } else {
                                let r = 1e6 * e[t(636)]();
                                m([199, 12, 255, r >>> 24, r >>> 16, r >>> 8, r]), h(n)
                            }
                        }(e) : Array[l(589)](e) ? d(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                            let t = e[l(692)];
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
                        if (n || !r || !r[l(602)]) throw new Error;
                        l(578) == typeof r.invalidTypeReplacement ? s(r.invalidTypeReplacement(e), !0) : s(r[l(602)], !0)
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
                if (l[t(692)] < u + 1) {
                    let e = 2 * l[t(692)];
                    for (; e < u + 1;) e *= 2;
                    let n = new Uint8Array(e);
                    n[t(430)](l), l = n
                }
                l[u] = e, u++
            }

            function m(e) {
                var t = a;
                if (l[t(692)] < u + e[t(692)]) {
                    let n = 2 * l[t(692)];
                    for (; n < u + e[t(692)];) n *= 2;
                    let r = new Uint8Array(n);
                    r.set(l), l = r
                }
                l.set(e, u), u += e[t(692)]
            }

            function h(e) {
                var t = a;
                let n, r;
                e >= 0 ? (n = e / o, r = e % o) : (e++, n = Math[t(413)](e) / o, r = Math[t(413)](e) % o, n = ~n, r = ~r), m([n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r])
            }
        }, _r = function(e, r) {
            var a = n;
            let o, i = 0;
            if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), a(222) != typeof e || void 0 === e[a(692)]) throw new Error;
            if (!e[a(692)]) throw new Error;
            if (e instanceof Uint8Array || (e = new Uint8Array(e)), r && r.multiple)
                for (o = []; i < e[a(692)];) o.push(c());
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
                throw console.debug(t(546), e), new Error
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
                let r = new DataView(e.buffer, i + e[n(502)], t);
                return i += t, 4 === t ? r[n(639)](0, !1) : 8 === t ? r[n(629)](0, !1) : void 0
            }

            function f(t, n) {
                var r = a;
                t < 0 && (t = u(n));
                let o = e[r(370)](i, i + t);
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
                for (; e-- > 0;) r[n(490)](c());
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
                            if (t <= 65535) i += String[a(308)](t);
                            else {
                                if (!(t <= 1114111)) throw new Error;
                                t -= 65536, i += String.fromCharCode(t >> 10 | 55296), i += String[a(308)](1023 & t | 56320)
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
                    if (4 === e[n(692)]) {
                        let t = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                        return new Date(1e3 * t)
                    }
                    if (8 === e.length) {
                        let t = (e[0] << 22 >>> 0) + (e[1] << 14 >>> 0) + (e[2] << 6 >>> 0) + (e[3] >>> 2),
                            n = 4294967296 * (3 & e[3]) + (e[4] << 24 >>> 0) + (e[5] << 16 >>> 0) + (e[6] << 8 >>> 0) + e[7];
                        return new Date(1e3 * n + t / 1e6)
                    }
                    if (12 === e[n(692)]) {
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
        }, Array.prototype[n(613)] || (Array[n(607)][n(613)] = function(e) {
            return !!~this.indexOf(e)
        }), Array[n(607)].indexOf || (Array[n(607)][n(394)] = function(e, n, r) {
            "use strict";
            return function(a, o) {
                var i = t;
                if (null == this) throw TypeError(i(604));
                var c = e(this),
                    l = c[i(692)] >>> 0,
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
        }(Object, Math[n(207)], Math[n(338)])), Array[n(198)] || (Array[n(198)] = (Zr = Object[n(607)].toString, ea = function(e) {
            var t = n;
            return t(578) == typeof e || t(284) === Zr[t(376)](e)
        }, ta = Math[n(485)](2, 53) - 1, na = function(e) {
            var r, a, o = n,
                i = (r = t, a = Number(e), isNaN(a) ? 0 : 0 !== a && isFinite(a) ? (a > 0 ? 1 : -1) * Math[r(193)](Math[r(413)](a)) : a);
            return Math[o(338)](Math.max(i, 0), ta)
        }, function(e) {
            var t = n,
                r = this,
                a = Object(e);
            if (null == e) throw new TypeError(t(333));
            var o, i = arguments.length > 1 ? arguments[1] : void 0;
            if (void 0 !== i) {
                if (!ea(i)) throw new TypeError(t(405));
                arguments.length > 2 && (o = arguments[2])
            }
            for (var c, l = na(a[t(692)]), u = ea(r) ? Object(new r(l)) : new Array(l), s = 0; s < l;) c = a[s], u[s] = i ? void 0 === o ? i(c, s) : i[t(376)](o, c, s) : c, s += 1;
            return u[t(692)] = l, u
        })), Math.sign || (Math[n(229)] = function(e) {
            return (e > 0) - (e < 0) || +e
        }), String[n(607)][n(608)] || Object[n(512)](String[n(607)], "startsWith", {
            value: function(e, t) {
                var r = n,
                    a = t > 0 ? 0 | t : 0;
                return this.substring(a, a + e[r(692)]) === e
            }
        }), String[n(607)][n(356)] || function() {
            "use strict";
            var e = n,
                r = function() {
                    var e = t;
                    try {
                        var n = {},
                            r = Object[e(512)],
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
                        var i, c = r[n(272)](o);
                        return c >= 55296 && c <= 56319 && a > o + 1 && (i = r[n(272)](o + 1)) >= 56320 && i <= 57343 ? 1024 * (c - 55296) + i - 56320 + 65536 : c
                    }
                };
            r ? r(String.prototype, e(356), {
                value: a,
                configurable: !0,
                writable: !0
            }) : String.prototype.codePointAt = a
        }(), String[n(468)] || function(e) {
            var r = n,
                a = function(n) {
                    for (var r = t, a = [], o = 0, i = "", c = 0, l = arguments[r(692)]; c !== l; ++c) {
                        var u = +arguments[c];
                        if (!(u < 1114111 && u >>> 0 === u)) throw RangeError(r(286) + u);
                        u <= 65535 ? o = a[r(490)](u) : (u -= 65536, o = a.push(55296 + (u >> 10), u % 1024 + 56320)), o >= 16383 && (i += e[r(330)](null, a), a.length = 0)
                    }
                    return i + e.apply(null, a)
                };
            try {
                Object.defineProperty(String, r(468), {
                    value: a,
                    configurable: !0,
                    writable: !0
                })
            } catch (e) {
                String[r(468)] = a
            }
        }(String[n(308)]), CanvasRenderingContext2D[n(607)][n(201)] || (CanvasRenderingContext2D[n(607)].roundRect = function(e, t, r, a, o) {
            var i = n,
                c = new Array(4);
            if ("object" == typeof o) switch (o[i(692)]) {
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
                    c[i(298)](0, 0, 4)
            }
            this.beginPath(), this.moveTo(e + c[0], t), this[i(628)](e + r - c[1], t), this[i(626)](e + r, t, e + r, t + c[1]), this[i(628)](e + r, t + a - c[2]), this[i(626)](e + r, t + a, e + r - c[2], t + a), this[i(628)](e + c[3], t + a), this.quadraticCurveTo(e, t + a, e, t + a - c[3]), this.lineTo(e, t + c[0]), this[i(626)](e, t, e + c[0], t), this.closePath()
        });
        const va = 10 == v[n(427)]() && v[n(475)]() >= 28 || 11 == v[n(427)]() || 0 == v[n(427)]() && v.getDate() <= 6 || localStorage[n(262)](n(281)),
            ma = [n(657), "0,-10"],
            ha = [4, 7, 9, 12];
        va && setInterval((function() {
            var e = n;
            if (e(299) == J && e(699) == $ && !ft[e(549)][e(232)])
                for (var t = 0; t < ma.length; t++) {
                    var r = ma[t],
                        a = Te[e(418)](r);
                    if (null != a && null != a[e(585)]) {
                        for (var o = 0; o < 200; o++) switch (a[e(585)][o]) {
                            case "?":
                            case "'":
                                a[e(499)][o] = ha[Math.floor(4 * Math[e(550)]())]
                        }
                        Dt(r, !1)
                    }
                }
        }), 400)
    }(n(200) == typeof browser ? browser = {} : browser)
}("undefined" == typeof browser ? browser = {} : browser);