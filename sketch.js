var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloud_image;
var obstacle,o1,o2,o3,o4,o5,o6;
var score;
var obstacleg,cloudg;
var play=1;
var end=0;
var gamestate=play;
var gameOver,gameOver_image;
var restart,restart_image;
var jumpSound,GameSound,levelUpSound;
//var A=100;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  
  gameOver_image=loadImage("g1.png")
  restart_image=loadImage("r1.png")
  jumpSound=loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3")
  GameSound=loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3")
  levelUpSound=loadSound("smb_stomp.wav")
}

function setup() {
createCanvas(windowWidth, windowHeight );
  
score=0;  
  
  
restart=createSprite(width/2,height/2);
restart.addImage(restart_image);
restart.scale=0.2;
restart.visible=false;

gameOver=createSprite(width/2,height/2- 50);
gameOver.addImage(gameOver_image);
gameOver.scale=0.2;
gameOver.visible=false;
  
//create a trex sprite
trex = createSprite(50,height-20,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;
trex.setCollider("circle",0,0,30)
trex.debug=false
  
//create a ground sprite
ground = createSprite(width/2,height-70,width,2);
ground.addImage("ground",groundImage);
ground.x = width/2;
ground.scale=1.2;

 
invisibleGround = createSprite(width/2,height-5,width,125);  
invisibleGround.visible=false; 

obstacleg=new Group();
cloudg=new Group();
}


function draw() {
background("white");
var Pushkar=(random(1,20));  
console.log(Pushkar)
  //for(var a=0;a<5;a++){
   // console.log("pushkar")
  //}
 // console.log(trex.y)
 //console.count("frame number=")
  //console.time();
//jump when the space button is pressed

  

//text(A,50,50)  
  
if(gamestate===play){
 if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
      jumpSound.play( )
      trex.velocityY = -10;
       touches = [];
    }
if(score>0&&score%100===0){
  levelUpSound.play();
}
trex.velocityY = trex.velocityY + 0.8 
if (ground.x < 0) {
  ground.x = ground.width / 2;
}
obstacles();
clouds();
score=score+Math.round(getFrameRate()/60)
ground.velocityX = -(4+3*score/100);
if(trex.isTouching(obstacleg)){
 gamestate=end;
 GameSound.play();
 
}
}
else if(gamestate===end){
  ground.velocityX=0;
  obstacleg.setVelocityXEach(0);
  cloudg.setVelocityXEach(0);
  obstacleg.setLifetimeEach(2/0)
  cloudg.setLifetimeEach(2/0)
  trex.velocityY=0;
  trex.changeAnimation("collided",trex_collided);
  gameOver.visible=true;
  restart.visible=true;
  
}
if(mousePressedOver(restart)){
  reset();
}

    if(touches.length>0 || keyDown("A")) {      
      reset();
      touches = []
    }
trex.collide(invisibleGround);
drawSprites();
textSize(20)
text("your score is : "+score,500,50)
//console.timeEnd();
}
function clouds(){
  if(frameCount%80===0){
  cloud = createSprite(width+20,height-300,40,10);
  cloud.velocityX=-(7+score/100);
  cloud.addImage(cloud_image);
  cloud.scale=random(0.2,0.45);
  cloud.y=Math.round(random(20,100));
  cloud.lifetime=150;
  cloudg.add(cloud)
  trex.depth=cloud.depth;
  trex.depth=trex.depth+4;
  }
}
function obstacles() {
  if(frameCount%100===0){
    obstacle=createSprite(width+20,height-70,20,30);
    obstacle.velocityX=-(4+score/100);
    var R=Math.round(random(1,4))
    obstacle.scale=0.1;
    obstacle.lifetime=1000;
    obstacleg.add(obstacle)
    switch(R){
        
      case 1:obstacle.addImage(o1);
      break;
      case 2:obstacle.addImage(o2);
      break;
      case 3:obstacle.addImage(o3);
      break;
      case 4:obstacle.addImage(o4);
      break;
      case 5:obstacle.addImage(o5);
      break;
      case 6:obstacle.addImage(o6);
      break;
      default:break;
        
        
    }
  }
}

function reset(){
  gamestate=play
  obstacleg.destroyEach();
  cloudg.destroyEach();
  trex.changeAnimation("running", trex_running);
  restart.visible=false;
  gameOver.visible=false;
  score=0;
  
}