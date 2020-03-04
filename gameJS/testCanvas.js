var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 100);
ctx.fillStyle = "#FF00FF";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 50, 0, Math.PI*2, false);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 200, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();