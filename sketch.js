var hball;
var database;

function setup(){
    createCanvas(500,500);
    //loading data base
    //.ref()-when we want to refer to perticular position 
    //.on()-to make any changes happening to a perticular refered value
    //.set() - seting the new value 
    database = firebase.database()
    console.log(database)

    hball = createSprite(250,250,10,10);
    hball.shapeColor = "red";

    var hBallPosition = database.ref('ball/position')
    console.log(hBallPosition)

    hBallPosition.on("value", readPosition, showError);
    console.log(hBallPosition)
   
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition (x,y){
    database.ref('ball/position').set({
           'x' : position.x + x,
           'y' : position.y + y
        })
}

function readPosition(data){
    //val()- write someting to data base
    position = data.val()
    console.log(position.x)

    hball.x = position.x
    hball.y = position.y
}
function showError(){
    console.log("Error in writing to the database");
}