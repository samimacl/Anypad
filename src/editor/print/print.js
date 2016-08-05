var util = util || {};

util.print = util.print || function () {
  this.doPrint = function ( innerHTML ) {
    var printwindow = window.open();
    try {
      printwindow.document.write( innerHTML );
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
