/*jslint es5:true, white:false */
/*globals $, Global, Main, Modernizr, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Data, CDN, W = (W || window);
// sharing widget reqs
var ShareStrings, switchTo5x = true;

W.debug = 1;

if ($.now() > 137880e7 || W.isIE || W.location.hostname == 'www.wellsfargomedia.com') {
    W.debug--;
}
if (W.location.hostname === 'localhost') {
    W.debug++;
}
CDN = {
    self: '/lib/',
    disk: 'file:///lib/',
    bithon: '../../../../lib/',
    webdev: 'http://10.89.101.100/lib/',
    mython: 'http://10.89.101.81:8000/lib/',
    python: 'http://localhost:8000/lib/',
    other0: 'http://cdnjs.cloudflare.com/ajax/libs/',
}.bithon;

Modernizr.load([{
    test: W.isIE,
    yep: [
        CDN + 'ie/split.js',
        CDN + 'ie/respond.min.js',
//        CDN + 'ie/nwmatcher.min.js',
//        CDN + 'ie/selectivizr-min.js',
    ],
    both: [
        CDN + 'underscore/js-1.4.4/underscore.js',
        CDN + 'js/console.js',
        CDN + 'js/global.js',
        CDN + 'video-js/4.2.1/video-js.css',
        CDN + 'video-js/4.2.1/video.dev.js',
        '../lib/detect.js',
    ],
    complete: function () {
        Data = new Global('Data', '(catchall data fixture)');
    },
}, {
    both: [
        '../lib/Page.js',
        '../scripts/banner.js',
        '../scripts/extract.js',
        '../scripts/mobile.js',
        '../scripts/scroll.js',
        '../scripts/popup.js',
        '../scripts/main.js',
    ],
    complete: function () {
        Main(W).init();
    },
}, {
    test: W.debug < 1,
    yep: [
        CDN + 'js/ecg-ga.js',
        '../lib/buttons.js',
        '../scripts/share.js',
    ],
}]);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
