'use strict';

var core = core || {};

( function() {
    core.eventHandler = core.eventHandler || new function() {
      var self = this;
      var anypad;

      window.addEventListener("load", function load(event){
          window.removeEventListener("load", load, false);
          initAnypad();
          initEvents();
      },false);

        var initAnypad = function () {
          anypad = core.anypad;
          console.log(anypad);
      };

      var initEvents = function () {
        var button1 = document.getElementById("button1");
        button1.addEventListener("click", testClick, false);
      };

      function testClick () {
        alert(anypad.getVersion());
      };
  };
} )();
