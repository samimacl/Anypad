var core = core || {};

( function () {
  /**
  * Das Modul anypad stellt den Kern des Programms dar. Es verwaltet die Referenzen auf andere Module wie storage, print, htmlparser und regex.
  * Interaktionen des Users werden, aufgefangen von dem Modul eventHandler, an das Modul anypad weitergegeben, welches die passenden Funktionen
  * der jeweiligen gespeicherten Referenzen aufruft.
  * @class
  * @constructor
  * @param {iframe} editor - Richtextfield, welches zum Editieren des Inhalts verwendet wird
  */
    core.anypad = core.anypad || function ( editor ) {
    var self = this;
    var richTextField = editor;
    var htmlparser = new core.htmlparser();
    var userstorage = new util.userstorage();
    var storage = new util.storage();
    var print = new util.print();
    var regex = new util.regex();

    /**
    * Gibt die private variable htmlparser zurück.
    * @return {htmlparser} htmlparser - gespeicherte Referenz des htmlparsers
    */
    this.getHtmlparser = function () {
      return htmlparser;
    };

    /**
    * Gibt die private variable userstorage zurück.
    * @return {userstorage} userstorage - gespeicherte Referenz des userstorages
    */
    this.getUserStorage = function () {
      return userstorage;
    };

    /**
    * Ruft die Initialisierungsfunktion des htmlparsers auf und übergibt die gespeicherte Referenz des editors.
    */
    this.initialize = function () {
      htmlparser.initialize( richTextField );
    };

    /**
    * Bereitet Command für Veränderungen der Schriftgröße vor.
    * @param {string} command - Name des Commands
    * @param {string} id - Id des aktuellen Elements, welches zuvor Event ausgelöst hatte
    * @param {int} size - Zu setzende Schriftgröße
    */
    this.iFontSize = function ( command, id, size ) {
      htmlparser.buildCommand( command, false, size );
    };

    /**
    * Bereitet Command für Veränderungen der Schriftfarbe vor.
    * @param {string} command - Name des Commands
    * @param {string} id - Id des aktuellen Elements, welches zuvor Event ausgelöst hatte.
    * @param {string} color - Zu setzende Schrifarbe
    */
    this.iForeColor = function (command, id, color){
    	htmlparser.buildCommand(command, false, color);
    };

    /**
    * Bereitet Command für das Einfügen eines Hyperlinks vor.
    * @param {string} command - Name des Commands
    * @param {string} id - Id des aktuellen Elements, welches zuvor Event ausgelöst hatte.
    * @param {string} link - Zu setzender  URL-Link
    */
    this.iLink = function (command, id, link){
    	htmlparser.buildCommand(command, false, link);
    };

    /**
    * Bereitet Command für das Einfügen eines Bilds vor.
    * @param {string} command - Name des Commands
    * @param {string} id - Id des aktuellen Elements, welches zuvor Event ausgelöst hatte.
    * @param {string} imageSrc - Pfad des einzufügenden Bilds.
    */
    this.iImage = function (command, id, imageSrc){
      htmlparser.buildCommand(command, false, imageSrc);
    };

    /**
    * Bereitet ein einfaches Command vor.
    * @param {string} command - Name des Commands
    * @param {string} id - Id des aktuellen Elements, welches zuvor Event ausgelöst hatte.
    */
    this.simpleCommand = function (command, id) {
      htmlparser.buildCommand(command, false, null);
    };

    /**
    * Gibt Schreibbefehl an den htmlparser weiter.
    * @param {string} html - innerHTML des Editors
    * @param {bool} lineBreak - Gibt an, ob Zeilenumbruch durchgeführt werden soll
    */
    this.writeHTML = function ( html, lineBreak ) {
      htmlparser.writeHTML( html, lineBreak );
    };

    /**
    * Veranlasst das Schreiben eines default HTML-Konstrukts (<div><br></div>)
    */
    this.writeDefault = function () {
      htmlparser.writeHTMLDefault();
    };

    /**
    * Ermittelt die aktuelle Selektion und erweitert diese, bis der Elterknoten
    * gleich dem tagname ist oder keine Knoten zur Durchsuchung mehr vorhanden sind.
    * @param {string} tagname - Name des HTML-Tags, welches gesucht werden soll.
    * @return {bool} found - Wenn ein Suchtreffer erfolgt, wird true zurückgegeben
    */
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

    /**
    * Öffnet Druckfunktionalität des Moduls print und übergibt innerHTML des Editors.
    */
    this.openPrintDialog = function () {
      var innerHTML = htmlparser.getHTML();
      print.doPrint( innerHTML );
    };

    /**
    * innerHTML des Editors wird in Datei abgespeichert.
    */
    this.saveFile = function () {
      var html = htmlparser.getHTML();
      storage.exportJSON( html );
    };

    /**
    * Aus Datei wird innerHTML geladen und dem Editor übergeben.
    */
    this.openFile = function () {
      storage.importJSON();
    };

    /**
    * innerHTML des Editors wird mit intern gespeichertem HTML des htmlparsers aktualisiert.
    */
    this.updateContent = function () {
      htmlparser.update();
    };

    /**
    * Im Text wird nach übergebenem Suchbegriff gesucht. Dieser wird markiert.
    * @param {string} searchstring - String, nach dem gesucht werden soll
    */
    this.search = function (searchString) {
      var innerHTML = htmlparser.getHTML();
      console.log(innerHTML);
      var result;

      if(searchString.length == 0){
        $(".replace").hide();  
        result = regex.removeSpanWithAttributes(innerHTML);
      }
      else{
        $(".replace").css("display","table-cell");
        var res = regex.searchAndMarkTextIgnoringTags(searchString, innerHTML); 
        result = res.resultString;
      }
      if (result !== "") {
        self.writeHTML( result, false );
        self.updateContent();
      }
    };

    self.initialize();
    $('#5').dropdown();
    $('#4').dropdown();
  };
} )();
