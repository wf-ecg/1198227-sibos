/*jslint es5:true, white:false, evil:true  */
/*globals Global, View, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// 1170361-getcollege

var Util = (function (W, $) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(1170361-getcollege utils)'),
        C, D, DE, U;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    C = W.console;
    D = W.document;
    DE = D.documentElement;

    U = {
        args: function () {
            return arguments;
        },
        debug: function (n) {
            return W.debug >= (n || 0);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], arguments);
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    if (U.undef(W.debug)) {
        W.debug = 1;
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _dom() {
        var obj = _dom.Obj;
        //
        if (!obj) {
            obj = D.body; // default
            if (!$.browser.webkit) {
                obj = DE;
            }
            _dom.Obj = obj = $(obj);
        }
        return obj;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// JQUERY
    $.fn.exempt = function (bool) {
        var ret = $();
        if (!bool) {
            ret = $(this);
        }
        ret.prevObject = this;
        return ret;
    };
    // EASY ELEMENT IDENTITY
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jQuery:[' + (out.join(', ') || '(empty)') + ']');
    };
    $.nameSpace = function (str, nom) {
        var arr;

        if (!nom) {
            throw new Error('no namespace given');
        }
        arr = str.split(' ');

        // add dot and name to each event type
        str = _.map(arr, function (e) {
            return e + '.' + nom;
        }).join(' ');

        if (!str) {
            C.warn('namespace error');
        }
        return str;
    };
    // $erpent eats tail
    $.reify = function (host) {
        $.each(host, function (i, e) {
            host[i] = $(e);
        });
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.extend(self, {
        dom: _dom,
        flatten: U.flatcat,
        isDef: U.defined,
        I: U.reflect,
        mobile: W.View && View.mobile,
        viewport: W.View && View.port,
        testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
    }, U);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
