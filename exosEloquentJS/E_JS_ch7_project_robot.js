// ************************************************************************************
// *** The village of Meadowfield isn't very big. It consists of 11 places         ****
// *** with 14 roads between them. It can be described with this array of roads:   ****
// ************************************************************************************
const roads = [
    "Alice's House-Bob's House",
    "Alice's House-Cabin",
    "Alice's House-Post Office",
    "Bob's House-Town Hall",
    "Daria's House-Ernie's House",
    "Daria's House-Town Hall",
    "Ernie's House-Grete's House",
    "Grete's House-Farm",
    "Grete's House-Shop",
    "Marketplace-Farm",
    "Marketplace-Post Office",
    "Marketplace-Shop",
    "Marketplace-Town Hall",
    "Shop-Town Hall"
];

/* The function buildGraph construct an object that represents all the places that are accessible from a given place, 
   a given place is the key linked to a value, an array of places that are the accessible from this one 
   ex : from Alice's House, you can go to [Bob's House, Cabin, Post Office] that's all */
function buildGraph(edges) {
    let graph = Object.create(null);            // graph is created as a null Object
    function addEdge(from, to) {
        if(graph[from] == null) {               // if there is no key named graph[from]
            graph[from] = [to];                 // create a new key/value pair (ex : graph[Alice's House] = ["Bob's House"])
        } else {                                // it'll look like : {"alice's": ["bob's", "cabin"], "bob's": ["townHall"], and so on ..... }
            graph[from].push(to);               // if the key already exist, add the value to the array where the key is named graph[from]
        }
    }
    for(let [from, to] of edges.map(r => r.split("-"))) {   // split the roads array into a table of tables of 2 elements
        addEdge(from, to);                                  // add or modify a key/value pair of the graph object : graph[from] = [to] or graph[from].push(to)
        addEdge(to, from);                                  // add or modify a key/value pair of the graph object : graph[to] = [from] or graph[to].push(from)
    }
    return graph;                               // return the completed object
}

const roadGraph = buildGraph(roads);

// console.log(roads.map(r => r.split("-")));
console.log(roadGraph);
// console.log(Object.keys(roadGraph));

/* The VillageState define where the robot is in the village and where the parcels are distributed
    it also define a function random for creating a table of parcel at different locations in the village, with different delivery addresses
    the function move simulate the movements of the robot from a place to the next */
class VillageState {
    constructor(place, parcels) {
        this.place = place;             // address where the robot is in the village
        this.parcels = parcels;         // parcel table [{place: "whereTheParcelIs", address: "parcelDeliveryAdress"}, {place: "bla", address: "bli"}, etc...] 
    }

    /* the method move return a new VillageState with an updated destination and updated parcels, the update is done if the destination can be joined from 
        the current emplacement of the robot. If the robot has currently parcels with him (the same place), it takes it with him along the way so 
        the destination address of the parcels with the robots are changed for the same destination the robot is going next */
    move(destination) {
        if(!roadGraph[this.place].includes(destination)) {  // if the destination address is not in the array at the this.place key ex: {PostOffice: [address1, address2]}
            return this;                                    
        } else {
            let parcels = this.parcels.map(p => {   // mapping the array searching 
                if(p.place != this.place) {         // if the address parcel is not at the current robot place (robot address)
                    return p;                       // don't touch it
                }
                return {place: destination, address: p.address}; // else the parcel is given the same destination address as the robot (it takes it whith him)
            }).filter(p => p.place != p.address);   // we keep the parcels that have different actual place and delivery address
            return new VillageState(destination, parcels);  // we return the new villageState with the updated destination and updated parcels
        }
    }

    static random(parcelCount = 5) {                            // create a random village state with 5 parcels at random locations
        let parcels = [];
        for(let i = 0; i < parcelCount; i++) {                  // create as much parcels as parcelcount is defined
            let address = randomPick(Object.keys(roadGraph));   // Object.keys(roadGraph) is a table of the keys of the object roadGraph
            let place;
            do {
                place = randomPick(Object.keys(roadGraph));     // return a random element(address) of the table of keys in the object roadGraph
            } while(place == address);                          // while the place and the adress are the same it continue, because the delivery address
            parcels.push({place, address});                     // and place of a parcel must be different, then the parcel is added to the table parcels
        }
        return new VillageState("Post Office", parcels);        // return the village state freshly created, the beginning point is "Post Office"
    }
}

// let first = new VillageState(
//     "Post Office",                                      // The robot will begin at the Post Office
//     [{place: "Post Office", address: "Alice's House"}]  // the parcel is at the Post Office and must be delivered to Alice's House
// );
// let next = first.move("Alice's House");
// console.log("first : ");
// console.log(first);
// console.log(first.place);           // Post Office
// console.log(first.parcels);         // [{place: "Post Office", address: "Alice's House"}]
// console.log("next : ");
// console.log(next);
// console.log(next.place);            // Alice's House
// console.log(next.parcels);          // []  // the move causes the parcel to be delivered

/* this function takes a villageState, a robot, and a memory */
function runRobot(state, robot, memory) {
    for(let turn = 0;; turn++) {                 // infinite loop with turn counter
        if(state.parcels.length == 0) {                     // if the robot has delivered all the parcels
            console.log(`Done in ${turn} turns`);           // show how many turns that take
            break;                                          // break the loop
        }
        let action = robot(state, memory);                  // the robot return the place where it'll move and 
            state = state.move(action.direction);           
            memory = action.memory;
            console.log(`Moved to ${action.direction}`);
    }
}

console.log("============================================================");
console.log("=====================    RANDOM ROBOT   ====================");
console.log("============================================================");
// ===========================================================
// IF WE MAKE IT RANDOMLY
// The randomPick function return an element at a random position in an array
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};     // return the next random possible location where the robot will go
}

var randomVillageState = VillageState.random();
console.log(randomVillageState);
console.log(randomVillageState.parcels);
runRobot(randomVillageState, randomRobot);
// runRobot(VillageState.random(), randomRobot);

console.log("==========================================================================");
console.log("=========================   MAIL TRUCK ROBOT    ==========================");
console.log("==========================================================================");
//===========================================================
// THE MAIL TRUCK'S ROUTE (or running twice a route that passes all places in the village)

// below is such a route (starting from the post office)
const mailRoute = [ 
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

// To implement the route-following robot, we'll need to make use of robot memory. The robot keeps
// the rest of its route in its memory and drops the first element every turn.

function routeRobot(state, memory) {
    if(memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)}; // return the next destination of the robot and his updated memory
}

console.log(randomVillageState.parcels);
runRobot(randomVillageState, routeRobot, []);
// runRobot(VillageState.random(), routeRobot, []);

console.log("==========================================================================");
console.log("=========================   PATHFINDER ROBOT    ==========================");
console.log("==========================================================================");
//================================================================
// PATHFINDING

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for(let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for(let place of graph[at]) {
            if(place == to) {
                return route.concat(place);
            }
            if(!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if(route.length == 0) {
        let parcel = parcels[0];
        if(parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

console.log(randomVillageState.parcels);
runRobot(randomVillageState, goalOrientedRobot, []);
// runRobot(VillageState.random(), goalOrientedRobot, []);
