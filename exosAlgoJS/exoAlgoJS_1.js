(function() {
	document.getElementById("age").addEventListener('keypress', judgeAge);
	document.getElementById("age").focus();
}());

function judgeAge(e) {
	var age;
	// console.log(e.charCode);
	// console.log(e.keyCode);
	if(e.charCode == 13) {
		console.log(age)
		age = document.getElementById("age").value;
		if(age==false) {
			affiche("Merci de saisir votre âge !!",0);
		} else {
				(age > 65) ? affiche("Programme réservé aux personnes non-retraitées",1) : 
				(age >= 27) ? affiche("Statut adulte",1) :
					(age >= 18) ? affiche("Statut jeune",1) :
						(age < 18) ? affiche("Programme réservé aux personnes majeures",1) : 
							affiche("HMMM, BIZARRE !!! Votre âge est normalement composé de chiffres...",0);
		}
	} 
}

function affiche(message, importance) {
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "2em";
	(importance) ? zoneAffichage.style.color = "blue" : zoneAffichage.style.color = "red";
	zoneAffichage.innerHTML = message;
	document.getElementById("age").value="";
}
	