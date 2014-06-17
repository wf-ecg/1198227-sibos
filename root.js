/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = window,
C = W.console,
D = W.document;
W.debug = Number(new Date('2014/05/29') > new Date());
W.ROOT = ({
    base: 0,
    // adjust built-in page depth? (e.g. '-1' == '..')
    host: {
        'www.wellsfargomedia.com': {
            sub: '/ig/sibos',
        },
        '10.89.101.100': {
            sub: '/wf-ecg/1198227-sibos',
        },
        'localhost:8000': {
            sub: '/wf-ecg/1198227-sibos',
        },
    },
    conf: null,
    dir: null,
    doc: null,
    lib: null,
    rev: null,
    _host: function (R) { // determine config for this server
        R.conf = R.host[R.L.host];
        R.host = R.L.host; // overwrite host hash
        R.conf.top = '//' + R.host;
        if (W.debug && C && C.groupCollapsed) {
            C.groupCollapsed('ROOT', R);
        }
    },
    _tops: function (R) { // lookup main directories
        R.doc = R.L.pathname.toString().replace(R.conf.sub, '');
        // capture versioning number directory segment
        R.rev = R.doc.match(/^(\/\d\w*)(.*)$/) || '';
        if (R.rev) {
            R.doc = R.rev[2];
            R.rev = R.rev[1];
        }
        R.lib = R.conf.lib || '/lib';
        R.dir = R.conf.sub + R.rev;
    },
    _down: function (R) { // levels relative to host.sub
        R.deep = R.doc.slice(1).split('/');
        R.deep.pop();
        R.comp = R.deep.slice(0, R.base);
        if (R.base && R.deep.length + R.base !== 0) {
            R.comp.length && R.comp.push('');
            R.base = R.L.protocol + R.conf.top + R.dir + '/' + R.comp.join('/');
        } else {
            delete R.base;
        }
    },
    _wrap: function (R) { // write out bootstrap element
        R.base && R.D.write('<base href="' + R.base + '">');
        R.D.write('<script src="' + R.lib + '/jquery/1.8.2/jquery.js"></script>');
        R.D.write('<script src="' + R.lib + '/modernizr/2.6.2/modernizr.js"></script>');
        R.D.write('<script src="' + R.lib + '/underscore/js-1.4.4/lodash.underscore.js"></script>');
        R.D.write('<script src="' + R.lib + '/js/console.js"></script>');
        R.D.write('<script src="' + R.lib + '/js/global.js"></script>');
    },
    init: function () {
        var R = this;
        R.D = W.document;
        R.L = W.location;
        R._host(this);
        R._tops(this);
        R._down(this);
        R._wrap(this);
        delete R._host;
        delete R._tops;
        delete R._down;
        delete R._wrap;
        delete R.init;
        return R;
    },
}.init());

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
