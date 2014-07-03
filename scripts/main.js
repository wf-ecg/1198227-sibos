/*jslint es5:true, white:false */
/*globals $, Banner, Extract, Global, Mobile, Popup, Scroll, ShareStrings:true, _mobile */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Main(W) {
    var name = 'Main',
        self = new Global(name, '(kicker and binder)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        inits: function (cb) {},
        bnrLinks: {
            bnr01: '#',
            bnr02: '#',
            bnr03: '#',
            bnr04: '#',
            bnr05: '#',
            bnr06: '#',
            bnr07: '#',
            bnr08: '#',
            bnr09: '#',
            bnr10: '#',
            bnr11: '#',
            bnr12: '#',
            bnr13: '#',
            bnr14: '#',
            bnr15: '#',
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function Init() {
        var raw, pageHash;

        raw = W.location.pathname.split('/').pop().match(/\w+/g);
        pageHash = {
            about:      ["About Wells Fargo",   'Learn about the #WellsFargo Global Financial Institutions business'],
            booth:      ["Visit Our Booth",     'See pics of the #WellsFargo booth & learn about events being hosted'],
            events:     ["Sibos Events",        'Learn more about the #WellsFargo events at #Sibos'],
            explore:    ["Explore Boston",      'See what Boston has to offer at #Sibos 2014'],
            giving:     ["Charitable Giving",   'Learn more about the #WellsFargo charity programs at #Sibos'],
            home:       ["Home",                'Check out the #WellsFargo Global Financial Institutions Sibos microsite'],
            speakers:   ["Sibos Speakers",      'Learn about the #WellsFargo Global Financial Institutions publications'],
            test:       ["x", 'x'],
        };
        try {
            ShareStrings = {
                url: 'http://wellsfargomedia.com/sibos/pages/' + raw.join('.'),
                tab: 'Wells Fargo at Sibos 2014 – ' + pageHash[raw[0]][0],
                sum: pageHash[raw[0]][1],
                img: 'http://wellsfargomedia.com/sibos/images/header/wf.png',
            };

            $('#head0').text(ShareStrings.tab);
            $('#head1, #head3').attr('content', ShareStrings.tab);
            $('#head2, #head4').attr('content', ShareStrings.sum);
            $('#head5').attr('content', ShareStrings.url);
            //    $('#head6').attr('content', ShareStrings.img);
        } catch (e) {
            return e;
        }
    }

    function _whatPage(x) {
        x = x || W.location.pathname;
        return x.split('/').slice(-1).toString();
    }

    function _noExt(x) {
        x = x.split('.');
        return x.slice(0, 1).toString();
    }

    function _dev() {
        if (W.location.hostname === 'localhost' && W.debug > 0) {
            $('html').addClass('dev');
        }
    }

    function _device() {
        if (!_mobile()) {
            $('html').addClass('desktop');
        } else {
            $('html').addClass('mobile');
        }
    }

    function _activeNav() {
        var page = (' ' + W.location.pathname).split('/').pop();
        $('a[href="./' + page + '"]').first().addClass('active');
    }

    function _binder() {
//        _dev();
        _device();
        _activeNav();
    }

    function _subinits() {
        Banner.init(Df.bnrLinks);
        Mobile.init();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);

        Init();
        Scroll.init();

        if (_whatPage() === 'mini.html'){
            Extract.init(_subinits);
        } else if (_whatPage() === 'home.html'  ) {
            Banner.init(Df.bnrLinks);
        } else {
            Banner.init();
        }

        _binder();
        Popup.init();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        page: _whatPage,
        mobile: _mobile,
        noext: _noExt,
        cb: function () {
            C.debug.apply(C, [name, 'callback'].concat(arguments));
        },
    });
    return self;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
