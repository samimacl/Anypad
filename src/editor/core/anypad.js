var core = core || {};

( function () {
    core.anypad = core.anypad || new function () {
    var self = this;
    var version = "0.0.1";
    var htmlparser = new core.htmlparser();
    var userstorage = new util.userstorage();

    this.getVersion = function () {
      return version;
    };

    this.getHtmlparser = function () {
      return htmlparser;
    };

    this.getUserStorage = function () {
      return userstorage;
    };

    function _initialize () {
      htmlparser.initialize();
    };

    this.initialize = function () {
      _initialize();
    };

    self.initialize();
  };
} )();
