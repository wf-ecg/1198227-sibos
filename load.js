/*jslint es5:true, white:false */
/*globals _, C, W, ROOT, Global, Util, jQuery,
    Glob:true, Main, Modernizr, Popup, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
'use strict';
var Data, Glob, Load, Tests, ShareStrings, switchTo5x = true, player;

Glob = new Global('Glob');

(function ($, G, M) {
    'use strict';
    var U;
    W.G = G;
    W.Load = {};
    W.Tests = $.Callbacks();

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
    });

    if ($.browser.msie) {
        $(function () {
            $('html').addClass('msie');
            $('body').on('mouseover', '.region, .widget, a, li', function () {
                $(this).addClass('hover');
            }).on('mouseout', '.region, .widget, a, li', function () {
                $(this).removeClass('hover');
            });
        });
    }
    if (W.isIE || ROOT.conf.nom === 'wfmedia') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++ > 1 && $('html').addClass('debug');
    }

    Load.base = {
        test: W.isIE,
        yep: [
            G.lib + 'ie/split.js',
            G.lib + 'ie/respond.min.js',
            ],
        both: [
            'https://www.youtube.com/player_api',
            /* */
            G.loc + 'js-mobi.js',
            G.loc + 'js-view.js',
            G.loc + '_util.js',
            G.loc + 'fetch.js',
            ],
        complete: function () {
            Data = new G.constructor('Data', '(catchall data fixture)');
            // Replace element with an <iframe> and player after the API code downloads.
            W.onYouTubePlayerAPIReady = function () {
                C.log('onYouTubePlayerAPIReady', W.YT);
                return W.YT;
            };
        },
    };

    Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla1',
        yep: [
            G.lib + 'fonts/archer.ssm.css',
            G.lib + 'fonts/archer.ssm.itl.css',
            ],
        nope: [
            /* '//cloud.typography.com/6819872/620964/css/fonts.css', Normal */
            '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
            ],
    };

    Load.main = {
        both: [
            G.src + 'metas.js',
            G.src + 'banner.js',
            G.src + 'extract.js',
            G.src + 'mobile.js',
            G.src + 'scroll.js',
            G.src + 'popup.js',
            G.src + '_main.js',
            ],
        complete: function () {
            U = Util;
            ROOT.loaded();
            Main.init();
        },
    };

    Load.test = {
        test: W.debug > 0,
        yep: [G.src + 'tests.js'],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
            G.loc + 'sharelib.js',
            G.src + 'sharecfg.js',
            ],
    };
    M.load([Load.base, Load.font, Load.main, Load.test]);

}(jQuery, Glob, Modernizr));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
