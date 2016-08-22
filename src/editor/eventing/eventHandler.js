var core = core || {};

(function() {
    /**
     * Das Modul eventHandler registriert verschiedene Module auf unterschiedliche HTML-Elemente.
     * Die Initialisierung des Editors wird hier durchgeführt. Benutzereingabeninteraktionen werden verarbeitet.
     * Der Parameter new ist dafür zuständig, dass das Modul im Zusammenhang mit Verwendung einer anonymen Funktion
     * beim Aufruf initialisiert wird, falls eine Instanz dem DOM noch nicht bekannt ist.
     * @class
     * @constructor
     */
    core.eventHandler = core.eventHandler || new function() {
        var self = this;
        var anypad;
        var richTextField;
        var commands = ['bold', 'underline', 'italic', 'FontSize', 'ForeColor', 'inserthorizontalrule', 'InsertOrderedList', 'InsertUnorderedList', 'CreateLink', 'Unlink', 'insertimage', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];

        window.addEventListener("load", function load(event) {
            window.removeEventListener("load", load, false);
            initAnypad();
            initEvents();
        }, false);

        var initAnypad = function() {
            richTextField = document.getElementById("richTextField");
            iFrameOn();
            anypad = new core.anypad(richTextField);
        };

        /**
         * Events werden registriert. Clickevents der verschiedenene Buttons sowie Changeevents für das Suchfeld und das Textfeld.
         * OnKeyUp-Event, welches beim KeyUp des Textfelds des Editors aufgerufen wird.
         * Überprüfung, ob ein Zeilenumbruch eingefügt werden sollte, ist abhängig ob bei dem Betätigen der Taste Enter
         * Shift gedrückt gehalten wurde. Bei nur einem Enter wird ein Zeilenumbruch eingesetzt und neuer Absatz erstellt.
         */
        var initEvents = function() {
            richTextField.contentWindow.document.addEventListener('keyup', function(event) {
                var html = richTextField.contentWindow.document.body.innerHTML;
                /* keyCode 8: Delete */
                if (event.keyCode == 8 && html == anypad.getHtmlparser().getHTMLDefault() || (html == '') || (html == '<br>')) {
                    anypad.writeDefault();
                } else {
                    /* LineBreak; keyCode 13: Enter shiftKey 1: gedrückt gehalten */
                    var createLineBreak = (event.keyCode == 13 && !event.shiftKey == 1);
                    anypad.writeHTML(html, createLineBreak);
                }
            }, false);

            /* Zuerst werden alle Buttons gesucht, die innerhalb des DIV-Tags wysiwyg_cp sind. Anschließend daran analog dazu die Li-Tags.*/
            var childrenButton = [].slice.call(document.getElementById("wysiwyg_cp").getElementsByTagName('button'), 0);
            var childrenLi = [].slice.call(document.getElementById("wysiwyg_cp").getElementsByTagName('Li'), 0);
            var elements = new Array(childrenButton.concat(childrenLi));
            for (var i = 0; i < elements[0].length; i++) {
                /* dynamisches Registrieren eines OnClick-Events auf alle im elements befindliche Buttons */
                elements[0][i].addEventListener('click', buttonOnClickDelegate(elements[0][i]), false);
            }

            var input = document.getElementById("search").querySelector('input');
            input.addEventListener('input', function() {
                anypad.search(input.value.trim());
            });
        };

        /**
         * Designmode des Textfelds des Editors wird auf on gestellt. Dadurch ist dad spätere Ausführen von ExecuteCommands möglich.
         */
        var iFrameOn = function() {
            richTextField.contentWindow.document.designMode = 'On';
        };


        /**
         * Delegate ist Platzhalter für OnClickHandler.
         * @param {node} elem - HTML-Node
         * @return {function} buttonOnClickHandler
         */
        function buttonOnClickDelegate(elem) {
            return function() {
                buttononClickHandler(elem)
            }
        };

        /**
         * Abhängig von der id werden verschiedene Funktionen aufgerufen wie das Ändern der Farbe, der Schriftgröße, etc.
         * @param {node} elem - HTML-Node
         */
        function buttononClickHandler(elem) {
            var id = elem.getAttribute('id');
            if (id.startsWith('c')) {
                changeColor(elem);
            } else if (id.startsWith('s')) {
                changeSize(elem);
            } else if (id == 9) {
                var linkURL = prompt("Enter the URL for this link:", "http://");
                if (linkURL != null) {
                    anypad.iLink(commands[id - 1], id, linkURL);
                }
            } else if (id == 10) {
                if (anypad.detectSelection('A')) {
                    anypad.simpleCommand(commands[id - 1], id);
                }
            } else if (id == 11) {
                var imgSrc = prompt('Enter image location', '');
                if (imgSrc != null) {
                    anypad.iImage(commands[id - 1], id, imgSrc);
                }
            } else if (id >= 12 || id <= 15) {
                if (anypad.detectSelection('DIV')) {
                    anypad.simpleCommand(commands[id - 1], id);
                }
            } else if (id == "bPrint") {
                anypad.openPrintDialog();
            } else if (id == "export") {
                anypad.saveFile();
            } else if (id == "import") {
                anypad.openFile();
                var html = richTextField.contentWindow.document.body.innerHTML;
                console.log(html);
            } else if (id == "replace") {
                var text = $("#replace_input").val();
                anypad.replaceAll(text);
            } else {}
            //damit Änderungen in Editor geladen werden.
            anypad.updateContent();
        };

        /**
         * Liest das dataset des Elements aus, welches die Farbe beinhaltet.
         * Funktion iForeColor gibt Befehl an htmlparser weiter, der diese Änderung durchführt.
         * @param {node} element - HTML-Node
         */
        var changeColor = function(element) {
            var color = element.dataset.color;
            anypad.iForeColor('ForeColor', 5, color);
        };

        /**
         * Liest das dataset des Elements aus, welches die Textgröße beinhaltet.
         * Funktion iFontSize gibt Befehl an htmlparser weiter, der diese Änderung durchführt.
         * @param {node} element - HTML-Node
         */
        var changeSize = function(element) {
            var size = element.dataset.size;
            anypad.iFontSize('FontSize', 4, size);
        };
    };
})();
