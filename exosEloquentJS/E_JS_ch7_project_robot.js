const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
    ];
    
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if(graph[from] == null) {                   // if there is no key named graph[from]
            graph[from] = [to];                     // create a key value pair : (graph[from], [to])
        } else {
            graph[from].push(to);                   // if there is, add the value to the array within the key named graph[from]
        }
    }
    for(let [from, to] of edges.map(r => r.split("-"))) {   // split the array into a table of tables of 2 elements and iterate it 2 by 2
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

console.log(roadGraph);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if(!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) {
                    return p;
                }
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(       // The initial state describes the situation where the robot is
    "Post Office",                  // at the post office and the parcel is undelivered.
    [{place: "Post Office", address: "Alice's House"}]
);
// console.log(first);
let next = first.move("Alice's House");
// console.log(next);
console.log(next.place);            // Alice's House
console.log(next.parcels);          // []  // the move causes the parcel to be delivered
console.log(first.place);           //

function runRobot(state, robot, memory) {
    for(let turn = 0;; turn++) {
        if(state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
            console.log(`Moved to ${action.direction}`);
    }
}
// ===========================================================
// IF WE MAKE IT RANDOMLY
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for(let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while(place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
}

runRobot(VillageState.random(), randomRobot);

//===========================================================
// THE MAIL TRUCK'S ROUTE WAY   (or running twice a route that passes all places in the village)

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
    return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), routeRobot);