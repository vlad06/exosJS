var cote1 = document.getElementById("cote1");
var cote2 = document.getElementById("cote2");
var go = document.getElementById("btnGo");
var canvas = document.getElementById("repereOrthonormal");

canvas.style.border = "1px solid red";

var ctx = canvas.getContext("2d");

go.addEventListener('click', traitement);

function traitement() {
	nb1 = cote1.value;
	nb2 = cote2.value;
	if(!Number.isNaN(nb1) && !Number.isNaN(nb2)) {
		affiche("la valeur de l'hypotenuse est : " + calculHypothenuse(nb1,nb2), 1);
		dessine(nb1,nb2);
	}
}

function calculHypothenuse(a,b) {
	return parseFloat(Math.sqrt((a*a)+(b*b))).toFixed(2);
}

function affiche(message, importance) {
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "1.5em";
	switch(importance) {
		case 0:
			zoneAffichage.style.color = "red";
		break;
		case 1:
			zoneAffichage.style.color = "blue";
		break;
		default:
			zoneAffichage.style.color = "red";
		break;
	}
	zoneAffichage.innerHTML = message;
}

function dessine(cote1,cote2) {
	var cm = 37.7953; // 1 cm = 37.7953 pixels
	var hypo = calculHypothenuse(cote1,cote2);
	
	//on trace d'abord les axes pour le repère orthonormé
	ctx.beginPath();
	ctx.strokeStyle = "black"; //on définit la couleur des traits
	ctx.moveTo(20, 580);	
	ctx.lineTo(1180, 580);	//on trace l'axe des abscisses
	for(var i=20;i<1150;i+=cm) {	//on trace les graduations sur l'axe des abscisses
	ctx.moveTo(i+cm, 590);
	ctx.lineTo(i+cm, 570);
	}
	ctx.moveTo(20, 20); 
	ctx.lineTo(20, 580); //on trace l'axe des ordonnées
	for(var i=580;i>2*cm;i-=cm) { //on trace les gradutions sur l'axe des ordonnées
		ctx.moveTo(10, i-cm);
		ctx.lineTo(30, i-cm);
	}
	ctx.stroke();
	//on trace le triangle rectangle correspondant aux valeurs saisies dans les textbox
	ctx.beginPath();
	ctx.strokeStyle = "blue"
	ctx.moveTo(20+cm, 580-cm);	// le point de départ pour tracer le triangle
	ctx.lineTo((20+cm)+(cote1*cm),(580-cm));	//on trace le premier côté
	ctx.moveTo(20+cm, 580-cm);
	ctx.lineTo(20+cm, (580-cm)-(cote2*cm));	//on trace le deuxième côté
	ctx.moveTo((20+cm)+(cote1*cm),(580-cm));	
	ctx.lineTo(20+cm, (580-cm)-(cote2*cm));	//puis on trace l'hypothénuse
	ctx.stroke();
	ctx.font = "12px serif";
	ctx.fillText("côté 1 = " + cote1+"cm", ((20+cm)+(cote1*cm))/2, 580-0.5*cm);
	ctx.fillText("côté 2 = " + cote2+"cm", 25+cm, (580-cm)-(cote2*cm/2));
	ctx.fillText("hypothénuse = " + hypo+"cm", ((20+cm)+(hypo*cm))/2, (580-cm)-(cote2*cm/2));
}









