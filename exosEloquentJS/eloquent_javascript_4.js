// function chicken() {
//   return egg();
// }
// function egg() {
//   return chicken();
// }
// console.log(chicken() + " came first :)"); //that's great

// const square = x => x*x;
// }
const square = function(x) {    //return the square of a number
  return x*x;
};

const horn = () => { console.log("Toot"); }
// const power = function(base, exponent) {    //return number^exponant
//   let result = 1;
//   for(let count = 0; count < exponent; count++) {
//     result *= base;
//   }
//   return result;
// }

//writing the function power with the arrow notation : 
const power = (base, exponent) => {
  let result = 1;
  for(let count = 0; count < exponent; count++){
    result *= base;
  }
  return result;
}

console.log(square(12));
console.log(power(2,10));

// const hummus = function(factor) {
//   const ingredient = function(amount, unit, name) {
//     let ingredientAmount = amount * factor;
//     if(ingredientAmount > 1) {
//       unit += "s";
//     }
//     console.log(`${ingredientAmount} ${unit} ${name}`);
//   };
//   ingredient(1, "can", "chickpeas");
//   ingredient(0.25, "cup", "tahini");
//   ingredient(0.25, "cup", "lemon juice");
//   ingredient(1, "clove", "garlic");
//   ingredient(2, "tablespoon", "olive oil");
//   ingredient(0.5, "teaspoon", "cumin");
// };

const hummus = (factor) => {
  const ingredient = (amount, unit, name) => {
    let ingredientAmount = amount * factor;
    if(ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};

hummus(2);
horn();

function minus(a, b) {
  return (b === undefined) ? -a : a-b;
}

console.log(minus(10));
console.log(minus(10, 5));

function squareOrPower(base, exponent = 2) {
  let result = 1;
  for(let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(squareOrPower(4));
console.log(squareOrPower(2, 6));

function drawSharpTriangle() {
   for(let i = "#"; i.length < 8; i += "#") {
      console.log(i);
   }
}

drawSharpTriangle();

function fizzBuzz() {
   for(let i = 1; i < 100; i++) {
      let output = "";
      if(!(i % 3)) output += "Fizz";
      if(!(i % 5)) output += "Buzz";
      console.log(output || i);
   }
}

fizzBuzz();

function wrapValue(n) {
   let local = n;
   return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());   //1
console.log(wrap2());   //2

function multiplier(factor) {
   return number => number * factor; // (number) => {return number * factor} OR function (number) { return number * factor}
}

let twice = multiplier(2);
let thrice = multiplier(3);
console.log(twice(10)); //20
console.log(thrice(10));//30

function findSolution(target) {
   function find(current, history) {
      if(current == target) {
         return history;
      } else if (current > target) {
         return null;
      } else {
         return find(current + 5, `(${history} + 5)`) ||
                find(current * 3, `(${history} * 3)`);
      }
   }
   return find(1, "1");
}

console.log(findSolution(24)); // (((1 * 3) + 5) * 3)
console.log(findSolution(6)); //(1 + 5)
console.log(findSolution(362));
