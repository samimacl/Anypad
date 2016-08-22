'use strict';

describe('core Test htmlparser', function() {
    it('should be equal to HTML Default', function() {
        var editor = document.getElementById('richTextField');
        var htmlparser = new core.htmlparser(editor);

        htmlparser.writeDefault();
        var html = htmlparser.getHTML();
        expect(html).toBe(html.getHTMLDefault());
    });
});
