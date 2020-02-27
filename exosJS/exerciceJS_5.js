(function() {
	document.getElementById("survol").addEventListener("mouseover", mouseOver);
	document.getElementById("survol").addEventListener("mouseout", mouseOut);
}());

function fctAffiche() {
	document.getElementById("postIt").style.visibility = "visible";
	document.getElementById("postIt").innerHTML = "Vous avez cliqué sur le bouton 'Affiche'";
}

function fctCache() {
	document.getElementById("postIt").style.visibility = "hidden";
}

function mouseOver() {
	document.getElementById("postIt").innerHTML = "C'est gentil de me survoler...";
	document.getElementById("postIt").style.visibility = "visible";
}

function mouseOut() {
	document.getElementById("postIt").style.visibility = "hidden";
}