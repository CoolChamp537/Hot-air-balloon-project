var balloon,balloonImage1,balloonImage2;
var bg;
var database,position;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale = 0.5;

  var posref = database.ref("balloon/position");
    posref.on("value",function(data){
        position = data.val();
        balloon.x = position.x
        balloon.y = position.y
    },function(error){
        console.log(error.code)
    })

  //textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    WritePosition(-5,0)

  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    WritePosition(5,0)

  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    WritePosition(0,-5)
    if(balloon.scale >= 0.1){
    balloon.scale = balloon.scale - 0.2
    }
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    WritePosition(0,5)

    if(balloon.scale <= 1.2){
    balloon.scale = balloon.scale + 0.2
    }
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move the Hot Air Balloon!",40,40);
}

function WritePosition(x,y){
  database.ref("balloon/position").set({
    x: position.x + x,
    y: position.y + y
  })

}
