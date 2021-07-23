var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja, ninja_running, ninja_collided, ninja_jumping;
var garden,gardenImg,invisibleGround;


var bear;
var score=0;


var gameOver, restart;


function preload(){
  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")
  
  invisibleGround=loadImage("ground2.png")
  
  
  ninja_running = loadAnimation("ninja2.png","ninja3.png");
  ninja_jumping = loadImage("ninja-jump.png")
  ninja_collided = loadImage("ninja die4.png");
  
  gardenImg = loadImage("fantasy-landscape.png");
  
  
  
  bear = loadImage("bear1 2.png");
 
 
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
 
  
  ninja = createSprite(50,height-70,90,80);
  
  
  ninja.addAnimation("running", ninja_running);
  ninja.addAnimation("collided", ninja_collided);
  ninja.setCollider('circle',0,0,350)
  ninja.scale = 0.08
  
  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "white";
  
  garden = createSprite(width/2,height,width,2);
 
  garden.x = width/2
  garden.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
   invisibleGround.invisible = true

  
 
  
  score = 0;
}

function draw() {
  
  background(gardenImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    garden.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && ninja.y  >= height-120) {
      jumpSound.play( )
      ninja.velocityY = -10;
       touches = [];
    }
   
    
    ninja.velocityY = ninja.velocityY + 0.8
  
    if (garden.x < 0){
      garden.x = garden.width/2;
    }
  
    ninja.collide(invisibleGround);

    
    
    spawntrap();
  
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    garden.velocityX = 0;
    ninja.velocityY = 0;
    trap.setVelocityXEach(0);
    
    
   
    ninja.changeAnimation("collided",ninja_collided);
    
   
    trap.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("enter")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}


function spawntrap() {
  if(frameCount % 60 === 0) {
    var trap = createSprite(600,height-95,20,30);
    trap.setCollider('circle',0,0,45)
    
  
    trap.velocityX = -(6 + 3*score/100);
    
    
    var rand = Math.round(random(1,2));
     {
      trap.addImage(bear);
      
    }
    
             
    trap.scale = 0.3;
    trap.lifetime = 300;
    trap.depth = ninja.depth;
    ninja.depth +=1;
    
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  trap.destroyEach();
 
  
  ninja.changeAnimation("running",ninja_running);
  
  score = 0;
  
}
