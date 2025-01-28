class Game {
  constructor() {
    this.backgroundMusic = document.getElementsByClassName("background-music")[0];
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5;
    this.startScreen = document.getElementsByClassName("game-intro")[0];
    this.gameScreen = document.getElementsByClassName("game-screen")[0];
    this.gameEndScreen = document.getElementsByClassName("game-end")[0];
    this.player = new Player(
      this.gameScreen,
      0,
      420,
      80,
      120,
      "./images/Ballerina_01.png"
    );
    this.height = 600;
    this.width = 900;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.scoreIntervalId = null;
    this.obstacleSpawnInterval = 2000;
    this.timeElapsed = 0;
  }


  start() {

    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameEndScreen.style.display = "none";

    this.backgroundMusic.play();

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency)
    this.scoreIntervalId = setInterval(() => {
      if (!this.gameIsOver) {
        this.score++;
        document.getElementById("score").textContent = this.score;
      }
    }, 100);
    setInterval(() => {
      if (!this.gameIsOver) {
        this.spawnObstacle();
      }
    }, this.obstacleSpawnInterval);
  }

  gameLoop() {
    console.log("in the game loop");

    this.update();


    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      clearInterval(this.scoreIntervalId);
      clearInterval(this.obstacleSpawnInterval);
      this.showGameOverScreen();
      this.backgroundMusic.pause();
    }

    this.timeElapsed++;
    if (this.timeElapsed % 30 === 0 && this.timeElapsed > 0) {
      this.increaseObstacleSpawnRate();
    }
  }

  update() {
    this.player.move();


    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();


      if (this.player.didCollide(obstacle)) {

        this.lives--;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);

        i--;
        if (this.lives <= 0) {
          this.gameIsOver = true;
        }
      }
      else if (obstacle.left < -obstacle.width) {

        obstacle.element.remove();

        this.obstacles.splice(i, 1);

        i--;
      }
    }


    if (this.lives === 0) {
      this.endGame();
    }
    document.getElementById("score").textContent = this.score;
    document.getElementById("lives").textContent = this.lives;

    if (Math.random() > 0.98 && this.obstacles.length < 10) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }
  endGame() {
    this.gameIsOver = true;
  }

  showGameOverScreen() {

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
} 