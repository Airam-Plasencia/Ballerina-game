class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.isJumping = false;
    this.isDodging = false;
    this.jumpFrames = ["./images/Ballerina_02.png",];
    this.currentJumpFrame = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);

    this.jumpInterval = null;
    this.dodgetimeout = null;
  }
  startJumping() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.directionY = -10;
    this.currentJumpFrame = 0;
  }

  stopJumping() {
    this.isJumping = false;
    this.directionY = 0;
    this.element.src = "./images/Ballerina_01.png";
  }

  startDodging() {
    if (this.isDodging) return;
    this.isDodging = true;
    this.directionY = 4;
    this.element.src = "./images/Ballerina_03.png"
  }

  stopDodging() {
    this.isDodging = false;
    this.directionY = 0;
    this.element.src = "./images/Ballerina_01.png";
    clearTimeout(this.dodgeTimeout);
  }
  move() {

    this.left += this.directionX;
    this.top += this.directionY;

    if (this.isJumping) {
      this.element.src = this.jumpFrames[this.currentJumpFrame];
      this.currentJumpFrame++;

      if (this.currentJumpFrame >= this.jumpFrames.length) {
        this.currentJumpFrame = 0;
      }
    } else if (!this.isDodging) {
      this.element.src = "./images/Ballerina_01.png";
    } else {
      this.element.src = "./images/Ballerina_03.png";
    }

    if (this.left < 10) {
      this.left = 10;
    }


    if (this.top < 10) {
      this.top = 10;
    }


    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }


    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }


    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();


    return !(playerRect.right < obstacleRect.left ||
      playerRect.left > obstacleRect.right ||
      playerRect.bottom < obstacleRect.top ||
      playerRect.top > obstacleRect.bottom);
  }
}