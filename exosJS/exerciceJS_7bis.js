(function() {
	document.getElementById("controler").addEventListener("click", control);
}());

function control() {
	console.log("dans fonction control()");
	var texte = document.getElementById("mailToControl").value;
	switch(texte.length) {
		case 0:
			afficheErreur("Merci de saisir quelque chose !");
		break;
		case 1: 
		case 2:
		case 3:
		case 4:
			afficheErreur("Une adresse mail a une taille d'au moins 5 caractères : a@a.a ");
		break;
		default:
		//redirige le programme en fonction du choix de l'utilisateur
			document.getElementById("spanInfo").innerHTML="";
			document.getElementsByName("choixMethode")[0].checked ? fctRegEx(texte) : fctJs(texte);
		break;
	}
}

function fctRegEx(texte) {
	console.log("in the fctRegEx() function");
	var textTemp = texte;
	var regex =  RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	if(regex.test(textTemp)) {
		document.getElementById("spanInfo").innerHTML = "Votre adresse mail est valide !";
		document.getElementById("spanInfo").style.color="green";
	} else {
		afficheErreur("Adresse invalide");
	}
}

function fctJs(texte) {
	console.log("in the fctJs() function");
	var compteChar=0;
	if(testArobase(texte)) {
		if(testPoint(texte)) {
				if(testCaracteres(texte)) {
						document.getElementById("spanInfo").innerHTML = 
							"Votre adresse mail est valide !";
						document.getElementById("spanInfo").style.color="green";
				}
		}
	}
}

//contrôle de la présence, de l'unicité et de la position du @
// renvoie false si il y en à plusieurs, 
function testArobase(texte) {
	console.log("dans fonction testArobase()");
	var textTemp;
	var compteChar = 0;
	for(var i=0;i<texte.length;i++) {
		if(texte.charAt(i) == '@') {
			compteChar++;
		}
	}
	if(compteChar == 0) {
		afficheErreur("il doit y avoir au moins un '@' dans une adresse mail");
		return false;
	}
	if(compteChar > 1) {
		afficheErreur("il n'est pas possible qu'il y est plusieurs '@' dans une adresse mail");
		return false;
	}
	//on récupère le premier et le dernier caractères de la string passée en paramètre
	textTemp = texte.slice(0,1) + texte.slice(-1);
	if(textTemp[0] == '@' || textTemp[1] == '@') {
		afficheErreur("le '@' ne peut pas être le premier ou le dernier caractère d'une adresse mail");
		return false;
	}
	return true;
}
//contrôle de la présence et de la position du . sachant, qu'il ne peut être ni en début 
//ni en fin de chaîne, qu'il ne peut y en avoir qu'un seul après le '@' et qu'il ne doit 
//pas être situé immédiatement après le '@'
function testPoint(texte) {
	console.log("dans fonction testPoint()");
	var textTemp;
	var compteChar = 0;
	textTemp = texte.slice(0,1) + texte.slice(-1);
	if(textTemp[0] == '.' || textTemp[1] == '.') {
		afficheErreur("le . ne peut pas être le premier ou le dernier caractère d'une adresse mail");
		return false;
	}
	textTemp = texte.substring(texte.indexOf('@')+1);
	if(textTemp.charAt(0) == '.') {
		afficheErreur("le '.' ne peut être situé immédiatement après le '@' dans une adresse mail");
		return false;
	}
	for(var i=1;i<textTemp.length;i++){
		if(textTemp[i] == '.') {
			compteChar++;
		}
	}
	if(compteChar == 0) {
		afficheErreur("il doit y avoir au moins un '.' après le '@' dans une adresse mail");
		return false;
	}
	if(compteChar > 1) {
		afficheErreur("il n'est pas possible qu'il y est plusieurs '.' après le '@' dans une adresse mail");
		return false;
	}
	return true;
}

//test si les caractères présent sont uniquement des chiffres, lettres et underscore
function testCaracteres(texte) {
	console.log("dans fonction testCaracteres()");
	var strValid = "abcdefghijklmnopqrstuvwxyz_@.0123456789";
	for(var i=0;i<texte.length;i++) {
		if(strValid.indexOf(texte.charAt(i)) == -1) {
			afficheErreur("Une adresse mail valide est composée de lettres, chiffres et de '_'");
			return false;
		}
	}
	return true;
}

function afficheErreur(msg) {
	console.log("dans fonction erreur()");
	document.getElementById("spanInfo").innerHTML = msg;
	document.getElementById("spanInfo").style.color="red";
}

