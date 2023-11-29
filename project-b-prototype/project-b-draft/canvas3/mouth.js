class Mouth {
  constructor(positions) {
    this.positions = positions;
    this.opened = false;
    this.defaultClosingValue = 8;
    this.mouthWidth = 0;
    this.mouthHeight = 0;
    this.distance = 0;
  }

  display() {
    stroke("rgba(141,117,122,0.95)");
    fill("rgba(164,28,28,0.75)");
    //upper lip
    beginShape();
    for (let i = 44; i <= 50; i++) {
      vertex(this.positions[i][0], this.positions[i][1] - 1);
    }
    vertex(this.positions[59][0], this.positions[59][1] + 1);
    vertex(this.positions[60][0], this.positions[60][1] + 1);
    vertex(this.positions[61][0], this.positions[61][1] + 1);

    endShape(CLOSE);

    //bottom lip
    beginShape();
    fill("rgba(164,28,28,0.75)"); //(208,9,9)(171,0,0,150)
    vertex(this.positions[44][0], this.positions[44][1]);
    vertex(this.positions[56][0], this.positions[56][1]);
    vertex(this.positions[57][0], this.positions[57][1]);
    vertex(this.positions[58][0], this.positions[58][1]);

    for (let i = 50; i <= 55; i++) {
      vertex(this.positions[i][0], this.positions[i][1] + 2);
    }
    endShape(CLOSE);
  }

  measure() {
    if (this.positions.length > 0) {
      let mouthLeft = createVector(
        this.positions[44][0],
        this.positions[44][1]
      );
      let mouthRight = createVector(
        this.positions[50][0],
        this.positions[50][1]
      );
      let mouthTop = createVector(this.positions[47][0], this.positions[47][1]);
      let mouthBottom = createVector(
        this.positions[53][0],
        this.positions[53][1]
      );

      this.mouthWidth = mouthLeft.dist(mouthRight);
      this.mouthHeight = mouthTop.dist(mouthBottom);
      //console.log(height)
      push();
      translate(width, 0);
      scale(-1, 1);
      fill("yellow");
      rect(20, 40, (this.mouthHeight * this.mouthWidth) / 20, 20);
      pop();
    }
  }

  ifMouthOpened() {
    let upperLipBottom = createVector(
      this.positions[60][0],
      this.positions[60][1]
    );
    let bottomLipTop = createVector(
      this.positions[57][0],
      this.positions[57][1]
    );
    this.distance = upperLipBottom.dist(bottomLipTop);
    //console.log(distance)
    //distance is always smaller than 8 when close mouth
    if (this.distance > this.defaultClosingValue) {
      this.opened = true;
    } else {
      this.opened = false;
    }
    //console.log(this.opened)
  }
}
