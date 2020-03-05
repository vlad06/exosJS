const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext('2d');
const unit = 15;	//the grid will be made of 15px squares, the cycles will also move 15px at a time

class Player {
	constructor(x, y, color) {
		this.color = color || "#FFF";	//color of the player
		this.dead = false;	//state of the player
		this.direction = "";	//direction the player is actually going in
		this.key = "";	//the last direction the player has tried to go in
		this.x = x;	//the player's coordinate at a given time
		this.y = y;
		this.startX = x; //player coordinates at the start
		this.startY = y;
		this.constructor.counter = (this.constructor.counter || 0) + 1;
		this.id = this.constructor.counter;	//gives each player a number, based on when they are initiated
		
		Player.allInstances.push(this);
	}
}

Player.allInstances = [];

let p1 = new Player(unit * 6, unit * 6, "blue");
let p2 = new Player(unit * 43, unit * 43, "red");
// let p3 = new Player(unit * 43, unit * 6, "green");
// let p4 = new Player(unit * 6, unit * 43, "orange");

function setKey(key, player, up, right, down, left) {
	switch(key) {
		case up:
			if(player.direction !== "DOWN") {
				player.key = "UP";
			}
			break;
		case right:
			if(player.direction !== "LEFT") {
				player.key = "RIGHT";
			}
			break;
		case down:
			if(player.direction !== "UP") {
				player.key = "DOWN";
			}
			break;
		case left:
			if(player.direction !== "RIGHT") {
				player.key = "LEFT";
			}
			break;
		default:
			break;
	}
}

function handleKeyPress(e) {
	let key = e.key;
	setKey(key, p1, "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft");
	setKey(key, p2, "z", "d", "s", "q");
	// setKey(key, p3, "i", "l", "k", "j");
	// setKey(key, p4, "8", "6", "5", "4");
}

document.addEventListener("keydown", handleKeyPress);

function getPlayableCells(canvas, unit) {
	let playableCells = new Set();
	for(let i = 0; i < canvas.width / unit; i++) {
		for(let j = 0; j < canvas.height / unit; j++) {
			playableCells.add(`${i * unit}x${j * unit}y`);
		}
	}
	return playableCells;
}

let playableCells = getPlayableCells(canvas, unit);

function drawBackground() {
	ctx.strokeStyle = "#001900";
	for(let i = 0; i <= canvas.width / unit + 2; i += 2) {
		for(let j = 0; j <= canvas.height / unit +2; j += 2) {
			ctx.strokeRect(0, 0, unit * i, unit * j);
		}
	}
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	for(let i = 1; i <= canvas.width / unit; i += 2) {
		for(let j = 1; j <= canvas.height / unit; j += 2) {
			ctx.strokeRect(0, 0, unit * i, unit * j);
		}
	}
	ctx.lineWidth = 1;
}

drawBackground();

function drawStartingPositions(players) {
	players.forEach(p => {
		ctx.fillStyle = p.color;
		ctx.fillRect(p.x, p.y, unit, unit);
		ctx.strokeStyle = "black";
		ctx.strokeRect(p.x, p.y, unit, unit);
	});
}

drawStartingPositions(Player.allInstances);
let outcome, winnerColor, playerCount = Player.allInstances.length;

function draw() {
	if(playerCount == 1) {
		const alivePlayers = Player.allInstances.filter(p => p.dead == false);
		outcome = `Player ${alivePlayers[0].id} wins!`;
	} else if(playerCount == 0) {
		outcome = "Draw!";
	}
	if(outcome) {
		createResultsScreen(winnerColor);
		clearInterval(game);
	}
	
	if(Player.allInstances.filter(p => !p.key).length == 0) {
		Player.allInstances.forEach(p => {
			if(p.key) {
				p.direction = p.key;
				ctx.fillStyle = p.color;
				ctx.fillRect(p.x, p.y, unit, unit);
				ctx.strokeStyle = "black";
				ctx.strokeRect(p.x, p.y, unit, unit);
				
				if(!playableCells.has(`${p.x}x${p.y}y`) && p.dead == false) {
					p.dead = true;
					p.direction = "";
					playerCount -= 1;
				}
				playableCells.delete(`${p.x}x${p.y}y`);
				
				if(!p.dead) {
					if(p.direction == "LEFT") p.x -= unit;
					if(p.direction == "UP") p.y -= unit;
					if(p.direction == "RIGHT") p.x += unit;
					if(p.direction == "DOWN") p.y += unit;
				}
			}
		});
	}
}

const game = setInterval(draw, 100);

function createResultsScreen(color) {
	const resultNode = document.createElement("div");
	resultNode.id = "result";
	resultNode.style.color = color || "#FFF";
	resultNode.style.position = "fixed";
	resultNode.style.top = 0;
	resultNode.style.display = "grid";
	resultNode.style.gridTemplateColumns = "1fr";
	resultNode.style.width = "100%";
	resultNode.style.height = "100vh";
	resultNode.style.justifyContent = "center";
	resultNode.style.alignItems = "center";
	resultNode.style.background = "#00000088";
	
	const resultText = document.createElement("h1");
	resultText.innerText = outcome;
	resultText.style.fontFamily = "Bungee, cursive";
	resultText.style.textTranform = "uppercase";
	
	const replayButton = document.createElement("button");
	replayButton.innerText = "Replay (Enter)";
	replayButton.style.fontFamily = "Bungee, cursive";
	replayButton.style.textTransform = "uppercase";
	replayButton.style.padding = "10px 30px";
	replayButton.style.fontSize = "1.2rem";
	replayButton.style.margin = "0 auto";
	replayButton.style.cursor = "pointer";
	replayButton.onclick = resetGame;
	
	resultNode.appendChild(resultText);
	resultNode.appendChild(replayButton);
	document.querySelector("body").appendChild(resultNode);
	
	document.addEventListener("keydown", (e) => {
		let key = e.keyCode;
		if(key == 13) {
			resetGame();
		}
	});
}

function resetGame() {
	if(result) {
		result.remove();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	playableCells = getPlayableCells(canvas, unit);
	Player.allInstances.forEach(p => {
		p.x = p.startX;
		p.y = p.startY;
		p.dead = false;
		p.direction = "";
		p.key = "";
	});
	playerCount = Player.allInstances.length;
	drawStartingPositions(Player.allInstances);
	outcome = "";
	winnerColor = "";
	clearInterval(game);
	game = setInterval(draw, 100);
}


	










