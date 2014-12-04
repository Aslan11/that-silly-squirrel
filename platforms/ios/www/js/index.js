var adAvailable = false;

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		update();
		gclogin();
		StatusBar.hide();
		if ( window.plugins && window.plugins.iAd ) {
			window.plugins.iAd.createBannerView({
				'bannerAtTop': true,
				'overlap': true,
				'offsetTopBar' : false
			}, function() {
				adAvailable = true;
			}, function(){
				adAvailable = false;
			});
		} else {
			alert('iAd plugin not available/ready.');
		}
	}
};

var gameStarted = false;
var gcUser = false;
var trophies = [];

function gclogin(){
	var successCallback = function (user) {
		gcUser = true;
		// user.alias, user.playerID, user.displayName
	};

	//Failed to authenticate
	var failureCallback = function(data){
		gcUser = false;
	}

	//Authenticate GameCenter
	gamecenter.auth(successCallback, failureCallback);
}

//animation frames
(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

//globals
var canvas,
ctx,
width,
status,
height,
player,
playerSpeed,
branchCount,
keys,
terrain,
branches,
branchOne,
branchTwo,
friction,
direction,
animod,
score,
animState,
branchSpeed,
clouds,
gravity;

//helpful rand function
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function microReset(){
	if(adAvailable){
		window.plugins.iAd.showAd( true );
	}
	if(gcUser){
		var trophyCallback = function (results) {
			if (results) {
				for (var i = 0; i < results.length; i += 1) {
					if(results[i].completed){
						trophies.push(results[i].identifier);
					}
				}
			}
		}

		gamecenter.getAchievements(trophyCallback, function(){console.log('no trophies')});
	}
	score = 0;
	animState = 0;
	branchCount = 0;
	branchSpeed = 1;
	player = {
		color: '#FF5800',
		x: width - 50,
		y: height/4 * 3,
		width: 20,
		height: 20,
		speed: 8,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false,
		facing: 'right',
		shot: false
	};
	direction = 'right';
}

function startGame(){
	document.getElementById("medal").className = "medal";
	microReset();
	status = 'playing';
	branchSpeed = 4;
	window.plugins.iAd.showAd( false );
	document.getElementById("start-game").className = "start-game";
	document.getElementById("title").className = "title";
}
//reset function to set/re-set globals
function reset(){

	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	width  = window.innerWidth;
	height = window.innerHeight;
	score = 0;
	animState = 0;
	branchCount = 0;
	animod = [6,5,4,3,2,1];
	branchSpeed = 1;
	status = 'start';
	playerSpeed = 6;
	player = {
		color: '#FF5800',
		x: width - 30,
		y: height/4 * 3,
		width: 20,
		height: 20,
		speed: 6,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false,
		facing: 'right',
		shot: false
	};
	keys = [];
	terrain = [];
	branches = [];
	branchOne = [];
	branchTwo = [];
	clouds = [];
	direction = 'right';
	friction = 0.8;
	gravity = 0.8;

	//spawn clouds
	for(var i = 1; i < 5; i++){
		clouds.push({
			x: window.innerWidth/2,
			y: (window.innerWidth / 4) * i + i * 20,
			direction: randInt(1,3),
			speed: randInt(4,8)
		});
	}

	//first branch + leaves
	//0
	branchOne.push({
		x: 20,
		y: 0,
		width: 0.4 * window.innerWidth,
		height: 20
	});
	//1
	branchOne.push({
		x: 0.4*window.innerWidth - 40,
		y: 0,
		width: 20,
		height: 60
	});
	//2
	branchOne.push({
		x: 0.4*window.innerWidth,
		y: -40,
		width: 20,
		height: 60
	});
	//3
	branchOne.push({
		x: 0.4*window.innerWidth + 20,
		y: -40,
		width: 60,
		height: 20
	});
	//leaves
	//4
	branchOne.push({
		x: 0.4*window.innerWidth + 60,
		y: -80,
		width: 20,
		height: 40
	});
	//5
	branchOne.push({
		x: 0.4*window.innerWidth + 60,
		y: -20,
		width: 20,
		height: 40
	});
	//6
	branchOne.push({
		x: 0.4*window.innerWidth + 80,
		y: -40,
		width: 40,
		height: 20
	});
	//7
	branchOne.push({
		x: 0.4*window.innerWidth + 80,
		y: -20,
		width: 20,
		height: 20
	});
	//8
	branchOne.push({
		x: 0.4*window.innerWidth + 80,
		y: -60,
		width: 20,
		height: 20
	});
	//9

	branchOne.push({
		x: 0.4*window.innerWidth + 40,
		y: -20,
		width: 20,
		height: 20
	});
	//10
	branchOne.push({
		x: 0.4*window.innerWidth + 40,
		y: -60,
		width: 20,
		height: 20
	});
	//11

	branchOne.push({
		x: 0.4*window.innerWidth - 60,
		y: 40,
		width: 20,
		height: 20
	});

	//12

	branchOne.push({
		x: 0.4*window.innerWidth - 20,
		y: 40,
		width: 20,
		height: 20
	});

	//13
	branchOne.push({
		x: 0.4*window.innerWidth - 40,
		y: 60,
		width: 20,
		height: 20
	});

	branchTwo.push({
		x: 20,
		y: ((window.innerHeight / -2) - 70) + 0,
		width: 0.4 * window.innerWidth,
		height: 20
	});
	//1
	branchTwo.push({
		x: 0.4*window.innerWidth - 40,
		y: ((window.innerHeight / -2) - 70) + 0,
		width: 20,
		height: 60
	});
	//2
	branchTwo.push({
		x: 0.4*window.innerWidth,
		y: ((window.innerHeight / -2) - 70) + -40,
		width: 20,
		height: 60
	});
	//3
	branchTwo.push({
		x: 0.4*window.innerWidth + 20,
		y: ((window.innerHeight / -2) - 70) + -40,
		width: 60,
		height: 20
	});
	//leaves
	//4
	branchTwo.push({
		x: 0.4*window.innerWidth + 60,
		y: ((window.innerHeight / -2) - 70) + -80,
		width: 20,
		height: 40
	});
	//5
	branchTwo.push({
		x: 0.4*window.innerWidth + 60,
		y: ((window.innerHeight / -2) - 70) + -20,
		width: 20,
		height: 40
	});
	//6
	branchTwo.push({
		x: 0.4*window.innerWidth + 80,
		y: ((window.innerHeight / -2) - 70) + -40,
		width: 40,
		height: 20
	});
	//7
	branchTwo.push({
		x: 0.4*window.innerWidth + 80,
		y: ((window.innerHeight / -2) - 70) + -20,
		width: 20,
		height: 20
	});
	//8
	branchTwo.push({
		x: 0.4*window.innerWidth + 80,
		y: ((window.innerHeight / -2) - 70) + -60,
		width: 20,
		height: 20
	});
	//9

	branchTwo.push({
		x: 0.4*window.innerWidth + 40,
		y: ((window.innerHeight / -2) - 70) + -20,
		width: 20,
		height: 20
	});
	//10
	branchTwo.push({
		x: 0.4*window.innerWidth + 40,
		y: ((window.innerHeight / -2) - 70) + -60,
		width: 20,
		height: 20
	});
	//11

	branchTwo.push({
		x: 0.4*window.innerWidth - 60,
		y: ((window.innerHeight / -2) - 70) + 40,
		width: 20,
		height: 20
	});

	//12

	branchTwo.push({
		x: 0.4*window.innerWidth - 20,
		y: ((window.innerHeight / -2) - 70) + 40,
		width: 20,
		height: 20
	});

	//13
	branchTwo.push({
		x: 0.4*window.innerWidth - 40,
		y: ((window.innerHeight / -2) - 70) + 60,
		width: 20,
		height: 20
	});

	//left-wall
	terrain.push({x: 0,
		y: 0,
		width: 20,
		height: height
	});
	//floor
	terrain.push({
		x: 0,
		y: height - 2,
		width: width,
		height: 50
	});
	//right-wall
	terrain.push({
		x: width - 20,
		y: 0,
		width: 20,
		height: height
	});

	canvas.width = width;
	canvas.height = height;

};

reset();

function hitBranch(){
	status = 'start';
	if(gcUser){
		//Send User Score to Leaderboard
		var data = {
			score: branchCount,
			leaderboardId: "2"
		};
		gamecenter.submitScore(function(){console.log('successful');}, function(){console.log('failed');}, data);
	}
	document.getElementById("medal").className = "medal active";
	if(branchCount >= 10){
		var hasTrophy = false;
		for (var i = 0; i < trophies.length; i++) {
				if(trophies[i] == 0001){
					hasTrophy = true;
				};
		};
		document.getElementById("medal").className = "medal bronze active";
		if(gcUser == true && hasTrophy == false){
			var data = {
				achievementId: "0001",
				percent: "100"
			};

			gamecenter.reportAchievement(function(){console.log('successful');}, function(){console.log('failed');}, data);
		};
	}
	if(branchCount >= 20){
		var hasTrophy = false;
		for (var i = 0; i < trophies.length; i++) {
			if(trophies[i] == 0002){
				hasTrophy = true;
			};
		};
		document.getElementById("medal").className = "medal copper active";
		if(gcUser == true && hasTrophy == false){
			var data = {
				achievementId: "0002",
				percent: "100"
			};

			gamecenter.reportAchievement(function(){console.log('successful');}, function(){console.log('failed');}, data);
		};
	};
	if(branchCount >= 30){
		var hasTrophy = false;
		for (var i = 0; i < trophies.length; i++) {
			if(trophies[i] == 0003){
				hasTrophy = true;
			};
		};
		document.getElementById("medal").className = "medal silver active";
		if(gcUser == true && hasTrophy == false){
			var data = {
				achievementId: "0003",
				percent: "100"
			};

			gamecenter.reportAchievement(function(){console.log('successful');}, function(){console.log('failed');}, data);
		};
	};
	if(branchCount >= 40){
		var hasTrophy = false;
		for (var i = 0; i < trophies.length; i++) {
			if(trophies[i] == 0004){
				hasTrophy = true;
			};
		};
		document.getElementById("medal").className = "medal gold active";
		if(gcUser == true && hasTrophy == false){
			var data = {
				achievementId: "0004",
				percent: "100"
			};

			gamecenter.reportAchievement(function(){console.log('successful');}, function(){console.log('failed');}, data);
		};
	};
	if(branchCount >= 50){
		var hasTrophy = false;
		for (var i = 0; i < trophies.length; i++) {
			if(trophies[i] == 0005){
				hasTrophy = true;
			};
		};
		document.getElementById("medal").className = "medal platinum active";
		if(gcUser == true && hasTrophy == false){
			var data = {
				achievementId: "0005",
				percent: "100"
			};

			gamecenter.reportAchievement(function(){console.log('successful');}, function(){console.log('failed');}, data);
		};
	};
	document.getElementById("medal-score").innerHTML = branchCount;
	document.getElementById("start-game").className = "start-game active";
	document.getElementById("title").className = "title active";
	microReset();
};

//main game loop
function update() {

	//TODO Game Menu


	//Clear-canvas and prepare for re-draw
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();

	//Draw clouds first, so they are in the background layer.
	ctx.fillStyle = "white";
	for (var i = 0; i < clouds.length; i++) {

		//if the cloud is off screen reset it
		if(clouds[i].x >= window.innerWidth){
			clouds[i].x = -60;
		}else if(clouds[i].x <= -61){
			clouds[i].x = width;
		}

		if (clouds[i].y > window.innerHeight + 40) {
			clouds[i].y = -40;
		}

		ctx.fillRect(clouds[i].x, clouds[i].y, 30, 10)
		ctx.fillRect(clouds[i].x + 10, clouds[i].y - 10, 10, 10)

		//check cloud direction and apply horizontal drift
		if(clouds[i].direction == 1){
			clouds[i].x += clouds[i].speed/10;
		}
		if(clouds[i].direction == 2){
			clouds[i].x -= clouds[i].speed/10;
		}


		clouds[i].y += branchSpeed/6;

	}
	//game is being played
	if(status == 'playing' || status == 'start'){
		//Increment User Score

		//Increment Animation Gear
		animState += .4;
		//Loop Gear
		if (animState >= 15){
			animState = 0;
		}

		//if the score is divisible by 200 evenly, increment the speed of the game
		if(status == 'playing'){
			score += 1;
		}

		//if the player is not in the air allow them to jump
		if(!player.grounded){
			if (direction == 'right'){
				playerSpeed = 18;
			}
			if (direction == 'left'){
				playerSpeed = -18;
			}
		}

		//Set fill style to tree branch color
		ctx.fillStyle = "#2A483A";

		//terrain & terrain collision
		for (var i = 0; i < terrain.length; i++) {
			//draw terrain
			ctx.rect(terrain[i].x, terrain[i].y, terrain[i].width, terrain[i].height);

			//player-terrain collision
			var dir = colCheck(player, terrain[i]);

			if (dir === "l" || dir === "r") {
				player.velX = 0;
				playerSpeed = 0;
				player.grounded = true;
			}

		}

		for (var i = 0; i < branchOne.length; i++) {
			if(i > 3){
				ctx.fillStyle = '#90E18E';
			}
			//draw branchOne
			ctx.fillRect(branchOne[i].x, branchOne[i].y, branchOne[i].width, branchOne[i].height);
			ctx.fillStyle = "#2A483A";
			//player-branchOne collision
			if (status == 'playing'){
				var dir = colCheck(player, branchOne[i]);

				if (dir === "t") {
					//Player hits head on branch game ends
					hitBranch();
				}
			}

			branchOne[i].y += branchSpeed;
		}

		for (var i = 0; i < branchTwo.length; i++) {
			if(i > 3){
				ctx.fillStyle = '#90E18E';
			}
			//draw branchTwo
			ctx.fillRect(branchTwo[i].x, branchTwo[i].y, branchTwo[i].width, branchTwo[i].height);
			ctx.fillStyle = "#2A483A";
			//player-branchTwo collision
			if (status == 'playing'){
				var dir = colCheck(player, branchTwo[i]);

				if (dir === "t") {
					//Player hits head on branch game ends
					hitBranch();
				}
			}

			branchTwo[i].y += branchSpeed;
		}


		//reset branch components after fall off.
		if(branchOne[13].y >= height + 140){
			if( status == 'playing' ){
				branchCount++;
				if( branchSpeed < 12){
					branchSpeed+= 0.5;
				}
			}
			branchOne[0].y = branchTwo[0].y - 400;
			branchOne[1].y = branchTwo[1].y - 400;
			branchOne[2].y = branchTwo[2].y - 400;
			branchOne[3].y = branchTwo[3].y - 400;
			branchOne[4].y = branchTwo[4].y - 400;
			branchOne[5].y = branchTwo[5].y - 400;
			branchOne[6].y = branchTwo[6].y - 400;
			branchOne[7].y = branchTwo[7].y - 400;
			branchOne[8].y = branchTwo[8].y - 400;
			branchOne[9].y = branchTwo[9].y - 400;
			branchOne[10].y = branchTwo[10].y - 400;
			branchOne[11].y = branchTwo[11].y - 400;
			branchOne[12].y = branchTwo[12].y - 400;
			branchOne[13].y = branchTwo[13].y - 400;

			if( status == 'playing' ){
				var lr = Math.floor(Math.random() * 2) + 1;
			}
			else{
				lr = 2;
			}
			if(lr == 1){
				branchOne[0].x = window.innerWidth * 0.6;
				branchOne[1].x = window.innerWidth * 0.6 + 40;
				branchOne[2].x = window.innerWidth * 0.6;
				branchOne[3].x = window.innerWidth * 0.6 - 60;
				branchOne[4].x = 0.6*window.innerWidth - 60;
				branchOne[5].x = 0.6*window.innerWidth - 60;
				branchOne[6].x = 0.6*window.innerWidth - 100;
				branchOne[7].x = 0.6*window.innerWidth - 80;
				branchOne[8].x = 0.6*window.innerWidth - 80;
				branchOne[9].x = 0.6*window.innerWidth - 40;
				branchOne[10].x = 0.6*window.innerWidth - 40;
				branchOne[11].x = 0.6*window.innerWidth + 60;
				branchOne[12].x = 0.6*window.innerWidth + 20;
				branchOne[13].x = 0.6*window.innerWidth + 40;
			}else{
				branchOne[0].x = 20;
				branchOne[1].x = 0.4*window.innerWidth - 40;
				branchOne[2].x = 0.4*window.innerWidth;
				branchOne[3].x = 0.4*window.innerWidth + 20;
				branchOne[4].x = 0.4*window.innerWidth + 60;
				branchOne[5].x = 0.4*window.innerWidth + 60;
				branchOne[6].x = 0.4*window.innerWidth + 80;
				branchOne[7].x = 0.4*window.innerWidth + 80;
				branchOne[8].x = 0.4*window.innerWidth + 80;
				branchOne[9].x = 0.4*window.innerWidth + 40;
				branchOne[10].x = 0.4*window.innerWidth + 40;
				branchOne[11].x = 0.4*window.innerWidth - 60;
				branchOne[12].x = 0.4*window.innerWidth - 20;
				branchOne[13].x = 0.4*window.innerWidth - 40;

			}
		}

		//reset branch components after fall off.
		if(branchTwo[13].y >= height + 140){
			if( status == 'playing' ){
				branchCount++;
				//place max speed ceiling
				if( branchSpeed < 12){
					branchSpeed+= 0.5;
				}
			}
			branchTwo[0].y = branchOne[0].y - 400;
			branchTwo[1].y = branchOne[1].y - 400;
			branchTwo[2].y = branchOne[2].y - 400;
			branchTwo[3].y = branchOne[3].y - 400;
			branchTwo[4].y = branchOne[4].y - 400;
			branchTwo[5].y = branchOne[5].y - 400;
			branchTwo[6].y = branchOne[6].y - 400;
			branchTwo[7].y = branchOne[7].y - 400;
			branchTwo[8].y = branchOne[8].y - 400;
			branchTwo[9].y = branchOne[9].y - 400;
			branchTwo[10].y = branchOne[10].y - 400;
			branchTwo[11].y = branchOne[11].y - 400;
			branchTwo[12].y = branchOne[12].y - 400;
			branchTwo[13].y = branchOne[13].y - 400;

			if( status == 'playing' ){
				var lr = Math.floor(Math.random() * 2) + 1;
			}
			else{
				lr = 2;
			}
			if(lr == 1){
				branchTwo[0].x = window.innerWidth * 0.6;
				branchTwo[1].x = window.innerWidth * 0.6 + 40;
				branchTwo[2].x = window.innerWidth * 0.6;
				branchTwo[3].x = window.innerWidth * 0.6 - 60;
				branchTwo[4].x = 0.6*window.innerWidth - 60;
				branchTwo[5].x = 0.6*window.innerWidth - 60;
				branchTwo[6].x = 0.6*window.innerWidth - 100;
				branchTwo[7].x = 0.6*window.innerWidth - 80;
				branchTwo[8].x = 0.6*window.innerWidth - 80;
				branchTwo[9].x = 0.6*window.innerWidth - 40;
				branchTwo[10].x = 0.6*window.innerWidth - 40;
				branchTwo[11].x = 0.6*window.innerWidth + 60;
				branchTwo[12].x = 0.6*window.innerWidth + 20;
				branchTwo[13].x = 0.6*window.innerWidth + 40;
			}else{
				branchTwo[0].x = 20;
				branchTwo[1].x = 0.4*window.innerWidth - 40;
				branchTwo[2].x = 0.4*window.innerWidth;
				branchTwo[3].x = 0.4*window.innerWidth + 20;
				branchTwo[4].x = 0.4*window.innerWidth + 60;
				branchTwo[5].x = 0.4*window.innerWidth + 60;
				branchTwo[6].x = 0.4*window.innerWidth + 80;
				branchTwo[7].x = 0.4*window.innerWidth + 80;
				branchTwo[8].x = 0.4*window.innerWidth + 80;
				branchTwo[9].x = 0.4*window.innerWidth + 40;
				branchTwo[10].x = 0.4*window.innerWidth + 40;
				branchTwo[11].x = 0.4*window.innerWidth - 60;
				branchTwo[12].x = 0.4*window.innerWidth - 20;
				branchTwo[13].x = 0.4*window.innerWidth - 40;

			}
		}


		//Player Actions
		if(player.grounded){
			player.velY = 0;
			player.velX = 0;
		}

		player.x += playerSpeed;
		player.y += player.velY;

		ctx.fill();
		var animStateFloor = Math.floor(animState);
		if(player.grounded){
			if(animStateFloor == 0){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
			}else if(animStateFloor == 1){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 1, player.y, 4, 2);
					ctx.fillRect(player.x + 1, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x - 1 + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x - 1 + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 6;
				animod[1] = 5;
				animod[2] = 4;
				animod[3] = 3;
				animod[4] = 2;
				animod[5] = 1;
			}else if(animStateFloor == 2){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 2, player.y, 4, 2);
					ctx.fillRect(player.x + 2, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 2, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 5;
				animod[1] = 6;
				animod[2] = 5;
				animod[3] = 4;
				animod[4] = 3;
				animod[5] = 2;
			}else if(animStateFloor == 3){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 3, player.y, 4, 2);
					ctx.fillRect(player.x + 3, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 3, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 4;
				animod[1] = 5;
				animod[2] = 6;
				animod[3] = 5;
				animod[4] = 4;
				animod[5] = 3;
			}else if(animStateFloor == 4){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 4, player.y, 4, 2);
					ctx.fillRect(player.x + 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 3;
				animod[1] = 4;
				animod[2] = 5;
				animod[3] = 6;
				animod[4] = 5;
				animod[5] = 4;
			}else if(animStateFloor == 5){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 3, player.y, 4, 2);
					ctx.fillRect(player.x + 3, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 3, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 2;
				animod[1] = 3;
				animod[2] = 4;
				animod[3] = 5;
				animod[4] = 6;
				animod[5] = 4;
			}else if(animStateFloor == 6){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 2, player.y, 4, 2);
					ctx.fillRect(player.x + 2, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 2, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 1;
				animod[1] = 2;
				animod[2] = 3;
				animod[3] = 4;
				animod[4] = 5;
				animod[5] = 6;
			}else if(animStateFloor == 7){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + 1, player.y, 4, 2);
					ctx.fillRect(player.x + 1, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x, player.y + 6, 4, 2);
					ctx.fillRect(player.x, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4 - 1, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 1, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 0;
				animod[1] = 1;
				animod[2] = 2;
				animod[3] = 3;
				animod[4] = 4;
				animod[5] = 5;
			}else if(animStateFloor == 8){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 1, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 1, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 1, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 1, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 0;
				animod[1] = 1;
				animod[2] = 2;
				animod[3] = 3;
				animod[4] = 4;
				animod[5] = 5;
			}else if(animStateFloor == 9){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 2, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 2, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 1;
				animod[1] = 2;
				animod[2] = 3;
				animod[3] = 4;
				animod[4] = 5;
				animod[5] = 6;
			}else if(animStateFloor == 10){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 3, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 3, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 2;
				animod[1] = 3;
				animod[2] = 4;
				animod[3] = 5;
				animod[4] = 6;
				animod[5] = 5;
			}else if(animStateFloor == 11){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 4, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 4, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 3;
				animod[1] = 4;
				animod[2] = 5;
				animod[3] = 6;
				animod[4] = 5;
				animod[5] = 4;
			}else if(animStateFloor == 12){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 3, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 3, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 3, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 4;
				animod[1] = 5;
				animod[2] = 6;
				animod[3] = 5;
				animod[4] = 4;
				animod[5] = 3;
			}else if(animStateFloor == 13){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 2, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 2, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 2, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 5;
				animod[1] = 6;
				animod[2] = 5;
				animod[3] = 4;
				animod[4] = 3;
				animod[5] = 2;
			}else if(animStateFloor == 14){
				if(direction == 'left'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x, player.y, 4, 2);
					ctx.fillRect(player.x, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + 1, player.y + 6, 4, 2);
					ctx.fillRect(player.x + 1, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				if(direction == 'right'){
					ctx.fillStyle = player.color;
					ctx.fillRect(player.x + player.width - 4, player.y, 4, 2);
					ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 2);
					ctx.fillStyle = '#a23000';
					ctx.fillRect(player.x + player.width - 4 - 1, player.y + 6, 4, 2);
					ctx.fillRect(player.x + player.width - 4 - 1, player.y + 18, 4, 2);
					ctx.fillStyle = player.color;
				}
				animod[0] = 6;
				animod[1] = 5;
				animod[2] = 4;
				animod[3] = 3;
				animod[4] = 2;
				animod[5] = 1;
			}
			ctx.fillStyle = player.color;
			if(direction == 'left'){
				ctx.fillRect(player.x + 4, player.y, player.width/2, player.height);
				ctx.fillRect(player.x + 12, player.y - 6, 8,8);
				ctx.fillRect(player.x + 20, player.y - 6, 6,2);
				ctx.fillRect(player.x + 20, player.y, 6,2);

			}else{
				ctx.fillRect(player.x - 4 + player.width/2, player.y, player.width/2, player.height);
				ctx.fillRect(player.x - 12 + player.width/2, player.y - 6, 8,8);
				ctx.fillRect(player.x - 18 + player.width/2, player.y - 6, 6,2);
				ctx.fillRect(player.x - 18 + player.width/2, player.y, 6,2);
			}
			if(direction == 'left'){
				ctx.fillRect(player.x + 4 + animod[0], player.y + player.height + 1, 3, 3);
				ctx.fillRect(player.x + 4 + animod[1] + 1, player.y + player.height + 5, 6, 3);
				ctx.fillRect(player.x + 4 + animod[2] + 4, player.y + player.height + 9, 9, 3);
				ctx.fillRect(player.x + 4 + animod[3] + 6, player.y + player.height + 13, 12, 3);
				ctx.fillRect(player.x + 4 + animod[4] + 6, player.y + player.height + 17, 12, 3);
				ctx.fillRect(player.x + 4 + animod[5] + 6, player.y + player.height + 21, 9, 3);
			}else if(direction == 'right'){
				ctx.fillRect(player.x - 4 - animod[0] + player.width - 3, player.y + player.height + 1, 3, 3);
				ctx.fillRect(player.x - 4 - animod[1] + player.width - 6 - 1, player.y + player.height + 5, 6, 3);
				ctx.fillRect(player.x - 4 - animod[2] + player.width - 9 - 4, player.y + player.height + 9, 9, 3);
				ctx.fillRect(player.x - 4 - animod[3] + player.width - 12 - 6, player.y + player.height + 13, 12, 3);
				ctx.fillRect(player.x - 4 - animod[4] + player.width - 12 - 6, player.y + player.height + 17, 12, 3);
				ctx.fillRect(player.x - 4 - animod[5] + player.width - 9 - 6, player.y + player.height + 21, 9, 3);
			}

		}else{
			// if else is true that means the player is jumping,
			// handle player jumping graphics
			ctx.fillStyle = player.color;
			ctx.fillRect(player.x, player.y, player.width, player.height/2);
			if(direction == 'right'){
				//head
				ctx.fillRect(player.x + player.width, (player.y + player.height/2) - 16, 8, 8);
				//left ear
				ctx.fillRect(player.x + player.width, (player.y + player.height/2) - 22, 2, 6);
				//right ear
				ctx.fillRect(player.x + player.width + 6, (player.y + player.height/2) - 22, 2, 6);
				//tail
				ctx.fillRect(player.x - 3, player.y + 6, 2, 4);
				ctx.fillRect(player.x - 6, player.y + 4, 2, 6);
				ctx.fillRect(player.x - 9, player.y + 2, 2, 8);
				ctx.fillRect(player.x - 12, player.y, 2, 10);
				ctx.fillRect(player.x - 15, player.y + 2, 2, 8);
				ctx.fillRect(player.x - 18, player.y + 4, 2, 6);
				ctx.fillRect(player.x - 21, player.y + 6, 2, 4);
				//feet
				ctx.fillStyle = '#a23000';
				ctx.fillRect(player.x, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 6, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 12, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 18, player.y + player.height/2, 2, 2);
			}else{
				//head
				ctx.fillRect(player.x - 6, (player.y + player.height/2) - 16, 8, 8);
				//left ear
				ctx.fillRect(player.x, (player.y + player.height/2) - 22, 2, 6);
				//right ear
				ctx.fillRect(player.x - 6, (player.y + player.height/2) - 22, 2, 6);
				//tail
				ctx.fillRect(player.x + player.width + 2, player.y + 6, 2, 4);
				ctx.fillRect(player.x + player.width + 5, player.y + 4, 2, 6);
				ctx.fillRect(player.x + player.width + 8, player.y + 2, 2, 8);
				ctx.fillRect(player.x + player.width + 11, player.y, 2, 10);
				ctx.fillRect(player.x + player.width + 14, player.y + 2, 2, 8);
				ctx.fillRect(player.x + player.width + 17, player.y + 4, 2, 6);
				ctx.fillRect(player.x + player.width + 20, player.y + 6, 2, 4);
				//feet
				ctx.fillStyle = '#a23000';
				ctx.fillRect(player.x, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 6, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 12, player.y + player.height/2, 2, 2);
				ctx.fillRect(player.x + 18, player.y + player.height/2, 2, 2);
			}
		}

		//draw Score
		if(status == 'playing'){
			ctx.fillStyle="#a23000";
			ctx.font="28px bit";
			ctx.fillText(branchCount,32,48);
			ctx.fillStyle= player.color;
			ctx.font="28px bit";
			ctx.fillText(branchCount,30,48);
		};

	}
	requestAnimationFrame(update);
}

//collision detection
function colCheck(shapeA, shapeB) {
	// get the vectors to check against
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
	vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
	// add the half widths and half heights of the objects
	hWidths = (shapeA.width / 2) + (shapeB.width / 2),
	hHeights = (shapeA.height / 2) + (shapeB.height / 2),
	colDir = null;

	// if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		// figures out on which side we are colliding (top, bottom, left, or right)
		var oX = hWidths - Math.abs(vX),
		oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
			} else {
				colDir = "b";
				shapeA.y -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				shapeA.x += oX;
			} else {
				colDir = "r";
				shapeA.x -= oX;
			}
		}
	}
	return colDir;
}

document.getElementById("jump").addEventListener("touchstart", function(e){
	if(status == 'playing'){
		if(player.grounded == true){
			player.grounded = false;
			if(direction == 'right'){
				direction = 'left';
				return;
			}
			if(direction == 'left'){
				direction = 'right';
				return;
			}
		}
	}
}, false);

document.getElementById("leaders").addEventListener("touchstart", function(e){
	if(gcUser){
		var data = {
			leaderboardId: "1"
		};
		gamecenter.showLeaderboard(function(){console.log('success');}, function(){console.log('failure');}, data);
	}
}, false);

//keyboard handling
document.body.addEventListener("keydown", function (e) {
	if(player.grounded == true){
		player.grounded = false;
		if(e.keyCode == 32){
			if(direction == 'right'){
				direction = 'left';
				return;
			}
			if(direction == 'left'){
				direction = 'right';
				return;
			}
		};
	}
	keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});
