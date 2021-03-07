var balloon, database;
var position;

function preload(){
  bgImg = loadImage("C 35 image/pro-C35 images/Hot Air Ballon-01.png");

  ballonImg = loadImage("C 35 image/pro-C35 images/Hot Air Ballon-02.png");
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1200,700);

  balloon = createSprite(600, 350, 50, 50);
  balloon.addImage(ballonImg);

  var balloonPosition = database.ref('ball/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(bgImg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
    }
    if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
    }
   if(keyDown(UP_ARROW)){
      writePosition(0,-10);
      balloon.addImage(ballonImg);
      balloon.scale = balloon.scale - 0.01
    }
    if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
      balloon.addImage(ballonImg);
      balloon.scale = balloon.scale + 0.01
    }
    drawSprites();

    stroke(0);
    fill(0);
    textSize(30);
    text("Use arrow keys to move Hot Air Balloon", 20,30)
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}


