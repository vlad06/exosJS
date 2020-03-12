var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var topField = document.getElementById("gameField").offsetTop;
var rightField = document.getElementById("gameField").offsetWidth;
var bottomField = document.getElementById("gameField").offsetHeight;
var leftField = document.getElementById("gameField").offsetLeft;
var playerWidth = 80;
var playerHeight = 50;
var playerX = document.getElementById("thePlayer").offsetLeft;
var theplayer = document.getElementById("thePlayer");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	} else if(e.key == "Down" || e.key == "ArrowDown") {
		downPressed = true;
	} else if(e.key == "Up" || e.key == "ArrowUp") {
		upPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	} else if(e.key == "Down" || e.key == "ArrowDown") {
		downPressed = false;
	} else if(e.key == "Up" || e.key == "ArrowUp") {
		upPressed = false;
	}
}

function refreshScreen() {
	if(rightPressed) {
		$("#thePlayer").animate({ left: "+=20px"});
		// document.getElementById("thePlayer").offsetLeft += "20px";
		// console.log(document.getElementById("thePlayer").offsetLeft);
	} else if(leftPressed) {
		$("#thePlayer").animate({ left: "-=20px"});
	} else if(downPressed) {
		$("#thePlayer").animate({ top: "+=20px"});
	} else if(upPressed) {
		$("#thePlayer").animate({ top: "-=20px"});
	}
		
		// if(playerX + playerWidth > rightField) {
			// playerX = rightField - playerWidth;
		// }
	// }	
	console.log(rightPressed);

}
setInterval(refreshScreen, 10);