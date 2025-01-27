class Game {
  constructor() {
    this.startScreen = document.getElementsByClassName("game-intro")[0];
    this.gameScreen = document.getElementsByClassName("game-screen")[0];
    this.gameEndScreen = document.getElementsByClassName("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      ""
  );
  this.height = 600;
  this.width = 850;
  this.obstacles = [];
  this.score = 0;
  this.lives = 3;
  this.gameIsOver = false;
  this.gameIntervalId;
  this.gameLoopFrequency = Math.round(1000 / 60); 
}

  start() {

      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";


      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      }, this.gameLoopFrequency)
    }
    

    gameLoop() {
        console.log("in the game loop");

        this.update();

        // If "gameIsOver" is set to "true" clear the interval to stop the loop
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }
  update() {
    console.log("in the update");
  }
}