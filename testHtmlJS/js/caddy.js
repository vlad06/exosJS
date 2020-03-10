
//la fonction lignePanier sert à construire une nouvelle ligne dans le panier
function lignePanier(code, qte, prix) {
	this.codeArticle = code;
	this.qteArticle = qte;
	this.prixArticle = prix;
	this.ajouterQte = function(qte) {	this.qteArticle += qte;	} // qte => this.qteArticle += qte;
	this.getPrixLigne = function() { return this.prixArticle * this.qteArticle; } // () => return this.prixArticle * this.qteArticle
	this.getCode = function() { return this.codeArticle; }
}
//la fonction Panier() sert à la gestion du panier, 
function Panier() {	
	this.liste = [];
	this.ajouterArticle =	function(code, qte, prix) {
		var index = this.getArticle(code);
		index == -1 ? this.liste.push(new lignePanier(code, qte, prix)) :
									this.liste[index].ajouterQte(qte);
		}
	this.getPrixPanier = function() {
		var total = 0;
		for(var i = 0; i < this.liste.length; i++) {
			total += this.liste[i].getPrixLigne();
		}
		return total;
	}
	this.getArticle = function(code) {
		for(var i = 0; i < this.liste.length; i++) {
			if(code == this.liste[i].getCode()) {
				return i;
			}
		}
		return -1;
	}
	this.supprimerArticle = function(code) {
		var index = this.getArticle(code);
		if(index > -1) {
			this.liste.splice(index, 1);
		}
	}
}

function ajouter() {
			var code = parseInt(document.getElementById("id").value);			//on récupère l'id du produit à ajouter dans le panier
			var qte = parseInt(document.getElementById("qte").value);			//puis la quantité
			var prix = parseInt(document.getElementById("prix").value);		//et le prix
			var monPanier = new Panier();		//on construit un nouveau Panier
			
			monPanier.ajouterArticle(code, qte, prix);		//auquel on ajoute les prix saisis dans les textbox
			var tableau = document.getElementById("tableau");
			var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
			
			if(longueurTab > 0) {
				for(var i = longueurTab; i > 0; i--) {
					monPanier.ajouterArticle(
						parseInt(tableau.rows[i].cells[0].innerHTML),
						parseInt(tableau.rows[i].cells[1].innerHTML),
						parseInt(tableau.rows[i].cells[2].innerHTML)
					);
					tableau.deleteRow(i);
				}
			}
			
			var longueur = monPanier.liste.length;
			
			for(var i = 0; i < longueur; i++) {
				var ligne = monPanier.liste[i];
				var ligneTableau = tableau.insertRow(-1);
				var colonne1 = ligneTableau.insertCell(0);
				colonne1.innerHTML += ligne.getCode();
				var colonne2 = ligneTableau.insertCell(1);
				colonne2.innerHTML += ligne.qteArticle;
				var colonne3 = ligneTableau.insertCell(2);
				colonne3.innerHTML += ligne.prixArticle;
				var colonne4 = ligneTableau.insertCell(3);
				colonne4.innerHTML += ligne.getPrixLigne();
				var colonne5 = ligneTableau.insertCell(4);
				colonne5.innerHTML +=
					"<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\">" + 
					"<span class=\"glyphicon glyphicon-remove\"></span>Retirer</button>";
			}
			document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
			document.getElementById("nbreLignes").innerHTML = longueur;
		}
		
		function supprimer(code) {
			var monPanier = new Panier();
			var tableau = document.getElementById("tableau")
			var longueurTab = parseInt(document.getElementById("nbreLignes").innerHTML);
				
			if(longueurTab > 0) {
				for(var i = longueurTab; i > 0; i--) {
					monPanier.ajouterArticle(
						parseInt(tableau.rows[i].cells[0].innerHTML),
						parseInt(tableau.rows[i].cells[1].innerHTML),
						parseInt(tableau.rows[i].cells[2].innerHTML)
					);
					tableau.deleteRow(i);
				}
			}
			monPanier.supprimerArticle(code);
			var longueur = monPanier.liste.length;
				
			for(var i = 0; i < longueur; i++) {
				var ligne = monPanier.liste[i];
				var ligneTableau = tableau.insertRow(-1);
				var colonne1 = ligneTableau.insertCell(0);
				colonne1.innerHTML += ligne.getCode();
				var colonne2 = ligneTableau.insertCell(1);
				colonne2.innerHTML += ligne.qteArticle;
				var colonne3 = ligneTableau.insertCell(2);
				colonne3.innerHTML += ligne.prixArticle;
				var colonne4 = ligneTableau.insertCell(3);
				colonne4.innerHTML += ligne.getPrixLigne();
				var colonne5 = ligneTableau.insertCell(4);
				colonne5.innerHTML += 
					"<button class=\"btn btn-primary\" type=\"submit\" onclick=\"supprimer(this.parentNode.parentNode.cells[0].innerHTML)\">" + 
					"<span class=\"glyphicon glyphicon-remove\"></span>Retirer</button>";
			}
			document.getElementById("prixTotal").innerHTML = monPanier.getPrixPanier();
			document.getElementById("nbreLignes").innerHTML = longueur;
 }
	
		
				