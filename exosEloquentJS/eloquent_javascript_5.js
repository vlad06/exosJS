let mini = (a,b) => { return (a == b) ? "identical" : (a < b) ? a : b};

console.log(mini(5,12));
console.log(mini(1,0));
console.log(mini(5,5));

function isEven(number) {
    if(number == 0) {
        return true;
    } else if(number == 1) {
        return false;
    } else {
        return (number > 0) ? isEven(number - 2) : isEven(number + 2);
    }
}

console.log(isEven(50));    //true
console.log(isEven(75));    //false
console.log(isEven(-1));    //false
console.log(isEven(-28));   //true

let countBs = (string) => { 
    let counter = 0;
    for(let i = 0; i < string.length; i++) {
        if(string[i] === "B") {
            counter++;
        }
    }
    return counter;
}

console.log(countBs("ABCDEFGBBBBLMNOPB")); //6

let countChar = (string, char) => {
    let counter = 0;
    for(let i = 0; i < string.length; i++) {
        if(string[i] === char) {
            counter++;
        }
    }
    return counter;
}

let countBsBis = (string) => {
    return countChar(string, "B");
}

console.log(countBsBis("ABCDEFGBBBBLMNOPB")); //6