(function() {
	document.getElementById("beaudy").addEventListener('keypress', affiche);
}());
var numTable = 1;

function affiche(e) {
	document.write("<h1>Tables de multiplication</h1>");
	console.log("dans affiche");
	console.log(e.charCode);
	console.log(numTable);
	if(numTable == 1) {
		afficheTable(e,numTable);
	}
	if(e.charCode == 32) {
		afficheTable(e,numTable);
	} 
};

function afficheMessage(message, importance) {
	var zoneAffichage = document.getElementById("zoneAffichage");
	zoneAffichage.style.fontSize = "2em";
	(importance) ? zoneAffichage.style.color = "blue" : zoneAffichage.style.color = "red";
	zoneAffichage.innerHTML = message;
	document.getElementById("age").value="";
}

function afficheTable(e,numTable) {
	console.log("dans afficheTable");
	document.write("<div id='table" + numTable + "'> Table des " + numTable + "<br>");
	for(i=1;i<=10;i++) {
		document.write(numTable + " x " + i + " = " + (numTable * i));
	}
	document.write("</div>");
	console.log(e.charCode);
	if(e.charCode == 32) {
		numTable++;
		afficheTable(e,numTable);
	}
}
