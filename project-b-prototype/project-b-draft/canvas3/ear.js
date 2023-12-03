class Ear {
  constructor() {
    this.img = img;
    this.x = random(width-this.img.width/2);
    this.y = random(this.img.height/2, height-this.img.height/2);
    this.sizeScale = random(0.5,1);
    this.duration = random(10000,30000);
    this.startTime = millis();
    if (mostRecentWord){
      this.content = mostRecentWord
    }
  }

  display() {
    let elapsedTime = millis() - this.startTime;
    let alpha = 255 - map(elapsedTime, 0, this.duration, 0, 255);  
    push();
    translate(width, 0);
    scale(-1, 1);
    tint(255, alpha);
    image(img, this.x, this.y, this.img.width * this.sizeScale, this.img.height * this.sizeScale);
    pop();
  }
  
  move(){
    
  }
  
  checkDuration(){
    if (millis() - this.startTime > this.duration) {
      return true; 
    } else {
      return false; 
    }
  }
  
  displayText() {
    let opacity = 1 - (millis() - this.startTime) / this.duration;
    opacity = constrain(opacity, 0, 1)
    let size = int(26 * this.sizeScale)
    textSize(size);
    noStroke();
    if (this.content) {
      fill(color("cornflowerblue").levels[0], color("cornflowerblue").levels[1], color("cornflowerblue").levels[2], opacity * 255);
      text(this.content, width - this.x - this.img.width*this.sizeScale*1.4, this.y+this.img.height*this.sizeScale*0.6);
      fill(color("limegreen").levels[0], color("limegreen").levels[1], color("limegreen").levels[2], opacity * 255);
      text(this.content, width - this.x - this.img.width*this.sizeScale, this.y+this.img.height*this.sizeScale*1);

      push();
      textAlign(CENTER, CENTER);
      translate(width, 0);
      scale(-1, 1);
      fill(color("#9C27B0").levels[0], color("#9C27B0").levels[1], color("#9C27B0").levels[2], opacity * 255);
      text(this.content, this.x+this.img.width*this.sizeScale*1.2, this.y+this.img.height*this.sizeScale*0.8);
      fill(color("#CDDC39").levels[0], color("#CDDC39").levels[1], color("#CDDC39").levels[2], opacity * 255);
      text(this.content, this.x+this.img.width*this.sizeScale*0.6, this.y+this.img.height*this.sizeScale*1.2);
      pop();
    }
  }
}
