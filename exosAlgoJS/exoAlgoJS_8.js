var nbEssais = 0;
var nbBonnesLettres = 0;
var motEtoile = "";
var nbTentatives = 10;
var lettreSaisie = "";
var nbBonnesLettres = 0;
var motCache = "";

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
var divLettreSaisie = document.getElementById("lettreSaisie");

btnBourreau.addEventListener("click", go);
btnVictime.addEventListener("click", traitementVictime);

victime.style.visibility = "hidden";

function go() {
	motCache = txtBourreau.value;
	var estUnMot = testMot(motCache);
	console.log(testMot(motCache));
	if(estUnMot) {
		for(var i = 0; i < motCache.length; i++) {
			motEtoile += "*";
		}
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

function traitementVictime() {
	lettreSaisie = txtVictime.value;
	if(lettreSaisie.length > 1 || lettreSaisie.length == 0) {
		alert("Merci de saisir au moins une lettre et une seule lettre à la fois !!");
	} else {
		txtVictime.value = "";
		traitement();
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
		draw(nbTentatives);
		zoneAffichage.innerHTML = "Dommage... continuez quand même.";
	}
	if(!nbTentatives) {
		draw("defaite");
		defaite();
	}
	if(motEtoile == motCache) {
		draw("victoire");
		victoire();
	}
}

function victoire() {
	divLettreSaisie.style.visibility = "hidden";
	zoneAffichage.style.fontSize = "3em";
	zoneAffichage.innerHTML = "Vous avez gagné en " + nbEssais + " essais !";
}

function defaite() {
	divLettreSaisie.style.visibility = "hidden";
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

function draw(etat) {
	var canvas = document.getElementById("dessinPendu");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "maroon";
	switch(etat) {
		case 9:
			ctx.fillRect(200, 610, 300, 40);
		break;
		case 8:
			ctx.fillRect(330, 10, 40, 600);
		break;
		case 7:
			ctx.fillRect(370, 10, 400, 40);
		break;
		case 6:
			ctx.save();
			ctx.translate(330, 150);
			ctx.rotate(Math.PI / 180 * -45);
			ctx.fillRect(0, 0, 190, 40);
			ctx.restore();
		break;
		case 5:
			ctx.fillRect(750, 50, 10, 150);
		break;
		case 4:
			ctx.arc(754, 240, 40, 0, 2 * Math.PI, true);
			ctx.stroke();
		break;
		case 3:
			ctx.fillRect(751, 280, 5, 100);
		break;
		case 2:
			ctx.fillRect(698, 303, 110, 5);
		break;
		case 1:
			ctx.save();
			ctx.translate(708, 421);
			ctx.rotate(Math.PI / 180 * -45);
			ctx.fillRect(0, 0, 62, 5);
			ctx.restore();
		break;
		case "defaite":
			ctx.save();
			ctx.translate(755, 378);
			ctx.rotate(Math.PI / 180 * 45);
			ctx.fillRect(0, 0, 62, 5);
			ctx.restore();
			//Tout ce qui suit sert pour colorer le bonhomme lors de la défaite
			//on dessine la bouche
			ctx.save();
			ctx.fillStyle = "red";	
			ctx.translate(743, 257);
			ctx.fillRect(0, 0, 20, 3);
			ctx.restore();
			//on dessine l'oeil droit
			ctx.save();
			ctx.fillStyle = "red";
			ctx.translate(732,220);
			ctx.rotate(Math.PI/180*45);
			ctx.fillRect(0, 0, 15, 3);
			ctx.restore();
			ctx.save();
			ctx.fillStyle = "red";
			ctx.translate(730, 231);
			ctx.rotate(Math.PI/180*-45);
			ctx.fillRect(0, 0, 15, 3);
			ctx.restore();
			//on dessine l'oeil gauche
			ctx.save()
			ctx.fillStyle = "red";
			ctx.translate(767, 220);
			ctx.rotate(Math.PI/180*45);
			ctx.fillRect(0, 0, 15, 3);
			ctx.restore();
			ctx.save();
			ctx.fillStyle = "red";
			ctx.translate(765, 231);
			ctx.rotate(Math.PI/180*-45);
			ctx.fillRect(0, 0, 15, 3);
			ctx.restore();
			//on redessine le bonhomme en bleu
			ctx.fillStyle = "blue";
			ctx.strokeStyle = "blue";	
			ctx.arc(754, 240, 40, 0, 2 * Math.PI, true);
			ctx.stroke();
			ctx.fillRect(751, 280, 5, 100);
			ctx.fillRect(698,303, 110, 5);
			ctx.save();
			ctx.translate(708, 421);
			ctx.rotate(Math.PI/180*-45);
			ctx.fillRect(0, 0, 62, 5);
			ctx.restore();
			ctx.save();
			ctx.translate(755, 378);
			ctx.rotate(Math.PI/180*45);
			ctx.fillRect(0, 0, 62, 5);
			ctx.restore();
		break;
		case "victoire":
			ctx.fillStyle = "black";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.font = "300px serif";
			ctx.fillText("BRAVO!!", 30, 400);
		break;
	}
	
	canvas.addEventListener(
	'click', 
		function(evt) {
			var mousePos = getMousePos(canvas, evt);
			var message = 'Mouse position: ' + Number.parseInt(mousePos.x) + ',' + Number.parseInt(mousePos.y);
			writeMessage(canvas, message);
		}, false
	);
}

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, 260, 30);
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





	