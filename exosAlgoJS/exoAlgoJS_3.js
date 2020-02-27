(function() {
	document.getElementById("lol").focus();
	document.getElementById("lol").style.position = "absolute";
	document.getElementById("lol").style.left = "-9000px";
	document.getElementById("lol").addEventListener('keypress', afficheTable);
	
}());
var numTable = 1;
var divAffichage = document.getElementById("affichage");

function afficheTable(e) {
	if(numTable=1) {
		divAffichage.innerHTML = 1;
		numTable++;
	}
	console.log("dans afficheTable");
	document.getElementById("lol").focus();
	console.log(e);
	// var b = document.body;
	// var para = document.createElement("P");
	// para.innerHTML = "This is a paragraph";
	// document.getElementById("affichage").appendChild(para);
		// for(i=1;i<=10;i++) {
		// document.write("<div id='table" + i + "'> Table des " + i + "<br>");
		// for(i=1;i<=10;i++) {
			// document.write(numTable + " x " + i + " = " + (numTable * i)+"<br>");
		// }
		divAffichage.innerHTML = numTable;
		// "<br>Appuyer sur espace pour continuer...<br>";
		console.log(e);
		if(e.charCode == 32) {
			document.getElementById("lol").value = "";
			afficheTable();
			console.log("coucou");
		}
	}
	
	// var newDiv = document.createElement('div');
	// var newH1 = document.createElement('h1');
	// var txt;
	// newDiv.textContent = b.append(document.createTextNode(
		// newH1.textContent = "Tables de multiplication"));
		// newDiv.inserHTML = "This is a test";
		// document.getElementById("affichage").appendChild(newDiv);
	// for(i=1;i<=10;i++) {
		// document.write("<div id='table" + i + "'> Table des " + i + "<br>");
		// for(i=1;i<=10;i++) {
			// document.write(numTable + " x " + i + " = " + (numTable * i)+"<br>");
		// }
		// document.getElementById("lol").focus();
		// document.write("<br>Appuyer sur espace pour continuer...<br>");
		// while(e.charCode != 32) {
			// console.log("coucou");
		// }
	// }
// }
