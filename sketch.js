var invisible
var gamestate="play"
var ghostImage;
var ghoststanding;
var climberImage;
var doorImage;
var backgroundImage;
var sound;
function preload(){
  ghostImage=loadImage("ghost-jumping.png")
  ghoststanding=loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");
  backgroundImage=loadImage("tower.png");
  sound=loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  backGround=createSprite(280,200)
backGround.addImage(backgroundImage)
  backGround.velocityY=1
  ghost=createSprite(200,200)
  ghost.addImage(ghoststanding)
  ghost.scale=0.5
  doorsgroup=createGroup();
  climbergroup=createGroup();
  ghost.setCollider("rectangle",0,0,100,230)
  ghost.debug=true
  invisiblegroup=createGroup();
  
}
function draw(){
  background("black")
  if(gamestate==="play"){
    if(backGround.y>600){
    backGround.y=300
  }
    if(keyDown("space")){
    ghost.velocityY=-8
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(keyDown("left")){
    ghost.x=ghost.x-2
  }
  if(keyDown("right")){
    ghost.x=ghost.x+2
  }
  if(ghost.isTouching(climbergroup)){
    ghost.velocityY=0;
    
  }
    sound.play();
  spawndoors();
    if(ghost.isTouching(invisiblegroup)){
      gamestate="end"
    }
  }
  if(gamestate==="end"){
    backGround.visible=false
    doorsgroup.destroyEach()
    climbergroup.destroyEach()
    ghost.visible=false
    invisiblegroup.destroyEach()
    textSize(30);
    fill("yellow")
  text("GAME OVER",200,300)
    
  }
  
  drawSprites();
}
function spawndoors(){
  if(frameCount%200===0){
    doors=createSprite(Math.round(random(100,500)),0)
    doors.depth=ghost.depth;
    ghost.depth=ghost.depth+1
doors.addImage(doorImage);
    
  doors.velocityY=2
    doors.lifetime=300
    climber=createSprite(doors.x,50)
    climber.addImage(climberImage)
    climber.velocityY=2
    doorsgroup.add(doors);
    climbergroup.add(climber)
    climber.lifetime=300
    invisible=createSprite(climber.x,70,climber.width,10)
    invisible.velocityY=2
    invisiblegroup.add(invisible)
    invisible.visible=false
    invisible.lifetime=300
  }
  
}