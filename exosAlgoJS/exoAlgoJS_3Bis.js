var ancrage = document.getElementById("booty");
var i=1;

(function() {
	if(i == 1) {
		printHtml(constructTable(1));
		i++;
	}
	ancrage.addEventListener('keypress', 
		function(e) {
			if(e.charCode == 32) {
				printHtml(constructTable(i));
				i++;
				if(i > 10) {
					i = 1;
				}
			}
		}
		
	);
}());

function printHtml(message) {
	console.log("dans printHtml");
	var divAffichage = document.getElementById("divAffichage");
	divAffichage.insertAdjacentHTML('beforeend', message);
	console.log(divAffichage.textContent);
}

function constructTable(numTable) {
	console.log("dans constructTable");
	var maTable = "Table des " + numTable + "\n<br />";
	for(var i=1;i<=10;i++) {
		maTable = maTable + numTable + " x " + i + " = " + (numTable * i) + "\n<br />";
	}
	maTable += "...on respire... frappez espace et validez\n<br />";
	return maTable;
}