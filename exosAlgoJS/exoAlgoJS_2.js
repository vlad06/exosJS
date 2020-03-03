var zoneNb = document.getElementById("nb");// zoneNb est le raccourci pour la textbox
var nbTab = new Array(); //on déclare un tableau

(function() {
	zoneNb.addEventListener('keypress', nbStats);
	document.getElementById("btnDelete").addEventListener('click', deleteLast);
	document.getElementById("btnDeleteAll").addEventListener('click', deleteAll);
	document.getElementById("nb").focus();
}());

//fonction déclenchée par keypress, dès qu'on appuie sur une touche, 
//cette fonction est appelée
function nbStats(e) { //e contient des informations sur l'évenement déclencheur
	var nb;
	var isNumber; //un booléen pour savoir si nb est un nombre ou pas
	console.log(e.charCode);
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

	if(nbTab.length) { //si la taille de la table est > 0
		zoneAffNb.style.fontSize = "1.5em";
		zoneAffNb.innerText = nbTab;	//on affiche la table
		var compteur = nbTab.length;
		var somme = nbTab.reduce((accumulateur, valeurCourante) => //pour faire la somme de tous les éléments
			parseFloat(accumulateur) + parseFloat(valeurCourante));
		var mini = Math.min(...nbTab); //minimum de la table (...nbTab est un opérateur de décomposition)
		var maxi = Math.max(...nbTab);//maximum de la table
		zoneAffStat.innerHTML = //on affiche les statistiques
		"Compteur : " + compteur + "<br />" + 
		"Compris entre " + mini + " et " + maxi + "<br />" +
		"Pour une somme de " + somme + "<br />" +
		"Et une moyenne de " + (somme / compteur);
	} else {
		zoneAffNb.innerHTML = zoneAffStat.innerHTML = "Aucun nombre n'a été saisi.";
	}
}

function deleteLast() {
	nbTab.pop(); //on enlève le dernier élément de la table
	majAffichage(); //on met à jour l'affichage sur la page html
}

function deleteAll() {
	while(nbTab.length) {	//tant que la taille de la table > 0
		nbTab.pop();	//on enlève le dernier élément
	}
	majAffichage();	//on met à jour l'affichage sur la page html
}


