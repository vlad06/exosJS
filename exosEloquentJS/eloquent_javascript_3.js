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