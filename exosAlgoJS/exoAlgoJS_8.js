var strLettresSaisies = "[ ";
var gagne = false;
var nbEssais = 0;
var nbBonnesLettres = 0;
var motEtoile = "";
var nbTentatives = 0;
var lettreSaisie = "";
motCache = "";

var txtBourreau = document.getElementById("txtBourreau");
var btnBourreau = document.getElementById("btnBourreau");
var numJoueurBourreau = document.getElementById("numJoueurBourreau");
var numJoueurVictime = document.getElementById("numJoueurVictime");
var afficheMotCache = document.getElementById("afficheMotCache");
var saisieMotCache = document.getElementById("saisieMotCache");
var afficheLettreSaisie = document.getElementById("zoneAffichage");
var txtVictime = document.getElementById("txtVictime");
var btnVictime = document.getElementById("btnVictime");
var victime = document.getElementById("victime");
var afficheNombreTentatives = document.getElementById("afficheNombreTentatives");

btnBourreau.addEventListener("click", traitementBourreau);
btnVictime.addEventListener("click", traitementVictime);

victime.style.visibility = "hidden";

function traitementBourreau(event) {
	motCache = txtBourreau.value;
	for(var i = 0; i < motCache.length; i++) {
		motEtoile += "*";
	}
	nbTentatives = 2 * motCache.length;
	saisieMotCache.style.visibility = "hidden";
	afficheNombreTentatives.innerHTML = "Vous avez droit à " + nbTentatives + " essais.";
	afficheMotCache.style.fontSize = "2em";
	afficheMotCache.innerHTML = motEtoile;
	victime.style.visibility = "visible";
}

function traitementVictime(event) {
	lettreSaisie = txtVictime.value;
	if(lettreSaisie.length > 1) {
		alert("Merci de ne saisir qu'une seule lettre à la fois !!");
	} else {
		strLettresSaisies += lettreSaisie + " / ";
		traitementMots();
		zoneAffichage.innerHTML = strLettresSaisies;
		txtVictime.value = "";
		
	}
		console.log(strLettresSaisies);
}

function traitementMots() {
	for(var i = 0; i < motCache.length; i++) {
		if(motCache.charAt(i) == lettreSaisie && motEtoile.charAt(i) != lettreSaisie) {
			if(i == 0) {
				motEtoile = lettreSaisie + motEtoile.substring(i);
			} else if(i == motCache.length-1){
				motEtoile = motEtoile.substring(0, i-1) + lettreSaisie;
			} else {
			motEtoile = motEtoile.substring(0,i) + lettreSaisie + motEtoile.substring(i);
			}
		}
	}
	console.log(motEtoile);
	console.log(lettreSaisie);
}










	