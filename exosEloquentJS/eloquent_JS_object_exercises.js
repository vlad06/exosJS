
function range(start, end, step = 1) {
    let table = new Array();
    if(step < 0) {
        for(let i = start; i >= end; i += step) {
            table.push(i);
        }
    } else {
        for(let i = start; i <= end; i += step) {
            table.push(i);
        }
    }
    return table;
}

function sum(table) {
    let theSum = 0;
    for(let i = 0; i < table.length; i++) {
        theSum += table[i];
    }
    return theSum;
}

let theSum = (table) => {
    let total = 0;
    for(let value of table){
        total += value;
    }
    return total;
}

// console.log(sum(range(1, 10)));
// console.log(range(1, 10, 2));
// console.log(range(5, 2, -1));
// console.log(theSum(range(5, 2, -1)));

////----------------------------------------------------------------------------
function reverseArray(array) {
    let myArray = [];
    for(let i = array.length - 1; i >= 0; i--) {
        myArray.push(array[i]);
    }
    return myArray;
}

function reverseArrayInPlace(array) {
    let temp = 0;
    for(let i = 0; i < Math.floor(array.length) / 2; i++) {
        temp = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = temp;
    }
    return array;
}
// console.log(reverseArray([1, 2, 3, 4, 5]));
// console.log(reverseArrayInPlace([6, 7, 8, 9, 10]));
// console.log(reverseArrayInPlace(["A", "B", "C", "D", "E", "F"]));

////---------------------------------------------------------------------------
let list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null}}};
let arr = [1, 2, 3, 4, 5, 6, 7];

function arrayToList(array) {
    let myList = {};
    for(let i = array.length - 1; i >= 0; i--) {
			if(!myList.value) {
				myList = { value: array[i], rest: null };
			} else {
				myList = { value: array[i], rest: myList };
			}
    }
		return myList;
}

// function listToArray(list) {
	// let myArray = [];
	// myList = list;
	// while(true) {
		// if(myList) {
			// myArray.push(myList.value);
		// } else {
			// return -1;
		// }
		// if(myList.rest == null) {
			// break;
		// }
		// myList = myList.rest;
	// }
	// return myArray;
// }

function listToArray(list) {
	let myArray = [];
	for(let node = list; node; node = node.rest) {
		myArray.push(node.value);
	}
	return myArray;
}
	
	
console.log(arrayToList(["A", "B", "C"]));
console.log(list);
// let secondLevelList = list.rest;
// console.log(secondLevelList);
// let thirdLevelList = secondLevelList.rest;
// console.log(thirdLevelList);
let newList = arrayToList(arr);
console.log(arrayToList(arr));
console.log(listToArray(list));
// console.log(listToArray(newList));






















