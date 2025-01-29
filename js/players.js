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
    this.jumpFrames = ["./images/Ballerina_04.png"];

    this.currentJumpFrame = 0;
    this.currentLeftFrame = 0;
    this.currentRightFrame = 0;
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

    this.leftImages = [ "./images/Ballerina_05.png" ];
    this.rightImages = [ "./images/Ballerina_02.png" ];


    this.animationInterval = null;
  }

  startJumping() {
    if (this.isJumping) return;
    this.isJumping = true;
    this.directionY = -10;
    this.currentJumpFrame = 0;
    this.updateJumpImage();
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
    this.element.src = "./images/Ballerina_03.png";
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
      this.updateJumpImage();
    }

    if (this.directionX < 0) {
      this.currentLeftFrame++;
      if (this.currentLeftFrame >= this.leftImages.length) {
        this.currentLeftFrame = 0;
      }
      this.element.src = this.leftImages[this.currentLeftFrame];
    }

    else if (this.directionX > 0) {
      this.currentRightFrame++;
      if (this.currentRightFrame >= this.rightImages.length) {
        this.currentRightFrame = 0;
      }
      this.element.src = this.rightImages[this.currentRightFrame];
    }

    else if (!this.isJumping && !this.isDodging) {
      this.element.src = "./images/Ballerina_01.png";
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
  updateJumpImage() {
    if (this.isJumping) {
      this.element.src = this.jumpFrames[this.currentJumpFrame];
    }
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