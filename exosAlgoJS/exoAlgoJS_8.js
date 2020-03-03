var strLettresSaisies = "";
var gagne = false;
var nbEssais = 0;
var nbBonnesLettres = 0;
var motEtoile = "";
var nbTentatives = 10;
var lettreSaisie = "";
var nbBonnesLettres = 0;
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

btnBourreau.addEventListener("click", go);
btnVictime.addEventListener("click", traitementVictime);

victime.style.visibility = "hidden";
draw();

function go(event) {
	motCache = txtBourreau.value;
	var estUnMot = testMot(motCache);
	console.log(testMot(motCache));
	if(estUnMot) {
		for(var i = 0; i < motCache.length; i++) {
			motEtoile += "*";
		}
		// nbTentatives = 2 * motCache.length;
		saisieMotCache.style.visibility = "hidden";
		afficheNombreTentatives.style.fontSize = "1.5em";
		afficheNombreTentatives.innerHTML = "Vous avez droit à " + nbTentatives + " essais.";
		afficheMotCache.style.fontSize = "4em";
		afficheMotCache.innerHTML = motEtoile;
		victime.style.visibility = "visible";
	} else {
		alert("Merci de saisir un mot composé uniquement de lettres");
		txtBourreau.value="";
	}
}

function traitementVictime(event) {
	lettreSaisie = txtVictime.value;
	if(lettreSaisie.length > 1) {
		alert("Merci de ne saisir qu'une seule lettre à la fois !!");
	} else {
		strLettresSaisies += lettreSaisie + " / ";
		traitement();
		// zoneAffichage.innerHTML = strLettresSaisies;
		txtVictime.value = "";
		
	}
}

function traitement() {
	var lettreDansMot = false;
	var leftSide = "";
	var rightSide = "";
	for(i = 0; i < motCache.length; i++) {
		if(lettreSaisie == motCache.charAt(i) && lettreSaisie != motEtoile.charAt(i)) {
			leftSide = motEtoile.substring(0,i);
			rightSide = motEtoile.substring(i+1);
			motEtoile = leftSide + lettreSaisie + rightSide;
			lettreDansMot=true;
			nbBonnesLettres++;
		}
	}
	if(lettreDansMot) {
		nbEssais++;
		zoneAffichage.innerHTML = "Super! continuez.";
		afficheMotCache.innerHTML = motEtoile;
	} else {
		nbTentatives--;
		afficheNombreTentatives.innerHTML = "Vous avez droit à " + nbTentatives + " essais.";
		nbEssais++;
		zoneAffichage.innerHTML = "Dommage... continuez quand même.";
	}
	if(!nbTentatives) {
		defaite();
	}
	if(motEtoile == motCache) {
		victoire();
	}
}

function victoire() {
	zoneAffichage.style.fontSize = "3em";
	zoneAffichage.innerHTML = "Vous avez gagné en " + nbEssais + " essais !";
}

function defaite() {
	zoneAffichage.style.fontSize = "3em";
	zoneAffichage.innerHTML = "Perdu ! le mot à trouver était " + motCache + "<br />";
	zoneAffichage.innerHTML += "Vous avez trouvé " + nbBonnesLettres + " lettres";
	zoneAffichage.innerHTML += "<br />Vous ferez mieux la prochaine fois !";
}

function testMot(motCache) {
	var re = new RegExp("^[a-zA-Z]+$", "g");
	return re.test(motCache);
}

function initialisation() {
	
}

function draw() {
	var canvas = document.getElementById("dessinPendu");
	var ctx = canvas.getContext("2d");
	// switch() {
		// case 1:
			// ctx.fillRect(200, 630, 300, 20);
		// break;
		// case 2:
			// ctx.fillRect(330, 10, 40, 600);
		// break;
		// case 3:
			//ctx.fillRect(370, 10, 400, 40);
		// break;
		// case 4:
			// ctx.save();
			// ctx.translate(330, 150);
			// ctx.rotate(Math.PI/180*-45);
			// ctx.fillRect(0, 0, 190, 40);
			// ctx.restore();
		// break;
		// case 5:
			// ctx.fillRect(750, 50, 10, 150);
		// break;
		// case 6:
		
		// break;
		// case 7:
		
		// break;
		// case 8:
		
		// break;
		// case 9:
		
		// break;
		// case 10:
		
		// break;
		// default:
		// break;
	// }

	ctx.fillStyle = 'black';
	ctx.fillRect(200, 610, 300, 40);
	ctx.fillRect(330, 10, 40, 600);
	ctx.fillRect(370, 10, 400, 40);
	ctx.save();
	ctx.translate(330, 150);
	ctx.rotate(Math.PI/180*-45);
	ctx.fillRect(0, 0, 190, 40);
	ctx.restore();
	ctx.fillRect(750, 50, 10, 150);
	ctx.arc(754, 240, 40, 0, 2 * Math.PI, true);
	ctx.moveTo(780, 260);
	ctx.arc(754, 240, 30, 0, Math.PI*.8);
	ctx.stroke();
	
	
	
	canvas.addEventListener(
	'click', 
		function(evt) {
			var mousePos = getMousePos(canvas, evt);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			writeMessage(canvas, message);
		}, false
	);
}

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	// context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = '18pt Calibri';
	context.fillStyle = 'black';
	context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}





	