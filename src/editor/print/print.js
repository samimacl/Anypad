var util = util || {};

/**
 * Erstellung eines Printobjekt
 * Deklarierung einr Funktion zum Weierverabeiten des HTLM aus dem iFrame
 * @class
 * @constructor
 * @param {window} printwindow - Neues Fenster bzw. Druckvorschau
 * @param {string} innerHTML - Übergebener HTML-Element zum Drucken
 */

util.print = util.print || function () {
  this.doPrint = function ( innerHTML ) {
    var printwindow = window.open();
    try {
      printwindow.document.write( innerHTML );
      printwindow.document.close();
      printwindow.print();
    }
    catch(err) {
      console.log(err);
    }
    finally {
      printwindow.close();
    }
  };
};
