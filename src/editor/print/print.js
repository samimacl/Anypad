var util = util || {};

/**
 * Erstellung eines Printobjekt.
 * @class
 * @constructor
 */
util.print = util.print || function() {

    /**
     * Druckvorgang wird gestartet.
     * @param {string} innerHTML - Das zu druckende HTML
     */
    this.doPrint = function(innerHTML) {
        var printwindow = window.open();
        try {
            printwindow.document.write(innerHTML);
            printwindow.document.close();
            printwindow.print();
        } catch (err) {
            console.log(err);
        } finally {
            printwindow.close();
        }
    };
};
