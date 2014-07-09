/*jslint es5:true, white:false */
/*globals _, C, W, Globs, Util, jQuery,
        */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Banner = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Banner',
        self = new G.constructor(name, '(fade and loop)'),
        Df;

    Df = { // DEFAULTS
        inits: function (cb) {
            this.all = $('.fade');
            this.total = this.all.length;
            this.now = 2;
            this.time = 666;
            this.all.css({
                position: 'absolute',
            });
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _reinImage() {
        var img, cls, div;

        img = $('img.reins');
        cls = img.attr('class');
        div = img.wrap('<div>').parent();
        div.addClass(cls);

        img.removeClass(cls).remove();
        div.css({
            backgroundImage: 'url(' + img.attr('src') + ')',
        });
        W.setTimeout(function () {
            div.css('backgroundSize', '100% 100%');
        }, 1);
        return;
    }

    function descend() {
        Df.now--;

        if (Df.now <= 0) {
            Df.now = Df.total - 1;
            Df.all.fadeIn(0);
        }
        if (U.debug(2)) {
            C.debug(Df.now);
        }
    }

    function _runfade() {
        descend();

        Df.all.eq(Df.now) //
        .fadeOut(Df.time, function () {
            W.setTimeout(function () {
                _runfade(); // recurses
            }, Df.time * 3);
        });
    }

    function _blotto() {
        var me = $('.reins.small'),
            mq = $('<div>').addClass('blot small');
        me.after(mq);

        var me1 = $('.reins.large'),
            mq1 = $('<div>').addClass('blot large');
        me1.after(mq1);

    }

    function _binder(obj) {
        $.each(obj, function (i, e) {
            var anc = $('<a>').attr('href', e);
            $('.' + i).wrap(anc);
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(obj) {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _blotto();
        _runfade();

        if (obj) {
            _binder(obj);
        }

        $('#Banner').fadeOut(1).fadeIn(999);
//        $('.reins').on('click', function () {
//            W.isIE || _reinImage();
//        });
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        wrap: _reinImage,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
