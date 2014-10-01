/*jslint white:false */
/*globals _, C, W, ROOT, Global, Util, jQuery,
    Glob:true, Main, Modernizr, Popup, Typekit */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob, Load, Tests, ShareStrings, switchTo5x = true;

Glob = new Global('Glob');

(function ($, M, G) {
    'use strict';
    var U;
    W.G = G;
    W.Tests = $.Callbacks();
    G.Load = {};

    _.defaults(G, { /// all stubs terminated
        top: ROOT.dir + '/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
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
        W.debug--;
    }
    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    G.Load.base = {
        test: W.isIE,
        yep: [
            G.lib + 'ie/split.js',
            G.lib + 'ie/respond.min.js',
        ],
        nope: [
            G.lib + 'iscroll/5.1.1/iscroll.js',
        ],
        both: [
            G.lib + 'video-js/4.2.1/video-js.css',
            G.lib + 'video-js/4.2.1/video.dev.js',
            /* */
            // G.loc + 'js-mobi.js',
            // G.loc + 'js-view.js',
            // G.loc + '_util.js',
            // G.loc + 'fetch.js',
            'build/lib.js',
        ],
        complete: function () {
            U = Util;
            Data = new G.constructor('Data', '(catchall data fixture)');
        },
    };

    G.Load.font = {
        test: (ROOT.conf.nom === 'localhost' || ROOT.conf.nom === 'qla2'),
        yep: [
            G.lib + (!W.isIE ? 'fonts/archer.ssm.css'     : 'fonts/eot/archer.ssm.css'),
            G.lib + (!W.isIE ? 'fonts/myriad.con.css'     : 'fonts/eot/myriad.con.css'),
            G.lib + (!W.isIE ? 'fonts/myriad.css'         : 'fonts/eot/myriad.css'),
        ],
        nope: [/*
            '//cloud.typography.com/6819872/620964/css/fonts.css', // Normal */
            '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
            '//use.typekit.net/cqz6fet.js',
        ],
        complete: function () {
            try {
                if (!G.Load.font.test) {
                    Typekit.load();
                }
            } catch (e) {
                C.error('typekit');
            }
        },
    };

    G.Load.main = {
        both: [
            // G.src + 'banner.js',
            // G.src + 'extract.js',
            // G.src + 'metas.js',
            // G.src + 'mobile.js',
            // G.src + 'popup.js',
            // G.src + 'scroll.js',
            // G.src + '_main.js',
            'build/src.js',
            ],
        complete: function () {
            _.delay(function () {
                ROOT.loaded($);
            }, 33);
            eval(W.Main && W.Main.init());
        },
    };

    G.Load.test = {
        test: W.debug >= 0,
        //yep: ['_tests.js'],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ga-ecg.js',
            G.loc + 'sharelib.js',
            G.src + 'sharecfg.js',
        ],
    };
    M.load([G.Load.base, G.Load.font, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
