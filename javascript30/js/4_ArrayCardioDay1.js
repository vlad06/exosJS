const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 
                'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 
                'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 
                'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 
                'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 
                'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 
                'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 
                'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 
                'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 
                'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 
                'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 
                'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 
                'Blair, Robert', 'Blair, Tony', 'Blake, William'];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const fifteenth = inventors.filter((inventor) => (inventor.year >= 1500 && inventor.year < 1600));
console.table(fifteenth);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const ifl = inventors.map((inventor) => `${inventor.first} ${inventor.last}`);
console.table(ifl);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

// const sortDesc = inventors.sort((firstInventor, secondInventor) => {
//   if(firstInventor.year > secondInventor.year) {
//     return 1;
//   } else {
//     return -1;
//   }
// });

const sortDesc= inventors.sort((a, b) => (a.year > b.year) ? 1 : -1);
console.table(sortDesc);

// Array.prototype.reduce()
// 4. How many years did all the inventors live?

const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
console.log(totalYears);

// 5. Sort the inventors by years lived
const yearsLived = inventors
  .map((inventor) => ({ firstname: inventor.first, lastname: inventor.last, length: `${(inventor.passed - inventor.year)} years`}) )
  .sort((a,b) => (a.length > b.length) ? 1 : -1);
console.table(yearsLived);

const shortest = inventors.sort((a, b) => ((a.passed - a.year) > (b.passed - b.year)) ? 1 : -1);
console.table(shortest);

const oldest = inventors.sort((a, b) => {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
console.table(oldest);

// 6. create a list of boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// the code for the 6th exercise is meant to be used on the wikipedia page

// /* The two following lines could be written like this:
//     var links = document.querySelectorAll(".mw-category a"); */
// var category = document.querySelector(".mw-category");
// var links = [...category.querySelectorAll("a")]; // transforming the nodeList in Array
// // links = Array.from(category.querySelectorAll("a")); // transforming the nodeList in Array
// var linkText = links
//       .map((link) => link.textContent) // we recuperate only the text
//       .filter((streetName) => streetName.includes("de"));

// 7. sort Exercise
// Sort the people alphabetically by last name

const sortPeople = people.sort((firstPeople, secondPeople) => {
  const [aFirst, aSecond] = firstPeople.split(", ");
  const [bFirst, bSecond] = secondPeople.split(", ");
  return aFirst > bFirst ? 1 : -1;
});
console.table(sortPeople);

// 8. reduce Exercise
// sum up the instances of each of these
const data = ["car", "car", "truck", "truck", "bike", "walk", "car", "van", "bike",
  "walk", "car", "van", "car", "truck"];

const transportation = data.reduce((obj, item) => {
  if(!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
console.log(transportation);