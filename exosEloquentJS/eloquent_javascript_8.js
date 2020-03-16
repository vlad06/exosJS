//Methods

let rabbit = {};
// rabbit.name = "Roger";
rabbit.speak = function(line) {
    console.log(`the rabbit says '${line}`);
};
// rabbit.fart = function(shit) {
//     console.log(`the rabbit farted ${shit}`);
// };

console.log(rabbit);
rabbit.speak("I'm alive.");
// rabbit.fart("ouch, what a shitty smell");

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " + "");