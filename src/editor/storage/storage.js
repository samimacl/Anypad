
// die datei in der die zeilen gespeichert werden.
var datei = null;


//soll inhalte aus html als .json file sichern.
function exportJSON () {
	 

	 //muss angepasst werden, damit die datei tatsächlich wie ein json objekt aufgebaut ist.
	 datei = document.getElementById("text").innerHTML;
	 var dataStr = "data:text/json;charset=utf-8," + datei;//encodeURIComponent(JSON.stringify(data));
	 var dlAnchorElem = document.getElementById('downloadAnchorElement');
	 dlAnchorElem.setAttribute("href",     dataStr     );
	 dlAnchorElem.setAttribute("download", "backup.json");
	 dlAnchorElem.click();

};

function resetText(){
	var leer = "";
	document.getElementById("text").innerHTML = leer;
};



/*function modifySource(){

	var input = prompt("Please enter the directory where the data is stored:", "filename.json");
	document.getElementById("quelle").setAttribute("src", input)
}
*/

function load(){

// die "quelle" (data) ist statisch im html hinterlegt und müsste dynamisch festgelegt werden.
// es muss dann das ganze array durchgegangen werden um alle inhalte zu laden.

//var mydata = JSON.parse(data);
//modifySource();
var mydata = (data);
document.getElementById("text").innerHTML = mydata[0].name + " " + mydata[0].age;

};








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






