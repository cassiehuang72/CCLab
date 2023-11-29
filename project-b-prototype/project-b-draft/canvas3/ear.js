class Ear {
  constructor() {
    this.img = img;
    this.x = random(width-this.img.width/2);
    this.y = random(this.img.height/2, height-this.img.height/2);
    this.sizeScale = random(0.3,0.8);
    this.duration = random(15000,20000);
    this.startTime = millis();
  }

  display() {
    push();
    translate(width, 0);
    scale(-1, 1);
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
}
