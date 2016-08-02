
// die datei in der die zeilen gespeichert werden.
var datei = null;

// soll inhalte aus html als .json file sichern. Tut dies inklusive Tags. 
// Die resultierende Datei hat die Dateieindung .json und enthält ein json-Objekt 
// mit dem name-value-pair "content":"inhalt der seite".
function exportJSON () {
	 
	 datei = document.getElementById("text").innerHTML;
	 //neu:
	 var dataStr = "data:text/json;charset=utf-8," + 
	 "data = [{\"content\"" + ": " + "\"" + datei + "\"}];";//encodeURIComponent(JSON.stringify(data));

	 //download der datei
	 var dlAnchorElem = document.getElementById('downloadAnchorElement');
	 dlAnchorElem.setAttribute("href",     dataStr     );
	 dlAnchorElem.setAttribute("download", "backup.json");
	 dlAnchorElem.click();

};
//Eine Hilfsfunktion zum Testen, die den text einer seite löscht.
function resetText(){
	var leer = "";
	document.getElementById("text").innerHTML = leer;
};


//war gedacht um die quelle des inputs zu ändern:
/*function modifySource(){

	var input = prompt("Please enter the directory where the data is stored:", "filename.json");
	document.getElementById("quelle").setAttribute("src", input)
}
*/

function load(){

// die "quelle" people.json, bzw. "data" (ist der name der variable innerhalb von people.json)
// ist statisch im html hinterlegt und müsste dynamisch festgelegt werden.

//var mydata = JSON.parse(data);
//modifySource();

var mydata = (data);
document.getElementById("text").innerHTML = mydata[0].content;

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