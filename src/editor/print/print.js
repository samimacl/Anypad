// (c) 2016 Ba-Rm - AG
var printer_helper


function Print()
{
  var w=window.open();
  w.document.write(document.getElementsByClassName('').innerH‌​TML);
  w.print();
  w.close();
}

function getDefaultPrinterName()
{
  var printerName = printer_helper.getDefaultPrinterName();
  if(printerName) {
    return printerName;
  }

  var printers= getPrinters();
  for(i in printers) {
    var printer = printers[i];
    if(printer.isDefault === true) {
      return printer.name;
    }
  }
}

function getPrinter(printerName)
{
    if(!printerName) {
        printerName = getDefaultPrinterName();
    }
    var printer = printer_helper.getPrinter(printerName);
    correctPrinterinfo(printer);
    return printer;
}

function getPrinterDriverOptions(printerName)
{
    if(!printerName) {
        printerName = getDefaultPrinterName();
    }

    return printer_helper.getPrinterDriverOptions(printerName);
}

function getSelectedPaperSize(printerName){
    var driver_options = getPrinterDriverOptions(printerName);
    var selectedSize = "";
    if (driver_options && driver_options.PageSize) {
        Object.keys(driver_options.PageSize).forEach(function(key){
            if (driver_options.PageSize[key])
                selectedSize = key;
        });
    }
    return selectedSize;
}

function getSupportedPrintFormats()
{
  return ;
}
