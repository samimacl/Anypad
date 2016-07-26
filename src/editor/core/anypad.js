var core = core || {};

core.anypad = core.anypad || function () {
  var self = this;
  var version = "0.0.1";
  var htmlparser = new core.htmlparser();

  this.getVersion = function () {
    return version;
  };

  this.getHtmlparser = function () {
    return htmlparser;
  };

  function _initialize () {
    htmlparser.initialize();
  };

  this.initialize = function () {
    _initialize();
  };

};
