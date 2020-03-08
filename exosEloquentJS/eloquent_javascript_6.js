////---------------------------THE STORY OF THE WERESQUIRREL------------------------------------------

function addEntry(events, squirrel) {
   journal.push({events, squirrel});
}

function phi(table) {
   return (table[3] * table[0] - table[2] * table[1]) /
      Math.sqrt((table[2] + table[3]) * 
                (table[0] + table[1]) *
                (table[1] + table[3]) *
                (table[0] + table[2]));
}

//the function phi can be written like below
function phi([n00, n01, n10, n11]) {
   return (n11 * n00 - n10 * n01) /
      Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
}

function tableFor(event, journal) {
   let table = [0, 0, 0, 0];
   for(let i = 0; i < journal.length; i++) {
      let entry = journal[i], index = 0;  //the entry and the index are initialized at the beginning of each loop
      if(entry.events.includes(event)) {  //includes method that checks whether a given value exists in the array
         index +=1;  //if the entry contains the event
      }
      if(entry.squirrel) {
         index +=2;  //if the squirrel transformation is true for the given entry
      }
      table[index] += 1;   //we add the information in the table at the calculated index
   }
   return table;
}
// console.log(phi([76, 9, 4, 1]));
// console.log(tableFor("pizza", JOURNAL));
//tableFor[0] -> No squirrel, no pizza
//tableFor[1] -> No squirrel, pizza
//tableFor[2] -> Squirrel, no pizza
//tableFor[3] -> Squirrel, pizza

// for(let entry of JOURNAL) {
//    console.log(`${entry.events.length} events.`);
// }

function journalEvents(journal) {   //create a table with all the events from the JOURNAL
   let events = [];
   for(let entry of journal) {
      for(let event of entry.events) {
         if(!events.includes(event)) {
            events.push(event);
         }
      }
   }
   return events;
}

// console.log(journalEvents(JOURNAL)); 

// for(let event of journalEvents(JOURNAL)) {
//    console.log(event + ":", phi(tableFor(event, JOURNAL)));
// }

for(let event of journalEvents(JOURNAL)) {
   let correlation = phi(tableFor(event, JOURNAL));
   if(correlation > 0.1 || correlation < -0.1) {
      console.log(event + ":", correlation);
   }
}

for(let entry of JOURNAL) {
   if(entry.events.includes("peanuts") && !entry.events.includes("brushed teeth")) {
      entry.events.push("peanut teeth");
   }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));

//-----------------------------------------------------------------------------------------
//the first parameter of the slice method is inclusive, the second is exclusive
function remove(array, index) {
   return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove(["a", "b", "c", "d", "e"], 2));

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
console.log(words.join(". "));