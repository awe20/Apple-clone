!function t(e, i, s) {
    function r(a, o) {
        if (!i[a]) {
            if (!e[a]) {
                var l = "function" == typeof require && require;
                if (!o && l)
                    return l(a, !0);
                if (n)
                    return n(a, !0);
                var h = new Error("Cannot find module '" + a + "'");
                throw h.code = "MODULE_NOT_FOUND",
                h
            }
            var c = i[a] = {
                exports: {}
            };
            e[a][0].call(c.exports, (function(t) {
                return r(e[a][1][t] || t)
            }
            ), c, c.exports, t, e, i, s)
        }
        return i[a].exports
    }
    for (var n = "function" == typeof require && require, a = 0; a < s.length; a++)
        r(s[a]);
    return r
}({
    1: [function(t, e, i) {
        "use strict";
        var s = t(5)
          , r = t(6)
          , n = t(10)
          , a = t(8)
          , o = t(34).EventEmitterMicro
          , l = o.prototype
          , h = t(12)
          , c = t(14)
          , u = [h.BUSY, h.CHECKED, h.DISABLED, h.EXPANDED, h.HIDDEN, h.INVALID, h.PRESSED, h.SELECTED]
          , d = function(t, e) {
            o.call(this),
            this._options = e || {},
            this._selector = e.selector || ".navitem",
            this._allowMultiSelection = e.multiSelection || !1;
            var i = u.indexOf(e.state) > -1 ? e.state : h.SELECTED;
            this.el = t,
            this._navItems = t.querySelectorAll(this._selector),
            this._navItems = Array.prototype.slice.call(this._navItems),
            this._state = i,
            this._navKeys = {},
            this.selectOption = this.selectOption.bind(this),
            this._handleKeyDown = this._handleKeyDown.bind(this),
            this._setup()
        };
        d.ONSELECT = "onSelect",
        d.ONFOCUS = "onFocus";
        var m = d.prototype = Object.create(l);
        m._setup = function() {
            for (var t = [c.ARROW_DOWN, c.ARROW_RIGHT], e = [c.ARROW_UP, c.ARROW_LEFT], i = [c.ENTER, c.SPACEBAR], s = 0; s < t.length; s++)
                this.addNavkey(t[s], this._arrowDown.bind(this, !0)),
                this.addNavkey(e[s], this._arrowDown.bind(this, null)),
                this.addNavkey(i[s], this.selectOption);
            this._setupNavItems()
        }
        ,
        m._setupNavItems = function() {
            if (this._navItems.length) {
                for (var t = 0; t < this._navItems.length; t++)
                    this._setTabbingByIndex(t);
                void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex || this.setSelectedItemByIndex(0, !0)
            }
        }
        ,
        m._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            a(e.getAttribute(this._state)) && (this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t),
            a(e.getAttribute(h.DISABLED)) ? s(e) : r(e)
        }
        ,
        m.start = function() {
            this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown),
            this.el.addEventListener("click", this.selectOption))
        }
        ,
        m.stop = function() {
            this.el.removeEventListener("keydown", this._handleKeyDown),
            this.el.removeEventListener("click", this.selectOption)
        }
        ,
        m._handleKeyDown = function(t) {
            if (t.ctrlKey || t.altKey || t.metaKey)
                return !0;
            this._navKeys[t.keyCode] && this._navKeys[t.keyCode](t)
        }
        ,
        m._arrowDown = function(t, e, i) {
            e.preventDefault(),
            this.previousNavItemIndex = this.focusedNavItemIndex,
            this.focusedNavItemIndex = this._calculateIndex(t, this.focusedNavItemIndex),
            this._navItems[this.focusedNavItemIndex].focus(),
            i || this.trigger(d.ONFOCUS, {
                event: e,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }
        ,
        m.selectOption = function(t, e) {
            t.preventDefault();
            var i = this._navItems.indexOf(document.activeElement);
            i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i),
            this._allowMultiSelection ? this._toggleState() : (n(this._navItems[this.selectedNavitemIndex], this._state, "false"),
            n(this._navItems[this.focusedNavItemIndex], this._state, "true")),
            this.selectedNavitemIndex = this.focusedNavItemIndex,
            e || this.trigger(d.ONSELECT, {
                event: t,
                index: this.selectedNavitemIndex,
                el: this._navItems[this.selectedNavitemIndex]
            })
        }
        ,
        m._toggleState = function() {
            var t = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
            a(t) ? n(this._navItems[this.focusedNavItemIndex], this._state, "false") : n(this._navItems[this.focusedNavItemIndex], this._state, "true")
        }
        ,
        m._calculateIndex = function(t, e) {
            var i = e;
            if (!0 === t) {
                if (i = ++i >= this._navItems.length ? 0 : i,
                !a(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                    return i
            } else if (i = --i < 0 ? this._navItems.length - 1 : i,
            !a(this._navItems[i].getAttribute(h.DISABLED)) || this._navItems[i].hasAttribute("disabled"))
                return i;
            return this._calculateIndex(t, i)
        }
        ,
        m.updateNavItems = function() {
            var t = this.el.querySelectorAll(this._selector);
            this._navItems = Array.prototype.slice.call(t)
        }
        ,
        m.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (a(t.getAttribute(h.DISABLED)) || r(t),
            this._navItems.push(t))
        }
        ,
        m.setSelectedItemByIndex = function(t, e) {
            this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || n(this._navItems[this.selectedNavitemIndex], this._state, "false"),
            this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t,
            n(this._navItems[this.selectedNavitemIndex], this._state, "true"),
            e || this.trigger(d.ONSELECT, {
                event: null,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }
        ,
        m.getSelectedItem = function() {
            return this._navItems[this.selectedNavitemIndex]
        }
        ,
        m.getFocusedItem = function(t) {
            return this._navItems[this.focusedNavItemIndex]
        }
        ,
        m.addNavkey = function(t, e) {
            "function" == typeof e && "number" == typeof t ? this._navKeys[t] = e : console.warn("incorrect types arguments were passed")
        }
        ,
        m.removeNavkey = function(t) {
            delete this._navKeys[t]
        }
        ,
        m.destroy = function() {
            for (var t in l.destroy.call(this),
            this.stop(),
            this.el = null,
            this._options = null,
            this._selector = null,
            this.focusedNavItemIndex = null,
            this.selectedNavitemIndex = null,
            this._navItems = null,
            this._state = null,
            this.selectOption = null,
            this._handleKeyDown = null,
            this._navKeys)
                this._navKeys.hasOwnProperty(t) && this.removeNavkey(t);
            this._navKeys = null
        }
        ,
        e.exports = d
    }
    , {
        10: 10,
        12: 12,
        14: 14,
        34: 34,
        5: 5,
        6: 6,
        8: 8
    }],
    2: [function(t, e, i) {
        "use strict";
        var s = t(12)
          , r = t(15)
          , n = t(6)
          , a = t(5)
          , o = t(10)
          , l = t(8)
          , h = t(1)
          , c = h.prototype
          , u = function(t, e) {
            e = e || {},
            h.call(this, t, {
                selector: e.selector || "*[role=" + r.OPTION + "]",
                state: e.state || s.SELECTED
            })
        }
          , d = u.prototype = Object.create(c);
        d._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            l(e.getAttribute(this._state)) ? (this.focusedNavItemIndex = t,
            this.selectedNavitemIndex = t,
            this._enableElement(e)) : this._disableElement(e)
        }
        ,
        d.setSelectedItemByIndex = function(t, e) {
            isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]),
            c.setSelectedItemByIndex.call(this, t, e),
            this._enableElement(this._navItems[this.selectedNavitemIndex])
        }
        ,
        d.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (l(t.getAttribute(s.DISABLED)) || this._disableElement(t),
            this._navItems.push(t))
        }
        ,
        d._arrowDown = function(t, e) {
            c._arrowDown.call(this, t, e, !0),
            this.selectOption(e)
        }
        ,
        d._enableElement = function(t) {
            n(t),
            o(t, this._state, "true")
        }
        ,
        d._disableElement = function(t) {
            a(t),
            o(t, this._state, "false")
        }
        ,
        d.selectOption = function(t) {
            a(this._navItems[this.selectedNavitemIndex]),
            c.selectOption.call(this, t),
            n(this._navItems[this.focusedNavItemIndex])
        }
        ,
        e.exports = u
    }
    , {
        1: 1,
        10: 10,
        12: 12,
        15: 15,
        5: 5,
        6: 6,
        8: 8
    }],
    3: [function(t, e, i) {
        "use strict";
        function s() {
            this._createElemnts(),
            this._bindEvents()
        }
        var r = s.prototype;
        r._bindEvents = function() {
            this._onResize = this._resize.bind(this)
        }
        ,
        r._createElemnts = function() {
            this.span = document.createElement("span");
            var t = this.span.style;
            t.visibility = "hidden",
            t.position = "absolute",
            t.top = "0",
            t.bottom = "0",
            t.zIndex = "-1",
            this.span.innerHTML = "&nbsp;",
            this.iframe = document.createElement("iframe");
            var e = this.iframe.style;
            e.position = "absolute",
            e.top = "0",
            e.left = "0",
            e.width = "100%",
            e.height = "100%",
            this.span.appendChild(this.iframe),
            document.body.appendChild(this.span)
        }
        ,
        r.detect = function(t) {
            this.originalSize = t || 17,
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
            this.currentSize > this.originalSize && this._onResize(),
            this.isDetecting || (this.iframe.contentWindow.addEventListener("resize", this._onResize),
            this.isDetecting = !0)
        }
        ,
        r._resize = function(t) {
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]),
            this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"),
            window.dispatchEvent(new Event("resize"))
        }
        ,
        r.remove = function() {
            this.isDetecting && (this.iframe.contentWindow.removeEventListener("resize", this._onResize),
            this.isDetecting = !1)
        }
        ,
        r.destroy = function() {
            this.remove(),
            this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span),
            this.span = null,
            this.iframe = null
        }
        ,
        e.exports = new s
    }
    , {}],
    4: [function(t, e, i) {
        "use strict";
        var s = t(13)
          , r = function() {
            this.focusableSelectors = s.join(",")
        }
          , n = r.prototype;
        n.isFocusableElement = function(t, e, i) {
            if (e && !this._isDisplayed(t))
                return !1;
            var r = t.nodeName.toLowerCase()
              , n = s.indexOf(r) > -1;
            return "a" === r || (n ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")),
            !isNaN(i)))
        }
        ,
        n.isTabbableElement = function(t, e) {
            if (e && !this._isDisplayed(t))
                return !1;
            var i = t.getAttribute("tabindex");
            return i = parseFloat(i),
            isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
        }
        ,
        n._isDisplayed = function(t) {
            var e = t.getBoundingClientRect();
            return (0 !== e.top || 0 !== e.left || 0 !== e.width || 0 !== e.height) && "hidden" !== window.getComputedStyle(t).visibility
        }
        ,
        n.getTabbableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, r = [], n = 0; n < s; n++)
                this.isTabbableElement(i[n], e) && r.push(i[n]);
            return r
        }
        ,
        n.getFocusableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, r = [], n = 0; n < s; n++)
                this.isFocusableElement(i[n], e) && r.push(i[n]);
            return r
        }
        ,
        e.exports = new r
    }
    , {
        13: 13
    }],
    5: [function(t, e, i) {
        "use strict";
        var s = t(10);
        e.exports = function(t) {
            s(t, "tabindex", "-1")
        }
    }
    , {
        10: 10
    }],
    6: [function(t, e, i) {
        "use strict";
        var s = t(10)
          , r = t(4);
        e.exports = function(t) {
            var e = [].concat(t);
            (e = e.filter((function(t) {
                return !r.isTabbableElement(t)
            }
            ))).length > 0 && s(e, "tabindex", 0)
        }
    }
    , {
        10: 10,
        4: 4
    }],
    7: [function(t, e, i) {
        "use strict";
        var s = t(10)
          , r = t(12)
          , n = t(4)
          , a = function(t, e) {
            var i = t.getAttribute("data-original-" + e);
            i || (i = t.getAttribute(e) || "",
            s(t, "data-original-" + e, i))
        };
        e.exports = function(t, e) {
            if (n.isFocusableElement(t, e))
                a(t, "tabindex"),
                s(t, "tabindex", -1);
            else
                for (var i = n.getTabbableElements(t, e), o = i.length; o--; )
                    a(i[o], "tabindex"),
                    s(i[o], "tabindex", -1);
            a(t, r.HIDDEN),
            s(t, r.HIDDEN, !0)
        }
    }
    , {
        10: 10,
        12: 12,
        4: 4
    }],
    8: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "string" == typeof t ? "true" === (t = t.toLowerCase()) : t
        }
    }
    , {}],
    9: [function(t, e, i) {
        "use strict";
        var s = function(t, e) {
            if ("string" == typeof e)
                for (var i = e.split(/\s+/), s = 0; s < i.length; s++)
                    t.getAttribute(i[s]) && t.removeAttribute(i[s])
        };
        e.exports = function(t, e) {
            if (t.length)
                for (var i = 0; i < t.length; i++)
                    s(t[i], e);
            else
                s(t, e)
        }
    }
    , {}],
    10: [function(t, e, i) {
        "use strict";
        var s = function(t, e, i) {
            t && 1 === t.nodeType && t.setAttribute(e, i)
        };
        e.exports = function(t, e, i) {
            if ("string" != typeof i && (i = i.toString()),
            t)
                if (t.length)
                    for (var r = 0; r < t.length; r++)
                        s(t[r], e, i);
                else
                    s(t, e, i)
        }
    }
    , {}],
    11: [function(t, e, i) {
        "use strict";
        var s = t(9)
          , r = t(10)
          , n = t(12)
          , a = "data-original-"
          , o = function(t, e) {
            var i = t.getAttribute(a + e);
            "string" == typeof i && (i.length ? r(t, e, i) : s(t, e),
            s(t, a + e))
        };
        e.exports = function(t) {
            s(t, "tabindex " + n.HIDDEN),
            o(t, "tabindex"),
            o(t, n.HIDDEN);
            for (var e = t.querySelectorAll("[" + a + "tabindex]"), i = e.length; i--; )
                o(e[i], "tabindex")
        }
    }
    , {
        10: 10,
        12: 12,
        9: 9
    }],
    12: [function(t, e, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }
    , {}],
    13: [function(t, e, i) {
        "use strict";
        e.exports = ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "*[tabindex]", "*[contenteditable]"]
    }
    , {}],
    14: [function(t, e, i) {
        "use strict";
        e.exports = t(46)
    }
    , {
        46: 46
    }],
    15: [function(t, e, i) {
        "use strict";
        e.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search"
        }
    }
    , {}],
    16: [function(t, e, i) {
        "use strict";
        var s = !1
          , r = {};
        "undefined" != typeof window && (r = window || self);
        try {
            s = !!r.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
        } catch (t) {}
        e.exports = s
    }
    , {}],
    17: [function(t, e, i) {
        "use strict";
        var s = t(16);
        e.exports = function(t) {
            return function() {
                if (s && "object" == typeof window.console && "function" == typeof console[t])
                    return console[t].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }
    , {
        16: 16
    }],
    18: [function(t, e, i) {
        "use strict";
        e.exports = t(17)("log")
    }
    , {
        17: 17
    }],
    19: [function(t, e, i) {
        "use strict";
        e.exports = t(17)("warn")
    }
    , {
        17: 17
    }],
    20: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i;
            return e ? {
                width: (i = t.getBoundingClientRect()).width,
                height: i.height
            } : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        }
    }
    , {}],
    21: [function(t, e, i) {
        "use strict";
        var s = t(20)
          , r = t(22)
          , n = t(23);
        e.exports = function(t, e) {
            var i, a, o, l;
            if (e)
                return i = t.getBoundingClientRect(),
                a = r(),
                o = n(),
                {
                    top: i.top + o,
                    right: i.right + a,
                    bottom: i.bottom + o,
                    left: i.left + a
                };
            for (l = s(t, e),
            i = {
                top: t.offsetTop,
                left: t.offsetLeft,
                width: l.width,
                height: l.height
            }; t = t.offsetParent; )
                i.top += t.offsetTop,
                i.left += t.offsetLeft;
            return {
                top: i.top,
                right: i.left + i.width,
                bottom: i.top + i.height,
                left: i.left
            }
        }
    }
    , {
        20: 20,
        22: 22,
        23: 23
    }],
    22: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return (t = t || window) === window ? window.scrollX || window.pageXOffset : t.scrollLeft
        }
    }
    , {}],
    23: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return (t = t || window) === window ? window.scrollY || window.pageYOffset : t.scrollTop
        }
    }
    , {}],
    24: [function(t, e, i) {
        "use strict";
        e.exports = 1
    }
    , {}],
    25: [function(t, e, i) {
        "use strict";
        var s = t(27);
        e.exports = function(t, e) {
            return !!s(t) && ("number" == typeof e ? t.nodeType === e : -1 !== e.indexOf(t.nodeType))
        }
    }
    , {
        27: 27
    }],
    26: [function(t, e, i) {
        "use strict";
        var s = t(25)
          , r = t(24);
        e.exports = function(t) {
            return s(t, r)
        }
    }
    , {
        24: 24,
        25: 25
    }],
    27: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return !(!t || !t.nodeType)
        }
    }
    , {}],
    28: [function(t, e, i) {
        "use strict";
        var s = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        e.exports = function(t) {
            return !!t && ("number" == typeof t.length && (!!("object" != typeof t[0] || t[0] && t[0].nodeType) && s.test(Object.prototype.toString.call(t))))
        }
    }
    , {}],
    29: [function(t, e, i) {
        "use strict";
        var s = t(30);
        e.exports = new s,
        e.exports.ElementEngagement = s
    }
    , {
        30: 30
    }],
    30: [function(t, e, i) {
        "use strict";
        var s, r = t(34).EventEmitterMicro, n = {
            defaults: t(48),
            extend: t(49)
        }, a = t(31).ElementTracker, o = {
            timeToEngage: 500,
            inViewThreshold: .75,
            stopOnEngaged: !0
        }, l = {
            thresholdEnterTime: 0,
            thresholdExitTime: 0,
            inThreshold: !1,
            engaged: !1,
            tracking: !0
        }, h = function(t) {
            a.call(this, null, t),
            r.call(this),
            this._thresholdEnter = this._thresholdEnter.bind(this),
            this._thresholdExit = this._thresholdExit.bind(this),
            this._enterView = this._enterView.bind(this),
            this._exitView = this._exitView.bind(this)
        };
        s = h.prototype = Object.create(a.prototype),
        (s = n.extend(s, r.prototype))._decorateTrackedElement = function(t, e) {
            var i;
            i = n.defaults(o, e || {}),
            n.extend(t, i),
            n.extend(t, l)
        }
        ,
        s._attachElementListeners = function(t) {
            t.on("thresholdenter", this._thresholdEnter, this),
            t.on("thresholdexit", this._thresholdExit, this),
            t.on("enterview", this._enterView, this),
            t.on("exitview", this._exitView, this)
        }
        ,
        s._removeElementListeners = function(t) {
            t.off("thresholdenter", this._thresholdEnter),
            t.off("thresholdexit", this._thresholdExit),
            t.off("enterview", this._enterView),
            t.off("exitview", this._exitView)
        }
        ,
        s._attachAllElementListeners = function() {
            this.elements.forEach((function(t) {
                t.stopOnEngaged && t.engaged || this._attachElementListeners(t)
            }
            ), this)
        }
        ,
        s._removeAllElementListeners = function() {
            this.elements.forEach((function(t) {
                this._removeElementListeners(t)
            }
            ), this)
        }
        ,
        s._elementInViewPastThreshold = function(t) {
            return t.pixelsInView === this._windowHeight || t.percentInView > t.inViewThreshold
        }
        ,
        s._ifInView = function(t, e) {
            var i = t.inThreshold;
            a.prototype._ifInView.apply(this, arguments),
            !i && this._elementInViewPastThreshold(t) && (t.inThreshold = !0,
            t.trigger("thresholdenter", t),
            "number" == typeof t.timeToEngage && t.timeToEngage >= 0 && (t.engagedTimeout = window.setTimeout(this._engaged.bind(this, t), t.timeToEngage)))
        }
        ,
        s._ifAlreadyInView = function(t) {
            var e = t.inThreshold;
            a.prototype._ifAlreadyInView.apply(this, arguments),
            e && !this._elementInViewPastThreshold(t) && (t.inThreshold = !1,
            t.trigger("thresholdexit", t),
            t.engagedTimeout && (window.clearTimeout(t.engagedTimeout),
            t.engagedTimeout = null))
        }
        ,
        s._engaged = function(t) {
            t.engagedTimeout = null,
            this._elementEngaged(t),
            t.trigger("engaged", t),
            this.trigger("engaged", t)
        }
        ,
        s._thresholdEnter = function(t) {
            t.thresholdEnterTime = Date.now(),
            t.thresholdExitTime = 0,
            this.trigger("thresholdenter", t)
        }
        ,
        s._thresholdExit = function(t) {
            t.thresholdExitTime = Date.now(),
            this.trigger("thresholdexit", t)
        }
        ,
        s._enterView = function(t) {
            this.trigger("enterview", t)
        }
        ,
        s._exitView = function(t) {
            this.trigger("exitview", t)
        }
        ,
        s._elementEngaged = function(t) {
            t.engaged = !0,
            t.stopOnEngaged && this.stop(t)
        }
        ,
        s.stop = function(t) {
            this.tracking && !t && (this._removeAllElementListeners(),
            a.prototype.stop.call(this)),
            t && t.tracking && (t.tracking = !1,
            this._removeElementListeners(t),
            this.removeElement(t))
        }
        ,
        s.start = function(t) {
            t || this._attachAllElementListeners(),
            t && !t.tracking && (t.stopOnEngaged && t.engaged || (t.tracking = !0,
            this._attachElementListeners(t))),
            this.tracking ? (this.refreshAllElementMetrics(),
            this.refreshAllElementStates()) : a.prototype.start.call(this)
        }
        ,
        s.addElement = function(t, e) {
            e = e || {};
            var i = a.prototype.addElement.call(this, t, e.useRenderedPosition);
            return this._decorateTrackedElement(i, e),
            i
        }
        ,
        s.addElements = function(t, e) {
            [].forEach.call(t, (function(t) {
                this.addElement(t, e)
            }
            ), this)
        }
        ,
        e.exports = h
    }
    , {
        31: 31,
        34: 34,
        48: 48,
        49: 49
    }],
    31: [function(t, e, i) {
        "use strict";
        var s = t(32)
          , r = t(33);
        e.exports = new s,
        e.exports.ElementTracker = s,
        e.exports.TrackedElement = r
    }
    , {
        32: 32,
        33: 33
    }],
    32: [function(t, e, i) {
        "use strict";
        var s = {
            isNodeList: t(28),
            isElement: t(26)
        }
          , r = {
            getDimensions: t(20),
            getPagePosition: t(21),
            getScrollY: t(23)
        }
          , n = {
            clone: t(47),
            extend: t(49)
        }
          , a = t(33)
          , o = {
            autoStart: !1,
            useRenderedPosition: !1
        };
        function l(t, e) {
            this.options = n.clone(o),
            this.options = "object" == typeof e ? n.extend(this.options, e) : this.options,
            this._scrollY = this._getScrollY(),
            this._windowHeight = this._getWindowHeight(),
            this.tracking = !1,
            this.elements = [],
            t && (Array.isArray(t) || s.isNodeList(t) || s.isElement(t)) && this.addElements(t),
            this.refreshAllElementStates = this.refreshAllElementStates.bind(this),
            this.refreshAllElementMetrics = this.refreshAllElementMetrics.bind(this),
            this.options.autoStart && this.start()
        }
        var h = l.prototype;
        h.destroy = function() {
            var t, e;
            for (this.stop(),
            t = 0,
            e = this.elements.length; t < e; t++)
                this.elements[t].destroy();
            this.elements = null,
            this.options = null
        }
        ,
        h._registerTrackedElements = function(t) {
            [].concat(t).forEach((function(t) {
                this._elementInDOM(t.element) && (t.offsetTop = t.element.offsetTop,
                this.elements.push(t))
            }
            ), this)
        }
        ,
        h._elementInDOM = function(t) {
            var e = !1
              , i = document.getElementsByTagName("body")[0];
            return s.isElement(t) && i.contains(t) && (e = !0),
            e
        }
        ,
        h._elementPercentInView = function(t) {
            return t.pixelsInView / t.height
        }
        ,
        h._elementPixelsInView = function(t) {
            var e = t.top - this._scrollY
              , i = t.bottom - this._scrollY;
            return e > this._windowHeight || i < 0 ? 0 : Math.min(i, this._windowHeight) - Math.max(e, 0)
        }
        ,
        h._ifInView = function(t, e) {
            e || t.trigger("enterview", t)
        }
        ,
        h._ifAlreadyInView = function(t) {
            t.inView || t.trigger("exitview", t)
        }
        ,
        h.addElements = function(t, e) {
            void 0 === e && (e = this.options.useRenderedPosition);
            for (var i = 0, r = (t = s.isNodeList(t) ? Array.prototype.slice.call(t) : [].concat(t)).length; i < r; i++)
                this.addElement(t[i], e)
        }
        ,
        h.addElement = function(t, e) {
            var i = null;
            if (void 0 === e && (e = this.options.useRenderedPosition),
            !s.isElement(t))
                throw new TypeError("ElementTracker: " + t + " is not a valid DOM element");
            return i = new a(t,e),
            this._registerTrackedElements(i),
            this.refreshElementMetrics(i),
            this.refreshElementState(i),
            i
        }
        ,
        h.removeElement = function(t) {
            var e, i = [];
            this.elements.forEach((function(e, s) {
                e !== t && e.element !== t || i.push(s)
            }
            )),
            e = this.elements.filter((function(t, e) {
                return i.indexOf(e) < 0
            }
            )),
            this.elements = e
        }
        ,
        h.start = function() {
            !1 === this.tracking && (this.tracking = !0,
            window.addEventListener("resize", this.refreshAllElementMetrics),
            window.addEventListener("orientationchange", this.refreshAllElementMetrics),
            window.addEventListener("scroll", this.refreshAllElementStates),
            this.refreshAllElementMetrics())
        }
        ,
        h.stop = function() {
            !0 === this.tracking && (this.tracking = !1,
            window.removeEventListener("resize", this.refreshAllElementMetrics),
            window.removeEventListener("orientationchange", this.refreshAllElementMetrics),
            window.removeEventListener("scroll", this.refreshAllElementStates))
        }
        ,
        h.refreshAllElementMetrics = function(t, e) {
            "number" != typeof t && (t = this._getScrollY()),
            "number" != typeof e && (e = this._getWindowHeight()),
            this._scrollY = t,
            this._windowHeight = e,
            this.elements.forEach(this.refreshElementMetrics, this)
        }
        ,
        h.refreshElementMetrics = function(t) {
            if (!t.isActive)
                return t;
            var e = r.getDimensions(t.element, t.useRenderedPosition)
              , i = r.getPagePosition(t.element, t.useRenderedPosition);
            return t = n.extend(t, e, i),
            this.refreshElementState(t)
        }
        ,
        h.refreshAllElementStates = function(t) {
            "number" != typeof t && (t = this._getScrollY()),
            this._scrollY = t,
            this.elements.forEach(this.refreshElementState, this)
        }
        ,
        h.refreshElementState = function(t) {
            if (!t.isActive)
                return t;
            var e = t.inView;
            return t.pixelsInView = this._elementPixelsInView(t),
            t.percentInView = this._elementPercentInView(t),
            t.inView = t.pixelsInView > 0,
            t.inView && this._ifInView(t, e),
            e && this._ifAlreadyInView(t),
            t
        }
        ,
        h.pauseElementTracking = function(t) {
            t && (t.isActive = !1)
        }
        ,
        h.resumeElementTracking = function(t) {
            t && (t.isActive = !0)
        }
        ,
        h._getWindowHeight = function() {
            return window.innerHeight
        }
        ,
        h._getScrollY = function() {
            return r.getScrollY()
        }
        ,
        e.exports = l
    }
    , {
        20: 20,
        21: 21,
        23: 23,
        26: 26,
        28: 28,
        33: 33,
        47: 47,
        49: 49
    }],
    33: [function(t, e, i) {
        "use strict";
        var s = {
            isElement: t(26)
        }
          , r = t(34).EventEmitterMicro
          , n = r.prototype;
        function a(t, e) {
            if (!s.isElement(t))
                throw new TypeError("TrackedElement: " + t + " is not a valid DOM element");
            r.call(this),
            this.element = t,
            this.inView = !1,
            this.isActive = !0,
            this.percentInView = 0,
            this.pixelsInView = 0,
            this.offsetTop = 0,
            this.top = 0,
            this.right = 0,
            this.bottom = 0,
            this.left = 0,
            this.width = 0,
            this.height = 0,
            this.useRenderedPosition = e || !1
        }
        (a.prototype = Object.create(n)).destroy = function() {
            this.element = null,
            n.destroy.call(this)
        }
        ,
        e.exports = a
    }
    , {
        26: 26,
        34: 34
    }],
    34: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t(35)
        }
    }
    , {
        35: 35
    }],
    35: [function(t, e, i) {
        "use strict";
        function s() {
            this._events = {}
        }
        var r = s.prototype;
        r.on = function(t, e) {
            this._events[t] = this._events[t] || [],
            this._events[t].unshift(e)
        }
        ,
        r.once = function(t, e) {
            var i = this;
            this.on(t, (function s(r) {
                i.off(t, s),
                void 0 !== r ? e(r) : e()
            }
            ))
        }
        ,
        r.off = function(t, e) {
            if (this.has(t)) {
                if (1 === arguments.length)
                    return this._events[t] = null,
                    void delete this._events[t];
                var i = this._events[t].indexOf(e);
                -1 !== i && this._events[t].splice(i, 1)
            }
        }
        ,
        r.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--)
                    void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }
        ,
        r.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }
        ,
        r.destroy = function() {
            for (var t in this._events)
                this._events[t] = null;
            this._events = null
        }
        ,
        e.exports = s
    }
    , {}],
    36: [function(t, e, i) {
        e.exports = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    }
    , {}],
    37: [function(t, e, i) {
        var s = t(38);
        function r() {
            if ("function" != typeof WeakMap)
                return null;
            var t = new WeakMap;
            return r = function() {
                return t
            }
            ,
            t
        }
        e.exports = function(t) {
            if (t && t.__esModule)
                return t;
            if (null === t || "object" !== s(t) && "function" != typeof t)
                return {
                    default: t
                };
            var e = r();
            if (e && e.has(t))
                return e.get(t);
            var i = {}
              , n = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in t)
                if (Object.prototype.hasOwnProperty.call(t, a)) {
                    var o = n ? Object.getOwnPropertyDescriptor(t, a) : null;
                    o && (o.get || o.set) ? Object.defineProperty(i, a, o) : i[a] = t[a]
                }
            return i.default = t,
            e && e.set(t, i),
            i
        }
    }
    , {
        38: 38
    }],
    38: [function(t, e, i) {
        function s(t) {
            return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = s = function(t) {
                return typeof t
            }
            : e.exports = s = function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            s(t)
        }
        e.exports = s
    }
    , {}],
    39: [function(t, e, i) {}
    , {}],
    40: [function(t, e, i) {
        "use strict";
        const s = t(75)
          , r = t(82)
          , n = t(72);
        r.BREAKPOINTS = [{
            name: "S",
            mediaQuery: "only screen and (max-width: 734px)"
        }, {
            name: "M",
            mediaQuery: "only screen and (max-width: 1068px)"
        }, {
            name: "L",
            mediaQuery: "only screen and (min-width: 1441px)"
        }, {
            name: "L",
            mediaQuery: "only screen and (min-width: 1069px)"
        }];
        new (t(44));
        var a = null;
        try {
            a = t("@marcom/ac-analytics")
        } catch (t) {}
        var o = t(45);
        function l(t, e, i, s, r) {
            Array.from(t.querySelectorAll("a")).forEach((function(i, n) {
                var o = 1 === r ? 0 : s
                  , l = i.getAttribute("data-analytics-title") || i.getAttribute("aria-label") || i.innerText;
                if (!/\w/.test(l)) {
                    var h = t.getAttribute("data-module-template")
                      , c = t.getAttribute("data-unit-id");
                    if (c) {
                        for (var u = t.parentNode; !h; )
                            h = u.getAttribute("data-module-template"),
                            u = u.parentNode;
                        l = h + " " + c
                    } else
                        l = h;
                    /\w/.test(i.className) && (l += " " + i.className)
                }
                l = l.split("’").join("").split(/[^\w]+/).join(" ").toLowerCase();
                var d = {
                    eVar102: e + "." + o + ":" + l,
                    eVar103: "abcdefghijklmnopqrstuvwxyz".charAt(s - 1)
                };
                i.addEventListener("mouseup", (function() {
                    a.passiveTracker(d)
                }
                ))
            }
            ))
        }
        e.exports = function() {
            !function() {
                const t = document.querySelector("div.adv-wrapper");
                t && t.offsetHeight > 0 && document.body.style.setProperty("--global-nav-ad-bar-height", t.offsetHeight + "px", "important")
            }();
            var t = [];
            s.on("ON_DOM_KEYFRAMES_CREATED", ()=>{
                new n,
                [].forEach.call(document.querySelectorAll("[data-module-template]"), (function(e, i) {
                    var r = e.getAttribute("data-module-template")
                      , n = o[r].SectionClass
                      , a = o[r].collectionUnits;
                    t.push(new n(e,i,a,s))
                }
                ))
            }
            ),
            s.initialize(),
            a && function() {
                var t;
                t = 0,
                Array.from(document.querySelectorAll("[data-module-template]")).forEach((function(e, i) {
                    var s = parseInt(window.getComputedStyle(e).getPropertyValue("--columns-for-analytics-only"));
                    if (!isNaN(s)) {
                        var r = Array.from(e.querySelectorAll("[data-unit-id]"));
                        if (r && r.length > 0) {
                            var n = 0;
                            r.forEach((function(e, i) {
                                var r = i + 1;
                                n = Math.ceil(r / s),
                                l(e, t + n, 0, r - (n - 1) * s, s)
                            }
                            )),
                            t += n
                        } else
                            t++,
                            l(e, t + 0, 0, 1, s)
                    }
                }
                ));
                var e = {
                    page: {
                        data: {}
                    }
                }
                  , i = function() {
                    var t, e, i, s = document.querySelector("meta[property=analytics-track]");
                    if (s && s.content && (i = document.querySelector("[data-module-template]")) && (t = i.querySelector("[data-analytics-section-engagement]")) && t.hasAttribute("data-analytics-section-engagement") && (e = t.getAttribute("data-analytics-section-engagement").split(":")[1]))
                        return "0. " + s.content.toLowerCase() + " - " + e + " - section engaged .0"
                }();
                i && (e.page.data.prop34 = i),
                a.createBasicObserverSuite(e)
            }()
        }
    }
    , {
        44: 44,
        45: 45,
        72: 72,
        75: 75,
        82: 82,
        undefined: void 0
    }],
    41: [function(t, e, i) {
        "use strict";
        var s = t(42)
          , r = s.prototype;
        function n(t, e, i) {
            s.apply(this, arguments)
        }
        (n.prototype = Object.create(r)).destroy = function() {
            r.destroy.call(this)
        }
        ,
        e.exports = n
    }
    , {
        42: 42
    }],
    42: [function(t, e, i) {
        "use strict";
        var s = t(34).EventEmitterMicro
          , r = s.prototype
          , n = t(29).ElementEngagement
          , a = t(43);
        function o(e, i, r, a) {
            s.apply(this),
            this.sectionElement = e,
            this.sectionIndex = i,
            this.moduleTemplateName = e.getAttribute("data-module-template"),
            this.viewportEmitter = t(167),
            this.AnimSystem = a,
            this.sectionAnalyticsRegion = e.getAttribute("data-analytics-region"),
            this.collectionUnits = this.sectionElement.querySelectorAll("[data-unit-id]"),
            this.elementEngagement = new n,
            this.elementEngagement.start(),
            this.collectionUnitObjs = {},
            this._setDebouncedResizeEvents(500),
            this.initContentUnitClasses(r)
        }
        var l = o.prototype = Object.create(r);
        l.initContentUnitClasses = function(t) {
            Array.from(this.collectionUnits).forEach(function(e) {
                var i = e.getAttribute("data-unit-id")
                  , s = t[i] ? t[i] : a;
                this.collectionUnitObjs[i] = new s(e,i,this)
            }
            .bind(this))
        }
        ,
        l.destroy = function() {
            r.destroy.call(this)
        }
        ,
        l.addWrapperClass = function(t) {
            this.sectionElement.classList.add(t)
        }
        ,
        l.removeWrapperClass = function(t) {
            this.sectionElement.classList.remove(t)
        }
        ,
        l._setDebouncedResizeEvents = function(t) {
            var e = !1;
            window.addEventListener("resize", function() {
                clearTimeout(this._checkResizeEndTimer),
                e || (this.trigger("resize:start"),
                e = !0),
                this._checkResizeEndTimer = setTimeout(function() {
                    e && (e = !1,
                    this.trigger("resize:end"))
                }
                .bind(this), t)
            }
            .bind(this))
        }
        ,
        e.exports = o
    }
    , {
        167: 167,
        29: 29,
        34: 34,
        43: 43
    }],
    43: [function(t, e, i) {
        "use strict";
        var s = t(34).EventEmitterMicro
          , r = s.prototype;
        function n(t, e, i) {
            s.apply(this),
            this.collectionUnitElement = t,
            this.unitWrapperElement = this.collectionUnitElement.querySelector(".unit-wrapper"),
            this.id = e,
            this.sectionObj = i,
            this.AnimSystem = i.AnimSystem,
            this.handleLinkAccessibilityConcerns()
        }
        var a = n.prototype = Object.create(r);
        a.setVoiceoverCopy = function() {
            if (this.unitWrapperElement) {
                var t = /^\s*$/
                  , e = this.unitWrapperElement.querySelector("a.unit-link")
                  , i = e.querySelector(".unit-link-vo");
                if (e && i) {
                    var s = i.textContent
                      , r = t.test(s);
                    Array.from(this.unitWrapperElement.querySelectorAll(".unit-copy-wrapper>*:not(a)")).forEach((function(e) {
                        if (r) {
                            var i = e.innerText && "" != e.innerText ? e.innerText : e.textContent;
                            if (i = i.replace(/[\r\n]/g, " "),
                            t.test(i))
                                return;
                            /[a-z0-9]\s*$/i.test(i) && (i += "."),
                            s += i.split(/\.$/).join(". ")
                        }
                        e.setAttribute("aria-hidden", !0)
                    }
                    )),
                    r && (e.setAttribute("aria-label", s),
                    i.innerHTML = s)
                }
            }
        }
        ,
        a.handleLinkAccessibilityConcerns = function() {
            if (this.unitWrapperElement) {
                let i = this.unitWrapperElement.querySelector("a.unit-link")
                  , s = i ? i.href : null
                  , r = i ? i.getAttribute("aria-label") : null
                  , n = this.unitWrapperElement.querySelectorAll(".cta-links a")
                  , a = function() {
                    let t = [];
                    return n.forEach((e,i)=>{
                        t.push(e.href)
                    }
                    ),
                    t
                }()
                  , o = s && a.indexOf(s) >= 0
                  , l = !r || !/\w/.test(r);
                if (s)
                    if (o)
                        i.removeAttribute("aria-label"),
                        i.setAttribute("aria-hidden", "true"),
                        i.setAttribute("tabindex", "-1");
                    else if (l) {
                        var t = this.unitWrapperElement.querySelector(".unit-copy-wrapper>*:not(a)")
                          , e = t.innerText && "" != t.innerText ? t.innerText : t.textContent;
                        i.setAttribute("aria-label", e)
                    }
            }
        }
        ,
        a.destroy = function() {
            r.destroy.call(this)
        }
        ,
        e.exports = n
    }
    , {
        34: 34
    }],
    44: [function(t, e, i) {
        "use strict";
        t(36)(t(165));
        var s = t(51)
          , r = t(34);
        const n = t(3)
          , a = [1.2, 1.44, 1.72, 2.07, 2.48, 2.98];
        class o extends r.EventEmitterMicro {
            constructor(t=17, e=a) {
                super(),
                this.baseFontSize = t,
                this.fontSizeDeltas = e,
                n.detect(this.baseFontSize),
                this._cachedTextZoomDeltaFloat = 1,
                this._cachedTextZoomFactor = 0,
                this._rafEmitter = new s.RAFEmitter,
                this._htmlElement = document.querySelector("html"),
                this._listenForChanges(),
                this._checkForTextZoomChange()
            }
            _listenForChanges() {
                window.addEventListener("resize", t=>{
                    this._checkForTextZoomChange()
                }
                )
            }
            _checkForTextZoomChange() {
                var t = 4;
                this._rafEmitter.on("update", ()=>{
                    t--;
                    const e = this.getTextZoomDeltaAsFloat();
                    e != this._cachedTextZoomDeltaFloat ? (this._cachedTextZoomDeltaFloat = e,
                    this._cachedTextZoomDeltaFactor = this.getTextZoomAsFactor(),
                    this._setTextZoomDataAttribute(),
                    this.trigger("textZoomChange", {
                        zoomAsFloat: this._cachedTextZoomDeltaFloat,
                        zoomAsFactor: this._cachedTextZoomDeltaFactor
                    })) : t > 0 && this._rafEmitter.run()
                }
                ),
                this._rafEmitter.run()
            }
            _setTextZoomDataAttribute() {
                this._rafEmitter.on("draw", ()=>{
                    const t = this._cachedTextZoomDeltaFactor > 0 ? "setAttribute" : "removeAttribute";
                    this._htmlElement[t]("data-text-zoom", this._cachedTextZoomDeltaFactor)
                }
                )
            }
            getTextZoomAsFactor() {
                let t = 0;
                const e = this.getTextZoomDeltaAsFloat();
                return this.fontSizeDeltas.forEach(i=>{
                    e > i && t++
                }
                ),
                t
            }
            getTextZoomDeltaAsFloat() {
                return parseFloat(n.currentSize) / this.baseFontSize
            }
        }
        e.exports = o
    }
    , {
        165: 165,
        3: 3,
        34: 34,
        36: 36,
        51: 51
    }],
    45: [function(t, e, i) {
        "use strict";
        e.exports = {
            generic: {
                SectionClass: t(41),
                collectionUnits: t(179)
            },
            heroes: {
                SectionClass: t(41),
                collectionUnits: t(180)
            },
            promos: {
                SectionClass: t(41),
                collectionUnits: t(181)
            },
            ribbon: {
                SectionClass: t(41),
                collectionUnits: t(182)
            },
            "tv-plus-gallery": {
                SectionClass: t(176),
                collectionUnits: t(183)
            }
        }
    }
    , {
        176: 176,
        179: 179,
        180: 180,
        181: 181,
        182: 182,
        183: 183,
        41: 41
    }],
    46: [function(t, e, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }
    , {}],
    47: [function(t, e, i) {
        "use strict";
        t(39);
        var s = t(49)
          , r = Object.prototype.hasOwnProperty;
        e.exports = function(t, e) {
            return e ? function t(e, i) {
                var s;
                for (s in i)
                    r.call(i, s) && (null === i[s] ? e[s] = null : "object" == typeof i[s] ? (e[s] = Array.isArray(i[s]) ? [] : {},
                    t(e[s], i[s])) : e[s] = i[s]);
                return e
            }({}, t) : s({}, t)
        }
    }
    , {
        39: 39,
        49: 49
    }],
    48: [function(t, e, i) {
        "use strict";
        var s = t(49);
        e.exports = function(t, e) {
            if ("object" != typeof t)
                throw new TypeError("defaults: must provide a defaults object");
            if ("object" != typeof (e = e || {}))
                throw new TypeError("defaults: options must be a typeof object");
            return s({}, t, e)
        }
    }
    , {
        49: 49
    }],
    49: [function(t, e, i) {
        "use strict";
        t(39);
        var s = Object.prototype.hasOwnProperty;
        e.exports = function() {
            var t, e;
            return t = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments),
            e = t.shift(),
            t.forEach((function(t) {
                if (null != t)
                    for (var i in t)
                        s.call(t, i) && (e[i] = t[i])
            }
            )),
            e
        }
    }
    , {
        39: 39
    }],
    50: [function(t, e, i) {
        "use strict";
        e.exports = {
            majorVersionNumber: "3.x"
        }
    }
    , {}],
    51: [function(t, e, i) {
        "use strict";
        e.exports = {
            RAFEmitter: t(52),
            ThrottledRAFEmitter: t(57),
            update: t(65),
            external: t(62),
            draw: t(61),
            cancelUpdate: t(60),
            cancelExternal: t(59),
            cancelDraw: t(58),
            RAFExecutor: t(53),
            sharedRAFExecutorInstance: t(64)
        }
    }
    , {
        52: 52,
        53: 53,
        57: 57,
        58: 58,
        59: 59,
        60: 60,
        61: 61,
        62: 62,
        64: 64,
        65: 65
    }],
    52: [function(t, e, i) {
        "use strict";
        var s, r = t(34).EventEmitterMicro, n = t(64), a = t(63);
        function o(t) {
            t = t || {},
            r.call(this),
            this.id = a.getNewID(),
            this.executor = t.executor || n,
            this._reset(),
            this._willRun = !1,
            this._didDestroy = !1
        }
        (s = o.prototype = Object.create(r.prototype)).run = function() {
            return this._willRun || (this._willRun = !0),
            this._subscribe()
        }
        ,
        s.cancel = function() {
            this._unsubscribe(),
            this._willRun && (this._willRun = !1),
            this._reset()
        }
        ,
        s.destroy = function() {
            var t = this.willRun();
            return this.cancel(),
            this.executor = null,
            r.prototype.destroy.call(this),
            this._didDestroy = !0,
            t
        }
        ,
        s.willRun = function() {
            return this._willRun
        }
        ,
        s.isRunning = function() {
            return this._isRunning
        }
        ,
        s._subscribe = function() {
            return this.executor.subscribe(this)
        }
        ,
        s._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }
        ,
        s._onAnimationFrameStart = function(t) {
            this._isRunning = !0,
            this._willRun = !1,
            this._didEmitFrameData || (this._didEmitFrameData = !0,
            this.trigger("start", t))
        }
        ,
        s._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t),
            this._reset())
        }
        ,
        s._reset = function() {
            this._didEmitFrameData = !1,
            this._isRunning = !1
        }
        ,
        e.exports = o
    }
    , {
        34: 34,
        63: 63,
        64: 64
    }],
    53: [function(t, e, i) {
        "use strict";
        var s, r = t(35);
        function n(t) {
            t = t || {},
            this._reset(),
            this.updatePhases(),
            this.eventEmitter = new r,
            this._willRun = !1,
            this._totalSubscribeCount = -1;
            var e = null
              , i = null;
            "undefined" != typeof window ? (e = window.requestAnimationFrame,
            i = window.cancelAnimationFrame) : e = i = function() {}
            ,
            this._requestAnimationFrame = e,
            this._cancelAnimationFrame = i,
            this._boundOnAnimationFrame = this._onAnimationFrame.bind(this),
            this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        (s = n.prototype).frameRequestedPhase = "requested",
        s.startPhase = "start",
        s.runPhases = ["update", "external", "draw"],
        s.endPhase = "end",
        s.disabledPhase = "disabled",
        s.beforePhaseEventPrefix = "before:",
        s.afterPhaseEventPrefix = "after:",
        s.subscribe = function(t, e) {
            return this._totalSubscribeCount++,
            this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id),
            this._nextFrameSubscribers[t.id] = t,
            this._nextFrameSubscriberArrayLength++,
            this._nextFrameSubscriberCount++,
            this._run()),
            this._totalSubscribeCount
        }
        ,
        s.subscribeImmediate = function(t, e) {
            return this._totalSubscribeCount++,
            this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id),
            this._subscribers[t.id] = t,
            this._subscriberArrayLength++,
            this._subscriberCount++),
            this._totalSubscribeCount
        }
        ,
        s.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null,
            this._nextFrameSubscriberCount--,
            0 === this._nextFrameSubscriberCount && this._cancel(),
            !0)
        }
        ,
        s.getSubscribeID = function() {
            return this._totalSubscribeCount += 1
        }
        ,
        s.destroy = function() {
            var t = this._cancel();
            return this.eventEmitter.destroy(),
            this.eventEmitter = null,
            this.phases = null,
            this._subscribers = null,
            this._subscribersOrder = null,
            this._nextFrameSubscribers = null,
            this._nextFrameSubscribersOrder = null,
            this._rafData = null,
            this._boundOnAnimationFrame = null,
            this._onExternalAnimationFrame = null,
            t
        }
        ,
        s.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
                this._animationFrame = null),
                !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                this._isUsingExternalAnimationFrame = t,
                t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }
        ,
        s.updatePhases = function() {
            this.phases || (this.phases = []),
            this.phases.length = 0,
            this.phases.push(this.frameRequestedPhase),
            this.phases.push(this.startPhase),
            Array.prototype.push.apply(this.phases, this.runPhases),
            this.phases.push(this.endPhase),
            this._runPhasesLength = this.runPhases.length,
            this._phasesLength = this.phases.length
        }
        ,
        s._run = function() {
            if (!this._willRun)
                return this._willRun = !0,
                0 === this.lastFrameTime && (this.lastFrameTime = performance.now()),
                this._animationFrameActive = !0,
                this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)),
                this.phase === this.disabledPhase && (this.phaseIndex = 0,
                this.phase = this.phases[this.phaseIndex]),
                !0
        }
        ,
        s._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame),
            this._animationFrame = null),
            this._animationFrameActive = !1,
            this._willRun = !1,
            t = !0),
            this._isRunning || this._reset(),
            t
        }
        ,
        s._onAnimationFrame = function(t) {
            for (this._subscribers = this._nextFrameSubscribers,
            this._subscribersOrder = this._nextFrameSubscribersOrder,
            this._subscriberArrayLength = this._nextFrameSubscriberArrayLength,
            this._subscriberCount = this._nextFrameSubscriberCount,
            this._nextFrameSubscribers = {},
            this._nextFrameSubscribersOrder = [],
            this._nextFrameSubscriberArrayLength = 0,
            this._nextFrameSubscriberCount = 0,
            this.phaseIndex = 0,
            this.phase = this.phases[this.phaseIndex],
            this._isRunning = !0,
            this._willRun = !1,
            this._didRequestNextRAF = !1,
            this._rafData.delta = t - this.lastFrameTime,
            this.lastFrameTime = t,
            this._rafData.fps = 0,
            this._rafData.delta >= 1e3 && (this._rafData.delta = 0),
            0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta),
            this._rafData.time = t,
            this._rafData.naturalFps = this._rafData.fps,
            this._rafData.timeNow = Date.now(),
            this.phaseIndex++,
            this.phase = this.phases[this.phaseIndex],
            this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
            this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++,
                this.phase = this.phases[this.phaseIndex],
                this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
                this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                    null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++,
            this.phase = this.phases[this.phaseIndex],
            this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase),
            this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++)
                null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase),
            this._willRun ? (this.phaseIndex = 0,
            this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }
        ,
        s._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }
        ,
        s._reset = function() {
            this._rafData || (this._rafData = {}),
            this._rafData.time = 0,
            this._rafData.delta = 0,
            this._rafData.fps = 0,
            this._rafData.naturalFps = 0,
            this._rafData.timeNow = 0,
            this._subscribers = {},
            this._subscribersOrder = [],
            this._currentSubscriberIndex = -1,
            this._subscriberArrayLength = 0,
            this._subscriberCount = 0,
            this._nextFrameSubscribers = {},
            this._nextFrameSubscribersOrder = [],
            this._nextFrameSubscriberArrayLength = 0,
            this._nextFrameSubscriberCount = 0,
            this._didEmitFrameData = !1,
            this._animationFrame = null,
            this._animationFrameActive = !1,
            this._isRunning = !1,
            this._shouldReset = !1,
            this.lastFrameTime = 0,
            this._runPhaseIndex = -1,
            this.phaseIndex = -1,
            this.phase = this.disabledPhase
        }
        ,
        e.exports = n
    }
    , {
        35: 35
    }],
    54: [function(t, e, i) {
        "use strict";
        var s = t(56)
          , r = function(t) {
            this.phase = t,
            this.rafEmitter = new s,
            this._cachePhaseIndex(),
            this.requestAnimationFrame = this.requestAnimationFrame.bind(this),
            this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this),
            this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this),
            this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this),
            this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this),
            this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)),
            this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart),
            this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase),
            this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase),
            this._frameCallbacks = [],
            this._currentFrameCallbacks = [],
            this._nextFrameCallbacks = [],
            this._phaseActive = !1,
            this._currentFrameID = -1,
            this._cancelFrameIdx = -1,
            this._frameCallbackLength = 0,
            this._currentFrameCallbacksLength = 0,
            this._nextFrameCallbacksLength = 0,
            this._frameCallbackIteration = 0
        }
          , n = r.prototype;
        n.requestAnimationFrame = function(t, e) {
            return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0),
            this._frameCallbacks.push(this._currentFrameID, t),
            this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1),
            this._currentFrameCallbacks.push(this._currentFrameID, t),
            this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(),
            this._nextFrameCallbacks.push(this._currentFrameID, t),
            this._nextFrameCallbacksLength += 2),
            this._currentFrameID
        }
        ,
        n.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t),
            this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }
        ,
        n._onRAFExecuted = function(t) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2)
                this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            this._frameCallbacks.length = 0,
            this._frameCallbackLength = 0
        }
        ,
        n._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)),
            this._currentFrameCallbacksLength = this._nextFrameCallbacksLength,
            this._nextFrameCallbacks.length = 0,
            this._nextFrameCallbacksLength = 0
        }
        ,
        n._onBeforeRAFExecutorPhase = function() {
            this._phaseActive = !0,
            Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)),
            this._frameCallbackLength = this._currentFrameCallbacksLength,
            this._currentFrameCallbacks.length = 0,
            this._currentFrameCallbacksLength = 0
        }
        ,
        n._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1
        }
        ,
        n._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }
        ,
        n._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2),
            this._frameCallbackLength -= 2
        }
        ,
        n._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2),
            this._currentFrameCallbacksLength -= 2
        }
        ,
        n._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2),
            this._nextFrameCallbacksLength -= 2,
            0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }
        ,
        e.exports = r
    }
    , {
        56: 56
    }],
    55: [function(t, e, i) {
        "use strict";
        var s = t(54)
          , r = function() {
            this.events = {}
        }
          , n = r.prototype;
        n.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].requestAnimationFrame
        }
        ,
        n.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)),
            this.events[t].cancelAnimationFrame
        }
        ,
        e.exports = new r
    }
    , {
        54: 54
    }],
    56: [function(t, e, i) {
        "use strict";
        var s = t(52)
          , r = function(t) {
            s.call(this, t)
        };
        (r.prototype = Object.create(s.prototype))._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }
        ,
        e.exports = r
    }
    , {
        52: 52
    }],
    57: [function(t, e, i) {
        "use strict";
        var s, r = t(52), n = t(34).EventEmitterMicro;
        function a(t, e) {
            n.call(this),
            e = e || {},
            this._fps = t || 0,
            this._delta = 0,
            this._currentFps = 0,
            this._rafEmitter = e.rafEmitter || new r,
            this._lastThrottledTime = 0,
            this._didEmitFrameData = !1,
            this._rafEmitterEvent = null,
            this._shouldDraw = !1,
            this._boundOnRAFEmitterUpdate = this._onRAFEmitterUpdate.bind(this),
            this._boundOnRAFEmitterDraw = this._onRAFEmitterDraw.bind(this),
            this._boundOnRAFEmitterStop = this._onRAFEmitterStop.bind(this),
            this._rafEmitter.on("update", this._boundOnRAFEmitterUpdate),
            this._rafEmitter.on("draw", this._boundOnRAFEmitterDraw),
            this._rafEmitter.on("stop", this._boundOnRAFEmitterStop)
        }
        (s = a.prototype = Object.create(n.prototype)).setFps = function(t) {
            return t !== this._fps && (this._fps = t,
            !0)
        }
        ,
        s.getFps = function() {
            return this._fps
        }
        ,
        s.run = function() {
            return this._rafEmitter.run()
        }
        ,
        s.cancel = function() {
            return this._rafEmitter.cancel()
        }
        ,
        s.willRun = function() {
            return this._rafEmitter.willRun()
        }
        ,
        s.isRunning = function() {
            return this._rafEmitter.isRunning()
        }
        ,
        s.destroy = function() {
            var t = this._rafEmitter.destroy();
            return n.prototype.destroy.call(this),
            this._rafEmitter = null,
            this._boundOnRAFEmitterUpdate = null,
            this._boundOnRAFEmitterDraw = null,
            this._boundOnRAFEmitterStop = null,
            this._rafEmitterEvent = null,
            t
        }
        ,
        s._onRAFEmitterUpdate = function(t) {
            if (0 === this._lastThrottledTime && (this._lastThrottledTime = this._rafEmitter.executor.lastFrameTime),
            this._delta = t.time - this._lastThrottledTime,
            !this._fps)
                throw new TypeError("FPS is not defined.");
            this._currentFps = 1e3 / this._delta,
            this._currentFps > this._fps ? this._rafEmitter.run() : (this._rafEmitterEvent = Object.assign({}, t),
            this._rafEmitterEvent.delta = this._delta,
            this._rafEmitterEvent.fps = this._currentFps,
            this._lastThrottledTime = this._rafEmitterEvent.time,
            this._shouldDraw = !0,
            this._didEmitFrameData || (this.trigger("start", this._rafEmitterEvent),
            this._didEmitFrameData = !0),
            this.trigger("update", this._rafEmitterEvent))
        }
        ,
        s._onRAFEmitterDraw = function() {
            this._shouldDraw && (this._shouldDraw = !1,
            this.trigger("draw", this._rafEmitterEvent))
        }
        ,
        s._onRAFEmitterStop = function() {
            this._lastThrottledTime = 0,
            this._didEmitFrameData = !1,
            this.trigger("stop", this._rafEmitterEvent)
        }
        ,
        e.exports = a
    }
    , {
        34: 34,
        52: 52
    }],
    58: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.cancelAnimationFrame("draw")
    }
    , {
        55: 55
    }],
    59: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.cancelAnimationFrame("external")
    }
    , {
        55: 55
    }],
    60: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.cancelAnimationFrame("update")
    }
    , {
        55: 55
    }],
    61: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.requestAnimationFrame("draw")
    }
    , {
        55: 55
    }],
    62: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.requestAnimationFrame("external")
    }
    , {
        55: 55
    }],
    63: [function(t, e, i) {
        "use strict";
        var s = t(66).SharedInstance
          , r = t(50).majorVersionNumber
          , n = function() {
            this._currentID = 0
        };
        n.prototype.getNewID = function() {
            return this._currentID++,
            "raf:" + this._currentID
        }
        ,
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", r, n)
    }
    , {
        50: 50,
        66: 66
    }],
    64: [function(t, e, i) {
        "use strict";
        var s = t(66).SharedInstance
          , r = t(50).majorVersionNumber
          , n = t(53);
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", r, n)
    }
    , {
        50: 50,
        53: 53,
        66: 66
    }],
    65: [function(t, e, i) {
        "use strict";
        var s = t(55);
        e.exports = s.requestAnimationFrame("update")
    }
    , {
        55: 55
    }],
    66: [function(t, e, i) {
        "use strict";
        e.exports = {
            SharedInstance: t(67)
        }
    }
    , {
        67: 67
    }],
    67: [function(t, e, i) {
        "use strict";
        var s, r = "undefined" != typeof window ? window : {}, n = r.AC, a = (s = {},
        {
            get: function(t, e) {
                var i = null;
                return s[t] && s[t][e] && (i = s[t][e]),
                i
            },
            set: function(t, e, i) {
                return s[t] || (s[t] = {}),
                s[t][e] = "function" == typeof i ? new i : i,
                s[t][e]
            },
            share: function(t, e, i) {
                var s = this.get(t, e);
                return s || (s = this.set(t, e, i)),
                s
            },
            remove: function(t, e) {
                var i = typeof e;
                if ("string" !== i && "number" !== i)
                    s[t] && (s[t] = null);
                else {
                    if (!s[t] || !s[t][e])
                        return;
                    s[t][e] = null
                }
            }
        });
        n || (n = r.AC = {}),
        n.SharedInstance || (n.SharedInstance = a),
        e.exports = n.SharedInstance
    }
    , {}],
    68: [function(t, e, i) {
        "use strict";
        e.exports = {
            joinSearchParams: t(69),
            parseSearchParams: t(70),
            parseURL: t(71)
        }
    }
    , {
        69: 69,
        70: 70,
        71: 71
    }],
    69: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i = "";
            if (t) {
                var s = Object.keys(t)
                  , r = s.length - 1;
                s.forEach((function(e, s) {
                    var n = t[e]
                      , a = (e = e.trim()) + (n = null === (n = n && "string" == typeof n ? n.trim() : n) ? "" : "=" + n) + (s === r ? "" : "&");
                    i = i ? i.concat(a) : a
                }
                ))
            }
            return i && !1 !== e ? "?" + i : i
        }
    }
    , {}],
    70: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = (t = (t = t || window.location.search).replace(/^[^?]*\?/, "")) ? t.split("&") : []
              , i = {}
              , s = new RegExp("=");
            return e.forEach((function(t) {
                var e, r;
                if (s.test(t)) {
                    var n = t.split("=", 2);
                    e = n[0],
                    r = n[1]
                } else
                    e = t,
                    r = null;
                i[e] = r
            }
            )),
            i
        }
    }
    , {}],
    71: [function(t, e, i) {
        "use strict";
        var s = t(70);
        e.exports = function(t) {
            var e, i = "", r = !1;
            return t ? window.URL && "function" == typeof window.URL ? e = new URL(t,window.location) : ((e = document.createElement("a")).href = t,
            e.href = e.href,
            function(t) {
                var e = t.port
                  , i = new RegExp(":" + e);
                return e && !i.test(t.href) && i.test(t.host)
            }(e) && (i = e.host.replace(new RegExp(":" + e.port), ""),
            r = !0)) : e = window.location,
            {
                hash: e.hash,
                host: i || e.host,
                hostname: e.hostname,
                href: e.href,
                origin: e.origin || e.protocol + "//" + (i || e.host),
                pathname: e.pathname,
                port: r ? "" : e.port,
                protocol: e.protocol,
                search: e.search,
                searchParams: s(e.search)
            }
        }
    }
    , {
        70: 70
    }],
    72: [function(t, e, i) {
        "use strict";
        class s {
            constructor(t={}) {
                this.options = t,
                "loading" === document.readyState ? document.addEventListener("readystatechange", t=>{
                    "interactive" === document.readyState && this._init()
                }
                ) : this._init()
            }
            _init() {
                if (this._images = Array.from(document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))),
                this.AnimSystem = this._findAnim(),
                null === this.AnimSystem)
                    return null;
                this._addKeyframesToImages()
            }
            _defineKeyframeOptions(t=null) {
                const e = t.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
                return Object.assign({}, {
                    start: "t - 200vh",
                    end: "b + 100vh",
                    event: "AnimLazyImage"
                }, JSON.parse(e))
            }
            _addKeyframesToImages() {
                this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body),
                this._images.forEach(t=>{
                    this.AnimSystem.getGroupForTarget(t) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
                    let e = this._defineKeyframeOptions(t);
                    this._scrollGroup.addKeyframe(t, e).controller.once("AnimLazyImage:enter", ()=>{
                        this._imageIsInLoadRange(t)
                    }
                    )
                }
                )
            }
            _cleanUpImageAttributes(t) {
                let e = !1;
                try {
                    e = this._scrollGroup.getControllerForTarget(t).getNearestKeyframeForAttribute("AnimLazyImage").isCurrentlyInRange
                } catch (t) {
                    e = !1
                }
                e || t.setAttribute(s.DATA_ATTRIBUTE, "")
            }
            _downloadingImageAttributes(t) {
                t.removeAttribute(s.DATA_ATTRIBUTE)
            }
            _imageIsInLoadRange(t) {
                this._downloadImage(t)
            }
            _downloadImage(t) {
                this._downloadingImageAttributes(t)
            }
            _findAnim() {
                var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return t.map(t=>t._animInfo ? t._animInfo.group : null).filter(t=>null !== t),
                t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"),
                null)
            }
        }
        s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe",
        s.DATA_ATTRIBUTE = "data-anim-lazy-image",
        e.exports = s
    }
    , {}],
    73: [function(t, e, i) {
        "use strict";
        class s {
            constructor() {
                this._events = {}
            }
            on(t, e) {
                return this._events[t] = this._events[t] || [],
                this._events[t].unshift(e),
                e
            }
            once(t, e) {
                const i = s=>{
                    this.off(t, i),
                    void 0 !== s ? e(s) : e()
                }
                ;
                return this.on(t, i)
            }
            off(t, e) {
                if (!this.has(t))
                    return;
                if (!e)
                    return void delete this._events[t];
                const i = this._events[t].indexOf(e);
                -1 !== i && this._events[t].splice(i, 1)
            }
            trigger(t, e) {
                if (this.has(t))
                    for (let i = this._events[t].length - 1; i >= 0; i--)
                        void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
            }
            has(t) {
                return t in this._events && 0 !== this._events[t].length
            }
            destroy() {
                this._events = null
            }
        }
        s.EventEmitterMicro = s,
        e.exports = s
    }
    , {}],
    74: [function(t, e, i) {
        "use strict";
        e.exports = {
            version: "3.8.0",
            major: "3.x",
            majorMinor: "3.8"
        }
    }
    , {}],
    75: [function(t, e, i) {
        "use strict";
        const s = t(73)
          , r = t(82)
          , n = t(77)
          , a = t(78)
          , o = t(80)
          , l = t(101)
          , h = t(102)
          , c = t(103)
          , u = t(74)
          , d = {};
        "undefined" != typeof window && (d.update = t(65),
        d.cancelUpdate = t(60),
        d.external = t(62),
        d.draw = t(61));
        let m = null;
        class p extends s {
            constructor() {
                if (super(),
                m)
                    throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                m = this,
                this.groups = [],
                this.scrollSystems = [],
                this.timeSystems = [],
                this.tweenGroup = null,
                this._forceUpdateRAFId = -1,
                this.initialized = !1,
                this.model = r,
                this.plugins = {
                    keyframe: [],
                    parser: []
                },
                this.version = u.version,
                this._resolveReady = ()=>{}
                ,
                this.ready = new Promise(t=>this._resolveReady = t),
                this.onScroll = this.onScroll.bind(this),
                this.onResizedDebounced = this.onResizedDebounced.bind(this),
                this.onResizeImmediate = this.onResizeImmediate.bind(this)
            }
            initialize() {
                return this.initialized || "undefined" == typeof window || (this.initialized = !0,
                this.timeSystems = [],
                this.scrollSystems = [],
                this.groups = [],
                this.setupEvents(),
                this.initializeResizeFilter(),
                this.initializeModel(),
                this.createDOMGroups(),
                this.createDOMKeyframes(),
                this.tweenGroup = new c(null,this),
                this.groups.unshift(this.tweenGroup),
                this._resolveReady()),
                this.ready
            }
            use(t, e) {
                t.install(this, e)
            }
            remove() {
                return this.initialized ? Promise.all(this.groups.map(t=>t.remove())).then(()=>{
                    this.groups = null,
                    this.scrollSystems = null,
                    this.timeSystems = null,
                    window.clearTimeout(r.RESIZE_TIMEOUT),
                    window.removeEventListener("scroll", this.onScroll),
                    window.removeEventListener("resize", this.onResizeImmediate),
                    this._events = {},
                    this.initialized = !1,
                    this.ready = new Promise(t=>this._resolveReady = t)
                }
                ) : (this.ready = new Promise(t=>this._resolveReady = t),
                Promise.resolve())
            }
            destroy() {
                return this.remove()
            }
            createTimeGroup(t, e) {
                t instanceof HTMLElement || (t = (e = t || {}).el);
                let i = new h(t,this);
                return e && e.name && (i.name = e.name),
                this.groups.push(i),
                this.timeSystems.push(i),
                this.trigger(r.EVENTS.ON_GROUP_CREATED, i),
                i
            }
            createScrollGroup(t, e) {
                if (!t)
                    throw "AnimSystem scroll based groups must supply an HTMLElement";
                let i = new l(t,this);
                return (e = e || {}).name && (i.name = e.name),
                e.getPosition && e.getMaxPosition && (i.getPosition = e.getPosition,
                i.createViewableRange = ()=>({
                    a: 0,
                    d: e.getMaxPosition()
                })),
                i.getPosition = e.getPosition || i.getPosition,
                i.getPosition = e.getPosition || i.getPosition,
                this.groups.push(i),
                this.scrollSystems.push(i),
                this.trigger(r.EVENTS.ON_GROUP_CREATED, i),
                i
            }
            removeGroup(t) {
                return t.destroyed || t.anim !== this ? Promise.resolve() : Promise.all(t.keyframeControllers.map(e=>t.removeKeyframeController(e))).then(()=>{
                    let e = this.groups.indexOf(t);
                    -1 !== e && this.groups.splice(e, 1),
                    e = this.scrollSystems.indexOf(t),
                    -1 !== e && this.scrollSystems.splice(e, 1),
                    e = this.timeSystems.indexOf(t),
                    -1 !== e && this.timeSystems.splice(e, 1),
                    t.destroyed || t.destroy()
                }
                )
            }
            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"),
                document.querySelectorAll("[data-anim-scroll-group]").forEach(t=>this.createScrollGroup(t)),
                document.querySelectorAll("[data-anim-time-group]").forEach(t=>this.createTimeGroup(t)),
                this.trigger(r.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
            }
            createDOMKeyframes() {
                let t = [];
                ["data-anim-keyframe", n.DATA_ATTRIBUTE, a.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function(e) {
                    for (let i = 0; i < 12; i++)
                        t.push(e + (0 === i ? "" : "-" + (i - 1)))
                }
                ));
                for (let e = 0; e < t.length; e++) {
                    let i = t[e]
                      , s = document.querySelectorAll("[" + i + "]");
                    for (let t = 0; t < s.length; t++) {
                        const e = s[t]
                          , r = JSON.parse(e.getAttribute(i));
                        this.addKeyframe(e, r)
                    }
                }
                d.update(()=>{
                    null !== this.groups && (this.groups.forEach(t=>t.onKeyframesDirty({
                        silent: !0
                    })),
                    this.groups.forEach(t=>t.trigger(r.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)),
                    this.trigger(r.EVENTS.ON_DOM_KEYFRAMES_CREATED, this),
                    this.groups.forEach(t=>{
                        t.forceUpdate({
                            waitForNextUpdate: !1,
                            silent: !0
                        }),
                        t.reconcile()
                    }
                    ),
                    this.onScroll())
                }
                , !0)
            }
            initializeResizeFilter() {
                if (r.cssDimensionsTracker)
                    return;
                const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                t.setAttribute("cssDimensionsTracker", "true"),
                t.style.position = "fixed",
                t.style.top = "0",
                t.style.width = "100%",
                t.style.height = "100vh",
                t.style.pointerEvents = "none",
                t.style.visibility = "hidden",
                t.style.zIndex = "-1",
                document.documentElement.appendChild(t),
                r.cssDimensionsTracker = t
            }
            initializeModel() {
                r.pageMetrics.windowHeight = r.cssDimensionsTracker.clientHeight,
                r.pageMetrics.windowWidth = r.cssDimensionsTracker.clientWidth,
                r.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                r.pageMetrics.scrollX = window.scrollX || window.pageXOffset,
                r.pageMetrics.breakpoint = r.getBreakpoint();
                let t = document.documentElement.getBoundingClientRect();
                r.pageMetrics.documentOffsetX = t.left + r.pageMetrics.scrollX,
                r.pageMetrics.documentOffsetY = t.top + r.pageMetrics.scrollY
            }
            setupEvents() {
                window.removeEventListener("scroll", this.onScroll),
                window.addEventListener("scroll", this.onScroll),
                window.removeEventListener("resize", this.onResizeImmediate),
                window.addEventListener("resize", this.onResizeImmediate)
            }
            onScroll() {
                r.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                r.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                for (let t = 0, e = this.scrollSystems.length; t < e; t++)
                    this.scrollSystems[t].updateTimeline();
                this.trigger(r.PageEvents.ON_SCROLL, r.pageMetrics)
            }
            onResizeImmediate() {
                let t = r.cssDimensionsTracker.clientWidth
                  , e = r.cssDimensionsTracker.clientHeight;
                if (t === r.pageMetrics.windowWidth && e === r.pageMetrics.windowHeight)
                    return;
                r.pageMetrics.windowWidth = t,
                r.pageMetrics.windowHeight = e,
                r.pageMetrics.scrollY = window.scrollY || window.pageYOffset,
                r.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                let i = document.documentElement.getBoundingClientRect();
                r.pageMetrics.documentOffsetX = i.left + r.pageMetrics.scrollX,
                r.pageMetrics.documentOffsetY = i.top + r.pageMetrics.scrollY,
                window.clearTimeout(r.RESIZE_TIMEOUT),
                r.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250),
                this.trigger(r.PageEvents.ON_RESIZE_IMMEDIATE, r.pageMetrics)
            }
            onResizedDebounced() {
                d.update(()=>{
                    let t = r.pageMetrics.breakpoint
                      , e = r.getBreakpoint();
                    if (e !== t) {
                        r.pageMetrics.previousBreakpoint = t,
                        r.pageMetrics.breakpoint = e;
                        for (let t = 0, e = this.groups.length; t < e; t++)
                            this.groups[t]._onBreakpointChange();
                        this.trigger(r.PageEvents.ON_BREAKPOINT_CHANGE, r.pageMetrics)
                    }
                    for (let t = 0, e = this.groups.length; t < e; t++)
                        this.groups[t].forceUpdate({
                            waitForNextUpdate: !1
                        });
                    this.trigger(r.PageEvents.ON_RESIZE_DEBOUNCED, r.pageMetrics)
                }
                , !0)
            }
            forceUpdate({waitForNextUpdate: t=!0, silent: e=!1}={}) {
                -1 !== this._forceUpdateRAFId && d.cancelUpdate(this._forceUpdateRAFId);
                let i = ()=>{
                    for (let t = 0, i = this.groups.length; t < i; t++) {
                        this.groups[t].forceUpdate({
                            waitForNextUpdate: !1,
                            silent: e
                        })
                    }
                    return -1
                }
                ;
                this._forceUpdateRAFId = t ? d.update(i, !0) : i()
            }
            addKeyframe(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body),
                i.addKeyframe(t, e)
            }
            addEvent(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body),
                i.addEvent(t, e)
            }
            getTimeGroupForTarget(t) {
                return this._getGroupForTarget(t, t=>t instanceof h)
            }
            getScrollGroupForTarget(t) {
                return this._getGroupForTarget(t, t=>!(t instanceof h))
            }
            getGroupForTarget(t) {
                return this._getGroupForTarget(t, ()=>!0)
            }
            getGroupByName(t) {
                return this.groups.find(e=>e.name === t)
            }
            _getGroupForTarget(t, e) {
                if (t._animInfo && t._animInfo.group && e(t._animInfo.group))
                    return t._animInfo.group;
                let i = t;
                for (; i; ) {
                    if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group))
                        return i._animInfo.group;
                    i = i.parentElement
                }
            }
            getControllerForTarget(t) {
                return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
            }
            addTween(t, e) {
                return this.tweenGroup.addKeyframe(t, e)
            }
        }
        e.exports = "undefined" == typeof window ? new p : window.AC.SharedInstance.share("AnimSystem", u.major, p),
        e.exports.default = e.exports
    }
    , {
        101: 101,
        102: 102,
        103: 103,
        60: 60,
        61: 61,
        62: 62,
        65: 65,
        73: 73,
        74: 74,
        77: 77,
        78: 78,
        80: 80,
        82: 82
    }],
    76: [function(t, e, i) {
        "use strict";
        const s = t(82);
        class r {
            constructor(t, e) {
                this._index = 0,
                this.keyframe = t,
                e && (this.name = e)
            }
            get start() {
                return this.keyframe.jsonProps.start
            }
            set index(t) {
                this._index = t
            }
            get index() {
                return this._index
            }
        }
        e.exports = class {
            constructor(t) {
                this.timeGroup = t,
                this.chapters = [],
                this.chapterNames = {},
                this.currentChapter = null,
                this.tween = null,
                this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0,
                this.tween && !this.tween.destroyed && this.tween.remove(),
                this.tween = null
            }
            addChapter(t) {
                const {position: e, name: i} = t;
                if (void 0 === e)
                    throw ReferenceError("Cannot add chapter without target position.");
                t._impIsFirst || 0 !== this.chapters.length || this.addChapter({
                    position: 0,
                    _impIsFirst: !0
                });
                let s = this.timeGroup.addKeyframe(this, {
                    start: e,
                    end: e,
                    event: "Chapter"
                });
                this.timeGroup.forceUpdate({
                    waitForNextFrame: !1,
                    silent: !0
                });
                const n = new r(s,i);
                if (this.chapters.push(n),
                i) {
                    if (this.chapterNames.hasOwnProperty(i))
                        throw ReferenceError('Duplicate chapter name assigned - "'.concat(i, '" is already in use'));
                    this.chapterNames[i] = n
                }
                return this.chapters.sort((t,e)=>t.start - e.start).forEach((t,e)=>t.index = e),
                this.currentChapter = this.currentChapter || this.chapters[0],
                n
            }
            playToChapter(t) {
                let e;
                if (t.hasOwnProperty("index"))
                    e = this.chapters[t.index];
                else {
                    if (!t.hasOwnProperty("name"))
                        throw ReferenceError("Cannot play to chapter without target index or name");
                    e = this.chapterNames[t.name]
                }
                if (!e || this.currentChapter === e && !0 !== t.force)
                    return;
                let i = t.ease || "easeInOutCubic";
                this.tween && this.tween.controller && (this.tween.remove(),
                i = t.ease || "easeOutQuint"),
                this.timeGroup.timeScale(t.timeScale || 1);
                const r = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e)
                  , n = this.timeGroup.time()
                  , a = e.start;
                let o = !1;
                return this.tween = this.timeGroup.anim.addTween({
                    time: n
                }, {
                    easeFunction: i,
                    duration: r,
                    time: [n, a],
                    onStart: ()=>{
                        this.destroyed || this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {
                            player: this,
                            next: e
                        })
                    }
                    ,
                    onDraw: t=>{
                        if (this.destroyed)
                            return;
                        let i = t.tweenProps.time.current;
                        this.timeGroup.time(i),
                        t.keyframe.curvedT > .5 && !o && (o = !0,
                        this.currentIndex = e.index,
                        this.currentChapter = e,
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                            player: this,
                            current: e
                        }))
                    }
                    ,
                    onComplete: t=>{
                        this.destroyed || (this.timeGroup.time(t.tweenProps.time.current),
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                            player: this,
                            current: e
                        }),
                        this.timeGroup.paused(!0),
                        this.tween = null)
                    }
                }),
                this.tween
            }
            getDurationToChapter(t) {
                const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
                return Math.abs(e.start - t.start)
            }
        }
    }
    , {
        82: 82
    }],
    77: [function(t, e, i) {
        "use strict";
        const s = t(82)
          , r = t(98)
          , n = t(96)
          , a = t(161)
          , o = t(83)
          , l = t(91)
          , h = t(88)
          , c = t(106)
          , u = t(108)
          , d = t(107)
          , m = t(90)
          , {cssAttributes: p, suffixFreeAttributes: f, domAttributes: g} = t(93);
        class _ {
            constructor(t, e) {
                this.controller = t,
                this.anchors = [],
                this.jsonProps = e,
                this.ease = t.group.defaultEase,
                this.easeFunction = o.linear,
                this.start = 0,
                this.end = 0,
                this.localT = 0,
                this.curvedT = 0,
                this.id = 0,
                this.event = "",
                this.needsEventDispatch = !1,
                this.snapAtCreation = !1,
                this.isEnabled = !1,
                this.animValues = {},
                this.breakpointMask = s.KeyframeDefaults.breakpointMask,
                this.disabledWhen = [],
                this.keyframeType = s.KeyframeTypes.Interpolation,
                this.hold = !1,
                this.preserveState = !1,
                this.markedForRemoval = !1;
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: ()=>i,
                    set(e) {
                        i = e,
                        t.group.keyframesDirty = !0
                    }
                }),
                this.uuid = m(),
                this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0,
                this.controller = null,
                this.disabledWhen = null,
                this.anchors = null,
                this.jsonProps = null,
                this.easeFunction = null,
                this.animValues = null
            }
            remove() {
                return this.controller && this.controller.removeKeyframe(this)
            }
            parseOptions(t) {
                this.jsonProps = t,
                t.relativeTo && console.error("KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(t.relativeTo, '"')),
                void 0 === t.end && void 0 === t.duration && (t.end = t.start),
                "" !== t.anchors && t.anchors ? (this.anchors = [],
                t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors],
                t.anchors.forEach((e,i)=>{
                    let s = u(e, this.controller.group.element);
                    if (!s) {
                        let s = "";
                        return "string" == typeof e && (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."),
                        void console.warn("Keyframe on", this.controller.element, " failed to find anchor at index ".concat(i, " in array"), t.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(s))
                    }
                    this.anchors.push(s),
                    this.controller.group.metrics.add(s)
                }
                )) : (this.anchors = [],
                t.anchors = []),
                t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease,
                t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation,
                t.easeFunction || (t.easeFunction = s.KeyframeDefaults.easeFunctionString),
                t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask,
                t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen,
                t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold,
                t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = s.KeyframeDefaults.preserveState,
                this.easeFunction = o[t.easeFunction],
                o.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = l.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = h.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
                for (let e in t) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(e))
                        continue;
                    let i = t[e];
                    if (Array.isArray(i)) {
                        if (1 === i.length && (i[1] = i[0],
                        i[0] = null),
                        void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                            let a = 0;
                            this.controller._ownerIsElement || (a = this.controller.element[e] || 0);
                            const o = e.startsWith("--");
                            let l = i[2] || (o || f.includes(e) ? void 0 : "px")
                              , h = this.controller.group.anim.plugins.keyframe.reduce((i,s)=>i || s.parseProp.call(this, t, e), null);
                            if (!h && this.controller._ownerIsElement)
                                if (o || p.includes(e)) {
                                    let i = d(e)
                                      , r = t.round || ["zIndex"].includes(i);
                                    a = parseFloat(this.controller.getTargetComputedStyle().getPropertyValue(i)),
                                    isNaN(a) && (a = 0),
                                    h = new n(a,s.KeyframeDefaults.epsilon,this.snapAtCreation,e,r,l),
                                    this.controller.cssAttributes.push(h)
                                } else
                                    g.includes(e) && (h = new r(a,s.KeyframeDefaults.epsilon,this.snapAtCreation,e,t.round,l),
                                    this.controller.domAttributes.push(h));
                            h || (h = new r(a,s.KeyframeDefaults.epsilon,this.snapAtCreation,e,t.round,l)),
                            this.controller.tweenProps[e] = h
                        }
                        this.animValues[e] = this.controller.group.expressionParser.parseArray(this, i),
                        this.controller.tweenProps[e].calculateEpsilon(t, this.animValues[e])
                    }
                }
                this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation,
                t.event && (this.event = t.event)
            }
            overwriteProps(t) {
                this.animValues = {};
                let e = Object.assign({}, this.jsonProps, t);
                this.controller.updateKeyframe(this, e)
            }
            updateLocalProgress(t) {
                if (this.start === this.end || t < this.start || t > this.end)
                    return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0,
                    void (this.curvedT = this.easeFunction(this.localT));
                const e = (t - this.start) / (this.end - this.start)
                  , i = this.hold ? this.localT : 0;
                this.localT = a.clamp(e, i, 1),
                this.curvedT = this.easeFunction(this.localT)
            }
            reconcile(t) {
                this.controller.tweenProps[t].reconcile(this.animValues[t], this.curvedT) && (this.needsEventDispatch || (this.needsEventDispatch = !0,
                this.controller.keyframesRequiringDispatch.push(this)))
            }
            reset(t) {
                this.localT = t || 0;
                let e = this.ease;
                this.ease = 1;
                for (let t in this.animValues)
                    this.reconcile(t);
                this.ease = e
            }
            onDOMRead(t) {
                let e = this.controller.tweenProps[t].update(this.animValues[t], this.curvedT, this.ease);
                return "" === this.event || this.needsEventDispatch || e && (this.needsEventDispatch = !0,
                this.controller.keyframesRequiringDispatch.push(this)),
                e
            }
            isInRange(t) {
                return t >= this.start && t <= this.end
            }
            setEnabled(t) {
                t = t || c(Array.from(document.documentElement.classList));
                let e = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint)
                  , i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(e=>void 0 !== t[e])),
                this.isEnabled = e && !i,
                this.isEnabled
            }
            evaluateConstraints() {
                this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start),
                this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end),
                this.evaluateInterpolationConstraints()
            }
            evaluateInterpolationConstraints() {
                for (let t in this.animValues) {
                    let e = this.jsonProps[t];
                    this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
                }
            }
        }
        _.DATA_ATTRIBUTE = "data-anim-tween",
        e.exports = _
    }
    , {
        106: 106,
        107: 107,
        108: 108,
        161: 161,
        82: 82,
        83: 83,
        88: 88,
        90: 90,
        91: 91,
        93: 93,
        96: 96,
        98: 98
    }],
    78: [function(t, e, i) {
        "use strict";
        const s = t(77)
          , r = t(82)
          , n = t(98);
        class a extends s {
            constructor(t, e) {
                super(t, e),
                this.keyframeType = r.KeyframeTypes.CSSClass,
                this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                this.cssClass = "",
                this.friendlyName = "",
                this.style = {
                    on: null,
                    off: null
                },
                this.toggle = r.KeyframeDefaults.toggle,
                this.isApplied = !1
            }
            parseOptions(t) {
                if (!this.controller._ownerIsElement)
                    throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (t.x = void 0,
                t.y = void 0,
                t.z = void 0,
                t.scale = void 0,
                t.scaleX = void 0,
                t.scaleY = void 0,
                t.rotationX = void 0,
                t.rotationY = void 0,
                t.rotationZ = void 0,
                t.rotation = void 0,
                t.opacity = void 0,
                t.hold = void 0,
                void 0 !== t.toggle && (this.toggle = t.toggle),
                void 0 !== t.cssClass)
                    this._triggerType = a.TRIGGER_TYPE_CSS_CLASS,
                    this.cssClass = t.cssClass,
                    this.friendlyName = "." + this.cssClass,
                    void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                        add: [],
                        remove: []
                    });
                else {
                    if (void 0 === t.style || !this.isValidStyleProperty(t.style))
                        throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (this._triggerType = a.TRIGGER_TYPE_STYLE_PROPERTY,
                    this.style = t.style,
                    this.friendlyName = "style",
                    this.toggle = void 0 !== this.style.off || this.toggle,
                    this.toggle && void 0 === this.style.off) {
                        this.style.off = {};
                        for (let t in this.style.on)
                            this.style.off[t] = ""
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                }
                if (void 0 === t.end && (t.end = t.start),
                t.toggle = this.toggle,
                this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.isApplied = this.controller.element.classList.contains(this.cssClass);
                else {
                    let t = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let e in this.style.on)
                        if (t[e] !== this.style.on[e]) {
                            this.isApplied = !1;
                            break
                        }
                }
                s.prototype.parseOptions.call(this, t),
                this.animValues[this.friendlyName] = [0, 0],
                void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new n(0,1,!1,this.friendlyName)),
                this.keyframeType = r.KeyframeTypes.CSSClass
            }
            updateLocalProgress(t) {
                this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
            }
            _apply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.add.push(this.cssClass),
                    this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.on)
                        this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !0
            }
            _unapply() {
                if (this._triggerType === a.TRIGGER_TYPE_CSS_CLASS)
                    this.controller.tweenProps.targetClasses.remove.push(this.cssClass),
                    this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.off)
                        this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !1
            }
            isValidStyleProperty(t) {
                if (!t.hasOwnProperty("on"))
                    return !1;
                if ("object" != typeof t.on)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off)
                    throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0
            }
            reconcile(t) {}
            onDOMRead(t) {}
            evaluateInterpolationConstraints() {}
        }
        a.TRIGGER_TYPE_CSS_CLASS = 0,
        a.TRIGGER_TYPE_STYLE_PROPERTY = 1,
        a.DATA_ATTRIBUTE = "data-anim-classname",
        e.exports = a
    }
    , {
        77: 77,
        82: 82,
        98: 98
    }],
    79: [function(t, e, i) {
        "use strict";
        const s = t(82)
          , r = t(98)
          , n = t(85)
          , a = t(81)
          , o = t(78)
          , l = t(86)
          , h = t(106)
          , c = t(90)
          , u = t(73)
          , d = t(114)
          , m = {};
        "undefined" != typeof window && (m.update = t(65),
        m.external = t(62),
        m.draw = t(61));
        const {transformAttributes: p, cssAttributes: f, domAttributes: g} = t(93)
          , _ = t(95)
          , y = t(96)
          , v = t(97)
          , E = Math.PI / 180
          , b = {
            create: t(168),
            rotateX: t(169),
            rotateY: t(170),
            rotateZ: t(171),
            scale: t(172)
        };
        e.exports = class extends u {
            constructor(t, e) {
                super(),
                this._events.draw = [],
                this.uuid = c(),
                this.group = t,
                this.element = e,
                this._ownerIsElement = this.element instanceof Element,
                this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid,
                this.element._animInfo = this.element._animInfo || new a(t,this),
                this.element._animInfo.controller = this,
                this.element._animInfo.group = this.group,
                this.element._animInfo.controllers.push(this),
                this.tweenProps = this.element._animInfo.tweenProps,
                this.eventObject = new n(this),
                this.needsStyleUpdate = !1,
                this.needsClassUpdate = !1,
                this.elementMetrics = this.group.metrics.add(this.element),
                this.attributes = [],
                this.cssAttributes = [],
                this.domAttributes = [],
                this.keyframes = {},
                this._allKeyframes = [],
                this._activeKeyframes = [],
                this.keyframesRequiringDispatch = [],
                this.updateCachedValuesFromElement(),
                this.boundsMin = 0,
                this.boundsMax = 0,
                this.mat2d = new Float32Array(6),
                this.mat4 = b.create(),
                this.needsWrite = !0,
                this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
            }
            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let t = this.element._animInfo.controllers.indexOf(this);
                    if (-1 !== t && this.element._animInfo.controllers.splice(t, 1),
                    0 === this.element._animInfo.controllers.length)
                        this.element._animInfo = null;
                    else {
                        let t = this.element._animInfo.controllers.find(t=>t.group !== t.group.anim.tweenGroup);
                        t && (this.element._animInfo.controller = t,
                        this.element._animInfo.group = t.group)
                    }
                }
                this.eventObject.controller = null,
                this.eventObject.element = null,
                this.eventObject.keyframe = null,
                this.eventObject.tweenProps = null,
                this.eventObject = null,
                this.elementMetrics = null,
                this.group = null,
                this.keyframesRequiringDispatch = null;
                for (let t = 0; t < this._allKeyframes.length; t++)
                    this._allKeyframes[t].destroy();
                this._allKeyframes = null,
                this._activeKeyframes = null,
                this.attributes = null,
                this.keyframes = null,
                this.element = null,
                this.tweenProps = null,
                this.destroyed = !0,
                super.destroy()
            }
            remove() {
                return this.group && this.group.removeKeyframeController(this)
            }
            updateCachedValuesFromElement() {
                if (!this._ownerIsElement)
                    return;
                const t = this.getTargetComputedStyle(!0);
                let e = new DOMMatrix(t.getPropertyValue("transform"))
                  , i = d(e)
                  , n = s.KeyframeDefaults.epsilon;
                ["x", "y", "z"].forEach((t,e)=>{
                    this.tweenProps[t] = new r(i.translation[e],n,!1,t)
                }
                ),
                this.tweenProps.rotation = new r(i.rotation[2],n,!1,"rotation"),
                ["rotationX", "rotationY", "rotationZ"].forEach((t,e)=>{
                    this.tweenProps[t] = new r(i.rotation[e],n,!1,t)
                }
                ),
                this.tweenProps.scale = new r(i.scale[0],n,!1,"scale"),
                ["scaleX", "scaleY", "scaleZ"].forEach((t,e)=>{
                    this.tweenProps[t] = new r(i.scale[e],n,!1,t)
                }
                )
            }
            addKeyframe(t) {
                let e = l(t);
                if (!e)
                    throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
                let i = new e(this,t);
                return i.parseOptions(t),
                i.id = this._allKeyframes.length,
                this._allKeyframes.push(i),
                i
            }
            needsUpdate() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t];
                    if (this.tweenProps[e].needsUpdate())
                        return !0
                }
                return !1
            }
            updateLocalProgress(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e]
                      , s = this.keyframes[this.attributes[e]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(t);
                        continue
                    }
                    let r = this.getNearestKeyframeForAttribute(i, t);
                    r && r.updateLocalProgress(t)
                }
            }
            reconcile() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t]
                      , i = this.getNearestKeyframeForAttribute(e, this.group.position.local);
                    i.updateLocalProgress(this.group.position.local),
                    i.snapAtCreation && i.reconcile(e)
                }
            }
            determineActiveKeyframes(t) {
                t = t || h(Array.from(document.documentElement.classList));
                let e = this._activeKeyframes
                  , i = this.attributes
                  , s = {};
                this._activeKeyframes = [],
                this.attributes = [],
                this.keyframes = {};
                for (let e = 0; e < this._allKeyframes.length; e++) {
                    let i = this._allKeyframes[e];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(t))
                        for (let t in i.animValues)
                            this.tweenProps[t].isActive = i.preserveState,
                            i.preserveState && (s[t] = !0);
                    else {
                        this._activeKeyframes.push(i);
                        for (let t in i.animValues)
                            this.keyframes[t] = this.keyframes[t] || [],
                            this.keyframes[t].push(i),
                            -1 === this.attributes.indexOf(t) && (s[t] = !0,
                            this.attributes.push(t),
                            this.tweenProps[t].isActive = !0)
                    }
                }
                this.attributes.forEach(t=>this.tweenProps[t].isActive = !0),
                this.cssAttributes = this.attributes.filter(t=>f.includes(t) || t.startsWith("--")).map(t=>this.tweenProps[t]),
                this.domAttributes = this.attributes.filter(t=>g.includes(t)).map(t=>this.tweenProps[t]);
                let r = e.filter(t=>-1 === this._activeKeyframes.indexOf(t));
                if (0 === r.length)
                    return;
                let n = i.filter(t=>-1 === this.attributes.indexOf(t) && !s.hasOwnProperty(t));
                if (0 !== n.length)
                    if (this.needsWrite = !0,
                    this._ownerIsElement)
                        m.external(()=>{
                            let t = n.some(t=>p.includes(t))
                              , e = t && Object.keys(s).some(t=>p.includes(t));
                            t && !e && this.element.style.removeProperty("transform");
                            for (let t = 0, e = n.length; t < e; ++t) {
                                let e = n[t]
                                  , i = this.tweenProps[e]
                                  , s = i.isActive ? i.target : i.initialValue;
                                if (i.current = i.target = s,
                                !i.isActive)
                                    switch (!0) {
                                    case i instanceof _:
                                    case i instanceof y:
                                        i.unset(this.element.style);
                                        break;
                                    case i instanceof v:
                                        i.unset(i.applyToStyle ? this.element.style : this.element)
                                    }
                            }
                            for (let t = 0, e = r.length; t < e; ++t) {
                                let e = r[t];
                                e instanceof o && !e.preserveState && e._unapply()
                            }
                        }
                        , !0);
                    else
                        for (let t = 0, e = n.length; t < e; ++t) {
                            let e = this.tweenProps[n[t]];
                            e.current = e.target,
                            e.isActive = !1
                        }
            }
            onDOMRead(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e]
                      , s = this.getNearestKeyframeForAttribute(i, t);
                    s && s.onDOMRead(i) && (this.needsWrite = !0)
                }
            }
            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1,
                this.onDOMWriteImp(),
                this.handleEventDispatch())
            }
            onDOMWriteForObject() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t];
                    this.element[e] = this.tweenProps[e].current
                }
            }
            onDOMWriteForElement(t=this.element.style) {
                this.handleStyleTransform(t);
                for (let e = 0, i = this.cssAttributes.length; e < i; e++)
                    this.cssAttributes[e].set(t);
                for (let t = 0, e = this.domAttributes.length; t < e; t++)
                    this.domAttributes[t].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let t in this.tweenProps.targetStyles)
                        null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]),
                        this.tweenProps.targetStyles[t] = null;
                    this.needsStyleUpdate = !1
                }
                this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add),
                this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove),
                this.tweenProps.targetClasses.add.length = 0,
                this.tweenProps.targetClasses.remove.length = 0,
                this.needsClassUpdate = !1)
            }
            handleStyleTransform(t=this.element.style) {
                let e = this.tweenProps;
                if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
                    const i = this.mat4;
                    i[0] = 1,
                    i[1] = 0,
                    i[2] = 0,
                    i[3] = 0,
                    i[4] = 0,
                    i[5] = 1,
                    i[6] = 0,
                    i[7] = 0,
                    i[8] = 0,
                    i[9] = 0,
                    i[10] = 1,
                    i[11] = 0,
                    i[12] = 0,
                    i[13] = 0,
                    i[14] = 0,
                    i[15] = 1;
                    const s = e.x.current
                      , r = e.y.current
                      , n = e.z.current;
                    if (i[12] = i[0] * s + i[4] * r + i[8] * n + i[12],
                    i[13] = i[1] * s + i[5] * r + i[9] * n + i[13],
                    i[14] = i[2] * s + i[6] * r + i[10] * n + i[14],
                    i[15] = i[3] * s + i[7] * r + i[11] * n + i[15],
                    0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                        const t = (e.rotation.current || e.rotationZ.current) * E;
                        b.rotateZ(i, i, t)
                    }
                    if (0 !== e.rotationX.current) {
                        const t = e.rotationX.current * E;
                        b.rotateX(i, i, t)
                    }
                    if (0 !== e.rotationY.current) {
                        const t = e.rotationY.current * E;
                        b.rotateY(i, i, t)
                    }
                    1 === e.scale.current && 1 === e.scaleX.current && 1 === e.scaleY.current || b.scale(i, i, [e.scale.current, e.scale.current, 1]),
                    t.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
                } else if (e.x.isActive || e.y.isActive || e.rotation.isActive || e.rotationZ.isActive || e.scale.isActive || e.scaleX.isActive || e.scaleY.isActive) {
                    const i = this.mat2d;
                    i[0] = 1,
                    i[1] = 0,
                    i[2] = 0,
                    i[3] = 1,
                    i[4] = 0,
                    i[5] = 0;
                    const s = e.x.current
                      , r = e.y.current
                      , n = i[0]
                      , a = i[1]
                      , o = i[2]
                      , l = i[3]
                      , h = i[4]
                      , c = i[5];
                    if (i[0] = n,
                    i[1] = a,
                    i[2] = o,
                    i[3] = l,
                    i[4] = n * s + o * r + h,
                    i[5] = a * s + l * r + c,
                    0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                        const t = (e.rotation.current || e.rotationZ.current) * E
                          , s = i[0]
                          , r = i[1]
                          , n = i[2]
                          , a = i[3]
                          , o = i[4]
                          , l = i[5]
                          , h = Math.sin(t)
                          , c = Math.cos(t);
                        i[0] = s * c + n * h,
                        i[1] = r * c + a * h,
                        i[2] = s * -h + n * c,
                        i[3] = r * -h + a * c,
                        i[4] = o,
                        i[5] = l
                    }
                    e.scaleX.isActive || e.scaleY.isActive ? (i[0] = i[0] * e.scaleX.current,
                    i[1] = i[1] * e.scaleX.current,
                    i[2] = i[2] * e.scaleY.current,
                    i[3] = i[3] * e.scaleY.current) : (i[0] = i[0] * e.scale.current,
                    i[1] = i[1] * e.scale.current,
                    i[2] = i[2] * e.scale.current,
                    i[3] = i[3] * e.scale.current),
                    t.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
                }
            }
            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                        let e = this.keyframesRequiringDispatch[t];
                        e.needsEventDispatch = !1,
                        this.eventObject.keyframe = e,
                        this.eventObject.pageMetrics = s.pageMetrics,
                        this.eventObject.event = e.event,
                        this.trigger(e.event, this.eventObject)
                    }
                    this.keyframesRequiringDispatch.length = 0
                }
                if (0 !== this._events.draw.length) {
                    this.eventObject.keyframe = null,
                    this.eventObject.event = "draw";
                    for (let t = this._events.draw.length - 1; t >= 0; t--)
                        this._events.draw[t](this.eventObject)
                }
            }
            updateAnimationConstraints() {
                for (let t = 0, e = this._activeKeyframes.length; t < e; t++)
                    this._activeKeyframes[t].evaluateConstraints();
                this.attributes.forEach(t=>{
                    1 !== this.keyframes[t].length && this.keyframes[t].sort(s.KeyframeComparison)
                }
                ),
                this.updateDeferredPropertyValues()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this._allKeyframes.forEach(e=>e.anchors.forEach(e=>t.add(e))),
                this.group.metrics.refreshCollection(t),
                this.group.keyframesDirty = !0
            }
            getTargetComputedStyle(t=!1) {
                return this._ownerIsElement ? ((t || void 0 === this.group.computedStyleCache[this.uuid]) && (this.group.computedStyleCache[this.uuid] = getComputedStyle(this.element)),
                this.group.computedStyleCache[this.uuid]) : null
            }
            updateDeferredPropertyValues() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t]
                      , i = this.keyframes[e];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                        for (let t = 0, s = i.length; t < s; t++) {
                            let r = i[t];
                            null === r.jsonProps[e][0] && (0 === t ? r.jsonProps[e][0] = r.animValues[e][0] = this.tweenProps[e].current : r.animValues[e][0] = i[t - 1].animValues[e][1]),
                            null === r.jsonProps[e][1] && (r.animValues[e][1] = t === s - 1 ? this.tweenProps[e].current : i[t + 1].animValues[e][0]),
                            r.snapAtCreation && (r.jsonProps[e][0] = r.animValues[e][0],
                            r.jsonProps[e][1] = r.animValues[e][1])
                        }
                }
            }
            getBounds(t) {
                this.boundsMin = Number.MAX_VALUE,
                this.boundsMax = -Number.MAX_VALUE;
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.keyframes[this.attributes[e]];
                    for (let e = 0; e < i.length; e++) {
                        let s = i[e];
                        this.boundsMin = Math.min(s.start, this.boundsMin),
                        this.boundsMax = Math.max(s.end, this.boundsMax),
                        t.min = Math.min(s.start, t.min),
                        t.max = Math.max(s.end, t.max)
                    }
                }
            }
            getNearestKeyframeForAttribute(t, e) {
                e = void 0 !== e ? e : this.group.position.local;
                let i = null
                  , s = Number.POSITIVE_INFINITY
                  , r = this.keyframes[t];
                if (void 0 === r)
                    return null;
                let n = r.length;
                if (0 === n)
                    return null;
                if (1 === n)
                    return r[0];
                for (let t = 0; t < n; t++) {
                    let n = r[t];
                    if (n.isInRange(e)) {
                        i = n;
                        break
                    }
                    let a = Math.min(Math.abs(e - n.start), Math.abs(e - n.end));
                    a < s && (s = a,
                    i = n)
                }
                return i
            }
            getAllKeyframesForAttribute(t) {
                return this.keyframes[t]
            }
            updateKeyframe(t, e) {
                t.parseOptions(e),
                t.evaluateConstraints(),
                this.group.keyframesDirty = !0,
                m.update(()=>{
                    this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t),
                    this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t)
                }
                , !0)
            }
            removeKeyframe(t) {
                return t.destroyed || t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0,
                this.group.keyframesDirty = !0,
                new Promise(e=>{
                    this.group.rafEmitter.executor.eventEmitter.once("before:draw", ()=>{
                        e(t),
                        t.destroy();
                        let i = this._allKeyframes.indexOf(t);
                        -1 !== i && this._allKeyframes.splice(i, 1)
                    }
                    )
                }
                ))
            }
            updateAnimation(t, e) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"),
                this.updateKeyframe(t, e)
            }
        }
    }
    , {
        106: 106,
        114: 114,
        168: 168,
        169: 169,
        170: 170,
        171: 171,
        172: 172,
        61: 61,
        62: 62,
        65: 65,
        73: 73,
        78: 78,
        81: 81,
        82: 82,
        85: 85,
        86: 86,
        90: 90,
        93: 93,
        95: 95,
        96: 96,
        97: 97,
        98: 98
    }],
    80: [function(t, e, i) {
        "use strict";
        const s = t(77)
          , r = t(82)
          , n = t(98);
        class a extends s {
            constructor(t, e) {
                super(t, e),
                this.keyframeType = r.KeyframeTypes.Event,
                this.isApplied = !1,
                this.hasDuration = !1,
                this.isCurrentlyInRange = !1
            }
            parseOptions(t) {
                t.x = void 0,
                t.y = void 0,
                t.scale = void 0,
                t.scaleX = void 0,
                t.scaleY = void 0,
                t.rotation = void 0,
                t.style = void 0,
                t.cssClass = void 0,
                t.rotation = void 0,
                t.opacity = void 0,
                t.hold = void 0,
                this.event = t.event,
                this.animValues[this.event] = [0, 0],
                void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new n(0,1,!1,this.event)),
                super.parseOptions(t),
                this.keyframeType = r.KeyframeTypes.Event
            }
            updateLocalProgress(t) {
                if (this.hasDuration) {
                    let e = this.isCurrentlyInRange
                      , i = t >= this.start && t <= this.end;
                    if (e === i)
                        return;
                    return this.isCurrentlyInRange = i,
                    void (i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"))
                }
                !this.isApplied && t >= this.start ? (this.isApplied = !0,
                this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1,
                this._trigger(this.event + ":reverse"))
            }
            _trigger(t) {
                this.controller.eventObject.event = t,
                this.controller.eventObject.keyframe = this,
                this.controller.trigger(t, this.controller.eventObject)
            }
            evaluateConstraints() {
                super.evaluateConstraints(),
                this.hasDuration = this.start !== this.end
            }
            reset(t) {
                this.isApplied = !1,
                this.isCurrentlyInRange = !1,
                super.reset(t)
            }
            onDOMRead(t) {}
            reconcile(t) {}
            evaluateInterpolationConstraints() {}
        }
        a.DATA_ATTRIBUTE = "data-anim-event",
        e.exports = a
    }
    , {
        77: 77,
        82: 82,
        98: 98
    }],
    81: [function(t, e, i) {
        "use strict";
        const s = t(89);
        e.exports = class {
            constructor(t, e, i=!1) {
                this.isGroup = i,
                this.group = t,
                this.controller = e,
                this.controllers = [],
                this.tweenProps = new s
            }
        }
    }
    , {
        89: 89
    }],
    82: [function(t, e, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "anim-ui.position",
                GroupCollapsedStates: "anim-ui.group-collapsed-states",
                scrollY: "anim-ui.scrollY-position",
                path: "anim-ui.path"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function() {
                for (let t = 0; t < s.BREAKPOINTS.length; t++) {
                    let e = s.BREAKPOINTS[t];
                    if (window.matchMedia(e.mediaQuery).matches)
                        return e.name
                }
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: .05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TweenProps: t(89),
            TargetValue: t(98),
            CSSTargetValue: t(96),
            pageMetrics: new function() {
                this.scrollX = 0,
                this.scrollY = 0,
                this.windowWidth = 0,
                this.windowHeight = 0,
                this.documentOffsetX = 0,
                this.documentOffsetY = 0,
                this.previousBreakpoint = "",
                this.breakpoint = ""
            }
            ,
            KeyframeComparison: function(t, e) {
                return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
            }
        };
        e.exports = s
    }
    , {
        89: 89,
        96: 96,
        98: 98
    }],
    83: [function(t, e, i) {
        "use strict";
        e.exports = new class {
            constructor() {
                this.linear = function(t) {
                    return t
                }
                ,
                this.easeInQuad = function(t) {
                    return t * t
                }
                ,
                this.easeOutQuad = function(t) {
                    return t * (2 - t)
                }
                ,
                this.easeInOutQuad = function(t) {
                    return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
                }
                ,
                this.easeInSin = function(t) {
                    return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
                }
                ,
                this.easeOutSin = function(t) {
                    return Math.sin(Math.PI / 2 * t)
                }
                ,
                this.easeInOutSin = function(t) {
                    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
                }
                ,
                this.easeInElastic = function(t) {
                    return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
                }
                ,
                this.easeOutElastic = function(t) {
                    return .04 * t / --t * Math.sin(25 * t)
                }
                ,
                this.easeInOutElastic = function(t) {
                    return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
                }
                ,
                this.easeOutBack = function(t) {
                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                }
                ,
                this.easeInCubic = function(t) {
                    return t * t * t
                }
                ,
                this.easeOutCubic = function(t) {
                    return --t * t * t + 1
                }
                ,
                this.easeInOutCubic = function(t) {
                    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }
                ,
                this.easeInQuart = function(t) {
                    return t * t * t * t
                }
                ,
                this.easeOutQuart = function(t) {
                    return 1 - --t * t * t * t
                }
                ,
                this.easeInOutQuart = function(t) {
                    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                }
                ,
                this.easeInQuint = function(t) {
                    return t * t * t * t * t
                }
                ,
                this.easeOutQuint = function(t) {
                    return 1 + --t * t * t * t * t
                }
                ,
                this.easeInOutQuint = function(t) {
                    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                }
            }
        }
    }
    , {}],
    84: [function(t, e, i) {
        "use strict";
        const s = t(82)
          , r = (t,e)=>null == t ? e : t;
        class n {
            constructor(t) {
                this.top = 0,
                this.bottom = 0,
                this.left = 0,
                this.right = 0,
                this.height = 0,
                this.width = 0
            }
            toString() {
                return "top:".concat(this.top, ", bottom:").concat(this.bottom, ", left:").concat(this.left, ", right:").concat(this.right, ", height:").concat(this.height, ", width:").concat(this.width)
            }
            toObject() {
                return {
                    top: this.top,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    height: this.height,
                    width: this.width
                }
            }
        }
        e.exports = class {
            constructor() {
                this.clear()
            }
            clear() {
                this._metrics = new WeakMap
            }
            destroy() {
                this._metrics = null
            }
            add(t) {
                let e = this._metrics.get(t);
                if (e)
                    return e;
                let i = new n(t);
                return this._metrics.set(t, i),
                this._refreshMetrics(t, i)
            }
            get(t) {
                return this._metrics.get(t)
            }
            refreshCollection(t) {
                t.forEach(t=>this._refreshMetrics(t, null))
            }
            refreshMetrics(t) {
                return this._refreshMetrics(t)
            }
            _refreshMetrics(t, e) {
                if (e = e || this._metrics.get(t),
                !(t instanceof Element))
                    return e.width = r(t.width, 0),
                    e.height = r(t.height, 0),
                    e.top = r(t.top, r(t.y, 0)),
                    e.left = r(t.left, r(t.x, 0)),
                    e.right = e.left + e.width,
                    e.bottom = e.top + e.height,
                    e;
                if (void 0 === t.offsetWidth) {
                    let i = t.getBoundingClientRect();
                    return e.width = i.width,
                    e.height = i.height,
                    e.top = s.pageMetrics.scrollY + i.top,
                    e.left = s.pageMetrics.scrollX + i.left,
                    e.right = e.left + e.width,
                    e.bottom = e.top + e.height,
                    e
                }
                e.width = t.offsetWidth,
                e.height = t.offsetHeight,
                e.top = s.pageMetrics.documentOffsetY,
                e.left = s.pageMetrics.documentOffsetX;
                let i = t;
                for (; i; )
                    e.top += i.offsetTop,
                    e.left += i.offsetLeft,
                    i = i.offsetParent;
                return e.right = e.left + e.width,
                e.bottom = e.top + e.height,
                e
            }
        }
    }
    , {
        82: 82
    }],
    85: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t) {
                this.controller = t,
                this.element = this.controller.element,
                this.keyframe = null,
                this.event = "",
                this.tweenProps = this.controller.tweenProps
            }
        }
    }
    , {}],
    86: [function(t, e, i) {
        "use strict";
        const s = t(82)
          , r = t(77)
          , n = t(80)
          , a = t(78)
          , o = function(t) {
            for (let e in t) {
                let i = t[e];
                if (-1 === s.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(i))
                    return !0
            }
            return !1
        };
        e.exports = function(t) {
            if (void 0 !== t.cssClass || void 0 !== t.style) {
                if (o(t))
                    throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return a
            }
            if (o(t))
                return r;
            if (t.event)
                return n;
            throw delete t.anchors,
            "Could not determine tween type based on ".concat(JSON.stringify(t))
        }
    }
    , {
        77: 77,
        78: 78,
        80: 80,
        82: 82
    }],
    87: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor() {
                this.local = 0,
                this.localUnclamped = 0,
                this.lastPosition = 0
            }
        }
    }
    , {}],
    88: [function(t, e, i) {
        "use strict";
        const {map: s} = t(161)
          , r = {};
        class n {
            constructor(t, e, i, s) {
                this.mass = t,
                this.stiffness = e,
                this.damping = i,
                this.initialVelocity = s,
                this.m_w0 = Math.sqrt(this.stiffness / this.mass),
                this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)),
                this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta),
                this.m_A = 1,
                this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0,
                this.m_A = 1,
                this.m_B = -this.initialVelocity + this.m_w0)
            }
            solve(t) {
                return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
            }
        }
        const a = /\d*\.?\d+/g;
        n.fromCSSString = function(t) {
            let e = t.match(a);
            if (4 !== e.length)
                throw "SpringEasing could not convert ".concat(cssString, " to spring params");
            let i = e.map(Number)
              , o = new n(...i);
            const l = o.solve.bind(o);
            let h = 0;
            let c = function() {
                if (r[t])
                    return r[t];
                let e, i = 0;
                for (; ; ) {
                    h += 1 / 6;
                    if (1 === l(h)) {
                        if (i++,
                        i >= 16) {
                            e = h * (1 / 6);
                            break
                        }
                    } else
                        i = 0
                }
                return r[t] = e,
                r[t]
            }();
            return function(t) {
                return 0 === t || 1 === t ? t : l(s(t, 0, 1, 0, c))
            }
        }
        ,
        e.exports = n
    }
    , {
        161: 161
    }],
    89: [function(t, e, i) {
        "use strict";
        e.exports = class {
        }
    }
    , {}],
    90: [function(t, e, i) {
        "use strict";
        e.exports = ()=>Math.random().toString(16).slice(-4)
    }
    , {}],
    91: [function(t, e, i) {
        "use strict";
        const s = Math.abs;
        class r {
            constructor(t, e, i, s) {
                this.cp = new Float32Array(6),
                this.cp[0] = 3 * t,
                this.cp[1] = 3 * (i - t) - this.cp[0],
                this.cp[2] = 1 - this.cp[0] - this.cp[1],
                this.cp[3] = 3 * e,
                this.cp[4] = 3 * (s - e) - this.cp[3],
                this.cp[5] = 1 - this.cp[3] - this.cp[4]
            }
            sampleCurveX(t) {
                return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
            }
            sampleCurveY(t) {
                return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
            }
            sampleCurveDerivativeX(t) {
                return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
            }
            solveCurveX(t) {
                var e, i, r, n, a, o;
                for (r = t,
                o = 0; o < 5; o++) {
                    if (n = this.sampleCurveX(r) - t,
                    s(n) < 1e-5)
                        return r;
                    if (a = this.sampleCurveDerivativeX(r),
                    s(a) < 1e-5)
                        break;
                    r -= n / a
                }
                if ((r = t) < (e = 0))
                    return e;
                if (r > (i = 1))
                    return i;
                for (; e < i; ) {
                    if (n = this.sampleCurveX(r),
                    s(n - t) < 1e-5)
                        return r;
                    t > n ? e = r : i = r,
                    r = .5 * (i - e) + e
                }
                return r
            }
            solve(t) {
                return this.sampleCurveY(this.solveCurveX(t))
            }
        }
        const n = /\d*\.?\d+/g;
        r.fromCSSString = function(t) {
            let e = t.match(n);
            if (4 !== e.length)
                throw "UnitBezier could not convert ".concat(t, " to cubic-bezier");
            let i = e.map(Number)
              , s = new r(i[0],i[1],i[2],i[3]);
            return s.solve.bind(s)
        }
        ,
        e.exports = r
    }
    , {}],
    92: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e) {
                this.a = t.top - e,
                this.a < 0 && (this.a = t.top),
                this.b = t.top,
                this.d = t.bottom,
                this.c = Math.max(this.d - e, this.b)
            }
        }
    }
    , {}],
    93: [function(t, e, i) {
        "use strict";
        let s = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"];
        s.push(...s.map(t=>t.replace(/[A-Z]/g, t=>"-" + t.toLowerCase())));
        e.exports = {
            transformAttributes: ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
            cssAttributes: s,
            domAttributes: ["scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"],
            suffixFreeAttributes: ["opacity", "z-index", "font-weight", "zIndex", "fontWeight", "scrollLeft", "scrollTop", "scrollBy", "scrollTo", "currentTime"]
        }
    }
    , {}],
    94: [function(t, e, i) {
        "use strict";
        const s = t(98);
        e.exports = class extends s {
            constructor(...t) {
                super(...t);
                const e = t[0];
                this.initialValue = new Float32Array(e),
                this.target = new Float32Array(e),
                this.current = new Float32Array(e),
                this.previousValue = new Float32Array(e)
            }
            update(t, e, i) {
                for (let s = 0, r = this.target.length; s < r; s++)
                    this.target[s] = t[0][s] + e * (t[1][s] - t[0][s]),
                    this.previousValue[s] = this.current[s],
                    this.current[s] += (this.target[s] - this.current[s]) * i;
                let s = this.delta(this.current, this.target);
                return s < this.epsilon && (this.current = new Float32Array(this.target),
                s = 0),
                s > this.epsilon || 0 === s && this.previousValue.some((t,e)=>t !== this.current[e])
            }
            reconcile(t, e) {
                return this.initialValue.forEach((e,i)=>this.initialValue[i] = t[0][i]),
                this.update(t, e, 1)
            }
            needsUpdate() {
                return this.delta(this.current, this.target) > this.epsilon
            }
            delta(t, e) {
                let i = 0;
                for (let s = 0, r = t.length; s < r; s++)
                    i += Math.abs(t[s] - e[s]);
                return i
            }
            calculateEpsilon(t, e) {
                this.epsilon = t.epsilon || .05
            }
            set(t) {
                throw "ArrayTargetValue does not implement a `set` method. Subclasses must overwrite"
            }
            unset(t) {
                throw "ArrayTargetValue does not implement an `unset` method. Subclasses must overwrite"
            }
        }
    }
    , {
        98: 98
    }],
    95: [function(t, e, i) {
        "use strict";
        const s = t(94);
        e.exports = class extends s {
            set(t) {
                const e = "rgba(".concat(Math.round(this.current[0]), ",").concat(Math.round(this.current[1]), ",").concat(Math.round(this.current[2]), ",").concat(this.current[3], ")");
                t.setProperty(this.key, e)
            }
            unset(t) {
                t.removeProperty(this.key)
            }
        }
    }
    , {
        94: 94
    }],
    96: [function(t, e, i) {
        "use strict";
        const s = t(98)
          , r = t(107);
        e.exports = class extends s {
            constructor(t, e, i, s, n=!1, a) {
                super(t, e, i, s = r(s), n, a)
            }
            set(t) {
                let e = this.current;
                this.round && (e = Math.round(e)),
                this.suffix && (e += this.suffix),
                t.setProperty(this.key, e)
            }
            unset(t) {
                t.removeProperty(this.key)
            }
        }
    }
    , {
        107: 107,
        98: 98
    }],
    97: [function(t, e, i) {
        "use strict";
        const s = t(94)
          , r = t(105);
        e.exports = class extends s {
            constructor(t, e, i, s, n, a, o) {
                super(r.parseExpression(null, t), e, i, s, n, a),
                this.applyToStyle = o,
                this.pathStrings = r.getPathStrings(t)
            }
            update(t, e, i) {
                if (t[0].length !== t[1].length)
                    throw new Error("Path length mismatch. Start/end paths must must contain the same number of points. Start value: \r ".concat(r.reconstructPath(t[0], this.pathStrings)));
                return super.update(t, e, i)
            }
            set(t) {
                const e = r.reconstructPath(this.current, this.pathStrings);
                this.applyToStyle ? t.setProperty(this.key, e) : t.setAttribute("d", e)
            }
            unset(t) {
                if (this.applyToStyle)
                    t.removeProperty(this.key);
                else {
                    const e = r.reconstructPath(this.initialValue, this.pathStrings);
                    t.setAttribute("d", e)
                }
            }
        }
    }
    , {
        105: 105,
        94: 94
    }],
    98: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e, i, s, r=!1, n) {
                this.epsilon = parseFloat(e),
                this.snapAtCreation = i,
                this.initialValue = t,
                this.target = t,
                this.current = t,
                this.previousValue = t,
                this.isActive = !1,
                this.key = s,
                this.round = r,
                this.suffix = n
            }
            update(t, e, i) {
                this.target = t[0] + e * (t[1] - t[0]),
                this.previousValue = this.current,
                this.current += (this.target - this.current) * i;
                let s = this.delta(this.current, this.target);
                return s < this.epsilon && (this.current = this.target,
                s = 0),
                s > this.epsilon || 0 === s && this.previousValue !== this.current
            }
            reconcile(t, e) {
                return this.initialValue = t[0],
                this.update(t, e, 1)
            }
            needsUpdate() {
                return this.delta(this.current, this.target) > this.epsilon
            }
            delta(t, e) {
                return Math.abs(t - e)
            }
            calculateEpsilon(t, e) {
                if (t.epsilon)
                    return void (this.epsilon = t.epsilon);
                let i = this.delta(e[0], e[1])
                  , s = Math.min(.001 * i, this.epsilon, .05);
                this.epsilon = Math.max(s, .001)
            }
            set(t) {
                let e = this.current;
                this.round && (e = Math.round(e)),
                this.suffix && (e += this.suffix),
                t[this.key] = e
            }
            unset(t) {}
        }
    }
    , {}],
    99: [function(t, e, i) {
        "use strict";
        const s = t(100)
          , r = new (t(84));
        class n {
            constructor(t) {
                this.group = t,
                this.data = {
                    target: null,
                    anchors: null,
                    metrics: this.group.metrics
                }
            }
            parseArray(t, e) {
                return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
            }
            parseExpression(t, e) {
                if (null == e)
                    return null;
                if ("number" == typeof e)
                    return e;
                if ("string" != typeof e)
                    throw "Expression must be a string, received ".concat(typeof e, ": ").concat(e);
                return this.data.target = t.controller.element,
                this.data.anchors = t.anchors,
                this.data.keyframe = t.keyframe,
                this.group.anim.plugins.parser.reduce((i,s)=>i || s.parseExpression.call(this, t, e), null) || n._parse(e, this.data)
            }
            parseTimeValue(t, e) {
                if ("number" == typeof e)
                    return e;
                let i = this.group.expressionParser.parseExpression(t, e);
                return this.group.convertScrollPositionToTValue(i)
            }
            destroy() {
                this.group = null
            }
            static parse(t, e) {
                return (e = e || {}) && (r.clear(),
                e.target && r.add(e.target),
                e.anchors && e.anchors.forEach(t=>r.add(t))),
                e.metrics = r,
                n._parse(t, e)
            }
            static _parse(t, e) {
                return s.Parse(t).execute(e)
            }
        }
        n.programs = s.programs,
        "undefined" != typeof window && (window.ExpressionParser = n),
        e.exports = n
    }
    , {
        100: 100,
        84: 84
    }],
    100: [function(t, e, i) {
        "use strict";
        const s = t(82)
          , r = t(161)
          , n = t(83)
          , a = {}
          , o = {
            smoothstep: (t,e,i)=>(i = o.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
            deg: t=>180 * t / Math.PI,
            rad: t=>t * Math.PI / 180,
            random: (t,e)=>Math.random() * (e - t) + t,
            atan: Math.atan2
        };
        Object.getOwnPropertyNames(Math).forEach(t=>o[t] ? null : o[t.toLowerCase()] = Math[t]),
        Object.getOwnPropertyNames(r).forEach(t=>o[t] ? null : o[t.toLowerCase()] = r[t]),
        Object.getOwnPropertyNames(n).forEach(t=>o[t] = n[t]);
        let l = null;
        const h = "a"
          , c = "ALPHA"
          , u = "("
          , d = ")"
          , m = "PLUS"
          , p = "MINUS"
          , f = "MUL"
          , g = "DIV"
          , _ = "INTEGER_CONST"
          , y = "FLOAT_CONST"
          , v = ","
          , E = "EOF"
          , b = {
            NUMBERS: /\d|\d\.\d/,
            DIGIT: /\d/,
            OPERATOR: /[-+*/]/,
            PAREN: /[()]/,
            WHITE_SPACE: /\s/,
            ALPHA: /[a-zA-Z]|%/,
            ALPHANUMERIC: /[a-zA-Z0-9]/,
            OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
            GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
            ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw|rad|deg)$/,
            MATH_FUNCTION: new RegExp("\\b(".concat(Object.keys(o).join("|"), ")\\b"),"i")
        }
          , w = function(t, e, i, s="") {
            let r = e.slice(Math.max(i, 0), Math.min(e.length, i + 3))
              , n = new Error("Expression Error. ".concat(t, ' in expression "').concat(e, '", near "').concat(r, '"'));
            throw console.error(n.message, l ? l.keyframe || l.target : ""),
            n
        }
          , A = {
            round: 1,
            clamp: 3,
            lerp: 3,
            random: 2,
            atan: 2,
            floor: 1,
            ceil: 1,
            abs: 1,
            cos: 1,
            sin: 1,
            smoothstep: 3,
            rad: 1,
            deg: 1,
            pow: 2,
            calc: 1
        };
        class I {
            constructor(t, e) {
                this.type = t,
                this.value = e
            }
        }
        I.ONE = new I("100",100),
        I.EOF = new I(E,null);
        class T {
            constructor(t) {
                this.type = t
            }
        }
        class x extends T {
            constructor(t, e) {
                super("UnaryOp"),
                this.token = this.op = t,
                this.expr = e
            }
        }
        class S extends T {
            constructor(t, e, i) {
                super("BinOp"),
                this.left = t,
                this.op = e,
                this.right = i
            }
        }
        class P extends T {
            constructor(t, e) {
                if (super("MathOp"),
                this.op = t,
                this.list = e,
                A[t.value] && e.length !== A[t.value])
                    throw new Error("Incorrect number of arguments for '".concat(t.value, "'. Received ").concat(e.length, ", expected ").concat(A[t.value]))
            }
        }
        class O extends T {
            constructor(t) {
                super("Num"),
                this.token = t,
                this.value = t.value
            }
        }
        class C extends T {
            constructor(t, e, i) {
                super("RefValue"),
                this.num = t,
                this.ref = e,
                this.unit = i
            }
        }
        class D extends T {
            constructor(t, e) {
                super("CSSValue"),
                this.ref = t,
                this.propertyName = e
            }
        }
        class M extends T {
            constructor(t, e) {
                super("PropValue"),
                this.ref = t,
                this.propertyName = e
            }
        }
        class N {
            constructor(t) {
                let e;
                for (this.text = t,
                this.pos = 0,
                this.char = this.text[this.pos],
                this.tokens = []; (e = this.getNextToken()) && e !== I.EOF; )
                    this.tokens.push(e);
                this.tokens.push(e)
            }
            advance() {
                this.char = this.text[++this.pos]
            }
            skipWhiteSpace() {
                for (; null != this.char && b.WHITE_SPACE.test(this.char); )
                    this.advance()
            }
            name() {
                let t = "";
                for (; null != this.char && b.ALPHA.test(this.char); )
                    t += this.char,
                    this.advance();
                return new I(c,t)
            }
            number() {
                let t = "";
                for ("." === this.char && (t += this.char,
                this.advance()); null != this.char && b.DIGIT.test(this.char); )
                    t += this.char,
                    this.advance();
                if (null != this.char && "." === this.char)
                    for (t.includes(".") && w("Number appears to contain 2 decimal points", this.text, this.pos),
                    t += this.char,
                    this.advance(); null != this.char && b.DIGIT.test(this.char); )
                        t += this.char,
                        this.advance();
                return "." === t && w("Attempted to parse a number, but found only a decimal point", this.text, this.pos),
                t.includes(".") ? new I(y,parseFloat(t)) : new I(_,parseInt(t))
            }
            getNextToken() {
                for (; null != this.char; )
                    if (b.WHITE_SPACE.test(this.char))
                        this.skipWhiteSpace();
                    else {
                        if ("." === this.char || b.DIGIT.test(this.char))
                            return this.number();
                        if ("," === this.char)
                            return this.advance(),
                            new I(v,",");
                        if (b.OPERATOR.test(this.char)) {
                            let t = ""
                              , e = this.char;
                            switch (e) {
                            case "+":
                                t = m;
                                break;
                            case "-":
                                t = p;
                                break;
                            case "*":
                                t = f;
                                break;
                            case "/":
                                t = g
                            }
                            return this.advance(),
                            new I(t,e)
                        }
                        if (b.PAREN.test(this.char)) {
                            let t = ""
                              , e = this.char;
                            switch (e) {
                            case "(":
                                t = u;
                                break;
                            case ")":
                                t = d
                            }
                            return this.advance(),
                            new I(t,e)
                        }
                        if (b.ALPHA.test(this.char))
                            return this.name();
                        w('Unexpected character "'.concat(this.char, '"'), this.text, this.pos)
                    }
                return I.EOF
            }
        }
        class R {
            constructor(t) {
                this.lexer = t,
                this.pos = 0
            }
            get currentToken() {
                return this.lexer.tokens[this.pos]
            }
            error(t, e="") {
                w(t, e, this.lexer.text, this.pos)
            }
            consume(t) {
                let e = this.currentToken;
                return e.type === t ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(t)),
                e
            }
            consumeList(t) {
                t.includes(this.currentToken) ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(tokenType))
            }
            expr() {
                let t = this.term();
                for (; this.currentToken.type === m || this.currentToken.type === p; ) {
                    const e = this.currentToken;
                    switch (e.value) {
                    case "+":
                        this.consume(m);
                        break;
                    case "-":
                        this.consume(p)
                    }
                    t = new S(t,e,this.term())
                }
                return t
            }
            term() {
                let t = this.factor();
                for (; this.currentToken.type === f || this.currentToken.type === g; ) {
                    const e = this.currentToken;
                    switch (e.value) {
                    case "*":
                        this.consume(f);
                        break;
                    case "/":
                        this.consume(g)
                    }
                    t = new S(t,e,this.factor())
                }
                return t
            }
            factor() {
                if (this.currentToken.type === m)
                    return new x(this.consume(m),this.factor());
                if (this.currentToken.type === p)
                    return new x(this.consume(p),this.factor());
                if (this.currentToken.type === _ || this.currentToken.type === y) {
                    let t = new O(this.currentToken);
                    if (this.pos += 1,
                    b.OPERATOR.test(this.currentToken.value) || this.currentToken.type === d || this.currentToken.type === v || this.currentToken.type === E)
                        return t;
                    if (this.currentToken.type === c && this.currentToken.value === h)
                        return this.consume(c),
                        new C(t,this.anchorIndex(),this.unit(b.ANY_UNIT));
                    if (this.currentToken.type === c)
                        return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"),
                        new C(t,null,this.unit());
                    this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
                } else {
                    if (b.OBJECT_UNIT.test(this.currentToken.value))
                        return new C(new O(I.ONE),null,this.unit());
                    if (this.currentToken.value === h) {
                        this.consume(c);
                        const t = this.anchorIndex();
                        if (b.OBJECT_UNIT.test(this.currentToken.value))
                            return new C(new O(I.ONE),t,this.unit())
                    } else if (this.currentToken.type === c) {
                        if ("calc" === this.currentToken.value)
                            return this.consume(c),
                            this.expr();
                        if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                            const t = "prop" !== this.currentToken.value ? D : M;
                            this.consume(c),
                            this.consume(u);
                            const e = this.propertyName();
                            let i = null;
                            return this.currentToken.type === v && (this.consume(v),
                            this.consume(c),
                            i = this.anchorIndex()),
                            this.consume(d),
                            new t(i,e)
                        }
                        if (b.MATH_FUNCTION.test(this.currentToken.value)) {
                            const t = this.currentToken.value
                              , e = t.toLowerCase();
                            if ("number" == typeof o[e])
                                return this.consume(c),
                                new O(new I(c,o[e]));
                            const i = I[t] || new I(t,t)
                              , s = [];
                            this.consume(c),
                            this.consume(u);
                            let r = null;
                            do {
                                this.currentToken.value === v && this.consume(v),
                                r = this.expr(),
                                s.push(r)
                            } while (this.currentToken.value === v);
                            return this.consume(d),
                            new P(i,s)
                        }
                    } else if (this.currentToken.type === u) {
                        this.consume(u);
                        let t = this.expr();
                        return this.consume(d),
                        t
                    }
                }
                this.error("Unexpected token ".concat(this.currentToken.value))
            }
            propertyName() {
                let t = "";
                for (; this.currentToken.type === c || this.currentToken.type === p; )
                    t += this.currentToken.value,
                    this.pos += 1;
                return t
            }
            unit(t=b.ANY_UNIT) {
                const e = this.currentToken;
                if (e.type === c && t.test(e.value))
                    return this.consume(c),
                    new I(c,e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
                this.error("Expected unit type")
            }
            anchorIndex() {
                const t = this.currentToken;
                if (t.type === _)
                    return this.consume(_),
                    new O(t);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
            }
            parse() {
                const t = this.expr();
                return this.currentToken !== I.EOF && this.error("Unexpected token ".concat(this.currentToken.value)),
                t
            }
        }
        class L {
            constructor(t) {
                this.parser = t,
                this.root = t.parse()
            }
            visit(t) {
                let e = this[t.type];
                if (!e)
                    throw new Error("No visit method named, ".concat(e));
                return e.call(this, t)
            }
            BinOp(t) {
                switch (t.op.type) {
                case m:
                    return this.visit(t.left) + this.visit(t.right);
                case p:
                    return this.visit(t.left) - this.visit(t.right);
                case f:
                    return this.visit(t.left) * this.visit(t.right);
                case g:
                    return this.visit(t.left) / this.visit(t.right)
                }
            }
            RefValue(t) {
                let e = this.unwrapReference(t)
                  , i = t.unit.value
                  , r = t.num.value;
                const n = l.metrics.get(e);
                switch (i) {
                case "h":
                    return .01 * r * n.height;
                case "t":
                    return .01 * r * n.top;
                case "vh":
                    return .01 * r * s.pageMetrics.windowHeight;
                case "vw":
                    return .01 * r * s.pageMetrics.windowWidth;
                case "px":
                    return r;
                case "w":
                    return .01 * r * n.width;
                case "b":
                    return .01 * r * n.bottom;
                case "l":
                    return .01 * r * n.left;
                case "r":
                    return .01 * r * n.right;
                case "rad":
                    return 180 * r / Math.PI;
                case "deg":
                    return r
                }
            }
            PropValue(t) {
                return (null === t.ref ? l.target : l.anchors[t.ref.value])[t.propertyName]
            }
            CSSValue(t) {
                let e = this.unwrapReference(t);
                const i = getComputedStyle(e).getPropertyValue(t.propertyName);
                return "" === i ? 0 : L.Parse(i).execute(l)
            }
            Num(t) {
                return t.value
            }
            UnaryOp(t) {
                return t.op.type === m ? +this.visit(t.expr) : t.op.type === p ? -this.visit(t.expr) : void 0
            }
            MathOp(t) {
                let e = t.list.map(t=>this.visit(t));
                return o[t.op.value].apply(null, e)
            }
            unwrapReference(t) {
                return null === t.ref ? l.target : (t.ref.value >= l.anchors.length && console.error("Not enough anchors supplied for expression ".concat(this.parser.lexer.text), l.target),
                l.anchors[t.ref.value])
            }
            execute(t) {
                return l = t,
                this.visit(this.root)
            }
            static Parse(t) {
                return a[t] || (a[t] = new L(new R(new N(t))))
            }
        }
        L.programs = a,
        e.exports = L
    }
    , {
        161: 161,
        82: 82,
        83: 83
    }],
    101: [function(t, e, i) {
        "use strict";
        const s = t(73)
          , r = t(161)
          , n = t(106)
          , a = t(82)
          , o = t(81)
          , l = t(87)
          , h = t(92)
          , c = t(84)
          , u = t(99)
          , d = t(79)
          , m = {};
        "undefined" != typeof window && (m.create = t(52),
        m.update = t(65),
        m.draw = t(61));
        let p = 0;
        e.exports = class extends s {
            constructor(t, e) {
                super(),
                this.anim = e,
                this.element = t,
                this.name = this.name || t.getAttribute("data-anim-scroll-group"),
                this.isEnabled = !0,
                this.position = new l,
                this.metrics = new c,
                this.metrics.add(this.element),
                this.expressionParser = new u(this),
                this.boundsMin = 0,
                this.boundsMax = 0,
                this.timelineUpdateRequired = !1,
                this._keyframesDirty = !1,
                this.viewableRange = this.createViewableRange(),
                this.defaultEase = a.KeyframeDefaults.ease,
                this.keyframeControllers = [],
                this.updateProgress(this.getPosition()),
                this.onDOMRead = this.onDOMRead.bind(this),
                this.onDOMWrite = this.onDOMWrite.bind(this),
                this.gui = null,
                this.computedStyleCache = {},
                this.destroyed = !1,
                this.finalizeInit()
            }
            finalizeInit() {
                this.element._animInfo = new o(this,null,!0),
                this.setupRAFEmitter()
            }
            destroy() {
                this.destroyed = !0,
                this.expressionParser.destroy(),
                this.expressionParser = null;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].destroy();
                this.keyframeControllers = null,
                this.position = null,
                this.viewableRange = null,
                this.gui && (this.gui.destroy(),
                this.gui = null),
                this.metrics.destroy(),
                this.metrics = null,
                this.rafEmitter.destroy(),
                this.rafEmitter = null,
                this.anim = null,
                this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null,
                this.element._animInfo = null),
                this.element = null,
                this.isEnabled = !1,
                super.destroy()
            }
            removeKeyframeController(t) {
                return t.destroyed || !this.keyframeControllers.includes(t) ? Promise.resolve() : (t._allKeyframes.forEach(t=>t.markedForRemoval = !0),
                this.keyframesDirty = !0,
                new Promise(e=>{
                    m.draw(()=>{
                        const i = this.keyframeControllers.indexOf(t);
                        -1 !== i ? (this.keyframeControllers.splice(i, 1),
                        t.onDOMWrite(),
                        t.destroy(),
                        this.gui && this.gui.create(),
                        e()) : e()
                    }
                    )
                }
                ))
            }
            remove() {
                return this.anim && this.anim.removeGroup(this)
            }
            clear() {
                return Promise.all(this.keyframeControllers.map(t=>this.removeKeyframeController(t)))
            }
            setupRAFEmitter(t) {
                this.rafEmitter && this.rafEmitter.destroy(),
                this.rafEmitter = t || new m.create,
                this.rafEmitter.on("update", this.onDOMRead),
                this.rafEmitter.on("draw", this.onDOMWrite),
                this.rafEmitter.once("external", ()=>this.reconcile())
            }
            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run()
            }
            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].onDOMRead(this.position.local)
            }
            onDOMWrite() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange(),
                this.computedStyleCache = {}
            }
            needsUpdate() {
                if (this._keyframesDirty)
                    return !0;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    if (this.keyframeControllers[t].needsUpdate())
                        return !0;
                return !1
            }
            addKeyframe(t, e) {
                let i = this.getControllerForTarget(t);
                return null === i && (i = new d(this,t),
                this.keyframeControllers.push(i)),
                this.keyframesDirty = !0,
                i.addKeyframe(e)
            }
            addEvent(t, e) {
                e.event = e.event || "Generic-Event-Name-" + p++;
                let i = void 0 !== e.end && e.end !== e.start;
                const s = this.addKeyframe(t, e);
                return i ? (e.onEnterOnce && s.controller.once(e.event + ":enter", e.onEnterOnce),
                e.onExitOnce && s.controller.once(e.event + ":exit", e.onExitOnce),
                e.onEnter && s.controller.on(e.event + ":enter", e.onEnter),
                e.onExit && s.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && s.controller.once(e.event, e.onEventOnce),
                e.onEventReverseOnce && s.controller.once(e.event + ":reverse", e.onEventReverseOnce),
                e.onEvent && s.controller.on(e.event, e.onEvent),
                e.onEventReverse && s.controller.on(e.event + ":reverse", e.onEventReverse)),
                s
            }
            forceUpdate({waitForNextUpdate: t=!0, silent: e=!1}={}) {
                this.isEnabled && (this.refreshMetrics(),
                this.timelineUpdateRequired = !0,
                t ? this.keyframesDirty = !0 : this.onKeyframesDirty({
                    silent: e
                }))
            }
            onKeyframesDirty({silent: t=!1}={}) {
                this.determineActiveKeyframes(),
                this.keyframesDirty = !1,
                this.metrics.refreshMetrics(this.element),
                this.viewableRange = this.createViewableRange();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].updateAnimationConstraints();
                this.updateBounds(),
                this.updateProgress(this.getPosition()),
                t || this.updateTimeline(),
                this.gui && this.gui.create()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this.keyframeControllers.forEach(e=>{
                    t.add(e.element),
                    e._allKeyframes.forEach(e=>e.anchors.forEach(e=>t.add(e)))
                }
                ),
                this.metrics.refreshCollection(t),
                this.viewableRange = this.createViewableRange()
            }
            reconcile() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].reconcile()
            }
            determineActiveKeyframes(t) {
                t = t || n(Array.from(document.documentElement.classList));
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].determineActiveKeyframes(t)
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                    void (this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].getBounds(t);
                let e = this.convertTValueToScrollPosition(t.min)
                  , i = this.convertTValueToScrollPosition(t.max);
                i - e < a.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * a.pageMetrics.windowHeight),
                t.max = this.convertScrollPositionToTValue(i + .5 * a.pageMetrics.windowHeight)) : (t.min -= .001,
                t.max += .001),
                this.boundsMin = t.min,
                this.boundsMax = t.max,
                this.timelineUpdateRequired = !0
            }
            createViewableRange() {
                return new h(this.metrics.get(this.element),a.pageMetrics.windowHeight)
            }
            _onBreakpointChange(t, e) {
                this.keyframesDirty = !0,
                this.determineActiveKeyframes()
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a),
                this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            performTimelineDispatch() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    this.keyframeControllers[t].updateLocalProgress(this.position.local);
                this.trigger(a.EVENTS.ON_TIMELINE_UPDATE, this.position.local),
                this.trigger("update", this.position.local),
                this.timelineUpdateRequired = !1,
                this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START, this),
                this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(a.EVENTS.ON_TIMELINE_START + ":reverse", this),
                this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE, this),
                this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(a.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this),
                this.trigger("complete:reverse", this))),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            updateTimeline(t) {
                if (!this.isEnabled)
                    return !1;
                void 0 === t && (t = this.getPosition()),
                this.updateProgress(t);
                let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax
                  , i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && e && i && this.position.lastPosition === t)
                    return void (this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax)
                    return this.performTimelineDispatch(),
                    this.requestDOMChange(),
                    void (this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax
                  , r = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && r)
                    return this.performTimelineDispatch(),
                    this.requestDOMChange(),
                    void (this.position.lastPosition = this.position.localUnclamped);
                const n = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax
                  , a = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (n || a) && (this.performTimelineDispatch(),
                this.requestDOMChange(),
                this.position.lastPosition = this.position.localUnclamped),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            _onScroll(t) {
                this.updateTimeline(t)
            }
            convertScrollPositionToTValue(t) {
                return this.hasDuration() ? r.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
            }
            convertTValueToScrollPosition(t) {
                return this.hasDuration() ? r.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
            }
            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d
            }
            getPosition() {
                return a.pageMetrics.scrollY
            }
            getControllerForTarget(t) {
                if (!t._animInfo || !t._animInfo.controllers)
                    return null;
                if (t._animInfo.controller && t._animInfo.controller.group === this)
                    return t._animInfo.controller;
                const e = t._animInfo.controllers;
                for (let t = 0, i = e.length; t < i; t++)
                    if (e[t].group === this)
                        return e[t];
                return null
            }
            trigger(t, e) {
                if (void 0 !== this._events[t])
                    for (let i = this._events[t].length - 1; i >= 0; i--)
                        void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
            }
            set keyframesDirty(t) {
                this._keyframesDirty = t,
                this._keyframesDirty && this.requestDOMChange()
            }
            get keyframesDirty() {
                return this._keyframesDirty
            }
        }
    }
    , {
        106: 106,
        161: 161,
        52: 52,
        61: 61,
        65: 65,
        73: 73,
        79: 79,
        81: 81,
        82: 82,
        84: 84,
        87: 87,
        92: 92,
        99: 99
    }],
    102: [function(t, e, i) {
        "use strict";
        const s = t(101)
          , r = t(76)
          , n = t(161);
        let a = 0;
        const o = {};
        "undefined" != typeof window && (o.create = t(52));
        class l extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TimeGroup-" + a++),
                super(t, e),
                this.name = this.name || t.getAttribute("data-anim-time-group"),
                this._isPaused = !0,
                this._repeats = 0,
                this._isReversed = !1,
                this._timeScale = 1,
                this._chapterPlayer = new r(this),
                this.now = performance.now()
            }
            finalizeInit() {
                if (!this.anim)
                    throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this),
                super.finalizeInit()
            }
            progress(t) {
                if (void 0 === t)
                    return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let e = t * this.boundsMax;
                this.timelineUpdateRequired = !0,
                this.updateTimeline(e)
            }
            time(t) {
                if (void 0 === t)
                    return this.position.local;
                t = n.clamp(t, this.boundsMin, this.duration),
                this.timelineUpdateRequired = !0,
                this.updateTimeline(t)
            }
            play(t) {
                this.reversed(!1),
                this.isEnabled = !0,
                this._isPaused = !1,
                this.time(t),
                this.now = performance.now(),
                this._playheadEmitter.run()
            }
            reverse(t) {
                this.reversed(!0),
                this.isEnabled = !0,
                this._isPaused = !1,
                this.time(t),
                this.now = performance.now(),
                this._playheadEmitter.run()
            }
            reversed(t) {
                if (void 0 === t)
                    return this._isReversed;
                this._isReversed = t
            }
            restart() {
                this._isReversed ? (this.progress(1),
                this.reverse(this.time())) : (this.progress(0),
                this.play(this.time()))
            }
            pause(t) {
                this.time(t),
                this._isPaused = !0
            }
            paused(t) {
                return void 0 === t ? this._isPaused : (this._isPaused = t,
                this._isPaused || this.play(),
                this)
            }
            onPlayTimeUpdate() {
                if (this._isPaused)
                    return;
                let t = performance.now()
                  , e = (t - this.now) / 1e3;
                this.now = t,
                this._isReversed && (e = -e);
                let i = this.time() + e * this._timeScale;
                if (this._repeats === l.REPEAT_FOREVER || this._repeats > 0) {
                    let t = !1;
                    !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax,
                    t = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i,
                    t = !0),
                    t && (this._repeats = this._repeats === l.REPEAT_FOREVER ? l.REPEAT_FOREVER : this._repeats - 1)
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration
                  , r = this._isReversed && 0 !== this.position.local;
                s || r ? this._playheadEmitter.run() : this.paused(!0)
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = t,
                this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length)
                    return this.boundsMin = 0,
                    void (this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++)
                    this.keyframeControllers[e].getBounds(t);
                this.boundsMin = 0,
                this.boundsMax = t.max,
                this.viewableRange.a = this.viewableRange.b = 0,
                this.viewableRange.c = this.viewableRange.d = this.boundsMax,
                this.timelineUpdateRequired = !0
            }
            setupRAFEmitter(t) {
                this._playheadEmitter = new o.create,
                this._playheadEmitter.on("update", this.onPlayTimeUpdate),
                super.setupRAFEmitter(t)
            }
            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({
                    silent: !0
                }),
                this.boundsMax
            }
            timeScale(t) {
                return void 0 === t ? this._timeScale : (this._timeScale = t,
                this)
            }
            repeats(t) {
                if (void 0 === t)
                    return this._repeats;
                this._repeats = t
            }
            getPosition() {
                return this.position.local
            }
            addChapter(t) {
                return this._chapterPlayer.addChapter(t)
            }
            playToChapter(t) {
                return this._chapterPlayer.playToChapter(t)
            }
            convertScrollPositionToTValue(t) {
                return t
            }
            convertTValueToScrollPosition(t) {
                return t
            }
            hasDuration() {
                return this.duration > 0
            }
            destroy() {
                this._chapterPlayer.destroy(),
                this._playheadEmitter.destroy(),
                this._playheadEmitter = null,
                super.destroy()
            }
            get timelineProgress() {
                return this.progress()
            }
            set timelineProgress(t) {
                this.progress(t)
            }
            get progressValue() {
                return this.progress()
            }
            set progressValue(t) {
                this.progress(t)
            }
            get timeValue() {
                return this.time()
            }
            set timeValue(t) {
                this.time(t)
            }
        }
        l.REPEAT_FOREVER = -1,
        e.exports = l
    }
    , {
        101: 101,
        161: 161,
        52: 52,
        76: 76
    }],
    103: [function(t, e, i) {
        "use strict";
        const s = t(101)
          , r = (t(76),
        t(161));
        let n = 0;
        const a = {};
        "undefined" != typeof window && (a.create = t(52));
        e.exports = class extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TweenGroup-" + n++),
                super(t, e),
                this.name = "Tweens",
                this.keyframes = [],
                this._isPaused = !1,
                this.now = performance.now()
            }
            finalizeInit() {
                this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this),
                this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this),
                super.finalizeInit()
            }
            destroy() {
                this._timeEmitter.destroy(),
                this._timeEmitter = null,
                this._keyframes = [],
                super.destroy()
            }
            setupRAFEmitter(t) {
                this.now = performance.now(),
                this._timeEmitter = new a.create,
                this._timeEmitter.on("update", this.onTimeEmitterUpdate),
                this._timeEmitter.run(),
                super.setupRAFEmitter(t)
            }
            addKeyframe(t, e) {
                if (void 0 !== e.start || void 0 !== e.end)
                    throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof e.duration)
                    throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                e.start = (e.delay || 0) + this.position.localUnclamped,
                e.end = e.start + e.duration,
                e.preserveState = !0,
                e.snapAtCreation = !0,
                t._animInfo && (i = t._animInfo.group,
                s = t._animInfo.controller);
                let r = super.addKeyframe(t, e);
                return t._animInfo.group = i,
                t._animInfo.controller = s,
                [["onStart", "once"], ["onDraw", "on"]].forEach(([t,i])=>{
                    if (!e[t])
                        return;
                    let s = e[t];
                    e[t] = r.controller[i]("draw", t=>{
                        r.markedForRemoval || (t.keyframe = r,
                        s(t),
                        t.keyframe = null)
                    }
                    )
                }
                ),
                this.removeOverlappingProps(r),
                this.keyframes.push(r),
                this._timeEmitter.willRun() || (this.now = performance.now(),
                this._timeEmitter.run()),
                r
            }
            removeOverlappingProps(t) {
                if (t.controller._allKeyframes.length <= 1)
                    return;
                let e = Object.keys(t.animValues)
                  , i = t.controller;
                for (let s = 0, r = i._allKeyframes.length; s < r; s++) {
                    const r = i._allKeyframes[s];
                    if (r === t)
                        continue;
                    if (r.markedForRemoval)
                        continue;
                    let n = Object.keys(r.animValues)
                      , a = n.filter(t=>e.includes(t));
                    a.length !== n.length ? a.forEach(t=>delete r.animValues[t]) : (r.markedForRemoval = !0,
                    r.jsonProps.onDraw && r.controller.off("draw", r.jsonProps.onDraw))
                }
            }
            onTimeEmitterUpdate(t) {
                if (this._isPaused || 0 === this.keyframeControllers.length)
                    return;
                let e = performance.now()
                  , i = (e - this.now) / 1e3;
                this.now = e;
                let s = this.position.local + i;
                this.position.local = this.position.localUnclamped = s,
                this.onTimeUpdate()
            }
            onTimeUpdate() {
                for (let t = 0, e = this.keyframes.length; t < e; t++)
                    this.keyframes[t].markedForRemoval || this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(),
                this._timeEmitter.run(),
                null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            onDOMRead() {
                if (this.keyframesDirty && this.onKeyframesDirty(),
                0 !== this.keyframes.length)
                    for (let t = 0, e = this.keyframes.length; t < e; t++) {
                        this.keyframes[t].controller.needsWrite = !0;
                        for (let e in this.keyframes[t].animValues)
                            this.keyframes[t].onDOMRead(e)
                    }
            }
            onDOMWrite() {
                super.onDOMWrite(),
                this.removeExpiredKeyframes()
            }
            removeExpiredKeyframes() {
                let t = this.keyframes.length
                  , e = t;
                for (; t--; ) {
                    let e = this.keyframes[t];
                    e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e,
                    e.jsonProps.onComplete(e.controller.eventObject),
                    e.jsonProps.onComplete = null),
                    null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(),
                    this.keyframes.splice(t, 1)),
                    e.jsonProps.onStart && e.controller.off("draw", e.jsonProps.onStart),
                    e.jsonProps.onDraw && e.controller.off("draw", e.jsonProps.onDraw)),
                    1 === e.localT && (e.markedForRemoval = !0))
                }
                this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
            }
            removeExpiredKeyframeControllers() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
                    let e = !0
                      , i = this.keyframeControllers[t];
                    for (let t = 0, s = i._allKeyframes.length; t < s; t++)
                        if (!i._allKeyframes[t].destroyed) {
                            e = !1;
                            break
                        }
                    e && i.remove()
                }
            }
            updateBounds() {
                this.boundsMin = Math.min(...this.keyframes.map(t=>t.start)),
                this.boundsMax = Math.max(...this.keyframes.map(t=>t.end))
            }
            play() {
                this.isEnabled = !0,
                this._isPaused = !1,
                this.now = performance.now(),
                this._timeEmitter.run()
            }
            pause() {
                this._isPaused = !0
            }
            paused() {
                return this._isPaused
            }
            time(t) {
                if (void 0 === t)
                    return this.position.local;
                this.position.local = this.position.localUnclamped = r.clamp(t, this.boundsMin, this.boundsMax),
                this.onTimeUpdate()
            }
            performTimelineDispatch() {}
            hasDuration() {
                return !0
            }
            getPosition() {
                return this.position.local
            }
            updateProgress(t) {}
            get duration() {
                return this.boundsMax
            }
        }
    }
    , {
        101: 101,
        161: 161,
        52: 52,
        76: 76
    }],
    104: [function(t, e, i) {
        "use strict";
        const s = /-?\d*\.?\d+/gm;
        e.exports = {
            getStringNumbers: t=>t.match(s).map(t=>Number.parseFloat(t)),
            getStringNonNumbers: t=>t.split(s),
            reconstructStringWithNumbers(t, e) {
                let i = "";
                for (var s = 0, r = t.length; s < r; s++)
                    i += e[s] + t[s];
                return i += e[r],
                i
            },
            trim: t=>null === t ? t : t.replace(/\s+/gm, " ").trim()
        }
    }
    , {}],
    105: [function(t, e, i) {
        "use strict";
        const {trim: s, getStringNumbers: r, getStringNonNumbers: n, reconstructStringWithNumbers: a} = t(104)
          , o = /^\s*?M[(-?\d)|\s]/
          , l = /^(inset|circle|ellipse|polygon|path)\(/
          , h = t=>o.test(t)
          , c = t=>l.test(t);
        e.exports = {
            install(t, e) {
                t.plugins.parser.includes(this) || t.plugins.parser.push(this)
            },
            parseExpression: (t,e)=>"string" == typeof e && (h(e) || c(e)) ? r(e) : null,
            scalePath(t, e) {
                const i = this.parseExpression(null, t)
                  , s = n(t);
                for (let t = 0, s = i.length; t < s; t++)
                    i[t] = i[t] * e;
                return this.reconstructPath(i, s)
            },
            trim: s,
            getPathStrings: n,
            getPathNumbers: r,
            reconstructPath: a
        }
    }
    , {
        104: 104
    }],
    106: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t.reduce((t,e)=>(t[e] = e,
            t), {})
        }
    }
    , {}],
    107: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t.startsWith("--") ? t : t.replace(/[A-Z]/g, t=>"-" + t.toLowerCase())
        }
    }
    , {}],
    108: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            if ("string" != typeof t)
                return t;
            try {
                return (e || document).querySelector(t) || document.querySelector(t)
            } catch (t) {
                return !1
            }
        }
    }
    , {}],
    109: [function(t, e, i) {
        "use strict";
        const s = t(65)
          , r = t(61)
          , n = t(110)
          , a = t(112)
          , o = t(113)
          , l = t(111);
        e.exports = class {
            constructor(t, e={}) {
                if ("number" != typeof t || !isFinite(t))
                    throw new TypeError('Clip duration must be a finite number; got "'.concat(t, '"'));
                "function" == typeof e && (e = {
                    draw: e
                }),
                this.ease = a(e.ease),
                this.update = a(e.update),
                this.draw = a(e.draw),
                this.prepare = a(e.prepare),
                this.finish = a(e.finish),
                this._duration = 1e3 * t,
                this._startTime = null,
                this._isPrepared = !1,
                this._promise = null,
                this._isPlaying = !1
            }
            get isReversed() {
                return this._duration < 0
            }
            get isComplete() {
                const t = this.progress;
                return !this.isReversed && t >= 1 || this.isReversed && t <= 0
            }
            get progress() {
                if (0 === this._duration)
                    return 1;
                let t = (this.lastFrameTime - this._startTime) / this._duration;
                return this.isReversed && (t = 1 + t),
                l(t, 0, 1)
            }
            get easedProgress() {
                return this.ease ? this.ease(this.progress) : this.progress
            }
            _run(t, e) {
                this.lastFrameTime = Date.now(),
                null === this._startTime && (this._startTime = this.lastFrameTime);
                const i = this.easedProgress;
                this.update && s(()=>this._isPlaying && this.update(i)),
                r(()=>{
                    this._isPlaying && (this.draw && this.draw(i),
                    this.isComplete ? o(r, [this.finish, e]) : this._run(this, e))
                }
                )
            }
            play() {
                if ("function" != typeof this.draw)
                    throw new Error('Clip must be given a "draw" function as an option or have its "draw" method overriden.');
                return this._isPlaying = !0,
                this._promise || (this._promise = new Promise((t,e)=>{
                    !this._isPrepared && this.prepare ? (this._isPrepared = !0,
                    r(()=>n(this.prepare(), ()=>{
                        this._run(this, t)
                    }
                    ))) : this._run(this, t)
                }
                )),
                this._promise
            }
            destroy() {
                this._isPlaying = !1,
                this.draw = this.finish = this.update = this.prepare = null
            }
            static play() {
                return new this(...arguments).play()
            }
        }
    }
    , {
        110: 110,
        111: 111,
        112: 112,
        113: 113,
        61: 61,
        65: 65
    }],
    110: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            t instanceof Promise ? t.then(e) : e()
        }
    }
    , {}],
    111: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            return Math.min(Math.max(t, e), i)
        }
    }
    , {}],
    112: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "function" == typeof t ? t : null
        }
    }
    , {}],
    113: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            const i = e.length;
            let s = 0;
            !function r() {
                "function" == typeof e[s] && t(e[s]),
                s++,
                s < i && r()
            }()
        }
    }
    , {}],
    114: [function(t, e, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI
          , r = t=>Math.round(1e6 * t) / 1e6;
        function n(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
        }
        function a(t, e) {
            return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
        }
        function o(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }
        function l(t, e, i, s) {
            return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s]
        }
        function h(t) {
            const e = new Float32Array(4)
              , i = new Float32Array(3)
              , h = new Float32Array(3)
              , c = new Float32Array(3);
            c[0] = t[3][0],
            c[1] = t[3][1],
            c[2] = t[3][2];
            const u = new Array(3);
            for (let e = 0; e < 3; e++)
                u[e] = t[e].slice(0, 3);
            i[0] = n(u[0]),
            u[0] = a(u[0], i[0]),
            h[0] = o(u[0], u[1]),
            u[1] = l(u[1], u[0], 1, -h[0]),
            i[1] = n(u[1]),
            u[1] = a(u[1], i[1]),
            h[0] /= i[1],
            h[1] = o(u[0], u[2]),
            u[2] = l(u[2], u[0], 1, -h[1]),
            h[2] = o(u[1], u[2]),
            u[2] = l(u[2], u[1], 1, -h[2]),
            i[2] = n(u[2]),
            u[2] = a(u[2], i[2]),
            h[1] /= i[2],
            h[2] /= i[2];
            const d = (m = u[1],
            p = u[2],
            [m[1] * p[2] - m[2] * p[1], m[2] * p[0] - m[0] * p[2], m[0] * p[1] - m[1] * p[0]]);
            var m, p;
            if (o(u[0], d) < 0)
                for (let t = 0; t < 3; t++)
                    i[t] *= -1,
                    u[t][0] *= -1,
                    u[t][1] *= -1,
                    u[t][2] *= -1;
            let f;
            return e[0] = .5 * Math.sqrt(Math.max(1 + u[0][0] - u[1][1] - u[2][2], 0)),
            e[1] = .5 * Math.sqrt(Math.max(1 - u[0][0] + u[1][1] - u[2][2], 0)),
            e[2] = .5 * Math.sqrt(Math.max(1 - u[0][0] - u[1][1] + u[2][2], 0)),
            e[3] = .5 * Math.sqrt(Math.max(1 + u[0][0] + u[1][1] + u[2][2], 0)),
            u[2][1] > u[1][2] && (e[0] = -e[0]),
            u[0][2] > u[2][0] && (e[1] = -e[1]),
            u[1][0] > u[0][1] && (e[2] = -e[2]),
            f = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, r(180 * Math.atan2(u[0][1], u[0][0]) / Math.PI)] : function(t) {
                const [e,i,n,a] = t
                  , o = e * e
                  , l = i * i
                  , h = n * n
                  , c = e * i + n * a
                  , u = a * a + o + l + h;
                return c > .49999 * u ? [0, 2 * Math.atan2(e, a) * s, 90] : c < -.49999 * u ? [0, -2 * Math.atan2(e, a) * s, -90] : [r(Math.atan2(2 * e * a - 2 * i * n, 1 - 2 * o - 2 * h) * s), r(Math.atan2(2 * i * a - 2 * e * n, 1 - 2 * l - 2 * h) * s), r(Math.asin(2 * e * i + 2 * n * a) * s)]
            }(e),
            {
                translation: c,
                rotation: f,
                eulerRotation: f,
                scale: [r(i[0]), r(i[1]), r(i[2])]
            }
        }
        e.exports = function(t) {
            t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
            let e = new DOMMatrix(t);
            const i = new Array(4);
            for (let t = 1; t < 5; t++) {
                const s = i[t - 1] = new Float32Array(4);
                for (let i = 1; i < 5; i++)
                    s[i - 1] = e["m".concat(t).concat(i)]
            }
            return h(i)
        }
    }
    , {}],
    115: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = i.pluginCache = void 0;
        var r = s(t(35))
          , n = s(t(126))
          , a = s(t(116))
          , o = s(t(118));
        const l = {};
        i.pluginCache = l;
        const h = [];
        let c = 1;
        class u extends r.default {
            constructor(t={}) {
                super(),
                this.el = t.el || document.createElement("video"),
                this.id = t.id || this.el.id || this.el.dataset.inlineMediaId || "inlineMedia-".concat(c++);
                const e = (t.plugins || []).concat(n.default);
                this._initPlugins(e, t),
                h.push(this)
            }
            async load(t) {
                for (const e of this.plugins)
                    if ("function" == typeof e.load)
                        return e.load(t)
            }
            abortLoad() {
                for (const t of this.plugins)
                    if ("function" == typeof t.abortLoad) {
                        t.abortLoad();
                        break
                    }
            }
            async play() {
                for (const t of this.plugins)
                    if ("function" == typeof t.play)
                        return t.play()
            }
            get src() {
                for (const t of this.plugins)
                    if (t.src)
                        return t.src;
                return ""
            }
            get playbackState() {
                for (const t of this.plugins) {
                    const e = t.playbackState;
                    if (void 0 !== e)
                        return e
                }
            }
            get loadingState() {
                for (const t of this.plugins) {
                    const e = t.loadingState;
                    if (void 0 !== e)
                        return e
                }
            }
            _initPlugins(t, e) {
                this.plugins = [],
                this.pluginMap = new Map;
                for (let i of t) {
                    if ("string" == typeof i) {
                        if (!l[i])
                            throw new Error("Trying to use undefined Plugin named: ".concat(i, " . Ensure you call Media.addPlugin() first!"));
                        i = l[i]
                    }
                    if (!1 !== i.isSupported) {
                        const t = new i(Object.assign({
                            media: this
                        }, e));
                        this.plugins.push(t),
                        this.pluginMap.set(i, t)
                    }
                }
                this.trigger(o.default.MOUNTED)
            }
            destroy() {
                if (!this._destroyed) {
                    for (const t of this.plugins)
                        "function" == typeof t.destroy && t.destroy();
                    super.destroy(),
                    h.splice(h.indexOf(this), 1),
                    this._destroyed = !0
                }
            }
            static get medias() {
                return h
            }
            static addPlugin(t, e) {
                l[t] = e
            }
            static async autoInitialize(t=document, e={}) {
                return (0,
                a.default)(t, e)
            }
        }
        var d = u;
        i.default = d
    }
    , {
        116: 116,
        118: 118,
        126: 126,
        35: 35,
        36: 36
    }],
    116: [function(t, e, i) {
        "use strict";
        var s = t(36)
          , r = t(37);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = async function(t=document, e={}) {
            t || (t = document);
            const i = t.querySelectorAll("[".concat("data-inline-media", "]"))
              , s = [];
            for (let t of i) {
                const i = t.dataset
                  , r = i.inlineMediaPlugins ? i.inlineMediaPlugins.split(",").map(t=>t.trim()) : []
                  , o = [];
                for (const t of r)
                    if (!n.pluginCache[t]) {
                        if (!a.default[t])
                            throw new Error("Error Trying to use undefined Plugin named: ".concat(t, " . Ensure you call Media.addPlugin() first to register this custom plugin!"));
                        o.push(async()=>{
                            const e = (await a.default[t]()).default;
                            n.default.addPlugin(t, e)
                        }
                        )
                    }
                await Promise.all(o.map(async t=>t())),
                s.push(new n.default(Object.assign({
                    el: t,
                    plugins: r.map(t=>n.pluginCache[t])
                }, e)))
            }
            return s
        }
        ;
        var n = r(t(115))
          , a = s(t(122))
    }
    , {
        115: 115,
        122: 122,
        36: 36,
        37: 37
    }],
    117: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            EMPTY: "loading-empty",
            LOADING: "loading",
            LOADED: "loaded",
            ERROR: "loading-error",
            DISABLED: "loading-disabled"
        }
    }
    , {}],
    118: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            MOUNTED: "MOUNTED",
            MEDIA_LOAD_START: "MEDIA_LOAD_START",
            MEDIA_LOAD_COMPLETE: "MEDIA_LOAD_COMPLETE",
            MEDIA_LOAD_ERROR: "MEDIA_LOAD_ERROR",
            PLAYBACK_STATE_CHANGE: "PLAYBACK_STATE_CHANGE",
            LOADING_STATE_CHANGE: "LOADING_STATE_CHANGE"
        }
    }
    , {}],
    119: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            LOAD_START: "loadstart",
            LOADED_DATA: "loadeddata",
            LOADED_METADATA: "loadedmetadata",
            CAN_PLAY: "canplay",
            CAN_PLAY_THROUGH: "canplaythrough",
            PLAY: "play",
            PLAYING: "playing",
            PAUSE: "pause",
            WAITING: "waiting",
            SEEKING: "seeking",
            SEEKED: "seeked",
            ERROR: "error",
            ENDED: "ended",
            ABORT: "abort"
        }
    }
    , {}],
    120: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            IDLE: "idle",
            PLAYING: "playing",
            PAUSED: "paused",
            ENDED: "ended"
        }
    }
    , {}],
    121: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        Object.defineProperty(i, "Media", {
            enumerable: !0,
            get: function() {
                return r.default
            }
        }),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            get: function() {
                return r.default
            }
        }),
        Object.defineProperty(i, "Plugin", {
            enumerable: !0,
            get: function() {
                return n.default
            }
        }),
        i.autoInit = void 0;
        var r = s(t(115))
          , n = s(t(128));
        const a = r.default.autoInitialize;
        i.autoInit = a
    }
    , {
        115: 115,
        128: 128,
        36: 36
    }],
    122: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(37));
        var n = {
            AnimLoad: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(129))),
            AnimPlay: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(130))),
            FeatureObserver: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(132))),
            LoadTimeout: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(134))),
            PlayPauseButton: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(136))),
            ViewportSource: async()=>Promise.resolve().then(()=>(0,
            r.default)(t(139)))
        };
        i.default = n
    }
    , {
        129: 129,
        130: 130,
        132: 132,
        134: 134,
        136: 136,
        139: 139,
        36: 36,
        37: 37
    }],
    123: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(120))
          , a = s(t(117))
          , o = s(t(119))
          , l = s(t(118));
        const h = [o.default.LOADED_DATA, o.default.LOAD_START, o.default.CAN_PLAY, o.default.CAN_PLAY_THROUGH, o.default.PLAY, o.default.PLAYING, o.default.PAUSE, o.default.WAITING, o.default.SEEKING, o.default.SEEKED, o.default.ERROR, o.default.ENDED];
        class c extends r.default {
            constructor(t) {
                super(t),
                this._container = t.container || this.media.el.parentElement,
                this._playbackState = n.default.IDLE,
                this._loadingState = a.default.EMPTY,
                this._elementsToDecorate = [],
                this._container && this._elementsToDecorate.push(this._container),
                this.media.id && this._elementsToDecorate.push(...Array.from(document.querySelectorAll("[data-inline-media-controller={id}]".replace("{id}", this.media.id))));
                for (const t of this._elementsToDecorate)
                    t.classList.add(this._playbackState),
                    t.classList.add(this._loadingState);
                this.updateState = this.updateState.bind(this),
                this._addEventListeners()
            }
            _addEventListeners() {
                for (let t of h)
                    this.media.el.addEventListener(t, this.updateState);
                this.media.on(l.default.LOADING_STATE_CHANGE, this.updateState),
                this.media.on(l.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            _removeEventListeners() {
                for (let t of h)
                    this.media.el.removeEventListener(t, this.updateState);
                this.media.off(l.default.LOADING_STATE_CHANGE, this.updateState),
                this.media.off(l.default.PLAYBACK_STATE_CHANGE, this.updateState)
            }
            updateState(t) {
                const e = this.media.playbackState
                  , i = this._playbackState
                  , s = this.media.loadingState
                  , r = this._loadingState;
                if (this._playbackState = e,
                this._loadingState = s,
                e !== i) {
                    for (const t of this._elementsToDecorate)
                        t.classList.add(e),
                        t.classList.remove(i);
                    this.media.trigger(l.default.PLAYBACK_STATE_CHANGE)
                }
                if (s !== r) {
                    for (const t of this._elementsToDecorate)
                        t.classList.add(s),
                        t.classList.remove(r);
                    this.media.trigger(l.default.LOADING_STATE_CHANGE)
                }
            }
            destroy() {
                for (const t of this._elementsToDecorate)
                    t.classList.remove(this._playbackState),
                    t.classList.remove(this._loadingState);
                this._removeEventListeners(),
                super.destroy()
            }
        }
        var u = c;
        i.default = u
    }
    , {
        117: 117,
        118: 118,
        119: 119,
        120: 120,
        128: 128,
        36: 36
    }],
    124: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(119))
          , a = s(t(118))
          , o = s(t(117))
          , l = s(t(19))
          , h = s(t(165));
        const c = n.default.CAN_PLAY_THROUGH
          , {HAVE_NOTHING: u, HAVE_CURRENT_DATA: d, NETWORK_EMPTY: m} = HTMLMediaElement;
        class p extends r.default {
            constructor(t) {
                super(t),
                this._loadCompleteEvent = t.loadCompleteEvent || c,
                this._onLoaded = this._onLoaded.bind(this),
                this._onError = this._onError.bind(this)
            }
            mounted() {
                "none" !== this.media.el.preload && this.media.src && (async()=>{
                    try {
                        await this.media.load(this.media.src)
                    } catch (t) {
                        (0,
                        l.default)("auto load of ".concat(this.media.src, " failed or was aborted with err:").concat(t))
                    }
                }
                )()
            }
            async load(t) {
                if (void 0 === t && this.media.src && (t = this.media.src),
                !t)
                    throw new Error("No Media src was specified, can not fullfill load() request");
                return t !== this._currentLoadUrl && (this.media.trigger(a.default.MEDIA_LOAD_START),
                this._currentLoadUrl = t,
                this._pendingPromise = new Promise((e,i)=>{
                    this._resolvePendingPromise = ()=>{
                        this._resolvePendingPromise = null,
                        this._rejectPendingPromise = null,
                        e()
                    }
                    ,
                    this._rejectPendingPromise = ()=>{
                        this._resolvePendingPromise = null,
                        this._rejectPendingPromise = null,
                        i()
                    }
                    ,
                    this.media.el.addEventListener(this._loadCompleteEvent, this._onLoaded),
                    h.default.browser.firefox && "canplaythrough" === this._loadCompleteEvent && this.media.el.addEventListener("canplay", this._onLoaded),
                    this.media.el.addEventListener(n.default.ERROR, this._onError),
                    this.media.el.addEventListener(n.default.ABORT, this._onError),
                    this.media.el.src = t,
                    this.media.el.load()
                }
                )),
                this._pendingPromise
            }
            _clearLoadListeners() {
                this.media.el.removeEventListener(this._loadCompleteEvent, this._onLoaded),
                this.media.el.removeEventListener("canplay", this._onLoaded),
                this.media.el.removeEventListener(n.default.ERROR, this._onError),
                this.media.el.removeEventListener(n.default.ABORT, this._onError)
            }
            _onLoaded() {
                this._clearLoadListeners(),
                this.media.trigger(a.default.LOADING_STATE_CHANGE),
                this.media.trigger(a.default.MEDIA_LOAD_COMPLETE),
                this._resolvePendingPromise()
            }
            _onError() {
                this._clearLoadListeners(),
                this.media.trigger(a.default.MEDIA_LOAD_ERROR),
                this.media.trigger(a.default.LOADING_STATE_CHANGE),
                this._rejectPendingPromise()
            }
            abortLoad() {
                this._rejectPendingPromise && this._rejectPendingPromise()
            }
            get loadingState() {
                return this.media.el.error ? o.default.ERROR : this.media.el.networkState === m && this.media.el.readyState === u ? o.default.EMPTY : this.media.el.readyState < d ? this.media.el.buffered.length && 0 === this.media.el.buffered.start(0) && this.media.el.buffered.end(0) === this.media.el.duration ? o.default.LOADED : o.default.LOADING : o.default.LOADED
            }
            destroy() {
                this._clearLoadListeners(),
                super.destroy()
            }
        }
        var f = p;
        i.default = f
    }
    , {
        117: 117,
        118: 118,
        119: 119,
        128: 128,
        165: 165,
        19: 19,
        36: 36
    }],
    125: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(120));
        const {HAVE_METADATA: a, HAVE_CURRENT_DATA: o} = HTMLVideoElement;
        class l extends r.default {
            constructor(t) {
                super(t),
                this._initialize()
            }
            _initialize() {
                this.media.el.playsInline = !0,
                this.media.el.autoplay && (this._autoPlayTimer = setTimeout(()=>this.media.play()))
            }
            async play() {
                this.media.el.readyState < a && await this.media.load(),
                await this.media.el.play()
            }
            get playbackState() {
                return this.media.el.ended ? n.default.ENDED : this.media.el.paused && !this.media.el.ended ? n.default.PAUSED : n.default.PLAYING
            }
            destroy() {
                clearTimeout(this._autoPlayTimer),
                super.destroy()
            }
        }
        var h = l;
        i.default = h
    }
    , {
        120: 120,
        128: 128,
        36: 36
    }],
    126: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(127))
          , n = s(t(124))
          , a = s(t(125))
          , o = s(t(123))
          , l = [r.default, n.default, a.default, o.default];
        i.default = l
    }
    , {
        123: 123,
        124: 124,
        125: 125,
        127: 127,
        36: 36
    }],
    127: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128));
        class n extends r.default {
            get src() {
                if (!this.media.el.currentSrc && !this.media.el.src)
                    for (let t of this.media.el.querySelectorAll("source"))
                        if (this.media.el.canPlayType(t.type))
                            return t.src;
                return this.media.el.currentSrc || this.media.el.src
            }
        }
        var a = n;
        i.default = a
    }
    , {
        128: 128,
        36: 36
    }],
    128: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(118));
        var n = class {
            constructor(t) {
                this.options = t,
                this.media = t.media,
                this.mounted = this.mounted.bind(this),
                this.media.on(r.default.MOUNTED, this.mounted)
            }
            mounted() {}
            static get isSupported() {
                return !0
            }
            destroy() {}
        }
        ;
        i.default = n
    }
    , {
        118: 118,
        36: 36
    }],
    129: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(141))
          , n = s(t(128))
          , a = s(t(19));
        const o = {
            start: "t - 200vh",
            end: "b + 100vh"
        };
        class l extends n.default {
            constructor(t) {
                super(t),
                this._anim = t.anim,
                this._container = t.container || this.media.el.parentElement,
                this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                this._initialize()
            }
            _initialize() {
                this._onLoadKeyframeEnter = this._onLoadKeyframeEnter.bind(this),
                this._onLoadKeyframeExit = this._onLoadKeyframeExit.bind(this);
                const t = (0,
                r.default)(this.media.el.dataset, this.options, "loadKeyframe", o);
                t.event || (t.event = "inline-media-load-kf"),
                this._loadKeyframe = this._scrollGroup.addKeyframe(this.media.el, t),
                this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                this._loadKeyframe.controller.on("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit)
            }
            get loadKeyframe() {
                return this._loadKeyframe
            }
            async _onLoadKeyframeEnter(t) {
                try {
                    await this.media.load(),
                    this._loaded = !0
                } catch (t) {
                    (0,
                    a.default)("AnimLoad: Load error occured")
                }
            }
            _onLoadKeyframeExit(t) {}
            destroy() {
                this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":enter"), this._onLoadKeyframeEnter),
                this._loadKeyframe.controller.off("".concat(this._loadKeyframe.event, ":exit"), this._onLoadKeyframeExit),
                super.destroy()
            }
        }
        i.default = l
    }
    , {
        128: 128,
        141: 141,
        19: 19,
        36: 36
    }],
    130: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(118))
          , n = s(t(141))
          , a = s(t(128));
        const o = {
            start: "t - 100vh",
            end: "b"
        };
        class l extends a.default {
            constructor(t) {
                super(t),
                this._anim = t.anim,
                this._container = t.container || this.media.el.parentElement,
                this._scrollGroup = this.options.scrollGroup || this._anim.getGroupForTarget(this._container || this.media.el),
                this._initialize()
            }
            _initialize() {
                this._onPlayKeyframeEnter = this._onPlayKeyframeEnter.bind(this),
                this._onPlayKeyframeExit = this._onPlayKeyframeExit.bind(this);
                const t = this.media.el.dataset;
                if (this._autoPlayWithReducedMotion = (0,
                n.default)(t, this.options, "autoPlayWithReducedMotion", !1),
                !this._autoPlayWithReducedMotion && l.prefersReducedMotion)
                    return;
                this._pauseOnExit = (0,
                n.default)(t, this.options, "pauseOnExit", !1),
                this._resetOnExit = (0,
                n.default)(t, this.options, "resetOnExit", !1);
                const e = (0,
                n.default)(t, this.options, "playKeyframe", o);
                e.event || (e.event = "inline-media-play-kf"),
                this._playKeyframe = this._scrollGroup.addKeyframe(this.media.el, e),
                this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                this._playKeyframe.controller.on("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                this._onLoadStart = this._onLoadStart.bind(this),
                this.media.on(r.default.MEDIA_LOAD_START, this._onLoadStart)
            }
            _onLoadStart() {
                this._loaded = !1
            }
            async _onPlayKeyframeEnter(t) {
                if (this._inFrame = !0,
                !this._paused && (this._loaded || (await this.media.load(),
                this._loaded = !0),
                this._inFrame))
                    try {
                        await this.media.play()
                    } catch (t) {}
            }
            _onPlayKeyframeExit(t) {
                this._inFrame = !1,
                this._loaded && this.media.el.paused && !this.media.el.ended ? this._paused = !0 : this._pauseOnExit && (this._paused = !1,
                this.media.el.pause()),
                this._loaded && this._resetOnExit && (this.media.el.currentTime = 0)
            }
            get playKeyframe() {
                return this._playKeyframe
            }
            destroy() {
                this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":enter"), this._onPlayKeyframeEnter),
                this._playKeyframe.controller.off("".concat(this._playKeyframe.event, ":exit"), this._onPlayKeyframeExit),
                this.media.off(r.default.MEDIA_LOAD_START, this._onLoadStart),
                super.destroy()
            }
            static get prefersReducedMotion() {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            }
        }
        i.default = l
    }
    , {
        118: 118,
        128: 128,
        141: 141,
        36: 36
    }],
    131: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var s = class {
            constructor(t) {
                this.featureClass = t.featureClass,
                this._callback = t.callback,
                this._isPresent = !1,
                this._wasPresent = !1
            }
            get presenceChanged() {
                return this._isPresent !== this._wasPresent
            }
            get isPresent() {
                return this._isPresent
            }
            updatePresence(t) {
                this._wasPresent = this._isPresent,
                this._isPresent = t.contains(this.featureClass)
            }
            triggerCallback(t) {
                return this._callback(t)
            }
        }
        ;
        i.default = s
    }
    , {}],
    132: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(120))
          , a = s(t(117))
          , o = s(t(118))
          , l = s(t(133))
          , h = s(t(131));
        const c = t=>t
          , u = t=>t ? t.split(",").map(t=>t.trim()) : null;
        class d extends r.default {
            constructor(t) {
                super(t);
                const e = (e,i,s)=>{
                    let r = "inlineMedia" + e[0].toUpperCase() + e.slice(1);
                    return i(this.media.el.dataset[r]) || t[e] || s
                }
                ;
                this._disabledStates = new l.default({
                    features: e("disabledWhen", u, []),
                    onActivate: this.disable.bind(this),
                    onDeactivate: this.enable.bind(this)
                }),
                this._destroyStates = new l.default({
                    features: e("destroyWhen", u, []),
                    onActivate: this.destroyMedia.bind(this)
                }),
                this._pausedStates = new l.default({
                    features: e("pausedWhen", u, []),
                    onActivate: this.pauseMedia.bind(this)
                }),
                this._autoplayStates = new l.default({
                    features: e("autoplayWhen", u, []),
                    onActivate: this.autoplayMedia.bind(this),
                    onDeactivate: this.disableAutoplay.bind(this)
                });
                const i = t.featureDetect || {};
                var s;
                this.featureCallbacks = Object.entries(i).map(([t,e])=>new h.default({
                    featureClass: t,
                    callback: e
                })),
                this._featureElement = (s = e("featureElement", c, document.documentElement))instanceof HTMLElement ? s : document.querySelector(s),
                this.featureSets = [this._autoplayStates, this._pausedStates, this._disabledStates, this._destroyStates],
                this._featuresUpdated = this._featuresUpdated.bind(this),
                this.play = !1,
                this._observer = new MutationObserver(this._featuresUpdated),
                this._observer.observe(this._featureElement, {
                    attributes: !0,
                    attributeFilter: ["class"]
                }),
                this._featuresUpdated()
            }
            get loadingState() {
                return this._disabledStates.isDetected ? a.default.DISABLED : void 0
            }
            get playbackState() {
                return this._disabledStates.isDetected ? n.default.PAUSED : void 0
            }
            _featuresUpdated() {
                let t = this._featureElement.classList;
                this.featureSets.filter(e=>(e.updateFeatureState(t),
                e.detectionChanged)).forEach(t=>t.applyEffect()),
                this.featureCallbacks.forEach(e=>{
                    e.updatePresence(t),
                    e.isPresent && e.presenceChanged && e.triggerCallback(this.media)
                }
                )
            }
            autoplayMedia() {
                this.media.el.setAttribute("autoplay", !0),
                this.media.play()
            }
            disableAutoplay() {
                this.media.el.setAttribute("autoplay", !1)
            }
            pauseMedia() {
                this.media.el.pause()
            }
            destroyMedia() {
                this.media.destroy()
            }
            destroy() {
                this._observer.disconnect()
            }
            disable() {
                this.media.abortLoad(),
                this.media.el.pause(),
                this.play = c,
                this.media.trigger(o.default.LOADING_STATE_CHANGE),
                this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
            enable() {
                this.play = !1,
                this.media.trigger(o.default.LOADING_STATE_CHANGE),
                this.media.trigger(o.default.PLAYBACK_STATE_CHANGE)
            }
        }
        var m = d;
        i.default = m
    }
    , {
        117: 117,
        118: 118,
        120: 120,
        128: 128,
        131: 131,
        133: 133,
        36: 36
    }],
    133: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        const s = ()=>{}
        ;
        var r = class {
            constructor(t) {
                var e;
                this._features = new Set((e = t.features,
                Array.isArray(e) ? e : e ? [e] : [])),
                this._isDetected = !1,
                this._wasDetected = !1,
                this._onActivate = t.onActivate || s,
                this._onDeactivate = t.onDeactivate || s
            }
            get detectionChanged() {
                return this._isDetected !== this._wasDetected
            }
            get isDetected() {
                return this._isDetected
            }
            updateFeatureState(t) {
                this._wasDetected = this._isDetected;
                for (let e of t)
                    if (this._features.has(e))
                        return void (this._isDetected = !0);
                this._isDetected = !1
            }
            applyEffect() {
                this._isDetected ? this._onActivate() : this._onDeactivate()
            }
        }
        ;
        i.default = r
    }
    , {}],
    134: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(118));
        class a extends r.default {
            static get LOAD_TIMEOUT_EVENT() {
                return "inline-media-timeout"
            }
            constructor(t) {
                super(t);
                const e = this.media.el.dataset;
                this._timeoutDelay = e.loadTimeout || t.loadTimeout || 3e4,
                this._onLoadStart = this._onLoadStart.bind(this),
                this._onLoadComplete = this._onLoadComplete.bind(this),
                this._onTimerComplete = this._onTimerComplete.bind(this),
                this.media.on(n.default.MEDIA_LOAD_START, this._onLoadStart),
                this.media.on(n.default.MEDIA_LOAD_COMPLETE, this._onLoadComplete)
            }
            _onLoadStart() {
                clearTimeout(this._timer),
                this._timer = setTimeout(this._onTimerComplete, this._timeoutDelay)
            }
            _onLoadComplete() {
                clearTimeout(this._timer)
            }
            _onTimerComplete() {
                this.media.trigger("inline-media-timeout"),
                this.media.destroy(),
                this.media.el.parentElement && this.media.el.parentElement.removeChild(this.media.el)
            }
            destroy() {
                clearTimeout(this._timer),
                this.media.off(n.default.MEDIA_LOAD_START, this._onLoadStart)
            }
        }
        i.default = a
    }
    , {
        118: 118,
        128: 128,
        36: 36
    }],
    135: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            S: "small",
            M: "medium",
            L: "large",
            X: "xlarge"
        }
    }
    , {}],
    136: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(118))
          , a = s(t(120));
        const o = "Pause"
          , l = "Play"
          , h = "Replay"
          , c = {
            CLICK: "data-analytics-click",
            TITLE: "data-analytics-title"
        };
        class u extends r.default {
            constructor(t) {
                super(t),
                this._container = t.container || this.media.el.parentElement,
                this._button = this._findButton(),
                this._onClick = this._onClick.bind(this),
                this._onPlaybackStateChange = this._onPlaybackStateChange.bind(this);
                const e = this._button.dataset;
                this._ariaLabels = {
                    playing: e.ariaPlaying || t.ariaPlaying || o,
                    paused: e.ariaPaused || t.ariaPaused || l,
                    ended: e.ariaEnded || t.ariaEnded || h
                },
                this._button.addEventListener("click", this._onClick),
                this.media.on(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange),
                this._activeAnalytics = Object.values(c).filter(t=>this._button.hasAttribute(t + "-play") && this._button.hasAttribute(t + "-pause") || this._button.hasAttribute(t + "-replay"))
            }
            _findButton() {
                if (this.options.playPauseButton)
                    return this.options.playPauseButton;
                let t = this._container.querySelector("".concat('[data-inline-media-control="PlayPause"]'));
                if (!t) {
                    const e = document.querySelectorAll("[data-inline-media-controller='{id}']".replace("{id}", this.media.id));
                    for (const i of e)
                        t = "PlayPause" === i.getAttribute("data-inline-media-control") ? i : i.querySelector("".concat('[data-inline-media-control="PlayPause"]'))
                }
                return t
            }
            _onPlaybackStateChange() {
                switch (this.media.playbackState) {
                case a.default.PLAYING:
                    this._button.setAttribute("aria-label", this._ariaLabels.playing);
                    break;
                case a.default.ENDED:
                    this._button.setAttribute("aria-label", this._ariaLabels.ended);
                    break;
                default:
                    this._button.setAttribute("aria-label", this._ariaLabels.paused)
                }
                this._setAnalyticsState()
            }
            _setAnalyticsState() {
                let t;
                switch (this.media.playbackState) {
                case a.default.PLAYING:
                    t = "pause";
                    break;
                case a.default.ENDED:
                    t = "replay";
                    break;
                default:
                    t = "play"
                }
                for (const e of this._activeAnalytics) {
                    let i = t;
                    "replay" !== t || this._button.hasAttribute("".concat(e, "-").concat(i)) || (i = "play"),
                    this._button.setAttribute(e, this._button.getAttribute("".concat(e, "-").concat(i)))
                }
            }
            _onClick(t) {
                this.media.el.paused ? this.media.play() : this.media.el.pause()
            }
            destroy() {
                this._button.removeEventListener("click", this._onClick),
                this.media.off(n.default.PLAYBACK_STATE_CHANGE, this._onPlaybackStateChange)
            }
        }
        i.default = u
    }
    , {
        118: 118,
        120: 120,
        128: 128,
        36: 36
    }],
    137: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(140));
        i.default = class {
            constructor(t) {
                this._breakpoints = t.breakpoints || r.default,
                this.options = t,
                this._initialize()
            }
            _initialize() {
                this._updateBreakpoint = this._updateBreakpoint.bind(this),
                this._callback = this.options.callback,
                this._mediaQueries = Object.keys(this._breakpoints).map(t=>window.matchMedia("(min-width: ".concat(this._breakpoints[t], "px)"))),
                this._addEventListeners(),
                this._updateBreakpoint()
            }
            _addEventListeners() {
                for (const t of this._mediaQueries)
                    t.addListener(this._updateBreakpoint)
            }
            _removeEventListeners() {
                for (const t of this._mediaQueries)
                    t.removeListener(this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const t = Object.keys(this._breakpoints);
                let e = t[0];
                for (let i = 1; i < t.length; i++) {
                    if (!this._mediaQueries[i].matches)
                        break;
                    e = t[i]
                }
                let i = !1;
                this._currentBreakpoint && this._currentBreakpoint !== e && (i = !0),
                this._currentBreakpoint = e,
                i && this._callback()
            }
            get breakpoint() {
                return this._currentBreakpoint
            }
            destroy() {
                this._removeEventListeners()
            }
        }
    }
    , {
        140: 140,
        36: 36
    }],
    138: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(137))
          , n = s(t(135));
        class a extends r.default {
            constructor(t) {
                super(t)
            }
            _initialize() {
                this._anim = this.options.anim,
                this._bpMap = this.options.animBreakpointMap || n.default,
                this._updateBreakpoint = this._updateBreakpoint.bind(this),
                this._callback = this.options.callback,
                this._addEventListeners(),
                this._updateBreakpoint()
            }
            _addEventListeners() {
                this._anim.on("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _removeEventListeners() {
                this._anim.off("ON_BREAKPOINT_CHANGE", this._updateBreakpoint)
            }
            _updateBreakpoint() {
                const t = this._bpMap[this._anim.model.pageMetrics.breakpoint];
                let e = !1;
                this._currentBreakpoint && this._currentBreakpoint !== t && (e = !0),
                this._currentBreakpoint = t,
                e && this._callback()
            }
            destroy() {
                super.destroy()
            }
        }
        i.default = a
    }
    , {
        135: 135,
        137: 137,
        36: 36
    }],
    139: [function(t, e, i) {
        "use strict";
        var s = t(36);
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        var r = s(t(128))
          , n = s(t(137))
          , a = s(t(138))
          , o = (s(t(19)),
        s(t(18)),
        s(t(117)));
        class l extends r.default {
            constructor(t) {
                super(t),
                this._cachedPlaying = null,
                this._initialize()
            }
            _initialize() {
                this._onBreakpointChange = this._onBreakpointChange.bind(this);
                const t = Object.assign({
                    callback: this._onBreakpointChange
                }, this.options);
                this._breakpointDetect = t.anim ? new a.default(t) : new n.default(t),
                this._currentTime = 0;
                const e = this.media.el.dataset;
                this._basePath = this.options.basePath || e.inlineMediaBasepath || "./",
                this._onBreakpointChange()
            }
            _onBreakpointChange() {
                this._currentBreakpoint = this._breakpointDetect.breakpoint;
                const t = window.devicePixelRatio > 1 ? "".concat(this._currentBreakpoint, "_2x") : this._currentBreakpoint
                  , e = "".concat(this._basePath).concat(t, ".").concat("mp4");
                this._swapSrc(e)
            }
            get src() {
                return this._src
            }
            async _swapSrc(t) {
                if (this._src = t,
                this.media.loadingState === o.default.EMPTY)
                    return;
                const e = null !== this._cachedPlaying ? this._cachedPlaying : !this.media.el.paused;
                return this.media.loadingState === o.default.LOADED && (this._currentTime = this.media.el.currentTime),
                this._cachedPlaying = e,
                await this.media.load("".concat(t, "#t=").concat(this._currentTime)),
                this._cachedPlaying = null,
                e ? this.media.play() : Promise.resolve()
            }
            destroy() {
                this._breakpointDetect.destroy(),
                super.destroy()
            }
        }
        i.default = l
    }
    , {
        117: 117,
        128: 128,
        137: 137,
        138: 138,
        18: 18,
        19: 19,
        36: 36
    }],
    140: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = void 0;
        i.default = {
            small: 0,
            medium: 570,
            large: 780,
            xlarge: 1280
        }
    }
    , {}],
    141: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
        i.default = function(t, e, i, s) {
            const r = i[0].toUpperCase() + i.slice(1)
              , n = t["inlineMedia" + r];
            if (void 0 !== n)
                switch (typeof s) {
                case "boolean":
                    return "false" !== n;
                case "object":
                    return JSON.parse(n);
                case "number":
                    return Number(n);
                default:
                    return n
                }
            else if (void 0 !== e[i]) {
                const t = e[i];
                return "boolean" != typeof s || "false" !== t && "true" !== t ? t : "false" !== t
            }
            return s
        }
    }
    , {}],
    142: [function(t, e, i) {
        "use strict";
        const s = t(35)
          , r = t(144)
          , n = t(148)
          , a = t(147)
          , o = t(153)
          , l = t(160)
          , h = t(146)
          , c = t(150)
          , u = t(156)
          , d = t(149)
          , m = ["beforeCreate", "created", "beforeMount", "createItems", "itemsCreated", "mounted", "animateToItem", "onItemChangeInitiated", "onItemChangeOccurred", "onItemChangeCompleted", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"];
        class p extends s {
            constructor(t) {
                super(t),
                this.el = t.el,
                this.model = Object.assign({
                    options: t
                }, JSON.parse(JSON.stringify(r))),
                this.model.Item.ConstructorFunction = r.Item.ConstructorFunction,
                this._items = [],
                this.currentIndex = 0,
                m.forEach(t=>{
                    this[t] = (...e)=>{
                        this["__".concat(t)] && this["__".concat(t)].forEach(t=>t.apply(this, e))
                    }
                }
                );
                const e = this.destroy;
                this.destroy = (...t)=>{
                    e.apply(this, t),
                    s.prototype.destroy.call(this)
                }
                ,
                this.on(r.Events.ITEM_CHANGE_INITIATED, this.onItemChangeInitiated),
                this.on(r.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred),
                this.on(r.Events.ITEM_CHANGE_COMPLETED, this.onItemChangeCompleted),
                ["beforeCreate", "created", "beforeMount", "createItems"].forEach(e=>this[e](t))
            }
        }
        p.withMixins = (...t)=>{
            const e = class extends p {
            }
              , i = e.prototype;
            return t.unshift(n, l, o, d),
            t.push(h, u, a, c),
            t.forEach(t=>{
                for (const e in t)
                    m.includes(e) ? (i["__".concat(e)] = i["__".concat(e)] || [],
                    i["__".concat(e)].push(t[e])) : i[e] = t[e]
            }
            ),
            e
        }
        ,
        e.exports = p
    }
    , {
        144: 144,
        146: 146,
        147: 147,
        148: 148,
        149: 149,
        150: 150,
        153: 153,
        156: 156,
        160: 160,
        35: 35
    }],
    143: [function(t, e, i) {
        "use strict";
        const s = t(34).EventEmitterMicro
          , r = {};
        "undefined" != typeof window && (r.draw = t(61),
        r.cancelDraw = t(58));
        e.exports = class extends s {
            constructor(t) {
                super(),
                this.index = t.index,
                this.el = t.el,
                this._x = 0,
                this._y = 0,
                this._opacity = 0,
                this._width = 0,
                this._height = 0,
                this._zIndex = 0,
                this.id = this.el.getAttribute("id"),
                this.analyticsId = this.el.getAttribute("data-analytics-gallery-item-id") || this.el.getAttribute("id"),
                this.applyDraw = this.applyDraw.bind(this),
                this.measure()
            }
            measure() {
                const t = getComputedStyle(this.el);
                this._width = this.el.clientWidth,
                this._height = this.el.clientHeight,
                this._zIndex = parseInt(t.getPropertyValue("z-index")),
                this._opacity = parseFloat(t.getPropertyValue("opacity"))
            }
            select() {
                this.el.classList.add("current"),
                this.trigger("select", this)
            }
            deselect() {
                this.el.classList.remove("current"),
                this.trigger("deselect", this)
            }
            progress(t) {}
            needsRedraw() {
                r.cancelDraw(this._rafID),
                this._rafID = r.draw(this.applyDraw, !0)
            }
            applyDraw() {
                this.el.style.zIndex = this._zIndex,
                this.el.style.opacity = this._opacity,
                this.el.style.transform = "translate(".concat(this._x, "px, ").concat(this._y, "px)")
            }
            get height() {
                return this._height
            }
            set height(t) {
                this._height = t,
                this.needsRedraw()
            }
            get width() {
                return this._width
            }
            set width(t) {
                this._width = t,
                this.needsRedraw()
            }
            get x() {
                return this._x
            }
            set x(t) {
                this._x = t,
                this.needsRedraw()
            }
            get y() {
                return this._y
            }
            set y(t) {
                this._y = t,
                this.needsRedraw()
            }
            get opacity() {
                return this._opacity
            }
            set opacity(t) {
                this._opacity = t,
                this.needsRedraw()
            }
            get zIndex() {
                return this._zIndex
            }
            set zIndex(t) {
                this._zIndex = t,
                this.needsRedraw()
            }
        }
    }
    , {
        34: 34,
        58: 58,
        61: 61
    }],
    144: [function(t, e, i) {
        "use strict";
        e.exports = {
            PrefersReducedMotion: !1,
            IsRTL: !1,
            IsTouch: !1,
            Slide: {
                Selector: ".item-container",
                duration: 1
            },
            Fade: {
                duration: .5
            },
            Item: {
                Selector: ".item-container .gallery-item",
                ConstructorFunction: t(143)
            },
            DotNav: {
                Selector: ".dotnav"
            },
            PaddleNav: {
                Selector: ".paddlenav"
            },
            ChapterPlayer: {
                defaultEase: t=>t
            },
            FadeCaptionOnChange: {
                ItemSelector: ".captions-gallery [data-captions-gallery-item]"
            },
            TabNav: {
                ItemSelector: ".tablist-wrapper li",
                RoamingTabIndexSelector: "a"
            },
            SwipeDetect: {
                DesktopSwipe: !1,
                LimitIndexChange: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            SwipeDrag: {
                DesktopSwipe: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            InitialIndexFromHashLink: {
                Enabled: !1,
                ScrollReset: !1
            },
            Theme: {
                classPrefix: "theme"
            },
            Events: {
                ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED",
                ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED",
                ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED"
            }
        }
    }
    , {
        143: 143
    }],
    145: [function(t, e, i) {
        "use strict";
        let s;
        try {
            s = t("@marcom/ac-analytics").observer.Gallery
        } catch (t) {}
        e.exports = {
            created(t) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    name: this.el.getAttribute("data-analytics-gallery-id") || this.el.getAttribute("id"),
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                s && (name || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this),
                name = "null"),
                this.analytics.observer = new s(this,{
                    galleryName: this.analytics.name,
                    beforeUpdateEvent: this.analytics.events.UPDATE,
                    afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                    trackAutoRotate: !0
                }))
            },
            onItemChangeCompleted(t) {
                if (!t.previous || t.current === this.analytics.lastTrackedItem || t.current === t.previous && !this.analytics.lastTrackedItem)
                    return;
                this.analytics.lastTrackedItem = t.current;
                let e = {
                    incoming: {
                        id: t.current.analyticsId
                    },
                    outgoing: {
                        id: t.previous.analyticsId
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, e)
            }
        }
    }
    , {
        undefined: void 0
    }],
    146: [function(t, e, i) {
        "use strict";
        e.exports = {
            createItems(t) {
                if (this._items.length)
                    this.itemsCreated();
                else {
                    if (!this.model.Item.ConstructorFunction)
                        throw new ReferenceError("MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null");
                    if (0 === this._items.length) {
                        this._items = [],
                        Array.from(this.el.querySelectorAll(this.model.Item.Selector)).forEach((t,e)=>{
                            const i = new this.model.Item.ConstructorFunction({
                                el: t,
                                index: e
                            });
                            this._items.push(i)
                        }
                        );
                        let t = this._items[this._items.length - 1];
                        for (let e = 0; e < this._items.length; e++) {
                            const i = this._items[e];
                            i.prev = t,
                            i.next = this._items[e + 1],
                            t = i
                        }
                        t.next = this._items[0]
                    }
                    this.itemsCreated()
                }
            }
        }
    }
    , {}],
    147: [function(t, e, i) {
        "use strict";
        e.exports = {
            itemsCreated(t) {
                this.model.options.gum || this._isVue || (this.anim.on("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                this.anim.on("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                this.anim.on("ON_BREAKPOINT_CHANGE", this.onBreakpointChange),
                requestAnimationFrame(this.mounted))
            },
            destroy() {
                this.model.options.gum || this._isVue || (this.anim.off("ON_RESIZE_IMMEDIATE", this.onResizeImmediate),
                this.anim.off("ON_RESIZE_DEBOUNCED", this.onResizeDebounced),
                this.anim.off("ON_BREAKPOINT_CHANGE", this.onBreakpointChange))
            }
        }
    }
    , {}],
    148: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    currentItem: {
                        configurable: !0,
                        get: ()=>this._items[this.wrappedIndex(this.currentIndex)]
                    }
                })
            },
            wrappedIndex(t) {
                return (t %= this._items.length) < 0 ? this._items.length + t : t
            },
            getItemForTrigger(t) {
                return this._items.find(e=>e.id === t)
            }
        }
    }
    , {}],
    149: [function(t, e, i) {
        "use strict";
        e.exports = {
            itemsCreated() {
                if (!this.model.InitialIndexFromHashLink.Enabled || !this._items)
                    return;
                const t = location.hash.slice(1);
                if (!t)
                    return;
                const e = this._items.findIndex(({id: e})=>e === t);
                e > -1 && (this.currentIndex = e,
                this.model.InitialIndexFromHashLink.ScrollReset && this._resetHorizontalScrollPosition())
            },
            _resetHorizontalScrollPosition(t) {
                const e = t || this.el;
                0 !== e.scrollLeft ? e.scrollLeft = 0 : e !== document.body && this._resetHorizontalScrollPosition(e.parentNode)
            }
        }
    }
    , {}],
    150: [function(t, e, i) {
        "use strict";
        e.exports = {
            mounted() {
                const t = this._items[this.wrappedIndex(this.currentIndex)];
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                    gallery: this,
                    next: t
                }),
                this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: t
                }),
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: t
                })
            }
        }
    }
    , {}],
    151: [function(t, e, i) {
        "use strict";
        e.exports = {
            itemsCreated() {
                this._items.forEach(t=>{
                    t.progress = function(t) {
                        if (void 0 === t)
                            return this._progress;
                        this._progress = t,
                        this.el.style.setProperty("--progress", t)
                    }
                    ,
                    t.progress(t.index)
                }
                )
            }
        }
    }
    , {}],
    152: [function(t, e, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        e.exports = {
            created() {
                this.handleIntersect = this.handleIntersect.bind(this),
                this.onKeyDown = this.onKeyDown.bind(this),
                this.observer = new IntersectionObserver(this.handleIntersect),
                this.observer.observe(this.el),
                this.isInView = !1
            },
            destroy() {
                window.removeEventListener("keydown", this.onKeyDown),
                this.observer.disconnect(),
                this.observer = null,
                this.isInView = !1
            },
            handleIntersect(t) {
                t.forEach(t=>{
                    this.isInView = t.isIntersecting,
                    t.isIntersecting ? window.addEventListener("keydown", this.onKeyDown) : window.removeEventListener("keydown", this.onKeyDown)
                }
                )
            },
            onKeyDown(t) {
                if (37 !== t.keyCode && 39 !== t.keyCode || this.inputHasFocus())
                    return;
                let e = this.model.IsRTL ? -1 : 1
                  , i = 37 === t.keyCode ? -1 : 1;
                this.lastInteractionEvent = t;
                const s = this.currentIndex + i * e;
                this.animateToItem(s)
            },
            inputHasFocus: function() {
                return -1 !== s.indexOf(document.activeElement.nodeName)
            }
        }
    }
    , {}],
    153: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                document.body._animInfo && (this.anim = document.body._animInfo.group.anim,
                this.model.pageMetrics = this.anim.model.pageMetrics)
            },
            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            },
            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce),
                t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce),
                t.onEnter && i.controller.on(t.event + ":enter", t.onEnter),
                t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce),
                t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce),
                t.onEvent && i.controller.on(t.event, t.onEvent),
                t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)),
                i
            },
            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e=>t.hasOwnProperty(e)))
                    return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new RAFEmitter.create;
                i.on("update", t.onUpdate || noop),
                i.on("draw", t.onDraw || noop),
                i.on("draw", ()=>i.run());
                const {onEnter: s, onExit: r} = t;
                return t.onEnter = ()=>{
                    i.run(),
                    s && s()
                }
                ,
                t.onExit = ()=>{
                    i.cancel(),
                    r && r()
                }
                ,
                this.addDiscreteEvent(t)
            },
            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"),
                t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw),
                e
            }
        }
    }
    , {}],
    154: [function(t, e, i) {
        "use strict";
        const s = (t,e)=>{
            e ? t.removeAttribute("disabled") : t.setAttribute("disabled", "true")
        }
        ;
        e.exports = {
            mounted() {
                const t = this.el.querySelector(this.model.PaddleNav.Selector);
                this.paddleNav = {
                    previousEl: t.querySelector(".paddlenav-arrow-previous"),
                    nextEl: t.querySelector(".paddlenav-arrow-next")
                },
                this.onPaddleNavSelected = this.onPaddleNavSelected.bind(this),
                [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(t=>{
                    t.addEventListener("click", this.onPaddleNavSelected)
                }
                )
            },
            destroy() {
                [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(t=>{
                    t.removeEventListener("click", this.onPaddleNavSelected)
                }
                ),
                this.paddleNav = null
            },
            onPaddleNavSelected(t) {
                let e = t.target.className.includes("previous") ? -1 : 1;
                this.lastInteractionEvent = t;
                const i = this.currentIndex + 1 * e;
                this.animateToItem(i)
            },
            onItemChangeCompleted(t) {
                const e = this.wrappedIndex(this.currentIndex + 1) !== this.currentIndex;
                s(this.paddleNav.nextEl, e);
                const i = this.wrappedIndex(this.currentIndex + -1) !== this.currentIndex;
                s(this.paddleNav.previousEl, i)
            }
        }
    }
    , {}],
    155: [function(t, e, i) {
        "use strict";
        e.exports = {
            onItemChangeOccurred(t) {
                const {previous: e, current: i} = this.selections.occurred;
                e && e !== i && e.deselect(),
                i.select()
            }
        }
    }
    , {}],
    156: [function(t, e, i) {
        "use strict";
        const s = t(7)
          , r = t(11);
        e.exports = {
            itemsCreated(t) {
                this._items.forEach((t,e)=>{
                    e === this.wrappedIndex(this.currentIndex) ? r(t.el) : s(t.el)
                }
                )
            },
            onItemChangeCompleted(t) {
                const {previous: e, current: i} = this.selections.completed;
                e && e !== i && s(e.el),
                r(i.el)
            }
        }
    }
    , {
        11: 11,
        7: 7
    }],
    157: [function(t, e, i) {
        "use strict";
        const s = t(109)
          , r = t(91)
          , n = t(65)
          , a = t(61)
          , o = t(58)
          , l = t(60);
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    widthOfItem: {
                        configurable: !0,
                        get: ()=>this._items[0].width
                    }
                })
            },
            created(t) {
                this.position = 0,
                this.target = 0,
                this.slideContainer = this.el.querySelector(this.model.Slide.Selector),
                this.sign = this.model.IsRTL ? -1 : 1,
                this.mountUpdateId = 0,
                this.mountDrawId = 0
            },
            mounted() {
                this.mountUpdateId = n(()=>{
                    this._items.forEach(t=>{
                        t.measure(),
                        t.x = t.width * t.index * this.sign
                    }
                    ),
                    this.mountDrawId = a(()=>{
                        this.mountDrawId = null,
                        this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.wrappedIndex(this.currentIndex)),
                        this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)"),
                        this.checkForSlideUpdate(!0)
                    }
                    )
                }
                )
            },
            animateToItem(t) {
                const e = this.wrappedIndex(t);
                if (this.currentIndex === e)
                    return;
                this.el.parentElement.scrollLeft = 0;
                let i = "cubic-bezier(0.645, 0.045, 0.355, 1)";
                this.clip && this.clip._isPlaying && (this.clip.destroy(),
                i = "cubic-bezier(0.23, 1, 0.32, 1)");
                const n = this.target
                  , a = this.convertSlideIndexToHorizontalPosition(t)
                  , o = this.model.PrefersReducedMotion ? .001 : this.model.Slide.duration
                  , l = this._items[this.wrappedIndex(t)];
                this.clip = new s(o,{
                    ease: r.fromCSSString(i),
                    prepare: ()=>this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: l
                    }),
                    update: t=>{
                        t = Math.min(1, Math.max(t, 0)),
                        this.target = n + (a - n) * t
                    }
                    ,
                    draw: ()=>this.draw(1),
                    finish: ()=>this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                        gallery: this,
                        current: l
                    })
                }),
                this.slideContainer.style.transition = "transform ".concat(o, "s ").concat(i),
                this.slideContainer.style.transform = "translate3d(".concat(-a, "px, 0,0)"),
                this.clip.play().then(()=>{
                    this.clip.destroy(),
                    this.clip = null
                }
                )
            },
            draw(t=1) {
                let e = this.target - this.position;
                this.position += e * t;
                const i = Math.abs(this.position - this.target);
                i < .1 && (this.position = this.target),
                this.checkForSlideUpdate(),
                1 !== t && (this.slideContainer.style.transition = "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
                this.slideContainer.style.transform = "translate(".concat(-this.position, "px, 0)"),
                Math.abs(i) > 0 && (o(this.dragDrawId),
                a(()=>this.draw(t)))),
                this._items.forEach(t=>{
                    let e = (t.x - this.position) / this.widthOfItem;
                    t.progress(e)
                }
                )
            },
            checkForSlideUpdate(t) {
                let e = Math.floor((this.position * this.sign + .5 * this.widthOfItem) / this.widthOfItem);
                isNaN(e) || (e !== this.currentIndex || t) && (this.currentIndex = e,
                this.wrapSlideItems(),
                this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: this.currentItem
                }))
            },
            wrapSlideItems() {
                this.clampedIndex || this._items.length < 2 || (this.currentItem.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                this.currentItem.prev.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex - 1),
                this.currentItem.next.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex + 1))
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(),
                this.clip = null),
                this._items.forEach(t=>{
                    t.measure(),
                    t.x = t.width * t.index * this.sign
                }
                ),
                this.currentIndex = this.wrappedIndex(this.currentItem.index),
                this.wrapSlideItems(),
                this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.currentIndex),
                this.slideContainer.style.transition = "none",
                a(()=>{
                    this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)")
                }
                )
            },
            convertSlideIndexToHorizontalPosition(t) {
                return t * this.widthOfItem * this.sign
            },
            destroy() {
                this.mountUpdateId && l(this.mountUpdateId),
                this.mountDrawId && o(this.mountDrawId),
                this.clip && (this.clip.destroy(),
                this.clip = null),
                this._items.forEach(t=>{
                    t.measure(),
                    t.x = 0,
                    t.zIndex = t === this.currentItem ? 2 : 0
                }
                ),
                this.slideContainer.removeAttribute("style")
            }
        }
    }
    , {
        109: 109,
        58: 58,
        60: 60,
        61: 61,
        65: 65,
        91: 91
    }],
    158: [function(t, e, i) {
        "use strict";
        const s = t(61)
          , r = t(58);
        e.exports = {
            created(t) {
                this.swipeDrag = {
                    movementRateMultiplier: this.model.SwipeDrag.movementRateMultiplier,
                    velocityMultiplier: this.model.SwipeDrag.velocityMultiplier,
                    dragDrawId: -1,
                    waitingToReachTargetDrawId: -1,
                    inputStart: {
                        x: 0,
                        y: 0
                    },
                    swipeVelocity: 0,
                    isDragging: !1
                },
                this._onStartDrag = this._onStartDrag.bind(this),
                this._onDrag = this._onDrag.bind(this),
                this._onStopDrag = this._onStopDrag.bind(this),
                this.waitingToReachTarget = this.waitingToReachTarget.bind(this)
            },
            mounted() {
                this.inputMoveEventName = this.model.IsTouch ? "touchmove" : "mousemove",
                this.inputUpEventName = this.model.IsTouch ? "touchend" : "mouseup",
                this.inputDownEvent = this.model.IsTouch ? "touchstart" : "mousedown",
                (this.model.IsTouch || this.model.SwipeDrag.DesktopSwipe) && (this.el.removeEventListener(this.inputDownEvent, this._onStartDrag),
                this.el.addEventListener(this.inputDownEvent, this._onStartDrag))
            },
            _onStartDrag(t) {
                r(this.swipeDrag.dragDrawId),
                r(this.swipeDrag.waitingToReachTargetDrawId);
                const e = t.target || t.relatedTarget;
                switch (!0) {
                case "A" === e.tagName:
                case "BUTTON" === e.tagName:
                case !t.touches && 1 !== t.which:
                    return
                }
                this.clip && this.clip.destroy(),
                this.lastInteractionEvent = t,
                this.swipeDrag.swipeVelocity = 0,
                this.swipeDrag.isDragging = !1;
                const i = this.model.IsTouch ? t.touches[0] : t;
                let {screenX: s, screenY: n} = i;
                this.swipeDrag.inputStart = {
                    x: s,
                    y: n
                },
                window.addEventListener(this.inputMoveEventName, this._onDrag, {
                    passive: !1
                }),
                window.addEventListener(this.inputUpEventName, this._onStopDrag)
            },
            _onDrag(t) {
                this.swipeDrag.isDragging && t.cancelable && t.preventDefault();
                const e = this.model.IsTouch ? t.touches[0] : t;
                let {screenX: i, screenY: n} = e
                  , a = this.swipeDrag.inputStart.x - i
                  , o = this.swipeDrag.inputStart.y - n;
                this.swipeDrag.inputStart = {
                    x: i,
                    y: n
                },
                this.swipeDrag.isDragging || (this.swipeDrag.isDragging = Math.abs(a) > 3 && Math.abs(a) > Math.abs(o)),
                this.swipeDrag.isDragging && (this.target += a * this.swipeDrag.movementRateMultiplier,
                this.swipeDrag.swipeVelocity = a * this.swipeDrag.velocityMultiplier,
                this.clampedIndex && (this.model.IsRTL ? this.target = Math.max(this.widthOfItem * this.sign * (this._items.length - 1), Math.min(0, this.target)) : this.target = Math.min(this.widthOfItem * (this._items.length - 1), Math.max(0, this.target))),
                r(this.swipeDrag.dragDrawId),
                this.swipeDrag.dragDrawId = s(()=>this.draw(.3)))
            },
            _onStopDrag(t) {
                if (window.removeEventListener(this.inputMoveEventName, this._onDrag),
                window.removeEventListener(this.inputUpEventName, this._onStopDrag),
                !this.swipeDrag.isDragging)
                    return;
                let e = [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1]
                  , i = 0
                  , n = Number.MAX_VALUE;
                for (let t = 0, s = e.length; t < s; t++) {
                    let s = e[t] * this.widthOfItem
                      , r = Math.abs(s - (this.position + this.swipeDrag.swipeVelocity) * this.sign);
                    r < n && (n = r,
                    i = t)
                }
                this.lastInteractionEvent = t;
                let a = e[i];
                this.clampedIndex && (a = this.wrappedIndex(a)),
                this.target = this.convertSlideIndexToHorizontalPosition(a),
                r(this.swipeDrag.dragDrawId),
                r(this.swipeDrag.waitingToReachTargetDrawId),
                this.swipeDrag.dragDrawId = s(()=>{
                    this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: this._items[this.wrappedIndex(a)]
                    }),
                    this.draw(.2),
                    this.waitingToReachTarget(a)
                }
                )
            },
            waitingToReachTarget(t) {
                if (Math.abs(this.position - this.target) > .1)
                    return void (this.swipeDrag.waitingToReachTargetDrawId = s(()=>this.waitingToReachTarget(t)));
                const e = this.selections.occurred.current;
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: e
                })
            },
            destroy() {
                this.el.removeEventListener(this.inputDownEvent, this._onStartDrag),
                window.removeEventListener(this.inputMoveEventName, this._onDrag),
                window.removeEventListener(this.inputUpEventName, this._onStopDrag)
            }
        }
    }
    , {
        58: 58,
        61: 61
    }],
    159: [function(t, e, i) {
        "use strict";
        const s = t(2)
          , r = t(12)
          , n = t(15);
        e.exports = {
            created() {
                this.tabNav = {
                    items: [],
                    current: null
                }
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((t,e)=>{
                    const i = new a(t,e)
                      , s = this.getItemForTrigger(i.trigger);
                    s || console.error("MixinGallery '".concat(this.el.id, "': Could not match tav/dot nav item with trigger '").concat(i.trigger, "', to gallery any item. Double check to make sure the triggers match the item id's.")),
                    i.onSelected = t=>{
                        this.lastInteractionEvent = t,
                        t.preventDefault();
                        let i = e - this.wrappedIndex(this.currentIndex)
                          , s = this.currentIndex + i;
                        this.animateToItem(s)
                    }
                    ,
                    s.on("select", ()=>{
                        t.classList.add("current"),
                        i.anchorEl.classList.add("current")
                    }
                    ),
                    s.on("deselect", ()=>{
                        t.classList.remove("current"),
                        i.anchorEl.classList.remove("current")
                    }
                    ),
                    i.anchorEl.addEventListener("click", i.onSelected),
                    this.tabNav.items.push(i)
                }
                ),
                this._items.forEach((t,e)=>{
                    t.el.setAttribute("role", n.TABPANEL),
                    t.el.setAttribute(r.LABELLEDBY, this.tabNav.items[e].anchorEl.id),
                    this.tabNav.items[e].anchorEl.setAttribute(r.CONTROLS, t.el.id)
                }
                )
            },
            mounted() {
                const t = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(t,{
                    selector: this.model.TabNav.RoamingTabIndexSelector
                })
            },
            onItemChangeCompleted(t) {
                let e = this.tabNav.items.filter(e=>e.trigger === t.current.id)[0];
                this.setCurrentItem(e),
                this.roamingTabIndex.setSelectedItemByIndex(e.index, !0),
                document.activeElement.parentElement.parentElement === e.el.parentElement && e.anchorEl.focus()
            },
            setCurrentItem(t) {
                t !== this.tabNav.current && (this.tabNav.current = t)
            }
        };
        class a {
            constructor(t, e) {
                this.el = t,
                this.index = e,
                this.anchorEl = t.querySelector("a"),
                this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger"),
                this.anchorEl.setAttribute("role", n.TAB)
            }
        }
    }
    , {
        12: 12,
        15: 15,
        2: 2
    }],
    160: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                this.selections = {
                    initiated: {
                        current: null,
                        previous: null
                    },
                    occurred: {
                        current: null,
                        previous: null
                    },
                    completed: {
                        current: null,
                        previous: null
                    }
                }
            },
            onItemChangeInitiated(t) {
                this.selections.initiated.previous = this.selections.initiated.current,
                this.selections.initiated.current = this.selections.initiated.next,
                this.selections.initiated.next = t.next
            },
            onItemChangeOccurred(t) {
                this.selections.occurred.previous = t.previous = this.selections.occurred.current,
                this.selections.occurred.current = t.current
            },
            onItemChangeCompleted(t) {
                this.selections.completed.previous = t.previous = this.selections.completed.current,
                this.selections.completed.current = t.current
            }
        }
    }
    , {}],
    161: [function(t, e, i) {
        "use strict";
        e.exports = {
            lerp: function(t, e, i) {
                return e + (i - e) * t
            },
            map: function(t, e, i, s, r) {
                return s + (r - s) * (t - e) / (i - e)
            },
            mapClamp: function(t, e, i, s, r) {
                var n = s + (r - s) * (t - e) / (i - e);
                return Math.max(s, Math.min(r, n))
            },
            norm: function(t, e, i) {
                return (t - e) / (i - e)
            },
            clamp: function(t, e, i) {
                return Math.max(e, Math.min(i, t))
            },
            randFloat: function(t, e) {
                return Math.random() * (e - t) + t
            },
            randInt: function(t, e) {
                return Math.floor(Math.random() * (e - t) + t)
            }
        }
    }
    , {}],
    162: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                edgeChromium: !1,
                samsung: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }
    , {}],
    163: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(t) {
                    return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                }
            }, {
                name: "edgeChromium",
                userAgent: "Edge",
                version: ["rv", "Edg"],
                test: function(t) {
                    return t.ua.indexOf("Edg") > -1 && -1 === t.ua.indexOf("Edge")
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && -1 === t.ua.indexOf("Opera")
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(t) {
                    return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(t) {
                    return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var t = !1;
                    return document.documentMode && (t = parseInt(document.documentMode, 10)),
                    t
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }, {
                name: "samsung",
                userAgent: "SamsungBrowser"
            }],
            os: [{
                name: "windows",
                test: function(t) {
                    return t.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(t) {
                    return t.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function(t) {
                    return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(t) {
                    return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && -1 === t.ua.indexOf("Android")
                }
            }, {
                name: "fireos",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function(t) {
                    return t.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }
    , {}],
    164: [function(t, e, i) {
        "use strict";
        var s = t(162)
          , r = t(163);
        function n(t, e) {
            if ("function" == typeof t.parseVersion)
                return t.parseVersion(e);
            var i, s = t.version || t.userAgent;
            "string" == typeof s && (s = [s]);
            for (var r, n = s.length, a = 0; a < n; a++)
                if ((r = e.match((i = s[a],
                new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)","i")))) && r.length > 1)
                    return r[1].replace(/_/g, ".");
            return !1
        }
        function a(t, e, i) {
            for (var s, r, a = t.length, o = 0; o < a; o++)
                if ("function" == typeof t[o].test ? !0 === t[o].test(i) && (s = t[o].name) : i.ua.indexOf(t[o].userAgent) > -1 && (s = t[o].name),
                s) {
                    if (e[s] = !0,
                    "string" == typeof (r = n(t[o], i.ua))) {
                        var l = r.split(".");
                        e.version.string = r,
                        l && l.length > 0 && (e.version.major = parseInt(l[0] || 0),
                        e.version.minor = parseInt(l[1] || 0),
                        e.version.patch = parseInt(l[2] || 0))
                    } else
                        "edge" === s && (e.version.string = "12.0.0",
                        e.version.major = "12",
                        e.version.minor = "0",
                        e.version.patch = "0");
                    return "function" == typeof t[o].parseDocumentMode && (e.version.documentMode = t[o].parseDocumentMode()),
                    e
                }
            return e
        }
        e.exports = function(t) {
            var e = {};
            return e.browser = a(r.browser, s.browser, t),
            e.os = a(r.os, s.os, t),
            e
        }
    }
    , {
        162: 162,
        163: 163
    }],
    165: [function(t, e, i) {
        "use strict";
        var s = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t(164)(s)
    }
    , {
        164: 164
    }],
    166: [function(t, e, i) {
        "use strict";
        var s = t(34).EventEmitterMicro;
        const r = {};
        "undefined" != typeof window && (r.update = t(65));
        var n = "viewport-emitter"
          , a = {
            removeNamespace: !0
        }
          , o = "data-viewport-emitter-dispatch"
          , l = "data-viewport-emitter-state"
          , h = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)"
          , c = "only screen and (orientation: portrait)"
          , u = "only screen and (orientation: landscape)"
          , d = "change:any"
          , m = "change:orientation"
          , p = "change:retina"
          , f = "change:viewport";
        function g(t, e) {
            s.call(this),
            this._id = t || n,
            this._options = Object.assign({}, a, e),
            this._allowDOMEventDispatch = !1,
            this._allowElementStateData = !1,
            this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace,
            this._el = this._initViewportEl(this._id),
            this._resizing = !1,
            this._mediaQueryLists = {
                resolution: {
                    retina: window.matchMedia(h)
                },
                orientation: {
                    portrait: window.matchMedia(c),
                    landscape: window.matchMedia(u)
                }
            },
            this._viewport = this._getViewport(this._options.removeNamespace),
            this._retina = this._getRetina(this._mediaQueryLists.resolution.retina),
            this._orientation = this._initOrientation(),
            this._addListeners(),
            this._updateElementStateData()
        }
        Object.defineProperty(g, "DOM_DISPATCH_ATTRIBUTE", {
            get: function() {
                return o
            }
        }),
        Object.defineProperty(g, "DOM_STATE_ATTRIBUTE", {
            get: function() {
                return l
            }
        });
        var _ = g.prototype = Object.create(s.prototype);
        Object.defineProperty(_, "id", {
            get: function() {
                return this._id
            }
        }),
        Object.defineProperty(_, "element", {
            get: function() {
                return this._el
            }
        }),
        Object.defineProperty(_, "mediaQueryLists", {
            get: function() {
                return this._mediaQueryLists
            }
        }),
        Object.defineProperty(_, "viewport", {
            get: function() {
                return this._viewport
            }
        }),
        Object.defineProperty(_, "retina", {
            get: function() {
                return this._retina
            }
        }),
        Object.defineProperty(_, "orientation", {
            get: function() {
                return this._orientation
            }
        }),
        Object.defineProperty(_, "hasDomDispatch", {
            get: function() {
                return this._allowDOMEventDispatch
            }
        }),
        _.destroy = function() {
            for (var t in this._removeListeners(),
            this._options)
                this._options[t] = null;
            for (var e in this._mediaQueryLists) {
                var i = this._mediaQueryLists[e];
                for (var r in i)
                    i[r] = null
            }
            this._id = null,
            this._el = null,
            this._viewport = null,
            this._retina = null,
            this._orientation = null,
            s.prototype.destroy.call(this)
        }
        ,
        _._initViewportEl = function(t) {
            var e = document.getElementById(t);
            return e || ((e = document.createElement("div")).id = t,
            e = document.body.appendChild(e)),
            e.hasAttribute(o) || (e.setAttribute(o, ""),
            this._allowDOMEventDispatch = !0),
            e.hasAttribute(l) || (this._allowElementStateData = !0),
            e
        }
        ,
        _._dispatch = function(t, e) {
            var i = {
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina
            };
            if (this._allowDOMEventDispatch) {
                var s = new CustomEvent(t,{
                    detail: e
                })
                  , r = new CustomEvent(d,{
                    detail: i
                });
                this._el.dispatchEvent(s),
                this._el.dispatchEvent(r)
            }
            this.trigger(t, e),
            this.trigger(d, i)
        }
        ,
        _._addListeners = function() {
            this._onOrientationChange = this._onOrientationChange.bind(this),
            this._onRetinaChange = this._onRetinaChange.bind(this),
            this._onViewportChange = this._onViewportChange.bind(this),
            this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this),
            this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange),
            this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange),
            this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange),
            window.addEventListener("resize", this._onViewportChange)
        }
        ,
        _._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange),
            this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange),
            this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange),
            window.removeEventListener("resize", this._onViewportChange)
        }
        ,
        _._updateElementStateData = function() {
            if (this._allowElementStateData) {
                var t = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(l, t)
            }
        }
        ,
        _._getViewport = function(t) {
            var e = window.getComputedStyle(this._el, "::before").content;
            return e ? (e = e.replace(/["']/g, ""),
            t ? e.split(":").pop() : e) : null
        }
        ,
        _._getRetina = function(t) {
            return t.matches
        }
        ,
        _._getOrientation = function(t) {
            var e = this._orientation;
            if (t.matches) {
                return t.media.match(/portrait|landscape/)[0]
            }
            return e
        }
        ,
        _._initOrientation = function() {
            var t = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return t || this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }
        ,
        _._onViewportChange = function() {
            this._resizing || (this._resizing = !0,
            r.update(this._onViewportChangeUpdate))
        }
        ,
        _._onViewportChangeUpdate = function() {
            var t = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace),
            t !== this._viewport) {
                var e = {
                    from: t,
                    to: this._viewport
                };
                this._updateElementStateData(),
                this._dispatch(f, e)
            }
            this._resizing = !1
        }
        ,
        _._onRetinaChange = function(t) {
            var e = this._retina;
            if (this._retina = this._getRetina(t),
            e !== this._retina) {
                var i = {
                    from: e,
                    to: this._retina
                };
                this._updateElementStateData(),
                this._dispatch(p, i)
            }
        }
        ,
        _._onOrientationChange = function(t) {
            var e = this._orientation;
            if (this._orientation = this._getOrientation(t),
            e !== this._orientation) {
                var i = {
                    from: e,
                    to: this._orientation
                };
                this._updateElementStateData(),
                this._dispatch(m, i)
            }
        }
        ,
        e.exports = g
    }
    , {
        34: 34,
        65: 65
    }],
    167: [function(t, e, i) {
        "use strict";
        var s = t(166);
        e.exports = new s
    }
    , {
        166: 166
    }],
    168: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = new Float32Array(16);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
    }
    , {}],
    169: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , r = Math.cos(i)
              , n = e[4]
              , a = e[5]
              , o = e[6]
              , l = e[7]
              , h = e[8]
              , c = e[9]
              , u = e[10]
              , d = e[11];
            e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[4] = n * r + h * s,
            t[5] = a * r + c * s,
            t[6] = o * r + u * s,
            t[7] = l * r + d * s,
            t[8] = h * r - n * s,
            t[9] = c * r - a * s,
            t[10] = u * r - o * s,
            t[11] = d * r - l * s,
            t
        }
    }
    , {}],
    170: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , r = Math.cos(i)
              , n = e[0]
              , a = e[1]
              , o = e[2]
              , l = e[3]
              , h = e[8]
              , c = e[9]
              , u = e[10]
              , d = e[11];
            e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[0] = n * r - h * s,
            t[1] = a * r - c * s,
            t[2] = o * r - u * s,
            t[3] = l * r - d * s,
            t[8] = n * s + h * r,
            t[9] = a * s + c * r,
            t[10] = o * s + u * r,
            t[11] = l * s + d * r,
            t
        }
    }
    , {}],
    171: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i)
              , r = Math.cos(i)
              , n = e[0]
              , a = e[1]
              , o = e[2]
              , l = e[3]
              , h = e[4]
              , c = e[5]
              , u = e[6]
              , d = e[7];
            e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            return t[0] = n * r + h * s,
            t[1] = a * r + c * s,
            t[2] = o * r + u * s,
            t[3] = l * r + d * s,
            t[4] = h * r - n * s,
            t[5] = c * r - a * s,
            t[6] = u * r - o * s,
            t[7] = d * r - l * s,
            t
        }
    }
    , {}],
    172: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = i[0]
              , r = i[1]
              , n = i[2];
            return t[0] = e[0] * s,
            t[1] = e[1] * s,
            t[2] = e[2] * s,
            t[3] = e[3] * s,
            t[4] = e[4] * r,
            t[5] = e[5] * r,
            t[6] = e[6] * r,
            t[7] = e[7] * r,
            t[8] = e[8] * n,
            t[9] = e[9] * n,
            t[10] = e[10] * n,
            t[11] = e[11] * n,
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
    }
    , {}],
    173: [function(t, e, i) {
        "use strict";
        var s = t(36)
          , r = s(t(134))
          , n = s(t(139))
          , a = s(t(136));
        let o = t(42);
        const {Media: l} = t(121);
        function h(t, e, i) {
            o.apply(this, arguments),
            this.el = t,
            this.isSupported() && this._initialize()
        }
        let c = h.prototype = Object.create(o.prototype);
        c._initialize = async function() {
            this.video = this.el.querySelector("video");
            const t = this.video;
            this.ui = this.el.querySelector(".inline-media-ui button"),
            this.media = new l({
                el: t,
                plugins: [r.default, n.default, a.default],
                basePath: t.dataset.videoBasePath,
                breakpoints: {
                    small: 429,
                    medium: 735,
                    large: 1069
                }
            }),
            this.media.on("inline-media-timeout", ()=>{
                this._destroy()
            }
            ),
            this.viewportEmitter.on("change:viewport", ()=>{
                this._destroy()
            }
            ),
            this.viewportEmitter.on("change:orientation", ()=>{
                this._destroy()
            }
            ),
            this.ui.setAttribute("aria-hidden", "false"),
            this.ui.setAttribute("aria-disabled", "false");
            try {
                this.media.play()
            } catch (t) {
                console.error(t)
            }
        }
        ,
        c.isSupported = function() {
            return !document.documentElement.classList.contains("reduced-motion")
        }
        ,
        c._destroy = function() {
            document.documentElement.classList.add("tv-fallback"),
            this.video.remove(),
            this.ui.setAttribute("aria-hidden", "false"),
            this.ui.setAttribute("aria-disabled", "false")
        }
        ,
        e.exports = h
    }
    , {
        121: 121,
        134: 134,
        136: 136,
        139: 139,
        36: 36,
        42: 42
    }],
    174: [function(t, e, i) {
        "use strict";
        const s = t(42)
          , {Media: r} = t(121);
        e.exports = class extends s {
            constructor(t) {
                super(...arguments),
                this.isSupported() && this._initialize(t)
            }
            async _initialize(t) {
                this.isAnimPlaying = !1,
                this.animationWrapper = t.querySelector(".animation-wrapper"),
                this.animation = t.querySelector("#wwdc23"),
                this.inlineMediaUI = t.querySelector(".inline-media-ui"),
                this.viewport = this._getHPViewport(),
                this._hpViewportEmitter = this._hpViewportEmitter.bind(this),
                window.addEventListener("resize", this._hpViewportEmitter),
                this._assignSrc(),
                this._addEventListeners(),
                this.mediaInstance = await r.autoInitialize(this.animationWrapper),
                this.mediaInstance[0].on("inline-media-timeout", ()=>{
                    this._destroy()
                }
                ),
                this.viewportEmitter.on("change:viewport", ()=>{
                    this._destroy()
                }
                ),
                this.viewportEmitter.on("change:orientation", ()=>{
                    this._destroy()
                }
                )
            }
            _assignSrc() {
                const t = this.animation.dataset.inlineMediaBasepath;
                let e = this.viewportEmitter.retina ? "".concat(this.viewport, "_2x.mp4") : "".concat(this.viewport, ".mp4");
                document.documentElement.classList.contains("ipad") && /^large/.test(this.viewport) && (e = "largetall" == this.viewport ? "largetall.mp4" : "large.mp4"),
                this.animation.setAttribute("src", "".concat(t, "/").concat(e))
            }
            _getHPViewport() {
                let t = "xlarge" === this.viewportEmitter.viewport ? "large" : this.viewportEmitter.viewport;
                const e = document.documentElement.clientHeight;
                return "large" === t && e > 775 && (t = "largetall"),
                "medium" === t && e > 733 && (t = "mediumtall"),
                t
            }
            _hpViewportEmitter() {
                let t = this.viewport
                  , e = this._getHPViewport();
                t != e && (this.viewport = e,
                this._destroy())
            }
            _addEventListeners() {
                this.animation.addEventListener("canplaythrough", ()=>{
                    this._playVideoAnim()
                }
                ),
                this.animation.addEventListener("error", ()=>{
                    this._destroy()
                }
                )
            }
            async _playVideoAnim() {
                if (!this.isAnimPlaying)
                    try {
                        this.isAnimPlaying = !0,
                        await this.mediaInstance[0].el.play()
                    } catch (t) {
                        this._destroy()
                    }
            }
            _destroy() {
                const t = document.querySelector(".unit-image-wwdc23-announce-hero-wwdc23-apple");
                this.animation.remove(),
                this.inlineMediaUI.remove(),
                t.classList.remove("hide"),
                this.mediaInstance[0].destroy()
            }
            isSupported() {
                return !document.documentElement.classList.contains("reduced-motion")
            }
        }
    }
    , {
        121: 121,
        42: 42
    }],
    175: [function(t, e, i) {
        "use strict";
        const s = t(42)
          , {Media: r} = t(121)
          , n = t(75);
        e.exports = class extends s {
            constructor(t) {
                super(...arguments),
                this.isAnimPlaying = !1,
                this.animationWrapper = t.querySelector(".animation-wrapper"),
                this.animation = t.querySelector("#wwdc23"),
                this.inlineMediaUI = t.querySelector(".inline-media-ui"),
                this.isSupported() && this.animationWrapper && this._initialize()
            }
            async _initialize() {
                this._assignSrc(),
                this._addEventListeners(),
                this.mediaInstance = await r.autoInitialize(this.animationWrapper, {
                    anim: n
                }),
                this.mediaInstance[0].on("inline-media-timeout", ()=>{
                    this._destroy()
                }
                ),
                this.viewportEmitter.on("change:viewport", ()=>{
                    this._destroy()
                }
                ),
                this.viewportEmitter.on("change:orientation", ()=>{
                    this._destroy()
                }
                )
            }
            _assignSrc() {
                const t = this.animation.dataset.inlineMediaBasepath
                  , e = "xlarge" === this.viewportEmitter.viewport ? "large" : this.viewportEmitter.viewport;
                let i = this.viewportEmitter.retina ? "".concat(e, "_2x.mp4") : "".concat(e, ".mp4");
                this.animation.setAttribute("src", "".concat(t, "/").concat(i))
            }
            _addEventListeners() {
                this.animation.addEventListener("canplaythrough", ()=>{
                    this._playVideoAnim()
                }
                ),
                this.animation.addEventListener("error", ()=>{
                    this._destroy()
                }
                )
            }
            async _playVideoAnim() {
                if (!this.isAnimPlaying)
                    try {
                        this.isAnimPlaying = !0,
                        await this.mediaInstance[0].el.play()
                    } catch (t) {
                        this._destroy()
                    }
            }
            _destroy() {
                const t = document.querySelector(".unit-image-wwdc23-announce-promo-wwdc23-apple");
                this.animation.remove(),
                this.inlineMediaUI.remove(),
                t.classList.remove("hide"),
                this.mediaInstance[0].destroy()
            }
            isSupported() {
                return !document.documentElement.classList.contains("reduced-motion")
            }
        }
    }
    , {
        121: 121,
        42: 42,
        75: 75
    }],
    176: [function(t, e, i) {
        "use strict";
        const s = t(43)
          , r = t(167)
          , n = t(68).parseSearchParams
          , a = t(142)
          , o = t(157)
          , l = t(159)
          , h = t(152)
          , c = t(155)
          , u = (t(145),
        t(151))
          , d = t(154)
          , m = t(158)
          , p = t(75);
        let f;
        try {
            f = t("@marcom/ac-analytics").observer.Gallery
        } catch (t) {}
        const g = {
            created(t) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    name: this.el.getAttribute("data-analytics-gallery-id") || this.el.getAttribute("id"),
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                f && (this.analytics.observer = new f(this,{
                    galleryName: this.analytics.name,
                    beforeUpdateEvent: this.analytics.events.UPDATE,
                    afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                    trackAutoRotate: !1
                }))
            },
            onItemChangeCompleted(t) {
                if (!t.previous || t.current === this.analytics.lastTrackedItem || t.current === t.previous && !this.analytics.lastTrackedItem)
                    return;
                if (t.gallery && t.gallery.lastInteractionEvent && t.gallery.lastInteractionEvent.event && "timeout" == t.gallery.lastInteractionEvent.event)
                    return;
                this.analytics.lastTrackedItem = t.current;
                let e = {
                    incoming: {
                        id: t.current.analyticsId
                    },
                    outgoing: {
                        id: t.previous.analyticsId
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, e)
            }
        }
          , _ = {
            onItemChangeCompleted(t) {
                const e = this.model.items.length;
                let i = t.gallery.currentIndex
                  , s = i - 1
                  , r = i + 1;
                s < 0 ? s = e + s % e : s %= e,
                r < 0 ? r = e + r % e : r %= e;
                const n = this.model.items[s].title
                  , a = this.model.items[r].title;
                this.model.previousElement.setAttribute("aria-label", this.model.previousTemplate.replace("${title}", n)),
                this.model.nextElement.setAttribute("aria-label", this.model.nextTemplate.replace("${title}", a))
            }
        }
          , y = s.prototype
          , v = {
            L: "large",
            M: "medium",
            S: "small"
        }
          , E = {
            xlarge: {
                width: 1250,
                height: 1250 / (1124 / 600)
            },
            large: {
                width: 980,
                height: 980 / (1124 / 600)
            },
            medium: {
                width: 689,
                height: 689 / (1124 / 600)
            },
            small: {
                width: 274,
                height: 495
            }
        }
          , b = {
            xlarge: "shelfImage",
            large: "shelfImage",
            medium: "shelfImage",
            small: "channelSplashTall"
        }
          , w = {
            xlarge: "shelfImage",
            large: "shelfImage",
            medium: "shelfImage",
            small: "shelfImage"
        }
          , A = "singleColorContentLogo"
          , I = {
            mounted() {
                this.autoplayAdvance = this.autoplayAdvance.bind(this),
                this.onPlayPauseClick = this.onPlayPauseClick.bind(this),
                this.model.playPauseElement && this.model.playPauseElement.addEventListener("click", this.onPlayPauseClick),
                document.documentElement.classList.contains("no-reduced-motion") ? (this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay),
                this.model.playPauseElement.classList.add("playing"),
                this.model.playPauseElement.setAttribute("aria-label", this.model.pauseAria),
                this.model.playPauseElement.setAttribute("data-analytics-title", "pause-gallery"),
                this.model.playPauseElement.setAttribute("data-analytics-click", "prop3:pause-gallery")) : (this.model.playPauseElement.classList.add("paused"),
                this.model.playPauseElement.setAttribute("aria-label", this.model.playAria),
                this.model.playPauseElement.setAttribute("data-analytics-title", "play-gallery"),
                this.model.playPauseElement.setAttribute("data-analytics-click", "prop3:play-gallery")),
                this.model.playPauseElement.classList.add("show")
            },
            onPlayPauseClick(t) {
                this.isPaused && !t.forcePause ? (this.isPaused = !1,
                this.model.playPauseElement.classList.remove("paused"),
                this.model.playPauseElement.classList.add("playing"),
                this.model.playPauseElement.setAttribute("aria-label", this.model.pauseAria),
                this.autoplayAdvance(),
                window.clearTimeout(this.autoAdvanceTimeout),
                this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay),
                setTimeout(()=>{
                    this.model.playPauseElement.setAttribute("data-analytics-title", "pause-gallery"),
                    this.model.playPauseElement.setAttribute("data-analytics-click", "prop3:pause-gallery")
                }
                , 0)) : (this.isPaused = !0,
                this.model.playPauseElement.classList.remove("playing"),
                this.model.playPauseElement.classList.add("paused"),
                this.model.playPauseElement.setAttribute("aria-label", this.model.playAria),
                window.clearTimeout(this.autoAdvanceTimeout),
                setTimeout(()=>{
                    this.model.playPauseElement.setAttribute("data-analytics-title", "play-gallery"),
                    this.model.playPauseElement.setAttribute("data-analytics-click", "prop3:play-gallery")
                }
                , 0))
            },
            autoplayAdvance() {
                if (this.inView) {
                    this.lastInteractionEvent = {
                        event: "timeout"
                    };
                    let t = this.model.IsRTL ? -1 : 1;
                    const e = this.currentIndex + t;
                    this.animateToItem(e)
                }
                this.autoAdvanceTimeout = setTimeout(this.autoplayAdvance, this.model.autoAdvanceDelay)
            },
            onItemChangeInitiated(t) {
                void 0 !== t.gallery.lastInteractionEvent && "timeout" !== t.gallery.lastInteractionEvent.event && this.onPlayPauseClick({
                    forcePause: !0
                })
            },
            destroy() {
                window.clearTimeout(this.autoAdvanceTimeout)
            }
        };
        function T(t) {
            var e = document.createElement("template");
            return t = t.trim(),
            e.innerHTML = t,
            e.content.firstChild
        }
        function x(t, e, i) {
            s.apply(this, arguments),
            this.anim = p,
            p.initialize(),
            this.dotNavEl = this.collectionUnitElement.querySelector(".dotnav-items"),
            this.galleryEl = this.collectionUnitElement.querySelector(".gallery"),
            this.galleryItemsContainerEl = this.collectionUnitElement.querySelector(".gallery .item-container"),
            this.token = this.galleryEl.dataset.token,
            this.watchNowText = this.galleryEl.dataset.watchNow,
            this.previewNowText = this.galleryEl.dataset.previewNow,
            this.watchNowTemplate = this.galleryEl.dataset.watchNowAria,
            this.previewNowTemplate = this.galleryEl.dataset.previewNowAria,
            this.previousAria = this.galleryEl.dataset.previousAria || "Previous",
            this.nextAria = this.galleryEl.dataset.nextAria || "Next",
            this.playAria = this.galleryEl.dataset.playAria || "play Apple TV plus gallery",
            this.pauseAria = this.galleryEl.dataset.pauseAria || "pause Apple TV plus gallery",
            this.paddleNavPreviousAriaTemplate = this.galleryEl.dataset.prevAriaTemplate,
            this.paddleNavNextAriaTemplate = this.galleryEl.dataset.nextAriaTemplate,
            this.dotNavItemAriaTemplate = this.galleryEl.dataset.dotnavItemAria || "Item {n}",
            this.sportsWatchNowText = this.galleryEl.dataset.watchNowSports,
            this.sportsPreviewNowText = this.galleryEl.dataset.previewNowSports,
            this.sportsWatchNowTemplate = this.galleryEl.dataset.watchNowSportsAria,
            this.sportsPreviewNowTemplate = this.galleryEl.dataset.previewNowSportsAria,
            this.paddleNavPrevious = this.collectionUnitElement.querySelector(".paddlenav-arrow-previous"),
            this.paddleNavNext = this.collectionUnitElement.querySelector(".paddlenav-arrow-next"),
            this.fnbSupported = this.galleryEl.dataset.fnbSupported && "true" == this.galleryEl.dataset.fnbSupported && document.querySelector("#fnb-supported");
            let r = 5 === (new Date).getDay();
            this.fnpPosition = r ? 0 : 4,
            this.fnbSupported && document.documentElement.classList.add("fnb-supported"),
            this.fnbGenre = this.galleryEl.dataset.fnbGenre,
            this.fnbTitle = this.galleryEl.dataset.fnbTitle,
            this.fnbCopy = this.galleryEl.dataset.fnbCopy,
            this.fnbUrl = this.galleryEl.dataset.fnbUrl,
            this.fnbCta = this.galleryEl.dataset.fnbCta,
            this.onResize = this.onResize.bind(this),
            this.anim.on("ON_RESIZE_DEBOUNCED", this.onResize),
            this.setViewport(),
            this.getCollection(),
            this.destroyed || (this.render(),
            this.initGallery())
        }
        const S = x.prototype = Object.create(y);
        S.getCollection = function() {
            var t, e, i;
            this.items = null === (t = window.tvPlusHpData) || void 0 === t || null === (e = t.data) || void 0 === e || null === (i = e.shelf) || void 0 === i ? void 0 : i.items;
            const s = n().apiFailure;
            if (!this.items || s)
                return this.destroy(),
                void (this.destroyed = !0);
            this.mergeData()
        }
        ,
        S.destroy = function() {
            this.collectionUnitElement.style.display = "none",
            document.documentElement.classList.remove("fnb-supported")
        }
        ,
        S.setViewport = function() {
            this.viewport = v[this.anim.model.pageMetrics.breakpoint],
            "large" == this.viewport && window.innerWidth >= 1441 && (this.viewport = "xlarge")
        }
        ,
        S.onResize = function(t) {
            const e = this.viewport;
            this.setViewport(),
            e != this.viewport && this.items.forEach(t=>{
                if ("fnb" == t.id)
                    return;
                let e = t.images[b[this.viewport]]
                  , i = this.getImageUrl(e, E[this.viewport].width);
                t.sportId && (e = t.images[w[this.viewport]],
                i = this.getImageUrl(e, E[this.viewport].width, "sh", E[this.viewport].height)),
                t.galleryLinkEl && (t.galleryLinkEl.style.backgroundImage = "url(".concat(i, ")"))
            }
            )
        }
        ,
        S.mergeData = function() {
            this.items.forEach(t=>{
                t.extendedMetadata && Object.entries(t.extendedMetadata).forEach(([e,i])=>{
                    t.hasOwnProperty(e) ? Object.assign(t[e], i) : t[e] = i
                }
                )
            }
            )
        }
        ,
        S.setTheme = function(t) {
            const e = t.joeColor.match(/^b:\S+/)[0]
              , [i,s,r] = e.match(/\d+/g).map(t=>parseInt(t, 10))
              , n = Math.sqrt(.299 * Math.pow(i, 2) + .587 * Math.pow(s, 2) + .114 * Math.pow(r, 2));
            this.theme = n > 234 ? "theme-dark" : "theme-light"
        }
        ,
        S.render = function() {
            this.fnbSupported && this.items.splice(Math.min(this.items.length - 1, this.fnpPosition), 0, {
                id: "fnb",
                title: "friday night baseball"
            }),
            this.items.forEach((t,e)=>{
                const i = e + 1;
                if ("fnb" == t.id)
                    return void this.insertFNBSlide(i);
                const s = t.genres ? t.genres[0].name : ""
                  , r = t.longNote ? ' <span class="m-dot" aria-hidden="true">&#183;</span> ' + t.longNote : "";
                let n = this.watchNowTemplate.replace("{title}", t.title)
                  , a = this.previewNowTemplate.replace("{title}", t.title)
                  , o = this.watchNowText
                  , l = this.previewNowText;
                const h = "tv-plus-gallery-" + t.title.toLowerCase();
                t.sportId && (n = this.sportsWatchNowTemplate.replace("{title}", t.title),
                a = this.sportsPreviewNowTemplate.replace("{title}", t.title),
                o = this.sportsWatchNowText,
                l = this.sportsPreviewNowText);
                const c = Date.now() > t.releaseDate ? n : a
                  , u = Date.now() > t.releaseDate ? o : l
                  , d = Date.now() > t.releaseDate || !t.sportId ? "play" : "plus";
                let m, p = t.images[b[this.viewport]], f = this.getImageUrl(p, E[this.viewport].width);
                t.sportId && (p = t.images[w[this.viewport]],
                f = this.getImageUrl(p, E[this.viewport].width, "sh", E[this.viewport].height)),
                t.images[A] && (m = this.getImageUrl(t.images[A], 2 * E.small.width, "", null, "png"),
                this.setTheme(t.images[A]));
                const g = '<div id="tv-plus-gallery-item-'.concat(i, '" data-analytics-gallery-item-id="Tv Plus Gallery item ').concat(i, '" data-ac-gallery-item="" class="gallery-item ').concat(this.theme, '">\n\t\t\t<a href="').concat(t.url, "?").concat(this.token, '"\n\t\t\t\tstyle="background-image: url(').concat(f, ')"\n\t\t\t\tdata-analytics-title="').concat(u.toLowerCase(), '"\n\t\t\t\tdata-rid-relay=\'{"289":"itsct"}\'\n\t\t\t\tdata-analytics-exit-link\n\t\t\t\tdata-analytics-activitymap-region-id="').concat(h, '">\n\n\t\t\t\t<div class="inner">\n\t\t\t\t\t<div class="info-top">\n\t\t\t\t\t\t<figure class="atv-plus-icon"></figure>\n\t\t\t\t\t\t<figure class="logo"\n\t\t\t\t\t\t\tstyle="background-image: url(').concat(m, ')"\n\t\t\t\t\t\t></figure>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="info-bottom">\n\t\t\t\t\t\t<div class="custom-button ').concat(d, '" aria-label="').concat(c, '">').concat(u, '</div>\n\t\t\t\t\t\t<p class="typography-shows-genre"><span class="genre">').concat(s, "</span>").concat(r, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>")
                  , _ = '<li role="presentation">\n\t\t\t<a href="#tv-plus-gallery-item-'.concat(i, '"\n\t\t\t\tid="tv-plus-gallery-item-').concat(i, '-trigger"\n\t\t\t\taria-label="').concat(this.dotNavItemAriaTemplate.replace("{n}", i).toLowerCase(), " - ").concat(t.title.toLowerCase(), '"\n\t\t\t\tdata-ac-gallery-trigger="tv-plus-gallery-item-').concat(i, '"\n\t\t\t\tclass="dotnav-item">\n\t\t\t\t\t<span class="visuallyhidden">Item ').concat(i, "</span>\n\t\t\t\t</a>\n\t\t</li>");
                t.galleryItemEl = T(g),
                t.dotNavItemEl = T(_),
                t.galleryLinkEl = t.galleryItemEl.querySelector("a"),
                this.galleryItemsContainerEl.appendChild(t.galleryItemEl),
                this.dotNavEl.appendChild(t.dotNavItemEl)
            }
            )
        }
        ,
        S.insertFNBSlide = function(t) {
            const e = '<div id="tv-plus-gallery-item-'.concat(t, '" data-analytics-gallery-item-id="Tv Plus Gallery item ').concat(t, '" data-ac-gallery-item="" class="fnb-item gallery-item theme-dark">\n\t\t<a href="').concat(this.fnbUrl, "?").concat(this.token, '"\n\t\t\tdata-analytics-title="').concat(this.fnbCta.toLowerCase(), '"\n\t\t\tdata-rid-relay=\'{"289":"itsct"}\'\n\t\t\tdata-analytics-exit-link\n\t\t\tdata-analytics-activitymap-region-id="tv-plus-gallery-').concat(this.fnbTitle.toLowerCase(), '"\n\t\t>\n\t\t\t<div class="inner">\n\t\t\t\t<div class="info-bottom">\n\t\t\t\t\t<div class="custom-button play" aria-label="').concat(this.watchNowTemplate.replace("{title}", this.fnbTitle), '">').concat(this.fnbCta, '</div>\n\t\t\t\t\t<p class="typography-shows-genre"><span class="genre">').concat(this.fnbGenre, '</span> <span class="m-dot" aria-hidden="true">&#183;</span> ').concat(this.fnbCopy, "</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</a>\n\t</div>")
              , i = '<li role="presentation">\n\t\t<a href="#tv-plus-gallery-item-'.concat(t, '"\n\t\t\tid="tv-plus-gallery-item-').concat(t, '-trigger"\n\t\t\taria-label="').concat(this.dotNavItemAriaTemplate.replace("{n}", t).toLowerCase(), " - ").concat(this.fnbTitle, '"\n\t\t\tdata-ac-gallery-trigger="tv-plus-gallery-item-').concat(t, '"\n\t\t\tclass="dotnav-item">\n\t\t\t\t<span class="visuallyhidden">Item ').concat(t, "</span>\n\t\t\t</a>\n\t</li>")
              , s = T(e)
              , r = T(i);
            this.galleryItemsContainerEl.appendChild(s),
            this.dotNavEl.appendChild(r)
        }
        ,
        S.getImageUrl = function(t, e, i="", s=null, n="jpg") {
            if (!t)
                return null;
            const a = r.retina ? 2 : 1
              , o = t.width / t.height
              , l = Math.floor(e / o);
            let h = e
              , c = s || l;
            return h = Math.ceil(h * a),
            c = Math.ceil(c * a),
            t.url.replace("{w}", h).replace("{h}", c).replace("{c}", i).replace("tc.", ".").replace("{f}", n)
        }
        ,
        S.initGallery = function() {
            const t = this.collectionUnitElement.querySelector(".play-pause")
              , e = this.pauseAria
              , i = this.playAria
              , s = this.paddleNavPrevious
              , r = this.paddleNavNext
              , n = this.paddleNavPreviousAriaTemplate
              , p = this.paddleNavNextAriaTemplate
              , f = this.items
              , y = {
                beforeCreate() {
                    this.model.autoAdvanceDelay = 4500,
                    this.model.playAria = i,
                    this.model.pauseAria = e,
                    this.model.playPauseElement = t,
                    this.model.previousElement = s,
                    this.model.nextElement = r,
                    this.model.previousTemplate = n,
                    this.model.nextTemplate = p,
                    this.model.items = f,
                    this.model.PrefersReducedMotion = document.documentElement.classList.contains("reduced-motion"),
                    this.model.IsRTL = "rtl" === document.documentElement.getAttribute("dir"),
                    this.model.IsTouch = "ontouchstart"in document.documentElement
                }
            }
              , v = a.withMixins(I, y, u, d, o, m, l, h, c, g, _)
              , E = document.querySelector("#tv-plus-gallery");
            this.gallery = new v({
                el: E
            });
            this.anim.createScrollGroup(this.collectionUnitElement).addEvent(this.galleryEl, {
                start: "t - 80vh",
                end: "b",
                event: "gallery-visible",
                onEnter: ()=>this.gallery.inView = !0,
                onExit: ()=>this.gallery.inView = !1
            })
        }
        ,
        e.exports = x
    }
    , {
        142: 142,
        145: 145,
        151: 151,
        152: 152,
        154: 154,
        155: 155,
        157: 157,
        158: 158,
        159: 159,
        167: 167,
        43: 43,
        68: 68,
        75: 75,
        undefined: void 0
    }],
    177: [function(t, e, i) {
        "use strict";
        t(40)(),
        t(178)()
    }
    , {
        178: 178,
        40: 40
    }],
    178: [function(t, e, i) {
        "use strict";
        e.exports = function() {}
    }
    , {}],
    179: [function(t, e, i) {
        "use strict";
        e.exports = {}
    }
    , {}],
    180: [function(t, e, i) {
        "use strict";
        var s = {};
        s["wwdc23-announce"] = t(174),
        s["tv-plus-prehistoric-planet"] = t(173),
        e.exports = s
    }
    , {
        173: 173,
        174: 174
    }],
    181: [function(t, e, i) {
        "use strict";
        var s = {};
        s["wwdc23-announce"] = t(175),
        e.exports = s
    }
    , {
        175: 175
    }],
    182: [function(t, e, i) {
        "use strict";
        e.exports = {}
    }
    , {}],
    183: [function(t, e, i) {
        "use strict";
        e.exports = {}
    }
    , {}]
}, {}, [177]);
