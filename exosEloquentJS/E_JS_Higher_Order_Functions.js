//Flattening

let array = [[1, 2], [2, 3], [4, [5, 6, 7, 8, 11], 5]];

function flatDeep(array) {      //mise à "plat" d'un tableau de tableaux de manière récursive
    return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);    //pour les tableaux imbriqués de niveau X
}
console.log(array.reduce((a, b) => { return a.concat(b) } ));   //pour les tableaux imbriqués de niveau 1
console.log(flatDeep(array));

function flatStack(input) {     //mise à plat d'un tableau de tableaux en utilisant une pile LIFO(a stack)
    const stack = [...input];   //(?? l'opérateur de décomposition met le tableau à plat directement ??)
    console.log("stack : " + stack);
    const res = [];
    while(stack.length) {
        const next = stack.pop();       //on sort une valeur de la pile
        if(Array.isArray(next)) {
            stack.push(...next);        //on place les éléments qui sont des tableaux dans
        } else {                        //la pile sans modifier l'entrée
            res.push(next);
        }
    }
    return res.reverse();               //on inverse le résultat pour revenir à l'ordre de l'entrée
}

console.log(flatStack(array));