//données pour le canvas
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");
//le score et les vies du joueur
var score = 0;
var lives = 3;
//données pour les briques
var brickRowCount = 3;//3
var brickColumnCount =  7;//5
var brickWidth = 165;//75
var brickHeight = 40;//20
var brickPadding = 10;//10
var brickOffsetTop = 30;//30
var brickOffsetLeft = 30;//30
//on déclare un tableau pour contenir les briques et on le construit
var bricks = [];
for(var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for(var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}
//données de la balle
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 6;	//2
var dy = -6;	//-2
//données du paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
//données pour le déplacement du paddle
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}

function keyDownHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}	

function collisionDetection() {
	for(var c = 0; c < brickColumnCount; c++) {
		for(var r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy *= -1;
					b.status = 0;
					score++;
					if(score == brickColumnCount * brickRowCount) {
						alert("YOU WIN, CONGRATZ!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawBricks() {
	for(var c = 0; c < brickColumnCount; c++) {
		for(var r = 0; r < brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	
	if(y + dy < ballRadius) {
		dy *= -1;
	}	else if(y + dy > canvas.height - ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy *= -1;
		}	else {
			lives--;
			if(!lives) {
				alert("GAME OVER");
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 6; //2
				dy = - 6; //-2
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}
	
	if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx *= -1;
	}
	x += dx;
	y += dy;
	//déplacement du paddle avec les touches du clavier
	if(rightPressed) {
		paddleX += 7;
		if(paddleX + paddleWidth > canvas.width) {
			paddleX = canvas.width - paddleWidth;
		}
	}
	else if(leftPressed) {
		paddleX -= 7;
		if(paddleX < 0) {
			paddleX = 0;
		}
	}
	requestAnimationFrame(draw);
}
draw();

