// METHODS

let rabbit = {};
rabbit.name = "Roger";
rabbit.speak = function(line) {
    console.log(`the rabbit says '${line}`);
};
rabbit.fart = function(shit) {
    console.log(`the rabbit farted, '${shit}'`);
};

console.log(rabbit);
rabbit.speak("I'm alive.");
rabbit.fart("ouch, what a shitty smell!");

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.");

speak.call(hungryRabbit, "Burp!");          // Function.prototype.call(thisArg, args[]);

function normalize() {
    console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});

// PROTOTYPES

let empty = {};
console.log(empty.toString);        // function toString() { [native code]}
console.log(empty.toString());      // [object Object]
console.log(empty);                 // {}  > __proto__: Object

console.log(Object.getPrototypeOf({}) == Object.prototype);             // true
console.log(Object.getPrototypeOf(Math.max) == Function.prototype);     // true
console.log(Object.getPrototypeOf([]) == Array.prototype);              // true

let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
// let killerRabbit = Object.create(protoRabbit);
// killerRabbit.type = "killer";
// killerRabbit.speak("SKREEEE!");

// CLASSES

function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let lolRabbit = makeRabbit("lol");
lolRabbit.speak("olol");

// function Rabbit(type) {
//     this.type = type;
// }
// Rabbit.prototype.speak = function(line) {
//     console.log(`The ${this.type} rabbit says '${line}'`);
// };

// let weirdRabbit = new Rabbit("weird");
// console.log(weirdRabbit);

// console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);

// CLASS NOTATION

class Rabbit {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());          // hello

// OVERRIDING DERIVED PROPERTIES

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);                // small
killerRabbit.teeth = "long, sharp, and bloody"; 
console.log(killerRabbit.teeth);                // long, sharp, and bloody
console.log(blackRabbit.teeth);                 // small
console.log(Rabbit.prototype.teeth);            // small

console.log("Array.prototype.toString == Object.prototype.toString : ");
console.log(Array.prototype.toString == Object.prototype.toString);

console.log([1, 2].toString()); // 1,2 // Calling toString on a array is similar to calling .join(",") on it

console.log(Object.prototype.toString.call([1, 2]));    // [object Array]

// MAPS
// A map (noun) is a data structure that associates values (the keys) with other values.

// let ages = {    // For example, it is possible to map names to ages
//     Boris: 39,
//     Liang: 22,
//     Jùlia: 62
// };

// console.log(`Jùlia is ${ages["Jùlia"]}`);                           // Jùlia is 62
// console.log("Is Jack's age known?", "Jack" in ages);                // Is Jack's age known? false
// We certainly didn't list anybody named toString in our map.
// Yet, because plain objects derive from Object.prototype, 
// it looks like the property is there.
// console.log("Is toString's age known?", "toString" in ages);        // Is toString's age known? true

// There are several possible way to avoid this problem.
// First, it is possible to create objects with no prototype.
// If you pass null to Object.create, the resulting object will not derive
// from Object.prototype and can safely be used as a map

console.log("toString" in Object.create(null));     // false

// Object property names must be strings. If you need a map whose keys can't easily be converted 
// to strings - such as objects - you cannot use an object as your map.
// Fortunately, JavaScript comes with a class called Map that is written for this exact purpose.
// It stores a mapping and allows any type of keys.

let ages = new Map();
ages.set("Boris", 39);              // Map.prototype.set()
ages.set("Liang", 22);
ages.set("Jùlia", 62);

console.log(`Jùlia is ${ages.get("Jùlia")}`);                           // Jùlia is 62                      // Map.prototype.get()
console.log("Is Jack's age known?", ages.has("Jack"));                // Is Jack's age known? false         // Map.prototype.has()
console.log("Is toString's age known?", ages.has("toString"));        // Is toString's age known? false

// If you do have a plain object that you need to treat as a map for some reason, it is useful to 
// know that Object.keys returns only an object's own keys, not those in the prototype.
// As an alternative to the in operator, you can use the hasOwnProperty method, which ignores the object's prototype

console.log({x: 1}.hasOwnProperty("x"));        // true
console.log({x: 1}.hasOwnProperty("toString")); // false

// POLYMORPHISM

Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));           // a black rabbit

// SYMBOLS
// It is not entirely accurate that property names are strings, they can also be symbols.
// Symbols are values created with the Symbol function.
// Unlike strings, newly created symbols are unique - you cannot create the same symbol twice.

let sym = Symbol("name");
console.log(sym == Symbol("name"));         // false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);              // 55

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());             // 1, 2
console.log([1, 2][toStringSymbol]());      // 2 cm of blue yarn

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());

// THE ITERATOR INTERFACE

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());                 // {value: "O", done: false}
console.log(okIterator.next());                 // {value: "K", done: false}
console.log(okIterator.next());                 // {value: undefined, done: true}

// Let's implement an iterable data structure. We'll build a matrix class, acting as a two-dimensional array.
console.log("=====================MATRIX DATA STRUCTURE========================");
class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];
    
        for(let y = 0; y < height; y++) {                       // rows
            for(let x = 0; x < width; x++) {                    // columns
                this.content[y * width + x] = element(x, y);    // flatening the matrix to store element(x, y) in the table content
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if(this.y == this.matrix.height) {
            return {done: true};
        }
        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };
        this.x++;
        if(this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for(let {x, y, value} of matrix) {
    console.log(x, y, value);
}

// GETTERS, SETTERS, AND STATICS    page 123

let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};

console.log(varyingSize.size);
console.log(varyingSize.size);