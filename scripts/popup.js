/*jslint es5:true, white:false */
/*globals _, C, W, Globs, Util, jQuery,
        Main, videojs, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Popup = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Popup',
        self = new G.constructor(name, '(popup background and display media)'),
        Df;

    Df = { // DEFAULTS
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _pic(i, e) {
        var lnk = $(e),
            pic = $('#' + lnk.data('title')),
            div = pic.parent();

        lnk.bind('click', function (evt) {
            evt.preventDefault();
            div.trigger('show.pic');
            return false;
        });

        if (div.data('pic')) {
            return; // already bound
        }

        div.appendTo('body') //
        .data('pic', true) //
        .bind('show.pic', function () {
            div.addClass('big');

        }).bind('hide.pic', function () {
            div.removeClass('big');

        }).bind('mouseup', function (evt) {
            var who = evt.target.className.match('popup');

            if (who && who.length) {
                div.trigger('hide.pic');
            }
        });
    }

    function _vid(i, e) {
        var lnk = $(e),
        vid = $('#' + lnk.data('title')),
        div = vid.parent(),
        vip;

        lnk.bind('mouseup', function () {
            div.trigger('show.vid');
            return false;
        }).attr('href', null);

        if (div.data('vid')) {
            return; // already bound
        }

        div.appendTo('body') //
        .data('vid', true) //
        .bind('show.vid', function () {
            div.addClass('big');
            if (!vip) {
                return; // vip.currentTime(7);
            }
            vip.play();

        }).bind('hide.vid', function () {
            vip.pause();
            div.removeClass('big');

        }).bind('mouseup', function (evt) {
            var who = evt.target.className.match('popup');
            if (who && who.length) {
                div.trigger('hide.vid');
            }
        });
        // kicker
        videojs(vid.prop('id')).ready(function () {
            vip = this;
            C.log('ready', vid, vip);
        });
    }

    function _binding() {
        try {
            if (!Main.mobile()) {
                $('a.popup.pic').each(_pic);
                $('a.popup.vid').each(_vid);
            }
        } catch (err) {
            return err;
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(jq) {
        if (self.inited(true)) {
            return null;
        }

        _binding();
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        popupPic: _pic,
        popupVid: _vid,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
