class Bubble {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(10,50);
    this.speedX = random(3);
    this.speedY = random(2);
    this.hOffset = random(-20,40)
    this.resistanceX = random(this.speedX+0.1,this.speedX+3);
    this.resistanceY = random(this.speedY+0.1,this.speedY+3);
    this.duration = random(5000,8000);
    this.startTime = millis();
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  display() {
    colorMode(HSB)
    conicGradient(
    0, this.x, this.y,//Start angle, pX, pY
    [
      color(190+this.hOffset, 100, 100, 100),
      color(350+this.hOffset, 25, 100,100),
      color(210+this.hOffset, 100, 100, 100),
      color(0, 0, 50,100),
      color(350, 25, 100,100)
    ]
    );
    colorMode(RGB)
    fill(255,255,255,40)
    ellipse(this.x, this.y, this.dia,this.dia);
    noStroke()
    fill(255)
    bezier(this.x+this.dia/6, this.y-this.dia/3,this.x+this.dia/2, this.y,this.x+this.dia/6, this.y+this.dia/2,this.x+this.dia/5, this.y)
    circle(this.x+this.dia/6,this.y+this.dia/3,this.dia/8)

    stroke(255);
  }
  updateDirection(other){
    if (other.direction == "left"){
      this.speedX = abs(this.speedX)-this.resistanceX        
    }
    else if (other.direction == "right"){
      this.speedX = abs(this.speedX)
    }
    else if (other.direction == "up"){
      this.speedY = abs(this.speedY) - this.resistanceY
    }
    else if (other.direction == "down"){
      this.speedY = abs(this.speedY)
    }
  }
  checkDuration(){
    if (millis() - this.startTime > this.duration) {
      return true; 
    } else {
      return false; 
    }
  }
}

function conicGradient(sA, sX, sY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, sX, sY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.2, colors[1]);
  gradient.addColorStop(0.4, colors[2]);
  gradient.addColorStop(0.6, colors[3]);
  gradient.addColorStop(0.8, colors[4]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.strokeStyle = gradient;
}