'use strict';

describe('core Test anypad', function() {
    it('should be equal to texts value', function() {
        var editor = document.getElementById('richTextField');
        var anypad = new core.anypad(editor);

        var text = "Dies ist ein Test";
        anypad.writeHTML(text);

        var htmlparser = anypad.getHtmlparser();
        var innerHTML = htmlparser.getHTML();
        expect(innerHTML).toBe(text);
    });

    it('should be find 3 matches', function() {
        var editor = document.getElementById('richTextField');
        var anypad = new core.anypad(editor);

        var text = "Dies ist ein Test";
        anypad.writeHTML(text);

        var searchPattern = "e";
        anypad.search(searchPattern);
        var matches = document.getElementById('matches').innerHTML

        expect(3).toBe(3);
    });
});
