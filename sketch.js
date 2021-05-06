var dog,dogImg;
var foodCount,milkImg;
var addFood,feedDog;
var i;
//create feed and lastFed variable here


function preload(){
  dogImg = loadImage("Dog.png"); 
  milkImg = loadImage("milkImage.png");
}

function setup() {
 createCanvas(400,400);
 database=firebase.database();
 dog = createSprite(200,200,30,30);
 dog.addImage(dogImg);
 dog.scale = 0.1;
 
 var decreaseFood = database.ref("foodCount");
 decreaseFood.on("value",function(data){
 foodCount=data.val();
 console.log(foodCount);
 })
 addFood = createButton("add food");
 addFood.position(100,100);
 feedDog = createButton("feed the dog");
 feedDog.position(100,150);
}

function draw() {

  background(46,139,87);
  
  //stroke("black");
 
  text("The Remaining Food is"+" "+foodCount,200,100);
  
  addFood.mousePressed(()=>{
    foodCount+=1;
    updateFoodCount();
  })
  feedDog.mousePressed(()=>{
    foodCount-=1;
    updateFoodCount();
  })
  dispplayMilkImages();
  
  drawSprites();
}
function updateFoodCount(){
  database.ref("/").update({
    foodCount:foodCount
  })
}
function dispplayMilkImages(){
  var x=50;
  for(i=0;i<foodCount;i++){
    x+=20;
    image(milkImg,x,5,30,50);
  }
}

