
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

console.log(filter(SCRIPTS, script => script.living));	//appel de la fonction filter définie juste au dessus

console.log(SCRIPTS.filter(s => s.direction =="ttb"));	//appel de la fonction Array.prototype.filter() interne au lanquage javascript

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

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));									//appel de la fonction map définie juste au dessus

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

console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b, 0));			//appel de la fonction reduce définie juste au dessus

//To use reduce (twice) to find the script with the most characters, we can write something like this:

function characterCount(script) {
	return script.ranges.reduce((count, [from, to]) => {				//appel de la fonction Array.prototype.reduce(callback, valeurInitiale)
		return count + (to - from);
	}, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
	return characterCount(a) < characterCount(b) ? b : a;
}));
















