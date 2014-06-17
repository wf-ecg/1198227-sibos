/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// DATA-TYPE
(function (W) {
    var C = W.console,
        name = 'Page',
        signature = '(url:string, cb:function)',
        CLASS;

    // CONSTRUCTOR
    CLASS = W[name] = function Page(url, cb) {
        if (!url) {
            throw new Error(name + signature);
        } else if (this === window) {
            return new CLASS(url, cb); // invoke as a contructor
        }
        CLASS.INIT(this, url, cb);
    };

    CLASS.LIST = {};

    CLASS.INIT = function (self, url, cb) {
        CLASS.LIST[url] = self;

        self.url = url;
        self._get(cb);
    };

    CLASS.prototype = {
        data: 'get raw data',
        body: 'isolate body',
        head: 'isolate head',
        _pick: function (tag, data) {
            var str = (data || this.html || this.data),
                exp = ['<', tag, '>.+<\\/', tag, '>'],
                reg = RegExp(exp.join(''));

            str = str.split(/\s+/).join(' ');
            str = str.replace(/> </g, '><');
            str = str.match(reg).toString();

            return str;
        },
        _prep: function () {
            this.html = this._pick('html', this.data);
            this.body = this._pick('body');
            this.head = this._pick('head');
        },
        _get: function (cb) {
            var self = this;

            self.jqxhr = $.get(this.url, function (data) {
                W.debug > 1 && C.debug(name + '._get', ['success', this.url]);

                self.data = data;
            }).fail(function () {
                C.error(arguments);

                throw new Error(name);
            }).always(function () {
                self._prep();

                if (cb && cb.prototype) {
                    cb(self);
                }
            });
        },
        fetch: function (cb) {
            // check freshness and return data
            return this._get(cb);
        },
    };

}(window));
