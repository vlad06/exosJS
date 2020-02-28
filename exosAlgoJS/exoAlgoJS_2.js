(function() {
	document.getElementById("nb").addEventListener('keypress', nbStats);
	document.getElementById("btnDelete").addEventListener('click', deleteLast);
	document.getElementById("btnDeleteAll").addEventListener('click', deleteAll);
	document.getElementById("nb").focus();
}());
var zoneNb = document.getElementById("nb");// zoneNb est le raccourci pour la textbox
var nbTab = new Array(); //on déclare un tableau

//fonction déclenchée par keypress, dès qu'on appuie sur une touche, 
//cette fonction est appelée
function nbStats(e) { //e contient des informations sur l'évenement déclencheur
	var nb;
	var isNumber; //un booléen pour savoir si nb est un nombre ou pas
	if(e.charCode == 13) { //13 est le charCode pour la touche entrée
		nb = zoneNb.value;	//on récupère le nb saisi par l'utilisateur
		//on test si la saisie est un nombre.
		(Number.isNaN(Number.parseFloat(nb))) ?	isNumber = false : isNumber = true;
		
		if(isNumber) { //si c'est un nombre
			nb=nb.trim();//on supprime les potentiels espaces
			nb=" "+nb; //et puis on en rajoute un devant quand même pour une meilleure visibilité
			nbTab.push(nb);//on ajoute le nombre au tableau
			// console.log(nbTab); 
			zoneNb.value="";// on remet à zéro la textbox
			majAffichage(); //on appelle la fonction de mise à jour de l'affichage
		}
	}
}

function majAffichage() {
	var zoneAffNb = document.getElementById("zoneAffichageNombres");
	var zoneAffStat = document.getElementById("affichageStatistiques");
	// var somme = nbTab.reduce(
		// function(accumulateur, valeurCourante, index, array) {
			// return accumulateur + valeurCourante;
		// }
	// );

	if(nbTab.length) {
		zoneAffNb.style.fontSize = "1.5em";
		zoneAffNb.innerText = nbTab;
		var compteur = nbTab.length;
		var somme = nbTab.reduce((accumulateur, valeurCourante) => 
			parseFloat(accumulateur) + parseFloat(valeurCourante));
		var mini = Math.min(...nbTab);
		var maxi = Math.max(...nbTab);
		zoneAffStat.innerHTML = 
		"Compteur : " + compteur + "<br />" + 
		"Compris entre " + mini + " et " + maxi + "<br />" +
		"Pour une somme de " + somme + "<br />" +
		"Et une moyenne de " + (somme / compteur);
	} else {
		zoneAffNb.innerHTML = zoneAffStat.innerHTML = "Aucun nombre n'a été saisi.";
	}
}

function deleteLast() {
	var tst = nbTab.pop();
	// console.log(nbTab);
	// console.log(tst);
	majAffichage();
}

function deleteAll() {
	while(nbTab.length) {
		nbTab.pop();
	}
	majAffichage();
}


