let x = [];
let y = [];
let speedX = [];
let speedY = [];
let noiseBallSize = [];
let eyeShape = [];
let h = [];
let snackX = [];
let snackY = [];
let snackType = [];
let snackColor = []
let yoff = 0;
let noiseLocation = 0;
let currentMode = 0;
let mouseClickedBlobby = false;
let mouseClickedSnack = false;
let colorSwitched = [];
let thresholdBallSize = 40;

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvasContainer1");
  background(0);
  colorMode(HSB);
  noiseDetail(24);
  noStroke();
}

function draw() {
  background(0, 10);

  //background
  let surfaceColor = color(195, 100, 100); // Light blue
  let deepColor = color(240, 100, 55);   // Dark blue

  // Create a gradient from the surface color to the deep color
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let blendedColor = lerpColor(surfaceColor, deepColor, inter);
    stroke(blendedColor);
    line(0, y, width, y);
  }
  
  
  //initialize
  if (currentMode == 0) {
    if (mouseIsPressed && !mouseClickedBlobby) {
      speedX.push(random(-0.5, 0.5));
      speedY.push(random(-0.5, 0.5));
      x.push(mouseX);
      y.push(mouseY);
      h.push(random(360));
      colorSwitched.push(false);

      let randomBoo = Math.random() < 0.5;
      eyeShape.push(randomBoo);

      xNoiseOffset = random(0, 1000);
      yNoiseOffset = random(1000, 2000);
      noiseValue = noise(noiseLocation);
      BallSize = map(noiseValue, 0, 1, 20, 25);
      noiseBallSize.push(BallSize);
      xNoiseOffset += 0.01;
      yNoiseOffset += 0.01;
      noiseLocation += 0.005;
      mouseClickedBlobby = true;
    } 
    else if (!mouseIsPressed) {
      mouseClickedBlobby = false;
    }
  } 
  else if (currentMode === 1) {
    if (mouseIsPressed && !mouseClickedSnack) {
      snackX.push(mouseX);
      snackY.push(mouseY);
      let randomSnackBoo = Math.random() < 0.5;
      snackType.push(randomSnackBoo);
      snackColor.push(random(360));
      mouseClickedSnack = true;
    } 
    else if (!mouseIsPressed) {
      mouseClickedSnack = false;
    }
  }

  //detect dist and eat snacks
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < snackX.length; j++) {
      let d = dist(x[i], y[i], snackX[j], snackY[j]);
      if (d < noiseBallSize[i]) {
        snackX.splice(j, 1);
        snackY.splice(j, 1);
        snackType.splice(j, 1);
        snackColor.splice(j, 1);
        noiseBallSize[i] += random(3, 5);
      }
    }
  }

  //switch color when come across
  for (let i = 0; i < x.length; i++) {
    for (let j = i + 1; j < x.length; j++) {
      let distance = dist(x[i], y[i], x[j], y[j]);
      if (distance < noiseBallSize[i]) {
          let temph = h[i];
          let temphj = h[j];
          h[i] = temph;
          h[j] = temph;
      }
    }
  }

  //draw snacks
  for (let i = 0; i < snackX.length; i++) {
    drawSnack(snackX[i], snackY[i], snackType[i],snackColor[i]);
  }

  //draw blobbys
  for (let i = 0; i < speedX.length; i++) {
    drawBlobby(x[i], y[i], noiseBallSize[i], h[i], eyeShape[i]);
    if (noiseBallSize[i] < thresholdBallSize) {
      noiseBallSize[i] += 0.1;
      x[i] += speedX[i];
      y[i] += speedY[i];
    } else {
      x[i] -= speedX[i];
      y[i] -= speedY[i];
    }

    if (noiseBallSize[i] > 50){
      //add two small one
      speedX.push(-speedX[i]);
      speedY.push(-speedY[i]);
      x.push(x[i]);
      y.push(y[i]);
      h.push(h[i]);
      eyeShape.push(eyeShape[i]);
      noiseBallSize.push(noiseBallSize[i]/4);

      speedX.push(speedX[i]);
      speedY.push(speedY[i]);
      x.push(x[i]);
      y.push(y[i]);
      h.push(h[i]);
      eyeShape.push(eyeShape[i]);
      noiseBallSize.push(noiseBallSize[i]/4);

      //delete the big one
      speedX.splice(i,1);
      speedY.splice(i,1);
      x.splice(i,1);
      y.splice(i,1);
      h.splice(i,1);
      eyeShape.splice(i,1);
      noiseBallSize.splice(i,1);
    }
  }
}

function drawBlobby(x, y, noiseBallSize, h, eyeShape) {
  noStroke();
  fill(h / 2,100,100);
  triangle(x,y-1.5*noiseBallSize,x-noiseBallSize / 4,y-noiseBallSize / 2 ,x+noiseBallSize / 4,y-noiseBallSize / 2);
  
  //tail
  stroke(220);
  noFill();
  for (let startP = -5; startP <= 5; startP +=5){
    let frequency = 0.05; 
    let amplitude = 5; 
    push();
    translate(x+startP, y+startP); 
    beginShape();
  
    for (let y0 = 0; y0 < 100; y0 += 10) {
      let x0 = amplitude * sin(frequency * y0 + frameCount * 0.05);
      curveVertex(x0, y0);
    }

    endShape();
    pop();

  }
  
  noStroke();
  fill(h, 100, 100);
  push();
  translate(x, y);
  beginShape();
  let xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    let offset = map(noise(xoff, yoff), 0, 1, -15, 15);
    let r = noiseBallSize + offset;
    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);
    xoff += PI / 5.15;
  }
  endShape();

  yoff += random(0.01, 0.02);
  pop();

  if (eyeShape) {
    fill(220);
    ellipse(x - noiseBallSize / 3, y, noiseBallSize / 5, noiseBallSize / 3);
    ellipse(x + noiseBallSize / 3, y, noiseBallSize / 5, noiseBallSize / 3);
    ellipse(x, y + noiseBallSize / 2, noiseBallSize, noiseBallSize / 2);

    fill(0)
    ellipse(x - noiseBallSize / 3, y, noiseBallSize / 7, noiseBallSize / 8);
    ellipse(x + noiseBallSize / 3, y, noiseBallSize / 7, noiseBallSize / 8);
    fill(350, 25, 100);
    ellipse(x, y + 3* noiseBallSize / 6, noiseBallSize / 2, noiseBallSize / 6);
  } else {
    rectMode(CENTER);
    fill(220);
    rect(x - noiseBallSize / 3, y, noiseBallSize / 5, noiseBallSize / 3);
    rect(x + noiseBallSize / 3, y, noiseBallSize / 5, noiseBallSize / 3);
    rect(x, y + noiseBallSize / 2, noiseBallSize / 2, noiseBallSize / 2);
    fill(0);
    rect(x - noiseBallSize / 3, y, noiseBallSize / 7, noiseBallSize / 8);
    rect(x + noiseBallSize / 3, y, noiseBallSize / 7, noiseBallSize / 8);
    fill(350, 25, 100);
    rect(x, y + 4 * noiseBallSize / 6, noiseBallSize / 2, noiseBallSize / 6);
  }
}

function drawSnack(x, y, snackType,snackColor) {
  noStroke();
  fill(snackColor,100,100);
  if (snackType) {
    circle(x, y, 10);
  } else {
    triangle(x, y - 8, x - 10 / 2, y + 10 / 2, x + 10 / 2, y + 10 / 2);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    currentMode = (currentMode + 1) % 2;
  }
}

//blobby shape, body shape, grow in to a fixed size, change direction, switch color when come across, eat snacks, grow into another size, divide and grow. 
