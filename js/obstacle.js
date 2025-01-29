class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = this.gameScreen.offsetWidth;
      this.top = Math.floor(Math.random() * 600 + 70);
      this.width = 80;
      this.height = 80;
      this.element = document.createElement("img");
  
      this.element.src = "./images/swan-trasnparent.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
      this.horizontalSpeed = 8;
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      this.left -= this.horizontalSpeed;
      if (this.left < -this.width) {
        this.left = this.gameScreen.offsetWidth;
      }

      this.updatePosition();
    }
  }