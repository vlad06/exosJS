var ancrage = document.getElementById("onTheBody");
ancrage.numTable = 1;

(function() {
	ancrage.addEventListener('keypress', startShowMultiplicationTable);
	printHtml(constructTable(ancrage.numTable));
	ancrage.numTable++;
	console.log(ancrage.numTable);
}());

//la fonction startShowMultiplicationTable(event) est appelée chaque fois qu'une 
//touche du clavier est pressée, mais elle ne fait qqch que lorsque c'est la barre
//d'espace qui est pressée.
function startShowMultiplicationTable(e) {
	console.log("dans start");
	console.log(ancrage.numTable);
	if(e.keyCode == 32) {
		console.log(ancrage.numTable);
		printHtml(constructTable(ancrage.numTable));
		ancrage.numTable++;
		if(ancrage.numTable > 10) {
			ancrage.numTable = 1;
		}
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
	console.log(numTable);
	var maTable = "Table des " + numTable + "\n<br />";
	for(var i=1;i<=10;i++) {
		maTable = maTable + numTable + " x " + i + " = " + (numTable * i) + "\n<br />";
	}
	maTable += "...on respire... frappez espace et validez\n<br />";
	return maTable;
}