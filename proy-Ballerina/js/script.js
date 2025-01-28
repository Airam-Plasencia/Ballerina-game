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
  function handleKeydown(event) {

    const key = event.key;
    const possibleKeystrokes = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];


    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();


      switch (key) {
        case "ArrowUp":
          game.player.startJumping();
          break;
        case "ArrowDown":
          game.player.startDodging();
          break;
        case "ArrowLeft":
          game.player.directionX = -5;
          game.player.element.src = "./images/Ballerina_04.png";
          break;
        case "ArrowRight":
          game.player.directionX = 5;
          game.player.element.src = "./images/Ballerina_05.png";
          break;
      }
    }
  }
  function handleKeyup(event) {
    const key = event.key;

    if (key === "ArrowUp") {
      game.player.stopJumping();
    } else if (key === "ArrowDown") {
      game.player.stopDodging();
    } else if (key === "ArrowLeft" || key === "ArrowRight") {
      game.player.directionX = 0;
      game.player.element.src = "./images/Ballerina_01.png";
    }
  }
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  
};
