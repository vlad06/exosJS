
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

// function arrayToList(array) {
    // let myList = {};
    // for(let i = array.length - 1; i >= 0; i--) {
			// if(!myList.value) {
				// myList = { value: array[i], rest: null };
			// } else {
				// myList = { value: array[i], rest: myList };
			// }
    // }
		// return myList;
// }

function arrayToList(array) {
	let myList = null;
	for(let i = array.length - 1; i >= 0; i--) {
		myList = { value: array[i], rest: myList };
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

function prepend(elt, list) {
    let myList = { value: elt, rest: list };
    return myList;
}

function nth(list, number) {
	let counter = 0;
	for( let node = list; node; node = node.rest) {
		if(counter == number) {
			return node.value;
		}
		counter++;
	}
	return undefined;
}

// function recurseNth(list, number) {
	// if(!list) {
		// return undefined;
	// } 
	// if(number == 0) {
		// return list.value;
	// } 
	// return recurseNth(list.rest, number-1);
// }	

function recurseNth(list, number) {
	if(!list) {
		return undefined;
	} else if(number == 0) {
		return list.value;
	} else return recurseNth(list.rest, number - 1);
}

	

	
console.log(arrayToList(["A", "B", "C"]));
console.log(list);
let newList = arrayToList(arr);
console.log(arrayToList(arr));
console.log(listToArray(list));
console.log(listToArray(newList));
let list1 = prepend(12,list);
console.log(list1);
let list2 = prepend("olol", list1);
console.log(list2);

console.log(nth(newList, 6));
console.log(recurseNth(newList, 6));
console.log(prepend(10, prepend(20, null)));
//----------------------------------------------------------------------------------

function deepEqual(firstValue, secondValue) {
	if(firstValue == secondValue) {
		return true;
	}
	if(firstValue == null || typeof firstValue != "object" || secondValue == null || typeof secondValue != "object") {
		return false;
	}
	if((Object.keys(firstValue)).length != (Object.keys(secondValue)).length) {
		return false;
	}
	for(let key of Object.keys(firstValue)) {
		if(!(Object.keys(secondValue).includes(key)) || !deepEqual(firstValue[key], secondValue[key])) {
			return false;
		}
	}
	return true;
}

// function deepEqual(a, b) {
  // if (a === b) return true;
  
  // if (a == null || typeof a != "object" ||
      // b == null || typeof b != "object") return false;

  // let keysA = Object.keys(a), keysB = Object.keys(b);

  // if (keysA.length != keysB.length) return false;

  // for (let key of keysA) {
    // if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  // }

  // return true;
// }
	console.log(deepEqual(arr, arr));
	console.log(Object.keys(newList));
	for(let key of Object.keys(newList)) {
		console.log(newList[key]);
	}
	console.log(deepEqual({ value: 1, rest: { value: 2, rest: { value: 3, rest: null}}}, list));
	console.log(deepEqual(6,"6"));
	console.log(deepEqual(list2, list2));
	console.log(deepEqual(newList, newList));
	console.log(Object.keys(newList));
	console.log("------------------------");

	let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// - true













