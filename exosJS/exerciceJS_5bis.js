(function() {
	document.getElementById("affiche").addEventListener("mousedown", fctAffiche);
	document.getElementById("cache").addEventListener("mousedown", fctCache);
	document.getElementById("survol").addEventListener("mouseover", fctMouseOver);
	document.getElementById("survol").addEventListener("mouseout", fctMouseOut);
}());

function fctAffiche() {
	document.getElementById("postIt").style.visibility = "visible";
	document.getElementById("postIt").innerHTML = "Vous avez cliqué sur le bouton 'Affiche'";
}

function fctCache() {
	document.getElementById("postIt").style.visibility = "hidden";
}

function fctMouseOver() {
	document.getElementById("postIt").innerHTML = "C'est gentil de me survoler...";
	document.getElementById("postIt").style.visibility = "visible";
}

function fctMouseOut() {
	document.getElementById("postIt").style.visibility = "hidden";
}