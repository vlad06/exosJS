var tabListeNb = new Array();	//tableau de strings

printHtml("1 est le 1er nombre impair<br />");
for(var i=2;i<=20;i++) {
printHtml((i*2-1) + " est le " + i + " eme nombre impair<br />");
}

//la fonction printHtml(string s) affiche dans un span une chaîne de caractères 
//passée en paramètre.
function printHtml(message) {
	console.log("dans printHtml");
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "1.5em";
	zoneAffichage.insertAdjacentHTML('beforeend', message);
}