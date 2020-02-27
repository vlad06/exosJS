// function testArgs(a) { 
	// console.log("arg[0] : "+arguments[0]);
	// console.log("arg[1] : "+arguments[1]);
// }
// testArgs();
// testArgs(4);
// testArgs(4,5);

function perimetre() {
	// var args = Array.prototype.slice.call(arguments); // déconseillée
	var args = Array.from(arguments);	// méthode Array.from()
	// var args = [...arguments]; // opérateur de décomposition
	console.log("args : " + args);
	switch(args.length) {
		case 0:
			console.log("Erreur !! Veuillez saisir un nombre !");
			break;
		case 1:
			console.log("périmètre du carré : " + args[0]*4); //pour un carré
			break;
		case 2:
			console.log("périmètre du rectangle : " + (args[0]+args[1])*2); //pour un rectangle
			break;
		case 3:
			console.log("périmètre du triangle : " + (args[0]+args[1]+args[2])); //pour un triangle
			break;
		default:
			var sum=0;
			for(var i in args) {	//pour un polygone
					sum+=args[i];	
				}
			console.log("périmètre du polygone à " + args.length + " côtés : " + sum);
	}
}
perimetre();
perimetre(4);
perimetre(2,4);
perimetre(2,4,6);
perimetre(2,4,6,10);
perimetre(12,4,44,23,54,54);
perimetre(12,544,1,456,1854,531,534,53153,453,486,135);
	