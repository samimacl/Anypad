var core = core || {};

core.htmlparser = core.htmlparser || function () {
  var self = this;
  var output = [];

  this.getOutput = function () {
    return output;
  };

  var reset = function () {
    output = [];
  };

  function _initialize () {
    reset();
    createParagraph(false);
  };

  this.initialize = function () {
    _initialize();
  };

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

  function text (text) {
    output.push(text);
  };

  this.write = function (text) {
    text(text);
  };

};
