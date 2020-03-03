
const square = function(x) {    //return the square of a number
    return x*x;
};

const power = function(number, exponent) {    //return number^exponant
    let result = 1;
    for(let count = 0; count < exponent; count++) {
        result *= number;
    }
    return result;
}

console.log(square(12));
console.log(power(2,10));