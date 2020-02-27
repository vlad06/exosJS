(function() {
	document.getElementById("nb").addEventListener('keypress', nbStats);
	document.getElementById("btnSupprimer").addEventListener('click', deleteLast);
	document.getElementById("nb").focus();
}());
var zoneNb = document.getElementById("nb");
var nbTab = new Array();

function nbStats(e) {
	var nb;
	var isNumber;
	// console.log(e.charCode);
	if(e.charCode == 13) {
		nb = zoneNb.value;
		(Number.isNaN(Number.parseFloat(nb))) ?	isNumber = false : isNumber = true;
		// console.log(nb);
		// console.log(isNumber);
		if(isNumber) {
			nb=nb.trim();
			nbTab.push(nb);
			console.log(nbTab);
			zoneNb.value="";
			majAffichage(true);
		}
	}
}

function afficheMsg(message, importance) {
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "2em";
	(importance) ? zoneAffichage.style.color = "blue" : zoneAffichage.style.color = "red";
	zoneAffichage.innerHTML = message;
}

function majAffichage(bool) {
	var zoneAffNb = document.getElementById("zoneAffichageNombres");
	var zoneAffStat = document.getElementById("affichageStatistiques");
	console.log(bool);
	var somme = !bool ? "Aucun nombre" : 
		nbTab.reduce((accumulateur, valeurCourante) => parseFloat(accumulateur) + parseFloat(valeurCourante));
	var compteur = (nbTab.length == 0) ? "Aucun nombre" : nbTab.length;
	var mini = Math.min(...nbTab);
	var maxi = Math.max(...nbTab);
	// var somme = nbTab.reduce(
		// function(accumulateur, valeurCourante, index, array) {
			// return accumulateur + valeurCourante;
		// }
	// );
	zoneAffNb.style.fontSize = "1.5em";
	zoneAffNb.innerText = nbTab;
	if(bool) {
		zoneAffStat.innerHTML = 
		"Compteur : " + compteur + "<br />" + 
		"Compris entre " + mini + " et " + maxi + "<br />" +
		"Pour une somme de " + somme + "<br />" +
		"Et une moyenne de " + (somme / compteur);
	} else {
		zoneAffStat.innerHTML = "Aucun nombre n'a été saisi.";
	}
}

function deleteLast() {
	nbTab.pop();
	console.log(nbTab);
	if(nbTab.length) {
		majAffichage(true);
	} else {
		majAffichage(false);
	}
}

