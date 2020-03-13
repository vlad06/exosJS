/**
* Charge un fichier texte et l'affiche dans la page html.
*/
function loadDoc() {
	var xhr = new XMLHttpRequest();
	console.log(xhr);
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			document.getElementById("zoneNotif").innerHTML = this.responseText;
		}
	};
	// xhr.open("GET", "js/infos.txt", true);
	xhr.open("GET", "gestionPanier.html", true);
	xhr.send();
}
