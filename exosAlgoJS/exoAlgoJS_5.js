(function() {
	document.getElementById("btnValider").addEventListener('click', traitement);
	document.getElementById("nb").focus();
}());

function traitement() {
	var nombreSaisi = document.getElementById("nb").value;
	console.log(nombreSaisi);
	if(!Number.isNaN(nombreSaisi) && nombreSaisi > 0) {
		affiche("Factorielle de " + nombreSaisi + " : " + factorielle(nombreSaisi), 1);
	} else {
		affiche("Merci de saisir un nombre positif.", 0);
	}
}

function factorielle(nb) {
	console.log(nb);
	if(nb == 0) {
		return 1;
	}
	return factorielle(nb-1) * nb;
}

function affiche(message, importance) {
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "2em";
	(importance) ? zoneAffichage.style.color = "blue" : zoneAffichage.style.color = "red";
	zoneAffichage.innerHTML = message;
	document.getElementById("nb").value="";
}
	