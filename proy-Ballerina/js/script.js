window.onload = function () {
  const startButton = document.getElementsByClassName("start-button")[0];
  const restartButton = document.getElementsByClassName("restart-button")[0];
  restartButton.addEventListener("click", function () {
    
    restartGame();
  });

  
  function restartGame() {
    location.reload();
  }


  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    game = new Game();
    game.start();
  }
}