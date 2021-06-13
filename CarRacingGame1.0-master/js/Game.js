class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(50,100);
    car2 = createSprite(150,100);
    car3 = createSprite(250,100);
    car4 = createSprite(350,100);
    cars = [car1,car2,car3,car4];

  
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){

      //index of the array
      var index = 0;
      
      //x and y position of the car
      var x = 0;
      var y;

      //var display_position = 130;
      for(var plr in allPlayers){
        
        //add1 to the index for every loop
        index = index+1;

        //position the cars little away from each other in x direction
        x = x+200;

        //use data from database to display the cars y direction
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }
    drawSprites();
  }
}
