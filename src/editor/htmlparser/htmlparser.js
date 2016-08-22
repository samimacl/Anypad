var core = core || {};

/**
 * Dieses Modul ist dafür zuständig das aktuelle HTML-Konstrukt des Editors zu schreiben, HTML-Tags zu erstellen,
 * HTML-Schema zu schreiben und erstellte Commands zur Formatierung des HTMLs entgegenzunehmen und auszuführen.
 * @class
 * @constructor
 */
core.htmlparser = core.htmlparser || function() {
    var self = this;
    var output;
    var richTextField;
    var regex = new util.regex();

    /**
     * Setzt output zurück.
     */
    var reset = function() {
        output = "";
    };

    /**
     * Initialisiert den zuvor erstellten htmlparser.
     * @param {iframe} editor - Richtextfield, welches zum Editieren des Inhalts verwendet wird
     */
    this.initialize = function(editor) {
        reset();
        richTextField = editor;
    };

    /**
     * Schreib übergeben Text in den output.
     * @param {string} text - HTML, was geschrieben werden soll
     */
    this.write = function(text) {
        output = text;
    };

    /**
     * Schreibt HTML in den output und ist für das explizite Erstellen eines Zeilenumbruchs verantwortlich.
     * @param {string} html - HTMl, was geschrieben werden soll
     * @param {bool} lineBreak - Gibt an, ob Zeilenumbruch durchgeführt werden soll
     */
    this.writeHTML = function(html, lineBreak) {
        if (lineBreak) {
            createLineBreak();
        } else {
            self.write(html);
        }
    };

    /**
     * Gibt private Variable output zurück.
     * @return {string} output - Output (HTMl)
     */
    this.getHTML = function() {
        return output;
    };

    /**
     * Schreibt default HTML-Schema und aktualisiert HTML des Editors.
     */
    this.writeHTMLDefault = function() {
        self.writeHTML(self.getHTMLDefault(), false);
        richTextField.contentWindow.document.body.innerHTML = output;
    };

    /**
     * Gibt default HTML-Schema zurück.
     * @return {string} HTMLSchema - Default HTML-Schema
     */
    this.getHTMLDefault = function() {
        return '<div><br></div>';
    };

    /**
     * Erstellt Command und führt es auf den Editor aus. Schreibt danach die Veränderung in den output.
     */
    this.buildCommand = function(command, showDefaultUI, valueArgument) {
        richTextField.contentWindow.document.execCommand(command, showDefaultUI, valueArgument);
        self.write(richTextField.contentWindow.document.body.innerHTML);
    };

    /**
     * Aktualisiert das innerHTML des Editors.
     */
    this.update = function() {
        richTextField.contentWindow.document.body.innerHTML = output;
    };

    /**
     * Erstellt einen Zeilenumbruch.
     */
    var createLineBreak = function() {
        var tag = attribute(openTag("br"), "class", "br_enter") + openTagClose(false) + "\u200C";
        console.log(tag);
        self.buildCommand('insertHTML', false, tag);
    };

    /**
     * Erstellt offenen HTML-Tag.
     * @param {string} tagname - Name des HTML-Tags.
     * @return {string} openHTMLTag - Offener HTML-Tag mit Tag-Name
     */
    var openTag = function(tagname) {
        return '<' + tagname;
    };

    /**
     * Schließt einen offenen HTML-Tag.
     * @param {bool} isSelfClosing - Wenn ja, schließt sich Tag selbst
     * @return {string} closeHTMLTag - Geschlossener HTML-Tag
     */
    var openTagClose = function(isSelfClosing) {
        if (isSelfClosing) {
            return ' />';
        } else {
            return '>';
        }
    };

    /**
     * Erstellt Attribut mit Namen und Wert.
     * @param {string} tag - Tagname
     * @param {string} attribute - Name des Attributs
     * @param {string} value - Inhalt des Attributs
     * @return {string} elem - Zusammengesetztes Attribut
     */
    var attribute = function(tag, attribute, value) {
        var elem = ' ' + attribute + '="' + value + '"';
        return tag.concat(elem);
    };

    /**
     * Schließt HTML-Tag mit Tag-Name.
     * @param {string} tagname - Name des HTML-Tags.
     * @return {string} closeHTMLTag - Geschlossener HTML-Tag mit Tag-Name
     */
    var closeTag = function(tagname) {
        return '</' + tagname + '>';
    };
};
