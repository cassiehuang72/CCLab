class Wind{
  constructor() {
    this.x = width/8;
    this.y = height/8;
    this.direction = "right";
  }
  update() {
	if (mostRecentWord == "blow") {
	}
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
    textSize(16);
    noStroke();
    if (mostRecentWord){
      fill('yellow');
      text(mostRecentWord, 6, 20);
      fill('cornflowerblue');
      text(mostRecentWord, 6, 45);
      fill('tomato');
      text(mostRecentWord, 6, 70);
      fill('limegreen');
      text(mostRecentWord, 6, 95);
    }
    else{
      let instruction = "Say Up, Down, Left, Right to control the wind direction"
      fill('yellow');
      text(instruction, 6, 20);
      fill('cornflowerblue');
      text(instruction, 6, 45);
      fill('tomato');
      text(instruction, 6, 70);
      fill('limegreen');
      text(instruction, 6, 95);
    }
    
    fill(360);
    noStroke();
    if (this.direction == "up"){
      push();
      translate(this.x, this.y);
      rotate(-PI/2)
      rectMode(CENTER)
      rect(0,0,80,10);
      triangle(30,-10,30,10,50,0)
      pop();
    }
    else if (this.direction == "down"){
      push();
      translate(this.x, this.y);
      rotate(PI/2)
      rectMode(CENTER)
      rect(0,0,80,10);
      triangle(30,-10,30,10,50,0)
      pop();
    }
    else if (this.direction == "left"){
      push();
      translate(this.x, this.y);
      rotate(PI)
      rectMode(CENTER)
      rect(0,0,80,10);
      triangle(30,-10,30,10,50,0)
      pop();
    }
    else{
      push();
      translate(this.x, this.y);
      rectMode(CENTER)
      rect(0,0,80,10);
      triangle(30,-10,30,10,50,0)
      pop();
    }
  }
}