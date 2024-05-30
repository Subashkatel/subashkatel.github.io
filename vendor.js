var $jscomp = $jscomp || {};
$jscomp.scope = {},
$jscomp.ASSUME_ES5 = !1,
$jscomp.ASSUME_NO_NATIVE_MAP = !1,
$jscomp.ASSUME_NO_NATIVE_SET = !1,
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, i) {
    t != Array.prototype && t != Object.prototype && (t[e] = i.value)
},
$jscomp.getGlobal = function(t) {
    return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t
},
$jscomp.global = $jscomp.getGlobal(this),
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_",
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {},
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
},
$jscomp.symbolCounter_ = 0,
$jscomp.Symbol = function(t) {
    return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++
},
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var t = $jscomp.global.Symbol.iterator;
    t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")),
    "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    }),
    $jscomp.initSymbolIterator = function() {}
},
$jscomp.arrayIterator = function(t) {
    var e = 0;
    return $jscomp.iteratorPrototype(function() {
        return e < t.length ? {
            done: !1,
            value: t[e++]
        } : {
            done: !0
        }
    })
},
$jscomp.iteratorPrototype = function(t) {
    return $jscomp.initSymbolIterator(), t = {
        next: t
    }, t[$jscomp.global.Symbol.iterator] = function() {
        return this
    }, t
},
$jscomp.iteratorFromArray = function(t, e) {
    $jscomp.initSymbolIterator(),
    t instanceof String && (t += "");
    var i = 0,
        r = {
            next: function() {
                if (i < t.length) {
                    var n = i++;
                    return {
                        value: e(n, t[n]),
                        done: !1
                    }
                }
                return r.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                }, r.next()
            }
        };
    return r[Symbol.iterator] = function() {
        return r
    }, r
},
$jscomp.polyfill = function(t, e, i, r) {
    if (e) {
        for (i = $jscomp.global, t = t.split("."), r = 0; r < t.length - 1; r++) {
            var n = t[r];
            n in i || (i[n] = {}),
            i = i[n]
        }
        t = t[t.length - 1],
        r = i[t],
        e = e(r),
        e != r && null != e && $jscomp.defineProperty(i, t, {
            configurable: !0,
            writable: !0,
            value: e
        })
    }
},
$jscomp.polyfill("Array.prototype.keys", function(t) {
    return t || function() {
            return $jscomp.iteratorFromArray(this, function(t) {
                return t
            })
        }
}, "es6-impl", "es3"),
$jscomp.polyfill("Array.prototype.values", function(t) {
    return t || function() {
            return $jscomp.iteratorFromArray(this, function(t, e) {
                return e
            })
        }
}, "es6", "es3"),
$jscomp.polyfill("Array.prototype.fill", function(t) {
    return t || function(t, e, i) {
            var r = this.length || 0;
            for (0 > e && (e = Math.max(0, r + e)), (null == i || i > r) && (i = r), i = Number(i), 0 > i && (i = Math.max(0, r + i)), e = Number(e || 0); e < i; e++)
                this[e] = t;
            return this
        }
}, "es6-impl", "es3"),
this.Two = function(t) {
    function e() {
        var t = document.body.getBoundingClientRect(),
            e = this.width = t.width,
            t = this.height = t.height;
        this.renderer.setSize(e, t, this.ratio),
        this.trigger(b.Events.resize, e, t)
    }
    function i() {
        D(i);
        for (var t = 0; t < b.Instances.length; t++) {
            var e = b.Instances[t];
            e.playing && e.update()
        }
    }
    var r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : null,
        n = Object.prototype.toString,
        s = {
            _indexAmount: 0,
            natural: {
                slice: Array.prototype.slice,
                indexOf: Array.prototype.indexOf,
                keys: Object.keys,
                bind: Function.prototype.bind,
                create: Object.create
            },
            identity: function(t) {
                return t
            },
            isArguments: function(t) {
                return "[object Arguments]" === n.call(t)
            },
            isFunction: function(t) {
                return "[object Function]" === n.call(t)
            },
            isString: function(t) {
                return "[object String]" === n.call(t)
            },
            isNumber: function(t) {
                return "[object Number]" === n.call(t)
            },
            isDate: function(t) {
                return "[object Date]" === n.call(t)
            },
            isRegExp: function(t) {
                return "[object RegExp]" === n.call(t)
            },
            isError: function(t) {
                return "[object Error]" === n.call(t)
            },
            isFinite: function(t) {
                return isFinite(t) && !isNaN(parseFloat(t))
            },
            isNaN: function(t) {
                return s.isNumber(t) && t !== +t
            },
            isBoolean: function(t) {
                return !0 === t || !1 === t || "[object Boolean]" === n.call(t)
            },
            isNull: function(t) {
                return null === t
            },
            isUndefined: function(t) {
                return void 0 === t
            },
            isEmpty: function(t) {
                return null == t || (y && (s.isArray(t) || s.isString(t) || s.isArguments(t)) ? 0 === t.length : 0 === s.keys(t).length)
            },
            isElement: function(t) {
                return !(!t || 1 !== t.nodeType)
            },
            isArray: Array.isArray || function(t) {
                return "[object Array]" === n.call(t)
            },
            isObject: function(t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            },
            toArray: function(t) {
                return t ? s.isArray(t) ? g.call(t) : y(t) ? s.map(t, s.identity) : s.values(t) : []
            },
            range: function(t, e, i) {
                null == e && (e = t || 0, t = 0),
                i = i || 1,
                e = Math.max(Math.ceil((e - t) / i), 0);
                for (var r = Array(e), n = 0; n < e; n++, t += i)
                    r[n] = t;
                return r
            },
            indexOf: function(t, e) {
                if (s.natural.indexOf)
                    return s.natural.indexOf.call(t, e);
                for (var i = 0; i < t.length; i++)
                    if (t[i] === e)
                        return i;
                return -1
            },
            has: function(t, e) {
                return null != t && hasOwnProperty.call(t, e)
            },
            bind: function(t, e) {
                var i = s.natural.bind;
                if (i && t.bind === i)
                    return i.apply(t, g.call(arguments, 1));
                var r = g.call(arguments, 2);
                return function() {
                    t.apply(e, r)
                }
            },
            extend: function(t) {
                for (var e = g.call(arguments, 1), i = 0; i < e.length; i++) {
                    var r = e[i],
                        n;
                    for (n in r)
                        t[n] = r[n]
                }
                return t
            },
            defaults: function(t) {
                for (var e = g.call(arguments, 1), i = 0; i < e.length; i++) {
                    var r = e[i],
                        n;
                    for (n in r)
                        void 0 === t[n] && (t[n] = r[n])
                }
                return t
            },
            keys: function(t) {
                if (!s.isObject(t))
                    return [];
                if (s.natural.keys)
                    return s.natural.keys(t);
                var e = [],
                    i;
                for (i in t)
                    s.has(t, i) && e.push(i);
                return e
            },
            values: function(t) {
                for (var e = s.keys(t), i = [], r = 0; r < e.length; r++)
                    i.push(t[e[r]]);
                return i
            },
            each: function(t, e, i) {
                i = i || this;
                for (var r = !y(t) && s.keys(t), n = (r || t).length, o = 0; o < n; o++) {
                    var a = r ? r[o] : o;
                    e.call(i, t[a], a, t)
                }
                return t
            },
            map: function(t, e, i) {
                i = i || this;
                for (var r = !y(t) && s.keys(t), n = (r || t).length, o = [], a = 0; a < n; a++) {
                    var h = r ? r[a] : a;
                    o[a] = e.call(i, t[h], h, t)
                }
                return o
            },
            once: function(t) {
                var e = !1;
                return function() {
                    return e ? t : (e = !0, t.apply(this, arguments))
                }
            },
            after: function(t, e) {
                return function() {
                    for (; 1 > --t;)
                        return e.apply(this, arguments)
                }
            },
            uniqueId: function(t) {
                var e = ++s._indexAmount + "";
                return t ? t + e : e
            }
        },
        o = Math.sin,
        a = Math.cos,
        h = Math.atan2,
        l = Math.sqrt,
        c = Math.PI,
        u = c / 2,
        d = Math.pow,
        p = Math.min,
        f = Math.max,
        _ = 0,
        g = s.natural.slice,
        m = r.performance && r.performance.now ? r.performance : Date,
        v = Math.pow(2, 53) - 1,
        y = function(t) {
            return "number" == typeof (t = null == t ? void 0 : t.length) && 0 <= t && t <= v
        },
        x = {
            temp: r.document ? r.document.createElement("div") : {},
            hasEventListeners: s.isFunction(r.addEventListener),
            bind: function(t, e, i, r) {
                return this.hasEventListeners ? t.addEventListener(e, i, !!r) : t.attachEvent("on" + e, i), x
            },
            unbind: function(t, e, i, r) {
                return x.hasEventListeners ? t.removeEventListeners(e, i, !!r) : t.detachEvent("on" + e, i), x
            },
            getRequestAnimationFrame: function() {
                var t = 0,
                    e = ["ms", "moz", "webkit", "o"],
                    n = r.requestAnimationFrame;
                if (!n) {
                    for (var o = 0; o < e.length; o++)
                        n = r[e[o] + "RequestAnimationFrame"] || n;
                    n = n || function(e, i) {
                        var n = (new Date).getTime(),
                            s = Math.max(0, 16 - (n - t));
                        return i = r.setTimeout(function() {
                            e(n + s)
                        }, s), t = n + s, i
                    }
                }
                return n.init = s.once(i), n
            }
        },
        b = r.Two = function(t) {
            if (t = s.defaults(t || {}, {
                fullscreen: !1,
                width: 640,
                height: 480,
                type: b.Types.svg,
                autostart: !1
            }), s.each(t, function(t, e) {
                "fullscreen" !== e && "autostart" !== e && (this[e] = t)
            }, this), s.isElement(t.domElement)) {
                var i = t.domElement.tagName.toLowerCase();
                /^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + i) || (this.type = b.Types[i])
            }
            this.renderer = new b[this.type](this),
            b.Utils.setPlaying.call(this, t.autostart),
            this.frameCount = 0,
            t.fullscreen ? (t = s.bind(e, this), s.extend(document.body.style, {
                overflow: "hidden",
                margin: 0,
                padding: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed"
            }), s.extend(this.renderer.domElement.style, {
                display: "block",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed"
            }), x.bind(r, "resize", t), t()) : s.isElement(t.domElement) || (this.renderer.setSize(t.width, t.height, this.ratio), this.width = t.width, this.height = t.height),
            this.scene = this.renderer.scene,
            b.Instances.push(this),
            D.init()
        };
    s.extend(b, {
        root: r,
        Array: r.Float32Array || Array,
        Types: {
            webgl: "WebGLRenderer",
            svg: "SVGRenderer",
            canvas: "CanvasRenderer"
        },
        Version: "v0.7.0",
        Identifier: "two_",
        Properties: {
            hierarchy: "hierarchy",
            demotion: "demotion"
        },
        Events: {
            play: "play",
            pause: "pause",
            update: "update",
            render: "render",
            resize: "resize",
            change: "change",
            remove: "remove",
            insert: "insert",
            order: "order",
            load: "load"
        },
        Commands: {
            move: "M",
            line: "L",
            curve: "C",
            close: "Z"
        },
        Resolution: 8,
        Instances: [],
        noConflict: function() {
            return r.Two = t, this
        },
        uniqueId: function() {
            var t = _;
            return _++, t
        },
        Utils: s.extend(s, {
            performance: m,
            defineProperty: function(t) {
                var e = "_" + t,
                    i = "_flag" + t.charAt(0).toUpperCase() + t.slice(1);
                Object.defineProperty(this, t, {
                    enumerable: !0,
                    get: function() {
                        return this[e]
                    },
                    set: function(t) {
                        this[e] = t,
                        this[i] = !0
                    }
                })
            },
            release: function(t) {
                s.isObject(t) && (s.isFunction(t.unbind) && t.unbind(), t.vertices && (s.isFunction(t.vertices.unbind) && t.vertices.unbind(), s.each(t.vertices, function(t) {
                    s.isFunction(t.unbind) && t.unbind()
                })), t.children && s.each(t.children, function(t) {
                    b.Utils.release(t)
                }))
            },
            xhr: function(t, e) {
                var i = new XMLHttpRequest;
                return i.open("GET", t), i.onreadystatechange = function() {
                    4 === i.readyState && 200 === i.status && e(i.responseText)
                }, i.send(), i
            },
            Curve: {
                CollinearityEpsilon: d(10, -30),
                RecursionLimit: 16,
                CuspLimit: 0,
                Tolerance: {
                    distance: .25,
                    angle: 0,
                    epsilon: .01
                },
                abscissas: [[.5773502691896257], [0, .7745966692414834], [.33998104358485626, .8611363115940526], [0, .5384693101056831, .906179845938664], [.2386191860831969, .6612093864662645, .932469514203152], [0, .4058451513773972, .7415311855993945, .9491079123427585], [.1834346424956498, .525532409916329, .7966664774136267, .9602898564975363], [0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261], [.14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717], [0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057], [.1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192], [0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881], [.10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123], [0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854], [.09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499]],
                weights: [[1], [.8888888888888888, .5555555555555556], [.6521451548625461, .34785484513745385], [.5688888888888889, .47862867049936647, .23692688505618908], [.46791393457269104, .3607615730481386, .17132449237917036], [.4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697], [.362683783378362, .31370664587788727, .22238103445337448, .10122853629037626], [.3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441], [.29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814], [.2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366], [.24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183], [.2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588], [.2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186], [.2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727], [.1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096]]
            },
            devicePixelRatio: r.devicePixelRatio || 1,
            getBackingStoreRatio: function(t) {
                return t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1
            },
            getRatio: function(t) {
                return b.Utils.devicePixelRatio / C(t)
            },
            setPlaying: function(t) {
                return this.playing = !!t, this
            },
            getComputedMatrix: function(t, e) {
                e = e && e.identity() || new b.Matrix;
                for (var i = []; t && t._matrix;)
                    i.push(t._matrix),
                    t = t.parent;
                return i.reverse(), s.each(i, function(t) {
                    t = t.elements,
                    e.multiply(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9])
                }), e
            },
            deltaTransformPoint: function(t, e, i) {
                return new b.Vector(e * t.a + i * t.c + 0, e * t.b + i * t.d + 0)
            },
            decomposeMatrix: function(t) {
                var e = b.Utils.deltaTransformPoint(t, 0, 1),
                    i = b.Utils.deltaTransformPoint(t, 1, 0),
                    e = 180 / Math.PI * Math.atan2(e.y, e.x) - 90;
                return {
                    translateX: t.e,
                    translateY: t.f,
                    scaleX: Math.sqrt(t.a * t.a + t.b * t.b),
                    scaleY: Math.sqrt(t.c * t.c + t.d * t.d),
                    skewX: e,
                    skewY: 180 / Math.PI * Math.atan2(i.y, i.x),
                    rotation: e
                }
            },
            applySvgAttributes: function(t, e) {
                var i = {},
                    r = {},
                    n;
                if (getComputedStyle) {
                    var o = getComputedStyle(t);
                    for (n = o.length; n--;) {
                        var a = o[n],
                            h = o[a];
                        void 0 !== h && (r[a] = h)
                    }
                }
                for (n = t.attributes.length; n--;)
                    h = t.attributes[n],
                    i[h.nodeName] = h.value;
                s.isUndefined(r.opacity) || (r["stroke-opacity"] = r.opacity, r["fill-opacity"] = r.opacity),
                s.extend(r, i),
                r.visible = !(s.isUndefined(r.display) && "none" === r.display) || s.isUndefined(r.visibility) && "hidden" === r.visibility;
                for (a in r)
                    switch (h = r[a], a) {
                    case "transform":
                        if ("none" === h)
                            break;
                        if (null === (t.getCTM ? t.getCTM() : null))
                            break;
                        i = b.Utils.decomposeMatrix(t.getCTM()),
                        e.translation.set(i.translateX, i.translateY),
                        e.rotation = i.rotation,
                        e.scale = i.scaleX,
                        i = parseFloat((r.x + "").replace("px")),
                        n = parseFloat((r.y + "").replace("px")),
                        i && (e.translation.x = i),
                        n && (e.translation.y = n);
                        break;
                    case "visible":
                        e.visible = h;
                        break;
                    case "stroke-linecap":
                        e.cap = h;
                        break;
                    case "stroke-linejoin":
                        e.join = h;
                        break;
                    case "stroke-miterlimit":
                        e.miter = h;
                        break;
                    case "stroke-width":
                        e.linewidth = parseFloat(h);
                        break;
                    case "stroke-opacity":
                    case "fill-opacity":
                    case "opacity":
                        e.opacity = parseFloat(h);
                        break;
                    case "fill":
                    case "stroke":
                        /url\(\#.*\)/i.test(h) ? e[a] = this.getById(h.replace(/url\(\#(.*)\)/i, "$1")) : e[a] = "none" === h ? "transparent" : h;
                        break;
                    case "id":
                        e.id = h;
                        break;
                    case "class":
                        e.classList = h.split(" ")
                    }
                return e
            },
            read: {
                svg: function() {
                    return b.Utils.read.g.apply(this, arguments)
                },
                g: function(t) {
                    var e = new b.Group;
                    b.Utils.applySvgAttributes.call(this, t, e);
                    for (var i = 0, r = t.childNodes.length; i < r; i++) {
                        var n = t.childNodes[i],
                            s = n.nodeName;
                        if (!s)
                            return;
                        s = s.replace(/svg\:/gi, "").toLowerCase(),
                        s in b.Utils.read && (n = b.Utils.read[s].call(e, n), e.add(n))
                    }
                    return e
                },
                polygon: function(t, e) {
                    var i = [];
                    return t.getAttribute("points").replace(/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, function(t, e, r) {
                        i.push(new b.Anchor(parseFloat(e), parseFloat(r)))
                    }), e = new b.Path(i, !e).noStroke(), e.fill = "black", b.Utils.applySvgAttributes.call(this, t, e)
                },
                polyline: function(t) {
                    return b.Utils.read.polygon.call(this, t, !0)
                },
                path: function(t) {
                    var e = t.getAttribute("d"),
                        i = new b.Anchor,
                        r,
                        n,
                        o = !1,
                        a = !1,
                        h = e.match(/[a-df-z][^a-df-z]*/gi),
                        l = h.length - 1;
                    s.each(h.slice(0), function(t, e) {
                        var i = t[0],
                            r = i.toLowerCase(),
                            n = t.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/),
                            s = [],
                            o;
                        switch (0 >= e && (h = []), r) {
                        case "h":
                        case "v":
                            1 < n.length && (o = 1);
                            break;
                        case "m":
                        case "l":
                        case "t":
                            2 < n.length && (o = 2);
                            break;
                        case "s":
                        case "q":
                            4 < n.length && (o = 4);
                            break;
                        case "c":
                            6 < n.length && (o = 6)
                        }
                        if (o) {
                            for (t = 0, e = n.length, r = 0; t < e; t += o) {
                                var a = i;
                                if (0 < r)
                                    switch (i) {
                                    case "m":
                                        a = "l";
                                        break;
                                    case "M":
                                        a = "L"
                                    }
                                s.push([a].concat(n.slice(t, t + o)).join(" ")),
                                r++
                            }
                            h = Array.prototype.concat.apply(h, s)
                        } else
                            h.push(t)
                    });
                    var c = [];
                    if (s.each(h, function(t, e) {
                        var h = t[0],
                            u = h.toLowerCase();
                        switch (n = t.slice(1).trim(), n = n.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(t, e, i) {
                            return parseFloat(e) * d(10, i)
                        }), n = n.split(/[\s,]+|(?=\s?[+\-])/), a = h === u, u) {
                        case "z":
                            if (e >= l)
                                o = !0;
                            else {
                                t = i.x,
                                e = i.y;
                                var p = new b.Anchor(t, e, void 0, void 0, void 0, void 0, b.Commands.close)
                            }
                            break;
                        case "m":
                        case "l":
                            t = parseFloat(n[0]),
                            e = parseFloat(n[1]),
                            p = new b.Anchor(t, e, void 0, void 0, void 0, void 0, "m" === u ? b.Commands.move : b.Commands.line),
                            a && p.addSelf(i),
                            i = p;
                            break;
                        case "h":
                        case "v":
                            e = "h" === u ? "x" : "y",
                            u = "x" === e ? "y" : "x",
                            p = new b.Anchor(void 0, void 0, void 0, void 0, void 0, void 0, b.Commands.line),
                            p[e] = parseFloat(n[0]),
                            p[u] = i[u],
                            a && (p[e] += i[e]),
                            i = p;
                            break;
                        case "c":
                        case "s":
                            if (p = i.x, e = i.y, r || (r = new b.Vector), "c" === u) {
                                h = parseFloat(n[0]);
                                var f = parseFloat(n[1]),
                                    _ = parseFloat(n[2]),
                                    g = parseFloat(n[3]);
                                u = parseFloat(n[4]),
                                t = parseFloat(n[5])
                            } else
                                u = O(i, r, a),
                                h = u.x,
                                f = u.y,
                                _ = parseFloat(n[0]),
                                g = parseFloat(n[1]),
                                u = parseFloat(n[2]),
                                t = parseFloat(n[3]);
                            a && (h += p, f += e, _ += p, g += e, u += p, t += e),
                            s.isObject(i.controls) || b.Anchor.AppendCurveProperties(i),
                            i.controls.right.set(h - i.x, f - i.y),
                            i = p = new b.Anchor(u, t, _ - u, g - t, void 0, void 0, b.Commands.curve),
                            r = p.controls.left;
                            break;
                        case "t":
                        case "q":
                            p = i.x,
                            e = i.y,
                            r || (r = new b.Vector),
                            r.isZero() ? (h = p, f = e) : (h = r.x, e = r.y),
                            "q" === u ? (_ = parseFloat(n[0]), g = parseFloat(n[1]), u = parseFloat(n[1]), t = parseFloat(n[2])) : (u = O(i, r, a), _ = u.x, g = u.y, u = parseFloat(n[0]), t = parseFloat(n[1])),
                            a && (h += p, f += e, _ += p, g += e, u += p, t += e),
                            s.isObject(i.controls) || b.Anchor.AppendCurveProperties(i),
                            i.controls.right.set(h - i.x, f - i.y),
                            i = p = new b.Anchor(u, t, _ - u, g - t, void 0, void 0, b.Commands.curve),
                            r = p.controls.left;
                            break;
                        case "a":
                            p = i.x,
                            e = i.y;
                            var m = parseFloat(n[0]),
                                v = parseFloat(n[1]);
                            f = parseFloat(n[2]) * Math.PI / 180,
                            h = parseFloat(n[3]),
                            _ = parseFloat(n[4]),
                            u = parseFloat(n[5]),
                            t = parseFloat(n[6]),
                            a && (u += p, t += e);
                            var y = (u - p) / 2,
                                x = (t - e) / 2;
                            g = y * Math.cos(f) + x * Math.sin(f);
                            var y = -y * Math.sin(f) + x * Math.cos(f),
                                x = m * m,
                                T = v * v,
                                w = g * g,
                                S = y * y,
                                E = w / x + S / T;
                            1 < E && (m *= Math.sqrt(E), v *= Math.sqrt(E)),
                            T = Math.sqrt((x * T - x * S - T * w) / (x * S + T * w)),
                            s.isNaN(T) ? T = 0 : h != _ && 0 < T && (T *= -1),
                            x = T * m * y / v,
                            T = -T * v * g / m,
                            p = x * Math.cos(f) - T * Math.sin(f) + (p + u) / 2;
                            var w = x * Math.sin(f) + T * Math.cos(f) + (e + t) / 2,
                                A = function(t, e) {
                                    return (t[0] * e[0] + t[1] * e[1]) / (Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2)) * Math.sqrt(Math.pow(e[0], 2) + Math.pow(e[1], 2)))
                                };
                            e = function(t, e) {
                                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(A(t, e))
                            };
                            var C = e([1, 0], [(g - x) / m, (y - T) / v]),
                                S = [(g - x) / m, (y - T) / v];
                            g = [(-g - x) / m, (-y - T) / v];
                            var M = e(S, g);
                            -1 >= A(S, g) && (M = Math.PI),
                            1 <= A(S, g) && (M = 0),
                            h && (M = R(M, 2 * Math.PI)),
                            _ && 0 < M && (M -= 2 * Math.PI);
                            var P = b.Resolution,
                                D = (new b.Matrix).translate(p, w).rotate(f);
                            p = s.map(s.range(P), function(t) {
                                return t = (1 - t / (P - 1)) * M + C, t = D.multiply(m * Math.cos(t), v * Math.sin(t), 1), new b.Anchor(t.x, t.y, !1, !1, !1, !1, b.Commands.line)
                            }),
                            p.push(new b.Anchor(u, t, !1, !1, !1, !1, b.Commands.line)),
                            i = p[p.length - 1],
                            r = i.controls.left
                        }
                        p && (s.isArray(p) ? c = c.concat(p) : c.push(p))
                    }), !(1 >= c.length)) {
                        e = new b.Path(c, o, void 0, !0).noStroke(),
                        e.fill = "black";
                        var u = e.getBoundingClientRect(!0);
                        return u.centroid = {
                            x: u.left + u.width / 2,
                            y: u.top + u.height / 2
                        }, s.each(e.vertices, function(t) {
                            t.subSelf(u.centroid)
                        }), e.translation.addSelf(u.centroid), b.Utils.applySvgAttributes.call(this, t, e)
                    }
                },
                circle: function(t) {
                    var e = parseFloat(t.getAttribute("cx")),
                        i = parseFloat(t.getAttribute("cy")),
                        r = parseFloat(t.getAttribute("r")),
                        e = new b.Circle(e, i, r).noStroke();
                    return e.fill = "black", b.Utils.applySvgAttributes.call(this, t, e)
                },
                ellipse: function(t) {
                    var e = parseFloat(t.getAttribute("cx")),
                        i = parseFloat(t.getAttribute("cy")),
                        r = parseFloat(t.getAttribute("rx")),
                        n = parseFloat(t.getAttribute("ry")),
                        e = new b.Ellipse(e, i, r, n).noStroke();
                    return e.fill = "black", b.Utils.applySvgAttributes.call(this, t, e)
                },
                rect: function(t) {
                    var e = parseFloat(t.getAttribute("x")) || 0,
                        i = parseFloat(t.getAttribute("y")) || 0,
                        r = parseFloat(t.getAttribute("width")),
                        n = parseFloat(t.getAttribute("height")),
                        e = new b.Rectangle(e + r / 2, i + n / 2, r, n).noStroke();
                    return e.fill = "black", b.Utils.applySvgAttributes.call(this, t, e)
                },
                line: function(t) {
                    var e = parseFloat(t.getAttribute("x1")),
                        i = parseFloat(t.getAttribute("y1")),
                        r = parseFloat(t.getAttribute("x2")),
                        n = parseFloat(t.getAttribute("y2")),
                        e = new b.Line(e, i, r, n).noFill();
                    return b.Utils.applySvgAttributes.call(this, t, e)
                },
                lineargradient: function(t) {
                    for (var e, i = parseFloat(t.getAttribute("x1")), r = parseFloat(t.getAttribute("y1")), n = parseFloat(t.getAttribute("x2")), o = parseFloat(t.getAttribute("y2")), a = (n + i) / 2, h = (o + r) / 2, l = [], c = 0; c < t.children.length; c++) {
                        e = t.children[c];
                        var u = parseFloat(e.getAttribute("offset")),
                            d = e.getAttribute("stop-color"),
                            p = e.getAttribute("stop-opacity"),
                            f = e.getAttribute("style");
                        s.isNull(d) && (d = (e = !!f && f.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/)) && 1 < e.length ? e[1] : void 0),
                        s.isNull(p) && (p = (e = !!f && f.match(/stop\-opacity\:\s?([0-9\.\-]*)/)) && 1 < e.length ? parseFloat(e[1]) : 1),
                        l.push(new b.Gradient.Stop(u, d, p))
                    }
                    return i = new b.LinearGradient(i - a, r - h, n - a, o - h, l), b.Utils.applySvgAttributes.call(this, t, i)
                },
                radialgradient: function(t) {
                    var e = parseFloat(t.getAttribute("cx")) || 0,
                        i = parseFloat(t.getAttribute("cy")) || 0,
                        r = parseFloat(t.getAttribute("r")),
                        n = parseFloat(t.getAttribute("fx")),
                        o = parseFloat(t.getAttribute("fy"));
                    s.isNaN(n) && (n = e),
                    s.isNaN(o) && (o = i);
                    for (var a = Math.abs(e + n) / 2, h = Math.abs(i + o) / 2, l = [], c = 0; c < t.children.length; c++) {
                        var u = t.children[c],
                            d = parseFloat(u.getAttribute("offset")),
                            p = u.getAttribute("stop-color"),
                            f = u.getAttribute("stop-opacity"),
                            _ = u.getAttribute("style");
                        s.isNull(p) && (p = (u = !!_ && _.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/)) && 1 < u.length ? u[1] : void 0),
                        s.isNull(f) && (f = (u = !!_ && _.match(/stop\-opacity\:\s?([0-9\.\-]*)/)) && 1 < u.length ? parseFloat(u[1]) : 1),
                        l.push(new b.Gradient.Stop(d, p, f))
                    }
                    return e = new b.RadialGradient(e - a, i - h, r, l, n - a, o - h), b.Utils.applySvgAttributes.call(this, t, e)
                }
            },
            subdivide: function(t, e, i, r, n, o, a, h, l) {
                l = l || b.Utils.Curve.RecursionLimit;
                var c = l + 1;
                return t === a && e === h ? [new b.Anchor(a, h)] : s.map(s.range(0, c), function(s) {
                    var l = s / c;
                    return s = M(l, t, i, n, a), l = M(l, e, r, o, h), new b.Anchor(s, l)
                })
            },
            getPointOnCubicBezier: function(t, e, i, r, n) {
                var s = 1 - t;
                return s * s * s * e + 3 * s * s * t * i + 3 * s * t * t * r + t * t * t * n
            },
            getCurveLength: function(t, e, i, r, n, s, o, a, h) {
                if (t === i && e === r && n === o && s === a)
                    return t = o - t, e = a - e, l(t * t + e * e);
                var c = 9 * (i - n) + 3 * (o - t),
                    u = 6 * (t + n) - 12 * i,
                    d = 3 * (i - t),
                    p = 9 * (r - s) + 3 * (a - e),
                    f = 6 * (e + s) - 12 * r,
                    _ = 3 * (r - e);
                return P(function(t) {
                    var e = (c * t + u) * t + d;
                    return t = (p * t + f) * t + _, l(e * e + t * t)
                }, 0, 1, h || b.Utils.Curve.RecursionLimit)
            },
            integrate: function(t, e, i, r) {
                var n = b.Utils.Curve.abscissas[r - 2],
                    s = b.Utils.Curve.weights[r - 2];
                i = .5 * (i - e),
                e = i + e;
                var o = 0,
                    a = r + 1 >> 1;
                for (r = 1 & r ? s[o++] * t(e) : 0; o < a;) {
                    var h = i * n[o];
                    r += s[o++] * (t(e + h) + t(e - h))
                }
                return i * r
            },
            getCurveFromPoints: function(t, e) {
                for (var i = t.length, r = i - 1, n = 0; n < i; n++) {
                    var o = t[n];
                    s.isObject(o.controls) || b.Anchor.AppendCurveProperties(o);
                    var a = e ? R(n - 1, i) : f(n - 1, 0),
                        h = e ? R(n + 1, i) : p(n + 1, r);
                    A(t[a], o, t[h]),
                    o._command = 0 === n ? b.Commands.move : b.Commands.curve,
                    o.controls.left.x = s.isNumber(o.controls.left.x) ? o.controls.left.x : o.x,
                    o.controls.left.y = s.isNumber(o.controls.left.y) ? o.controls.left.y : o.y,
                    o.controls.right.x = s.isNumber(o.controls.right.x) ? o.controls.right.x : o.x,
                    o.controls.right.y = s.isNumber(o.controls.right.y) ? o.controls.right.y : o.y
                }
            },
            getControlPoints: function(t, e, i) {
                var r = E(t, e),
                    n = E(i, e);
                t = w(t, e),
                i = w(i, e);
                var h = (r + n) / 2;
                return e.u = s.isObject(e.controls.left) ? e.controls.left : new b.Vector(0, 0), e.v = s.isObject(e.controls.right) ? e.controls.right : new b.Vector(0, 0), 1e-4 > t || 1e-4 > i ? (e._relative || (e.controls.left.copy(e), e.controls.right.copy(e)), e) : (t *= .33, i *= .33, h = n < r ? h + u : h - u, e.controls.left.x = a(h) * t, e.controls.left.y = o(h) * t, h -= c, e.controls.right.x = a(h) * i, e.controls.right.y = o(h) * i, e._relative || (e.controls.left.x += e.x, e.controls.left.y += e.y, e.controls.right.x += e.x, e.controls.right.y += e.y), e)
            },
            getReflection: function(t, e, i) {
                return new b.Vector(2 * t.x - (e.x + t.x) - (i ? t.x : 0), 2 * t.y - (e.y + t.y) - (i ? t.y : 0))
            },
            getAnchorsFromArcData: function(t, e, i, r, n, o, a) {
                (new b.Matrix).translate(t.x, t.y).rotate(e);
                var h = b.Resolution;
                return s.map(s.range(h), function(t) {
                    return t = (t + 1) / h, a && (t = 1 - t), t = t * o + n, t = new b.Anchor(i * Math.cos(t), r * Math.sin(t)), b.Anchor.AppendCurveProperties(t), t.command = b.Commands.line, t
                })
            },
            ratioBetween: function(t, e) {
                return (t.x * e.x + t.y * e.y) / (t.length() * e.length())
            },
            angleBetween: function(t, e) {
                if (4 <= arguments.length) {
                    var i = arguments[0] - arguments[2],
                        r = arguments[1] - arguments[3];
                    return h(r, i)
                }
                return i = t.x - e.x, r = t.y - e.y, h(r, i)
            },
            distanceBetweenSquared: function(t, e) {
                var i = t.x - e.x;
                return t = t.y - e.y, i * i + t * t
            },
            distanceBetween: function(t, e) {
                return l(S(t, e))
            },
            lerp: function(t, e, i) {
                return i * (e - t) + t
            },
            toFixed: function(t) {
                return Math.floor(1e3 * t) / 1e3
            },
            mod: function(t, e) {
                for (; 0 > t;)
                    t += e;
                return t % e
            },
            Collection: function() {
                Array.call(this),
                1 < arguments.length ? Array.prototype.push.apply(this, arguments) : arguments[0] && Array.isArray(arguments[0]) && Array.prototype.push.apply(this, arguments[0])
            },
            Error: function(t) {
                this.name = "two.js",
                this.message = t
            },
            Events: {
                on: function(t, e) {
                    return this._events || (this._events = {}), (this._events[t] || (this._events[t] = [])).push(e), this
                },
                off: function(t, e) {
                    if (!this._events)
                        return this;
                    if (!t && !e)
                        return this._events = {}, this;
                    for (var i = t ? [t] : s.keys(this._events), r = 0, n = i.length; r < n; r++) {
                        t = i[r];
                        var o = this._events[t];
                        if (o) {
                            var a = [];
                            if (e)
                                for (var h = 0, l = o.length; h < l; h++) {
                                    var c = o[h],
                                        c = c.callback ? c.callback : c;
                                    e && e !== c && a.push(c)
                                }
                            this._events[t] = a
                        }
                    }
                    return this
                },
                trigger: function(t) {
                    if (!this._events)
                        return this;
                    var e = g.call(arguments, 1),
                        i = this._events[t];
                    return i && T(this, i, e), this
                },
                listen: function(t, e, i) {
                    var r = this;
                    if (t) {
                        var n = function() {
                            i.apply(r, arguments)
                        };
                        n.obj = t,
                        n.name = e,
                        n.callback = i,
                        t.on(e, n)
                    }
                    return this
                },
                ignore: function(t, e, i) {
                    return t.off(e, i), this
                }
            }
        })
    }),
    b.Utils.Events.bind = b.Utils.Events.on,
    b.Utils.Events.unbind = b.Utils.Events.off;
    var T = function(t, e, i) {
        switch (i.length) {
        case 0:
            var r = function(r) {
                e[r].call(t, i[0])
            };
            break;
        case 1:
            r = function(r) {
                e[r].call(t, i[0], i[1])
            };
            break;
        case 2:
            r = function(r) {
                e[r].call(t, i[0], i[1], i[2])
            };
            break;
        case 3:
            r = function(r) {
                e[r].call(t, i[0], i[1], i[2], i[3])
            };
            break;
        default:
            r = function(r) {
                e[r].apply(t, i)
            }
        }
        for (var n = 0; n < e.length; n++)
            r(n)
    };
    b.Utils.Error.prototype = Error(),
    b.Utils.Error.prototype.constructor = b.Utils.Error,
    b.Utils.Collection.prototype = [],
    b.Utils.Collection.prototype.constructor = b.Utils.Collection,
    s.extend(b.Utils.Collection.prototype, b.Utils.Events, {
        pop: function() {
            var t = Array.prototype.pop.apply(this, arguments);
            return this.trigger(b.Events.remove, [t]), t
        },
        shift: function() {
            var t = Array.prototype.shift.apply(this, arguments);
            return this.trigger(b.Events.remove, [t]), t
        },
        push: function() {
            var t = Array.prototype.push.apply(this, arguments);
            return this.trigger(b.Events.insert, arguments), t
        },
        unshift: function() {
            var t = Array.prototype.unshift.apply(this, arguments);
            return this.trigger(b.Events.insert, arguments), t
        },
        splice: function() {
            var t = Array.prototype.splice.apply(this, arguments);
            if (this.trigger(b.Events.remove, t), 2 < arguments.length) {
                var e = this.slice(arguments[0], arguments[0] + arguments.length - 2);
                this.trigger(b.Events.insert, e),
                this.trigger(b.Events.order)
            }
            return t
        },
        sort: function() {
            return Array.prototype.sort.apply(this, arguments), this.trigger(b.Events.order), this
        },
        reverse: function() {
            return Array.prototype.reverse.apply(this, arguments), this.trigger(b.Events.order), this
        }
    });
    var w = b.Utils.distanceBetween,
        S = b.Utils.distanceBetweenSquared,
        E = b.Utils.angleBetween,
        A = b.Utils.getControlPoints,
        R = b.Utils.mod,
        C = b.Utils.getBackingStoreRatio,
        M = b.Utils.getPointOnCubicBezier,
        P = b.Utils.integrate,
        O = b.Utils.getReflection;
    s.extend(b.prototype, b.Utils.Events, {
        appendTo: function(t) {
            return t.appendChild(this.renderer.domElement), this
        },
        play: function() {
            return b.Utils.setPlaying.call(this, !0), this.trigger(b.Events.play)
        },
        pause: function() {
            return this.playing = !1, this.trigger(b.Events.pause)
        },
        update: function() {
            var t = !!this._lastFrame,
                e = m.now();
            this.frameCount++,
            t && (this.timeDelta = parseFloat((e - this._lastFrame).toFixed(3))),
            this._lastFrame = e;
            var t = this.width,
                e = this.height,
                i = this.renderer;
            return t === i.width && e === i.height || i.setSize(t, e, this.ratio), this.trigger(b.Events.update, this.frameCount, this.timeDelta), this.render()
        },
        render: function() {
            return this.renderer.render(), this.trigger(b.Events.render, this.frameCount)
        },
        add: function(t) {
            var e = t;
            return e instanceof Array || (e = s.toArray(arguments)), this.scene.add(e), this
        },
        remove: function(t) {
            var e = t;
            return e instanceof Array || (e = s.toArray(arguments)), this.scene.remove(e), this
        },
        clear: function() {
            return this.scene.remove(s.toArray(this.scene.children)), this
        },
        makeLine: function(t, e, i, r) {
            return t = new b.Line(t, e, i, r), this.scene.add(t), t
        },
        makeRectangle: function(t, e, i, r) {
            return t = new b.Rectangle(t, e, i, r), this.scene.add(t), t
        },
        makeRoundedRectangle: function(t, e, i, r, n) {
            return t = new b.RoundedRectangle(t, e, i, r, n), this.scene.add(t), t
        },
        makeCircle: function(t, e, i) {
            return t = new b.Circle(t, e, i), this.scene.add(t), t
        },
        makeEllipse: function(t, e, i, r) {
            return t = new b.Ellipse(t, e, i, r), this.scene.add(t), t
        },
        makeStar: function(t, e, i, r, n) {
            return t = new b.Star(t, e, i, r, n), this.scene.add(t), t
        },
        makeCurve: function(t) {
            var e = arguments.length,
                i = t;
            if (!s.isArray(t))
                for (var i = [], r = 0; r < e; r += 2) {
                    var n = arguments[r];
                    if (!s.isNumber(n))
                        break;
                    i.push(new b.Anchor(n, arguments[r + 1]))
                }
            return e = arguments[e - 1], i = new b.Path(i, !(s.isBoolean(e) && e), !0), e = i.getBoundingClientRect(), i.center().translation.set(e.left + e.width / 2, e.top + e.height / 2), this.scene.add(i), i
        },
        makePolygon: function(t, e, i, r) {
            return t = new b.Polygon(t, e, i, r), this.scene.add(t), t
        },
        makeArcSegment: function(t, e, i, r, n, s, o) {
            return t = new b.ArcSegment(t, e, i, r, n, s, o), this.scene.add(t), t
        },
        makePath: function(t) {
            var e = arguments.length,
                i = t;
            if (!s.isArray(t))
                for (var i = [], r = 0; r < e; r += 2) {
                    var n = arguments[r];
                    if (!s.isNumber(n))
                        break;
                    i.push(new b.Anchor(n, arguments[r + 1]))
                }
            return e = arguments[e - 1], i = new b.Path(i, !(s.isBoolean(e) && e)), e = i.getBoundingClientRect(), i.center().translation.set(e.left + e.width / 2, e.top + e.height / 2), this.scene.add(i), i
        },
        makeText: function(t, e, i, r) {
            return t = new b.Text(t, e, i, r), this.add(t), t
        },
        makeLinearGradient: function(t, e, i, r) {
            var n = g.call(arguments, 4),
                n = new b.LinearGradient(t, e, i, r, n);
            return this.add(n), n
        },
        makeRadialGradient: function(t, e, i) {
            var r = g.call(arguments, 3),
                r = new b.RadialGradient(t, e, i, r);
            return this.add(r), r
        },
        makeSprite: function(t, e, i, r, n, s, o) {
            return t = new b.Sprite(t, e, i, r, n, s), o && t.play(), this.add(t), t
        },
        makeImageSequence: function(t, e, i, r, n) {
            return t = new b.ImageSequence(t, e, i, r), n && t.play(), this.add(t), t
        },
        makeTexture: function(t, e) {
            return new b.Texture(t, e)
        },
        makeGroup: function(t) {
            var e = t;
            e instanceof Array || (e = s.toArray(arguments));
            var i = new b.Group;
            return this.scene.add(i), i.add(e), i
        },
        interpret: function(t, e) {
            var i = t.tagName.toLowerCase();
            return i in b.Utils.read ? (t = b.Utils.read[i].call(this, t), e && t instanceof b.Group ? this.add(t.children) : this.add(t), t) : null
        },
        load: function(t, e) {
            var i = [],
                r;
            if (/.*\.svg/gi.test(t))
                return b.Utils.xhr(t, s.bind(function(t) {
                    for (x.temp.innerHTML = t, r = 0; r < x.temp.children.length; r++)
                        n = x.temp.children[r],
                        i.push(this.interpret(n));
                    e(1 >= i.length ? i[0] : i, 1 >= x.temp.children.length ? x.temp.children[0] : x.temp.children)
                }, this)), this;
            for (x.temp.innerHTML = t, r = 0; r < x.temp.children.length; r++) {
                var n = x.temp.children[r];
                i.push(this.interpret(n))
            }
            return e(1 >= i.length ? i[0] : i, 1 >= x.temp.children.length ? x.temp.children[0] : x.temp.children), this
        }
    });
    var D = x.getRequestAnimationFrame();
    return "function" == typeof define && define.amd ? define("two", [], function() {
        return b
    }) : "undefined" != typeof module && module.exports && (module.exports = b), b
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils;
    t = t.Registry = function() {
        this.map = {}
    },
    e.extend(t, {}),
    e.extend(t.prototype, {
        add: function(t, e) {
            return this.map[t] = e, this
        },
        remove: function(t) {
            return delete this.map[t], this
        },
        get: function(t) {
            return this.map[t]
        },
        contains: function(t) {
            return t in this.map
        }
    })
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.Vector = function(t, e) {
            this.x = t || 0,
            this.y = e || 0
        };
    e.extend(i, {
        zero: new t.Vector
    }),
    e.extend(i.prototype, t.Utils.Events, {
        set: function(t, e) {
            return this.x = t, this.y = e, this
        },
        copy: function(t) {
            return this.x = t.x, this.y = t.y, this
        },
        clear: function() {
            return this.y = this.x = 0, this
        },
        clone: function() {
            return new i(this.x, this.y)
        },
        add: function(t, e) {
            return this.x = t.x + e.x, this.y = t.y + e.y, this
        },
        addSelf: function(t) {
            return this.x += t.x, this.y += t.y, this
        },
        sub: function(t, e) {
            return this.x = t.x - e.x, this.y = t.y - e.y, this
        },
        subSelf: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        multiplySelf: function(t) {
            return this.x *= t.x, this.y *= t.y, this
        },
        multiplyScalar: function(t) {
            return this.x *= t, this.y *= t, this
        },
        divideScalar: function(t) {
            return t ? (this.x /= t, this.y /= t) : this.set(0, 0), this
        },
        negate: function() {
            return this.multiplyScalar(-1)
        },
        dot: function(t) {
            return this.x * t.x + this.y * t.y
        },
        lengthSquared: function() {
            return this.x * this.x + this.y * this.y
        },
        length: function() {
            return Math.sqrt(this.lengthSquared())
        },
        normalize: function() {
            return this.divideScalar(this.length())
        },
        distanceTo: function(t) {
            return Math.sqrt(this.distanceToSquared(t))
        },
        distanceToSquared: function(t) {
            var e = this.x - t.x;
            return t = this.y - t.y, e * e + t * t
        },
        setLength: function(t) {
            return this.normalize().multiplyScalar(t)
        },
        equals: function(t, e) {
            return e = void 0 === e ? 1e-4 : e, this.distanceTo(t) < e
        },
        lerp: function(t, e) {
            return this.set((t.x - this.x) * e + this.x, (t.y - this.y) * e + this.y)
        },
        isZero: function(t) {
            return t = void 0 === t ? 1e-4 : t, this.length() < t
        },
        toString: function() {
            return this.x + ", " + this.y
        },
        toObject: function() {
            return {
                x: this.x,
                y: this.y
            }
        },
        rotate: function(t) {
            var e = Math.cos(t);
            return t = Math.sin(t), this.x = this.x * e - this.y * t, this.y = this.x * t + this.y * e, this
        }
    });
    var r = {
            set: function(e, i) {
                return this._x = e, this._y = i, this.trigger(t.Events.change)
            },
            copy: function(e) {
                return this._x = e.x, this._y = e.y, this.trigger(t.Events.change)
            },
            clear: function() {
                return this._y = this._x = 0, this.trigger(t.Events.change)
            },
            clone: function() {
                return new i(this._x, this._y)
            },
            add: function(e, i) {
                return this._x = e.x + i.x, this._y = e.y + i.y, this.trigger(t.Events.change)
            },
            addSelf: function(e) {
                return this._x += e.x, this._y += e.y, this.trigger(t.Events.change)
            },
            sub: function(e, i) {
                return this._x = e.x - i.x, this._y = e.y - i.y, this.trigger(t.Events.change)
            },
            subSelf: function(e) {
                return this._x -= e.x, this._y -= e.y, this.trigger(t.Events.change)
            },
            multiplySelf: function(e) {
                return this._x *= e.x, this._y *= e.y, this.trigger(t.Events.change)
            },
            multiplyScalar: function(e) {
                return this._x *= e, this._y *= e, this.trigger(t.Events.change)
            },
            divideScalar: function(e) {
                return e ? (this._x /= e, this._y /= e, this.trigger(t.Events.change)) : this.clear()
            },
            negate: function() {
                return this.multiplyScalar(-1)
            },
            dot: function(t) {
                return this._x * t.x + this._y * t.y
            },
            lengthSquared: function() {
                return this._x * this._x + this._y * this._y
            },
            length: function() {
                return Math.sqrt(this.lengthSquared())
            },
            normalize: function() {
                return this.divideScalar(this.length())
            },
            distanceTo: function(t) {
                return Math.sqrt(this.distanceToSquared(t))
            },
            distanceToSquared: function(t) {
                var e = this._x - t.x;
                return t = this._y - t.y, e * e + t * t
            },
            setLength: function(t) {
                return this.normalize().multiplyScalar(t)
            },
            equals: function(t, e) {
                return e = void 0 === e ? 1e-4 : e, this.distanceTo(t) < e
            },
            lerp: function(t, e) {
                return this.set((t.x - this._x) * e + this._x, (t.y - this._y) * e + this._y)
            },
            isZero: function(t) {
                return t = void 0 === t ? 1e-4 : t, this.length() < t
            },
            toString: function() {
                return this._x + ", " + this._y
            },
            toObject: function() {
                return {
                    x: this._x,
                    y: this._y
                }
            },
            rotate: function(t) {
                var e = Math.cos(t);
                return t = Math.sin(t), this._x = this._x * e - this._y * t, this._y = this._x * t + this._y * e, this
            }
        },
        n = {
            enumerable: !0,
            get: function() {
                return this._x
            },
            set: function(e) {
                this._x = e,
                this.trigger(t.Events.change, "x")
            }
        },
        s = {
            enumerable: !0,
            get: function() {
                return this._y
            },
            set: function(e) {
                this._y = e,
                this.trigger(t.Events.change, "y")
            }
        };
    t.Vector.prototype.bind = t.Vector.prototype.on = function() {
        return this._bound || (this._x = this.x, this._y = this.y, Object.defineProperty(this, "x", n), Object.defineProperty(this, "y", s), e.extend(this, r), this._bound = !0), t.Utils.Events.bind.apply(this, arguments), this
    }
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Commands,
        i = t.Utils,
        r = t.Anchor = function(n, s, o, a, h, l, c) {
            if (t.Vector.call(this, n, s), this._broadcast = i.bind(function() {
                this.trigger(t.Events.change)
            }, this), this._command = c || e.move, this._relative = !0, !c)
                return this;
            r.AppendCurveProperties(this),
            i.isNumber(o) && (this.controls.left.x = o),
            i.isNumber(a) && (this.controls.left.y = a),
            i.isNumber(h) && (this.controls.right.x = h),
            i.isNumber(l) && (this.controls.right.y = l)
        };
    i.extend(r, {
        AppendCurveProperties: function(e) {
            e.controls = {
                left: new t.Vector(0, 0),
                right: new t.Vector(0, 0)
            }
        }
    });
    var n = {
        listen: function() {
            return i.isObject(this.controls) || r.AppendCurveProperties(this), this.controls.left.bind(t.Events.change, this._broadcast), this.controls.right.bind(t.Events.change, this._broadcast), this
        },
        ignore: function() {
            return this.controls.left.unbind(t.Events.change, this._broadcast), this.controls.right.unbind(t.Events.change, this._broadcast), this
        },
        clone: function() {
            var e = this.controls,
                e = new t.Anchor(this.x, this.y, e && e.left.x, e && e.left.y, e && e.right.x, e && e.right.y, this.command);
            return e.relative = this._relative, e
        },
        toObject: function() {
            var t = {
                x: this.x,
                y: this.y
            };
            return this._command && (t.command = this._command), this._relative && (t.relative = this._relative), this.controls && (t.controls = {
                left: this.controls.left.toObject(),
                right: this.controls.right.toObject()
            }), t
        },
        toString: function() {
            return this.controls ? [this._x, this._y, this.controls.left.x, this.controls.left.y, this.controls.right.x, this.controls.right.y].join(", ") : [this._x, this._y].join(", ")
        }
    };
    Object.defineProperty(r.prototype, "command", {
        enumerable: !0,
        get: function() {
            return this._command
        },
        set: function(n) {
            return this._command = n, this._command !== e.curve || i.isObject(this.controls) || r.AppendCurveProperties(this), this.trigger(t.Events.change)
        }
    }),
    Object.defineProperty(r.prototype, "relative", {
        enumerable: !0,
        get: function() {
            return this._relative
        },
        set: function(e) {
            return this._relative == e ? this : (this._relative = !!e, this.trigger(t.Events.change))
        }
    }),
    i.extend(r.prototype, t.Vector.prototype, n),
    t.Anchor.prototype.bind = t.Anchor.prototype.on = function() {
        t.Vector.prototype.bind.apply(this, arguments),
        i.extend(this, n)
    },
    t.Anchor.prototype.unbind = t.Anchor.prototype.off = function() {
        t.Vector.prototype.unbind.apply(this, arguments),
        i.extend(this, n)
    }
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = Math.cos,
        i = Math.sin,
        r = Math.tan,
        n = t.Utils,
        s = t.Matrix = function(e, i, r, s, o, a) {
            this.elements = new t.Array(9);
            var h = e;
            n.isArray(h) || (h = n.toArray(arguments)),
            this.identity().set(h)
        };
    n.extend(s, {
        Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1],
        Multiply: function(e, i, r) {
            if (3 >= i.length) {
                r = i[0] || 0;
                var n = i[1] || 0;
                return i = i[2] || 0, {
                    x: e[0] * r + e[1] * n + e[2] * i,
                    y: e[3] * r + e[4] * n + e[5] * i,
                    z: e[6] * r + e[7] * n + e[8] * i
                }
            }
            var n = e[0],
                s = e[1],
                o = e[2],
                a = e[3],
                h = e[4],
                l = e[5],
                c = e[6],
                u = e[7];
            e = e[8];
            var d = i[0],
                p = i[1],
                f = i[2],
                _ = i[3],
                g = i[4],
                m = i[5],
                v = i[6],
                y = i[7];
            return i = i[8], r = r || new t.Array(9), r[0] = n * d + s * _ + o * v, r[1] = n * p + s * g + o * y, r[2] = n * f + s * m + o * i, r[3] = a * d + h * _ + l * v, r[4] = a * p + h * g + l * y, r[5] = a * f + h * m + l * i, r[6] = c * d + u * _ + e * v, r[7] = c * p + u * g + e * y, r[8] = c * f + u * m + e * i, r
        }
    }),
    n.extend(s.prototype, t.Utils.Events, {
        set: function(e) {
            var i = e;
            return n.isArray(i) || (i = n.toArray(arguments)), n.extend(this.elements, i), this.trigger(t.Events.change)
        },
        identity: function() {
            return this.set(s.Identity), this
        },
        multiply: function(e, i, r, s, o, a, h, l, c) {
            var u = arguments,
                d = u.length;
            if (1 >= d)
                return n.each(this.elements, function(t, i) {
                    this.elements[i] = t * e
                }, this), this.trigger(t.Events.change);
            if (3 >= d)
                return e = e || 0, i = i || 0, r = r || 0, o = this.elements, {
                    x: o[0] * e + o[1] * i + o[2] * r,
                    y: o[3] * e + o[4] * i + o[5] * r,
                    z: o[6] * e + o[7] * i + o[8] * r
                };
            var p = this.elements,
                d = p[0],
                f = p[1],
                _ = p[2],
                g = p[3],
                m = p[4],
                v = p[5],
                y = p[6],
                x = p[7],
                p = p[8],
                b = u[0],
                T = u[1],
                w = u[2],
                S = u[3],
                E = u[4],
                A = u[5],
                R = u[6],
                C = u[7],
                u = u[8];
            return this.elements[0] = d * b + f * S + _ * R, this.elements[1] = d * T + f * E + _ * C, this.elements[2] = d * w + f * A + _ * u, this.elements[3] = g * b + m * S + v * R, this.elements[4] = g * T + m * E + v * C, this.elements[5] = g * w + m * A + v * u, this.elements[6] = y * b + x * S + p * R, this.elements[7] = y * T + x * E + p * C, this.elements[8] = y * w + x * A + p * u, this.trigger(t.Events.change)
        },
        inverse: function(e) {
            var i = this.elements;
            e = e || new t.Matrix;
            var r = i[0],
                n = i[1],
                s = i[2],
                o = i[3],
                a = i[4],
                h = i[5],
                l = i[6],
                c = i[7],
                i = i[8],
                u = i * a - h * c,
                d = -i * o + h * l,
                p = c * o - a * l,
                f = r * u + n * d + s * p;
            return f ? (f = 1 / f, e.elements[0] = u * f, e.elements[1] = (-i * n + s * c) * f, e.elements[2] = (h * n - s * a) * f, e.elements[3] = d * f, e.elements[4] = (i * r - s * l) * f, e.elements[5] = (-h * r + s * o) * f, e.elements[6] = p * f, e.elements[7] = (-c * r + n * l) * f, e.elements[8] = (a * r - n * o) * f, e) : null
        },
        scale: function(t, e) {
            return 1 >= arguments.length && (e = t), this.multiply(t, 0, 0, 0, e, 0, 0, 0, 1)
        },
        rotate: function(t) {
            var r = e(t);
            return t = i(t), this.multiply(r, -t, 0, t, r, 0, 0, 0, 1)
        },
        translate: function(t, e) {
            return this.multiply(1, 0, t, 0, 1, e, 0, 0, 1)
        },
        skewX: function(t) {
            return t = r(t), this.multiply(1, t, 0, 0, 1, 0, 0, 0, 1)
        },
        skewY: function(t) {
            return t = r(t), this.multiply(1, 0, 0, t, 1, 0, 0, 0, 1)
        },
        toString: function(t) {
            var e = [];
            return this.toArray(t, e), e.join(" ")
        },
        toArray: function(t, e) {
            var i = this.elements,
                r = !!e,
                n = parseFloat(i[0].toFixed(3)),
                s = parseFloat(i[1].toFixed(3)),
                o = parseFloat(i[2].toFixed(3)),
                a = parseFloat(i[3].toFixed(3)),
                h = parseFloat(i[4].toFixed(3)),
                l = parseFloat(i[5].toFixed(3));
            if (t) {
                t = parseFloat(i[6].toFixed(3));
                var c = parseFloat(i[7].toFixed(3)),
                    i = parseFloat(i[8].toFixed(3));
                return r ? (e[0] = n, e[1] = a, e[2] = t, e[3] = s, e[4] = h, e[5] = c, e[6] = o, e[7] = l, void (e[8] = i)) : [n, a, t, s, h, c, o, l, i]
            }
            if (!r)
                return [n, a, s, h, o, l];
            e[0] = n,
            e[1] = a,
            e[2] = s,
            e[3] = h,
            e[4] = o,
            e[5] = l
        },
        clone: function() {
            var e = this.elements[0],
                i = this.elements[1],
                r = this.elements[2],
                n = this.elements[3],
                s = this.elements[4];
            return new t.Matrix(e, i, r, n, s, this.elements[5], this.elements[6], this.elements[7], this.elements[8])
        }
    })
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils.mod,
        i = t.Utils.toFixed,
        r = t.Utils,
        n = {
            version: 1.1,
            ns: "http://www.w3.org/2000/svg",
            xlink: "http://www.w3.org/1999/xlink",
            alignments: {
                left: "start",
                center: "middle",
                right: "end"
            },
            createElement: function(t, e) {
                var i = document.createElementNS(n.ns, t);
                return "svg" === t && (e = r.defaults(e || {}, {
                    version: n.version
                })), r.isEmpty(e) || n.setAttributes(i, e), i
            },
            setAttributes: function(t, e) {
                for (var i = Object.keys(e), r = 0; r < i.length; r++)
                    /href/.test(i[r]) ? t.setAttributeNS(n.xlink, i[r], e[i[r]]) : t.setAttribute(i[r], e[i[r]]);
                return this
            },
            removeAttributes: function(t, e) {
                for (var i in e)
                    t.removeAttribute(i);
                return this
            },
            toString: function(r, n) {
                for (var s = r.length, o = s - 1, a, h = "", l = 0; l < s; l++) {
                    var c = r[l],
                        u = n ? e(l - 1, s) : Math.max(l - 1, 0);
                    n && e(l + 1, s);
                    var d = r[u],
                        p = i(c._x),
                        f = i(c._y);
                    switch (c._command) {
                    case t.Commands.close:
                        var _ = t.Commands.close;
                        break;
                    case t.Commands.curve:
                        var g = d.controls && d.controls.right || t.Vector.zero;
                        if (_ = c.controls && c.controls.left || t.Vector.zero, d._relative ? (u = i(g.x + d.x), d = i(g.y + d.y)) : (u = i(g.x), d = i(g.y)), c._relative) {
                            g = i(_.x + c.x);
                            var m = i(_.y + c.y)
                        } else
                            g = i(_.x),
                            m = i(_.y);
                        _ = (0 === l ? t.Commands.move : t.Commands.curve) + " " + u + " " + d + " " + g + " " + m + " " + p + " " + f;
                        break;
                    case t.Commands.move:
                        a = c,
                        _ = t.Commands.move + " " + p + " " + f;
                        break;
                    default:
                        _ = c._command + " " + p + " " + f
                    }
                    l >= o && n && (c._command === t.Commands.curve && (f = a, d = c.controls && c.controls.right || c, p = f.controls && f.controls.left || f, c._relative ? (u = i(d.x + c.x), d = i(d.y + c.y)) : (u = i(d.x), d = i(d.y)), f._relative ? (g = i(p.x + f.x), m = i(p.y + f.y)) : (g = i(p.x), m = i(p.y)), p = i(f.x), f = i(f.y), _ += " C " + u + " " + d + " " + g + " " + m + " " + p + " " + f), _ += " Z"),
                    h += _ + " "
                }
                return h
            },
            getClip: function(t) {
                var e = t._renderer.clip;
                if (!e) {
                    for (var i = t; i.parent;)
                        i = i.parent;
                    e = t._renderer.clip = n.createElement("clipPath"),
                    i.defs.appendChild(e)
                }
                return e
            },
            group: {
                appendChild: function(t) {
                    var e = t._renderer.elem;
                    if (e) {
                        var i = e.nodeName;
                        !i || /(radial|linear)gradient/i.test(i) || t._clip || this.elem.appendChild(e)
                    }
                },
                removeChild: function(t) {
                    var e = t._renderer.elem;
                    e && e.parentNode == this.elem && e.nodeName && (t._clip || this.elem.removeChild(e))
                },
                orderChild: function(t) {
                    this.elem.appendChild(t._renderer.elem)
                },
                renderChild: function(t) {
                    n[t._renderer.type].render.call(t, this)
                },
                render: function(t) {
                    if (this._update(), 0 === this._opacity && !this._flagOpacity)
                        return this;
                    this._renderer.elem || (this._renderer.elem = n.createElement("g", {
                        id: this.id
                    }), t.appendChild(this._renderer.elem));
                    var e = {
                        domElement: t,
                        elem: this._renderer.elem
                    };
                    (this._matrix.manual || this._flagMatrix) && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
                    for (var i = 0; i < this.children.length; i++) {
                        var r = this.children[i];
                        n[r._renderer.type].render.call(r, t)
                    }
                    return this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity), this._flagAdditions && this.additions.forEach(n.group.appendChild, e), this._flagSubtractions && this.subtractions.forEach(n.group.removeChild, e), this._flagOrder && this.children.forEach(n.group.orderChild, e), this._flagMask && (this._mask ? this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")") : this._renderer.elem.removeAttribute("clip-path")), this.flagReset()
                }
            },
            path: {
                render: function(t) {
                    if (this._update(), 0 === this._opacity && !this._flagOpacity)
                        return this;
                    var e = {};
                    if ((this._matrix.manual || this._flagMatrix) && (e.transform = "matrix(" + this._matrix.toString() + ")"), this._flagVertices) {
                        var i = n.toString(this._vertices, this._closed);
                        e.d = i
                    }
                    return this._fill && this._fill._renderer && (this._fill._update(), n[this._fill._renderer.type].render.call(this._fill, t, !0)), this._flagFill && (e.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill), this._stroke && this._stroke._renderer && (this._stroke._update(), n[this._stroke._renderer.type].render.call(this._stroke, t, !0)), this._flagStroke && (e.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke), this._flagLinewidth && (e["stroke-width"] = this._linewidth), this._flagOpacity && (e["stroke-opacity"] = this._opacity, e["fill-opacity"] = this._opacity), this._flagVisible && (e.visibility = this._visible ? "visible" : "hidden"), this._flagCap && (e["stroke-linecap"] = this._cap), this._flagJoin && (e["stroke-linejoin"] = this._join), this._flagMiter && (e["stroke-miterlimit"] = this._miter), this._renderer.elem ? n.setAttributes(this._renderer.elem, e) : (e.id = this.id, this._renderer.elem = n.createElement("path", e), t.appendChild(this._renderer.elem)), this._flagClip && (t = n.getClip(this), e = this._renderer.elem, this._clip ? (e.removeAttribute("id"), t.setAttribute("id", this.id), t.appendChild(e)) : (t.removeAttribute("id"), e.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(e))), this.flagReset()
                }
            },
            text: {
                render: function(t) {
                    this._update();
                    var e = {};
                    return (this._matrix.manual || this._flagMatrix) && (e.transform = "matrix(" + this._matrix.toString() + ")"), this._flagFamily && (e["font-family"] = this._family), this._flagSize && (e["font-size"] = this._size), this._flagLeading && (e["line-height"] = this._leading), this._flagAlignment && (e["text-anchor"] = n.alignments[this._alignment] || this._alignment), this._flagBaseline && (e["alignment-baseline"] = e["dominant-baseline"] = this._baseline), this._flagStyle && (e["font-style"] = this._style), this._flagWeight && (e["font-weight"] = this._weight), this._flagDecoration && (e["text-decoration"] = this._decoration), this._fill && this._fill._renderer && (this._fill._update(), n[this._fill._renderer.type].render.call(this._fill, t, !0)), this._flagFill && (e.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill), this._stroke && this._stroke._renderer && (this._stroke._update(), n[this._stroke._renderer.type].render.call(this._stroke, t, !0)), this._flagStroke && (e.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke), this._flagLinewidth && (e["stroke-width"] = this._linewidth), this._flagOpacity && (e.opacity = this._opacity), this._flagVisible && (e.visibility = this._visible ? "visible" : "hidden"), this._renderer.elem ? n.setAttributes(this._renderer.elem, e) : (e.id = this.id, this._renderer.elem = n.createElement("text", e), t.defs.appendChild(this._renderer.elem)), this._flagClip && (t = n.getClip(this), e = this._renderer.elem, this._clip ? (e.removeAttribute("id"), t.setAttribute("id", this.id), t.appendChild(e)) : (t.removeAttribute("id"), e.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(e))), this._flagValue && (this._renderer.elem.textContent = this._value), this.flagReset()
                }
            },
            "linear-gradient": {
                render: function(t, e) {
                    if (e || this._update(), e = {}, this._flagEndPoints && (e.x1 = this.left._x, e.y1 = this.left._y, e.x2 = this.right._x, e.y2 = this.right._y), this._flagSpread && (e.spreadMethod = this._spread), this._renderer.elem ? n.setAttributes(this._renderer.elem, e) : (e.id = this.id, e.gradientUnits = "userSpaceOnUse", this._renderer.elem = n.createElement("linearGradient", e), t.defs.appendChild(this._renderer.elem)), this._flagStops)
                        for ((t = this._renderer.elem.childNodes.length !== this.stops.length) && (this._renderer.elem.childNodes.length = 0), e = 0; e < this.stops.length; e++) {
                            var i = this.stops[e],
                                r = {};
                            i._flagOffset && (r.offset = 100 * i._offset + "%"),
                            i._flagColor && (r["stop-color"] = i._color),
                            i._flagOpacity && (r["stop-opacity"] = i._opacity),
                            i._renderer.elem ? n.setAttributes(i._renderer.elem, r) : i._renderer.elem = n.createElement("stop", r),
                            t && this._renderer.elem.appendChild(i._renderer.elem),
                            i.flagReset()
                        }
                    return this.flagReset()
                }
            },
            "radial-gradient": {
                render: function(t, e) {
                    if (e || this._update(), e = {}, this._flagCenter && (e.cx = this.center._x, e.cy = this.center._y), this._flagFocal && (e.fx = this.focal._x, e.fy = this.focal._y), this._flagRadius && (e.r = this._radius), this._flagSpread && (e.spreadMethod = this._spread), this._renderer.elem ? n.setAttributes(this._renderer.elem, e) : (e.id = this.id, e.gradientUnits = "userSpaceOnUse", this._renderer.elem = n.createElement("radialGradient", e), t.defs.appendChild(this._renderer.elem)), this._flagStops)
                        for ((t = this._renderer.elem.childNodes.length !== this.stops.length) && (this._renderer.elem.childNodes.length = 0), e = 0; e < this.stops.length; e++) {
                            var i = this.stops[e],
                                r = {};
                            i._flagOffset && (r.offset = 100 * i._offset + "%"),
                            i._flagColor && (r["stop-color"] = i._color),
                            i._flagOpacity && (r["stop-opacity"] = i._opacity),
                            i._renderer.elem ? n.setAttributes(i._renderer.elem, r) : i._renderer.elem = n.createElement("stop", r),
                            t && this._renderer.elem.appendChild(i._renderer.elem),
                            i.flagReset()
                        }
                    return this.flagReset()
                }
            },
            texture: {
                render: function(e, i) {
                    i || this._update(),
                    i = {};
                    var s = {
                            x: 0,
                            y: 0
                        },
                        o = this.image;
                    if (this._flagLoaded && this.loaded)
                        switch (o.nodeName.toLowerCase()) {
                        case "canvas":
                            s.href = s["xlink:href"] = o.toDataURL("image/png");
                            break;
                        case "img":
                        case "image":
                            s.href = s["xlink:href"] = this.src
                        }
                    if ((this._flagOffset || this._flagLoaded || this._flagScale) && (i.x = this._offset.x, i.y = this._offset.y, o && (i.x -= o.width / 2, i.y -= o.height / 2, this._scale instanceof t.Vector ? (i.x *= this._scale.x, i.y *= this._scale.y) : (i.x *= this._scale, i.y *= this._scale)), 0 < i.x && (i.x *= -1), 0 < i.y && (i.y *= -1)), (this._flagScale || this._flagLoaded || this._flagRepeat) && (i.width = 0, i.height = 0, o)) {
                        switch (s.width = i.width = o.width, s.height = i.height = o.height, this._repeat) {
                        case "no-repeat":
                            i.width += 1,
                            i.height += 1
                        }
                        this._scale instanceof t.Vector ? (i.width *= this._scale.x, i.height *= this._scale.y) : (i.width *= this._scale, i.height *= this._scale)
                    }
                    return (this._flagScale || this._flagLoaded) && (this._renderer.image ? r.isEmpty(s) || n.setAttributes(this._renderer.image, s) : this._renderer.image = n.createElement("image", s)), this._renderer.elem ? r.isEmpty(i) || n.setAttributes(this._renderer.elem, i) : (i.id = this.id, i.patternUnits = "userSpaceOnUse", this._renderer.elem = n.createElement("pattern", i), e.defs.appendChild(this._renderer.elem)), this._renderer.elem && this._renderer.image && !this._renderer.appended && (this._renderer.elem.appendChild(this._renderer.image), this._renderer.appended = !0), this.flagReset()
                }
            }
        },
        s = t[t.Types.svg] = function(e) {
            this.domElement = e.domElement || n.createElement("svg"),
            this.scene = new t.Group,
            this.scene.parent = this,
            this.defs = n.createElement("defs"),
            this.domElement.appendChild(this.defs),
            this.domElement.defs = this.defs,
            this.domElement.style.overflow = "hidden"
        };
    r.extend(s, {
        Utils: n
    }),
    r.extend(s.prototype, t.Utils.Events, {
        setSize: function(t, e) {
            return this.width = t, this.height = e, n.setAttributes(this.domElement, {
                width: t,
                height: e
            }), this
        },
        render: function() {
            return n.group.render.call(this.scene, this.domElement), this
        }
    })
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils.mod,
        i = t.Utils.toFixed,
        r = t.Utils.getRatio,
        n = t.Utils,
        s = function(t) {
            return 1 == t[0] && 0 == t[3] && 0 == t[1] && 1 == t[4] && 0 == t[2] && 0 == t[5]
        },
        o = {
            isHidden: /(none|transparent)/i,
            alignments: {
                left: "start",
                middle: "center",
                right: "end"
            },
            shim: function(t) {
                return t.tagName = "canvas", t.nodeType = 1, t
            },
            group: {
                renderChild: function(t) {
                    o[t._renderer.type].render.call(t, this.ctx, !0, this.clip)
                },
                render: function(t) {
                    this._update();
                    var e = this._matrix.elements,
                        i = this.parent;
                    this._renderer.opacity = this._opacity * (i && i._renderer ? i._renderer.opacity : 1);
                    var i = s(e),
                        r = this._mask;
                    if (this._renderer.context || (this._renderer.context = {}), this._renderer.context.ctx = t, i || (t.save(), t.transform(e[0], e[3], e[1], e[4], e[2], e[5])), r && o[r._renderer.type].render.call(r, t, !0), 0 < this.opacity && 0 !== this.scale)
                        for (e = 0; e < this.children.length; e++)
                            r = this.children[e],
                            o[r._renderer.type].render.call(r, t);
                    return i || t.restore(), this.flagReset()
                }
            },
            path: {
                render: function(r, a, h) {
                    this._update();
                    var l = this._matrix.elements,
                        c = this._stroke,
                        u = this._linewidth,
                        d = this._fill,
                        p = this._opacity * this.parent._renderer.opacity,
                        f = this._visible,
                        _ = this._cap,
                        g = this._join,
                        m = this._miter,
                        v = this._closed,
                        y = this._vertices,
                        x = y.length,
                        b = x - 1,
                        T = s(l),
                        w = this._clip;
                    if (!a && (!f || w))
                        return this;
                    for (T || (r.save(), r.transform(l[0], l[3], l[1], l[4], l[2], l[5])), d && (n.isString(d) ? r.fillStyle = d : (o[d._renderer.type].render.call(d, r), r.fillStyle = d._renderer.effect)), c && (n.isString(c) ? r.strokeStyle = c : (o[c._renderer.type].render.call(c, r), r.strokeStyle = c._renderer.effect)), u && (r.lineWidth = u), m && (r.miterLimit = m), g && (r.lineJoin = g), _ && (r.lineCap = _), n.isNumber(p) && (r.globalAlpha = p), r.beginPath(), l = 0; l < y.length; l++)
                        switch (a = y[l], f = i(a._x), _ = i(a._y), a._command) {
                        case t.Commands.close:
                            r.closePath();
                            break;
                        case t.Commands.curve:
                            p = v ? e(l - 1, x) : Math.max(l - 1, 0),
                            v && e(l + 1, x),
                            g = y[p],
                            m = g.controls && g.controls.right || t.Vector.zero;
                            var S = a.controls && a.controls.left || t.Vector.zero;
                            g._relative ? (p = m.x + i(g._x), m = m.y + i(g._y)) : (p = i(m.x), m = i(m.y)),
                            a._relative ? (g = S.x + i(a._x), S = S.y + i(a._y)) : (g = i(S.x), S = i(S.y)),
                            r.bezierCurveTo(p, m, g, S, f, _),
                            l >= b && v && (_ = E, g = a.controls && a.controls.right || t.Vector.zero, f = _.controls && _.controls.left || t.Vector.zero, a._relative ? (p = g.x + i(a._x), m = g.y + i(a._y)) : (p = i(g.x), m = i(g.y)), _._relative ? (g = f.x + i(_._x), S = f.y + i(_._y)) : (g = i(f.x), S = i(f.y)), f = i(_._x), _ = i(_._y), r.bezierCurveTo(p, m, g, S, f, _));
                            break;
                        case t.Commands.line:
                            r.lineTo(f, _);
                            break;
                        case t.Commands.move:
                            var E = a;
                            r.moveTo(f, _)
                        }
                    return v && r.closePath(), w || h || (o.isHidden.test(d) || ((v = d._renderer && d._renderer.offset) && (r.save(), r.translate(-d._renderer.offset.x, -d._renderer.offset.y), r.scale(d._renderer.scale.x, d._renderer.scale.y)), r.fill(), v && r.restore()), o.isHidden.test(c) || ((v = c._renderer && c._renderer.offset) && (r.save(), r.translate(-c._renderer.offset.x, -c._renderer.offset.y), r.scale(c._renderer.scale.x, c._renderer.scale.y), r.lineWidth = u / c._renderer.scale.x), r.stroke(), v && r.restore())), T || r.restore(), w && !h && r.clip(), this.flagReset()
                }
            },
            text: {
                render: function(t, e, r) {
                    this._update();
                    var a = this._matrix.elements,
                        h = this._stroke,
                        l = this._linewidth,
                        c = this._fill,
                        u = this._opacity * this.parent._renderer.opacity,
                        d = this._visible,
                        p = s(a),
                        f = c._renderer && c._renderer.offset && h._renderer && h._renderer.offset,
                        _ = this._clip;
                    return e || d && !_ ? (p || (t.save(), t.transform(a[0], a[3], a[1], a[4], a[2], a[5])), f || (t.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" ")), t.textAlign = o.alignments[this._alignment] || this._alignment, t.textBaseline = this._baseline, c && (n.isString(c) ? t.fillStyle = c : (o[c._renderer.type].render.call(c, t), t.fillStyle = c._renderer.effect)), h && (n.isString(h) ? t.strokeStyle = h : (o[h._renderer.type].render.call(h, t), t.strokeStyle = h._renderer.effect)), l && (t.lineWidth = l), n.isNumber(u) && (t.globalAlpha = u), _ || r || (o.isHidden.test(c) || (c._renderer && c._renderer.offset ? (e = i(c._renderer.scale.x), a = i(c._renderer.scale.y), t.save(), t.translate(-i(c._renderer.offset.x), -i(c._renderer.offset.y)), t.scale(e, a), e = this._size / c._renderer.scale.y, a = this._leading / c._renderer.scale.y, t.font = [this._style, this._weight, i(e) + "px/", i(a) + "px", this._family].join(" "), e = c._renderer.offset.x / c._renderer.scale.x, c = c._renderer.offset.y / c._renderer.scale.y, t.fillText(this.value, i(e), i(c)), t.restore()) : t.fillText(this.value, 0, 0)), o.isHidden.test(h) || (h._renderer && h._renderer.offset ? (e = i(h._renderer.scale.x), a = i(h._renderer.scale.y), t.save(), t.translate(-i(h._renderer.offset.x), -i(h._renderer.offset.y)), t.scale(e, a), e = this._size / h._renderer.scale.y, a = this._leading / h._renderer.scale.y, t.font = [this._style, this._weight, i(e) + "px/", i(a) + "px", this._family].join(" "), e = h._renderer.offset.x / h._renderer.scale.x, c = h._renderer.offset.y / h._renderer.scale.y, h = l / h._renderer.scale.x, t.lineWidth = i(h), t.strokeText(this.value, i(e), i(c)), t.restore()) : t.strokeText(this.value, 0, 0))), p || t.restore(), _ && !r && t.clip(), this.flagReset()) : this
                }
            },
            "linear-gradient": {
                render: function(t) {
                    if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops)
                        for (this._renderer.effect = t.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y), t = 0; t < this.stops.length; t++) {
                            var e = this.stops[t];
                            this._renderer.effect.addColorStop(e._offset, e._color)
                        }
                    return this.flagReset()
                }
            },
            "radial-gradient": {
                render: function(t) {
                    if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops)
                        for (this._renderer.effect = t.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius), t = 0; t < this.stops.length; t++) {
                            var e = this.stops[t];
                            this._renderer.effect.addColorStop(e._offset, e._color)
                        }
                    return this.flagReset()
                }
            },
            texture: {
                render: function(e) {
                    this._update();
                    var i = this.image;
                    return (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) && (this._renderer.effect = e.createPattern(this.image, this._repeat)), (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof t.Vector || (this._renderer.offset = new t.Vector), this._renderer.offset.x = -this._offset.x, this._renderer.offset.y = -this._offset.y, i && (this._renderer.offset.x += i.width / 2, this._renderer.offset.y += i.height / 2, this._scale instanceof t.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset()
                }
            }
        },
        a = t[t.Types.canvas] = function(e) {
            var i = !1 !== e.smoothing;
            this.domElement = e.domElement || document.createElement("canvas"),
            this.ctx = this.domElement.getContext("2d"),
            this.overdraw = e.overdraw || !1,
            n.isUndefined(this.ctx.imageSmoothingEnabled) || (this.ctx.imageSmoothingEnabled = i),
            this.scene = new t.Group,
            this.scene.parent = this
        };
    n.extend(a, {
        Utils: o
    }),
    n.extend(a.prototype, t.Utils.Events, {
        setSize: function(t, e, i) {
            return this.width = t, this.height = e, this.ratio = n.isUndefined(i) ? r(this.ctx) : i, this.domElement.width = t * this.ratio, this.domElement.height = e * this.ratio, this.domElement.style && n.extend(this.domElement.style, {
                width: t + "px",
                height: e + "px"
            }), this
        },
        render: function() {
            var t = 1 === this.ratio;
            return t || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio)), this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height), o.group.render.call(this.scene, this.ctx), t || this.ctx.restore(), this
        }
    })
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.root,
        i = t.Matrix.Multiply,
        r = t.Utils.mod,
        n = [1, 0, 0, 0, 1, 0, 0, 0, 1],
        s = new t.Array(9),
        o = t.Utils.getRatio,
        a = t.Utils.toFixed,
        h = t.Utils,
        l = {
            isHidden: /(none|transparent)/i,
            canvas: e.document ? e.document.createElement("canvas") : {
                getContext: h.identity
            },
            alignments: {
                left: "start",
                middle: "center",
                right: "end"
            },
            matrix: new t.Matrix,
            uv: new t.Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
            group: {
                removeChild: function(t, e) {
                    if (t.children)
                        for (var i = 0; i < t.children.length; i++)
                            l.group.removeChild(t.children[i], e);
                    else
                        e.deleteTexture(t._renderer.texture),
                        delete t._renderer.texture
                },
                renderChild: function(t) {
                    l[t._renderer.type].render.call(t, this.gl, this.program)
                },
                render: function(e, r) {
                    this._update();
                    var n = this.parent,
                        o = n._matrix && n._matrix.manual || n._flagMatrix,
                        a = this._matrix.manual || this._flagMatrix;
                    if ((o || a) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toArray(!0, s), i(s, n._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * n._renderer.scale, o && (this._flagMatrix = !0)), this._mask && (e.enable(e.STENCIL_TEST), e.stencilFunc(e.ALWAYS, 1, 1), e.colorMask(!1, !1, !1, !0), e.stencilOp(e.KEEP, e.KEEP, e.INCR), l[this._mask._renderer.type].render.call(this._mask, e, r, this), e.colorMask(!0, !0, !0, !0), e.stencilFunc(e.NOTEQUAL, 0, 1), e.stencilOp(e.KEEP, e.KEEP, e.KEEP)), this._flagOpacity = n._flagOpacity || this._flagOpacity, this._renderer.opacity = this._opacity * (n && n._renderer ? n._renderer.opacity : 1), this._flagSubtractions)
                        for (n = 0; n < this.subtractions.length; n++)
                            l.group.removeChild(this.subtractions[n], e);
                    return this.children.forEach(l.group.renderChild, {
                        gl: e,
                        program: r
                    }), this._mask && (e.colorMask(!1, !1, !1, !1), e.stencilOp(e.KEEP, e.KEEP, e.DECR), l[this._mask._renderer.type].render.call(this._mask, e, r, this), e.colorMask(!0, !0, !0, !0), e.stencilFunc(e.NOTEQUAL, 0, 1), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.disable(e.STENCIL_TEST)), this.flagReset()
                }
            },
            path: {
                updateCanvas: function(e) {
                    var i = e._vertices,
                        n = this.canvas,
                        s = this.ctx,
                        o = e._renderer.scale,
                        c = e._stroke,
                        u = e._linewidth,
                        d = e._fill,
                        p = e._renderer.opacity || e._opacity,
                        f = e._cap,
                        _ = e._join,
                        g = e._miter,
                        m = e._closed,
                        v = i.length,
                        y = v - 1;
                    n.width = Math.max(Math.ceil(e._renderer.rect.width * o), 1),
                    n.height = Math.max(Math.ceil(e._renderer.rect.height * o), 1);
                    var x = e._renderer.rect.centroid,
                        T = x.x,
                        x = x.y;
                    for (s.clearRect(0, 0, n.width, n.height), d && (h.isString(d) ? s.fillStyle = d : (l[d._renderer.type].render.call(d, s, e), s.fillStyle = d._renderer.effect)), c && (h.isString(c) ? s.strokeStyle = c : (l[c._renderer.type].render.call(c, s, e), s.strokeStyle = c._renderer.effect)), u && (s.lineWidth = u), g && (s.miterLimit = g), _ && (s.lineJoin = _), f && (s.lineCap = f), h.isNumber(p) && (s.globalAlpha = p), s.save(), s.scale(o, o), s.translate(T, x), s.beginPath(), e = 0; e < i.length; e++)
                        switch (b = i[e], o = a(b._x), p = a(b._y), b._command) {
                        case t.Commands.close:
                            s.closePath();
                            break;
                        case t.Commands.curve:
                            n = m ? r(e - 1, v) : Math.max(e - 1, 0),
                            m && r(e + 1, v),
                            f = i[n],
                            _ = f.controls && f.controls.right || t.Vector.zero,
                            g = b.controls && b.controls.left || t.Vector.zero,
                            f._relative ? (n = a(_.x + f._x), _ = a(_.y + f._y)) : (n = a(_.x), _ = a(_.y)),
                            b._relative ? (f = a(g.x + b._x), g = a(g.y + b._y)) : (f = a(g.x), g = a(g.y)),
                            s.bezierCurveTo(n, _, f, g, o, p),
                            e >= y && m && (p = w, f = b.controls && b.controls.right || t.Vector.zero, o = p.controls && p.controls.left || t.Vector.zero, b._relative ? (n = a(f.x + b._x), _ = a(f.y + b._y)) : (n = a(f.x), _ = a(f.y)), p._relative ? (f = a(o.x + p._x), g = a(o.y + p._y)) : (f = a(o.x), g = a(o.y)), o = a(p._x), p = a(p._y), s.bezierCurveTo(n, _, f, g, o, p));
                            break;
                        case t.Commands.line:
                            s.lineTo(o, p);
                            break;
                        case t.Commands.move:
                            var w = b;
                            s.moveTo(o, p)
                        }
                    m && s.closePath(),
                    l.isHidden.test(d) || ((i = d._renderer && d._renderer.offset) && (s.save(), s.translate(-d._renderer.offset.x, -d._renderer.offset.y), s.scale(d._renderer.scale.x, d._renderer.scale.y)), s.fill(), i && s.restore()),
                    l.isHidden.test(c) || ((i = c._renderer && c._renderer.offset) && (s.save(), s.translate(-c._renderer.offset.x, -c._renderer.offset.y), s.scale(c._renderer.scale.x, c._renderer.scale.y), s.lineWidth = u / c._renderer.scale.x), s.stroke(), i && s.restore()),
                    s.restore()
                },
                getBoundingClientRect: function(t, e, i) {
                    var r = 1 / 0,
                        n = -1 / 0,
                        s = 1 / 0,
                        o = -1 / 0;
                    t.forEach(function(t) {
                        var e = t.x,
                            i = t.y,
                            a = t.controls;
                        if (s = Math.min(i, s), r = Math.min(e, r), n = Math.max(e, n), o = Math.max(i, o), t.controls) {
                            var h = a.left,
                                l = a.right;
                            h && l && (a = t._relative ? h.x + e : h.x, h = t._relative ? h.y + i : h.y, e = t._relative ? l.x + e : l.x, t = t._relative ? l.y + i : l.y, a && h && e && t && (s = Math.min(h, t, s), r = Math.min(a, e, r), n = Math.max(a, e, n), o = Math.max(h, t, o)))
                        }
                    }),
                    h.isNumber(e) && (s -= e, r -= e, n += e, o += e),
                    i.top = s,
                    i.left = r,
                    i.right = n,
                    i.bottom = o,
                    i.width = n - r,
                    i.height = o - s,
                    i.centroid || (i.centroid = {}),
                    i.centroid.x = -r,
                    i.centroid.y = -s
                },
                render: function(e, r, n) {
                    if (!this._visible || !this._opacity)
                        return this;
                    this._update();
                    var o = this.parent,
                        a = this._matrix.manual || this._flagMatrix,
                        h = this._flagVertices || this._flagFill || this._fill instanceof t.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof t.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof t.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof t.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof t.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof t.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || o._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || !this._renderer.texture;
                    return (o._matrix.manual || o._flagMatrix || a) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toArray(!0, s), i(s, o._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * o._renderer.scale), h && (this._renderer.rect || (this._renderer.rect = {}), this._renderer.triangles || (this._renderer.triangles = new t.Array(12)), this._renderer.opacity = this._opacity * o._renderer.opacity, l.path.getBoundingClientRect(this._vertices, this._linewidth, this._renderer.rect), l.getTriangles(this._renderer.rect, this._renderer.triangles), l.updateBuffer.call(l, e, this, r), l.updateTexture.call(l, e, this)),
                    !this._clip || n ? (e.bindBuffer(e.ARRAY_BUFFER, this._renderer.textureCoordsBuffer), e.vertexAttribPointer(r.textureCoords, 2, e.FLOAT, !1, 0, 0), e.bindTexture(e.TEXTURE_2D, this._renderer.texture), e.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), e.bindBuffer(e.ARRAY_BUFFER, this._renderer.buffer), e.vertexAttribPointer(r.position, 2, e.FLOAT, !1, 0, 0), e.drawArrays(e.TRIANGLES, 0, 6), this.flagReset()) : void 0
                }
            },
            text: {
                updateCanvas: function(t) {
                    var e = this.canvas,
                        i = this.ctx,
                        r = t._renderer.scale,
                        n = t._stroke,
                        s = t._linewidth * r,
                        o = t._fill,
                        c = t._renderer.opacity || t._opacity;
                    e.width = Math.max(Math.ceil(t._renderer.rect.width * r), 1),
                    e.height = Math.max(Math.ceil(t._renderer.rect.height * r), 1);
                    var u = t._renderer.rect.centroid,
                        d = u.x,
                        u = u.y,
                        p = o._renderer && o._renderer.offset && n._renderer && n._renderer.offset;
                    i.clearRect(0, 0, e.width, e.height),
                    p || (i.font = [t._style, t._weight, t._size + "px/" + t._leading + "px", t._family].join(" ")),
                    i.textAlign = "center",
                    i.textBaseline = "middle",
                    o && (h.isString(o) ? i.fillStyle = o : (l[o._renderer.type].render.call(o, i, t), i.fillStyle = o._renderer.effect)),
                    n && (h.isString(n) ? i.strokeStyle = n : (l[n._renderer.type].render.call(n, i, t), i.strokeStyle = n._renderer.effect)),
                    s && (i.lineWidth = s),
                    h.isNumber(c) && (i.globalAlpha = c),
                    i.save(),
                    i.scale(r, r),
                    i.translate(d, u),
                    l.isHidden.test(o) || (o._renderer && o._renderer.offset ? (e = a(o._renderer.scale.x), r = a(o._renderer.scale.y), i.save(), i.translate(-a(o._renderer.offset.x), -a(o._renderer.offset.y)), i.scale(e, r), e = t._size / o._renderer.scale.y, r = t._leading / o._renderer.scale.y, i.font = [t._style, t._weight, a(e) + "px/", a(r) + "px", t._family].join(" "), e = o._renderer.offset.x / o._renderer.scale.x, o = o._renderer.offset.y / o._renderer.scale.y, i.fillText(t.value, a(e), a(o)), i.restore()) : i.fillText(t.value, 0, 0)),
                    l.isHidden.test(n) || (n._renderer && n._renderer.offset ? (e = a(n._renderer.scale.x), r = a(n._renderer.scale.y), i.save(), i.translate(-a(n._renderer.offset.x), -a(n._renderer.offset.y)), i.scale(e, r), e = t._size / n._renderer.scale.y, r = t._leading / n._renderer.scale.y, i.font = [t._style, t._weight, a(e) + "px/", a(r) + "px", t._family].join(" "), e = n._renderer.offset.x / n._renderer.scale.x, o = n._renderer.offset.y / n._renderer.scale.y, n = s / n._renderer.scale.x, i.lineWidth = a(n), i.strokeText(t.value, a(e), a(o)), i.restore()) : i.strokeText(t.value, 0, 0)),
                    i.restore()
                },
                getBoundingClientRect: function(t, e) {
                    var i = l.ctx;
                    i.font = [t._style, t._weight, t._size + "px/" + t._leading + "px", t._family].join(" "),
                    i.textAlign = "center",
                    i.textBaseline = t._baseline;
                    var i = i.measureText(t._value).width,
                        r = Math.max(t._size || t._leading);
                    this._linewidth && !l.isHidden.test(this._stroke) && (r += this._linewidth);
                    var n = i / 2,
                        s = r / 2;
                    switch (l.alignments[t._alignment] || t._alignment) {
                    case l.alignments.left:
                        e.left = 0,
                        e.right = i;
                        break;
                    case l.alignments.right:
                        e.left = -i,
                        e.right = 0;
                        break;
                    default:
                        e.left = -n,
                        e.right = n
                    }
                    switch (t._baseline) {
                    case "bottom":
                        e.top = -r,
                        e.bottom = 0;
                        break;
                    case "top":
                        e.top = 0,
                        e.bottom = r;
                        break;
                    default:
                        e.top = -s,
                        e.bottom = s
                    }
                    e.width = i,
                    e.height = r,
                    e.centroid || (e.centroid = {}),
                    e.centroid.x = n,
                    e.centroid.y = s
                },
                render: function(e, r, n) {
                    if (!this._visible || !this._opacity)
                        return this;
                    this._update();
                    var o = this.parent,
                        a = this._matrix.manual || this._flagMatrix,
                        h = this._flagVertices || this._flagFill || this._fill instanceof t.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof t.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof t.Texture && this._fill._flagLoaded && this._fill.loaded || this._stroke instanceof t.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof t.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._texture instanceof t.Texture && this._texture._flagLoaded && this._texture.loaded || this._flagStroke || this._flagLinewidth || this._flagOpacity || o._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || !this._renderer.texture;
                    return (o._matrix.manual || o._flagMatrix || a) && (this._renderer.matrix || (this._renderer.matrix = new t.Array(9)), this._matrix.toArray(!0, s), i(s, o._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * o._renderer.scale), h && (this._renderer.rect || (this._renderer.rect = {}), this._renderer.triangles || (this._renderer.triangles = new t.Array(12)), this._renderer.opacity = this._opacity * o._renderer.opacity, l.text.getBoundingClientRect(this, this._renderer.rect), l.getTriangles(this._renderer.rect, this._renderer.triangles), l.updateBuffer.call(l, e, this, r), l.updateTexture.call(l, e, this)), !this._clip || n ? (e.bindBuffer(e.ARRAY_BUFFER, this._renderer.textureCoordsBuffer), e.vertexAttribPointer(r.textureCoords, 2, e.FLOAT, !1, 0, 0), e.bindTexture(e.TEXTURE_2D, this._renderer.texture), e.uniformMatrix3fv(r.matrix, !1, this._renderer.matrix), e.bindBuffer(e.ARRAY_BUFFER, this._renderer.buffer), e.vertexAttribPointer(r.position, 2, e.FLOAT, !1, 0, 0), e.drawArrays(e.TRIANGLES, 0, 6), this.flagReset()) : void 0
                }
            },
            "linear-gradient": {
                render: function(t, e) {
                    if (t.canvas.getContext("2d")) {
                        if (this._update(), !this._renderer.effect || this._flagEndPoints || this._flagStops)
                            for (this._renderer.effect = t.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y), t = 0; t < this.stops.length; t++)
                                e = this.stops[t],
                                this._renderer.effect.addColorStop(e._offset, e._color);
                        return this.flagReset()
                    }
                }
            },
            "radial-gradient": {
                render: function(t, e) {
                    if (t.canvas.getContext("2d")) {
                        if (this._update(), !this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops)
                            for (this._renderer.effect = t.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius), t = 0; t < this.stops.length; t++)
                                e = this.stops[t],
                                this._renderer.effect.addColorStop(e._offset, e._color);
                        return this.flagReset()
                    }
                }
            },
            texture: {
                render: function(e, i) {
                    if (e.canvas.getContext("2d"))
                        return this._update(), i = this.image, (!this._renderer.effect || (this._flagLoaded || this._flagRepeat) && this.loaded) && (this._renderer.effect = e.createPattern(i, this._repeat)), (this._flagOffset || this._flagLoaded || this._flagScale) && (this._renderer.offset instanceof t.Vector || (this._renderer.offset = new t.Vector), this._renderer.offset.x = this._offset.x, this._renderer.offset.y = this._offset.y, i && (this._renderer.offset.x -= i.width / 2, this._renderer.offset.y += i.height / 2, this._scale instanceof t.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale))), (this._flagScale || this._flagLoaded) && (this._renderer.scale instanceof t.Vector || (this._renderer.scale = new t.Vector), this._scale instanceof t.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale)), this.flagReset()
                }
            },
            getTriangles: function(t, e) {
                var i = t.top,
                    r = t.left,
                    n = t.right;
                t = t.bottom,
                e[0] = r,
                e[1] = i,
                e[2] = n,
                e[3] = i,
                e[4] = r,
                e[5] = t,
                e[6] = r,
                e[7] = t,
                e[8] = n,
                e[9] = i,
                e[10] = n,
                e[11] = t
            },
            updateTexture: function(t, e) {
                this[e._renderer.type].updateCanvas.call(l, e),
                e._renderer.texture && t.deleteTexture(e._renderer.texture),
                t.bindBuffer(t.ARRAY_BUFFER, e._renderer.textureCoordsBuffer),
                e._renderer.texture = t.createTexture(),
                t.bindTexture(t.TEXTURE_2D, e._renderer.texture),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                0 >= this.canvas.width || 0 >= this.canvas.height || t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, this.canvas)
            },
            updateBuffer: function(t, e, i) {
                h.isObject(e._renderer.buffer) && t.deleteBuffer(e._renderer.buffer),
                e._renderer.buffer = t.createBuffer(),
                t.bindBuffer(t.ARRAY_BUFFER, e._renderer.buffer),
                t.enableVertexAttribArray(i.position),
                t.bufferData(t.ARRAY_BUFFER, e._renderer.triangles, t.STATIC_DRAW),
                h.isObject(e._renderer.textureCoordsBuffer) && t.deleteBuffer(e._renderer.textureCoordsBuffer),
                e._renderer.textureCoordsBuffer = t.createBuffer(),
                t.bindBuffer(t.ARRAY_BUFFER, e._renderer.textureCoordsBuffer),
                t.enableVertexAttribArray(i.textureCoords),
                t.bufferData(t.ARRAY_BUFFER, this.uv, t.STATIC_DRAW)
            },
            program: {
                create: function(e, i) {
                    var r = e.createProgram();
                    if (h.each(i, function(t) {
                        e.attachShader(r, t)
                    }), e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS))
                        throw i = e.getProgramInfoLog(r), e.deleteProgram(r), new t.Utils.Error("unable to link program: " + i);
                    return r
                }
            },
            shaders: {
                create: function(e, i, r) {
                    if (r = e.createShader(e[r]), e.shaderSource(r, i), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS))
                        throw i = e.getShaderInfoLog(r), e.deleteShader(r), new t.Utils.Error("unable to compile shader " + r + ": " + i);
                    return r
                },
                types: {
                    vertex: "VERTEX_SHADER",
                    fragment: "FRAGMENT_SHADER"
                },
                vertex: "attribute vec2 a_position;\nattribute vec2 a_textureCoords;\n\nuniform mat3 u_matrix;\nuniform vec2 u_resolution;\n\nvarying vec2 v_textureCoords;\n\nvoid main() {\n   vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;\n   vec2 normal = projected / u_resolution;\n   vec2 clipspace = (normal * 2.0) - 1.0;\n\n   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);\n   v_textureCoords = a_textureCoords;\n}",
                fragment: "precision mediump float;\n\nuniform sampler2D u_image;\nvarying vec2 v_textureCoords;\n\nvoid main() {\n  gl_FragColor = texture2D(u_image, v_textureCoords);\n}"
            },
            TextureRegistry: new t.Registry
        };
    l.ctx = l.canvas.getContext("2d"),
    e = t[t.Types.webgl] = function(e) {
        if (this.domElement = e.domElement || document.createElement("canvas"), this.scene = new t.Group, this.scene.parent = this, this._renderer = {
            matrix: new t.Array(n),
            scale: 1,
            opacity: 1
        }, this._flagMatrix = !0, e = h.defaults(e || {}, {
            antialias: !1,
            alpha: !0,
            premultipliedAlpha: !0,
            stencil: !0,
            preserveDrawingBuffer: !0,
            overdraw: !1
        }), this.overdraw = e.overdraw, e = this.ctx = this.domElement.getContext("webgl", e) || this.domElement.getContext("experimental-webgl", e), !this.ctx)
            throw new t.Utils.Error("unable to create a webgl context. Try using another renderer.");
        var i = l.shaders.create(e, l.shaders.vertex, l.shaders.types.vertex),
            r = l.shaders.create(e, l.shaders.fragment, l.shaders.types.fragment);
        this.program = l.program.create(e, [i, r]),
        e.useProgram(this.program),
        this.program.position = e.getAttribLocation(this.program, "a_position"),
        this.program.matrix = e.getUniformLocation(this.program, "u_matrix"),
        this.program.textureCoords = e.getAttribLocation(this.program, "a_textureCoords"),
        e.disable(e.DEPTH_TEST),
        e.enable(e.BLEND),
        e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD),
        e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)
    },
    h.extend(e, {
        Utils: l
    }),
    h.extend(e.prototype, t.Utils.Events, {
        setSize: function(t, e, i) {
            return this.width = t, this.height = e, this.ratio = h.isUndefined(i) ? o(this.ctx) : i, this.domElement.width = t * this.ratio, this.domElement.height = e * this.ratio, h.extend(this.domElement.style, {
                width: t + "px",
                height: e + "px"
            }), t *= this.ratio, e *= this.ratio, this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio, this._flagMatrix = !0, this.ctx.viewport(0, 0, t, e), i = this.ctx.getUniformLocation(this.program, "u_resolution"), this.ctx.uniform2f(i, t, e), this
        },
        render: function() {
            var t = this.ctx;
            return this.overdraw || t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT), l.group.render.call(this.scene, t, this.program), this._flagMatrix = !1, this
        }
    })
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.Shape = function() {
            this._renderer = {},
            this._renderer.flagMatrix = e.bind(i.FlagMatrix, this),
            this.isShape = !0,
            this.id = t.Identifier + t.uniqueId(),
            this.classList = [],
            this._matrix = new t.Matrix,
            this.translation = new t.Vector,
            this.rotation = 0,
            this.scale = 1
        };
    e.extend(i, {
        FlagMatrix: function() {
            this._flagMatrix = !0
        },
        MakeObservable: function(e) {
            Object.defineProperty(e, "translation", {
                enumerable: !0,
                get: function() {
                    return this._translation
                },
                set: function(e) {
                    this._translation && this._translation.unbind(t.Events.change, this._renderer.flagMatrix),
                    this._translation = e,
                    this._translation.bind(t.Events.change, this._renderer.flagMatrix),
                    i.FlagMatrix.call(this)
                }
            }),
            Object.defineProperty(e, "rotation", {
                enumerable: !0,
                get: function() {
                    return this._rotation
                },
                set: function(t) {
                    this._rotation = t,
                    this._flagMatrix = !0
                }
            }),
            Object.defineProperty(e, "scale", {
                enumerable: !0,
                get: function() {
                    return this._scale
                },
                set: function(e) {
                    this._scale instanceof t.Vector && this._scale.unbind(t.Events.change, this._renderer.flagMatrix),
                    this._scale = e,
                    this._scale instanceof t.Vector && this._scale.bind(t.Events.change, this._renderer.flagMatrix),
                    this._flagScale = this._flagMatrix = !0
                }
            })
        }
    }),
    e.extend(i.prototype, t.Utils.Events, {
        _flagMatrix: !0,
        _flagScale: !1,
        _rotation: 0,
        _scale: 1,
        _translation: null,
        addTo: function(t) {
            return t.add(this), this
        },
        clone: function() {
            var t = new i;
            return t.translation.copy(this.translation), t.rotation = this.rotation, t.scale = this.scale, e.each(i.Properties, function(e) {
                t[e] = this[e]
            }, this), t._update()
        },
        _update: function(e) {
            return !this._matrix.manual && this._flagMatrix && (this._matrix.identity().translate(this.translation.x, this.translation.y), this._scale instanceof t.Vector ? this._matrix.scale(this._scale.x, this._scale.y) : this._matrix.scale(this._scale), this._matrix.rotate(this.rotation)), e && this.parent && this.parent._update && this.parent._update(), this
        },
        flagReset: function() {
            return this._flagMatrix = this._flagScale = !1, this
        }
    }),
    i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    function e(e, i, r) {
        var n = i.controls && i.controls.right,
            s = e.controls && e.controls.left,
            o = i.x,
            a = i.y,
            h = (n || i).x,
            l = (n || i).y,
            c = (s || e).x,
            u = (s || e).y,
            d = e.x,
            p = e.y;
        return n && i._relative && (h += i.x, l += i.y), s && e._relative && (c += e.x, u += e.y), t.Utils.getCurveLength(o, a, h, l, c, u, d, p, r)
    }
    function i(e, i, r) {
        var n = i.controls && i.controls.right,
            s = e.controls && e.controls.left,
            o = i.x,
            a = i.y,
            h = (n || i).x,
            l = (n || i).y,
            c = (s || e).x,
            u = (s || e).y,
            d = e.x,
            p = e.y;
        return n && i._relative && (h += i.x, l += i.y), s && e._relative && (c += e.x, u += e.y), t.Utils.subdivide(o, a, h, l, c, u, d, p, r)
    }
    var r = Math.min,
        n = Math.max,
        s = Math.round,
        o = t.Utils.getComputedMatrix,
        a = t.Utils;
    a.each(t.Commands, function(t, e) {});
    var h = t.Path = function(e, i, r, n) {
        t.Shape.call(this),
        this._renderer.type = "path",
        this._renderer.flagVertices = a.bind(h.FlagVertices, this),
        this._renderer.bindVertices = a.bind(h.BindVertices, this),
        this._renderer.unbindVertices = a.bind(h.UnbindVertices, this),
        this._renderer.flagFill = a.bind(h.FlagFill, this),
        this._renderer.flagStroke = a.bind(h.FlagStroke, this),
        this._closed = !!i,
        this._curved = !!r,
        this.beginning = 0,
        this.ending = 1,
        this.fill = "#fff",
        this.stroke = "#000",
        this.opacity = this.linewidth = 1,
        this.visible = !0,
        this.cap = "butt",
        this.join = "miter",
        this.miter = 4,
        this._vertices = [],
        this.vertices = e,
        this.automatic = !n
    };
    a.extend(h, {
        Properties: "fill stroke linewidth opacity visible cap join miter closed curved automatic beginning ending".split(" "),
        FlagVertices: function() {
            this._flagLength = this._flagVertices = !0
        },
        BindVertices: function(e) {
            for (var i = e.length; i--;)
                e[i].bind(t.Events.change, this._renderer.flagVertices);
            this._renderer.flagVertices()
        },
        UnbindVertices: function(e) {
            for (var i = e.length; i--;)
                e[i].unbind(t.Events.change, this._renderer.flagVertices);
            this._renderer.flagVertices()
        },
        FlagFill: function() {
            this._flagFill = !0
        },
        FlagStroke: function() {
            this._flagStroke = !0
        },
        MakeObservable: function(e) {
            t.Shape.MakeObservable(e),
            a.each(h.Properties.slice(2, 8), t.Utils.defineProperty, e),
            Object.defineProperty(e, "fill", {
                enumerable: !0,
                get: function() {
                    return this._fill
                },
                set: function(e) {
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.unbind(t.Events.change, this._renderer.flagFill),
                    this._fill = e,
                    this._flagFill = !0,
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.bind(t.Events.change, this._renderer.flagFill)
                }
            }),
            Object.defineProperty(e, "stroke", {
                enumerable: !0,
                get: function() {
                    return this._stroke
                },
                set: function(e) {
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.unbind(t.Events.change, this._renderer.flagStroke),
                    this._stroke = e,
                    this._flagStroke = !0,
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.bind(t.Events.change, this._renderer.flagStroke)
                }
            }),
            Object.defineProperty(e, "length", {
                get: function() {
                    return this._flagLength && this._updateLength(), this._length
                }
            }),
            Object.defineProperty(e, "closed", {
                enumerable: !0,
                get: function() {
                    return this._closed
                },
                set: function(t) {
                    this._closed = !!t,
                    this._flagVertices = !0
                }
            }),
            Object.defineProperty(e, "curved", {
                enumerable: !0,
                get: function() {
                    return this._curved
                },
                set: function(t) {
                    this._curved = !!t,
                    this._flagVertices = !0
                }
            }),
            Object.defineProperty(e, "automatic", {
                enumerable: !0,
                get: function() {
                    return this._automatic
                },
                set: function(t) {
                    if (t !== this._automatic) {
                        var e = (this._automatic = !!t) ? "ignore" : "listen";
                        a.each(this.vertices, function(t) {
                            t[e]()
                        })
                    }
                }
            }),
            Object.defineProperty(e, "beginning", {
                enumerable: !0,
                get: function() {
                    return this._beginning
                },
                set: function(t) {
                    this._beginning = t,
                    this._flagVertices = !0
                }
            }),
            Object.defineProperty(e, "ending", {
                enumerable: !0,
                get: function() {
                    return this._ending
                },
                set: function(t) {
                    this._ending = t,
                    this._flagVertices = !0
                }
            }),
            Object.defineProperty(e, "vertices", {
                enumerable: !0,
                get: function() {
                    return this._collection
                },
                set: function(e) {
                    var i = this._renderer.bindVertices,
                        r = this._renderer.unbindVertices;
                    this._collection && this._collection.unbind(t.Events.insert, i).unbind(t.Events.remove, r),
                    this._collection = new t.Utils.Collection((e || []).slice(0)),
                    this._collection.bind(t.Events.insert, i).bind(t.Events.remove, r),
                    i(this._collection)
                }
            }),
            Object.defineProperty(e, "clip", {
                enumerable: !0,
                get: function() {
                    return this._clip
                },
                set: function(t) {
                    this._clip = t,
                    this._flagClip = !0
                }
            })
        }
    }),
    a.extend(h.prototype, t.Shape.prototype, {
        _flagVertices: !0,
        _flagLength: !0,
        _flagFill: !0,
        _flagStroke: !0,
        _flagLinewidth: !0,
        _flagOpacity: !0,
        _flagVisible: !0,
        _flagCap: !0,
        _flagJoin: !0,
        _flagMiter: !0,
        _flagClip: !1,
        _length: 0,
        _fill: "#fff",
        _stroke: "#000",
        _linewidth: 1,
        _opacity: 1,
        _visible: !0,
        _cap: "round",
        _join: "round",
        _miter: 4,
        _closed: !0,
        _curved: !1,
        _automatic: !0,
        _beginning: 0,
        _ending: 1,
        _clip: !1,
        clone: function(e) {
            e = e || this.parent;
            var i = a.map(this.vertices, function(t) {
                    return t.clone()
                }),
                r = new h(i, this.closed, this.curved, !this.automatic);
            return a.each(t.Path.Properties, function(t) {
                r[t] = this[t]
            }, this), r.translation.copy(this.translation), r.rotation = this.rotation, r.scale = this.scale, e && e.add(r), r
        },
        toObject: function() {
            var e = {
                vertices: a.map(this.vertices, function(t) {
                    return t.toObject()
                })
            };
            return a.each(t.Shape.Properties, function(t) {
                e[t] = this[t]
            }, this), e.translation = this.translation.toObject, e.rotation = this.rotation, e.scale = this.scale, e
        },
        noFill: function() {
            return this.fill = "transparent", this
        },
        noStroke: function() {
            return this.stroke = "transparent", this
        },
        corner: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2,
                y: t.top + t.height / 2
            }, a.each(this.vertices, function(e) {
                e.addSelf(t.centroid)
            }), this
        },
        center: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2,
                y: t.top + t.height / 2
            }, a.each(this.vertices, function(e) {
                e.subSelf(t.centroid)
            }), this
        },
        remove: function() {
            return this.parent ? (this.parent.remove(this), this) : this
        },
        getBoundingClientRect: function(t) {
            var e,
                i = 1 / 0,
                s = -1 / 0,
                a = 1 / 0,
                h = -1 / 0;
            this._update(!0),
            t = t ? this._matrix : o(this);
            var l = this.linewidth / 2,
                c = this._vertices.length;
            if (0 >= c) {
                var u = t.multiply(0, 0, 1);
                return {
                    top: u.y,
                    left: u.x,
                    right: u.x,
                    bottom: u.y,
                    width: 0,
                    height: 0
                }
            }
            for (e = 0; e < c; e++) {
                u = this._vertices[e];
                var d = u.x;
                u = u.y,
                u = t.multiply(d, u, 1),
                a = r(u.y - l, a),
                i = r(u.x - l, i),
                s = n(u.x + l, s),
                h = n(u.y + l, h)
            }
            return {
                top: a,
                left: i,
                right: s,
                bottom: h,
                width: s - i,
                height: h - a
            }
        },
        getPointAt: function(e, i) {
            var r,
                n,
                s = this.length * Math.min(Math.max(e, 0), 1),
                o = this.vertices.length,
                h = o - 1,
                l = r = null,
                c = 0,
                u = this._lengths.length;
            for (n = 0; c < u; c++) {
                if (n + this._lengths[c] >= s) {
                    this._closed ? (r = t.Utils.mod(c, o), l = t.Utils.mod(c - 1, o), 0 === c && (r = l, l = c)) : (r = c, l = Math.min(Math.max(c - 1, 0), h)),
                    r = this.vertices[r],
                    l = this.vertices[l],
                    s -= n,
                    0 !== this._lengths[c] && (e = s / this._lengths[c]);
                    break
                }
                n += this._lengths[c]
            }
            if (a.isNull(r) || a.isNull(l))
                return null;
            var d = l.controls && l.controls.right,
                p = r.controls && r.controls.left;
            h = l.x,
            s = l.y,
            u = (d || l).x,
            c = (d || l).y;
            var f = (p || r).x;
            n = (p || r).y;
            var _ = r.x;
            return o = r.y, d && l._relative && (u += l.x, c += l.y), p && r._relative && (f += r.x, n += r.y), r = t.Utils.getPointOnCubicBezier(e, h, u, f, _), e = t.Utils.getPointOnCubicBezier(e, s, c, n, o), a.isObject(i) ? (i.x = r, i.y = e, i) : new t.Vector(r, e)
        },
        plot: function() {
            if (this.curved)
                return t.Utils.getCurveFromPoints(this._vertices, this.closed), this;
            for (var e = 0; e < this._vertices.length; e++)
                this._vertices[e]._command = 0 === e ? t.Commands.move : t.Commands.line;
            return this
        },
        subdivide: function(e) {
            this._update();
            var r = this.vertices.length - 1,
                n = this.vertices[r],
                s = this._closed || this.vertices[r]._command === t.Commands.close,
                o = [];
            return a.each(this.vertices, function(h, l) {
                if (!(0 >= l) || s)
                    if (h.command === t.Commands.move)
                        o.push(new t.Anchor(n.x, n.y)),
                        0 < l && (o[o.length - 1].command = t.Commands.line);
                    else {
                        var c = i(h, n, e);
                        o = o.concat(c),
                        a.each(c, function(e, i) {
                            e.command = 0 >= i && n.command === t.Commands.move ? t.Commands.move : t.Commands.line
                        }),
                        l >= r && (this._closed && this._automatic ? (n = h, c = i(h, n, e), o = o.concat(c), a.each(c, function(e, i) {
                            e.command = 0 >= i && n.command === t.Commands.move ? t.Commands.move : t.Commands.line
                        })) : s && o.push(new t.Anchor(h.x, h.y)), o[o.length - 1].command = s ? t.Commands.close : t.Commands.line)
                    }
                n = h
            }, this), this._curved = this._automatic = !1, this.vertices = o, this
        },
        _updateLength: function(i) {
            this._update();
            var r = this.vertices.length,
                n = r - 1,
                s = this.vertices[n],
                o = this._closed || this.vertices[n]._command === t.Commands.close,
                h = 0;
            return a.isUndefined(this._lengths) && (this._lengths = []), a.each(this.vertices, function(a, l) {
                0 >= l && !o || a.command === t.Commands.move ? (s = a, this._lengths[l] = 0) : (this._lengths[l] = e(a, s, i), h += this._lengths[l], l >= n && o && (s = this.vertices[(l + 1) % r], this._lengths[l + 1] = e(a, s, i), h += this._lengths[l + 1]), s = a)
            }, this), this._length = h, this
        },
        _update: function() {
            if (this._flagVertices) {
                var e = this.vertices.length - 1,
                    i = s(this._beginning * e);
                e = s(this._ending * e),
                this._vertices.length = 0;
                for (var r = i; r < e + 1; r++)
                    i = this.vertices[r],
                    this._vertices.push(i);
                this._automatic && this.plot()
            }
            return t.Shape.prototype._update.apply(this, arguments), this
        },
        flagReset: function() {
            return this._flagVertices = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }),
    h.MakeObservable(h.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.Line = function(i, r, n, s) {
            n = (n - i) / 2,
            s = (s - r) / 2,
            e.call(this, [new t.Anchor(-n, -s), new t.Anchor(n, s)]),
            this.translation.set(i + n, r + s)
        };
    i.extend(r.prototype, e.prototype),
    e.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.Rectangle = function(i, r, n, s) {
            e.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0),
            this.width = n,
            this.height = s,
            this._update(),
            this.translation.set(i, r)
        };
    i.extend(r, {
        Properties: ["width", "height"],
        MakeObservable: function(n) {
            e.MakeObservable(n),
            i.each(r.Properties, t.Utils.defineProperty, n)
        }
    }),
    i.extend(r.prototype, e.prototype, {
        _width: 0,
        _height: 0,
        _flagWidth: 0,
        _flagHeight: 0,
        _update: function() {
            if (this._flagWidth || this._flagHeight) {
                var t = this._width / 2,
                    i = this._height / 2;
                this.vertices[0].set(-t, -i),
                this.vertices[1].set(t, -i),
                this.vertices[2].set(t, i),
                this.vertices[3].set(-t, i)
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = !1, e.prototype.flagReset.call(this), this
        }
    }),
    r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        n = Math.sin,
        s = t.Utils,
        o = t.Ellipse = function(i, r, n, o) {
            s.isNumber(o) || (o = n);
            var a = s.map(s.range(t.Resolution), function(e) {
                return new t.Anchor
            }, this);
            e.call(this, a, !0, !0),
            this.width = 2 * n,
            this.height = 2 * o,
            this._update(),
            this.translation.set(i, r)
        };
    s.extend(o, {
        Properties: ["width", "height"],
        MakeObservable: function(i) {
            e.MakeObservable(i),
            s.each(o.Properties, t.Utils.defineProperty, i)
        }
    }),
    s.extend(o.prototype, e.prototype, {
        _width: 0,
        _height: 0,
        _flagWidth: !1,
        _flagHeight: !1,
        _update: function() {
            if (this._flagWidth || this._flagHeight)
                for (var t = 0, s = this.vertices.length; t < s; t++) {
                    var o = t / s * i,
                        a = this._width * r(o) / 2,
                        o = this._height * n(o) / 2;
                    this.vertices[t].set(a, o)
                }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = !1, e.prototype.flagReset.call(this), this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        n = Math.sin,
        s = t.Utils,
        o = t.Circle = function(i, r, n) {
            var o = s.map(s.range(t.Resolution), function(e) {
                return new t.Anchor
            }, this);
            e.call(this, o, !0, !0),
            this.radius = n,
            this._update(),
            this.translation.set(i, r)
        };
    s.extend(o, {
        Properties: ["radius"],
        MakeObservable: function(i) {
            e.MakeObservable(i),
            s.each(o.Properties, t.Utils.defineProperty, i)
        }
    }),
    s.extend(o.prototype, e.prototype, {
        _radius: 0,
        _flagRadius: !1,
        _update: function() {
            if (this._flagRadius)
                for (var t = 0, s = this.vertices.length; t < s; t++) {
                    var o = t / s * i,
                        a = this._radius * r(o),
                        o = this._radius * n(o);
                    this.vertices[t].set(a, o)
                }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagRadius = !1, e.prototype.flagReset.call(this), this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        n = Math.sin,
        s = t.Utils,
        o = t.Polygon = function(i, r, n, o) {
            o = Math.max(o || 0, 3);
            var a = s.map(s.range(o), function(e) {
                return new t.Anchor
            });
            e.call(this, a, !0),
            this.width = 2 * n,
            this.height = 2 * n,
            this.sides = o,
            this._update(),
            this.translation.set(i, r)
        };
    s.extend(o, {
        Properties: ["width", "height", "sides"],
        MakeObservable: function(i) {
            e.MakeObservable(i),
            s.each(o.Properties, t.Utils.defineProperty, i)
        }
    }),
    s.extend(o.prototype, e.prototype, {
        _width: 0,
        _height: 0,
        _sides: 0,
        _flagWidth: !1,
        _flagHeight: !1,
        _flagSides: !1,
        _update: function() {
            if (this._flagWidth || this._flagHeight || this._flagSides) {
                var s = this._sides,
                    o = this.vertices.length;
                o > s && this.vertices.splice(s - 1, o - s);
                for (var a = 0; a < s; a++) {
                    var h = (a + .5) / s * i + Math.PI / 2,
                        l = this._width * r(h),
                        h = this._height * n(h);
                    a >= o ? this.vertices.push(new t.Anchor(l, h)) : this.vertices[a].set(l, h)
                }
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = this._flagSides = !1, e.prototype.flagReset.call(this), this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    function e(t, e) {
        for (; 0 > t;)
            t += e;
        return t % e
    }
    var i = t.Path,
        r = 2 * Math.PI,
        n = Math.PI / 2,
        s = t.Utils,
        o = t.ArcSegment = function(e, r, n, o, a, h, l) {
            l = s.map(s.range(l || 3 * t.Resolution), function() {
                return new t.Anchor
            }),
            i.call(this, l, !1, !1, !0),
            this.innerRadius = n,
            this.outerRadius = o,
            this.startAngle = a,
            this.endAngle = h,
            this._update(),
            this.translation.set(e, r)
        };
    s.extend(o, {
        Properties: ["startAngle", "endAngle", "innerRadius", "outerRadius"],
        MakeObservable: function(e) {
            i.MakeObservable(e),
            s.each(o.Properties, t.Utils.defineProperty, e)
        }
    }),
    s.extend(o.prototype, i.prototype, {
        _flagStartAngle: !1,
        _flagEndAngle: !1,
        _flagInnerRadius: !1,
        _flagOuterRadius: !1,
        _startAngle: 0,
        _endAngle: r,
        _innerRadius: 0,
        _outerRadius: 0,
        _update: function() {
            if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
                var s = this._startAngle,
                    o = this._endAngle,
                    a = this._innerRadius,
                    h = this._outerRadius,
                    l = e(s, r) === e(o, r),
                    c = 0 < a,
                    u = this.vertices,
                    d = c ? u.length / 2 : u.length,
                    p = 0;
                l ? d-- : c || (d -= 2);
                for (var f = 0, _ = d - 1; f < d; f++) {
                    var g = f / _,
                        m = u[p];
                    g = g * (o - s) + s;
                    var v = (o - s) / d,
                        y = h * Math.cos(g),
                        x = h * Math.sin(g);
                    switch (f) {
                    case 0:
                        var b = t.Commands.move;
                        break;
                    default:
                        b = t.Commands.curve
                    }
                    m.command = b,
                    m.x = y,
                    m.y = x,
                    m.controls.left.clear(),
                    m.controls.right.clear(),
                    m.command === t.Commands.curve && (x = h * v / Math.PI, m.controls.left.x = x * Math.cos(g - n), m.controls.left.y = x * Math.sin(g - n), m.controls.right.x = x * Math.cos(g + n), m.controls.right.y = x * Math.sin(g + n), 1 === f && m.controls.left.multiplyScalar(2), f === _ && m.controls.right.multiplyScalar(2)),
                    p++
                }
                if (c)
                    for (l ? (u[p].command = t.Commands.close, p++) : (d--, _ = d - 1), f = 0; f < d; f++)
                        g = f / _,
                        m = u[p],
                        g = (1 - g) * (o - s) + s,
                        v = (o - s) / d,
                        y = a * Math.cos(g),
                        x = a * Math.sin(g),
                        b = t.Commands.curve,
                        0 >= f && (b = l ? t.Commands.move : t.Commands.line),
                        m.command = b,
                        m.x = y,
                        m.y = x,
                        m.controls.left.clear(),
                        m.controls.right.clear(),
                        m.command === t.Commands.curve && (x = a * v / Math.PI, m.controls.left.x = x * Math.cos(g + n), m.controls.left.y = x * Math.sin(g + n), m.controls.right.x = x * Math.cos(g - n), m.controls.right.y = x * Math.sin(g - n), 1 === f && m.controls.left.multiplyScalar(2), f === _ && m.controls.right.multiplyScalar(2)),
                        p++;
                else
                    l || (u[p].command = t.Commands.line, u[p].x = 0, u[p].y = 0, p++);
                u[p].command = t.Commands.close
            }
            return i.prototype._update.call(this), this
        },
        flagReset: function() {
            return i.prototype.flagReset.call(this), this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = !1, this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = 2 * Math.PI,
        r = Math.cos,
        n = Math.sin,
        s = t.Utils,
        o = t.Star = function(i, r, n, o, a) {
            s.isNumber(o) || (o = n / 2),
            (!s.isNumber(a) || 0 >= a) && (a = 5);
            var h = s.map(s.range(2 * a), function(e) {
                return new t.Anchor
            });
            e.call(this, h, !0),
            this.innerRadius = o,
            this.outerRadius = n,
            this.sides = a,
            this._update(),
            this.translation.set(i, r)
        };
    s.extend(o, {
        Properties: ["innerRadius", "outerRadius", "sides"],
        MakeObservable: function(i) {
            e.MakeObservable(i),
            s.each(o.Properties, t.Utils.defineProperty, i)
        }
    }),
    s.extend(o.prototype, e.prototype, {
        _innerRadius: 0,
        _outerRadius: 0,
        _sides: 0,
        _flagInnerRadius: !1,
        _flagOuterRadius: !1,
        _flagSides: !1,
        _update: function() {
            if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
                var s = 2 * this._sides,
                    o = this.vertices.length;
                o > s && this.vertices.splice(s - 1, o - s);
                for (var a = 0; a < s; a++) {
                    var h = (a + .5) / s * i,
                        l = a % 2 ? this._innerRadius : this._outerRadius,
                        c = l * r(h),
                        h = l * n(h);
                    a >= o ? this.vertices.push(new t.Anchor(c, h)) : this.vertices[a].set(c, h)
                }
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagInnerRadius = this._flagOuterRadius = this._flagSides = !1, e.prototype.flagReset.call(this), this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Path,
        i = t.Utils,
        r = t.RoundedRectangle = function(r, n, s, o, a) {
            i.isNumber(a) || (a = Math.floor(Math.min(s, o) / 12));
            var h = i.map(i.range(10), function(e) {
                return new t.Anchor(0, 0, 0, 0, 0, 0, 0 === e ? t.Commands.move : t.Commands.curve)
            });
            h[h.length - 1].command = t.Commands.close,
            e.call(this, h, !1, !1, !0),
            this.width = s,
            this.height = o,
            this.radius = a,
            this._update(),
            this.translation.set(r, n)
        };
    i.extend(r, {
        Properties: ["width", "height", "radius"],
        MakeObservable: function(n) {
            e.MakeObservable(n),
            i.each(r.Properties, t.Utils.defineProperty, n)
        }
    }),
    i.extend(r.prototype, e.prototype, {
        _width: 0,
        _height: 0,
        _radius: 0,
        _flagWidth: !1,
        _flagHeight: !1,
        _flagRadius: !1,
        _update: function() {
            if (this._flagWidth || this._flagHeight || this._flagRadius) {
                var t = this._width,
                    i = this._height,
                    r = Math.min(Math.max(this._radius, 0), Math.min(t, i)),
                    t = t / 2,
                    n = i / 2,
                    i = this.vertices[0];
                i.x = -(t - r),
                i.y = -n,
                i = this.vertices[1],
                i.x = t - r,
                i.y = -n,
                i.controls.left.clear(),
                i.controls.right.x = r,
                i.controls.right.y = 0,
                i = this.vertices[2],
                i.x = t,
                i.y = -(n - r),
                i.controls.right.clear(),
                i.controls.left.clear(),
                i = this.vertices[3],
                i.x = t,
                i.y = n - r,
                i.controls.left.clear(),
                i.controls.right.x = 0,
                i.controls.right.y = r,
                i = this.vertices[4],
                i.x = t - r,
                i.y = n,
                i.controls.right.clear(),
                i.controls.left.clear(),
                i = this.vertices[5],
                i.x = -(t - r),
                i.y = n,
                i.controls.left.clear(),
                i.controls.right.x = -r,
                i.controls.right.y = 0,
                i = this.vertices[6],
                i.x = -t,
                i.y = n - r,
                i.controls.left.clear(),
                i.controls.right.clear(),
                i = this.vertices[7],
                i.x = -t,
                i.y = -(n - r),
                i.controls.left.clear(),
                i.controls.right.x = 0,
                i.controls.right.y = -r,
                i = this.vertices[8],
                i.x = -(t - r),
                i.y = -n,
                i.controls.left.clear(),
                i.controls.right.clear(),
                i = this.vertices[9],
                i.copy(this.vertices[8])
            }
            return e.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagWidth = this._flagHeight = this._flagRadius = !1, e.prototype.flagReset.call(this), this
        }
    }),
    r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.root,
        i = t.Utils.getComputedMatrix,
        r = t.Utils;
    (e.document ? e.document.createElement("canvas") : {
        getContext: r.identity
    }).getContext("2d");
    var n = t.Text = function(e, i, s, o) {
        if (t.Shape.call(this), this._renderer.type = "text", this._renderer.flagFill = r.bind(n.FlagFill, this), this._renderer.flagStroke = r.bind(n.FlagStroke, this), this.value = e, r.isNumber(i) && (this.translation.x = i), r.isNumber(s) && (this.translation.y = s), !r.isObject(o))
            return this;
        r.each(t.Text.Properties, function(t) {
            t in o && (this[t] = o[t])
        }, this)
    };
    r.extend(t.Text, {
        Properties: "value family size leading alignment linewidth style weight decoration baseline opacity visible fill stroke".split(" "),
        FlagFill: function() {
            this._flagFill = !0
        },
        FlagStroke: function() {
            this._flagStroke = !0
        },
        MakeObservable: function(e) {
            t.Shape.MakeObservable(e),
            r.each(t.Text.Properties.slice(0, 12), t.Utils.defineProperty, e),
            Object.defineProperty(e, "fill", {
                enumerable: !0,
                get: function() {
                    return this._fill
                },
                set: function(e) {
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.unbind(t.Events.change, this._renderer.flagFill),
                    this._fill = e,
                    this._flagFill = !0,
                    (this._fill instanceof t.Gradient || this._fill instanceof t.LinearGradient || this._fill instanceof t.RadialGradient || this._fill instanceof t.Texture) && this._fill.bind(t.Events.change, this._renderer.flagFill)
                }
            }),
            Object.defineProperty(e, "stroke", {
                enumerable: !0,
                get: function() {
                    return this._stroke
                },
                set: function(e) {
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.unbind(t.Events.change, this._renderer.flagStroke),
                    this._stroke = e,
                    this._flagStroke = !0,
                    (this._stroke instanceof t.Gradient || this._stroke instanceof t.LinearGradient || this._stroke instanceof t.RadialGradient || this._stroke instanceof t.Texture) && this._stroke.bind(t.Events.change, this._renderer.flagStroke)
                }
            }),
            Object.defineProperty(e, "clip", {
                enumerable: !0,
                get: function() {
                    return this._clip
                },
                set: function(t) {
                    this._clip = t,
                    this._flagClip = !0
                }
            })
        }
    }),
    r.extend(t.Text.prototype, t.Shape.prototype, {
        _flagValue: !0,
        _flagFamily: !0,
        _flagSize: !0,
        _flagLeading: !0,
        _flagAlignment: !0,
        _flagBaseline: !0,
        _flagStyle: !0,
        _flagWeight: !0,
        _flagDecoration: !0,
        _flagFill: !0,
        _flagStroke: !0,
        _flagLinewidth: !0,
        _flagOpacity: !0,
        _flagVisible: !0,
        _flagClip: !1,
        _value: "",
        _family: "sans-serif",
        _size: 13,
        _leading: 17,
        _alignment: "center",
        _baseline: "middle",
        _style: "normal",
        _weight: 500,
        _decoration: "none",
        _fill: "#000",
        _stroke: "transparent",
        _linewidth: 1,
        _opacity: 1,
        _visible: !0,
        _clip: !1,
        remove: function() {
            return this.parent ? (this.parent.remove(this), this) : this
        },
        clone: function(e) {
            e = e || this.parent;
            var i = new t.Text(this.value);
            return i.translation.copy(this.translation), i.rotation = this.rotation, i.scale = this.scale, r.each(t.Text.Properties, function(t) {
                i[t] = this[t]
            }, this), e && e.add(i), i
        },
        toObject: function() {
            var e = {
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale
            };
            return r.each(t.Text.Properties, function(t) {
                e[t] = this[t]
            }, this), e
        },
        noStroke: function() {
            return this.stroke = "transparent", this
        },
        noFill: function() {
            return this.fill = "transparent", this
        },
        getBoundingClientRect: function(t) {
            return this._update(!0), t = (t ? this._matrix : i(this)).multiply(0, 0, 1), {
                top: t.x,
                left: t.y,
                right: t.x,
                bottom: t.y,
                width: 0,
                height: 0
            }
        },
        flagReset: function() {
            return this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpaicty = this._flagVisible = this._flagClip = this._flagDecoration = this._flagBaseline = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }),
    t.Text.MakeObservable(t.Text.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.Stop = function(t, r, n) {
            this._renderer = {},
            this._renderer.type = "stop",
            this.offset = e.isNumber(t) ? t : 0 >= i.Index ? 0 : 1,
            this.opacity = e.isNumber(n) ? n : 1,
            this.color = e.isString(r) ? r : 0 >= i.Index ? "#fff" : "#000",
            i.Index = (i.Index + 1) % 2
        };
    e.extend(i, {
        Index: 0,
        Properties: ["offset", "opacity", "color"],
        MakeObservable: function(t) {
            e.each(i.Properties, function(t) {
                var e = "_" + t,
                    i = "_flag" + t.charAt(0).toUpperCase() + t.slice(1);
                Object.defineProperty(this, t, {
                    enumerable: !0,
                    get: function() {
                        return this[e]
                    },
                    set: function(t) {
                        this[e] = t,
                        this[i] = !0,
                        this.parent && (this.parent._flagStops = !0)
                    }
                })
            }, t)
        }
    }),
    e.extend(i.prototype, t.Utils.Events, {
        clone: function() {
            var t = new i;
            return e.each(i.Properties, function(e) {
                t[e] = this[e]
            }, this), t
        },
        toObject: function() {
            var t = {};
            return e.each(i.Properties, function(e) {
                t[e] = this[e]
            }, this), t
        },
        flagReset: function() {
            return this._flagOffset = this._flagColor = this._flagOpacity = !1, this
        }
    }),
    i.MakeObservable(i.prototype);
    var r = t.Gradient = function(i) {
        this._renderer = {},
        this._renderer.type = "gradient",
        this.id = t.Identifier + t.uniqueId(),
        this.classList = [],
        this._renderer.flagStops = e.bind(r.FlagStops, this),
        this._renderer.bindStops = e.bind(r.BindStops, this),
        this._renderer.unbindStops = e.bind(r.UnbindStops, this),
        this.spread = "pad",
        this.stops = i
    };
    e.extend(r, {
        Stop: i,
        Properties: ["spread"],
        MakeObservable: function(i) {
            e.each(r.Properties, t.Utils.defineProperty, i),
            Object.defineProperty(i, "stops", {
                enumerable: !0,
                get: function() {
                    return this._stops
                },
                set: function(e) {
                    var i = this._renderer.bindStops,
                        r = this._renderer.unbindStops;
                    this._stops && this._stops.unbind(t.Events.insert, i).unbind(t.Events.remove, r),
                    this._stops = new t.Utils.Collection((e || []).slice(0)),
                    this._stops.bind(t.Events.insert, i).bind(t.Events.remove, r),
                    i(this._stops)
                }
            })
        },
        FlagStops: function() {
            this._flagStops = !0
        },
        BindStops: function(e) {
            for (var i = e.length; i--;)
                e[i].bind(t.Events.change, this._renderer.flagStops),
                e[i].parent = this;
            this._renderer.flagStops()
        },
        UnbindStops: function(e) {
            for (var i = e.length; i--;)
                e[i].unbind(t.Events.change, this._renderer.flagStops),
                delete e[i].parent;
            this._renderer.flagStops()
        }
    }),
    e.extend(r.prototype, t.Utils.Events, {
        _flagStops: !1,
        _flagSpread: !1,
        clone: function(i) {
            i = i || this.parent;
            var n = e.map(this.stops, function(t) {
                    return t.clone()
                }),
                s = new r(n);
            return e.each(t.Gradient.Properties, function(t) {
                s[t] = this[t]
            }, this), i && i.add(s), s
        },
        toObject: function() {
            var t = {
                stops: e.map(this.stops, function(t) {
                    return t.toObject()
                })
            };
            return e.each(r.Properties, function(e) {
                t[e] = this[e]
            }, this), t
        },
        _update: function() {
            return (this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagSpread = this._flagStops = !1, this
        }
    }),
    r.MakeObservable(r.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.LinearGradient = function(r, n, s, o, a) {
            t.Gradient.call(this, a),
            this._renderer.type = "linear-gradient",
            a = e.bind(i.FlagEndPoints, this),
            this.left = (new t.Vector).bind(t.Events.change, a),
            this.right = (new t.Vector).bind(t.Events.change, a),
            e.isNumber(r) && (this.left.x = r),
            e.isNumber(n) && (this.left.y = n),
            e.isNumber(s) && (this.right.x = s),
            e.isNumber(o) && (this.right.y = o)
        };
    e.extend(i, {
        Stop: t.Gradient.Stop,
        MakeObservable: function(e) {
            t.Gradient.MakeObservable(e)
        },
        FlagEndPoints: function() {
            this._flagEndPoints = !0
        }
    }),
    e.extend(i.prototype, t.Gradient.prototype, {
        _flagEndPoints: !1,
        clone: function(r) {
            r = r || this.parent;
            var n = e.map(this.stops, function(t) {
                    return t.clone()
                }),
                s = new i(this.left._x, this.left._y, this.right._x, this.right._y, n);
            return e.each(t.Gradient.Properties, function(t) {
                s[t] = this[t]
            }, this), r && r.add(s), s
        },
        toObject: function() {
            var e = t.Gradient.prototype.toObject.call(this);
            return e.left = this.left.toObject(), e.right = this.right.toObject(), e
        },
        _update: function() {
            return (this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagEndPoints = !1, t.Gradient.prototype.flagReset.call(this), this
        }
    }),
    i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.RadialGradient = function(i, r, n, s, o, a) {
            t.Gradient.call(this, s),
            this._renderer.type = "radial-gradient",
            this.center = (new t.Vector).bind(t.Events.change, e.bind(function() {
                this._flagCenter = !0
            }, this)),
            this.radius = e.isNumber(n) ? n : 20,
            this.focal = (new t.Vector).bind(t.Events.change, e.bind(function() {
                this._flagFocal = !0
            }, this)),
            e.isNumber(i) && (this.center.x = i),
            e.isNumber(r) && (this.center.y = r),
            this.focal.copy(this.center),
            e.isNumber(o) && (this.focal.x = o),
            e.isNumber(a) && (this.focal.y = a)
        };
    e.extend(i, {
        Stop: t.Gradient.Stop,
        Properties: ["radius"],
        MakeObservable: function(r) {
            t.Gradient.MakeObservable(r),
            e.each(i.Properties, t.Utils.defineProperty, r)
        }
    }),
    e.extend(i.prototype, t.Gradient.prototype, {
        _flagRadius: !1,
        _flagCenter: !1,
        _flagFocal: !1,
        clone: function(r) {
            r = r || this.parent;
            var n = e.map(this.stops, function(t) {
                    return t.clone()
                }),
                s = new i(this.center._x, this.center._y, this._radius, n, this.focal._x, this.focal._y);
            return e.each(t.Gradient.Properties.concat(i.Properties), function(t) {
                s[t] = this[t]
            }, this), r && r.add(s), s
        },
        toObject: function() {
            var r = t.Gradient.prototype.toObject.call(this);
            return e.each(i.Properties, function(t) {
                r[t] = this[t]
            }, this), r.center = this.center.toObject(), r.focal = this.focal.toObject(), r
        },
        _update: function() {
            return (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) && this.trigger(t.Events.change), this
        },
        flagReset: function() {
            return this._flagRadius = this._flagCenter = this._flagFocal = !1, t.Gradient.prototype.flagReset.call(this), this
        }
    }),
    i.MakeObservable(i.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i,
        r = /\.(mp4|webm)$/i;
    this.document && (i = document.createElement("a"));
    var n = t.Texture = function(i, r) {
        if (this._renderer = {}, this._renderer.type = "texture", this._renderer.flagOffset = e.bind(n.FlagOffset, this), this._renderer.flagScale = e.bind(n.FlagScale, this), this.id = t.Identifier + t.uniqueId(), this.classList = [], this.offset = new t.Vector, e.isFunction(r)) {
            var s = e.bind(function() {
                this.unbind(t.Events.load, s),
                e.isFunction(r) && r()
            }, this);
            this.bind(t.Events.load, s)
        }
        e.isString(i) ? this.src = i : e.isElement(i) && (this.image = i),
        this._update()
    };
    e.extend(n, {
        Properties: ["src", "loaded", "repeat"],
        ImageRegistry: new t.Registry,
        getAbsoluteURL: function(t) {
            return i ? (i.href = t, i.href) : t
        },
        getImage: function(t) {
            return t = n.getAbsoluteURL(t), n.ImageRegistry.contains(t) ? n.ImageRegistry.get(t) : (t = r.test(t) ? document.createElement("video") : document.createElement("img"), t.crossOrigin = "anonymous", t)
        },
        Register: {
            canvas: function(t, i) {
                t._src = "#" + t.id,
                n.ImageRegistry.add(t.src, t.image),
                e.isFunction(i) && i()
            },
            img: function(i, r) {
                var s = function(t) {
                        i.image.removeEventListener("load", s, !1),
                        i.image.removeEventListener("error", o, !1),
                        e.isFunction(r) && r()
                    },
                    o = function(e) {
                        throw i.image.removeEventListener("load", s, !1), i.image.removeEventListener("error", o, !1), new t.Utils.Error("unable to load " + i.src)
                    };
                e.isNumber(i.image.width) && 0 < i.image.width && e.isNumber(i.image.height) && 0 < i.image.height ? s() : (i.image.addEventListener("load", s, !1), i.image.addEventListener("error", o, !1)),
                i._src = n.getAbsoluteURL(i._src),
                i.image && i.image.getAttribute("two-src") || (i.image.setAttribute("two-src", i.src), n.ImageRegistry.add(i.src, i.image), i.image.src = i.src)
            },
            video: function(i, r) {
                var s = function(t) {
                        i.image.removeEventListener("load", s, !1),
                        i.image.removeEventListener("error", o, !1),
                        i.image.width = i.image.videoWidth,
                        i.image.height = i.image.videoHeight,
                        i.image.play(),
                        e.isFunction(r) && r()
                    },
                    o = function(e) {
                        throw i.image.removeEventListener("load", s, !1), i.image.removeEventListener("error", o, !1), new t.Utils.Error("unable to load " + i.src)
                    };
                i._src = n.getAbsoluteURL(i._src),
                i.image.addEventListener("canplaythrough", s, !1),
                i.image.addEventListener("error", o, !1),
                i.image && i.image.getAttribute("two-src") || (i.image.setAttribute("two-src", i.src), n.ImageRegistry.add(i.src, i.image), i.image.src = i.src, i.image.loop = !0, i.image.load())
            }
        },
        load: function(t, e) {
            var i = t.image,
                r = i && i.nodeName.toLowerCase();
            t._flagImage && (/canvas/i.test(r) ? n.Register.canvas(t, e) : (t._src = i.getAttribute("two-src") || i.src, n.Register[r](t, e))),
            t._flagSrc && (i || (t.image = n.getImage(t.src)), r = t.image.nodeName.toLowerCase(), n.Register[r](t, e))
        },
        FlagOffset: function() {
            this._flagOffset = !0
        },
        FlagScale: function() {
            this._flagScale = !0
        },
        MakeObservable: function(i) {
            e.each(n.Properties, t.Utils.defineProperty, i),
            Object.defineProperty(i, "image", {
                enumerable: !0,
                get: function() {
                    return this._image
                },
                set: function(t) {
                    switch (t && t.nodeName.toLowerCase()) {
                    case "canvas":
                        var e = "#" + t.id;
                        break;
                    default:
                        e = t.src
                    }
                    n.ImageRegistry.contains(e) ? this._image = n.ImageRegistry.get(t.src) : this._image = t,
                    this._flagImage = !0
                }
            }),
            Object.defineProperty(i, "offset", {
                enumerable: !0,
                get: function() {
                    return this._offset
                },
                set: function(e) {
                    this._offset && this._offset.unbind(t.Events.change, this._renderer.flagOffset),
                    this._offset = e,
                    this._offset.bind(t.Events.change, this._renderer.flagOffset),
                    this._flagOffset = !0
                }
            }),
            Object.defineProperty(i, "scale", {
                enumerable: !0,
                get: function() {
                    return this._scale
                },
                set: function(e) {
                    this._scale instanceof t.Vector && this._scale.unbind(t.Events.change, this._renderer.flagScale),
                    this._scale = e,
                    this._scale instanceof t.Vector && this._scale.bind(t.Events.change, this._renderer.flagScale),
                    this._flagScale = !0
                }
            })
        }
    }),
    e.extend(n.prototype, t.Utils.Events, t.Shape.prototype, {
        _flagSrc: !1,
        _flagImage: !1,
        _flagVideo: !1,
        _flagLoaded: !1,
        _flagRepeat: !1,
        _flagOffset: !1,
        _flagScale: !1,
        _src: "",
        _image: null,
        _loaded: !1,
        _repeat: "no-repeat",
        _scale: 1,
        _offset: null,
        clone: function() {
            return new n(this.src)
        },
        toObject: function() {
            return {
                src: this.src,
                image: this.image
            }
        },
        _update: function() {
            return (this._flagSrc || this._flagImage || this._flagVideo) && (this.trigger(t.Events.change), (this._flagSrc || this._flagImage) && (this.loaded = !1, n.load(this, e.bind(function() {
                this.loaded = !0,
                this.trigger(t.Events.change).trigger(t.Events.load)
            }, this)))), this._image && 4 <= this._image.readyState && (this._flagVideo = !0), this
        },
        flagReset: function() {
            return this._flagSrc = this._flagImage = this._flagLoaded = this._flagVideo = this._flagScale = this._flagOffset = !1, this
        }
    }),
    n.MakeObservable(n.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.Path,
        r = t.Rectangle,
        n = t.Sprite = function(r, n, s, o, a, h) {
            i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0),
            this.noStroke(),
            this.noFill(),
            r instanceof t.Texture ? this.texture = r : e.isString(r) && (this.texture = new t.Texture(r)),
            this._update(),
            this.translation.set(n || 0, s || 0),
            e.isNumber(o) && (this.columns = o),
            e.isNumber(a) && (this.rows = a),
            e.isNumber(h) && (this.frameRate = h)
        };
    e.extend(n, {
        Properties: ["texture", "columns", "rows", "frameRate", "index"],
        MakeObservable: function(i) {
            r.MakeObservable(i),
            e.each(n.Properties, t.Utils.defineProperty, i)
        }
    }),
    e.extend(n.prototype, r.prototype, {
        _flagTexture: !1,
        _flagColumns: !1,
        _flagRows: !1,
        _flagFrameRate: !1,
        flagIndex: !1,
        _amount: 1,
        _duration: 0,
        _startTime: 0,
        _playing: !1,
        _firstFrame: 0,
        _lastFrame: 0,
        _loop: !0,
        _texture: null,
        _columns: 1,
        _rows: 1,
        _frameRate: 0,
        _index: 0,
        play: function(t, i, r) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = e.performance.now(), e.isNumber(t) && (this._firstFrame = t), e.isNumber(i) && (this._lastFrame = i), e.isFunction(r) ? this._onLastFrame = r : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this
        },
        pause: function() {
            return this._playing = !1, this
        },
        stop: function() {
            return this._playing = !1, this._index = 0, this
        },
        clone: function(t) {
            t = t || this.parent;
            var e = new n(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
            return this.playing && (e.play(this._firstFrame, this._lastFrame), e._loop = this._loop), t && t.add(e), e
        },
        _update: function() {
            var t = this._texture,
                i = this._columns,
                n = this._rows;
            if ((this._flagColumns || this._flagRows) && (this._amount = this._columns * this._rows), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._flagTexture && (this.fill = this._texture), this._texture.loaded) {
                var s = t.image.width,
                    o = t.image.height,
                    a = s / i;
                n = o / n;
                var h = this._amount;
                if (this.width !== a && (this.width = a), this.height !== n && (this.height = n), this._playing && 0 < this._frameRate) {
                    e.isNaN(this._lastFrame) && (this._lastFrame = h - 1),
                    h = e.performance.now() - this._startTime;
                    var l = this._lastFrame + 1,
                        c = 1e3 * (l - this._firstFrame) / this._frameRate;
                    h = this._loop ? h % c : Math.min(h, c),
                    h = e.lerp(this._firstFrame, l, h / c),
                    h = Math.floor(h),
                    h !== this._index && (this._index = h, h >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame())
                }
                a = this._index % i * -a + (s - a) / 2,
                i = -n * Math.floor(this._index / i) + (o - n) / 2,
                a !== t.offset.x && (t.offset.x = a),
                i !== t.offset.y && (t.offset.y = i)
            }
            return r.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = !1, r.prototype.flagReset.call(this), this
        }
    }),
    n.MakeObservable(n.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    var e = t.Utils,
        i = t.Path,
        r = t.Rectangle,
        n = t.ImageSequence = function(r, s, o, a) {
            i.call(this, [new t.Anchor, new t.Anchor, new t.Anchor, new t.Anchor], !0),
            this._renderer.flagTextures = e.bind(n.FlagTextures, this),
            this._renderer.bindTextures = e.bind(n.BindTextures, this),
            this._renderer.unbindTextures = e.bind(n.UnbindTextures, this),
            this.noStroke(),
            this.noFill(),
            this.textures = e.map(r, n.GenerateTexture, this),
            this._update(),
            this.translation.set(s || 0, o || 0),
            e.isNumber(a) ? this.frameRate = a : this.frameRate = n.DefaultFrameRate
        };
    e.extend(n, {
        Properties: ["frameRate", "index"],
        DefaultFrameRate: 30,
        FlagTextures: function() {
            this._flagTextures = !0
        },
        BindTextures: function(e) {
            for (var i = e.length; i--;)
                e[i].bind(t.Events.change, this._renderer.flagTextures);
            this._renderer.flagTextures()
        },
        UnbindTextures: function(e) {
            for (var i = e.length; i--;)
                e[i].unbind(t.Events.change, this._renderer.flagTextures);
            this._renderer.flagTextures()
        },
        MakeObservable: function(i) {
            r.MakeObservable(i),
            e.each(n.Properties, t.Utils.defineProperty, i),
            Object.defineProperty(i, "textures", {
                enumerable: !0,
                get: function() {
                    return this._textures
                },
                set: function(e) {
                    var i = this._renderer.bindTextures,
                        r = this._renderer.unbindTextures;
                    this._textures && this._textures.unbind(t.Events.insert, i).unbind(t.Events.remove, r),
                    this._textures = new t.Utils.Collection((e || []).slice(0)),
                    this._textures.bind(t.Events.insert, i).bind(t.Events.remove, r),
                    i(this._textures)
                }
            })
        },
        GenerateTexture: function(i) {
            return i instanceof t.Texture ? i : e.isString(i) ? new t.Texture(i) : void 0
        }
    }),
    e.extend(n.prototype, r.prototype, {
        _flagTextures: !1,
        _flagFrameRate: !1,
        _flagIndex: !1,
        _amount: 1,
        _duration: 0,
        _index: 0,
        _startTime: 0,
        _playing: !1,
        _firstFrame: 0,
        _lastFrame: 0,
        _loop: !0,
        _textures: null,
        _frameRate: 0,
        play: function(t, i, r) {
            return this._playing = !0, this._firstFrame = 0, this._lastFrame = this.amount - 1, this._startTime = e.performance.now(), e.isNumber(t) && (this._firstFrame = t), e.isNumber(i) && (this._lastFrame = i), e.isFunction(r) ? this._onLastFrame = r : delete this._onLastFrame, this._index !== this._firstFrame && (this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate), this
        },
        pause: function() {
            return this._playing = !1, this
        },
        stop: function() {
            return this._playing = !1, this._index = 0, this
        },
        clone: function(t) {
            t = t || this.parent;
            var e = new n(this.textures, this.translation.x, this.translation.y, this.frameRate);
            return e._loop = this._loop, this._playing && e.play(), t && t.add(e), e
        },
        _update: function() {
            var i = this._textures;
            if (this._flagTextures && (this._amount = i.length), this._flagFrameRate && (this._duration = 1e3 * this._amount / this._frameRate), this._playing && 0 < this._frameRate) {
                var n = this._amount;
                e.isNaN(this._lastFrame) && (this._lastFrame = n - 1),
                n = e.performance.now() - this._startTime;
                var s = this._lastFrame + 1,
                    o = 1e3 * (s - this._firstFrame) / this._frameRate;
                n = this._loop ? n % o : Math.min(n, o),
                n = e.lerp(this._firstFrame, s, n / o),
                n = Math.floor(n),
                n !== this._index && (this._index = n, s = i[this._index], s.loaded && (i = s.image.width, o = s.image.height, this.width !== i && (this.width = i), this.height !== o && (this.height = o), this.fill = s, n >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame()))
            } else
                !this._flagIndex && this.fill instanceof t.Texture || (s = i[this._index], s.loaded && (i = s.image.width, o = s.image.height, this.width !== i && (this.width = i), this.height !== o && (this.height = o)), this.fill = s);
            return r.prototype._update.call(this), this
        },
        flagReset: function() {
            return this._flagTextures = this._flagFrameRate = !1, r.prototype.flagReset.call(this), this
        }
    }),
    n.MakeObservable(n.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    function e(t, e) {
        var i = t.parent;
        if (i === e)
            this.additions.push(t),
            this._flagAdditions = !0;
        else {
            if (i && i.children.ids[t.id]) {
                var r = n.indexOf(i.children, t);
                i.children.splice(r, 1),
                r = n.indexOf(i.additions, t),
                0 <= r ? i.additions.splice(r, 1) : (i.subtractions.push(t), i._flagSubtractions = !0)
            }
            e ? (t.parent = e, this.additions.push(t), this._flagAdditions = !0) : (r = n.indexOf(this.additions, t), 0 <= r ? this.additions.splice(r, 1) : (this.subtractions.push(t), this._flagSubtractions = !0), delete t.parent)
        }
    }
    var i = Math.min,
        r = Math.max,
        n = t.Utils,
        s = function() {
            t.Utils.Collection.apply(this, arguments),
            Object.defineProperty(this, "_events", {
                value: {},
                enumerable: !1
            }),
            this.ids = {},
            this.on(t.Events.insert, this.attach),
            this.on(t.Events.remove, this.detach),
            s.prototype.attach.apply(this, arguments)
        };
    s.prototype = new t.Utils.Collection,
    s.prototype.constructor = s,
    n.extend(s.prototype, {
        attach: function(t) {
            for (var e = 0; e < t.length; e++)
                this.ids[t[e].id] = t[e];
            return this
        },
        detach: function(t) {
            for (var e = 0; e < t.length; e++)
                delete this.ids[t[e].id];
            return this
        }
    });
    var o = t.Group = function() {
        t.Shape.call(this, !0),
        this._renderer.type = "group",
        this.additions = [],
        this.subtractions = [],
        this.children = arguments
    };
    n.extend(o, {
        Children: s,
        InsertChildren: function(t) {
            for (var i = 0; i < t.length; i++)
                e.call(this, t[i], this)
        },
        RemoveChildren: function(t) {
            for (var i = 0; i < t.length; i++)
                e.call(this, t[i])
        },
        OrderChildren: function(t) {
            this._flagOrder = !0
        },
        MakeObservable: function(e) {
            var i = t.Path.Properties.slice(0),
                r = n.indexOf(i, "opacity");
            0 <= r && (i.splice(r, 1), Object.defineProperty(e, "opacity", {
                enumerable: !0,
                get: function() {
                    return this._opacity
                },
                set: function(t) {
                    this._flagOpacity = this._opacity != t,
                    this._opacity = t
                }
            })),
            t.Shape.MakeObservable(e),
            o.MakeGetterSetters(e, i),
            Object.defineProperty(e, "children", {
                enumerable: !0,
                get: function() {
                    return this._children
                },
                set: function(e) {
                    var i = n.bind(o.InsertChildren, this),
                        r = n.bind(o.RemoveChildren, this),
                        a = n.bind(o.OrderChildren, this);
                    this._children && this._children.unbind(),
                    this._children = new s(e),
                    this._children.bind(t.Events.insert, i),
                    this._children.bind(t.Events.remove, r),
                    this._children.bind(t.Events.order, a)
                }
            }),
            Object.defineProperty(e, "mask", {
                enumerable: !0,
                get: function() {
                    return this._mask
                },
                set: function(t) {
                    this._mask = t,
                    this._flagMask = !0,
                    t.clip || (t.clip = !0)
                }
            })
        },
        MakeGetterSetters: function(t, e) {
            n.isArray(e) || (e = [e]),
            n.each(e, function(e) {
                o.MakeGetterSetter(t, e)
            })
        },
        MakeGetterSetter: function(t, e) {
            var i = "_" + e;
            Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return this[i]
                },
                set: function(t) {
                    this[i] = t,
                    n.each(this.children, function(i) {
                        i[e] = t
                    })
                }
            })
        }
    }),
    n.extend(o.prototype, t.Shape.prototype, {
        _flagAdditions: !1,
        _flagSubtractions: !1,
        _flagOrder: !1,
        _flagOpacity: !0,
        _flagMask: !1,
        _fill: "#fff",
        _stroke: "#000",
        _linewidth: 1,
        _opacity: 1,
        _visible: !0,
        _cap: "round",
        _join: "round",
        _miter: 4,
        _closed: !0,
        _curved: !1,
        _automatic: !0,
        _beginning: 0,
        _ending: 1,
        _mask: null,
        clone: function(t) {
            t = t || this.parent;
            var e = new o,
                i = n.map(this.children, function(t) {
                    return t.clone(e)
                });
            return e.add(i), e.opacity = this.opacity, this.mask && (e.mask = this.mask), e.translation.copy(this.translation), e.rotation = this.rotation, e.scale = this.scale, t && t.add(e), e
        },
        toObject: function() {
            var t = {
                children: [],
                translation: this.translation.toObject(),
                rotation: this.rotation,
                scale: this.scale,
                opacity: this.opacity,
                mask: this.mask ? this.mask.toObject() : null
            };
            return n.each(this.children, function(e, i) {
                t.children[i] = e.toObject()
            }, this), t
        },
        corner: function() {
            var t = this.getBoundingClientRect(!0),
                e = {
                    x: t.left,
                    y: t.top
                };
            return this.children.forEach(function(t) {
                t.translation.subSelf(e)
            }), this
        },
        center: function() {
            var t = this.getBoundingClientRect(!0);
            return t.centroid = {
                x: t.left + t.width / 2,
                y: t.top + t.height / 2
            }, this.children.forEach(function(e) {
                e.isShape && e.translation.subSelf(t.centroid)
            }), this
        },
        getById: function(t) {
            var e = function(t, i) {
                if (t.id === i)
                    return t;
                if (t.children)
                    for (var r = t.children.length; r--;) {
                        var n = e(t.children[r], i);
                        if (n)
                            return n
                    }
            };
            return e(this, t) || null
        },
        getByClassName: function(t) {
            var e = [],
                i = function(t, r) {
                    return -1 != t.classList.indexOf(r) ? e.push(t) : t.children && t.children.forEach(function(t) {
                        i(t, r)
                    }), e
                };
            return i(this, t)
        },
        getByType: function(e) {
            var i = [],
                r = function(e, n) {
                    for (var s in e.children)
                        e.children[s] instanceof n ? i.push(e.children[s]) : e.children[s] instanceof t.Group && r(e.children[s], n);
                    return i
                };
            return r(this, e)
        },
        add: function(t) {
            t = t instanceof Array ? t.slice() : n.toArray(arguments);
            for (var e = 0; e < t.length; e++)
                t[e] && t[e].id && this.children.push(t[e]);
            return this
        },
        remove: function(t) {
            var e = this.parent;
            if (0 >= arguments.length && e)
                return e.remove(this), this;
            for (t = t instanceof Array ? t.slice() : n.toArray(arguments), e = 0; e < t.length; e++)
                t[e] && this.children.ids[t[e].id] && this.children.splice(n.indexOf(this.children, t[e]), 1);
            return this
        },
        getBoundingClientRect: function(t) {
            var e;
            this._update(!0);
            var s = 1 / 0,
                o = -1 / 0,
                a = 1 / 0,
                h = -1 / 0;
            return this.children.forEach(function(l) {
                /(linear-gradient|radial-gradient|gradient)/.test(l._renderer.type) || (e = l.getBoundingClientRect(t), n.isNumber(e.top) && n.isNumber(e.left) && n.isNumber(e.right) && n.isNumber(e.bottom) && (a = i(e.top, a), s = i(e.left, s), o = r(e.right, o), h = r(e.bottom, h)))
            }, this), {
                top: a,
                left: s,
                right: o,
                bottom: h,
                width: o - s,
                height: h - a
            }
        },
        noFill: function() {
            return this.children.forEach(function(t) {
                t.noFill()
            }), this
        },
        noStroke: function() {
            return this.children.forEach(function(t) {
                t.noStroke()
            }), this
        },
        subdivide: function() {
            var t = arguments;
            return this.children.forEach(function(e) {
                e.subdivide.apply(e, t)
            }), this
        },
        flagReset: function() {
            return this._flagAdditions && (this.additions.length = 0, this._flagAdditions = !1), this._flagSubtractions && (this.subtractions.length = 0, this._flagSubtractions = !1), this._flagOrder = this._flagMask = this._flagOpacity = !1, t.Shape.prototype.flagReset.call(this), this
        }
    }),
    o.MakeObservable(o.prototype)
}(("undefined" != typeof global ? global : this).Two),
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
        e.PIXI = t()
    }
}(function() {
    var t;
    return function t(e, i, r) {
        function n(o, a) {
            if (!i[o]) {
                if (!e[o]) {
                    var h = "function" == typeof require && require;
                    if (!a && h)
                        return h(o, !0);
                    if (s)
                        return s(o, !0);
                    var l = new Error("Cannot find module '" + o + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var c = i[o] = {
                    exports: {}
                };
                e[o][0].call(c.exports, function(t) {
                    var i = e[o][1][t];
                    return n(i || t)
                }, c, c.exports, t, e, i, r)
            }
            return i[o].exports
        }
        for (var s = "function" == typeof require && require, o = 0; o < r.length; o++)
            n(r[o]);
        return n
    }({
        1: [function(t, e, i) {
            "use strict";
            "use restrict";
            function r(t) {
                var e = 32;
                return t &= -t, t && e--, 65535 & t && (e -= 16), 16711935 & t && (e -= 8), 252645135 & t && (e -= 4), 858993459 & t && (e -= 2), 1431655765 & t && (e -= 1), e
            }
            var n = 32;
            i.INT_BITS = n,
            i.INT_MAX = 2147483647,
            i.INT_MIN = -1 << 31,
            i.sign = function(t) {
                return (t > 0) - (0 > t)
            },
            i.abs = function(t) {
                var e = t >> 31;
                return (t ^ e) - e
            },
            i.min = function(t, e) {
                return e ^ (t ^ e) & -(e > t)
            },
            i.max = function(t, e) {
                return t ^ (t ^ e) & -(e > t)
            },
            i.isPow2 = function(t) {
                return !(t & t - 1 || !t)
            },
            i.log2 = function(t) {
                var e,
                    i;
                return e = (t > 65535) << 4, t >>>= e, i = (t > 255) << 3, t >>>= i, e |= i, i = (t > 15) << 2, t >>>= i, e |= i, i = (t > 3) << 1, t >>>= i, (e |= i) | t >> 1
            },
            i.log10 = function(t) {
                return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
            },
            i.popCount = function(t) {
                return t -= t >>> 1 & 1431655765, 16843009 * ((t = (858993459 & t) + (t >>> 2 & 858993459)) + (t >>> 4) & 252645135) >>> 24
            },
            i.countTrailingZeros = r,
            i.nextPow2 = function(t) {
                return t += 0 === t, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, (t |= t >>> 16) + 1
            },
            i.prevPow2 = function(t) {
                return t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, (t |= t >>> 16) - (t >>> 1)
            },
            i.parity = function(t) {
                return t ^= t >>> 16, t ^= t >>> 8, t ^= t >>> 4, 27030 >>> (t &= 15) & 1
            };
            var s = new Array(256);
            !function(t) {
                for (var e = 0; 256 > e; ++e) {
                    var i = e,
                        r = e,
                        n = 7;
                    for (i >>>= 1; i; i >>>= 1)
                        r <<= 1,
                        r |= 1 & i,
                        --n;
                    t[e] = r << n & 255
                }
            }(s),
            i.reverse = function(t) {
                return s[255 & t] << 24 | s[t >>> 8 & 255] << 16 | s[t >>> 16 & 255] << 8 | s[t >>> 24 & 255]
            },
            i.interleave2 = function(t, e) {
                return t &= 65535, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e &= 65535, e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t | e << 1
            },
            i.deinterleave2 = function(t, e) {
                return t = t >>> e & 1431655765, t = 858993459 & (t | t >>> 1), t = 252645135 & (t | t >>> 2), t = 16711935 & (t | t >>> 4), (t = 65535 & (t | t >>> 16)) << 16 >> 16
            },
            i.interleave3 = function(t, e, i) {
                return t &= 1023, t = 4278190335 & (t | t << 16), t = 251719695 & (t | t << 8), t = 3272356035 & (t | t << 4), t = 1227133513 & (t | t << 2), e &= 1023, e = 4278190335 & (e | e << 16), e = 251719695 & (e | e << 8), e = 3272356035 & (e | e << 4), e = 1227133513 & (e | e << 2), t |= e << 1, i &= 1023, i = 4278190335 & (i | i << 16), i = 251719695 & (i | i << 8), i = 3272356035 & (i | i << 4), i = 1227133513 & (i | i << 2), t | i << 2
            },
            i.deinterleave3 = function(t, e) {
                return t = t >>> e & 1227133513, t = 3272356035 & (t | t >>> 2), t = 251719695 & (t | t >>> 4), t = 4278190335 & (t | t >>> 8), (t = 1023 & (t | t >>> 16)) << 22 >> 22
            },
            i.nextCombination = function(t) {
                var e = t | t - 1;
                return e + 1 | (~e & -~e) - 1 >>> r(t) + 1
            }
        }, {}],
        2: [function(t, e, i) {
            "use strict";
            function r(t, e, i) {
                i = i || 2;
                var r = e && e.length,
                    s = r ? e[0] * i : t.length,
                    a = n(t, 0, s, i, !0),
                    h = [];
                if (!a)
                    return h;
                var l,
                    c,
                    d,
                    p,
                    f,
                    _,
                    g;
                if (r && (a = u(t, e, a, i)), t.length > 80 * i) {
                    l = d = t[0],
                    c = p = t[1];
                    for (var m = i; s > m; m += i)
                        f = t[m],
                        _ = t[m + 1],
                        l > f && (l = f),
                        c > _ && (c = _),
                        f > d && (d = f),
                        _ > p && (p = _);
                    g = Math.max(d - l, p - c)
                }
                return o(a, h, i, l, c, g), h
            }
            function n(t, e, i, r, n) {
                var s,
                    o;
                if (n === O(t, e, i, r) > 0)
                    for (s = e; i > s; s += r)
                        o = C(s, t[s], t[s + 1], o);
                else
                    for (s = i - r; s >= e; s -= r)
                        o = C(s, t[s], t[s + 1], o);
                return o && T(o, o.next) && (M(o), o = o.next), o
            }
            function s(t, e) {
                if (!t)
                    return t;
                e || (e = t);
                var i,
                    r = t;
                do {
                    if (i = !1, r.steiner || !T(r, r.next) && 0 !== b(r.prev, r, r.next))
                        r = r.next;
                    else {
                        if (M(r), (r = e = r.prev) === r.next)
                            return null;
                        i = !0
                    }
                } while (i || r !== e);
                return e
            }
            function o(t, e, i, r, n, u, d) {
                if (t) {
                    !d && u && _(t, r, n, u);
                    for (var p, f, g = t; t.prev !== t.next;)
                        if (p = t.prev, f = t.next, u ? h(t, r, n, u) : a(t))
                            e.push(p.i / i),
                            e.push(t.i / i),
                            e.push(f.i / i),
                            M(t),
                            t = f.next,
                            g = f.next;
                        else if ((t = f) === g) {
                            d ? 1 === d ? (t = l(t, e, i), o(t, e, i, r, n, u, 2)) : 2 === d && c(t, e, i, r, n, u) : o(s(t), e, i, r, n, u, 1);
                            break
                        }
                }
            }
            function a(t) {
                var e = t.prev,
                    i = t,
                    r = t.next;
                if (b(e, i, r) >= 0)
                    return !1;
                for (var n = t.next.next; n !== t.prev;) {
                    if (y(e.x, e.y, i.x, i.y, r.x, r.y, n.x, n.y) && b(n.prev, n, n.next) >= 0)
                        return !1;
                    n = n.next
                }
                return !0
            }
            function h(t, e, i, r) {
                var n = t.prev,
                    s = t,
                    o = t.next;
                if (b(n, s, o) >= 0)
                    return !1;
                for (var a = n.x < s.x ? n.x < o.x ? n.x : o.x : s.x < o.x ? s.x : o.x, h = n.y < s.y ? n.y < o.y ? n.y : o.y : s.y < o.y ? s.y : o.y, l = n.x > s.x ? n.x > o.x ? n.x : o.x : s.x > o.x ? s.x : o.x, c = n.y > s.y ? n.y > o.y ? n.y : o.y : s.y > o.y ? s.y : o.y, u = m(a, h, e, i, r), d = m(l, c, e, i, r), p = t.nextZ; p && p.z <= d;) {
                    if (p !== t.prev && p !== t.next && y(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && b(p.prev, p, p.next) >= 0)
                        return !1;
                    p = p.nextZ
                }
                for (p = t.prevZ; p && p.z >= u;) {
                    if (p !== t.prev && p !== t.next && y(n.x, n.y, s.x, s.y, o.x, o.y, p.x, p.y) && b(p.prev, p, p.next) >= 0)
                        return !1;
                    p = p.prevZ
                }
                return !0
            }
            function l(t, e, i) {
                var r = t;
                do {
                    var n = r.prev,
                        s = r.next.next;
                    !T(n, s) && w(n, r, r.next, s) && E(n, s) && E(s, n) && (e.push(n.i / i), e.push(r.i / i), e.push(s.i / i), M(r), M(r.next), r = t = s),
                    r = r.next
                } while (r !== t);
                return r
            }
            function c(t, e, i, r, n, a) {
                var h = t;
                do {
                    for (var l = h.next.next; l !== h.prev;) {
                        if (h.i !== l.i && x(h, l)) {
                            var c = R(h, l);
                            return h = s(h, h.next), c = s(c, c.next), o(h, e, i, r, n, a), void o(c, e, i, r, n, a)
                        }
                        l = l.next
                    }
                    h = h.next
                } while (h !== t)
            }
            function u(t, e, i, r) {
                var o,
                    a,
                    h,
                    l,
                    c,
                    u = [];
                for (o = 0, a = e.length; a > o; o++)
                    h = e[o] * r,
                    l = a - 1 > o ? e[o + 1] * r : t.length,
                    c = n(t, h, l, r, !1),
                    c === c.next && (c.steiner = !0),
                    u.push(v(c));
                for (u.sort(d), o = 0; o < u.length; o++)
                    p(u[o], i),
                    i = s(i, i.next);
                return i
            }
            function d(t, e) {
                return t.x - e.x
            }
            function p(t, e) {
                if (e = f(t, e)) {
                    var i = R(e, t);
                    s(i, i.next)
                }
            }
            function f(t, e) {
                var i,
                    r = e,
                    n = t.x,
                    s = t.y,
                    o = -1 / 0;
                do {
                    if (s <= r.y && s >= r.next.y) {
                        var a = r.x + (s - r.y) * (r.next.x - r.x) / (r.next.y - r.y);
                        if (n >= a && a > o) {
                            if (o = a, a === n) {
                                if (s === r.y)
                                    return r;
                                if (s === r.next.y)
                                    return r.next
                            }
                            i = r.x < r.next.x ? r : r.next
                        }
                    }
                    r = r.next
                } while (r !== e);
                if (!i)
                    return null;
                if (n === o)
                    return i.prev;
                var h,
                    l = i,
                    c = i.x,
                    u = i.y,
                    d = 1 / 0;
                for (r = i.next; r !== l;)
                    n >= r.x && r.x >= c && y(u > s ? n : o, s, c, u, u > s ? o : n, s, r.x, r.y) && (h = Math.abs(s - r.y) / (n - r.x), (d > h || h === d && r.x > i.x) && E(r, t) && (i = r, d = h)),
                    r = r.next;
                return i
            }
            function _(t, e, i, r) {
                var n = t;
                do {
                    null === n.z && (n.z = m(n.x, n.y, e, i, r)),
                    n.prevZ = n.prev,
                    n.nextZ = n.next,
                    n = n.next
                } while (n !== t);
                n.prevZ.nextZ = null,
                n.prevZ = null,
                g(n)
            }
            function g(t) {
                var e,
                    i,
                    r,
                    n,
                    s,
                    o,
                    a,
                    h,
                    l = 1;
                do {
                    for (i = t, t = null, s = null, o = 0; i;) {
                        for (o++, r = i, a = 0, e = 0; l > e && (a++, r = r.nextZ); e++)
                            ;
                        for (h = l; a > 0 || h > 0 && r;)
                            0 === a ? (n = r, r = r.nextZ, h--) : 0 !== h && r ? i.z <= r.z ? (n = i, i = i.nextZ, a--) : (n = r, r = r.nextZ, h--) : (n = i, i = i.nextZ, a--),
                            s ? s.nextZ = n : t = n,
                            n.prevZ = s,
                            s = n;
                        i = r
                    }
                    s.nextZ = null,
                    l *= 2
                } while (o > 1);
                return t
            }
            function m(t, e, i, r, n) {
                return t = 32767 * (t - i) / n, e = 32767 * (e - r) / n, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t | e << 1
            }
            function v(t) {
                var e = t,
                    i = t;
                do {
                    e.x < i.x && (i = e),
                    e = e.next
                } while (e !== t);
                return i
            }
            function y(t, e, i, r, n, s, o, a) {
                return (n - o) * (e - a) - (t - o) * (s - a) >= 0 && (t - o) * (r - a) - (i - o) * (e - a) >= 0 && (i - o) * (s - a) - (n - o) * (r - a) >= 0
            }
            function x(t, e) {
                return t.next.i !== e.i && t.prev.i !== e.i && !S(t, e) && E(t, e) && E(e, t) && A(t, e)
            }
            function b(t, e, i) {
                return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y)
            }
            function T(t, e) {
                return t.x === e.x && t.y === e.y
            }
            function w(t, e, i, r) {
                return !!(T(t, e) && T(i, r) || T(t, r) && T(i, e)) || b(t, e, i) > 0 != b(t, e, r) > 0 && b(i, r, t) > 0 != b(i, r, e) > 0
            }
            function S(t, e) {
                var i = t;
                do {
                    if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && w(i, i.next, t, e))
                        return !0;
                    i = i.next
                } while (i !== t);
                return !1
            }
            function E(t, e) {
                return b(t.prev, t, t.next) < 0 ? b(t, e, t.next) >= 0 && b(t, t.prev, e) >= 0 : b(t, e, t.prev) < 0 || b(t, t.next, e) < 0
            }
            function A(t, e) {
                var i = t,
                    r = !1,
                    n = (t.x + e.x) / 2,
                    s = (t.y + e.y) / 2;
                do {
                    i.y > s != i.next.y > s && n < (i.next.x - i.x) * (s - i.y) / (i.next.y - i.y) + i.x && (r = !r),
                    i = i.next
                } while (i !== t);
                return r
            }
            function R(t, e) {
                var i = new P(t.i, t.x, t.y),
                    r = new P(e.i, e.x, e.y),
                    n = t.next,
                    s = e.prev;
                return t.next = e, e.prev = t, i.next = n, n.prev = i, r.next = i, i.prev = r, s.next = r, r.prev = s, r
            }
            function C(t, e, i, r) {
                var n = new P(t, e, i);
                return r ? (n.next = r.next, n.prev = r, r.next.prev = n, r.next = n) : (n.prev = n, n.next = n), n
            }
            function M(t) {
                t.next.prev = t.prev,
                t.prev.next = t.next,
                t.prevZ && (t.prevZ.nextZ = t.nextZ),
                t.nextZ && (t.nextZ.prevZ = t.prevZ)
            }
            function P(t, e, i) {
                this.i = t,
                this.x = e,
                this.y = i,
                this.prev = null,
                this.next = null,
                this.z = null,
                this.prevZ = null,
                this.nextZ = null,
                this.steiner = !1
            }
            function O(t, e, i, r) {
                for (var n = 0, s = e, o = i - r; i > s; s += r)
                    n += (t[o] - t[s]) * (t[s + 1] + t[o + 1]),
                    o = s;
                return n
            }
            e.exports = r,
            r.deviation = function(t, e, i, r) {
                var n = e && e.length,
                    s = n ? e[0] * i : t.length,
                    o = Math.abs(O(t, 0, s, i));
                if (n)
                    for (var a = 0, h = e.length; h > a; a++) {
                        var l = e[a] * i,
                            c = h - 1 > a ? e[a + 1] * i : t.length;
                        o -= Math.abs(O(t, l, c, i))
                    }
                var u = 0;
                for (a = 0; a < r.length; a += 3) {
                    var d = r[a] * i,
                        p = r[a + 1] * i,
                        f = r[a + 2] * i;
                    u += Math.abs((t[d] - t[f]) * (t[p + 1] - t[d + 1]) - (t[d] - t[p]) * (t[f + 1] - t[d + 1]))
                }
                return 0 === o && 0 === u ? 0 : Math.abs((u - o) / o)
            },
            r.flatten = function(t) {
                for (var e = t[0][0].length, i = {
                        vertices: [],
                        holes: [],
                        dimensions: e
                    }, r = 0, n = 0; n < t.length; n++) {
                    for (var s = 0; s < t[n].length; s++)
                        for (var o = 0; e > o; o++)
                            i.vertices.push(t[n][s][o]);
                    n > 0 && (r += t[n - 1].length, i.holes.push(r))
                }
                return i
            }
        }, {}],
        3: [function(t, e, i) {
            "use strict";
            function r(t, e, i) {
                this.fn = t,
                this.context = e,
                this.once = i || !1
            }
            function n() {}
            var s = Object.prototype.hasOwnProperty,
                o = "function" != typeof Object.create && "~";
            n.prototype._events = void 0,
            n.prototype.eventNames = function() {
                var t,
                    e = this._events,
                    i = [];
                if (!e)
                    return i;
                for (t in e)
                    s.call(e, t) && i.push(o ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(e)) : i
            },
            n.prototype.listeners = function(t, e) {
                var i = o ? o + t : t,
                    r = this._events && this._events[i];
                if (e)
                    return !!r;
                if (!r)
                    return [];
                if (r.fn)
                    return [r.fn];
                for (var n = 0, s = r.length, a = new Array(s); s > n; n++)
                    a[n] = r[n].fn;
                return a
            },
            n.prototype.emit = function(t, e, i, r, n, s) {
                var a = o ? o + t : t;
                if (!this._events || !this._events[a])
                    return !1;
                var h,
                    l,
                    c = this._events[a],
                    u = arguments.length;
                if ("function" == typeof c.fn) {
                    switch (c.once && this.removeListener(t, c.fn, void 0, !0), u) {
                    case 1:
                        return c.fn.call(c.context), !0;
                    case 2:
                        return c.fn.call(c.context, e), !0;
                    case 3:
                        return c.fn.call(c.context, e, i), !0;
                    case 4:
                        return c.fn.call(c.context, e, i, r), !0;
                    case 5:
                        return c.fn.call(c.context, e, i, r, n), !0;
                    case 6:
                        return c.fn.call(c.context, e, i, r, n, s), !0
                    }
                    for (l = 1, h = new Array(u - 1); u > l; l++)
                        h[l - 1] = arguments[l];
                    c.fn.apply(c.context, h)
                } else {
                    var d,
                        p = c.length;
                    for (l = 0; p > l; l++)
                        switch (c[l].once && this.removeListener(t, c[l].fn, void 0, !0), u) {
                        case 1:
                            c[l].fn.call(c[l].context);
                            break;
                        case 2:
                            c[l].fn.call(c[l].context, e);
                            break;
                        case 3:
                            c[l].fn.call(c[l].context, e, i);
                            break;
                        default:
                            if (!h)
                                for (d = 1, h = new Array(u - 1); u > d; d++)
                                    h[d - 1] = arguments[d];
                            c[l].fn.apply(c[l].context, h)
                        }
                }
                return !0
            },
            n.prototype.on = function(t, e, i) {
                var n = new r(e, i || this),
                    s = o ? o + t : t;
                return this._events || (this._events = o ? {} : Object.create(null)), this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this
            },
            n.prototype.once = function(t, e, i) {
                var n = new r(e, i || this, !0),
                    s = o ? o + t : t;
                return this._events || (this._events = o ? {} : Object.create(null)), this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this
            },
            n.prototype.removeListener = function(t, e, i, r) {
                var n = o ? o + t : t;
                if (!this._events || !this._events[n])
                    return this;
                var s = this._events[n],
                    a = [];
                if (e)
                    if (s.fn)
                        (s.fn !== e || r && !s.once || i && s.context !== i) && a.push(s);
                    else
                        for (var h = 0, l = s.length; l > h; h++)
                            (s[h].fn !== e || r && !s[h].once || i && s[h].context !== i) && a.push(s[h]);
                return a.length ? this._events[n] = 1 === a.length ? a[0] : a : delete this._events[n], this
            },
            n.prototype.removeAllListeners = function(t) {
                return this._events ? (t ? delete this._events[o ? o + t : t] : this._events = o ? {} : Object.create(null), this) : this
            },
            n.prototype.off = n.prototype.removeListener,
            n.prototype.addListener = n.prototype.on,
            n.prototype.setMaxListeners = function() {
                return this
            },
            n.prefixed = o,
            void 0 !== e && (e.exports = n)
        }, {}],
        4: [function(e, i, r) {
            !function(e) {
                var r = /iPhone/i,
                    n = /iPod/i,
                    s = /iPad/i,
                    o = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
                    a = /Android/i,
                    h = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
                    l = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
                    c = /IEMobile/i,
                    u = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
                    d = /BlackBerry/i,
                    p = /BB10/i,
                    f = /Opera Mini/i,
                    _ = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
                    g = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
                    m = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
                    v = function(t, e) {
                        return t.test(e)
                    },
                    y = function(t) {
                        var e = t || navigator.userAgent,
                            i = e.split("[FBAN");
                        return void 0 !== i[1] && (e = i[0]), i = e.split("Twitter"), void 0 !== i[1] && (e = i[0]), this.apple = {
                            phone: v(r, e),
                            ipod: v(n, e),
                            tablet: !v(r, e) && v(s, e),
                            device: v(r, e) || v(n, e) || v(s, e)
                        }, this.amazon = {
                            phone: v(h, e),
                            tablet: !v(h, e) && v(l, e),
                            device: v(h, e) || v(l, e)
                        }, this.android = {
                            phone: v(h, e) || v(o, e),
                            tablet: !v(h, e) && !v(o, e) && (v(l, e) || v(a, e)),
                            device: v(h, e) || v(l, e) || v(o, e) || v(a, e)
                        }, this.windows = {
                            phone: v(c, e),
                            tablet: v(u, e),
                            device: v(c, e) || v(u, e)
                        }, this.other = {
                            blackberry: v(d, e),
                            blackberry10: v(p, e),
                            opera: v(f, e),
                            firefox: v(g, e),
                            chrome: v(_, e),
                            device: v(d, e) || v(p, e) || v(f, e) || v(g, e) || v(_, e)
                        }, this.seven_inch = v(m, e), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
                    },
                    x = function() {
                        var t = new y;
                        return t.Class = y, t
                    };
                void 0 !== i && i.exports && "undefined" == typeof window ? i.exports = y : void 0 !== i && i.exports && "undefined" != typeof window ? i.exports = x() : "function" == typeof t && t.amd ? t("isMobile", [], e.isMobile = x()) : e.isMobile = x()
            }(this)
        }, {}],
        5: [function(t, e, i) {
            "use strict";
            function r(t) {
                if (null === t || void 0 === t)
                    throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }
            function n() {
                try {
                    if (!Object.assign)
                        return !1;
                    var t = new String("abc");
                    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0])
                        return !1;
                    for (var e = {}, i = 0; 10 > i; i++)
                        e["_" + String.fromCharCode(i)] = i;
                    if ("0123456789" !== Object.getOwnPropertyNames(e).map(function(t) {
                        return e[t]
                    }).join(""))
                        return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                        r[t] = t
                    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (t) {
                    return !1
                }
            }
            var s = Object.prototype.hasOwnProperty,
                o = Object.prototype.propertyIsEnumerable;
            e.exports = n() ? Object.assign : function(t, e) {
                for (var i, n, a = r(t), h = 1; h < arguments.length; h++) {
                    i = Object(arguments[h]);
                    for (var l in i)
                        s.call(i, l) && (a[l] = i[l]);
                    if (Object.getOwnPropertySymbols) {
                        n = Object.getOwnPropertySymbols(i);
                        for (var c = 0; c < n.length; c++)
                            o.call(i, n[c]) && (a[n[c]] = i[n[c]])
                    }
                }
                return a
            }
        }, {}],
        6: [function(t, e, i) {
            var r = new ArrayBuffer(0),
                n = function(t, e, i, n) {
                    this.gl = t,
                    this.buffer = t.createBuffer(),
                    this.type = e || t.ARRAY_BUFFER,
                    this.drawType = n || t.STATIC_DRAW,
                    this.data = r,
                    i && this.upload(i)
                };
            n.prototype.upload = function(t, e, i) {
                i || this.bind();
                var r = this.gl;
                t = t || this.data,
                e = e || 0,
                this.data.byteLength >= t.byteLength ? r.bufferSubData(this.type, e, t) : r.bufferData(this.type, t, this.drawType),
                this.data = t
            },
            n.prototype.bind = function() {
                this.gl.bindBuffer(this.type, this.buffer)
            },
            n.createVertexBuffer = function(t, e, i) {
                return new n(t, t.ARRAY_BUFFER, e, i)
            },
            n.createIndexBuffer = function(t, e, i) {
                return new n(t, t.ELEMENT_ARRAY_BUFFER, e, i)
            },
            n.create = function(t, e, i, r) {
                return new n(t, e, r)
            },
            n.prototype.destroy = function() {
                this.gl.deleteBuffer(this.buffer)
            },
            e.exports = n
        }, {}],
        7: [function(t, e, i) {
            var r = t("./GLTexture"),
                n = function(t, e, i) {
                    this.gl = t,
                    this.framebuffer = t.createFramebuffer(),
                    this.stencil = null,
                    this.texture = null,
                    this.width = e || 100,
                    this.height = i || 100
                };
            n.prototype.enableTexture = function(t) {
                var e = this.gl;
                this.texture = t || new r(e),
                this.texture.bind(),
                this.bind(),
                e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texture.texture, 0)
            },
            n.prototype.enableStencil = function() {
                if (!this.stencil) {
                    var t = this.gl;
                    this.stencil = t.createRenderbuffer(),
                    t.bindRenderbuffer(t.RENDERBUFFER, this.stencil),
                    t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencil),
                    t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.width, this.height)
                }
            },
            n.prototype.clear = function(t, e, i, r) {
                this.bind();
                var n = this.gl;
                n.clearColor(t, e, i, r),
                n.clear(n.COLOR_BUFFER_BIT)
            },
            n.prototype.bind = function() {
                var t = this.gl;
                this.texture && this.texture.unbind(),
                t.bindFramebuffer(t.FRAMEBUFFER, this.framebuffer)
            },
            n.prototype.unbind = function() {
                var t = this.gl;
                t.bindFramebuffer(t.FRAMEBUFFER, null)
            },
            n.prototype.resize = function(t, e) {
                var i = this.gl;
                this.width = t,
                this.height = e,
                this.texture && this.texture.uploadData(null, t, e),
                this.stencil && (i.bindRenderbuffer(i.RENDERBUFFER, this.stencil), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, t, e))
            },
            n.prototype.destroy = function() {
                var t = this.gl;
                this.texture && this.texture.destroy(),
                t.deleteFramebuffer(this.framebuffer),
                this.gl = null,
                this.stencil = null,
                this.texture = null
            },
            n.createRGBA = function(t, e, i) {
                var s = r.fromData(t, null, e, i);
                s.enableNearestScaling(),
                s.enableWrapClamp();
                var o = new n(t, e, i);
                return o.enableTexture(s), o.unbind(), o
            },
            n.createFloat32 = function(t, e, i, s) {
                var o = new r.fromData(t, s, e, i);
                o.enableNearestScaling(),
                o.enableWrapClamp();
                var a = new n(t, e, i);
                return a.enableTexture(o), a.unbind(), a
            },
            e.exports = n
        }, {
            "./GLTexture": 9
        }],
        8: [function(t, e, i) {
            var r = t("./shader/compileProgram"),
                n = t("./shader/extractAttributes"),
                s = t("./shader/extractUniforms"),
                o = t("./shader/generateUniformAccessObject"),
                a = function(t, e, i) {
                    this.gl = t,
                    this.program = r(t, e, i),
                    this.attributes = n(t, this.program);
                    var a = s(t, this.program);
                    this.uniforms = o(t, a)
                };
            a.prototype.bind = function() {
                this.gl.useProgram(this.program)
            },
            a.prototype.destroy = function() {},
            e.exports = a
        }, {
            "./shader/compileProgram": 14,
            "./shader/extractAttributes": 16,
            "./shader/extractUniforms": 17,
            "./shader/generateUniformAccessObject": 18
        }],
        9: [function(t, e, i) {
            var r = function(t, e, i, r, n) {
                this.gl = t,
                this.texture = t.createTexture(),
                this.mipmap = !1,
                this.premultiplyAlpha = !1,
                this.width = e || 0,
                this.height = i || 0,
                this.format = r || t.RGBA,
                this.type = n || t.UNSIGNED_BYTE
            };
            r.prototype.upload = function(t) {
                this.bind();
                var e = this.gl;
                this.width = t.videoWidth || t.width,
                this.height = t.videoHeight || t.height,
                e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha),
                e.texImage2D(e.TEXTURE_2D, 0, this.format, this.format, this.type, t)
            };
            var n = !1;
            r.prototype.uploadData = function(t, e, i) {
                this.bind();
                var r = this.gl;
                if (this.width = e || this.width, this.height = i || this.height, t instanceof Float32Array) {
                    if (!n) {
                        if (!r.getExtension("OES_texture_float"))
                            throw new Error("floating point textures not available");
                        n = !0
                    }
                    this.type = r.FLOAT
                } else
                    this.type = r.UNSIGNED_BYTE;
                r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha),
                r.texImage2D(r.TEXTURE_2D, 0, this.format, this.width, this.height, 0, this.format, this.type, t || null)
            },
            r.prototype.bind = function(t) {
                var e = this.gl;
                void 0 !== t && e.activeTexture(e.TEXTURE0 + t),
                e.bindTexture(e.TEXTURE_2D, this.texture)
            },
            r.prototype.unbind = function() {
                var t = this.gl;
                t.bindTexture(t.TEXTURE_2D, null)
            },
            r.prototype.minFilter = function(t) {
                var e = this.gl;
                this.bind(),
                this.mipmap ? e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST) : e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t ? e.LINEAR : e.NEAREST)
            },
            r.prototype.magFilter = function(t) {
                var e = this.gl;
                this.bind(),
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t ? e.LINEAR : e.NEAREST)
            },
            r.prototype.enableMipmap = function() {
                var t = this.gl;
                this.bind(),
                this.mipmap = !0,
                t.generateMipmap(t.TEXTURE_2D)
            },
            r.prototype.enableLinearScaling = function() {
                this.minFilter(!0),
                this.magFilter(!0)
            },
            r.prototype.enableNearestScaling = function() {
                this.minFilter(!1),
                this.magFilter(!1)
            },
            r.prototype.enableWrapClamp = function() {
                var t = this.gl;
                this.bind(),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)
            },
            r.prototype.enableWrapRepeat = function() {
                var t = this.gl;
                this.bind(),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT)
            },
            r.prototype.enableWrapMirrorRepeat = function() {
                var t = this.gl;
                this.bind(),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.MIRRORED_REPEAT),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.MIRRORED_REPEAT)
            },
            r.prototype.destroy = function() {
                this.gl.deleteTexture(this.texture)
            },
            r.fromSource = function(t, e, i) {
                var n = new r(t);
                return n.premultiplyAlpha = i || !1, n.upload(e), n
            },
            r.fromData = function(t, e, i, n) {
                var s = new r(t);
                return s.uploadData(e, i, n), s
            },
            e.exports = r
        }, {}],
        10: [function(t, e, i) {
            function r(t, e) {
                if (this.nativeVaoExtension = null, r.FORCE_NATIVE || (this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")), this.nativeState = e, this.nativeVaoExtension) {
                    this.nativeVao = this.nativeVaoExtension.createVertexArrayOES();
                    var i = t.getParameter(t.MAX_VERTEX_ATTRIBS);
                    this.nativeState = {
                        tempAttribState: new Array(i),
                        attribState: new Array(i)
                    }
                }
                this.gl = t,
                this.attributes = [],
                this.indexBuffer = null,
                this.dirty = !1
            }
            var n = t("./setVertexAttribArrays");
            r.prototype.constructor = r,
            e.exports = r,
            r.FORCE_NATIVE = !1,
            r.prototype.bind = function() {
                return this.nativeVao ? (this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.dirty && (this.dirty = !1, this.activate())) : this.activate(), this
            },
            r.prototype.unbind = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(null), this
            },
            r.prototype.activate = function() {
                for (var t = this.gl, e = null, i = 0; i < this.attributes.length; i++) {
                    var r = this.attributes[i];
                    e !== r.buffer && (r.buffer.bind(), e = r.buffer),
                    t.vertexAttribPointer(r.attribute.location, r.attribute.size, r.type || t.FLOAT, r.normalized || !1, r.stride || 0, r.start || 0)
                }
                return n(t, this.attributes, this.nativeState), this.indexBuffer.bind(), this
            },
            r.prototype.addAttribute = function(t, e, i, r, n, s) {
                return this.attributes.push({
                    buffer: t,
                    attribute: e,
                    location: e.location,
                    type: i || this.gl.FLOAT,
                    normalized: r || !1,
                    stride: n || 0,
                    start: s || 0
                }), this.dirty = !0, this
            },
            r.prototype.addIndex = function(t) {
                return this.indexBuffer = t, this.dirty = !0, this
            },
            r.prototype.clear = function() {
                return this.nativeVao && this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao), this.attributes.length = 0, this.indexBuffer = null, this
            },
            r.prototype.draw = function(t, e, i) {
                var r = this.gl;
                return r.drawElements(t, e, r.UNSIGNED_SHORT, i || 0), this
            },
            r.prototype.destroy = function() {
                this.gl = null,
                this.indexBuffer = null,
                this.attributes = null,
                this.nativeState = null,
                this.nativeVao && this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao),
                this.nativeVaoExtension = null,
                this.nativeVao = null
            }
        }, {
            "./setVertexAttribArrays": 13
        }],
        11: [function(t, e, i) {
            var r = function(t, e) {
                var i = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
                if (!i)
                    throw new Error("This browser does not support webGL. Try using the canvas renderer");
                return i
            };
            e.exports = r
        }, {}],
        12: [function(t, e, i) {
            var r = {
                createContext: t("./createContext"),
                setVertexAttribArrays: t("./setVertexAttribArrays"),
                GLBuffer: t("./GLBuffer"),
                GLFramebuffer: t("./GLFramebuffer"),
                GLShader: t("./GLShader"),
                GLTexture: t("./GLTexture"),
                VertexArrayObject: t("./VertexArrayObject"),
                shader: t("./shader")
            };
            void 0 !== e && e.exports && (e.exports = r),
            "undefined" != typeof window && (window.pixi = {
                gl: r
            })
        }, {
            "./GLBuffer": 6,
            "./GLFramebuffer": 7,
            "./GLShader": 8,
            "./GLTexture": 9,
            "./VertexArrayObject": 10,
            "./createContext": 11,
            "./setVertexAttribArrays": 13,
            "./shader": 19
        }],
        13: [function(t, e, i) {
            var r = function(t, e, i) {
                var r;
                if (i) {
                    var n = i.tempAttribState,
                        s = i.attribState;
                    for (r = 0; r < n.length; r++)
                        n[r] = !1;
                    for (r = 0; r < e.length; r++)
                        n[e[r].attribute.location] = !0;
                    for (r = 0; r < s.length; r++)
                        s[r] !== n[r] && (s[r] = n[r], i.attribState[r] ? t.enableVertexAttribArray(r) : t.disableVertexAttribArray(r))
                } else
                    for (r = 0; r < e.length; r++) {
                        var o = e[r];
                        t.enableVertexAttribArray(o.attribute.location)
                    }
            };
            e.exports = r
        }, {}],
        14: [function(t, e, i) {
            var r = function(t, e, i) {
                    var r = n(t, t.VERTEX_SHADER, e),
                        s = n(t, t.FRAGMENT_SHADER, i),
                        o = t.createProgram();
                    return t.attachShader(o, r), t.attachShader(o, s), t.linkProgram(o), t.getProgramParameter(o, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(o, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(o) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(o)), t.deleteProgram(o), o = null), t.deleteShader(r), t.deleteShader(s), o
                },
                n = function(t, e, i) {
                    var r = t.createShader(e);
                    return t.shaderSource(r, i), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (console.log(t.getShaderInfoLog(r)), null)
                };
            e.exports = r
        }, {}],
        15: [function(t, e, i) {
            var r = function(t, e) {
                    switch (t) {
                    case "float":
                        return 0;
                    case "vec2":
                        return new Float32Array(2 * e);
                    case "vec3":
                        return new Float32Array(3 * e);
                    case "vec4":
                        return new Float32Array(4 * e);
                    case "int":
                    case "sampler2D":
                        return 0;
                    case "ivec2":
                        return new Int32Array(2 * e);
                    case "ivec3":
                        return new Int32Array(3 * e);
                    case "ivec4":
                        return new Int32Array(4 * e);
                    case "bool":
                        return !1;
                    case "bvec2":
                        return n(2 * e);
                    case "bvec3":
                        return n(3 * e);
                    case "bvec4":
                        return n(4 * e);
                    case "mat2":
                        return new Float32Array([1, 0, 0, 1]);
                    case "mat3":
                        return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                    case "mat4":
                        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                    }
                },
                n = function(t) {
                    for (var e = new Array(t), i = 0; i < e.length; i++)
                        e[i] = !1;
                    return e
                };
            e.exports = r
        }, {}],
        16: [function(t, e, i) {
            var r = t("./mapType"),
                n = t("./mapSize"),
                s = function(t, e) {
                    for (var i = {}, s = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), a = 0; s > a; a++) {
                        var h = t.getActiveAttrib(e, a),
                            l = r(t, h.type);
                        i[h.name] = {
                            type: l,
                            size: n(l),
                            location: t.getAttribLocation(e, h.name),
                            pointer: o
                        }
                    }
                    return i
                },
                o = function(t, e, i, r) {
                    gl.vertexAttribPointer(this.location, this.size, t || gl.FLOAT, e || !1, i || 0, r || 0)
                };
            e.exports = s
        }, {
            "./mapSize": 20,
            "./mapType": 21
        }],
        17: [function(t, e, i) {
            var r = t("./mapType"),
                n = t("./defaultValue"),
                s = function(t, e) {
                    for (var i = {}, s = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), o = 0; s > o; o++) {
                        var a = t.getActiveUniform(e, o),
                            h = a.name.replace(/\[.*?\]/, ""),
                            l = r(t, a.type);
                        i[h] = {
                            type: l,
                            size: a.size,
                            location: t.getUniformLocation(e, h),
                            value: n(l, a.size)
                        }
                    }
                    return i
                };
            e.exports = s
        }, {
            "./defaultValue": 15,
            "./mapType": 21
        }],
        18: [function(t, e, i) {
            var r = function(t, e) {
                    var i = {
                        data: {}
                    };
                    i.gl = t;
                    for (var r = Object.keys(e), a = 0; a < r.length; a++) {
                        var h = r[a],
                            l = h.split("."),
                            c = l[l.length - 1],
                            u = o(l, i),
                            d = e[h];
                        u.data[c] = d,
                        u.gl = t,
                        Object.defineProperty(u, c, {
                            get: n(c),
                            set: s(c, d)
                        })
                    }
                    return i
                },
                n = function(t) {
                    var e = a.replace("%%", t);
                    return new Function(e)
                },
                s = function(t, e) {
                    var i,
                        r = h.replace(/%%/g, t);
                    return i = 1 === e.size ? l[e.type] : c[e.type], i && (r += "\nthis.gl." + i + ";"), new Function("value", r)
                },
                o = function(t, e) {
                    for (var i = e, r = 0; r < t.length - 1; r++) {
                        var n = i[t[r]] || {
                            data: {}
                        };
                        i[t[r]] = n,
                        i = n
                    }
                    return i
                },
                a = ["return this.data.%%.value;"].join("\n"),
                h = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n"),
                l = {
                    float: "uniform1f(location, value)",
                    vec2: "uniform2f(location, value[0], value[1])",
                    vec3: "uniform3f(location, value[0], value[1], value[2])",
                    vec4: "uniform4f(location, value[0], value[1], value[2], value[3])",
                    int: "uniform1i(location, value)",
                    ivec2: "uniform2i(location, value[0], value[1])",
                    ivec3: "uniform3i(location, value[0], value[1], value[2])",
                    ivec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                    bool: "uniform1i(location, value)",
                    bvec2: "uniform2i(location, value[0], value[1])",
                    bvec3: "uniform3i(location, value[0], value[1], value[2])",
                    bvec4: "uniform4i(location, value[0], value[1], value[2], value[3])",
                    mat2: "uniformMatrix2fv(location, false, value)",
                    mat3: "uniformMatrix3fv(location, false, value)",
                    mat4: "uniformMatrix4fv(location, false, value)",
                    sampler2D: "uniform1i(location, value)"
                },
                c = {
                    float: "uniform1fv(location, value)",
                    vec2: "uniform2fv(location, value)",
                    vec3: "uniform3fv(location, value)",
                    vec4: "uniform4fv(location, value)",
                    int: "uniform1iv(location, value)",
                    ivec2: "uniform2iv(location, value)",
                    ivec3: "uniform3iv(location, value)",
                    ivec4: "uniform4iv(location, value)",
                    bool: "uniform1iv(location, value)",
                    bvec2: "uniform2iv(location, value)",
                    bvec3: "uniform3iv(location, value)",
                    bvec4: "uniform4iv(location, value)",
                    sampler2D: "uniform1iv(location, value)"
                };
            e.exports = r
        }, {}],
        19: [function(t, e, i) {
            e.exports = {
                compileProgram: t("./compileProgram"),
                defaultValue: t("./defaultValue"),
                extractAttributes: t("./extractAttributes"),
                extractUniforms: t("./extractUniforms"),
                generateUniformAccessObject: t("./generateUniformAccessObject"),
                mapSize: t("./mapSize"),
                mapType: t("./mapType")
            }
        }, {
            "./compileProgram": 14,
            "./defaultValue": 15,
            "./extractAttributes": 16,
            "./extractUniforms": 17,
            "./generateUniformAccessObject": 18,
            "./mapSize": 20,
            "./mapType": 21
        }],
        20: [function(t, e, i) {
            var r = function(t) {
                    return n[t]
                },
                n = {
                    float: 1,
                    vec2: 2,
                    vec3: 3,
                    vec4: 4,
                    int: 1,
                    ivec2: 2,
                    ivec3: 3,
                    ivec4: 4,
                    bool: 1,
                    bvec2: 2,
                    bvec3: 3,
                    bvec4: 4,
                    mat2: 4,
                    mat3: 9,
                    mat4: 16,
                    sampler2D: 1
                };
            e.exports = r
        }, {}],
        21: [function(t, e, i) {
            var r = function(t, e) {
                    if (!n) {
                        var i = Object.keys(s);
                        n = {};
                        for (var r = 0; r < i.length; ++r) {
                            var o = i[r];
                            n[t[o]] = s[o]
                        }
                    }
                    return n[e]
                },
                n = null,
                s = {
                    FLOAT: "float",
                    FLOAT_VEC2: "vec2",
                    FLOAT_VEC3: "vec3",
                    FLOAT_VEC4: "vec4",
                    INT: "int",
                    INT_VEC2: "ivec2",
                    INT_VEC3: "ivec3",
                    INT_VEC4: "ivec4",
                    BOOL: "bool",
                    BOOL_VEC2: "bvec2",
                    BOOL_VEC3: "bvec3",
                    BOOL_VEC4: "bvec4",
                    FLOAT_MAT2: "mat2",
                    FLOAT_MAT3: "mat3",
                    FLOAT_MAT4: "mat4",
                    SAMPLER_2D: "sampler2D"
                };
            e.exports = r
        }, {}],
        22: [function(t, e, i) {
            (function(t) {
                function e(t, e) {
                    for (var i = 0, r = t.length - 1; r >= 0; r--) {
                        var n = t[r];
                        "." === n ? t.splice(r, 1) : ".." === n ? (t.splice(r, 1), i++) : i && (t.splice(r, 1), i--)
                    }
                    if (e)
                        for (; i--; i)
                            t.unshift("..");
                    return t
                }
                function r(t, e) {
                    if (t.filter)
                        return t.filter(e);
                    for (var i = [], r = 0; r < t.length; r++)
                        e(t[r], r, t) && i.push(t[r]);
                    return i
                }
                var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                    s = function(t) {
                        return n.exec(t).slice(1)
                    };
                i.resolve = function() {
                    for (var i = "", n = !1, s = arguments.length - 1; s >= -1 && !n; s--) {
                        var o = s >= 0 ? arguments[s] : t.cwd();
                        if ("string" != typeof o)
                            throw new TypeError("Arguments to path.resolve must be strings");
                        o && (i = o + "/" + i, n = "/" === o.charAt(0))
                    }
                    return i = e(r(i.split("/"), function(t) {
                        return !!t
                    }), !n).join("/"), (n ? "/" : "") + i || "."
                },
                i.normalize = function(t) {
                    var n = i.isAbsolute(t),
                        s = "/" === o(t, -1);
                    return t = e(r(t.split("/"), function(t) {
                        return !!t
                    }), !n).join("/"), t || n || (t = "."), t && s && (t += "/"), (n ? "/" : "") + t
                },
                i.isAbsolute = function(t) {
                    return "/" === t.charAt(0)
                },
                i.join = function() {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return i.normalize(r(t, function(t, e) {
                        if ("string" != typeof t)
                            throw new TypeError("Arguments to path.join must be strings");
                        return t
                    }).join("/"))
                },
                i.relative = function(t, e) {
                    function r(t) {
                        for (var e = 0; e < t.length && "" === t[e]; e++)
                            ;
                        for (var i = t.length - 1; i >= 0 && "" === t[i]; i--)
                            ;
                        return e > i ? [] : t.slice(e, i - e + 1)
                    }
                    t = i.resolve(t).substr(1),
                    e = i.resolve(e).substr(1);
                    for (var n = r(t.split("/")), s = r(e.split("/")), o = Math.min(n.length, s.length), a = o, h = 0; o > h; h++)
                        if (n[h] !== s[h]) {
                            a = h;
                            break
                        }
                    for (var l = [], h = a; h < n.length; h++)
                        l.push("..");
                    return l = l.concat(s.slice(a)), l.join("/")
                },
                i.sep = "/",
                i.delimiter = ":",
                i.dirname = function(t) {
                    var e = s(t),
                        i = e[0],
                        r = e[1];
                    return i || r ? (r && (r = r.substr(0, r.length - 1)), i + r) : "."
                },
                i.basename = function(t, e) {
                    var i = s(t)[2];
                    return e && i.substr(-1 * e.length) === e && (i = i.substr(0, i.length - e.length)), i
                },
                i.extname = function(t) {
                    return s(t)[3]
                };
                var o = "b" === "ab".substr(-1) ? function(t, e, i) {
                    return t.substr(e, i)
                } : function(t, e, i) {
                    return 0 > e && (e = t.length + e), t.substr(e, i)
                }
            }).call(this, t("_process"))
        }, {
            _process: 23
        }],
        23: [function(t, e, i) {
            function r(t) {
                if (l === setTimeout)
                    return setTimeout(t, 0);
                try {
                    return l(t, 0)
                } catch (e) {
                    try {
                        return l.call(null, t, 0)
                    } catch (e) {
                        return l.call(this, t, 0)
                    }
                }
            }
            function n(t) {
                if (c === clearTimeout)
                    return clearTimeout(t);
                try {
                    return c(t)
                } catch (e) {
                    try {
                        return c.call(null, t)
                    } catch (e) {
                        return c.call(this, t)
                    }
                }
            }
            function s() {
                f && d && (f = !1, d.length ? p = d.concat(p) : _ = -1, p.length && o())
            }
            function o() {
                if (!f) {
                    var t = r(s);
                    f = !0;
                    for (var e = p.length; e;) {
                        for (d = p, p = []; ++_ < e;)
                            d && d[_].run();
                        _ = -1,
                        e = p.length
                    }
                    d = null,
                    f = !1,
                    n(t)
                }
            }
            function a(t, e) {
                this.fun = t,
                this.array = e
            }
            function h() {}
            var l,
                c,
                u = e.exports = {};
            !function() {
                try {
                    l = setTimeout
                } catch (t) {
                    l = function() {
                        throw new Error("setTimeout is not defined")
                    }
                }
                try {
                    c = clearTimeout
                } catch (t) {
                    c = function() {
                        throw new Error("clearTimeout is not defined")
                    }
                }
            }();
            var d,
                p = [],
                f = !1,
                _ = -1;
            u.nextTick = function(t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var i = 1; i < arguments.length; i++)
                        e[i - 1] = arguments[i];
                p.push(new a(t, e)),
                1 !== p.length || f || r(o)
            },
            a.prototype.run = function() {
                this.fun.apply(null, this.array)
            },
            u.title = "browser",
            u.browser = !0,
            u.env = {},
            u.argv = [],
            u.version = "",
            u.versions = {},
            u.on = h,
            u.addListener = h,
            u.once = h,
            u.off = h,
            u.removeListener = h,
            u.removeAllListeners = h,
            u.emit = h,
            u.binding = function(t) {
                throw new Error("process.binding is not supported")
            },
            u.cwd = function() {
                return "/"
            },
            u.chdir = function(t) {
                throw new Error("process.chdir is not supported")
            },
            u.umask = function() {
                return 0
            }
        }, {}],
        24: [function(e, i, r) {
            (function(e) {
                !function(n) {
                    function s(t) {
                        throw new RangeError(k[t])
                    }
                    function o(t, e) {
                        for (var i = t.length, r = []; i--;)
                            r[i] = e(t[i]);
                        return r
                    }
                    function a(t, e) {
                        var i = t.split("@"),
                            r = "";
                        return i.length > 1 && (r = i[0] + "@", t = i[1]), t = t.replace(L, "."), r + o(t.split("."), e).join(".")
                    }
                    function h(t) {
                        for (var e, i, r = [], n = 0, s = t.length; s > n;)
                            e = t.charCodeAt(n++),
                            e >= 55296 && 56319 >= e && s > n ? (i = t.charCodeAt(n++), 56320 == (64512 & i) ? r.push(((1023 & e) << 10) + (1023 & i) + 65536) : (r.push(e), n--)) : r.push(e);
                        return r
                    }
                    function l(t) {
                        return o(t, function(t) {
                            var e = "";
                            return t > 65535 && (t -= 65536, e += N(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += N(t)
                        }).join("")
                    }
                    function c(t) {
                        return 10 > t - 48 ? t - 22 : 26 > t - 65 ? t - 65 : 26 > t - 97 ? t - 97 : w
                    }
                    function u(t, e) {
                        return t + 22 + 75 * (26 > t) - ((0 != e) << 5)
                    }
                    function d(t, e, i) {
                        var r = 0;
                        for (t = i ? F(t / R) : t >> 1, t += F(t / e); t > I * E >> 1; r += w)
                            t = F(t / I);
                        return F(r + (I + 1) * t / (t + A))
                    }
                    function p(t) {
                        var e,
                            i,
                            r,
                            n,
                            o,
                            a,
                            h,
                            u,
                            p,
                            f,
                            _ = [],
                            g = t.length,
                            m = 0,
                            v = M,
                            y = C;
                        for (i = t.lastIndexOf(P), 0 > i && (i = 0), r = 0; i > r; ++r)
                            t.charCodeAt(r) >= 128 && s("not-basic"),
                            _.push(t.charCodeAt(r));
                        for (n = i > 0 ? i + 1 : 0; g > n;) {
                            for (o = m, a = 1, h = w; n >= g && s("invalid-input"), u = c(t.charCodeAt(n++)), (u >= w || u > F((T - m) / a)) && s("overflow"), m += u * a, !((p = y >= h ? S : h >= y + E ? E : h - y) > u); h += w)
                                f = w - p,
                                a > F(T / f) && s("overflow"),
                                a *= f;
                            e = _.length + 1,
                            y = d(m - o, e, 0 == o),
                            F(m / e) > T - v && s("overflow"),
                            v += F(m / e),
                            m %= e,
                            _.splice(m++, 0, v)
                        }
                        return l(_)
                    }
                    function f(t) {
                        var e,
                            i,
                            r,
                            n,
                            o,
                            a,
                            l,
                            c,
                            p,
                            f,
                            _,
                            g,
                            m,
                            v,
                            y,
                            x = [];
                        for (t = h(t), g = t.length, e = M, i = 0, o = C, a = 0; g > a; ++a)
                            128 > (_ = t[a]) && x.push(N(_));
                        for (r = n = x.length, n && x.push(P); g > r;) {
                            for (l = T, a = 0; g > a; ++a)
                                (_ = t[a]) >= e && l > _ && (l = _);
                            for (m = r + 1, l - e > F((T - i) / m) && s("overflow"), i += (l - e) * m, e = l, a = 0; g > a; ++a)
                                if (_ = t[a], e > _ && ++i > T && s("overflow"), _ == e) {
                                    for (c = i, p = w; !((f = o >= p ? S : p >= o + E ? E : p - o) > c); p += w)
                                        y = c - f,
                                        v = w - f,
                                        x.push(N(u(f + y % v, 0))),
                                        c = F(y / v);
                                    x.push(N(u(c, 0))),
                                    o = d(i, m, r == n),
                                    i = 0,
                                    ++r
                                }
                            ++i,
                            ++e
                        }
                        return x.join("")
                    }
                    function _(t) {
                        return a(t, function(t) {
                            return O.test(t) ? p(t.slice(4).toLowerCase()) : t
                        })
                    }
                    function g(t) {
                        return a(t, function(t) {
                            return D.test(t) ? "xn--" + f(t) : t
                        })
                    }
                    var m = "object" == typeof r && r && !r.nodeType && r,
                        v = "object" == typeof i && i && !i.nodeType && i,
                        y = "object" == typeof e && e;
                    y.global !== y && y.window !== y && y.self !== y || (n = y);
                    var x,
                        b,
                        T = 2147483647,
                        w = 36,
                        S = 1,
                        E = 26,
                        A = 38,
                        R = 700,
                        C = 72,
                        M = 128,
                        P = "-",
                        O = /^xn--/,
                        D = /[^\x20-\x7E]/,
                        L = /[\x2E\u3002\uFF0E\uFF61]/g,
                        k = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                            "invalid-input": "Invalid input"
                        },
                        I = w - S,
                        F = Math.floor,
                        N = String.fromCharCode;
                    if (x = {
                        version: "1.4.1",
                        ucs2: {
                            decode: h,
                            encode: l
                        },
                        decode: p,
                        encode: f,
                        toASCII: g,
                        toUnicode: _
                    }, "function" == typeof t && "object" == typeof t.amd && t.amd)
                        t("punycode", function() {
                            return x
                        });
                    else if (m && v)
                        if (i.exports == m)
                            v.exports = x;
                        else
                            for (b in x)
                                x.hasOwnProperty(b) && (m[b] = x[b]);
                    else
                        n.punycode = x
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        25: [function(t, e, i) {
            "use strict";
            function r(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            e.exports = function(t, e, i, s) {
                e = e || "&",
                i = i || "=";
                var o = {};
                if ("string" != typeof t || 0 === t.length)
                    return o;
                var a = /\+/g;
                t = t.split(e);
                var h = 1e3;
                s && "number" == typeof s.maxKeys && (h = s.maxKeys);
                var l = t.length;
                h > 0 && l > h && (l = h);
                for (var c = 0; l > c; ++c) {
                    var u,
                        d,
                        p,
                        f,
                        _ = t[c].replace(a, "%20"),
                        g = _.indexOf(i);
                    g >= 0 ? (u = _.substr(0, g), d = _.substr(g + 1)) : (u = _, d = ""),
                    p = decodeURIComponent(u),
                    f = decodeURIComponent(d),
                    r(o, p) ? n(o[p]) ? o[p].push(f) : o[p] = [o[p], f] : o[p] = f
                }
                return o
            };
            var n = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}],
        26: [function(t, e, i) {
            "use strict";
            function r(t, e) {
                if (t.map)
                    return t.map(e);
                for (var i = [], r = 0; r < t.length; r++)
                    i.push(e(t[r], r));
                return i
            }
            var n = function(t) {
                switch (typeof t) {
                case "string":
                    return t;
                case "boolean":
                    return t ? "true" : "false";
                case "number":
                    return isFinite(t) ? t : "";
                default:
                    return ""
                }
            };
            e.exports = function(t, e, i, a) {
                return e = e || "&", i = i || "=", null === t && (t = void 0), "object" == typeof t ? r(o(t), function(o) {
                    var a = encodeURIComponent(n(o)) + i;
                    return s(t[o]) ? r(t[o], function(t) {
                        return a + encodeURIComponent(n(t))
                    }).join(e) : a + encodeURIComponent(n(t[o]))
                }).join(e) : a ? encodeURIComponent(n(a)) + i + encodeURIComponent(n(t)) : ""
            };
            var s = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                o = Object.keys || function(t) {
                    var e = [];
                    for (var i in t)
                        Object.prototype.hasOwnProperty.call(t, i) && e.push(i);
                    return e
                }
        }, {}],
        27: [function(t, e, i) {
            "use strict";
            i.decode = i.parse = t("./decode"),
            i.encode = i.stringify = t("./encode")
        }, {
            "./decode": 25,
            "./encode": 26
        }],
        28: [function(t, e, i) {
            "use strict";
            function r() {
                this.protocol = null,
                this.slashes = null,
                this.auth = null,
                this.host = null,
                this.port = null,
                this.hostname = null,
                this.hash = null,
                this.search = null,
                this.query = null,
                this.pathname = null,
                this.path = null,
                this.href = null
            }
            function n(t, e, i) {
                if (t && l.isObject(t) && t instanceof r)
                    return t;
                var n = new r;
                return n.parse(t, e, i), n
            }
            function s(t) {
                return l.isString(t) && (t = n(t)), t instanceof r ? t.format() : r.prototype.format.call(t)
            }
            function o(t, e) {
                return n(t, !1, !0).resolve(e)
            }
            function a(t, e) {
                return t ? n(t, !1, !0).resolveObject(e) : e
            }
            var h = t("punycode"),
                l = t("./util");
            i.parse = n,
            i.resolve = o,
            i.resolveObject = a,
            i.format = s,
            i.Url = r;
            var c = /^([a-z0-9.+-]+:)/i,
                u = /:[0-9]*$/,
                d = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
                f = ["{", "}", "|", "\\", "^", "`"].concat(p),
                _ = ["'"].concat(f),
                g = ["%", "/", "?", ";", "#"].concat(_),
                m = ["/", "?", "#"],
                v = /^[+a-z0-9A-Z_-]{0,63}$/,
                y = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                x = {
                    javascript: !0,
                    "javascript:": !0
                },
                b = {
                    javascript: !0,
                    "javascript:": !0
                },
                T = {
                    http: !0,
                    https: !0,
                    ftp: !0,
                    gopher: !0,
                    file: !0,
                    "http:": !0,
                    "https:": !0,
                    "ftp:": !0,
                    "gopher:": !0,
                    "file:": !0
                },
                w = t("querystring");
            r.prototype.parse = function(t, e, i) {
                if (!l.isString(t))
                    throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var r = t.indexOf("?"),
                    n = -1 !== r && r < t.indexOf("#") ? "?" : "#",
                    s = t.split(n),
                    o = /\\/g;
                s[0] = s[0].replace(o, "/"),
                t = s.join(n);
                var a = t;
                if (a = a.trim(), !i && 1 === t.split("#").length) {
                    var u = d.exec(a);
                    if (u)
                        return this.path = a, this.href = a, this.pathname = u[1], u[2] ? (this.search = u[2], this.query = e ? w.parse(this.search.substr(1)) : this.search.substr(1)) : e && (this.search = "", this.query = {}), this
                }
                var p = c.exec(a);
                if (p) {
                    p = p[0];
                    var f = p.toLowerCase();
                    this.protocol = f,
                    a = a.substr(p.length)
                }
                if (i || p || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var S = "//" === a.substr(0, 2);
                    !S || p && b[p] || (a = a.substr(2), this.slashes = !0)
                }
                if (!b[p] && (S || p && !T[p])) {
                    for (var E = -1, A = 0; A < m.length; A++) {
                        var R = a.indexOf(m[A]);
                        -1 !== R && (-1 === E || E > R) && (E = R)
                    }
                    var C,
                        M;
                    M = -1 === E ? a.lastIndexOf("@") : a.lastIndexOf("@", E),
                    -1 !== M && (C = a.slice(0, M), a = a.slice(M + 1), this.auth = decodeURIComponent(C)),
                    E = -1;
                    for (var A = 0; A < g.length; A++) {
                        var R = a.indexOf(g[A]);
                        -1 !== R && (-1 === E || E > R) && (E = R)
                    }
                    -1 === E && (E = a.length),
                    this.host = a.slice(0, E),
                    a = a.slice(E),
                    this.parseHost(),
                    this.hostname = this.hostname || "";
                    var P = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!P)
                        for (var O = this.hostname.split(/\./), A = 0, D = O.length; D > A; A++) {
                            var L = O[A];
                            if (L && !L.match(v)) {
                                for (var k = "", I = 0, F = L.length; F > I; I++)
                                    k += L.charCodeAt(I) > 127 ? "x" : L[I];
                                if (!k.match(v)) {
                                    var N = O.slice(0, A),
                                        B = O.slice(A + 1),
                                        U = L.match(y);
                                    U && (N.push(U[1]), B.unshift(U[2])),
                                    B.length && (a = "/" + B.join(".") + a),
                                    this.hostname = N.join(".");
                                    break
                                }
                            }
                        }
                    this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(),
                    P || (this.hostname = h.toASCII(this.hostname));
                    var j = this.port ? ":" + this.port : "",
                        X = this.hostname || "";
                    this.host = X + j,
                    this.href += this.host,
                    P && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== a[0] && (a = "/" + a))
                }
                if (!x[f])
                    for (var A = 0, D = _.length; D > A; A++) {
                        var G = _[A];
                        if (-1 !== a.indexOf(G)) {
                            var z = encodeURIComponent(G);
                            z === G && (z = escape(G)),
                            a = a.split(G).join(z)
                        }
                    }
                var W = a.indexOf("#");
                -1 !== W && (this.hash = a.substr(W), a = a.slice(0, W));
                var V = a.indexOf("?");
                if (-1 !== V ? (this.search = a.substr(V), this.query = a.substr(V + 1), e && (this.query = w.parse(this.query)), a = a.slice(0, V)) : e && (this.search = "", this.query = {}), a && (this.pathname = a), T[f] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    var j = this.pathname || "",
                        Y = this.search || "";
                    this.path = j + Y
                }
                return this.href = this.format(), this
            },
            r.prototype.format = function() {
                var t = this.auth || "";
                t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
                var e = this.protocol || "",
                    i = this.pathname || "",
                    r = this.hash || "",
                    n = !1,
                    s = "";
                this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)),
                this.query && l.isObject(this.query) && Object.keys(this.query).length && (s = w.stringify(this.query));
                var o = this.search || s && "?" + s || "";
                return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || T[e]) && !1 !== n ? (n = "//" + (n || ""), i && "/" !== i.charAt(0) && (i = "/" + i)) : n || (n = ""), r && "#" !== r.charAt(0) && (r = "#" + r), o && "?" !== o.charAt(0) && (o = "?" + o), i = i.replace(/[?#]/g, function(t) {
                    return encodeURIComponent(t)
                }), o = o.replace("#", "%23"), e + n + i + o + r
            },
            r.prototype.resolve = function(t) {
                return this.resolveObject(n(t, !1, !0)).format()
            },
            r.prototype.resolveObject = function(t) {
                if (l.isString(t)) {
                    var e = new r;
                    e.parse(t, !1, !0),
                    t = e
                }
                for (var i = new r, n = Object.keys(this), s = 0; s < n.length; s++) {
                    var o = n[s];
                    i[o] = this[o]
                }
                if (i.hash = t.hash, "" === t.href)
                    return i.href = i.format(), i;
                if (t.slashes && !t.protocol) {
                    for (var a = Object.keys(t), h = 0; h < a.length; h++) {
                        var c = a[h];
                        "protocol" !== c && (i[c] = t[c])
                    }
                    return T[i.protocol] && i.hostname && !i.pathname && (i.path = i.pathname = "/"), i.href = i.format(), i
                }
                if (t.protocol && t.protocol !== i.protocol) {
                    if (!T[t.protocol]) {
                        for (var u = Object.keys(t), d = 0; d < u.length; d++) {
                            var p = u[d];
                            i[p] = t[p]
                        }
                        return i.href = i.format(), i
                    }
                    if (i.protocol = t.protocol, t.host || b[t.protocol])
                        i.pathname = t.pathname;
                    else {
                        for (var f = (t.pathname || "").split("/"); f.length && !(t.host = f.shift());)
                            ;
                        t.host || (t.host = ""),
                        t.hostname || (t.hostname = ""),
                        "" !== f[0] && f.unshift(""),
                        f.length < 2 && f.unshift(""),
                        i.pathname = f.join("/")
                    }
                    if (i.search = t.search, i.query = t.query, i.host = t.host || "", i.auth = t.auth, i.hostname = t.hostname || t.host, i.port = t.port, i.pathname || i.search) {
                        var _ = i.pathname || "",
                            g = i.search || "";
                        i.path = _ + g
                    }
                    return i.slashes = i.slashes || t.slashes, i.href = i.format(), i
                }
                var m = i.pathname && "/" === i.pathname.charAt(0),
                    v = t.host || t.pathname && "/" === t.pathname.charAt(0),
                    y = v || m || i.host && t.pathname,
                    x = y,
                    w = i.pathname && i.pathname.split("/") || [],
                    f = t.pathname && t.pathname.split("/") || [],
                    S = i.protocol && !T[i.protocol];
                if (S && (i.hostname = "", i.port = null, i.host && ("" === w[0] ? w[0] = i.host : w.unshift(i.host)), i.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === f[0] ? f[0] = t.host : f.unshift(t.host)), t.host = null), y = y && ("" === f[0] || "" === w[0])), v)
                    i.host = t.host || "" === t.host ? t.host : i.host,
                    i.hostname = t.hostname || "" === t.hostname ? t.hostname : i.hostname,
                    i.search = t.search,
                    i.query = t.query,
                    w = f;
                else if (f.length)
                    w || (w = []),
                    w.pop(),
                    w = w.concat(f),
                    i.search = t.search,
                    i.query = t.query;
                else if (!l.isNullOrUndefined(t.search)) {
                    if (S) {
                        i.hostname = i.host = w.shift();
                        var E = !!(i.host && i.host.indexOf("@") > 0) && i.host.split("@");
                        E && (i.auth = E.shift(), i.host = i.hostname = E.shift())
                    }
                    return i.search = t.search, i.query = t.query, l.isNull(i.pathname) && l.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.href = i.format(), i
                }
                if (!w.length)
                    return i.pathname = null, i.search ? i.path = "/" + i.search : i.path = null, i.href = i.format(), i;
                for (var A = w.slice(-1)[0], R = (i.host || t.host || w.length > 1) && ("." === A || ".." === A) || "" === A, C = 0, M = w.length; M >= 0; M--)
                    A = w[M],
                    "." === A ? w.splice(M, 1) : ".." === A ? (w.splice(M, 1), C++) : C && (w.splice(M, 1), C--);
                if (!y && !x)
                    for (; C--; C)
                        w.unshift("..");
                !y || "" === w[0] || w[0] && "/" === w[0].charAt(0) || w.unshift(""),
                R && "/" !== w.join("/").substr(-1) && w.push("");
                var P = "" === w[0] || w[0] && "/" === w[0].charAt(0);
                if (S) {
                    i.hostname = i.host = P ? "" : w.length ? w.shift() : "";
                    var E = !!(i.host && i.host.indexOf("@") > 0) && i.host.split("@");
                    E && (i.auth = E.shift(), i.host = i.hostname = E.shift())
                }
                return y = y || i.host && w.length, y && !P && w.unshift(""), w.length ? i.pathname = w.join("/") : (i.pathname = null, i.path = null), l.isNull(i.pathname) && l.isNull(i.search) || (i.path = (i.pathname ? i.pathname : "") + (i.search ? i.search : "")), i.auth = t.auth || i.auth, i.slashes = i.slashes || t.slashes, i.href = i.format(), i
            },
            r.prototype.parseHost = function() {
                var t = this.host,
                    e = u.exec(t);
                e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)),
                t && (this.hostname = t)
            }
        }, {
            "./util": 29,
            punycode: 24,
            querystring: 27
        }],
        29: [function(t, e, i) {
            "use strict";
            e.exports = {
                isString: function(t) {
                    return "string" == typeof t
                },
                isObject: function(t) {
                    return "object" == typeof t && null !== t
                },
                isNull: function(t) {
                    return null === t
                },
                isNullOrUndefined: function(t) {
                    return null == t
                }
            }
        }, {}],
        30: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function n(t, e, i, r) {
                (0, o.default)(e)(t, (0, h.default)(i), r)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = n;
            var s = t("./internal/eachOfLimit"),
                o = r(s),
                a = t("./internal/withoutIndex"),
                h = r(a);
            e.exports = i.default
        }, {
            "./internal/eachOfLimit": 34,
            "./internal/withoutIndex": 41
        }],
        31: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = t("./eachLimit"),
                s = r(n),
                o = t("./internal/doLimit"),
                a = r(o);
            i.default = (0, a.default)(s.default, 1),
            e.exports = i.default
        }, {
            "./eachLimit": 30,
            "./internal/doLimit": 33
        }],
        32: [function(t, e, i) {
            "use strict";
            function r() {
                this.head = this.tail = null,
                this.length = 0
            }
            function n(t, e) {
                t.length = 1,
                t.head = t.tail = e
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = r,
            r.prototype.removeLink = function(t) {
                return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, t.prev = t.next = null, this.length -= 1, t
            },
            r.prototype.empty = r,
            r.prototype.insertAfter = function(t, e) {
                e.prev = t,
                e.next = t.next,
                t.next ? t.next.prev = e : this.tail = e,
                t.next = e,
                this.length += 1
            },
            r.prototype.insertBefore = function(t, e) {
                e.prev = t.prev,
                e.next = t,
                t.prev ? t.prev.next = e : this.head = e,
                t.prev = e,
                this.length += 1
            },
            r.prototype.unshift = function(t) {
                this.head ? this.insertBefore(this.head, t) : n(this, t)
            },
            r.prototype.push = function(t) {
                this.tail ? this.insertAfter(this.tail, t) : n(this, t)
            },
            r.prototype.shift = function() {
                return this.head && this.removeLink(this.head)
            },
            r.prototype.pop = function() {
                return this.tail && this.removeLink(this.tail)
            },
            e.exports = i.default
        }, {}],
        33: [function(t, e, i) {
            "use strict";
            function r(t, e) {
                return function(i, r, n) {
                    return t(i, e, r, n)
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = r,
            e.exports = i.default
        }, {}],
        34: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function n(t) {
                return function(e, i, r) {
                    function n(t) {
                        if (u -= 1, t)
                            l = !0,
                            r(t);
                        else {
                            if (l && 0 >= u)
                                return r(null);
                            s()
                        }
                    }
                    function s() {
                        for (; t > u && !l;) {
                            var e = a();
                            if (null === e)
                                return l = !0, void (0 >= u && r(null));
                            u += 1,
                            i(e.value, e.key, (0, d.default)(n))
                        }
                    }
                    if (r = (0, h.default)(r || o.default), 0 >= t || !e)
                        return r(null);
                    var a = (0, c.default)(e),
                        l = !1,
                        u = 0;
                    s()
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = n;
            var s = t("lodash/noop"),
                o = r(s),
                a = t("./once"),
                h = r(a),
                l = t("./iterator"),
                c = r(l),
                u = t("./onlyOnce"),
                d = r(u);
            e.exports = i.default
        }, {
            "./iterator": 36,
            "./once": 37,
            "./onlyOnce": 38,
            "lodash/noop": 62
        }],
        35: [function(t, e, i) {
            "use strict";
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = function(t) {
                return r && t[r] && t[r]()
            };
            var r = "function" == typeof Symbol && Symbol.iterator;
            e.exports = i.default
        }, {}],
        36: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function n(t) {
                var e = -1,
                    i = t.length;
                return function() {
                    return ++e < i ? {
                        value: t[e],
                        key: e
                    } : null
                }
            }
            function s(t) {
                var e = -1;
                return function() {
                    var i = t.next();
                    return i.done ? null : (e++, {
                        value: i.value,
                        key: e
                    })
                }
            }
            function o(t) {
                var e = (0, p.default)(t),
                    i = -1,
                    r = e.length;
                return function() {
                    var n = e[++i];
                    return r > i ? {
                        value: t[n],
                        key: n
                    } : null
                }
            }
            function a(t) {
                if ((0, l.default)(t))
                    return n(t);
                var e = (0, u.default)(t);
                return e ? s(e) : o(t)
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = a;
            var h = t("lodash/isArrayLike"),
                l = r(h),
                c = t("./getIterator"),
                u = r(c),
                d = t("lodash/keys"),
                p = r(d);
            e.exports = i.default
        }, {
            "./getIterator": 35,
            "lodash/isArrayLike": 54,
            "lodash/keys": 61
        }],
        37: [function(t, e, i) {
            "use strict";
            function r(t) {
                return function() {
                    if (null !== t) {
                        var e = t;
                        t = null,
                        e.apply(this, arguments)
                    }
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = r,
            e.exports = i.default
        }, {}],
        38: [function(t, e, i) {
            "use strict";
            function r(t) {
                return function() {
                    if (null === t)
                        throw new Error("Callback was already called.");
                    var e = t;
                    t = null,
                    e.apply(this, arguments)
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = r,
            e.exports = i.default
        }, {}],
        39: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            function n(t, e, i) {
                function r(t, e, i) {
                    if (null != i && "function" != typeof i)
                        throw new Error("task callback must be a function");
                    return l.started = !0, (0, h.default)(t) || (t = [t]), 0 === t.length && l.idle() ? (0, g.default)(function() {
                        l.drain()
                    }) : ((0, o.default)(t, function(t) {
                        var r = {
                            data: t,
                            callback: i || c.default
                        };
                        e ? l._tasks.unshift(r) : l._tasks.push(r)
                    }), void (0, g.default)(l.process))
                }
                function n(t) {
                    return (0, d.default)(function(e) {
                        s -= 1,
                        (0, o.default)(t, function(t) {
                            (0, o.default)(a, function(e, i) {
                                return e === t ? (a.splice(i, 1), !1) : void 0
                            }),
                            t.callback.apply(t, e),
                            null != e[0] && l.error(e[0], t.data)
                        }),
                        s <= l.concurrency - l.buffer && l.unsaturated(),
                        l.idle() && l.drain(),
                        l.process()
                    })
                }
                if (null == e)
                    e = 1;
                else if (0 === e)
                    throw new Error("Concurrency must not be zero");
                var s = 0,
                    a = [],
                    l = {
                        _tasks: new v.default,
                        concurrency: e,
                        payload: i,
                        saturated: c.default,
                        unsaturated: c.default,
                        buffer: e / 4,
                        empty: c.default,
                        drain: c.default,
                        error: c.default,
                        started: !1,
                        paused: !1,
                        push: function(t, e) {
                            r(t, !1, e)
                        },
                        kill: function() {
                            l.drain = c.default,
                            l._tasks.empty()
                        },
                        unshift: function(t, e) {
                            r(t, !0, e)
                        },
                        process: function() {
                            for (; !l.paused && s < l.concurrency && l._tasks.length;) {
                                var e = [],
                                    i = [],
                                    r = l._tasks.length;
                                l.payload && (r = Math.min(r, l.payload));
                                for (var o = 0; r > o; o++) {
                                    var h = l._tasks.shift();
                                    e.push(h),
                                    i.push(h.data)
                                }
                                0 === l._tasks.length && l.empty(),
                                s += 1,
                                a.push(e[0]),
                                s === l.concurrency && l.saturated();
                                var c = (0, f.default)(n(e));
                                t(i, c)
                            }
                        },
                        length: function() {
                            return l._tasks.length
                        },
                        running: function() {
                            return s
                        },
                        workersList: function() {
                            return a
                        },
                        idle: function() {
                            return l._tasks.length + s === 0
                        },
                        pause: function() {
                            l.paused = !0
                        },
                        resume: function() {
                            if (!1 !== l.paused) {
                                l.paused = !1;
                                for (var t = Math.min(l.concurrency, l._tasks.length), e = 1; t >= e; e++)
                                    (0, g.default)(l.process)
                            }
                        }
                    };
                return l
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = n;
            var s = t("lodash/_arrayEach"),
                o = r(s),
                a = t("lodash/isArray"),
                h = r(a),
                l = t("lodash/noop"),
                c = r(l),
                u = t("lodash/rest"),
                d = r(u),
                p = t("./onlyOnce"),
                f = r(p),
                _ = t("./setImmediate"),
                g = r(_),
                m = t("./DoublyLinkedList"),
                v = r(m);
            e.exports = i.default
        }, {
            "./DoublyLinkedList": 32,
            "./onlyOnce": 38,
            "./setImmediate": 40,
            "lodash/_arrayEach": 43,
            "lodash/isArray": 53,
            "lodash/noop": 62,
            "lodash/rest": 63
        }],
        40: [function(t, e, i) {
            (function(e) {
                "use strict";
                function r(t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }
                function n(t) {
                    setTimeout(t, 0)
                }
                function s(t) {
                    return (0, h.default)(function(e, i) {
                        t(function() {
                            e.apply(null, i)
                        })
                    })
                }
                Object.defineProperty(i, "__esModule", {
                    value: !0
                }),
                i.hasNextTick = i.hasSetImmediate = void 0,
                i.fallback = n,
                i.wrap = s;
                var o,
                    a = t("lodash/rest"),
                    h = r(a),
                    l = i.hasSetImmediate = "function" == typeof setImmediate && setImmediate,
                    c = i.hasNextTick = "object" == typeof e && "function" == typeof e.nextTick;
                o = l ? setImmediate : c ? e.nextTick : n,
                i.default = s(o)
            }).call(this, t("_process"))
        }, {
            _process: 23,
            "lodash/rest": 63
        }],
        41: [function(t, e, i) {
            "use strict";
            function r(t) {
                return function(e, i, r) {
                    return t(e, r)
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = r,
            e.exports = i.default
        }, {}],
        42: [function(t, e, i) {
            function r(t, e, i) {
                switch (i.length) {
                case 0:
                    return t.call(e);
                case 1:
                    return t.call(e, i[0]);
                case 2:
                    return t.call(e, i[0], i[1]);
                case 3:
                    return t.call(e, i[0], i[1], i[2])
                }
                return t.apply(e, i)
            }
            e.exports = r
        }, {}],
        43: [function(t, e, i) {
            function r(t, e) {
                for (var i = -1, r = t ? t.length : 0; ++i < r && !1 !== e(t[i], i, t);)
                    ;
                return t
            }
            e.exports = r
        }, {}],
        44: [function(t, e, i) {
            function r(t, e) {
                var i = o(t) || s(t) ? n(t.length, String) : [],
                    r = i.length,
                    h = !!r;
                for (var c in t)
                    !e && !l.call(t, c) || h && ("length" == c || a(c, r)) || i.push(c);
                return i
            }
            var n = t("./_baseTimes"),
                s = t("./isArguments"),
                o = t("./isArray"),
                a = t("./_isIndex"),
                h = Object.prototype,
                l = h.hasOwnProperty;
            e.exports = r
        }, {
            "./_baseTimes": 47,
            "./_isIndex": 48,
            "./isArguments": 52,
            "./isArray": 53
        }],
        45: [function(t, e, i) {
            function r(t) {
                if (!n(t))
                    return s(t);
                var e = [];
                for (var i in Object(t))
                    a.call(t, i) && "constructor" != i && e.push(i);
                return e
            }
            var n = t("./_isPrototype"),
                s = t("./_nativeKeys"),
                o = Object.prototype,
                a = o.hasOwnProperty;
            e.exports = r
        }, {
            "./_isPrototype": 49,
            "./_nativeKeys": 50
        }],
        46: [function(t, e, i) {
            function r(t, e) {
                return e = s(void 0 === e ? t.length - 1 : e, 0), function() {
                    for (var i = arguments, r = -1, o = s(i.length - e, 0), a = Array(o); ++r < o;)
                        a[r] = i[e + r];
                    r = -1;
                    for (var h = Array(e + 1); ++r < e;)
                        h[r] = i[r];
                    return h[e] = a, n(t, this, h)
                }
            }
            var n = t("./_apply"),
                s = Math.max;
            e.exports = r
        }, {
            "./_apply": 42
        }],
        47: [function(t, e, i) {
            function r(t, e) {
                for (var i = -1, r = Array(t); ++i < t;)
                    r[i] = e(i);
                return r
            }
            e.exports = r
        }, {}],
        48: [function(t, e, i) {
            function r(t, e) {
                return !!(e = null == e ? n : e) && ("number" == typeof t || s.test(t)) && t > -1 && t % 1 == 0 && e > t
            }
            var n = 9007199254740991,
                s = /^(?:0|[1-9]\d*)$/;
            e.exports = r
        }, {}],
        49: [function(t, e, i) {
            function r(t) {
                var e = t && t.constructor;
                return t === ("function" == typeof e && e.prototype || n)
            }
            var n = Object.prototype;
            e.exports = r
        }, {}],
        50: [function(t, e, i) {
            var r = t("./_overArg"),
                n = r(Object.keys, Object);
            e.exports = n
        }, {
            "./_overArg": 51
        }],
        51: [function(t, e, i) {
            function r(t, e) {
                return function(i) {
                    return t(e(i))
                }
            }
            e.exports = r
        }, {}],
        52: [function(t, e, i) {
            function r(t) {
                return n(t) && a.call(t, "callee") && (!l.call(t, "callee") || h.call(t) == s)
            }
            var n = t("./isArrayLikeObject"),
                s = "[object Arguments]",
                o = Object.prototype,
                a = o.hasOwnProperty,
                h = o.toString,
                l = o.propertyIsEnumerable;
            e.exports = r
        }, {
            "./isArrayLikeObject": 55
        }],
        53: [function(t, e, i) {
            var r = Array.isArray;
            e.exports = r
        }, {}],
        54: [function(t, e, i) {
            function r(t) {
                return null != t && s(t.length) && !n(t)
            }
            var n = t("./isFunction"),
                s = t("./isLength");
            e.exports = r
        }, {
            "./isFunction": 56,
            "./isLength": 57
        }],
        55: [function(t, e, i) {
            function r(t) {
                return s(t) && n(t)
            }
            var n = t("./isArrayLike"),
                s = t("./isObjectLike");
            e.exports = r
        }, {
            "./isArrayLike": 54,
            "./isObjectLike": 59
        }],
        56: [function(t, e, i) {
            function r(t) {
                var e = n(t) ? h.call(t) : "";
                return e == s || e == o
            }
            var n = t("./isObject"),
                s = "[object Function]",
                o = "[object GeneratorFunction]",
                a = Object.prototype,
                h = a.toString;
            e.exports = r
        }, {
            "./isObject": 58
        }],
        57: [function(t, e, i) {
            function r(t) {
                return "number" == typeof t && t > -1 && t % 1 == 0 && n >= t
            }
            var n = 9007199254740991;
            e.exports = r
        }, {}],
        58: [function(t, e, i) {
            function r(t) {
                var e = typeof t;
                return !!t && ("object" == e || "function" == e)
            }
            e.exports = r
        }, {}],
        59: [function(t, e, i) {
            function r(t) {
                return !!t && "object" == typeof t
            }
            e.exports = r
        }, {}],
        60: [function(t, e, i) {
            function r(t) {
                return "symbol" == typeof t || n(t) && a.call(t) == s
            }
            var n = t("./isObjectLike"),
                s = "[object Symbol]",
                o = Object.prototype,
                a = o.toString;
            e.exports = r
        }, {
            "./isObjectLike": 59
        }],
        61: [function(t, e, i) {
            function r(t) {
                return o(t) ? n(t) : s(t)
            }
            var n = t("./_arrayLikeKeys"),
                s = t("./_baseKeys"),
                o = t("./isArrayLike");
            e.exports = r
        }, {
            "./_arrayLikeKeys": 44,
            "./_baseKeys": 45,
            "./isArrayLike": 54
        }],
        62: [function(t, e, i) {
            function r() {}
            e.exports = r
        }, {}],
        63: [function(t, e, i) {
            function r(t, e) {
                if ("function" != typeof t)
                    throw new TypeError(o);
                return e = void 0 === e ? e : s(e), n(t, e)
            }
            var n = t("./_baseRest"),
                s = t("./toInteger"),
                o = "Expected a function";
            e.exports = r
        }, {
            "./_baseRest": 46,
            "./toInteger": 65
        }],
        64: [function(t, e, i) {
            function r(t) {
                if (!t)
                    return 0 === t ? t : 0;
                if ((t = n(t)) === s || t === -s) {
                    return (0 > t ? -1 : 1) * o
                }
                return t === t ? t : 0
            }
            var n = t("./toNumber"),
                s = 1 / 0,
                o = 1.7976931348623157e308;
            e.exports = r
        }, {
            "./toNumber": 66
        }],
        65: [function(t, e, i) {
            function r(t) {
                var e = n(t),
                    i = e % 1;
                return e === e ? i ? e - i : e : 0
            }
            var n = t("./toFinite");
            e.exports = r
        }, {
            "./toFinite": 64
        }],
        66: [function(t, e, i) {
            function r(t) {
                if ("number" == typeof t)
                    return t;
                if (s(t))
                    return o;
                if (n(t)) {
                    var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                    t = n(e) ? e + "" : e
                }
                if ("string" != typeof t)
                    return 0 === t ? t : +t;
                t = t.replace(a, "");
                var i = l.test(t);
                return i || c.test(t) ? u(t.slice(2), i ? 2 : 8) : h.test(t) ? o : +t
            }
            var n = t("./isObject"),
                s = t("./isSymbol"),
                o = NaN,
                a = /^\s+|\s+$/g,
                h = /^[-+]0x[0-9a-f]+$/i,
                l = /^0b[01]+$/i,
                c = /^0o[0-7]+$/i,
                u = parseInt;
            e.exports = r
        }, {
            "./isObject": 58,
            "./isSymbol": 60
        }],
        67: [function(t, e, i) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            i.default = function(t, e) {
                return (0, s.default)(function(e, i) {
                    t(e[0], i)
                }, e, 1)
            };
            var n = t("./internal/queue"),
                s = r(n);
            e.exports = i.default
        }, {
            "./internal/queue": 39
        }],
        68: [function(t, e, i) {
            "use strict";
            function r(t, e) {
                h.call(this),
                e = e || l,
                this.baseUrl = t || "",
                this.progress = 0,
                this.loading = !1,
                this._progressChunk = 0,
                this._beforeMiddleware = [],
                this._afterMiddleware = [],
                this._boundLoadResource = this._loadResource.bind(this),
                this._buffer = [],
                this._numToLoad = 0,
                this._queue = n(this._boundLoadResource, e),
                this.resources = {}
            }
            var n = t("async/queue"),
                s = t("async/eachSeries"),
                o = t("url"),
                a = t("./Resource"),
                h = t("eventemitter3"),
                l = 10,
                c = 100;
            r.prototype = Object.create(h.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.add = r.prototype.enqueue = function(t, e, i, r) {
                if (Array.isArray(t)) {
                    for (var n = 0; n < t.length; ++n)
                        this.add(t[n]);
                    return this
                }
                if ("object" == typeof t && (r = e || t.callback || t.onComplete, i = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (r = i, i = e, e = t), "string" != typeof e)
                    throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof i && (r = i, i = null), this.resources[t])
                    throw new Error('Resource with name "' + t + '" already exists.');
                return e = this._prepareUrl(e), this.resources[t] = new a(t, e, i), "function" == typeof r && this.resources[t].once("afterMiddleware", r), this._numToLoad++, this._queue.started ? (this._queue.push(this.resources[t]), this._progressChunk = (c - this.progress) / (this._queue.length() + this._queue.running())) : (this._buffer.push(this.resources[t]), this._progressChunk = c / this._buffer.length), this
            },
            r.prototype.before = r.prototype.pre = function(t) {
                return this._beforeMiddleware.push(t), this
            },
            r.prototype.after = r.prototype.use = function(t) {
                return this._afterMiddleware.push(t), this
            },
            r.prototype.reset = function() {
                this.progress = 0,
                this.loading = !1,
                this._progressChunk = 0,
                this._buffer.length = 0,
                this._numToLoad = 0,
                this._queue.kill(),
                this._queue.started = !1;
                for (var t in this.resources) {
                    var e = this.resources[t];
                    e.off("complete", this._onLoad, this),
                    e.isLoading && e.abort()
                }
                return this.resources = {}, this
            },
            r.prototype.load = function(t) {
                if ("function" == typeof t && this.once("complete", t), this._queue.started)
                    return this;
                this.emit("start", this),
                this.loading = !0;
                for (var e = 0; e < this._buffer.length; ++e)
                    this._queue.push(this._buffer[e]);
                return this._buffer.length = 0, this
            },
            r.prototype._prepareUrl = function(t) {
                var e = o.parse(t);
                return e.protocol || !e.pathname || 0 === e.pathname.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t
            },
            r.prototype._loadResource = function(t, e) {
                var i = this;
                t._dequeue = e,
                s(this._beforeMiddleware, function(e, r) {
                    e.call(i, t, function() {
                        r(t.isComplete ? {} : null)
                    })
                }, function() {
                    t.isComplete ? i._onLoad(t) : (t.once("complete", i._onLoad, i), t.load())
                })
            },
            r.prototype._onComplete = function() {
                this.loading = !1,
                this.emit("complete", this, this.resources)
            },
            r.prototype._onLoad = function(t) {
                var e = this;
                s(this._afterMiddleware, function(i, r) {
                    i.call(e, t, r)
                }, function() {
                    t.emit("afterMiddleware", t),
                    e._numToLoad--,
                    e.progress += e._progressChunk,
                    e.emit("progress", e, t),
                    t.error ? e.emit("error", t.error, e, t) : e.emit("load", e, t),
                    0 === e._numToLoad && (e.progress = 100, e._onComplete())
                }),
                t._dequeue()
            },
            r.LOAD_TYPE = a.LOAD_TYPE,
            r.XHR_RESPONSE_TYPE = a.XHR_RESPONSE_TYPE
        }, {
            "./Resource": 69,
            "async/eachSeries": 31,
            "async/queue": 67,
            eventemitter3: 3,
            url: 28
        }],
        69: [function(t, e, i) {
            "use strict";
            function r(t, e, i) {
                if (o.call(this), i = i || {}, "string" != typeof t || "string" != typeof e)
                    throw new Error("Both name and url are required for constructing a resource.");
                this.name = t,
                this.url = e,
                this.isDataUrl = 0 === this.url.indexOf("data:"),
                this.data = null,
                this.crossOrigin = !0 === i.crossOrigin ? "anonymous" : i.crossOrigin,
                this.loadType = i.loadType || this._determineLoadType(),
                this.xhrType = i.xhrType,
                this.metadata = i.metadata || {},
                this.error = null,
                this.xhr = null,
                this.isJson = !1,
                this.isXml = !1,
                this.isImage = !1,
                this.isAudio = !1,
                this.isVideo = !1,
                this.isComplete = !1,
                this.isLoading = !1,
                this._dequeue = null,
                this._boundComplete = this.complete.bind(this),
                this._boundOnError = this._onError.bind(this),
                this._boundOnProgress = this._onProgress.bind(this),
                this._boundXhrOnError = this._xhrOnError.bind(this),
                this._boundXhrOnAbort = this._xhrOnAbort.bind(this),
                this._boundXhrOnLoad = this._xhrOnLoad.bind(this),
                this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)
            }
            function n(t) {
                return t.toString().replace("object ", "")
            }
            function s(t, e, i) {
                e && 0 === e.indexOf(".") && (e = e.substring(1)),
                e && (t[e] = i)
            }
            var o = t("eventemitter3"),
                a = t("url"),
                h = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest),
                l = null,
                c = 0,
                u = 200;
            r.prototype = Object.create(o.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.complete = function() {
                if (this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError, !1), this.data.removeEventListener("load", this._boundComplete, !1), this.data.removeEventListener("progress", this._boundOnProgress, !1), this.data.removeEventListener("canplaythrough", this._boundComplete, !1)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError, !1), this.xhr.removeEventListener("abort", this._boundXhrOnAbort, !1), this.xhr.removeEventListener("progress", this._boundOnProgress, !1), this.xhr.removeEventListener("load", this._boundXhrOnLoad, !1)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.isComplete)
                    throw new Error("Complete called again for an already completed resource.");
                this.isComplete = !0,
                this.isLoading = !1,
                this.emit("complete", this)
            },
            r.prototype.abort = function(t) {
                if (!this.error) {
                    if (this.error = new Error(t), this.xhr)
                        this.xhr.abort();
                    else if (this.xdr)
                        this.xdr.abort();
                    else if (this.data)
                        if (void 0 !== this.data.src)
                            this.data.src = "";
                        else
                            for (; this.data.firstChild;)
                                this.data.removeChild(this.data.firstChild);
                    this.complete()
                }
            },
            r.prototype.load = function(t) {
                if (!this.isLoading)
                    if (this.isComplete) {
                        if (t) {
                            var e = this;
                            setTimeout(function() {
                                t(e)
                            }, 1)
                        }
                    } else
                        switch (t && this.once("complete", t), this.isLoading = !0, this.emit("start", this), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                        case r.LOAD_TYPE.IMAGE:
                            this._loadElement("image");
                            break;
                        case r.LOAD_TYPE.AUDIO:
                            this._loadSourceElement("audio");
                            break;
                        case r.LOAD_TYPE.VIDEO:
                            this._loadSourceElement("video");
                            break;
                        case r.LOAD_TYPE.XHR:
                        default:
                            h && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                        }
            },
            r.prototype._loadElement = function(t) {
                this.metadata.loadElement ? this.data = this.metadata.loadElement : "image" === t && void 0 !== window.Image ? this.data = new Image : this.data = document.createElement(t),
                this.crossOrigin && (this.data.crossOrigin = this.crossOrigin),
                this.metadata.skipSource || (this.data.src = this.url);
                var e = "is" + t[0].toUpperCase() + t.substring(1);
                !1 === this[e] && (this[e] = !0),
                this.data.addEventListener("error", this._boundOnError, !1),
                this.data.addEventListener("load", this._boundComplete, !1),
                this.data.addEventListener("progress", this._boundOnProgress, !1)
            },
            r.prototype._loadSourceElement = function(t) {
                if (this.metadata.loadElement ? this.data = this.metadata.loadElement : "audio" === t && void 0 !== window.Audio ? this.data = new Audio : this.data = document.createElement(t), null === this.data)
                    return void this.abort("Unsupported element " + t);
                if (!this.metadata.skipSource)
                    if (navigator.isCocoonJS)
                        this.data.src = Array.isArray(this.url) ? this.url[0] : this.url;
                    else if (Array.isArray(this.url))
                        for (var e = 0; e < this.url.length; ++e)
                            this.data.appendChild(this._createSource(t, this.url[e]));
                    else
                        this.data.appendChild(this._createSource(t, this.url));
                this["is" + t[0].toUpperCase() + t.substring(1)] = !0,
                this.data.addEventListener("error", this._boundOnError, !1),
                this.data.addEventListener("load", this._boundComplete, !1),
                this.data.addEventListener("progress", this._boundOnProgress, !1),
                this.data.addEventListener("canplaythrough", this._boundComplete, !1),
                this.data.load()
            },
            r.prototype._loadXhr = function() {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var t = this.xhr = new XMLHttpRequest;
                t.open("GET", this.url, !0),
                this.xhrType === r.XHR_RESPONSE_TYPE.JSON || this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = r.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType,
                t.addEventListener("error", this._boundXhrOnError, !1),
                t.addEventListener("abort", this._boundXhrOnAbort, !1),
                t.addEventListener("progress", this._boundOnProgress, !1),
                t.addEventListener("load", this._boundXhrOnLoad, !1),
                t.send()
            },
            r.prototype._loadXdr = function() {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var t = this.xhr = new XDomainRequest;
                t.timeout = 5e3,
                t.onerror = this._boundXhrOnError,
                t.ontimeout = this._boundXdrOnTimeout,
                t.onprogress = this._boundOnProgress,
                t.onload = this._boundXhrOnLoad,
                t.open("GET", this.url, !0),
                setTimeout(function() {
                    t.send()
                }, 0)
            },
            r.prototype._createSource = function(t, e, i) {
                i || (i = t + "/" + e.substr(e.lastIndexOf(".") + 1));
                var r = document.createElement("source");
                return r.src = e, r.type = i, r
            },
            r.prototype._onError = function(t) {
                this.abort("Failed to load element using " + t.target.nodeName)
            },
            r.prototype._onProgress = function(t) {
                t && t.lengthComputable && this.emit("progress", this, t.loaded / t.total)
            },
            r.prototype._xhrOnError = function() {
                var t = this.xhr;
                this.abort(n(t) + " Request failed. Status: " + t.status + ', text: "' + t.statusText + '"')
            },
            r.prototype._xhrOnAbort = function() {
                this.abort(n(this.xhr) + " Request was aborted by the user.")
            },
            r.prototype._xdrOnTimeout = function() {
                this.abort(n(this.xhr) + " Request timed out.")
            },
            r.prototype._xhrOnLoad = function() {
                var t = this.xhr,
                    e = void 0 === t.status ? t.status : u;
                if (!(e === u || 204 === e || 0 === e && t.responseText.length > 0))
                    return void this.abort("[" + t.status + "]" + t.statusText + ":" + t.responseURL);
                if (this.xhrType === r.XHR_RESPONSE_TYPE.TEXT)
                    this.data = t.responseText;
                else if (this.xhrType === r.XHR_RESPONSE_TYPE.JSON)
                    try {
                        this.data = JSON.parse(t.responseText),
                        this.isJson = !0
                    } catch (t) {
                        return void this.abort("Error trying to parse loaded json:", t)
                    }
                else if (this.xhrType === r.XHR_RESPONSE_TYPE.DOCUMENT)
                    try {
                        if (window.DOMParser) {
                            var i = new DOMParser;
                            this.data = i.parseFromString(t.responseText, "text/xml")
                        } else {
                            var n = document.createElement("div");
                            n.innerHTML = t.responseText,
                            this.data = n
                        }
                        this.isXml = !0
                    } catch (t) {
                        return void this.abort("Error trying to parse loaded xml:", t)
                    }
                else
                    this.data = t.response || t.responseText;
                this.complete()
            },
            r.prototype._determineCrossOrigin = function(t, e) {
                if (0 === t.indexOf("data:"))
                    return "";
                e = e || window.location,
                l || (l = document.createElement("a")),
                l.href = t,
                t = a.parse(l.href);
                var i = !t.port && "" === e.port || t.port === e.port;
                return t.hostname === e.hostname && i && t.protocol === e.protocol ? "" : "anonymous"
            },
            r.prototype._determineXhrType = function() {
                return r._xhrTypeMap[this._getExtension()] || r.XHR_RESPONSE_TYPE.TEXT
            },
            r.prototype._determineLoadType = function() {
                return r._loadTypeMap[this._getExtension()] || r.LOAD_TYPE.XHR
            },
            r.prototype._getExtension = function() {
                var t = this.url,
                    e = "";
                if (this.isDataUrl) {
                    var i = t.indexOf("/");
                    e = t.substring(i + 1, t.indexOf(";", i))
                } else {
                    var r = t.indexOf("?");
                    -1 !== r && (t = t.substring(0, r)),
                    e = t.substring(t.lastIndexOf(".") + 1)
                }
                return e.toLowerCase()
            },
            r.prototype._getMimeFromXhrType = function(t) {
                switch (t) {
                case r.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case r.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case r.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case r.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case r.XHR_RESPONSE_TYPE.DEFAULT:
                case r.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
                }
            },
            r.LOAD_TYPE = {
                XHR: 1,
                IMAGE: 2,
                AUDIO: 3,
                VIDEO: 4
            },
            r.XHR_RESPONSE_TYPE = {
                DEFAULT: "text",
                BUFFER: "arraybuffer",
                BLOB: "blob",
                DOCUMENT: "document",
                JSON: "json",
                TEXT: "text"
            },
            r._loadTypeMap = {
                gif: r.LOAD_TYPE.IMAGE,
                png: r.LOAD_TYPE.IMAGE,
                bmp: r.LOAD_TYPE.IMAGE,
                jpg: r.LOAD_TYPE.IMAGE,
                jpeg: r.LOAD_TYPE.IMAGE,
                tif: r.LOAD_TYPE.IMAGE,
                tiff: r.LOAD_TYPE.IMAGE,
                webp: r.LOAD_TYPE.IMAGE,
                tga: r.LOAD_TYPE.IMAGE,
                "svg+xml": r.LOAD_TYPE.IMAGE
            },
            r._xhrTypeMap = {
                xhtml: r.XHR_RESPONSE_TYPE.DOCUMENT,
                html: r.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: r.XHR_RESPONSE_TYPE.DOCUMENT,
                xml: r.XHR_RESPONSE_TYPE.DOCUMENT,
                tmx: r.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: r.XHR_RESPONSE_TYPE.DOCUMENT,
                svg: r.XHR_RESPONSE_TYPE.DOCUMENT,
                gif: r.XHR_RESPONSE_TYPE.BLOB,
                png: r.XHR_RESPONSE_TYPE.BLOB,
                bmp: r.XHR_RESPONSE_TYPE.BLOB,
                jpg: r.XHR_RESPONSE_TYPE.BLOB,
                jpeg: r.XHR_RESPONSE_TYPE.BLOB,
                tif: r.XHR_RESPONSE_TYPE.BLOB,
                tiff: r.XHR_RESPONSE_TYPE.BLOB,
                webp: r.XHR_RESPONSE_TYPE.BLOB,
                tga: r.XHR_RESPONSE_TYPE.BLOB,
                json: r.XHR_RESPONSE_TYPE.JSON,
                text: r.XHR_RESPONSE_TYPE.TEXT,
                txt: r.XHR_RESPONSE_TYPE.TEXT
            },
            r.setExtensionLoadType = function(t, e) {
                s(r._loadTypeMap, t, e)
            },
            r.setExtensionXhrType = function(t, e) {
                s(r._xhrTypeMap, t, e)
            }
        }, {
            eventemitter3: 3,
            url: 28
        }],
        70: [function(t, e, i) {
            "use strict";
            e.exports = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encodeBinary: function(t) {
                    for (var e, i = "", r = new Array(4), n = 0, s = 0, o = 0; n < t.length;) {
                        for (e = new Array(3), s = 0; s < e.length; s++)
                            n < t.length ? e[s] = 255 & t.charCodeAt(n++) : e[s] = 0;
                        switch (r[0] = e[0] >> 2, r[1] = (3 & e[0]) << 4 | e[1] >> 4, r[2] = (15 & e[1]) << 2 | e[2] >> 6, r[3] = 63 & e[2], o = n - (t.length - 1)) {
                        case 2:
                            r[3] = 64,
                            r[2] = 64;
                            break;
                        case 1:
                            r[3] = 64
                        }
                        for (s = 0; s < r.length; s++)
                            i += this._keyStr.charAt(r[s])
                    }
                    return i
                }
            }
        }, {}],
        71: [function(t, e, i) {
            "use strict";
            e.exports = t("./Loader"),
            e.exports.Resource = t("./Resource"),
            e.exports.middleware = {
                caching: {
                    memory: t("./middlewares/caching/memory")
                },
                parsing: {
                    blob: t("./middlewares/parsing/blob")
                }
            }
        }, {
            "./Loader": 68,
            "./Resource": 69,
            "./middlewares/caching/memory": 72,
            "./middlewares/parsing/blob": 73
        }],
        72: [function(t, e, i) {
            "use strict";
            var r = {};
            e.exports = function() {
                return function(t, e) {
                    r[t.url] ? (t.data = r[t.url], t.complete()) : t.once("complete", function() {
                        r[this.url] = this.data
                    }),
                    e()
                }
            }
        }, {}],
        73: [function(t, e, i) {
            "use strict";
            var r = t("../../Resource"),
                n = t("../../b64"),
                s = window.URL || window.webkitURL;
            e.exports = function() {
                return function(t, e) {
                    if (!t.data)
                        return void e();
                    if (t.xhr && t.xhrType === r.XHR_RESPONSE_TYPE.BLOB)
                        if (window.Blob && "string" != typeof t.data) {
                            if (0 === t.data.type.indexOf("image")) {
                                var i = s.createObjectURL(t.data);
                                return t.blob = t.data, t.data = new Image, t.data.src = i, t.isImage = !0, void (t.data.onload = function() {
                                    s.revokeObjectURL(i),
                                    t.data.onload = null,
                                    e()
                                })
                            }
                        } else {
                            var o = t.xhr.getResponseHeader("content-type");
                            if (o && 0 === o.indexOf("image"))
                                return t.data = new Image, t.data.src = "data:" + o + ";base64," + n.encodeBinary(t.xhr.responseText), t.isImage = !0, void (t.data.onload = function() {
                                    t.data.onload = null,
                                    e()
                                })
                        }
                    e()
                }
            }
        }, {
            "../../Resource": 69,
            "../../b64": 70
        }],
        74: [function(t, e, i) {
            function r(t) {
                (s.tablet || s.phone) && this.createTouchHook();
                var e = document.createElement("div");
                e.style.width = "100px",
                e.style.height = "100px",
                e.style.position = "absolute",
                e.style.top = 0,
                e.style.left = 0,
                e.style.zIndex = 2,
                this.div = e,
                this.pool = [],
                this.renderId = 0,
                this.debug = !1,
                this.renderer = t,
                this.children = [],
                this._onKeyDown = this._onKeyDown.bind(this),
                this._onMouseMove = this._onMouseMove.bind(this),
                this.isActive = !1,
                this.isMobileAccessabillity = !1,
                window.addEventListener("keydown", this._onKeyDown, !1)
            }
            var n = t("../core"),
                s = t("ismobilejs")
                ;
            Object.assign(n.DisplayObject.prototype, t("./accessibleTarget")),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.createTouchHook = function() {
                var t = document.createElement("button");
                t.style.width = "1px",
                t.style.height = "1px",
                t.style.position = "absolute",
                t.style.top = "-1000px",
                t.style.left = "-1000px",
                t.style.zIndex = 2,
                t.style.backgroundColor = "#FF0000",
                t.title = "HOOK DIV",
                t.addEventListener("focus", function() {
                    this.isMobileAccessabillity = !0,
                    this.activate(),
                    document.body.removeChild(t)
                }.bind(this)),
                document.body.appendChild(t)
            },
            r.prototype.activate = function() {
                this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode && this.renderer.view.parentNode.appendChild(this.div))
            },
            r.prototype.deactivate = function() {
                this.isActive && !this.isMobileAccessabillity && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode && this.div.parentNode.removeChild(this.div))
            },
            r.prototype.updateAccessibleObjects = function(t) {
                if (t.visible) {
                    t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId);
                    for (var e = t.children, i = e.length - 1; i >= 0; i--)
                        this.updateAccessibleObjects(e[i])
                }
            },
            r.prototype.update = function() {
                if (this.renderer.renderingToScreen) {
                    this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                    var t = this.renderer.view.getBoundingClientRect(),
                        e = t.width / this.renderer.width,
                        i = t.height / this.renderer.height,
                        r = this.div;
                    r.style.left = t.left + "px",
                    r.style.top = t.top + "px",
                    r.style.width = this.renderer.width + "px",
                    r.style.height = this.renderer.height + "px";
                    for (var s = 0; s < this.children.length; s++) {
                        var o = this.children[s];
                        if (o.renderId !== this.renderId)
                            o._accessibleActive = !1,
                            n.utils.removeItems(this.children, s, 1),
                            this.div.removeChild(o._accessibleDiv),
                            this.pool.push(o._accessibleDiv),
                            o._accessibleDiv = null,
                            s--,
                            0 === this.children.length && this.deactivate();
                        else {
                            r = o._accessibleDiv;
                            var a = o.hitArea,
                                h = o.worldTransform;
                            o.hitArea ? (r.style.left = (h.tx + a.x * h.a) * e + "px", r.style.top = (h.ty + a.y * h.d) * i + "px", r.style.width = a.width * h.a * e + "px", r.style.height = a.height * h.d * i + "px") : (a = o.getBounds(), this.capHitArea(a), r.style.left = a.x * e + "px", r.style.top = a.y * i + "px", r.style.width = a.width * e + "px", r.style.height = a.height * i + "px")
                        }
                    }
                    this.renderId++
                }
            },
            r.prototype.capHitArea = function(t) {
                t.x < 0 && (t.width += t.x, t.x = 0),
                t.y < 0 && (t.height += t.y, t.y = 0),
                t.x + t.width > this.renderer.width && (t.width = this.renderer.width - t.x),
                t.y + t.height > this.renderer.height && (t.height = this.renderer.height - t.y)
            },
            r.prototype.addChild = function(t) {
                var e = this.pool.pop();
                e || (e = document.createElement("button"), e.style.width = "100px", e.style.height = "100px", e.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = 2, e.style.borderStyle = "none", e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))),
                t.accessibleTitle ? e.title = t.accessibleTitle : t.accessibleTitle || t.accessibleHint || (e.title = "displayObject " + this.tabIndex),
                t.accessibleHint && e.setAttribute("aria-label", t.accessibleHint),
                t._accessibleActive = !0,
                t._accessibleDiv = e,
                e.displayObject = t,
                this.children.push(t),
                this.div.appendChild(t._accessibleDiv),
                t._accessibleDiv.tabIndex = t.tabIndex
            },
            r.prototype._onClick = function(t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "click", e.eventData)
            },
            r.prototype._onFocus = function(t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData)
            },
            r.prototype._onFocusOut = function(t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData)
            },
            r.prototype._onKeyDown = function(t) {
                9 === t.keyCode && this.activate()
            },
            r.prototype._onMouseMove = function() {
                this.deactivate()
            },
            r.prototype.destroy = function() {
                this.div = null;
                for (var t = 0; t < this.children.length; t++)
                    this.children[t].div = null;
                window.document.removeEventListener("mousemove", this._onMouseMove),
                window.removeEventListener("keydown", this._onKeyDown),
                this.pool = null,
                this.children = null,
                this.renderer = null
            },
            n.WebGLRenderer.registerPlugin("accessibility", r),
            n.CanvasRenderer.registerPlugin("accessibility", r)
        }, {
            "../core": 97,
            "./accessibleTarget": 75,
            ismobilejs: 4
        }],
        75: [function(t, e, i) {
            var r = {
                accessible: !1,
                accessibleTitle: null,
                accessibleHint: null,
                tabIndex: 0,
                _accessibleActive: !1,
                _accessibleDiv: !1
            };
            e.exports = r
        }, {}],
        76: [function(t, e, i) {
            e.exports = {
                accessibleTarget: t("./accessibleTarget"),
                AccessibilityManager: t("./AccessibilityManager")
            }
        }, {
            "./AccessibilityManager": 74,
            "./accessibleTarget": 75
        }],
        77: [function(t, e, i) {
            function r(t) {
                if (t instanceof Array) {
                    if ("precision" !== t[0].substring(0, 9)) {
                        var e = t.slice(0);
                        return e.unshift("precision " + s.PRECISION.DEFAULT + " float;"), e
                    }
                } else if ("precision" !== t.substring(0, 9))
                    return "precision " + s.PRECISION.DEFAULT + " float;\n" + t;
                return t
            }
            var n = t("pixi-gl-core").GLShader,
                s = t("./const"),
                o = function(t, e, i) {
                    n.call(this, t, r(e), r(i))
                };
            o.prototype = Object.create(n.prototype),
            o.prototype.constructor = o,
            e.exports = o
        }, {
            "./const": 78,
            "pixi-gl-core": 12
        }],
        78: [function(t, e, i) {
            var r = {
                VERSION: "4.0.0",
                PI_2: 2 * Math.PI,
                RAD_TO_DEG: 180 / Math.PI,
                DEG_TO_RAD: Math.PI / 180,
                TARGET_FPMS: .06,
                RENDERER_TYPE: {
                    UNKNOWN: 0,
                    WEBGL: 1,
                    CANVAS: 2
                },
                BLEND_MODES: {
                    NORMAL: 0,
                    ADD: 1,
                    MULTIPLY: 2,
                    SCREEN: 3,
                    OVERLAY: 4,
                    DARKEN: 5,
                    LIGHTEN: 6,
                    COLOR_DODGE: 7,
                    COLOR_BURN: 8,
                    HARD_LIGHT: 9,
                    SOFT_LIGHT: 10,
                    DIFFERENCE: 11,
                    EXCLUSION: 12,
                    HUE: 13,
                    SATURATION: 14,
                    COLOR: 15,
                    LUMINOSITY: 16
                },
                DRAW_MODES: {
                    POINTS: 0,
                    LINES: 1,
                    LINE_LOOP: 2,
                    LINE_STRIP: 3,
                    TRIANGLES: 4,
                    TRIANGLE_STRIP: 5,
                    TRIANGLE_FAN: 6
                },
                SCALE_MODES: {
                    DEFAULT: 0,
                    LINEAR: 0,
                    NEAREST: 1
                },
                WRAP_MODES: {
                    DEFAULT: 0,
                    CLAMP: 0,
                    REPEAT: 1,
                    MIRRORED_REPEAT: 2
                },
                GC_MODES: {
                    DEFAULT: 1,
                    AUTO: 0,
                    MANUAL: 1
                },
                MIPMAP_TEXTURES: !0,
                RETINA_PREFIX: /@(.+)x/,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                DEFAULT_RENDER_OPTIONS: {
                    view: null,
                    resolution: 1,
                    antialias: !1,
                    forceFXAA: !1,
                    autoResize: !1,
                    transparent: !1,
                    backgroundColor: 0,
                    clearBeforeRender: !0,
                    preserveDrawingBuffer: !1,
                    roundPixels: !1
                },
                SHAPES: {
                    POLY: 0,
                    RECT: 1,
                    CIRC: 2,
                    ELIP: 3,
                    RREC: 4
                },
                PRECISION: {
                    DEFAULT: "mediump",
                    LOW: "lowp",
                    MEDIUM: "mediump",
                    HIGH: "highp"
                },
                TRANSFORM_MODE: {
                    DEFAULT: 0,
                    STATIC: 0,
                    DYNAMIC: 1
                },
                TEXT_GRADIENT: {
                    LINEAR_VERTICAL: 0,
                    LINEAR_HORIZONTAL: 1
                },
                SPRITE_BATCH_SIZE: 4096,
                SPRITE_MAX_TEXTURES: t("./utils/maxRecommendedTextures")(32)
            };
            e.exports = r
        }, {
            "./utils/maxRecommendedTextures": 152
        }],
        79: [function(t, e, i) {
            function r() {
                this.minX = 1 / 0,
                this.minY = 1 / 0,
                this.maxX = -1 / 0,
                this.maxY = -1 / 0,
                this.rect = null
            }
            var n = t("../math"),
                s = n.Rectangle;
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.isEmpty = function() {
                return this.minX > this.maxX || this.minY > this.maxY
            },
            r.prototype.clear = function() {
                this.updateID++,
                this.minX = 1 / 0,
                this.minY = 1 / 0,
                this.maxX = -1 / 0,
                this.maxY = -1 / 0
            },
            r.prototype.getRectangle = function(t) {
                return this.minX > this.maxX || this.minY > this.maxY ? s.EMPTY : (t = t || new s(0, 0, 1, 1), t.x = this.minX, t.y = this.minY, t.width = this.maxX - this.minX, t.height = this.maxY - this.minY, t)
            },
            r.prototype.addPoint = function(t) {
                this.minX = Math.min(this.minX, t.x),
                this.maxX = Math.max(this.maxX, t.x),
                this.minY = Math.min(this.minY, t.y),
                this.maxY = Math.max(this.maxY, t.y)
            },
            r.prototype.addQuad = function(t) {
                var e = this.minX,
                    i = this.minY,
                    r = this.maxX,
                    n = this.maxY,
                    s = t[0],
                    o = t[1];
                e = e > s ? s : e,
                i = i > o ? o : i,
                r = s > r ? s : r,
                n = o > n ? o : n,
                s = t[2],
                o = t[3],
                e = e > s ? s : e,
                i = i > o ? o : i,
                r = s > r ? s : r,
                n = o > n ? o : n,
                s = t[4],
                o = t[5],
                e = e > s ? s : e,
                i = i > o ? o : i,
                r = s > r ? s : r,
                n = o > n ? o : n,
                s = t[6],
                o = t[7],
                e = e > s ? s : e,
                i = i > o ? o : i,
                r = s > r ? s : r,
                n = o > n ? o : n,
                this.minX = e,
                this.minY = i,
                this.maxX = r,
                this.maxY = n
            },
            r.prototype.addFrame = function(t, e, i, r, n) {
                var s = t.worldTransform,
                    o = s.a,
                    a = s.b,
                    h = s.c,
                    l = s.d,
                    c = s.tx,
                    u = s.ty,
                    d = this.minX,
                    p = this.minY,
                    f = this.maxX,
                    _ = this.maxY,
                    g = o * e + h * i + c,
                    m = a * e + l * i + u;
                d = d > g ? g : d,
                p = p > m ? m : p,
                f = g > f ? g : f,
                _ = m > _ ? m : _,
                g = o * r + h * i + c,
                m = a * r + l * i + u,
                d = d > g ? g : d,
                p = p > m ? m : p,
                f = g > f ? g : f,
                _ = m > _ ? m : _,
                g = o * e + h * n + c,
                m = a * e + l * n + u,
                d = d > g ? g : d,
                p = p > m ? m : p,
                f = g > f ? g : f,
                _ = m > _ ? m : _,
                g = o * r + h * n + c,
                m = a * r + l * n + u,
                d = d > g ? g : d,
                p = p > m ? m : p,
                f = g > f ? g : f,
                _ = m > _ ? m : _,
                this.minX = d,
                this.minY = p,
                this.maxX = f,
                this.maxY = _
            },
            r.prototype.addVertices = function(t, e, i, r) {
                for (var n = t.worldTransform, s = n.a, o = n.b, a = n.c, h = n.d, l = n.tx, c = n.ty, u = this.minX, d = this.minY, p = this.maxX, f = this.maxY, _ = i; r > _; _ += 2) {
                    var g = e[_],
                        m = e[_ + 1],
                        v = s * g + a * m + l,
                        y = h * m + o * g + c;
                    u = u > v ? v : u,
                    d = d > y ? y : d,
                    p = v > p ? v : p,
                    f = y > f ? y : f
                }
                this.minX = u,
                this.minY = d,
                this.maxX = p,
                this.maxY = f
            },
            r.prototype.addBounds = function(t) {
                var e = this.minX,
                    i = this.minY,
                    r = this.maxX,
                    n = this.maxY;
                this.minX = t.minX < e ? t.minX : e,
                this.minY = t.minY < i ? t.minY : i,
                this.maxX = t.maxX > r ? t.maxX : r,
                this.maxY = t.maxY > n ? t.maxY : n
            }
        }, {
            "../math": 102
        }],
        80: [function(t, e, i) {
            function r() {
                s.call(this),
                this.children = []
            }
            var n = t("../utils"),
                s = t("./DisplayObject");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return this.scale.x * this.getLocalBounds().width
                    },
                    set: function(t) {
                        var e = this.getLocalBounds().width;
                        this.scale.x = 0 !== e ? t / e : 1,
                        this._width = t
                    }
                },
                height: {
                    get: function() {
                        return this.scale.y * this.getLocalBounds().height
                    },
                    set: function(t) {
                        var e = this.getLocalBounds().height;
                        this.scale.y = 0 !== e ? t / e : 1,
                        this._height = t
                    }
                }
            }),
            r.prototype.onChildrenChange = function() {},
            r.prototype.addChild = function(t) {
                var e = arguments.length;
                if (e > 1)
                    for (var i = 0; e > i; i++)
                        this.addChild(arguments[i]);
                else
                    t.parent && t.parent.removeChild(t),
                    t.parent = this,
                    this.transform._parentID = -1,
                    this.children.push(t),
                    this.onChildrenChange(this.children.length - 1),
                    t.emit("added", this);
                return t
            },
            r.prototype.addChildAt = function(t, e) {
                if (e >= 0 && e <= this.children.length)
                    return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), this.onChildrenChange(e), t.emit("added", this), t;
                throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length)
            },
            r.prototype.swapChildren = function(t, e) {
                if (t !== e) {
                    var i = this.getChildIndex(t),
                        r = this.getChildIndex(e);
                    if (0 > i || 0 > r)
                        throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");
                    this.children[i] = e,
                    this.children[r] = t,
                    this.onChildrenChange(r > i ? i : r)
                }
            },
            r.prototype.getChildIndex = function(t) {
                var e = this.children.indexOf(t);
                if (-1 === e)
                    throw new Error("The supplied DisplayObject must be a child of the caller");
                return e
            },
            r.prototype.setChildIndex = function(t, e) {
                if (0 > e || e >= this.children.length)
                    throw new Error("The supplied index is out of bounds");
                var i = this.getChildIndex(t);
                n.removeItems(this.children, i, 1),
                this.children.splice(e, 0, t),
                this.onChildrenChange(e)
            },
            r.prototype.getChildAt = function(t) {
                if (0 > t || t >= this.children.length)
                    throw new Error("getChildAt: Supplied index " + t + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller");
                return this.children[t]
            },
            r.prototype.removeChild = function(t) {
                var e = arguments.length;
                if (e > 1)
                    for (var i = 0; e > i; i++)
                        this.removeChild(arguments[i]);
                else {
                    var r = this.children.indexOf(t);
                    if (-1 === r)
                        return;
                    t.parent = null,
                    n.removeItems(this.children, r, 1),
                    this.onChildrenChange(r),
                    t.emit("removed", this)
                }
                return t
            },
            r.prototype.removeChildAt = function(t) {
                var e = this.getChildAt(t);
                return e.parent = null, n.removeItems(this.children, t, 1), this.onChildrenChange(t), e.emit("removed", this), e
            },
            r.prototype.removeChildren = function(t, e) {
                var i,
                    r,
                    n = t || 0,
                    s = "number" == typeof e ? e : this.children.length,
                    o = s - n;
                if (o > 0 && s >= o) {
                    for (i = this.children.splice(n, o), r = 0; r < i.length; ++r)
                        i[r].parent = null;
                    for (this.onChildrenChange(t), r = 0; r < i.length; ++r)
                        i[r].emit("removed", this);
                    return i
                }
                if (0 === o && 0 === this.children.length)
                    return [];
                throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
            },
            r.prototype.updateTransform = function() {
                if (this._boundsID++, this.visible) {
                    this.transform.updateTransform(this.parent.transform),
                    this.worldAlpha = this.alpha * this.parent.worldAlpha;
                    for (var t = 0, e = this.children.length; e > t; ++t)
                        this.children[t].updateTransform()
                }
            },
            r.prototype.containerUpdateTransform = r.prototype.updateTransform,
            r.prototype.calculateBounds = function() {
                if (this._bounds.clear(), this.visible) {
                    this._calculateBounds();
                    for (var t = 0; t < this.children.length; t++) {
                        var e = this.children[t];
                        e.calculateBounds(),
                        this._bounds.addBounds(e._bounds)
                    }
                    this._boundsID = this._lastBoundsID
                }
            },
            r.prototype._calculateBounds = function() {},
            r.prototype.renderWebGL = function(t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable)
                    if (this._mask || this._filters)
                        this.renderAdvancedWebGL(t);
                    else {
                        this._renderWebGL(t);
                        for (var e = 0, i = this.children.length; i > e; ++e)
                            this.children[e].renderWebGL(t)
                    }
            },
            r.prototype.renderAdvancedWebGL = function(t) {
                t.currentRenderer.flush();
                var e,
                    i,
                    r = this._filters,
                    n = this._mask;
                if (r) {
                    for (this._enabledFilters || (this._enabledFilters = []), this._enabledFilters.length = 0, e = 0; e < r.length; e++)
                        r[e].enabled && this._enabledFilters.push(r[e]);
                    this._enabledFilters.length && t.filterManager.pushFilter(this, this._enabledFilters)
                }
                for (n && t.maskManager.pushMask(this, this._mask), t.currentRenderer.start(), this._renderWebGL(t), e = 0, i = this.children.length; i > e; e++)
                    this.children[e].renderWebGL(t);
                t.currentRenderer.flush(),
                n && t.maskManager.popMask(this, this._mask),
                r && this._enabledFilters && this._enabledFilters.length && t.filterManager.popFilter(),
                t.currentRenderer.start()
            },
            r.prototype._renderWebGL = function(t) {},
            r.prototype._renderCanvas = function(t) {},
            r.prototype.renderCanvas = function(t) {
                if (this.visible && !(this.alpha <= 0) && this.renderable) {
                    this._mask && t.maskManager.pushMask(this._mask),
                    this._renderCanvas(t);
                    for (var e = 0, i = this.children.length; i > e; ++e)
                        this.children[e].renderCanvas(t);
                    this._mask && t.maskManager.popMask(t)
                }
            },
            r.prototype.destroy = function(t) {
                s.prototype.destroy.call(this);
                var e = "boolean" == typeof t ? t : t && t.children,
                    i = this.children;
                if (this.children = null, e)
                    for (var r = i.length - 1; r >= 0; r--) {
                        var n = i[r];
                        n.parent = null,
                        n.destroy(t)
                    }
            }
        }, {
            "../utils": 151,
            "./DisplayObject": 81
        }],
        81: [function(t, e, i) {
            function r() {
                n.call(this);
                var t = s.TRANSFORM_MODE.DEFAULT === s.TRANSFORM_MODE.STATIC ? o : a;
                this.transform = new t,
                this.alpha = 1,
                this.visible = !0,
                this.renderable = !0,
                this.parent = null,
                this.worldAlpha = 1,
                this.filterArea = null,
                this._filters = null,
                this._enabledFilters = null,
                this._bounds = new h,
                this._boundsID = 0,
                this._lastBoundsID = -1,
                this._boundsRect = null,
                this._localBoundsRect = null,
                this._mask = null
            }
            var n = t("eventemitter3"),
                s = t("../const"),
                o = t("./TransformStatic"),
                a = t("./Transform"),
                h = t("./Bounds"),
                l = t("../math"),
                c = new r;
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                x: {
                    get: function() {
                        return this.position.x
                    },
                    set: function(t) {
                        this.transform.position.x = t
                    }
                },
                y: {
                    get: function() {
                        return this.position.y
                    },
                    set: function(t) {
                        this.transform.position.y = t
                    }
                },
                worldTransform: {
                    get: function() {
                        return this.transform.worldTransform
                    }
                },
                localTransform: {
                    get: function() {
                        return this.transform.localTransform
                    }
                },
                position: {
                    get: function() {
                        return this.transform.position
                    },
                    set: function(t) {
                        this.transform.position.copy(t)
                    }
                },
                scale: {
                    get: function() {
                        return this.transform.scale
                    },
                    set: function(t) {
                        this.transform.scale.copy(t)
                    }
                },
                pivot: {
                    get: function() {
                        return this.transform.pivot
                    },
                    set: function(t) {
                        this.transform.pivot.copy(t)
                    }
                },
                skew: {
                    get: function() {
                        return this.transform.skew
                    },
                    set: function(t) {
                        this.transform.skew.copy(t)
                    }
                },
                rotation: {
                    get: function() {
                        return this.transform.rotation
                    },
                    set: function(t) {
                        this.transform.rotation = t
                    }
                },
                worldVisible: {
                    get: function() {
                        var t = this;
                        do {
                            if (!t.visible)
                                return !1;
                            t = t.parent
                        } while (t);
                        return !0
                    }
                },
                mask: {
                    get: function() {
                        return this._mask
                    },
                    set: function(t) {
                        this._mask && (this._mask.renderable = !0),
                        this._mask = t,
                        this._mask && (this._mask.renderable = !1)
                    }
                },
                filters: {
                    get: function() {
                        return this._filters && this._filters.slice()
                    },
                    set: function(t) {
                        this._filters = t && t.slice()
                    }
                }
            }),
            r.prototype.updateTransform = function() {
                this.transform.updateTransform(this.parent.transform),
                this.worldAlpha = this.alpha * this.parent.worldAlpha,
                this._bounds.updateID++
            },
            r.prototype.displayObjectUpdateTransform = r.prototype.updateTransform,
            r.prototype._recursivePostUpdateTransform = function() {
                this.parent ? (this.parent._recursivePostUpdateTransform(), this.transform.updateTransform(this.parent.transform)) : this.transform.updateTransform(c.transform)
            },
            r.prototype.getBounds = function(t, e) {
                return t || (this.parent ? (this._recursivePostUpdateTransform(), this.updateTransform()) : (this.parent = c, this.parent.transform._worldID++, this.updateTransform(), this.parent = null)), this._boundsID !== this._lastBoundsID && this.calculateBounds(), e || (this._boundsRect || (this._boundsRect = new l.Rectangle), e = this._boundsRect), this._bounds.getRectangle(e)
            },
            r.prototype.getLocalBounds = function(t) {
                var e = this.transform,
                    i = this.parent;
                this.parent = null,
                this.transform = c.transform,
                t || (this._localBoundsRect || (this._localBoundsRect = new l.Rectangle), t = this._localBoundsRect);
                var r = this.getBounds(!1, t);
                return this.parent = i, this.transform = e, r
            },
            r.prototype.toGlobal = function(t, e, i) {
                return i || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = c, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.apply(t, e)
            },
            r.prototype.toLocal = function(t, e, i, r) {
                return e && (t = e.toGlobal(t, i, r)), r || (this._recursivePostUpdateTransform(), this.parent ? this.displayObjectUpdateTransform() : (this.parent = c, this.displayObjectUpdateTransform(), this.parent = null)), this.worldTransform.applyInverse(t, i)
            },
            r.prototype.renderWebGL = function(t) {},
            r.prototype.renderCanvas = function(t) {},
            r.prototype.setParent = function(t) {
                if (!t || !t.addChild)
                    throw new Error("setParent: Argument must be a Container");
                return t.addChild(this), t
            },
            r.prototype.setTransform = function(t, e, i, r, n, s, o, a, h) {
                return this.position.x = t || 0, this.position.y = e || 0, this.scale.x = i || 1, this.scale.y = r || 1, this.rotation = n || 0, this.skew.x = s || 0, this.skew.y = o || 0, this.pivot.x = a || 0, this.pivot.y = h || 0, this
            },
            r.prototype.destroy = function() {
                this.removeAllListeners(),
                this.parent && this.parent.removeChild(this),
                this.transform = null,
                this.parent = null,
                this._bounds = null,
                this._currentBounds = null,
                this._mask = null,
                this.filterArea = null
            }
        }, {
            "../const": 78,
            "../math": 102,
            "./Bounds": 79,
            "./Transform": 82,
            "./TransformStatic": 84,
            eventemitter3: 3
        }],
        82: [function(t, e, i) {
            function r() {
                s.call(this),
                this.position = new n.Point(0, 0),
                this.scale = new n.Point(1, 1),
                this.skew = new n.ObservablePoint(this.updateSkew, this, 0, 0),
                this.pivot = new n.Point(0, 0),
                this._rotation = 0,
                this._sr = Math.sin(0),
                this._cr = Math.cos(0),
                this._cy = Math.cos(0),
                this._sy = Math.sin(0),
                this._nsx = Math.sin(0),
                this._cx = Math.cos(0)
            }
            var n = t("../math"),
                s = t("./TransformBase");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            r.prototype.updateSkew = function() {
                this._cy = Math.cos(this.skew.y),
                this._sy = Math.sin(this.skew.y),
                this._nsx = Math.sin(this.skew.x),
                this._cx = Math.cos(this.skew.x)
            },
            r.prototype.updateLocalTransform = function() {
                var t,
                    e,
                    i,
                    r,
                    n = this.localTransform;
                t = this._cr * this.scale.x,
                e = this._sr * this.scale.x,
                i = -this._sr * this.scale.y,
                r = this._cr * this.scale.y,
                n.a = this._cy * t + this._sy * i,
                n.b = this._cy * e + this._sy * r,
                n.c = this._nsx * t + this._cx * i,
                n.d = this._nsx * e + this._cx * r
            },
            r.prototype.updateTransform = function(t) {
                var e,
                    i,
                    r,
                    n,
                    s = t.worldTransform,
                    o = this.worldTransform,
                    a = this.localTransform;
                e = this._cr * this.scale.x,
                i = this._sr * this.scale.x,
                r = -this._sr * this.scale.y,
                n = this._cr * this.scale.y,
                a.a = this._cy * e + this._sy * r,
                a.b = this._cy * i + this._sy * n,
                a.c = this._nsx * e + this._cx * r,
                a.d = this._nsx * i + this._cx * n,
                a.tx = this.position.x - (this.pivot.x * a.a + this.pivot.y * a.c),
                a.ty = this.position.y - (this.pivot.x * a.b + this.pivot.y * a.d),
                o.a = a.a * s.a + a.b * s.c,
                o.b = a.a * s.b + a.b * s.d,
                o.c = a.c * s.a + a.d * s.c,
                o.d = a.c * s.b + a.d * s.d,
                o.tx = a.tx * s.a + a.ty * s.c + s.tx,
                o.ty = a.tx * s.b + a.ty * s.d + s.ty,
                this._worldID++
            },
            r.prototype.setFromMatrix = function(t) {
                t.decompose(this)
            },
            Object.defineProperties(r.prototype, {
                rotation: {
                    get: function() {
                        return this._rotation
                    },
                    set: function(t) {
                        this._rotation = t,
                        this._sr = Math.sin(t),
                        this._cr = Math.cos(t)
                    }
                }
            }),
            e.exports = r
        }, {
            "../math": 102,
            "./TransformBase": 83
        }],
        83: [function(t, e, i) {
            function r() {
                this.worldTransform = new n.Matrix,
                this.localTransform = new n.Matrix,
                this._worldID = 0
            }
            var n = t("../math");
            r.prototype.constructor = r,
            r.prototype.updateLocalTransform = function() {},
            r.prototype.updateTransform = function(t) {
                var e = t.worldTransform,
                    i = this.worldTransform,
                    r = this.localTransform;
                i.a = r.a * e.a + r.b * e.c,
                i.b = r.a * e.b + r.b * e.d,
                i.c = r.c * e.a + r.d * e.c,
                i.d = r.c * e.b + r.d * e.d,
                i.tx = r.tx * e.a + r.ty * e.c + e.tx,
                i.ty = r.tx * e.b + r.ty * e.d + e.ty,
                this._worldID++
            },
            r.prototype.updateWorldTransform = r.prototype.updateTransform,
            r.IDENTITY = new r,
            e.exports = r
        }, {
            "../math": 102
        }],
        84: [function(t, e, i) {
            function r() {
                s.call(this),
                this.position = new n.ObservablePoint(this.onChange, this, 0, 0),
                this.scale = new n.ObservablePoint(this.onChange, this, 1, 1),
                this.pivot = new n.ObservablePoint(this.onChange, this, 0, 0),
                this.skew = new n.ObservablePoint(this.updateSkew, this, 0, 0),
                this._rotation = 0,
                this._sr = Math.sin(0),
                this._cr = Math.cos(0),
                this._cy = Math.cos(0),
                this._sy = Math.sin(0),
                this._nsx = Math.sin(0),
                this._cx = Math.cos(0),
                this._localID = 0,
                this._currentLocalID = 0
            }
            var n = t("../math"),
                s = t("./TransformBase");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            r.prototype.onChange = function() {
                this._localID++
            },
            r.prototype.updateSkew = function() {
                this._cy = Math.cos(this.skew._y),
                this._sy = Math.sin(this.skew._y),
                this._nsx = Math.sin(this.skew._x),
                this._cx = Math.cos(this.skew._x),
                this._localID++
            },
            r.prototype.updateLocalTransform = function() {
                var t = this.localTransform;
                if (this._localID !== this._currentLocalID) {
                    var e,
                        i,
                        r,
                        n;
                    e = this._cr * this.scale._x,
                    i = this._sr * this.scale._x,
                    r = -this._sr * this.scale._y,
                    n = this._cr * this.scale._y,
                    t.a = this._cy * e + this._sy * r,
                    t.b = this._cy * i + this._sy * n,
                    t.c = this._nsx * e + this._cx * r,
                    t.d = this._nsx * i + this._cx * n,
                    t.tx = this.position._x - (this.pivot._x * t.a + this.pivot._y * t.c),
                    t.ty = this.position._y - (this.pivot._x * t.b + this.pivot._y * t.d),
                    this._currentLocalID = this._localID,
                    this._parentID = -1
                }
            },
            r.prototype.updateTransform = function(t) {
                var e = t.worldTransform,
                    i = this.worldTransform,
                    r = this.localTransform;
                if (this._localID !== this._currentLocalID) {
                    var n,
                        s,
                        o,
                        a;
                    n = this._cr * this.scale._x,
                    s = this._sr * this.scale._x,
                    o = -this._sr * this.scale._y,
                    a = this._cr * this.scale._y,
                    r.a = this._cy * n + this._sy * o,
                    r.b = this._cy * s + this._sy * a,
                    r.c = this._nsx * n + this._cx * o,
                    r.d = this._nsx * s + this._cx * a,
                    r.tx = this.position._x - (this.pivot._x * r.a + this.pivot._y * r.c),
                    r.ty = this.position._y - (this.pivot._x * r.b + this.pivot._y * r.d),
                    this._currentLocalID = this._localID,
                    this._parentID = -1
                }
                this._parentID !== t._worldID && (i.a = r.a * e.a + r.b * e.c, i.b = r.a * e.b + r.b * e.d, i.c = r.c * e.a + r.d * e.c, i.d = r.c * e.b + r.d * e.d, i.tx = r.tx * e.a + r.ty * e.c + e.tx, i.ty = r.tx * e.b + r.ty * e.d + e.ty, this._parentID = t._worldID, this._worldID++)
            },
            r.prototype.setFromMatrix = function(t) {
                t.decompose(this),
                this._localID++
            },
            Object.defineProperties(r.prototype, {
                rotation: {
                    get: function() {
                        return this._rotation
                    },
                    set: function(t) {
                        this._rotation = t,
                        this._sr = Math.sin(t),
                        this._cr = Math.cos(t),
                        this._localID++
                    }
                }
            }),
            e.exports = r
        }, {
            "../math": 102,
            "./TransformBase": 83
        }],
        85: [function(t, e, i) {
            function r() {
                s.call(this),
                this.fillAlpha = 1,
                this.lineWidth = 0,
                this.lineColor = 0,
                this.graphicsData = [],
                this.tint = 16777215,
                this._prevTint = 16777215,
                this.blendMode = u.BLEND_MODES.NORMAL,
                this.currentPath = null,
                this._webGL = {},
                this.isMask = !1,
                this.boundsPadding = 0,
                this._localBounds = new d,
                this.dirty = 0,
                this.fastRectDirty = -1,
                this.clearDirty = 0,
                this.boundsDirty = -1,
                this.cachedSpriteDirty = !1,
                this._spriteRect = null,
                this._fastRect = !1
            }
            var n,
                s = t("../display/Container"),
                o = t("../textures/RenderTexture"),
                a = t("../textures/Texture"),
                h = t("./GraphicsData"),
                l = t("../sprites/Sprite"),
                c = t("../math"),
                u = t("../const"),
                d = t("../display/Bounds"),
                p = t("./utils/bezierCurveTo"),
                f = t("../renderers/canvas/CanvasRenderer"),
                _ = new c.Matrix,
                g = new c.Point;
            r._SPRITE_TEXTURE = null,
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                var t = new r;
                t.renderable = this.renderable,
                t.fillAlpha = this.fillAlpha,
                t.lineWidth = this.lineWidth,
                t.lineColor = this.lineColor,
                t.tint = this.tint,
                t.blendMode = this.blendMode,
                t.isMask = this.isMask,
                t.boundsPadding = this.boundsPadding,
                t.dirty = 0,
                t.cachedSpriteDirty = this.cachedSpriteDirty;
                for (var e = 0; e < this.graphicsData.length; ++e)
                    t.graphicsData.push(this.graphicsData[e].clone());
                return t.currentPath = t.graphicsData[t.graphicsData.length - 1], t.updateLocalBounds(), t
            },
            r.prototype.lineStyle = function(t, e, i) {
                if (this.lineWidth = t || 0, this.lineColor = e || 0, this.lineAlpha = void 0 === i ? 1 : i, this.currentPath)
                    if (this.currentPath.shape.points.length) {
                        var r = new c.Polygon(this.currentPath.shape.points.slice(-2));
                        r.closed = !1,
                        this.drawShape(r)
                    } else
                        this.currentPath.lineWidth = this.lineWidth,
                        this.currentPath.lineColor = this.lineColor,
                        this.currentPath.lineAlpha = this.lineAlpha;
                return this
            },
            r.prototype.moveTo = function(t, e) {
                var i = new c.Polygon([t, e]);
                return i.closed = !1, this.drawShape(i), this
            },
            r.prototype.lineTo = function(t, e) {
                return this.currentPath.shape.points.push(t, e), this.dirty++, this
            },
            r.prototype.quadraticCurveTo = function(t, e, i, r) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var n,
                    s,
                    o = 20,
                    a = this.currentPath.shape.points;
                0 === a.length && this.moveTo(0, 0);
                for (var h = a[a.length - 2], l = a[a.length - 1], c = 0, u = 1; o >= u; ++u)
                    c = u / o,
                    n = h + (t - h) * c,
                    s = l + (e - l) * c,
                    a.push(n + (t + (i - t) * c - n) * c, s + (e + (r - e) * c - s) * c);
                return this.dirty++, this
            },
            r.prototype.bezierCurveTo = function(t, e, i, r, n, s) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var o = this.currentPath.shape.points,
                    a = o[o.length - 2],
                    h = o[o.length - 1];
                return o.length -= 2, p(a, h, t, e, i, r, n, s, o), this.dirty++, this
            },
            r.prototype.arcTo = function(t, e, i, r, n) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e) : this.moveTo(t, e);
                var s = this.currentPath.shape.points,
                    o = s[s.length - 2],
                    a = s[s.length - 1],
                    h = a - e,
                    l = o - t,
                    c = r - e,
                    u = i - t,
                    d = Math.abs(h * u - l * c);
                if (1e-8 > d || 0 === n)
                    s[s.length - 2] === t && s[s.length - 1] === e || s.push(t, e);
                else {
                    var p = h * h + l * l,
                        f = c * c + u * u,
                        _ = h * c + l * u,
                        g = n * Math.sqrt(p) / d,
                        m = n * Math.sqrt(f) / d,
                        v = g * _ / p,
                        y = m * _ / f,
                        x = g * u + m * l,
                        b = g * c + m * h,
                        T = l * (m + v),
                        w = h * (m + v),
                        S = u * (g + y),
                        E = c * (g + y),
                        A = Math.atan2(w - b, T - x),
                        R = Math.atan2(E - b, S - x);
                    this.arc(x + t, b + e, n, A, R, l * c > u * h)
                }
                return this.dirty++, this
            },
            r.prototype.arc = function(t, e, i, r, n, s) {
                if (s = s || !1, r === n)
                    return this;
                !s && r >= n ? n += 2 * Math.PI : s && n >= r && (r += 2 * Math.PI);
                var o = s ? -1 * (r - n) : n - r,
                    a = 40 * Math.ceil(Math.abs(o) / (2 * Math.PI));
                if (0 === o)
                    return this;
                var h = t + Math.cos(r) * i,
                    l = e + Math.sin(r) * i;
                this.currentPath ? this.currentPath.shape.points.push(h, l) : this.moveTo(h, l);
                for (var c = this.currentPath.shape.points, u = o / (2 * a), d = 2 * u, p = Math.cos(u), f = Math.sin(u), _ = a - 1, g = _ % 1 / _, m = 0; _ >= m; m++) {
                    var v = m + g * m,
                        y = u + r + d * v,
                        x = Math.cos(y),
                        b = -Math.sin(y);
                    c.push((p * x + f * b) * i + t, (p * -b + f * x) * i + e)
                }
                return this.dirty++, this
            },
            r.prototype.beginFill = function(t, e) {
                return this.filling = !0, this.fillColor = t || 0, this.fillAlpha = void 0 === e ? 1 : e, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
            },
            r.prototype.endFill = function() {
                return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
            },
            r.prototype.drawRect = function(t, e, i, r) {
                return this.drawShape(new c.Rectangle(t, e, i, r)), this
            },
            r.prototype.drawRoundedRect = function(t, e, i, r, n) {
                return this.drawShape(new c.RoundedRectangle(t, e, i, r, n)), this
            },
            r.prototype.drawCircle = function(t, e, i) {
                return this.drawShape(new c.Circle(t, e, i)), this
            },
            r.prototype.drawEllipse = function(t, e, i, r) {
                return this.drawShape(new c.Ellipse(t, e, i, r)), this
            },
            r.prototype.drawPolygon = function(t) {
                var e = t,
                    i = !0;
                if (e instanceof c.Polygon && (i = e.closed, e = e.points), !Array.isArray(e)) {
                    e = new Array(arguments.length);
                    for (var r = 0; r < e.length; ++r)
                        e[r] = arguments[r]
                }
                var n = new c.Polygon(e);
                return n.closed = i, this.drawShape(n), this
            },
            r.prototype.clear = function() {
                return this.lineWidth = 0, this.filling = !1, this.dirty++, this.clearDirty++, this.graphicsData = [], this
            },
            r.prototype.isFastRect = function() {
                return 1 === this.graphicsData.length && this.graphicsData[0].shape.type === u.SHAPES.RECT && !this.graphicsData[0].lineWidth
            },
            r.prototype._renderWebGL = function(t) {
                this.dirty !== this.fastRectDirty && (this.fastRectDirty = this.dirty, this._fastRect = this.isFastRect()),
                this._fastRect ? this._renderSpriteRect(t) : (t.setObjectRenderer(t.plugins.graphics), t.plugins.graphics.render(this))
            },
            r.prototype._renderSpriteRect = function(t) {
                var e = this.graphicsData[0].shape;
                if (!this._spriteRect) {
                    if (!r._SPRITE_TEXTURE) {
                        r._SPRITE_TEXTURE = o.create(10, 10);
                        var i = t._activeRenderTarget;
                        t.bindRenderTexture(r._SPRITE_TEXTURE),
                        t.clear([1, 1, 1, 1]),
                        t.bindRenderTarget(i)
                    }
                    this._spriteRect = new l(r._SPRITE_TEXTURE)
                }
                this._spriteRect.tint = this.graphicsData[0].fillColor,
                this._spriteRect.alpha = this.graphicsData[0].fillAlpha,
                this._spriteRect.worldAlpha = this.worldAlpha * this._spriteRect.alpha,
                r._SPRITE_TEXTURE._frame.width = e.width,
                r._SPRITE_TEXTURE._frame.height = e.height,
                this._spriteRect.transform.worldTransform = this.transform.worldTransform,
                this._spriteRect.anchor.set(-e.x / e.width, -e.y / e.height),
                this._spriteRect.onAnchorUpdate(),
                this._spriteRect._renderWebGL(t)
            },
            r.prototype._renderCanvas = function(t) {
                !0 !== this.isMask && t.plugins.graphics.render(this)
            },
            r.prototype._calculateBounds = function() {
                if (this.renderable) {
                    this.boundsDirty !== this.dirty && (this.boundsDirty = this.dirty, this.updateLocalBounds(), this.dirty++, this.cachedSpriteDirty = !0);
                    var t = this._localBounds;
                    this._bounds.addFrame(this.transform, t.minX, t.minY, t.maxX, t.maxY)
                }
            },
            r.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, g);
                for (var e = this.graphicsData, i = 0; i < e.length; i++) {
                    var r = e[i];
                    if (r.fill && r.shape && r.shape.contains(g.x, g.y))
                        return !0
                }
                return !1
            },
            r.prototype.updateLocalBounds = function() {
                var t = 1 / 0,
                    e = -1 / 0,
                    i = 1 / 0,
                    r = -1 / 0;
                if (this.graphicsData.length)
                    for (var n, s, o, a, h, l, c = 0; c < this.graphicsData.length; c++) {
                        var d = this.graphicsData[c],
                            p = d.type,
                            f = d.lineWidth;
                        if (n = d.shape, p === u.SHAPES.RECT || p === u.SHAPES.RREC)
                            o = n.x - f / 2,
                            a = n.y - f / 2,
                            h = n.width + f,
                            l = n.height + f,
                            t = t > o ? o : t,
                            e = o + h > e ? o + h : e,
                            i = i > a ? a : i,
                            r = a + l > r ? a + l : r;
                        else if (p === u.SHAPES.CIRC)
                            o = n.x,
                            a = n.y,
                            h = n.radius + f / 2,
                            l = n.radius + f / 2,
                            t = t > o - h ? o - h : t,
                            e = o + h > e ? o + h : e,
                            i = i > a - l ? a - l : i,
                            r = a + l > r ? a + l : r;
                        else if (p === u.SHAPES.ELIP)
                            o = n.x,
                            a = n.y,
                            h = n.width + f / 2,
                            l = n.height + f / 2,
                            t = t > o - h ? o - h : t,
                            e = o + h > e ? o + h : e,
                            i = i > a - l ? a - l : i,
                            r = a + l > r ? a + l : r;
                        else {
                            s = n.points;
                            for (var _ = 0; _ < s.length; _ += 2)
                                o = s[_],
                                a = s[_ + 1],
                                t = t > o - f ? o - f : t,
                                e = o + f > e ? o + f : e,
                                i = i > a - f ? a - f : i,
                                r = a + f > r ? a + f : r
                        }
                    }
                else
                    t = 0,
                    e = 0,
                    i = 0,
                    r = 0;
                var g = this.boundsPadding;
                this._localBounds.minX = t - g,
                this._localBounds.maxX = e + 2 * g,
                this._localBounds.minY = i - g,
                this._localBounds.maxY = r + 2 * g
            },
            r.prototype.drawShape = function(t) {
                this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(),
                this.currentPath = null;
                var e = new h(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, t);
                return this.graphicsData.push(e), e.type === u.SHAPES.POLY && (e.shape.closed = e.shape.closed || this.filling, this.currentPath = e), this.dirty++, e
            },
            r.prototype.generateCanvasTexture = function(t, e) {
                e = e || 1;
                var i = this.getLocalBounds(),
                    r = new o.create(i.width * e, i.height * e);
                n || (n = new f),
                _.tx = -i.x,
                _.ty = -i.y,
                n.render(this, r, !1, _);
                var s = a.fromCanvas(r.baseTexture._canvasRenderTarget.canvas, t);
                return s.baseTexture.resolution = e, s
            },
            r.prototype.closePath = function() {
                var t = this.currentPath;
                return t && t.shape && t.shape.close(), this
            },
            r.prototype.addHole = function() {
                var t = this.graphicsData.pop();
                return this.currentPath = this.graphicsData[this.graphicsData.length - 1], this.currentPath.addHole(t.shape), this.currentPath = null, this
            },
            r.prototype.destroy = function() {
                s.prototype.destroy.apply(this, arguments);
                for (var t = 0; t < this.graphicsData.length; ++t)
                    this.graphicsData[t].destroy();
                for (var e in this._webgl)
                    for (var i = 0; i < this._webgl[e].data.length; ++i)
                        this._webgl[e].data[i].destroy();
                this._spriteRect && this._spriteRect.destroy(),
                this.graphicsData = null,
                this.currentPath = null,
                this._webgl = null,
                this._localBounds = null
            }
        }, {
            "../const": 78,
            "../display/Bounds": 79,
            "../display/Container": 80,
            "../math": 102,
            "../renderers/canvas/CanvasRenderer": 109,
            "../sprites/Sprite": 133,
            "../textures/RenderTexture": 143,
            "../textures/Texture": 144,
            "./GraphicsData": 86,
            "./utils/bezierCurveTo": 88
        }],
        86: [function(t, e, i) {
            function r(t, e, i, r, n, s, o) {
                this.lineWidth = t,
                this.lineColor = e,
                this.lineAlpha = i,
                this._lineTint = e,
                this.fillColor = r,
                this.fillAlpha = n,
                this._fillTint = r,
                this.fill = s,
                this.holes = [],
                this.shape = o,
                this.type = o.type
            }
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape)
            },
            r.prototype.addHole = function(t) {
                this.holes.push(t)
            },
            r.prototype.destroy = function() {
                this.shape = null,
                this.holes = null
            }
        }, {}],
        87: [function(t, e, i) {
            function r(t) {
                this.renderer = t
            }
            var n = t("../../renderers/canvas/CanvasRenderer"),
                s = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            n.registerPlugin("graphics", r),
            r.prototype.render = function(t) {
                var e = this.renderer,
                    i = e.context,
                    r = t.worldAlpha,
                    n = t.transform.worldTransform,
                    o = e.resolution;
                this._prevTint !== this.tint && (this.dirty = !0),
                i.setTransform(n.a * o, n.b * o, n.c * o, n.d * o, n.tx * o, n.ty * o),
                t.dirty && (this.updateGraphicsTint(t), t.dirty = !1),
                e.setBlendMode(t.blendMode);
                for (var a = 0; a < t.graphicsData.length; a++) {
                    var h = t.graphicsData[a],
                        l = h.shape,
                        c = h._fillTint,
                        u = h._lineTint;
                    if (i.lineWidth = h.lineWidth, h.type === s.SHAPES.POLY) {
                        i.beginPath(),
                        this.renderPolygon(l.points, l.closed, i);
                        for (var d = 0; d < h.holes.length; d++) {
                            var p = h.holes[d];
                            this.renderPolygon(p.points, !0, i)
                        }
                        h.fill && (i.globalAlpha = h.fillAlpha * r, i.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), i.fill()),
                        h.lineWidth && (i.globalAlpha = h.lineAlpha * r, i.strokeStyle = "#" + ("00000" + (0 | u).toString(16)).substr(-6), i.stroke())
                    } else if (h.type === s.SHAPES.RECT)
                        (h.fillColor || 0 === h.fillColor) && (i.globalAlpha = h.fillAlpha * r, i.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), i.fillRect(l.x, l.y, l.width, l.height)),
                        h.lineWidth && (i.globalAlpha = h.lineAlpha * r, i.strokeStyle = "#" + ("00000" + (0 | u).toString(16)).substr(-6), i.strokeRect(l.x, l.y, l.width, l.height));
                    else if (h.type === s.SHAPES.CIRC)
                        i.beginPath(),
                        i.arc(l.x, l.y, l.radius, 0, 2 * Math.PI),
                        i.closePath(),
                        h.fill && (i.globalAlpha = h.fillAlpha * r, i.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), i.fill()),
                        h.lineWidth && (i.globalAlpha = h.lineAlpha * r, i.strokeStyle = "#" + ("00000" + (0 | u).toString(16)).substr(-6), i.stroke());
                    else if (h.type === s.SHAPES.ELIP) {
                        var f = 2 * l.width,
                            _ = 2 * l.height,
                            g = l.x - f / 2,
                            m = l.y - _ / 2;
                        i.beginPath();
                        var v = .5522848,
                            y = f / 2 * v,
                            x = _ / 2 * v,
                            b = g + f,
                            T = m + _,
                            w = g + f / 2,
                            S = m + _ / 2;
                        i.moveTo(g, S),
                        i.bezierCurveTo(g, S - x, w - y, m, w, m),
                        i.bezierCurveTo(w + y, m, b, S - x, b, S),
                        i.bezierCurveTo(b, S + x, w + y, T, w, T),
                        i.bezierCurveTo(w - y, T, g, S + x, g, S),
                        i.closePath(),
                        h.fill && (i.globalAlpha = h.fillAlpha * r, i.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), i.fill()),
                        h.lineWidth && (i.globalAlpha = h.lineAlpha * r, i.strokeStyle = "#" + ("00000" + (0 | u).toString(16)).substr(-6), i.stroke())
                    } else if (h.type === s.SHAPES.RREC) {
                        var E = l.x,
                            A = l.y,
                            R = l.width,
                            C = l.height,
                            M = l.radius,
                            P = Math.min(R, C) / 2 | 0;
                        M = M > P ? P : M,
                        i.beginPath(),
                        i.moveTo(E, A + M),
                        i.lineTo(E, A + C - M),
                        i.quadraticCurveTo(E, A + C, E + M, A + C),
                        i.lineTo(E + R - M, A + C),
                        i.quadraticCurveTo(E + R, A + C, E + R, A + C - M),
                        i.lineTo(E + R, A + M),
                        i.quadraticCurveTo(E + R, A, E + R - M, A),
                        i.lineTo(E + M, A),
                        i.quadraticCurveTo(E, A, E, A + M),
                        i.closePath(),
                        (h.fillColor || 0 === h.fillColor) && (i.globalAlpha = h.fillAlpha * r, i.fillStyle = "#" + ("00000" + (0 | c).toString(16)).substr(-6), i.fill()),
                        h.lineWidth && (i.globalAlpha = h.lineAlpha * r, i.strokeStyle = "#" + ("00000" + (0 | u).toString(16)).substr(-6), i.stroke())
                    }
                }
            },
            r.prototype.updateGraphicsTint = function(t) {
                t._prevTint = t.tint;
                for (var e = (t.tint >> 16 & 255) / 255, i = (t.tint >> 8 & 255) / 255, r = (255 & t.tint) / 255, n = 0; n < t.graphicsData.length; n++) {
                    var s = t.graphicsData[n],
                        o = 0 | s.fillColor,
                        a = 0 | s.lineColor;
                    s._fillTint = ((o >> 16 & 255) / 255 * e * 255 << 16) + ((o >> 8 & 255) / 255 * i * 255 << 8) + (255 & o) / 255 * r * 255,
                    s._lineTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * i * 255 << 8) + (255 & a) / 255 * r * 255
                }
            },
            r.prototype.renderPolygon = function(t, e, i) {
                i.moveTo(t[0], t[1]);
                for (var r = 1; r < t.length / 2; r++)
                    i.lineTo(t[2 * r], t[2 * r + 1]);
                e && i.closePath()
            },
            r.prototype.destroy = function() {
                this.renderer = null
            }
        }, {
            "../../const": 78,
            "../../renderers/canvas/CanvasRenderer": 109
        }],
        88: [function(t, e, i) {
            var r = function(t, e, i, r, n, s, o, a, h) {
                h = h || [];
                var l,
                    c,
                    u,
                    d,
                    p,
                    f = 20;
                h.push(t, e);
                for (var _ = 0, g = 1; f >= g; ++g)
                    _ = g / f,
                    l = 1 - _,
                    c = l * l,
                    u = c * l,
                    d = _ * _,
                    p = d * _,
                    h.push(u * t + 3 * c * _ * i + 3 * l * d * n + p * o, u * e + 3 * c * _ * r + 3 * l * d * s + p * a);
                return h
            };
            e.exports = r
        }, {}],
        89: [function(t, e, i) {
            function r(t) {
                o.call(this, t),
                this.graphicsDataPool = [],
                this.primitiveShader = null,
                this.gl = t.gl,
                this.CONTEXT_UID = 0
            }
            var n = t("../../utils"),
                s = t("../../const"),
                o = t("../../renderers/webgl/utils/ObjectRenderer"),
                a = t("../../renderers/webgl/WebGLRenderer"),
                h = t("./WebGLGraphicsData"),
                l = t("./shaders/PrimitiveShader"),
                c = t("./utils/buildPoly"),
                u = t("./utils/buildRectangle"),
                d = t("./utils/buildRoundedRectangle"),
                p = t("./utils/buildCircle");
            r.prototype = Object.create(o.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            a.registerPlugin("graphics", r),
            r.prototype.onContextChange = function() {
                this.gl = this.renderer.gl,
                this.CONTEXT_UID = this.renderer.CONTEXT_UID,
                this.primitiveShader = new l(this.gl)
            },
            r.prototype.destroy = function() {
                o.prototype.destroy.call(this);
                for (var t = 0; t < this.graphicsDataPool.length; ++t)
                    this.graphicsDataPool[t].destroy();
                this.graphicsDataPool = null
            },
            r.prototype.render = function(t) {
                var e,
                    i = this.renderer,
                    r = i.gl,
                    s = t._webGL[this.CONTEXT_UID];
                s && t.dirty === s.dirty || (this.updateGraphics(t), s = t._webGL[this.CONTEXT_UID]);
                var o = this.primitiveShader;
                i.bindShader(o),
                i.state.setBlendMode(t.blendMode);
                for (var a = 0, h = s.data.length; h > a; a++) {
                    e = s.data[a];
                    var l = e.shader;
                    i.bindShader(l),
                    l.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0),
                    l.uniforms.tint = n.hex2rgb(t.tint),
                    l.uniforms.alpha = t.worldAlpha,
                    e.vao.bind().draw(r.TRIANGLE_STRIP, e.indices.length).unbind()
                }
            },
            r.prototype.updateGraphics = function(t) {
                var e = this.renderer.gl,
                    i = t._webGL[this.CONTEXT_UID];
                i || (i = t._webGL[this.CONTEXT_UID] = {
                    lastIndex: 0,
                    data: [],
                    gl: e,
                    clearDirty: -1,
                    dirty: -1
                }),
                i.dirty = t.dirty;
                var r;
                if (t.clearDirty !== i.clearDirty) {
                    for (i.clearDirty = t.clearDirty, r = 0; r < i.data.length; r++) {
                        var n = i.data[r];
                        this.graphicsDataPool.push(n)
                    }
                    i.data = [],
                    i.lastIndex = 0
                }
                var o;
                for (r = i.lastIndex; r < t.graphicsData.length; r++) {
                    var a = t.graphicsData[r];
                    o = this.getWebGLData(i, 0),
                    a.type === s.SHAPES.POLY && c(a, o),
                    a.type === s.SHAPES.RECT ? u(a, o) : a.type === s.SHAPES.CIRC || a.type === s.SHAPES.ELIP ? p(a, o) : a.type === s.SHAPES.RREC && d(a, o),
                    i.lastIndex++
                }
                for (r = 0; r < i.data.length; r++)
                    o = i.data[r],
                    o.dirty && o.upload()
            },
            r.prototype.getWebGLData = function(t, e) {
                var i = t.data[t.data.length - 1];
                return (!i || i.points.length > 32e4) && (i = this.graphicsDataPool.pop() || new h(this.renderer.gl, this.primitiveShader, this.renderer.state.attribsState), i.reset(e), t.data.push(i)), i.dirty = !0, i
            }
        }, {
            "../../const": 78,
            "../../renderers/webgl/WebGLRenderer": 116,
            "../../renderers/webgl/utils/ObjectRenderer": 126,
            "../../utils": 151,
            "./WebGLGraphicsData": 90,
            "./shaders/PrimitiveShader": 91,
            "./utils/buildCircle": 92,
            "./utils/buildPoly": 94,
            "./utils/buildRectangle": 95,
            "./utils/buildRoundedRectangle": 96
        }],
        90: [function(t, e, i) {
            function r(t, e, i) {
                this.gl = t,
                this.color = [0, 0, 0],
                this.points = [],
                this.indices = [],
                this.buffer = n.GLBuffer.createVertexBuffer(t),
                this.indexBuffer = n.GLBuffer.createIndexBuffer(t),
                this.dirty = !0,
                this.glPoints = null,
                this.glIndices = null,
                this.shader = e,
                this.vao = new n.VertexArrayObject(t, i).addIndex(this.indexBuffer).addAttribute(this.buffer, e.attributes.aVertexPosition, t.FLOAT, !1, 24, 0).addAttribute(this.buffer, e.attributes.aColor, t.FLOAT, !1, 24, 8)
            }
            var n = t("pixi-gl-core");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.reset = function() {
                this.points.length = 0,
                this.indices.length = 0
            },
            r.prototype.upload = function() {
                this.glPoints = new Float32Array(this.points),
                this.buffer.upload(this.glPoints),
                this.glIndices = new Uint16Array(this.indices),
                this.indexBuffer.upload(this.glIndices),
                this.dirty = !1
            },
            r.prototype.destroy = function() {
                this.color = null,
                this.points = null,
                this.indices = null,
                this.vao.destroy(),
                this.buffer.destroy(),
                this.indexBuffer.destroy(),
                this.gl = null,
                this.buffer = null,
                this.indexBuffer = null,
                this.glPoints = null,
                this.glIndices = null
            }
        }, {
            "pixi-gl-core": 12
        }],
        91: [function(t, e, i) {
            function r(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"))
            }
            var n = t("../../../Shader");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../../Shader": 77
        }],
        92: [function(t, e, i) {
            var r = t("./buildLine"),
                n = t("../../../const"),
                s = t("../../../utils"),
                o = function(t, e) {
                    var i,
                        o,
                        a = t.shape,
                        h = a.x,
                        l = a.y;
                    t.type === n.SHAPES.CIRC ? (i = a.radius, o = a.radius) : (i = a.width, o = a.height);
                    var c = Math.floor(30 * Math.sqrt(a.radius)) || Math.floor(15 * Math.sqrt(a.width + a.height)),
                        u = 2 * Math.PI / c,
                        d = 0;
                    if (t.fill) {
                        var p = s.hex2rgb(t.fillColor),
                            f = t.fillAlpha,
                            _ = p[0] * f,
                            g = p[1] * f,
                            m = p[2] * f,
                            v = e.points,
                            y = e.indices,
                            x = v.length / 6;
                        for (y.push(x), d = 0; c + 1 > d; d++)
                            v.push(h, l, _, g, m, f),
                            v.push(h + Math.sin(u * d) * i, l + Math.cos(u * d) * o, _, g, m, f),
                            y.push(x++, x++);
                        y.push(x - 1)
                    }
                    if (t.lineWidth) {
                        var b = t.points;
                        for (t.points = [], d = 0; c + 1 > d; d++)
                            t.points.push(h + Math.sin(u * d) * i, l + Math.cos(u * d) * o);
                        r(t, e),
                        t.points = b
                    }
                };
            e.exports = o
        }, {
            "../../../const": 78,
            "../../../utils": 151,
            "./buildLine": 93
        }],
        93: [function(t, e, i) {
            var r = t("../../../math"),
                n = t("../../../utils"),
                s = function(t, e) {
                    var i = 0,
                        s = t.points;
                    if (0 !== s.length) {
                        var o = new r.Point(s[0], s[1]),
                            a = new r.Point(s[s.length - 2], s[s.length - 1]);
                        if (o.x === a.x && o.y === a.y) {
                            s = s.slice(),
                            s.pop(),
                            s.pop(),
                            a = new r.Point(s[s.length - 2], s[s.length - 1]);
                            var h = a.x + .5 * (o.x - a.x),
                                l = a.y + .5 * (o.y - a.y);
                            s.unshift(h, l),
                            s.push(h, l)
                        }
                        var c,
                            u,
                            d,
                            p,
                            f,
                            _,
                            g,
                            m,
                            v,
                            y,
                            x,
                            b,
                            T,
                            w,
                            S,
                            E,
                            A,
                            R,
                            C,
                            M,
                            P,
                            O,
                            D,
                            L = e.points,
                            k = e.indices,
                            I = s.length / 2,
                            F = s.length,
                            N = L.length / 6,
                            B = t.lineWidth / 2,
                            U = n.hex2rgb(t.lineColor),
                            j = t.lineAlpha,
                            X = U[0] * j,
                            G = U[1] * j,
                            z = U[2] * j;
                        for (d = s[0], p = s[1], f = s[2], _ = s[3], v = -(p - _), y = d - f, D = Math.sqrt(v * v + y * y), v /= D, y /= D, v *= B, y *= B, L.push(d - v, p - y, X, G, z, j), L.push(d + v, p + y, X, G, z, j), i = 1; I - 1 > i; i++)
                            d = s[2 * (i - 1)],
                            p = s[2 * (i - 1) + 1],
                            f = s[2 * i],
                            _ = s[2 * i + 1],
                            g = s[2 * (i + 1)],
                            m = s[2 * (i + 1) + 1],
                            v = -(p - _),
                            y = d - f,
                            D = Math.sqrt(v * v + y * y),
                            v /= D,
                            y /= D,
                            v *= B,
                            y *= B,
                            x = -(_ - m),
                            b = f - g,
                            D = Math.sqrt(x * x + b * b),
                            x /= D,
                            b /= D,
                            x *= B,
                            b *= B,
                            S = -y + p - (-y + _),
                            E = -v + f - (-v + d),
                            A = (-v + d) * (-y + _) - (-v + f) * (-y + p),
                            R = -b + m - (-b + _),
                            C = -x + f - (-x + g),
                            M = (-x + g) * (-b + _) - (-x + f) * (-b + m),
                            P = S * C - R * E,
                            Math.abs(P) < .1 ? (P += 10.1, L.push(f - v, _ - y, X, G, z, j), L.push(f + v, _ + y, X, G, z, j)) : (c = (E * M - C * A) / P, u = (R * A - S * M) / P, O = (c - f) * (c - f) + (u - _) * (u - _), O > 19600 ? (T = v - x, w = y - b, D = Math.sqrt(T * T + w * w), T /= D, w /= D, T *= B, w *= B, L.push(f - T, _ - w), L.push(X, G, z, j), L.push(f + T, _ + w), L.push(X, G, z, j), L.push(f - T, _ - w), L.push(X, G, z, j), F++) : (L.push(c, u), L.push(X, G, z, j), L.push(f - (c - f), _ - (u - _)), L.push(X, G, z, j)));
                        for (d = s[2 * (I - 2)], p = s[2 * (I - 2) + 1], f = s[2 * (I - 1)], _ = s[2 * (I - 1) + 1], v = -(p - _), y = d - f, D = Math.sqrt(v * v + y * y), v /= D, y /= D, v *= B, y *= B, L.push(f - v, _ - y), L.push(X, G, z, j), L.push(f + v, _ + y), L.push(X, G, z, j), k.push(N), i = 0; F > i; i++)
                            k.push(N++);
                        k.push(N - 1)
                    }
                };
            e.exports = s
        }, {
            "../../../math": 102,
            "../../../utils": 151
        }],
        94: [function(t, e, i) {
            var r = t("./buildLine"),
                n = t("../../../utils"),
                s = t("earcut"),
                o = function(t, e) {
                    t.points = t.shape.points.slice();
                    var i = t.points;
                    if (t.fill && i.length > 6) {
                        for (var o = [], a = t.holes, h = 0; h < a.length; h++) {
                            var l = a[h];
                            o.push(i.length / 2),
                            i = i.concat(l.points)
                        }
                        var c = e.points,
                            u = e.indices,
                            d = i.length / 2,
                            p = n.hex2rgb(t.fillColor),
                            f = t.fillAlpha,
                            _ = p[0] * f,
                            g = p[1] * f,
                            m = p[2] * f,
                            v = s(i, o, 2);
                        if (!v)
                            return;
                        var y = c.length / 6;
                        for (h = 0; h < v.length; h += 3)
                            u.push(v[h] + y),
                            u.push(v[h] + y),
                            u.push(v[h + 1] + y),
                            u.push(v[h + 2] + y),
                            u.push(v[h + 2] + y);
                        for (h = 0; d > h; h++)
                            c.push(i[2 * h], i[2 * h + 1], _, g, m, f)
                    }
                    t.lineWidth > 0 && r(t, e)
                };
            e.exports = o
        }, {
            "../../../utils": 151,
            "./buildLine": 93,
            earcut: 2
        }],
        95: [function(t, e, i) {
            var r = t("./buildLine"),
                n = t("../../../utils"),
                s = function(t, e) {
                    var i = t.shape,
                        s = i.x,
                        o = i.y,
                        a = i.width,
                        h = i.height;
                    if (t.fill) {
                        var l = n.hex2rgb(t.fillColor),
                            c = t.fillAlpha,
                            u = l[0] * c,
                            d = l[1] * c,
                            p = l[2] * c,
                            f = e.points,
                            _ = e.indices,
                            g = f.length / 6;
                        f.push(s, o),
                        f.push(u, d, p, c),
                        f.push(s + a, o),
                        f.push(u, d, p, c),
                        f.push(s, o + h),
                        f.push(u, d, p, c),
                        f.push(s + a, o + h),
                        f.push(u, d, p, c),
                        _.push(g, g, g + 1, g + 2, g + 3, g + 3)
                    }
                    if (t.lineWidth) {
                        var m = t.points;
                        t.points = [s, o, s + a, o, s + a, o + h, s, o + h, s, o],
                        r(t, e),
                        t.points = m
                    }
                };
            e.exports = s
        }, {
            "../../../utils": 151,
            "./buildLine": 93
        }],
        96: [function(t, e, i) {
            var r = t("earcut"),
                n = t("./buildLine"),
                s = t("../../../utils"),
                o = function(t, e) {
                    var i = t.shape,
                        o = i.x,
                        h = i.y,
                        l = i.width,
                        c = i.height,
                        u = i.radius,
                        d = [];
                    if (d.push(o, h + u), a(o, h + c - u, o, h + c, o + u, h + c, d), a(o + l - u, h + c, o + l, h + c, o + l, h + c - u, d), a(o + l, h + u, o + l, h, o + l - u, h, d), a(o + u, h, o, h, o, h + u + 1e-10, d), t.fill) {
                        var p = s.hex2rgb(t.fillColor),
                            f = t.fillAlpha,
                            _ = p[0] * f,
                            g = p[1] * f,
                            m = p[2] * f,
                            v = e.points,
                            y = e.indices,
                            x = v.length / 6,
                            b = r(d, null, 2),
                            T = 0;
                        for (T = 0; T < b.length; T += 3)
                            y.push(b[T] + x),
                            y.push(b[T] + x),
                            y.push(b[T + 1] + x),
                            y.push(b[T + 2] + x),
                            y.push(b[T + 2] + x);
                        for (T = 0; T < d.length; T++)
                            v.push(d[T], d[++T], _, g, m, f)
                    }
                    if (t.lineWidth) {
                        var w = t.points;
                        t.points = d,
                        n(t, e),
                        t.points = w
                    }
                },
                a = function(t, e, i, r, n, s, o) {
                    function a(t, e, i) {
                        return t + (e - t) * i
                    }
                    for (var h, l, c, u, d, p, f = 20, _ = o || [], g = 0, m = 0; f >= m; m++)
                        g = m / f,
                        h = a(t, i, g),
                        l = a(e, r, g),
                        c = a(i, n, g),
                        u = a(r, s, g),
                        d = a(h, c, g),
                        p = a(l, u, g),
                        _.push(d, p);
                    return _
                };
            e.exports = o
        }, {
            "../../../utils": 151,
            "./buildLine": 93,
            earcut: 2
        }],
        97: [function(t, e, i) {
            var r = e.exports = Object.assign(t("./const"), t("./math"), {
                utils: t("./utils"),
                ticker: t("./ticker"),
                DisplayObject: t("./display/DisplayObject"),
                Container: t("./display/Container"),
                Transform: t("./display/Transform"),
                TransformStatic: t("./display/TransformStatic"),
                TransformBase: t("./display/TransformBase"),
                Sprite: t("./sprites/Sprite"),
                CanvasSpriteRenderer: t("./sprites/canvas/CanvasSpriteRenderer"),
                CanvasTinter: t("./sprites/canvas/CanvasTinter"),
                SpriteRenderer: t("./sprites/webgl/SpriteRenderer"),
                Text: t("./text/Text"),
                TextStyle: t("./text/TextStyle"),
                Graphics: t("./graphics/Graphics"),
                GraphicsData: t("./graphics/GraphicsData"),
                GraphicsRenderer: t("./graphics/webgl/GraphicsRenderer"),
                CanvasGraphicsRenderer: t("./graphics/canvas/CanvasGraphicsRenderer"),
                Texture: t("./textures/Texture"),
                BaseTexture: t("./textures/BaseTexture"),
                RenderTexture: t("./textures/RenderTexture"),
                BaseRenderTexture: t("./textures/BaseRenderTexture"),
                VideoBaseTexture: t("./textures/VideoBaseTexture"),
                TextureUvs: t("./textures/TextureUvs"),
                CanvasRenderer: t("./renderers/canvas/CanvasRenderer"),
                CanvasRenderTarget: t("./renderers/canvas/utils/CanvasRenderTarget"),
                Shader: t("./Shader"),
                WebGLRenderer: t("./renderers/webgl/WebGLRenderer"),
                WebGLManager: t("./renderers/webgl/managers/WebGLManager"),
                ObjectRenderer: t("./renderers/webgl/utils/ObjectRenderer"),
                RenderTarget: t("./renderers/webgl/utils/RenderTarget"),
                Quad: t("./renderers/webgl/utils/Quad"),
                SpriteMaskFilter: t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter"),
                Filter: t("./renderers/webgl/filters/Filter"),
                glCore: t("pixi-gl-core"),
                autoDetectRenderer: function(t, e, i, n) {
                    return t = t || 800, e = e || 600, !n && r.utils.isWebGLSupported() ? new r.WebGLRenderer(t, e, i) : new r.CanvasRenderer(t, e, i)
                }
            })
        }, {
            "./Shader": 77,
            "./const": 78,
            "./display/Container": 80,
            "./display/DisplayObject": 81,
            "./display/Transform": 82,
            "./display/TransformBase": 83,
            "./display/TransformStatic": 84,
            "./graphics/Graphics": 85,
            "./graphics/GraphicsData": 86,
            "./graphics/canvas/CanvasGraphicsRenderer": 87,
            "./graphics/webgl/GraphicsRenderer": 89,
            "./math": 102,
            "./renderers/canvas/CanvasRenderer": 109,
            "./renderers/canvas/utils/CanvasRenderTarget": 111,
            "./renderers/webgl/WebGLRenderer": 116,
            "./renderers/webgl/filters/Filter": 118,
            "./renderers/webgl/filters/spriteMask/SpriteMaskFilter": 121,
            "./renderers/webgl/managers/WebGLManager": 125,
            "./renderers/webgl/utils/ObjectRenderer": 126,
            "./renderers/webgl/utils/Quad": 127,
            "./renderers/webgl/utils/RenderTarget": 128,
            "./sprites/Sprite": 133,
            "./sprites/canvas/CanvasSpriteRenderer": 134,
            "./sprites/canvas/CanvasTinter": 135,
            "./sprites/webgl/SpriteRenderer": 137,
            "./text/Text": 139,
            "./text/TextStyle": 140,
            "./textures/BaseRenderTexture": 141,
            "./textures/BaseTexture": 142,
            "./textures/RenderTexture": 143,
            "./textures/Texture": 144,
            "./textures/TextureUvs": 145,
            "./textures/VideoBaseTexture": 146,
            "./ticker": 148,
            "./utils": 151,
            "pixi-gl-core": 12
        }],
        98: [function(t, e, i) {
            function r(t) {
                return 0 > t ? -1 : t > 0 ? 1 : 0
            }
            function n() {
                for (var t = 0; 16 > t; t++) {
                    var e = [];
                    u.push(e);
                    for (var i = 0; 16 > i; i++)
                        for (var n = r(s[t] * s[i] + a[t] * o[i]), d = r(o[t] * s[i] + h[t] * o[i]), p = r(s[t] * a[i] + a[t] * h[i]), f = r(o[t] * a[i] + h[t] * h[i]), _ = 0; 16 > _; _++)
                            if (s[_] === n && o[_] === d && a[_] === p && h[_] === f) {
                                e.push(_);
                                break
                            }
                }
                for (t = 0; 16 > t; t++) {
                    var g = new c;
                    g.set(s[t], o[t], a[t], h[t], 0, 0),
                    l.push(g)
                }
            }
            var s = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
                o = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
                a = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
                h = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
                l = [],
                c = t("./Matrix"),
                u = [];
            n();
            var d = {
                E: 0,
                SE: 1,
                S: 2,
                SW: 3,
                W: 4,
                NW: 5,
                N: 6,
                NE: 7,
                MIRROR_VERTICAL: 8,
                MIRROR_HORIZONTAL: 12,
                uX: function(t) {
                    return s[t]
                },
                uY: function(t) {
                    return o[t]
                },
                vX: function(t) {
                    return a[t]
                },
                vY: function(t) {
                    return h[t]
                },
                inv: function(t) {
                    return 8 & t ? 15 & t : 7 & -t
                },
                add: function(t, e) {
                    return u[t][e]
                },
                sub: function(t, e) {
                    return u[t][d.inv(e)]
                },
                rotate180: function(t) {
                    return 4 ^ t
                },
                isSwapWidthHeight: function(t) {
                    return 2 == (3 & t)
                },
                byDirection: function(t, e) {
                    return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? d.S : d.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? d.E : d.W : e > 0 ? t > 0 ? d.SE : d.SW : t > 0 ? d.NE : d.NW
                },
                matrixAppendRotationInv: function(t, e, i, r) {
                    var n = l[d.inv(e)];
                    i = i || 0,
                    r = r || 0,
                    n.tx = i,
                    n.ty = r,
                    t.append(n)
                }
            };
            e.exports = d
        }, {
            "./Matrix": 99
        }],
        99: [function(t, e, i) {
            function r() {
                this.a = 1,
                this.b = 0,
                this.c = 0,
                this.d = 1,
                this.tx = 0,
                this.ty = 0,
                this.array = null
            }
            var n = t("./Point");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.fromArray = function(t) {
                this.a = t[0],
                this.b = t[1],
                this.c = t[3],
                this.d = t[4],
                this.tx = t[2],
                this.ty = t[5]
            },
            r.prototype.set = function(t, e, i, r, n, s) {
                return this.a = t, this.b = e, this.c = i, this.d = r, this.tx = n, this.ty = s, this
            },
            r.prototype.toArray = function(t, e) {
                this.array || (this.array = new Float32Array(9));
                var i = e || this.array;
                return t ? (i[0] = this.a, i[1] = this.b, i[2] = 0, i[3] = this.c, i[4] = this.d, i[5] = 0, i[6] = this.tx, i[7] = this.ty, i[8] = 1) : (i[0] = this.a, i[1] = this.c, i[2] = this.tx, i[3] = this.b, i[4] = this.d, i[5] = this.ty, i[6] = 0, i[7] = 0, i[8] = 1), i
            },
            r.prototype.apply = function(t, e) {
                e = e || new n;
                var i = t.x,
                    r = t.y;
                return e.x = this.a * i + this.c * r + this.tx, e.y = this.b * i + this.d * r + this.ty, e
            },
            r.prototype.applyInverse = function(t, e) {
                e = e || new n;
                var i = 1 / (this.a * this.d + this.c * -this.b),
                    r = t.x,
                    s = t.y;
                return e.x = this.d * i * r + -this.c * i * s + (this.ty * this.c - this.tx * this.d) * i, e.y = this.a * i * s + -this.b * i * r + (-this.ty * this.a + this.tx * this.b) * i, e
            },
            r.prototype.translate = function(t, e) {
                return this.tx += t, this.ty += e, this
            },
            r.prototype.scale = function(t, e) {
                return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
            },
            r.prototype.rotate = function(t) {
                var e = Math.cos(t),
                    i = Math.sin(t),
                    r = this.a,
                    n = this.c,
                    s = this.tx;
                return this.a = r * e - this.b * i, this.b = r * i + this.b * e, this.c = n * e - this.d * i, this.d = n * i + this.d * e, this.tx = s * e - this.ty * i, this.ty = s * i + this.ty * e, this
            },
            r.prototype.append = function(t) {
                var e = this.a,
                    i = this.b,
                    r = this.c,
                    n = this.d;
                return this.a = t.a * e + t.b * r, this.b = t.a * i + t.b * n, this.c = t.c * e + t.d * r, this.d = t.c * i + t.d * n, this.tx = t.tx * e + t.ty * r + this.tx, this.ty = t.tx * i + t.ty * n + this.ty, this
            },
            r.prototype.setTransform = function(t, e, i, r, n, s, o, a, h) {
                var l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _,
                    g,
                    m,
                    v;
                return p = Math.sin(o), f = Math.cos(o), _ = Math.cos(h), g = Math.sin(h), m = -Math.sin(a), v = Math.cos(a), l = f * n, c = p * n, u = -p * s, d = f * s, this.a = _ * l + g * u, this.b = _ * c + g * d, this.c = m * l + v * u, this.d = m * c + v * d, this.tx = t + (i * l + r * u), this.ty = e + (i * c + r * d), this
            },
            r.prototype.prepend = function(t) {
                var e = this.tx;
                if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                    var i = this.a,
                        r = this.c;
                    this.a = i * t.a + this.b * t.c,
                    this.b = i * t.b + this.b * t.d,
                    this.c = r * t.a + this.d * t.c,
                    this.d = r * t.b + this.d * t.d
                }
                return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
            },
            r.prototype.decompose = function(t) {
                var e = this.a,
                    i = this.b,
                    r = this.c,
                    n = this.d,
                    s = Math.atan2(-r, n),
                    o = Math.atan2(i, e);
                return 1e-5 > Math.abs(1 - s / o) ? (t.rotation = o, 0 > e && n >= 0 && (t.rotation += t.rotation <= 0 ? Math.PI : -Math.PI), t.skew.x = t.skew.y = 0) : (t.skew.x = s, t.skew.y = o), t.scale.x = Math.sqrt(e * e + i * i), t.scale.y = Math.sqrt(r * r + n * n), t.position.x = this.tx, t.position.y = this.ty, t
            },
            r.prototype.invert = function() {
                var t = this.a,
                    e = this.b,
                    i = this.c,
                    r = this.d,
                    n = this.tx,
                    s = t * r - e * i;
                return this.a = r / s, this.b = -e / s, this.c = -i / s, this.d = t / s, this.tx = (i * this.ty - r * n) / s, this.ty = -(t * this.ty - e * n) / s, this
            },
            r.prototype.identity = function() {
                return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
            },
            r.prototype.clone = function() {
                var t = new r;
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            },
            r.prototype.copy = function(t) {
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            },
            r.IDENTITY = new r,
            r.TEMP_MATRIX = new r
        }, {
            "./Point": 101
        }],
        100: [function(t, e, i) {
            function r(t, e, i, r) {
                this._x = i || 0,
                this._y = r || 0,
                this.cb = t,
                this.scope = e
            }
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                x: {
                    get: function() {
                        return this._x
                    },
                    set: function(t) {
                        this._x !== t && (this._x = t, this.cb.call(this.scope))
                    }
                },
                y: {
                    get: function() {
                        return this._y
                    },
                    set: function(t) {
                        this._y !== t && (this._y = t, this.cb.call(this.scope))
                    }
                }
            }),
            r.prototype.set = function(t, e) {
                var i = t || 0,
                    r = e || (0 !== e ? i : 0);
                this._x === i && this._y === r || (this._x = i, this._y = r, this.cb.call(this.scope))
            },
            r.prototype.copy = function(t) {
                this._x === t.x && this._y === t.y || (this._x = t.x, this._y = t.y, this.cb.call(this.scope))
            }
        }, {}],
        101: [function(t, e, i) {
            function r(t, e) {
                this.x = t || 0,
                this.y = e || 0
            }
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.x, this.y)
            },
            r.prototype.copy = function(t) {
                this.set(t.x, t.y)
            },
            r.prototype.equals = function(t) {
                return t.x === this.x && t.y === this.y
            },
            r.prototype.set = function(t, e) {
                this.x = t || 0,
                this.y = e || (0 !== e ? this.x : 0)
            }
        }, {}],
        102: [function(t, e, i) {
            e.exports = {
                Point: t("./Point"),
                ObservablePoint: t("./ObservablePoint"),
                Matrix: t("./Matrix"),
                GroupD8: t("./GroupD8"),
                Circle: t("./shapes/Circle"),
                Ellipse: t("./shapes/Ellipse"),
                Polygon: t("./shapes/Polygon"),
                Rectangle: t("./shapes/Rectangle"),
                RoundedRectangle: t("./shapes/RoundedRectangle")
            }
        }, {
            "./GroupD8": 98,
            "./Matrix": 99,
            "./ObservablePoint": 100,
            "./Point": 101,
            "./shapes/Circle": 103,
            "./shapes/Ellipse": 104,
            "./shapes/Polygon": 105,
            "./shapes/Rectangle": 106,
            "./shapes/RoundedRectangle": 107
        }],
        103: [function(t, e, i) {
            function r(t, e, i) {
                this.x = t || 0,
                this.y = e || 0,
                this.radius = i || 0,
                this.type = s.SHAPES.CIRC
            }
            var n = t("./Rectangle"),
                s = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.x, this.y, this.radius)
            },
            r.prototype.contains = function(t, e) {
                if (this.radius <= 0)
                    return !1;
                var i = this.x - t,
                    r = this.y - e,
                    n = this.radius * this.radius;
                return i *= i, r *= r, n >= i + r
            },
            r.prototype.getBounds = function() {
                return new n(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
            }
        }, {
            "../../const": 78,
            "./Rectangle": 106
        }],
        104: [function(t, e, i) {
            function r(t, e, i, r) {
                this.x = t || 0,
                this.y = e || 0,
                this.width = i || 0,
                this.height = r || 0,
                this.type = s.SHAPES.ELIP
            }
            var n = t("./Rectangle"),
                s = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.x, this.y, this.width, this.height)
            },
            r.prototype.contains = function(t, e) {
                if (this.width <= 0 || this.height <= 0)
                    return !1;
                var i = (t - this.x) / this.width,
                    r = (e - this.y) / this.height;
                return i *= i, r *= r, 1 >= i + r
            },
            r.prototype.getBounds = function() {
                return new n(this.x - this.width, this.y - this.height, this.width, this.height)
            }
        }, {
            "../../const": 78,
            "./Rectangle": 106
        }],
        105: [function(t, e, i) {
            function r(t) {
                var e = t;
                if (!Array.isArray(e)) {
                    e = new Array(arguments.length);
                    for (var i = 0; i < e.length; ++i)
                        e[i] = arguments[i]
                }
                if (e[0] instanceof n) {
                    for (var r = [], o = 0, a = e.length; a > o; o++)
                        r.push(e[o].x, e[o].y);
                    e = r
                }
                this.closed = !0,
                this.points = e,
                this.type = s.SHAPES.POLY
            }
            var n = t("../Point"),
                s = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.points.slice())
            },
            r.prototype.close = function() {
                var t = this.points;
                t[0] === t[t.length - 2] && t[1] === t[t.length - 1] || t.push(t[0], t[1])
            },
            r.prototype.contains = function(t, e) {
                for (var i = !1, r = this.points.length / 2, n = 0, s = r - 1; r > n; s = n++) {
                    var o = this.points[2 * n],
                        a = this.points[2 * n + 1],
                        h = this.points[2 * s],
                        l = this.points[2 * s + 1];
                    a > e != l > e && (h - o) * (e - a) / (l - a) + o > t && (i = !i)
                }
                return i
            }
        }, {
            "../../const": 78,
            "../Point": 101
        }],
        106: [function(t, e, i) {
            function r(t, e, i, r) {
                this.x = t || 0,
                this.y = e || 0,
                this.width = i || 0,
                this.height = r || 0,
                this.type = n.SHAPES.RECT
            }
            var n = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.EMPTY = new r(0, 0, 0, 0),
            r.prototype.clone = function() {
                return new r(this.x, this.y, this.width, this.height)
            },
            r.prototype.copy = function(t) {
                return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
            },
            r.prototype.contains = function(t, e) {
                return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height)
            },
            r.prototype.pad = function(t, e) {
                t = t || 0,
                e = e || (0 !== e ? t : 0),
                this.x -= t,
                this.y -= e,
                this.width += 2 * t,
                this.height += 2 * e
            },
            r.prototype.fit = function(t) {
                this.x < t.x && (this.width += this.x, this.width < 0 && (this.width = 0), this.x = t.x),
                this.y < t.y && (this.height += this.y, this.height < 0 && (this.height = 0), this.y = t.y),
                this.x + this.width > t.x + t.width && (this.width = t.width - this.x, this.width < 0 && (this.width = 0)),
                this.y + this.height > t.y + t.height && (this.height = t.height - this.y, this.height < 0 && (this.height = 0))
            },
            r.prototype.enlarge = function(t) {
                if (t !== r.EMPTY) {
                    var e = Math.min(this.x, t.x),
                        i = Math.max(this.x + this.width, t.x + t.width),
                        n = Math.min(this.y, t.y),
                        s = Math.max(this.y + this.height, t.y + t.height);
                    this.x = e,
                    this.width = i - e,
                    this.y = n,
                    this.height = s - n
                }
            }
        }, {
            "../../const": 78
        }],
        107: [function(t, e, i) {
            function r(t, e, i, r, s) {
                this.x = t || 0,
                this.y = e || 0,
                this.width = i || 0,
                this.height = r || 0,
                this.radius = s || 20,
                this.type = n.SHAPES.RREC
            }
            var n = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.clone = function() {
                return new r(this.x, this.y, this.width, this.height, this.radius)
            },
            r.prototype.contains = function(t, e) {
                return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height)
            }
        }, {
            "../../const": 78
        }],
        108: [function(t, e, i) {
            function r(t, e, i, r) {
                if (l.call(this), n.sayHello(t), r)
                    for (var s in o.DEFAULT_RENDER_OPTIONS)
                        void 0 === r[s] && (r[s] = o.DEFAULT_RENDER_OPTIONS[s]);
                else
                    r = o.DEFAULT_RENDER_OPTIONS;
                this.type = o.RENDERER_TYPE.UNKNOWN,
                this.width = e || 800,
                this.height = i || 600,
                this.view = r.view || document.createElement("canvas"),
                this.resolution = r.resolution,
                this.transparent = r.transparent,
                this.autoResize = r.autoResize || !1,
                this.blendModes = null,
                this.preserveDrawingBuffer = r.preserveDrawingBuffer,
                this.clearBeforeRender = r.clearBeforeRender,
                this.roundPixels = r.roundPixels,
                this._backgroundColor = 0,
                this._backgroundColorRgba = [0, 0, 0, 0],
                this._backgroundColorString = "#000000",
                this.backgroundColor = r.backgroundColor || this._backgroundColor,
                this._tempDisplayObjectParent = new a,
                this._lastObjectRendered = this._tempDisplayObjectParent
            }
            var n = t("../utils"),
                s = t("../math"),
                o = t("../const"),
                a = t("../display/Container"),
                h = t("../textures/RenderTexture"),
                l = t("eventemitter3"),
                c = new s.Matrix;
            r.prototype = Object.create(l.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                backgroundColor: {
                    get: function() {
                        return this._backgroundColor
                    },
                    set: function(t) {
                        this._backgroundColor = t,
                        this._backgroundColorString = n.hex2string(t),
                        n.hex2rgb(t, this._backgroundColorRgba)
                    }
                }
            }),
            r.prototype.resize = function(t, e) {
                this.width = t * this.resolution,
                this.height = e * this.resolution,
                this.view.width = this.width,
                this.view.height = this.height,
                this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px")
            },
            r.prototype.generateTexture = function(t, e, i) {
                var r = t.getLocalBounds(),
                    n = h.create(0 | r.width, 0 | r.height, e, i);
                return c.tx = -r.x, c.ty = -r.y, this.render(t, n, !1, c, !0), n
            },
            r.prototype.destroy = function(t) {
                t && this.view.parentNode && this.view.parentNode.removeChild(this.view),
                this.type = o.RENDERER_TYPE.UNKNOWN,
                this.width = 0,
                this.height = 0,
                this.view = null,
                this.resolution = 0,
                this.transparent = !1,
                this.autoResize = !1,
                this.blendModes = null,
                this.preserveDrawingBuffer = !1,
                this.clearBeforeRender = !1,
                this.roundPixels = !1,
                this._backgroundColor = 0,
                this._backgroundColorRgba = null,
                this._backgroundColorString = null,
                this.backgroundColor = 0,
                this._tempDisplayObjectParent = null,
                this._lastObjectRendered = null
            }
        }, {
            "../const": 78,
            "../display/Container": 80,
            "../math": 102,
            "../textures/RenderTexture": 143,
            "../utils": 151,
            eventemitter3: 3
        }],
        109: [function(t, e, i) {
            function r(t, e, i) {
                i = i || {},
                n.call(this, "Canvas", t, e, i),
                this.type = l.RENDERER_TYPE.CANVAS,
                this.rootContext = this.view.getContext("2d", {
                    alpha: this.transparent
                }),
                this.rootResolution = this.resolution,
                this.refresh = !0,
                this.maskManager = new s(this),
                this.smoothProperty = "imageSmoothingEnabled",
                this.rootContext.imageSmoothingEnabled || (this.rootContext.webkitImageSmoothingEnabled ? this.smoothProperty = "webkitImageSmoothingEnabled" : this.rootContext.mozImageSmoothingEnabled ? this.smoothProperty = "mozImageSmoothingEnabled" : this.rootContext.oImageSmoothingEnabled ? this.smoothProperty = "oImageSmoothingEnabled" : this.rootContext.msImageSmoothingEnabled && (this.smoothProperty = "msImageSmoothingEnabled")),
                this.initPlugins(),
                this.blendModes = a(),
                this._activeBlendMode = null,
                this.context = null,
                this.renderingToScreen = !1,
                this.resize(t, e)
            }
            var n = t("../SystemRenderer"),
                s = t("./utils/CanvasMaskManager"),
                o = t("./utils/CanvasRenderTarget"),
                a = t("./utils/mapCanvasBlendModesToPixi"),
                h = t("../../utils"),
                l = t("../../const");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            h.pluginTarget.mixin(r),
            r.prototype.render = function(t, e, i, r, n) {
                if (this.view) {
                    this.renderingToScreen = !e,
                    this.emit("prerender"),
                    e ? (e = e.baseTexture || e, e._canvasRenderTarget || (e._canvasRenderTarget = new o(e.width, e.height, e.resolution), e.source = e._canvasRenderTarget.canvas, e.valid = !0), this.context = e._canvasRenderTarget.context, this.resolution = e._canvasRenderTarget.resolution) : (this.context = this.rootContext, this.resolution = this.rootResolution);
                    var s = this.context;
                    if (e || (this._lastObjectRendered = t), !n) {
                        var a = t.parent,
                            h = this._tempDisplayObjectParent.transform.worldTransform;
                        r ? r.copy(h) : h.identity(),
                        t.parent = this._tempDisplayObjectParent,
                        t.updateTransform(),
                        t.parent = a
                    }
                    s.setTransform(1, 0, 0, 1, 0, 0),
                    s.globalAlpha = 1,
                    s.globalCompositeOperation = this.blendModes[l.BLEND_MODES.NORMAL],
                    navigator.isCocoonJS && this.view.screencanvas && (s.fillStyle = "black", s.clear()),
                    (void 0 !== i ? i : this.clearBeforeRender) && this.renderingToScreen && (this.transparent ? s.clearRect(0, 0, this.width, this.height) : (s.fillStyle = this._backgroundColorString, s.fillRect(0, 0, this.width, this.height)));
                    var c = this.context;
                    this.context = s,
                    t.renderCanvas(this),
                    this.context = c,
                    this.emit("postrender")
                }
            },
            r.prototype.setBlendMode = function(t) {
                this._activeBlendMode !== t && (this.context.globalCompositeOperation = this.blendModes[t])
            },
            r.prototype.destroy = function(t) {
                this.destroyPlugins(),
                n.prototype.destroy.call(this, t),
                this.context = null,
                this.refresh = !0,
                this.maskManager.destroy(),
                this.maskManager = null,
                this.smoothProperty = null
            },
            r.prototype.resize = function(t, e) {
                n.prototype.resize.call(this, t, e),
                this.smoothProperty && (this.rootContext[this.smoothProperty] = l.SCALE_MODES.DEFAULT === l.SCALE_MODES.LINEAR)
            }
        }, {
            "../../const": 78,
            "../../utils": 151,
            "../SystemRenderer": 108,
            "./utils/CanvasMaskManager": 110,
            "./utils/CanvasRenderTarget": 111,
            "./utils/mapCanvasBlendModesToPixi": 113
        }],
        110: [function(t, e, i) {
            function r(t) {
                this.renderer = t
            }
            var n = t("../../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.pushMask = function(t) {
                var e = this.renderer;
                e.context.save();
                var i = t.alpha,
                    r = t.transform.worldTransform,
                    n = e.resolution;
                e.context.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n),
                t._texture || (this.renderGraphicsShape(t), e.context.clip()),
                t.worldAlpha = i
            },
            r.prototype.renderGraphicsShape = function(t) {
                var e = this.renderer.context,
                    i = t.graphicsData.length;
                if (0 !== i) {
                    e.beginPath();
                    for (var r = 0; i > r; r++) {
                        var s = t.graphicsData[r],
                            o = s.shape;
                        if (s.type === n.SHAPES.POLY) {
                            var a = o.points;
                            e.moveTo(a[0], a[1]);
                            for (var h = 1; h < a.length / 2; h++)
                                e.lineTo(a[2 * h], a[2 * h + 1]);
                            a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath()
                        } else if (s.type === n.SHAPES.RECT)
                            e.rect(o.x, o.y, o.width, o.height),
                            e.closePath();
                        else if (s.type === n.SHAPES.CIRC)
                            e.arc(o.x, o.y, o.radius, 0, 2 * Math.PI),
                            e.closePath();
                        else if (s.type === n.SHAPES.ELIP) {
                            var l = 2 * o.width,
                                c = 2 * o.height,
                                u = o.x - l / 2,
                                d = o.y - c / 2,
                                p = .5522848,
                                f = l / 2 * p,
                                _ = c / 2 * p,
                                g = u + l,
                                m = d + c,
                                v = u + l / 2,
                                y = d + c / 2;
                            e.moveTo(u, y),
                            e.bezierCurveTo(u, y - _, v - f, d, v, d),
                            e.bezierCurveTo(v + f, d, g, y - _, g, y),
                            e.bezierCurveTo(g, y + _, v + f, m, v, m),
                            e.bezierCurveTo(v - f, m, u, y + _, u, y),
                            e.closePath()
                        } else if (s.type === n.SHAPES.RREC) {
                            var x = o.x,
                                b = o.y,
                                T = o.width,
                                w = o.height,
                                S = o.radius,
                                E = Math.min(T, w) / 2 | 0;
                            S = S > E ? E : S,
                            e.moveTo(x, b + S),
                            e.lineTo(x, b + w - S),
                            e.quadraticCurveTo(x, b + w, x + S, b + w),
                            e.lineTo(x + T - S, b + w),
                            e.quadraticCurveTo(x + T, b + w, x + T, b + w - S),
                            e.lineTo(x + T, b + S),
                            e.quadraticCurveTo(x + T, b, x + T - S, b),
                            e.lineTo(x + S, b),
                            e.quadraticCurveTo(x, b, x, b + S),
                            e.closePath()
                        }
                    }
                }
            },
            r.prototype.popMask = function(t) {
                t.context.restore()
            },
            r.prototype.destroy = function() {}
        }, {
            "../../../const": 78
        }],
        111: [function(t, e, i) {
            function r(t, e, i) {
                this.canvas = document.createElement("canvas"),
                this.context = this.canvas.getContext("2d"),
                this.resolution = i || n.RESOLUTION,
                this.resize(t, e)
            }
            var n = t("../../../const");
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return this.canvas.width
                    },
                    set: function(t) {
                        this.canvas.width = t
                    }
                },
                height: {
                    get: function() {
                        return this.canvas.height
                    },
                    set: function(t) {
                        this.canvas.height = t
                    }
                }
            }),
            r.prototype.clear = function() {
                this.context.setTransform(1, 0, 0, 1, 0, 0),
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            },
            r.prototype.resize = function(t, e) {
                this.canvas.width = t * this.resolution,
                this.canvas.height = e * this.resolution
            },
            r.prototype.destroy = function() {
                this.context = null,
                this.canvas = null
            }
        }, {
            "../../../const": 78
        }],
        112: [function(t, e, i) {
            var r = function() {
                if ("undefined" == typeof document)
                    return !1;
                var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",
                    e = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
                    i = new Image;
                i.src = t + "AP804Oa6" + e;
                var r = new Image;
                r.src = t + "/wCKxvRF" + e;
                var n = document.createElement("canvas");
                n.width = 6,
                n.height = 1;
                var s = n.getContext("2d");
                s.globalCompositeOperation = "multiply",
                s.drawImage(i, 0, 0),
                s.drawImage(r, 2, 0);
                var o = s.getImageData(2, 0, 1, 1);
                if (!o)
                    return !1;
                var a = o.data;
                return 255 === a[0] && 0 === a[1] && 0 === a[2]
            };
            e.exports = r
        }, {}],
        113: [function(t, e, i) {
            function r(t) {
                return t = t || [], s() ? (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "multiply", t[n.BLEND_MODES.SCREEN] = "screen", t[n.BLEND_MODES.OVERLAY] = "overlay", t[n.BLEND_MODES.DARKEN] = "darken", t[n.BLEND_MODES.LIGHTEN] = "lighten", t[n.BLEND_MODES.COLOR_DODGE] = "color-dodge", t[n.BLEND_MODES.COLOR_BURN] = "color-burn", t[n.BLEND_MODES.HARD_LIGHT] = "hard-light", t[n.BLEND_MODES.SOFT_LIGHT] = "soft-light", t[n.BLEND_MODES.DIFFERENCE] = "difference", t[n.BLEND_MODES.EXCLUSION] = "exclusion", t[n.BLEND_MODES.HUE] = "hue", t[n.BLEND_MODES.SATURATION] = "saturate", t[n.BLEND_MODES.COLOR] = "color", t[n.BLEND_MODES.LUMINOSITY] = "luminosity") : (t[n.BLEND_MODES.NORMAL] = "source-over", t[n.BLEND_MODES.ADD] = "lighter", t[n.BLEND_MODES.MULTIPLY] = "source-over", t[n.BLEND_MODES.SCREEN] = "source-over", t[n.BLEND_MODES.OVERLAY] = "source-over", t[n.BLEND_MODES.DARKEN] = "source-over", t[n.BLEND_MODES.LIGHTEN] = "source-over", t[n.BLEND_MODES.COLOR_DODGE] = "source-over", t[n.BLEND_MODES.COLOR_BURN] = "source-over", t[n.BLEND_MODES.HARD_LIGHT] = "source-over", t[n.BLEND_MODES.SOFT_LIGHT] = "source-over", t[n.BLEND_MODES.DIFFERENCE] = "source-over", t[n.BLEND_MODES.EXCLUSION] = "source-over", t[n.BLEND_MODES.HUE] = "source-over", t[n.BLEND_MODES.SATURATION] = "source-over", t[n.BLEND_MODES.COLOR] = "source-over", t[n.BLEND_MODES.LUMINOSITY] = "source-over"), t
            }
            var n = t("../../../const"),
                s = t("./canUseNewCanvasBlendModes");
            e.exports = r
        }, {
            "../../../const": 78,
            "./canUseNewCanvasBlendModes": 112
        }],
        114: [function(t, e, i) {
            function r(t) {
                this.renderer = t,
                this.count = 0,
                this.checkCount = 0,
                this.maxIdle = 3600,
                this.checkCountMax = 600,
                this.mode = n.GC_MODES.DEFAULT
            }
            var n = t("../../const");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.update = function() {
                this.count++,
                this.mode !== n.GC_MODES.MANUAL && ++this.checkCount > this.checkCountMax && (this.checkCount = 0, this.run())
            },
            r.prototype.run = function() {
                var t,
                    e,
                    i = this.renderer.textureManager,
                    r = i._managedTextures,
                    n = !1;
                for (t = 0; t < r.length; t++) {
                    var s = r[t];
                    !s._glRenderTargets && this.count - s.touched > this.maxIdle && (i.destroyTexture(s, !0), r[t] = null, n = !0)
                }
                if (n) {
                    for (e = 0, t = 0; t < r.length; t++)
                        null !== r[t] && (r[e++] = r[t]);
                    r.length = e
                }
            },
            r.prototype.unload = function(t) {
                var e = this.renderer.textureManager;
                t._texture && e.destroyTexture(t._texture, !0);
                for (var i = t.children.length - 1; i >= 0; i--)
                    this.unload(t.children[i])
            }
        }, {
            "../../const": 78
        }],
        115: [function(t, e, i) {
            var r = t("pixi-gl-core").GLTexture,
                n = t("../../const"),
                s = t("./utils/RenderTarget"),
                o = t("../../utils"),
                a = function(t) {
                    this.renderer = t,
                    this.gl = t.gl,
                    this._managedTextures = []
                };
            a.prototype.bindTexture = function() {},
            a.prototype.getTexture = function() {},
            a.prototype.updateTexture = function(t) {
                t = t.baseTexture || t;
                var e = !!t._glRenderTargets;
                if (t.hasLoaded) {
                    var i = t._glTextures[this.renderer.CONTEXT_UID];
                    if (i)
                        e ? t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width, t.height) : i.upload(t.source);
                    else {
                        if (e) {
                            var o = new s(this.gl, t.width, t.height, t.scaleMode, t.resolution);
                            o.resize(t.width, t.height),
                            t._glRenderTargets[this.renderer.CONTEXT_UID] = o,
                            i = o.texture
                        } else
                            i = new r(this.gl),
                            i.premultiplyAlpha = !0,
                            i.upload(t.source);
                        t._glTextures[this.renderer.CONTEXT_UID] = i,
                        t.on("update", this.updateTexture, this),
                        t.on("dispose", this.destroyTexture, this),
                        this._managedTextures.push(t),
                        t.isPowerOfTwo ? (t.mipmap && i.enableMipmap(), t.wrapMode === n.WRAP_MODES.CLAMP ? i.enableWrapClamp() : t.wrapMode === n.WRAP_MODES.REPEAT ? i.enableWrapRepeat() : i.enableWrapMirrorRepeat()) : i.enableWrapClamp(),
                        t.scaleMode === n.SCALE_MODES.NEAREST ? i.enableNearestScaling() : i.enableLinearScaling()
                    }
                    return i
                }
            },
            a.prototype.destroyTexture = function(t, e) {
                if (t = t.baseTexture || t, t.hasLoaded && t._glTextures[this.renderer.CONTEXT_UID] && (t._glTextures[this.renderer.CONTEXT_UID].destroy(), t.off("update", this.updateTexture, this), t.off("dispose", this.destroyTexture, this), delete t._glTextures[this.renderer.CONTEXT_UID], !e)) {
                    var i = this._managedTextures.indexOf(t);
                    -1 !== i && o.removeItems(this._managedTextures, i, 1)
                }
            },
            a.prototype.removeAll = function() {
                for (var t = 0; t < this._managedTextures.length; ++t) {
                    var e = this._managedTextures[t];
                    e._glTextures[this.renderer.CONTEXT_UID] && delete e._glTextures[this.renderer.CONTEXT_UID]
                }
            },
            a.prototype.destroy = function() {
                for (var t = 0; t < this._managedTextures.length; ++t) {
                    var e = this._managedTextures[t];
                    this.destroyTexture(e, !0),
                    e.off("update", this.updateTexture, this),
                    e.off("dispose", this.destroyTexture, this)
                }
                this._managedTextures = null
            },
            e.exports = a
        }, {
            "../../const": 78,
            "../../utils": 151,
            "./utils/RenderTarget": 128,
            "pixi-gl-core": 12
        }],
        116: [function(t, e, i) {
            function r(t, e, i) {
                i = i || {},
                n.call(this, "WebGL", t, e, i),
                this.type = v.RENDERER_TYPE.WEBGL,
                this.handleContextLost = this.handleContextLost.bind(this),
                this.handleContextRestored = this.handleContextRestored.bind(this),
                this.view.addEventListener("webglcontextlost", this.handleContextLost, !1),
                this.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1),
                this._contextOptions = {
                    alpha: this.transparent,
                    antialias: i.antialias,
                    premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent,
                    stencil: !0,
                    preserveDrawingBuffer: i.preserveDrawingBuffer
                },
                this._backgroundColorRgba[3] = this.transparent ? 0 : 1,
                this.maskManager = new s(this),
                this.stencilManager = new o(this),
                this.emptyRenderer = new l(this),
                this.currentRenderer = this.emptyRenderer,
                this.initPlugins(),
                i.context && _(i.context),
                this.gl = i.context || p(this.view, this._contextOptions),
                this.CONTEXT_UID = y++,
                this.state = new d(this.gl),
                this.renderingToScreen = !0,
                this._initContext(),
                this.filterManager = new a(this),
                this.drawModes = f(this.gl),
                this._activeShader = null,
                this._activeRenderTarget = null,
                this._activeTextureLocation = 999,
                this._activeTexture = null,
                this.setBlendMode(0)
            }
            var n = t("../SystemRenderer"),
                s = t("./managers/MaskManager"),
                o = t("./managers/StencilManager"),
                a = t("./managers/FilterManager"),
                h = t("./utils/RenderTarget"),
                l = t("./utils/ObjectRenderer"),
                c = t("./TextureManager"),
                u = t("./TextureGarbageCollector"),
                d = t("./WebGLState"),
                p = t("pixi-gl-core").createContext,
                f = t("./utils/mapWebGLDrawModesToPixi"),
                _ = t("./utils/validateContext"),
                g = t("../../utils"),
                m = t("pixi-gl-core"),
                v = t("../../const"),
                y = 0;
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            g.pluginTarget.mixin(r),
            r.prototype._initContext = function() {
                var t = this.gl;
                this.textureManager = new c(this),
                this.textureGC = new u(this),
                this.state.resetToDefault(),
                this.rootRenderTarget = new h(t, this.width, this.height, null, this.resolution, !0),
                this.rootRenderTarget.clearColor = this._backgroundColorRgba,
                this.bindRenderTarget(this.rootRenderTarget),
                this.emit("context", t),
                this.resize(this.width, this.height)
            },
            r.prototype.render = function(t, e, i, r, n) {
                if (this.renderingToScreen = !e, this.emit("prerender"), this.gl && !this.gl.isContextLost()) {
                    if (e || (this._lastObjectRendered = t), !n) {
                        var s = t.parent;
                        t.parent = this._tempDisplayObjectParent,
                        t.updateTransform(),
                        t.parent = s
                    }
                    this.bindRenderTexture(e, r),
                    this.currentRenderer.start(),
                    (void 0 !== i ? i : this.clearBeforeRender) && this._activeRenderTarget.clear(),
                    t.renderWebGL(this),
                    this.currentRenderer.flush(),
                    this.textureGC.update(),
                    this.emit("postrender")
                }
            },
            r.prototype.setObjectRenderer = function(t) {
                this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
            },
            r.prototype.flush = function() {
                this.setObjectRenderer(this.emptyRenderer)
            },
            r.prototype.resize = function(t, e) {
                n.prototype.resize.call(this, t, e),
                this.rootRenderTarget.resize(t, e),
                this._activeRenderTarget === this.rootRenderTarget && (this.rootRenderTarget.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = this.rootRenderTarget.projectionMatrix.toArray(!0)))
            },
            r.prototype.setBlendMode = function(t) {
                this.state.setBlendMode(t)
            },
            r.prototype.clear = function(t) {
                this._activeRenderTarget.clear(t)
            },
            r.prototype.setTransform = function(t) {
                this._activeRenderTarget.transform = t
            },
            r.prototype.bindRenderTexture = function(t, e) {
                var i;
                if (t) {
                    var r = t.baseTexture,
                        n = this.gl;
                    r._glRenderTargets[this.CONTEXT_UID] ? (this._activeTextureLocation = r._id, n.activeTexture(n.TEXTURE0 + r._id), n.bindTexture(n.TEXTURE_2D, null)) : (this.textureManager.updateTexture(r), n.bindTexture(n.TEXTURE_2D, null)),
                    i = r._glRenderTargets[this.CONTEXT_UID],
                    i.setFrame(t.frame)
                } else
                    i = this.rootRenderTarget;
                return i.transform = e, this.bindRenderTarget(i), this
            },
            r.prototype.bindRenderTarget = function(t) {
                return t !== this._activeRenderTarget && (this._activeRenderTarget = t, t.activate(), this._activeShader && (this._activeShader.uniforms.projectionMatrix = t.projectionMatrix.toArray(!0)), this.stencilManager.setMaskStack(t.stencilMaskStack)), this
            },
            r.prototype.bindShader = function(t) {
                return this._activeShader !== t && (this._activeShader = t, t.bind(), t.uniforms.projectionMatrix = this._activeRenderTarget.projectionMatrix.toArray(!0)), this
            },
            r.prototype.bindTexture = function(t, e) {
                t = t.baseTexture || t;
                var i = this.gl;
                return e = e || 0, this._activeTextureLocation !== e && (this._activeTextureLocation = e, i.activeTexture(i.TEXTURE0 + e)), this._activeTexture = t, t._glTextures[this.CONTEXT_UID] ? (t.touched = this.textureGC.count, t._glTextures[this.CONTEXT_UID].bind()) : this.textureManager.updateTexture(t), this
            },
            r.prototype.createVao = function() {
                return new m.VertexArrayObject(this.gl, this.state.attribState)
            },
            r.prototype.reset = function() {
                return this.setObjectRenderer(this.emptyRenderer), this._activeShader = null, this._activeRenderTarget = this.rootRenderTarget, this._activeTextureLocation = 999, this._activeTexture = null, this.rootRenderTarget.activate(), this.state.resetToDefault(), this
            },
            r.prototype.handleContextLost = function(t) {
                t.preventDefault()
            },
            r.prototype.handleContextRestored = function() {
                this._initContext(),
                this.textureManager.removeAll()
            },
            r.prototype.destroy = function(t) {
                this.destroyPlugins(),
                this.view.removeEventListener("webglcontextlost", this.handleContextLost),
                this.view.removeEventListener("webglcontextrestored", this.handleContextRestored),
                this.textureManager.destroy(),
                n.prototype.destroy.call(this, t),
                this.uid = 0,
                this.maskManager.destroy(),
                this.stencilManager.destroy(),
                this.filterManager.destroy(),
                this.maskManager = null,
                this.filterManager = null,
                this.textureManager = null,
                this.currentRenderer = null,
                this.handleContextLost = null,
                this.handleContextRestored = null,
                this._contextOptions = null,
                this.gl.useProgram(null),
                this.gl.getExtension("WEBGL_lose_context") && this.gl.getExtension("WEBGL_lose_context").loseContext(),
                this.gl = null
            }
        }, {
            "../../const": 78,
            "../../utils": 151,
            "../SystemRenderer": 108,
            "./TextureGarbageCollector": 114,
            "./TextureManager": 115,
            "./WebGLState": 117,
            "./managers/FilterManager": 122,
            "./managers/MaskManager": 123,
            "./managers/StencilManager": 124,
            "./utils/ObjectRenderer": 126,
            "./utils/RenderTarget": 128,
            "./utils/mapWebGLDrawModesToPixi": 131,
            "./utils/validateContext": 132,
            "pixi-gl-core": 12
        }],
        117: [function(t, e, i) {
            function r(t) {
                this.activeState = new Uint8Array(16),
                this.defaultState = new Uint8Array(16),
                this.defaultState[0] = 1,
                this.stackIndex = 0,
                this.stack = [],
                this.gl = t,
                this.maxAttribs = t.getParameter(t.MAX_VERTEX_ATTRIBS),
                this.attribState = {
                    tempAttribState: new Array(this.maxAttribs),
                    attribState: new Array(this.maxAttribs)
                },
                this.blendModes = n(t),
                this.nativeVaoExtension = t.getExtension("OES_vertex_array_object") || t.getExtension("MOZ_OES_vertex_array_object") || t.getExtension("WEBKIT_OES_vertex_array_object")
            }
            var n = t("./utils/mapWebGLBlendModesToPixi");
            r.prototype.push = function() {
                var t = this.stack[++this.stackIndex];
                t || (t = this.stack[this.stackIndex] = new Uint8Array(16));
                for (var e = 0; e < this.activeState.length; e++)
                    this.activeState[e] = t[e]
            };
            var s = 0,
                o = 1,
                a = 2,
                h = 3,
                l = 4;
            r.prototype.pop = function() {
                var t = this.stack[--this.stackIndex];
                this.setState(t)
            },
            r.prototype.setState = function(t) {
                this.setBlend(t[0]),
                this.setDepthTest(t[1]),
                this.setFrontFace(t[2]),
                this.setCullFace(t[3]),
                this.setBlendMode(t[4])
            },
            r.prototype.setBlend = function(t) {
                if (!(this.activeState[0] === t | 0)) {
                    this.activeState[0] = 0 | t;
                    var e = this.gl;
                    t ? e.enable(e.BLEND) : e.disable(e.BLEND)
                }
            },
            r.prototype.setBlendMode = function(t) {
                t !== this.activeState[4] && (this.activeState[4] = t, this.gl.blendFunc(this.blendModes[t][0], this.blendModes[t][1]))
            },
            r.prototype.setDepthTest = function(t) {
                if (!(this.activeState[1] === t | 0)) {
                    this.activeState[1] = 0 | t;
                    var e = this.gl;
                    t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST)
                }
            },
            r.prototype.setCullFace = function(t) {
                if (!(this.activeState[3] === t | 0)) {
                    this.activeState[3] = 0 | t;
                    var e = this.gl;
                    t ? e.enable(e.CULL_FACE) : e.disable(e.CULL_FACE)
                }
            },
            r.prototype.setFrontFace = function(t) {
                if (!(this.activeState[2] === t | 0)) {
                    this.activeState[2] = 0 | t;
                    var e = this.gl;
                    t ? e.frontFace(e.CW) : e.frontFace(e.CCW)
                }
            },
            r.prototype.resetAttributes = function() {
                var t;
                for (t = 0; t < this.attribState.tempAttribState.length; t++)
                    this.attribState.tempAttribState[t] = 0;
                for (t = 0; t < this.attribState.attribState.length; t++)
                    this.attribState.attribState[t] = 0;
                var e = this.gl;
                for (t = 1; t < this.maxAttribs; t++)
                    e.disableVertexAttribArray(t)
            },
            r.prototype.resetToDefault = function() {
                this.nativeVaoExtension && this.nativeVaoExtension.bindVertexArrayOES(null),
                this.resetAttributes();
                for (var t = 0; t < this.activeState.length; t++)
                    this.activeState[t] = 32;
                var e = this.gl;
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1),
                this.setState(this.defaultState)
            },
            e.exports = r
        }, {
            "./utils/mapWebGLBlendModesToPixi": 130
        }],
        118: [function(t, e, i) {
            function r(t, e, i) {
                this.vertexSrc = t || r.defaultVertexSrc,
                this.fragmentSrc = e || r.defaultFragmentSrc,
                this.blendMode = o.BLEND_MODES.NORMAL,
                this.uniformData = i || n(this.vertexSrc, this.fragmentSrc, "projectionMatrix|uSampler"),
                this.uniforms = {};
                for (var h in this.uniformData)
                    this.uniforms[h] = this.uniformData[h].value;
                this.glShaders = [],
                a[this.vertexSrc + this.fragmentSrc] || (a[this.vertexSrc + this.fragmentSrc] = s.uid()),
                this.glShaderKey = a[this.vertexSrc + this.fragmentSrc],
                this.padding = 4,
                this.resolution = 1,
                this.enabled = !0
            }
            var n = t("./extractUniformsFromSrc"),
                s = t("../../../utils"),
                o = t("../../../const"),
                a = {};
            e.exports = r,
            r.prototype.apply = function(t, e, i, r) {
                t.applyFilter(this, e, i, r)
            },
            r.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n"),
            r.defaultFragmentSrc = ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
        }, {
            "../../../const": 78,
            "../../../utils": 151,
            "./extractUniformsFromSrc": 119
        }],
        119: [function(t, e, i) {
            function r(t, e, i) {
                var r = n(t, i),
                    s = n(e, i);
                return Object.assign(r, s)
            }
            function n(t) {
                for (var e, i = new RegExp("^(projectionMatrix|uSampler|filterArea)$"), r = {}, n = t.replace(/\s+/g, " ").split(/\s*;\s*/), o = 0; o < n.length; o++) {
                    var a = n[o].trim();
                    if (a.indexOf("uniform") > -1) {
                        var h = a.split(" "),
                            l = h[1],
                            c = h[2],
                            u = 1;
                        c.indexOf("[") > -1 && (e = c.split(/\[|\]/), c = e[0], u *= Number(e[1])),
                        c.match(i) || (r[c] = {
                            value: s(l, u),
                            name: c,
                            type: l
                        })
                    }
                }
                return r
            }
            var s = t("pixi-gl-core").shader.defaultValue;
            e.exports = r
        }, {
            "pixi-gl-core": 12
        }],
        120: [function(t, e, i) {
            var r = t("../../../math"),
                n = function(t, e, i) {
                    var r = t.identity();
                    return r.translate(e.x / i.width, e.y / i.height), r.scale(i.width, i.height), r
                },
                s = function(t, e, i) {
                    var r = t.identity();
                    r.translate(e.x / i.width, e.y / i.height);
                    var n = i.width / e.width,
                        s = i.height / e.height;
                    return r.scale(n, s), r
                },
                o = function(t, e, i, n) {
                    var s = n.worldTransform.copy(r.Matrix.TEMP_MATRIX),
                        o = n._texture.baseTexture,
                        a = t.identity(),
                        h = i.height / i.width;
                    a.translate(e.x / i.width, e.y / i.height),
                    a.scale(1, h);
                    var l = i.width / o.width,
                        c = i.height / o.height;
                    return s.tx /= o.width * l, s.ty /= o.width * l, s.invert(), a.prepend(s), a.scale(1, 1 / h), a.scale(l, c), a.translate(n.anchor.x, n.anchor.y), a
                };
            e.exports = {
                calculateScreenSpaceMatrix: n,
                calculateNormalizedScreenSpaceMatrix: s,
                calculateSpriteMatrix: o
            }
        }, {
            "../../../math": 102
        }],
        121: [function(t, e, i) {
            function r(t) {
                var e = new s.Matrix;
                n.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n"),
                t.renderable = !1,
                this.maskSprite = t,
                this.maskMatrix = e
            }
            var n = t("../Filter"),
                s = t("../../../../math");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.apply = function(t, e, i) {
                var r = this.maskSprite;
                this.uniforms.mask = r._texture,
                this.uniforms.otherMatrix = t.calculateSpriteMatrix(this.maskMatrix, r),
                this.uniforms.alpha = r.worldAlpha,
                t.applyFilter(this, e, i)
            }
        }, {
            "../../../../math": 102,
            "../Filter": 118
        }],
        122: [function(t, e, i) {
            function r(t) {
                n.call(this, t),
                this.gl = this.renderer.gl,
                this.quad = new o(this.gl, t.state.attribState),
                this.shaderCache = {},
                this.pool = {},
                this.filterData = null
            }
            var n = t("./WebGLManager"),
                s = t("../utils/RenderTarget"),
                o = t("../utils/Quad"),
                a = t("../../../math"),
                h = t("../../../Shader"),
                l = t("../filters/filterTransforms"),
                c = t("bit-twiddle"),
                u = function() {
                    this.renderTarget = null,
                    this.sourceFrame = new a.Rectangle,
                    this.destinationFrame = new a.Rectangle,
                    this.filters = [],
                    this.target = null,
                    this.resolution = 1
                };
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.pushFilter = function(t, e) {
                var i = this.renderer,
                    r = this.filterData;
                if (!r) {
                    r = this.renderer._activeRenderTarget.filterStack;
                    var n = new u;
                    n.sourceFrame = n.destinationFrame = this.renderer._activeRenderTarget.size,
                    n.renderTarget = i._activeRenderTarget,
                    this.renderer._activeRenderTarget.filterData = r = {
                        index: 0,
                        stack: [n]
                    },
                    this.filterData = r
                }
                var s = r.stack[++r.index];
                s || (s = r.stack[r.index] = new u);
                var o = e[0].resolution,
                    a = e[0].padding,
                    h = t.filterArea || t.getBounds(!0),
                    l = s.sourceFrame,
                    c = s.destinationFrame;
                l.x = (h.x * o | 0) / o,
                l.y = (h.y * o | 0) / o,
                l.width = (h.width * o | 0) / o,
                l.height = (h.height * o | 0) / o,
                r.stack[0].renderTarget.transform || l.fit(r.stack[0].destinationFrame),
                l.pad(a),
                c.width = l.width,
                c.height = l.height;
                var d = this.getPotRenderTarget(i.gl, l.width, l.height, o);
                s.target = t,
                s.filters = e,
                s.resolution = o,
                s.renderTarget = d,
                d.setFrame(c, l),
                i.bindRenderTarget(d),
                i.clear()
            },
            r.prototype.popFilter = function() {
                var t = this.filterData,
                    e = t.stack[t.index - 1],
                    i = t.stack[t.index];
                this.quad.map(i.renderTarget.size, i.sourceFrame).upload();
                var r = i.filters;
                if (1 === r.length)
                    r[0].apply(this, i.renderTarget, e.renderTarget, !1),
                    this.freePotRenderTarget(i.renderTarget);
                else {
                    var n = i.renderTarget,
                        s = this.getPotRenderTarget(this.renderer.gl, i.sourceFrame.width, i.sourceFrame.height, 1);
                    s.setFrame(i.destinationFrame, i.sourceFrame);
                    for (var o = 0; o < r.length - 1; o++) {
                        r[o].apply(this, n, s, !0);
                        var a = n;
                        n = s,
                        s = a
                    }
                    r[o].apply(this, n, e.renderTarget, !1),
                    this.freePotRenderTarget(n),
                    this.freePotRenderTarget(s)
                }
                0 === --t.index && (this.filterData = null)
            },
            r.prototype.applyFilter = function(t, e, i, r) {
                var n = this.renderer,
                    s = t.glShaders[n.CONTEXT_UID];
                if (s || (t.glShaderKey ? (s = this.shaderCache[t.glShaderKey]) || (s = t.glShaders[n.CONTEXT_UID] = this.shaderCache[t.glShaderKey] = new h(this.gl, t.vertexSrc, t.fragmentSrc)) : s = t.glShaders[n.CONTEXT_UID] = new h(this.gl, t.vertexSrc, t.fragmentSrc), this.quad.initVao(s)), n.bindRenderTarget(i), r) {
                    var o = n.gl;
                    o.disable(o.SCISSOR_TEST),
                    n.clear(),
                    o.enable(o.SCISSOR_TEST)
                }
                i === n.maskManager.scissorRenderTarget && n.maskManager.pushScissorMask(null, n.maskManager.scissorData),
                n.bindShader(s),
                this.syncUniforms(s, t),
                e.texture.bind(0),
                n._activeTextureLocation = 0,
                n.state.setBlendMode(t.blendMode),
                this.quad.draw()
            },
            r.prototype.syncUniforms = function(t, e) {
                var i,
                    r = e.uniformData,
                    n = e.uniforms,
                    s = 1;
                if (t.uniforms.data.filterArea) {
                    i = this.filterData.stack[this.filterData.index];
                    var o = t.uniforms.filterArea;
                    o[0] = i.renderTarget.size.width,
                    o[1] = i.renderTarget.size.height,
                    o[2] = i.sourceFrame.x,
                    o[3] = i.sourceFrame.y,
                    t.uniforms.filterArea = o
                }
                if (t.uniforms.data.filterClamp) {
                    i = this.filterData.stack[this.filterData.index];
                    var a = t.uniforms.filterClamp;
                    a[0] = .5 / i.renderTarget.size.width,
                    a[1] = .5 / i.renderTarget.size.height,
                    a[2] = (i.sourceFrame.width - .5) / i.renderTarget.size.width,
                    a[3] = (i.sourceFrame.height - .5) / i.renderTarget.size.height,
                    t.uniforms.filterClamp = a
                }
                var h;
                for (var l in r)
                    if ("sampler2D" === r[l].type) {
                        if (t.uniforms[l] = s, n[l].baseTexture)
                            this.renderer.bindTexture(n[l].baseTexture, s);
                        else {
                            var c = this.renderer.gl;
                            this.renderer._activeTextureLocation = c.TEXTURE0 + s,
                            c.activeTexture(c.TEXTURE0 + s),
                            n[l].texture.bind()
                        }
                        s++
                    } else
                        "mat3" === r[l].type ? void 0 !== n[l].a ? t.uniforms[l] = n[l].toArray(!0) : t.uniforms[l] = n[l] : "vec2" === r[l].type ? void 0 !== n[l].x ? (h = t.uniforms[l] || new Float32Array(2), h[0] = n[l].x, h[1] = n[l].y, t.uniforms[l] = h) : t.uniforms[l] = n[l] : "float" === r[l].type ? t.uniforms.data[l].value !== r[l] && (t.uniforms[l] = n[l]) : t.uniforms[l] = n[l]
            },
            r.prototype.getRenderTarget = function(t, e) {
                var i = this.filterData.stack[this.filterData.index],
                    r = this.getPotRenderTarget(this.renderer.gl, i.sourceFrame.width, i.sourceFrame.height, e || i.resolution);
                return r.setFrame(i.destinationFrame, i.sourceFrame), r
            },
            r.prototype.returnRenderTarget = function(t) {
                return this.freePotRenderTarget(t)
            },
            r.prototype.calculateScreenSpaceMatrix = function(t) {
                var e = this.filterData.stack[this.filterData.index];
                return l.calculateScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size)
            },
            r.prototype.calculateNormalizedScreenSpaceMatrix = function(t) {
                var e = this.filterData.stack[this.filterData.index];
                return l.calculateNormalizedScreenSpaceMatrix(t, e.sourceFrame, e.renderTarget.size, e.destinationFrame)
            },
            r.prototype.calculateSpriteMatrix = function(t, e) {
                var i = this.filterData.stack[this.filterData.index];
                return l.calculateSpriteMatrix(t, i.sourceFrame, i.renderTarget.size, e)
            },
            r.prototype.destroy = function() {
                this.shaderCache = [],
                this.emptyPool()
            },
            r.prototype.getPotRenderTarget = function(t, e, i, r) {
                e = c.nextPow2(e * r),
                i = c.nextPow2(i * r);
                var n = (65535 & e) << 16 | 65535 & i;
                this.pool[n] || (this.pool[n] = []);
                var o = this.pool[n].pop() || new s(t, e, i, null, 1);
                return o.resolution = r, o.defaultFrame.width = o.size.width = e / r, o.defaultFrame.height = o.size.height = i / r, o
            },
            r.prototype.emptyPool = function() {
                for (var t in this.pool) {
                    var e = this.pool[t];
                    if (e)
                        for (var i = 0; i < e.length; i++)
                            e[i].destroy(!0)
                }
                this.pool = {}
            },
            r.prototype.freePotRenderTarget = function(t) {
                var e = t.size.width * t.resolution,
                    i = t.size.height * t.resolution,
                    r = (65535 & e) << 16 | 65535 & i;
                this.pool[r].push(t)
            }
        }, {
            "../../../Shader": 77,
            "../../../math": 102,
            "../filters/filterTransforms": 120,
            "../utils/Quad": 127,
            "../utils/RenderTarget": 128,
            "./WebGLManager": 125,
            "bit-twiddle": 1
        }],
        123: [function(t, e, i) {
            function r(t) {
                n.call(this, t),
                this.scissor = !1,
                this.scissorData = null,
                this.scissorRenderTarget = null,
                this.enableScissor = !0,
                this.alphaMaskPool = [],
                this.alphaMaskIndex = 0
            }
            var n = t("./WebGLManager"),
                s = t("../filters/spriteMask/SpriteMaskFilter");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.pushMask = function(t, e) {
                if (e.texture)
                    this.pushSpriteMask(t, e);
                else if (this.enableScissor && !this.scissor && !this.renderer.stencilManager.stencilMaskStack.length && e.isFastRect()) {
                    var i = e.worldTransform,
                        r = Math.atan2(i.b, i.a);
                    r = Math.round(r * (180 / Math.PI)),
                    r % 90 ? this.pushStencilMask(e) : this.pushScissorMask(t, e)
                } else
                    this.pushStencilMask(e)
            },
            r.prototype.popMask = function(t, e) {
                e.texture ? this.popSpriteMask(t, e) : this.enableScissor && !this.renderer.stencilManager.stencilMaskStack.length ? this.popScissorMask(t, e) : this.popStencilMask(t, e)
            },
            r.prototype.pushSpriteMask = function(t, e) {
                var i = this.alphaMaskPool[this.alphaMaskIndex];
                i || (i = this.alphaMaskPool[this.alphaMaskIndex] = [new s(e)]),
                i[0].resolution = this.renderer.resolution,
                i[0].maskSprite = e,
                t.filterArea = e.getBounds(!0),
                this.renderer.filterManager.pushFilter(t, i),
                this.alphaMaskIndex++
            },
            r.prototype.popSpriteMask = function() {
                this.renderer.filterManager.popFilter(),
                this.alphaMaskIndex--
            },
            r.prototype.pushStencilMask = function(t) {
                this.renderer.currentRenderer.stop(),
                this.renderer.stencilManager.pushStencil(t)
            },
            r.prototype.popStencilMask = function() {
                this.renderer.currentRenderer.stop(),
                this.renderer.stencilManager.popStencil()
            },
            r.prototype.pushScissorMask = function(t, e) {
                e.renderable = !0;
                var i = this.renderer._activeRenderTarget,
                    r = e.getBounds();
                r.fit(i.size),
                e.renderable = !1,
                this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);
                var n = this.renderer.resolution;
                this.renderer.gl.scissor(r.x * n, (i.root ? i.size.height - r.y - r.height : r.y) * n, r.width * n, r.height * n),
                this.scissorRenderTarget = i,
                this.scissorData = e,
                this.scissor = !0
            },
            r.prototype.popScissorMask = function() {
                this.scissorRenderTarget = null,
                this.scissorData = null,
                this.scissor = !1;
                var t = this.renderer.gl;
                t.disable(t.SCISSOR_TEST)
            }
        }, {
            "../filters/spriteMask/SpriteMaskFilter": 121,
            "./WebGLManager": 125
        }],
        124: [function(t, e, i) {
            function r(t) {
                n.call(this, t),
                this.stencilMaskStack = null
            }
            var n = t("./WebGLManager");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.setMaskStack = function(t) {
                this.stencilMaskStack = t;
                var e = this.renderer.gl;
                0 === t.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST)
            },
            r.prototype.pushStencil = function(t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics),
                this.renderer._activeRenderTarget.attachStencilBuffer();
                var e = this.renderer.gl,
                    i = this.stencilMaskStack;
                0 === i.length && (e.enable(e.STENCIL_TEST), e.clear(e.STENCIL_BUFFER_BIT), e.stencilFunc(e.ALWAYS, 1, 1)),
                i.push(t),
                e.colorMask(!1, !1, !1, !1),
                e.stencilOp(e.KEEP, e.KEEP, e.INCR),
                this.renderer.plugins.graphics.render(t),
                e.colorMask(!0, !0, !0, !0),
                e.stencilFunc(e.NOTEQUAL, 0, i.length),
                e.stencilOp(e.KEEP, e.KEEP, e.KEEP)
            },
            r.prototype.popStencil = function() {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                var t = this.renderer.gl,
                    e = this.stencilMaskStack,
                    i = e.pop();
                0 === e.length ? t.disable(t.STENCIL_TEST) : (t.colorMask(!1, !1, !1, !1), t.stencilOp(t.KEEP, t.KEEP, t.DECR), this.renderer.plugins.graphics.render(i), t.colorMask(!0, !0, !0, !0), t.stencilFunc(t.NOTEQUAL, 0, e.length), t.stencilOp(t.KEEP, t.KEEP, t.KEEP))
            },
            r.prototype.destroy = function() {
                n.prototype.destroy.call(this),
                this.stencilMaskStack.stencilStack = null
            }
        }, {
            "./WebGLManager": 125
        }],
        125: [function(t, e, i) {
            function r(t) {
                this.renderer = t,
                this.renderer.on("context", this.onContextChange, this)
            }
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.onContextChange = function() {},
            r.prototype.destroy = function() {
                this.renderer.off("context", this.onContextChange, this),
                this.renderer = null
            }
        }, {}],
        126: [function(t, e, i) {
            function r(t) {
                n.call(this, t)
            }
            var n = t("../managers/WebGLManager");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.start = function() {},
            r.prototype.stop = function() {
                this.flush()
            },
            r.prototype.flush = function() {},
            r.prototype.render = function(t) {}
        }, {
            "../managers/WebGLManager": 125
        }],
        127: [function(t, e, i) {
            function r(t, e) {
                this.gl = t,
                this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
                this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                this.interleaved = new Float32Array(16);
                for (var i = 0; 4 > i; i++)
                    this.interleaved[4 * i] = this.vertices[2 * i],
                    this.interleaved[4 * i + 1] = this.vertices[2 * i + 1],
                    this.interleaved[4 * i + 2] = this.uvs[2 * i],
                    this.interleaved[4 * i + 3] = this.uvs[2 * i + 1];
                this.indices = s(1),
                this.vertexBuffer = n.GLBuffer.createVertexBuffer(t, this.interleaved, t.STATIC_DRAW),
                this.indexBuffer = n.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW),
                this.vao = new n.VertexArrayObject(t, e)
            }
            var n = t("pixi-gl-core"),
                s = t("../../../utils/createIndicesForQuads");
            r.prototype.constructor = r,
            r.prototype.initVao = function(t) {
                this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer, t.attributes.aVertexPosition, this.gl.FLOAT, !1, 16, 0).addAttribute(this.vertexBuffer, t.attributes.aTextureCoord, this.gl.FLOAT, !1, 16, 8)
            },
            r.prototype.map = function(t, e) {
                var i = 0,
                    r = 0;
                return this.uvs[0] = i, this.uvs[1] = r, this.uvs[2] = i + e.width / t.width, this.uvs[3] = r, this.uvs[4] = i + e.width / t.width, this.uvs[5] = r + e.height / t.height, this.uvs[6] = i, this.uvs[7] = r + e.height / t.height, i = e.x, r = e.y, this.vertices[0] = i, this.vertices[1] = r, this.vertices[2] = i + e.width, this.vertices[3] = r, this.vertices[4] = i + e.width, this.vertices[5] = r + e.height, this.vertices[6] = i, this.vertices[7] = r + e.height, this
            },
            r.prototype.draw = function() {
                return this.vao.bind().draw(this.gl.TRIANGLES, 6, 0).unbind(), this
            },
            r.prototype.upload = function() {
                for (var t = 0; 4 > t; t++)
                    this.interleaved[4 * t] = this.vertices[2 * t],
                    this.interleaved[4 * t + 1] = this.vertices[2 * t + 1],
                    this.interleaved[4 * t + 2] = this.uvs[2 * t],
                    this.interleaved[4 * t + 3] = this.uvs[2 * t + 1];
                return this.vertexBuffer.upload(this.interleaved), this
            },
            r.prototype.destroy = function() {
                var t = this.gl;
                t.deleteBuffer(this.vertexBuffer),
                t.deleteBuffer(this.indexBuffer)
            },
            e.exports = r
        }, {
            "../../../utils/createIndicesForQuads": 149,
            "pixi-gl-core": 12
        }],
        128: [function(t, e, i) {
            var r = t("../../../math"),
                n = t("../../../const"),
                s = t("pixi-gl-core").GLFramebuffer,
                o = function(t, e, i, o, a, h) {
                    this.gl = t,
                    this.frameBuffer = null,
                    this.texture = null,
                    this.clearColor = [0, 0, 0, 0],
                    this.size = new r.Rectangle(0, 0, 1, 1),
                    this.resolution = a || n.RESOLUTION,
                    this.projectionMatrix = new r.Matrix,
                    this.transform = null,
                    this.frame = null,
                    this.defaultFrame = new r.Rectangle,
                    this.destinationFrame = null,
                    this.sourceFrame = null,
                    this.stencilBuffer = null,
                    this.stencilMaskStack = [],
                    this.filterData = null,
                    this.scaleMode = o || n.SCALE_MODES.DEFAULT,
                    this.root = h,
                    this.root ? (this.frameBuffer = new s(t, 100, 100), this.frameBuffer.framebuffer = null) : (this.frameBuffer = s.createRGBA(t, 100, 100), this.scaleMode === n.SCALE_MODES.NEAREST ? this.frameBuffer.texture.enableNearestScaling() : this.frameBuffer.texture.enableLinearScaling(), this.texture = this.frameBuffer.texture),
                    this.setFrame(),
                    this.resize(e, i)
                };
            o.prototype.constructor = o,
            e.exports = o,
            o.prototype.clear = function(t) {
                var e = t || this.clearColor;
                this.frameBuffer.clear(e[0], e[1], e[2], e[3])
            },
            o.prototype.attachStencilBuffer = function() {
                this.root || this.frameBuffer.enableStencil()
            },
            o.prototype.setFrame = function(t, e) {
                this.destinationFrame = t || this.destinationFrame || this.defaultFrame,
                this.sourceFrame = e || this.sourceFrame || t
            },
            o.prototype.activate = function() {
                var t = this.gl;
                this.frameBuffer.bind(),
                this.calculateProjection(this.destinationFrame, this.sourceFrame),
                this.transform && this.projectionMatrix.append(this.transform),
                this.destinationFrame !== this.sourceFrame ? (t.enable(t.SCISSOR_TEST),
                t.scissor(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)) : t.disable(t.SCISSOR_TEST),
                t.viewport(0 | this.destinationFrame.x, 0 | this.destinationFrame.y, this.destinationFrame.width * this.resolution | 0, this.destinationFrame.height * this.resolution | 0)
            },
            o.prototype.calculateProjection = function(t, e) {
                var i = this.projectionMatrix;
                e = e || t,
                i.identity(),
                this.root ? (i.a = 1 / t.width * 2, i.d = -1 / t.height * 2, i.tx = -1 - e.x * i.a, i.ty = 1 - e.y * i.d) : (i.a = 1 / t.width * 2, i.d = 1 / t.height * 2, i.tx = -1 - e.x * i.a, i.ty = -1 - e.y * i.d)
            },
            o.prototype.resize = function(t, e) {
                if (t |= 0, e |= 0, this.size.width !== t || this.size.height !== e) {
                    this.size.width = t,
                    this.size.height = e,
                    this.defaultFrame.width = t,
                    this.defaultFrame.height = e,
                    this.frameBuffer.resize(t * this.resolution, e * this.resolution);
                    var i = this.frame || this.size;
                    this.calculateProjection(i)
                }
            },
            o.prototype.destroy = function() {
                this.frameBuffer.destroy(),
                this.frameBuffer = null,
                this.texture = null
            }
        }, {
            "../../../const": 78,
            "../../../math": 102,
            "pixi-gl-core": 12
        }],
        129: [function(t, e, i) {
            function r(t) {
                for (var e = "", i = 0; t > i; i++)
                    i > 0 && (e += "\nelse "),
                    t - 1 > i && (e += "if(test == " + i + ".0){}");
                return e
            }
            var n = t("pixi-gl-core"),
                s = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n"),
                o = function(t, e) {
                    var i = !e;
                    if (i) {
                        var o = document.createElement("canvas");
                        o.width = 1,
                        o.height = 1,
                        e = n.createContext(o)
                    }
                    for (var a = e.createShader(e.FRAGMENT_SHADER);;) {
                        var h = s.replace(/%forloop%/gi, r(t));
                        if (e.shaderSource(a, h), e.compileShader(a), e.getShaderParameter(a, e.COMPILE_STATUS))
                            break;
                        t = t / 2 | 0
                    }
                    return i && e.getExtension("WEBGL_lose_context") && e.getExtension("WEBGL_lose_context").loseContext(), t
                };
            e.exports = o
        }, {
            "pixi-gl-core": 12
        }],
        130: [function(t, e, i) {
            function r(t, e) {
                return e = e || [], e[n.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.ADD] = [t.ONE, t.DST_ALPHA], e[n.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR], e[n.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e[n.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], e
            }
            var n = t("../../../const");
            e.exports = r
        }, {
            "../../../const": 78
        }],
        131: [function(t, e, i) {
            function r(t, e) {
                e = e || {},
                e[n.DRAW_MODES.POINTS] = t.POINTS,
                e[n.DRAW_MODES.LINES] = t.LINES,
                e[n.DRAW_MODES.LINE_LOOP] = t.LINE_LOOP,
                e[n.DRAW_MODES.LINE_STRIP] = t.LINE_STRIP,
                e[n.DRAW_MODES.TRIANGLES] = t.TRIANGLES,
                e[n.DRAW_MODES.TRIANGLE_STRIP] = t.TRIANGLE_STRIP,
                e[n.DRAW_MODES.TRIANGLE_FAN] = t.TRIANGLE_FAN
            }
            var n = t("../../../const");
            e.exports = r
        }, {
            "../../../const": 78
        }],
        132: [function(t, e, i) {
            function r(t) {
                t.getContextAttributes().stencil || console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
            }
            e.exports = r
        }, {}],
        133: [function(t, e, i) {
            function r(t) {
                o.call(this),
                this.anchor = new n.ObservablePoint(this.onAnchorUpdate, this),
                this._texture = null,
                this._width = 0,
                this._height = 0,
                this._tint = null,
                this._tintRGB = null,
                this.tint = 16777215,
                this.blendMode = h.BLEND_MODES.NORMAL,
                this.shader = null,
                this.cachedTint = 16777215,
                this.texture = t || s.EMPTY,
                this.vertexData = new Float32Array(8),
                this.vertexTrimmedData = null,
                this._transformID = -1,
                this._textureID = -1
            }
            var n = t("../math"),
                s = t("../textures/Texture"),
                o = t("../display/Container"),
                a = t("../utils"),
                h = t("../const"),
                l = new n.Point;
            r.prototype = Object.create(o.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return Math.abs(this.scale.x) * this.texture.orig.width
                    },
                    set: function(t) {
                        var e = a.sign(this.scale.x) || 1;
                        this.scale.x = e * t / this.texture.orig.width,
                        this._width = t
                    }
                },
                height: {
                    get: function() {
                        return Math.abs(this.scale.y) * this.texture.orig.height
                    },
                    set: function(t) {
                        var e = a.sign(this.scale.y) || 1;
                        this.scale.y = e * t / this.texture.orig.height,
                        this._height = t
                    }
                },
                tint: {
                    get: function() {
                        return this._tint
                    },
                    set: function(t) {
                        this._tint = t,
                        this._tintRGB = (t >> 16) + (65280 & t) + ((255 & t) << 16)
                    }
                },
                texture: {
                    get: function() {
                        return this._texture
                    },
                    set: function(t) {
                        this._texture !== t && (this._texture = t, this.cachedTint = 16777215, this._textureID = -1, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                    }
                }
            }),
            r.prototype._onTextureUpdate = function() {
                this._textureID = -1,
                this._width && (this.scale.x = a.sign(this.scale.x) * this._width / this.texture.orig.width),
                this._height && (this.scale.y = a.sign(this.scale.y) * this._height / this.texture.orig.height)
            },
            r.prototype.onAnchorUpdate = function() {
                this._transformID = -1
            },
            r.prototype.calculateVertices = function() {
                if (this._transformID !== this.transform._worldID || this._textureID !== this._texture._updateID) {
                    this._transformID = this.transform._worldID,
                    this._textureID = this._texture._updateID;
                    var t,
                        e,
                        i,
                        r,
                        n = this._texture,
                        s = this.transform.worldTransform,
                        o = s.a,
                        a = s.b,
                        h = s.c,
                        l = s.d,
                        c = s.tx,
                        u = s.ty,
                        d = this.vertexData,
                        p = n.trim,
                        f = n.orig;
                    p ? (e = p.x - this.anchor._x * f.width, t = e + p.width, r = p.y - this.anchor._y * f.height, i = r + p.height) : (t = f.width * (1 - this.anchor._x), e = f.width * -this.anchor._x, i = f.height * (1 - this.anchor._y), r = f.height * -this.anchor._y),
                    d[0] = o * e + h * r + c,
                    d[1] = l * r + a * e + u,
                    d[2] = o * t + h * r + c,
                    d[3] = l * r + a * t + u,
                    d[4] = o * t + h * i + c,
                    d[5] = l * i + a * t + u,
                    d[6] = o * e + h * i + c,
                    d[7] = l * i + a * e + u
                }
            },
            r.prototype.calculateTrimmedVertices = function() {
                this.vertexTrimmedData || (this.vertexTrimmedData = new Float32Array(8));
                var t,
                    e,
                    i,
                    r,
                    n = this._texture,
                    s = this.vertexTrimmedData,
                    o = n.orig,
                    a = this.transform.worldTransform,
                    h = a.a,
                    l = a.b,
                    c = a.c,
                    u = a.d,
                    d = a.tx,
                    p = a.ty;
                t = o.width * (1 - this.anchor._x),
                e = o.width * -this.anchor._x,
                i = o.height * (1 - this.anchor._y),
                r = o.height * -this.anchor._y,
                s[0] = h * e + c * r + d,
                s[1] = u * r + l * e + p,
                s[2] = h * t + c * r + d,
                s[3] = u * r + l * t + p,
                s[4] = h * t + c * i + d,
                s[5] = u * i + l * t + p,
                s[6] = h * e + c * i + d,
                s[7] = u * i + l * e + p
            },
            r.prototype._renderWebGL = function(t) {
                this.calculateVertices(),
                t.setObjectRenderer(t.plugins.sprite),
                t.plugins.sprite.render(this)
            },
            r.prototype._renderCanvas = function(t) {
                t.plugins.sprite.render(this)
            },
            r.prototype._calculateBounds = function() {
                var t = this._texture.trim,
                    e = this._texture.orig;
                !t || t.width === e.width && t.height === e.height ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData)) : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
            },
            r.prototype.getLocalBounds = function(t) {
                return 0 === this.children.length ? (this._bounds.minX = -this._texture.orig.width * this.anchor._x, this._bounds.minY = -this._texture.orig.height * this.anchor._y, this._bounds.maxX = this._texture.orig.width, this._bounds.maxY = this._texture.orig.height, t || (this._localBoundsRect || (this._localBoundsRect = new n.Rectangle), t = this._localBoundsRect), this._bounds.getRectangle(t)) : o.prototype.getLocalBounds.call(this, t)
            },
            r.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, l);
                var e,
                    i = this._texture.orig.width,
                    r = this._texture.orig.height,
                    n = -i * this.anchor.x;
                return l.x > n && l.x < n + i && (e = -r * this.anchor.y, l.y > e && l.y < e + r)
            },
            r.prototype.destroy = function(t) {
                if (o.prototype.destroy.call(this, t), this.anchor = null, "boolean" == typeof t ? t : t && t.texture) {
                    var e = "boolean" == typeof t ? t : t && t.baseTexture;
                    this._texture.destroy(!!e)
                }
                this._texture = null,
                this.shader = null
            },
            r.from = function(t) {
                return new r(s.from(t))
            },
            r.fromFrame = function(t) {
                var e = a.TextureCache[t];
                if (!e)
                    throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return new r(e)
            },
            r.fromImage = function(t, e, i) {
                return new r(s.fromImage(t, e, i))
            }
        }, {
            "../const": 78,
            "../display/Container": 80,
            "../math": 102,
            "../textures/Texture": 144,
            "../utils": 151
        }],
        134: [function(t, e, i) {
            function r(t) {
                this.renderer = t
            }
            var n = t("../../renderers/canvas/CanvasRenderer"),
                s = t("../../const"),
                o = t("../../math"),
                a = new o.Matrix,
                h = t("./CanvasTinter");
            r.prototype.constructor = r,
            e.exports = r,
            n.registerPlugin("sprite", r),
            r.prototype.render = function(t) {
                var e,
                    i,
                    r = t._texture,
                    n = this.renderer,
                    l = t.transform.worldTransform,
                    c = r._frame.width,
                    u = r._frame.height;
                if (!(r.orig.width <= 0 || r.orig.height <= 0) && r.baseTexture.source && (n.setBlendMode(t.blendMode), r.valid)) {
                    n.context.globalAlpha = t.worldAlpha;
                    var d = r.baseTexture.scaleMode === s.SCALE_MODES.LINEAR;
                    n.smoothProperty && n.context[n.smoothProperty] !== d && (n.context[n.smoothProperty] = d),
                    r.trim ? (e = r.trim.width / 2 + r.trim.x - t.anchor.x * r.orig.width, i = r.trim.height / 2 + r.trim.y - t.anchor.y * r.orig.height) : (e = (.5 - t.anchor.x) * r.orig.width, i = (.5 - t.anchor.y) * r.orig.height),
                    r.rotate && (l.copy(a), l = a, o.GroupD8.matrixAppendRotationInv(l, r.rotate, e, i), e = 0, i = 0),
                    e -= c / 2,
                    i -= u / 2,
                    n.roundPixels ? (n.context.setTransform(l.a, l.b, l.c, l.d, l.tx * n.resolution | 0, l.ty * n.resolution | 0), e |= 0, i |= 0) : n.context.setTransform(l.a, l.b, l.c, l.d, l.tx * n.resolution, l.ty * n.resolution);
                    var p = r.baseTexture.resolution;
                    16777215 !== t.tint ? (t.cachedTint !== t.tint && (t.cachedTint = t.tint, t.tintedTexture = h.getTintedTexture(t, t.tint)), n.context.drawImage(t.tintedTexture, 0, 0, c * p, u * p, e * n.resolution, i * n.resolution, c * n.resolution, u * n.resolution)) : n.context.drawImage(r.baseTexture.source, r._frame.x * p, r._frame.y * p, c * p, u * p, e * n.resolution, i * n.resolution, c * n.resolution, u * n.resolution)
                }
            },
            r.prototype.destroy = function() {
                this.renderer = null
            }
        }, {
            "../../const": 78,
            "../../math": 102,
            "../../renderers/canvas/CanvasRenderer": 109,
            "./CanvasTinter": 135
        }],
        135: [function(t, e, i) {
            var r = t("../../utils"),
                n = t("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),
                s = e.exports = {
                    getTintedTexture: function(t, e) {
                        var i = t.texture;
                        e = s.roundColor(e);
                        var r = "#" + ("00000" + (0 | e).toString(16)).substr(-6);
                        if (i.tintCache = i.tintCache || {}, i.tintCache[r])
                            return i.tintCache[r];
                        var n = s.canvas || document.createElement("canvas");
                        if (s.tintMethod(i, e, n), s.convertTintToImage) {
                            var o = new Image;
                            o.src = n.toDataURL(),
                            i.tintCache[r] = o
                        } else
                            i.tintCache[r] = n,
                            s.canvas = null;
                        return n
                    },
                    tintWithMultiply: function(t, e, i) {
                        var r = i.getContext("2d"),
                            n = t._frame.clone(),
                            s = t.baseTexture.resolution;
                        n.x *= s,
                        n.y *= s,
                        n.width *= s,
                        n.height *= s,
                        i.width = n.width,
                        i.height = n.height,
                        r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6),
                        r.fillRect(0, 0, n.width, n.height),
                        r.globalCompositeOperation = "multiply",
                        r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height),
                        r.globalCompositeOperation = "destination-atop",
                        r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height)
                    },
                    tintWithOverlay: function(t, e, i) {
                        var r = i.getContext("2d"),
                            n = t._frame.clone(),
                            s = t.baseTexture.resolution;
                        n.x *= s,
                        n.y *= s,
                        n.width *= s,
                        n.height *= s,
                        i.width = n.width,
                        i.height = n.height,
                        r.globalCompositeOperation = "copy",
                        r.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6),
                        r.fillRect(0, 0, n.width, n.height),
                        r.globalCompositeOperation = "destination-atop",
                        r.drawImage(t.baseTexture.source, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height)
                    },
                    tintWithPerPixel: function(t, e, i) {
                        var n = i.getContext("2d"),
                            s = t._frame.clone(),
                            o = t.baseTexture.resolution;
                        s.x *= o,
                        s.y *= o,
                        s.width *= o,
                        s.height *= o,
                        i.width = s.width,
                        i.height = s.height,
                        n.globalCompositeOperation = "copy",
                        n.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height);
                        for (var a = r.hex2rgb(e), h = a[0], l = a[1], c = a[2], u = n.getImageData(0, 0, s.width, s.height), d = u.data, p = 0; p < d.length; p += 4)
                            d[p + 0] *= h,
                            d[p + 1] *= l,
                            d[p + 2] *= c;
                        n.putImageData(u, 0, 0)
                    },
                    roundColor: function(t) {
                        var e = s.cacheStepsPerColorChannel,
                            i = r.hex2rgb(t);
                        return i[0] = Math.min(255, i[0] / e * e), i[1] = Math.min(255, i[1] / e * e), i[2] = Math.min(255, i[2] / e * e), r.rgb2hex(i)
                    },
                    cacheStepsPerColorChannel: 8,
                    convertTintToImage: !1,
                    canUseMultiply: n(),
                    tintMethod: 0
                };
            s.tintMethod = s.canUseMultiply ? s.tintWithMultiply : s.tintWithPerPixel
        }, {
            "../../renderers/canvas/utils/canUseNewCanvasBlendModes": 112,
            "../../utils": 151
        }],
        136: [function(t, e, i) {
            var r = function(t) {
                this.vertices = new ArrayBuffer(t),
                this.float32View = new Float32Array(this.vertices),
                this.uint32View = new Uint32Array(this.vertices)
            };
            e.exports = r,
            r.prototype.destroy = function() {
                this.vertices = null,
                this.positions = null,
                this.uvs = null,
                this.colors = null
            }
        }, {}],
        137: [function(t, e, i) {
            function r(t) {
                n.call(this, t),
                this.vertSize = 5,
                this.vertByteSize = 4 * this.vertSize,
                this.size = c.SPRITE_BATCH_SIZE,
                this.buffers = [];
                for (var e = 1; e <= d.nextPow2(this.size); e *= 2) {
                    var i = 4 * e * this.vertByteSize;
                    this.buffers.push(new l(i))
                }
                this.indices = o(this.size),
                this.shaders = null,
                this.currentIndex = 0,
                p = 0,
                this.groups = [];
                for (var r = 0; r < this.size; r++)
                    this.groups[r] = {
                        textures: [],
                        textureCount: 0,
                        ids: [],
                        size: 0,
                        start: 0,
                        blend: 0
                    };
                this.sprites = [],
                this.vertexBuffers = [],
                this.vaos = [],
                this.vaoMax = 2,
                this.vertexCount = 0,
                this.renderer.on("prerender", this.onPrerender, this)
            }
            var n = t("../../renderers/webgl/utils/ObjectRenderer"),
                s = t("../../renderers/webgl/WebGLRenderer"),
                o = t("../../utils/createIndicesForQuads"),
                a = t("./generateMultiTextureShader"),
                h = t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),
                l = t("./BatchBuffer"),
                c = t("../../const"),
                u = t("pixi-gl-core"),
                d = t("bit-twiddle"),
                p = 0;
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            s.registerPlugin("sprite", r),
            r.prototype.onContextChange = function() {
                var t = this.renderer.gl;
                this.MAX_TEXTURES = Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), c.SPRITE_MAX_TEXTURES),
                this.MAX_TEXTURES = h(this.MAX_TEXTURES, t),
                this.shaders = new Array(this.MAX_TEXTURES),
                this.shaders[0] = a(t, 1),
                this.shaders[1] = a(t, 2),
                this.indexBuffer = u.GLBuffer.createIndexBuffer(t, this.indices, t.STATIC_DRAW);
                for (var e = this.shaders[1], i = 0; i < this.vaoMax; i++)
                    this.vertexBuffers[i] = u.GLBuffer.createVertexBuffer(t, null, t.STREAM_DRAW),
                    this.vaos[i] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[i], e.attributes.aVertexPosition, t.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[i], e.attributes.aTextureCoord, t.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[i], e.attributes.aColor, t.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[i], e.attributes.aTextureId, t.FLOAT, !1, this.vertByteSize, 16);
                this.vao = this.vaos[0],
                this.currentBlendMode = 99999
            },
            r.prototype.onPrerender = function() {
                this.vertexCount = 0
            },
            r.prototype.render = function(t) {
                this.currentIndex >= this.size && this.flush(),
                t.texture._uvs && (this.sprites[this.currentIndex++] = t)
            },
            r.prototype.flush = function() {
                if (0 !== this.currentIndex) {
                    var t,
                        e,
                        i,
                        r,
                        n,
                        s,
                        o,
                        h = this.renderer.gl,
                        l = d.nextPow2(this.currentIndex),
                        c = d.log2(l),
                        f = this.buffers[c],
                        _ = this.sprites,
                        g = this.groups,
                        m = f.float32View,
                        v = f.uint32View,
                        y = 0,
                        x = 1,
                        b = 0,
                        T = g[0],
                        w = _[0].blendMode;
                    T.textureCount = 0,
                    T.start = 0,
                    T.blend = w,
                    p++;
                    for (var S = 0; S < this.currentIndex; S++) {
                        var E = _[S];
                        if (t = E._texture.baseTexture, w !== E.blendMode && (w = E.blendMode, e = null, b = this.MAX_TEXTURES, p++), e !== t && (e = t, t._enabled !== p && (b === this.MAX_TEXTURES && (p++, b = 0, T.size = S - T.start, T = g[x++], T.textureCount = 0, T.blend = w, T.start = S), t._enabled = p, t._id = b, T.textures[T.textureCount++] = t, b++)), i = E.vertexData, r = E._tintRGB + (255 * E.worldAlpha << 24), n = E._texture._uvs.uvsUint32, s = t._id, this.renderer.roundPixels) {
                            var A = this.renderer.resolution;
                            m[y] = (i[0] * A | 0) / A,
                            m[y + 1] = (i[1] * A | 0) / A,
                            m[y + 5] = (i[2] * A | 0) / A,
                            m[y + 6] = (i[3] * A | 0) / A,
                            m[y + 10] = (i[4] * A | 0) / A,
                            m[y + 11] = (i[5] * A | 0) / A,
                            m[y + 15] = (i[6] * A | 0) / A,
                            m[y + 16] = (i[7] * A | 0) / A
                        } else
                            m[y] = i[0],
                            m[y + 1] = i[1],
                            m[y + 5] = i[2],
                            m[y + 6] = i[3],
                            m[y + 10] = i[4],
                            m[y + 11] = i[5],
                            m[y + 15] = i[6],
                            m[y + 16] = i[7];
                        v[y + 2] = n[0],
                        v[y + 7] = n[1],
                        v[y + 12] = n[2],
                        v[y + 17] = n[3],
                        v[y + 3] = v[y + 8] = v[y + 13] = v[y + 18] = r,
                        m[y + 4] = m[y + 9] = m[y + 14] = m[y + 19] = s,
                        y += 20
                    }
                    for (T.size = S - T.start, this.vertexCount++, this.vaoMax <= this.vertexCount && (this.vaoMax++, o = this.shaders[1], this.vertexBuffers[this.vertexCount] = u.GLBuffer.createVertexBuffer(h, null, h.STREAM_DRAW), this.vaos[this.vertexCount] = this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aVertexPosition, h.FLOAT, !1, this.vertByteSize, 0).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aTextureCoord, h.UNSIGNED_SHORT, !0, this.vertByteSize, 8).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aColor, h.UNSIGNED_BYTE, !0, this.vertByteSize, 12).addAttribute(this.vertexBuffers[this.vertexCount], o.attributes.aTextureId, h.FLOAT, !1, this.vertByteSize, 16)), this.vertexBuffers[this.vertexCount].upload(f.vertices, 0), this.vao = this.vaos[this.vertexCount].bind(), S = 0; x > S; S++) {
                        var R = g[S],
                            C = R.textureCount;
                        o = this.shaders[C - 1],
                        o || (o = this.shaders[C - 1] = a(h, C)),
                        this.renderer.bindShader(o);
                        for (var M = 0; C > M; M++)
                            this.renderer.bindTexture(R.textures[M], M);
                        this.renderer.state.setBlendMode(R.blend),
                        h.drawElements(h.TRIANGLES, 6 * R.size, h.UNSIGNED_SHORT, 6 * R.start * 2)
                    }
                    this.currentIndex = 0
                }
            },
            r.prototype.start = function() {},
            r.prototype.stop = function() {
                this.flush(),
                this.vao.unbind()
            },
            r.prototype.destroy = function() {
                for (var t = 0; t < this.vaoMax; t++)
                    this.vertexBuffers[t].destroy(),
                    this.vaos[t].destroy();
                for (this.indexBuffer.destroy(), this.renderer.off("prerender", this.onPrerender, this), n.prototype.destroy.call(this), t = 0; t < this.shaders.length; t++)
                    this.shaders[t] && this.shaders[t].destroy();
                for (this.vertexBuffers = null, this.vaos = null, this.indexBuffer = null, this.indices = null, this.sprites = null, t = 0; t < this.buffers.length; t++)
                    this.buffers[t].destroy()
            }
        }, {
            "../../const": 78,
            "../../renderers/webgl/WebGLRenderer": 116,
            "../../renderers/webgl/utils/ObjectRenderer": 126,
            "../../renderers/webgl/utils/checkMaxIfStatmentsInShader": 129,
            "../../utils/createIndicesForQuads": 149,
            "./BatchBuffer": 136,
            "./generateMultiTextureShader": 138,
            "bit-twiddle": 1,
            "pixi-gl-core": 12
        }],
        138: [function(t, e, i) {
            function r(t, e) {
                var i = "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vTextureId = aTextureId;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n",
                    r = o;
                r = r.replace(/%count%/gi, e),
                r = r.replace(/%forloop%/gi, n(e));
                for (var a = new s(t, i, r), h = [], l = 0; e > l; l++)
                    h[l] = l;
                return a.bind(), a.uniforms.uSamplers = h, a
            }
            function n(t) {
                var e = "";
                e += "\n",
                e += "\n";
                for (var i = 0; t > i; i++)
                    i > 0 && (e += "\nelse "),
                    t - 1 > i && (e += "if(textureId == " + i + ".0)"),
                    e += "\n{",
                    e += "\n\tcolor = texture2D(uSamplers[" + i + "], vTextureCoord);",
                    e += "\n}";
                return e += "\n", e += "\n"
            }
            var s = t("../../Shader"),
                o = ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n");
            e.exports = r
        }, {
            "../../Shader": 77
        }],
        139: [function(t, e, i) {
            function r(t, e) {
                this.canvas = document.createElement("canvas"),
                this.context = this.canvas.getContext("2d"),
                this.resolution = h.RESOLUTION,
                this._text = null,
                this._style = null,
                this._styleListener = null,
                this._font = "";
                var i = s.fromCanvas(this.canvas);
                i.orig = new o.Rectangle,
                i.trim = new o.Rectangle,
                n.call(this, i),
                this.text = t,
                this.style = e,
                this.localStyleID = -1
            }
            var n = t("../sprites/Sprite"),
                s = t("../textures/Texture"),
                o = t("../math"),
                a = t("../utils"),
                h = t("../const"),
                l = t("./TextStyle"),
                c = {
                    texture: !0,
                    children: !1,
                    baseTexture: !0
                };
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.fontPropertiesCache = {},
            r.fontPropertiesCanvas = document.createElement("canvas"),
            r.fontPropertiesContext = r.fontPropertiesCanvas.getContext("2d"),
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return this.updateText(!0), Math.abs(this.scale.x) * this.texture.orig.width
                    },
                    set: function(t) {
                        this.updateText(!0);
                        var e = a.sign(this.scale.x) || 1;
                        this.scale.x = e * t / this.texture.orig.width,
                        this._width = t
                    }
                },
                height: {
                    get: function() {
                        return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
                    },
                    set: function(t) {
                        this.updateText(!0);
                        var e = a.sign(this.scale.x) || 1;
                        this.scale.x = e * t / this.texture.orig.width,
                        this._width = t
                    }
                },
                style: {
                    get: function() {
                        return this._style
                    },
                    set: function(t) {
                        t = t || {},
                        this._style = t instanceof l ? t : new l(t),
                        this.localStyleID = -1,
                        this.dirty = !0
                    }
                },
                text: {
                    get: function() {
                        return this._text
                    },
                    set: function(t) {
                        t = t || " ",
                        t = t.toString(),
                        this._text !== t && (this._text = t, this.dirty = !0)
                    }
                }
            }),
            r.prototype.updateText = function(t) {
                var e = this._style;
                if (this.localStyleID !== e.styleID && (this.dirty = !0, this.localStyleID = e.styleID), this.dirty || !t) {
                    var i = "number" == typeof e.fontSize ? e.fontSize + "px" : e.fontSize;
                    this._font = e.fontStyle + " " + e.fontVariant + " " + e.fontWeight + " " + i + " " + e.fontFamily,
                    this.context.font = this._font;
                    var r,
                        n = e.wordWrap ? this.wordWrap(this._text) : this._text,
                        s = n.split(/(?:\r\n|\r|\n)/),
                        o = new Array(s.length),
                        a = 0,
                        h = this.determineFontProperties(this._font);
                    for (r = 0; r < s.length; r++) {
                        var l = this.context.measureText(s[r]).width + (s[r].length - 1) * e.letterSpacing;
                        o[r] = l,
                        a = Math.max(a, l)
                    }
                    var c = a + e.strokeThickness;
                    e.dropShadow && (c += e.dropShadowDistance),
                    c += 2 * e.padding,
                    this.canvas.width = Math.ceil((c + this.context.lineWidth) * this.resolution);
                    var u = this.style.lineHeight || h.fontSize + e.strokeThickness,
                        d = Math.max(u, h.fontSize + e.strokeThickness) + (s.length - 1) * u;
                    e.dropShadow && (d += e.dropShadowDistance),
                    this.canvas.height = Math.ceil((d + 2 * this._style.padding) * this.resolution),
                    this.context.scale(this.resolution, this.resolution),
                    navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
                    this.context.font = this._font,
                    this.context.strokeStyle = e.stroke,
                    this.context.lineWidth = e.strokeThickness,
                    this.context.textBaseline = e.textBaseline,
                    this.context.lineJoin = e.lineJoin,
                    this.context.miterLimit = e.miterLimit;
                    var p,
                        f;
                    if (e.dropShadow) {
                        e.dropShadowBlur > 0 ? (this.context.shadowColor = e.dropShadowColor, this.context.shadowBlur = e.dropShadowBlur) : this.context.fillStyle = e.dropShadowColor;
                        var _ = Math.cos(e.dropShadowAngle) * e.dropShadowDistance,
                            g = Math.sin(e.dropShadowAngle) * e.dropShadowDistance;
                        for (r = 0; r < s.length; r++)
                            p = e.strokeThickness / 2,
                            f = e.strokeThickness / 2 + r * u + h.ascent,
                            "right" === e.align ? p += a - o[r] : "center" === e.align && (p += (a - o[r]) / 2),
                            e.fill && (this.drawLetterSpacing(s[r], p + _ + e.padding, f + g + e.padding), e.stroke && e.strokeThickness && (this.context.strokeStyle = e.dropShadowColor, this.drawLetterSpacing(s[r], p + _ + e.padding, f + g + e.padding, !0), this.context.strokeStyle = e.stroke))
                    }
                    for (this.context.fillStyle = this._generateFillStyle(e, s), r = 0; r < s.length; r++)
                        p = e.strokeThickness / 2,
                        f = e.strokeThickness / 2 + r * u + h.ascent,
                        "right" === e.align ? p += a - o[r] : "center" === e.align && (p += (a - o[r]) / 2),
                        e.stroke && e.strokeThickness && this.drawLetterSpacing(s[r], p + e.padding, f + e.padding, !0),
                        e.fill && this.drawLetterSpacing(s[r], p + e.padding, f + e.padding);
                    this.updateTexture()
                }
            },
            r.prototype.drawLetterSpacing = function(t, e, i, r) {
                var n = this._style,
                    s = n.letterSpacing;
                if (0 === s)
                    return void (r ? this.context.strokeText(t, e, i) : this.context.fillText(t, e, i));
                for (var o, a = String.prototype.split.call(t, ""), h = 0, l = e; h < t.length;)
                    o = a[h++],
                    r ? this.context.strokeText(o, l, i) : this.context.fillText(o, l, i),
                    l += this.context.measureText(o).width + s
            },
            r.prototype.updateTexture = function() {
                var t = this._texture,
                    e = this._style;
                t.baseTexture.hasLoaded = !0,
                t.baseTexture.resolution = this.resolution,
                t.baseTexture.realWidth = this.canvas.width,
                t.baseTexture.realHeight = this.canvas.height,
                t.baseTexture.width = this.canvas.width / this.resolution,
                t.baseTexture.height = this.canvas.height / this.resolution,
                t.trim.width = t._frame.width = this.canvas.width / this.resolution,
                t.trim.height = t._frame.height = this.canvas.height / this.resolution,
                t.trim.x = -e.padding,
                t.trim.y = -e.padding,
                t.orig.width = t._frame.width,
                t.orig.height = t._frame.height - 2 * e.padding,
                this._onTextureUpdate(),
                t.baseTexture.emit("update", t.baseTexture),
                this.dirty = !1
            },
            r.prototype.renderWebGL = function(t) {
                this.resolution !== t.resolution && (this.resolution = t.resolution, this.dirty = !0),
                this.updateText(!0),
                n.prototype.renderWebGL.call(this, t)
            },
            r.prototype._renderCanvas = function(t) {
                this.resolution !== t.resolution && (this.resolution = t.resolution, this.dirty = !0),
                this.updateText(!0),
                n.prototype._renderCanvas.call(this, t)
            },
            r.prototype.determineFontProperties = function(t) {
                var e = r.fontPropertiesCache[t];
                if (!e) {
                    e = {};
                    var i = r.fontPropertiesCanvas,
                        n = r.fontPropertiesContext;
                    n.font = t;
                    var s = Math.ceil(n.measureText("|MÃ‰q").width),
                        o = Math.ceil(n.measureText("M").width),
                        a = 2 * o;
                    o = 1.4 * o | 0,
                    i.width = s,
                    i.height = a,
                    n.fillStyle = "#f00",
                    n.fillRect(0, 0, s, a),
                    n.font = t,
                    n.textBaseline = "alphabetic",
                    n.fillStyle = "#000",
                    n.fillText("|MÃ‰q", 0, o);
                    var h,
                        l,
                        c = n.getImageData(0, 0, s, a).data,
                        u = c.length,
                        d = 4 * s,
                        p = 0,
                        f = !1;
                    for (h = 0; o > h; h++) {
                        for (l = 0; d > l; l += 4)
                            if (255 !== c[p + l]) {
                                f = !0;
                                break
                            }
                        if (f)
                            break;
                        p += d
                    }
                    for (e.ascent = o - h, p = u - d, f = !1, h = a; h > o; h--) {
                        for (l = 0; d > l; l += 4)
                            if (255 !== c[p + l]) {
                                f = !0;
                                break
                            }
                        if (f)
                            break;
                        p -= d
                    }
                    e.descent = h - o,
                    e.fontSize = e.ascent + e.descent,
                    r.fontPropertiesCache[t] = e
                }
                return e
            },
            r.prototype.wordWrap = function(t) {
                for (var e = "", i = t.split("\n"), r = this._style.wordWrapWidth, n = 0; n < i.length; n++) {
                    for (var s = r, o = i[n].split(" "), a = 0; a < o.length; a++) {
                        var h = this.context.measureText(o[a]).width;
                        if (this._style.breakWords && h > r)
                            for (var l = o[a].split(""), c = 0; c < l.length; c++) {
                                var u = this.context.measureText(l[c]).width;
                                u > s ? (e += "\n" + l[c], s = r - u) : (0 === c && (e += " "), e += l[c], s -= u)
                            }
                        else {
                            var d = h + this.context.measureText(" ").width;
                            0 === a || d > s ? (a > 0 && (e += "\n"), e += o[a], s = r - h) : (s -= d, e += " " + o[a])
                        }
                    }
                    n < i.length - 1 && (e += "\n")
                }
                return e
            },
            r.prototype._calculateBounds = function() {
                this.updateText(!0),
                this.calculateVertices(),
                this._bounds.addQuad(this.vertexData)
            },
            r.prototype._onStyleChange = function() {
                this.dirty = !0
            },
            r.prototype._generateFillStyle = function(t, e) {
                if (Array.isArray(t.fill)) {
                    var i,
                        r,
                        n,
                        s,
                        o,
                        a = this.canvas.width / this.resolution,
                        l = this.canvas.height / this.resolution;
                    if (t.fillGradientType === h.TEXT_GRADIENT.LINEAR_VERTICAL)
                        for (r = this.context.createLinearGradient(a / 2, 0, a / 2, l), n = (t.fill.length + 1) * e.length, s = 0, i = 0; i < e.length; i++) {
                            s += 1;
                            for (var c = 0; c < t.fill.length; c++)
                                o = s / n,
                                r.addColorStop(o, t.fill[c]),
                                s++
                        }
                    else
                        for (r = this.context.createLinearGradient(0, l / 2, a, l / 2), n = t.fill.length + 1, s = 1, i = 0; i < t.fill.length; i++)
                            o = s / n,
                            r.addColorStop(o, t.fill[i]),
                            s++;
                    return r
                }
                return t.fill
            },
            r.prototype.destroy = function(t) {
                "boolean" == typeof t && (t = {
                    children: t
                }),
                t = Object.assign({}, c, t),
                n.prototype.destroy.call(this, t),
                this.context = null,
                this.canvas = null,
                this._style = null
            }
        }, {
            "../const": 78,
            "../math": 102,
            "../sprites/Sprite": 133,
            "../textures/Texture": 144,
            "../utils": 151,
            "./TextStyle": 140
        }],
        140: [function(t, e, i) {
            function r(t) {
                this.styleID = 0,
                Object.assign(this, this._defaults, t)
            }
            function n(t) {
                if ("number" == typeof t)
                    return o.hex2string(t);
                if (Array.isArray(t))
                    for (var e = 0; e < t.length; ++e)
                        "number" == typeof t[e] && (t[e] = o.hex2string(t[e]));
                return t
            }
            var s = t("../const"),
                o = t("../utils");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype._defaults = {
                align: "left",
                breakWords: !1,
                dropShadow: !1,
                dropShadowAngle: Math.PI / 6,
                dropShadowBlur: 0,
                dropShadowColor: "#000000",
                dropShadowDistance: 5,
                fill: "black",
                fillGradientType: s.TEXT_GRADIENT.LINEAR_VERTICAL,
                fontFamily: "Arial",
                fontSize: 26,
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: "normal",
                letterSpacing: 0,
                lineHeight: 0,
                lineJoin: "miter",
                miterLimit: 10,
                padding: 0,
                stroke: "black",
                strokeThickness: 0,
                textBaseline: "alphabetic",
                wordWrap: !1,
                wordWrapWidth: 100
            },
            r.prototype.clone = function() {
                var t = {};
                for (var e in this._defaults)
                    t[e] = this[e];
                return new r(t)
            },
            r.prototype.reset = function() {
                Object.assign(this, this._defaults)
            },
            Object.defineProperties(r.prototype, {
                align: {
                    get: function() {
                        return this._align
                    },
                    set: function(t) {
                        this._align !== t && (this._align = t, this.styleID++)
                    }
                },
                breakWords: {
                    get: function() {
                        return this._breakWords
                    },
                    set: function(t) {
                        this._breakWords !== t && (this._breakWords = t, this.styleID++)
                    }
                },
                dropShadow: {
                    get: function() {
                        return this._dropShadow
                    },
                    set: function(t) {
                        this._dropShadow !== t && (this._dropShadow = t, this.styleID++)
                    }
                },
                dropShadowAngle: {
                    get: function() {
                        return this._dropShadowAngle
                    },
                    set: function(t) {
                        this._dropShadowAngle !== t && (this._dropShadowAngle = t, this.styleID++)
                    }
                },
                dropShadowBlur: {
                    get: function() {
                        return this._dropShadowBlur
                    },
                    set: function(t) {
                        this._dropShadowBlur !== t && (this._dropShadowBlur = t, this.styleID++)
                    }
                },
                dropShadowColor: {
                    get: function() {
                        return this._dropShadowColor
                    },
                    set: function(t) {
                        var e = n(t);
                        this._dropShadowColor !== e && (this._dropShadowColor = e, this.styleID++)
                    }
                },
                dropShadowDistance: {
                    get: function() {
                        return this._dropShadowDistance
                    },
                    set: function(t) {
                        this._dropShadowDistance !== t && (this._dropShadowDistance = t, this.styleID++)
                    }
                },
                fill: {
                    get: function() {
                        return this._fill
                    },
                    set: function(t) {
                        var e = n(t);
                        this._fill !== e && (this._fill = e, this.styleID++)
                    }
                },
                fillGradientType: {
                    get: function() {
                        return this._fillGradientType
                    },
                    set: function(t) {
                        this._fillGradientType !== t && (this._fillGradientType = t, this.styleID++)
                    }
                },
                fontFamily: {
                    get: function() {
                        return this._fontFamily
                    },
                    set: function(t) {
                        this.fontFamily !== t && (this._fontFamily = t, this.styleID++)
                    }
                },
                fontSize: {
                    get: function() {
                        return this._fontSize
                    },
                    set: function(t) {
                        this._fontSize !== t && (this._fontSize = t, this.styleID++)
                    }
                },
                fontStyle: {
                    get: function() {
                        return this._fontStyle
                    },
                    set: function(t) {
                        this._fontStyle !== t && (this._fontStyle = t, this.styleID++)
                    }
                },
                fontVariant: {
                    get: function() {
                        return this._fontVariant
                    },
                    set: function(t) {
                        this._fontVariant !== t && (this._fontVariant = t, this.styleID++)
                    }
                },
                fontWeight: {
                    get: function() {
                        return this._fontWeight
                    },
                    set: function(t) {
                        this._fontWeight !== t && (this._fontWeight = t, this.styleID++)
                    }
                },
                letterSpacing: {
                    get: function() {
                        return this._letterSpacing
                    },
                    set: function(t) {
                        this._letterSpacing !== t && (this._letterSpacing = t, this.styleID++)
                    }
                },
                lineHeight: {
                    get: function() {
                        return this._lineHeight
                    },
                    set: function(t) {
                        this._lineHeight !== t && (this._lineHeight = t, this.styleID++)
                    }
                },
                lineJoin: {
                    get: function() {
                        return this._lineJoin
                    },
                    set: function(t) {
                        this._lineJoin !== t && (this._lineJoin = t, this.styleID++)
                    }
                },
                miterLimit: {
                    get: function() {
                        return this._miterLimit
                    },
                    set: function(t) {
                        this._miterLimit !== t && (this._miterLimit = t, this.styleID++)
                    }
                },
                padding: {
                    get: function() {
                        return this._padding
                    },
                    set: function(t) {
                        this._padding !== t && (this._padding = t, this.styleID++)
                    }
                },
                stroke: {
                    get: function() {
                        return this._stroke
                    },
                    set: function(t) {
                        var e = n(t);
                        this._stroke !== e && (this._stroke = e, this.styleID++)
                    }
                },
                strokeThickness: {
                    get: function() {
                        return this._strokeThickness
                    },
                    set: function(t) {
                        this._strokeThickness !== t && (this._strokeThickness = t, this.styleID++)
                    }
                },
                textBaseline: {
                    get: function() {
                        return this._textBaseline
                    },
                    set: function(t) {
                        this._textBaseline !== t && (this._textBaseline = t, this.styleID++)
                    }
                },
                wordWrap: {
                    get: function() {
                        return this._wordWrap
                    },
                    set: function(t) {
                        this._wordWrap !== t && (this._wordWrap = t, this.styleID++)
                    }
                },
                wordWrapWidth: {
                    get: function() {
                        return this._wordWrapWidth
                    },
                    set: function(t) {
                        this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.styleID++)
                    }
                }
            })
        }, {
            "../const": 78,
            "../utils": 151
        }],
        141: [function(t, e, i) {
            function r(t, e, i, r) {
                n.call(this, null, i),
                this.resolution = r || s.RESOLUTION,
                this.width = t || 100,
                this.height = e || 100,
                this.realWidth = this.width * this.resolution,
                this.realHeight = this.height * this.resolution,
                this.scaleMode = i || s.SCALE_MODES.DEFAULT,
                this.hasLoaded = !0,
                this._glRenderTargets = [],
                this._canvasRenderTarget = null,
                this.valid = !1
            }
            var n = t("./BaseTexture"),
                s = t("../const");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.resize = function(t, e) {
                t === this.width && e === this.height || (this.valid = t > 0 && e > 0, this.width = t, this.height = e, this.realWidth = this.width * this.resolution, this.realHeight = this.height * this.resolution, this.valid && this.emit("update", this))
            },
            r.prototype.destroy = function() {
                n.prototype.destroy.call(this, !0),
                this.renderer = null
            }
        }, {
            "../const": 78,
            "./BaseTexture": 142
        }],
        142: [function(t, e, i) {
            function r(t, e, i) {
                o.call(this),
                this.uid = n.uid(),
                this.touched = 0,
                this.resolution = i || s.RESOLUTION,
                this.width = 100,
                this.height = 100,
                this.realWidth = 100,
                this.realHeight = 100,
                this.scaleMode = e || s.SCALE_MODES.DEFAULT,
                this.hasLoaded = !1,
                this.isLoading = !1,
                this.source = null,
                this.premultipliedAlpha = !0,
                this.imageUrl = null,
                this.isPowerOfTwo = !1,
                this.mipmap = s.MIPMAP_TEXTURES,
                this.wrapMode = s.WRAP_MODES.DEFAULT,
                this._glTextures = [],
                this._enabled = 0,
                this._id = 0,
                t && this.loadSource(t)
            }
            var n = t("../utils"),
                s = t("../const"),
                o = t("eventemitter3"),
                a = t("../utils/determineCrossOrigin"),
                h = t("bit-twiddle");
            r.prototype = Object.create(o.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.update = function() {
                this.realWidth = this.source.naturalWidth || this.source.videoWidth || this.source.width,
                this.realHeight = this.source.naturalHeight || this.source.videoHeight || this.source.height,
                this.width = this.realWidth / this.resolution,
                this.height = this.realHeight / this.resolution,
                this.isPowerOfTwo = h.isPow2(this.realWidth) && h.isPow2(this.realHeight),
                this.emit("update", this)
            },
            r.prototype.loadSource = function(t) {
                var e = this.isLoading;
                if (this.hasLoaded = !1, this.isLoading = !1, e && this.source && (this.source.onload = null, this.source.onerror = null), this.source = t, (this.source.complete || this.source.getContext) && this.source.width && this.source.height)
                    this._sourceLoaded();
                else if (!t.getContext) {
                    this.isLoading = !0;
                    var i = this;
                    t.onload = function() {
                        t.onload = null,
                        t.onerror = null,
                        i.isLoading && (i.isLoading = !1, i._sourceLoaded(), i.emit("loaded", i))
                    },
                    t.onerror = function() {
                        t.onload = null,
                        t.onerror = null,
                        i.isLoading && (i.isLoading = !1, i.emit("error", i))
                    },
                    t.complete && t.src && (this.isLoading = !1, t.onload = null, t.onerror = null, t.width && t.height ? (this._sourceLoaded(), e && this.emit("loaded", this)) : e && this.emit("error", this))
                }
            },
            r.prototype._sourceLoaded = function() {
                this.hasLoaded = !0,
                this.update()
            },
            r.prototype.destroy = function() {
                this.imageUrl ? (delete n.BaseTextureCache[this.imageUrl], delete n.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")) : this.source && this.source._pixiId && delete n.BaseTextureCache[this.source._pixiId],
                this.source = null,
                this.dispose()
            },
            r.prototype.dispose = function() {
                this.emit("dispose", this)
            },
            r.prototype.updateSourceImage = function(t) {
                this.source.src = t,
                this.loadSource(this.source)
            },
            r.fromImage = function(t, e, i) {
                var s = n.BaseTextureCache[t];
                if (!s) {
                    var o = new Image;
                    void 0 === e && 0 !== t.indexOf("data:") && (o.crossOrigin = a(t)),
                    s = new r(o, i),
                    s.imageUrl = t,
                    o.src = t,
                    n.BaseTextureCache[t] = s,
                    s.resolution = n.getResolutionOfUrl(t)
                }
                return s
            },
            r.fromCanvas = function(t, e) {
                t._pixiId || (t._pixiId = "canvas_" + n.uid());
                var i = n.BaseTextureCache[t._pixiId];
                return i || (i = new r(t, e), n.BaseTextureCache[t._pixiId] = i), i
            }
        }, {
            "../const": 78,
            "../utils": 151,
            "../utils/determineCrossOrigin": 150,
            "bit-twiddle": 1,
            eventemitter3: 3
        }],
        143: [function(t, e, i) {
            function r(t, e) {
                if (this.legacyRenderer = null, !(t instanceof n)) {
                    var i = arguments[1],
                        r = arguments[2],
                        o = arguments[3] || 0,
                        a = arguments[4] || 1;
                    console.warn("v4 RenderTexture now expects a new BaseRenderTexture. Please use RenderTexture.create(" + i + ", " + r + ")"),
                    this.legacyRenderer = arguments[0],
                    e = null,
                    t = new n(i, r, o, a)
                }
                s.call(this, t, e),
                this.valid = !0,
                this._updateUvs()
            }
            var n = t("./BaseRenderTexture"),
                s = t("./Texture");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.resize = function(t, e, i) {
                this.valid = t > 0 && e > 0,
                this._frame.width = this.orig.width = t,
                this._frame.height = this.orig.height = e,
                i || this.baseTexture.resize(t, e),
                this._updateUvs()
            },
            r.create = function(t, e, i, s) {
                return new r(new n(t, e, i, s))
            }
        }, {
            "./BaseRenderTexture": 141,
            "./Texture": 144
        }],
        144: [function(t, e, i) {
            function r(t, e, i, n, s) {
                if (a.call(this), this.noFrame = !1, e || (this.noFrame = !0, e = new h.Rectangle(0, 0, 1, 1)), t instanceof r && (t = t.baseTexture), this.baseTexture = t, this._frame = e, this.trim = n, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.orig = i || e, this._rotate = +(s || 0), !0 === s)
                    this._rotate = 2;
                else if (this._rotate % 2 != 0)
                    throw "attempt to use diamond-shaped UVs. If you are sure, set rotation manually";
                t.hasLoaded ? (this.noFrame && (e = new h.Rectangle(0, 0, t.width, t.height), t.on("update", this.onBaseTextureUpdated, this)), this.frame = e) : t.once("loaded", this.onBaseTextureLoaded, this),
                this._updateID = 0
            }
            var n = t("./BaseTexture"),
                s = t("./VideoBaseTexture"),
                o = t("./TextureUvs"),
                a = t("eventemitter3"),
                h = t("../math"),
                l = t("../utils");
            r.prototype = Object.create(a.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                frame: {
                    get: function() {
                        return this._frame
                    },
                    set: function(t) {
                        if (this._frame = t, this.noFrame = !1, t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height)
                            throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
                        this.valid = t && t.width && t.height && this.baseTexture.hasLoaded,
                        this.trim || this.rotate || (this.orig = t),
                        this.valid && this._updateUvs()
                    }
                },
                rotate: {
                    get: function() {
                        return this._rotate
                    },
                    set: function(t) {
                        this._rotate = t,
                        this.valid && this._updateUvs()
                    }
                },
                width: {
                    get: function() {
                        return this.orig ? this.orig.width : 0
                    }
                },
                height: {
                    get: function() {
                        return this.orig ? this.orig.height : 0
                    }
                }
            }),
            r.prototype.update = function() {
                this.baseTexture.update()
            },
            r.prototype.onBaseTextureLoaded = function(t) {
                this._updateID++,
                this.noFrame ? this.frame = new h.Rectangle(0, 0, t.width, t.height) : this.frame = this._frame,
                this.baseTexture.on("update", this.onBaseTextureUpdated, this),
                this.emit("update", this)
            },
            r.prototype.onBaseTextureUpdated = function(t) {
                this._updateID++,
                this._frame.width = t.width,
                this._frame.height = t.height,
                this.emit("update", this)
            },
            r.prototype.destroy = function(t) {
                this.baseTexture && (t && (l.TextureCache[this.baseTexture.imageUrl] && delete l.TextureCache[this.baseTexture.imageUrl], this.baseTexture.destroy()), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null),
                this._frame = null,
                this._uvs = null,
                this.trim = null,
                this.orig = null,
                this.valid = !1,
                this.off("dispose", this.dispose, this),
                this.off("update", this.update, this)
            },
            r.prototype.clone = function() {
                return new r(this.baseTexture, this.frame, this.orig, this.trim, this.rotate)
            },
            r.prototype._updateUvs = function() {
                this._uvs || (this._uvs = new o),
                this._uvs.set(this._frame, this.baseTexture, this.rotate),
                this._updateID++
            },
            r.fromImage = function(t, e, i) {
                var s = l.TextureCache[t];
                return s || (s = new r(n.fromImage(t, e, i)), l.TextureCache[t] = s), s
            },
            r.fromFrame = function(t) {
                var e = l.TextureCache[t];
                if (!e)
                    throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return e
            },
            r.fromCanvas = function(t, e) {
                return new r(n.fromCanvas(t, e))
            },
            r.fromVideo = function(t, e) {
                return "string" == typeof t ? r.fromVideoUrl(t, e) : new r(s.fromVideo(t, e))
            },
            r.fromVideoUrl = function(t, e) {
                return new r(s.fromUrl(t, e))
            },
            r.from = function(t) {
                if ("string" == typeof t) {
                    var e = l.TextureCache[t];
                    if (!e) {
                        return null !== t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/) ? r.fromVideoUrl(t) : r.fromImage(t)
                    }
                    return e
                }
                return t instanceof HTMLCanvasElement ? r.fromCanvas(t) : t instanceof HTMLVideoElement ? r.fromVideo(t) : t instanceof n ? new r(n) : void 0
            },
            r.addTextureToCache = function(t, e) {
                l.TextureCache[e] = t
            },
            r.removeTextureFromCache = function(t) {
                var e = l.TextureCache[t];
                return delete l.TextureCache[t], delete l.BaseTextureCache[t], e
            },
            r.EMPTY = new r(new n),
            r.EMPTY.destroy = function() {},
            r.EMPTY.on = function() {},
            r.EMPTY.once = function() {},
            r.EMPTY.emit = function() {}
        }, {
            "../math": 102,
            "../utils": 151,
            "./BaseTexture": 142,
            "./TextureUvs": 145,
            "./VideoBaseTexture": 146,
            eventemitter3: 3
        }],
        145: [function(t, e, i) {
            function r() {
                this.x0 = 0,
                this.y0 = 0,
                this.x1 = 1,
                this.y1 = 0,
                this.x2 = 1,
                this.y2 = 1,
                this.x3 = 0,
                this.y3 = 1,
                this.uvsUint32 = new Uint32Array(4)
            }
            e.exports = r;
            var n = t("../math/GroupD8");
            r.prototype.set = function(t, e, i) {
                var r = e.width,
                    s = e.height;
                if (i) {
                    var o = t.width / 2 / r,
                        a = t.height / 2 / s,
                        h = t.x / r + o,
                        l = t.y / s + a;
                    i = n.add(i, n.NW),
                    this.x0 = h + o * n.uX(i),
                    this.y0 = l + a * n.uY(i),
                    i = n.add(i, 2),
                    this.x1 = h + o * n.uX(i),
                    this.y1 = l + a * n.uY(i),
                    i = n.add(i, 2),
                    this.x2 = h + o * n.uX(i),
                    this.y2 = l + a * n.uY(i),
                    i = n.add(i, 2),
                    this.x3 = h + o * n.uX(i),
                    this.y3 = l + a * n.uY(i)
                } else
                    this.x0 = t.x / r,
                    this.y0 = t.y / s,
                    this.x1 = (t.x + t.width) / r,
                    this.y1 = t.y / s,
                    this.x2 = (t.x + t.width) / r,
                    this.y2 = (t.y + t.height) / s,
                    this.x3 = t.x / r,
                    this.y3 = (t.y + t.height) / s;
                this.uvsUint32[0] = (65535 * this.y0 & 65535) << 16 | 65535 * this.x0 & 65535,
                this.uvsUint32[1] = (65535 * this.y1 & 65535) << 16 | 65535 * this.x1 & 65535,
                this.uvsUint32[2] = (65535 * this.y2 & 65535) << 16 | 65535 * this.x2 & 65535,
                this.uvsUint32[3] = (65535 * this.y3 & 65535) << 16 | 65535 * this.x3 & 65535
            }
        }, {
            "../math/GroupD8": 98
        }],
        146: [function(t, e, i) {
            function r(t, e) {
                if (!t)
                    throw new Error("No video source element specified.");
                (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0),
                s.call(this, t, e),
                this.autoUpdate = !1,
                this._onUpdate = this._onUpdate.bind(this),
                this._onCanPlay = this._onCanPlay.bind(this),
                t.complete || (t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlay), t.addEventListener("play", this._onPlayStart.bind(this)), t.addEventListener("pause", this._onPlayStop.bind(this))),
                this.__loaded = !1
            }
            function n(t, e) {
                e || (e = "video/" + t.substr(t.lastIndexOf(".") + 1));
                var i = document.createElement("source");
                return i.src = t, i.type = e, i
            }
            var s = t("./BaseTexture"),
                o = t("../utils");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype._onUpdate = function() {
                this.autoUpdate && (window.requestAnimationFrame(this._onUpdate), this.update())
            },
            r.prototype._onPlayStart = function() {
                this.autoUpdate || (window.requestAnimationFrame(this._onUpdate), this.autoUpdate = !0)
            },
            r.prototype._onPlayStop = function() {
                this.autoUpdate = !1
            },
            r.prototype._onCanPlay = function() {
                this.hasLoaded = !0,
                this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.source.play(), this.__loaded || (this.__loaded = !0, this.emit("loaded", this)))
            },
            r.prototype.destroy = function() {
                this.source && this.source._pixiId && (delete o.BaseTextureCache[this.source._pixiId], delete this.source._pixiId),
                s.prototype.destroy.call(this)
            },
            r.fromVideo = function(t, e) {
                t._pixiId || (t._pixiId = "video_" + o.uid());
                var i = o.BaseTextureCache[t._pixiId];
                return i || (i = new r(t, e), o.BaseTextureCache[t._pixiId] = i), i
            },
            r.fromUrl = function(t, e) {
                var i = document.createElement("video");
                if (Array.isArray(t))
                    for (var s = 0; s < t.length; ++s)
                        i.appendChild(n(t[s].src || t[s], t[s].mime));
                else
                    i.appendChild(n(t.src || t, t.mime));
                return i.load(), i.play(), r.fromVideo(i, e)
            },
            r.fromUrls = r.fromUrl
        }, {
            "../utils": 151,
            "./BaseTexture": 142
        }],
        147: [function(t, e, i) {
            function r() {
                var t = this;
                this._tick = function(e) {
                    t._requestId = null,
                    t.started && (t.update(e), t.started && null === t._requestId && t._emitter.listeners(o, !0) && (t._requestId = requestAnimationFrame(t._tick)))
                },
                this._emitter = new s,
                this._requestId = null,
                this._maxElapsedMS = 100,
                this.autoStart = !1,
                this.deltaTime = 1,
                this.elapsedMS = 1 / n.TARGET_FPMS,
                this.lastTime = 0,
                this.speed = 1,
                this.started = !1
            }
            var n = t("../const"),
                s = t("eventemitter3"),
                o = "tick";
            Object.defineProperties(r.prototype, {
                FPS: {
                    get: function() {
                        return 1e3 / this.elapsedMS
                    }
                },
                minFPS: {
                    get: function() {
                        return 1e3 / this._maxElapsedMS
                    },
                    set: function(t) {
                        var e = Math.min(Math.max(0, t) / 1e3, n.TARGET_FPMS);
                        this._maxElapsedMS = 1 / e
                    }
                }
            }),
            r.prototype._requestIfNeeded = function() {
                null === this._requestId && this._emitter.listeners(o, !0) && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick))
            },
            r.prototype._cancelIfNeeded = function() {
                null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
            },
            r.prototype._startIfPossible = function() {
                this.started ? this._requestIfNeeded() : this.autoStart && this.start()
            },
            r.prototype.add = function(t, e) {
                return this._emitter.on(o, t, e), this._startIfPossible(), this
            },
            r.prototype.addOnce = function(t, e) {
                return this._emitter.once(o, t, e), this._startIfPossible(), this
            },
            r.prototype.remove = function(t, e) {
                return this._emitter.off(o, t, e), this._emitter.listeners(o, !0) || this._cancelIfNeeded(), this
            },
            r.prototype.start = function() {
                this.started || (this.started = !0, this._requestIfNeeded())
            },
            r.prototype.stop = function() {
                this.started && (this.started = !1, this._cancelIfNeeded())
            },
            r.prototype.update = function(t) {
                var e;
                t = t || performance.now(),
                t > this.lastTime ? (e = this.elapsedMS = t - this.lastTime, e > this._maxElapsedMS && (e = this._maxElapsedMS), this.deltaTime = e * n.TARGET_FPMS * this.speed, this._emitter.emit(o, this.deltaTime)) : this.deltaTime = this.elapsedMS = 0,
                this.lastTime = t
            },
            e.exports = r
        }, {
            "../const": 78,
            eventemitter3: 3
        }],
        148: [function(t, e, i) {
            var r = t("./Ticker"),
                n = new r;
            n.autoStart = !0,
            e.exports = {
                shared: n,
                Ticker: r
            }
        }, {
            "./Ticker": 147
        }],
        149: [function(t, e, i) {
            var r = function(t) {
                for (var e = 6 * t, i = new Uint16Array(e), r = 0, n = 0; e > r; r += 6, n += 4)
                    i[r + 0] = n + 0,
                    i[r + 1] = n + 1,
                    i[r + 2] = n + 2,
                    i[r + 3] = n + 0,
                    i[r + 4] = n + 2,
                    i[r + 5] = n + 3;
                return i
            };
            e.exports = r
        }, {}],
        150: [function(t, e, i) {
            var r,
                n = t("url"),
                s = function(t, e) {
                    if (0 === t.indexOf("data:"))
                        return "";
                    e = e || window.location,
                    r || (r = document.createElement("a")),
                    r.href = t,
                    t = n.parse(r.href);
                    var i = !t.port && "" === e.port || t.port === e.port;
                    return t.hostname === e.hostname && i && t.protocol === e.protocol ? "" : "anonymous"
                };
            e.exports = s
        }, {
            url: 28
        }],
        151: [function(t, e, i) {
            var r = t("../const"),
                n = e.exports = {
                    _uid: 0,
                    _saidHello: !1,
                    EventEmitter: t("eventemitter3"),
                    pluginTarget: t("./pluginTarget"),
                    uid: function() {
                        return ++n._uid
                    },
                    hex2rgb: function(t, e) {
                        return e = e || [], e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
                    },
                    hex2string: function(t) {
                        return t = t.toString(16), "#" + (t = "000000".substr(0, 6 - t.length) + t)
                    },
                    rgb2hex: function(t) {
                        return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
                    },
                    getResolutionOfUrl: function(t) {
                        var e = r.RETINA_PREFIX.exec(t);
                        return e ? parseFloat(e[1]) : 1
                    },
                    sayHello: function(t) {
                        n._saidHello || (n._saidHello = !0)
                    },
                    isWebGLSupported: function() {
                        var t = {
                            stencil: !0,
                            failIfMajorPerformanceCaveat: !0
                        };
                        try {
                            if (!window.WebGLRenderingContext)
                                return !1;
                            var e = document.createElement("canvas"),
                                i = e.getContext("webgl", t) || e.getContext("experimental-webgl", t),
                                r = !(!i || !i.getContextAttributes().stencil);
                            if (i) {
                                var n = i.getExtension("WEBGL_lose_context");
                                n && n.loseContext()
                            }
                            return i = null, r
                        } catch (t) {
                            return !1
                        }
                    },
                    sign: function(t) {
                        return t ? 0 > t ? -1 : 1 : 0
                    },
                    removeItems: function(t, e, i) {
                        var r = t.length;
                        if (!(e >= r || 0 === i)) {
                            i = e + i > r ? r - e : i;
                            for (var n = e, s = r - i; s > n; ++n)
                                t[n] = t[n + i];
                            t.length = s
                        }
                    },
                    TextureCache: {},
                    BaseTextureCache: {}
                }
        }, {
            "../const": 78,
            "./pluginTarget": 153,
            eventemitter3: 3
        }],
        152: [function(t, e, i) {
            var r = t("ismobilejs"),
                n = function(t) {
                    return r.tablet || r.phone ? 2 : t
                };
            e.exports = n
        }, {
            ismobilejs: 4
        }],
        153: [function(t, e, i) {
            function r(t) {
                t.__plugins = {},
                t.registerPlugin = function(e, i) {
                    t.__plugins[e] = i
                },
                t.prototype.initPlugins = function() {
                    this.plugins = this.plugins || {};
                    for (var e in t.__plugins)
                        this.plugins[e] = new t.__plugins[e](this)
                },
                t.prototype.destroyPlugins = function() {
                    for (var t in this.plugins)
                        this.plugins[t].destroy(),
                        this.plugins[t] = null;
                    this.plugins = null
                }
            }
            e.exports = {
                mixin: function(t) {
                    r(t)
                }
            }
        }, {}],
        154: [function(t, e, i) {
            function r(t) {
                var e = (new Error).stack;
                void 0 === e ? console.warn("Deprecation Warning: ", t) : (e = e.split("\n").splice(3).join("\n"), console.groupCollapsed ? (console.groupCollapsed("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t), console.warn(e), console.groupEnd()) : (console.warn("Deprecation Warning: ", t), console.warn(e)))
            }
            var n = t("./core"),
                s = t("./mesh"),
                o = t("./particles"),
                a = t("./extras"),
                h = t("./filters");
            n.SpriteBatch = function() {
                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
            },
            n.AssetLoader = function() {
                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
            },
            Object.defineProperties(n, {
                Stage: {
                    get: function() {
                        return r("You do not need to use a PIXI Stage any more, you can simply render any container."), n.Container
                    }
                },
                DisplayObjectContainer: {
                    get: function() {
                        return r("DisplayObjectContainer has been shortened to Container, please use Container from now on."), n.Container
                    }
                },
                Strip: {
                    get: function() {
                        return r("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), s.Mesh
                    }
                },
                Rope: {
                    get: function() {
                        return r("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), s.Rope
                    }
                },
                ParticleContainer: {
                    get: function() {
                        return r("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), o.ParticleContainer
                    }
                },
                MovieClip: {
                    get: function() {
                        return r("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."), a.MovieClip
                    }
                },
                TilingSprite: {
                    get: function() {
                        return r("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), a.TilingSprite
                    }
                },
                BitmapText: {
                    get: function() {
                        return r("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), a.BitmapText
                    }
                },
                blendModes: {
                    get: function() {
                        return r("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), n.BLEND_MODES
                    }
                },
                scaleModes: {
                    get: function() {
                        return r("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), n.SCALE_MODES
                    }
                },
                BaseTextureCache: {
                    get: function() {
                        return r("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), n.utils.BaseTextureCache
                    }
                },
                TextureCache: {
                    get: function() {
                        return r("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), n.utils.TextureCache
                    }
                },
                math: {
                    get: function() {
                        return r("The math namespace is deprecated, please access members already accessible on PIXI."), n
                    }
                },
                AbstractFilter: {
                    get: function() {
                        return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"), n.Filter
                    }
                },
                TransformManual: {
                    get: function() {
                        return r("TransformManual has been renamed to TransformBase, please update your pixi-spine"), n.TransformBase
                    }
                }
            }),
            n.DisplayObject.prototype.generateTexture = function(t, e, i) {
                return r("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), t.generateTexture(this, e, i)
            },
            n.Graphics.prototype.generateTexture = function(t, e) {
                return r("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), this.generateCanvasTexture(t, e)
            },
            n.RenderTexture.prototype.render = function(t, e, i, n) {
                this.legacyRenderer.render(t, this, i, e, !n),
                r("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")
            },
            n.RenderTexture.prototype.getImage = function(t) {
                return r("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), this.legacyRenderer.extract.image(t)
            },
            n.RenderTexture.prototype.getBase64 = function(t) {
                return r("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), this.legacyRenderer.extract.base64(t)
            },
            n.RenderTexture.prototype.getCanvas = function(t) {
                return r("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), this.legacyRenderer.extract.canvas(t)
            },
            n.RenderTexture.prototype.getPixels = function(t) {
                return r("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), this.legacyRenderer.pixels(t)
            },
            n.Sprite.prototype.setTexture = function(t) {
                this.texture = t,
                r("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
            },
            a.BitmapText.prototype.setText = function(t) {
                this.text = t,
                r("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
            },
            n.Text.prototype.setText = function(t) {
                this.text = t,
                r("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
            },
            n.Text.prototype.setStyle = function(t) {
                this.style = t,
                r("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
            },
            Object.defineProperties(n.TextStyle.prototype, {
                font: {
                    get: function() {
                        r("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on");
                        var t = "number" == typeof this._fontSize ? this._fontSize + "px" : this._fontSize;
                        return this._fontStyle + " " + this._fontVariant + " " + this._fontWeight + " " + t + " " + this._fontFamily
                    },
                    set: function(t) {
                        r("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"),
                        t.indexOf("italic") > 1 ? this._fontStyle = "italic" : t.indexOf("oblique") > -1 ? this._fontStyle = "oblique" : this._fontStyle = "normal",
                        t.indexOf("small-caps") > -1 ? this._fontVariant = "small-caps" : this._fontVariant = "normal";
                        var e,
                            i = t.split(" "),
                            n = -1;
                        for (this._fontSize = 26, e = 0; e < i.length; ++e)
                            if (i[e].match(/(px|pt|em|%)/)) {
                                n = e,
                                this._fontSize = i[e];
                                break
                            }
                        for (this._fontWeight = "normal", e = 0; n > e; ++e)
                            if (i[e].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                                this._fontWeight = i[e];
                                break
                            }
                        if (n > -1 && n < i.length - 1) {
                            for (this._fontFamily = "", e = n + 1; e < i.length; ++e)
                                this._fontFamily += i[e] + " ";
                            this._fontFamily = this._fontFamily.slice(0, -1)
                        } else
                            this._fontFamily = "Arial";
                        this.styleID++
                    }
                }
            }),
            n.Texture.prototype.setFrame = function(t) {
                this.frame = t,
                r("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")
            },
            Object.defineProperties(h, {
                AbstractFilter: {
                    get: function() {
                        return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"), n.AbstractFilter
                    }
                },
                SpriteMaskFilter: {
                    get: function() {
                        return r("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), n.SpriteMaskFilter
                    }
                }
            }),
            n.utils.uuid = function() {
                return r("utils.uuid() is deprecated, please use utils.uid() from now on."), n.utils.uid()
            },
            n.utils.canUseNewCanvasBlendModes = function() {
                return r("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), n.CanvasTinter.canUseMultiply
            }
        }, {
            "./core": 97,
            "./extras": 164,
            "./filters": 175,
            "./mesh": 191,
            "./particles": 194
        }],
        155: [function(t, e, i) {
            function r(t) {
                this.renderer = t,
                t.extract = this
            }
            var n = t("../../core"),
                s = new n.Rectangle;
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.image = function(t) {
                var e = new Image;
                return e.src = this.base64(t), e
            },
            r.prototype.base64 = function(t) {
                return this.canvas(t).toDataURL()
            },
            r.prototype.canvas = function(t) {
                var e,
                    i,
                    r,
                    o,
                    a = this.renderer;
                t && (o = t instanceof n.RenderTexture ? t : a.generateTexture(t)),
                o ? (e = o.baseTexture._canvasRenderTarget.context, i = o.baseTexture._canvasRenderTarget.resolution, r = o.frame) : (e = a.rootContext, i = a.rootResolution, r = s, r.width = this.renderer.width, r.height = this.renderer.height);
                var h = r.width * i,
                    l = r.height * i,
                    c = new n.CanvasRenderTarget(h, l),
                    u = e.getImageData(r.x * i, r.y * i, h, l);
                return c.context.putImageData(u, 0, 0), c.canvas
            },
            r.prototype.pixels = function(t) {
                var e,
                    i,
                    r,
                    o,
                    a = this.renderer;
                return t && (o = t instanceof n.RenderTexture ? t : a.generateTexture(t)), o ? (e = o.baseTexture._canvasRenderTarget.context, i = o.baseTexture._canvasRenderTarget.resolution, r = o.frame) : (e = a.rootContext, i = a.rootResolution, r = s, r.width = a.width, r.height = a.height), e.getImageData(0, 0, r.width * i, r.height * i).data
            },
            r.prototype.destroy = function() {
                this.renderer.extract = null,
                this.renderer = null
            },
            n.CanvasRenderer.registerPlugin("extract", r)
        }, {
            "../../core": 97
        }],
        156: [function(t, e, i) {
            e.exports = {
                webGL: t("./webgl/WebGLExtract"),
                canvas: t("./canvas/CanvasExtract")
            }
        }, {
            "./canvas/CanvasExtract": 155,
            "./webgl/WebGLExtract": 157
        }],
        157: [function(t, e, i) {
            function r(t) {
                this.renderer = t,
                t.extract = this
            }
            var n = t("../../core"),
                s = new n.Rectangle;
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.image = function(t) {
                var e = new Image;
                return e.src = this.base64(t), e
            },
            r.prototype.base64 = function(t) {
                return this.canvas(t).toDataURL()
            },
            r.prototype.canvas = function(t) {
                var e,
                    i,
                    r,
                    o,
                    a = this.renderer,
                    h = !1;
                t && (o = t instanceof n.RenderTexture ? t : this.renderer.generateTexture(t)),
                o ? (e = o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], i = e.resolution, r = o.frame, h = !1) : (e = this.renderer.rootRenderTarget, i = e.resolution, h = !0, r = s, r.width = e.size.width, r.height = e.size.height);
                var l = r.width * i,
                    c = r.height * i,
                    u = new n.CanvasRenderTarget(l, c);
                if (e) {
                    a.bindRenderTarget(e);
                    var d = new Uint8Array(4 * l * c),
                        p = a.gl;
                    p.readPixels(r.x * i, r.y * i, l, c, p.RGBA, p.UNSIGNED_BYTE, d);
                    var f = u.context.getImageData(0, 0, l, c);
                    f.data.set(d),
                    u.context.putImageData(f, 0, 0),
                    h && (u.context.scale(1, -1), u.context.drawImage(u.canvas, 0, -c))
                }
                return u.canvas
            },
            r.prototype.pixels = function(t) {
                var e,
                    i,
                    r,
                    o,
                    a = this.renderer;
                t && (o = t instanceof n.RenderTexture ? t : this.renderer.generateTexture(t)),
                o ? (e = o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID], i = e.resolution, r = o.frame) : (e = this.renderer.rootRenderTarget, i = e.resolution, r = s, r.width = e.size.width, r.height = e.size.height);
                var h = r.width * i,
                    l = r.height * i,
                    c = new Uint8Array(4 * h * l);
                if (e) {
                    a.bindRenderTarget(e);
                    var u = a.gl;
                    u.readPixels(r.x * i, r.y * i, h, l, u.RGBA, u.UNSIGNED_BYTE, c)
                }
                return c
            },
            r.prototype.destroy = function() {
                this.renderer.extract = null,
                this.renderer = null
            },
            n.WebGLRenderer.registerPlugin("extract", r)
        }, {
            "../../core": 97
        }],
        158: [function(t, e, i) {
            function r(t, e) {
                n.Container.call(this),
                e = e || {},
                this.textWidth = 0,
                this.textHeight = 0,
                this._glyphs = [],
                this._font = {
                    tint: void 0 !== e.tint ? e.tint : 16777215,
                    align: e.align || "left",
                    name: null,
                    size: 0
                },
                this.font = e.font,
                this._text = t,
                this.maxWidth = 0,
                this.maxLineHeight = 0,
                this._anchor = new s(this.makeDirty, this, 0, 0),
                this.dirty = !1,
                this.updateText()
            }
            var n = t("../core"),
                s = t("../core/math/ObservablePoint");
            r.prototype = Object.create(n.Container.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                tint: {
                    get: function() {
                        return this._font.tint
                    },
                    set: function(t) {
                        this._font.tint = "number" == typeof t && t >= 0 ? t : 16777215,
                        this.dirty = !0
                    }
                },
                align: {
                    get: function() {
                        return this._font.align
                    },
                    set: function(t) {
                        this._font.align = t || "left",
                        this.dirty = !0
                    }
                },
                anchor: {
                    get: function() {
                        return this._anchor
                    },
                    set: function(t) {
                        "number" == typeof t ? this._anchor.set(t) : this._anchor.copy(t)
                    }
                },
                font: {
                    get: function() {
                        return this._font
                    },
                    set: function(t) {
                        t && ("string" == typeof t ? (t = t.split(" "), this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this._font.size = t.length >= 2 ? parseInt(t[0], 10) : r.fonts[this._font.name].size) : (this._font.name = t.name, this._font.size = "number" == typeof t.size ? t.size : parseInt(t.size, 10)), this.dirty = !0)
                    }
                },
                text: {
                    get: function() {
                        return this._text
                    },
                    set: function(t) {
                        t = t.toString() || " ",
                        this._text !== t && (this._text = t, this.dirty = !0)
                    }
                }
            }),
            r.prototype.updateText = function() {
                for (var t = r.fonts[this._font.name], e = new n.Point, i = null, s = [], o = 0, a = 0, h = [], l = 0, c = this._font.size / t.size, u = -1, d = 0, p = 0, f = 0; f < this.text.length; f++) {
                    var _ = this.text.charCodeAt(f);
                    if (/(\s)/.test(this.text.charAt(f)) && (u = f, d = o), /(?:\r\n|\r|\n)/.test(this.text.charAt(f)))
                        h.push(o),
                        a = Math.max(a, o),
                        l++,
                        e.x = 0,
                        e.y += t.lineHeight,
                        i = null;
                    else if (-1 !== u && this.maxWidth > 0 && e.x * c > this.maxWidth)
                        n.utils.removeItems(s, u, f - u),
                        f = u,
                        u = -1,
                        h.push(d),
                        a = Math.max(a, d),
                        l++,
                        e.x = 0,
                        e.y += t.lineHeight,
                        i = null;
                    else {
                        var g = t.chars[_];
                        g && (i && g.kerning[i] && (e.x += g.kerning[i]), s.push({
                            texture: g.texture,
                            line: l,
                            charCode: _,
                            position: new n.Point(e.x + g.xOffset, e.y + g.yOffset)
                        }), o = e.x + (g.texture.width + g.xOffset), e.x += g.xAdvance, p = Math.max(p, g.yOffset + g.texture.height), i = _)
                    }
                }
                h.push(o),
                a = Math.max(a, o);
                var m = [];
                for (f = 0; l >= f; f++) {
                    var v = 0;
                    "right" === this._font.align ? v = a - h[f] : "center" === this._font.align && (v = (a - h[f]) / 2),
                    m.push(v)
                }
                var y = s.length,
                    x = this.tint;
                for (f = 0; y > f; f++) {
                    var b = this._glyphs[f];
                    b ? b.texture = s[f].texture : (b = new n.Sprite(s[f].texture), this._glyphs.push(b)),
                    b.position.x = (s[f].position.x + m[s[f].line]) * c,
                    b.position.y = s[f].position.y * c,
                    b.scale.x = b.scale.y = c,
                    b.tint = x,
                    b.parent || this.addChild(b)
                }
                for (f = y; f < this._glyphs.length; ++f)
                    this.removeChild(this._glyphs[f]);
                if (this.textWidth = a * c, this.textHeight = (e.y + t.lineHeight) * c, 0 !== this.anchor.x || 0 !== this.anchor.y)
                    for (f = 0; y > f; f++)
                        this._glyphs[f].x -= this.textWidth * this.anchor.x,
                        this._glyphs[f].y -= this.textHeight * this.anchor.y;
                this.maxLineHeight = p * c
            },
            r.prototype.updateTransform = function() {
                this.validate(),
                this.containerUpdateTransform()
            },
            r.prototype.getLocalBounds = function() {
                return this.validate(), n.Container.prototype.getLocalBounds.call(this)
            },
            r.prototype.validate = function() {
                this.dirty && (this.updateText(), this.dirty = !1)
            },
            r.prototype.makeDirty = function() {
                this.dirty = !0
            },
            r.fonts = {}
        }, {
            "../core": 97,
            "../core/math/ObservablePoint": 100
        }],
        159: [function(t, e, i) {
            function r(t) {
                n.Sprite.call(this, t[0] instanceof n.Texture ? t[0] : t[0].texture),
                this._textures = null,
                this._durations = null,
                this.textures = t,
                this.animationSpeed = 1,
                this.loop = !0,
                this.onComplete = null,
                this._currentTime = 0,
                this.playing = !1
            }
            var n = t("../core");
            r.prototype = Object.create(n.Sprite.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                totalFrames: {
                    get: function() {
                        return this._textures.length
                    }
                },
                textures: {
                    get: function() {
                        return this._textures
                    },
                    set: function(t) {
                        if (t[0] instanceof n.Texture)
                            this._textures = t,
                            this._durations = null;
                        else {
                            this._textures = [],
                            this._durations = [];
                            for (var e = 0; e < t.length; e++)
                                this._textures.push(t[e].texture),
                                this._durations.push(t[e].time)
                        }
                    }
                },
                currentFrame: {
                    get: function() {
                        var t = Math.floor(this._currentTime) % this._textures.length;
                        return 0 > t && (t += this._textures.length), t
                    }
                }
            }),
            r.prototype.stop = function() {
                this.playing && (this.playing = !1, n.ticker.shared.remove(this.update, this))
            },
            r.prototype.play = function() {
                this.playing || (this.playing = !0, n.ticker.shared.add(this.update, this))
            },
            r.prototype.gotoAndStop = function(t) {
                this.stop(),
                this._currentTime = t,
                this._texture = this._textures[this.currentFrame],
                this._textureID = -1
            },
            r.prototype.gotoAndPlay = function(t) {
                this._currentTime = t,
                this.play()
            },
            r.prototype.update = function(t) {
                var e = this.animationSpeed * t;
                if (null !== this._durations) {
                    var i = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (i += e / 60 * 1e3; 0 > i;)
                        this._currentTime--,
                        i += this._durations[this.currentFrame];
                    var r = Math.sign(this.animationSpeed * t);
                    for (this._currentTime = Math.floor(this._currentTime); i >= this._durations[this.currentFrame];)
                        i -= this._durations[this.currentFrame] * r,
                        this._currentTime += r;
                    this._currentTime += i / this._durations[this.currentFrame]
                } else
                    this._currentTime += e;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : (this._texture = this._textures[this.currentFrame], this._textureID = -1)
            },
            r.prototype.destroy = function() {
                this.stop(),
                n.Sprite.prototype.destroy.call(this)
            },
            r.fromFrames = function(t) {
                for (var e = [], i = 0; i < t.length; ++i)
                    e.push(n.Texture.fromFrame(t[i]));
                return new r(e)
            },
            r.fromImages = function(t) {
                for (var e = [], i = 0; i < t.length; ++i)
                    e.push(n.Texture.fromImage(t[i]));
                return new r(e)
            }
        }, {
            "../core": 97
        }],
        160: [function(t, e, i) {
            function r(t, e, i) {
                n.Sprite.call(this, t),
                this.tileScale = new n.Point(1, 1),
                this.tilePosition = new n.Point(0, 0),
                this._width = e || 100,
                this._height = i || 100,
                this._uvs = new n.TextureUvs,
                this._canvasPattern = null,
                this._glDatas = []
            }
            var n = t("../core"),
                s = new n.Point,
                o = t("../core/textures/Texture"),
                a = t("../core/sprites/canvas/CanvasTinter"),
                h = t("./webgl/TilingShader"),
                l = new Float32Array(4);
            r.prototype = Object.create(n.Sprite.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return this._width
                    },
                    set: function(t) {
                        this._width = t
                    }
                },
                height: {
                    get: function() {
                        return this._height
                    },
                    set: function(t) {
                        this._height = t
                    }
                }
            }),
            r.prototype._onTextureUpdate = function() {},
            r.prototype._renderWebGL = function(t) {
                var e = this._texture;
                if (e && e._uvs) {
                    t.flush();
                    var i = t.gl,
                        r = this._glDatas[t.CONTEXT_UID];
                    r || (r = {
                        shader: new h(i),
                        quad: new n.Quad(i)
                    }, this._glDatas[t.CONTEXT_UID] = r, r.quad.initVao(r.shader));
                    var s = r.quad.vertices;
                    s[0] = s[6] = this._width * -this.anchor.x,
                    s[1] = s[3] = this._height * -this.anchor.y,
                    s[2] = s[4] = this._width * (1 - this.anchor.x),
                    s[5] = s[7] = this._height * (1 - this.anchor.y),
                    r.quad.upload(),
                    t.bindShader(r.shader);
                    var o = e._uvs,
                        a = e._frame.width,
                        c = e._frame.height,
                        u = e.baseTexture.width,
                        d = e.baseTexture.height,
                        p = r.shader.uniforms.uPixelSize;
                    p[0] = 1 / u,
                    p[1] = 1 / d,
                    r.shader.uniforms.uPixelSize = p;
                    var f = r.shader.uniforms.uFrame;
                    f[0] = o.x0,
                    f[1] = o.y0,
                    f[2] = o.x1 - o.x0,
                    f[3] = o.y2 - o.y0,
                    r.shader.uniforms.uFrame = f;
                    var _ = r.shader.uniforms.uTransform;
                    _[0] = this.tilePosition.x % (a * this.tileScale.x) / this._width,
                    _[1] = this.tilePosition.y % (c * this.tileScale.y) / this._height,
                    _[2] = u / this._width * this.tileScale.x,
                    _[3] = d / this._height * this.tileScale.y,
                    r.shader.uniforms.uTransform = _,
                    r.shader.uniforms.translationMatrix = this.worldTransform.toArray(!0);
                    var g = l;
                    n.utils.hex2rgb(this.tint, g),
                    g[3] = this.worldAlpha,
                    r.shader.uniforms.uColor = g,
                    t.bindTexture(this._texture, 0),
                    t.state.setBlendMode(this.blendMode),
                    r.quad.draw()
                }
            },
            r.prototype._renderCanvas = function(t) {
                var e = this._texture;
                if (e.baseTexture.hasLoaded) {
                    var i = t.context,
                        r = this.worldTransform,
                        s = t.resolution,
                        o = e.baseTexture,
                        h = this.tilePosition.x / this.tileScale.x % e._frame.width,
                        l = this.tilePosition.y / this.tileScale.y % e._frame.height;
                    if (!this._canvasPattern) {
                        var c = new n.CanvasRenderTarget(e._frame.width, e._frame.height);
                        16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = a.getTintedTexture(this, this.tint)), c.context.drawImage(this.tintedTexture, 0, 0)) : c.context.drawImage(o.source, -e._frame.x, -e._frame.y),
                        this._canvasPattern = c.context.createPattern(c.canvas, "repeat")
                    }
                    i.globalAlpha = this.worldAlpha,
                    i.setTransform(r.a * s, r.b * s, r.c * s, r.d * s, r.tx * s, r.ty * s),
                    i.scale(this.tileScale.x, this.tileScale.y),
                    i.translate(h + this.anchor.x * -this._width, l + this.anchor.y * -this._height);
                    var u = t.blendModes[this.blendMode];
                    u !== t.context.globalCompositeOperation && (i.globalCompositeOperation = u),
                    i.fillStyle = this._canvasPattern,
                    i.fillRect(-h, -l, this._width / this.tileScale.x, this._height / this.tileScale.y)
                }
            },
            r.prototype.getBounds = function() {
                var t,
                    e,
                    i,
                    r,
                    n = this._width,
                    s = this._height,
                    o = n * (1 - this.anchor.x),
                    a = n * -this.anchor.x,
                    h = s * (1 - this.anchor.y),
                    l = s * -this.anchor.y,
                    c = this.worldTransform,
                    u = c.a,
                    d = c.b,
                    p = c.c,
                    f = c.d,
                    _ = c.tx,
                    g = c.ty,
                    m = u * a + p * l + _,
                    v = f * l + d * a + g,
                    y = u * o + p * l + _,
                    x = f * l + d * o + g,
                    b = u * o + p * h + _,
                    T = f * h + d * o + g,
                    w = u * a + p * h + _,
                    S = f * h + d * a + g;
                t = m,
                t = t > y ? y : t,
                t = t > b ? b : t,
                t = t > w ? w : t,
                i = v,
                i = i > x ? x : i,
                i = i > T ? T : i,
                i = i > S ? S : i,
                e = m,
                e = y > e ? y : e,
                e = b > e ? b : e,
                e = w > e ? w : e,
                r = v,
                r = x > r ? x : r,
                r = T > r ? T : r,
                r = S > r ? S : r;
                var E = this._bounds;
                return E.x = t, E.width = e - t, E.y = i, E.height = r - i, this._currentBounds = E, E
            },
            r.prototype.containsPoint = function(t) {
                this.worldTransform.applyInverse(t, s);
                var e,
                    i = this._width,
                    r = this._height,
                    n = -i * this.anchor.x;
                return s.x > n && s.x < n + i && (e = -r * this.anchor.y, s.y > e && s.y < e + r)
            },
            r.prototype.destroy = function() {
                n.Sprite.prototype.destroy.call(this),
                this.tileScale = null,
                this._tileScaleOffset = null,
                this.tilePosition = null,
                this._uvs = null
            },
            r.from = function(t, e, i) {
                return new r(o.from(t), e, i)
            },
            r.fromFrame = function(t, e, i) {
                var s = n.utils.TextureCache[t];
                if (!s)
                    throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                return new r(s, e, i)
            },
            r.fromImage = function(t, e, i, s, o) {
                return new r(n.Texture.fromImage(t, s, o), e, i)
            }
        }, {
            "../core": 97,
            "../core/sprites/canvas/CanvasTinter": 135,
            "../core/textures/Texture": 144,
            "./webgl/TilingShader": 165
        }],
        161: [function(t, e, i) {
            var r = t("../core"),
                n = r.DisplayObject,
                s = new r.Matrix;
            n.prototype._cacheAsBitmap = !1,
            n.prototype._cacheData = !1;
            var o = function() {
                this.originalRenderWebGL = null,
                this.originalRenderCanvas = null,
                this.originalUpdateTransform = null,
                this.originalHitTest = null,
                this.originalDestroy = null,
                this.originalMask = null,
                this.originalFilterArea = null,
                this.sprite = null
            };
            Object.defineProperties(n.prototype, {
                cacheAsBitmap: {
                    get: function() {
                        return this._cacheAsBitmap
                    },
                    set: function(t) {
                        if (this._cacheAsBitmap !== t) {
                            this._cacheAsBitmap = t;
                            var e;
                            t ? (this._cacheData || (this._cacheData = new o), e = this._cacheData, e.originalRenderWebGL = this.renderWebGL, e.originalRenderCanvas = this.renderCanvas, e.originalUpdateTransform = this.updateTransform, e.originalGetBounds = this.getBounds, e.originalDestroy = this.destroy, e.originalContainsPoint = this.containsPoint, e.originalMask = this._mask, e.originalFilterArea = this.filterArea, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (e = this._cacheData, e.sprite && this._destroyCachedDisplayObject(), this.renderWebGL = e.originalRenderWebGL, this.renderCanvas = e.originalRenderCanvas, this.getBounds = e.originalGetBounds, this.destroy = e.originalDestroy, this.updateTransform = e.originalUpdateTransform, this.containsPoint = e.originalContainsPoint, this._mask = e.originalMask, this.filterArea = e.originalFilterArea)
                        }
                    }
                }
            }),
            n.prototype._renderCachedWebGL = function(t) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cacheData.sprite._transformID = -1, this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite._renderWebGL(t))
            },
            n.prototype._initCachedDisplayObject = function(t) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    t.currentRenderer.flush();
                    var e = this.getLocalBounds().clone();
                    if (this._filters) {
                        var i = this._filters[0].padding;
                        e.x -= i,
                        e.y -= i,
                        e.width += 2 * i,
                        e.height += 2 * i
                    }
                    var n = t._activeRenderTarget,
                        o = t.filterManager.filterStack,
                        a = r.RenderTexture.create(0 | e.width, 0 | e.height),
                        h = s;
                    h.tx = -e.x,
                    h.ty = -e.y,
                    this.transform.worldTransform.identity(),
                    this.renderWebGL = this._cacheData.originalRenderWebGL,
                    t.render(this, a, !0, h, !0),
                    t.bindRenderTarget(n),
                    t.filterManager.filterStack = o,
                    this.renderWebGL = this._renderCachedWebGL,
                    this.updateTransform = this.displayObjectUpdateTransform,
                    this.getBounds = this._getCachedBounds,
                    this._mask = null,
                    this.filterArea = null;
                    var l = new r.Sprite(a);
                    l.transform.worldTransform = this.transform.worldTransform,
                    l.anchor.x = -e.x / e.width,
                    l.anchor.y = -e.y / e.height,
                    this._cacheData.sprite = l,
                    this.transform._parentID = -1,
                    this.updateTransform(),
                    this.containsPoint = l.containsPoint.bind(l)
                }
            },
            n.prototype._renderCachedCanvas = function(t) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cacheData.sprite.worldAlpha = this.worldAlpha, this._cacheData.sprite.renderCanvas(t))
            },
            n.prototype._initCachedDisplayObjectCanvas = function(t) {
                if (!this._cacheData || !this._cacheData.sprite) {
                    var e = this.getLocalBounds(),
                        i = t.context,
                        n = new r.RenderTexture.create(0 | e.width, 0 | e.height),
                        o = s;
                    this.transform.worldTransform.copy(o),
                    o.invert(),
                    o.tx -= e.x,
                    o.ty -= e.y,
                    this.renderCanvas = this._cacheData.originalRenderCanvas,
                    t.render(this, n, !0, o, !1),
                    t.context = i,
                    this.renderCanvas = this._renderCachedCanvas,
                    this.updateTransform = this.displayObjectUpdateTransform,
                    this.getBounds = this._getCachedBounds,
                    this._mask = null,
                    this.filterArea = null;
                    var a = new r.Sprite(n);
                    a.transform.worldTransform = this.transform.worldTransform,
                    a.anchor.x = -e.x / e.width,
                    a.anchor.y = -e.y / e.height,
                    this.updateTransform(),
                    this._cacheData.sprite = a,
                    this.containsPoint = a.containsPoint.bind(a)
                }
            },
            n.prototype._getCachedBounds = function() {
                return this._cacheData.sprite._currentBounds = null, this._cacheData.sprite.getBounds()
            },
            n.prototype._destroyCachedDisplayObject = function() {
                this._cacheData.sprite._texture.destroy(!0),
                this._cacheData.sprite = null
            },
            n.prototype._cacheAsBitmapDestroy = function() {
                this.cacheAsBitmap = !1,
                this.destroy()
            }
        }, {
            "../core": 97
        }],
        162: [function(t, e, i) {
            var r = t("../core");
            r.DisplayObject.prototype.name = null,
            r.Container.prototype.getChildByName = function(t) {
                for (var e = 0; e < this.children.length; e++)
                    if (this.children[e].name === t)
                        return this.children[e];
                return null
            }
        }, {
            "../core": 97
        }],
        163: [function(t, e, i) {
            var r = t("../core");
            r.DisplayObject.prototype.getGlobalPosition = function(t) {
                return t = t || new r.Point, this.parent ? (this.displayObjectUpdateTransform(), t.x = this.worldTransform.tx, t.y = this.worldTransform.ty) : (t.x = this.position.x, t.y = this.position.y), t
            }
        }, {
            "../core": 97
        }],
        164: [function(t, e, i) {
            t("./cacheAsBitmap"),
            t("./getChildByName"),
            t("./getGlobalPosition"),
            e.exports = {
                MovieClip: t("./MovieClip"),
                TilingSprite: t("./TilingSprite"),
                BitmapText: t("./BitmapText")
            }
        }, {
            "./BitmapText": 158,
            "./MovieClip": 159,
            "./TilingSprite": 160,
            "./cacheAsBitmap": 161,
            "./getChildByName": 162,
            "./getGlobalPosition": 163
        }],
        165: [function(t, e, i) {
            function r(t) {
                n.call(this, t, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\n\nuniform vec4 uFrame;\nuniform vec4 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vec2 coord = aTextureCoord;\n    coord -= uTransform.xy;\n    coord /= uTransform.zw;\n    vTextureCoord = coord;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform vec4 uFrame;\nuniform vec2 uPixelSize;\n\nvoid main(void)\n{\n\n   \tvec2 coord = mod(vTextureCoord, uFrame.zw);\n   \tcoord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);\n   \tcoord += uFrame.xy;\n\n   \tvec4 sample = texture2D(uSampler, coord);\n  \tvec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n   \tgl_FragColor = sample * color ;\n}\n")
            }
            var n = t("../../core/Shader");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../core/Shader": 77
        }],
        166: [function(t, e, i) {
            function r(t, e, i) {
                n.Filter.call(this),
                this.blurXFilter = new s,
                this.blurYFilter = new o,
                this.resolution = 1,
                this.padding = 0,
                this.resolution = i || 1,
                this.quality = e || 4,
                this.blur = t || 8
            }
            var n = t("../../core"),
                s = t("./BlurXFilter"),
                o = t("./BlurYFilter");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.apply = function(t, e, i) {
                var r = t.getRenderTarget(!0);
                this.blurXFilter.apply(t, e, r, !0),
                this.blurYFilter.apply(t, r, i, !1),
                t.returnRenderTarget(r)
            },
            Object.defineProperties(r.prototype, {
                blur: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(t) {
                        this.blurXFilter.blur = this.blurYFilter.blur = t,
                        this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                },
                quality: {
                    get: function() {
                        return this.blurXFilter.quality
                    },
                    set: function(t) {
                        this.blurXFilter.quality = this.blurYFilter.quality = t
                    }
                },
                blurX: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(t) {
                        this.blurXFilter.blur = t,
                        this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                },
                blurY: {
                    get: function() {
                        return this.blurYFilter.blur
                    },
                    set: function(t) {
                        this.blurYFilter.blur = t,
                        this.padding = 2 * Math.max(Math.abs(this.blurYFilter.strength), Math.abs(this.blurYFilter.strength))
                    }
                }
            })
        }, {
            "../../core": 97,
            "./BlurXFilter": 167,
            "./BlurYFilter": 168
        }],
        167: [function(t, e, i) {
            function r(t, e, i) {
                var r = s(5, !0),
                    a = o(5);
                n.Filter.call(this, r, a),
                this.resolution = i || 1,
                this._quality = 0,
                this.quality = e || 4,
                this.strength = t || 8,
                this.firstRun = !0
            }
            var n = t("../../core"),
                s = t("./generateBlurVertSource"),
                o = t("./generateBlurFragSource"),
                a = t("./getMaxBlurKernelSize");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.apply = function(t, e, i, r) {
                if (this.firstRun) {
                    var n = t.renderer.gl,
                        h = a(n);
                    this.vertexSrc = s(h, !0),
                    this.fragmentSrc = o(h),
                    this.firstRun = !1
                }
                if (this.uniforms.strength = 1 / i.size.width * (i.size.width / e.size.width), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes)
                    t.applyFilter(this, e, i, r);
                else {
                    for (var l = t.getRenderTarget(!0), c = e, u = l, d = 0; d < this.passes - 1; d++) {
                        t.applyFilter(this, c, u, !0);
                        var p = u;
                        u = c,
                        c = p
                    }
                    t.applyFilter(this, c, i, r),
                    t.returnRenderTarget(l)
                }
            },
            Object.defineProperties(r.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(t) {
                        this.padding = 2 * Math.abs(t),
                        this.strength = t
                    }
                },
                quality: {
                    get: function() {
                        return this._quality
                    },
                    set: function(t) {
                        this._quality = t,
                        this.passes = t
                    }
                }
            })
        }, {
            "../../core": 97,
            "./generateBlurFragSource": 169,
            "./generateBlurVertSource": 170,
            "./getMaxBlurKernelSize": 171
        }],
        168: [function(t, e, i) {
            function r(t, e, i) {
                var r = s(5, !1),
                    a = o(5);
                n.Filter.call(this, r, a),
                this.resolution = i || 1,
                this._quality = 0,
                this.quality = e || 4,
                this.strength = t || 8,
                this.firstRun = !0
            }
            var n = t("../../core"),
                s = t("./generateBlurVertSource"),
                o = t("./generateBlurFragSource"),
                a = t("./getMaxBlurKernelSize");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.apply = function(t, e, i, r) {
                if (this.firstRun) {
                    var n = t.renderer.gl,
                        h = a(n);
                    this.vertexSrc = s(h, !1),
                    this.fragmentSrc = o(h),
                    this.firstRun = !1
                }
                if (this.uniforms.strength = 1 / i.size.height * (i.size.height / e.size.height), this.uniforms.strength *= this.strength, this.uniforms.strength /= this.passes, 1 === this.passes)
                    t.applyFilter(this, e, i, r);
                else {
                    for (var l = t.getRenderTarget(!0), c = e, u = l, d = 0; d < this.passes - 1; d++) {
                        t.applyFilter(this, c, u, !0);
                        var p = u;
                        u = c,
                        c = p
                    }
                    t.applyFilter(this, c, i, r),
                    t.returnRenderTarget(l)
                }
            },
            Object.defineProperties(r.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(t) {
                        this.padding = 2 * Math.abs(t),
                        this.strength = t
                    }
                },
                quality: {
                    get: function() {
                        return this._quality
                    },
                    set: function(t) {
                        this._quality = t,
                        this.passes = t
                    }
                }
            })
        }, {
            "../../core": 97,
            "./generateBlurFragSource": 169,
            "./generateBlurVertSource": 170,
            "./getMaxBlurKernelSize": 171
        }],
        169: [function(t, e, i) {
            var r = {
                    5: [.153388, .221461, .250301],
                    7: [.071303, .131514, .189879, .214607],
                    9: [.028532, .067234, .124009, .179044, .20236],
                    11: [.0093, .028002, .065984, .121703, .175713, .198596],
                    13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
                    15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
                },
                n = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "\tgl_FragColor = vec4(0.0);", "\t%blur%", "}"].join("\n"),
                s = function(t) {
                    for (var e, i = r[t], s = i.length, o = n, a = "", h = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", l = 0; t > l; l++) {
                        var c = h.replace("%index%", l);
                        e = l,
                        l >= s && (e = t - l - 1),
                        c = c.replace("%value%", i[e]),
                        a += c,
                        a += "\n"
                    }
                    return o = o.replace("%blur%", a), o = o.replace("%size%", t)
                };
            e.exports = s
        }, {}],
        170: [function(t, e, i) {
            var r = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n"),
                n = function(t, e) {
                    var i,
                        n,
                        s = Math.ceil(t / 2),
                        o = r,
                        a = "";
                    i = e ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
                    for (var h = 0; t > h; h++) {
                        var l = i.replace("%index%", h);
                        n = h,
                        h >= s && (n = t - h - 1),
                        l = l.replace("%sampleIndex%", h - (s - 1) + ".0"),
                        a += l,
                        a += "\n"
                    }
                    return o = o.replace("%blur%", a), o = o.replace("%size%", t)
                };
            e.exports = n
        }, {}],
        171: [function(t, e, i) {
            var r = function(t) {
                for (var e = t.getParameter(t.MAX_VARYING_VECTORS), i = 15; i > e;)
                    i -= 2;
                return i
            };
            e.exports = r
        }, {}],
        172: [function(t, e, i) {
            function r() {
                n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n//    gl_FragColor = vec4(m[0]);\n}\n"),
                this.uniforms.m = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
            }
            var n = t("../../core");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype._loadMatrix = function(t, e) {
                e = !!e;
                var i = t;
                e && (this._multiply(i, this.uniforms.m, t), i = this._colorMatrix(i)),
                this.uniforms.m = i
            },
            r.prototype._multiply = function(t, e, i) {
                return t[0] = e[0] * i[0] + e[1] * i[5] + e[2] * i[10] + e[3] * i[15], t[1] = e[0] * i[1] + e[1] * i[6] + e[2] * i[11] + e[3] * i[16], t[2] = e[0] * i[2] + e[1] * i[7] + e[2] * i[12] + e[3] * i[17], t[3] = e[0] * i[3] + e[1] * i[8] + e[2] * i[13] + e[3] * i[18], t[4] = e[0] * i[4] + e[1] * i[9] + e[2] * i[14] + e[3] * i[19], t[5] = e[5] * i[0] + e[6] * i[5] + e[7] * i[10] + e[8] * i[15], t[6] = e[5] * i[1] + e[6] * i[6] + e[7] * i[11] + e[8] * i[16], t[7] = e[5] * i[2] + e[6] * i[7] + e[7] * i[12] + e[8] * i[17], t[8] = e[5] * i[3] + e[6] * i[8] + e[7] * i[13] + e[8] * i[18], t[9] = e[5] * i[4] + e[6] * i[9] + e[7] * i[14] + e[8] * i[19], t[10] = e[10] * i[0] + e[11] * i[5] + e[12] * i[10] + e[13] * i[15], t[11] = e[10] * i[1] + e[11] * i[6] + e[12] * i[11] + e[13] * i[16], t[12] = e[10] * i[2] + e[11] * i[7] + e[12] * i[12] + e[13] * i[17], t[13] = e[10] * i[3] + e[11] * i[8] + e[12] * i[13] + e[13] * i[18], t[14] = e[10] * i[4] + e[11] * i[9] + e[12] * i[14] + e[13] * i[19], t[15] = e[15] * i[0] + e[16] * i[5] + e[17] * i[10] + e[18] * i[15], t[16] = e[15] * i[1] + e[16] * i[6] + e[17] * i[11] + e[18] * i[16], t[17] = e[15] * i[2] + e[16] * i[7] + e[17] * i[12] + e[18] * i[17], t[18] = e[15] * i[3] + e[16] * i[8] + e[17] * i[13] + e[18] * i[18], t[19] = e[15] * i[4] + e[16] * i[9] + e[17] * i[14] + e[18] * i[19], t
            },
            r.prototype._colorMatrix = function(t) {
                var e = new Float32Array(t);
                return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e
            },
            r.prototype.brightness = function(t, e) {
                var i = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            },
            r.prototype.greyscale = function(t, e) {
                var i = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            },
            r.prototype.grayscale = r.prototype.greyscale,
            r.prototype.blackAndWhite = function(t) {
                var e = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.hue = function(t, e) {
                t = (t || 0) / 180 * Math.PI;
                var i = Math.cos(t),
                    r = Math.sin(t),
                    n = Math.sqrt,
                    s = 1 / 3,
                    o = n(s),
                    a = i + (1 - i) * s,
                    h = s * (1 - i) - o * r,
                    l = s * (1 - i) + o * r,
                    c = s * (1 - i) + o * r,
                    u = i + s * (1 - i),
                    d = s * (1 - i) - o * r,
                    p = s * (1 - i) - o * r,
                    f = s * (1 - i) + o * r,
                    _ = i + s * (1 - i),
                    g = [a, h, l, 0, 0, c, u, d, 0, 0, p, f, _, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(g, e)
            },
            r.prototype.contrast = function(t, e) {
                var i = (t || 0) + 1,
                    r = -128 * (i - 1),
                    n = [i, 0, 0, 0, r, 0, i, 0, 0, r, 0, 0, i, 0, r, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            },
            r.prototype.saturate = function(t, e) {
                var i = 2 * (t || 0) / 3 + 1,
                    r = -.5 * (i - 1),
                    n = [i, r, r, 0, 0, r, i, r, 0, 0, r, r, i, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            },
            r.prototype.desaturate = function() {
                this.saturate(-1)
            },
            r.prototype.negative = function(t) {
                var e = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.sepia = function(t) {
                var e = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.technicolor = function(t) {
                var e = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.polaroid = function(t) {
                var e = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.toBGR = function(t) {
                var e = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.kodachrome = function(t) {
                var e = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.browni = function(t) {
                var e = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.vintage = function(t) {
                var e = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.colorTone = function(t, e, i, r, n) {
                t = t || .2,
                e = e || .15,
                i = i || 16770432,
                r = r || 3375104;
                var s = (i >> 16 & 255) / 255,
                    o = (i >> 8 & 255) / 255,
                    a = (255 & i) / 255,
                    h = (r >> 16 & 255) / 255,
                    l = (r >> 8 & 255) / 255,
                    c = (255 & r) / 255,
                    u = [.3, .59, .11, 0, 0, s, o, a, t, 0, h, l, c, e, 0, s - h, o - l, a - c, 0, 0];
                this._loadMatrix(u, n)
            },
            r.prototype.night = function(t, e) {
                t = t || .1;
                var i = [-2 * t, -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            },
            r.prototype.predator = function(t, e) {
                var i = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0];
                this._loadMatrix(i, e)
            },
            r.prototype.lsd = function(t) {
                var e = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            },
            r.prototype.reset = function() {
                var t = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(t, !1)
            },
            Object.defineProperties(r.prototype, {
                matrix: {
                    get: function() {
                        return this.uniforms.m
                    },
                    set: function(t) {
                        this.uniforms.m = t
                    }
                }
            })
        }, {
            "../../core": 97
        }],
        173: [function(t, e, i) {
            function r(t, e) {
                var i = new n.Matrix;
                t.renderable = !1,
                n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"),
                this.maskSprite = t,
                this.maskMatrix = i,
                this.uniforms.mapSampler = t.texture,
                this.uniforms.filterMatrix = i.toArray(!0),
                this.uniforms.scale = {
                    x: 1,
                    y: 1
                },
                null !== e && void 0 !== e || (e = 20),
                this.scale = new n.Point(e, e)
            }
            var n = t("../../core");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.apply = function(t, e, i) {
                var r = 1 / i.destinationFrame.width * (i.size.width / e.size.width);
                this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite),
                this.uniforms.scale.x = this.scale.x * r,
                this.uniforms.scale.y = this.scale.y * r,
                t.applyFilter(this, e, i)
            },
            Object.defineProperties(r.prototype, {
                map: {
                    get: function() {
                        return this.uniforms.mapSampler
                    },
                    set: function(t) {
                        this.uniforms.mapSampler = t
                    }
                }
            })
        }, {
            "../../core": 97
        }],
        174: [function(t, e, i) {
            function r() {
                n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n  \tvec2 fragCoord = vTextureCoord * filterArea.xy;\n\n  \tvec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n  \tgl_FragColor = color;\n}\n')
            }
            var n = t("../../core");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../core": 97
        }],
        175: [function(t, e, i) {
            e.exports = {
                FXAAFilter: t("./fxaa/FXAAFilter"),
                NoiseFilter: t("./noise/NoiseFilter"),
                DisplacementFilter: t("./displacement/DisplacementFilter"),
                BlurFilter: t("./blur/BlurFilter"),
                BlurXFilter: t("./blur/BlurXFilter"),
                BlurYFilter: t("./blur/BlurYFilter"),
                ColorMatrixFilter: t("./colormatrix/ColorMatrixFilter"),
                VoidFilter: t("./void/VoidFilter")
            }
        }, {
            "./blur/BlurFilter": 166,
            "./blur/BlurXFilter": 167,
            "./blur/BlurYFilter": 168,
            "./colormatrix/ColorMatrixFilter": 172,
            "./displacement/DisplacementFilter": 173,
            "./fxaa/FXAAFilter": 174,
            "./noise/NoiseFilter": 176,
            "./void/VoidFilter": 177
        }],
        176: [function(t, e, i) {
            function r() {
                n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"),
                this.noise = .5
            }
            var n = t("../../core");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                noise: {
                    get: function() {
                        return this.uniforms.noise
                    },
                    set: function(t) {
                        this.uniforms.noise = t
                    }
                }
            })
        }, {
            "../../core": 97
        }],
        177: [function(t, e, i) {
            function r() {
                n.Filter.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"),
                this.glShaderKey = "void"
            }
            var n = t("../../core");
            r.prototype = Object.create(n.Filter.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../core": 97
        }],
        178: [function(t, e, i) {
            function r() {
                this.global = new n.Point,
                this.target = null,
                this.originalEvent = null
            }
            var n = t("../core");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.getLocalPosition = function(t, e, i) {
                return t.worldTransform.applyInverse(i || this.global, e)
            }
        }, {
            "../core": 97
        }],
        179: [function(t, e, i) {
            function r(t, e) {
                o.call(this),
                e = e || {},
                this.renderer = t,
                this.autoPreventDefault = void 0 === e.autoPreventDefault || e.autoPreventDefault,
                this.interactionFrequency = e.interactionFrequency || 10,
                this.mouse = new s,
                this.mouse.global.set(-999999),
                this.eventData = {
                    stopped: !1,
                    target: null,
                    type: null,
                    data: this.mouse,
                    stopPropagation: function() {
                        this.stopped = !0
                    }
                },
                this.interactiveDataPool = [],
                this.interactionDOMElement = null,
                this.moveWhenInside = !1,
                this.eventsAdded = !1,
                this.onMouseUp = this.onMouseUp.bind(this),
                this.processMouseUp = this.processMouseUp.bind(this),
                this.onMouseDown = this.onMouseDown.bind(this),
                this.processMouseDown = this.processMouseDown.bind(this),
                this.onMouseMove = this.onMouseMove.bind(this),
                this.processMouseMove = this.processMouseMove.bind(this),
                this.onMouseOut = this.onMouseOut.bind(this),
                this.processMouseOverOut = this.processMouseOverOut.bind(this),
                this.onMouseOver = this.onMouseOver.bind(this),
                this.onTouchStart = this.onTouchStart.bind(this),
                this.processTouchStart = this.processTouchStart.bind(this),
                this.onTouchEnd = this.onTouchEnd.bind(this),
                this.processTouchEnd = this.processTouchEnd.bind(this),
                this.onTouchMove = this.onTouchMove.bind(this),
                this.processTouchMove = this.processTouchMove.bind(this),
                this.defaultCursorStyle = "inherit",
                this.currentCursorStyle = "inherit",
                this._tempPoint = new n.Point,
                this.resolution = 1,
                this.setTargetElement(this.renderer.view, this.renderer.resolution)
            }
            var n = t("../core"),
                s = t("./InteractionData"),
                o = t("eventemitter3");
            Object.assign(n.DisplayObject.prototype, t("./interactiveTarget")),
            r.prototype = Object.create(o.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.setTargetElement = function(t, e) {
                this.removeEvents(),
                this.interactionDOMElement = t,
                this.resolution = e || 1,
                this.addEvents()
            },
            r.prototype.addEvents = function() {
                this.interactionDOMElement && (n.ticker.shared.add(this.update, this), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "none",
                this.interactionDOMElement.style["-ms-touch-action"] = "none"), window.document.addEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.addEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !0)
            },
            r.prototype.removeEvents = function() {
                this.interactionDOMElement && (n.ticker.shared.remove(this.update), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = ""), window.document.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("mouseover", this.onMouseOver, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !1)
            },
            r.prototype.update = function(t) {
                if (this._deltaTime += t, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this.interactionDOMElement)) {
                    if (this.didMove)
                        return void (this.didMove = !1);
                    this.cursor = this.defaultCursorStyle,
                    this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !0),
                    this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor)
                }
            },
            r.prototype.dispatchEvent = function(t, e, i) {
                i.stopped || (i.target = t, i.type = e, t.emit(e, i), t[e] && t[e](i))
            },
            r.prototype.mapPositionToPoint = function(t, e, i) {
                var r;
                r = this.interactionDOMElement.parentElement ? this.interactionDOMElement.getBoundingClientRect() : {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                t.x = (e - r.left) * (this.interactionDOMElement.width / r.width) / this.resolution,
                t.y = (i - r.top) * (this.interactionDOMElement.height / r.height) / this.resolution
            },
            r.prototype.processInteractive = function(t, e, i, r, n) {
                if (!e || !e.visible)
                    return !1;
                var s = !1,
                    o = n = e.interactive || n;
                if (e.hitArea && (o = !1), r && e._mask && (e._mask.containsPoint(t) || (r = !1)), r && e.filterArea && (e.filterArea.contains(t.x, t.y) || (r = !1)), e.interactiveChildren)
                    for (var a = e.children, h = a.length - 1; h >= 0; h--) {
                        var l = a[h];
                        if (this.processInteractive(t, l, i, r, o)) {
                            if (!l.parent)
                                continue;
                            s = !0,
                            o = !1,
                            r = !1
                        }
                    }
                return n && (r && !s && (e.hitArea ? (e.worldTransform.applyInverse(t, this._tempPoint), s = e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) : e.containsPoint && (s = e.containsPoint(t))), e.interactive && i(e, s)), s
            },
            r.prototype.onMouseDown = function(t) {
                this.mouse.originalEvent = t,
                this.eventData.data = this.mouse,
                this.eventData.stopped = !1,
                this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                this.autoPreventDefault && this.mouse.originalEvent.preventDefault(),
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, !0);
                var e = 2 === t.button || 3 === t.which;
                this.emit(e ? "rightdown" : "mousedown", this.eventData)
            },
            r.prototype.processMouseDown = function(t, e) {
                var i = this.mouse.originalEvent,
                    r = 2 === i.button || 3 === i.which;
                e && (t[r ? "_isRightDown" : "_isLeftDown"] = !0, this.dispatchEvent(t, r ? "rightdown" : "mousedown", this.eventData))
            },
            r.prototype.onMouseUp = function(t) {
                this.mouse.originalEvent = t,
                this.eventData.data = this.mouse,
                this.eventData.stopped = !1,
                this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, !0);
                var e = 2 === t.button || 3 === t.which;
                this.emit(e ? "rightup" : "mouseup", this.eventData)
            },
            r.prototype.processMouseUp = function(t, e) {
                var i = this.mouse.originalEvent,
                    r = 2 === i.button || 3 === i.which,
                    n = r ? "_isRightDown" : "_isLeftDown";
                e ? (this.dispatchEvent(t, r ? "rightup" : "mouseup", this.eventData), t[n] && (t[n] = !1, this.dispatchEvent(t, r ? "rightclick" : "click", this.eventData))) : t[n] && (t[n] = !1, this.dispatchEvent(t, r ? "rightupoutside" : "mouseupoutside", this.eventData))
            },
            r.prototype.onMouseMove = function(t) {
                this.mouse.originalEvent = t,
                this.eventData.data = this.mouse,
                this.eventData.stopped = !1,
                this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                this.didMove = !0,
                this.cursor = this.defaultCursorStyle,
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, !0),
                this.emit("mousemove", this.eventData),
                this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor)
            },
            r.prototype.processMouseMove = function(t, e) {
                this.processMouseOverOut(t, e),
                this.moveWhenInside && !e || this.dispatchEvent(t, "mousemove", this.eventData)
            },
            r.prototype.onMouseOut = function(t) {
                this.mouse.originalEvent = t,
                this.eventData.data = this.mouse,
                this.eventData.stopped = !1,
                this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                this.interactionDOMElement.style.cursor = this.defaultCursorStyle,
                this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY),
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !1),
                this.emit("mouseout", this.eventData)
            },
            r.prototype.processMouseOverOut = function(t, e) {
                e ? (t._over || (t._over = !0, this.dispatchEvent(t, "mouseover", this.eventData)), t.buttonMode && (this.cursor = t.defaultCursor)) : t._over && (t._over = !1, this.dispatchEvent(t, "mouseout", this.eventData))
            },
            r.prototype.onMouseOver = function(t) {
                this.mouse.originalEvent = t,
                this.eventData.data = this.mouse,
                this.eventData.stopped = !1,
                this.emit("mouseover", this.eventData)
            },
            r.prototype.onTouchStart = function(t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, i = e.length, r = 0; i > r; r++) {
                    var n = e[r],
                        s = this.getTouchData(n);
                    s.originalEvent = t,
                    this.eventData.data = s,
                    this.eventData.stopped = !1,
                    this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchStart, !0),
                    this.emit("touchstart", this.eventData),
                    this.returnTouchData(s)
                }
            },
            r.prototype.processTouchStart = function(t, e) {
                e && (t._touchDown = !0, this.dispatchEvent(t, "touchstart", this.eventData))
            },
            r.prototype.onTouchEnd = function(t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, i = e.length, r = 0; i > r; r++) {
                    var n = e[r],
                        s = this.getTouchData(n);
                    s.originalEvent = t,
                    this.eventData.data = s,
                    this.eventData.stopped = !1,
                    this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0),
                    this.emit("touchend", this.eventData),
                    this.returnTouchData(s)
                }
            },
            r.prototype.processTouchEnd = function(t, e) {
                e ? (this.dispatchEvent(t, "touchend", this.eventData), t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "tap", this.eventData))) : t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "touchendoutside", this.eventData))
            },
            r.prototype.onTouchMove = function(t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, i = e.length, r = 0; i > r; r++) {
                    var n = e[r],
                        s = this.getTouchData(n);
                    s.originalEvent = t,
                    this.eventData.data = s,
                    this.eventData.stopped = !1,
                    this.processInteractive(s.global, this.renderer._lastObjectRendered, this.processTouchMove, this.moveWhenInside),
                    this.emit("touchmove", this.eventData),
                    this.returnTouchData(s)
                }
            },
            r.prototype.processTouchMove = function(t, e) {
                this.moveWhenInside && !e || this.dispatchEvent(t, "touchmove", this.eventData)
            },
            r.prototype.getTouchData = function(t) {
                var e = this.interactiveDataPool.pop();
                return e || (e = new s), e.identifier = t.identifier, this.mapPositionToPoint(e.global, t.clientX, t.clientY), navigator.isCocoonJS && (e.global.x = e.global.x / this.resolution, e.global.y = e.global.y / this.resolution), t.globalX = e.global.x, t.globalY = e.global.y, e
            },
            r.prototype.returnTouchData = function(t) {
                this.interactiveDataPool.push(t)
            },
            r.prototype.destroy = function() {
                this.removeEvents(),
                this.removeAllListeners(),
                this.renderer = null,
                this.mouse = null,
                this.eventData = null,
                this.interactiveDataPool = null,
                this.interactionDOMElement = null,
                this.onMouseUp = null,
                this.processMouseUp = null,
                this.onMouseDown = null,
                this.processMouseDown = null,
                this.onMouseMove = null,
                this.processMouseMove = null,
                this.onMouseOut = null,
                this.processMouseOverOut = null,
                this.onMouseOver = null,
                this.onTouchStart = null,
                this.processTouchStart = null,
                this.onTouchEnd = null,
                this.processTouchEnd = null,
                this.onTouchMove = null,
                this.processTouchMove = null,
                this._tempPoint = null
            },
            n.WebGLRenderer.registerPlugin("interaction", r),
            n.CanvasRenderer.registerPlugin("interaction", r)
        }, {
            "../core": 97,
            "./InteractionData": 178,
            "./interactiveTarget": 181,
            eventemitter3: 3
        }],
        180: [function(t, e, i) {
            e.exports = {
                InteractionData: t("./InteractionData"),
                InteractionManager: t("./InteractionManager"),
                interactiveTarget: t("./interactiveTarget")
            }
        }, {
            "./InteractionData": 178,
            "./InteractionManager": 179,
            "./interactiveTarget": 181
        }],
        181: [function(t, e, i) {
            var r = {
                interactive: !1,
                interactiveChildren: !0,
                hitArea: null,
                buttonMode: !1,
                defaultCursor: "pointer",
                _over: !1,
                _isLeftDown: !1,
                _isRightDown: !1,
                _touchDown: !1
            };
            e.exports = r
        }, {}],
        182: [function(t, e, i) {
            function r(t, e) {
                var i = {},
                    r = t.data.getElementsByTagName("info")[0],
                    n = t.data.getElementsByTagName("common")[0];
                i.font = r.getAttribute("face"),
                i.size = parseInt(r.getAttribute("size"), 10),
                i.lineHeight = parseInt(n.getAttribute("lineHeight"), 10),
                i.chars = {};
                for (var a = t.data.getElementsByTagName("char"), h = 0; h < a.length; h++) {
                    var l = parseInt(a[h].getAttribute("id"), 10),
                        c = new s.Rectangle(parseInt(a[h].getAttribute("x"), 10) + e.frame.x, parseInt(a[h].getAttribute("y"), 10) + e.frame.y, parseInt(a[h].getAttribute("width"), 10), parseInt(a[h].getAttribute("height"), 10));
                    i.chars[l] = {
                        xOffset: parseInt(a[h].getAttribute("xoffset"), 10),
                        yOffset: parseInt(a[h].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(a[h].getAttribute("xadvance"), 10),
                        kerning: {},
                        texture: new s.Texture(e.baseTexture, c)
                    }
                }
                var u = t.data.getElementsByTagName("kerning");
                for (h = 0; h < u.length; h++) {
                    var d = parseInt(u[h].getAttribute("first"), 10),
                        p = parseInt(u[h].getAttribute("second"), 10),
                        f = parseInt(u[h].getAttribute("amount"), 10);
                    i.chars[p] && (i.chars[p].kerning[d] = f)
                }
                t.bitmapFont = i,
                o.BitmapText.fonts[i.font] = i
            }
            var n = t("resource-loader").Resource,
                s = t("../core"),
                o = t("../extras"),
                a = t("path");
            e.exports = function() {
                return function(t, e) {
                    if (!t.data || !t.isXml)
                        return e();
                    if (0 === t.data.getElementsByTagName("page").length || 0 === t.data.getElementsByTagName("info").length || null === t.data.getElementsByTagName("info")[0].getAttribute("face"))
                        return e();
                    var i = t.isDataUrl ? "" : a.dirname(t.url);
                    t.isDataUrl && ("." === i && (i = ""), this.baseUrl && i && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (i += "/"), i = i.replace(this.baseUrl, ""))),
                    i && "/" !== i.charAt(i.length - 1) && (i += "/");
                    var o = i + t.data.getElementsByTagName("page")[0].getAttribute("file");
                    if (s.utils.TextureCache[o])
                        r(t, s.utils.TextureCache[o]),
                        e();
                    else {
                        var h = {
                            crossOrigin: t.crossOrigin,
                            loadType: n.LOAD_TYPE.IMAGE,
                            metadata: t.metadata.imageMetadata
                        };
                        this.add(t.name + "_image", o, h, function(i) {
                            r(t, i.texture),
                            e()
                        })
                    }
                }
            }
        }, {
            "../core": 97,
            "../extras": 164,
            path: 22,
            "resource-loader": 71
        }],
        183: [function(t, e, i) {
            e.exports = {
                Loader: t("./loader"),
                bitmapFontParser: t("./bitmapFontParser"),
                spritesheetParser: t("./spritesheetParser"),
                textureParser: t("./textureParser"),
                Resource: t("resource-loader").Resource
            }
        }, {
            "./bitmapFontParser": 182,
            "./loader": 184,
            "./spritesheetParser": 185,
            "./textureParser": 186,
            "resource-loader": 71
        }],
        184: [function(t, e, i) {
            function r(t, e) {
                n.call(this, t, e);
                for (var i = 0; i < r._pixiMiddleware.length; ++i)
                    this.use(r._pixiMiddleware[i]())
            }
            var n = t("resource-loader"),
                s = t("./textureParser"),
                o = t("./spritesheetParser"),
                a = t("./bitmapFontParser");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r._pixiMiddleware = [n.middleware.parsing.blob, s, o, a],
            r.addPixiMiddleware = function(t) {
                r._pixiMiddleware.push(t)
            };
            var h = n.Resource;
            h.setExtensionXhrType("fnt", h.XHR_RESPONSE_TYPE.DOCUMENT)
        }, {
            "./bitmapFontParser": 182,
            "./spritesheetParser": 185,
            "./textureParser": 186,
            "resource-loader": 71
        }],
        185: [function(t, e, i) {
            var r = t("resource-loader").Resource,
                n = t("path"),
                s = t("../core"),
                o = 1e3;
            e.exports = function() {
                return function(t, e) {
                    var i,
                        a = t.name + "_image";
                    if (!t.data || !t.isJson || !t.data.frames || this.resources[a])
                        return e();
                    var h = {
                        crossOrigin: t.crossOrigin,
                        loadType: r.LOAD_TYPE.IMAGE,
                        metadata: t.metadata.imageMetadata
                    };
                    i = t.isDataUrl ? t.data.meta.image : n.dirname(t.url.replace(this.baseUrl, "")) + "/" + t.data.meta.image,
                    this.add(a, i, h, function(i) {
                        function r(e, r) {
                            for (var n = e; r > n - e && n < c.length;) {
                                var o = c[n],
                                    a = l[o].frame;
                                if (a) {
                                    var h = null,
                                        d = null,
                                        p = new s.Rectangle(0, 0, l[o].sourceSize.w / u, l[o].sourceSize.h / u);
                                    h = l[o].rotated ? new s.Rectangle(a.x / u, a.y / u, a.h / u, a.w / u) : new s.Rectangle(a.x / u, a.y / u, a.w / u, a.h / u),
                                    l[o].trimmed && (d = new s.Rectangle(l[o].spriteSourceSize.x / u, l[o].spriteSourceSize.y / u, l[o].spriteSourceSize.w / u, l[o].spriteSourceSize.h / u)),
                                    t.textures[o] = new s.Texture(i.texture.baseTexture, h, p, d, l[o].rotated ? 2 : 0),
                                    s.utils.TextureCache[o] = t.textures[o]
                                }
                                n++
                            }
                        }
                        function n() {
                            return d * o < c.length
                        }
                        function a(t) {
                            r(d * o, o),
                            d++,
                            setTimeout(t, 0)
                        }
                        function h() {
                            a(function() {
                                n() ? h() : e()
                            })
                        }
                        t.textures = {};
                        var l = t.data.frames,
                            c = Object.keys(l),
                            u = s.utils.getResolutionOfUrl(t.url),
                            d = 0;
                        c.length <= o ? (r(0, o), e()) : h()
                    })
                }
            }
        }, {
            "../core": 97,
            path: 22,
            "resource-loader": 71
        }],
        186: [function(t, e, i) {
            var r = t("../core");
            e.exports = function() {
                return function(t, e) {
                    if (t.data && t.isImage) {
                        var i = new r.BaseTexture(t.data, null, r.utils.getResolutionOfUrl(t.url));
                        i.imageUrl = t.url,
                        t.texture = new r.Texture(i),
                        r.utils.BaseTextureCache[t.url] = i,
                        r.utils.TextureCache[t.url] = t.texture
                    }
                    e()
                }
            }
        }, {
            "../core": 97
        }],
        187: [function(t, e, i) {
            function r(t, e, i, s, o) {
                n.Container.call(this),
                this._texture = null,
                this.uvs = i || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
                this.vertices = e || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]),
                this.indices = s || new Uint16Array([0, 1, 3, 2]),
                this.dirty = 0,
                this.indexDirty = 0,
                this.blendMode = n.BLEND_MODES.NORMAL,
                this.canvasPadding = 0,
                this.drawMode = o || r.DRAW_MODES.TRIANGLE_MESH,
                this.texture = t,
                this.shader = null,
                this.tintRgb = new Float32Array([1, 1, 1]),
                this._glDatas = []
            }
            var n = t("../core"),
                s = t("pixi-gl-core"),
                o = t("./webgl/MeshShader"),
                a = new n.Point,
                h = new n.Polygon;
            r.prototype = Object.create(n.Container.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                texture: {
                    get: function() {
                        return this._texture
                    },
                    set: function(t) {
                        this._texture !== t && (this._texture = t, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                    }
                },
                tint: {
                    get: function() {
                        return n.utils.rgb2hex(this.tintRgb)
                    },
                    set: function(t) {
                        this.tintRgb = n.utils.hex2rgb(t, this.tintRgb)
                    }
                }
            }),
            r.prototype._renderWebGL = function(t) {
                t.flush();
                var e = t.gl,
                    i = this._glDatas[t.CONTEXT_UID];
                i || (i = {
                    shader: new o(e),
                    vertexBuffer: s.GLBuffer.createVertexBuffer(e, this.vertices, e.STREAM_DRAW),
                    uvBuffer: s.GLBuffer.createVertexBuffer(e, this.uvs, e.STREAM_DRAW),
                    indexBuffer: s.GLBuffer.createIndexBuffer(e, this.indices, e.STATIC_DRAW),
                    vao: new s.VertexArrayObject(e),
                    dirty: this.dirty,
                    indexDirty: this.indexDirty
                }, i.vao = new s.VertexArrayObject(e).addIndex(i.indexBuffer).addAttribute(i.vertexBuffer, i.shader.attributes.aVertexPosition, e.FLOAT, !1, 8, 0).addAttribute(i.uvBuffer, i.shader.attributes.aTextureCoord, e.FLOAT, !1, 8, 0), this._glDatas[t.CONTEXT_UID] = i),
                this.dirty !== i.dirty && (i.dirty = this.dirty, i.uvBuffer.upload()),
                this.indexDirty !== i.indexDirty && (i.indexDirty = this.indexDirty, i.indexBuffer.upload()),
                i.vertexBuffer.upload(),
                t.bindShader(i.shader),
                t.bindTexture(this._texture, 0),
                t.state.setBlendMode(this.blendMode),
                i.shader.uniforms.translationMatrix = this.worldTransform.toArray(!0),
                i.shader.uniforms.alpha = this.worldAlpha,
                i.shader.uniforms.tint = this.tintRgb;
                var n = this.drawMode === r.DRAW_MODES.TRIANGLE_MESH ? e.TRIANGLE_STRIP : e.TRIANGLES;
                i.vao.bind().draw(n, this.indices.length).unbind()
            },
            r.prototype._renderCanvas = function(t) {
                var e = t.context,
                    i = this.worldTransform,
                    n = t.resolution;
                t.roundPixels ? e.setTransform(i.a * n, i.b * n, i.c * n, i.d * n, i.tx * n | 0, i.ty * n | 0) : e.setTransform(i.a * n, i.b * n, i.c * n, i.d * n, i.tx * n, i.ty * n),
                this.drawMode === r.DRAW_MODES.TRIANGLE_MESH ? this._renderCanvasTriangleMesh(e) : this._renderCanvasTriangles(e)
            },
            r.prototype._renderCanvasTriangleMesh = function(t) {
                for (var e = this.vertices, i = this.uvs, r = e.length / 2, n = 0; r - 2 > n; n++) {
                    var s = 2 * n;
                    this._renderCanvasDrawTriangle(t, e, i, s, s + 2, s + 4)
                }
            },
            r.prototype._renderCanvasTriangles = function(t) {
                for (var e = this.vertices, i = this.uvs, r = this.indices, n = r.length, s = 0; n > s; s += 3) {
                    var o = 2 * r[s],
                        a = 2 * r[s + 1],
                        h = 2 * r[s + 2];
                    this._renderCanvasDrawTriangle(t, e, i, o, a, h)
                }
            },
            r.prototype._renderCanvasDrawTriangle = function(t, e, i, r, n, s) {
                var o = this._texture.baseTexture,
                    a = o.source,
                    h = o.width,
                    l = o.height,
                    c = e[r],
                    u = e[n],
                    d = e[s],
                    p = e[r + 1],
                    f = e[n + 1],
                    _ = e[s + 1],
                    g = i[r] * o.width,
                    m = i[n] * o.width,
                    v = i[s] * o.width,
                    y = i[r + 1] * o.height,
                    x = i[n + 1] * o.height,
                    b = i[s + 1] * o.height;
                if (this.canvasPadding > 0) {
                    var T = this.canvasPadding / this.worldTransform.a,
                        w = this.canvasPadding / this.worldTransform.d,
                        S = (c + u + d) / 3,
                        E = (p + f + _) / 3,
                        A = c - S,
                        R = p - E,
                        C = Math.sqrt(A * A + R * R);
                    c = S + A / C * (C + T),
                    p = E + R / C * (C + w),
                    A = u - S,
                    R = f - E,
                    C = Math.sqrt(A * A + R * R),
                    u = S + A / C * (C + T),
                    f = E + R / C * (C + w),
                    A = d - S,
                    R = _ - E,
                    C = Math.sqrt(A * A + R * R),
                    d = S + A / C * (C + T),
                    _ = E + R / C * (C + w)
                }
                t.save(),
                t.beginPath(),
                t.moveTo(c, p),
                t.lineTo(u, f),
                t.lineTo(d, _),
                t.closePath(),
                t.clip();
                var M = g * x + y * v + m * b - x * v - y * m - g * b,
                    P = c * x + y * d + u * b - x * d - y * u - c * b,
                    O = g * u + c * v + m * d - u * v - c * m - g * d,
                    D = g * x * d + y * u * v + c * m * b - c * x * v - y * m * d - g * u * b,
                    L = p * x + y * _ + f * b - x * _ - y * f - p * b,
                    k = g * f + p * v + m * _ - f * v - p * m - g * _,
                    I = g * x * _ + y * f * v + p * m * b - p * x * v - y * m * _ - g * f * b;
                t.transform(P / M, L / M, O / M, k / M, D / M, I / M),
                t.drawImage(a, 0, 0, h * o.resolution, l * o.resolution, 0, 0, h, l),
                t.restore()
            },
            r.prototype.renderMeshFlat = function(t) {
                var e = this.context,
                    i = t.vertices,
                    r = i.length / 2;
                e.beginPath();
                for (var n = 1; r - 2 > n; n++) {
                    var s = 2 * n,
                        o = i[s],
                        a = i[s + 2],
                        h = i[s + 4],
                        l = i[s + 1],
                        c = i[s + 3],
                        u = i[s + 5];
                    e.moveTo(o, l),
                    e.lineTo(a, c),
                    e.lineTo(h, u)
                }
                e.fillStyle = "#FF0000",
                e.fill(),
                e.closePath()
            },
            r.prototype._onTextureUpdate = function() {},
            r.prototype._calculateBounds = function() {
                this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length)
            },
            r.prototype.containsPoint = function(t) {
                if (!this.getBounds().contains(t.x, t.y))
                    return !1;
                this.worldTransform.applyInverse(t, a);
                for (var e = this.vertices, i = h.points, n = this.indices, s = this.indices.length, o = this.drawMode === r.DRAW_MODES.TRIANGLES ? 3 : 1, l = 0; s > l + 2; l += o) {
                    var c = 2 * n[l],
                        u = 2 * n[l + 1],
                        d = 2 * n[l + 2];
                    if (i[0] = e[c], i[1] = e[c + 1], i[2] = e[u], i[3] = e[u + 1], i[4] = e[d], i[5] = e[d + 1], h.contains(a.x, a.y))
                        return !0
                }
                return !1
            },
            r.DRAW_MODES = {
                TRIANGLE_MESH: 0,
                TRIANGLES: 1
            }
        }, {
            "../core": 97,
            "./webgl/MeshShader": 192,
            "pixi-gl-core": 12
        }],
        188: [function(t, e, i) {
            function r(t, e, i, r, o) {
                s.call(this, t, 4, 4);
                var a = this.uvs;
                a[6] = a[14] = a[22] = a[30] = 1,
                a[25] = a[27] = a[29] = a[31] = 1,
                this._origWidth = t.width,
                this._origHeight = t.height,
                this._uvw = 1 / this._origWidth,
                this._uvh = 1 / this._origHeight,
                this.width = t.width,
                this.height = t.height,
                a[2] = a[10] = a[18] = a[26] = this._uvw * e,
                a[4] = a[12] = a[20] = a[28] = 1 - this._uvw * r,
                a[9] = a[11] = a[13] = a[15] = this._uvh * i,
                a[17] = a[19] = a[21] = a[23] = 1 - this._uvh * o,
                this.leftWidth = void 0 !== e ? e : n,
                this.rightWidth = void 0 !== r ? r : n,
                this.topHeight = void 0 !== i ? i : n,
                this.bottomHeight = void 0 !== o ? o : n
            }
            var n = 10,
                s = t("./Plane");
            r.prototype = Object.create(s.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            Object.defineProperties(r.prototype, {
                width: {
                    get: function() {
                        return this._width
                    },
                    set: function(t) {
                        this._width = t,
                        this.updateVerticalVertices()
                    }
                },
                height: {
                    get: function() {
                        return this._height
                    },
                    set: function(t) {
                        this._height = t,
                        this.updateHorizontalVertices()
                    }
                },
                leftWidth: {
                    get: function() {
                        return this._leftWidth
                    },
                    set: function(t) {
                        this._leftWidth = t;
                        var e = this.uvs,
                            i = this.vertices;
                        e[2] = e[10] = e[18] = e[26] = this._uvw * t,
                        i[2] = i[10] = i[18] = i[26] = t,
                        this.dirty = !0
                    }
                },
                rightWidth: {
                    get: function() {
                        return this._rightWidth
                    },
                    set: function(t) {
                        this._rightWidth = t;
                        var e = this.uvs,
                            i = this.vertices;
                        e[4] = e[12] = e[20] = e[28] = 1 - this._uvw * t,
                        i[4] = i[12] = i[20] = i[28] = this._width - t,
                        this.dirty = !0
                    }
                },
                topHeight: {
                    get: function() {
                        return this._topHeight
                    },
                    set: function(t) {
                        this._topHeight = t;
                        var e = this.uvs,
                            i = this.vertices;
                        e[9] = e[11] = e[13] = e[15] = this._uvh * t,
                        i[9] = i[11] = i[13] = i[15] = t,
                        this.dirty = !0
                    }
                },
                bottomHeight: {
                    get: function() {
                        return this._bottomHeight
                    },
                    set: function(t) {
                        this._bottomHeight = t;
                        var e = this.uvs,
                            i = this.vertices;
                        e[17] = e[19] = e[21] = e[23] = 1 - this._uvh * t,
                        i[17] = i[19] = i[21] = i[23] = this._height - t,
                        this.dirty = !0
                    }
                }
            }),
            r.prototype.updateHorizontalVertices = function() {
                var t = this.vertices;
                t[9] = t[11] = t[13] = t[15] = this._topHeight,
                t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight,
                t[25] = t[27] = t[29] = t[31] = this._height
            },
            r.prototype.updateVerticalVertices = function() {
                var t = this.vertices;
                t[2] = t[10] = t[18] = t[26] = this._leftWidth,
                t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth,
                t[6] = t[14] = t[22] = t[30] = this._width
            },
            r.prototype._renderCanvas = function(t) {
                var e = t.context;
                e.globalAlpha = this.worldAlpha;
                var i = this.worldTransform,
                    r = t.resolution;
                t.roundPixels ? e.setTransform(i.a * r, i.b * r, i.c * r, i.d * r, i.tx * r | 0, i.ty * r | 0) : e.setTransform(i.a * r, i.b * r, i.c * r, i.d * r, i.tx * r, i.ty * r);
                var n = this._texture.baseTexture,
                    s = n.source,
                    o = n.width,
                    a = n.height;
                this.drawSegment(e, s, o, a, 0, 1, 10, 11),
                this.drawSegment(e, s, o, a, 2, 3, 12, 13),
                this.drawSegment(e, s, o, a, 4, 5, 14, 15),
                this.drawSegment(e, s, o, a, 8, 9, 18, 19),
                this.drawSegment(e, s, o, a, 10, 11, 20, 21),
                this.drawSegment(e, s, o, a, 12, 13, 22, 23),
                this.drawSegment(e, s, o, a, 16, 17, 26, 27),
                this.drawSegment(e, s, o, a, 18, 19, 28, 29),
                this.drawSegment(e, s, o, a, 20, 21, 30, 31)
            },
            r.prototype.drawSegment = function(t, e, i, r, n, s, o, a) {
                var h = this.uvs,
                    l = this.vertices,
                    c = (h[o] - h[n]) * i,
                    u = (h[a] - h[s]) * r,
                    d = l[o] - l[n],
                    p = l[a] - l[s];
                1 > c && (c = 1),
                1 > u && (u = 1),
                1 > d && (d = 1),
                1 > p && (p = 1),
                t.drawImage(e, h[n] * i, h[s] * r, c, u, l[n], l[s], d, p)
            }
        }, {
            "./Plane": 189
        }],
        189: [function(t, e, i) {
            function r(t, e, i) {
                n.call(this, t),
                this._ready = !0,
                this.verticesX = e || 10,
                this.verticesY = i || 10,
                this.drawMode = n.DRAW_MODES.TRIANGLES,
                this.refresh()
            }
            var n = t("./Mesh");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.refresh = function() {
                var t = this.verticesX * this.verticesY,
                    e = [],
                    i = [],
                    r = [],
                    n = [],
                    s = this.texture,
                    o = this.verticesX - 1,
                    a = this.verticesY - 1,
                    h = 0,
                    l = s.width / o,
                    c = s.height / a;
                for (h = 0; t > h; h++) {
                    var u = h % this.verticesX,
                        d = h / this.verticesX | 0;
                    e.push(u * l, d * c),
                    r.push(s._uvs.x0 + (s._uvs.x1 - s._uvs.x0) * (u / (this.verticesX - 1)), s._uvs.y0 + (s._uvs.y3 - s._uvs.y0) * (d / (this.verticesY - 1)))
                }
                var p = o * a;
                for (h = 0; p > h; h++) {
                    var f = h % o,
                        _ = h / o | 0,
                        g = _ * this.verticesX + f,
                        m = _ * this.verticesX + f + 1,
                        v = (_ + 1) * this.verticesX + f,
                        y = (_ + 1) * this.verticesX + f + 1;
                    n.push(g, m, v),
                    n.push(m, y, v)
                }
                this.vertices = new Float32Array(e),
                this.uvs = new Float32Array(r),
                this.colors = new Float32Array(i),
                this.indices = new Uint16Array(n),
                this.indexDirty = !0
            },
            r.prototype._onTextureUpdate = function() {
                n.prototype._onTextureUpdate.call(this),
                this._ready && this.refresh()
            }
        }, {
            "./Mesh": 187
        }],
        190: [function(t, e, i) {
            function r(t, e) {
                n.call(this, t),
                this.points = e,
                this.vertices = new Float32Array(4 * e.length),
                this.uvs = new Float32Array(4 * e.length),
                this.colors = new Float32Array(2 * e.length),
                this.indices = new Uint16Array(2 * e.length),
                this._ready = !0,
                this.refresh()
            }
            var n = t("./Mesh"),
                s = t("../core");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.refresh = function() {
                var t = this.points;
                if (!(t.length < 1) && this._texture._uvs) {
                    var e = this.uvs,
                        i = this.indices,
                        r = this.colors,
                        n = this._texture._uvs,
                        o = new s.Point(n.x0, n.y0),
                        a = new s.Point(n.x2 - n.x0, n.y2 - n.y0);
                    e[0] = 0 + o.x,
                    e[1] = 0 + o.y,
                    e[2] = 0 + o.x,
                    e[3] = 1 * a.y + o.y,
                    r[0] = 1,
                    r[1] = 1,
                    i[0] = 0,
                    i[1] = 1;
                    for (var h, l, c, u = t.length, d = 1; u > d; d++)
                        h = t[d],
                        l = 4 * d,
                        c = d / (u - 1),
                        e[l] = c * a.x + o.x,
                        e[l + 1] = 0 + o.y,
                        e[l + 2] = c * a.x + o.x,
                        e[l + 3] = 1 * a.y + o.y,
                        l = 2 * d,
                        r[l] = 1,
                        r[l + 1] = 1,
                        l = 2 * d,
                        i[l] = l,
                        i[l + 1] = l + 1;
                    this.dirty = !0,
                    this.indexDirty = !0
                }
            },
            r.prototype._onTextureUpdate = function() {
                n.prototype._onTextureUpdate.call(this),
                this._ready && this.refresh()
            },
            r.prototype.updateTransform = function() {
                var t = this.points;
                if (!(t.length < 1)) {
                    for (var e, i, r, n, s, o, a = t[0], h = 0, l = 0, c = this.vertices, u = t.length, d = 0; u > d; d++)
                        i = t[d],
                        r = 4 * d,
                        e = d < t.length - 1 ? t[d + 1] : i,
                        l = -(e.x - a.x),
                        h = e.y - a.y,
                        n = 10 * (1 - d / (u - 1)),
                        n > 1 && (n = 1),
                        s = Math.sqrt(h * h + l * l),
                        o = this._texture.height / 2,
                        h /= s,
                        l /= s,
                        h *= o,
                        l *= o,
                        c[r] = i.x + h,
                        c[r + 1] = i.y + l,
                        c[r + 2] = i.x - h,
                        c[r + 3] = i.y - l,
                        a = i;
                    this.containerUpdateTransform()
                }
            }
        }, {
            "../core": 97,
            "./Mesh": 187
        }],
        191: [function(t, e, i) {
            e.exports = {
                Mesh: t("./Mesh"),
                Plane: t("./Plane"),
                NineSlicePlane: t("./NineSlicePlane"),
                Rope: t("./Rope"),
                MeshShader: t("./webgl/MeshShader")
            }
        }, {
            "./Mesh": 187,
            "./NineSlicePlane": 188,
            "./Plane": 189,
            "./Rope": 190,
            "./webgl/MeshShader": 192
        }],
        192: [function(t, e, i) {
            function r(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "uniform float alpha;", "uniform vec3 tint;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);", "}"].join("\n"))
            }
            var n = t("../../core/Shader");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../core/Shader": 77
        }],
        193: [function(t, e, i) {
            function r(t, e, i) {
                n.Container.call(this),
                i = i || 15e3,
                t = t || 15e3;
                var r = 16384;
                i > r && (i = r),
                i > t && (i = t),
                this._properties = [!1, !0, !1, !1, !1],
                this._maxSize = t,
                this._batchSize = i,
                this._glBuffers = [],
                this._bufferToUpdate = 0,
                this.interactiveChildren = !1,
                this.blendMode = n.BLEND_MODES.NORMAL,
                this.roundPixels = !0,
                this.baseTexture = null,
                this.setProperties(e)
            }
            var n = t("../core");
            r.prototype = Object.create(n.Container.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.setProperties = function(t) {
                t && (this._properties[0] = "scale" in t ? !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "alpha" in t ? !!t.alpha : this._properties[4])
            },
            r.prototype.updateTransform = function() {
                this.displayObjectUpdateTransform()
            },
            r.prototype.renderWebGL = function(t) {
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (this.baseTexture || (this.baseTexture = this.children[0]._texture.baseTexture, this.baseTexture.hasLoaded || this.baseTexture.once("update", function() {
                    this.onChildrenChange(0)
                }, this)), t.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this))
            },
            r.prototype.onChildrenChange = function(t) {
                var e = Math.floor(t / this._batchSize);
                e < this._bufferToUpdate && (this._bufferToUpdate = e)
            },
            r.prototype.renderCanvas = function(t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                    var e = t.context,
                        i = this.worldTransform,
                        r = !0,
                        n = 0,
                        s = 0,
                        o = 0,
                        a = 0,
                        h = t.blendModes[this.blendMode];
                    h !== e.globalCompositeOperation && (e.globalCompositeOperation = h),
                    e.globalAlpha = this.worldAlpha,
                    this.displayObjectUpdateTransform();
                    for (var l = 0; l < this.children.length; ++l) {
                        var c = this.children[l];
                        if (c.visible) {
                            var u = c.texture.frame;
                            if (e.globalAlpha = this.worldAlpha * c.alpha, c.rotation % (2 * Math.PI) == 0)
                                r && (e.setTransform(i.a, i.b, i.c, i.d, i.tx * t.resolution, i.ty * t.resolution), r = !1),
                                n = c.anchor.x * (-u.width * c.scale.x) + c.position.x + .5,
                                s = c.anchor.y * (-u.height * c.scale.y) + c.position.y + .5,
                                o = u.width * c.scale.x,
                                a = u.height * c.scale.y;
                            else {
                                r || (r = !0),
                                c.displayObjectUpdateTransform();
                                var d = c.worldTransform;
                                t.roundPixels ? e.setTransform(d.a, d.b, d.c, d.d, d.tx * t.resolution | 0, d.ty * t.resolution | 0) : e.setTransform(d.a, d.b, d.c, d.d, d.tx * t.resolution, d.ty * t.resolution),
                                n = c.anchor.x * -u.width + .5,
                                s = c.anchor.y * -u.height + .5,
                                o = u.width,
                                a = u.height
                            }
                            var p = c.texture.baseTexture.resolution;
                            e.drawImage(c.texture.baseTexture.source, u.x * p, u.y * p, u.width * p, u.height * p, n * p, s * p, o * p, a * p)
                        }
                    }
                }
            },
            r.prototype.destroy = function() {
                if (n.Container.prototype.destroy.apply(this, arguments), this._buffers)
                    for (var t = 0; t < this._buffers.length; ++t)
                        this._buffers[t].destroy();
                this._properties = null,
                this._buffers = null
            }
        }, {
            "../core": 97
        }],
        194: [function(t, e, i) {
            e.exports = {
                ParticleContainer: t("./ParticleContainer"),
                ParticleRenderer: t("./webgl/ParticleRenderer")
            }
        }, {
            "./ParticleContainer": 193,
            "./webgl/ParticleRenderer": 196
        }],
        195: [function(t, e, i) {
            function r(t, e, i, r) {
                this.gl = t,
                this.vertSize = 2,
                this.vertByteSize = 4 * this.vertSize,
                this.size = r,
                this.dynamicProperties = [],
                this.staticProperties = [];
                for (var n = 0; n < e.length; n++) {
                    var s = e[n];
                    s = {
                        attribute: s.attribute,
                        size: s.size,
                        uploadFunction: s.uploadFunction,
                        offset: s.offset
                    },
                    i[n] ? this.dynamicProperties.push(s) : this.staticProperties.push(s)
                }
                this.staticStride = 0,
                this.staticBuffer = null,
                this.staticData = null,
                this.dynamicStride = 0,
                this.dynamicBuffer = null,
                this.dynamicData = null,
                this.initBuffers()
            }
            var n = t("pixi-gl-core"),
                s = t("../../core/utils/createIndicesForQuads");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.initBuffers = function() {
                var t,
                    e,
                    i = this.gl,
                    r = 0;
                for (this.indices = s(this.size), this.indexBuffer = n.GLBuffer.createIndexBuffer(i, this.indices, i.STATIC_DRAW), this.dynamicStride = 0, t = 0; t < this.dynamicProperties.length; t++)
                    e = this.dynamicProperties[t],
                    e.offset = r,
                    r += e.size,
                    this.dynamicStride += e.size;
                this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4),
                this.dynamicBuffer = n.GLBuffer.createVertexBuffer(i, this.dynamicData, i.STREAM_DRAW);
                var o = 0;
                for (this.staticStride = 0, t = 0; t < this.staticProperties.length; t++)
                    e = this.staticProperties[t],
                    e.offset = o,
                    o += e.size,
                    this.staticStride += e.size;
                for (this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = n.GLBuffer.createVertexBuffer(i, this.staticData, i.STATIC_DRAW), this.vao = new n.VertexArrayObject(i).addIndex(this.indexBuffer), t = 0; t < this.dynamicProperties.length; t++)
                    e = this.dynamicProperties[t],
                    this.vao.addAttribute(this.dynamicBuffer, e.attribute, i.FLOAT, !1, 4 * this.dynamicStride, 4 * e.offset);
                for (t = 0; t < this.staticProperties.length; t++)
                    e = this.staticProperties[t],
                    this.vao.addAttribute(this.staticBuffer, e.attribute, i.FLOAT, !1, 4 * this.staticStride, 4 * e.offset)
            },
            r.prototype.uploadDynamic = function(t, e, i) {
                for (var r = 0; r < this.dynamicProperties.length; r++) {
                    var n = this.dynamicProperties[r];
                    n.uploadFunction(t, e, i, this.dynamicData, this.dynamicStride, n.offset)
                }
                this.dynamicBuffer.upload()
            },
            r.prototype.uploadStatic = function(t, e, i) {
                for (var r = 0; r < this.staticProperties.length; r++) {
                    var n = this.staticProperties[r];
                    n.uploadFunction(t, e, i, this.staticData, this.staticStride, n.offset)
                }
                this.staticBuffer.upload()
            },
            r.prototype.bind = function() {
                this.vao.bind()
            },
            r.prototype.destroy = function() {
                this.dynamicProperties = null,
                this.dynamicData = null,
                this.dynamicBuffer.destroy(),
                this.staticProperties = null,
                this.staticData = null,
                this.staticBuffer.destroy()
            }
        }, {
            "../../core/utils/createIndicesForQuads": 149,
            "pixi-gl-core": 12
        }],
        196: [function(t, e, i) {
            function r(t) {
                n.ObjectRenderer.call(this, t),
                this.shader = null,
                this.indexBuffer = null,
                this.properties = null,
                this.tempMatrix = new n.Matrix,
                this.CONTEXT_UID = 0
            }
            var n = t("../../core"),
                s = t("./ParticleShader"),
                o = t("./ParticleBuffer");
            r.prototype = Object.create(n.ObjectRenderer.prototype),
            r.prototype.constructor = r,
            e.exports = r,
            n.WebGLRenderer.registerPlugin("particle", r),
            r.prototype.onContextChange = function() {
                var t = this.renderer.gl;
                this.CONTEXT_UID = this.renderer.CONTEXT_UID,
                this.shader = new s(t),
                this.properties = [{
                    attribute: this.shader.attributes.aVertexPosition,
                    size: 2,
                    uploadFunction: this.uploadVertices,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aPositionCoord,
                    size: 2,
                    uploadFunction: this.uploadPosition,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aRotation,
                    size: 1,
                    uploadFunction: this.uploadRotation,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aTextureCoord,
                    size: 2,
                    uploadFunction: this.uploadUvs,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aColor,
                    size: 1,
                    uploadFunction: this.uploadAlpha,
                    offset: 0
                }]
            },
            r.prototype.start = function() {
                this.renderer.bindShader(this.shader)
            },
            r.prototype.render = function(t) {
                var e = t.children,
                    i = e.length,
                    r = t._maxSize,
                    n = t._batchSize;
                if (0 !== i) {
                    i > r && (i = r);
                    var s = t._glBuffers[this.renderer.CONTEXT_UID];
                    s || (s = t._glBuffers[this.renderer.CONTEXT_UID] = this.generateBuffers(t)),
                    this.renderer.setBlendMode(t.blendMode);
                    var o = this.renderer.gl,
                        a = t.worldTransform.copy(this.tempMatrix);
                    a.prepend(this.renderer._activeRenderTarget.projectionMatrix),
                    this.shader.uniforms.projectionMatrix = a.toArray(!0),
                    this.shader.uniforms.uAlpha = t.worldAlpha;
                    var h = e[0]._texture.baseTexture;
                    this.renderer.bindTexture(h);
                    for (var l = 0, c = 0; i > l; l += n, c += 1) {
                        var u = i - l;
                        u > n && (u = n);
                        var d = s[c]
                        ;
                        d.uploadDynamic(e, l, u),
                        t._bufferToUpdate === c && (d.uploadStatic(e, l, u), t._bufferToUpdate = c + 1),
                        d.vao.bind().draw(o.TRIANGLES, 6 * u).unbind()
                    }
                }
            },
            r.prototype.generateBuffers = function(t) {
                var e,
                    i = this.renderer.gl,
                    r = [],
                    n = t._maxSize,
                    s = t._batchSize,
                    a = t._properties;
                for (e = 0; n > e; e += s)
                    r.push(new o(i, this.properties, a, s));
                return r
            },
            r.prototype.uploadVertices = function(t, e, i, r, n, s) {
                for (var o, a, h, l, c, u, d, p, f, _, g = 0; i > g; g++)
                    o = t[e + g],
                    a = o._texture,
                    c = o.scale.x,
                    u = o.scale.y,
                    h = a.trim,
                    l = a.orig,
                    h ? (p = h.x - o.anchor.x * l.width, d = p + h.width, _ = h.y - o.anchor.y * l.height, f = _ + h.height) : (d = l.width * (1 - o.anchor.x), p = l.width * -o.anchor.x, f = l.height * (1 - o.anchor.y), _ = l.height * -o.anchor.y),
                    r[s] = p * c,
                    r[s + 1] = _ * u,
                    r[s + n] = d * c,
                    r[s + n + 1] = _ * u,
                    r[s + 2 * n] = d * c,
                    r[s + 2 * n + 1] = f * u,
                    r[s + 3 * n] = p * c,
                    r[s + 3 * n + 1] = f * u,
                    s += 4 * n
            },
            r.prototype.uploadPosition = function(t, e, i, r, n, s) {
                for (var o = 0; i > o; o++) {
                    var a = t[e + o].position;
                    r[s] = a.x,
                    r[s + 1] = a.y,
                    r[s + n] = a.x,
                    r[s + n + 1] = a.y,
                    r[s + 2 * n] = a.x,
                    r[s + 2 * n + 1] = a.y,
                    r[s + 3 * n] = a.x,
                    r[s + 3 * n + 1] = a.y,
                    s += 4 * n
                }
            },
            r.prototype.uploadRotation = function(t, e, i, r, n, s) {
                for (var o = 0; i > o; o++) {
                    var a = t[e + o].rotation;
                    r[s] = a,
                    r[s + n] = a,
                    r[s + 2 * n] = a,
                    r[s + 3 * n] = a,
                    s += 4 * n
                }
            },
            r.prototype.uploadUvs = function(t, e, i, r, n, s) {
                for (var o = 0; i > o; o++) {
                    var a = t[e + o]._texture._uvs;
                    a ? (r[s] = a.x0, r[s + 1] = a.y0, r[s + n] = a.x1, r[s + n + 1] = a.y1, r[s + 2 * n] = a.x2, r[s + 2 * n + 1] = a.y2, r[s + 3 * n] = a.x3, r[s + 3 * n + 1] = a.y3, s += 4 * n) : (r[s] = 0, r[s + 1] = 0, r[s + n] = 0, r[s + n + 1] = 0, r[s + 2 * n] = 0, r[s + 2 * n + 1] = 0, r[s + 3 * n] = 0, r[s + 3 * n + 1] = 0, s += 4 * n)
                }
            },
            r.prototype.uploadAlpha = function(t, e, i, r, n, s) {
                for (var o = 0; i > o; o++) {
                    var a = t[e + o].alpha;
                    r[s] = a,
                    r[s + n] = a,
                    r[s + 2 * n] = a,
                    r[s + 3 * n] = a,
                    s += 4 * n
                }
            },
            r.prototype.destroy = function() {
                this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer),
                n.ObjectRenderer.prototype.destroy.apply(this, arguments),
                this.shader.destroy(),
                this.indices = null,
                this.tempMatrix = null
            }
        }, {
            "../../core": 97,
            "./ParticleBuffer": 195,
            "./ParticleShader": 197
        }],
        197: [function(t, e, i) {
            function r(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n"))
            }
            var n = t("../../core/Shader");
            r.prototype = Object.create(n.prototype),
            r.prototype.constructor = r,
            e.exports = r
        }, {
            "../../core/Shader": 77
        }],
        198: [function(t, e, i) {
            Math.sign || (Math.sign = function(t) {
                return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1
            })
        }, {}],
        199: [function(t, e, i) {
            Object.assign || (Object.assign = t("object-assign"))
        }, {
            "object-assign": 5
        }],
        200: [function(t, e, i) {
            t("./Object.assign"),
            t("./requestAnimationFrame"),
            t("./Math.sign"),
            window.ArrayBuffer || (window.ArrayBuffer = Array),
            window.Float32Array || (window.Float32Array = Array),
            window.Uint32Array || (window.Uint32Array = Array),
            window.Uint16Array || (window.Uint16Array = Array)
        }, {
            "./Math.sign": 198,
            "./Object.assign": 199,
            "./requestAnimationFrame": 201
        }],
        201: [function(t, e, i) {
            (function(t) {
                if (Date.now && Date.prototype.getTime || (Date.now = function() {
                    return (new Date).getTime()
                }), !t.performance || !t.performance.now) {
                    var e = Date.now();
                    t.performance || (t.performance = {}),
                    t.performance.now = function() {
                        return Date.now() - e
                    }
                }
                for (var i = Date.now(), r = ["ms", "moz", "webkit", "o"], n = 0; n < r.length && !t.requestAnimationFrame; ++n)
                    t.requestAnimationFrame = t[r[n] + "RequestAnimationFrame"],
                    t.cancelAnimationFrame = t[r[n] + "CancelAnimationFrame"] || t[r[n] + "CancelRequestAnimationFrame"];
                t.requestAnimationFrame || (t.requestAnimationFrame = function(t) {
                    if ("function" != typeof t)
                        throw new TypeError(t + "is not a function");
                    var e = Date.now(),
                        r = 16 + i - e;
                    return 0 > r && (r = 0), i = e, setTimeout(function() {
                        i = Date.now(),
                        t(performance.now())
                    }, r)
                }),
                t.cancelAnimationFrame || (t.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                })
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        202: [function(t, e, i) {
            function r() {}
            var n = t("../../core");
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.upload = function(t, e) {
                "function" == typeof t && (e = t, t = null),
                e()
            },
            r.prototype.register = function() {
                return this
            },
            r.prototype.add = function() {
                return this
            },
            r.prototype.destroy = function() {},
            n.CanvasRenderer.registerPlugin("prepare", r)
        }, {
            "../../core": 97
        }],
        203: [function(t, e, i) {
            e.exports = {
                webGL: t("./webgl/WebGLPrepare"),
                canvas: t("./canvas/CanvasPrepare")
            }
        }, {
            "./canvas/CanvasPrepare": 202,
            "./webgl/WebGLPrepare": 204
        }],
        204: [function(t, e, i) {
            function r(t) {
                this.renderer = t,
                this.queue = [],
                this.addHooks = [],
                this.uploadHooks = [],
                this.completes = [],
                this.ticking = !1,
                this.register(o, n).register(a, s)
            }
            function n(t, e) {
                return e instanceof h.BaseTexture && (t.textureManager.updateTexture(e), !0)
            }
            function s(t, e) {
                return e instanceof h.Graphics && (t.plugins.graphics.updateGraphics(e), !0)
            }
            function o(t, e) {
                if (t instanceof h.BaseTexture)
                    return -1 === e.indexOf(t) && e.push(t), !0;
                if (t._texture && t._texture instanceof h.Texture) {
                    var i = t._texture.baseTexture;
                    return -1 === e.indexOf(i) && e.push(i), !0
                }
                return !1
            }
            function a(t, e) {
                return t instanceof h.Graphics && (e.push(t), !0)
            }
            var h = t("../../core"),
                l = h.ticker.shared;
            r.UPLOADS_PER_FRAME = 4,
            r.prototype.constructor = r,
            e.exports = r,
            r.prototype.upload = function(t, e) {
                "function" == typeof t && (e = t, t = null),
                t && this.add(t),
                this.queue.length ? (this.numLeft = r.UPLOADS_PER_FRAME, this.completes.push(e), this.ticking || (this.ticking = !0, l.add(this.tick, this))) : e()
            },
            r.prototype.tick = function() {
                for (var t, e; this.queue.length && this.numLeft > 0;) {
                    var i = this.queue[0],
                        n = !1;
                    for (t = 0, e = this.uploadHooks.length; e > t; t++)
                        if (this.uploadHooks[t](this.renderer, i)) {
                            this.numLeft--,
                            this.queue.shift(),
                            n = !0;
                            break
                        }
                    n || this.queue.shift()
                }
                if (this.queue.length)
                    this.numLeft = r.UPLOADS_PER_FRAME;
                else {
                    this.ticking = !1,
                    l.remove(this.tick, this);
                    var s = this.completes.slice(0);
                    for (this.completes.length = 0, t = 0, e = s.length; e > t; t++)
                        s[t]()
                }
            },
            r.prototype.register = function(t, e) {
                return t && this.addHooks.push(t), e && this.uploadHooks.push(e), this
            },
            r.prototype.add = function(t) {
                var e,
                    i;
                for (e = 0, i = this.addHooks.length; i > e && !this.addHooks[e](t, this.queue); e++)
                    ;
                if (t instanceof h.Container)
                    for (e = t.children.length - 1; e >= 0; e--)
                        this.add(t.children[e]);
                return this
            },
            r.prototype.destroy = function() {
                this.ticking && l.remove(this.tick, this),
                this.ticking = !1,
                this.addHooks = null,
                this.uploadHooks = null,
                this.renderer = null,
                this.completes = null,
                this.queue = null
            },
            h.WebGLRenderer.registerPlugin("prepare", r)
        }, {
            "../../core": 97
        }],
        205: [function(t, e, i) {
            (function(i) {
                t("./polyfill");
                var r = e.exports = t("./core");
                r.extras = t("./extras"),
                r.filters = t("./filters"),
                r.interaction = t("./interaction"),
                r.loaders = t("./loaders"),
                r.mesh = t("./mesh"),
                r.particles = t("./particles"),
                r.accessibility = t("./accessibility"),
                r.extract = t("./extract"),
                r.prepare = t("./prepare"),
                r.loader = new r.loaders.Loader,
                Object.assign(r, t("./deprecation")),
                i.PIXI = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./accessibility": 76,
            "./core": 97,
            "./deprecation": 154,
            "./extract": 156,
            "./extras": 164,
            "./filters": 175,
            "./interaction": 180,
            "./loaders": 183,
            "./mesh": 191,
            "./particles": 194,
            "./polyfill": 200,
            "./prepare": 203
        }]
    }, {}, [205])(205)
});
var global_custom2;
!function t(e, i, r) {
    function n(o, a) {
        if (!i[o]) {
            if (!e[o]) {
                var h = "function" == typeof require && require;
                if (!a && h)
                    return h(o, !0);
                if (s)
                    return s(o, !0);
                var l = new Error("Cannot find module '" + o + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = i[o] = {
                exports: {}
            };
            e[o][0].call(c.exports, function(t) {
                var i = e[o][1][t];
                return n(i || t)
            }, c, c.exports, t, e, i, r)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < r.length; o++)
        n(r[o]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            h = function t(e, i, r) {
                null === e && (e = Function.prototype);
                var n = Object.getOwnPropertyDescriptor(e, i);
                if (void 0 === n) {
                    var s = Object.getPrototypeOf(e);
                    return null === s ? void 0 : t(s, i, r)
                }
                if ("value" in n)
                    return n.value;
                var o = n.get;
                if (void 0 !== o)
                    return o.call(r)
            },
            l = t("../../index"),
            c = r(l),
            u = function(t) {
                function e(t) {
                    n(this, e);
                    var i = s(this, Object.getPrototypeOf(e).call(this, t));
                    return i.createExtraBound(), i.resizing = !1, i.cache = null, i.dom.divs = Array.prototype.slice.call(t.divs, 0), i
                }
                return o(e, t), a(e, [{
                    key: "createExtraBound",
                    value: function t() {
                        var e = this;
                        ["getCache", "inViewport"].forEach(function(t) {
                            return e[t] = e[t].bind(e)
                        })
                    }
                }, {
                    key: "resize",
                    value: function t() {
                        this.resizing = !0,
                        this.getCache(),
                        h(Object.getPrototypeOf(e.prototype), "resize", this).call(this),
                        this.resizing = !1
                    }
                }, {
                    key: "getCache",
                    value: function t() {
                        var e = this;
                        this.cache = [],
                        this.dom.divs.forEach(function(t, i) {
                            t.style.display = "block",
                            t.style.transform = "none";
                            var r = e.vars.target,
                                n = t.getBoundingClientRect(),
                                s = {
                                    el: t,
                                    state: !0,
                                    top: n.top + r,
                                    left: n.left,
                                    center: n.height / 2,
                                    bottom: n.bottom + r,
                                    speed: t.getAttribute("data-speed") || "-1"
                                };
                            4 === i && console.log(n.top, r, s.top),
                            e.cache.push(s)
                        }),
                        this.vars.bounding = this.dom.section.getBoundingClientRect().height - (this.vars.native ? 0 : this.vars.height)
                    }
                }, {
                    key: "run",
                    value: function t() {
                        this.dom.divs.forEach(this.inViewport),
                        this.dom.section.style[this.prefix] = this.getTransform(-1 * this.vars.current),
                        h(Object.getPrototypeOf(e.prototype), "run", this).call(this)
                    }
                }, {
                    key: "inViewport",
                    value: function t(e, i) {
                        if (this.cache && !this.resizing) {
                            var r = this.cache[i],
                                n = this.vars.current,
                                s = (r.top + r.center - n) * r.speed,
                                o = Math.round(r.top + s - n);
                            Math.round(r.bottom + s - n) > 0 && o < this.vars.height ? (e.classList.contains("inviewport") || e.classList.add("inviewport"), e.style.display = "block", e.style[this.prefix] = this.getTransform(s)) : e.classList.contains("inviewport") && e.classList.remove("inviewport")
                        }
                    }
                }]), e
            }(c.default);
        i.default = u
    }, {
        "../../index": 3
    }],
    2: [function(t, e, i) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        var n = t("./custom"),
            s = r(n);
        global_custom2 = s
    }, {
        "./custom": 1
    }],
    3: [function(t, e, i) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        r.enumerable = r.enumerable || !1,
                        r.configurable = !0,
                        "value" in r && (r.writable = !0),
                        Object.defineProperty(t, r.key, r)
                    }
                }
                return function(e, i, r) {
                    return i && t(e.prototype, i), r && t(e, r), e
                }
            }(),
            o = t("dom-classes"),
            a = r(o),
            h = t("dom-create-element"),
            l = r(h),
            c = t("prefix"),
            u = r(c),
            d = t("virtual-scroll"),
            p = r(d),
            f = t("dom-events"),
            _ = r(f),
            g = function() {
                function t() {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    n(this, t),
                    this.createBound(),
                    this.options = e,
                    this.prefix = (0, u.default)("transform"),
                    this.rAF = void 0,
                    this.extends = "Smooth" != this.constructor.name,
                    this.vars = {
                        direction: this.options.direction || "vertical",
                        native: this.options.native || !1,
                        ease: this.options.ease || .075,
                        preload: this.options.preload || !1,
                        current: 0,
                        target: 0,
                        height: window.innerHeight,
                        width: window.innerWidth,
                        bounding: 0,
                        timer: null,
                        ticking: !1
                    },
                    this.vs = this.vars.native ? null : new p.default({
                        limitInertia: this.options.vs && this.options.vs.limitInertia || !1,
                        mouseMultiplier: this.options.vs && this.options.vs.mouseMultiplier || 1,
                        touchMultiplier: this.options.vs && this.options.vs.touchMultiplier || 1.5,
                        firefoxMultiplier: this.options.vs && this.options.vs.firefoxMultiplier || 30,
                        preventTouch: this.options.vs && this.options.vs.preventTouch || !0
                    }),
                    this.dom = {
                        listener: this.options.listener || document.body,
                        section: this.options.section || document.querySelector(".vs-section") || null,
                        scrollbar: this.vars.native || this.options.noscrollbar ? null : {
                            state: {
                                clicked: !1,
                                x: 0
                            },
                            el: (0, l.default)({
                                selector: "div",
                                styles: "vs-scrollbar vs-" + this.vars.direction + " vs-scrollbar-" + this.constructor.name.toLowerCase()
                            }),
                            drag: {
                                el: (0, l.default)({
                                    selector: "div",
                                    styles: "vs-scrolldrag"
                                }),
                                delta: 0,
                                height: 50
                            }
                        }
                    }
                }
                return s(t, [{
                    key: "createBound",
                    value: function t() {
                        var e = this;
                        ["run", "calc", "debounce", "resize", "mouseUp", "mouseDown", "mouseMove", "calcScroll", "scrollTo"].forEach(function(t) {
                            return e[t] = e[t].bind(e)
                        })
                    }
                }, {
                    key: "init",
                    value: function t() {
                        this.addClasses(),
                        this.vars.preload && this.preloadImages(),
                        this.vars.native ? this.addFakeScrollHeight() : !this.options.noscrollbar && this.addFakeScrollBar(),
                        this.addEvents(),
                        this.resize()
                    }
                }, {
                    key: "addClasses",
                    value: function t() {
                        var e = this.vars.native ? "native" : "virtual",
                            i = "vertical" === this.vars.direction ? "y" : "x";
                        a.default.add(this.dom.listener, "is-" + e + "-scroll"),
                        a.default.add(this.dom.listener, i + "-scroll")
                    }
                }, {
                    key: "preloadImages",
                    value: function t() {
                        var e = this,
                            i = Array.prototype.slice.call(this.dom.listener.querySelectorAll("img"), 0);
                        i.forEach(function(t) {
                            var r = document.createElement("img");
                            _.default.once(r, "load", function() {
                                i.splice(i.indexOf(t), 1),
                                0 === i.length && e.resize()
                            }),
                            r.src = t.getAttribute("src")
                        })
                    }
                }, {
                    key: "calc",
                    value: function t(e) {
                        var i = "horizontal" == this.vars.direction ? e.deltaX : e.deltaY;
                        this.vars.target += -1 * i,
                        this.clampTarget()
                    }
                }, {
                    key: "debounce",
                    value: function t() {
                        var e = this,
                            i = this.dom.listener === document.body;
                        this.vars.target = "vertical" === this.vars.direction ? i ? window.scrollY || window.pageYOffset : this.dom.listener.scrollTop : i ? window.scrollX || window.pageXOffset : this.dom.listener.scrollLeft,
                        clearTimeout(this.vars.timer),
                        this.vars.ticking || (this.vars.ticking = !0, a.default.add(this.dom.listener, "is-scrolling")),
                        this.vars.timer = setTimeout(function() {
                            e.vars.ticking = !1,
                            a.default.remove(e.dom.listener, "is-scrolling")
                        }, 200)
                    }
                }, {
                    key: "run",
                    value: function t() {
                        if (this.vars.current += (this.vars.target - this.vars.current) * this.vars.ease, this.vars.current < .1 && (this.vars.current = 0), this.rAF = requestAnimationFrame(this.run), this.extends || (this.dom.section.style[this.prefix] = this.getTransform(-this.vars.current.toFixed(2))), !this.vars.native && !this.options.noscrollbar) {
                            var e = this.dom.scrollbar.drag.height,
                                i = "vertical" === this.vars.direction ? this.vars.height : this.vars.width,
                                r = Math.abs(this.vars.current) / (this.vars.bounding / (i - e)) + e / .5 - e,
                                n = Math.max(0, Math.min(r - e, r + e));
                            this.dom.scrollbar.drag.el.style[this.prefix] = this.getTransform(n.toFixed(2))
                        }
                    }
                }, {
                    key: "getTransform",
                    value: function t(e) {
                        return "vertical" === this.vars.direction ? "translate3d(0," + e + "px,0)" : "translate3d(" + e + "px,0,0)"
                    }
                }, {
                    key: "on",
                    value: function t() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0],
                            i = this.dom.listener === document.body ? window : this.dom.listener;
                        this.vars.native ? _.default.on(i, "scroll", this.debounce) : this.vs && this.vs.on(this.calc),
                        e && this.requestAnimationFrame()
                    }
                }, {
                    key: "off",
                    value: function t() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0],
                            i = this.dom.listener === document.body ? window : this.dom.listener;
                        this.vars.native ? _.default.off(i, "scroll", this.debounce) : this.vs && this.vs.off(this.calc),
                        e && this.cancelAnimationFrame()
                    }
                }, {
                    key: "requestAnimationFrame",
                    value: function(t) {
                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e.toString = function() {
                            return t.toString()
                        }, e
                    }(function() {
                        this.rAF = requestAnimationFrame(this.run)
                    })
                }, {
                    key: "cancelAnimationFrame",
                    value: function(t) {
                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e.toString = function() {
                            return t.toString()
                        }, e
                    }(function() {
                        cancelAnimationFrame(this.rAF)
                    })
                }, {
                    key: "addEvents",
                    value: function t() {
                        this.on(),
                        _.default.on(window, "resize", this.resize)
                    }
                }, {
                    key: "removeEvents",
                    value: function t() {
                        this.off(),
                        _.default.off(window, "resize", this.resize)
                    }
                }, {
                    key: "addFakeScrollBar",
                    value: function t() {
                        this.dom.listener.appendChild(this.dom.scrollbar.el),
                        this.dom.scrollbar.el.appendChild(this.dom.scrollbar.drag.el),
                        _.default.on(this.dom.scrollbar.el, "click", this.calcScroll),
                        _.default.on(this.dom.scrollbar.el, "mousedown", this.mouseDown),
                        _.default.on(document, "mousemove", this.mouseMove),
                        _.default.on(document, "mouseup", this.mouseUp)
                    }
                }, {
                    key: "removeFakeScrollBar",
                    value: function t() {
                        _.default.off(this.dom.scrollbar.el, "click", this.calcScroll),
                        _.default.off(this.dom.scrollbar.el, "mousedown", this.mouseDown),
                        _.default.off(document, "mousemove", this.mouseMove),
                        _.default.off(document, "mouseup", this.mouseUp),
                        this.dom.listener.removeChild(this.dom.scrollbar.el)
                    }
                }, {
                    key: "mouseDown",
                    value: function t(e) {
                        e.preventDefault(),
                        1 == e.which && (this.dom.scrollbar.state.clicked = !0)
                    }
                }, {
                    key: "mouseUp",
                    value: function t(e) {
                        this.dom.scrollbar.state.clicked = !1,
                        a.default.remove(this.dom.listener, "is-dragging")
                    }
                }, {
                    key: "mouseMove",
                    value: function t(e) {
                        this.dom.scrollbar.state.clicked && this.calcScroll(e)
                    }
                }, {
                    key: "addFakeScrollHeight",
                    value: function t() {
                        this.dom.scroll = (0, l.default)({
                            selector: "div",
                            styles: "vs-scroll-view"
                        }),
                        this.dom.listener.appendChild(this.dom.scroll)
                    }
                }, {
                    key: "removeFakeScrollHeight",
                    value: function t() {
                        this.dom.listener.removeChild(this.dom.scroll)
                    }
                }, {
                    key: "calcScroll",
                    value: function t(e) {
                        var i = "vertical" == this.vars.direction ? e.clientY : e.clientX,
                            r = "vertical" == this.vars.direction ? this.vars.height : this.vars.width,
                            n = i * (this.vars.bounding / r);
                        a.default.add(this.dom.listener, "is-dragging"),
                        this.vars.target = n,
                        this.clampTarget(),
                        this.dom.scrollbar && (this.dom.scrollbar.drag.delta = this.vars.target)
                    }
                }, {
                    key: "scrollTo",
                    value: function t(e) {
                        this.vars.native ? "vertical" == this.vars.direction ? window.scrollTo(0, e) : window.scrollTo(e, 0) : (this.vars.target = e, this.clampTarget())
                    }
                }, {
                    key: "resize",
                    value: function t() {
                        var e = "vertical" === this.vars.direction ? "height" : "width";
                        if (this.vars.height = window.innerHeight, this.vars.width = window.innerWidth, !this.extends) {
                            var i = this.dom.section.getBoundingClientRect();
                            this.vars.bounding = "vertical" === this.vars.direction ? i.height - (this.vars.native ? 0 : this.vars.height) : i.right - (this.vars.native ? 0 : this.vars.width)
                        }
                        this.vars.native || this.options.noscrollbar ? this.vars.native ? this.dom.scroll.style[e] = this.vars.bounding + "px" : this.clampTarget() : (this.dom.scrollbar.drag.height = this.vars.height * (this.vars.height / (this.vars.bounding + this.vars.height)), this.dom.scrollbar.drag.el.style[e] = this.dom.scrollbar.drag.height + "px")
                    }
                }, {
                    key: "clampTarget",
                    value: function t() {
                        this.vars.target = Math.round(Math.max(0, Math.min(this.vars.target, this.vars.bounding)))
                    }
                }, {
                    key: "destroy",
                    value: function t() {
                        this.vars.native ? (a.default.remove(this.dom.listener, "is-native-scroll"), this.removeFakeScrollHeight()) : (a.default.remove(this.dom.listener, "is-virtual-scroll"), !this.options.noscrollbar && this.removeFakeScrollBar()),
                        "vertical" === this.vars.direction ? a.default.remove(this.dom.listener, "y-scroll") : a.default.remove(this.dom.listener, "x-scroll"),
                        this.vs && (this.vs.destroy(), this.vs = null),
                        this.removeEvents()
                    }
                }]), t
            }();
        i.default = g,
        window.Smooth = g
    }, {
        "dom-classes": 5,
        "dom-create-element": 6,
        "dom-events": 7,
        prefix: 11,
        "virtual-scroll": 17
    }],
    4: [function(t, e, i) {
        "use strict";
        function r(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var n = Object.prototype.toString,
            s = Object.prototype.hasOwnProperty;
        e.exports = function(t) {
            if (!t)
                return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length)
                for (var i in t)
                    s.call(t, i) && "function" == typeof t[i] && "[object Function]" == n.call(t[i]) && e.push(i);
            for (var o = 0; o < e.length; o++) {
                var a = e[o];
                t[a] = r(t[a], t)
            }
        }
    }, {}],
    5: [function(t, e, i) {
        function r(t) {
            if (t.classList)
                return t.classList;
            var e = t.className.replace(/^\s+|\s+$/g, ""),
                i = e.split(c);
            return "" === i[0] && i.shift(), i
        }
        function n(t, e) {
            if (t.classList)
                return void t.classList.add(e);
            var i = r(t);
            ~l(i, e) || i.push(e),
            t.className = i.join(" ")
        }
        function s(t, e) {
            return t.classList ? t.classList.contains(e) : !!~l(r(t), e)
        }
        function o(t, e) {
            if ("[object RegExp]" == u.call(e))
                return a(t, e);
            if (t.classList)
                return void t.classList.remove(e);
            var i = r(t),
                n = l(i, e);
            ~n && i.splice(n, 1),
            t.className = i.join(" ")
        }
        function a(t, e, i) {
            for (var n = Array.prototype.slice.call(r(t)), s = 0; s < n.length; s++)
                e.test(n[s]) && o(t, n[s])
        }
        function h(t, e) {
            if (t.classList)
                return t.classList.toggle(e);
            s(t, e) ? o(t, e) : n(t, e)
        }
        var l = t("indexof"),
            c = /\s+/,
            u = Object.prototype.toString;
        e.exports = r,
        e.exports.add = n,
        e.exports.contains = s,
        e.exports.has = s,
        e.exports.toggle = h,
        e.exports.remove = o,
        e.exports.removeMatching = a
    }, {
        indexof: 8
    }],
    6: [function(t, e, i) {
        function r(t) {
            t = t || {};
            var e = document.createElement(t.selector);
            if (t.attr)
                for (var i in t.attr)
                    t.attr.hasOwnProperty(i) && e.setAttribute(i, t.attr[i]);
            return "a" == t.selector && t.link && (e.href = t.link, t.target && e.setAttribute("target", t.target)), "img" == t.selector && t.src && (e.src = t.src, t.lazyload && (e.style.opacity = 0, e.onload = function() {
                e.style.opacity = 1
            })), t.id && (e.id = t.id), t.styles && (e.className = t.styles), t.html && (e.innerHTML = t.html), t.children && e.appendChild(t.children), e
        }
        e.exports = r
    }, {}],
    7: [function(t, e, i) {
        var r = t("synthetic-dom-events"),
            n = function(t, e, i, r) {
                return t.addEventListener(e, i, r || !1)
            },
            s = function(t, e, i, r) {
                return t.removeEventListener(e, i, r || !1)
            },
            o = function(t, e, i, r) {
                function o(n) {
                    s(t, e, o, r),
                    i(n)
                }
                n(t, e, o, r)
            },
            a = function(t, e, i) {
                var n = r(e, i);
                t.dispatchEvent(n)
            };
        document.addEventListener || (n = function(t, e, i) {
            return t.attachEvent("on" + e, i)
        }),
        document.removeEventListener || (s = function(t, e, i) {
            return t.detachEvent("on" + e, i)
        }),
        document.dispatchEvent || (a = function(t, e, i) {
            var n = r(e, i);
            return t.fireEvent("on" + n.type, n)
        }),
        e.exports = {
            on: n,
            off: s,
            once: o,
            emit: a
        }
    }, {
        "synthetic-dom-events": 12
    }],
    8: [function(t, e, i) {
        var r = [].indexOf;
        e.exports = function(t, e) {
            if (r)
                return t.indexOf(e);
            for (var i = 0; i < t.length; ++i)
                if (t[i] === e)
                    return i;
            return -1
        }
    }, {}],
    9: [function(t, e, i) {
        (function() {
            var t;
            t = void 0 !== i && null !== i ? i : this,
            t.Lethargy = function() {
                function t(t, e, i, r) {
                    this.stability = null != t ? Math.abs(t) : 8,
                    this.sensitivity = null != e ? 1 + Math.abs(e) : 100,
                    this.tolerance = null != i ? 1 + Math.abs(i) : 1.1,
                    this.delay = null != r ? r : 150,
                    this.lastUpDeltas = function() {
                        var t,
                            e,
                            i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }.call(this),
                    this.lastDownDeltas = function() {
                        var t,
                            e,
                            i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }.call(this),
                    this.deltasTimestamp = function() {
                        var t,
                            e,
                            i;
                        for (i = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--)
                            i.push(null);
                        return i
                    }.call(this)
                }
                return t.prototype.check = function(t) {
                    var e;
                    return t = t.originalEvent || t, null != t.wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : null == t.detail && 0 !== t.detail || (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1));
                    return !1
                }, t.prototype.isInertia = function(t) {
                    var e,
                        i,
                        r,
                        n,
                        s,
                        o,
                        a;
                    return e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas, null === e[0] ? t : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) && (r = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), a = r.reduce(function(t, e) {
                        return t + e
                    }), s = i.reduce(function(t, e) {
                        return t + e
                    }), o = a / r.length, n = s / i.length, Math.abs(o) < Math.abs(n * this.tolerance) && this.sensitivity < Math.abs(n) && t)
                }, t.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }, t.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }, t
            }()
        }).call(this)
    }, {}],
    10: [function(t, e, i) {
        "use strict";
        function r(t) {
            if (null === t || void 0 === t)
                throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }
        var n = Object.prototype.hasOwnProperty,
            s = Object.prototype.propertyIsEnumerable;
        e.exports = Object.assign || function(t, e) {
            for (var i, o = r(t), a, h = 1; h < arguments.length; h++) {
                i = Object(arguments[h]);
                for (var l in i)
                    n.call(i, l) && (o[l] = i[l]);
                if (Object.getOwnPropertySymbols) {
                    a = Object.getOwnPropertySymbols(i);
                    for (var c = 0; c < a.length; c++)
                        s.call(i, a[c]) && (o[a[c]] = i[a[c]])
                }
            }
            return o
        }
    }, {}],
    11: [function(t, e, i) {
        function r(t) {
            if (t = t.replace(/-([a-z])/g, function(t, e) {
                return e.toUpperCase()
            }), void 0 !== o[t])
                return t;
            for (var e = t.charAt(0).toUpperCase() + t.slice(1), i = a.length; i--;) {
                var r = a[i] + e;
                if (void 0 !== o[r])
                    return r
            }
            return t
        }
        function n(t) {
            return t in l ? l[t] : l[t] = r(t)
        }
        function s(t) {
            return t = r(t), h.test(t) && (t = "-" + t.replace(h, "-$1"), h.lastIndex = 0), t.toLowerCase()
        }
        var o = "undefined" != typeof document ? document.createElement("p").style : {},
            a = ["O", "ms", "Moz", "Webkit"],
            h = /([A-Z])/g,
            l = {};
        e.exports = n,
        e.exports.dash = s
    }, {}],
    12: [function(t, e, i) {
        function r(t, e) {
            return t.ctrlKey == (e.ctrlKey || !1) && t.altKey == (e.altKey || !1) && t.shiftKey == (e.shiftKey || !1) && t.metaKey == (e.metaKey || !1) && t.keyCode == (e.keyCode || 0) && t.charCode == (e.charCode || 0) || (t = document.createEvent("Event"), t.initEvent(e.type, e.bubbles, e.cancelable), t.ctrlKey = e.ctrlKey || !1, t.altKey = e.altKey || !1, t.shiftKey = e.shiftKey || !1, t.metaKey = e.metaKey || !1, t.keyCode = e.keyCode || 0, t.charCode = e.charCode || 0), t
        }
        var n = window,
            s = document || {},
            o = s.documentElement || {},
            a = !0;
        try {
            s.createEvent("KeyEvents")
        } catch (t) {
            a = !1
        }
        var h = function(t, e) {
                e = e || {};
                var i = d(t),
                    n = i;
                "KeyboardEvent" === i && a && (i = "KeyEvents", n = "KeyEvent");
                var o = s.createEvent(i),
                    h = "init" + n,
                    l = "function" == typeof o[h] ? h : "initEvent",
                    u = c[l],
                    p = [],
                    f = {};
                e.type = t;
                for (var _ = 0; _ < u.length; ++_) {
                    var g = u[_],
                        m = e[g];
                    void 0 === m && (m = o[g]),
                    f[g] = !0,
                    p.push(m)
                }
                o[l].apply(o, p),
                "KeyboardEvent" === i && (o = r(o, e));
                for (var g in e)
                    f[g] || (o[g] = e[g]);
                return o
            },
            l = function(t, e) {
                e = e || {};
                var i = s.createEventObject();
                i.type = t;
                for (var r in e)
                    void 0 !== e[r] && (i[r] = e[r]);
                return i
            };
        e.exports = s.createEvent ? h : l;
        var c = t("./init.json"),
            u = t("./types.json"),
            d = function() {
                var t = {};
                for (var e in u)
                    for (var i = u[e], r = 0; r < i.length; r++)
                        t[i[r]] = e;
                return function(e) {
                    return t[e] || "Event"
                }
            }()
    }, {
        "./init.json": 13,
        "./types.json": 14
    }],
    13: [function(t, e, i) {
        e.exports = {
            initEvent: ["type", "bubbles", "cancelable"],
            initUIEvent: ["type", "bubbles", "cancelable", "view", "detail"],
            initMouseEvent: ["type", "bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
            initMutationEvent: ["type", "bubbles", "cancelable", "relatedNode", "prevValue", "newValue", "attrName", "attrChange"],
            initKeyboardEvent: ["type", "bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
            initKeyEvent: ["type", "bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"]
        }
    }, {}],
    14: [function(t, e, i) {
        e.exports = {
            MouseEvent: ["click", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout"],
            KeyboardEvent: ["keydown", "keyup", "keypress"],
            MutationEvent: ["DOMSubtreeModified", "DOMNodeInserted", "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMNodeInsertedIntoDocument", "DOMAttrModified", "DOMCharacterDataModified"],
            HTMLEvents: ["load", "unload", "abort", "error", "select", "change", "submit", "reset", "focus", "blur", "resize", "scroll"],
            UIEvent: ["DOMFocusIn", "DOMFocusOut", "DOMActivate"]
        }
    }, {}],
    15: [function(t, e, i) {
        function r() {}
        r.prototype = {
            on: function(t, e, i) {
                var r = this.e || (this.e = {});
                return (r[t] || (r[t] = [])).push({
                    fn: e,
                    ctx: i
                }), this
            },
            once: function(t, e, i) {
                function r() {
                    n.off(t, r),
                    e.apply(i, arguments)
                }
                var n = this;
                return r._ = e, this.on(t, r, i)
            },
            emit: function(t) {
                var e = [].slice.call(arguments, 1),
                    i = ((this.e || (this.e = {}))[t] || []).slice(),
                    r = 0,
                    n = i.length;
                for (r; r < n; r++)
                    i[r].fn.apply(i[r].ctx, e);
                return this
            },
            off: function(t, e) {
                var i = this.e || (this.e = {}),
                    r = i[t],
                    n = [];
                if (r && e)
                    for (var s = 0, o = r.length; s < o; s++)
                        r[s].fn !== e && r[s].fn._ !== e && n.push(r[s]);
                return n.length ? i[t] = n : delete i[t], this
            }
        },
        e.exports = r
    }, {}],
    16: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return JSON.parse(JSON.stringify(t))
        }
    }, {}],
    17: [function(t, e, i) {
        "use strict";
        function r(t) {
            l(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"),
            this.el = window,
            t && t.el && (this.el = t.el, delete t.el),
            this.options = n({
                mouseMultiplier: 1,
                touchMultiplier: 2,
                firefoxMultiplier: 15,
                keyStep: 120,
                preventTouch: !1,
                unpreventTouchClass: "vs-touchmove-allowed",
                limitInertia: !1
            }, t),
            this.options.limitInertia && (this._lethargy = new o),
            this._emitter = new s,
            this._event = {
                y: 0,
                x: 0,
                deltaX: 0,
                deltaY: 0
            },
            this.touchStartX = null,
            this.touchStartY = null,
            this.bodyTouchAction = null
        }
        var n = t("object-assign"),
            s = t("tiny-emitter"),
            o = t("lethargy").Lethargy,
            a = t("./support"),
            h = t("./clone"),
            l = t("bindall-standalone"),
            c = "virtualscroll";
        e.exports = r;
        var u = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
        r.prototype._notify = function(t) {
            var e = this._event;
            e.x += e.deltaX,
            e.y += e.deltaY,
            this._emitter.emit(c, {
                x: e.x,
                y: e.y,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                originalEvent: t
            })
        },
        r.prototype._onWheel = function(t) {
            var e = this.options;
            if (!this._lethargy || !1 !== this._lethargy.check(t)) {
                var i = this._event;
                i.deltaX = t.wheelDeltaX || -1 * t.deltaX,
                i.deltaY = t.wheelDeltaY || -1 * t.deltaY,
                a.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier),
                i.deltaX *= e.mouseMultiplier,
                i.deltaY *= e.mouseMultiplier,
                this._notify(t)
            }
        },
        r.prototype._onMouseWheel = function(t) {
            if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
                var e = this._event;
                e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0,
                e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta,
                this._notify(t)
            }
        },
        r.prototype._onTouchStart = function(t) {
            var e = t.targetTouches ? t.targetTouches[0] : t;
            this.touchStartX = e.pageX,
            this.touchStartY = e.pageY
        },
        r.prototype._onTouchMove = function(t) {
            var e = this.options;
            e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
            var i = this._event,
                r = t.targetTouches ? t.targetTouches[0] : t;
            i.deltaX = (r.pageX - this.touchStartX) * e.touchMultiplier,
            i.deltaY = (r.pageY - this.touchStartY) * e.touchMultiplier,
            this.touchStartX = r.pageX,
            this.touchStartY = r.pageY,
            this._notify(t)
        },
        r.prototype._onKeyDown = function(t) {
            var e = this._event;
            switch (e.deltaX = e.deltaY = 0, t.keyCode) {
            case u.LEFT:
            case u.UP:
                e.deltaY = this.options.keyStep;
                break;
            case u.RIGHT:
            case u.DOWN:
                e.deltaY = -this.options.keyStep;
                break;
            default:
                return
            }
            this._notify(t)
        },
        r.prototype._bind = function() {
            a.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel),
            a.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel),
            a.hasTouch && (this.el.addEventListener("touchstart", this._onTouchStart), this.el.addEventListener("touchmove", this._onTouchMove)),
            a.hasPointer && a.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.el.addEventListener("MSPointerDown", this._onTouchStart, !0), this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
            a.hasKeyDown && document.addEventListener("keydown", this._onKeyDown)
        },
        r.prototype._unbind = function() {
            a.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
            a.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
            a.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)),
            a.hasPointer && a.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
            a.hasKeyDown && document.removeEventListener("keydown", this._onKeyDown)
        },
        r.prototype.on = function(t, e) {
            this._emitter.on(c, t, e);
            var i = this._emitter.e;
            i && i[c] && 1 === i[c].length && this._bind()
        },
        r.prototype.off = function(t, e) {
            this._emitter.off(c, t, e);
            var i = this._emitter.e;
            (!i[c] || i[c].length <= 0) && this._unbind()
        },
        r.prototype.reset = function() {
            var t = this._event;
            t.x = 0,
            t.y = 0
        },
        r.prototype.destroy = function() {
            this._emitter.off(),
            this._unbind()
        }
    }, {
        "./clone": 16,
        "./support": 18,
        "bindall-standalone": 4,
        lethargy: 9,
        "object-assign": 10,
        "tiny-emitter": 15
    }],
    18: [function(t, e, i) {
        "use strict";
        e.exports = function t() {
            return {
                hasWheelEvent: "onwheel" in document,
                hasMouseWheelEvent: "onmousewheel" in document,
                hasTouch: "ontouchstart" in document,
                hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: "onkeydown" in document,
                isFirefox: navigator.userAgent.indexOf("Firefox") > -1
            }
        }()
    }, {}]
}, {}, [2]); /*!
 * VERSION: 1.16.0
 * DATE: 2015-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/












var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var r = function(t) {
                var e,
                    i = [],
                    r = t.length;
                for (e = 0; e !== r; i.push(t[e++]))
                    ;
                return i
            },
            n = function(t, e, r) {
                i.call(this, t, e, r),
                this._cycle = 0,
                this._yoyo = !0 === this.vars.yoyo,
                this._repeat = this.vars.repeat || 0,
                this._repeatDelay = this.vars.repeatDelay || 0,
                this._dirty = !0,
                this.render = n.prototype.render
            },
            s = 1e-10,
            o = i._internals,
            a = o.isSelector,
            h = o.isArray,
            l = n.prototype = i.to({}, .1, {}),
            c = [];
        n.version = "1.16.0",
        l.constructor = n,
        l.kill()._gc = !1,
        n.killTweensOf = n.killDelayedCallsTo = i.killTweensOf,
        n.getTweensOf = i.getTweensOf,
        n.lagSmoothing = i.lagSmoothing,
        n.ticker = i.ticker,
        n.render = i.render,
        l.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
        },
        l.updateTo = function(t, e) {
            var r,
                n = this.ratio,
                s = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (r in t)
                this.vars[r] = t[r];
            if (this._initted || s)
                if (e)
                    this._initted = !1,
                    s && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                    var o = this._time;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(o, !0, !1)
                } else if (this._time > 0 || s) {
                    this._initted = !1,
                    this._init();
                    for (var a, h = 1 / (1 - n), l = this._firstPT; l;)
                        a = l.s + l.c,
                        l.c *= h,
                        l.s = a - l.c,
                        l = l._next
                }
            return this
        },
        l.render = function(t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var r,
                n,
                a,
                h,
                l,
                u,
                d,
                p,
                f = this._dirty ? this.totalDuration() : this._totalDuration,
                _ = this._time,
                g = this._totalTime,
                m = this._cycle,
                v = this._duration,
                y = this._rawPrevTime;
            if (t >= f ? (this._totalTime = f, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, n = "onComplete"), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > y || y === s) && y !== t && (i = !0, y > s && (n = "onReverseComplete")), this._rawPrevTime = p = !e || t || y === t ? t : s)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === v && y > 0) && (n = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = p = !e || t || y === t ? t : s)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = v + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 != (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (l = this._time / v, u = this._easeType, d = this._easePower, (1 === u || 3 === u && l >= .5) && (l = 1 - l), 3 === u && (l *= 2), 1 === d ? l *= l : 2 === d ? l *= l * l : 3 === d ? l *= l * l * l : 4 === d && (l *= l * l * l * l), this.ratio = 1 === u ? 1 - l : 2 === u ? l : .5 > this._time / v ? l / 2 : 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), _ === this._time && !i && m === this._cycle)
                return void (g !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c)));
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc)
                    return;
                if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                    return this._time = _, this._totalTime = g, this._rawPrevTime = y, this._cycle = m, o.lazyTweens.push(this), void (this._lazy = [t, e]);
                this._time && !r ? this.ratio = this._ease.getRatio(this._time / v) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== _ && t >= 0 && (this._active = !0), 0 === g && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || c))), a = this._firstPT; a;)
                a.f ? a.t[a.p](a.c * this.ratio + a.s) : a.t[a.p] = a.c * this.ratio + a.s,
                a = a._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== g || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || c)),
            this._cycle !== m && (e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || c)),
            n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || c), 0 === v && this._rawPrevTime === s && p !== s && (this._rawPrevTime = 0))
        },
        n.to = function(t, e, i) {
            return new n(t, e, i)
        },
        n.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new n(t, e, i)
        },
        n.fromTo = function(t, e, i, r) {
            return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new n(t, e, r)
        },
        n.staggerTo = n.allTo = function(t, e, s, o, l, u, d) {
            o = o || 0;
            var p,
                f,
                _,
                g,
                m = s.delay || 0,
                v = [],
                y = function() {
                    s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments),
                    l.apply(d || this, u || c)
                };
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = r(t))), t = t || [], 0 > o && (t = r(t), t.reverse(), o *= -1), p = t.length - 1, _ = 0; p >= _; _++) {
                f = {};
                for (g in s)
                    f[g] = s[g];
                f.delay = m,
                _ === p && l && (f.onComplete = y),
                v[_] = new n(t[_], e, f),
                m += o
            }
            return v
        },
        n.staggerFrom = n.allFrom = function(t, e, i, r, s, o, a) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, n.staggerTo(t, e, i, r, s, o, a)
        },
        n.staggerFromTo = n.allFromTo = function(t, e, i, r, s, o, a, h) {
            return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, n.staggerTo(t, e, r, s, o, a, h)
        },
        n.delayedCall = function(t, e, i, r, s) {
            return new n(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: r,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: r,
                immediateRender: !1,
                useFrames: s,
                overwrite: 0
            })
        },
        n.set = function(t, e) {
            return new n(t, 0, e)
        },
        n.isTweening = function(t) {
            return i.getTweensOf(t, !0).length > 0
        };
        var u = function(t, e) {
                for (var r = [], n = 0, s = t._first; s;)
                    s instanceof i ? r[n++] = s : (e && (r[n++] = s), r = r.concat(u(s, e)), n = r.length),
                    s = s._next;
                return r
            },
            d = n.getAllTweens = function(e) {
                return u(t._rootTimeline, e).concat(u(t._rootFramesTimeline, e))
            };
        n.killAll = function(t, i, r, n) {
            null == i && (i = !0),
            null == r && (r = !0);
            var s,
                o,
                a,
                h = d(0 != n),
                l = h.length,
                c = i && r && n;
            for (a = 0; l > a; a++)
                o = h[a],
                (c || o instanceof e || (s = o.target === o.vars.onComplete) && r || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
        },
        n.killChildTweensOf = function(t, e) {
            if (null != t) {
                var s,
                    l,
                    c,
                    u,
                    d,
                    p = o.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = r(t)), h(t))
                    for (u = t.length; --u > -1;)
                        n.killChildTweensOf(t[u], e);
                else {
                    s = [];
                    for (c in p)
                        for (l = p[c].target.parentNode; l;)
                            l === t && (s = s.concat(p[c].tweens)),
                            l = l.parentNode;
                    for (d = s.length, u = 0; d > u; u++)
                        e && s[u].totalTime(s[u].totalDuration()),
                        s[u]._enabled(!1, !1)
                }
            }
        };
        var p = function(t, i, r, n) {
            i = !1 !== i,
            r = !1 !== r,
            n = !1 !== n;
            for (var s, o, a = d(n), h = i && r && n, l = a.length; --l > -1;)
                o = a[l],
                (h || o instanceof e || (s = o.target === o.vars.onComplete) && r || i && !s) && o.paused(t)
        };
        return n.pauseAll = function(t, e, i) {
            p(!0, t, e, i)
        }, n.resumeAll = function(t, e, i) {
            p(!1, t, e, i)
        }, n.globalTimeScale = function(e) {
            var r = t._rootTimeline,
                n = i.ticker.time;
            return arguments.length ? (e = e || s, r._startTime = n - (n - r._startTime) * r._timeScale / e, r = t._rootFramesTimeline, n = i.ticker.frame, r._startTime = n - (n - r._startTime) * r._timeScale / e, r._timeScale = t._rootTimeline._timeScale = e, e) : r._timeScale
        }, l.progress = function(t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, l.totalProgress = function(t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }, l.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, l.duration = function(e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }, l.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, l.repeat = function(t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, l.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, l.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, n
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var r = function(t) {
                e.call(this, t),
                this._labels = {},
                this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren,
                this.smoothChildTiming = !0 === this.vars.smoothChildTiming,
                this._sortChildren = !0,
                this._onUpdate = this.vars.onUpdate;
                var i,
                    r,
                    n = this.vars;
                for (r in n)
                    i = n[r],
                    h(i) && -1 !== i.join("").indexOf("{self}") && (n[r] = this._swapSelfInParams(i));
                h(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
            },
            n = 1e-10,
            s = i._internals,
            o = r._internals = {},
            a = s.isSelector,
            h = s.isArray,
            l = s.lazyTweens,
            c = s.lazyRender,
            u = [],
            d = _gsScope._gsDefine.globals,
            p = function(t) {
                var e,
                    i = {};
                for (e in t)
                    i[e] = t[e];
                return i
            },
            f = o.pauseCallback = function(t, e, i, r) {
                var s,
                    o = t._timeline,
                    a = o._totalTime,
                    h = t._startTime,
                    l = t.ratio ? n : 0,
                    c = t.ratio ? 0 : n;
                if (e || !this._forcingPlayhead) {
                    for (o.pause(h), s = t._prev; s && s._startTime === h;)
                        s._rawPrevTime = c,
                        s = s._prev;
                    for (s = t._next; s && s._startTime === h;)
                        s._rawPrevTime = l,
                        s = s._next;
                    e && e.apply(r || o, i || u),
                    this._forcingPlayhead && o.seek(a)
                }
            },
            _ = function(t) {
                var e,
                    i = [],
                    r = t.length;
                for (e = 0; e !== r; i.push(t[e++]))
                    ;
                return i
            },
            g = r.prototype = new e;
        return r.version = "1.16.0", g.constructor = r, g.kill()._gc = g._forcingPlayhead = !1, g.to = function(t, e, r, n) {
            var s = r.repeat && d.TweenMax || i;
            return e ? this.add(new s(t, e, r), n) : this.set(t, r, n)
        }, g.from = function(t, e, r, n) {
            return this.add((r.repeat && d.TweenMax || i).from(t, e, r), n)
        }, g.fromTo = function(t, e, r, n, s) {
            var o = n.repeat && d.TweenMax || i;
            return e ? this.add(o.fromTo(t, e, r, n), s) : this.set(t, n, s)
        }, g.staggerTo = function(t, e, n, s, o, h, l, c) {
            var u,
                d = new r({
                    onComplete: h,
                    onCompleteParams: l,
                    onCompleteScope: c,
                    smoothChildTiming: this.smoothChildTiming
                });
            for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = _(t)), s = s || 0, 0 > s && (t = _(t), t.reverse(), s *= -1), u = 0; t.length > u; u++)
                n.startAt && (n.startAt = p(n.startAt)),
                d.to(t[u], e, p(n), u * s);
            return this.add(d, o)
        }, g.staggerFrom = function(t, e, i, r, n, s, o, a) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, r, n, s, o, a)
        }, g.staggerFromTo = function(t, e, i, r, n, s, o, a, h) {
            return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, r, n, s, o, a, h)
        }, g.call = function(t, e, r, n) {
            return this.add(i.delayedCall(0, t, e, r), n)
        }, g.set = function(t, e, r) {
            return r = this._parseTimeOrLabel(r, 0, !0), null == e.immediateRender && (e.immediateRender = r === this._time && !this._paused), this.add(new i(t, 0, e), r)
        }, r.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var n,
                s,
                o = new r(t),
                a = o._timeline;
            for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, n = a._first; n;)
                s = n._next,
                e && n instanceof i && n.target === n.vars.onComplete || o.add(n, n._startTime - n._delay),
                n = s;
            return a.add(o, 0), o
        }, g.add = function(n, s, o, a) {
            var l,
                c,
                u,
                d,
                p,
                f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, n)), !(n instanceof t)) {
                if (n instanceof Array || n && n.push && h(n)) {
                    for (o = o || "normal", a = a || 0, l = s, c = n.length, u = 0; c > u; u++)
                        h(d = n[u]) && (d = new r({
                            tweens: d
                        })),
                        this.add(d, l),
                        "string" != typeof d && "function" != typeof d && ("sequence" === o ? l = d._startTime + d.totalDuration() / d._timeScale : "start" === o && (d._startTime -= d.delay())),
                        l += a;
                    return this._uncache(!0)
                }
                if ("string" == typeof n)
                    return this.addLabel(n, s);
                if ("function" != typeof n)
                    throw "Cannot add " + n + " into the timeline; it is not a tween, timeline, function, or string.";
                n = i.delayedCall(0, n)
            }
            if (e.prototype.add.call(this, n, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (p = this, f = p.rawTime() > n._startTime; p._timeline;)
                    f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1),
                    p = p._timeline;
            return this
        }, g.remove = function(e) {
            if (e instanceof t)
                return this._remove(e, !1);
            if (e instanceof Array || e && e.push && h(e)) {
                for (var i = e.length; --i > -1;)
                    this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, g._remove = function(t, i) {
            e.prototype._remove.call(this, t, i);
            var r = this._last;
            return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, g.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, g.insert = g.insertMultiple = function(t, e, i, r) {
            return this.add(t, e || 0, i, r)
        }, g.appendMultiple = function(t, e, i, r) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, r)
        }, g.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, g.addPause = function(t, e, r, n) {
            var s = i.delayedCall(0, f, ["{self}", e, r, n], this);
            return s.data = "isPause", this.add(s, t)
        }, g.removeLabel = function(t) {
            return delete this._labels[t], this
        }, g.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, g._parseTimeOrLabel = function(e, i, r, n) {
            var s;
            if (n instanceof t && n.timeline === this)
                this.remove(n);
            else if (n && (n instanceof Array || n.push && h(n)))
                for (s = n.length; --s > -1;)
                    n[s] instanceof t && n[s].timeline === this && this.remove(n[s]);
            if ("string" == typeof i)
                return this._parseTimeOrLabel(i, r && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, r);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = this.duration());
            else {
                if (-1 === (s = e.indexOf("=")))
                    return null == this._labels[e] ? r ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)),
                e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, r) : this.duration()
            }
            return Number(e) + i
        }, g.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }, g.stop = function() {
            return this.paused(!0)
        }, g.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }, g.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }, g.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var r,
                s,
                o,
                a,
                h,
                d = this._dirty ? this.totalDuration() : this._totalDuration,
                p = this._time,
                f = this._startTime,
                _ = this._timeScale,
                g = this._paused;
            if (t >= d)
                this._totalTime = this._time = d,
                this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === n) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > n && (a = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n,
                t = d + 1e-4;
            else if (1e-7 > t)
                if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== n && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (h = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, 0 === t && s)
                        for (r = this._first; r && 0 === r._startTime;)
                            r._duration || (s = !1),
                            r = r._next;
                    t = 0,
                    this._initted || (h = !0)
                }
            else
                this._totalTime = this._time = this._rawPrevTime = t;
            if (this._time !== p && this._first || i || h) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u)), this._time >= p)
                    for (r = this._first; r && (o = r._next, !this._paused || g);)
                        (r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                        r = o;
                else
                    for (r = this._last; r && (o = r._prev, !this._paused || g);)
                        (r._active || p >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                        r = o;
                this._onUpdate && (e || (l.length && c(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u))),
                a && (this._gc || (f === this._startTime || _ !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (s && (l.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this.vars[a].apply(this.vars[a + "Scope"] || this, this.vars[a + "Params"] || u)))
            }
        }, g._hasPausedChild = function() {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof r && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }, g.getChildren = function(t, e, r, n) {
            n = n || -9999999999;
            for (var s = [], o = this._first, a = 0; o;)
                n > o._startTime || (o instanceof i ? !1 !== e && (s[a++] = o) : (!1 !== r && (s[a++] = o), !1 !== t && (s = s.concat(o.getChildren(!0, e, r)), a = s.length))),
                o = o._next;
            return s
        }, g.getTweensOf = function(t, e) {
            var r,
                n,
                s = this._gc,
                o = [],
                a = 0;
            for (s && this._enabled(!0, !0), r = i.getTweensOf(t), n = r.length; --n > -1;)
                (r[n].timeline === this || e && this._contains(r[n])) && (o[a++] = r[n]);
            return s && this._enabled(!1, !0), o
        }, g.recent = function() {
            return this._recent
        }, g._contains = function(t) {
            for (var e = t.timeline; e;) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }, g.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var r, n = this._first, s = this._labels; n;)
                n._startTime >= i && (n._startTime += t),
                n = n._next;
            if (e)
                for (r in s)
                    s[r] >= i && (s[r] += t);
            return this._uncache(!0)
        }, g._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), r = i.length, n = !1; --r > -1;)
                i[r]._kill(t, e) && (n = !0);
            return n
        }, g.clear = function(t) {
            var e = this.getChildren(!1, !0, !0),
                i = e.length;
            for (this._time = this._totalTime = 0; --i > -1;)
                e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0)
        }, g.invalidate = function() {
            for (var e = this._first; e;)
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }, g._enabled = function(t, i) {
            if (t === this._gc)
                for (var r = this._first; r;)
                    r._enabled(t, !0),
                    r = r._next;
            return e.prototype._enabled.call(this, t, i)
        }, g.totalTime = function() {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, g.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, g.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, r = 0, n = this._last, s = 999999999999; n;)
                        e = n._prev,
                        n._dirty && n.totalDuration(),
                        n._startTime > s && this._sortChildren && !n._paused ? this.add(n, n._startTime - n._delay) : s = n._startTime,
                        0 > n._startTime && !n._paused && (r -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale), this.shiftChildren(-n._startTime, !1, -9999999999), s = 0),
                        i = n._startTime + n._totalDuration / n._timeScale,
                        i > r && (r = i),
                        n = e;
                    this._duration = this._totalDuration = r,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
        }, g.paused = function(e) {
            if (!e)
                for (var i = this._first, r = this._time; i;)
                    i._startTime === r && "isPause" === i.data && (i._rawPrevTime = r),
                    i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }, g.usesFrames = function() {
            for (var e = this._timeline; e._timeline;)
                e = e._timeline;
            return e === t._rootFramesTimeline
        }, g.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, r
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
        var r = function(e) {
                t.call(this, e),
                this._repeat = this.vars.repeat || 0,
                this._repeatDelay = this.vars.repeatDelay || 0,
                this._cycle = 0,
                this._yoyo = !0 === this.vars.yoyo,
                this._dirty = !0
            },
            n = 1e-10,
            s = [],
            o = e._internals,
            a = o.lazyTweens,
            h = o.lazyRender,
            l = new i(null, null, 1, 0),
            c = r.prototype = new t;
        return c.constructor = r, c.kill()._gc = !1, r.version = "1.16.0", c.invalidate = function() {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
        }, c.addCallback = function(t, i, r, n) {
            return this.add(e.delayedCall(0, t, r, n), i)
        }, c.removeCallback = function(t, e) {
            if (t)
                if (null == e)
                    this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), r = i.length, n = this._parseTimeOrLabel(e); --r > -1;)
                        i[r]._startTime === n && i[r]._enabled(!1, !1);
            return this
        }, c.removePause = function(e) {
            return this.removeCallback(t._internals.pauseCallback, e)
        }, c.tweenTo = function(t, i) {
            i = i || {};
            var r,
                n,
                o,
                a = {
                    ease: l,
                    useFrames: this.usesFrames(),
                    immediateRender: !1
                };
            for (n in i)
                a[n] = i[n];
            return a.time = this._parseTimeOrLabel(t), r = Math.abs(Number(a.time) - this._time) / this._timeScale || .001, o = new e(this, r, a), a.onStart = function() {
                o.target.paused(!0),
                o.vars.time !== o.target.time() && r === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale),
                i.onStart && i.onStart.apply(i.onStartScope || o, i.onStartParams || s)
            }, o
        }, c.tweenFromTo = function(t, e, i) {
            i = i || {},
            t = this._parseTimeOrLabel(t),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                onCompleteScope: this
            },
            i.immediateRender = !1 !== i.immediateRender;
            var r = this.tweenTo(e, i);
            return r.duration(Math.abs(r.vars.time - t) / this._timeScale || .001)
        }, c.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var r,
                o,
                l,
                c,
                u,
                d,
                p = this._dirty ? this.totalDuration() : this._totalDuration,
                f = this._duration,
                _ = this._time,
                g = this._totalTime,
                m = this._startTime,
                v = this._timeScale,
                y = this._rawPrevTime,
                x = this._paused,
                b = this._cycle;
            if (t >= p)
                this._locked || (this._totalTime = p, this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (o = !0, c = "onComplete", 0 === this._duration && (0 === t || 0 > y || y === n) && y !== t && this._first && (u = !0, y > n && (c = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n,
                this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4);
            else if (1e-7 > t)
                if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== _ || 0 === f && y !== n && (y > 0 || 0 > t && y >= 0) && !this._locked) && (c = "onReverseComplete", o = this._reversed), 0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (u = o = !0, c = "onReverseComplete") : y >= 0 && this._first && (u = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : n, 0 === t && o)
                        for (r = this._first; r && 0 === r._startTime;)
                            r._duration || (o = !1),
                            r = r._next;
                    t = 0,
                    this._initted || (u = !0)
                }
            else
                0 === f && 0 > y && (u = !0),
                this._time = this._rawPrevTime = t,
                this._locked || (this._totalTime = t, 0 !== this._repeat && (d = f + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 != (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time));
            if (this._cycle !== b && !this._locked) {
                var T = this._yoyo && 0 != (1 & b),
                    w = T === (this._yoyo && 0 != (1 & this._cycle)),
                    S = this._totalTime,
                    E = this._cycle,
                    A = this._rawPrevTime,
                    R = this._time;
                if (this._totalTime = b * f, b > this._cycle ? T = !T : this._totalTime += f, this._time = _, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = b, this._locked = !0, _ = T ? 0 : f, this.render(_, e, 0 === f), e || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s), w && (_ = T ? f + 1e-4 : -1e-4, this.render(_, !0, !1)), this._locked = !1, this._paused && !x)
                    return;
                this._time = R,
                this._totalTime = S,
                this._cycle = E,
                this._rawPrevTime = A
            }
            if (!(this._time !== _ && this._first || i || u))
                return void (g !== this._totalTime && this._onUpdate && (e || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= _)
                for (r = this._first; r && (l = r._next, !this._paused || x);)
                    (r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                    r = l;
            else
                for (r = this._last; r && (l = r._prev, !this._paused || x);)
                    (r._active || _ >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)),
                    r = l;
            this._onUpdate && (e || (a.length && h(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s))),
            c && (this._locked || this._gc || (m === this._startTime || v !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (o && (a.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[c] && this.vars[c].apply(this.vars[c + "Scope"] || this, this.vars[c + "Params"] || s)))
        }, c.getActive = function(t, e, i) {
            null == t && (t = !0),
            null == e && (e = !0),
            null == i && (i = !1);
            var r,
                n,
                s = [],
                o = this.getChildren(t, e, i),
                a = 0,
                h = o.length;
            for (r = 0; h > r; r++)
                n = o[r],
                n.isActive() && (s[a++] = n);
            return s
        }, c.getLabelAfter = function(t) {
            t || 0 !== t && (t = this._time);
            var e,
                i = this.getLabelsArray(),
                r = i.length;
            for (e = 0; r > e; e++)
                if (i[e].time > t)
                    return i[e].name;
            return null
        }, c.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                if (t > e[i].time)
                    return e[i].name;
            return null
        }, c.getLabelsArray = function() {
            var t,
                e = [],
                i = 0;
            for (t in this._labels)
                e[i++] = {
                    time: this._labels[t],
                    name: t
                };
            return e.sort(function(t, e) {
                return t.time - e.time
            }), e
        }, c.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, c.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, c.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, c.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, c.repeat = function(t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, c.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, c.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, c.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, r
    }, !0),
    function() {
        var t = 180 / Math.PI,
            e = [],
            i = [],
            r = [],
            n = {},
            s = _gsScope._gsDefine.globals,
            o = function(t, e, i, r) {
                this.a = t,
                this.b = e,
                this.c = i,
                this.d = r,
                this.da = r - t,
                this.ca = i - t,
                this.ba = e - t
            },
            a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            h = function(t, e, i, r) {
                var n = {
                        a: t
                    },
                    s = {},
                    o = {},
                    a = {
                        c: r
                    },
                    h = (t + e) / 2,
                    l = (e + i) / 2,
                    c = (i + r) / 2,
                    u = (h + l) / 2,
                    d = (l + c) / 2,
                    p = (d - u) / 8;
                return n.b = h + (t - h) / 4, s.b = u + p, n.c = s.a = (n.b + s.b) / 2, s.c = o.a = (u + d) / 2, o.b = d - p, a.b = c + (r - c) / 4, o.c = a.a = (o.b + a.b) / 2, [n, s, o, a]
            },
            l = function(t, n, s, o, a) {
                var l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _,
                    g,
                    m,
                    v,
                    y,
                    x,
                    b,
                    T = t.length - 1,
                    w = 0,
                    S = t[0].a;
                for (l = 0; T > l; l++)
                    p = t[w],
                    c = p.a,
                    u = p.d,
                    d = t[w + 1].d,
                    a ? (y = e[l], x = i[l], b = .25 * (x + y) * n / (o ? .5 : r[l] || .5), f = u - (u - c) * (o ? .5 * n : 0 !== y ? b / y : 0), _ = u + (d - u) * (o ? .5 * n : 0 !== x ? b / x : 0), g = u - (f + ((_ - f) * (3 * y / (y + x) + .5) / 4 || 0))) : (f = u - .5 * (u - c) * n, _ = u + .5 * (d - u) * n, g = u - (f + _) / 2),
                    f += g,
                    _ += g,
                    p.c = m = f,
                    p.b = 0 !== l ? S : S = p.a + .6 * (p.c - p.a),
                    p.da = u - c,
                    p.ca = m - c,
                    p.ba = S - c,
                    s ? (v = h(c, S, m, u), t.splice(w, 1, v[0], v[1], v[2], v[3]), w += 4) : w++,
                    S = _;
                p = t[w],
                p.b = S,
                p.c = S + .4 * (p.d - S),
                p.da = p.d - p.a,
                p.ca = p.c - p.a,
                p.ba = S - p.a,
                s && (v = h(p.a, S, p.c, p.d), t.splice(w, 1, v[0], v[1], v[2], v[3]))
            },
            c = function(t, r, n, s) {
                var a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p = [];
                if (s)
                    for (t = [s].concat(t), h = t.length; --h > -1;)
                        "string" == typeof (d = t[h][r]) && "=" === d.charAt(1) && (t[h][r] = s[r] + Number(d.charAt(0) + d.substr(2)));
                if (0 > (a = t.length - 2))
                    return p[0] = new o(t[0][r], 0, 0, t[-1 > a ? 0 : 1][r]), p;
                for (h = 0; a > h; h++)
                    l = t[h][r],
                    c = t[h + 1][r],
                    p[h] = new o(l, 0, 0, c),
                    n && (u = t[h + 2][r], e[h] = (e[h] || 0) + (c - l) * (c - l), i[h] = (i[h] || 0) + (u - c) * (u - c));
                return p[h] = new o(t[h][r], 0, 0, t[h + 1][r]), p
            },
            u = function(t, s, o, h, u, d) {
                var p,
                    f,
                    _,
                    g,
                    m,
                    v,
                    y,
                    x,
                    b = {},
                    T = [],
                    w = d || t[0];
                u = "string" == typeof u ? "," + u + "," : a,
                null == s && (s = 1);
                for (f in t[0])
                    T.push(f);
                if (t.length > 1) {
                    for (x = t[t.length - 1], y = !0, p = T.length; --p > -1;)
                        if (f = T[p], Math.abs(w[f] - x[f]) > .05) {
                            y = !1;
                            break
                        }
                    y && (t = t.concat(), d && t.unshift(d), t.push(t[1]), d = t[t.length - 3])
                }
                for (e.length = i.length = r.length = 0, p = T.length; --p > -1;)
                    f = T[p],
                    n[f] = -1 !== u.indexOf("," + f + ","),
                    b[f] = c(t, f, n[f], d);
                for (p = e.length; --p > -1;)
                    e[p] = Math.sqrt(e[p]),
                    i[p] = Math.sqrt(i[p]);
                if (!h) {
                    for (p = T.length; --p > -1;)
                        if (n[f])
                            for (_ = b[T[p]], v = _.length - 1, g = 0; v > g; g++)
                                m = _[g + 1].da / i[g] + _[g].da / e[g],
                                r[g] = (r[g] || 0) + m * m;
                    for (p = r.length; --p > -1;)
                        r[p] = Math.sqrt(r[p])
                }
                for (p = T.length, g = o ? 4 : 1; --p > -1;)
                    f = T[p],
                    _ = b[f],
                    l(_, s, o, h, n[f]),
                    y && (_.splice(0, g), _.splice(_.length - g, g));
                return b
            },
            d = function(t, e, i) {
                e = e || "soft";
                var r,
                    n,
                    s,
                    a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _ = {},
                    g = "cubic" === e ? 3 : 2,
                    m = "soft" === e,
                    v = [];
                if (m && i && (t = [i].concat(t)), null == t || g + 1 > t.length)
                    throw "invalid Bezier data";
                for (d in t[0])
                    v.push(d);
                for (l = v.length; --l > -1;) {
                    for (d = v[l], _[d] = h = [], p = 0, u = t.length, c = 0; u > c; c++)
                        r = null == i ? t[c][d] : "string" == typeof (f = t[c][d]) && "=" === f.charAt(1) ? i[d] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                        m && c > 1 && u - 1 > c && (h[p++] = (r + h[p - 2]) / 2),
                        h[p++] = r;
                    for (u = p - g + 1, p = 0, c = 0; u > c; c += g)
                        r = h[c],
                        n = h[c + 1],
                        s = h[c + 2],
                        a = 2 === g ? 0 : h[c + 3],
                        h[p++] = f = 3 === g ? new o(r, n, s, a) : new o(r, (2 * n + r) / 3, (2 * n + s) / 3, s);
                    h.length = p
                }
                return _
            },
            p = function(t, e, i) {
                for (var r, n, s, o, a, h, l, c, u, d, p, f = 1 / i, _ = t.length; --_ > -1;)
                    for (d = t[_], s = d.a, o = d.d - s, a = d.c - s, h = d.b - s, r = n = 0, c = 1; i >= c; c++)
                        l = f * c,
                        u = 1 - l,
                        r = n - (n = (l * l * o + 3 * u * (l * a + u * h)) * l),
                        p = _ * i + c - 1,
                        e[p] = (e[p] || 0) + r * r
            },
            f = function(t, e) {
                e = e >> 0 || 6;
                var i,
                    r,
                    n,
                    s,
                    o = [],
                    a = [],
                    h = 0,
                    l = 0,
                    c = e - 1,
                    u = [],
                    d = [];
                for (i in t)
                    p(t[i], o, e);
                for (n = o.length, r = 0; n > r; r++)
                    h += Math.sqrt(o[r]),
                    s = r % e,
                    d[s] = h,
                    s === c && (l += h, s = r / e >> 0, u[s] = d, a[s] = l, h = 0, d = []);
                return {
                    length: l,
                    lengths: a,
                    segments: u
                }
            },
            _ = _gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.4",
                API: 2,
                global: !0,
                init: function(t, e, i) {
                    this._target = t,
                    e instanceof Array && (e = {
                        values: e
                    }),
                    this._func = {},
                    this._round = {},
                    this._props = [],
                    this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var r,
                        n,
                        s,
                        o,
                        a,
                        h = e.values || [],
                        l = {},
                        c = h[0],
                        p = e.autoRotate || i.vars.orientToBezier;
                    this._autoRotate = p ? p instanceof Array ? p : [["x", "y", "rotation", !0 === p ? 0 : Number(p) || 0]] : null;
                    for (r in c)
                        this._props.push(r);
                    for (s = this._props.length; --s > -1;)
                        r = this._props[s],
                        this._overwriteProps.push(r),
                        n = this._func[r] = "function" == typeof t[r],
                        l[r] = n ? t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(t[r]),
                        a || l[r] !== h[0][r] && (a = l);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : d(h, e.type, l), this._segCount = this._beziers[r].length, this._timeRes) {
                        var _ = f(this._beziers, this._timeRes);
                        this._length = _.length,
                        this._lengths = _.lengths,
                        this._segments = _.segments,
                        this._l1 = this._li = this._s1 = this._si = 0,
                        this._l2 = this._lengths[0],
                        this._curSeg = this._segments[0],
                        this._s2 = this._curSeg[0],
                        this._prec = 1 / this._curSeg.length
                    }
                    if (p = this._autoRotate)
                        for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
                            for (o = 0; 3 > o; o++)
                                r = p[s][o],
                                this._func[r] = "function" == typeof t[r] && t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)];
                            r = p[s][2],
                            this._initialRotations[s] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
                        }
                    return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                },
                set: function(e) {
                    var i,
                        r,
                        n,
                        s,
                        o,
                        a,
                        h,
                        l,
                        c,
                        u,
                        d = this._segCount,
                        p = this._func,
                        f = this._target,
                        _ = e !== this._startRatio;
                    if (this._timeRes) {
                        if (c = this._lengths, u = this._curSeg, e *= this._length, n = this._li, e > this._l2 && d - 1 > n) {
                            for (l = d - 1; l > n && e >= (this._l2 = c[++n]);)
                                ;
                            this._l1 = c[n - 1],
                            this._li = n,
                            this._curSeg = u = this._segments[n],
                            this._s2 = u[this._s1 = this._si = 0]
                        } else if (this._l1 > e && n > 0) {
                            for (; n > 0 && (this._l1 = c[--n]) >= e;)
                                ;
                            0 === n && this._l1 > e ? this._l1 = 0 : n++,
                            this._l2 = c[n],
                            this._li = n,
                            this._curSeg = u = this._segments[n],
                            this._s1 = u[(this._si = u.length - 1) - 1] || 0,
                            this._s2 = u[this._si]
                        }
                        if (i = n, e -= this._l1, n = this._si, e > this._s2 && u.length - 1 > n) {
                            for (l = u.length - 1; l > n && e >= (this._s2 = u[++n]);)
                                ;
                            this._s1 = u[n - 1],
                            this._si = n
                        } else if (this._s1 > e && n > 0) {
                            for (; n > 0 && (this._s1 = u[--n]) >= e;)
                                ;
                            0 === n && this._s1 > e ? this._s1 = 0 : n++,
                            this._s2 = u[n],
                            this._si = n
                        }
                        a = (n + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                    } else
                        i = 0 > e ? 0 : e >= 1 ? d - 1 : d * e >> 0,
                        a = (e - i * (1 / d)) * d;
                    for (r = 1 - a, n = this._props.length; --n > -1;)
                        s = this._props[n],
                        o = this._beziers[s][i],
                        h = (a * a * o.da + 3 * r * (a * o.ca + r * o.ba)) * a + o.a,
                        this._round[s] && (h = Math.round(h)),
                        p[s] ? f[s](h) : f[s] = h;
                    if (this._autoRotate) {
                        var g,
                            m,
                            v,
                            y,
                            x,
                            b,
                            T,
                            w = this._autoRotate;
                        for (n = w.length; --n > -1;)
                            s = w[n][2],
                            b = w[n][3] || 0,
                            T = !0 === w[n][4] ? 1 : t,
                            o = this._beziers[w[n][0]],
                            g = this._beziers[w[n][1]],
                            o && g && (o = o[i], g = g[i], m = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, m += (y - m) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = g.a + (g.b - g.a) * a, x = g.b + (g.c - g.b) * a, v += (x - v) * a, x += (g.c + (g.d - g.c) * a - x) * a, h = _ ? Math.atan2(x - v, y - m) * T + b : this._initialRotations[n], p[s] ? f[s](h) : f[s] = h)
                    }
                }
            }),
            g = _.prototype;
        _.bezierThrough = u,
        _.cubicToQuadratic = h,
        _._autoCSS = !0,
        _.quadraticToCubic = function(t, e, i) {
            return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
        },
        _._cssRegister = function() {
            var t = s.CSSPlugin;
            if (t) {
                var e = t._internals,
                    i = e._parseToProxy,
                    r = e._setPluginRatio,
                    n = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, s, o, a, h) {
                        e instanceof Array && (e = {
                            values: e
                        }),
                        h = new _;
                        var l,
                            c,
                            u,
                            d = e.values,
                            p = d.length - 1,
                            f = [],
                            g = {};
                        if (0 > p)
                            return a;
                        for (l = 0; p >= l; l++)
                            u = i(t, d[l], o, a, h, p !== l),
                            f[l] = u.end;
                        for (c in e)
                            g[c] = e[c];
                        return g.values = f, a = new n(t, "bezier", 0, 0, u.pt, 2), a.data = u, a.plugin = h, a.setRatio = r, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (l = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != u.end.left ? [["left", "top", "rotation", l, !1]] : null != u.end.x && [["x", "y", "rotation", l, !1]]), g.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform), h._onInitTween(u.proxy, g, o._tween), a
                    }
                })
            }
        },
        g._roundProps = function(t, e) {
            for (var i = this._overwriteProps, r = i.length; --r > -1;)
                (t[i[r]] || t.bezier || t.bezierThrough) && (this._round[i[r]] = e)
        },
        g._kill = function(t) {
            var e,
                i,
                r = this._props;
            for (e in this._beziers)
                if (e in t)
                    for (delete this._beziers[e], delete this._func[e], i = r.length; --i > -1;)
                        r[i] === e && r.splice(i, 1);
            return this._super._kill.call(this, t)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
        var i,
            r,
            n,
            s,
            o = function() {
                t.call(this, "css"),
                this._overwriteProps.length = 0,
                this.setRatio = o.prototype.setRatio
            },
            a = _gsScope._gsDefine.globals,
            h = {},
            l = o.prototype = new t("css");
        l.constructor = o,
        o.version = "1.16.0",
        o.API = 2,
        o.defaultTransformPerspective = 0,
        o.defaultSkewType = "compensated",
        l = "px",
        o.suffixMap = {
            top: l,
            right: l,
            bottom: l,
            left: l,
            width: l,
            height: l,
            fontSize: l,
            padding: l,
            margin: l,
            perspective: l,
            lineHeight: ""
        };
        var c,
            u,
            d,
            p,
            f,
            _,
            g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            x = /(?:\d|\-|\+|=|#|\.)*/g,
            b = /opacity *= *([^)]*)/i,
            T = /opacity:([^;]*)/i,
            w = /alpha\(opacity *=.+?\)/i,
            S = /^(rgb|hsl)/,
            E = /([A-Z])/g,
            A = /-([a-z])/gi,
            R = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            C = function(t, e) {
                return e.toUpperCase()
            },
            M = /(?:Left|Right|Width)/i,
            P = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            D = /,(?=[^\)]*(?:\(|$))/gi,
            L = Math.PI / 180,
            k = 180 / Math.PI,
            I = {},
            F = document,
            N = function(t) {
                return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", t) : F.createElement(t)
            },
            B = N("div"),
            U = N("img"),
            j = o._internals = {
                _specialProps: h
            },
            X = navigator.userAgent,
            G = function() {
                var t = X.indexOf("Android"),
                    e = N("a");
                return d = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === t || Number(X.substr(t + 8, 1)) > 3), f = d && 6 > Number(X.substr(X.indexOf("Version/") + 8, 1)), p = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (_ = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
            }(),
            z = function(t) {
                return b.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            W = function(t) {
                window.console && console.log(t)
            },
            V = "",
            Y = "",
            H = function(t, e) {
                e = e || B;
                var i,
                    r,
                    n = e.style;
                if (void 0 !== n[t])
                    return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === n[i[r] + t];)
                    ;
                return r >= 0 ? (Y = 3 === r ? "ms" : i[r], V = "-" + Y.toLowerCase() + "-", Y + t) : null
            },
            q = F.defaultView ? F.defaultView.getComputedStyle : function() {},
            K = o.getStyle = function(t, e, i, r, n) {
                var s;
                return G || "opacity" !== e ? (!r && t.style[e] ? s = t.style[e] : (i = i || q(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(E, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == n || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : n) : z(t)
            },
            $ = j.convertToPixels = function(t, i, r, n, s) {
                if ("px" === n || !n)
                    return r;
                if ("auto" === n || !r)
                    return 0;
                var a,
                    h,
                    l,
                    c = M.test(i),
                    u = t,
                    d = B.style,
                    p = 0 > r;
                if (p && (r = -r), "%" === n && -1 !== i.indexOf("border"))
                    a = r / 100 * (c ? t.clientWidth : t.clientHeight);
                else {
                    if (d.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;", "%" !== n && u.appendChild)
                        d[c ? "borderLeftWidth" : "borderTopWidth"] = r + n;
                    else {
                        if (u = t.parentNode || F.body, h = u._gsCache, l = e.ticker.frame, h && c && h.time === l)
                            return h.width * r / 100;
                        d[c ? "width" : "height"] = r + n
                    }
                    u.appendChild(B),
                    a = parseFloat(B[c ? "offsetWidth" : "offsetHeight"]),
                    u.removeChild(B),
                    c && "%" === n && !1 !== o.cacheWidths && (h = u._gsCache = u._gsCache || {}, h.time = l, h.width = a / r * 100),
                    0 !== a || s || (a = $(t, i, r, n, !0))
                }
                return p ? -a : a
            },
            Z = j.calculateOffset = function(t, e, i) {
                if ("absolute" !== K(t, "position", i))
                    return 0;
                var r = "left" === e ? "Left" : "Top",
                    n = K(t, "margin" + r, i);
                return t["offset" + r] - ($(t, e, parseFloat(n), n.replace(x, "")) || 0)
            },
            Q = function(t, e) {
                var i,
                    r,
                    n,
                    s = {};
                if (e = e || q(t, null))
                    if (i = e.length)
                        for (; --i > -1;)
                            n = e[i],
                            (-1 === n.indexOf("-transform") || wt === n) && (s[n.replace(A, C)] = e.getPropertyValue(n));
                    else
                        for (i in e)
                            (-1 === i.indexOf("Transform") || Tt === i) && (s[i] = e[i]);
                else if (e = t.currentStyle || t.style)
                    for (i in e)
                        "string" == typeof i && void 0 === s[i] && (s[i.replace(A, C)] = e[i]);
                return G || (s.opacity = z(t)), r = Dt(t, e, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, Et && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
            },
            J = function(t, e, i, r, n) {
                var s,
                    o,
                    a,
                    h = {},
                    l = t.style;
                for (o in i)
                    "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || n && n[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (h[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(y, "") ? s : 0 : Z(t, o), void 0 !== l[o] && (a = new pt(l, o, l[o], a)));
                if (r)
                    for (o in r)
                        "className" !== o && (h[o] = r[o]);
                return {
                    difs: h,
                    firstMPT: a
                }
            },
            tt = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            it = function(t, e, i) {
                var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                    n = tt[e],
                    s = n.length;
                for (i = i || q(t, null); --s > -1;)
                    r -= parseFloat(K(t, "padding" + n[s], i, !0)) || 0,
                    r -= parseFloat(K(t, "border" + n[s] + "Width", i, !0)) || 0;
                return r
            },
            rt = function(t, e) {
                (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
                var i = t.split(" "),
                    r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                    n = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                return null == n ? n = "center" === r ? "50%" : "0" : "center" === n && (n = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== n.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === n.charAt(1), e.ox = parseFloat(r.replace(y, "")), e.oy = parseFloat(n.replace(y, ""))), r + " " + n + (i.length > 2 ? " " + i[2] : "")
            },
            nt = function(t, e) {
                return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
            },
            st = function(t, e) {
                return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
            },
            ot = function(t, e, i, r) {
                var n,
                    s,
                    o,
                    a,
                    h,
                    l = 1e-6;
                return null == t ? a = e : "number" == typeof t ? a = t : (n = 360, s = t.split("_"), h = "=" === t.charAt(1), o = (h ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : k) - (h ? 0 : e), s.length && (r && (r[i] = e + o), -1 !== t.indexOf("short") && (o %= n) !== o % (n / 2) && (o = 0 > o ? o + n : o - n), -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * n) % n - (0 | o / n) * n : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * n) % n - (0 | o / n) * n)), a = e + o), l > a && a > -l && (a = 0), a
            },
            at = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ht = function(t, e, i) {
                return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
            },
            lt = o.parseColor = function(t) {
                var e,
                    i,
                    r,
                    n,
                    s,
                    o;
                return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t] ? at[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(g), n = Number(t[0]) % 360 / 360, s = Number(t[1]) / 100, o = Number(t[2]) / 100, i = .5 >= o ? o * (s + 1) : o + s - o * s, e = 2 * o - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ht(n + 1 / 3, e, i), t[1] = ht(n, e, i), t[2] = ht(n - 1 / 3, e, i), t) : (t = t.match(g) || at.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : at.black
            },
            ct = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (l in at)
            ct += "|" + l + "\\b";
        ct = RegExp(ct + ")", "gi");
        var ut = function(t, e, i, r) {
                if (null == t)
                    return function(t) {
                        return t
                    };
                var n,
                    s = e ? (t.match(ct) || [""])[0] : "",
                    o = t.split(s).join("").match(v) || [],
                    a = t.substr(0, t.indexOf(o[0])),
                    h = ")" === t.charAt(t.length - 1) ? ")" : "",
                    l = -1 !== t.indexOf(" ") ? " " : ",",
                    c = o.length,
                    u = c > 0 ? o[0].replace(g, "") : "";
                return c ? n = e ? function(t) {
                    var e,
                        d,
                        p,
                        f;
                    if ("number" == typeof t)
                        t += u;
                    else if (r && D.test(t)) {
                        for (f = t.replace(D, "|").split("|"), p = 0; f.length > p; p++)
                            f[p] = n(f[p]);
                        return f.join(",")
                    }
                    if (e = (t.match(ct) || [s])[0], d = t.split(e).join("").match(v) || [], p = d.length, c > p--)
                        for (; c > ++p;)
                            d[p] = i ? d[0 | (p - 1) / 2] : o[p];
                    return a + d.join(l) + l + e + h + (-1 !== t.indexOf("inset") ? " inset" : "")
                } : function(t) {
                    var e,
                        s,
                        d;
                    if ("number" == typeof t)
                        t += u;
                    else if (r && D.test(t)) {
                        for (s = t.replace(D, "|").split("|"), d = 0; s.length > d; d++)
                            s[d] = n(s[d]);
                        return s.join(",")
                    }
                    if (e = t.match(v) || [], d = e.length, c > d--)
                        for (; c > ++d;)
                            e[d] = i ? e[0 | (d - 1) / 2] : o[d];
                    return a + e.join(l) + h
                } : function(t) {
                    return t
                }
            },
            dt = function(t) {
                return t = t.split(","), function(e, i, r, n, s, o, a) {
                    var h,
                        l = (i + "").split(" ");
                    for (a = {}, h = 0; 4 > h; h++)
                        a[t[h]] = l[h] = l[h] || l[(h - 1) / 2 >> 0];
                    return n.parse(e, a, s, o)
                }
            },
            pt = (j._setPluginRatio = function(t) {
                this.plugin.setRatio(t);
                for (var e, i, r, n, s = this.data, o = s.proxy, a = s.firstMPT, h = 1e-6; a;)
                    e = o[a.v],
                    a.r ? e = Math.round(e) : h > e && e > -h && (e = 0),
                    a.t[a.p] = e,
                    a = a._next;
                if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === t)
                    for (a = s.firstMPT; a;) {
                        if (i = a.t, i.type) {
                            if (1 === i.type) {
                                for (n = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++)
                                    n += i["xn" + r] + i["xs" + (r + 1)];
                                i.e = n
                            }
                        } else
                            i.e = i.s + i.xs0;
                        a = a._next
                    }
            }, function(t, e, i, r, n) {
                this.t = t,
                this.p = e,
                this.v = i,
                this.r = n,
                r && (r._prev = this, this._next = r)
            }),
            ft = (j._parseToProxy = function(t, e, i, r, n, s) {
                var o,
                    a,
                    h,
                    l,
                    c,
                    u = r,
                    d = {},
                    p = {},
                    f = i._transform,
                    _ = I;
                for (i._transform = null, I = e, r = c = i.parse(t, e, r, n), I = _, s && (i._transform = f, u && (u._prev = null, u._prev && (u._prev._next = null))); r && r !== u;) {
                    if (1 >= r.type && (a = r.p, p[a] = r.s + r.c, d[a] = r.s, s || (l = new pt(r, "s", a, l, r.r), r.c = 0), 1 === r.type))
                        for (o = r.l; --o > 0;)
                            h = "xn" + o,
                            a = r.p + "_" + h,
                            p[a] = r.data[h],
                            d[a] = r[h],
                            s || (l = new pt(r, h, a, l, r.rxp[h]));
                    r = r._next
                }
                return {
                    proxy: d,
                    end: p,
                    firstMPT: l,
                    pt: c
                }
            }, j.CSSPropTween = function(t, e, r, n, o, a, h, l, c, u, d) {
                this.t = t,
                this.p = e,
                this.s = r,
                this.c = n,
                this.n = h || e,
                t instanceof ft || s.push(this.n),
                this.r = l,
                this.type = a || 0,
                c && (this.pr = c, i = !0),
                this.b = void 0 === u ? r : u,
                this.e = void 0 === d ? r + n : d,
                o && (this._next = o, o._prev = this)
            }),
            _t = o.parseComplex = function(t, e, i, r, n, s, o, a, h, l) {
                i = i || s || "",
                o = new ft(t, e, 0, 0, o, l ? 2 : 1, null, !1, a, i, r),
                r += "";
                var u,
                    d,
                    p,
                    f,
                    _,
                    v,
                    y,
                    x,
                    b,
                    T,
                    w,
                    E,
                    A = i.split(", ").join(",").split(" "),
                    R = r.split(", ").join(",").split(" "),
                    C = A.length,
                    M = !1 !== c;
                for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (A = A.join(" ").replace(D, ", ").split(" "), R = R.join(" ").replace(D, ", ").split(" "), C = A.length), C !== R.length && (A = (s || "").split(" "), C = A.length), o.plugin = h, o.setRatio = l, u = 0; C > u; u++)
                    if (f = A[u], _ = R[u], (x = parseFloat(f)) || 0 === x)
                        o.appendXtra("", x, nt(_, x), _.replace(m, ""), M && -1 !== _.indexOf("px"), !0);
                    else if (n && ("#" === f.charAt(0) || at[f] || S.test(f)))
                        E = "," === _.charAt(_.length - 1) ? ")," : ")",
                        f = lt(f),
                        _ = lt(_),
                        b = f.length + _.length > 6,
                        b && !G && 0 === _[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(R[u]).join("transparent")) : (G || (b = !1), o.appendXtra(b ? "rgba(" : "rgb(", f[0], _[0] - f[0], ",", !0, !0).appendXtra("", f[1], _[1] - f[1], ",", !0).appendXtra("", f[2], _[2] - f[2], b ? "," : E, !0), b && (f = 4 > f.length ? 1 : f[3], o.appendXtra("", f, (4 > _.length ? 1 : _[3]) - f, E, !1)));
                    else if (v = f.match(g)) {
                        if (!(y = _.match(m)) || y.length !== v.length)
                            return o;
                        for (p = 0, d = 0; v.length > d; d++)
                            w = v[d],
                            T = f.indexOf(w, p),
                            o.appendXtra(f.substr(p, T - p), Number(w), nt(y[d], w), "", M && "px" === f.substr(T + w.length, 2), 0 === d),
                            p = T + w.length;
                        o["xs" + o.l] += f.substr(p)
                    } else
                        o["xs" + o.l] += o.l ? " " + f : f;
                if (-1 !== r.indexOf("=") && o.data) {
                    for (E = o.xs0 + o.data.s, u = 1; o.l > u; u++)
                        E += o["xs" + u] + o.data["xn" + u];
                    o.e = E + o["xs" + u]
                }
                return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
            },
            gt = 9;
        for (l = ft.prototype, l.l = l.pr = 0; --gt > 0;)
            l["xn" + gt] = 0,
            l["xs" + gt] = "";
        l.xs0 = "",
        l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null,
        l.appendXtra = function(t, e, i, r, n, s) {
            var o = this,
                a = o.l;
            return o["xs" + a] += s && a ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = n, o["xn" + a] = e, o.plugin || (o.xfirst = new ft(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, n, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                s: e + i
            }, o.rxp = {}, o.s = e, o.c = i, o.r = n, o)) : (o["xs" + a] += e + (r || ""), o)
        };
        var mt = function(t, e) {
                e = e || {},
                this.p = e.prefix ? H(t) || t : t,
                h[t] = h[this.p] = this,
                this.format = e.formatter || ut(e.defaultValue, e.color, e.collapsible, e.multi),
                e.parser && (this.parse = e.parser),
                this.clrs = e.color,
                this.multi = e.multi,
                this.keyword = e.keyword,
                this.dflt = e.defaultValue,
                this.pr = e.priority || 0
            },
            vt = j._registerComplexSpecialProp = function(t, e, i) {
                "object" != typeof e && (e = {
                    parser: i
                });
                var r,
                    n,
                    s = t.split(","),
                    o = e.defaultValue;
                for (i = i || [o], r = 0; s.length > r; r++)
                    e.prefix = 0 === r && e.prefix,
                    e.defaultValue = i[r] || o,
                    n = new mt(s[r], e)
            },
            yt = function(t) {
                if (!h[t]) {
                    var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                    vt(t, {
                        parser: function(t, i, r, n, s, o, l) {
                            var c = a.com.greensock.plugins[e];
                            return c ? (c._cssRegister(), h[r].parse(t, i, r, n, s, o, l)) : (W("Error: " + e + " js file not loaded."), s)
                        }
                    })
                }
            };
        l = mt.prototype,
        l.parseComplex = function(t, e, i, r, n, s) {
            var o,
                a,
                h,
                l,
                c,
                u,
                d = this.keyword;
            if (this.multi && (D.test(i) || D.test(e) ? (a = e.replace(D, "|").split("|"), h = i.replace(D, "|").split("|")) : d && (a = [e], h = [i])), h) {
                for (l = h.length > a.length ? h.length : a.length, o = 0; l > o; o++)
                    e = a[o] = a[o] || this.dflt,
                    i = h[o] = h[o] || this.dflt,
                    d && (c = e.indexOf(d), u = i.indexOf(d), c !== u && (-1 === u ? a[o] = a[o].split(d).join("") : -1 === c && (a[o] += " " + d)));
                e = a.join(", "),
                i = h.join(", ")
            }
            return _t(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, n, s)
        },
        l.parse = function(t, e, i, r, s, o) {
            return this.parseComplex(t.style, this.format(K(t, this.p, n, !1, this.dflt)), this.format(e), s, o)
        },
        o.registerSpecialProp = function(t, e, i) {
            vt(t, {
                parser: function(t, r, n, s, o, a) {
                    var h = new ft(t, n, 0, 0, o, 2, n, !1, i);
                    return h.plugin = a, h.setRatio = e(t, r, s._tween, n), h
                },
                priority: i
            })
        },
        o.useSVGTransformAttr = d;
        var xt,
            bt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Tt = H("transform"),
            wt = V + "transform",
            St = H("transformOrigin"),
            Et = null !== H("perspective"),
            At = j.Transform = function() {
                this.perspective = parseFloat(o.defaultTransformPerspective) || 0,
                this.force3D = !(!1 === o.defaultForce3D || !Et) && (o.defaultForce3D || "auto")
            },
            Rt = window.SVGElement,
            Ct = function(t, e, i) {
                var r,
                    n = F.createElementNS("http://www.w3.org/2000/svg", t),
                    s = /([a-z])([A-Z])/g;
                for (r in i)
                    n.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), i[r]);
                return e.appendChild(n), n
            },
            Mt = F.documentElement,
            Pt = function() {
                var t,
                    e,
                    i,
                    r = _ || /Android/i.test(X) && !window.chrome;
                return F.createElementNS && !r && (t = Ct("svg", Mt), e = Ct("rect", t, {
                    width: 100,
                    height: 50,
                    x: 100
                }), i = e.getBoundingClientRect().width, e.style[St] = "50% 50%", e.style[Tt] = "scaleX(0.5)", r = i === e.getBoundingClientRect().width && !(p && Et), Mt.removeChild(t)), r
            }(),
            Ot = function(t, e, i, r) {
                var n,
                    s;
                r && (s = r.split(" ")).length || (n = t.getBBox(), e = rt(e).split(" "), s = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * n.width : parseFloat(e[0])) + n.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * n.height : parseFloat(e[1])) + n.y]),
                i.xOrigin = parseFloat(s[0]),
                i.yOrigin = parseFloat(s[1]),
                t.setAttribute("data-svg-origin", s.join(" "))
            },
            Dt = j.getTransform = function(t, e, i, r) {
                if (t._gsTransform && i && !r)
                    return t._gsTransform;
                var s,
                    a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _,
                    g = i ? t._gsTransform || new At : new At,
                    m = 0 > g.scaleX,
                    v = 2e-5,
                    y = 1e5,
                    x = Et ? parseFloat(K(t, St, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0,
                    b = parseFloat(o.defaultTransformPerspective) || 0;
                if (Tt ? a = K(t, wt, e, !0) : t.currentStyle && (a = t.currentStyle.filter.match(P), a = a && 4 === a.length ? [a[0].substr(4), Number(a[2].substr(4)), Number(a[1].substr(4)), a[3].substr(4), g.x || 0, g.y || 0].join(",") : ""), s = !a || "none" === a || "matrix(1, 0, 0, 1, 0, 0)" === a, g.svg = !!(Rt && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)), g.svg && (s && -1 !== (t.style[Tt] + "").indexOf("matrix") && (a = t.style[Tt], s = !1), Ot(t, K(t, St, n, !1, "50% 50%") + "", g, t.getAttribute("data-svg-origin")), xt = o.useSVGTransformAttr || Pt, h = t.getAttribute("transform"), s && h && -1 !== h.indexOf("matrix") && (a = h, s = 0)), !s) {
                    for (h = (a || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], l = h.length; --l > -1;)
                        c = Number(h[l]),
                        h[l] = (u = c - (c |= 0)) ? (0 | u * y + (0 > u ? -.5 : .5)) / y + c : c;
                    if (16 === h.length) {
                        var T,
                            w,
                            S,
                            E,
                            A,
                            R = h[0],
                            C = h[1],
                            M = h[2],
                            O = h[3],
                            D = h[4],
                            L = h[5],
                            I = h[6],
                            F = h[7],
                            N = h[8],
                            B = h[9],
                            U = h[10],
                            j = h[12],
                            X = h[13],
                            G = h[14],
                            z = h[11],
                            W = Math.atan2(I, U);
                        g.zOrigin && (G = -g.zOrigin, j = N * G - h[12], X = B * G - h[13], G = U * G + g.zOrigin - h[14]),
                        g.rotationX = W * k,
                        W && (E = Math.cos(-W), A = Math.sin(-W), T = D * E + N * A, w = L * E + B * A, S = I * E + U * A, N = D * -A + N * E, B = L * -A + B * E, U = I * -A + U * E, z = F * -A + z * E, D = T, L = w, I = S),
                        W = Math.atan2(N, U),
                        g.rotationY = W * k,
                        W && (E = Math.cos(-W), A = Math.sin(-W), T = R * E - N * A, w = C * E - B * A, S = M * E - U * A, B = C * A + B * E, U = M * A + U * E, z = O * A + z * E, R = T, C = w, M = S),
                        W = Math.atan2(C, R),
                        g.rotation = W * k,
                        W && (E = Math.cos(-W), A = Math.sin(-W), R = R * E + D * A, w = C * E + L * A, L = C * -A + L * E, I = M * -A + I * E, C = w),
                        g.rotationX && Math.abs(g.rotationX) + Math.abs(g.rotation) > 359.9 && (g.rotationX = g.rotation = 0, g.rotationY += 180),
                        g.scaleX = (0 | Math.sqrt(R * R + C * C) * y + .5) / y,
                        g.scaleY = (0 | Math.sqrt(L * L + B * B) * y + .5) / y,
                        g.scaleZ = (0 | Math.sqrt(I * I + U * U) * y + .5) / y,
                        g.skewX = 0,
                        g.perspective = z ? 1 / (0 > z ? -z : z) : 0,
                        g.x = j,
                        g.y = X,
                        g.z = G,
                        g.svg && (g.x -= g.xOrigin - (g.xOrigin * R - g.yOrigin * D), g.y -= g.yOrigin - (g.yOrigin * C - g.xOrigin * L))
                    } else if (!(Et && !r && h.length && g.x === h[4] && g.y === h[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === K(t, "display", e))) {
                        var V = h.length >= 6,
                            Y = V ? h[0] : 1,
                            H = h[1] || 0,
                            q = h[2] || 0,
                            $ = V ? h[3] : 1;
                        g.x = h[4] || 0,
                        g.y = h[5] || 0,
                        d = Math.sqrt(Y * Y + H * H),
                        p = Math.sqrt($ * $ + q * q),
                        f = Y || H ? Math.atan2(H, Y) * k : g.rotation || 0,
                        _ = q || $ ? Math.atan2(q, $) * k + f : g.skewX || 0,
                        Math.abs(_) > 90 && 270 > Math.abs(_) && (m ? (d *= -1, _ += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (p *= -1, _ += 0 >= _ ? 180 : -180)),
                        g.scaleX = d,
                        g.scaleY = p,
                        g.rotation = f,
                        g.skewX = _,
                        Et && (g.rotationX = g.rotationY = g.z = 0, g.perspective = b, g.scaleZ = 1),
                        g.svg && (g.x -= g.xOrigin - (g.xOrigin * Y - g.yOrigin * H), g.y -= g.yOrigin - (g.yOrigin * $ - g.xOrigin * q))
                    }
                    g.zOrigin = x;
                    for (l in g)
                        v > g[l] && g[l] > -v && (g[l] = 0)
                }
                return i && (t._gsTransform = g, g.svg && (xt && t.style[Tt] ? Nt(t.style, Tt) : !xt && t.getAttribute("transform") && t.removeAttribute("transform"))), g
            },
            Lt = function(t) {
                var e,
                    i,
                    r = this.data,
                    n = -r.rotation * L,
                    s = n + r.skewX * L,
                    o = 1e5,
                    a = (0 | Math.cos(n) * r.scaleX * o) / o,
                    h = (0 | Math.sin(n) * r.scaleX * o) / o,
                    l = (0 | Math.sin(s) * -r.scaleY * o) / o,
                    c = (0 | Math.cos(s) * r.scaleY * o) / o,
                    u = this.t.style,
                    d = this.t.currentStyle;
                if (d) {
                    i = h,
                    h = -l,
                    l = -i,
                    e = d.filter,
                    u.filter = "";
                    var p,
                        f,
                        g = this.t.offsetWidth,
                        m = this.t.offsetHeight,
                        v = "absolute" !== d.position,
                        y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + h + ", M21=" + l + ", M22=" + c,
                        T = r.x + g * r.xPercent / 100,
                        w = r.y + m * r.yPercent / 100;
                    if (null != r.ox && (p = (r.oxp ? .01 * g * r.ox : r.ox) - g / 2, f = (r.oyp ? .01 * m * r.oy : r.oy) - m / 2, T += p - (p * a + f * h), w += f - (p * l + f * c)), v ? (p = g / 2, f = m / 2, y += ", Dx=" + (p - (p * a + f * h) + T) + ", Dy=" + (f - (p * l + f * c) + w) + ")") : y += ", sizingMethod='auto expand')", u.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, y) : y + " " + e, (0 === t || 1 === t) && 1 === a && 0 === h && 0 === l && 1 === c && (v && -1 === y.indexOf("Dx=0, Dy=0") || b.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                        var S,
                            E,
                            A,
                            R = 8 > _ ? 1 : -1;
                        for (p = r.ieOffsetX || 0, f = r.ieOffsetY || 0, r.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > h ? -h : h) * m)) / 2 + T), r.ieOffsetY = Math.round((m - ((0 > c ? -c : c) * m + (0 > l ? -l : l) * g)) / 2 + w), gt = 0; 4 > gt; gt++)
                            E = et[gt],
                            S = d[E],
                            i = -1 !== S.indexOf("px") ? parseFloat(S) : $(this.t, E, parseFloat(S), S.replace(x, "")) || 0,
                            A = i !== r[E] ? 2 > gt ? -r.ieOffsetX : -r.ieOffsetY : 2 > gt ? p - r.ieOffsetX : f - r.ieOffsetY,
                            u[E] = (r[E] = Math.round(i - A * (0 === gt || 2 === gt ? 1 : R))) + "px"
                    }
                }
            },
            kt = j.set3DTransformRatio = function(t) {
                var e,
                    i,
                    r,
                    n,
                    s,
                    o,
                    a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    f,
                    _,
                    g,
                    m,
                    v,
                    y,
                    x,
                    b,
                    T,
                    w = this.data,
                    S = this.t.style,
                    E = w.rotation * L,
                    A = w.scaleX,
                    R = w.scaleY,
                    C = w.scaleZ,
                    M = w.x,
                    P = w.y,
                    O = w.z,
                    D = w.perspective;
                if (!(1 !== t && 0 !== t && w.force3D || !0 === w.force3D || w.rotationY || w.rotationX || 1 !== C || D || O || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime))
                    return void It.call(this, t);
                if (p && (_ = 1e-4, _ > A && A > -_ && (A = C = 2e-5), _ > R && R > -_ && (R = C = 2e-5), !D || w.z || w.rotationX || w.rotationY || (D = 0)), E || w.skewX)
                    g = e = Math.cos(E),
                    m = n = Math.sin(E),
                    w.skewX && (E -= w.skewX * L, g = Math.cos(E), m = Math.sin(E), "simple" === w.skewType && (v = Math.tan(w.skewX * L), v = Math.sqrt(1 + v * v), g *= v, m *= v)),
                    i = -m,
                    s = g;
                else {
                    if (!(w.rotationY || w.rotationX || 1 !== C || D || w.svg))
                        return void (S[Tt] = (w.xPercent || w.yPercent ? "translate(" + w.xPercent + "%," + w.yPercent + "%) translate3d(" : "translate3d(") + M + "px," + P + "px," + O + "px)" + (1 !== A || 1 !== R ? " scale(" + A + "," + R + ")" : ""));
                    e = s = 1,
                    i = n = 0
                }
                l = 1,
                r = o = a = h = c = u = 0,
                d = D ? -1 / D : 0,
                f = w.zOrigin,
                _ = 1e-6,
                b = ",",
                T = "0",
                E = w.rotationY * L,
                E && (g = Math.cos(E), m = Math.sin(E), a = -m, c = d * -m, r = e * m, o = n * m, l = g, d *= g, e *= g, n *= g),
                E = w.rotationX * L,
                E && (g = Math.cos(E), m = Math.sin(E), v = i * g + r * m, y = s * g + o * m, h = l * m, u = d * m, r = i * -m + r * g, o = s * -m + o * g, l *= g, d *= g, i = v, s = y),
                1 !== C && (r *= C, o *= C, l *= C, d *= C),
                1 !== R && (i *= R, s *= R, h *= R, u *= R),
                1 !== A && (e *= A, n *= A, a *= A, c *= A),
                (f || w.svg) && (f && (M += r * -f, P += o * -f, O += l * -f + f), w.svg && (M += w.xOrigin - (w.xOrigin * e + w.yOrigin * i), P += w.yOrigin - (w.xOrigin * n + w.yOrigin * s)), _ > M && M > -_ && (M = T), _ > P && P > -_ && (P = T), _ > O && O > -_ && (O = 0)),
                x = w.xPercent || w.yPercent ? "translate(" + w.xPercent + "%," + w.yPercent + "%) matrix3d(" : "matrix3d(",
                x += (_ > e && e > -_ ? T : e) + b + (_ > n && n > -_ ? T : n) + b + (_ > a && a > -_ ? T : a),
                x += b + (_ > c && c > -_ ? T : c) + b + (_ > i && i > -_ ? T : i) + b + (_ > s && s > -_ ? T : s),
                w.rotationX || w.rotationY ? (x += b + (_ > h && h > -_ ? T : h) + b + (_ > u && u > -_ ? T : u) + b + (_ > r && r > -_ ? T : r), x += b + (_ > o && o > -_ ? T : o) + b + (_ > l && l > -_ ? T : l) + b + (_ > d && d > -_ ? T : d) + b) : x += ",0,0,0,0,1,0,",
                x += M + b + P + b + O + b + (D ? 1 + -O / D : 1) + ")",
                S[Tt] = x
            },
            It = j.set2DTransformRatio = function(t) {
                var e,
                    i,
                    r,
                    n,
                    s,
                    o,
                    a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p = this.data,
                    f = this.t,
                    _ = f.style,
                    g = p.x,
                    m = p.y;
                return !(p.rotationX || p.rotationY || p.z || !0 === p.force3D || "auto" === p.force3D && 1 !== t && 0 !== t) || p.svg && xt || !Et ? (n = p.scaleX, s = p.scaleY, void (p.rotation || p.skewX || p.svg ? (e = p.rotation * L, i = p.skewX * L, r = 1e5, o = Math.cos(e) * n, a = Math.sin(e) * n, h = Math.sin(e - i) * -s, l = Math.cos(e - i) * s, i && "simple" === p.skewType && (d = Math.tan(i), d = Math.sqrt(1 + d * d), h *= d, l *= d), p.svg && (g += p.xOrigin - (p.xOrigin * o + p.yOrigin * h), m += p.yOrigin - (p.xOrigin * a + p.yOrigin * l), u = 1e-6, u > g && g > -u && (g = 0), u > m && m > -u && (m = 0)), c = (0 | o * r) / r + "," + (0 | a * r) / r + "," + (0 | h * r) / r + "," + (0 | l * r) / r + "," + g + "," + m + ")", p.svg && xt ? f.setAttribute("transform", "matrix(" + c) : _[Tt] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + c) : _[Tt] = (p.xPercent || p.yPercent ? "translate(" + p.xPercent + "%," + p.yPercent + "%) matrix(" : "matrix(") + n + ",0,0," + s + "," + g + "," + m + ")")) : (this.setRatio = kt, void kt.call(this, t))
            };
        l = At.prototype,
        l.x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = 0,
        l.scaleX = l.scaleY = l.scaleZ = 1,
        vt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
            parser: function(t, e, i, r, s, a, h) {
                if (r._lastParsedTransform === h)
                    return s;
                r._lastParsedTransform = h;
                var l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _,
                    g = r._transform = Dt(t, n, !0, h.parseTransform),
                    m = t.style,
                    v = 1e-6,
                    y = bt.length,
                    x = h,
                    b = {};
                if ("string" == typeof x.transform && Tt)
                    u = B.style,
                    u[Tt] = x.transform,
                    u.display = "block",
                    u.position = "absolute",
                    F.body.appendChild(B),
                    l = Dt(B, null, !1),
                    F.body.removeChild(B);
                else if ("object" == typeof x) {
                    if (l = {
                        scaleX: st(null != x.scaleX ? x.scaleX : x.scale, g.scaleX),
                        scaleY: st(null != x.scaleY ? x.scaleY : x.scale, g.scaleY),
                        scaleZ: st(x.scaleZ, g.scaleZ),
                        x: st(x.x, g.x),
                        y: st(x.y, g.y),
                        z: st(x.z, g.z),
                        xPercent: st(x.xPercent, g.xPercent),
                        yPercent: st(x.yPercent, g.yPercent),
                        perspective: st(x.transformPerspective, g.perspective)
                    }, null != (_ = x.directionalRotation))
                        if ("object" == typeof _)
                            for (u in _)
                                x[u] = _[u];
                        else
                            x.rotation = _;
                    "string" == typeof x.x && -1 !== x.x.indexOf("%") && (l.x = 0, l.xPercent = st(x.x, g.xPercent)),
                    "string" == typeof x.y && -1 !== x.y.indexOf("%") && (l.y = 0, l.yPercent = st(x.y, g.yPercent)),
                    l.rotation = ot("rotation" in x ? x.rotation : "shortRotation" in x ? x.shortRotation + "_short" : "rotationZ" in x ? x.rotationZ : g.rotation, g.rotation, "rotation", b),
                    Et && (l.rotationX = ot("rotationX" in x ? x.rotationX : "shortRotationX" in x ? x.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", b), l.rotationY = ot("rotationY" in x ? x.rotationY : "shortRotationY" in x ? x.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", b)),
                    l.skewX = null == x.skewX ? g.skewX : ot(x.skewX, g.skewX),
                    l.skewY = null == x.skewY ? g.skewY : ot(x.skewY, g.skewY),
                    (c = l.skewY - g.skewY) && (l.skewX += c, l.rotation += c)
                }
                for (Et && null != x.force3D && (g.force3D = x.force3D, f = !0), g.skewType = x.skewType || g.skewType || o.defaultSkewType, (p = g.force3D || g.z || g.rotationX || g.rotationY || l.z || l.rotationX || l.rotationY || l.perspective) || null == x.scale || (l.scaleZ = 1); --y > -1;)
                    i = bt[y],
                    ((d = l[i] - g[i]) > v || -v > d || null != x[i] || null != I[i]) && (f = !0, s = new ft(g, i, g[i], d, s), i in b && (s.e = b[i]), s.xs0 = 0, s.plugin = a, r._overwriteProps.push(s.n));
                return d = x.transformOrigin, g.svg && (d || x.svgOrigin) && (Ot(t, rt(d), l, x.svgOrigin), s = new ft(g, "xOrigin", g.xOrigin, l.xOrigin - g.xOrigin, s, -1, "transformOrigin"), s.b = g.xOrigin, s.e = s.xs0 = l.xOrigin, s = new ft(g, "yOrigin", g.yOrigin, l.yOrigin - g.yOrigin, s, -1, "transformOrigin"), s.b = g.yOrigin, s.e = s.xs0 = l.yOrigin, d = xt ? null : "0px 0px"), (d || Et && p && g.zOrigin) && (Tt ? (f = !0, i = St, d = (d || K(t, i, n, !1, "50% 50%")) + "", s = new ft(m, i, 0, 0, s, -1, "transformOrigin"), s.b = m[i], s.plugin = a, Et ? (u = g.zOrigin, d = d.split(" "), g.zOrigin = (d.length > 2 && (0 === u || "0px" !== d[2]) ? parseFloat(d[2]) : u) || 0, s.xs0 = s.e = d[0] + " " + (d[1] || "50%") + " 0px", s = new ft(g, "zOrigin", 0, 0, s, -1, s.n), s.b = u, s.xs0 = s.e = g.zOrigin) : s.xs0 = s.e = d) : rt(d + "", g)), f && (r._transformType = g.svg && xt || !p && 3 !== this._transformType ? 2 : 3), s
            },
            prefix: !0
        }),
        vt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        vt("borderRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, s, o) {
                e = this.format(e);
                var a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    _,
                    g,
                    m,
                    v,
                    y,
                    x,
                    b,
                    T,
                    w = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    S = t.style;
                for (_ = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), h = 0; w.length > h; h++)
                    this.p.indexOf("border") && (w[h] = H(w[h])),
                    u = c = K(t, w[h], n, !1, "0px"),
                    -1 !== u.indexOf(" ") && (c = u.split(" "), u = c[0], c = c[1]),
                    d = l = a[h],
                    p = parseFloat(u),
                    v = u.substr((p + "").length),
                    y = "=" === d.charAt(1),
                    y ? (f = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), f *= parseFloat(d), m = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d), m = d.substr((f + "").length)),
                    "" === m && (m = r[i] || v),
                    m !== v && (x = $(t, "borderLeft", p, v), b = $(t, "borderTop", p, v), "%" === m ? (u = x / _ * 100 + "%", c = b / g * 100 + "%") : "em" === m ? (T = $(t, "borderLeft", 1, "em"), u = x / T + "em", c = b / T + "em") : (u = x + "px", c = b + "px"), y && (d = parseFloat(u) + f + m, l = parseFloat(c) + f + m)),
                    o = _t(S, w[h], u + " " + c, d + " " + l, !1, "0px", o);
                return o
            },
            prefix: !0,
            formatter: ut("0px 0px 0px 0px", !1, !0)
        }),
        vt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(t, e, i, r, s, o) {
                var a,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p = "background-position",
                    f = n || q(t, null),
                    g = this.format((f ? _ ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                    m = this.format(e);
                if (-1 !== g.indexOf("%") != (-1 !== m.indexOf("%")) && (d = K(t, "backgroundImage").replace(R, "")) && "none" !== d) {
                    for (a = g.split(" "), h = m.split(" "), U.setAttribute("src", d), l = 2; --l > -1;)
                        g = a[l],
                        (c = -1 !== g.indexOf("%")) !== (-1 !== h[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - U.width : t.offsetHeight - U.height, a[l] = c ? parseFloat(g) / 100 * u + "px" : parseFloat(g) / u * 100 + "%");
                    g = a.join(" ")
                }
                return this.parseComplex(t.style, g, m, s, o)
            },
            formatter: rt
        }),
        vt("backgroundSize", {
            defaultValue: "0 0",
            formatter: rt
        }),
        vt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        vt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        vt("transformStyle", {
            prefix: !0
        }),
        vt("backfaceVisibility", {
            prefix: !0
        }),
        vt("userSelect", {
            prefix: !0
        }),
        vt("margin", {
            parser: dt("marginTop,marginRight,marginBottom,marginLeft")
        }),
        vt("padding", {
            parser: dt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        vt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(t, e, i, r, s, o) {
                var a,
                    h,
                    l;
                return 9 > _ ? (h = t.currentStyle, l = 8 > _ ? " " : ",", a = "rect(" + h.clipTop + l + h.clipRight + l + h.clipBottom + l + h.clipLeft + ")", e = this.format(e).split(",").join(l)) : (a = this.format(K(t, this.p, n, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
            }
        }),
        vt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        vt("autoRound,strictUnits", {
            parser: function(t, e, i, r, n) {
                return n
            }
        }),
        vt("border", {
            defaultValue: "0px solid #000",
            parser: function(t, e, i, r, s, o) {
                return this.parseComplex(t.style, this.format(K(t, "borderTopWidth", n, !1, "0px") + " " + K(t, "borderTopStyle", n, !1, "solid") + " " + K(t, "borderTopColor", n, !1, "#000")), this.format(e), s, o)
            },
            color: !0,
            formatter: function(t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(ct) || ["#000"])[0]
            }
        }),
        vt("borderWidth", {
            parser: dt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        vt("float,cssFloat,styleFloat", {
            parser: function(t, e, i, r, n) {
                var s = t.style,
                    o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                return new ft(s, o, 0, 0, n, -1, i, !1, 0, s[o], e)
            }
        });
        var Ft = function(t) {
            var e,
                i = this.t,
                r = i.filter || K(this.data, "filter") || "",
                n = 0 | this.s + this.c * t;
            100 === n && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !K(this.data, "filter")) : (i.filter = r.replace(w, ""), e = !0)),
            e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + n + ")"), -1 === r.indexOf("pacity") ? 0 === n && this.xn1 || (i.filter = r + " alpha(opacity=" + n + ")") : i.filter = r.replace(b, "opacity=" + n))
        };
        vt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(t, e, i, r, s, o) {
                var a = parseFloat(K(t, "opacity", n, !1, "1")),
                    h = t.style,
                    l = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), l && 1 === a && "hidden" === K(t, "visibility", n) && 0 !== e && (a = 0), G ? s = new ft(h, "opacity", a, e - a, s) : (s = new ft(h, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = l ? 1 : 0, h.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = Ft), l && (s = new ft(h, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(i)), s
            }
        })
        ;
        var Nt = function(t, e) {
                e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(E, "-$1").toLowerCase())) : t.removeAttribute(e))
            },
            Bt = function(t) {
                if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                    this.t.setAttribute("class", 0 === t ? this.b : this.e);
                    for (var e = this.data, i = this.t.style; e;)
                        e.v ? i[e.p] = e.v : Nt(i, e.p),
                        e = e._next;
                    1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else
                    this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
        vt("className", {
            parser: function(t, e, r, s, o, a, h) {
                var l,
                    c,
                    u,
                    d,
                    p,
                    f = t.getAttribute("class") || "",
                    _ = t.style.cssText;
                if (o = s._classNamePT = new ft(t, r, 0, 0, o, 2), o.setRatio = Bt, o.pr = -11, i = !0, o.b = f, c = Q(t, n), u = t._gsClassPT) {
                    for (d = {}, p = u.data; p;)
                        d[p.p] = 1,
                        p = p._next;
                    u.setRatio(1)
                }
                return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), s._tween._duration && (t.setAttribute("class", o.e), l = J(t, c, Q(t), h, d), t.setAttribute("class", f), o.data = l.firstMPT, t.style.cssText = _, o = o.xfirst = s.parse(t, l.difs, o, a)), o
            }
        });
        var Ut = function(t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e,
                    i,
                    r,
                    n,
                    s = this.t.style,
                    o = h.transform.parse;
                if ("all" === this.e)
                    s.cssText = "",
                    n = !0;
                else
                    for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;)
                        i = e[r],
                        h[i] && (h[i].parse === o ? n = !0 : i = "transformOrigin" === i ? St : h[i].p),
                        Nt(s, i);
                n && (Nt(s, Tt), this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (vt("clearProps", {
            parser: function(t, e, r, n, s) {
                return s = new ft(t, r, 0, 0, s, 2), s.setRatio = Ut, s.e = e, s.pr = -10, s.data = n._tween, i = !0, s
            }
        }), l = "bezier,throwProps,physicsProps,physics2D".split(","), gt = l.length; gt--;)
            yt(l[gt]);
        l = o.prototype,
        l._firstPT = l._lastParsedTransform = l._transform = null,
        l._onInitTween = function(t, e, a) {
            if (!t.nodeType)
                return !1;
            this._target = t,
            this._tween = a,
            this._vars = e,
            c = e.autoRound,
            i = !1,
            r = e.suffixMap || o.suffixMap,
            n = q(t, ""),
            s = this._overwriteProps;
            var h,
                l,
                p,
                _,
                g,
                m,
                v,
                y,
                x,
                b = t.style;
            if (u && "" === b.zIndex && ("auto" === (h = K(t, "zIndex", n)) || "" === h) && this._addLazySet(b, "zIndex", 0), "string" == typeof e && (_ = b.cssText, h = Q(t, n), b.cssText = _ + ";" + e, h = J(t, h, Q(t)).difs, !G && T.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, b.cssText = _), this._firstPT = l = this.parse(t, e, null), this._transformType) {
                for (x = 3 === this._transformType, Tt ? d && (u = !0, "" === b.zIndex && ("auto" === (v = K(t, "zIndex", n)) || "" === v) && this._addLazySet(b, "zIndex", 0), f && this._addLazySet(b, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : b.zoom = 1, p = l; p && p._next;)
                    p = p._next;
                y = new ft(t, "transform", 0, 0, null, 2),
                this._linkCSSP(y, null, p),
                y.setRatio = x && Et ? kt : Tt ? It : Lt,
                y.data = this._transform || Dt(t, n, !0),
                y.tween = a,
                s.pop()
            }
            if (i) {
                for (; l;) {
                    for (m = l._next, p = _; p && p.pr > l.pr;)
                        p = p._next;
                    (l._prev = p ? p._prev : g) ? l._prev._next = l : _ = l,
                    (l._next = p) ? p._prev = l : g = l,
                    l = m
                }
                this._firstPT = _
            }
            return !0
        },
        l.parse = function(t, e, i, s) {
            var o,
                a,
                l,
                u,
                d,
                p,
                f,
                _,
                g,
                m,
                v = t.style;
            for (o in e)
                p = e[o],
                a = h[o],
                a ? i = a.parse(t, p, o, this, i, s, e) : (d = K(t, o, n) + "", g = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || g && S.test(p) ? (g || (p = lt(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = _t(v, o, d, p, !0, "transparent", i, 0, s)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(d), f = l || 0 === l ? d.substr((l + "").length) : "", ("" === d || "auto" === d) && ("width" === o || "height" === o ? (l = it(t, o, n), f = "px") : "left" === o || "top" === o ? (l = Z(t, o, n), f = "px") : (l = "opacity" !== o ? 0 : 1, f = "")), m = g && "=" === p.charAt(1), m ? (u = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), u *= parseFloat(p), _ = p.replace(x, "")) : (u = parseFloat(p), _ = g ? p.replace(x, "") : ""), "" === _ && (_ = o in r ? r[o] : f), p = u || 0 === u ? (m ? u + l : u) + _ : e[o], f !== _ && "" !== _ && (u || 0 === u) && l && (l = $(t, o, l, f), "%" === _ ? (l /= $(t, o, 100, "%") / 100, !0 !== e.strictUnits && (d = l + "%")) : "em" === _ ? l /= $(t, o, 1, "em") : "px" !== _ && (u = $(t, o, u, _), _ = "px"), m && (u || 0 === u) && (p = u + l + _)), m && (u += l), !l && 0 !== l || !u && 0 !== u ? void 0 !== v[o] && (p || "NaN" != p + "" && null != p) ? (i = new ft(v, o, u || l || 0, 0, i, -1, o, !1, 0, d, p), i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : d) : W("invalid " + o + " tween value: " + e[o]) : (i = new ft(v, o, l, u - l, i, 0, o, !1 !== c && ("px" === _ || "zIndex" === o), 0, d, p), i.xs0 = _)) : i = _t(v, o, d, p, !0, null, i, 0, s)),
                s && i && !i.plugin && (i.plugin = s);
            return i
        },
        l.setRatio = function(t) {
            var e,
                i,
                r,
                n = this._firstPT,
                s = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                    for (; n;) {
                        if (e = n.c * t + n.s, n.r ? e = Math.round(e) : s > e && e > -s && (e = 0), n.type)
                            if (1 === n.type)
                                if (2 === (r = n.l))
                                    n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2;
                                else if (3 === r)
                                    n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3;
                                else if (4 === r)
                                    n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4;
                                else if (5 === r)
                                    n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5;
                                else {
                                    for (i = n.xs0 + e + n.xs1, r = 1; n.l > r; r++)
                                        i += n["xn" + r] + n["xs" + (r + 1)];
                                    n.t[n.p] = i
                                }
                            else
                                -1 === n.type ? n.t[n.p] = n.xs0 : n.setRatio && n.setRatio(t);
                        else
                            n.t[n.p] = e + n.xs0;
                        n = n._next
                    }
                else
                    for (; n;)
                        2 !== n.type ? n.t[n.p] = n.b : n.setRatio(t),
                        n = n._next;
            else
                for (; n;)
                    2 !== n.type ? n.t[n.p] = n.e : n.setRatio(t),
                    n = n._next
        },
        l._enableTransforms = function(t) {
            this._transform = this._transform || Dt(this._target, n, !0),
            this._transformType = this._transform.svg && xt || !t && 3 !== this._transformType ? 2 : 3
        };
        var jt = function() {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        l._addLazySet = function(t, e, i) {
            var r = this._firstPT = new ft(t, e, 0, 0, this._firstPT, 2);
            r.e = i,
            r.setRatio = jt,
            r.data = this
        },
        l._linkCSSP = function(t, e, i, r) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
        },
        l._kill = function(e) {
            var i,
                r,
                n,
                s = e;
            if (e.autoAlpha || e.alpha) {
                s = {};
                for (r in e)
                    s[r] = e[r];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            return e.className && (i = this._classNamePT) && (n = i.xfirst, n && n._prev ? this._linkCSSP(n._prev, i._next, n._prev._prev) : n === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, n._prev), this._classNamePT = null), t.prototype._kill.call(this, s)
        };
        var Xt = function(t, e, i) {
            var r,
                n,
                s,
                o;
            if (t.slice)
                for (n = t.length; --n > -1;)
                    Xt(t[n], e, i);
            else
                for (r = t.childNodes, n = r.length; --n > -1;)
                    s = r[n],
                    o = s.type,
                    s.style && (e.push(Q(s)), i && i.push(s)),
                    1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Xt(s, e, i)
        };
        return o.cascadeTo = function(t, i, r) {
            var n,
                s,
                o,
                a,
                h = e.to(t, i, r),
                l = [h],
                c = [],
                u = [],
                d = [],
                p = e._internals.reservedProps;
            for (t = h._targets || h.target, Xt(t, c, d), h.render(i, !0, !0), Xt(t, u), h.render(0, !0, !0), h._enabled(!0), n = d.length; --n > -1;)
                if (s = J(d[n], c[n], u[n]), s.firstMPT) {
                    s = s.difs;
                    for (o in r)
                        p[o] && (s[o] = r[o]);
                    a = {};
                    for (o in s)
                        a[o] = c[n][o];
                    l.push(e.fromTo(d[n], i, a, s))
                }
            return l
        }, t.activate([o]), o
    }, !0),
    function() {
        var t = _gsScope._gsDefine.plugin({
                propName: "roundProps",
                priority: -1,
                API: 2,
                init: function(t, e, i) {
                    return this._tween = i, !0
                }
            }),
            e = t.prototype;
        e._onInitAllProps = function() {
            for (var t, e, i, r = this._tween, n = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), s = n.length, o = {}, a = r._propLookup.roundProps; --s > -1;)
                o[n[s]] = 1;
            for (s = n.length; --s > -1;)
                for (t = n[s], e = r._firstPT; e;)
                    i = e._next,
                    e.pg ? e.t._roundProps(o, !0) : e.n === t && (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : r._firstPT === e && (r._firstPT = i), e._next = e._prev = null, r._propLookup[t] = a),
                    e = i;
            return !1
        },
        e._add = function(t, e, i, r) {
            this._addTween(t, e, i, i + r, e, !0),
            this._overwriteProps.push(e)
        }
    }(),
    _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.3.3",
        init: function(t, e) {
            var i,
                r,
                n;
            if ("function" != typeof t.setAttribute)
                return !1;
            this._target = t,
            this._proxy = {},
            this._start = {},
            this._end = {};
            for (i in e)
                this._start[i] = this._proxy[i] = r = t.getAttribute(i),
                n = this._addTween(this._proxy, i, parseFloat(r), e[i], i),
                this._end[i] = n ? n.s + n.c : e[i],
                this._overwriteProps.push(i);
            return !0
        },
        set: function(t) {
            this._super.setRatio.call(this, t);
            for (var e, i = this._overwriteProps, r = i.length, n = 1 === t ? this._end : t ? this._proxy : this._start; --r > -1;)
                e = i[r],
                this._target.setAttribute(e, n[e] + "")
        }
    }),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.2.1",
        API: 2,
        init: function(t, e) {
            "object" != typeof e && (e = {
                rotation: e
            }),
            this.finals = {};
            var i,
                r,
                n,
                s,
                o,
                a,
                h = !0 === e.useRadians ? 2 * Math.PI : 360,
                l = 1e-6;
            for (i in e)
                "useRadians" !== i && (a = (e[i] + "").split("_"), r = a[0], n = parseFloat("function" != typeof t[i] ? t[i] : t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]()), s = this.finals[i] = "string" == typeof r && "=" === r.charAt(1) ? n + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, o = s - n, a.length && (r = a.join("_"), -1 !== r.indexOf("short") && (o %= h) !== o % (h / 2) && (o = 0 > o ? o + h : o - h), -1 !== r.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * h) % h - (0 | o / h) * h : -1 !== r.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * h) % h - (0 | o / h) * h)), (o > l || -l > o) && (this._addTween(t, i, n, n + o, i), this._overwriteProps.push(i)));
            return !0
        },
        set: function(t) {
            var e;
            if (1 !== t)
                this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e;)
                    e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p],
                    e = e._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
        var e,
            i,
            r,
            n = _gsScope.GreenSockGlobals || _gsScope,
            s = n.com.greensock,
            o = 2 * Math.PI,
            a = Math.PI / 2,
            h = s._class,
            l = function(e, i) {
                var r = h("easing." + e, function() {}, !0),
                    n = r.prototype = new t;
                return n.constructor = r, n.getRatio = i, r
            },
            c = t.register || function() {},
            u = function(t, e, i, r) {
                var n = h("easing." + t, {
                    easeOut: new e,
                    easeIn: new i,
                    easeInOut: new r
                }, !0);
                return c(n, t), n
            },
            d = function(t, e, i) {
                this.t = t,
                this.v = e,
                i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
            },
            p = function(e, i) {
                var r = h("easing." + e, function(t) {
                        this._p1 = t || 0 === t ? t : 1.70158,
                        this._p2 = 1.525 * this._p1
                    }, !0),
                    n = r.prototype = new t;
                return n.constructor = r, n.getRatio = i, n.config = function(t) {
                    return new r(t)
                }, r
            },
            f = u("Back", p("BackOut", function(t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), p("BackIn", function(t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), p("BackInOut", function(t) {
                return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })),
            _ = h("easing.SlowMo", function(t, e, i) {
                e = e || 0 === e ? e : .7,
                null == t ? t = .7 : t > 1 && (t = 1),
                this._p = 1 !== t ? e : 0,
                this._p1 = (1 - t) / 2,
                this._p2 = t,
                this._p3 = this._p1 + this._p2,
                this._calcEnd = !0 === i
            }, !0),
            g = _.prototype = new t;
        return g.constructor = _, g.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, _.ease = new _(.7, .7), g.config = _.config = function(t, e, i) {
            return new _(t, e, i)
        }, e = h("easing.SteppedEase", function(t) {
            t = t || 1,
            this._p1 = 1 / t,
            this._p2 = t + 1
        }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, g.config = e.config = function(t) {
            return new e(t)
        }, i = h("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, r, n, s, o, a, h = e.taper || "none", l = [], c = 0, u = 0 | (e.points || 20), p = u, f = !1 !== e.randomize, _ = !0 === e.clamp, g = e.template instanceof t ? e.template : null, m = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;)
                i = f ? Math.random() : 1 / u * p,
                r = g ? g.getRatio(i) : i,
                "none" === h ? n = m : "out" === h ? (s = 1 - i, n = s * s * m) : "in" === h ? n = i * i * m : .5 > i ? (s = 2 * i, n = .5 * s * s * m) : (s = 2 * (1 - i), n = .5 * s * s * m),
                f ? r += Math.random() * n - .5 * n : p % 2 ? r += .5 * n : r -= .5 * n,
                _ && (r > 1 ? r = 1 : 0 > r && (r = 0)),
                l[c++] = {
                    x: i,
                    y: r
                };
            for (l.sort(function(t, e) {
                return t.x - e.x
            }), a = new d(1, 1, null), p = u; --p > -1;)
                o = l[p],
                a = new d(o.x, o.y, a);
            this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
        }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;)
                    e = e.next;
                e = e.prev
            } else
                for (; e.prev && e.t >= t;)
                    e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, g.config = function(t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function(t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), r = function(e, i, r) {
            var n = h("easing." + e, function(t, e) {
                    this._p1 = t >= 1 ? t : 1,
                    this._p2 = (e || r) / (1 > t ? t : 1),
                    this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0),
                    this._p2 = o / this._p2
                }, !0),
                s = n.prototype = new t;
            return s.constructor = n, s.getRatio = i, s.config = function(t, e) {
                return new n(t, e)
            }, n
        }, u("Elastic", r("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), r("ElasticIn", function(t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), r("ElasticInOut", function(t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) + 1
        }, .45)), u("Expo", l("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function(t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function(t) {
            return Math.sin(t * a)
        }), l("SineIn", function(t) {
            return 1 - Math.cos(t * a)
        }), l("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), h("easing.EaseLookup", {
            find: function(e) {
                return t.map[e]
            }
        }, !0), c(n.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
        var r,
            n,
            s,
            o,
            a,
            h = function(t) {
                var e,
                    r = t.split("."),
                    n = i;
                for (e = 0; r.length > e; e++)
                    n[r[e]] = n = n[r[e]] || {};
                return n
            },
            l = h("com.greensock"),
            c = 1e-10,
            u = function(t) {
                var e,
                    i = [],
                    r = t.length;
                for (e = 0; e !== r; i.push(t[e++]))
                    ;
                return i
            },
            d = function() {},
            p = function() {
                var t = Object.prototype.toString,
                    e = t.call([]);
                return function(i) {
                    return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                }
            }(),
            f = {},
            _ = function(r, n, s, o) {
                this.sc = f[r] ? f[r].sc : [],
                f[r] = this,
                this.gsClass = null,
                this.func = s;
                var a = [];
                this.check = function(l) {
                    for (var c, u, d, p, g = n.length, m = g; --g > -1;)
                        (c = f[n[g]] || new _(n[g], [])).gsClass ? (a[g] = c.gsClass, m--) : l && c.sc.push(this);
                    if (0 === m && s)
                        for (u = ("com.greensock." + r).split("."), d = u.pop(), p = h(u.join("."))[d] = this.gsClass = s.apply(s, a), o && (i[d] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
                            return p
                        }) : r === e && "undefined" != typeof module && module.exports && (module.exports = p)), g = 0; this.sc.length > g; g++)
                            this.sc[g].check()
                },
                this.check(!0)
            },
            g = t._gsDefine = function(t, e, i, r) {
                return new _(t, e, i, r)
            },
            m = l._class = function(t, e, i) {
                return e = e || function() {}, g(t, [], function() {
                    return e
                }, i), e
            };
        g.globals = i;
        var v = [0, 0, 1, 1],
            y = [],
            x = m("easing.Ease", function(t, e, i, r) {
                this._func = t,
                this._type = i || 0,
                this._power = r || 0,
                this._params = e ? v.concat(e) : v
            }, !0),
            b = x.map = {},
            T = x.register = function(t, e, i, r) {
                for (var n, s, o, a, h = e.split(","), c = h.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
                    for (s = h[c], n = r ? m("easing." + s, null, !0) : l.easing[s] || {}, o = u.length; --o > -1;)
                        a = u[o],
                        b[s + "." + a] = b[a + s] = n[a] = t.getRatio ? t : t[a] || new t
            };
        for (s = x.prototype, s._calcEnd = !1, s.getRatio = function(t) {
            if (this._func)
                return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type,
                i = this._power,
                r = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === i ? r *= r : 2 === i ? r *= r * r : 3 === i ? r *= r * r * r : 4 === i && (r *= r * r * r * r), 1 === e ? 1 - r : 2 === e ? r : .5 > t ? r / 2 : 1 - r / 2
        }, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = r.length; --n > -1;)
            s = r[n] + ",Power" + n,
            T(new x(null, null, 1, n), s, "easeOut", !0),
            T(new x(null, null, 2, n), s, "easeIn" + (0 === n ? ",easeNone" : "")),
            T(new x(null, null, 3, n), s, "easeInOut");
        b.linear = l.easing.Linear.easeIn,
        b.swing = l.easing.Quad.easeInOut;
        var w = m("events.EventDispatcher", function(t) {
            this._listeners = {},
            this._eventTarget = t || this
        });
        s = w.prototype,
        s.addEventListener = function(t, e, i, r, n) {
            n = n || 0;
            var s,
                h,
                l = this._listeners[t],
                c = 0;
            for (null == l && (this._listeners[t] = l = []), h = l.length; --h > -1;)
                s = l[h],
                s.c === e && s.s === i ? l.splice(h, 1) : 0 === c && n > s.pr && (c = h + 1);
            l.splice(c, 0, {
                c: e,
                s: i,
                up: r,
                pr: n
            }),
            this !== o || a || o.wake()
        },
        s.removeEventListener = function(t, e) {
            var i,
                r = this._listeners[t];
            if (r)
                for (i = r.length; --i > -1;)
                    if (r[i].c === e)
                        return void r.splice(i, 1)
        },
        s.dispatchEvent = function(t) {
            var e,
                i,
                r,
                n = this._listeners[t];
            if (n)
                for (e = n.length, i = this._eventTarget; --e > -1;)
                    (r = n[e]) && (r.up ? r.c.call(r.s || i, {
                        type: t,
                        target: i
                    }) : r.c.call(r.s || i))
        };
        var S = t.requestAnimationFrame,
            E = t.cancelAnimationFrame,
            A = Date.now || function() {
                return (new Date).getTime()
            },
            R = A();
        for (r = ["ms", "moz", "webkit", "o"], n = r.length; --n > -1 && !S;)
            S = t[r[n] + "RequestAnimationFrame"],
            E = t[r[n] + "CancelAnimationFrame"] || t[r[n] + "CancelRequestAnimationFrame"];
        m("Ticker", function(t, e) {
            var i,
                r,
                n,
                s,
                h,
                l = this,
                u = A(),
                p = !1 !== e && S,
                f = 500,
                _ = 33,
                g = "tick",
                m = function(t) {
                    var e,
                        o,
                        a = A() - R;
                    a > f && (u += a - _),
                    R += a,
                    l.time = (R - u) / 1e3,
                    e = l.time - h,
                    (!i || e > 0 || !0 === t) && (l.frame++, h += e + (e >= s ? .004 : s - e), o = !0),
                    !0 !== t && (n = r(m)),
                    o && l.dispatchEvent(g)
                };
            w.call(l),
            l.time = l.frame = 0,
            l.tick = function() {
                m(!0)
            },
            l.lagSmoothing = function(t, e) {
                f = t || 1 / c,
                _ = Math.min(e, f, 0)
            },
            l.sleep = function() {
                null != n && (p && E ? E(n) : clearTimeout(n), r = d, n = null, l === o && (a = !1))
            },
            l.wake = function() {
                null !== n ? l.sleep() : l.frame > 10 && (R = A() - f + 5),
                r = 0 === i ? d : p && S ? S : function(t) {
                    return setTimeout(t, 0 | 1e3 * (h - l.time) + 1)
                },
                l === o && (a = !0),
                m(2)
            },
            l.fps = function(t) {
                return arguments.length ? (i = t, s = 1 / (i || 60), h = this.time + s, void l.wake()) : i
            },
            l.useRAF = function(t) {
                return arguments.length ? (l.sleep(), p = t, void l.fps(i)) : p
            },
            l.fps(t),
            setTimeout(function() {
                p && (!n || 5 > l.frame) && l.useRAF(!1)
            }, 1500)
        }),
        s = l.Ticker.prototype = new l.events.EventDispatcher,
        s.constructor = l.Ticker;
        var C = m("core.Animation", function(t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, z) {
                a || o.wake();
                var i = this.vars.useFrames ? G : z;
                i.add(this, i._time),
                this.vars.paused && this.paused(!0)
            }
        });
        o = C.ticker = new l.Ticker,
        s = C.prototype,
        s._dirty = s._gc = s._initted = s._paused = !1,
        s._totalTime = s._time = 0,
        s._rawPrevTime = -1,
        s._next = s._last = s._onUpdate = s._timeline = s.timeline = null,
        s._paused = !1;
        var M = function() {
            a && A() - R > 2e3 && o.wake(),
            setTimeout(M, 2e3)
        };
        M(),
        s.play = function(t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        },
        s.pause = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        },
        s.resume = function(t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        },
        s.seek = function(t, e) {
            return this.totalTime(Number(t), !1 !== e)
        },
        s.restart = function(t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
        },
        s.reverse = function(t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        },
        s.render = function() {},
        s.invalidate = function() {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        },
        s.isActive = function() {
            var t,
                e = this._timeline,
                i = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
        },
        s._enabled = function(t, e) {
            return a || o.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        },
        s._kill = function() {
            return this._enabled(!1, !1)
        },
        s.kill = function(t, e) {
            return this._kill(t, e), this
        },
        s._uncache = function(t) {
            for (var e = t ? this : this.timeline; e;)
                e._dirty = !0,
                e = e.timeline;
            return this
        },
        s._swapSelfInParams = function(t) {
            for (var e = t.length, i = t.concat(); --e > -1;)
                "{self}" === t[e] && (i[e] = this);
            return i
        },
        s.eventCallback = function(t, e, i, r) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length)
                    return n[t];
                null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = r),
                "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        },
        s.delay = function(t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        },
        s.duration = function(t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        },
        s.totalDuration = function(t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        },
        s.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        },
        s.totalTime = function(t, e, i) {
            if (a || o.wake(), !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var r = this._totalDuration,
                        n = this._timeline;
                    if (t > r && !i && (t = r), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? r - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)
                        for (; n._timeline;)
                            n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0),
                            n = n._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), k.length && V())
            }
            return this
        },
        s.progress = s.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
        },
        s.startTime = function(t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        },
        s.endTime = function(t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        },
        s.timeScale = function(t) {
            if (!arguments.length)
                return this._timeScale;
            if (t = t || c, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime,
                    i = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        },
        s.reversed = function(t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        },
        s.paused = function(t) {
            if (!arguments.length)
                return this._paused;
            var e,
                i,
                r = this._timeline;
            return t != this._paused && r && (a || t || o.wake(), e = r.rawTime(), i = e - this._pauseTime, !t && r.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && this.render(r.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)), this._gc && !t && this._enabled(!0, !1), this
        };
        var P = m("core.SimpleTimeline", function(t) {
            C.call(this, 0, t),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        s = P.prototype = new C,
        s.constructor = P,
        s.kill()._gc = !1,
        s._first = s._last = s._recent = null,
        s._sortChildren = !1,
        s.add = s.insert = function(t, e) {
            var i,
                r;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                for (r = t._startTime; i && i._startTime > r;)
                    i = i._prev;
            return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
        },
        s._remove = function(t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        },
        s.render = function(t, e, i) {
            var r,
                n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;)
                r = n._next,
                (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                n = r
        },
        s.rawTime = function() {
            return a || o.wake(), this._totalTime
        };
        var O = m("TweenLite", function(e, i, r) {
                if (C.call(this, i, r), this.render = O.prototype.render, null == e)
                    throw "Cannot tween a null target.";
                this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                var n,
                    s,
                    o,
                    a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                    h = this.vars.overwrite;
                if (this._overwrite = h = null == h ? X[O.defaultOverwrite] : "number" == typeof h ? h >> 0 : X[h], (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                    for (this._targets = o = u(e), this._propLookup = [], this._siblings = [], n = 0; o.length > n; n++)
                        s = o[n],
                        s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(n--, 1), this._targets = o = o.concat(u(s))) : (this._siblings[n] = Y(s, this, !1), 1 === h && this._siblings[n].length > 1 && q(s, this, null, 1, this._siblings[n])) : "string" == typeof (s = o[n--] = O.selector(s)) && o.splice(n + 1, 1) : o.splice(n--, 1);
                else
                    this._propLookup = {},
                    this._siblings = Y(e, this, !1),
                    1 === h && this._siblings.length > 1 && q(e, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -c, this.render(-this._delay))
            }, !0),
            D = function(e) {
                return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
            },
            L = function(t, e) {
                var i,
                    r = {};
                for (i in t)
                    j[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (r[i] = t[i], delete t[i]);
                t.css = r
            };
        s = O.prototype = new C,
        s.constructor = O,
        s.kill()._gc = !1,
        s.ratio = 0,
        s._firstPT = s._targets = s._overwrittenProps = s._startAt = null,
        s._notifyPluginsOfEnabled = s._lazy = !1,
        O.version = "1.16.0",
        O.defaultEase = s._ease = new x(null, null, 1, 1),
        O.defaultOverwrite = "auto",
        O.ticker = o,
        O.autoSleep = 120,
        O.lagSmoothing = function(t, e) {
            o.lagSmoothing(t, e)
        },
        O.selector = t.$ || t.jQuery || function(e) {
            var i = t.$ || t.jQuery;
            return i ? (O.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
        };
        var k = [],
            I = {},
            F = O._internals = {
                isArray: p,
                isSelector: D,
                lazyTweens: k
            },
            N = O._plugins = {},
            B = F.tweenLookup = {},
            U = 0,
            j = F.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1
            },
            X = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                true: 1,
                false: 0
            },
            G = C._rootFramesTimeline = new P,
            z = C._rootTimeline = new P,
            W = 30,
            V = F.lazyRender = function() {
                var t,
                    e = k.length;
                for (I = {}; --e > -1;)
                    (t = k[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                k.length = 0
            };
        z._startTime = o.time,
        G._startTime = o.frame,
        z._active = G._active = !0,
        setTimeout(V, 1),
        C._updateRoot = O.render = function() {
            var t,
                e,
                i;
            if (k.length && V(), z.render((o.time - z._startTime) * z._timeScale, !1, !1), G.render((o.frame - G._startTime) * G._timeScale, !1, !1), k.length && V(), o.frame >= W) {
                W = o.frame + (parseInt(O.autoSleep, 10) || 120);
                for (i in B) {
                    for (e = B[i].tweens, t = e.length; --t > -1;)
                        e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete B[i]
                }
                if ((!(i = z._first) || i._paused) && O.autoSleep && !G._first && 1 === o._listeners.tick.length) {
                    for (; i && i._paused;)
                        i = i._next;
                    i || o.sleep()
                }
            }
        },
        o.addEventListener("tick", C._updateRoot);
        var Y = function(t, e, i) {
                var r,
                    n,
                    s = t._gsTweenID;
                if (B[s || (t._gsTweenID = s = "t" + U++)] || (B[s] = {
                    target: t,
                    tweens: []
                }), e && (r = B[s].tweens, r[n = r.length] = e, i))
                    for (; --n > -1;)
                        r[n] === e && r.splice(n, 1);
                return B[s].tweens
            },
            H = function(t, e, i, r) {
                var n,
                    s,
                    o = t.vars.onOverwrite;
                return o && (n = o(t, e, i, r)), o = O.onOverwrite, o && (s = o(t, e, i, r)), !1 !== n && !1 !== s
            },
            q = function(t, e, i, r, n) {
                var s,
                    o,
                    a,
                    h;
                if (1 === r || r >= 4) {
                    for (h = n.length, s = 0; h > s; s++)
                        if ((a = n[s]) !== e)
                            a._gc || H(a, e) && a._enabled(!1, !1) && (o = !0);
                        else if (5 === r)
                            break;
                    return o
                }
                var l,
                    u = e._startTime + c,
                    d = [],
                    p = 0,
                    f = 0 === e._duration;
                for (s = n.length; --s > -1;)
                    (a = n[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (l = l || K(e, 0, f), 0 === K(a, l, f) && (d[p++] = a)) : u >= a._startTime && a._startTime + a.totalDuration() / a._timeScale > u && ((f || !a._initted) && 2e-10 >= u - a._startTime || (d[p++] = a)));
                for (s = p; --s > -1;)
                    if (a = d[s], 2 === r && a._kill(i, t, e) && (o = !0), 2 !== r || !a._firstPT && a._initted) {
                        if (2 !== r && !H(a, e))
                            continue;
                        a._enabled(!1, !1) && (o = !0)
                    }
                return o
            },
            K = function(t, e, i) {
                for (var r = t._timeline, n = r._timeScale, s = t._startTime; r._timeline;) {
                    if (s += r._startTime, n *= r._timeScale, r._paused)
                        return -100;
                    r = r._timeline
                }
                return s /= n, s > e ? s - e : i && s === e || !t._initted && 2 * c > s - e ? c : (s += t.totalDuration() / t._timeScale / n) > e + c ? 0 : s - e - c
            };
        s._init = function() {
            var t,
                e,
                i,
                r,
                n,
                s = this.vars,
                o = this._overwrittenProps,
                a = this._duration,
                h = !!s.immediateRender,
                l = s.ease;
            if (s.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
                n = {};
                for (r in s.startAt)
                    n[r] = s.startAt[r];
                if (n.overwrite = !1, n.immediateRender = !0, n.lazy = h && !1 !== s.lazy, n.startAt = n.delay = null, this._startAt = O.to(this.target, 0, n), h)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== a)
                        return
            } else if (s.runBackwards && 0 !== a)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null;
                else {
                    0 !== this._time && (h = !1),
                    i = {};
                    for (r in s)
                        j[r] && "autoCSS" !== r || (i[r] = s[r]);
                    if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== s.lazy, i.immediateRender = h, this._startAt = O.to(this.target, 0, i), h) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = l = l ? l instanceof x ? l : "function" == typeof l ? new x(l, s.easeParams) : b[l] || O.defaultEase : O.defaultEase, s.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (t = this._targets.length; --t > -1;)
                    this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0);
            else
                e = this._initProps(this.target, this._propLookup, this._siblings, o);
            if (e && O._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                for (i = this._firstPT; i;)
                    i.s += i.c,
                    i.c = -i.c,
                    i = i._next;
            this._onUpdate = s.onUpdate,
            this._initted = !0
        },
        s._initProps = function(e, i, r, n) {
            var s,
                o,
                a,
                h,
                l,
                c;
            if (null == e)
                return !1;
            I[e._gsTweenID] && V(),
            this.vars.css || e.style && e !== t && e.nodeType && N.css && !1 !== this.vars.autoCSS && L(this.vars, e);
            for (s in this.vars) {
                if (c = this.vars[s], j[s])
                    c && (c instanceof Array || c.push && p(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[s] = c = this._swapSelfInParams(c, this));
                else if (N[s] && (h = new N[s])._onInitTween(e, this.vars[s], this)) {
                    for (this._firstPT = l = {
                        _next: this._firstPT,
                        t: h,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: s,
                        pg: !0,
                        pr: h._priority
                    }, o = h._overwriteProps.length; --o > -1;)
                        i[h._overwriteProps[o]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (a = !0),
                    (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else
                    this._firstPT = i[s] = l = {
                        _next: this._firstPT,
                        t: e,
                        p: s,
                        f: "function" == typeof e[s],
                        n: s,
                        pg: !1,
                        pr: 0
                    },
                    l.s = l.f ? e[s.indexOf("set") || "function" != typeof e["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(e[s]),
                    l.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - l.s || 0;
                l && l._next && (l._next._prev = l)
            }
            return n && this._kill(n, e) ? this._initProps(e, i, r, n) : this._overwrite > 1 && this._firstPT && r.length > 1 && q(e, this, i, this._overwrite, r) ? (this._kill(i, e), this._initProps(e, i, r, n)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (I[e._gsTweenID] = !0), a)
        },
        s.render = function(t, e, i) {
            var r,
                n,
                s,
                o,
                a = this._time,
                h = this._duration,
                l = this._rawPrevTime;
            if (t >= h)
                this._totalTime = this._time = h,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (r = !0, n = "onComplete"),
                0 === h && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === c && "isPause" !== this.data) && l !== t && (i = !0, l > c && (n = "onReverseComplete")),
                this._rawPrevTime = o = !e || t || l === t ? t : c);
            else if (1e-7 > t)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== a || 0 === h && l > 0) && (n = "onReverseComplete", r = this._reversed),
                0 > t && (this._active = !1, 0 === h && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== c || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || l === t ? t : c)),
                this._initted || (i = !0);
            else if (this._totalTime = this._time = t, this._easeType) {
                var u = t / h,
                    d = this._easeType,
                    p = this._easePower;
                (1 === d || 3 === d && u >= .5) && (u = 1 - u),
                3 === d && (u *= 2),
                1 === p ? u *= u : 2 === p ? u *= u * u : 3 === p ? u *= u * u * u : 4 === p && (u *= u * u * u * u),
                this.ratio = 1 === d ? 1 - u : 2 === d ? u : .5 > t / h ? u / 2 : 1 - u / 2
            } else
                this.ratio = this._ease.getRatio(t / h);
            if (this._time !== a || i) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)
                        return;
                    if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = a, this._rawPrevTime = l, k.push(this), void (this._lazy = [t, e]);
                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / h) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === h) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), s = this._firstPT; s;)
                    s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                    s = s._next;
                this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== a || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)),
                n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || y), 0 === h && this._rawPrevTime === c && o !== c && (this._rawPrevTime = 0))
            }
        },
        s._kill = function(t, e, i) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target))
                return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
            var r,
                n,
                s,
                o,
                a,
                h,
                l,
                c,
                u;
            if ((p(e) || D(e)) && "number" != typeof e[0])
                for (r = e.length; --r > -1;)
                    this._kill(t, e[r]) && (h = !0);
            else {
                if (this._targets) {
                    for (r = this._targets.length; --r > -1;)
                        if (e === this._targets[r]) {
                            a = this._propLookup[r] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            n = this._overwrittenProps[r] = t ? this._overwrittenProps[r] || {} : "all";
                            break
                        }
                } else {
                    if (e !== this.target)
                        return !1;
                    a = this._propLookup,
                    n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    if (l = t || a, c = t !== n && "all" !== n && t !== a && ("object" != typeof t || !t._tempKill), i && (O.onOverwrite || this.vars.onOverwrite)) {
                        for (s in l)
                            a[s] && (u || (u = []), u.push(s));
                        if (!H(this, i, e, u))
                            return !1
                    }
                    for (s in l)
                        (o = a[s]) && (o.pg && o.t._kill(l) && (h = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]),
                        c && (n[s] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return h
        },
        s.invalidate = function() {
            return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
        },
        s._enabled = function(t, e) {
            if (a || o.wake(), t && this._gc) {
                var i,
                    r = this._targets;
                if (r)
                    for (i = r.length; --i > -1;)
                        this._siblings[i] = Y(r[i], this, !0);
                else
                    this._siblings = Y(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        },
        O.to = function(t, e, i) {
            return new O(t, e, i)
        },
        O.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new O(t, e, i)
        },
        O.fromTo = function(t, e, i, r) {
            return r.startAt = i, r.immediateRender = 0 != r.immediateRender && 0 != i.immediateRender, new O(t, e, r)
        },
        O.delayedCall = function(t, e, i, r, n) {
            return new O(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                onCompleteScope: r,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                onReverseCompleteScope: r,
                immediateRender: !1,
                lazy: !1,
                useFrames: n,
                overwrite: 0
            })
        },
        O.set = function(t, e) {
            return new O(t, 0, e)
        },
        O.getTweensOf = function(t, e) {
            if (null == t)
                return [];
            t = "string" != typeof t ? t : O.selector(t) || t;
            var i,
                r,
                n,
                s;
            if ((p(t) || D(t)) && "number" != typeof t[0]) {
                for (i = t.length, r = []; --i > -1;)
                    r = r.concat(O.getTweensOf(t[i], e));
                for (i = r.length; --i > -1;)
                    for (s = r[i], n = i; --n > -1;)
                        s === r[n] && r.splice(i, 1)
            } else
                for (r = Y(t).concat(), i = r.length; --i > -1;)
                    (r[i]._gc || e && !r[i].isActive()) && r.splice(i, 1);
            return r
        },
        O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
            "object" == typeof e && (i = e, e = !1);
            for (var r = O.getTweensOf(t, e), n = r.length; --n > -1;)
                r[n]._kill(i, t)
        };
        var $ = m("plugins.TweenPlugin", function(t, e) {
            this._overwriteProps = (t || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = e || 0,
            this._super = $.prototype
        }, !0);
        if (s = $.prototype, $.version = "1.10.1", $.API = 2, s._firstPT = null, s._addTween = function(t, e, i, r, n, s) {
            var o,
                a;
            return null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - i : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = a = {
                _next: this._firstPT,
                t: t,
                p: e,
                s: i,
                c: o,
                f: "function" == typeof t[e],
                n: n || e,
                r: s
            }, a._next && (a._next._prev = a), a) : void 0
        }, s.setRatio = function(t) {
            for (var e, i = this._firstPT, r = 1e-6; i;)
                e = i.c * t + i.s,
                i.r ? e = Math.round(e) : r > e && e > -r && (e = 0),
                i.f ? i.t[i.p](e) : i.t[i.p] = e,
                i = i._next
        }, s._kill = function(t) {
            var e,
                i = this._overwriteProps,
                r = this._firstPT;
            if (null != t[this._propName])
                this._overwriteProps = [];
            else
                for (e = i.length; --e > -1;)
                    null != t[i[e]] && i.splice(e, 1);
            for (; r;)
                null != t[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)),
                r = r._next;
            return !1
        }, s._roundProps = function(t, e) {
            for (var i = this._firstPT; i;)
                (t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e),
                i = i._next
        }, O._onPluginEvent = function(t, e) {
            var i,
                r,
                n,
                s,
                o,
                a = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; a;) {
                    for (o = a._next, r = n; r && r.pr > a.pr;)
                        r = r._next;
                    (a._prev = r ? r._prev : s) ? a._prev._next = a : n = a,
                    (a._next = r) ? r._prev = a : s = a,
                    a = o
                }
                a = e._firstPT = n
            }
            for (; a;)
                a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0),
                a = a._next;
            return i
        }, $.activate = function(t) {
            for (var e = t.length; --e > -1;)
                t[e].API === $.API && (N[(new t[e])._propName] = t[e]);
            return !0
        }, g.plugin = function(t) {
            if (!(t && t.propName && t.init && t.API))
                throw "illegal plugin definition.";
            var e,
                i = t.propName,
                r = t.priority || 0,
                n = t.overwriteProps,
                s = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                },
                o = m("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                    $.call(this, i, r),
                    this._overwriteProps = n || []
                }, !0 === t.global),
                a = o.prototype = new $(i);
            a.constructor = o,
            o.API = t.API;
            for (e in s)
                "function" == typeof t[e] && (a[s[e]] = t[e]);
            return o.version = t.version, $.activate([o]), o
        }, r = t._gsQueue) {
            for (n = 0; r.length > n; n++)
                r[n]();
            for (s in f)
                f[s].func || t.console.log("GSAP encountered missing dependency: com.greensock." + s)
        }
        a = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
