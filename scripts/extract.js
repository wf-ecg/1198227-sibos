/*jslint es5:true, white:false */
/*globals $, Global, Main, Mobile, Page, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Extract;

(function (W) {
    var name = 'Extract',
        self = new Global(name, '(page parser and storage)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        cache: '<article>',
        caches: {},
        home: 'h1 img.home',
        mobile: '#Mobile',
        navurl: '_nav.html',
        port: 'section.port',
        ports: {},
        stored: {
            'foo': 'bar',
        },
        inits: function () {
            this.cache = $(this.cache);
            this.mobile = $(this.mobile);
            $.extend(this.caches, this.stored);
            W.debug > 0 && C.debug(name, 'Df.inits\n', Df);
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _get(url, sel, cb) {
        cb = (cb || Main.cb);
        W.debug > 0 && C.debug(name + '_get', [url, sel]);

        Df.select = sel;
        return (Df.caches[url] = new Page(url, cb));
    }

    function _miniScrub(jq) {
        var hold = $('<div>');
        jq.scout('.mini').children().appendTo(hold);
        jq.empty();
        jq.append(hold.children());
    }

    function _postNav() {
        Df.port = Df.mobile.find(Df.port).first(); // TRANSFORM
        Df.home = $(Df.home).detach();
    }

    function _append(page) {
        // this will only parse the children of top elements [html/body/head]
        Df.parse = $(page.body).scout(Df.select).children();
        Df.ports[page.url].append(Df.parse);

        if (page.url === Df.navurl) {
            _postNav();
        }
    }

    function _homeBtn(jq) {
        Df.home.clone().click(Mobile.home).prependTo(jq);
    }

    function _loadNav(doing) { // get nav html
        var url = Df.navurl;

        Df.ports[url] = Df.mobile;
        if (Df.mobile.children().length) {
            return doing.resolve();
        }

        return _get(url, '#Mobile', _append).jqxhr.promise(doing);
    }

    function _loadPage(url, naving) { // get content html
        var jq = Df.ports[url];

        if (!jq) { // never loaded
            jq = Df.cache.clone().hide();
            Df.ports[url] = jq.appendTo(Df.port);

            _get(url, '#Feature', function (page) {
                _append(page);
                _miniScrub(Df.ports[url]);
                _homeBtn(jq);
            });
        }
        naving.resolve(jq);
    }

    function _bindings() {
        $.fn.scout = function (sel) { // find and/or filter
            return this.filter(sel).add(this.find(sel));
        };
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init(cb) {
        if (self.inited(true)) {
            return null;
        }

        Df.inits();
        _bindings(); // extend jquery
        _loadNav($.Deferred()).done(cb);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        page: _loadPage,
    });

    return self;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
