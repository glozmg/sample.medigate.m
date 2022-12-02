parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) try {
    f(t[c]);
  } catch (e) {
    i || (i = e);
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "ytxR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodes = exports.reparentNodes = exports.isCEPolyfill = void 0;
    const e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback;
    exports.isCEPolyfill = e;

    const o = (e, o, l = null, s = null) => {
      for (; o !== l;) {
        const l = o.nextSibling;
        e.insertBefore(o, s), o = l;
      }
    };

    exports.reparentNodes = o;

    const l = (e, o, l = null) => {
      for (; o !== l;) {
        const l = o.nextSibling;
        e.removeChild(o), o = l;
      }
    };

    exports.removeNodes = l;
  }, {}],
  "Av0K": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.lastAttributeNameRegex = exports.createMarker = exports.isTemplatePartActive = exports.Template = exports.boundAttributeSuffix = exports.markerRegex = exports.nodeMarker = exports.marker = void 0;
    const e = `{{lit-${String(Math.random()).slice(2)}}}`;
    exports.marker = e;
    const t = `\x3c!--${e}--\x3e`;
    exports.nodeMarker = t;
    const r = new RegExp(`${e}|${t}`);
    exports.markerRegex = r;
    const s = "$lit$";
    exports.boundAttributeSuffix = s;

    class o {
      constructor(t, o) {
        this.parts = [], this.element = o;
        const i = [],
              l = [],
              p = document.createTreeWalker(o.content, 133, null, !1);
        let c = 0,
            d = -1,
            u = 0;
        const {
          strings: f,
          values: {
            length: h
          }
        } = t;

        for (; u < h;) {
          const t = p.nextNode();

          if (null !== t) {
            if (d++, 1 === t.nodeType) {
              if (t.hasAttributes()) {
                const e = t.attributes,
                      {
                  length: o
                } = e;
                let i = 0;

                for (let t = 0; t < o; t++) n(e[t].name, s) && i++;

                for (; i-- > 0;) {
                  const e = f[u],
                        o = x.exec(e)[2],
                        n = o.toLowerCase() + s,
                        i = t.getAttribute(n);
                  t.removeAttribute(n);
                  const a = i.split(r);
                  this.parts.push({
                    type: "attribute",
                    index: d,
                    name: o,
                    strings: a
                  }), u += a.length - 1;
                }
              }

              "TEMPLATE" === t.tagName && (l.push(t), p.currentNode = t.content);
            } else if (3 === t.nodeType) {
              const o = t.data;

              if (o.indexOf(e) >= 0) {
                const e = t.parentNode,
                      l = o.split(r),
                      p = l.length - 1;

                for (let r = 0; r < p; r++) {
                  let o,
                      i = l[r];
                  if ("" === i) o = a();else {
                    const e = x.exec(i);
                    null !== e && n(e[2], s) && (i = i.slice(0, e.index) + e[1] + e[2].slice(0, -s.length) + e[3]), o = document.createTextNode(i);
                  }
                  e.insertBefore(o, t), this.parts.push({
                    type: "node",
                    index: ++d
                  });
                }

                "" === l[p] ? (e.insertBefore(a(), t), i.push(t)) : t.data = l[p], u += p;
              }
            } else if (8 === t.nodeType) if (t.data === e) {
              const e = t.parentNode;
              null !== t.previousSibling && d !== c || (d++, e.insertBefore(a(), t)), c = d, this.parts.push({
                type: "node",
                index: d
              }), null === t.nextSibling ? t.data = "" : (i.push(t), d--), u++;
            } else {
              let r = -1;

              for (; -1 !== (r = t.data.indexOf(e, r + 1));) this.parts.push({
                type: "node",
                index: -1
              }), u++;
            }
          } else p.currentNode = l.pop();
        }

        for (const e of i) e.parentNode.removeChild(e);
      }

    }

    exports.Template = o;

    const n = (e, t) => {
      const r = e.length - t.length;
      return r >= 0 && e.slice(r) === t;
    },
          i = e => -1 !== e.index;

    exports.isTemplatePartActive = i;

    const a = () => document.createComment("");

    exports.createMarker = a;
    const x = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    exports.lastAttributeNameRegex = x;
  }, {}],
  "NXoq": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.removeNodesFromTemplate = n, exports.insertNodeIntoTemplate = l;

    var e = require("./template.js");

    const t = 133;

    function n(e, n) {
      const {
        element: {
          content: r
        },
        parts: l
      } = e,
            u = document.createTreeWalker(r, t, null, !1);
      let c = o(l),
          d = l[c],
          s = -1,
          i = 0;
      const a = [];
      let p = null;

      for (; u.nextNode();) {
        s++;
        const e = u.currentNode;

        for (e.previousSibling === p && (p = null), n.has(e) && (a.push(e), null === p && (p = e)), null !== p && i++; void 0 !== d && d.index === s;) d.index = null !== p ? -1 : d.index - i, d = l[c = o(l, c)];
      }

      a.forEach(e => e.parentNode.removeChild(e));
    }

    const r = e => {
      let n = 11 === e.nodeType ? 0 : 1;
      const r = document.createTreeWalker(e, t, null, !1);

      for (; r.nextNode();) n++;

      return n;
    },
          o = (t, n = -1) => {
      for (let r = n + 1; r < t.length; r++) {
        const n = t[r];
        if ((0, e.isTemplatePartActive)(n)) return r;
      }

      return -1;
    };

    function l(e, n, l = null) {
      const {
        element: {
          content: u
        },
        parts: c
      } = e;
      if (null == l) return void u.appendChild(n);
      const d = document.createTreeWalker(u, t, null, !1);
      let s = o(c),
          i = 0,
          a = -1;

      for (; d.nextNode();) {
        for (a++, d.currentNode === l && (i = r(n), l.parentNode.insertBefore(n, l)); -1 !== s && c[s].index === a;) {
          if (i > 0) {
            for (; -1 !== s;) c[s].index += i, s = o(c, s);

            return;
          }

          s = o(c, s);
        }
      }
    }
  }, {
    "./template.js": "Av0K"
  }],
  "uWh2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isDirective = exports.directive = void 0;

    const e = new WeakMap(),
          t = t => (...s) => {
      const i = t(...s);
      return e.set(i, !0), i;
    };

    exports.directive = t;

    const s = t => "function" == typeof t && e.has(t);

    exports.isDirective = s;
  }, {}],
  "pnLb": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.nothing = exports.noChange = void 0;
    const e = {};
    exports.noChange = e;
    const o = {};
    exports.nothing = o;
  }, {}],
  "bn5t": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.TemplateInstance = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    class s {
      constructor(e, t, s) {
        this.__parts = [], this.template = e, this.processor = t, this.options = s;
      }

      update(e) {
        let t = 0;

        for (const s of this.__parts) void 0 !== s && s.setValue(e[t]), t++;

        for (const s of this.__parts) void 0 !== s && s.commit();
      }

      _clone() {
        const s = e.isCEPolyfill ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
              o = [],
              r = this.template.parts,
              n = document.createTreeWalker(s, 133, null, !1);
        let i,
            p = 0,
            l = 0,
            a = n.nextNode();

        for (; p < r.length;) if (i = r[p], (0, t.isTemplatePartActive)(i)) {
          for (; l < i.index;) l++, "TEMPLATE" === a.nodeName && (o.push(a), n.currentNode = a.content), null === (a = n.nextNode()) && (n.currentNode = o.pop(), a = n.nextNode());

          if ("node" === i.type) {
            const e = this.processor.handleTextExpression(this.options);
            e.insertAfterNode(a.previousSibling), this.__parts.push(e);
          } else this.__parts.push(...this.processor.handleAttributeExpressions(a, i.name, i.strings, this.options));

          p++;
        } else this.__parts.push(void 0), p++;

        return e.isCEPolyfill && (document.adoptNode(s), customElements.upgrade(s)), s;
      }

    }

    exports.TemplateInstance = s;
  }, {
    "./dom.js": "ytxR",
    "./template.js": "Av0K"
  }],
  "cVNN": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.SVGTemplateResult = exports.TemplateResult = void 0;

    var e = require("./dom.js"),
        t = require("./template.js");

    const s = ` ${t.marker} `;

    class r {
      constructor(e, t, s, r) {
        this.strings = e, this.values = t, this.type = s, this.processor = r;
      }

      getHTML() {
        const e = this.strings.length - 1;
        let r = "",
            n = !1;

        for (let l = 0; l < e; l++) {
          const e = this.strings[l],
                i = e.lastIndexOf("\x3c!--");
          n = (i > -1 || n) && -1 === e.indexOf("--\x3e", i + 1);
          const o = t.lastAttributeNameRegex.exec(e);
          r += null === o ? e + (n ? s : t.nodeMarker) : e.substr(0, o.index) + o[1] + o[2] + t.boundAttributeSuffix + o[3] + t.marker;
        }

        return r += this.strings[e];
      }

      getTemplateElement() {
        const e = document.createElement("template");
        return e.innerHTML = this.getHTML(), e;
      }

    }

    exports.TemplateResult = r;

    class n extends r {
      getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
      }

      getTemplateElement() {
        const t = super.getTemplateElement(),
              s = t.content,
              r = s.firstChild;
        return s.removeChild(r), (0, e.reparentNodes)(s, r.firstChild), t;
      }

    }

    exports.SVGTemplateResult = n;
  }, {
    "./dom.js": "ytxR",
    "./template.js": "Av0K"
  }],
  "atl2": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.EventPart = exports.PropertyPart = exports.PropertyCommitter = exports.BooleanAttributePart = exports.NodePart = exports.AttributePart = exports.AttributeCommitter = exports.isIterable = exports.isPrimitive = void 0;

    var t = require("./directive.js"),
        e = require("./dom.js"),
        i = require("./part.js"),
        s = require("./template-instance.js"),
        n = require("./template-result.js"),
        r = require("./template.js");

    const o = t => null === t || !("object" == typeof t || "function" == typeof t);

    exports.isPrimitive = o;

    const a = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);

    exports.isIterable = a;

    class h {
      constructor(t, e, i) {
        this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];

        for (let s = 0; s < i.length - 1; s++) this.parts[s] = this._createPart();
      }

      _createPart() {
        return new l(this);
      }

      _getValue() {
        const t = this.strings,
              e = t.length - 1;
        let i = "";

        for (let s = 0; s < e; s++) {
          i += t[s];
          const e = this.parts[s];

          if (void 0 !== e) {
            const t = e.value;
            if (o(t) || !a(t)) i += "string" == typeof t ? t : String(t);else for (const e of t) i += "string" == typeof e ? e : String(e);
          }
        }

        return i += t[e];
      }

      commit() {
        this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
      }

    }

    exports.AttributeCommitter = h;

    class l {
      constructor(t) {
        this.value = void 0, this.committer = t;
      }

      setValue(e) {
        e === i.noChange || o(e) && e === this.value || (this.value = e, (0, t.isDirective)(e) || (this.committer.dirty = !0));
      }

      commit() {
        for (; (0, t.isDirective)(this.value);) {
          const t = this.value;
          this.value = i.noChange, t(this);
        }

        this.value !== i.noChange && this.committer.commit();
      }

    }

    exports.AttributePart = l;

    class u {
      constructor(t) {
        this.value = void 0, this.__pendingValue = void 0, this.options = t;
      }

      appendInto(t) {
        this.startNode = t.appendChild((0, r.createMarker)()), this.endNode = t.appendChild((0, r.createMarker)());
      }

      insertAfterNode(t) {
        this.startNode = t, this.endNode = t.nextSibling;
      }

      appendIntoPart(t) {
        t.__insert(this.startNode = (0, r.createMarker)()), t.__insert(this.endNode = (0, r.createMarker)());
      }

      insertAfterPart(t) {
        t.__insert(this.startNode = (0, r.createMarker)()), this.endNode = t.endNode, t.endNode = this.startNode;
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        if (null === this.startNode.parentNode) return;

        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        const e = this.__pendingValue;
        e !== i.noChange && (o(e) ? e !== this.value && this.__commitText(e) : e instanceof n.TemplateResult ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : a(e) ? this.__commitIterable(e) : e === i.nothing ? (this.value = i.nothing, this.clear()) : this.__commitText(e));
      }

      __insert(t) {
        this.endNode.parentNode.insertBefore(t, this.endNode);
      }

      __commitNode(t) {
        this.value !== t && (this.clear(), this.__insert(t), this.value = t);
      }

      __commitText(t) {
        const e = this.startNode.nextSibling,
              i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
        e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.__commitNode(document.createTextNode(i)), this.value = t;
      }

      __commitTemplateResult(t) {
        const e = this.options.templateFactory(t);
        if (this.value instanceof s.TemplateInstance && this.value.template === e) this.value.update(t.values);else {
          const i = new s.TemplateInstance(e, t.processor, this.options),
                n = i._clone();

          i.update(t.values), this.__commitNode(n), this.value = i;
        }
      }

      __commitIterable(t) {
        Array.isArray(this.value) || (this.value = [], this.clear());
        const e = this.value;
        let i,
            s = 0;

        for (const n of t) void 0 === (i = e[s]) && (i = new u(this.options), e.push(i), 0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(n), i.commit(), s++;

        s < e.length && (e.length = s, this.clear(i && i.endNode));
      }

      clear(t = this.startNode) {
        (0, e.removeNodes)(this.startNode.parentNode, t.nextSibling, this.endNode);
      }

    }

    exports.NodePart = u;

    class d {
      constructor(t, e, i) {
        if (this.value = void 0, this.__pendingValue = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
        this.element = t, this.name = e, this.strings = i;
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        if (this.__pendingValue === i.noChange) return;
        const e = !!this.__pendingValue;
        this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = i.noChange;
      }

    }

    exports.BooleanAttributePart = d;

    class c extends h {
      constructor(t, e, i) {
        super(t, e, i), this.single = 2 === i.length && "" === i[0] && "" === i[1];
      }

      _createPart() {
        return new p(this);
      }

      _getValue() {
        return this.single ? this.parts[0].value : super._getValue();
      }

      commit() {
        this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
      }

    }

    exports.PropertyCommitter = c;

    class p extends l {}

    exports.PropertyPart = p;

    let _ = !1;

    (() => {
      try {
        const e = {
          get capture() {
            return _ = !0, !1;
          }

        };
        window.addEventListener("test", e, e), window.removeEventListener("test", e, e);
      } catch (t) {}
    })();

    class m {
      constructor(t, e, i) {
        this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.__boundHandleEvent = t => this.handleEvent(t);
      }

      setValue(t) {
        this.__pendingValue = t;
      }

      commit() {
        for (; (0, t.isDirective)(this.__pendingValue);) {
          const t = this.__pendingValue;
          this.__pendingValue = i.noChange, t(this);
        }

        if (this.__pendingValue === i.noChange) return;
        const e = this.__pendingValue,
              s = this.value,
              n = null == e || null != s && (e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive),
              r = null != e && (null == s || n);
        n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = v(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = i.noChange;
      }

      handleEvent(t) {
        "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t);
      }

    }

    exports.EventPart = m;

    const v = t => t && (_ ? {
      capture: t.capture,
      passive: t.passive,
      once: t.once
    } : t.capture);
  }, {
    "./directive.js": "uWh2",
    "./dom.js": "ytxR",
    "./part.js": "pnLb",
    "./template-instance.js": "bn5t",
    "./template-result.js": "cVNN",
    "./template.js": "Av0K"
  }],
  "gbKZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.templateFactory = t, exports.templateCaches = void 0;

    var e = require("./template.js");

    function t(t) {
      let s = r.get(t.type);
      void 0 === s && (s = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, r.set(t.type, s));
      let n = s.stringsArray.get(t.strings);
      if (void 0 !== n) return n;
      const a = t.strings.join(e.marker);
      return void 0 === (n = s.keyString.get(a)) && (n = new e.Template(t, t.getTemplateElement()), s.keyString.set(a, n)), s.stringsArray.set(t.strings, n), n;
    }

    const r = new Map();
    exports.templateCaches = r;
  }, {
    "./template.js": "Av0K"
  }],
  "Fhpq": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.render = exports.parts = void 0;

    var e = require("./dom.js"),
        t = require("./parts.js"),
        r = require("./template-factory.js");

    const s = new WeakMap();
    exports.parts = s;

    const o = (o, a, p) => {
      let d = s.get(a);
      void 0 === d && ((0, e.removeNodes)(a, a.firstChild), s.set(a, d = new t.NodePart(Object.assign({
        templateFactory: r.templateFactory
      }, p))), d.appendInto(a)), d.setValue(o), d.commit();
    };

    exports.render = o;
  }, {
    "./dom.js": "ytxR",
    "./parts.js": "atl2",
    "./template-factory.js": "gbKZ"
  }],
  "LBiL": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.defaultTemplateProcessor = exports.DefaultTemplateProcessor = void 0;

    var e = require("./parts.js");

    class t {
      handleAttributeExpressions(t, r, s, o) {
        const a = r[0];

        if ("." === a) {
          return new e.PropertyCommitter(t, r.slice(1), s).parts;
        }

        return "@" === a ? [new e.EventPart(t, r.slice(1), o.eventContext)] : "?" === a ? [new e.BooleanAttributePart(t, r.slice(1), s)] : new e.AttributeCommitter(t, r, s).parts;
      }

      handleTextExpression(t) {
        return new e.NodePart(t);
      }

    }

    exports.DefaultTemplateProcessor = t;
    const r = new t();
    exports.defaultTemplateProcessor = r;
  }, {
    "./parts.js": "atl2"
  }],
  "SPDu": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "DefaultTemplateProcessor", {
      enumerable: !0,
      get: function () {
        return e.DefaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "defaultTemplateProcessor", {
      enumerable: !0,
      get: function () {
        return e.defaultTemplateProcessor;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function () {
        return t.SVGTemplateResult;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return t.TemplateResult;
      }
    }), Object.defineProperty(exports, "directive", {
      enumerable: !0,
      get: function () {
        return r.directive;
      }
    }), Object.defineProperty(exports, "isDirective", {
      enumerable: !0,
      get: function () {
        return r.isDirective;
      }
    }), Object.defineProperty(exports, "removeNodes", {
      enumerable: !0,
      get: function () {
        return n.removeNodes;
      }
    }), Object.defineProperty(exports, "reparentNodes", {
      enumerable: !0,
      get: function () {
        return n.reparentNodes;
      }
    }), Object.defineProperty(exports, "noChange", {
      enumerable: !0,
      get: function () {
        return o.noChange;
      }
    }), Object.defineProperty(exports, "nothing", {
      enumerable: !0,
      get: function () {
        return o.nothing;
      }
    }), Object.defineProperty(exports, "AttributeCommitter", {
      enumerable: !0,
      get: function () {
        return i.AttributeCommitter;
      }
    }), Object.defineProperty(exports, "AttributePart", {
      enumerable: !0,
      get: function () {
        return i.AttributePart;
      }
    }), Object.defineProperty(exports, "BooleanAttributePart", {
      enumerable: !0,
      get: function () {
        return i.BooleanAttributePart;
      }
    }), Object.defineProperty(exports, "EventPart", {
      enumerable: !0,
      get: function () {
        return i.EventPart;
      }
    }), Object.defineProperty(exports, "isIterable", {
      enumerable: !0,
      get: function () {
        return i.isIterable;
      }
    }), Object.defineProperty(exports, "isPrimitive", {
      enumerable: !0,
      get: function () {
        return i.isPrimitive;
      }
    }), Object.defineProperty(exports, "NodePart", {
      enumerable: !0,
      get: function () {
        return i.NodePart;
      }
    }), Object.defineProperty(exports, "PropertyCommitter", {
      enumerable: !0,
      get: function () {
        return i.PropertyCommitter;
      }
    }), Object.defineProperty(exports, "PropertyPart", {
      enumerable: !0,
      get: function () {
        return i.PropertyPart;
      }
    }), Object.defineProperty(exports, "parts", {
      enumerable: !0,
      get: function () {
        return u.parts;
      }
    }), Object.defineProperty(exports, "render", {
      enumerable: !0,
      get: function () {
        return u.render;
      }
    }), Object.defineProperty(exports, "templateCaches", {
      enumerable: !0,
      get: function () {
        return p.templateCaches;
      }
    }), Object.defineProperty(exports, "templateFactory", {
      enumerable: !0,
      get: function () {
        return p.templateFactory;
      }
    }), Object.defineProperty(exports, "TemplateInstance", {
      enumerable: !0,
      get: function () {
        return a.TemplateInstance;
      }
    }), Object.defineProperty(exports, "createMarker", {
      enumerable: !0,
      get: function () {
        return s.createMarker;
      }
    }), Object.defineProperty(exports, "isTemplatePartActive", {
      enumerable: !0,
      get: function () {
        return s.isTemplatePartActive;
      }
    }), Object.defineProperty(exports, "Template", {
      enumerable: !0,
      get: function () {
        return s.Template;
      }
    }), exports.svg = exports.html = void 0;

    var e = require("./lib/default-template-processor.js"),
        t = require("./lib/template-result.js"),
        r = require("./lib/directive.js"),
        n = require("./lib/dom.js"),
        o = require("./lib/part.js"),
        i = require("./lib/parts.js"),
        u = require("./lib/render.js"),
        p = require("./lib/template-factory.js"),
        a = require("./lib/template-instance.js"),
        s = require("./lib/template.js");

    "undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");

    const l = (r, ...n) => new t.TemplateResult(r, n, "html", e.defaultTemplateProcessor);

    exports.html = l;

    const c = (r, ...n) => new t.SVGTemplateResult(r, n, "svg", e.defaultTemplateProcessor);

    exports.svg = c;
  }, {
    "./lib/default-template-processor.js": "LBiL",
    "./lib/template-result.js": "cVNN",
    "./lib/directive.js": "uWh2",
    "./lib/dom.js": "ytxR",
    "./lib/part.js": "pnLb",
    "./lib/parts.js": "atl2",
    "./lib/render.js": "Fhpq",
    "./lib/template-factory.js": "gbKZ",
    "./lib/template-instance.js": "bn5t",
    "./lib/template.js": "Av0K"
  }],
  "eBH8": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function () {
        return a.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function () {
        return a.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return a.TemplateResult;
      }
    }), exports.render = void 0;

    var e = require("./dom.js"),
        t = require("./modify-template.js"),
        r = require("./render.js"),
        n = require("./template-factory.js"),
        o = require("./template-instance.js"),
        s = require("./template.js"),
        a = require("../lit-html.js");

    const l = (e, t) => `${e}--${t}`;

    let i = !0;
    void 0 === window.ShadyCSS ? i = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), i = !1);

    const d = e => t => {
      const r = l(t.type, e);
      let o = n.templateCaches.get(r);
      void 0 === o && (o = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      }, n.templateCaches.set(r, o));
      let a = o.stringsArray.get(t.strings);
      if (void 0 !== a) return a;
      const d = t.strings.join(s.marker);

      if (void 0 === (a = o.keyString.get(d))) {
        const r = t.getTemplateElement();
        i && window.ShadyCSS.prepareTemplateDom(r, e), a = new s.Template(t, r), o.keyString.set(d, a);
      }

      return o.stringsArray.set(t.strings, a), a;
    },
          p = ["html", "svg"],
          c = e => {
      p.forEach(r => {
        const o = n.templateCaches.get(l(r, e));
        void 0 !== o && o.keyString.forEach(e => {
          const {
            element: {
              content: r
            }
          } = e,
                n = new Set();
          Array.from(r.querySelectorAll("style")).forEach(e => {
            n.add(e);
          }), (0, t.removeNodesFromTemplate)(e, n);
        });
      });
    },
          m = new Set(),
          y = (e, r, n) => {
      m.add(e);
      const o = n ? n.element : document.createElement("template"),
            s = r.querySelectorAll("style"),
            {
        length: a
      } = s;
      if (0 === a) return void window.ShadyCSS.prepareTemplateStyles(o, e);
      const l = document.createElement("style");

      for (let t = 0; t < a; t++) {
        const e = s[t];
        e.parentNode.removeChild(e), l.textContent += e.textContent;
      }

      c(e);
      const i = o.content;
      n ? (0, t.insertNodeIntoTemplate)(n, l, i.firstChild) : i.insertBefore(l, i.firstChild), window.ShadyCSS.prepareTemplateStyles(o, e);
      const d = i.querySelector("style");
      if (window.ShadyCSS.nativeShadow && null !== d) r.insertBefore(d.cloneNode(!0), r.firstChild);else if (n) {
        i.insertBefore(l, i.firstChild);
        const e = new Set();
        e.add(l), (0, t.removeNodesFromTemplate)(n, e);
      }
    },
          S = (t, n, s) => {
      if (!s || "object" != typeof s || !s.scopeName) throw new Error("The `scopeName` option is required.");
      const a = s.scopeName,
            l = r.parts.has(n),
            p = i && 11 === n.nodeType && !!n.host,
            c = p && !m.has(a),
            S = c ? document.createDocumentFragment() : n;

      if ((0, r.render)(t, S, Object.assign({
        templateFactory: d(a)
      }, s)), c) {
        const t = r.parts.get(S);
        r.parts.delete(S);
        const s = t.value instanceof o.TemplateInstance ? t.value.template : void 0;
        y(a, S, s), (0, e.removeNodes)(n, n.firstChild), n.appendChild(S), r.parts.set(n, t);
      }

      !l && p && window.ShadyCSS.styleElement(n.host);
    };

    exports.render = S;
  }, {
    "./dom.js": "ytxR",
    "./modify-template.js": "NXoq",
    "./render.js": "Fhpq",
    "./template-factory.js": "gbKZ",
    "./template-instance.js": "bn5t",
    "./template.js": "Av0K",
    "../lit-html.js": "SPDu"
  }],
  "fKvB": [function (require, module, exports) {
    "use strict";

    var t;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.UpdatingElement = exports.notEqual = exports.defaultConverter = void 0, window.JSCompiler_renameProperty = (t, e) => t;
    const e = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? "" : null;

          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t);
        }

        return t;
      },

      fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t;

          case Number:
            return null === t ? null : Number(t);

          case Object:
          case Array:
            return JSON.parse(t);
        }

        return t;
      }

    };
    exports.defaultConverter = e;

    const r = (t, e) => e !== t && (e == e || t == t);

    exports.notEqual = r;
    const s = {
      attribute: !0,
      type: String,
      converter: e,
      reflect: !1,
      hasChanged: r
    },
          i = 1,
          a = 4,
          o = 8,
          p = 16,
          n = "finalized";

    class h extends HTMLElement {
      constructor() {
        super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map(), this._reflectingProperties = void 0, this.initialize();
      }

      static get observedAttributes() {
        this.finalize();
        const t = [];
        return this._classProperties.forEach((e, r) => {
          const s = this._attributeNameForProperty(r, e);

          void 0 !== s && (this._attributeToPropertyMap.set(s, r), t.push(s));
        }), t;
      }

      static _ensureClassProperties() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
          this._classProperties = new Map();

          const t = Object.getPrototypeOf(this)._classProperties;

          void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
        }
      }

      static createProperty(t, e = s) {
        if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
        const r = "symbol" == typeof t ? Symbol() : `__${t}`,
              i = this.getPropertyDescriptor(t, r, e);
        void 0 !== i && Object.defineProperty(this.prototype, t, i);
      }

      static getPropertyDescriptor(t, e, r) {
        return {
          get() {
            return this[e];
          },

          set(r) {
            const s = this[t];
            this[e] = r, this._requestUpdate(t, s);
          },

          configurable: !0,
          enumerable: !0
        };
      }

      static getPropertyOptions(t) {
        return this._classProperties && this._classProperties.get(t) || s;
      }

      static finalize() {
        const t = Object.getPrototypeOf(this);

        if (t.hasOwnProperty(n) || t.finalize(), this[n] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
          const t = this.properties,
                e = [...Object.getOwnPropertyNames(t), ...("function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])];

          for (const r of e) this.createProperty(r, t[r]);
        }
      }

      static _attributeNameForProperty(t, e) {
        const r = e.attribute;
        return !1 === r ? void 0 : "string" == typeof r ? r : "string" == typeof t ? t.toLowerCase() : void 0;
      }

      static _valueHasChanged(t, e, s = r) {
        return s(t, e);
      }

      static _propertyValueFromAttribute(t, r) {
        const s = r.type,
              i = r.converter || e,
              a = "function" == typeof i ? i : i.fromAttribute;
        return a ? a(t, s) : t;
      }

      static _propertyValueToAttribute(t, r) {
        if (void 0 === r.reflect) return;
        const s = r.type,
              i = r.converter;
        return (i && i.toAttribute || e.toAttribute)(t, s);
      }

      initialize() {
        this._saveInstanceProperties(), this._requestUpdate();
      }

      _saveInstanceProperties() {
        this.constructor._classProperties.forEach((t, e) => {
          if (this.hasOwnProperty(e)) {
            const t = this[e];
            delete this[e], this._instanceProperties || (this._instanceProperties = new Map()), this._instanceProperties.set(e, t);
          }
        });
      }

      _applyInstanceProperties() {
        this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0;
      }

      connectedCallback() {
        this.enableUpdating();
      }

      enableUpdating() {
        void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
      }

      disconnectedCallback() {}

      attributeChangedCallback(t, e, r) {
        e !== r && this._attributeToProperty(t, r);
      }

      _propertyToAttribute(t, e, r = s) {
        const i = this.constructor,
              a = i._attributeNameForProperty(t, r);

        if (void 0 !== a) {
          const t = i._propertyValueToAttribute(e, r);

          if (void 0 === t) return;
          this._updateState = this._updateState | o, null == t ? this.removeAttribute(a) : this.setAttribute(a, t), this._updateState = this._updateState & ~o;
        }
      }

      _attributeToProperty(t, e) {
        if (this._updateState & o) return;

        const r = this.constructor,
              s = r._attributeToPropertyMap.get(t);

        if (void 0 !== s) {
          const t = r.getPropertyOptions(s);
          this._updateState = this._updateState | p, this[s] = r._propertyValueFromAttribute(e, t), this._updateState = this._updateState & ~p;
        }
      }

      _requestUpdate(t, e) {
        let r = !0;

        if (void 0 !== t) {
          const s = this.constructor,
                i = s.getPropertyOptions(t);
          s._valueHasChanged(this[t], e, i.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== i.reflect || this._updateState & p || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()), this._reflectingProperties.set(t, i))) : r = !1;
        }

        !this._hasRequestedUpdate && r && (this._updatePromise = this._enqueueUpdate());
      }

      requestUpdate(t, e) {
        return this._requestUpdate(t, e), this.updateComplete;
      }

      async _enqueueUpdate() {
        this._updateState = this._updateState | a;

        try {
          await this._updatePromise;
        } catch (e) {}

        const t = this.performUpdate();
        return null != t && (await t), !this._hasRequestedUpdate;
      }

      get _hasRequestedUpdate() {
        return this._updateState & a;
      }

      get hasUpdated() {
        return this._updateState & i;
      }

      performUpdate() {
        this._instanceProperties && this._applyInstanceProperties();
        let t = !1;
        const e = this._changedProperties;

        try {
          (t = this.shouldUpdate(e)) ? this.update(e) : this._markUpdated();
        } catch (r) {
          throw t = !1, this._markUpdated(), r;
        }

        t && (this._updateState & i || (this._updateState = this._updateState | i, this.firstUpdated(e)), this.updated(e));
      }

      _markUpdated() {
        this._changedProperties = new Map(), this._updateState = this._updateState & ~a;
      }

      get updateComplete() {
        return this._getUpdateComplete();
      }

      _getUpdateComplete() {
        return this._updatePromise;
      }

      shouldUpdate(t) {
        return !0;
      }

      update(t) {
        void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated();
      }

      updated(t) {}

      firstUpdated(t) {}

    }

    exports.UpdatingElement = h, h[t = n] = !0;
  }, {}],
  "FzpZ": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.property = i, exports.internalProperty = s, exports.query = c, exports.queryAsync = u, exports.queryAll = l, exports.eventOptions = f, exports.queryAssignedNodes = m, exports.customElement = void 0;

    const e = (e, t) => (window.customElements.define(e, t), t),
          t = (e, t) => {
      const {
        kind: r,
        elements: n
      } = t;
      return {
        kind: r,
        elements: n,

        finisher(t) {
          window.customElements.define(e, t);
        }

      };
    },
          r = r => n => "function" == typeof n ? e(r, n) : t(r, n);

    exports.customElement = r;

    const n = (e, t) => "method" !== t.kind || !t.descriptor || "value" in t.descriptor ? {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},

      initializer() {
        "function" == typeof t.initializer && (this[t.key] = t.initializer.call(this));
      },

      finisher(r) {
        r.createProperty(t.key, e);
      }

    } : Object.assign(Object.assign({}, t), {
      finisher(r) {
        r.createProperty(t.key, e);
      }

    }),
          o = (e, t, r) => {
      t.constructor.createProperty(r, e);
    };

    function i(e) {
      return (t, r) => void 0 !== r ? o(e, t, r) : n(e, t);
    }

    function s(e) {
      return i({
        attribute: !1,
        hasChanged: null == e ? void 0 : e.hasChanged
      });
    }

    function c(e) {
      return (t, r) => {
        const n = {
          get() {
            return this.renderRoot.querySelector(e);
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    function u(e) {
      return (t, r) => {
        const n = {
          async get() {
            return await this.updateComplete, this.renderRoot.querySelector(e);
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    function l(e) {
      return (t, r) => {
        const n = {
          get() {
            return this.renderRoot.querySelectorAll(e);
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== r ? a(n, t, r) : d(n, t);
      };
    }

    const a = (e, t, r) => {
      Object.defineProperty(t, r, e);
    },
          d = (e, t) => ({
      kind: "method",
      placement: "prototype",
      key: t.key,
      descriptor: e
    }),
          p = (e, t) => Object.assign(Object.assign({}, t), {
      finisher(r) {
        Object.assign(r.prototype[t.key], e);
      }

    }),
          y = (e, t, r) => {
      Object.assign(t[r], e);
    };

    function f(e) {
      return (t, r) => void 0 !== r ? y(e, t, r) : p(e, t);
    }

    function m(e = "", t = !1) {
      return (r, n) => {
        const o = {
          get() {
            const r = `slot${e ? `[name=${e}]` : ""}`,
                  n = this.renderRoot.querySelector(r);
            return n && n.assignedNodes({
              flatten: t
            });
          },

          enumerable: !0,
          configurable: !0
        };
        return void 0 !== n ? a(o, r, n) : d(o, r);
      };
    }
  }, {}],
  "ZFCR": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.css = exports.unsafeCSS = exports.CSSResult = exports.supportsAdoptingStyleSheets = void 0;
    const e = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    exports.supportsAdoptingStyleSheets = e;
    const t = Symbol();

    class s {
      constructor(e, s) {
        if (s !== t) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = e;
      }

      get styleSheet() {
        return void 0 === this._styleSheet && (e ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
      }

      toString() {
        return this.cssText;
      }

    }

    exports.CSSResult = s;

    const r = e => new s(String(e), t);

    exports.unsafeCSS = r;

    const o = e => {
      if (e instanceof s) return e.cssText;
      if ("number" == typeof e) return e;
      throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);
    },
          n = (e, ...r) => {
      const n = r.reduce((t, s, r) => t + o(s) + e[r + 1], e[0]);
      return new s(n, t);
    };

    exports.css = n;
  }, {}],
  "bhxD": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var e = {
      LitElement: !0,
      html: !0,
      svg: !0,
      TemplateResult: !0,
      SVGTemplateResult: !0
    };
    Object.defineProperty(exports, "html", {
      enumerable: !0,
      get: function () {
        return n.html;
      }
    }), Object.defineProperty(exports, "svg", {
      enumerable: !0,
      get: function () {
        return n.svg;
      }
    }), Object.defineProperty(exports, "TemplateResult", {
      enumerable: !0,
      get: function () {
        return n.TemplateResult;
      }
    }), Object.defineProperty(exports, "SVGTemplateResult", {
      enumerable: !0,
      get: function () {
        return n.SVGTemplateResult;
      }
    }), exports.LitElement = void 0;

    var t = require("lit-html/lib/shady-render.js"),
        r = require("./lib/updating-element.js");

    Object.keys(r).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return r[t];
        }
      }));
    });

    var s = require("./lib/decorators.js");

    Object.keys(s).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return s[t];
        }
      }));
    });

    var n = require("lit-html/lit-html.js"),
        o = require("./lib/css-tag.js");

    Object.keys(o).forEach(function (t) {
      "default" !== t && "__esModule" !== t && (Object.prototype.hasOwnProperty.call(e, t) || Object.defineProperty(exports, t, {
        enumerable: !0,
        get: function () {
          return o[t];
        }
      }));
    }), (window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");
    const i = {};

    class l extends r.UpdatingElement {
      static getStyles() {
        return this.styles;
      }

      static _getUniqueStyles() {
        if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
        const e = this.getStyles();
        if (void 0 === e) this._styles = [];else if (Array.isArray(e)) {
          const t = (e, r) => e.reduceRight((e, r) => Array.isArray(r) ? t(r, e) : (e.add(r), e), r),
                r = t(e, new Set()),
                s = [];

          r.forEach(e => s.unshift(e)), this._styles = s;
        } else this._styles = [e];
      }

      initialize() {
        super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
      }

      createRenderRoot() {
        return this.attachShadow({
          mode: "open"
        });
      }

      adoptStyles() {
        const e = this.constructor._styles;
        0 !== e.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? o.supportsAdoptingStyleSheets ? this.renderRoot.adoptedStyleSheets = e.map(e => e.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e => e.cssText), this.localName));
      }

      connectedCallback() {
        super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
      }

      update(e) {
        const t = this.render();
        super.update(e), t !== i && this.constructor.render(t, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(e => {
          const t = document.createElement("style");
          t.textContent = e.cssText, this.renderRoot.appendChild(t);
        }));
      }

      render() {
        return i;
      }

    }

    exports.LitElement = l, l.finalized = !0, l.render = t.render;
  }, {
    "lit-html/lib/shady-render.js": "eBH8",
    "./lib/updating-element.js": "fKvB",
    "./lib/decorators.js": "FzpZ",
    "lit-html/lit-html.js": "SPDu",
    "./lib/css-tag.js": "ZFCR"
  }],
  "aqmj": [function (require, module, exports) {
    var define;
    var global = arguments[3];
    var define,
        global = arguments[3];
    "undefined" != typeof navigator && function (t, e) {
      "function" == typeof define && define.amd ? define(function () {
        return e(t);
      }) : "object" == typeof module && module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie);
    }(window || {}, function (window) {
      "use strict";

      var svgNS = "http://www.w3.org/2000/svg",
          locationHref = "",
          initialDefaultFrame = -999999,
          subframeEnabled = !0,
          expressionsPlugin,
          isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
          cachedColors = {},
          bm_rounder = Math.round,
          bm_rnd,
          bm_pow = Math.pow,
          bm_sqrt = Math.sqrt,
          bm_abs = Math.abs,
          bm_floor = Math.floor,
          bm_max = Math.max,
          bm_min = Math.min,
          blitter = 10,
          BMMath = {};

      function ProjectInterface() {
        return {};
      }

      !function () {
        var t,
            e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
            r = e.length;

        for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]];
      }(), BMMath.random = Math.random, BMMath.abs = function (t) {
        if ("object" === typeof t && t.length) {
          var e,
              r = createSizedArray(t.length),
              i = t.length;

          for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);

          return r;
        }

        return Math.abs(t);
      };
      var defaultCurveSegments = 150,
          degToRads = Math.PI / 180,
          roundCorner = .5519;

      function roundValues(t) {
        bm_rnd = t ? Math.round : function (t) {
          return t;
        };
      }

      function styleDiv(t) {
        t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d";
      }

      function BMEnterFrameEvent(t, e, r, i) {
        this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
      }

      function BMCompleteEvent(t, e) {
        this.type = t, this.direction = e < 0 ? -1 : 1;
      }

      function BMCompleteLoopEvent(t, e, r, i) {
        this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1;
      }

      function BMSegmentStartEvent(t, e, r) {
        this.type = t, this.firstFrame = e, this.totalFrames = r;
      }

      function BMDestroyEvent(t, e) {
        this.type = t, this.target = e;
      }

      function BMRenderFrameErrorEvent(t, e) {
        this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
      }

      function BMConfigErrorEvent(t) {
        this.type = "configError", this.nativeError = t;
      }

      function BMAnimationConfigErrorEvent(t, e) {
        this.type = t, this.nativeError = e, this.currentTime = currentTime;
      }

      roundValues(!1);

      var createElementID = (_count = 0, function () {
        return "__lottie_element_" + ++_count;
      }),
          _count;

      function HSVtoRGB(t, e, r) {
        var i, s, a, n, o, h, l, p;

        switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
          case 0:
            i = r, s = p, a = h;
            break;

          case 1:
            i = l, s = r, a = h;
            break;

          case 2:
            i = h, s = r, a = p;
            break;

          case 3:
            i = h, s = l, a = r;
            break;

          case 4:
            i = p, s = h, a = r;
            break;

          case 5:
            i = r, s = h, a = l;
        }

        return [i, s, a];
      }

      function RGBtoHSV(t, e, r) {
        var i,
            s = Math.max(t, e, r),
            a = Math.min(t, e, r),
            n = s - a,
            o = 0 === s ? 0 : n / s,
            h = s / 255;

        switch (s) {
          case a:
            i = 0;
            break;

          case t:
            i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
            break;

          case e:
            i = r - t + 2 * n, i /= 6 * n;
            break;

          case r:
            i = t - e + 4 * n, i /= 6 * n;
        }

        return [i, o, h];
      }

      function addSaturationToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }

      function addBrightnessToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }

      function addHueToRGB(t, e) {
        var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
        return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
      }

      var rgbToHex = function () {
        var t,
            e,
            r = [];

        for (t = 0; t < 256; t += 1) e = t.toString(16), r[t] = 1 == e.length ? "0" + e : e;

        return function (t, e, i) {
          return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i];
        };
      }();

      function BaseEvent() {}

      BaseEvent.prototype = {
        triggerEvent: function (t, e) {
          if (this._cbs[t]) for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e);
        },
        addEventListener: function (t, e) {
          return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e), function () {
            this.removeEventListener(t, e);
          }.bind(this);
        },
        removeEventListener: function (t, e) {
          if (e) {
            if (this._cbs[t]) {
              for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;

              this._cbs[t].length || (this._cbs[t] = null);
            }
          } else this._cbs[t] = null;
        }
      };

      var createTypedArray = function () {
        return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (t, e) {
          return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0;
        } : function (t, e) {
          var r,
              i = 0,
              s = [];

          switch (t) {
            case "int16":
            case "uint8c":
              r = 1;
              break;

            default:
              r = 1.1;
          }

          for (i = 0; i < e; i += 1) s.push(r);

          return s;
        };
      }();

      function createSizedArray(t) {
        return Array.apply(null, {
          length: t
        });
      }

      function createNS(t) {
        return document.createElementNS(svgNS, t);
      }

      function createTag(t) {
        return document.createElement(t);
      }

      function DynamicPropertyContainer() {}

      DynamicPropertyContainer.prototype = {
        addDynamicProperty: function (t) {
          -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
        },
        iterateDynamicProperties: function () {
          this._mdf = !1;
          var t,
              e = this.dynamicProperties.length;

          for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
        },
        initDynamicPropertyContainer: function (t) {
          this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
        }
      };

      var getBlendMode = (blendModeEnums = {
        0: "source-over",
        1: "multiply",
        2: "screen",
        3: "overlay",
        4: "darken",
        5: "lighten",
        6: "color-dodge",
        7: "color-burn",
        8: "hard-light",
        9: "soft-light",
        10: "difference",
        11: "exclusion",
        12: "hue",
        13: "saturation",
        14: "color",
        15: "luminosity"
      }, function (t) {
        return blendModeEnums[t] || "";
      }),
          blendModeEnums,
          Matrix = function () {
        var t = Math.cos,
            e = Math.sin,
            r = Math.tan,
            i = Math.round;

        function s() {
          return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
        }

        function a(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function n(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(1, 0, 0, 0, 0, i, -s, 0, 0, s, i, 0, 0, 0, 0, 1);
        }

        function o(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, 0, s, 0, 0, 1, 0, 0, -s, 0, i, 0, 0, 0, 0, 1);
        }

        function h(r) {
          if (0 === r) return this;
          var i = t(r),
              s = e(r);
          return this._t(i, -s, 0, 0, s, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function l(t, e) {
          return this._t(1, e, t, 1, 0, 0);
        }

        function p(t, e) {
          return this.shear(r(t), r(e));
        }

        function f(i, s) {
          var a = t(s),
              n = e(s);
          return this._t(a, n, 0, 0, -n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(a, -n, 0, 0, n, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }

        function m(t, e, r) {
          return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
        }

        function c(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
          return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = s, this.props[5] = a, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = f, this.props[12] = m, this.props[13] = c, this.props[14] = d, this.props[15] = u, this;
        }

        function d(t, e, r) {
          return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this;
        }

        function u(t, e, r, i, s, a, n, o, h, l, p, f, m, c, d, u) {
          var y = this.props;
          if (1 === t && 0 === e && 0 === r && 0 === i && 0 === s && 1 === a && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === f) return y[12] = y[12] * t + y[15] * m, y[13] = y[13] * a + y[15] * c, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * u, this._identityCalculated = !1, this;
          var g = y[0],
              v = y[1],
              b = y[2],
              P = y[3],
              _ = y[4],
              S = y[5],
              A = y[6],
              x = y[7],
              E = y[8],
              k = y[9],
              T = y[10],
              M = y[11],
              F = y[12],
              D = y[13],
              I = y[14],
              C = y[15];
          return y[0] = g * t + v * s + b * h + P * m, y[1] = g * e + v * a + b * l + P * c, y[2] = g * r + v * n + b * p + P * d, y[3] = g * i + v * o + b * f + P * u, y[4] = _ * t + S * s + A * h + x * m, y[5] = _ * e + S * a + A * l + x * c, y[6] = _ * r + S * n + A * p + x * d, y[7] = _ * i + S * o + A * f + x * u, y[8] = E * t + k * s + T * h + M * m, y[9] = E * e + k * a + T * l + M * c, y[10] = E * r + k * n + T * p + M * d, y[11] = E * i + k * o + T * f + M * u, y[12] = F * t + D * s + I * h + C * m, y[13] = F * e + D * a + I * l + C * c, y[14] = F * r + D * n + I * p + C * d, y[15] = F * i + D * o + I * f + C * u, this._identityCalculated = !1, this;
        }

        function y() {
          return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity;
        }

        function g(t) {
          for (var e = 0; e < 16;) {
            if (t.props[e] !== this.props[e]) return !1;
            e += 1;
          }

          return !0;
        }

        function v(t) {
          var e;

          for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
        }

        function b(t) {
          var e;

          for (e = 0; e < 16; e += 1) this.props[e] = t[e];
        }

        function P(t, e, r) {
          return {
            x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
            y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
            z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
          };
        }

        function _(t, e, r) {
          return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12];
        }

        function S(t, e, r) {
          return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13];
        }

        function A(t, e, r) {
          return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14];
        }

        function x() {
          var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
              e = this.props[5] / t,
              r = -this.props[1] / t,
              i = -this.props[4] / t,
              s = this.props[0] / t,
              a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
              n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
              o = new Matrix();
          return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = s, o.props[12] = a, o.props[13] = n, o;
        }

        function E(t) {
          return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0);
        }

        function k(t) {
          var e,
              r = t.length,
              i = [];

          for (e = 0; e < r; e += 1) i[e] = E(t[e]);

          return i;
        }

        function T(t, e, r) {
          var i = createTypedArray("float32", 6);
          if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];else {
            var s = this.props[0],
                a = this.props[1],
                n = this.props[4],
                o = this.props[5],
                h = this.props[12],
                l = this.props[13];
            i[0] = t[0] * s + t[1] * n + h, i[1] = t[0] * a + t[1] * o + l, i[2] = e[0] * s + e[1] * n + h, i[3] = e[0] * a + e[1] * o + l, i[4] = r[0] * s + r[1] * n + h, i[5] = r[0] * a + r[1] * o + l;
          }
          return i;
        }

        function M(t, e, r) {
          return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]];
        }

        function F(t, e) {
          if (this.isIdentity()) return t + "," + e;
          var r = this.props;
          return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100;
        }

        function D() {
          for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;

          return r;
        }

        function I(t) {
          return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t;
        }

        function C() {
          var t = this.props;
          return "matrix(" + I(t[0]) + "," + I(t[1]) + "," + I(t[4]) + "," + I(t[5]) + "," + I(t[12]) + "," + I(t[13]) + ")";
        }

        return function () {
          this.reset = s, this.rotate = a, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = f, this.shear = l, this.scale = m, this.setTransform = c, this.translate = d, this.transform = u, this.applyToPoint = P, this.applyToX = _, this.applyToY = S, this.applyToZ = A, this.applyToPointArray = M, this.applyToTriplePoints = T, this.applyToPointStringified = F, this.toCSS = D, this.to2dCSS = C, this.clone = v, this.cloneFromProps = b, this.equals = g, this.inversePoints = k, this.inversePoint = E, this.getInverseMatrix = x, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
        };
      }();

      !function (t, e) {
        var r,
            i = this,
            s = 256,
            a = 6,
            n = "random",
            o = e.pow(s, a),
            h = e.pow(2, 52),
            l = 2 * h,
            p = s - 1;

        function f(t) {
          var e,
              r = t.length,
              i = this,
              a = 0,
              n = i.i = i.j = 0,
              o = i.S = [];

          for (r || (t = [r++]); a < s;) o[a] = a++;

          for (a = 0; a < s; a++) o[a] = o[n = p & n + t[a % r] + (e = o[a])], o[n] = e;

          i.g = function (t) {
            for (var e, r = 0, a = i.i, n = i.j, o = i.S; t--;) e = o[a = p & a + 1], r = r * s + o[p & (o[a] = o[n = p & n + e]) + (o[n] = e)];

            return i.i = a, i.j = n, r;
          };
        }

        function m(t, e) {
          return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e;
        }

        function c(t, e) {
          for (var r, i = t + "", s = 0; s < i.length;) e[p & s] = p & (r ^= 19 * e[p & s]) + i.charCodeAt(s++);

          return d(e);
        }

        function d(t) {
          return String.fromCharCode.apply(0, t);
        }

        e["seed" + n] = function (p, u, y) {
          var g = [],
              v = c(function t(e, r) {
            var i,
                s = [],
                a = typeof e;
            if (r && "object" == a) for (i in e) try {
              s.push(t(e[i], r - 1));
            } catch (n) {}
            return s.length ? s : "string" == a ? e : e + "\0";
          }((u = !0 === u ? {
            entropy: !0
          } : u || {}).entropy ? [p, d(t)] : null === p ? function () {
            try {
              if (r) return d(r.randomBytes(s));
              var e = new Uint8Array(s);
              return (i.crypto || i.msCrypto).getRandomValues(e), d(e);
            } catch (o) {
              var a = i.navigator,
                  n = a && a.plugins;
              return [+new Date(), i, n, i.screen, d(t)];
            }
          }() : p, 3), g),
              b = new f(g),
              P = function () {
            for (var t = b.g(a), e = o, r = 0; t < h;) t = (t + r) * s, e *= s, r = b.g(1);

            for (; t >= l;) t /= 2, e /= 2, r >>>= 1;

            return (t + r) / e;
          };

          return P.int32 = function () {
            return 0 | b.g(4);
          }, P.quick = function () {
            return b.g(4) / 4294967296;
          }, P.double = P, c(d(b.S), t), (u.pass || y || function (t, r, i, s) {
            return s && (s.S && m(s, b), t.state = function () {
              return m(b, {});
            }), i ? (e[n] = t, r) : t;
          })(P, v, "global" in u ? u.global : this == e, u.state);
        }, c(e.random(), t);
      }([], BMMath);

      var BezierFactory = function () {
        var t = {
          getBezierEasing: function (t, r, i, s, a) {
            var n = a || ("bez_" + t + "_" + r + "_" + i + "_" + s).replace(/\./g, "p");
            if (e[n]) return e[n];
            var o = new c([t, r, i, s]);
            return e[n] = o, o;
          }
        },
            e = {};
        var r = 4,
            i = 1e-7,
            s = 10,
            a = 11,
            n = 1 / (a - 1),
            o = "function" == typeof Float32Array;

        function h(t, e) {
          return 1 - 3 * e + 3 * t;
        }

        function l(t, e) {
          return 3 * e - 6 * t;
        }

        function p(t) {
          return 3 * t;
        }

        function f(t, e, r) {
          return ((h(e, r) * t + l(e, r)) * t + p(e)) * t;
        }

        function m(t, e, r) {
          return 3 * h(e, r) * t * t + 2 * l(e, r) * t + p(e);
        }

        function c(t) {
          this._p = t, this._mSampleValues = o ? new Float32Array(a) : new Array(a), this._precomputed = !1, this.get = this.get.bind(this);
        }

        return c.prototype = {
          get: function (t) {
            var e = this._p[0],
                r = this._p[1],
                i = this._p[2],
                s = this._p[3];
            return this._precomputed || this._precompute(), e === r && i === s ? t : 0 === t ? 0 : 1 === t ? 1 : f(this._getTForX(t), r, s);
          },
          _precompute: function () {
            var t = this._p[0],
                e = this._p[1],
                r = this._p[2],
                i = this._p[3];
            this._precomputed = !0, t === e && r === i || this._calcSampleValues();
          },
          _calcSampleValues: function () {
            for (var t = this._p[0], e = this._p[2], r = 0; r < a; ++r) this._mSampleValues[r] = f(r * n, t, e);
          },
          _getTForX: function (t) {
            for (var e = this._p[0], o = this._p[2], h = this._mSampleValues, l = 0, p = 1, c = a - 1; p !== c && h[p] <= t; ++p) l += n;

            var d = l + (t - h[--p]) / (h[p + 1] - h[p]) * n,
                u = m(d, e, o);
            return u >= .001 ? function (t, e, i, s) {
              for (var a = 0; a < r; ++a) {
                var n = m(e, i, s);
                if (0 === n) return e;
                e -= (f(e, i, s) - t) / n;
              }

              return e;
            }(t, d, e, o) : 0 === u ? d : function (t, e, r, a, n) {
              var o,
                  h,
                  l = 0;

              do {
                (o = f(h = e + (r - e) / 2, a, n) - t) > 0 ? r = h : e = h;
              } while (Math.abs(o) > i && ++l < s);

              return h;
            }(t, l, l + n, e, o);
          }
        }, t;
      }();

      function extendPrototype(t, e) {
        var r,
            i,
            s = t.length;

        for (r = 0; r < s; r += 1) for (var a in i = t[r].prototype) i.hasOwnProperty(a) && (e.prototype[a] = i[a]);
      }

      function getDescriptor(t, e) {
        return Object.getOwnPropertyDescriptor(t, e);
      }

      function createProxyFunction(t) {
        function e() {}

        return e.prototype = t, e;
      }

      function bezFunction() {
        Math;

        function t(t, e, r, i, s, a) {
          var n = t * i + e * s + r * a - s * i - a * t - r * e;
          return n > -.001 && n < .001;
        }

        var e = function (t, e, r, i) {
          var s,
              a,
              n,
              o,
              h,
              l,
              p = defaultCurveSegments,
              f = 0,
              m = [],
              c = [],
              d = bezier_length_pool.newElement();

          for (n = r.length, s = 0; s < p; s += 1) {
            for (h = s / (p - 1), l = 0, a = 0; a < n; a += 1) o = bm_pow(1 - h, 3) * t[a] + 3 * bm_pow(1 - h, 2) * h * r[a] + 3 * (1 - h) * bm_pow(h, 2) * i[a] + bm_pow(h, 3) * e[a], m[a] = o, null !== c[a] && (l += bm_pow(m[a] - c[a], 2)), c[a] = m[a];

            l && (f += l = bm_sqrt(l)), d.percents[s] = h, d.lengths[s] = f;
          }

          return d.addedLength = f, d;
        };

        function r(t) {
          this.segmentLength = 0, this.points = new Array(t);
        }

        function i(t, e) {
          this.partialLength = t, this.point = e;
        }

        var s,
            a = (s = {}, function (e, a, n, o) {
          var h = (e[0] + "_" + e[1] + "_" + a[0] + "_" + a[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");

          if (!s[h]) {
            var l,
                p,
                f,
                m,
                c,
                d,
                u,
                y = defaultCurveSegments,
                g = 0,
                v = null;
            2 === e.length && (e[0] != a[0] || e[1] != a[1]) && t(e[0], e[1], a[0], a[1], e[0] + n[0], e[1] + n[1]) && t(e[0], e[1], a[0], a[1], a[0] + o[0], a[1] + o[1]) && (y = 2);
            var b = new r(y);

            for (f = n.length, l = 0; l < y; l += 1) {
              for (u = createSizedArray(f), c = l / (y - 1), d = 0, p = 0; p < f; p += 1) m = bm_pow(1 - c, 3) * e[p] + 3 * bm_pow(1 - c, 2) * c * (e[p] + n[p]) + 3 * (1 - c) * bm_pow(c, 2) * (a[p] + o[p]) + bm_pow(c, 3) * a[p], u[p] = m, null !== v && (d += bm_pow(u[p] - v[p], 2));

              g += d = bm_sqrt(d), b.points[l] = new i(d, u), v = u;
            }

            b.segmentLength = g, s[h] = b;
          }

          return s[h];
        });

        function n(t, e) {
          var r = e.percents,
              i = e.lengths,
              s = r.length,
              a = bm_floor((s - 1) * t),
              n = t * e.addedLength,
              o = 0;
          if (a === s - 1 || 0 === a || n === i[a]) return r[a];

          for (var h = i[a] > n ? -1 : 1, l = !0; l;) if (i[a] <= n && i[a + 1] > n ? (o = (n - i[a]) / (i[a + 1] - i[a]), l = !1) : a += h, a < 0 || a >= s - 1) {
            if (a === s - 1) return r[a];
            l = !1;
          }

          return r[a] + (r[a + 1] - r[a]) * o;
        }

        var o = createTypedArray("float32", 8);
        return {
          getSegmentsLength: function (t) {
            var r,
                i = segments_length_pool.newElement(),
                s = t.c,
                a = t.v,
                n = t.o,
                o = t.i,
                h = t._length,
                l = i.lengths,
                p = 0;

            for (r = 0; r < h - 1; r += 1) l[r] = e(a[r], a[r + 1], n[r], o[r + 1]), p += l[r].addedLength;

            return s && h && (l[r] = e(a[r], a[0], n[r], o[0]), p += l[r].addedLength), i.totalLength = p, i;
          },
          getNewSegment: function (t, e, r, i, s, a, h) {
            var l,
                p = n(s = s < 0 ? 0 : s > 1 ? 1 : s, h),
                f = n(a = a > 1 ? 1 : a, h),
                m = t.length,
                c = 1 - p,
                d = 1 - f,
                u = c * c * c,
                y = p * c * c * 3,
                g = p * p * c * 3,
                v = p * p * p,
                b = c * c * d,
                P = p * c * d + c * p * d + c * c * f,
                _ = p * p * d + c * p * f + p * c * f,
                S = p * p * f,
                A = c * d * d,
                x = p * d * d + c * f * d + c * d * f,
                E = p * f * d + c * f * f + p * d * f,
                k = p * f * f,
                T = d * d * d,
                M = f * d * d + d * f * d + d * d * f,
                F = f * f * d + d * f * f + f * d * f,
                D = f * f * f;

            for (l = 0; l < m; l += 1) o[4 * l] = Math.round(1e3 * (u * t[l] + y * r[l] + g * i[l] + v * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (b * t[l] + P * r[l] + _ * i[l] + S * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (A * t[l] + x * r[l] + E * i[l] + k * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (T * t[l] + M * r[l] + F * i[l] + D * e[l])) / 1e3;

            return o;
          },
          getPointInSegment: function (t, e, r, i, s, a) {
            var o = n(s, a),
                h = 1 - o;
            return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * r[0] + (o * o * h + h * o * o + o * h * o) * i[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * r[1] + (o * o * h + h * o * o + o * h * o) * i[1] + o * o * o * e[1])) / 1e3];
          },
          buildBezierData: a,
          pointOnLine2D: t,
          pointOnLine3D: function (e, r, i, s, a, n, o, h, l) {
            if (0 === i && 0 === n && 0 === l) return t(e, r, s, a, o, h);
            var p,
                f = Math.sqrt(Math.pow(s - e, 2) + Math.pow(a - r, 2) + Math.pow(n - i, 2)),
                m = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)),
                c = Math.sqrt(Math.pow(o - s, 2) + Math.pow(h - a, 2) + Math.pow(l - n, 2));
            return (p = f > m ? f > c ? f - m - c : c - m - f : c > m ? c - m - f : m - f - c) > -1e-4 && p < 1e-4;
          }
        };
      }

      !function () {
        for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];

        window.requestAnimationFrame || (window.requestAnimationFrame = function (e, r) {
          var i = new Date().getTime(),
              s = Math.max(0, 16 - (i - t)),
              a = setTimeout(function () {
            e(i + s);
          }, s);
          return t = i + s, a;
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        });
      }();
      var bez = bezFunction();

      function dataFunctionManager() {
        function t(s, a, n) {
          var o,
              h,
              l,
              f,
              m,
              c,
              d = s.length;

          for (h = 0; h < d; h += 1) if ("ks" in (o = s[h]) && !o.completed) {
            if (o.completed = !0, o.tt && (s[h - 1].td = o.tt), [], -1, o.hasMask) {
              var u = o.masksProperties;

              for (f = u.length, l = 0; l < f; l += 1) if (u[l].pt.k.i) i(u[l].pt.k);else for (c = u[l].pt.k.length, m = 0; m < c; m += 1) u[l].pt.k[m].s && i(u[l].pt.k[m].s[0]), u[l].pt.k[m].e && i(u[l].pt.k[m].e[0]);
            }

            0 === o.ty ? (o.layers = e(o.refId, a), t(o.layers, a, n)) : 4 === o.ty ? r(o.shapes) : 5 == o.ty && p(o, n);
          }
        }

        function e(t, e) {
          for (var r = 0, i = e.length; r < i;) {
            if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
            r += 1;
          }
        }

        function r(t) {
          var e, s, a;

          for (e = t.length - 1; e >= 0; e -= 1) if ("sh" == t[e].ty) {
            if (t[e].ks.k.i) i(t[e].ks.k);else for (a = t[e].ks.k.length, s = 0; s < a; s += 1) t[e].ks.k[s].s && i(t[e].ks.k[s].s[0]), t[e].ks.k[s].e && i(t[e].ks.k[s].e[0]);
            !0;
          } else "gr" == t[e].ty && r(t[e].it);
        }

        function i(t) {
          var e,
              r = t.i.length;

          for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1];
        }

        function s(t, e) {
          var r = e ? e.split(".") : [100, 100, 100];
          return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0));
        }

        var a,
            n = function () {
          var t = [4, 4, 14];

          function e(t) {
            var e,
                r,
                i,
                s = t.length;

            for (e = 0; e < s; e += 1) 5 === t[e].ty && (r = t[e], i = void 0, i = r.t.d, r.t.d = {
              k: [{
                s: i,
                t: 0
              }]
            });
          }

          return function (r) {
            if (s(t, r.v) && (e(r.layers), r.assets)) {
              var i,
                  a = r.assets.length;

              for (i = 0; i < a; i += 1) r.assets[i].layers && e(r.assets[i].layers);
            }
          };
        }(),
            o = (a = [4, 7, 99], function (t) {
          if (t.chars && !s(a, t.v)) {
            var e,
                r,
                n,
                o,
                h,
                l = t.chars.length;

            for (e = 0; e < l; e += 1) if (t.chars[e].data && t.chars[e].data.shapes) for (n = (h = t.chars[e].data.shapes[0].it).length, r = 0; r < n; r += 1) (o = h[r].ks.k).__converted || (i(h[r].ks.k), o.__converted = !0);
          }
        }),
            h = function () {
          var t = [4, 1, 9];

          function e(t) {
            var r,
                i,
                s,
                a = t.length;

            for (r = 0; r < a; r += 1) if ("gr" === t[r].ty) e(t[r].it);else if ("fl" === t[r].ty || "st" === t[r].ty) if (t[r].c.k && t[r].c.k[0].i) for (s = t[r].c.k.length, i = 0; i < s; i += 1) t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255;
          }

          function r(t) {
            var r,
                i = t.length;

            for (r = 0; r < i; r += 1) 4 === t[r].ty && e(t[r].shapes);
          }

          return function (e) {
            if (s(t, e.v) && (r(e.layers), e.assets)) {
              var i,
                  a = e.assets.length;

              for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers);
            }
          };
        }(),
            l = function () {
          var t = [4, 4, 18];

          function e(t) {
            var r, i, s;

            for (r = t.length - 1; r >= 0; r -= 1) if ("sh" == t[r].ty) {
              if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;else for (s = t[r].ks.k.length, i = 0; i < s; i += 1) t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
              !0;
            } else "gr" == t[r].ty && e(t[r].it);
          }

          function r(t) {
            var r,
                i,
                s,
                a,
                n,
                o,
                h = t.length;

            for (i = 0; i < h; i += 1) {
              if ((r = t[i]).hasMask) {
                var l = r.masksProperties;

                for (a = l.length, s = 0; s < a; s += 1) if (l[s].pt.k.i) l[s].pt.k.c = l[s].cl;else for (o = l[s].pt.k.length, n = 0; n < o; n += 1) l[s].pt.k[n].s && (l[s].pt.k[n].s[0].c = l[s].cl), l[s].pt.k[n].e && (l[s].pt.k[n].e[0].c = l[s].cl);
              }

              4 === r.ty && e(r.shapes);
            }
          }

          return function (e) {
            if (s(t, e.v) && (r(e.layers), e.assets)) {
              var i,
                  a = e.assets.length;

              for (i = 0; i < a; i += 1) e.assets[i].layers && r(e.assets[i].layers);
            }
          };
        }();

        function p(t, e) {
          0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0);
        }

        var f = {
          completeData: function (e, r) {
            e.__complete || (h(e), n(e), o(e), l(e), t(e.layers, e.assets, r), e.__complete = !0);
          }
        };
        return f.checkColors = h, f.checkChars = o, f.checkShapes = l, f.completeLayers = t, f;
      }

      var dataManager = dataFunctionManager(),
          FontManager = function () {
        var t = 5e3,
            e = {
          w: 0,
          size: 0,
          shapes: []
        },
            r = [];

        function i(t, e) {
          var r = createTag("span");
          r.style.fontFamily = e;
          var i = createTag("span");
          i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
          var s = i.offsetWidth;
          return i.style.fontFamily = t + ", " + e, {
            node: i,
            w: s,
            parent: r
          };
        }

        function s(t, e) {
          var r = createNS("text");
          return r.style.fontSize = "100px", r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", e.fStyle), r.setAttribute("font-weight", e.fWeight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r;
        }

        r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);

        var a = function () {
          this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now();
        };

        return a.getCombinedCharacterCodes = function () {
          return r;
        }, a.prototype.addChars = function (t) {
          if (t) {
            this.chars || (this.chars = []);
            var e,
                r,
                i,
                s = t.length,
                a = this.chars.length;

            for (e = 0; e < s; e += 1) {
              for (r = 0, i = !1; r < a;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;

              i || (this.chars.push(t[e]), a += 1);
            }
          }
        }, a.prototype.addFonts = function (t, e) {
          if (t) {
            if (this.chars) return this.isLoaded = !0, void (this.fonts = t.list);
            var r,
                a = t.list,
                n = a.length,
                o = n;

            for (r = 0; r < n; r += 1) {
              var h,
                  l,
                  p = !0;

              if (a[r].loaded = !1, a[r].monoCase = i(a[r].fFamily, "monospace"), a[r].sansCase = i(a[r].fFamily, "sans-serif"), a[r].fPath) {
                if ("p" === a[r].fOrigin || 3 === a[r].origin) {
                  if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + a[r].fFamily + '"], style[f-origin="3"][f-family="' + a[r].fFamily + '"]')).length > 0 && (p = !1), p) {
                    var f = createTag("style");
                    f.setAttribute("f-forigin", a[r].fOrigin), f.setAttribute("f-origin", a[r].origin), f.setAttribute("f-family", a[r].fFamily), f.type = "text/css", f.innerHTML = "@font-face {font-family: " + a[r].fFamily + "; font-style: normal; src: url('" + a[r].fPath + "');}", e.appendChild(f);
                  }
                } else if ("g" === a[r].fOrigin || 1 === a[r].origin) {
                  for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) -1 !== h[l].href.indexOf(a[r].fPath) && (p = !1);

                  if (p) {
                    var m = createTag("link");
                    m.setAttribute("f-forigin", a[r].fOrigin), m.setAttribute("f-origin", a[r].origin), m.type = "text/css", m.rel = "stylesheet", m.href = a[r].fPath, document.body.appendChild(m);
                  }
                } else if ("t" === a[r].fOrigin || 2 === a[r].origin) {
                  for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) a[r].fPath === h[l].src && (p = !1);

                  if (p) {
                    var c = createTag("link");
                    c.setAttribute("f-forigin", a[r].fOrigin), c.setAttribute("f-origin", a[r].origin), c.setAttribute("rel", "stylesheet"), c.setAttribute("href", a[r].fPath), e.appendChild(c);
                  }
                }
              } else a[r].loaded = !0, o -= 1;

              a[r].helper = s(e, a[r]), a[r].cache = {}, this.fonts.push(a[r]);
            }

            0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
          } else this.isLoaded = !0;
        }, a.prototype.getCharData = function (t, r, i) {
          for (var s = 0, a = this.chars.length; s < a;) {
            if (this.chars[s].ch === t && this.chars[s].style === r && this.chars[s].fFamily === i) return this.chars[s];
            s += 1;
          }

          return ("string" == typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, r, i), e;
        }, a.prototype.getFontByName = function (t) {
          for (var e = 0, r = this.fonts.length; e < r;) {
            if (this.fonts[e].fName === t) return this.fonts[e];
            e += 1;
          }

          return this.fonts[0];
        }, a.prototype.measureText = function (t, e, r) {
          var i = this.getFontByName(e),
              s = t.charCodeAt(0);

          if (!i.cache[s + 1]) {
            var a = i.helper;

            if (" " === t) {
              a.textContent = "|" + t + "|";
              var n = a.getComputedTextLength();
              a.textContent = "||";
              var o = a.getComputedTextLength();
              i.cache[s + 1] = (n - o) / 100;
            } else a.textContent = t, i.cache[s + 1] = a.getComputedTextLength() / 100;
          }

          return i.cache[s + 1] * r;
        }, a.prototype.checkLoadedFonts = function () {
          var e,
              r,
              i,
              s = this.fonts.length,
              a = s;

          for (e = 0; e < s; e += 1) this.fonts[e].loaded ? a -= 1 : "n" === this.fonts[e].fOrigin || 0 === this.fonts[e].origin ? this.fonts[e].loaded = !0 : (r = this.fonts[e].monoCase.node, i = this.fonts[e].monoCase.w, r.offsetWidth !== i ? (a -= 1, this.fonts[e].loaded = !0) : (r = this.fonts[e].sansCase.node, i = this.fonts[e].sansCase.w, r.offsetWidth !== i && (a -= 1, this.fonts[e].loaded = !0)), this.fonts[e].loaded && (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent), this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)));

          0 !== a && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
            this.isLoaded = !0;
          }.bind(this), 0);
        }, a.prototype.loaded = function () {
          return this.isLoaded;
        }, a;
      }(),
          PropertyFactory = function () {
        var t = initialDefaultFrame,
            e = Math.abs;

        function r(t, e) {
          var r,
              s = this.offsetTime;
          "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));

          for (var a, n, o, h, l, p, f, m, c = e.lastIndex, d = c, u = this.keyframes.length - 1, y = !0; y;) {
            if (a = this.keyframes[d], n = this.keyframes[d + 1], d === u - 1 && t >= n.t - s) {
              a.h && (a = n), c = 0;
              break;
            }

            if (n.t - s > t) {
              c = d;
              break;
            }

            d < u - 1 ? d += 1 : (c = 0, y = !1);
          }

          var g,
              v,
              b,
              P,
              _,
              S,
              A,
              x,
              E,
              k,
              T = n.t - s,
              M = a.t - s;

          if (a.to) {
            a.bezierData || (a.bezierData = bez.buildBezierData(a.s, n.s || a.e, a.to, a.ti));
            var F = a.bezierData;

            if (t >= T || t < M) {
              var D = t >= T ? F.points.length - 1 : 0;

              for (h = F.points[D].point.length, o = 0; o < h; o += 1) r[o] = F.points[D].point[o];
            } else {
              a.__fnct ? m = a.__fnct : (m = BezierFactory.getBezierEasing(a.o.x, a.o.y, a.i.x, a.i.y, a.n).get, a.__fnct = m), l = m((t - M) / (T - M));
              var I,
                  C = F.segmentLength * l,
                  w = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;

              for (f = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0, y = !0, p = F.points.length; y;) {
                if (w += F.points[f].partialLength, 0 === C || 0 === l || f === F.points.length - 1) {
                  for (h = F.points[f].point.length, o = 0; o < h; o += 1) r[o] = F.points[f].point[o];

                  break;
                }

                if (C >= w && C < w + F.points[f + 1].partialLength) {
                  for (I = (C - w) / F.points[f + 1].partialLength, h = F.points[f].point.length, o = 0; o < h; o += 1) r[o] = F.points[f].point[o] + (F.points[f + 1].point[o] - F.points[f].point[o]) * I;

                  break;
                }

                f < p - 1 ? f += 1 : y = !1;
              }

              e._lastPoint = f, e._lastAddedLength = w - F.points[f].partialLength, e._lastKeyframeIndex = d;
            }
          } else {
            var V, R, L, G, N;
            if (u = a.s.length, g = n.s || a.e, this.sh && 1 !== a.h) {
              if (t >= T) r[0] = g[0], r[1] = g[1], r[2] = g[2];else if (t <= M) r[0] = a.s[0], r[1] = a.s[1], r[2] = a.s[2];else {
                var B = i(a.s),
                    z = i(g);
                v = r, b = function (t, e, r) {
                  var i,
                      s,
                      a,
                      n,
                      o,
                      h = [],
                      l = t[0],
                      p = t[1],
                      f = t[2],
                      m = t[3],
                      c = e[0],
                      d = e[1],
                      u = e[2],
                      y = e[3];
                  (s = l * c + p * d + f * u + m * y) < 0 && (s = -s, c = -c, d = -d, u = -u, y = -y);
                  1 - s > 1e-6 ? (i = Math.acos(s), a = Math.sin(i), n = Math.sin((1 - r) * i) / a, o = Math.sin(r * i) / a) : (n = 1 - r, o = r);
                  return h[0] = n * l + o * c, h[1] = n * p + o * d, h[2] = n * f + o * u, h[3] = n * m + o * y, h;
                }(B, z, (t - M) / (T - M)), P = b[0], _ = b[1], S = b[2], A = b[3], x = Math.atan2(2 * _ * A - 2 * P * S, 1 - 2 * _ * _ - 2 * S * S), E = Math.asin(2 * P * _ + 2 * S * A), k = Math.atan2(2 * P * A - 2 * _ * S, 1 - 2 * P * P - 2 * S * S), v[0] = x / degToRads, v[1] = E / degToRads, v[2] = k / degToRads;
              }
            } else for (d = 0; d < u; d += 1) 1 !== a.h && (t >= T ? l = 1 : t < M ? l = 0 : (a.o.x.constructor === Array ? (a.__fnct || (a.__fnct = []), a.__fnct[d] ? m = a.__fnct[d] : (V = void 0 === a.o.x[d] ? a.o.x[0] : a.o.x[d], R = void 0 === a.o.y[d] ? a.o.y[0] : a.o.y[d], L = void 0 === a.i.x[d] ? a.i.x[0] : a.i.x[d], G = void 0 === a.i.y[d] ? a.i.y[0] : a.i.y[d], m = BezierFactory.getBezierEasing(V, R, L, G).get, a.__fnct[d] = m)) : a.__fnct ? m = a.__fnct : (V = a.o.x, R = a.o.y, L = a.i.x, G = a.i.y, m = BezierFactory.getBezierEasing(V, R, L, G).get, a.__fnct = m), l = m((t - M) / (T - M)))), g = n.s || a.e, N = 1 === a.h ? a.s[d] : a.s[d] + (g[d] - a.s[d]) * l, "multidimensional" === this.propType ? r[d] = N : r = N;
          }

          return e.lastIndex = c, r;
        }

        function i(t) {
          var e = t[0] * degToRads,
              r = t[1] * degToRads,
              i = t[2] * degToRads,
              s = Math.cos(e / 2),
              a = Math.cos(r / 2),
              n = Math.cos(i / 2),
              o = Math.sin(e / 2),
              h = Math.sin(r / 2),
              l = Math.sin(i / 2);
          return [o * h * n + s * a * l, o * a * n + s * h * l, s * h * n - o * a * l, s * a * n - o * h * l];
        }

        function s() {
          var e = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;

          if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
            this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
            var s = this.interpolateValue(e, this._caching);
            this.pv = s;
          }

          return this._caching.lastFrame = e, this.pv;
        }

        function a(t) {
          var r;
          if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);else for (var i = 0, s = this.v.length; i < s;) r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1;
        }

        function n() {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) if (this.lock) this.setVValue(this.pv);else {
            this.lock = !0, this._mdf = this._isFirstFrame;
            var t,
                e = this.effectsSequence.length,
                r = this.kf ? this.pv : this.data.k;

            for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);

            this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }

        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function h(t, e, r, i) {
          this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.addEffect = o;
        }

        function l(t, e, r, i) {
          this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
          var s,
              h = e.k.length;
          this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h);
          createTypedArray("float32", h);

          for (this.vel = createTypedArray("float32", h), s = 0; s < h; s += 1) this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];

          this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = a, this.addEffect = o;
        }

        function p(e, i, h, l) {
          this.propType = "unidimensional", this.keyframes = i.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
            lastFrame: t,
            lastIndex: 0,
            value: 0,
            _lastKeyframeIndex: -1
          }, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.effectsSequence = [s.bind(this)], this.addEffect = o;
        }

        function f(e, i, h, l) {
          this.propType = "multidimensional";
          var p,
              f,
              m,
              c,
              d,
              u = i.k.length;

          for (p = 0; p < u - 1; p += 1) i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (f = i.k[p].s, m = i.k[p + 1].s, c = i.k[p].to, d = i.k[p].ti, (2 === f.length && (f[0] !== m[0] || f[1] !== m[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], f[0] + c[0], f[1] + c[1]) && bez.pointOnLine2D(f[0], f[1], m[0], m[1], m[0] + d[0], m[1] + d[1]) || 3 === f.length && (f[0] !== m[0] || f[1] !== m[1] || f[2] !== m[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], f[0] + c[0], f[1] + c[1], f[2] + c[2]) && bez.pointOnLine3D(f[0], f[1], f[2], m[0], m[1], m[2], m[0] + d[0], m[1] + d[1], m[2] + d[2])) && (i.k[p].to = null, i.k[p].ti = null), f[0] === m[0] && f[1] === m[1] && 0 === c[0] && 0 === c[1] && 0 === d[0] && 0 === d[1] && (2 === f.length || f[2] === m[2] && 0 === c[2] && 0 === d[2]) && (i.k[p].to = null, i.k[p].ti = null));

          this.effectsSequence = [s.bind(this)], this.keyframes = i.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = a, this.interpolateValue = r, this.frameId = -1;
          var y = i.k[0].s.length;

          for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;

          this._caching = {
            lastFrame: t,
            lastIndex: 0,
            value: createTypedArray("float32", y)
          }, this.addEffect = o;
        }

        return {
          getProp: function (t, e, r, i, s) {
            var a;
            if (e.k.length) {
              if ("number" == typeof e.k[0]) a = new l(t, e, i, s);else switch (r) {
                case 0:
                  a = new p(t, e, i, s);
                  break;

                case 1:
                  a = new f(t, e, i, s);
              }
            } else a = new h(t, e, i, s);
            return a.effectsSequence.length && s.addDynamicProperty(a), a;
          }
        };
      }(),
          TransformPropertyFactory = function () {
        var t = [0, 0];

        function e(t, e, r) {
          if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
            k: [0, 0, 0]
          }, 1, 0, this), e.rx) {
            if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
              var i,
                  s = e.or.k.length;

              for (i = 0; i < s; i += 1) e.or.k[i].to = e.or.k[i].ti = null;
            }

            this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0;
          } else this.r = PropertyFactory.getProp(t, e.r || {
            k: 0
          }, 0, degToRads, this);

          e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
            k: [0, 0, 0]
          }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
            k: [100, 100, 100]
          }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
            _mdf: !1,
            v: 1
          }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
        }

        return e.prototype = {
          applyToMatrix: function (t) {
            var e = this._mdf;
            this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
          },
          getValue: function (e) {
            if (this.elem.globalData.frameId !== this.frameId) {
              if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
                if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                  var r,
                      i,
                      s = this.elem.globalData.frameRate;
                  if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / s, 0), i = this.p.getValueAtTime(this.p.keyframes[0].t / s, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / s, 0), i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / s, 0)) : (r = this.p.pv, i = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / s, this.p.offsetTime));else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                    r = [], i = [];
                    var a = this.px,
                        n = this.py;
                    a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t ? (r[0] = a.getValueAtTime((a.keyframes[0].t + .01) / s, 0), r[1] = n.getValueAtTime((n.keyframes[0].t + .01) / s, 0), i[0] = a.getValueAtTime(a.keyframes[0].t / s, 0), i[1] = n.getValueAtTime(n.keyframes[0].t / s, 0)) : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t ? (r[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / s, 0), r[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / s, 0), i[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / s, 0), i[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / s, 0)) : (r = [a.pv, n.pv], i[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / s, a.offsetTime), i[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / s, n.offsetTime));
                  } else r = i = t;
                  this.v.rotate(-Math.atan2(r[1] - i[1], r[0] - i[0]));
                }

                this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              }

              this.frameId = this.elem.globalData.frameId;
            }
          },
          precalculateMatrix: function () {
            if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
              if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
              }

              if (this.r) {
                if (this.r.effectsSequence.length) return;
                this.pre.rotate(-this.r.v), this.appliedTransformations = 4;
              } else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
            }
          },
          autoOrient: function () {}
        }, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function (t) {
          this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0;
        }, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
          getTransformProperty: function (t, r, i) {
            return new e(t, r, i);
          }
        };
      }();

      function ShapePath() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
      }

      ShapePath.prototype.setPathData = function (t, e) {
        this.c = t, this.setLength(e);

        for (var r = 0; r < e;) this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1;
      }, ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t;) this.doubleArrayLength();

        this._length = t;
      }, ShapePath.prototype.doubleArrayLength = function () {
        this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
      }, ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
        var a;

        switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
          case "v":
            a = this.v;
            break;

          case "i":
            a = this.i;
            break;

          case "o":
            a = this.o;
        }

        (!a[i] || a[i] && !s) && (a[i] = point_pool.newElement()), a[i][0] = t, a[i][1] = e;
      }, ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
        this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(s, a, "i", n, o);
      }, ShapePath.prototype.reverse = function () {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v,
            r = this.o,
            i = this.i,
            s = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
        var a,
            n = this._length - 1,
            o = this._length;

        for (a = s; a < o; a += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], a, !1), n -= 1;

        return t;
      };

      var ShapePropertyFactory = function () {
        var t = -999999;

        function e(t, e, r) {
          var i,
              s,
              a,
              n,
              o,
              h,
              l,
              p,
              f,
              m = r.lastIndex,
              c = this.keyframes;
          if (t < c[0].t - this.offsetTime) i = c[0].s[0], a = !0, m = 0;else if (t >= c[c.length - 1].t - this.offsetTime) i = c[c.length - 1].s ? c[c.length - 1].s[0] : c[c.length - 2].e[0], a = !0;else {
            for (var d, u, y = m, g = c.length - 1, v = !0; v && (d = c[y], !((u = c[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;

            if (m = y, !(a = 1 === d.h)) {
              if (t >= u.t - this.offsetTime) p = 1;else if (t < d.t - this.offsetTime) p = 0;else {
                var b;
                d.__fnct ? b = d.__fnct : (b = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = b), p = b((t - (d.t - this.offsetTime)) / (u.t - this.offsetTime - (d.t - this.offsetTime)));
              }
              s = u.s ? u.s[0] : d.e[0];
            }

            i = d.s[0];
          }

          for (h = e._length, l = i.i[0].length, r.lastIndex = m, n = 0; n < h; n += 1) for (o = 0; o < l; o += 1) f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * p, e.i[n][o] = f, f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * p, e.o[n][o] = f, f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * p, e.v[n][o] = f;
        }

        function r() {
          var e = this.comp.renderedFrame - this.offsetTime,
              r = this.keyframes[0].t - this.offsetTime,
              i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
              s = this._caching.lastFrame;
          return s !== t && (s < r && e < r || s > i && e > i) || (this._caching.lastIndex = s < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv;
        }

        function i() {
          this.paths = this.localShapeCollection;
        }

        function s(t) {
          (function (t, e) {
            if (t._length !== e._length || t.c !== e.c) return !1;
            var r,
                i = t._length;

            for (r = 0; r < i; r += 1) if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;

            return !0;
          })(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
        }

        function a() {
          if (this.elem.globalData.frameId !== this.frameId) if (this.effectsSequence.length) {
            if (this.lock) this.setVValue(this.pv);else {
              this.lock = !0, this._mdf = !1;
              var t,
                  e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
                  r = this.effectsSequence.length;

              for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);

              this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId;
            }
          } else this._mdf = !1;
        }

        function n(t, e, r) {
          this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
          var s = 3 === r ? e.pt.k : e.ks.k;
          this.v = shape_pool.clone(s), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = [];
        }

        function o(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }

        function h(e, s, a) {
          this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === a ? s.pt.k : s.ks.k, this.k = !0, this.kf = !0;
          var n = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, n), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
            lastFrame: t,
            lastIndex: 0
          }, this.effectsSequence = [r.bind(this)];
        }

        n.prototype.interpolateShape = e, n.prototype.getValue = a, n.prototype.setVValue = s, n.prototype.addEffect = o, h.prototype.getValue = a, h.prototype.interpolateShape = e, h.prototype.setVValue = s, h.prototype.addEffect = o;

        var l = function () {
          var t = roundCorner;

          function e(t, e) {
            this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }

          return e.prototype = {
            reset: i,
            getValue: function () {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function () {
              var e = this.p.v[0],
                  r = this.p.v[1],
                  i = this.s.v[0] / 2,
                  s = this.s.v[1] / 2,
                  a = 3 !== this.d,
                  n = this.v;
              n.v[0][0] = e, n.v[0][1] = r - s, n.v[1][0] = a ? e + i : e - i, n.v[1][1] = r, n.v[2][0] = e, n.v[2][1] = r + s, n.v[3][0] = a ? e - i : e + i, n.v[3][1] = r, n.i[0][0] = a ? e - i * t : e + i * t, n.i[0][1] = r - s, n.i[1][0] = a ? e + i : e - i, n.i[1][1] = r - s * t, n.i[2][0] = a ? e + i * t : e - i * t, n.i[2][1] = r + s, n.i[3][0] = a ? e - i : e + i, n.i[3][1] = r + s * t, n.o[0][0] = a ? e + i * t : e - i * t, n.o[0][1] = r - s, n.o[1][0] = a ? e + i : e - i, n.o[1][1] = r + s * t, n.o[2][0] = a ? e - i * t : e + i * t, n.o[2][1] = r + s, n.o[3][0] = a ? e - i : e + i, n.o[3][1] = r - s * t;
            }
          }, extendPrototype([DynamicPropertyContainer], e), e;
        }(),
            p = function () {
          function t(t, e) {
            this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }

          return t.prototype = {
            reset: i,
            getValue: function () {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function () {
              var t,
                  e,
                  r,
                  i,
                  s = 2 * Math.floor(this.pt.v),
                  a = 2 * Math.PI / s,
                  n = !0,
                  o = this.or.v,
                  h = this.ir.v,
                  l = this.os.v,
                  p = this.is.v,
                  f = 2 * Math.PI * o / (2 * s),
                  m = 2 * Math.PI * h / (2 * s),
                  c = -Math.PI / 2;
              c += this.r.v;
              var d = 3 === this.data.d ? -1 : 1;

              for (this.v._length = 0, t = 0; t < s; t += 1) {
                r = n ? l : p, i = n ? f : m;
                var u = (e = n ? o : h) * Math.cos(c),
                    y = e * Math.sin(c),
                    g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                    v = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * d, y - v * i * r * d, u + g * i * r * d, y + v * i * r * d, t, !0), n = !n, c += a * d;
              }
            },
            convertPolygonToPath: function () {
              var t,
                  e = Math.floor(this.pt.v),
                  r = 2 * Math.PI / e,
                  i = this.or.v,
                  s = this.os.v,
                  a = 2 * Math.PI * i / (4 * e),
                  n = -Math.PI / 2,
                  o = 3 === this.data.d ? -1 : 1;

              for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                var h = i * Math.cos(n),
                    l = i * Math.sin(n),
                    p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                    f = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * a * s * o, l - f * a * s * o, h + p * a * s * o, l + f * a * s * o, t, !0), n += r * o;
              }

              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }(),
            f = function () {
          function t(t, e) {
            this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }

          return t.prototype = {
            convertRectToPath: function () {
              var t = this.p.v[0],
                  e = this.p.v[1],
                  r = this.s.v[0] / 2,
                  i = this.s.v[1] / 2,
                  s = bm_min(r, i, this.r.v),
                  a = s * (1 - roundCorner);
              this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + s, t + r, e - i + a, 0, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - a, t + r, e + i - s, 1, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e + i, t + r - s, e + i, t + r - a, e + i, 2, !0), this.v.setTripleAt(t - r + s, e + i, t - r + a, e + i, t - r + s, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + a, t - r, e - i + s, 5, !0), this.v.setTripleAt(t - r + s, e - i, t - r + s, e - i, t - r + a, e - i, 6, !0), this.v.setTripleAt(t + r - s, e - i, t + r - a, e - i, t + r - s, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + a, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + a, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + s, t + r, e - i + a, t + r, e - i + s, 0, !0), 0 !== s ? (this.v.setTripleAt(t + r - s, e - i, t + r - s, e - i, t + r - a, e - i, 1, !0), this.v.setTripleAt(t - r + s, e - i, t - r + a, e - i, t - r + s, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + s, t - r, e - i + s, t - r, e - i + a, 3, !0), this.v.setTripleAt(t - r, e + i - s, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r + s, e + i, t - r + s, e + i, t - r + a, e + i, 5, !0), this.v.setTripleAt(t + r - s, e + i, t + r - a, e + i, t + r - s, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - s, t + r, e + i - s, t + r, e + i - a, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + a, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - a, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - a, e + i, t + r, e + i, 3, !0)));
            },
            getValue: function (t) {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: i
          }, extendPrototype([DynamicPropertyContainer], t), t;
        }();

        var m = {
          getShapeProp: function (t, e, r) {
            var i;
            return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t, e, r) : new n(t, e, r) : 5 === r ? i = new f(t, e) : 6 === r ? i = new l(t, e) : 7 === r && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i;
          },
          getConstructorFunction: function () {
            return n;
          },
          getKeyframedConstructorFunction: function () {
            return h;
          }
        };
        return m;
      }(),
          ShapeModifiers = function () {
        var t = {},
            e = {};
        return t.registerModifier = function (t, r) {
          e[t] || (e[t] = r);
        }, t.getModifier = function (t, r, i) {
          return new e[t](r, i);
        }, t;
      }();

      function ShapeModifier() {}

      function TrimModifier() {}

      function RoundCornersModifier() {}

      function RepeaterModifier() {}

      function ShapeCollection() {
        this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
      }

      function DashProperty(t, e, r, i) {
        this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
        var s,
            a,
            n = e.length || 0;

        for (s = 0; s < n; s += 1) a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
          n: e[s].n,
          p: a
        };

        this.k || this.getValue(!0), this._isAnimated = this.k;
      }

      function GradientProperty(t, e, r) {
        this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
        var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
        this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
      }

      ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
          t.sh.container.addDynamicProperty(t.sh);
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: shapeCollection_pool.newShapeCollection()
          };
          this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
        }
      }, ShapeModifier.prototype.init = function (t, e) {
        this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
      }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
        this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
      }, TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
        var a = [];
        e <= 1 ? a.push({
          s: t,
          e: e
        }) : t >= 1 ? a.push({
          s: t - 1,
          e: e - 1
        }) : (a.push({
          s: t,
          e: 1
        }), a.push({
          s: 0,
          e: e - 1
        }));
        var n,
            o,
            h = [],
            l = a.length;

        for (n = 0; n < l; n += 1) {
          var p, f;
          if ((o = a[n]).e * s < i || o.s * s > i + r) ;else p = o.s * s <= i ? 0 : (o.s * s - i) / r, f = o.e * s >= i + r ? 1 : (o.e * s - i) / r, h.push([p, f]);
        }

        return h.length || h.push([0, 0]), h;
      }, TrimModifier.prototype.releasePathsData = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);

        return t.length = 0, t;
      }, TrimModifier.prototype.processShapes = function (t) {
        var e, r, i;

        if (this._mdf || t) {
          var s = this.o.v % 360 / 360;

          if (s < 0 && (s += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + s) > (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + s)) {
            var a = e;
            e = r, r = a;
          }

          e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r;
        } else e = this.sValue, r = this.eValue;

        var n,
            o,
            h,
            l,
            p,
            f,
            m = this.shapes.length,
            c = 0;
        if (r === e) for (n = 0; n < m; n += 1) this.shapes[n].localShapeCollection.releaseShapes(), this.shapes[n].shape._mdf = !0, this.shapes[n].shape.paths = this.shapes[n].localShapeCollection;else if (1 === r && 0 === e || 0 === r && 1 === e) {
          if (this._mdf) for (n = 0; n < m; n += 1) this.shapes[n].pathsData.length = 0, this.shapes[n].shape._mdf = !0;
        } else {
          var d,
              u,
              y = [];

          for (n = 0; n < m; n += 1) if ((d = this.shapes[n]).shape._mdf || this._mdf || t || 2 === this.m) {
            if (h = (i = d.shape.paths)._length, f = 0, !d.shape._mdf && d.pathsData.length) f = d.totalShapeLength;else {
              for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), f += p.totalLength;

              d.totalShapeLength = f, d.pathsData = l;
            }
            c += f, d.shape._mdf = !0;
          } else d.shape.paths = d.localShapeCollection;

          var g,
              v = e,
              b = r,
              P = 0;

          for (n = m - 1; n >= 0; n -= 1) if ((d = this.shapes[n]).shape._mdf) {
            for ((u = d.localShapeCollection).releaseShapes(), 2 === this.m && m > 1 ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, P, c), P += d.totalShapeLength) : g = [[v, b]], h = g.length, o = 0; o < h; o += 1) {
              v = g[o][0], b = g[o][1], y.length = 0, b <= 1 ? y.push({
                s: d.totalShapeLength * v,
                e: d.totalShapeLength * b
              }) : v >= 1 ? y.push({
                s: d.totalShapeLength * (v - 1),
                e: d.totalShapeLength * (b - 1)
              }) : (y.push({
                s: d.totalShapeLength * v,
                e: d.totalShapeLength
              }), y.push({
                s: 0,
                e: d.totalShapeLength * (b - 1)
              }));

              var _ = this.addShapes(d, y[0]);

              if (y[0].s !== y[0].e) {
                if (y.length > 1) if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                  var S = _.pop();

                  this.addPaths(_, u), _ = this.addShapes(d, y[1], S);
                } else this.addPaths(_, u), _ = this.addShapes(d, y[1]);
                this.addPaths(_, u);
              }
            }

            d.shape.paths = u;
          }
        }
      }, TrimModifier.prototype.addPaths = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) e.addShape(t[r]);
      }, TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
        s.setXYAt(e[0], e[1], "o", a), s.setXYAt(r[0], r[1], "i", a + 1), n && s.setXYAt(t[0], t[1], "v", a), s.setXYAt(i[0], i[1], "v", a + 1);
      }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
        e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1);
      }, TrimModifier.prototype.addShapes = function (t, e, r) {
        var i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f = t.pathsData,
            m = t.shape.paths.shapes,
            c = t.shape.paths._length,
            d = 0,
            u = [],
            y = !0;

        for (r ? (o = r._length, p = r._length) : (r = shape_pool.newElement(), o = 0, p = 0), u.push(r), i = 0; i < c; i += 1) {
          for (h = f[i].lengths, r.c = m[i].c, a = m[i].c ? h.length : h.length + 1, s = 1; s < a; s += 1) if (d + (n = h[s - 1]).addedLength < e.s) d += n.addedLength, r.c = !1;else {
            if (d > e.e) {
              r.c = !1;
              break;
            }

            e.s <= d && e.e >= d + n.addedLength ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[s], m[i].v[s], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[s], m[i].o[s - 1], m[i].i[s], (e.s - d) / n.addedLength, (e.e - d) / n.addedLength, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += n.addedLength, o += 1;
          }

          if (m[i].c && h.length) {
            if (n = h[s - 1], d <= e.e) {
              var g = h[s - 1].addedLength;
              e.s <= d && e.e >= d + g ? (this.addSegment(m[i].v[s - 1], m[i].o[s - 1], m[i].i[0], m[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(m[i].v[s - 1], m[i].v[0], m[i].o[s - 1], m[i].i[0], (e.s - d) / g, (e.e - d) / g, h[s - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1);
            } else r.c = !1;

            d += n.addedLength, o += 1;
          }

          if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
          i < c - 1 && (r = shape_pool.newElement(), y = !0, u.push(r), o = 0);
        }

        return u;
      }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
      }, RoundCornersModifier.prototype.processPath = function (t, e) {
        var r = shape_pool.newElement();
        r.c = t.c;
        var i,
            s,
            a,
            n,
            o,
            h,
            l,
            p,
            f,
            m,
            c,
            d,
            u,
            y = t._length,
            g = 0;

        for (i = 0; i < y; i += 1) s = t.v[i], n = t.o[i], a = t.i[i], s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = s[0] + (o[0] - s[0]) * l, f = u = s[1] - (s[1] - o[1]) * l, m = p - (p - s[0]) * roundCorner, c = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = m = s[0] + (o[0] - s[0]) * l, f = c = s[1] + (o[1] - s[1]) * l, d = p - (p - s[0]) * roundCorner, u = f - (f - s[1]) * roundCorner, r.setTripleAt(p, f, m, c, d, u, g), g += 1) : (r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g), g += 1) : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1);

        return r;
      }, RoundCornersModifier.prototype.processShapes = function (t) {
        var e,
            r,
            i,
            s,
            a,
            n,
            o = this.shapes.length,
            h = this.rd.v;
        if (0 !== h) for (r = 0; r < o; r += 1) {
          if ((a = this.shapes[r]).shape.paths, n = a.localShapeCollection, a.shape._mdf || this._mdf || t) for (n.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, s = a.shape.paths._length, i = 0; i < s; i += 1) n.addShape(this.processPath(e[i], h));
          a.shape.paths = a.localShapeCollection;
        }
        this.dynamicProperties.length || (this._mdf = !1);
      }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
      }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, s, a) {
        var n = a ? -1 : 1,
            o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
            h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(a ? 1 / o : o, a ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }, RepeaterModifier.prototype.init = function (t, e, r, i) {
        this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);

        for (; r > 0;) r -= 1, this._elements.unshift(e[r]), 1;

        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, RepeaterModifier.prototype.resetElements = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it);
      }, RepeaterModifier.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var r,
            i = t.length;

        for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e);
      }, RepeaterModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a;

        if (this._mdf || t) {
          var n,
              o = Math.ceil(this.c.v);

          if (this._groups.length < o) {
            for (; this._groups.length < o;) {
              var h = {
                it: this.cloneElements(this._elements),
                ty: "gr"
              };
              h.it.push({
                a: {
                  a: 0,
                  ix: 1,
                  k: [0, 0]
                },
                nm: "Transform",
                o: {
                  a: 0,
                  ix: 7,
                  k: 100
                },
                p: {
                  a: 0,
                  ix: 2,
                  k: [0, 0]
                },
                r: {
                  a: 1,
                  ix: 6,
                  k: [{
                    s: 0,
                    e: 0,
                    t: 0
                  }, {
                    s: 0,
                    e: 0,
                    t: 1
                  }]
                },
                s: {
                  a: 0,
                  ix: 3,
                  k: [100, 100]
                },
                sa: {
                  a: 0,
                  ix: 5,
                  k: 0
                },
                sk: {
                  a: 0,
                  ix: 4,
                  k: 0
                },
                ty: "tr"
              }), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1;
            }

            this.elem.reloadShapes();
          }

          for (a = 0, i = 0; i <= this._groups.length - 1; i += 1) n = a < o, this._groups[i]._render = n, this.changeGroupRender(this._groups[i].it, n), a += 1;

          this._currentCopies = o;
          var l = this.o.v,
              p = l % 1,
              f = l > 0 ? Math.floor(l) : Math.ceil(l),
              m = (this.tr.v.props, this.pMatrix.props),
              c = this.rMatrix.props,
              d = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var u,
              y,
              g = 0;

          if (l > 0) {
            for (; g < f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p);
          } else if (l < 0) {
            for (; g > f;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;

            p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p);
          }

          for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, s = 1 === this.data.m ? 1 : -1, a = this._currentCopies; a;) {
            if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
              for ((0 !== i && 1 === s || i !== this._currentCopies - 1 && -1 === s) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];

              this.matrix.reset();
            } else for (this.matrix.reset(), u = 0; u < y; u += 1) r[u] = this.matrix.props[u];

            g += 1, a -= 1, i += s;
          }
        } else for (a = this._currentCopies, i = 0, s = 1; a;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, a -= 1, i += s;
      }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
      }, ShapeCollection.prototype.releaseShapes = function () {
        var t;

        for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);

        this._length = 0;
      }, DashProperty.prototype.getValue = function (t) {
        if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
          var e = 0,
              r = this.dataProps.length;

          for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
        }
      }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
        for (var r = 0, i = this.o.length / 2; r < i;) {
          if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
          r += 1;
        }

        return !0;
      }, GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s) for (var t = 0, e = this.data.k.k.length; t < e;) {
          if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
          t += 1;
        } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }, GradientProperty.prototype.getValue = function (t) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
          var e,
              r,
              i,
              s = 4 * this.data.p;

          for (e = 0; e < s; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);

          if (this.o.length) for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
          this._mdf = !t;
        }
      }, extendPrototype([DynamicPropertyContainer], GradientProperty);

      var buildShapeString = function (t, e, r, i) {
        if (0 === e) return "";
        var s,
            a = t.o,
            n = t.i,
            o = t.v,
            h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);

        for (s = 1; s < e; s += 1) h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[s][0], n[s][1]) + " " + i.applyToPointStringified(o[s][0], o[s][1]);

        return r && e && (h += " C" + i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h;
      },
          ImagePreloader = function () {
        var t = function () {
          var t = createTag("canvas");
          t.width = 1, t.height = 1;
          var e = t.getContext("2d");
          return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t;
        }();

        function e() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }

        function r(e) {
          var r = function (t, e, r) {
            var i = "";
            if (t.e) i = t.p;else if (e) {
              var s = t.p;
              -1 !== s.indexOf("images/") && (s = s.split("/")[1]), i = e + s;
            } else i = r, i += t.u ? t.u : "", i += t.p;
            return i;
          }(e, this.assetsPath, this.path),
              i = createTag("img");

          i.crossOrigin = "anonymous", i.addEventListener("load", this._imageLoaded.bind(this), !1), i.addEventListener("error", function () {
            s.img = t, this._imageLoaded();
          }.bind(this), !1), i.src = r;
          var s = {
            img: i,
            assetData: e
          };
          return s;
        }

        function i(t, e) {
          this.imagesLoadedCb = e;
          var r,
              i = t.length;

          for (r = 0; r < i; r += 1) t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])));
        }

        function s(t) {
          this.path = t || "";
        }

        function a(t) {
          this.assetsPath = t || "";
        }

        function n(t) {
          for (var e = 0, r = this.images.length; e < r;) {
            if (this.images[e].assetData === t) return this.images[e].img;
            e += 1;
          }
        }

        function o() {
          this.imagesLoadedCb = null, this.images.length = 0;
        }

        function h() {
          return this.totalImages === this.loadedAssets;
        }

        return function () {
          this.loadAssets = i, this.setAssetsPath = a, this.setPath = s, this.loaded = h, this.destroy = o, this.getImage = n, this._createImageData = r, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = [];
        };
      }(),
          featureSupport = function () {
        var t = {
          maskType: !0
        };
        return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t;
      }(),
          filtersFactory = function () {
        var t = {};
        return t.createFilter = function (t) {
          var e = createNS("filter");
          return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e;
        }, t.createAlphaToLuminanceFilter = function () {
          var t = createNS("feColorMatrix");
          return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t;
        }, t;
      }(),
          assetLoader = function () {
        function t(t) {
          return t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0;
        }

        return {
          load: function (e, r, i) {
            var s,
                a = new XMLHttpRequest();
            a.open("GET", e, !0);

            try {
              a.responseType = "json";
            } catch (n) {}

            a.send(), a.onreadystatechange = function () {
              if (4 == a.readyState) if (200 == a.status) s = t(a), r(s);else try {
                s = t(a), r(s);
              } catch (n) {
                i && i(n);
              }
            };
          }
        };
      }();

      function TextAnimatorProperty(t, e, r) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
          alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
      }

      function TextAnimatorDataProperty(t, e, r) {
        var i = {
          propType: !1
        },
            s = PropertyFactory.getProp,
            a = e.a;
        this.a = {
          r: a.r ? s(t, a.r, 0, degToRads, r) : i,
          rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
          ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
          sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
          sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
          s: a.s ? s(t, a.s, 1, .01, r) : i,
          a: a.a ? s(t, a.a, 1, 0, r) : i,
          o: a.o ? s(t, a.o, 0, .01, r) : i,
          p: a.p ? s(t, a.p, 1, 0, r) : i,
          sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
          sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
          fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
          fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
          fs: a.fs ? s(t, a.fs, 0, .01, r) : i,
          fb: a.fb ? s(t, a.fb, 0, .01, r) : i,
          t: a.t ? s(t, a.t, 0, 0, r) : i
        }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t;
      }

      function LetterProps(t, e, r, i, s, a) {
        this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = a, this._mdf = {
          o: !0,
          sw: !!e,
          sc: !!r,
          fc: !!i,
          m: !0,
          p: !0
        };
      }

      function TextProperty(t, e) {
        this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1
        }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
      }

      TextAnimatorProperty.prototype.searchProperties = function () {
        var t,
            e,
            r = this._textData.a.length,
            i = PropertyFactory.getProp;

        for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);

        this._textData.p && "m" in this._textData.p ? (this._pathData = {
          f: i(this._elem, this._textData.p.f, 0, 0, this),
          l: i(this._elem, this._textData.p.l, 0, 0, this),
          r: this._textData.p.r,
          m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
      }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
          this._isFirstFrame = !1;
          var r,
              i,
              s,
              a,
              n,
              o,
              h,
              l,
              p,
              f,
              m,
              c,
              d,
              u,
              y,
              g,
              v,
              b,
              P,
              _ = this._moreOptions.alignment.v,
              S = this._animatorsData,
              A = this._textData,
              x = this.mHelper,
              E = this._renderType,
              k = this.renderedLetters.length,
              T = (this.data, t.l);

          if (this._hasMaskedPath) {
            if (P = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
              var M,
                  F = P.v;

              for (this._pathData.r && (F = F.reverse()), n = {
                tLength: 0,
                segments: []
              }, a = F._length - 1, g = 0, s = 0; s < a; s += 1) M = bez.buildBezierData(F.v[s], F.v[s + 1], [F.o[s][0] - F.v[s][0], F.o[s][1] - F.v[s][1]], [F.i[s + 1][0] - F.v[s + 1][0], F.i[s + 1][1] - F.v[s + 1][1]]), n.tLength += M.segmentLength, n.segments.push(M), g += M.segmentLength;

              s = a, P.v.c && (M = bez.buildBezierData(F.v[s], F.v[0], [F.o[s][0] - F.v[s][0], F.o[s][1] - F.v[s][1]], [F.i[0][0] - F.v[0][0], F.i[0][1] - F.v[0][1]]), n.tLength += M.segmentLength, n.segments.push(M), g += M.segmentLength), this._pathData.pi = n;
            }

            if (n = this._pathData.pi, o = this._pathData.f.v, m = 0, f = 1, l = 0, p = !0, u = n.segments, o < 0 && P.v.c) for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), f = (d = u[m = u.length - 1].points).length - 1; o < 0;) o += d[f].partialLength, (f -= 1) < 0 && (f = (d = u[m -= 1].points).length - 1);
            c = (d = u[m].points)[f - 1], y = (h = d[f]).partialLength;
          }

          a = T.length, r = 0, i = 0;
          var D,
              I,
              C,
              w,
              V = 1.2 * t.finalSize * .714,
              R = !0;
          C = S.length;
          var L,
              G,
              N,
              B,
              z,
              O,
              j,
              q,
              H,
              W,
              X,
              Y,
              $,
              K = -1,
              J = o,
              U = m,
              Z = f,
              Q = -1,
              tt = "",
              et = this.defaultPropsArray;

          if (2 === t.j || 1 === t.j) {
            var rt = 0,
                it = 0,
                st = 2 === t.j ? -.5 : -1,
                at = 0,
                nt = !0;

            for (s = 0; s < a; s += 1) if (T[s].n) {
              for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;

              rt = 0, nt = !0;
            } else {
              for (I = 0; I < C; I += 1) (D = S[I].a).t.propType && (nt && 2 === t.j && (it += D.t.v * st), (L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars)).length ? rt += D.t.v * L[0] * st : rt += D.t.v * L * st);

              nt = !1;
            }

            for (rt && (rt += it); at < s;) T[at].animatorJustifyOffset = rt, at += 1;
          }

          for (s = 0; s < a; s += 1) {
            if (x.reset(), z = 1, T[s].n) r = 0, i += t.yOffset, i += R ? 1 : 0, o = J, R = !1, 0, this._hasMaskedPath && (f = Z, c = (d = u[m = U].points)[f - 1], y = (h = d[f]).partialLength, l = 0), $ = W = Y = tt = "", et = this.defaultPropsArray;else {
              if (this._hasMaskedPath) {
                if (Q !== T[s].line) {
                  switch (t.j) {
                    case 1:
                      o += g - t.lineWidths[T[s].line];
                      break;

                    case 2:
                      o += (g - t.lineWidths[T[s].line]) / 2;
                  }

                  Q = T[s].line;
                }

                K !== T[s].ind && (T[K] && (o += T[K].extra), o += T[s].an / 2, K = T[s].ind), o += _[0] * T[s].an / 200;
                var ot = 0;

                for (I = 0; I < C; I += 1) (D = S[I].a).p.propType && ((L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars)).length ? ot += D.p.v[0] * L[0] : ot += D.p.v[0] * L), D.a.propType && ((L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars)).length ? ot += D.a.v[0] * L[0] : ot += D.a.v[0] * L);

                for (p = !0; p;) l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, N = c.point[0] + (h.point[0] - c.point[0]) * v, B = c.point[1] + (h.point[1] - c.point[1]) * v, x.translate(-_[0] * T[s].an / 200, -_[1] * V / 100), p = !1) : d && (l += h.partialLength, (f += 1) >= d.length && (f = 0, u[m += 1] ? d = u[m].points : P.v.c ? (f = 0, d = u[m = 0].points) : (l -= h.partialLength, d = null)), d && (c = h, y = (h = d[f]).partialLength));

                G = T[s].an / 2 - T[s].add, x.translate(-G, 0, 0);
              } else G = T[s].an / 2 - T[s].add, x.translate(-G, 0, 0), x.translate(-_[0] * T[s].an / 200, -_[1] * V / 100, 0);

              for (T[s].l / 2, I = 0; I < C; I += 1) (D = S[I].a).t.propType && (L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? L.length ? o += D.t.v * L[0] : o += D.t.v * L : L.length ? r += D.t.v * L[0] : r += D.t.v * L));

              for (T[s].l / 2, t.strokeWidthAnim && (j = t.sw || 0), t.strokeColorAnim && (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (q = [t.fc[0], t.fc[1], t.fc[2]]), I = 0; I < C; I += 1) (D = S[I].a).a.propType && ((L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars)).length ? x.translate(-D.a.v[0] * L[0], -D.a.v[1] * L[1], D.a.v[2] * L[2]) : x.translate(-D.a.v[0] * L, -D.a.v[1] * L, D.a.v[2] * L));

              for (I = 0; I < C; I += 1) (D = S[I].a).s.propType && ((L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars)).length ? x.scale(1 + (D.s.v[0] - 1) * L[0], 1 + (D.s.v[1] - 1) * L[1], 1) : x.scale(1 + (D.s.v[0] - 1) * L, 1 + (D.s.v[1] - 1) * L, 1));

              for (I = 0; I < C; I += 1) {
                if (D = S[I].a, L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars), D.sk.propType && (L.length ? x.skewFromAxis(-D.sk.v * L[0], D.sa.v * L[1]) : x.skewFromAxis(-D.sk.v * L, D.sa.v * L)), D.r.propType && (L.length ? x.rotateZ(-D.r.v * L[2]) : x.rotateZ(-D.r.v * L)), D.ry.propType && (L.length ? x.rotateY(D.ry.v * L[1]) : x.rotateY(D.ry.v * L)), D.rx.propType && (L.length ? x.rotateX(D.rx.v * L[0]) : x.rotateX(D.rx.v * L)), D.o.propType && (L.length ? z += (D.o.v * L[0] - z) * L[0] : z += (D.o.v * L - z) * L), t.strokeWidthAnim && D.sw.propType && (L.length ? j += D.sw.v * L[0] : j += D.sw.v * L), t.strokeColorAnim && D.sc.propType) for (H = 0; H < 3; H += 1) L.length ? O[H] = O[H] + (D.sc.v[H] - O[H]) * L[0] : O[H] = O[H] + (D.sc.v[H] - O[H]) * L;

                if (t.fillColorAnim && t.fc) {
                  if (D.fc.propType) for (H = 0; H < 3; H += 1) L.length ? q[H] = q[H] + (D.fc.v[H] - q[H]) * L[0] : q[H] = q[H] + (D.fc.v[H] - q[H]) * L;
                  D.fh.propType && (q = L.length ? addHueToRGB(q, D.fh.v * L[0]) : addHueToRGB(q, D.fh.v * L)), D.fs.propType && (q = L.length ? addSaturationToRGB(q, D.fs.v * L[0]) : addSaturationToRGB(q, D.fs.v * L)), D.fb.propType && (q = L.length ? addBrightnessToRGB(q, D.fb.v * L[0]) : addBrightnessToRGB(q, D.fb.v * L));
                }
              }

              for (I = 0; I < C; I += 1) (D = S[I].a).p.propType && (L = S[I].s.getMult(T[s].anIndexes[I], A.a[I].s.totalChars), this._hasMaskedPath ? L.length ? x.translate(0, D.p.v[1] * L[0], -D.p.v[2] * L[1]) : x.translate(0, D.p.v[1] * L, -D.p.v[2] * L) : L.length ? x.translate(D.p.v[0] * L[0], D.p.v[1] * L[1], -D.p.v[2] * L[2]) : x.translate(D.p.v[0] * L, D.p.v[1] * L, -D.p.v[2] * L));

              if (t.strokeWidthAnim && (W = j < 0 ? 0 : j), t.strokeColorAnim && (X = "rgb(" + Math.round(255 * O[0]) + "," + Math.round(255 * O[1]) + "," + Math.round(255 * O[2]) + ")"), t.fillColorAnim && t.fc && (Y = "rgb(" + Math.round(255 * q[0]) + "," + Math.round(255 * q[1]) + "," + Math.round(255 * q[2]) + ")"), this._hasMaskedPath) {
                if (x.translate(0, -t.ls), x.translate(0, _[1] * V / 100 + i, 0), A.p.p) {
                  b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                  var ht = 180 * Math.atan(b) / Math.PI;
                  h.point[0] < c.point[0] && (ht += 180), x.rotate(-ht * Math.PI / 180);
                }

                x.translate(N, B, 0), o -= _[0] * T[s].an / 200, T[s + 1] && K !== T[s + 1].ind && (o += T[s].an / 2, o += t.tr / 1e3 * t.finalSize);
              } else {
                switch (x.translate(r, i, 0), t.ps && x.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                  case 1:
                    x.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]), 0, 0);
                    break;

                  case 2:
                    x.translate(T[s].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[T[s].line]) / 2, 0, 0);
                }

                x.translate(0, -t.ls), x.translate(G, 0, 0), x.translate(_[0] * T[s].an / 200, _[1] * V / 100, 0), r += T[s].l + t.tr / 1e3 * t.finalSize;
              }

              "html" === E ? tt = x.toCSS() : "svg" === E ? tt = x.to2dCSS() : et = [x.props[0], x.props[1], x.props[2], x.props[3], x.props[4], x.props[5], x.props[6], x.props[7], x.props[8], x.props[9], x.props[10], x.props[11], x.props[12], x.props[13], x.props[14], x.props[15]], $ = z;
            }
            k <= s ? (w = new LetterProps($, W, X, Y, tt, et), this.renderedLetters.push(w), k += 1, this.lettersChangedFlag = !0) : (w = this.renderedLetters[s], this.lettersChangedFlag = w.update($, W, X, Y, tt, et) || this.lettersChangedFlag);
          }
        }
      }, TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
      }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, s, a) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
        var n = !1;
        return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== s && (this.m = s, this._mdf.m = !0, n = !0), !a.length || this.p[0] === a[0] && this.p[1] === a[1] && this.p[4] === a[4] && this.p[5] === a[5] && this.p[12] === a[12] && this.p[13] === a[13] || (this.p = a, this._mdf.p = !0, n = !0), n;
      }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);

        return t;
      }, TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
      }, TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }, TextProperty.prototype.searchKeyframes = function () {
        return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }, TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.getValue = function (t) {
        if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData,
              r = this.keysIndex;
          if (this.lock) this.setCurrentData(this.currentData);else {
            this.lock = !0, this._mdf = !1;
            var i,
                s = this.effectsSequence.length,
                a = t || this.data.d.k[this.keysIndex].s;

            for (i = 0; i < s; i += 1) a = r !== this.keysIndex ? this.effectsSequence[i](a, a.t) : this.effectsSequence[i](this.currentData, a.t);

            e !== a && this.setCurrentData(a), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }
      }, TextProperty.prototype.getKeyframeValue = function () {
        for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) r += 1;

        return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
      }, TextProperty.prototype.buildFinalText = function (t) {
        for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], s = 0, a = t.length; s < a;) e = t.charCodeAt(s), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(s) : e >= 55296 && e <= 56319 && (e = t.charCodeAt(s + 1)) >= 56320 && e <= 57343 ? (i.push(t.substr(s, 2)), ++s) : i.push(t.charAt(s)), s += 1;

        return i;
      }, TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;

        var e,
            r,
            i,
            s,
            a,
            n,
            o,
            h = this.elem.globalData.fontManager,
            l = this.data,
            p = [],
            f = 0,
            m = l.m.g,
            c = 0,
            d = 0,
            u = 0,
            y = [],
            g = 0,
            v = 0,
            b = h.getFontByName(t.f),
            P = 0,
            _ = b.fStyle ? b.fStyle.split(" ") : [],
            S = "normal",
            A = "normal";

        for (r = _.length, e = 0; e < r; e += 1) switch (_[e].toLowerCase()) {
          case "italic":
            A = "italic";
            break;

          case "bold":
            S = "700";
            break;

          case "black":
            S = "900";
            break;

          case "medium":
            S = "500";
            break;

          case "regular":
          case "normal":
            S = "400";
            break;

          case "light":
          case "thin":
            S = "200";
        }

        t.fWeight = b.fWeight || S, t.fStyle = A, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
        var x,
            E = t.tr / 1e3 * t.finalSize;
        if (t.sz) for (var k, T, M = !0, F = t.sz[0], D = t.sz[1]; M;) {
          k = 0, g = 0, r = (T = this.buildFinalText(t.t)).length, E = t.tr / 1e3 * t.finalSize;
          var I = -1;

          for (e = 0; e < r; e += 1) x = T[e].charCodeAt(0), i = !1, " " === T[e] ? I = e : 13 !== x && 3 !== x || (g = 0, i = !0, k += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(T[e], b.fStyle, b.fFamily), P = i ? 0 : o.w * t.finalSize / 100) : P = h.measureText(T[e], t.f, t.finalSize), g + P > F && " " !== T[e] ? (-1 === I ? r += 1 : e = I, k += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, I === e ? 1 : 0, "\r"), I = -1, g = 0) : (g += P, g += E);

          k += b.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && D < k ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, M = !1);
        }
        g = -E, P = 0;
        var C,
            w = 0;

        for (e = 0; e < r; e += 1) if (i = !1, x = (C = t.finalText[e]).charCodeAt(0), " " === C ? s = " " : 13 === x || 3 === x ? (w = 0, y.push(g), v = g > v ? g : v, g = -2 * E, s = "", i = !0, u += 1) : s = t.finalText[e], h.chars ? (o = h.getCharData(C, b.fStyle, h.getFontByName(t.f).fFamily), P = i ? 0 : o.w * t.finalSize / 100) : P = h.measureText(s, t.f, t.finalSize), " " === C ? w += P + E : (g += P + E + w, w = 0), p.push({
          l: P,
          an: P,
          add: c,
          n: i,
          anIndexes: [],
          val: s,
          line: u,
          animatorJustifyOffset: 0
        }), 2 == m) {
          if (c += P, "" === s || " " === s || e === r - 1) {
            for ("" !== s && " " !== s || (c -= P); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = P, d += 1;

            f += 1, c = 0;
          }
        } else if (3 == m) {
          if (c += P, "" === s || e === r - 1) {
            for ("" === s && (c -= P); d <= e;) p[d].an = c, p[d].ind = f, p[d].extra = P, d += 1;

            c = 0, f += 1;
          }
        } else p[f].ind = f, p[f].extra = 0, f += 1;

        if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;else switch (t.boxWidth = v, t.j) {
          case 1:
            t.justifyOffset = -t.boxWidth;
            break;

          case 2:
            t.justifyOffset = -t.boxWidth / 2;
            break;

          default:
            t.justifyOffset = 0;
        }
        t.lineWidths = y;
        var V,
            R,
            L = l.a;
        n = L.length;
        var G,
            N,
            B = [];

        for (a = 0; a < n; a += 1) {
          for ((V = L[a]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), N = 0, G = V.s.b, e = 0; e < r; e += 1) (R = p[e]).anIndexes[a] = N, (1 == G && "" !== R.val || 2 == G && "" !== R.val && " " !== R.val || 3 == G && (R.n || " " == R.val || e == r - 1) || 4 == G && (R.n || e == r - 1)) && (1 === V.s.rn && B.push(N), N += 1);

          l.a[a].s.totalChars = N;
          var z,
              O = -1;
          if (1 === V.s.rn) for (e = 0; e < r; e += 1) O != (R = p[e]).anIndexes[a] && (O = R.anIndexes[a], z = B.splice(Math.floor(Math.random() * B.length), 1)[0]), R.anIndexes[a] = z;
        }

        t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = b.ascent * t.finalSize / 100;
      }, TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
      }, TextProperty.prototype.canResizeFont = function (t) {
        this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.setMinimumFontSize = function (t) {
        this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      };

      var TextSelectorProp = function () {
        var t = Math.max,
            e = Math.min,
            r = Math.floor;

        function i(t, e) {
          this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
            k: 0
          }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
            v: 100
          }, this.o = PropertyFactory.getProp(t, e.o || {
            k: 0
          }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
            k: 0
          }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
            k: 0
          }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue();
        }

        return i.prototype = {
          getMult: function (i) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var s = 0,
                a = 0,
                n = 1,
                o = 1;
            this.ne.v > 0 ? s = this.ne.v / 100 : a = -this.ne.v / 100, this.xe.v > 0 ? n = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
            var h = BezierFactory.getBezierEasing(s, a, n, o).get,
                l = 0,
                p = this.finalS,
                f = this.finalE,
                m = this.data.sh;
            if (2 === m) l = h(l = f === p ? i >= f ? 1 : 0 : t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));else if (3 === m) l = h(l = f === p ? i >= f ? 0 : 1 : 1 - t(0, e(.5 / (f - p) + (i - p) / (f - p), 1)));else if (4 === m) f === p ? l = 0 : (l = t(0, e(.5 / (f - p) + (i - p) / (f - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);else if (5 === m) {
              if (f === p) l = 0;else {
                var c = f - p,
                    d = -c / 2 + (i = e(t(0, i + .5 - p), f - p)),
                    u = c / 2;
                l = Math.sqrt(1 - d * d / (u * u));
              }
              l = h(l);
            } else 6 === m ? (f === p ? l = 0 : (i = e(t(0, i + .5 - p), f - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (f - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(f, 1) - (p - i) : f - i, 1))), l = h(l));
            return l * this.a.v;
          },
          getValue: function (t) {
            this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
            var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                r = this.o.v / e,
                i = this.s.v / e + r,
                s = this.e.v / e + r;

            if (i > s) {
              var a = i;
              i = s, s = a;
            }

            this.finalS = i, this.finalE = s;
          }
        }, extendPrototype([DynamicPropertyContainer], i), {
          getTextSelectorProp: function (t, e, r) {
            return new i(t, e, r);
          }
        };
      }(),
          pool_factory = function (t, e, r, i) {
        var s = 0,
            a = t,
            n = createSizedArray(a);

        function o() {
          return s ? n[s -= 1] : e();
        }

        return {
          newElement: o,
          release: function (t) {
            s === a && (n = pooling.double(n), a *= 2), r && r(t), n[s] = t, s += 1;
          }
        };
      },
          pooling = function () {
        return {
          double: function (t) {
            return t.concat(createSizedArray(t.length));
          }
        };
      }(),
          point_pool = function () {
        return pool_factory(8, function () {
          return createTypedArray("float32", 2);
        });
      }(),
          shape_pool = function () {
        var t = pool_factory(4, function () {
          return new ShapePath();
        }, function (t) {
          var e,
              r = t._length;

          for (e = 0; e < r; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;

          t._length = 0, t.c = !1;
        });
        return t.clone = function (e) {
          var r,
              i = t.newElement(),
              s = void 0 === e._length ? e.v.length : e._length;

          for (i.setLength(s), i.c = e.c, r = 0; r < s; r += 1) i.setTripleAt(e.v[r][0], e.v[r][1], e.o[r][0], e.o[r][1], e.i[r][0], e.i[r][1], r);

          return i;
        }, t;
      }(),
          shapeCollection_pool = function () {
        var t = {
          newShapeCollection: function () {
            var t;
            t = e ? i[e -= 1] : new ShapeCollection();
            return t;
          },
          release: function (t) {
            var s,
                a = t._length;

            for (s = 0; s < a; s += 1) shape_pool.release(t.shapes[s]);

            t._length = 0, e === r && (i = pooling.double(i), r *= 2);
            i[e] = t, e += 1;
          }
        },
            e = 0,
            r = 4,
            i = createSizedArray(r);
        return t;
      }(),
          segments_length_pool = function () {
        return pool_factory(8, function () {
          return {
            lengths: [],
            totalLength: 0
          };
        }, function (t) {
          var e,
              r = t.lengths.length;

          for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);

          t.lengths.length = 0;
        });
      }(),
          bezier_length_pool = function () {
        return pool_factory(8, function () {
          return {
            addedLength: 0,
            percents: createTypedArray("float32", defaultCurveSegments),
            lengths: createTypedArray("float32", defaultCurveSegments)
          };
        });
      }();

      function BaseRenderer() {}

      function SVGRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
        var r = "";

        if (e && e.title) {
          var i = createNS("title"),
              s = createElementID();
          i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s;
        }

        if (e && e.description) {
          var a = createNS("desc"),
              n = createElementID();
          a.setAttribute("id", n), a.textContent = e.description, this.svgElement.appendChild(a), r += " " + n;
        }

        r && this.svgElement.setAttribute("aria-labelledby", r);
        var o = createNS("defs");
        this.svgElement.appendChild(o);
        var h = createNS("g");
        this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          progressiveLoad: e && e.progressiveLoad || !1,
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          viewBoxOnly: e && e.viewBoxOnly || !1,
          viewBoxSize: e && e.viewBoxSize || !1,
          className: e && e.className || "",
          id: e && e.id || "",
          focusable: e && e.focusable,
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "100%",
            height: e && e.filterSize && e.filterSize.height || "100%",
            x: e && e.filterSize && e.filterSize.x || "0%",
            y: e && e.filterSize && e.filterSize.y || "0%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: o,
          renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
      }

      function MaskElement(t, e, r) {
        this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var i,
            s = this.globalData.defs,
            a = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = createSizedArray(a), this.solidPath = "";
        var n,
            o,
            h,
            l,
            p,
            f,
            m,
            c = this.masksProperties,
            d = 0,
            u = [],
            y = createElementID(),
            g = "clipPath",
            v = "clip-path";

        for (i = 0; i < a; i++) if (("a" !== c[i].mode && "n" !== c[i].mode || c[i].inv || 100 !== c[i].o.k || c[i].o.x) && (g = "mask", v = "mask"), "s" != c[i].mode && "i" != c[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), n = createNS("path"), "n" != c[i].mode) {
          var b;

          if (d += 1, n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"), n.setAttribute("clip-rule", "nonzero"), 0 !== c[i].x.k ? (g = "mask", v = "mask", m = PropertyFactory.getProp(this.element, c[i].x, 0, null, this.element), b = createElementID(), (p = createNS("filter")).setAttribute("id", b), (f = createNS("feMorphology")).setAttribute("operator", "erode"), f.setAttribute("in", "SourceGraphic"), f.setAttribute("radius", "0"), p.appendChild(f), s.appendChild(p), n.setAttribute("stroke", "s" === c[i].mode ? "#000000" : "#ffffff")) : (f = null, m = null), this.storedData[i] = {
            elem: n,
            x: m,
            expan: f,
            lastPath: "",
            lastOperator: "",
            filterId: b,
            lastRadius: 0
          }, "i" == c[i].mode) {
            h = u.length;
            var P = createNS("g");

            for (o = 0; o < h; o += 1) P.appendChild(u[o]);

            var _ = createNS("mask");

            _.setAttribute("mask-type", "alpha"), _.setAttribute("id", y + "_" + d), _.appendChild(n), s.appendChild(_), P.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), u.length = 0, u.push(P);
          } else u.push(n);

          c[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
            elem: n,
            lastPath: "",
            op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
            prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
            invRect: l
          }, this.viewData[i].prop.k || this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
        } else this.viewData[i] = {
          op: PropertyFactory.getProp(this.element, c[i].o, 0, .01, this.element),
          prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
          elem: n,
          lastPath: ""
        }, s.appendChild(n);

        for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1) this.maskElement.appendChild(u[i]);

        d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
      }

      function HierarchyElement() {}

      function FrameElement() {}

      function TransformElement() {}

      function RenderableElement() {}

      function RenderableDOMElement() {}

      function ProcessedElement(t, e) {
        this.elem = t, this.pos = e;
      }

      function SVGStyleData(t, e) {
        this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null;
      }

      function SVGShapeData(t, e, r) {
        this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;

        for (var i = 0, s = t.length; i < s;) {
          if (t[i].mProps.dynamicProperties.length) {
            this._isAnimated = !0;
            break;
          }

          i += 1;
        }
      }

      function SVGTransformData(t, e, r) {
        this.transform = {
          mProps: t,
          op: e,
          container: r
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
      }

      function SVGStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
      }

      function SVGFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r;
      }

      function SVGGradientFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r);
      }

      function SVGGradientStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated;
      }

      function ShapeGroupData() {
        this.it = [], this.prevViewData = [], this.gr = createNS("g");
      }

      BaseRenderer.prototype.checkLayers = function (t) {
        var e,
            r,
            i = this.layers.length;

        for (this.completeLayers = !0, e = i - 1; e >= 0; e--) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;

        this.checkPendingElements();
      }, BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);

          case 0:
            return this.createComp(t);

          case 1:
            return this.createSolid(t);

          case 3:
            return this.createNull(t);

          case 4:
            return this.createShape(t);

          case 5:
            return this.createText(t);

          case 13:
            return this.createCamera(t);
        }

        return this.createNull(t);
      }, BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }, BaseRenderer.prototype.buildAllItems = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) this.buildItem(t);

        this.checkPendingElements();
      }, BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
            r,
            i = t.length,
            s = this.layers.length;

        for (e = 0; e < i; e += 1) for (r = 0; r < s;) {
          if (this.layers[r].id == t[e].id) {
            this.layers[r] = t[e];
            break;
          }

          r += 1;
        }
      }, BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }, BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
        for (var i = this.elements, s = this.layers, a = 0, n = s.length; a < n;) s[a].ind == e && (i[a] && !0 !== i[a] ? (r.push(i[a]), i[a].setAsParent(), void 0 !== s[a].parent ? this.buildElementParenting(t, s[a].parent, r) : t.setHierarchy(r)) : (this.buildItem(a), this.addPendingElement(t))), a += 1;
      }, BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) if (t[e].xt) {
          var i = this.createComp(t[e]);
          i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
        }
      }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
        this.globalData.fontManager = new FontManager(), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
          w: t.w,
          h: t.h
        };
      }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this);
      }, SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this);
      }, SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
        var r = createNS("clipPath"),
            i = createNS("rect");
        i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
        var s = createElementID();
        r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length);
      }, SVGRenderer.prototype.destroy = function () {
        this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
        var t,
            e = this.layers ? this.layers.length : 0;

        for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();

        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;

        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var r = this.createItem(this.layers[t]);
          e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)));
        }
      }, SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length;) {
          var t = this.pendingElements.pop();
          if (t.checkParenting(), t.data.tt) for (var e = 0, r = this.elements.length; e < r;) {
            if (this.elements[e] === t) {
              t.setMatte(this.elements[e - 1].layerId);
              break;
            }

            e += 1;
          }
        }
      }, SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
          var e,
              r = this.layers.length;

          for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e--) (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);

          if (this.globalData._mdf) for (e = 0; e < r; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        }
      }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();

        if (r) {
          for (var i, s = 0; s < e;) this.elements[s] && !0 !== this.elements[s] && this.elements[s].getBaseElement() && (i = this.elements[s].getBaseElement()), s += 1;

          i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r);
        }
      }, SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = "none";
      }, SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = "block";
      }, MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }, MaskElement.prototype.renderFrame = function (t) {
        var e,
            r = this.element.finalTransform.mat,
            i = this.masksProperties.length;

        for (e = 0; e < i; e++) if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
          var s = this.storedData[e].expan;
          this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), s.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v));
        }
      }, MaskElement.prototype.getMaskelement = function () {
        return this.maskElement;
      }, MaskElement.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ";
      }, MaskElement.prototype.drawPath = function (t, e, r) {
        var i,
            s,
            a = " M" + e.v[0][0] + "," + e.v[0][1];

        for (s = e._length, i = 1; i < s; i += 1) a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];

        if (e.c && s > 1 && (a += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== a) {
          var n = "";
          r.elem && (e.c && (n = t.inv ? this.solidPath + a : a), r.elem.setAttribute("d", n)), r.lastPath = a;
        }
      }, MaskElement.prototype.destroy = function () {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
      }, HierarchyElement.prototype = {
        initHierarchy: function () {
          this.hierarchy = [], this._isParent = !1, this.checkParenting();
        },
        setHierarchy: function (t) {
          this.hierarchy = t;
        },
        setAsParent: function () {
          this._isParent = !0;
        },
        checkParenting: function () {
          void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
        }
      }, FrameElement.prototype = {
        initFrame: function () {
          this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
        },
        prepareProperties: function (t, e) {
          var r,
              i = this.dynamicProperties.length;

          for (r = 0; r < i; r += 1) (e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
        },
        addDynamicProperty: function (t) {
          -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
        }
      }, TransformElement.prototype = {
        initTransform: function () {
          this.finalTransform = {
            mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
              o: 0
            },
            _matMdf: !1,
            _opMdf: !1,
            mat: new Matrix()
          }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
        },
        renderTransform: function () {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t,
                e = this.finalTransform.mat,
                r = 0,
                i = this.hierarchy.length;
            if (!this.finalTransform._matMdf) for (; r < i;) {
              if (this.hierarchy[r].finalTransform.mProp._mdf) {
                this.finalTransform._matMdf = !0;
                break;
              }

              r += 1;
            }
            if (this.finalTransform._matMdf) for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
          }
        },
        globalToLocal: function (t) {
          var e = [];
          e.push(this.finalTransform);

          for (var r = !0, i = this.comp; r;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;

          var s,
              a,
              n = e.length;

          for (s = 0; s < n; s += 1) a = e[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - a[0], t[1] - a[1], 0];

          return t;
        },
        mHelper: new Matrix()
      }, RenderableElement.prototype = {
        initRenderable: function () {
          this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
        },
        addRenderableComponent: function (t) {
          -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
        },
        removeRenderableComponent: function (t) {
          -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
        },
        prepareRenderableFrame: function (t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function () {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
        },
        checkLayerLimits: function (t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
        },
        renderRenderable: function () {
          var t,
              e = this.renderableComponents.length;

          for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame);
        },
        sourceRectAtTime: function () {
          return {
            top: 0,
            left: 0,
            width: 100,
            height: 100
          };
        },
        getLayerSize: function () {
          return 5 === this.data.ty ? {
            w: this.data.textData.width,
            h: this.data.textData.height
          } : {
            w: this.data.width,
            h: this.data.height
          };
        }
      }, extendPrototype([RenderableElement, createProxyFunction({
        initElement: function (t, e, r) {
          this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
        },
        hide: function () {
          this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0);
        },
        show: function () {
          this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0);
        },
        renderFrame: function () {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        renderInnerContent: function () {},
        prepareFrame: function (t) {
          this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency();
        },
        destroy: function () {
          this.innerElem = null, this.destroyBaseElement();
        }
      })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
        this.d = "", this._mdf = !1;
      }, SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
        this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
          k: 0
        }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
          k: 0
        }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated;
      }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var r = createElementID(),
            i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
        var s,
            a,
            n,
            o = [];

        for (n = 4 * e.g.p, a = 0; a < n; a += 4) s = createNS("stop"), i.appendChild(s), o.push(s);

        t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o;
      }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r,
              i,
              s,
              a = createNS("mask"),
              n = createNS("path");
          a.appendChild(n);
          var o = createElementID(),
              h = createElementID();
          a.setAttribute("id", h);
          var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
          l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
          var p = this.stops;

          for (i = 4 * t.g.p; i < s; i += 2) (r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);

          n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = a, this.ost = p, this.maskId = h, e.msElem = n;
        }
      }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

      var SVGElementsRenderer = function () {
        var t = new Matrix(),
            e = new Matrix();

        function r(t, e, r) {
          (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS());
        }

        function i(r, i, s) {
          var a,
              n,
              o,
              h,
              l,
              p,
              f,
              m,
              c,
              d,
              u,
              y = i.styles.length,
              g = i.lvl;

          for (p = 0; p < y; p += 1) {
            if (h = i.sh._mdf || s, i.styles[p].lvl < g) {
              for (m = e.reset(), d = g - i.styles[p].lvl, u = i.transformers.length - 1; !h && d > 0;) h = i.transformers[u].mProps._mdf || h, d--, u--;

              if (h) for (d = g - i.styles[p].lvl, u = i.transformers.length - 1; d > 0;) c = i.transformers[u].mProps.v.props, m.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), d--, u--;
            } else m = t;

            if (n = (f = i.sh.paths)._length, h) {
              for (o = "", a = 0; a < n; a += 1) (l = f.shapes[a]) && l._length && (o += buildShapeString(l, l._length, l.c, m));

              i.caches[p] = o;
            } else o = i.caches[p];

            i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf;
          }
        }

        function s(t, e, r) {
          var i = e.style;
          (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v);
        }

        function a(t, e, r) {
          n(t, e, r), o(t, e, r);
        }

        function n(t, e, r) {
          var i,
              s,
              a,
              n,
              o,
              h = e.gf,
              l = e.g._hasOpacity,
              p = e.s.v,
              f = e.e.v;

          if (e.o._mdf || r) {
            var m = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
            e.style.pElem.setAttribute(m, e.o.v);
          }

          if (e.s._mdf || r) {
            var c = 1 === t.t ? "x1" : "cx",
                d = "x1" === c ? "y1" : "cy";
            h.setAttribute(c, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(c, p[0]), e.of.setAttribute(d, p[1]));
          }

          if (e.g._cmdf || r) {
            i = e.cst;
            var u = e.g.c;

            for (a = i.length, s = 0; s < a; s += 1) (n = i[s]).setAttribute("offset", u[4 * s] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * s + 1] + "," + u[4 * s + 2] + "," + u[4 * s + 3] + ")");
          }

          if (l && (e.g._omdf || r)) {
            var y = e.g.o;

            for (a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0; s < a; s += 1) n = i[s], e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"), n.setAttribute("stop-opacity", y[2 * s + 1]);
          }

          if (1 === t.t) (e.e._mdf || r) && (h.setAttribute("x2", f[0]), h.setAttribute("y2", f[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
            o || (o = Math.sqrt(Math.pow(p[0] - f[0], 2) + Math.pow(p[1] - f[1], 2)));
            var g = Math.atan2(f[1] - p[1], f[0] - p[0]),
                v = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
                b = Math.cos(g + e.a.v) * v + p[0],
                P = Math.sin(g + e.a.v) * v + p[1];
            h.setAttribute("fx", b), h.setAttribute("fy", P), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", P));
          }
        }

        function o(t, e, r) {
          var i = e.style,
              s = e.d;
          s && (s._mdf || r) && s.dashStr && (i.pElem.setAttribute("stroke-dasharray", s.dashStr), i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
        }

        return {
          createRenderFunction: function (t) {
            t.ty;

            switch (t.ty) {
              case "fl":
                return s;

              case "gf":
                return n;

              case "gs":
                return a;

              case "st":
                return o;

              case "sh":
              case "el":
              case "rc":
              case "sr":
                return i;

              case "tr":
                return r;
            }
          }
        };
      }();

      function ShapeTransformManager() {
        this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
      }

      function BaseElement() {}

      function NullElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
      }

      function SVGBaseElement() {}

      function IShapeElement() {}

      function ITextElement() {}

      function ICompElement() {}

      function IImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        };
      }

      function ISolidElement(t, e, r) {
        this.initElement(t, e, r);
      }

      function SVGCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }

      function SVGTextElement(t, e, r) {
        this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r);
      }

      function SVGShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = [];
      }

      function SVGTintFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");

        if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
          var i,
              s = createNS("feMerge");
          t.appendChild(s), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), s.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), s.appendChild(i);
        }
      }

      function SVGFillFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r;
      }

      function SVGGaussianBlurEffect(t, e) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
        var r = createNS("feGaussianBlur");
        t.appendChild(r), this.feGaussianBlur = r;
      }

      function SVGStrokeEffect(t, e) {
        this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = [];
      }

      function SVGTritoneFilter(t, e) {
        this.filterManager = e;
        var r = createNS("feColorMatrix");
        r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
        var i = createNS("feComponentTransfer");
        i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
        var s = createNS("feFuncR");
        s.setAttribute("type", "table"), i.appendChild(s), this.feFuncR = s;
        var a = createNS("feFuncG");
        a.setAttribute("type", "table"), i.appendChild(a), this.feFuncG = a;
        var n = createNS("feFuncB");
        n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n;
      }

      function SVGProLevelsFilter(t, e) {
        this.filterManager = e;
        var r = this.filterManager.effectElements,
            i = createNS("feComponentTransfer");
        (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i));
      }

      function SVGDropShadowEffect(t, e) {
        var r = e.container.globalData.renderConfig.filterSize;
        t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
        var i = createNS("feGaussianBlur");
        i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
        var s = createNS("feOffset");
        s.setAttribute("dx", "25"), s.setAttribute("dy", "0"), s.setAttribute("in", "drop_shadow_1"), s.setAttribute("result", "drop_shadow_2"), this.feOffset = s, t.appendChild(s);
        var a = createNS("feFlood");
        a.setAttribute("flood-color", "#00ff00"), a.setAttribute("flood-opacity", "1"), a.setAttribute("result", "drop_shadow_3"), this.feFlood = a, t.appendChild(a);
        var n = createNS("feComposite");
        n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
        var o,
            h = createNS("feMerge");
        t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o);
      }

      ShapeTransformManager.prototype = {
        addTransformSequence: function (t) {
          var e,
              r = t.length,
              i = "_";

          for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";

          var s = this.sequences[i];
          return s || (s = {
            transforms: [].concat(t),
            finalTransform: new Matrix(),
            _mdf: !1
          }, this.sequences[i] = s, this.sequenceList.push(s)), s;
        },
        processSequence: function (t, e) {
          for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e;) {
            if (t.transforms[i].transform.mProps._mdf) {
              a = !0;
              break;
            }

            i += 1;
          }

          if (a) for (t.finalTransform.reset(), i = s - 1; i >= 0; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
          t._mdf = a;
        },
        processSequences: function (t) {
          var e,
              r = this.sequenceList.length;

          for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t);
        },
        getNewKey: function () {
          return "_" + this.transform_key_count++;
        }
      }, BaseElement.prototype = {
        checkMasks: function () {
          if (!this.data.hasMask) return !1;

          for (var t = 0, e = this.data.masksProperties.length; t < e;) {
            if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
            t += 1;
          }

          return !1;
        },
        initExpressions: function () {
          this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
          this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface);
        },
        setBlendMode: function () {
          var t = getBlendMode(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
        },
        initBaseData: function (t, e, r) {
          this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
        },
        getType: function () {
          return this.type;
        },
        sourceRectAtTime: function () {}
      }, NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
        return null;
      }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
        initRendererElement: function () {
          this.layerElement = createNS("g");
        },
        createContainerElements: function () {
          this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
          var t,
              e,
              r,
              i = null;

          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s = createNS("mask");
              s.setAttribute("id", this.layerId), s.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), s.appendChild(this.layerElement), i = s, this.globalData.defs.appendChild(s), featureSupport.maskType || 1 != this.data.td || (s.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, s.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"));
            } else if (2 == this.data.td) {
              var a = createNS("mask");
              a.setAttribute("id", this.layerId), a.setAttribute("mask-type", "alpha");
              var n = createNS("g");
              a.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
              var o = createNS("feComponentTransfer");
              o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
              var h = createNS("feFuncA");
              h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
              var l = createNS("rect");
              l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (a.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(a);
            }
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;

          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
            var p = createNS("clipPath"),
                f = createNS("path");
            f.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var m = createElementID();

            if (p.setAttribute("id", m), p.appendChild(f), this.globalData.defs.appendChild(p), this.checkMasks()) {
              var c = createNS("g");
              c.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")"), c.appendChild(this.layerElement), this.transformedElement = c, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + m + ")");
          }

          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
        },
        destroyBaseElement: function () {
          this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
        },
        getBaseElement: function () {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function () {
          this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this);
        },
        setMatte: function (t) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")");
        }
      }, IShapeElement.prototype = {
        addShapeToModifiers: function (t) {
          var e,
              r = this.shapeModifiers.length;

          for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t);
        },
        isShapeInAnimatedModifiers: function (t) {
          for (var e = this.shapeModifiers.length; 0 < e;) if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;

          return !1;
        },
        renderModifiers: function () {
          if (this.shapeModifiers.length) {
            var t,
                e = this.shapes.length;

            for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();

            for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame);
          }
        },
        lcEnum: {
          1: "butt",
          2: "round",
          3: "square"
        },
        ljEnum: {
          1: "miter",
          2: "round",
          3: "bevel"
        },
        searchProcessedElement: function (t) {
          for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
            if (e[r].elem === t) return e[r].pos;
            r += 1;
          }

          return 0;
        },
        addProcessedElement: function (t, e) {
          for (var r = this.processedElements, i = r.length; i;) if (r[i -= 1].elem === t) return void (r[i].pos = e);

          r.push(new ProcessedElement(t, e));
        },
        prepareFrame: function (t) {
          this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
        }
      }, ITextElement.prototype.initElement = function (t, e, r) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
      }, ITextElement.prototype.prepareFrame = function (t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
      }, ITextElement.prototype.createPathShape = function (t, e) {
        var r,
            i,
            s = e.length,
            a = "";

        for (r = 0; r < s; r += 1) i = e[r].ks.k, a += buildShapeString(i, i.i.length, !0, t);

        return a;
      }, ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }, ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }, ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, s) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
            break;

          case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
        }

        e.translate(i, s, 0);
      }, ITextElement.prototype.buildColor = function (t) {
        return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")";
      }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide();
      }, ICompElement.prototype.prepareFrame = function (t) {
        if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
          }
          var r,
              i = this.elements.length;

          for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1) (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
        }
      }, ICompElement.prototype.renderInnerContent = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
      }, ICompElement.prototype.setElements = function (t) {
        this.elements = t;
      }, ICompElement.prototype.getElements = function () {
        return this.elements;
      }, ICompElement.prototype.destroyElements = function () {
        var t,
            e = this.layers.length;

        for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
      }, ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
      }, IImageElement.prototype.sourceRectAtTime = function () {
        return this.sourceRect;
      }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
      }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
      }, SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, r = t.length, i = [], s = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(s), s = "") : s += t[e], e += 1;

        return i.push(s), i;
      }, SVGTextElement.prototype.buildNewText = function () {
        var t,
            e,
            r = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass) this.layerElement.setAttribute("class", i.fClass);else {
          this.layerElement.setAttribute("font-family", i.fFamily);
          var s = r.fWeight,
              a = r.fStyle;
          this.layerElement.setAttribute("font-style", a), this.layerElement.setAttribute("font-weight", s);
        }
        this.layerElement.setAttribute("aria-label", r.t);
        var n,
            o = r.l || [],
            h = !!this.globalData.fontManager.chars;
        e = o.length;
        var l,
            p = this.mHelper,
            f = "",
            m = this.data.singleShape,
            c = 0,
            d = 0,
            u = !0,
            y = r.tr / 1e3 * r.finalSize;

        if (!m || h || r.sz) {
          var g,
              v,
              b = this.textSpans.length;

          for (t = 0; t < e; t += 1) h && m && 0 !== t || (n = b > t ? this.textSpans[t] : createNS(h ? "path" : "text"), b <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), m && (o[t].n && (c = -y, d += r.yOffset, d += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, c, d), c += o[t].l || 0, c += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], m ? f += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (m && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));

          m && n && n.setAttribute("d", f);
        } else {
          var P = this.textContainer,
              _ = "start";

          switch (r.j) {
            case 1:
              _ = "end";
              break;

            case 2:
              _ = "middle";
          }

          P.setAttribute("text-anchor", _), P.setAttribute("letter-spacing", y);
          var S = this.buildTextContents(r.finalText);

          for (e = S.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1) (n = this.textSpans[t] || createNS("tspan")).textContent = S[t], n.setAttribute("x", 0), n.setAttribute("y", d), n.style.display = "inherit", P.appendChild(n), this.textSpans[t] = n, d += r.finalLineHeight;

          this.layerElement.appendChild(P);
        }

        for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;

        this._sizeChanged = !0;
      }, SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = {
            top: e.y,
            left: e.x,
            width: e.width,
            height: e.height
          };
        }

        return this.bbox;
      }, SVGTextElement.prototype.renderInnerContent = function () {
        if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          var t, e;
          this._sizeChanged = !0;
          var r,
              i,
              s = this.textAnimator.renderedLetters,
              a = this.textProperty.currentData.l;

          for (e = a.length, t = 0; t < e; t += 1) a[t].n || (r = s[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc));
        }
      }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }, SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t,
            e,
            r,
            i,
            s = this.shapes.length,
            a = this.stylesList.length,
            n = [],
            o = !1;

        for (r = 0; r < a; r += 1) {
          for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < s; t += 1) -1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);

          n.length > 1 && o && this.setShapesAsAnimated(n);
        }
      }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e,
            r = t.length;

        for (e = 0; e < r; e += 1) t[e].setAsAnimated();
      }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var r,
            i = new SVGStyleData(t, e),
            s = i.pElem;
        if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);else if ("gf" === t.ty || "gs" === t.ty) {
          r = new ("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"));
        }
        return "st" !== t.ty && "gs" !== t.ty || (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), s.setAttribute("fill-opacity", "0"), 1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r;
      }, SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData();
        return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
      }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this),
            i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i;
      }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
        var i = 4;
        "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
        var s = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
        return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(t, s), s;
      }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i;) {
          if (this.animatedContents[r].element === e) return;
          r += 1;
        }

        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(t),
          element: e,
          data: t
        });
      }, SVGShapeElement.prototype.setElementStyles = function (t) {
        var e,
            r = t.styles,
            i = this.stylesList.length;

        for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e]);
      }, SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
            e = this.itemsData.length;

        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];

        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();

        this.renderModifiers();
      }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
        var o,
            h,
            l,
            p,
            f,
            m,
            c = [].concat(a),
            d = t.length - 1,
            u = [],
            y = [];

        for (o = d; o >= 0; o -= 1) {
          if ((m = this.searchProcessedElement(t[o])) ? e[o] = r[m - 1] : t[o]._render = n, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) m ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && i.appendChild(e[o].style.pElem), u.push(e[o].style);else if ("gr" == t[o].ty) {
            if (m) for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];else e[o] = this.createGroupElement(t[o]);
            this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, c, n), t[o]._render && i.appendChild(e[o].gr);
          } else "tr" == t[o].ty ? (m || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, c.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (m || (e[o] = this.createShapeElement(t[o], c, s)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (m ? (f = e[o]).closed = !1 : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = f, this.shapeModifiers.push(f)), y.push(f)) : "rp" == t[o].ty && (m ? (f = e[o]).closed = !0 : (f = ShapeModifiers.getModifier(t[o].ty), e[o] = f, f.init(this, t, o, e), this.shapeModifiers.push(f), n = !1), y.push(f));
          this.addProcessedElement(t[o], o + 1);
        }

        for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;

        for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0;
      }, SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
            e = this.stylesList.length;

        for (t = 0; t < e; t += 1) this.stylesList[t].reset();

        for (this.renderShape(), t = 0; t < e; t += 1) (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
      }, SVGShapeElement.prototype.renderShape = function () {
        var t,
            e,
            r = this.animatedContents.length;

        for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame);
      }, SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
      }, SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0");
        }
      }, SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
              r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
        }
      }, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = .3 * this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = 3 == r ? 0 : e,
              s = 2 == r ? 0 : e;
          this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
          var a = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      }, SVGStrokeEffect.prototype.initialize = function () {
        var t,
            e,
            r,
            i,
            s = this.elem.layerElement.children || this.elem.layerElement.childNodes;

        for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
          p: t,
          m: r
        });

        if (3 === this.filterManager.effectElements[10].p.v) {
          var a = createNS("mask"),
              n = createElementID();
          a.setAttribute("id", n), a.setAttribute("mask-type", "alpha"), a.appendChild(e), this.elem.globalData.defs.appendChild(a);
          var o = createNS("g");

          for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); s[0];) o.appendChild(s[0]);

          this.elem.layerElement.appendChild(o), this.masker = a, e.setAttribute("stroke", "#fff");
        } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
          if (2 === this.filterManager.effectElements[10].p.v) for (s = this.elem.layerElement.children || this.elem.layerElement.childNodes; s.length;) this.elem.layerElement.removeChild(s[0]);
          this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff");
        }

        this.initialized = !0, this.pathMasker = e;
      }, SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
            r,
            i,
            s = this.paths.length;

        for (e = 0; e < s; e += 1) if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
          var a;

          if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
            var n = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                h = i.getTotalLength();
            a = "0 0 0 " + h * n + " ";
            var l,
                p = h * (o - n),
                f = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                m = Math.floor(p / f);

            for (l = 0; l < m; l += 1) a += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";

            a += "0 " + 10 * h + " 0 0";
          } else a = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;

          i.setAttribute("stroke-dasharray", a);
        }

        if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
          var c = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * c[0]) + "," + bm_floor(255 * c[1]) + "," + bm_floor(255 * c[2]) + ")");
        }
      }, SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v,
              s = i[0] + " " + r[0] + " " + e[0],
              a = i[1] + " " + r[1] + " " + e[1],
              n = i[2] + " " + r[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", a), this.feFuncB.setAttribute("tableValues", n);
        }
      }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var r = createNS(t);
        return r.setAttribute("type", "table"), e.appendChild(r), r;
      }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
        for (var a, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
          length: 256
        }), f = 0, m = s - i, c = e - t; o <= 256;) n = (a = o / 256) <= h ? c < 0 ? s : i : a >= l ? c < 0 ? i : s : i + m * Math.pow((a - t) / c, 1 / r), p[f++] = n, o += 256 / 255;

        return p.join(" ");
      }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
              r = this.filterManager.effectElements;
          this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e));
        }
      }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])));
          }

          if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
            var r = this.filterManager.effectElements[3].p.v,
                i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                s = r * Math.cos(i),
                a = r * Math.sin(i);
            this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", a);
          }
        }
      };
      var _svgMatteSymbols = [];

      function SVGMatte3Effect(t, e, r) {
        this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
      }

      function SVGEffects(t) {
        var e,
            r,
            i = t.data.ef ? t.data.ef.length : 0,
            s = createElementID(),
            a = filtersFactory.createFilter(s),
            n = 0;

        for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(a, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(a, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(a, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(a, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(a, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(a, t.effectsManager.effectElements[e])), r && this.filters.push(r);

        n && (t.globalData.defs.appendChild(a), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this);
      }

      SVGMatte3Effect.prototype.findSymbol = function (t) {
        for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
          if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
          e += 1;
        }

        return null;
      }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var r = t.layerElement.parentNode;

        if (r) {
          for (var i, s = r.children, a = 0, n = s.length; a < n && s[a] !== t.layerElement;) a += 1;

          a <= n - 2 && (i = s[a + 1]);
          var o = createNS("use");
          o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o);
        }
      }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var r = createElementID(),
              i = createNS("mask");
          i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(i);
          var a = createNS("symbol");
          a.setAttribute("id", r), this.replaceInParent(e, r), a.appendChild(e.layerElement), s.appendChild(a);
          var n = createNS("use");
          n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show();
        }

        t.setMatte(e.layerId);
      }, SVGMatte3Effect.prototype.initialize = function () {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;

        this.initialized = !0;
      }, SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }, SVGEffects.prototype.renderFrame = function (t) {
        var e,
            r = this.filters.length;

        for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t);
      };

      var animationManager = function () {
        var t = {},
            e = [],
            r = 0,
            i = 0,
            s = 0,
            a = !0,
            n = !1;

        function o(t) {
          for (var r = 0, s = t.target; r < i;) e[r].animation === s && (e.splice(r, 1), r -= 1, i -= 1, s.isPaused || p()), r += 1;
        }

        function h(t, r) {
          if (!t) return null;

          for (var s = 0; s < i;) {
            if (e[s].elem == t && null !== e[s].elem) return e[s].animation;
            s += 1;
          }

          var a = new AnimationItem();
          return f(a, t), a.setData(t, r), a;
        }

        function l() {
          s += 1, d();
        }

        function p() {
          s -= 1;
        }

        function f(t, r) {
          t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
            elem: r,
            animation: t
          }), i += 1;
        }

        function m(t) {
          var o,
              h = t - r;

          for (o = 0; o < i; o += 1) e[o].animation.advanceTime(h);

          r = t, s && !n ? window.requestAnimationFrame(m) : a = !0;
        }

        function c(t) {
          r = t, window.requestAnimationFrame(m);
        }

        function d() {
          !n && s && a && (window.requestAnimationFrame(c), a = !1);
        }

        return t.registerAnimation = h, t.loadAnimation = function (t) {
          var e = new AnimationItem();
          return f(e, null), e.setParams(t), e;
        }, t.setSpeed = function (t, r) {
          var s;

          for (s = 0; s < i; s += 1) e[s].animation.setSpeed(t, r);
        }, t.setDirection = function (t, r) {
          var s;

          for (s = 0; s < i; s += 1) e[s].animation.setDirection(t, r);
        }, t.play = function (t) {
          var r;

          for (r = 0; r < i; r += 1) e[r].animation.play(t);
        }, t.pause = function (t) {
          var r;

          for (r = 0; r < i; r += 1) e[r].animation.pause(t);
        }, t.stop = function (t) {
          var r;

          for (r = 0; r < i; r += 1) e[r].animation.stop(t);
        }, t.togglePause = function (t) {
          var r;

          for (r = 0; r < i; r += 1) e[r].animation.togglePause(t);
        }, t.searchAnimations = function (t, e, r) {
          var i,
              s = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
              a = s.length;

          for (i = 0; i < a; i += 1) r && s[i].setAttribute("data-bm-type", r), h(s[i], t);

          if (e && 0 === a) {
            r || (r = "svg");
            var n = document.getElementsByTagName("body")[0];
            n.innerHTML = "";
            var o = createTag("div");
            o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), h(o, t);
          }
        }, t.resize = function () {
          var t;

          for (t = 0; t < i; t += 1) e[t].animation.resize();
        }, t.goToAndStop = function (t, r, s) {
          var a;

          for (a = 0; a < i; a += 1) e[a].animation.goToAndStop(t, r, s);
        }, t.destroy = function (t) {
          var r;

          for (r = i - 1; r >= 0; r -= 1) e[r].animation.destroy(t);
        }, t.freeze = function () {
          n = !0;
        }, t.unfreeze = function () {
          n = !1, d();
        }, t.getRegisteredAnimations = function () {
          var t,
              r = e.length,
              i = [];

          for (t = 0; t < r; t += 1) i.push(e[t].animation);

          return i;
        }, t;
      }(),
          AnimationItem = function () {
        this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader();
      };

      extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";

        switch (e) {
          case "canvas":
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;

          case "svg":
            this.renderer = new SVGRenderer(this, t.rendererSettings);
            break;

          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }

        this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this))), this.initialSegment = t.initialSegment;
      }, AnimationItem.prototype.setData = function (t, e) {
        var r = {
          wrapper: t,
          animationData: e ? "object" == typeof e ? e : JSON.parse(e) : null
        },
            i = t.attributes;
        r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
        var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
        "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
        var a = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
        r.autoplay = "false" !== a, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r);
      }, AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
        var e,
            r,
            i = this.animationData.layers,
            s = i.length,
            a = t.layers,
            n = a.length;

        for (r = 0; r < n; r += 1) for (e = 0; e < s;) {
          if (i[e].id == a[r].id) {
            i[e] = a[r];
            break;
          }

          e += 1;
        }

        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets) for (s = t.assets.length, e = 0; e < s; e += 1) this.animationData.assets.push(t.assets[e]);
        this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment();
      }, AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void (this.timeCompleted = this.totalFrames);
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
          this.trigger("data_failed");
        }.bind(this));
      }, AnimationItem.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }, AnimationItem.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded();
      }, AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }, AnimationItem.prototype.configAnimation = function (t) {
        if (this.renderer) try {
          this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded();
        } catch (e) {
          this.triggerConfigError(e);
        }
      }, AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }, AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
          this.trigger("DOMLoaded");
        }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play());
      }, AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }, AnimationItem.prototype.setSubframe = function (t) {
        this.subframeEnabled = !!t;
      }, AnimationItem.prototype.gotoFrame = function () {
        this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame();
      }, AnimationItem.prototype.renderFrame = function () {
        if (!1 !== this.isLoaded) try {
          this.renderer.renderFrame(this.currentFrame + this.firstFrame);
        } catch (t) {
          this.triggerRenderFrameError(t);
        }
      }, AnimationItem.prototype.play = function (t) {
        t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")));
      }, AnimationItem.prototype.pause = function (t) {
        t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"));
      }, AnimationItem.prototype.togglePause = function (t) {
        t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause());
      }, AnimationItem.prototype.stop = function (t) {
        t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
      }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
        r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause());
      }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
        this.goToAndStop(t, e, r), this.play();
      }, AnimationItem.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
          var e = this.currentRawFrame + t * this.frameModifier,
              r = !1;
          e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
        }
      }, AnimationItem.prototype.adjustSegment = function (t, e) {
        this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart");
      }, AnimationItem.prototype.setSegment = function (t, e) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0);
      }, AnimationItem.prototype.playSegments = function (t, e) {
        if (e && (this.segments.length = 0), "object" == typeof t[0]) {
          var r,
              i = t.length;

          for (r = 0; r < i; r += 1) this.segments.push(t[r]);
        } else this.segments.push(t);

        this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }, AnimationItem.prototype.resetSegments = function (t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
      }, AnimationItem.prototype.checkSegments = function (t) {
        return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
      }, AnimationItem.prototype.destroy = function (t) {
        t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null);
      }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        this.currentRawFrame = t, this.gotoFrame();
      }, AnimationItem.prototype.setSpeed = function (t) {
        this.playSpeed = t, this.updaFrameModifier();
      }, AnimationItem.prototype.setDirection = function (t) {
        this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
      }, AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
      }, AnimationItem.prototype.getPath = function () {
        return this.path;
      }, AnimationItem.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;else if (this.assetsPath) {
          var r = t.p;
          -1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r;
        } else e = this.path, e += t.u ? t.u : "", e += t.p;
        return e;
      }, AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, r = this.assets.length; e < r;) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }, AnimationItem.prototype.hide = function () {
        this.renderer.hide();
      }, AnimationItem.prototype.show = function () {
        this.renderer.show();
      }, AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }, AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t]) switch (t) {
          case "enterFrame":
            this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
            break;

          case "loopComplete":
            this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
            break;

          case "complete":
            this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
            break;

          case "segmentStart":
            this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
            break;

          case "destroy":
            this.triggerEvent(t, new BMDestroyEvent(t, this));
            break;

          default:
            this.triggerEvent(t);
        }
        "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
      }, AnimationItem.prototype.triggerRenderFrameError = function (t) {
        var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      }, AnimationItem.prototype.triggerConfigError = function (t) {
        var e = new BMConfigErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      };

      var Expressions = function () {
        var t = {};
        return t.initExpressions = function (t) {
          var e = 0,
              r = [];
          t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
            e += 1;
          }, t.renderer.globalData.popExpression = function () {
            0 == (e -= 1) && function () {
              var t,
                  e = r.length;

              for (t = 0; t < e; t += 1) r[t].release();

              r.length = 0;
            }();
          }, t.renderer.globalData.registerExpressionProperty = function (t) {
            -1 === r.indexOf(t) && r.push(t);
          };
        }, t;
      }();

      expressionsPlugin = Expressions;

      var ExpressionManager = function () {
        var ob = {},
            Math = BMMath,
            window = null,
            document = null;

        function $bm_isInstanceOfArray(t) {
          return t.constructor === Array || t.constructor === Float32Array;
        }

        function isNumerable(t, e) {
          return "number" === t || "boolean" === t || "string" === t || e instanceof Number;
        }

        function $bm_neg(t) {
          var e = typeof t;
          if ("number" === e || "boolean" === e || t instanceof Number) return -t;

          if ($bm_isInstanceOfArray(t)) {
            var r,
                i = t.length,
                s = [];

            for (r = 0; r < i; r += 1) s[r] = -t[r];

            return s;
          }

          return t.propType ? t.v : void 0;
        }

        var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
            easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
            easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

        function sum(t, e) {
          var r = typeof t,
              i = typeof e;
          if ("string" === r || "string" === i) return t + e;
          if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;

          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] + e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;

            return o;
          }

          return 0;
        }

        var add = sum;

        function sub(t, e) {
          var r = typeof t,
              i = typeof e;
          if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;

          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, a = t.length, n = e.length, o = []; s < a || s < n;) ("number" == typeof t[s] || t[s] instanceof Number) && ("number" == typeof e[s] || e[s] instanceof Number) ? o[s] = t[s] - e[s] : o[s] = void 0 === e[s] ? t[s] : t[s] || e[s], s += 1;

            return o;
          }

          return 0;
        }

        function mul(t, e) {
          var r,
              i,
              s,
              a = typeof t,
              n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t * e;

          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] * e;

            return r;
          }

          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t * e[i];

            return r;
          }

          return 0;
        }

        function div(t, e) {
          var r,
              i,
              s,
              a = typeof t,
              n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t / e;

          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (s = t.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t[i] / e;

            return r;
          }

          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (s = e.length, r = createTypedArray("float32", s), i = 0; i < s; i += 1) r[i] = t / e[i];

            return r;
          }

          return 0;
        }

        function mod(t, e) {
          return "string" == typeof t && (t = parseInt(t)), "string" == typeof e && (e = parseInt(e)), t % e;
        }

        var $bm_sum = sum,
            $bm_sub = sub,
            $bm_mul = mul,
            $bm_div = div,
            $bm_mod = mod;

        function clamp(t, e, r) {
          if (e > r) {
            var i = r;
            r = e, e = i;
          }

          return Math.min(Math.max(t, e), r);
        }

        function radiansToDegrees(t) {
          return t / degToRads;
        }

        var radians_to_degrees = radiansToDegrees;

        function degreesToRadians(t) {
          return t * degToRads;
        }

        var degrees_to_radians = radiansToDegrees,
            helperLengthArray = [0, 0, 0, 0, 0, 0];

        function length(t, e) {
          if ("number" == typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
          e || (e = helperLengthArray);
          var r,
              i = Math.min(t.length, e.length),
              s = 0;

          for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);

          return Math.sqrt(s);
        }

        function normalize(t) {
          return div(t, length(t));
        }

        function rgbToHsl(t) {
          var e,
              r,
              i = t[0],
              s = t[1],
              a = t[2],
              n = Math.max(i, s, a),
              o = Math.min(i, s, a),
              h = (n + o) / 2;
          if (n == o) e = r = 0;else {
            var l = n - o;

            switch (r = h > .5 ? l / (2 - n - o) : l / (n + o), n) {
              case i:
                e = (s - a) / l + (s < a ? 6 : 0);
                break;

              case s:
                e = (a - i) / l + 2;
                break;

              case a:
                e = (i - s) / l + 4;
            }

            e /= 6;
          }
          return [e, r, h, t[3]];
        }

        function hue2rgb(t, e, r) {
          return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
        }

        function hslToRgb(t) {
          var e,
              r,
              i,
              s = t[0],
              a = t[1],
              n = t[2];
          if (0 === a) e = r = i = n;else {
            var o = n < .5 ? n * (1 + a) : n + a - n * a,
                h = 2 * n - o;
            e = hue2rgb(h, o, s + 1 / 3), r = hue2rgb(h, o, s), i = hue2rgb(h, o, s - 1 / 3);
          }
          return [e, r, i, t[3]];
        }

        function linear(t, e, r, i, s) {
          if (void 0 !== i && void 0 !== s || (i = e, s = r, e = 0, r = 1), r < e) {
            var a = r;
            r = e, e = a;
          }

          if (t <= e) return i;
          if (t >= r) return s;
          var n = r === e ? 0 : (t - e) / (r - e);
          if (!i.length) return i + (s - i) * n;
          var o,
              h = i.length,
              l = createTypedArray("float32", h);

          for (o = 0; o < h; o += 1) l[o] = i[o] + (s[o] - i[o]) * n;

          return l;
        }

        function random(t, e) {
          if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
            var r,
                i = e.length;
            t || (t = createTypedArray("float32", i));
            var s = createTypedArray("float32", i),
                a = BMMath.random();

            for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);

            return s;
          }

          return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
        }

        function createPath(t, e, r, i) {
          var s,
              a = t.length,
              n = shape_pool.newElement();
          n.setPathData(!!i, a);
          var o,
              h,
              l = [0, 0];

          for (s = 0; s < a; s += 1) o = e && e[s] ? e[s] : l, h = r && r[s] ? r[s] : l, n.setTripleAt(t[s][0], t[s][1], h[0] + t[s][0], h[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);

          return n;
        }

        function initiateExpression(elem, data, property) {
          var val = data.x,
              needsVelocity = /velocity(?![\w\d])/.test(val),
              _needsRandom = -1 !== val.indexOf("random"),
              elemType = elem.data.ty,
              transform,
              $bm_transform,
              content,
              effect,
              thisProperty = property;

          thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
            get: function () {
              return thisProperty.v;
            }
          }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
              outPoint = elem.data.op / elem.comp.globalData.frameRate,
              width = elem.data.sw ? elem.data.sw : 0,
              height = elem.data.sh ? elem.data.sh : 0,
              name = elem.data.nm,
              loopIn,
              loop_in,
              loopOut,
              loop_out,
              smooth,
              toWorld,
              fromWorld,
              fromComp,
              toComp,
              fromCompToSurface,
              position,
              rotation,
              anchorPoint,
              scale,
              thisLayer,
              thisComp,
              mask,
              valueAtTime,
              velocityAtTime,
              __expression_functions = [],
              scoped_bm_rt;

          if (data.xf) {
            var i,
                len = data.xf.length;

            for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())");
          }

          var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
              numKeys = property.kf ? data.k.length : 0,
              active = !this.data || !0 !== this.data.hd,
              wiggle = function (t, e) {
            var r,
                i,
                s = this.pv.length ? this.pv.length : 1,
                a = createTypedArray("float32", s);
            var n = Math.floor(5 * time);

            for (r = 0, i = 0; r < n;) {
              for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();

              r += 1;
            }

            var o = 5 * time,
                h = o - Math.floor(o),
                l = createTypedArray("float32", s);

            if (s > 1) {
              for (i = 0; i < s; i += 1) l[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;

              return l;
            }

            return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
          }.bind(this);

          function loopInDuration(t, e) {
            return loopIn(t, e, !0);
          }

          function loopOutDuration(t, e) {
            return loopOut(t, e, !0);
          }

          thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
              time,
              velocity,
              value,
              text,
              textIndex,
              textTotal,
              selectorValue;

          function lookAt(t, e) {
            var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
            return [-Math.atan2(r[1], r[2]) / degToRads, i, 0];
          }

          function easeOut(t, e, r, i, s) {
            return applyEase(easeOutBez, t, e, r, i, s);
          }

          function easeIn(t, e, r, i, s) {
            return applyEase(easeInBez, t, e, r, i, s);
          }

          function ease(t, e, r, i, s) {
            return applyEase(easeInOutBez, t, e, r, i, s);
          }

          function applyEase(t, e, r, i, s, a) {
            void 0 === s ? (s = r, a = i) : e = (e - r) / (i - r);
            var n = t(e = e > 1 ? 1 : e < 0 ? 0 : e);

            if ($bm_isInstanceOfArray(s)) {
              var o,
                  h = s.length,
                  l = createTypedArray("float32", h);

              for (o = 0; o < h; o += 1) l[o] = (a[o] - s[o]) * n + s[o];

              return l;
            }

            return (a - s) * n + s;
          }

          function nearestKey(t) {
            var e,
                r,
                i,
                s = data.k.length;
            if (data.k.length && "number" != typeof data.k[0]) {
              if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;else {
                for (e = 0; e < s - 1; e += 1) {
                  if (t === data.k[e].t) {
                    r = e + 1, i = data.k[e].t;
                    break;
                  }

                  if (t > data.k[e].t && t < data.k[e + 1].t) {
                    t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, i = data.k[e + 1].t) : (r = e + 1, i = data.k[e].t);
                    break;
                  }
                }

                -1 === r && (r = e + 1, i = data.k[e].t);
              }
            } else r = 0, i = 0;
            var a = {};
            return a.index = r, a.time = i / elem.comp.globalData.frameRate, a;
          }

          function key(t) {
            var e, r, i;
            if (!data.k.length || "number" == typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
            t -= 1, e = {
              time: data.k[t].t / elem.comp.globalData.frameRate,
              value: []
            };
            var s = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e;

            for (i = s.length, r = 0; r < i; r += 1) e[r] = s[r], e.value[r] = s[r];

            return e;
          }

          function framesToTime(t, e) {
            return e || (e = elem.comp.globalData.frameRate), t / e;
          }

          function timeToFrames(t, e) {
            return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
          }

          function seedRandom(t) {
            BMMath.seedrandom(randSeed + t);
          }

          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }

          function substring(t, e) {
            return "string" == typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : "";
          }

          function substr(t, e) {
            return "string" == typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : "";
          }

          function posterizeTime(t) {
            time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time);
          }

          var index = elem.data.ind,
              hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
              parent,
              randSeed = Math.floor(1e6 * Math.random()),
              globalData = elem.globalData;

          function executeExpression(t) {
            return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt);
          }

          return executeExpression;
        }

        return ob.initiateExpression = initiateExpression, ob;
      }(),
          expressionHelpers = function () {
        return {
          searchExpressions: function (t, e, r) {
            e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
          },
          getSpeedAtTime: function (t) {
            var e = this.getValueAtTime(t),
                r = this.getValueAtTime(t + -.01),
                i = 0;

            if (e.length) {
              var s;

              for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);

              i = 100 * Math.sqrt(i);
            } else i = 0;

            return i;
          },
          getVelocityAtTime: function (t) {
            if (void 0 !== this.vel) return this.vel;
            var e,
                r,
                i = this.getValueAtTime(t),
                s = this.getValueAtTime(t + -.001);
            if (i.length) for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (s[r] - i[r]) / -.001;else e = (s - i) / -.001;
            return e;
          },
          getValueAtTime: function (t) {
            return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value;
          },
          getStaticValueAtTime: function () {
            return this.pv;
          },
          setGroupProperty: function (t) {
            this.propertyGroup = t;
          }
        };
      }();

      !function () {
        function t(t, e, r) {
          if (!this.k || !this.keyframes) return this.pv;
          t = t ? t.toLowerCase() : "";
          var i,
              s,
              a,
              n,
              o,
              h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[l.length - 1].t;
          if (h <= p) return this.pv;

          if (r ? s = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (s = l[l.length - 1 - e].t)), "pingpong" === t) {
            if (Math.floor((h - s) / i) % 2 != 0) return this.getValueAtTime((i - (h - s) % i + s) / this.comp.globalData.frameRate, 0);
          } else {
            if ("offset" === t) {
              var f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                  m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0),
                  d = Math.floor((h - s) / i);

              if (this.pv.length) {
                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = (m[a] - f[a]) * d + c[a];

                return o;
              }

              return (m - f) * d + c;
            }

            if ("continue" === t) {
              var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);

              if (this.pv.length) {
                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;

                return o;
              }

              return u + (h - p) / .001 * (u - y);
            }
          }

          return this.getValueAtTime(((h - s) % i + s) / this.comp.globalData.frameRate, 0);
        }

        function e(t, e, r) {
          if (!this.k) return this.pv;
          t = t ? t.toLowerCase() : "";
          var i,
              s,
              a,
              n,
              o,
              h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[0].t;
          if (h >= p) return this.pv;

          if (r ? s = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (s = l[e].t) - p), "pingpong" === t) {
            if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0);
          } else {
            if ("offset" === t) {
              var f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                  d = Math.floor((p - h) / i) + 1;

              if (this.pv.length) {
                for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1) o[a] = c[a] - (m[a] - f[a]) * d;

                return o;
              }

              return c - (m - f) * d;
            }

            if ("continue" === t) {
              var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);

              if (this.pv.length) {
                for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1) o[a] = u[a] + (u[a] - y[a]) * (p - h) / .001;

                return o;
              }

              return u + (u - y) * (p - h) / .001;
            }
          }

          return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0);
        }

        function r(t, e) {
          if (!this.k) return this.pv;
          if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
          var r,
              i,
              s = this.comp.renderedFrame / this.comp.globalData.frameRate,
              a = s - t,
              n = e > 1 ? (s + t - a) / (e - 1) : 1,
              o = 0,
              h = 0;

          for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
            if (i = this.getValueAtTime(a + o * n), this.pv.length) for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];else r += i;
            o += 1;
          }

          if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) r[h] /= e;else r /= e;
          return r;
        }

        var i = TransformPropertyFactory.getTransformProperty;

        TransformPropertyFactory.getTransformProperty = function (t, e, r) {
          var s = i(t, e, r);
          return s.dynamicProperties.length ? s.getValueAtTime = function (t) {
            console.warn("Transform at time not supported");
          }.bind(s) : s.getValueAtTime = function (t) {}.bind(s), s.setGroupProperty = expressionHelpers.setGroupProperty, s;
        };

        var s = PropertyFactory.getProp;

        PropertyFactory.getProp = function (i, a, n, o, h) {
          var l = s(i, a, n, o, h);
          l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === a.a ? a.k.length : 0, l.propertyIndex = a.ix;
          var p = 0;
          return 0 !== n && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)), l._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: p
          }, expressionHelpers.searchExpressions(i, a, l), l.k && h.addDynamicProperty(l), l;
        };

        var a = ShapePropertyFactory.getConstructorFunction(),
            n = ShapePropertyFactory.getKeyframedConstructorFunction();

        function o() {}

        o.prototype = {
          vertices: function (t, e) {
            this.k && this.getValue();
            var r = this.v;
            void 0 !== e && (r = this.getValueAtTime(e, 0));
            var i,
                s = r._length,
                a = r[t],
                n = r.v,
                o = createSizedArray(s);

            for (i = 0; i < s; i += 1) o[i] = "i" === t || "o" === t ? [a[i][0] - n[i][0], a[i][1] - n[i][1]] : [a[i][0], a[i][1]];

            return o;
          },
          points: function (t) {
            return this.vertices("v", t);
          },
          inTangents: function (t) {
            return this.vertices("i", t);
          },
          outTangents: function (t) {
            return this.vertices("o", t);
          },
          isClosed: function () {
            return this.v.c;
          },
          pointOnPath: function (t, e) {
            var r = this.v;
            void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));

            for (var i, s = this._segmentsLength, a = s.lengths, n = s.totalLength * t, o = 0, h = a.length, l = 0; o < h;) {
              if (l + a[o].addedLength > n) {
                var p = o,
                    f = r.c && o === h - 1 ? 0 : o + 1,
                    m = (n - l) / a[o].addedLength;
                i = bez.getPointInSegment(r.v[p], r.v[f], r.o[p], r.i[f], m, a[o]);
                break;
              }

              l += a[o].addedLength, o += 1;
            }

            return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i;
          },
          vectorOnPath: function (t, e, r) {
            t = 1 == t ? this.v.c ? 0 : .999 : t;
            var i = this.pointOnPath(t, e),
                s = this.pointOnPath(t + .001, e),
                a = s[0] - i[0],
                n = s[1] - i[1],
                o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
            return 0 === o ? [0, 0] : "tangent" === r ? [a / o, n / o] : [-n / o, a / o];
          },
          tangentOnPath: function (t, e) {
            return this.vectorOnPath(t, e, "tangent");
          },
          normalOnPath: function (t, e) {
            return this.vectorOnPath(t, e, "normal");
          },
          setGroupProperty: expressionHelpers.setGroupProperty,
          getValueAtTime: expressionHelpers.getStaticValueAtTime
        }, extendPrototype([o], a), extendPrototype([o], n), n.prototype.getValueAtTime = function (t) {
          return this._cachingAtTime || (this._cachingAtTime = {
            shapeValue: shape_pool.clone(this.pv),
            lastIndex: 0,
            lastTime: initialDefaultFrame
          }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
        }, n.prototype.initiateExpression = ExpressionManager.initiateExpression;
        var h = ShapePropertyFactory.getShapeProp;

        ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
          var a = h(t, e, r, i, s);
          return a.propertyIndex = e.ix, a.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, a) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a), a.k && t.addDynamicProperty(a), a;
        };
      }(), function () {
        TextProperty.prototype.getExpressionValue = function (t, e) {
          var r = this.calculateExpression(e);

          if (t.t !== r) {
            var i = {};
            return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i;
          }

          return t;
        }, TextProperty.prototype.searchProperty = function () {
          var t = this.searchKeyframes(),
              e = this.searchExpressions();
          return this.kf = t || e, this.kf;
        }, TextProperty.prototype.searchExpressions = function () {
          if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0;
        };
      }();

      var ShapeExpressionInterface = function () {
        function t(t, f, m) {
          var c,
              d = [],
              u = t ? t.length : 0;

          for (c = 0; c < u; c += 1) "gr" == t[c].ty ? d.push(e(t[c], f[c], m)) : "fl" == t[c].ty ? d.push(r(t[c], f[c], m)) : "st" == t[c].ty ? d.push(i(t[c], f[c], m)) : "tm" == t[c].ty ? d.push(s(t[c], f[c], m)) : "tr" == t[c].ty || ("el" == t[c].ty ? d.push(a(t[c], f[c], m)) : "sr" == t[c].ty ? d.push(n(t[c], f[c], m)) : "sh" == t[c].ty ? d.push(p(t[c], f[c], m)) : "rc" == t[c].ty ? d.push(o(t[c], f[c], m)) : "rd" == t[c].ty ? d.push(h(t[c], f[c], m)) : "rp" == t[c].ty && d.push(l(t[c], f[c], m)));

          return d;
        }

        function e(e, r, i) {
          var s = function (t) {
            switch (t) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return s.content;

              default:
                return s.transform;
            }
          };

          s.propertyGroup = function (t) {
            return 1 === t ? s : i(t - 1);
          };

          var a = function (e, r, i) {
            var s,
                a = function (t) {
              for (var e = 0, r = s.length; e < r;) {
                if (s[e]._name === t || s[e].mn === t || s[e].propertyIndex === t || s[e].ix === t || s[e].ind === t) return s[e];
                e += 1;
              }

              if ("number" == typeof t) return s[t - 1];
            };

            return a.propertyGroup = function (t) {
              return 1 === t ? a : i(t - 1);
            }, s = t(e.it, r.it, a.propertyGroup), a.numProperties = s.length, a.propertyIndex = e.cix, a._name = e.nm, a;
          }(e, r, s.propertyGroup),
              n = function (t, e, r) {
            function i(t) {
              return 1 == t ? s : r(--t);
            }

            e.transform.mProps.o.setGroupProperty(i), e.transform.mProps.p.setGroupProperty(i), e.transform.mProps.a.setGroupProperty(i), e.transform.mProps.s.setGroupProperty(i), e.transform.mProps.r.setGroupProperty(i), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i));

            function s(e) {
              return t.a.ix === e || "Anchor Point" === e ? s.anchorPoint : t.o.ix === e || "Opacity" === e ? s.opacity : t.p.ix === e || "Position" === e ? s.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? s.rotation : t.s.ix === e || "Scale" === e ? s.scale : t.sk && t.sk.ix === e || "Skew" === e ? s.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? s.skewAxis : void 0;
            }

            return e.transform.op.setGroupProperty(i), Object.defineProperties(s, {
              opacity: {
                get: ExpressionPropertyInterface(e.transform.mProps.o)
              },
              position: {
                get: ExpressionPropertyInterface(e.transform.mProps.p)
              },
              anchorPoint: {
                get: ExpressionPropertyInterface(e.transform.mProps.a)
              },
              scale: {
                get: ExpressionPropertyInterface(e.transform.mProps.s)
              },
              rotation: {
                get: ExpressionPropertyInterface(e.transform.mProps.r)
              },
              skew: {
                get: ExpressionPropertyInterface(e.transform.mProps.sk)
              },
              skewAxis: {
                get: ExpressionPropertyInterface(e.transform.mProps.sa)
              },
              _name: {
                value: t.nm
              }
            }), s.ty = "tr", s.mn = t.mn, s.propertyGroup = r, s;
          }(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);

          return s.content = a, s.transform = n, Object.defineProperty(s, "_name", {
            get: function () {
              return e.nm;
            }
          }), s.numProperties = e.np, s.propertyIndex = e.ix, s.nm = e.nm, s.mn = e.mn, s;
        }

        function r(t, e, r) {
          function i(t) {
            return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0;
          }

          return Object.defineProperties(i, {
            color: {
              get: ExpressionPropertyInterface(e.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(e.o)
            },
            _name: {
              value: t.nm
            },
            mn: {
              value: t.mn
            }
          }), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i;
        }

        function i(t, e, r) {
          function i(t) {
            return 1 === t ? ob : r(t - 1);
          }

          function s(t) {
            return 1 === t ? h : i(t - 1);
          }

          function a(r) {
            Object.defineProperty(h, t.d[r].nm, {
              get: ExpressionPropertyInterface(e.d.dataProps[r].p)
            });
          }

          var n,
              o = t.d ? t.d.length : 0,
              h = {};

          for (n = 0; n < o; n += 1) a(n), e.d.dataProps[n].p.setGroupProperty(s);

          function l(t) {
            return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0;
          }

          return Object.defineProperties(l, {
            color: {
              get: ExpressionPropertyInterface(e.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(e.o)
            },
            strokeWidth: {
              get: ExpressionPropertyInterface(e.w)
            },
            dash: {
              get: function () {
                return h;
              }
            },
            _name: {
              value: t.nm
            },
            mn: {
              value: t.mn
            }
          }), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l;
        }

        function s(t, e, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }

          function s(e) {
            return e === t.e.ix || "End" === e || "end" === e ? s.end : e === t.s.ix ? s.start : e === t.o.ix ? s.offset : void 0;
          }

          return s.propertyIndex = t.ix, e.s.setGroupProperty(i), e.e.setGroupProperty(i), e.o.setGroupProperty(i), s.propertyIndex = t.ix, s.propertyGroup = r, Object.defineProperties(s, {
            start: {
              get: ExpressionPropertyInterface(e.s)
            },
            end: {
              get: ExpressionPropertyInterface(e.e)
            },
            offset: {
              get: ExpressionPropertyInterface(e.o)
            },
            _name: {
              value: t.nm
            }
          }), s.mn = t.mn, s;
        }

        function a(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          a.propertyIndex = t.ix;
          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.s.ix === e ? a.size : void 0;
          }

          return s.s.setGroupProperty(i), s.p.setGroupProperty(i), Object.defineProperties(a, {
            size: {
              get: ExpressionPropertyInterface(s.s)
            },
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function n(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.r.ix === e ? a.rotation : t.pt.ix === e ? a.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? a.outerRadius : t.os.ix === e ? a.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? a.innerRoundness : void 0 : a.innerRadius;
          }

          return a.propertyIndex = t.ix, s.or.setGroupProperty(i), s.os.setGroupProperty(i), s.pt.setGroupProperty(i), s.p.setGroupProperty(i), s.r.setGroupProperty(i), t.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)), Object.defineProperties(a, {
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            rotation: {
              get: ExpressionPropertyInterface(s.r)
            },
            points: {
              get: ExpressionPropertyInterface(s.pt)
            },
            outerRadius: {
              get: ExpressionPropertyInterface(s.or)
            },
            outerRoundness: {
              get: ExpressionPropertyInterface(s.os)
            },
            innerRadius: {
              get: ExpressionPropertyInterface(s.ir)
            },
            innerRoundness: {
              get: ExpressionPropertyInterface(s.is)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function o(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;

          function a(e) {
            return t.p.ix === e ? a.position : t.r.ix === e ? a.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? a.size : void 0;
          }

          return a.propertyIndex = t.ix, s.p.setGroupProperty(i), s.s.setGroupProperty(i), s.r.setGroupProperty(i), Object.defineProperties(a, {
            position: {
              get: ExpressionPropertyInterface(s.p)
            },
            roundness: {
              get: ExpressionPropertyInterface(s.r)
            },
            size: {
              get: ExpressionPropertyInterface(s.s)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function h(t, e, r) {
          var i = e;

          function s(e) {
            if (t.r.ix === e || "Round Corners 1" === e) return s.radius;
          }

          return s.propertyIndex = t.ix, i.rd.setGroupProperty(function (t) {
            return 1 == t ? s : r(--t);
          }), Object.defineProperties(s, {
            radius: {
              get: ExpressionPropertyInterface(i.rd)
            },
            _name: {
              value: t.nm
            }
          }), s.mn = t.mn, s;
        }

        function l(t, e, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }

          var s = e;

          function a(e) {
            return t.c.ix === e || "Copies" === e ? a.copies : t.o.ix === e || "Offset" === e ? a.offset : void 0;
          }

          return a.propertyIndex = t.ix, s.c.setGroupProperty(i), s.o.setGroupProperty(i), Object.defineProperties(a, {
            copies: {
              get: ExpressionPropertyInterface(s.c)
            },
            offset: {
              get: ExpressionPropertyInterface(s.o)
            },
            _name: {
              value: t.nm
            }
          }), a.mn = t.mn, a;
        }

        function p(t, e, r) {
          var i = e.sh;

          function s(t) {
            if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return s.path;
          }

          return i.setGroupProperty(function (t) {
            return 1 == t ? s : r(--t);
          }), Object.defineProperties(s, {
            path: {
              get: function () {
                return i.k && i.getValue(), i;
              }
            },
            shape: {
              get: function () {
                return i.k && i.getValue(), i;
              }
            },
            _name: {
              value: t.nm
            },
            ix: {
              value: t.ix
            },
            propertyIndex: {
              value: t.ix
            },
            mn: {
              value: t.mn
            }
          }), s;
        }

        return function (e, r, i) {
          var s;

          function a(t) {
            if ("number" == typeof t) return s[t - 1];

            for (var e = 0, r = s.length; e < r;) {
              if (s[e]._name === t) return s[e];
              e += 1;
            }
          }

          return a.propertyGroup = i, s = t(e, r, a), a.numProperties = s.length, a;
        };
      }(),
          TextExpressionInterface = function (t) {
        var e;

        function r() {}

        return Object.defineProperty(r, "sourceText", {
          get: function () {
            t.textProperty.getValue();
            var r = t.textProperty.currentData.t;
            return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e;
          }
        }), r;
      },
          LayerExpressionInterface = function () {
        function t(t, e) {
          var r = new Matrix();

          if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
            var i,
                s = this._elem.hierarchy.length;

            for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);

            return r.applyToPointArray(t[0], t[1], t[2] || 0);
          }

          return r.applyToPointArray(t[0], t[1], t[2] || 0);
        }

        function e(t, e) {
          var r = new Matrix();

          if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
            var i,
                s = this._elem.hierarchy.length;

            for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);

            return r.inversePoint(t);
          }

          return r.inversePoint(t);
        }

        function r(t) {
          var e = new Matrix();

          if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
            var r,
                i = this._elem.hierarchy.length;

            for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);

            return e.inversePoint(t);
          }

          return e.inversePoint(t);
        }

        function i() {
          return [1, 1, 1, 1];
        }

        return function (s) {
          var a;

          function n(t) {
            switch (t) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return n.shapeInterface;

              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return a;

              case 4:
              case "ADBE Effect Parade":
              case "effects":
              case "Effects":
                return n.effect;
            }
          }

          n.toWorld = t, n.fromWorld = e, n.toComp = t, n.fromComp = r, n.sampleImage = i, n.sourceRectAtTime = s.sourceRectAtTime.bind(s), n._elem = s;
          var o = getDescriptor(a = TransformExpressionInterface(s.finalTransform.mProp), "anchorPoint");
          return Object.defineProperties(n, {
            hasParent: {
              get: function () {
                return s.hierarchy.length;
              }
            },
            parent: {
              get: function () {
                return s.hierarchy[0].layerInterface;
              }
            },
            rotation: getDescriptor(a, "rotation"),
            scale: getDescriptor(a, "scale"),
            position: getDescriptor(a, "position"),
            opacity: getDescriptor(a, "opacity"),
            anchorPoint: o,
            anchor_point: o,
            transform: {
              get: function () {
                return a;
              }
            },
            active: {
              get: function () {
                return s.isInRange;
              }
            }
          }), n.startTime = s.data.st, n.index = s.data.ind, n.source = s.data.refId, n.height = 0 === s.data.ty ? s.data.h : 100, n.width = 0 === s.data.ty ? s.data.w : 100, n.inPoint = s.data.ip / s.comp.globalData.frameRate, n.outPoint = s.data.op / s.comp.globalData.frameRate, n._name = s.data.nm, n.registerMaskInterface = function (t) {
            n.mask = new MaskManagerInterface(t, s);
          }, n.registerEffectsInterface = function (t) {
            n.effect = t;
          }, n;
        };
      }(),
          CompExpressionInterface = function (t) {
        function e(e) {
          for (var r = 0, i = t.layers.length; r < i;) {
            if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
            r += 1;
          }

          return null;
        }

        return Object.defineProperty(e, "_name", {
          value: t.data.nm
        }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e;
      },
          TransformExpressionInterface = function (t) {
        function e(t) {
          switch (t) {
            case "scale":
            case "Scale":
            case "ADBE Scale":
            case 6:
              return e.scale;

            case "rotation":
            case "Rotation":
            case "ADBE Rotation":
            case "ADBE Rotate Z":
            case 10:
              return e.rotation;

            case "ADBE Rotate X":
              return e.xRotation;

            case "ADBE Rotate Y":
              return e.yRotation;

            case "position":
            case "Position":
            case "ADBE Position":
            case 2:
              return e.position;

            case "ADBE Position_0":
              return e.xPosition;

            case "ADBE Position_1":
              return e.yPosition;

            case "ADBE Position_2":
              return e.zPosition;

            case "anchorPoint":
            case "AnchorPoint":
            case "Anchor Point":
            case "ADBE AnchorPoint":
            case 1:
              return e.anchorPoint;

            case "opacity":
            case "Opacity":
            case 11:
              return e.opacity;
          }
        }

        if (Object.defineProperty(e, "rotation", {
          get: ExpressionPropertyInterface(t.r || t.rz)
        }), Object.defineProperty(e, "zRotation", {
          get: ExpressionPropertyInterface(t.rz || t.r)
        }), Object.defineProperty(e, "xRotation", {
          get: ExpressionPropertyInterface(t.rx)
        }), Object.defineProperty(e, "yRotation", {
          get: ExpressionPropertyInterface(t.ry)
        }), Object.defineProperty(e, "scale", {
          get: ExpressionPropertyInterface(t.s)
        }), t.p) var r = ExpressionPropertyInterface(t.p);
        return Object.defineProperty(e, "position", {
          get: function () {
            return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
          }
        }), Object.defineProperty(e, "xPosition", {
          get: ExpressionPropertyInterface(t.px)
        }), Object.defineProperty(e, "yPosition", {
          get: ExpressionPropertyInterface(t.py)
        }), Object.defineProperty(e, "zPosition", {
          get: ExpressionPropertyInterface(t.pz)
        }), Object.defineProperty(e, "anchorPoint", {
          get: ExpressionPropertyInterface(t.a)
        }), Object.defineProperty(e, "opacity", {
          get: ExpressionPropertyInterface(t.o)
        }), Object.defineProperty(e, "skew", {
          get: ExpressionPropertyInterface(t.sk)
        }), Object.defineProperty(e, "skewAxis", {
          get: ExpressionPropertyInterface(t.sa)
        }), Object.defineProperty(e, "orientation", {
          get: ExpressionPropertyInterface(t.or)
        }), e;
      },
          ProjectInterface = function () {
        function t(t) {
          this.compositions.push(t);
        }

        return function () {
          function e(t) {
            for (var e = 0, r = this.compositions.length; e < r;) {
              if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
              e += 1;
            }
          }

          return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e;
        };
      }(),
          EffectsExpressionInterface = function () {
        function t(r, i, s, a) {
          var n,
              o = [],
              h = r.ef.length;

          for (n = 0; n < h; n += 1) 5 === r.ef[n].ty ? o.push(t(r.ef[n], i.effectElements[n], i.effectElements[n].propertyGroup, a)) : o.push(e(i.effectElements[n], r.ef[n].ty, a, l));

          function l(t) {
            return 1 === t ? p : s(t - 1);
          }

          var p = function (t) {
            for (var e = r.ef, i = 0, s = e.length; i < s;) {
              if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? o[i] : o[i]();
              i += 1;
            }

            return o[0]();
          };

          return p.propertyGroup = l, "ADBE Color Control" === r.mn && Object.defineProperty(p, "color", {
            get: function () {
              return o[0]();
            }
          }), Object.defineProperty(p, "numProperties", {
            get: function () {
              return r.np;
            }
          }), p.active = p.enabled = 0 !== r.en, p;
        }

        function e(t, e, r, i) {
          var s = ExpressionPropertyInterface(t.p);
          return t.p.setGroupProperty && t.p.setGroupProperty(i), function () {
            return 10 === e ? r.comp.compInterface(t.p.v) : s();
          };
        }

        return {
          createEffectsInterface: function (e, r) {
            if (e.effectsManager) {
              var i,
                  s = [],
                  a = e.data.ef,
                  n = e.effectsManager.effectElements.length;

              for (i = 0; i < n; i += 1) s.push(t(a[i], e.effectsManager.effectElements[i], r, e));

              return function (t) {
                for (var r = e.data.ef || [], i = 0, a = r.length; i < a;) {
                  if (t === r[i].nm || t === r[i].mn || t === r[i].ix) return s[i];
                  i += 1;
                }
              };
            }
          }
        };
      }(),
          MaskManagerInterface = function () {
        function t(t, e) {
          this._mask = t, this._data = e;
        }

        Object.defineProperty(t.prototype, "maskPath", {
          get: function () {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          }
        }), Object.defineProperty(t.prototype, "maskOpacity", {
          get: function () {
            return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
          }
        });
        return function (e, r) {
          var i,
              s = createSizedArray(e.viewData.length),
              a = e.viewData.length;

          for (i = 0; i < a; i += 1) s[i] = new t(e.viewData[i], e.masksProperties[i]);

          return function (t) {
            for (i = 0; i < a;) {
              if (e.masksProperties[i].nm === t) return s[i];
              i += 1;
            }
          };
        };
      }(),
          ExpressionPropertyInterface = function () {
        var t = {
          pv: 0,
          v: 0,
          mult: 1
        },
            e = {
          pv: [0, 0, 0],
          v: [0, 0, 0],
          mult: 1
        };

        function r(t, e, r) {
          Object.defineProperty(t, "velocity", {
            get: function () {
              return e.getVelocityAtTime(e.comp.currentFrame);
            }
          }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (i) {
            if (t.numKeys) {
              var s = "";
              s = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
              var a = "unidimensional" === r ? new Number(s) : Object.assign({}, s);
              return a.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, a;
            }

            return 0;
          }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup;
        }

        function i() {
          return t;
        }

        return function (s) {
          return s ? "unidimensional" === s.propType ? function (e) {
            e && "pv" in e || (e = t);
            var i = 1 / e.mult,
                s = e.pv * i,
                a = new Number(s);
            return a.value = s, r(a, e, "unidimensional"), function () {
              return e.k && e.getValue(), s = e.v * i, a.value !== s && ((a = new Number(s)).value = s, r(a, e, "unidimensional")), a;
            };
          }(s) : function (t) {
            t && "pv" in t || (t = e);
            var i = 1 / t.mult,
                s = t.pv.length,
                a = createTypedArray("float32", s),
                n = createTypedArray("float32", s);
            return a.value = n, r(a, t, "multidimensional"), function () {
              t.k && t.getValue();

              for (var e = 0; e < s; e += 1) a[e] = n[e] = t.v[e] * i;

              return a;
            };
          }(s) : i;
        };
      }(),
          TextExpressionSelectorProp,
          propertyGetTextProp;

      function SliderEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function AngleEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function ColorEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }

      function PointEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }

      function LayerIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function MaskIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function CheckboxEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }

      function NoValueEffect() {
        this.p = {};
      }

      function EffectsManager() {}

      function EffectsManager(t, e) {
        var r = t.ef || [];
        this.effectElements = [];
        var i,
            s,
            a = r.length;

        for (i = 0; i < a; i++) s = new GroupEffect(r[i], e), this.effectElements.push(s);
      }

      function GroupEffect(t, e) {
        this.init(t, e);
      }

      TextExpressionSelectorProp = function () {
        function t(t, e) {
          return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v;
        }

        return function (e, r) {
          this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty;
        };
      }(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function (t, e, r) {
        return 1 === e.t ? new TextExpressionSelectorProp(t, e, r) : propertyGetTextProp(t, e, r);
      }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
        this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
        var r,
            i,
            s = this.data.ef.length,
            a = this.data.ef;

        for (r = 0; r < s; r += 1) {
          switch (i = null, a[r].ty) {
            case 0:
              i = new SliderEffect(a[r], e, this);
              break;

            case 1:
              i = new AngleEffect(a[r], e, this);
              break;

            case 2:
              i = new ColorEffect(a[r], e, this);
              break;

            case 3:
              i = new PointEffect(a[r], e, this);
              break;

            case 4:
            case 7:
              i = new CheckboxEffect(a[r], e, this);
              break;

            case 10:
              i = new LayerIndexEffect(a[r], e, this);
              break;

            case 11:
              i = new MaskIndexEffect(a[r], e, this);
              break;

            case 5:
              i = new EffectsManager(a[r], e, this);
              break;

            default:
              i = new NoValueEffect(a[r], e, this);
          }

          i && this.effectElements.push(i);
        }
      };

      var lottie = {},
          _isFrozen = !1;

      function setLocationHref(t) {
        locationHref = t;
      }

      function searchAnimations() {
        !0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations();
      }

      function setSubframeRendering(t) {
        subframeEnabled = t;
      }

      function loadAnimation(t) {
        return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
      }

      function setQuality(t) {
        if ("string" == typeof t) switch (t) {
          case "high":
            defaultCurveSegments = 200;
            break;

          case "medium":
            defaultCurveSegments = 50;
            break;

          case "low":
            defaultCurveSegments = 10;
        } else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
        roundValues(!(defaultCurveSegments >= 50));
      }

      function inBrowser() {
        return "undefined" != typeof navigator;
      }

      function installPlugin(t, e) {
        "expressions" === t && (expressionsPlugin = e);
      }

      function getFactory(t) {
        switch (t) {
          case "propertyFactory":
            return PropertyFactory;

          case "shapePropertyFactory":
            return ShapePropertyFactory;

          case "matrix":
            return Matrix;
        }
      }

      function checkReady() {
        "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
      }

      function getQueryVariable(t) {
        for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
          var i = e[r].split("=");
          if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
        }
      }

      lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.__getFactory = getFactory, lottie.version = "5.6.6";
      var standalone = "__[STANDALONE]__",
          animationData = "__[ANIMATIONDATA]__",
          renderer = "";

      if (standalone) {
        var scripts = document.getElementsByTagName("script"),
            index = scripts.length - 1,
            myScript = scripts[index] || {
          src: ""
        },
            queryString = myScript.src.replace(/^[^\?]+\??/, "");
        renderer = getQueryVariable("renderer");
      }

      var readyStateCheckInterval = setInterval(checkReady, 100);
      return lottie;
    });
  }, {}],
  "jFKs": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;

    var n = require("lit-element");

    function e() {
      const n = r(["\n* {\n  box-sizing: border-box;\n}\n\n:host {\n  --lottie-player-toolbar-height: 35px;\n  --lottie-player-toolbar-background-color: transparent;\n  --lottie-player-toolbar-icon-color: #999;\n  --lottie-player-toolbar-icon-hover-color: #222;\n  --lottie-player-toolbar-icon-active-color: #555;\n  --lottie-player-seeker-track-color: #CCC;\n  --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);\n\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.main {\n  box-sizing: border-box;\n  display: inline-grid;\n  grid-auto-columns: auto;\n  grid-template-rows: auto;\n  position: relative;\n  height: inherit;\n  width: inherit;\n}\n\n.main.controls {\n  grid-template-rows: 1fr var(--lottie-player-toolbar-height);\n}\n\n.animation {\n  overflow: hidden;\n  height: calc(1fr - var(--lottie-player-toolbar-height));\n}\n\n.toolbar {\n  display: grid;\n  grid-template-columns: 32px 32px 1fr 32px 32px;\n  align-items: center;\n  justify-items: center;\n  background-color: var(--lottie-player-toolbar-background-color);\n}\n\n.toolbar button {\n  cursor: pointer;\n  fill: var(--lottie-player-toolbar-icon-color);\n  display: flex;\n  background: none;\n  border: 0;\n  padding: 0;\n  outline: none;\n  height: 100%;\n}\n\n.toolbar button:hover {\n  fill: var(--lottie-player-toolbar-icon-hover-color);\n}\n\n.toolbar button.active {\n  fill: var(--lottie-player-toolbar-icon-active-color);\n}\n\n.toolbar button svg {\n}\n\n.toolbar button.disabled svg {\n  display: none;\n}\n\n.toolbar a {\n  filter: grayscale(100%);\n  display: flex;\n  transition: filter .5s, opacity 0.5s;\n  opacity: 0.4;\n  height: 100%;\n  align-items: center;\n}\n\n.toolbar a:hover {\n  filter: none;\n  display: flex;\n  opacity: 1;\n}\n\n.toolbar a svg {\n}\n\n.seeker {\n  -webkit-appearance: none;\n  width: 95%;\n  outline: none;\n}\n\n.seeker::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-webkit-slider-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -5px;\n}\n.seeker:focus::-webkit-slider-runnable-track {\n  background: #999;\n}\n.seeker::-moz-range-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-moz-range-thumb {\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker::-ms-track {\n  width: 100%;\n  height: 5px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n.seeker::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n  border-radius: 3px;\n}\n.seeker::-ms-thumb {\n  border: 0;\n  height: 15px;\n  width: 15px;\n  border-radius: 50%;\n  background: var(--lottie-player-seeker-thumb-color);\n  cursor: pointer;\n}\n.seeker:focus::-ms-fill-lower {\n  background: var(--lottie-player-seeker-track-color);\n}\n.seeker:focus::-ms-fill-upper {\n  background: var(--lottie-player-seeker-track-color);\n}\n\n.error {\n  display: flex;\n  justify-content: center;\n  height: 100%;\n  align-items: center;\n}\n"]);
      return e = function () {
        return n;
      }, n;
    }

    function r(n, e) {
      return e || (e = n.slice(0)), Object.freeze(Object.defineProperties(n, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    var o = (0, n.css)(e());
    exports.default = o;
  }, {
    "lit-element": "bhxD"
  }],
  "M8c7": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.parseSrc = g, exports.LottiePlayer = exports.PlayerEvents = exports.PlayMode = exports.PlayerState = void 0;

    var t = require("lit-element"),
        e = n(require("lottie-web/build/player/lottie_svg")),
        i = o(require("./lottie-player.styles"));

    function o(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    function r() {
      if ("function" != typeof WeakMap) return null;
      var t = new WeakMap();
      return r = function () {
        return t;
      }, t;
    }

    function n(t) {
      if (t && t.__esModule) return t;
      if (null === t || "object" != typeof t && "function" != typeof t) return {
        default: t
      };
      var e = r();
      if (e && e.has(t)) return e.get(t);
      var i = {},
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;

      for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) {
        var s = o ? Object.getOwnPropertyDescriptor(t, n) : null;
        s && (s.get || s.set) ? Object.defineProperty(i, n, s) : i[n] = t[n];
      }

      return i.default = t, e && e.set(t, i), i;
    }

    function s() {
      const t = c(['<div class="error">⚠️</div>']);
      return s = function () {
        return t;
      }, t;
    }

    function a() {
      const t = c(["\n      <div class=", '>\n        <div class="animation" style=', ">\n          ", "\n        </div>\n        ", "\n      </div>"]);
      return a = function () {
        return t;
      }, t;
    }

    function h() {
      const t = c(['<svg width="24" height="24"><path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z"/></svg>']);
      return h = function () {
        return t;
      }, t;
    }

    function l() {
      const t = c(['<svg width="24" height="24"><path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"/></svg>']);
      return l = function () {
        return t;
      }, t;
    }

    function p() {
      const t = c(['\n      <div class="toolbar">\n        <button @click=', " class=", ">\n          ", "\n        </button>\n        <button @click=", " class=", '>\n          <svg width="24" height="24"><path d="M6 6h12v12H6V6z" /></svg>\n        </button>\n        <input class="seeker" type="range" min="0" step="1" max="100" .value=', "\n          @input=", "\n          @mousedown=", "\n          @mouseup=", "\n        />\n        <button @click=", " class=", '>\n          <svg width="24" height="24">\n            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"/>\n          </svg>\n        </button>\n        <a href="https://www.lottiefiles.com/" target="_blank">\n          <svg width="24" height="24" viewBox="0 0 320 320" fill-rule="nonzero"><rect fill="#adadad" x=".5" y=".5" width="100%" height="100%" rx="26.73"/><path d="M251.304 65.44a16.55 16.55 0 0 1 13.927 18.789c-1.333 9.04-9.73 15.292-18.762 13.954-15.992-2.37-39.95 22.534-66.77 73.74-34.24 65.37-66.113 96.517-99.667 94.032-9.102-.674-15.93-8.612-15.258-17.723s8.592-15.96 17.695-15.286c16.57 1.227 40.908-24.737 67.97-76.4 34.46-65.79 66.764-96.157 100.866-91.105z" fill="#fff"/></svg>\n        </a>\n      </div>\n    ']);
      return p = function () {
        return t;
      }, t;
    }

    function c(t, e) {
      return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
        raw: {
          value: Object.freeze(e)
        }
      }));
    }

    var u,
        d,
        v,
        y = function (t, e, i, o) {
      var r,
          n = arguments.length,
          s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o);else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s);
      return n > 3 && s && Object.defineProperty(e, i, s), s;
    };

    function g(t) {
      if ("object" == typeof t) return t;

      try {
        return JSON.parse(t);
      } catch (e) {
        return new URL(t, window.location.href).toString();
      }
    }

    exports.PlayerState = u, function (t) {
      t.Loading = "loading", t.Playing = "playing", t.Paused = "paused", t.Stopped = "stopped", t.Frozen = "frozen", t.Error = "error";
    }(u || (exports.PlayerState = u = {})), exports.PlayMode = d, function (t) {
      t.Normal = "normal", t.Bounce = "bounce";
    }(d || (exports.PlayMode = d = {})), exports.PlayerEvents = v, function (t) {
      t.Load = "load", t.Error = "error", t.Ready = "ready", t.Play = "play", t.Pause = "pause", t.Stop = "stop", t.Freeze = "freeze", t.Loop = "loop", t.Complete = "complete", t.Frame = "frame";
    }(v || (exports.PlayerEvents = v = {}));
    let f = class extends t.LitElement {
      constructor() {
        super(...arguments), this.mode = d.Normal, this.autoplay = !1, this.background = "transparent", this.controls = !1, this.direction = 1, this.hover = !1, this.loop = !1, this.renderer = "svg", this.speed = 1, this.currentState = u.Loading, this.intermission = 1, this._counter = 0;
      }

      _onVisibilityChange() {
        !0 === document.hidden && this.currentState === u.Playing ? this.freeze() : this.currentState === u.Frozen && this.play();
      }

      _handleSeekChange(t) {
        if (!this._lottie || isNaN(t.target.value)) return;
        const e = t.target.value / 100 * this._lottie.totalFrames;
        this.seek(e);
      }

      load(t) {
        if (!this.shadowRoot) return;
        const i = {
          container: this.container,
          loop: !1,
          autoplay: !1,
          renderer: this.renderer,
          rendererSettings: {
            scaleMode: "noScale",
            clearCanvas: !1,
            progressiveLoad: !0,
            hideOnTransparent: !0
          }
        };

        try {
          const r = g(t),
                n = "string" == typeof r ? "path" : "animationData";
          this._lottie && this._lottie.destroy(), this._lottie = e.loadAnimation(Object.assign(Object.assign({}, i), {
            [n]: r
          }));
        } catch (o) {
          return this.currentState = u.Error, void this.dispatchEvent(new CustomEvent(v.Error));
        }

        this._lottie && (this._lottie.addEventListener("enterFrame", () => {
          this.seeker = this._lottie.currentFrame / this._lottie.totalFrames * 100, this.dispatchEvent(new CustomEvent(v.Frame, {
            detail: {
              frame: this._lottie.currentFrame,
              seeker: this.seeker
            }
          }));
        }), this._lottie.addEventListener("complete", () => {
          this.currentState === u.Playing ? !this.loop || this.count && this._counter >= this.count ? this.dispatchEvent(new CustomEvent(v.Complete)) : this.mode === d.Bounce ? (this.count && (this._counter += .5), setTimeout(() => {
            this.dispatchEvent(new CustomEvent(v.Loop)), this.currentState === u.Playing && (this._lottie.setDirection(-1 * this._lottie.playDirection), this._lottie.play());
          }, this.intermission)) : (this.count && (this._counter += 1), window.setTimeout(() => {
            this.dispatchEvent(new CustomEvent(v.Loop)), this.currentState === u.Playing && (this._lottie.stop(), this._lottie.play());
          }, this.intermission)) : this.dispatchEvent(new CustomEvent(v.Complete));
        }), this._lottie.addEventListener("DOMLoaded", () => {
          this.dispatchEvent(new CustomEvent(v.Ready));
        }), this._lottie.addEventListener("data_ready", () => {
          this.dispatchEvent(new CustomEvent(v.Load));
        }), this._lottie.addEventListener("data_failed", () => {
          this.currentState = u.Error, this.dispatchEvent(new CustomEvent(v.Error));
        }), this.container.addEventListener("mouseenter", () => {
          this.hover && this.currentState !== u.Playing && this.play();
        }), this.container.addEventListener("mouseleave", () => {
          this.hover && this.currentState === u.Playing && this.stop();
        }), this.setSpeed(this.speed), this.setDirection(this.direction), this.autoplay && this.play());
      }

      getLottie() {
        return this._lottie;
      }

      play() {
        this._lottie && (this._lottie.play(), this.currentState = u.Playing, this.dispatchEvent(new CustomEvent(v.Play)));
      }

      pause() {
        this._lottie && (this._lottie.pause(), this.currentState = u.Paused, this.dispatchEvent(new CustomEvent(v.Pause)));
      }

      stop() {
        this._lottie && (this._counter = 0, this._lottie.stop(), this.currentState = u.Stopped, this.dispatchEvent(new CustomEvent(v.Stop)));
      }

      seek(t) {
        if (!this._lottie) return;
        const e = t.toString().match(/^([0-9]+)(%?)$/);
        if (!e) return;
        const i = "%" === e[2] ? this._lottie.totalFrames * Number(e[1]) / 100 : Number(e[1]);
        this.seeker = i, this.currentState === u.Playing ? this._lottie.goToAndPlay(i, !0) : (this._lottie.goToAndStop(i, !0), this._lottie.pause());
      }

      snapshot(t = !0) {
        if (!this.shadowRoot) return;
        const e = this.shadowRoot.querySelector(".animation svg"),
              i = new XMLSerializer().serializeToString(e);

        if (t) {
          const t = document.createElement("a");
          t.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(i), t.download = "download_" + this.seeker + ".svg", document.body.appendChild(t), t.click(), document.body.removeChild(t);
        }

        return i;
      }

      freeze() {
        this._lottie && (this._lottie.pause(), this.currentState = u.Frozen, this.dispatchEvent(new CustomEvent(v.Freeze)));
      }

      setSpeed(t = 1) {
        this._lottie && this._lottie.setSpeed(t);
      }

      setDirection(t) {
        this._lottie && this._lottie.setDirection(t);
      }

      setLooping(t) {
        this._lottie && (this.loop = t, this._lottie.loop = t);
      }

      togglePlay() {
        return this.currentState === u.Playing ? this.pause() : this.play();
      }

      toggleLooping() {
        this.setLooping(!this.loop);
      }

      static get styles() {
        return i.default;
      }

      firstUpdated() {
        "IntersectionObserver" in window && (this._io = new IntersectionObserver(t => {
          t[0].isIntersecting ? this.currentState === u.Frozen && this.play() : this.currentState === u.Playing && this.freeze();
        }), this._io.observe(this.container)), void 0 !== document.hidden && document.addEventListener("visibilitychange", () => this._onVisibilityChange()), this.src && this.load(this.src);
      }

      disconnectedCallback() {
        this._io && (this._io.disconnect(), this._io = void 0), document.removeEventListener("visibilitychange", () => this._onVisibilityChange());
      }

      renderControls() {
        const e = this.currentState === u.Playing,
              i = this.currentState === u.Paused,
              o = this.currentState === u.Stopped;
        return (0, t.html)(p(), this.togglePlay, e || i ? "active" : "", e ? (0, t.html)(l()) : (0, t.html)(h()), this.stop, o ? "active" : "", this.seeker, this._handleSeekChange, () => {
          this._prevState = this.currentState, this.freeze();
        }, () => {
          this._prevState === u.Playing && this.play();
        }, this.toggleLooping, this.loop ? "active" : "");
      }

      render() {
        const e = this.controls ? "main controls" : "main";
        return (0, t.html)(a(), e, "background:" + this.background, this.currentState === u.Error ? (0, t.html)(s()) : void 0, this.controls ? this.renderControls() : void 0);
      }

    };
    exports.LottiePlayer = f, y([(0, t.query)(".animation")], f.prototype, "container", void 0), y([(0, t.property)()], f.prototype, "mode", void 0), y([(0, t.property)({
      type: Boolean
    })], f.prototype, "autoplay", void 0), y([(0, t.property)({
      type: String,
      reflect: !0
    })], f.prototype, "background", void 0), y([(0, t.property)({
      type: Boolean
    })], f.prototype, "controls", void 0), y([(0, t.property)({
      type: Number
    })], f.prototype, "count", void 0), y([(0, t.property)({
      type: Number
    })], f.prototype, "direction", void 0), y([(0, t.property)({
      type: Boolean
    })], f.prototype, "hover", void 0), y([(0, t.property)({
      type: Boolean,
      reflect: !0
    })], f.prototype, "loop", void 0), y([(0, t.property)({
      type: String
    })], f.prototype, "renderer", void 0), y([(0, t.property)({
      type: Number
    })], f.prototype, "speed", void 0), y([(0, t.property)({
      type: String
    })], f.prototype, "src", void 0), y([(0, t.property)({
      type: String
    })], f.prototype, "currentState", void 0), y([(0, t.property)()], f.prototype, "seeker", void 0), y([(0, t.property)()], f.prototype, "intermission", void 0), exports.LottiePlayer = f = y([(0, t.customElement)("lottie-player")], f);
  }, {
    "lit-element": "bhxD",
    "lottie-web/build/player/lottie_svg": "aqmj",
    "./lottie-player.styles": "jFKs"
  }]
}, {}, ["M8c7"], null);