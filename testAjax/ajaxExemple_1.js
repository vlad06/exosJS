
var indice = 1;									// Indice sert à déterminer quel fichier texte sera appelé avec Ajax, le 1 est le premier fichier

/*	La méthode Function.prototype.bind() nous permet de passer une fonction à un listener 
		avec des paramètres sans l'appeler directement. */
document.getElementById("theButton").addEventListener("click", loadDoc.bind(null, "infos_1.txt", callXhr));	

function loadDoc(url, fct) {
	// console.log("loadDoc");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		
		// let cloneXhr = JSON.parse(JSON.stringify(xhr));	// ne fonctionne pas
		// let cloneXhr = Object.assign({}, xhr);			// ne fonctionne pas
		// let cloneXhr = xhr.clone();						// ne fonctionne pas
		// console.log(cloneXhr);
		console.log(clonage(xhr));
		// console.log(xhr)

		// console.log(xhr);
		if (this.readyState == 4 && this.status == 200) {
			fct(this);								// on appelle la fonction callXhr qui va faire la modification des éléments sur la page html
		}
	};
	xhr.open("GET", url, true);
	xhr.send();
}

function callXhr(xhr) {
	// console.log("callXhr" + indice);
	document.getElementById("zoneNotif").innerHTML = xhr.responseText;
	indice = (indice == 1) ? 2 : 1																		// ici on oscille entre deux fichiers mais on peut en appeler autant que l'on veut
	let url = "infos_" + indice + ".txt";															// (par exemple des photos) en faisant varier l'indice 

	/*	On doit redéfinir un listener à chaque fois car chaque fichier texte appelé écrase toute la zone précédente, 
			dont le bouton sur lequel l'ancien listener était appliqué.
			Qui plus est il faut aussi passer au listener l'url du nouveau fichier à aller chercher. */
	document.getElementById("theButton").addEventListener("click", loadDoc.bind(null, url, callXhr));
}

function clonage(xhrObj) {
	let theClone = {};
	theClone.onreadystatechange = xhrObj.onreadystatechange;
	theClone.readyState = xhrObj.readyState;
	theClone.timeout = xhrObj.timeout;
	theClone.withCredentials = xhrObj.withCredentials;
	theClone.upload = xhrObj.upload;
	theClone.status = xhrObj.status;
	theClone.statusText = xhrObj.statusText;
	theClone.responseType = xhrObj.responseType;
	theClone.response = xhrObj.response;
	theClone.responseText = xhrObj.responseText;
	theClone.responseXML = xhrObj.responseXML;
	theClone.onloadstart = xhrObj.onloadstart;
	theClone.onprogress = xhrObj.onprogress;
	theClone.onabort = xhrObj.onabort;
	theClone.onerror = xhrObj.onerror;
	theClone.onload = xhrObj.onload;
	theClone.ontimeout = xhrObj.ontimeout;
	theClone.onloadend = xhrObj.onloadend;

	return theClone;

}