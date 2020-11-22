var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
canvas.width  = '1800';
canvas.height = '1274';
canvas.style.width  = '100%';
canvas.style.height = '100%';

var canvasMask = document.getElementById('canvas-mask');
var game = document.getElementById('flappy');

window.onresize = function() {
	game.style.height = game.clientWidth * 0.7088;
	canvasMask.style.height = game.clientHeight;
	canvasMask.style.width = game.clientWidth;
}

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();

var bgloaded = false;
var fgloaded = false;
var birdloaded = false;

var pipeNorth = new Image();
var pipeSouth = new Image();

var parrot = new Array();

parrot[0] = new Image();
parrot[0].src = "assets/flappy_parrot/images/parrot1.png";

parrot[1] = new Image();
parrot[1].src = "assets/flappy_parrot/images/parrot2.png";

parrot[2] = new Image();
parrot[2].src = "assets/flappy_parrot/images/parrot3.png";

parrot[3] = new Image();
parrot[3].src = "assets/flappy_parrot/images/parrot4.png";

parrot[4] = new Image();
parrot[4].src = "assets/flappy_parrot/images/parrot5.png";

parrot[5] = new Image();
parrot[5].src = "assets/flappy_parrot/images/parrot6.png";

parrot[6] = new Image();
parrot[6].src = "assets/flappy_parrot/images/parrot7.png";

parrot[7] = new Image();
parrot[7].src = "assets/flappy_parrot/images/parrot8.png";

parrot[8] = new Image();
parrot[8].src = "assets/flappy_parrot/images/parrot9.png";

var index = 0;

bird.src = parrot[index].src;
bg.src = "assets/flappy_parrot/images/cavebg.png";
fg.src = "assets/flappy_parrot/images/cavefg.png";
pipeNorth.src = "assets/flappy_parrot/images/obstacleNorth.png";
pipeSouth.src = "assets/flappy_parrot/images/obstacleSouth.png";

// variables
var gap = canvas.height / 4.5;
var constant;

var scoreGap = canvas.width / 13;

var bX = canvas.width / 7;
var bY = canvas.height / 4;;

var gravity = 2.5;
var grav = gravity;

var score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();
var hit = new Audio();

fly.src = "assets/flappy_parrot/sounds/fly.mp3";
scor.src = "assets/flappy_parrot/sounds/score.mp3";
hit.src = "assets/flappy_parrot/sounds/stone-hit.mp3";

// on key down
var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 40: e.preventDefault(); break; // Arrow keys
		case 38: moveUp(); e.preventDefault(); break;
        //case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);
var pause = true;
/*canvas.addEventListener('click', function() { }, false);
canvas.onClick = moveUp();*/
/*canvas.addEventListener("touchstart"*//*canvas.onClick('click', function(e) {
	moveUp();
	e.preventDefault();
}, false);*/

var height = canvas.height / 20;

function moveUp(){
	if(pause === false){
		bY = bY - 2 *height;//bY -= height;
		grav = gravity;
		fly.play();
	}
}

// pipe coordinates
var pipe = [];

pipe[0] = {
    x : canvas.width - canvas.width / 3 + 20,
    y : Math.floor(Math.random()*pipeNorth.height/1.3)-pipeNorth.height
};

// cave image coordinates
var cave = [];

cave[0] = {
	x : 0,
	y : 0
};

var gameover = false;
var ind = index;

// draw images
function draw(){
	pause = false;
	ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
	for(var i=0; i<pipe.length; i++){
		constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x = pipe[i].x-2;//pipe[i].x--;

		if( pipe[i].x == canvas.width - canvas.width / 3){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height/1.3)-pipeNorth.height
            });
        }

		// detect collision
		if( bX + bird.width - 15 >= pipe[i].x && bX + bird.width/3 <= pipe[i].x + pipeNorth.width
		&& (bY+100 <= pipe[i].y + pipeNorth.height || bY+bird.height-60 >= pipe[i].y+constant)
		|| bY + bird.height >=  cvs.height){
			hit.play();
			gameover = true;

			document.getElementById("score").textContent="Score : " + score;

			show('gamescores','block');
    }

		if(pipe[i].x == Math.round(scoreGap)){
            score = score + 100;
            scor.play();
        }
	}

	ind++;

	if(ind / 5 == 1){
		score++;
		ind = 0;
		index++;
		if(index == parrot.length){
			index = 0;
		}
		bird.src = parrot[index].src;
	}

	ctx.drawImage(bird,bX,bY);

	for(var j = 0; j < cave.length; j++){
		ctx.drawImage(fg, cave[j].x, cave[j].y, fg.width, fg.height, 0, 0, canvas.width, canvas.height);
		cave[j].x = cave[j].x + 4;//2;

		if( cave[j].x == 28){
            cave.push({
                x : -canvas.width,
                y : 0
            });
        }
	}

	grav = grav + 0.1;
    bY += grav;

  ctx.fillStyle = "#fff";
	ctx.font = '48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';//"48px ScribbledSans-Bold";
    ctx.fillText("  Score : "+score,10,cvs.height-36);
	if(gameover === false) {
		requestAnimationFrame(draw);
	}
}

function resetGame() {
	bX = canvas.width / 7;
	bY = canvas.height / 4;

	pipe = [];
	pipe[0] = {
		x : canvas.width - canvas.width / 3 + 20,
		y : Math.floor(Math.random()*pipeNorth.height/1.3)-pipeNorth.height
	};

	cave = [];
	cave[0] = {
		x : 0,
		y : 0
	};

	index = 0;
	bird.src = parrot[index].src;
	grav = gravity;
	score = 0;
	gameover = false
}

bg.onload = function() { bgloaded = true;}
fg.onload = function() { fgloaded = true;}
bird.onload = function() { birdloaded = true;}

function drawMain() {
	if( bgloaded &&  fgloaded &&  birdloaded) {
		ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(bird,bX,bY);
		ctx.drawImage(fg, 0, 0, fg.width, fg.height, 0, 0, canvas.width, canvas.height);
	} else {
		window.setTimeout(drawMain,50);
	}
}

drawMain();

hide = function(id) {
	var e = document.getElementById(id);
	e.style.display = 'none';
	canvasMask.style.backgroundImage = 'none';
}
show = function(id, display) {
	var e = document.getElementById(id);
	e.style.display = display;
	canvasMask.style.backgroundImage =
	'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%)';
}
