/*jslint es5:true, white:false */
/*globals window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var jsMobi = (function (W, $) { // IIFE
    var C = W.console,
        N = W.navigator,
        name = 'jsMobi',
        self = {};

    function _debug(n) {
        return W.debug >= (n || 0);
    }

    self = {
        android: function() {
            return N.userAgent.match(/Android/i);
        },
        blackberry: function() {
            return N.userAgent.match(/BlackBerry|\(BB|PlayBook/i);
        },
        ios: function() {
            return N.userAgent.match(/iPhone|iPad|iPod/i);
        },
        opera: function() {
            return N.userAgent.match(/Opera Mini/i);
        },
        windows: function() {
            return N.userAgent.match(/IEMobile/i);
        },
        generic: function() {
            return N.userAgent.match(/Mobile|BrowserNG/i);
        },
        any: function() {
            return (this.android() || this.blackberry() || this.ios() || this.opera() || this.windows() || this.generic() || false);
        },
        not: function() {
            return !this.any();
        },
        scan: function () {
            var nom;
            nom = nom || this.android() && 'android';
            nom = nom || this.blackberry() && 'blackberry';
            nom = nom || this.ios() && 'ios';
            nom = nom || this.opera() && 'opera';
            nom = nom || this.windows() && 'windows';
            nom = nom || this.generic() && 'generic';
            return nom;
        },
        show: function () {
            W.alert(this.scan() || 'immobile');
        },
    };

    if (_debug()) {
        C.log([name], self.scan());
    }

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

Change the onclick handler to a ontouch handler for mobile devices to get rid of the 300ms delay.
var hasTouch = 'ontouchstart' in document.documentElement;
var ismobi = navigator.userAgent.match(/Mobi/i);

 */
