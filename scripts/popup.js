/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, YT, videojs, jsView, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Popup = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Popup',
        self = new G.constructor(name, '(popup background and display media)'),
        Df, player;

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

    function linkVid(evt) {
        var me, stub;

        me = $(evt.currentTarget);
        stub = me.data('src');

        me.attr({
            href: '//www.youtube.com/embed/' + stub + '?rel=0&html5=1',
            target: '_blank',
        });
        return true;
    }

    function embedVid(evt) {
        var me, stub, vid, ifr, mod, tmp;
        evt.preventDefault();

        me = $(evt.currentTarget);
        stub = me.data('src');
        vid = $('div.modal.popup').addClass('big');

        if (player.getVideoData().video_id !== stub) {
            player.loadVideoById(stub);
        }
        vid.one('click', function () {
            vid.removeClass('big');
            player.pauseVideo();
        });
        player.playVideo();
    }

    function _binding() {
        player = new YT.Player('Yt', {
            height: '480',
            width: '853',
            videoId: 'M7lc1UVf-VE'
        });
        try {
            if (!Main.mobile) {
                $('a.popup.pic').each(_pic);
                $('a.popup.vid').on('click touchend', function (evt) {
                    return jsView.mobile.agent() ? linkVid(evt) : embedVid(evt); // linkVid is used since mobile.agent returns for ipads
                });
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
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
