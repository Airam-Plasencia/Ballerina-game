class Game {
  constructor() {
    this.startScreen = document.getElementsByClassName("game-intro")[0];
    this.gameScreen = document.getElementsByClassName("game-screen")[0];
    this.gameEndScreen = document.getElementsByClassName("game-end");
    this.player = new Player(
      this.gameScreen,
      0,
      420,
      100,
      150,
      "./images/Ballerina_01.png"
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
      this.player.move();

      // Check for collision and if an obstacle is still on the screen
      for (let i = 0; i < this.obstacles.length; i++) {
          const obstacle = this.obstacles[i];
          obstacle.move();

          // If the player's car collides with an obstacle
          if (this.player.didCollide(obstacle)) {
              // Remove the obstacle element from the DOM
              obstacle.element.remove();
              // Remove obstacle object from the array
              this.obstacles.splice(i, 1);
              // Reduce player's lives by 1
              this.lives--;
              // Update the counter variable to account for the removed obstacle
              i--;
          } // If the obstacle is off the screen (at the bottom)
          else if (obstacle.top > this.height) {
              // Increase the score by 1
              this.score++;
              // Remove the obstacle from the DOM
              obstacle.element.remove();
              // Remove obstacle object from the array
              this.obstacles.splice(i, 1);
              // Update the counter variable to account for the removed obstacle
              i--;
          }
      }

      // If the lives are 0, end the game
      if (this.lives === 0) {
          this.endGame();
      }

      // Create a new obstacle based on a random probability
      // when there is no other obstacles on the screen
      if (Math.random() > 0.98 && this.obstacles.length < 10) {
          this.obstacles.push(new Obstacle(this.gameScreen));
      }
  }
}