/*jslint es5:true, white:false */
/*globals _, C, W, Globs, Util, jQuery,
        Extract, Main, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Mobile = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Mobile',
        self = new G.constructor(name, '(mobile nav and page swapper)'),
        Df;

    Df = { // DEFAULTS
        atnav: true,
        bezel: '<div class="bezel"></div>',
        busy: false,
        current: '',
        high: 999,
        left: 111,
        mobile: '#Mobile',
        nav: null,
        page: '#Page',
        share: '#Share',
        time: 333,
        wide: 999,
        inits: function () {
            Df.bezel = $(Df.bezel);
            Df.page = $(Df.page);
            Df.mobile = $(Df.mobile).show();
            if (Main.mobile()) {
                Df.mobile.css({
                    height: jsView.port.layoutHeight(),
                    width: jsView.port.layoutWidth(),
                });
            }
            Df.nav = Df.mobile.find('article').first().addClass('nav');
            // get width (and offset)
            Df.wide = Df.nav.parent().innerWidth() || 300;
            Df.high = Df.nav.parent().parent().outerHeight() - 104;
            Df.left = (parseInt(Df.nav.parent().css('left'), 10) || 0);

            if (U.debug()) {
                C.debug(name, 'Df.inits\n', Df);
            }
        }
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function isInternal(str) {
        var ts1, ts2, ts3;
        ts1 = str.match(W.location.host);
        ts2 = str.match('/pages/');
        ts3 = str.match('.html');
        return !!(ts1 && ts2 && ts3);
    }

    function share() {
        Df.share.fadeIn(function () {
            Df.share.css({
                display: 'table',
            });
            Df.mobile.one('click', function () {
                Df.share.hide();
            });
        });
    }

    function slide(jq, num1, num2, cb) {
        jq.css({
            display: 'block',
            left: num1 + Df.left,
            width: Df.wide,
            height: Df.high,
            position: 'absolute',
        }).animate({
            left: num2 + Df.left,
        }, Df.time, cb);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // INTERNALS

    function _revealPage(jq, yes) {
        if (!Df.atnav) {
            Df.current.hide();
        }
        Df.current = jq;

        if (U.debug()) {
            C.debug(name, '_revealPage >', (yes ? jq.toString() : 'home'));
        }

        if (yes) {
            jq.show();
            slide(Df.nav, 0, Df.wide * -1);
            slide(jq, Df.wide, 0);
            Df.atnav = false;
        } else {
            slide(Df.nav, Df.wide * -1, 0);
            slide(jq, 0, Df.wide, function () {
                jq.hide();
            });
            Df.atnav = true;
        }
    }

    function _embezelr() {
        if (!Main.mobile()) {
            Df.mobile.wrap(Df.bezel);
            Df.page.show();
        } else {
            Df.page.remove();
            Df.mobile.css({
                zIndex: 1
            });
        }
    }

    function _slider(evt) {
        var str = evt.currentTarget.href; // current because A wraps IMG

        if (isInternal(str)) {
            evt.preventDefault();
        } else {
            return;
        }

        evt.preventDefault();
        str = Main.page(str);
        if (U.debug()) {
            C.debug(name, '_slider', str);
        }
        Extract.page(str, $.Deferred().done(self.drill));
    }

    function _binding() {
        Df.nav.parent().css({
            width: Df.wide,
            height: Df.high,
        });
        // SHARE
        Df.share = $(Df.share).hide();
        Df.mobile.find('header').append(Df.share);
        $('img.share').click(share);
        // HOME
        $('body').on('click', '#Mobile section.port a', _slider);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _embezelr();
        _binding();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        drill: function (jq) {
            _revealPage(jq, true);
        },
        home: function _home() {
            _revealPage(Df.current, false);
        },
        slider: _slider,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

find nav
    suppress default
    detect target page
    check db
        is older than
            ajax fetch
        else
            use it
    slide out nav
    slide in body
        article group?
        take composition cues from ajax page
        a div in there suggest what to knit

 */
