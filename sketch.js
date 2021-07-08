var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed;
var lastFeed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
 
  feedFood = createButton("Feed the Dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime=database.ref('FeedTime');
  feedTime.on("value",readTime);
  
 
text("last Feed: 1AM",500,85);

 
  drawSprites();
}

function readTime(data){
  lastFeed=data.val();
  foodObj.getFedTime(lastFeed);
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var foodStockVal = foodObj.getFoodStock();
if(foodStockVal<=0){
  foodObj.updateFoodStock(foodStockVal*0)
} else{
foodObj.updateFoodStock(foodStockVal-1)
}
foodS--;
database.ref('/').update({
  Food:foodS
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
