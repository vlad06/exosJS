var strTableToShow = "";
var ancrage = document.getElementById("onTheBody");
var thePause;


(function() {
	ancrage.addEventListener('keypress', pauseShowMultiplicationTable);
	ancrage.numTable = 1;
	printHtml(constructTable(ancrage.numTable));
	ancrage.focus();
}());

function startShowMultiplicationTable() {
	console.log("dans start");
	ancrage.removeEventListener('keydown', startShowMultiplicationTable);
	ancrage.addEventListener('keydown',pauseShowMultiplicationTable);
	ancrage.numTable++;
	printHtml(constructTable(ancrage.numTable)); 
}

function pauseShowMultiplicationTable(e) {
	console.log("dans pause");
	if(e.keyCode == 32) {
		ancrage.removeEventListener('keydown', pauseShowMultiplicationTable);
		ancrage.addEventListener('keydown',startShowMultiplicationTable);
	}
}
//la fonction printHtml(string s) affiche dans une div une chaîne de caractères 
//passée en paramètre.
function printHtml(message) {
	console.log("dans printHtml");
	var divAffichage = document.getElementById("divAffichage");
	divAffichage.insertAdjacentHTML('beforeend', message);
	console.log(divAffichage.textContent);
}

//la fonction constructTable(int x) construit et retourne une chaîne de caractères correspondant 
//à la table de multiplication des x
function constructTable(numTable) {
	console.log("dans constructTable");
	var maTable = "Table des " + numTable + "<br />";
	for(var i=1;i<=10;i++) {
		maTable = maTable + numTable + " x " + i + " = " + (numTable * i) + "<br />";
	}
	maTable += "...on respire... frappez espace et validez<br />";
	return maTable;
}