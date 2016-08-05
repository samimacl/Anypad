var util = util || {};
util.storage = util.storage || function() {



	/** Der Funktion wird HTML-Text übergeben.
	Es erscheint ein Dialog, in dem der Nutzer den Namen der Datei und den Ort der Speicherung
	auswählen kann. Der Inhalt wird als .json file inklusive Tags gesichert.
	@param {string} innerHTML - Das HTML, das für den Download übergeben wird.
	*/

	this.exportJSON = function( innerHTML ) {

		var datei = innerHTML;
		var dataStr ="data:text/json;charset=utf-8," + datei;

		 //download der datei
		 var save = document.getElementById('dl');
		 save.setAttribute("href",     dataStr     );
		 save.setAttribute("download", "backup.json");
		 save.click();

	};

	/** Die Funktion ermöglicht das Hochladen und Anzeigen einer .json oder .txt Datei
	in der Anwendung. Die Datei wird per Dialog ausgewählt. Es wird entweder ein Fehler
	zurückgegeben oder der Inhalt der ausgelesenen Datei wird direkt als Text in die
	HTML-Seite geschrieben.
	*/

	this.importJSON = function() {

		var element = document.createElement('div');
		element.innerHTML = '<input type="file">';
		var fileInput = element.firstChild;

		fileInput.addEventListener('change', function() {
	    var file = fileInput.files[0];

	    if (file.name.match(/\.(txt|json)$/)) {
	        var reader = new FileReader();
	        reader.onload = function() {
						var html = reader.result;
						document.getElementById("richTextField").contentWindow.document.body.innerHTML = html;
	        };
	        reader.readAsText(file);
	    } else {
	        alert("File not supported, .txt or .json files only");
	    }
		});

		fileInput.click();
	};
};
