
// die datei in der die zeilen gespeichert werden.
var datei = null;


//wird nicht verwendet
function downloadDialog(){

	var url = 'http://localhost/test.rtf';
	var url = dataStr;
	window.open(url, 'Download');
	
}

// soll inhalte aus html als .json file sichern. Tut dies inklusive Tags. 
// Die resultierende Datei hat die Dateieindung .json und enthält ein json-Objekt 
// mit dem name-value-pair "content":"inhalt der seite".
function exportJSON () {
	 
	 datei = document.getElementById("text").innerHTML;

//hatte das potenzial sinn zu machen, machte aber keinen:
//var dataStr = "data:text/json;charset=utf-8," + 
//	 "data = [{\"content\"" + ": " + "\"" + datei + "\"}];";

	var dataStr ="data:text/json;charset=utf-8," + datei;

	 //download der datei
	 var save = document.getElementById('dl');
	 save.setAttribute("href",     dataStr     );
	 save.setAttribute("download", "backup.json");
	 save.click();

};

//Eine Hilfsfunktion zum Testen, die den text einer seite löscht.
function resetText(){
	var leer = "";
	document.getElementById("text").innerHTML = leer;
};


function load(){

	var element = document.createElement('div');
	element.innerHTML = '<input type="file">';
	var fileInput = element.firstChild;

	fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];

    if (file.name.match(/\.(txt|json)$/)) {
        var reader = new FileReader();
        reader.onload = function() {

            var ergebnis = reader.result;
            document.getElementById("text").innerHTML = ergebnis;

        };
        reader.readAsText(file);    
    } else {
        alert("File not supported, .txt or .json files only");
    }
});
fileInput.click();
};




// erste Versuche, wird nicht weiter benötigt.
var beispiel = '{ "beispiel" : [' +
'{ "id":"p1" ,"opening":"<P>", "inhalt":"das hier ist p1", "closing":"</p>" },' +
'{ "id":"p2" , "content":"das hier ist p2" }]}';

// einlesen eines json-artigen objekts. Wird in html angezeigt.
function loadJSON(string){

	var obj = JSON.parse(beispiel);
	document.getElementById("demo").innerHTML = obj.beispiel[0].opening
	+ obj.beispiel[0].inhalt + obj.beispiel[0].closing;

	//evtl muss ein string entgegengenommen werden, der dann wieder zu einem json objekt gemacht
	//werden muss
};