var util = util || {};
util.storage = util.storage || function() {


//wird nicht verwendet
//	this.downloadDialog = function(){
//
//		var url = 'http://localhost/test.rtf';
//		var url = dataStr;
//		window.open(url, 'Download');
//	}

	// soll inhalte aus html als .json file sichern. Tut dies inklusive Tags.
	// Die resultierende Datei hat die Dateieindung .json und enthält ein json-Objekt
	// mit dem name-value-pair "content":"inhalt der seite".




	this.exportJSON = function( innerHTML ) {

		 var datei = innerHTML;

	//hatte das potenzial sinn zu machen, machte aber keinen:
	//var dataStr = "data:text/json;charset=utf-8," +
	//"data = [{\"content\"" + ": " + "\"" + datei + "\"}];";

		var dataStr ="data:text/json;charset=utf-8," + datei;

		 //download der datei
		 var save = document.getElementById('dl');
		 save.setAttribute("href",     dataStr     );
		 save.setAttribute("download", "backup.json");
		 save.click();

	};

	//Eine Hilfsfunktion zum Testen, die den text einer seite löscht.
	//this.resetText = function() {
	//	var leer = "";
	//	document.getElementById("text").innerHTML = leer;
	//};

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
