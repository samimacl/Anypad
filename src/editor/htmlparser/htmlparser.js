var core = core || {};

core.htmlparser = core.htmlparser || function () {
  var self = this;
  var output;
  var richTextField;

  this.getOutput = function () {
    return output;
  };

  var reset = function () {
    output = "";
  };

  this.initialize = function ( editor ) {
    reset();
    richTextField = editor;
  };

  this.write = function (text) {
    output = text;
    console.log(output);
  };

  this.getHTML = function () {
    return output;
  };

  this.buildCommand = function (command, showDefaultUI, valueArgument) {
    richTextField.contentWindow.document.execCommand(command, showDefaultUI, valueArgument);
    self.write(richTextField.contentWindow.document.body.innerHTML);
  };

/*
  function openTag(tagname) {
    output.push('<', tagname);
  };

  function openTagClose(isSelfClosing) {
    if (isSelfClosing) {
      output.push(' />');
    } else {
      output.push('>')
    }
  };

  function closeTag(tagname) {
    output.push('</', tagname, '>');
  };

  function attribute (attrname, attrvalue) {
    output.push(' ', atttrname, '="', attrvalue, '"');
  };

  function createParagraph (lineBreak) {
    if (lineBreak) {
      createLineBreak();
    }
    openTag("p");
    closeTag("p", false);
  };

  function createLineBreak() {
    openTag("br");
  };
*/
};
