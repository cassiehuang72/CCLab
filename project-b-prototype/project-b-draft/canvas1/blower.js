class Blower{
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.color = "pink";
  }
  display(other) {
    stroke(this.color)
    noFill();
    push();
    translate(mouseX, mouseY)
    if (other.direction == "left"){
      rotate(-PI/6)
    }
    if (other.direction == "right"){
      rotate(PI/6)
    }
    strokeWeight(5)
    ellipse(0,0,30,80);
    rectMode(CENTER)
    fill(this.color)
    rect(0,70,3,60)
    rect(0,130,5,60)
    pop();
  }
  updateColor(){
    if (mostRecentWord == "pink") {
      this.color = "pink"
	}
    if (mostRecentWord == "purple") {
      this.color = "rgb(203, 195, 227)"
	}
    if (mostRecentWord == "blue"){
      this.color = "rgb(137,186,243)"
    }
    if (mostRecentWord == "red") {
      this.color = "tomato"
	}
  }
}