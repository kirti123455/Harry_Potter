var PLAY= 1;
var END = 0;
var gameState = 1;

var HarryPotter;
var  obstacle;
var backgroundImage;
var snitch, snitch_flying;
var scene;

var score;
var gameOverImg,restartImg;
var bg_song, endSound;

var score = 0;


function preload(){

HarryPotter_flying = loadAnimation("hp1.png.png","hp2.png.png","hp3.png.png","hp4.png.png","hp5.png.png","hp6.png.png","hp7.png.png");

snitch_flying =loadAnimation("snitch1.png","snitch2.png");

backgroundImage = loadImage("quiditch.png");
obstacle = loadAnimation("crow1.png","crow2.png","crow3.png","crow4.png","crow4.png","crow5.png","crow6.png","crow7.png","crow8.png","crow9.png");

 
restartImg = loadImage("retry.png")
gameOverImg = loadImage("gameOver.png.png");

birdImg= loadAnimation("crow1.png", "crow2.png", "crow3.png", "crow4.png", "crow5.png", "crow6.png", "crow7.png", "crow8.png", "crow9.png")
  
bg_song = loadSound("Harry Potter.mp3")
endSound = loadSound("Harry Potter Loop.mp3")




}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bg_song.play();
    bg_song.setVolume(0.5);

    scene = createSprite(0,windowHeight/2,windowWidth+100,windowHeight);
    scene.addImage(backgroundImage);
    scene.scale = 5.1;
    scene.velocityX=-2;
  
    HarryPotter = createSprite(windowWidth/2+400,windowHeight-100,60,40);
    HarryPotter.addAnimation( "PotterFlying",HarryPotter_flying);
    HarryPotter.scale=1;
    HarryPotter.debug= true;
    HarryPotter.setCollider("rectangle", 50, 0, 220, 150)
 
    
    snitch = createSprite( windowWidth/4,windowHeight/2-150,20,10);
    snitch.addAnimation("flying",snitch_flying);
    snitch.scale=0.3;
    snitch.velocityX=2;
    snitch.velocityY=3;

    gameOver = createSprite(width/2,height/2);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(width/2,height/2+30);
    restart.addImage(restartImg);

    //obstacle = createSprite(1,height-170,50,20);
    //obstacle.addAnimation(obstacle);
      
    gameOver.scale = 0.5;
    restart.scale = 0.5;  

 
    invisibleGround = createSprite(width/2,height-50,width,10);
    invisibleGround.visible = false;
   

    obstaclesGroup= new Group();
  
    score= 0;
}

function draw() {
    //background(153);

    if (scene.x < 100){
      scene.x = scene.width/2;
    }

    
    if(gameState===PLAY){
      //background(0);
     
     
      HarryPotter.y = World.mouseY;

      edges= createEdgeSprites();

      
      snitch.bounceOff(edges);

      
      HarryPotter.collide(edges);

      restart.visible= false;
      gameOver . visible =false;

      //scene.velocityX = 3 
      //obstacle.velocityX = -2;
    

    

    score = score + Math.round(getFrameRate()/80);
      
    if(score>0 && score%100 === 0){
         //checkPointSound.play() 
      }
      
    /*if(    keyDown("space") && HarryPotter.y >= 100) {
          HarryPotter.velocityY = -10;
         
      }*/
      
    if(obstaclesGroup.isTouching(HarryPotter)){
       gameState = END; 
        
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      endSound.play()===true;
      bg_song.play()===false;
     
     if(mousePressedOver(restart) || touches.length>0) {
        reset();
        touches=[];
      }
      invisibleGround.velocityX = 0;
      HarryPotter.velocityY = 0
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);   
   }

   HarryPotter.collide(invisibleGround);
   
   spawnObstacles();
   drawSprites();
   stroke("white")
   fill("white")
   textSize(25)
   text("SCORE: "+ score, windowWidth-200,50);
}


//Creating Reset Function
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacle.destroyEach();
  endSound.play===false;
 score=0;
}

//Creating Obstacles
function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(-20,height-170,10,40);
    obstacle.addAnimation("flying",birdImg)
    obstacle.velocityX = (4 + score/100);
    //var obstacle = createSprite(Math.round(random (50, height), 10, 10));  
    obstacle.y=  Math.round(random (50, height));
     obstacle.scale = 0.5;
     obstacle.lifetime = 450;
     obstaclesGroup.add(obstacle)
    }
  }