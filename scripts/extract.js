/*jslint es5:true, white:false */
/*globals _, C, W, Glob, Util, jQuery,
        Main, Mobile, Page, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Extract',
        self = new G.constructor(name, '(page parser and storage)'),
        Df;

    Df = { // DEFAULTS
        recent: null,
        holder: '<article>',

        home: 'h1 img.home',
        mobileDiv: '#Mobile',
        navurl: '_nav.html',
        point: 'section.port',
        container: '#Body',

        extracts: {},
        sources: {},
        inits: function () {
            this.mobileDiv = $(this.mobileDiv);
            // this.point  set later after mobile loads?

            if (U.debug()) {
                C.debug(name, 'Df.inits\n', Df);
            }
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // HELPERS (defaults dependancy only)

    function callback() {
        C.debug.apply(C, [name, 'callback'].concat(arguments));
    }

    function append(page, sel) {
        // this will only parse the children of top elements [html/body/head]
        Df.recent = $(page.body).scout(sel || Df.container).children();
        return Df.extracts[page.url].append(Df.recent);
    }

    function takeSource(url, cb) {
        if (U.debug()) {
            C.debug(name, 'takeSource', url);
        }
        return (Df.sources[url] = new Page(url, cb || callback));
    }

    function miniScrub(jq) {
        var hold = $('<div>');              // make new bucket
        jq.scout('.mini').children().appendTo(hold);
        jq.empty();                         // rinse out non-mini nodes
        jq.append(hold.children());         // bring back mini elements
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _loadNav(doing) { // get nav html
        var url = Df.navurl;

        Df.extracts[url] = Df.mobileDiv;

        if (Df.mobileDiv.children().length) {
            return doing.resolve();
        }
        return takeSource(url, function (page) {
            append(page, '#Mobile');
            Df.point = Df.mobileDiv.find(Df.point).first();
            Df.home = $(Df.home).detach();
        }).jqxhr.promise(doing);
    }

    function _extract(url, naving) { // get content html
        var jq = Df.extracts[url];

        if (!jq) { // never loaded
            jq = $(Df.holder).hide();
            Df.extracts[url] = jq.appendTo(Df.point);

            takeSource(url, function (page) {
                append(page);
                miniScrub(Df.extracts[url]);
                Df.home.clone() //
                .prependTo(jq).add('header') //
                .click(Mobile.home);
            });
        }
        naving.resolve(jq);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(cb) {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        // extend jquery
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };

        _loadNav($.Deferred()).done(cb); // bespoke vers of extract
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        page: _extract,
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
