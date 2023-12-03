class Wind{
  constructor() {
    this.x = width/7;
    this.y = height/3;
    this.direction = "right";
  }
  update() {
	// if (mostRecentWord == "blow") {
	// }
	if (mostRecentWord == "up") {
      this.direction = "up";
	}
	if (mostRecentWord == "down") {
      this.direction = "down";
	}
	if (mostRecentWord == "left") {
      this.direction = "left";
      this.speedX = this.speedX
	}
	if (mostRecentWord == "right") {
      this.direction = "right";
	}
  }
  display() {
    textSize(20);
    noStroke();
    if (mostRecentWord){
      fill('yellow');
      text(mostRecentWord, this.x, this.y-50);
      fill('cornflowerblue');
      text(mostRecentWord, this.x, this.y-25);
      fill('tomato');
      text(mostRecentWord, this.x, this.y);
      fill('limegreen');
      text(mostRecentWord, this.x, this.y+25);
    }
    else{
      let instruction = "Command Options: Up, Down, Left, Right, Blow, Pink, Blue, Purple ...."
      fill('yellow');
      text(instruction, this.x, this.y-50);
      fill('cornflowerblue');
      text(instruction, this.x, this.y-25);
      fill('tomato');
      text(instruction, this.x, this.y);
      fill('limegreen');
      text(instruction, this.x, this.y+25);
    }
    
    fill(360);
    noStroke();
    if (this.direction == "up"){
      push();
      translate(this.x, this.y);
      rotate(-PI/2)
      rectMode(CORNER)
      rect(0,-10,80,10);
      triangle(80,-15,80,5,100,-5);
      pop();
    }
    else if (this.direction == "down"){
      push();
      translate(this.x, this.y);
      rotate(PI/2)
      rectMode(CORNER)
      rect(0,0,80,10);
      triangle(80,-5,80,15,100,5)
      pop();
    }
    else if (this.direction == "left"){
      push();
      translate(this.x, this.y);
      rotate(PI)
      rectMode(CORNER)
      rect(0,0,80,10);
      triangle(80,-5,80,15,100,5)
      pop();
    }
    else{
      push();
      translate(this.x, this.y);
      rectMode(CORNER)
      rect(0,0,80,10);
      triangle(80,-5,80,15,100,5)
      pop();
    }
  }
}