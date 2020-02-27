(function() {
	document.getElementById("controler").addEventListener("click", control);
}());

function control() {
	var texte = document.getElementById("textToControl").value;
	
	switch(texte.length) {
		case 0:
			document.getElementById("spanInfo").innerHTML="Merci de saisir quelque chose !";
			break;
		case 1:
			document.getElementById("spanInfo").innerHTML="La chaîne doit comporter au moins 2 caractères.";
			break;
		default:
			document.getElementById("spanInfo").innerHTML="Vous avez saisi: '" + texte + "'";
			break;
	}
}
	