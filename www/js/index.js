function gclogin(){var e=function(){gcUser=!0;var e=function(e){if(e)for(var l=0;l<e.length;l+=1)e[l].completed&&trophies.push(e[l].identifier)};gamecenter.getAchievements(e,function(){console.log("no trophies")})},l=function(){gcUser=!1};gamecenter.auth(e,l)}function randInt(e,l){return Math.floor(Math.random()*(l-e)+e)}function microReset(){adAvailable&&window.plugins.iAd.showAd(!0),score=0,animState=0,branchCount=0,branchSpeed=1,player={color:"#FF5800",x:width-50,y:height/4*3,width:20,height:20,speed:8,velX:0,velY:0,jumping:!1,grounded:!1,facing:"right",shot:!1},direction="right"}function startGame(){document.getElementById("medal").className="medal",microReset(),status="playing",branchSpeed=4,window.plugins.iAd.showAd(!1),document.getElementById("start-game").className="start-game",document.getElementById("title").className="title"}function reset(){canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),width=window.innerWidth,height=window.innerHeight,score=0,animState=0,branchCount=0,animod=[6,5,4,3,2,1],branchSpeed=1,status="start",playerSpeed=6,player={color:"#FF5800",x:width-30,y:height/4*3,width:20,height:20,speed:6,velX:0,velY:0,jumping:!1,grounded:!1,facing:"right",shot:!1},keys=[],terrain=[],branches=[],branchOne=[],branchTwo=[],clouds=[],direction="right",friction=.8,gravity=.8;for(var e=1;5>e;e++)clouds.push({x:window.innerWidth/2,y:window.innerWidth/4*e+20*e,direction:randInt(1,3),speed:randInt(4,8)});branchOne.push({x:20,y:0,width:.4*window.innerWidth,height:20}),branchOne.push({x:.4*window.innerWidth-40,y:0,width:20,height:60}),branchOne.push({x:.4*window.innerWidth,y:-40,width:20,height:60}),branchOne.push({x:.4*window.innerWidth+20,y:-40,width:60,height:20}),branchOne.push({x:.4*window.innerWidth+60,y:-80,width:20,height:40}),branchOne.push({x:.4*window.innerWidth+60,y:-20,width:20,height:40}),branchOne.push({x:.4*window.innerWidth+80,y:-40,width:40,height:20}),branchOne.push({x:.4*window.innerWidth+80,y:-20,width:20,height:20}),branchOne.push({x:.4*window.innerWidth+80,y:-60,width:20,height:20}),branchOne.push({x:.4*window.innerWidth+40,y:-20,width:20,height:20}),branchOne.push({x:.4*window.innerWidth+40,y:-60,width:20,height:20}),branchOne.push({x:.4*window.innerWidth-60,y:40,width:20,height:20}),branchOne.push({x:.4*window.innerWidth-20,y:40,width:20,height:20}),branchOne.push({x:.4*window.innerWidth-40,y:60,width:20,height:20}),branchTwo.push({x:20,y:window.innerHeight/-2-70+0,width:.4*window.innerWidth,height:20}),branchTwo.push({x:.4*window.innerWidth-40,y:window.innerHeight/-2-70+0,width:20,height:60}),branchTwo.push({x:.4*window.innerWidth,y:window.innerHeight/-2-70+-40,width:20,height:60}),branchTwo.push({x:.4*window.innerWidth+20,y:window.innerHeight/-2-70+-40,width:60,height:20}),branchTwo.push({x:.4*window.innerWidth+60,y:window.innerHeight/-2-70+-80,width:20,height:40}),branchTwo.push({x:.4*window.innerWidth+60,y:window.innerHeight/-2-70+-20,width:20,height:40}),branchTwo.push({x:.4*window.innerWidth+80,y:window.innerHeight/-2-70+-40,width:40,height:20}),branchTwo.push({x:.4*window.innerWidth+80,y:window.innerHeight/-2-70+-20,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth+80,y:window.innerHeight/-2-70+-60,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth+40,y:window.innerHeight/-2-70+-20,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth+40,y:window.innerHeight/-2-70+-60,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth-60,y:window.innerHeight/-2-70+40,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth-20,y:window.innerHeight/-2-70+40,width:20,height:20}),branchTwo.push({x:.4*window.innerWidth-40,y:window.innerHeight/-2-70+60,width:20,height:20}),terrain.push({x:0,y:0,width:20,height:height}),terrain.push({x:width-20,y:0,width:20,height:height}),canvas.width=width,canvas.height=height}function hitBranch(){if(status="start",gcUser){var e={score:branchCount,leaderboardId:"2"};gamecenter.submitScore(function(){console.log("successful")},function(){console.log("failed")},e)}if(document.getElementById("medal").className="medal active",branchCount>=10){for(var l=!1,t=0;t<trophies.length;t++)1==trophies[t]&&(l=!0);if(document.getElementById("medal").className="medal bronze active",1==gcUser&&0==l){var e={achievementId:"0001",percent:"100"};gamecenter.reportAchievement(function(){console.log("successful")},function(){console.log("failed")},e)}}if(branchCount>=20){for(var l=!1,t=0;t<trophies.length;t++)2==trophies[t]&&(l=!0);if(document.getElementById("medal").className="medal copper active",1==gcUser&&0==l){var e={achievementId:"0002",percent:"100"};gamecenter.reportAchievement(function(){console.log("successful")},function(){console.log("failed")},e)}}if(branchCount>=30){for(var l=!1,t=0;t<trophies.length;t++)3==trophies[t]&&(l=!0);if(document.getElementById("medal").className="medal silver active",1==gcUser&&0==l){var e={achievementId:"0003",percent:"100"};gamecenter.reportAchievement(function(){console.log("successful")},function(){console.log("failed")},e)}}if(branchCount>=40){for(var l=!1,t=0;t<trophies.length;t++)4==trophies[t]&&(l=!0);if(document.getElementById("medal").className="medal gold active",1==gcUser&&0==l){var e={achievementId:"0004",percent:"100"};gamecenter.reportAchievement(function(){console.log("successful")},function(){console.log("failed")},e)}}if(branchCount>=50){for(var l=!1,t=0;t<trophies.length;t++)5==trophies[t]&&(l=!0);if(document.getElementById("medal").className="medal platinum active",1==gcUser&&0==l){var e={achievementId:"0005",percent:"100"};gamecenter.reportAchievement(function(){console.log("successful")},function(){console.log("failed")},e)}}document.getElementById("medal-score").innerHTML=branchCount,document.getElementById("start-game").className="start-game active",document.getElementById("title").className="title active",microReset()}function update(){ctx.clearRect(0,0,width,height),ctx.beginPath(),ctx.fillStyle="white";for(var e=0;e<clouds.length;e++)clouds[e].x>=window.innerWidth?clouds[e].x=-60:clouds[e].x<=-61&&(clouds[e].x=width),clouds[e].y>window.innerHeight+40&&(clouds[e].y=-40),ctx.fillRect(clouds[e].x,clouds[e].y,30,10),ctx.fillRect(clouds[e].x+10,clouds[e].y-10,10,10),1==clouds[e].direction&&(clouds[e].x+=clouds[e].speed/10),2==clouds[e].direction&&(clouds[e].x-=clouds[e].speed/10),clouds[e].y+=branchSpeed/6;if("playing"==status||"start"==status){animState+=.4,animState>=15&&(animState=0),"playing"==status&&(score+=1),player.grounded||("right"==direction&&(playerSpeed=18),"left"==direction&&(playerSpeed=-18)),ctx.fillStyle="#2A483A";for(var e=0;e<terrain.length;e++){ctx.rect(terrain[e].x,terrain[e].y,terrain[e].width,terrain[e].height);var l=colCheck(player,terrain[e]);("l"===l||"r"===l)&&(player.velX=0,playerSpeed=0,player.grounded=!0)}for(var e=0;e<branchOne.length;e++){if(e>3&&(ctx.fillStyle="#90E18E"),ctx.fillRect(branchOne[e].x,branchOne[e].y,branchOne[e].width,branchOne[e].height),ctx.fillStyle="#2A483A","playing"==status){var l=colCheck(player,branchOne[e]);"t"===l&&hitBranch()}branchOne[e].y+=branchSpeed}for(var e=0;e<branchTwo.length;e++){if(e>3&&(ctx.fillStyle="#90E18E"),ctx.fillRect(branchTwo[e].x,branchTwo[e].y,branchTwo[e].width,branchTwo[e].height),ctx.fillStyle="#2A483A","playing"==status){var l=colCheck(player,branchTwo[e]);"t"===l&&hitBranch()}branchTwo[e].y+=branchSpeed}if(branchOne[13].y>=height+140){if("playing"==status&&(branchCount++,12>branchSpeed&&(branchSpeed+=.5)),branchOne[0].y=branchTwo[0].y-400,branchOne[1].y=branchTwo[1].y-400,branchOne[2].y=branchTwo[2].y-400,branchOne[3].y=branchTwo[3].y-400,branchOne[4].y=branchTwo[4].y-400,branchOne[5].y=branchTwo[5].y-400,branchOne[6].y=branchTwo[6].y-400,branchOne[7].y=branchTwo[7].y-400,branchOne[8].y=branchTwo[8].y-400,branchOne[9].y=branchTwo[9].y-400,branchOne[10].y=branchTwo[10].y-400,branchOne[11].y=branchTwo[11].y-400,branchOne[12].y=branchTwo[12].y-400,branchOne[13].y=branchTwo[13].y-400,"playing"==status)var t=Math.floor(2*Math.random())+1;else t=2;1==t?(branchOne[0].x=.6*window.innerWidth,branchOne[1].x=.6*window.innerWidth+40,branchOne[2].x=.6*window.innerWidth,branchOne[3].x=.6*window.innerWidth-60,branchOne[4].x=.6*window.innerWidth-60,branchOne[5].x=.6*window.innerWidth-60,branchOne[6].x=.6*window.innerWidth-100,branchOne[7].x=.6*window.innerWidth-80,branchOne[8].x=.6*window.innerWidth-80,branchOne[9].x=.6*window.innerWidth-40,branchOne[10].x=.6*window.innerWidth-40,branchOne[11].x=.6*window.innerWidth+60,branchOne[12].x=.6*window.innerWidth+20,branchOne[13].x=.6*window.innerWidth+40):(branchOne[0].x=20,branchOne[1].x=.4*window.innerWidth-40,branchOne[2].x=.4*window.innerWidth,branchOne[3].x=.4*window.innerWidth+20,branchOne[4].x=.4*window.innerWidth+60,branchOne[5].x=.4*window.innerWidth+60,branchOne[6].x=.4*window.innerWidth+80,branchOne[7].x=.4*window.innerWidth+80,branchOne[8].x=.4*window.innerWidth+80,branchOne[9].x=.4*window.innerWidth+40,branchOne[10].x=.4*window.innerWidth+40,branchOne[11].x=.4*window.innerWidth-60,branchOne[12].x=.4*window.innerWidth-20,branchOne[13].x=.4*window.innerWidth-40)}if(branchTwo[13].y>=height+140){if("playing"==status&&(branchCount++,12>branchSpeed&&(branchSpeed+=.5)),branchTwo[0].y=branchOne[0].y-400,branchTwo[1].y=branchOne[1].y-400,branchTwo[2].y=branchOne[2].y-400,branchTwo[3].y=branchOne[3].y-400,branchTwo[4].y=branchOne[4].y-400,branchTwo[5].y=branchOne[5].y-400,branchTwo[6].y=branchOne[6].y-400,branchTwo[7].y=branchOne[7].y-400,branchTwo[8].y=branchOne[8].y-400,branchTwo[9].y=branchOne[9].y-400,branchTwo[10].y=branchOne[10].y-400,branchTwo[11].y=branchOne[11].y-400,branchTwo[12].y=branchOne[12].y-400,branchTwo[13].y=branchOne[13].y-400,"playing"==status)var t=Math.floor(2*Math.random())+1;else t=2;1==t?(branchTwo[0].x=.6*window.innerWidth,branchTwo[1].x=.6*window.innerWidth+40,branchTwo[2].x=.6*window.innerWidth,branchTwo[3].x=.6*window.innerWidth-60,branchTwo[4].x=.6*window.innerWidth-60,branchTwo[5].x=.6*window.innerWidth-60,branchTwo[6].x=.6*window.innerWidth-100,branchTwo[7].x=.6*window.innerWidth-80,branchTwo[8].x=.6*window.innerWidth-80,branchTwo[9].x=.6*window.innerWidth-40,branchTwo[10].x=.6*window.innerWidth-40,branchTwo[11].x=.6*window.innerWidth+60,branchTwo[12].x=.6*window.innerWidth+20,branchTwo[13].x=.6*window.innerWidth+40):(branchTwo[0].x=20,branchTwo[1].x=.4*window.innerWidth-40,branchTwo[2].x=.4*window.innerWidth,branchTwo[3].x=.4*window.innerWidth+20,branchTwo[4].x=.4*window.innerWidth+60,branchTwo[5].x=.4*window.innerWidth+60,branchTwo[6].x=.4*window.innerWidth+80,branchTwo[7].x=.4*window.innerWidth+80,branchTwo[8].x=.4*window.innerWidth+80,branchTwo[9].x=.4*window.innerWidth+40,branchTwo[10].x=.4*window.innerWidth+40,branchTwo[11].x=.4*window.innerWidth-60,branchTwo[12].x=.4*window.innerWidth-20,branchTwo[13].x=.4*window.innerWidth-40)}player.grounded&&(player.velY=0,player.velX=0),player.x+=playerSpeed,player.y+=player.velY,ctx.fill();var i=Math.floor(animState);player.grounded?(0==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color)):1==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+1,player.y,4,2),ctx.fillRect(player.x+1,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x-1+player.width-4,player.y,4,2),ctx.fillRect(player.x-1+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=6,animod[1]=5,animod[2]=4,animod[3]=3,animod[4]=2,animod[5]=1):2==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+2,player.y,4,2),ctx.fillRect(player.x+2,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-2,player.y,4,2),ctx.fillRect(player.x+player.width-4-2,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=5,animod[1]=6,animod[2]=5,animod[3]=4,animod[4]=3,animod[5]=2):3==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+3,player.y,4,2),ctx.fillRect(player.x+3,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-3,player.y,4,2),ctx.fillRect(player.x+player.width-4-3,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=4,animod[1]=5,animod[2]=6,animod[3]=5,animod[4]=4,animod[5]=3):4==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+4,player.y,4,2),ctx.fillRect(player.x+4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-4,player.y,4,2),ctx.fillRect(player.x+player.width-4-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=3,animod[1]=4,animod[2]=5,animod[3]=6,animod[4]=5,animod[5]=4):5==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+3,player.y,4,2),ctx.fillRect(player.x+3,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-3,player.y,4,2),ctx.fillRect(player.x+player.width-4-3,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=2,animod[1]=3,animod[2]=4,animod[3]=5,animod[4]=6,animod[5]=4):6==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+2,player.y,4,2),ctx.fillRect(player.x+2,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-2,player.y,4,2),ctx.fillRect(player.x+player.width-4-2,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=1,animod[1]=2,animod[2]=3,animod[3]=4,animod[4]=5,animod[5]=6):7==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+1,player.y,4,2),ctx.fillRect(player.x+1,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+6,4,2),ctx.fillRect(player.x,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4-1,player.y,4,2),ctx.fillRect(player.x+player.width-4-1,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=0,animod[1]=1,animod[2]=2,animod[3]=3,animod[4]=4,animod[5]=5):8==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+1,player.y+6,4,2),ctx.fillRect(player.x+1,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-1,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-1,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=0,animod[1]=1,animod[2]=2,animod[3]=3,animod[4]=4,animod[5]=5):9==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+2,player.y+6,4,2),ctx.fillRect(player.x+2,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-2,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-2,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=1,animod[1]=2,animod[2]=3,animod[3]=4,animod[4]=5,animod[5]=6):10==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+3,player.y+6,4,2),ctx.fillRect(player.x+3,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-3,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-3,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=2,animod[1]=3,animod[2]=4,animod[3]=5,animod[4]=6,animod[5]=5):11==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+4,player.y+6,4,2),ctx.fillRect(player.x+4,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-4,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-4,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=3,animod[1]=4,animod[2]=5,animod[3]=6,animod[4]=5,animod[5]=4):12==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+3,player.y+6,4,2),ctx.fillRect(player.x+3,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-3,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-3,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=4,animod[1]=5,animod[2]=6,animod[3]=5,animod[4]=4,animod[5]=3):13==i?("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+2,player.y+6,4,2),ctx.fillRect(player.x+2,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-2,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-2,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=5,animod[1]=6,animod[2]=5,animod[3]=4,animod[4]=3,animod[5]=2):14==i&&("left"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,4,2),ctx.fillRect(player.x,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+1,player.y+6,4,2),ctx.fillRect(player.x+1,player.y+18,4,2),ctx.fillStyle=player.color),"right"==direction&&(ctx.fillStyle=player.color,ctx.fillRect(player.x+player.width-4,player.y,4,2),ctx.fillRect(player.x+player.width-4,player.y+12,4,2),ctx.fillStyle="#a23000",ctx.fillRect(player.x+player.width-4-1,player.y+6,4,2),ctx.fillRect(player.x+player.width-4-1,player.y+18,4,2),ctx.fillStyle=player.color),animod[0]=6,animod[1]=5,animod[2]=4,animod[3]=3,animod[4]=2,animod[5]=1),ctx.fillStyle=player.color,"left"==direction?(ctx.fillRect(player.x+4,player.y,player.width/2,player.height),ctx.fillRect(player.x+12,player.y-6,8,8),ctx.fillRect(player.x+20,player.y-6,6,2),ctx.fillRect(player.x+20,player.y,6,2)):(ctx.fillRect(player.x-4+player.width/2,player.y,player.width/2,player.height),ctx.fillRect(player.x-12+player.width/2,player.y-6,8,8),ctx.fillRect(player.x-18+player.width/2,player.y-6,6,2),ctx.fillRect(player.x-18+player.width/2,player.y,6,2)),"left"==direction?(ctx.fillRect(player.x+4+animod[0],player.y+player.height+1,3,3),ctx.fillRect(player.x+4+animod[1]+1,player.y+player.height+5,6,3),ctx.fillRect(player.x+4+animod[2]+4,player.y+player.height+9,9,3),ctx.fillRect(player.x+4+animod[3]+6,player.y+player.height+13,12,3),ctx.fillRect(player.x+4+animod[4]+6,player.y+player.height+17,12,3),ctx.fillRect(player.x+4+animod[5]+6,player.y+player.height+21,9,3)):"right"==direction&&(ctx.fillRect(player.x-4-animod[0]+player.width-3,player.y+player.height+1,3,3),ctx.fillRect(player.x-4-animod[1]+player.width-6-1,player.y+player.height+5,6,3),ctx.fillRect(player.x-4-animod[2]+player.width-9-4,player.y+player.height+9,9,3),ctx.fillRect(player.x-4-animod[3]+player.width-12-6,player.y+player.height+13,12,3),ctx.fillRect(player.x-4-animod[4]+player.width-12-6,player.y+player.height+17,12,3),ctx.fillRect(player.x-4-animod[5]+player.width-9-6,player.y+player.height+21,9,3))):(ctx.fillStyle=player.color,ctx.fillRect(player.x,player.y,player.width,player.height/2),"right"==direction?(ctx.fillRect(player.x+player.width,player.y+player.height/2-16,8,8),ctx.fillRect(player.x+player.width,player.y+player.height/2-22,2,6),ctx.fillRect(player.x+player.width+6,player.y+player.height/2-22,2,6),ctx.fillRect(player.x-3,player.y+6,2,4),ctx.fillRect(player.x-6,player.y+4,2,6),ctx.fillRect(player.x-9,player.y+2,2,8),ctx.fillRect(player.x-12,player.y,2,10),ctx.fillRect(player.x-15,player.y+2,2,8),ctx.fillRect(player.x-18,player.y+4,2,6),ctx.fillRect(player.x-21,player.y+6,2,4),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+player.height/2,2,2),ctx.fillRect(player.x+6,player.y+player.height/2,2,2),ctx.fillRect(player.x+12,player.y+player.height/2,2,2),ctx.fillRect(player.x+18,player.y+player.height/2,2,2)):(ctx.fillRect(player.x-6,player.y+player.height/2-16,8,8),ctx.fillRect(player.x,player.y+player.height/2-22,2,6),ctx.fillRect(player.x-6,player.y+player.height/2-22,2,6),ctx.fillRect(player.x+player.width+2,player.y+6,2,4),ctx.fillRect(player.x+player.width+5,player.y+4,2,6),ctx.fillRect(player.x+player.width+8,player.y+2,2,8),ctx.fillRect(player.x+player.width+11,player.y,2,10),ctx.fillRect(player.x+player.width+14,player.y+2,2,8),ctx.fillRect(player.x+player.width+17,player.y+4,2,6),ctx.fillRect(player.x+player.width+20,player.y+6,2,4),ctx.fillStyle="#a23000",ctx.fillRect(player.x,player.y+player.height/2,2,2),ctx.fillRect(player.x+6,player.y+player.height/2,2,2),ctx.fillRect(player.x+12,player.y+player.height/2,2,2),ctx.fillRect(player.x+18,player.y+player.height/2,2,2))),"playing"==status&&(ctx.fillStyle="#a23000",ctx.font="28px bit",ctx.fillText(branchCount,32,48),ctx.fillStyle=player.color,ctx.font="28px bit",ctx.fillText(branchCount,30,48))}requestAnimationFrame(update)}function colCheck(e,l){var t=e.x+e.width/2-(l.x+l.width/2),i=e.y+e.height/2-(l.y+l.height/2),r=e.width/2+l.width/2,a=e.height/2+l.height/2,n=null;if(Math.abs(t)<r&&Math.abs(i)<a){var c=r-Math.abs(t),y=a-Math.abs(i);c>=y?i>0?(n="t",e.y+=y):(n="b",e.y-=y):t>0?(n="l",e.x+=c):(n="r",e.x-=c)}return n}var adAvailable=!1,app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){update(),gclogin(),StatusBar.hide(),window.plugins&&window.plugins.iAd?window.plugins.iAd.createBannerView({bannerAtTop:!0,overlap:!0,offsetTopBar:!1},function(){adAvailable=!0},function(){adAvailable=!1}):alert("iAd plugin not available/ready.")}},gameStarted=!1,gcUser=!1,trophies=[];!function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.requestAnimationFrame=e}();var canvas,ctx,width,status,height,player,playerSpeed,branchCount,keys,terrain,branches,branchOne,branchTwo,friction,direction,animod,score,animState,branchSpeed,clouds,gravity;reset(),document.getElementById("jump").addEventListener("touchstart",function(){if("playing"==status&&1==player.grounded){if(player.grounded=!1,"right"==direction)return void(direction="left");if("left"==direction)return void(direction="right")}},!1),document.getElementById("leaders").addEventListener("touchstart",function(){if(gcUser){var e={leaderboardId:"1"};gamecenter.showLeaderboard(function(){console.log("success")},function(){console.log("failure")},e)}},!1),document.body.addEventListener("keydown",function(e){if(1==player.grounded&&(player.grounded=!1,32==e.keyCode)){if("right"==direction)return void(direction="left");if("left"==direction)return void(direction="right")}keys[e.keyCode]=!0}),document.body.addEventListener("keyup",function(e){keys[e.keyCode]=!1});
