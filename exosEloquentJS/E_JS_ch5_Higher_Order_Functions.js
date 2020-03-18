
// function repeat(n, action) {
	// for(let i = 0; i < n; i++) {
		// action(i);
	// }
// }

repeat(3, console.log);

//We don't have to pass a predefined function to repeat. Often, it is easier to
//create a function value on the spot instead.
let labels = [];
repeat(5, i => {
	labels.push(`Unit ${i + 1}`);
});

console.log(labels);

//HIGHER-ORDER FUNCTIONS
//they allow us to abstract over actions, not just values.
//They come in several forms. 
//For example, we can have functions that create new functions.

// function greaterThan(n) {
	// return (function(m) {
		// return m > n;
	// });
// }

function greaterThan(n) {
	return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

// And we can have functions that change other functions.
function noisy(f) {
	return (function(...args) {
		console.log("calling with", args);
		let result = f(...args);
		console.log("called with", args, ", returned", result);
		return result;
	});
}

// function noisy(f) {
	// return (...args) => {
		// console.log("calling with", args);
		// let result = f(...args);
		// console.log("called with", args, ", returned", result);
		// return result;
	// };
// }

noisy(Math.min)(3, 2, 1);

// We can even writes functions that provide new types of control flow

function unless(test, then) {
	if(!test) then();
}

function repeat(n, action) {
	for(let i = 0; i < n; i++) {
		action(i);
	}
}

repeat(5, n => {
	unless(n % 2 == 1, () => {
		console.log(n, "is even");
	});
});

// There is a built-in array method, forEach, that provides something like a 
// for /of loop as a higher-order function
["A", "B", "C", "D"].forEach(val => console.log(val));

//============================
// Filtering arrays
//============================

function filter(array, test) {
	let passed = [];
	for(let element of array) {
		if(test(element)) {
			passed.push(element);
		}
	}
	return passed;
}
console.log("le tableau SCRIPTS filtré, les scripts encore utilisé de nos jours :");
console.log(filter(SCRIPTS, script => script.living));	//appel de la fonction filter définie juste au dessus
console.log("le tableau SCRIPTS filtré, les scripts top to bottom : ");
console.log(SCRIPTS.filter(s => s.direction =="ttb"));	//appel de la fonction Array.prototype.filter() interne au lanquage javascript
														// qui va retourner un tableau contenant tous les scripts se lisant de haut en bas (TopToBottom)

//============================
// Transforming with map
//============================

function map(array, transform) {
	let mapped = [];
	for(let element of array) {
		mapped.push(transform(element));
	}
	return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");		//rtlScripts prend la valeur de tous les scripts du tableau se lisant de droite à gauche (RightToLeft)
console.log("SCRIPTS filtré pour récupérer les scripts right to left puis mappé pour ne récupérer que leur nom : ");
console.log(map(rtlScripts, s => s.name));						//appel de la fonction map définie juste au dessus

// Like forEach and filter, map is a standard array method

//============================
// Summarizing with reduce
//============================

function reduce(array, combine, start) {
	let current = start;
	for(let element of array) {
		current = combine(current, element);
	}
	return current;
}
console.log("somme d'un tableau d'entier [1, 2, 3, 4, 5] avec la fonction reduce : ");
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0));			//appel de la fonction reduce définie juste au dessus

//To use reduce (twice) to find the script with the most characters, we can write something like this:

function characterCount(script) {				//appel de la fonction Array.prototype.reduce(callback, valeurInitiale)
	//retourne une table avec la somme des "ranges" de la table SCRIPT
	return script.ranges.reduce((count, [from, to]) => { return count + (to - from); }, 0);			
}

console.log(SCRIPTS.reduce((a, b) => {
	return characterCount(a) < characterCount(b) ? b : a;
}));

//-------------------------------------
//-------COMPOSABILITY
//-------------------------------------

function average(array) {
	return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(							//retourne la moyenne de l'année d'apparition des scripts encore vivant
	SCRIPTS.filter(s => s.living).map(s => s.year))));

console.log(Math.round(average(
	SCRIPTS.filter(s => !s.living).map(s => s.year))));	//retourne la moyenne de l'année d'apparition des scripts qui ne sont plus vivants

//the same thing can be made like this : 

let total = 0, count = 0;
for(let script of SCRIPTS) {
	if(script.living) {
		total += script.year;
		count += 1;
	}
}
console.log(Math.round(total / count));

//========================================
//	Strings and character codes
//========================================

function characterScript(code) {	//this function return the script if any of a given character code
	for(let script of SCRIPTS) {
		if(script.ranges.some(([from, to]) => {		//la méthode some teste si au moins un élément du tableau passe le test implémenté
			return code >= from && code < to;
		})) {
			return script;
		}
	}
	return null;
}

console.log(characterScript(121));

//each of these emoji uses two-unit characters
let horseShoe = "🐴👟";
let monkey = "🐵";
console.log(horseShoe.length);			// 4
console.log(horseShoe[0]);				// invalid half-character
console.log(horseShoe.charCodeAt(0));	// code of the half-character	55357
console.log(horseShoe.codePointAt(0));	// code for horse emoji		128052
console.log(monkey.codePointAt(0));		// code for monkey emoji	128053

//JavaScript's charCodeAt method return a code unit, not a full character code.
//The codePointAt method return a full Unicode character.

let roseDragon = "🌹🐉";
for (let char of roseDragon) {
console.log(char);
}

//=======================================
//	Recognizing text
//=======================================

// The countBy function expects a collection and a function that computes a 
// group name for a given element
function countBy(items, groupName) {
	let counts = [];
	for(let item of items) {
		let name = groupName(item);
		let known = counts.findIndex(c => c.name == name);
		if(known == -1) {
			counts.push({name, count: 1});
		} else {
			counts[known].count++;
		}
	}
	return counts;
}
//the function passed to countBy here computes a group name like true or false
console.log(countBy([1, 2, 3, 4, 5], n => n > 2));				// [{name: false, count: 2}, {name: true, count: 3}]

function textScripts(text) {
	let scripts = countBy(text, char => {
		let script = characterScript(char.codePointAt(0));
		return script ? script.name : "none";					//si un caractère appartient à un script, il est nommé et incrémenté
	}).filter(({name}) => name != "none");						//on enlève du tableau tous les caractères n'ayant pas de nom
	// console.log(scripts);
	let total = scripts.reduce((n, {count}) => n + count, 0);	//on fait la somme des caractères contenus dans le tableau scripts
	if(total == 0) {
		return "No scripts found";
	}
	return scripts.map(({name, count}) => {
		return `${Math.round(count * 100 / total)}% ${name}`;
	}).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));		//61% Han, 22% Latin, 17% Cyrillic
console.log(textScripts("社団法人、財団法人な"));						//89% Han, 11% Hiragana
console.log(textScripts("Развлекательная olol социальная"));		//86% Cyrillic, 14% latin
console.log(textScripts("だ, ば, ぱ. ア, カ, サ, タ, ナ, ハ"));		//33% Hiragana, 67% Katakana