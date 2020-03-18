
//========================================================================================
//=============================     EXERCISES       ======================================
//========================================================================================
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
                                                    // 
        }
    }
    for(let [from, to] of edges.map(r => r.split("-"))) {   // split the array into a table of tables of 2 elements and iterate it 2 by 2
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

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

    static random(parcelCount = 5) {                            // create a random state with 5 parcels at random locations
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
}

function runRobot(state, robot, memory) {
    for(let turn = 0;; turn++) {
        if(state.parcels.length == 0) {
            // console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
            // console.log(`Moved to ${action.direction}`);
    }
}

// console.log("============================================================");
// console.log("=====================    RANDOM ROBOT   ====================");
// console.log("============================================================");

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

runRobot(VillageState.random(), randomRobot);

// console.log("==========================================================================");
// console.log("=========================   MAIL TRUCK ROBOT    ==========================");
// console.log("==========================================================================");

const mailRoute = [ 
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if(memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), routeRobot, []);

// console.log("==========================================================================");
// console.log("=========================   PATHFINDER ROBOT    ==========================");
// console.log("==========================================================================");

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

runRobot(VillageState.random(), goalOrientedRobot, []);

//--------------------------------------------------------------------------------------
// MEASURING A ROBOT

function compareRobots(firstRobot, secondRobot) {
	let firstResult = 0;
	let secondResult = 0;
	for(let i = 0; i < 100; i++) {
		let randomState = VillageState.random();
		firstResult += runRobot(randomState, firstRobot, []);
		secondResult += runRobot(randomState, secondRobot, []);
	}
	return {robotOne: firstResult / 100,
					robotTwo:	secondResult / 100};
}

console.log(compareRobots(randomRobot, routeRobot));
console.log(compareRobots(randomRobot, goalOrientedRobot));
console.log(compareRobots(routeRobot, goalOrientedRobot));

//---------------------------------------------------------------------------------------
