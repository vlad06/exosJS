//-------------
//Flattening
//--------------

let arrays = [[1, 2], [2, 3], [4, [5, 6, 7, 8, 11], 5]];

function flatDeep(arrays) {      //mise à "plat" d'un tableau de tableaux de manière récursive
    return arrays.reduce((a, b) => a.concat(Array.isArray(b) ? flatDeep(b) : b), []);    //pour les tableaux imbriqués de niveau X
}

console.log(arrays.reduce((flat, current) => flat.concat(current), []));      // pour les tableaux imbriqués de niveau 1  
console.log(flatDeep(arrays));                                               // pour les tableaux imbriqués de niveau X

function flatStack(input) {     //mise à plat d'un tableau de tableaux en utilisant une pile LIFO(a stack)
    const stack = [...input];   //(?? l'opérateur de décomposition met le tableau à plat directement ??)
    // console.log("stack : " + stack);
    const res = [];
    while(stack.length) {               // tant que la pile existe
        const next = stack.pop();       // on sort une valeur de la pile
        if(Array.isArray(next)) {       // si cette valeur est un tableau
            stack.push(...next);        // et décompose et on push sur la pile
        } else {                        // sinon
            res.push(next);             // on push la valeur
        }
    }
    return res.reverse();               //on inverse le résultat pour revenir à l'ordre de l'entrée
}

console.log(flatStack(arrays));

//---------------
//Your own loop
//----------------

function loop(value, testFn, updateFn, bodyFn) {
    if(testFn(value)) {
        bodyFn(value);
        loop(updateFn(value), testFn, updateFn, bodyFn);
    } else {
        return ;
    }
}

// function loop(start, test, update, body) {
//     for(let value = start; test(value); value = update(value)) {
//         body(value);
//     }
// }

loop(3, n => n > 0, n => n - 1, console.log);

//----------------
//Everything
//----------------

function every(array, predicateFn) {            // function every (loop version), return true if 
    for(let value of array) {                   // all elements of the list justify the predicate
        if(!predicateFn(value)) {
            return false;
        }
    }
    return true;
}

// the function every2 verify if there is no element in the array that doesn't justify
// the given predicate
function every2(array, predicateFn) {                       // function every (writen with Array.prototype.some)
    return !array.some(element => !predicateFn(element));
}

console.log(every2([1, 3, 5], n => n < 10));      // true
console.log(every2([2, 4, 16], n => n < 10));    // false
console.log(every2([], n => n < 10));             // true

//-----------------
// Dominant writing direction
//-----------------
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
//this function return the script if any of a given character code
function characterScript(code) {
	for(let script of SCRIPTS) {
		if(script.ranges.some(([from, to]) => {		//la méthode some teste si au moins un élément du tableau passe le test implémenté
			return code >= from && code < to;
		})) {
			return script;
		}
	}
	return null;
}

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

function dominantDirection(text) {
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";          
    }).filter(( { name } ) => name != "none");
    if(scripts.length > 1) {
        return scripts.reduce((a, b) => {
        return a.count < b.count ? b.name : a.name;
     })
    } else {
        return scripts[0].name;
    }

}

console.log(dominantDirection("Hello!"));               // ltr
console.log(dominantDirection("Hey, مساء الخير"));     // rtl
