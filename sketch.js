var dog, dogHappy, database, foodS,foodStock,dogImage, foodObject,feed,add,fedTime;

function preload(){
 dogImage = loadImage("Dog.png");
 dogHappy = loadImage("happydog.png");
}

function setup() {
  createCanvas(800, 550);

  database = firebase.database();
  
  dog = createSprite(650,350,5,5);
  dog.scale = 0.2;
  dog.addImage(dogImage);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  fedTime = database.ref("fedTime");
  fedTime.on("value", function(data){
    fedTime = data.val();
  });
  
  foodObject = new Food();

  feed = createButton("Feed the Dog");
  feed.position(960, 175);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(1060, 175);
  add.mousePressed(addFoods);
  
}

function draw() {  
  background("green");

  foodObject.display();

  textSize(24);
  fill("snow");
  text("Press the Button to Feed the Lucky!", 250, 90);

  textSize(20);
  text("Food Left: " + foodS, 30, 40);

  if(fedTime >= 12) {
    text("Last Fed: " + fedTime%12 + " PM", 650, 30);
  }
  else if(fedTime == 0) {
    text("Last Fed: 12 AM", 350, 30);
  }
  else{
    text("Last Fed: " + fedTime + " AM", 650, 30);
  }
  drawSprites();
  

}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(dogHappy);

  foodS--;
  database.ref('/').update ({
    Food: foodS,
    fedTime: hour()
  })
}
function addFoods() {
  dog.addImage(dogImage);

  foodS++;
  database.ref('/').update({
    Food: foodS
  });
}