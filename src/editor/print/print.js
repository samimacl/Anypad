function Print(htmlTag)
{
  var printwindow = window.open();
  printwindow.document.write(htmlTag);
  printwindow.print();
  printwindow.close();
}
