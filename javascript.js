var pl_x;
var b_x = 0, b_y = 0, b_alpha;
var b_max_y;
var started, speed, speed_x, speed_y;
var score;
var pl_h=10, pl_w=100;
var b_r=10;
var inter;
var context;
var canvas;
HEIGHT = 400;
WIDTH = 400;


function start(){
	initGraph();
	newGame();
}

function newGame() {
	if(started)
		clearInterval(inter);
	initGame();
	drawRoom();
	printInfo({"score":0});
}

function initGraph(){
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
}

function initGame(){
	score=0;
	speed=1;
	b_alpha = .8;
	speed_x=speed*Math.cos(b_alpha);
	speed_y=-speed*Math.sin(b_alpha);
	b_r=5;
	pl_x=105;
	pl_w=100;
	b_x=150;
	b_max_y=HEIGHT-pl_h-b_r;
	b_y=b_max_y-3;
	started=false;
}

function drawRoom(){
	context = canvas.getContext("2d");
	context.clearRect(0, 0, 400, HEIGHT);

	//platform
	context.fillStyle="#ffffff";
	context.fillRect(pl_x, HEIGHT-11, pl_w, pl_h);
	context.strokeStyle="#000000";
	context.strokeRect(pl_x, HEIGHT-11, pl_w, pl_h);

	//ball
	context.fillStyle="#000000";
	context.beginPath();
	context.arc(b_x,b_y,b_r,0,Math.PI*2,true);
	context.closePath();
	context.fill();
}

function printInfo(info) {
		var d = document.getElementById('info');
		d.innerHTML = "";
		for(var k in info) {
		d.innerHTML = d.innerHTML + "<p>" + k + ": " + info[k] + "</p>";
		}
}

function onInterval() {
		for(i=0;i<speed;i++) {
				moveBall();
				drawRoom();
		}
			speed+=0.001;
			printInfo({"score":score});
			if (b_r+speed+1==HEIGHT)
				gameOver('You Win!!!');
}

document.onkeydown = function onClickCanvas(){
		if(event.keyCode == 32)
    {
		    if(!started)
			    inter=setInterval(onInterval,10);
			    started=true;
		}
}

function movePlatform(evt){
		pl_x=evt.clientX;
		if (!(pl_x<WIDTH-pl_w))
			pl_x=WIDTH-pl_w;
		if (!started){
			b_x=pl_x+pl_w/2;
			drawRoom();
		}
}

function moveBall(){
    scanAroundBall();
    b_x+=speed_x;
    b_y+=speed_y;
}

function scanAroundBall(){

	if((b_y+b_r)>HEIGHT)
		gameOver('Game Over');

	if(( (b_x+b_r)>WIDTH ) || ( (b_x-b_r)<0 ))
		speed_x=0-speed_x;
	if  ( (b_y-b_r)<0 )
		speed_y=0-speed_y;

	if (( (b_y+b_r)<HEIGHT-pl_h ) && ( (b_y+b_r+speed+2)>HEIGHT-pl_h )){
		if ( (b_x>pl_x-b_r) && (b_x<(pl_x+pl_w+b_r)) ){		//match ball with platform

			speed_y = -Math.abs(speed_y);
			score+=1;
		}
	}
}

function gameOver(s){
	alert(s);
	newGame();
}
