var core = core || {};

( function () {
    core.anypad = core.anypad || function ( editor ) {
    var self = this;
    var version = "0.0.1";
    var richTextField = editor;
    var htmlparser = new core.htmlparser();
    var userstorage = new util.userstorage();
    var storage = new util.storage();
    var print = new util.print();

    this.getVersion = function () {
      return version;
    };

    this.getHtmlparser = function () {
      return htmlparser;
    };

    this.getUserStorage = function () {
      return userstorage;
    };

    this.initialize = function () {
      htmlparser.initialize( richTextField );
    };

    this.iFontSize = function ( command, id, size ) {
      htmlparser.buildCommand( command, false, size );
    };

    this.iForeColor = function (command, id, color){
    	htmlparser.buildCommand(command, false, color);
    };

    this.iLink = function (command, id, link){
    	htmlparser.buildCommand(command, false, link);
    };

    this.iImage = function (command, id, imageSrc){
      htmlparser.buildCommand(command, false, imageSrc);
    };

    this.simpleCommand = function (command, id) {
      htmlparser.buildCommand(command, false, null);
    };

    this.writeHTML = function ( html, lineBreak ) {
      htmlparser.writeHTML( html, lineBreak );
    };

    this.writeDefault = function () {
      htmlparser.writeHTMLDefault();
    };

    this.detectSelection = function( tagname ) {
      var selection = richTextField.contentWindow.document.getSelection();
      node = selection.anchorNode;

      while (node && node.nodeName !== tagname) {
        node = node.parentNode;
      }

      if (node) {
        return true;
      }

      return false;
    };

    this.openPrintDialog = function () {
      var innerHTML = htmlparser.getHTML();
      print.doPrint( innerHTML );
    };

    this.saveFile = function () {
      var html = htmlparser.getHTML();
      storage.exportJSON( html );
    };

    this.openFile = function () {
      storage.importJSON();
    };

    self.initialize();
    $('#5').dropdown();
    $('#4').dropdown();
  };
} )();
