/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = window,
C = W.console,
D = W.document;
W.debug = Number(new Date('2014/07/29') > new Date());
W.ROOT = ({
    base: 0,
    // adjust built-in page depth? (e.g. '-1' == '..')
    conf: {
        'www.wellsfargomedia.com': {
            nom: 'wfmedia',
            sub: '/ig/sibos',
        },
        '10.89.101.100': {
            nom: 'qla2',
            sub: '/wf-ecg/1198227-sibos',
        },
        'localhost:8000': {
            nom: 'localhost',
            sub: '/wf-ecg/1198227-sibos',
        },
    },
    dir: null,
    doc: null,
    lib: null,
    rev: null,
    _host: function (R) { // determine config for this server
        R.conf = R.conf[R.L.host]; // overwrite host hash
        R.conf.top = '//' + R.L.host;
        delete R._host;
    },
    _tops: function (R) { // lookup main directories
        R.doc = R.L.pathname.toString().replace(R.conf.sub, '');
        // capture versioning number directory segment
        R.rev = R.doc.match(/^(\/\d\w*)(.*)$/) || '';
        if (R.rev) {
            R.doc = R.rev[2]; // isolate file name
            R.rev = R.rev[1]; // isolate version integer
        }
        R.lib = R.conf.lib || '/lib';
        R.dir = R.conf.sub + R.rev;
        delete R._tops;
    },
    _down: function (R) { // levels relative to host.sub
        R.deep = R.doc.slice(1).split('/'); //  segment
        R.deep.pop(); //                        trim docname
        R.comp = R.deep.slice(0, R.base); //    hoist to top of subproject
        if (R.base && (R.deep.length + R.base) !== 0) {
            R.comp.length && R.comp.push(''); //slash
            R.base = R.L.protocol + R.conf.top + R.dir + '/' + R.comp.join('/');
        } else {
            delete R.base;
        }
        delete R._down;
    },
    _wrap: function (R) { // write out bootstrap element
        R.base && R.D.write('<base href="' + R.base + '">');
        R.D.write('<script src="' + R.lib + '/jquery/1.8.2/jquery.js"></script>');
        R.D.write('<script src="' + R.lib + '/modernizr/2.6.2/modernizr.js"></script>');
        R.D.write('<script src="' + R.lib + '/underscore/js-1.4.4/lodash.underscore.js"></script>');
        R.D.write('<script src="' + R.lib + '/js/console.js"></script>');
        R.D.write('<script src="' + R.lib + '/js/global.js"></script>');
        delete R._wrap;
    },
    loaded: function () {
        $('body').removeClass('loading');
        if (C && C.groupCollapsed) {
            C.groupEnd();
        }
    },
    init: function () {
        var R = this;
        R.D = W.document;
        R.L = W.location;
        if (C && C.groupCollapsed) {
            C.groupCollapsed('ROOT', R);
        }
        R._host(this);
        R._tops(this);
        R._down(this);
        R._wrap(this);
        delete R.init;
        return R;
    },
}.init());

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
