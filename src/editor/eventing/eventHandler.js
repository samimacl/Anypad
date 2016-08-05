'use strict';

var core = core || {};

( function() {
    core.eventHandler = core.eventHandler || new function() {
      var self = this;
      var anypad;
      var richTextField;
      var commands = ['bold', 'underline', 'italic', 'FontSize', 'ForeColor', 'inserthorizontalrule', 'InsertOrderedList', 'InsertUnorderedList', 'CreateLink', 'Unlink', 'insertimage', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];

      window.addEventListener("load", function load(event){
          window.removeEventListener("load", load, false);
          initAnypad();
          initEvents();
      },false);

        var initAnypad = function () {
          richTextField = document.getElementById("richTextField");
          iFrameOn();
          anypad = new core.anypad( richTextField );
      };

      var initEvents = function () {
        richTextField.contentWindow.document.addEventListener('keyup', function(event) {
          var html = richTextField.contentWindow.document.body.innerHTML;
          if ( event.keyCode == 8 && html == anypad.getHtmlparser().getHTMLDefault() || (html == '') || (html == '<br>')) {
            anypad.writeDefault();
          } else {
            /* LineBreak */
            var createLineBreak = (event.keyCode == 13 && !event.shiftKey == 1);
            anypad.writeHTML( html, createLineBreak );
          }
        }, false);

        var childrenButton = [].slice.call(document.getElementById("wysiwyg_cp").getElementsByTagName('button'), 0);
        var childrenLi = [].slice.call(document.getElementById("wysiwyg_cp").getElementsByTagName('Li'), 0);
        var elements = new Array(childrenButton.concat(childrenLi));
        for (var i = 0; i < elements[0].length; i++) {
            elements[0][i].addEventListener('click', buttonOnClickDelegate(elements[0][i]), false);
        }
      };

      function richTextFieldOnKeyUp () {
        var html = richTextField.contentWindow.document.body.innerHTML;
        anypad.writeHTML( html );
      };

      var iFrameOn = function (){
        richTextField.contentWindow.document.designMode = 'On';
      };

      function buttonOnClickDelegate(elem) {
        return function () {
          buttononClickHandler(elem)
        }
      };

      function buttononClickHandler(elem) {
        console.log("click");
        var id = elem.getAttribute('id');
        //Color
        if (id.startsWith('c')) {
          changeColor( elem );
        } else if (id.startsWith('s')) {
          changeSize( elem );
        }
        else if (id == 4) {
          var size = prompt('Enter a size 1 - 7', '');
          anypad.iFontSize(commands[id-1], id, size);
        } else if (id == 5) {
          var color = prompt('Define a basic color or apply a hexadecimal color code for advanced colors:', '');
          anypad.iForeColor(commands[id-1], id, color);
        } else if (id == 9) {
          var linkURL = prompt("Enter the URL for this link:", "http://");
          if (linkURL != null) {
            anypad.iLink(commands[id-1], id, linkURL);
          }
        } else if (id == 11) {
          var imgSrc = prompt('Enter image location', '');
            if (imgSrc != null){
              anypad.iImage(commands[id-1], id, imgSrc);
            }
        } else if (id >= 12 || id <= 15) {
          if (anypad.detectSelection('DIV')) {
            anypad.simpleCommand(commands[id-1], id);
          };
        } else if (id == "bPrint") {
          anypad.openPrintDialog();
        } else if (id == "export") {
          anypad.saveFile();
        } else if (id == "import") {
          anypad.openFile();
        }
        else {
          anypad.simpleCommand(commands[id-1], id);
        }
      };

      var changeColor = function ( element ) {

      };

      var changeSize = function ( element ) {

      };
  };
} )();
