/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W) {
    var i, metas = [ '',
    '<meta id="head1" name="title"              content="">',
    '<meta id="head2" name="description"        content="">',
    '<meta id="head3" property="og:title"       content="">',
    '<meta id="head4" property="og:description" content="">',
    '<meta id="head5" property="og:url"         content="">',
    '<meta id="head6" property="og:image"       content="http://www.wellsfargomedia.com/sibos/images/header/wf.png">',
    '<meta id="head7" property="og:site_name"   content="www.wellsfargomedia.com">',
    '<meta id="head8" property="og:type"        content="microsite">'
    ];

    for (i = 1; i < metas.length; i++) {
        W.document.writeln(metas[i]);
    }

}(window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
