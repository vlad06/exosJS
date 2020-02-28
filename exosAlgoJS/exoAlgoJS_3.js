var strTableToShow = "";
// var numTable = 1;
var ancrage = document.getElementById("lel");
// var ancrage = document.getElementById("ancrageKeypress");
// var olol = document.getElementById("lol");
var thePause;


(function() {
	ancrage.addEventListener('keypress', pauseShowMultiplicationTable);
	ancrage.numTable = 1;
	printHtml(constructTable(ancrage.numTable));
	// printHtml("...on respire... frappez espace et validez");
	// ancrage.style.position = "absolute";
	// ancrage.style.left = "9000px";
	ancrage.focus();
}());

function startShowMultiplicationTable() {
	console.log("dans start");
	ancrage.removeEventListener('keydown', startShowMultiplicationTable);
	ancrage.addEventListener('keydown',pauseShowMultiplicationTable);
	// clearInterval(thePause);
	ancrage.numTable++;
	printHtml(constructTable(ancrage.numTable)); 
}

function pauseShowMultiplicationTable(e) {
	console.log("dans pause");
	// printHtml(constructTable(ancrage.numTable));
	// thePause = 
		// setInterval(
			// function() { 
				// console.log("coucou"); 
			// }, 60000
		// );
	// printHtml("...on respire... frappez espace et validez");
	if(e.keyCode == 32) {
		ancrage.removeEventListener('keydown', pauseShowMultiplicationTable);
		ancrage.addEventListener('keydown',startShowMultiplicationTable);
	}
}

function printHtml(message) {
	console.log("dans printHtml");
	var divAffichage = document.getElementById("divAffichage");
	// var theBr = document.createElement("br");
	// var theBr = document.createTextNode("<br />");
	// divAffichage.append(message);
	divAffichage.insertAdjacentHTML('beforeend', message);
	console.log(divAffichage.textContent);
}

function constructTable(numTable) {
	console.log("dans constructTable");
	var maTable = "Table des " + numTable + "<br />";
	for(var i=1;i<=10;i++) {
		maTable = maTable + numTable + " x " + i + " = " + (numTable * i) + "<br />";
	}
	maTable += "...on respire... frappez espace et validez<br />";
	return maTable;
}