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
        share: '#Share',
        time: 333,
        wide: 999,
        inits: function () {
            Df.bezel = $(Df.bezel);
            Df.mobile = $(Df.mobile).show();
            if (!Df.bezel.length) {
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

    function _slide(jq, num1, num2, cb) {
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

    function _revealPage(jq, yes) {
        if (!Df.atnav) {
            Df.current.hide();
        }
        Df.current = jq;

        if (yes) {
            jq.show();
            _slide(Df.nav, 0, Df.wide * -1);
            _slide(jq, Df.wide, 0);
            Df.atnav = false;
        } else {
            _slide(Df.nav, Df.wide * -1, 0);
            _slide(jq, 0, Df.wide, function () {
                jq.hide();
            });
            Df.atnav = true;
        }
    }

    function _drill(jq) {
        if (U.debug()) {
            C.debug(name + '_drill', jq);
        }
        _revealPage(jq, true);
    }

    function _home() {
        if (U.debug()) {
            C.debug(name + '_home', Df.current);
        }
        _revealPage(Df.current, false);
    }

    function _share() {
        Df.share.fadeIn(function () {
            Df.share.css({
                display: 'table',
            });
            Df.mobile.one('click', function () {
                Df.share.hide();
            });
        });
    }

    function _shareif() {
        Df.share = $(Df.share).hide();
        Df.mobile.find('header').append(Df.share);
        $('img.share').click(_share);
    }

    function _embezelr() {
        if (!Main.mobile()) {
            Df.mobile.wrap(Df.bezel);
            $('#Page').show();
        } else {
            $('#Page').remove();
            Df.mobile.css({
                zIndex: 1
            });
        }
    }

    function _binder() {
        Df.nav.parent().css({
            width: Df.wide,
            height: Df.high,
        });
        _embezelr();
        _shareif();
    }

    function _isInternal(str) {
        var ts1, ts2, ts3;
        ts1 = str.match(W.location.host);
        ts2 = str.match('/pages/');
        ts3 = str.match('.html');
        return !!(ts1 && ts2 && ts3);
    }

    function _slider(evt) {
        var str = evt.currentTarget.href; // current because A wraps IMG

        if (_isInternal(str)) {
            evt.preventDefault();
        } else {
            return;
        }

        evt.preventDefault();
        str = Main.page(str);
        if (U.debug()) {
            C.debug(name + '_capture', str);
        }
        Extract.page(str, $.Deferred().done(_drill));
    }

    function _capture() {
        $('body').on('click', '#Mobile section.port a', _slider);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _binder();
        _capture();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        home: _home,
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
