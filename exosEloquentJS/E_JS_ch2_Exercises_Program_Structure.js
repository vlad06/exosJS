/*
LOOPING A TRIANGLE
Write a loop that makes seven calls to console.log to output the following triangle:
#
##
###
####
#####
######
#######
*/

for(let line = "#"; line.length < 8; line += "#") {
    console.log(line);
}

// FIZZBUZZ

// FIRST SOLUTION (standard)
for(let i = 1; i <= 100; i++) {
    if(i % 3 == 0 && i % 5 == 0) {
        console.log("FizzBuzz\n");
    } else if(i % 3 == 0) {
        console.log("Fizz\n");
    } else if(i % 5 == 0) {
        console.log("Buzz\n");
    } else {
        console.log(i+"\n");
    }
}

// SECOND SOLUTION (...)
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 == 0) output += "Fizz";
    if (n % 5 == 0) output += "Buzz";
    console.log(output || n);
}

// CHESSBOARD

console.log("SOLUTION 1 : ");
console.log("-----------------------");
let size = 8;
let output = "";

for(let i = 1; i <= size; i++) {
    for(let j = 1; j <= size; j++) {
        if(i % 2 == 0) {
            if(j % 2 == 0) {
                output += " ";
            } else {
                output += "#";
            }
            if(j % size == 0) {
                output += "\n";
            }
        } else {
            if(j % 2 == 0) {
                output += "#";
            } else {
                output += " ";
            }
            if(j % size == 0) {
                output += "\n";
            }
        }
    }
}
console.log(output);

console.log("SOLUTION 2 : ");
console.log("---------------------------------");
size = 8;
output = "";
for(let x = 0; x < size; x++) {
    for(let y = 0; y < size; y++) {
        if((x+y) % 2 == 0) {
            output += " ";
        } else {
            output += "#";
        }
    }
    output += "\n";
}
console.log(output);