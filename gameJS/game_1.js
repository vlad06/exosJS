//données pour le canvas
var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");
//le score et les vies du joueur
var score = 0;
var lives = 3;
//données pour les briques //les commentaires plus bas sont les valeurs d'origine
var brickRowCount = 3; //3
var brickColumnCount =  7; //5
var brickWidth = 165; //75
var brickHeight = 40; //20
var brickPadding = 10; //10
var brickOffsetTop = 30; //30
var brickOffsetLeft = 30; //30
//on déclare un tableau pour contenir les briques et on le construit
var bricks = [];
for(var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for(var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};//coordonnées et le status pour la visibilité de la brique
	}
}
//données de la balle
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 8;	//2 est la valeur d'origine(trop lent)
var dy = -8;	//-2
//données du paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
//données pour le déplacement du paddle au clavier
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//et pour le déplacement du paddle à la souris
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

function collisionDetection() {	//gestion de la collision de la balle et des briques
	for(var c = 0; c < brickColumnCount; c++) {
		for(var r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) { //si la brique existe
				//et si la balle entre en collision avec elle
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy *= -1;	//la trajectoire de la balle change
					b.status = 0; //la brique ne sera pas redessinée
					score++; //le score augmente
					//si le score est égal au nombre total de briques
					if(score == brickColumnCount * brickRowCount) { 
						alert("YOU WIN, CONGRATZ!"); //on gagne la partie
						document.location.reload(); //et on recommence
					}
				}
			}
		}
	}
}

function drawScore() { //pour l'affichage du score
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() { //pour l'affichage du nombre de vies
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawBricks() {	//pour dessiner les briques
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

function drawBall() { //pour dessiner la balle
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() { //pour dessiner le paddle
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() { //fonction principale rappelée en boucle avec requestAnimationFrame(draw)
	//le canevas est entièrement effacé
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBricks();	//on dessine les briques
	drawBall();	//et la balle
	drawPaddle();	//et le paddle
	drawScore();	//et le score
	drawLives();	//et les vies
	collisionDetection(); //on vérifie si il y a collision entre la balle et les briques
	
	if(y + dy < ballRadius) {
		dy *= -1;	//si la balle touche le haut du canvas
	}	else if(y + dy > canvas.height - ballRadius) { //si la balle touche le bas du canevas
		if(x > paddleX && x < paddleX + paddleWidth) { //si la balle touche le paddle 
			dy *= -1;	//alors elle rebondit
		}	else {	//sinon (elle ne tombe à côté du paddle)
			lives--;	//on perd une vie
			if(!lives) {	//si on a plus de vies
				alert("GAME OVER"); //on a perdu
				document.location.reload(); //on recommence
			} else { //sinon (si on a encore des vies)
				x = canvas.width / 2;	//on réinitialise le x de la balle
				y = canvas.height - 30; //on réinitialise le y de la balle
				dx = 8; //2 est la valeur d'origine(trop lent)
				dy = - 8; //-2
				paddleX = (canvas.width - paddleWidth) / 2;//on réinitialise la position du paddle
			}
		}
	}
	
	//si la balle touche un des bords gauche ou droit du canvas
	if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx *= -1;//la balle change de direction
	}
	x += dx;//on incrémente le x de la balle
	y += dy;//on incrément le y de la balle
	//déplacement du paddle avec les touches du clavier
	if(rightPressed) {
		paddleX += 7; //7
		if(paddleX + paddleWidth > canvas.width) {	//si le paddle touche le bord droit
			paddleX = canvas.width - paddleWidth;			//
		}
	}
	else if(leftPressed) {												//si le paddle touche le bord gauche
		paddleX -= 7; //7
		if(paddleX < 0) {
			paddleX = 0;
		}
	}
	requestAnimationFrame(draw); //la fonction draw est rappelée en boucle
}
draw();

