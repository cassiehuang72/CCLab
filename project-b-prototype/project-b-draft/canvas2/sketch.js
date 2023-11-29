// https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://www.auduno.com/clmtrackr/docs/reference.html
//face recognized and speech recognized, pixels appear and twist, last word showing and fading

let cam;
let w = 640,
  h = 480;
let gridSize = 20;

let tracker;
let positions;
let theMouth;

let message = "Open Your Mouth to See What Will Happen";
let duration = 60;
let counter = 0;

function setup() {
  let canvas = createCanvas(w, h);
  //canvas.parent("canvasContainer");
  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();

  //colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(cam.elt);
}

function draw() {
  if (counter < duration) {
    fill(0, 0, 0); // Set text color to red
    textSize(20);
    textAlign(CENTER, CENTER);
    text(message, width / 2, height / 2);
    counter++;
  } else {
    clear();

    background(0);
    translate(w, 0);
    scale(-1, 1);
    noStroke();
    image(cam, 0, 0, w, h);
    pixelsDisplay();
    positions = tracker.getCurrentPosition();

    push();
    translate(width, 0);
    scale(-1, 1);
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Speaking Extent", 85, 20);
    pop();

    theMouth = new Mouth(positions);
    if (theMouth.positions) {
      theMouth.measure();
      theMouth.ifMouthOpened();
      if (theMouth.opened == true) {
        //background(0);
        pixelsChaos(theMouth.mouthWidth, theMouth.distance);
      } else {
        gridSize = 20;
      }
      theMouth.display();
    }
  }
}

function pixelsDisplay() {
  cam.loadPixels();

  for (let x = 0; x < cam.width; x += gridSize) {
    for (let y = 0; y < cam.height; y += gridSize) {
      let index = (x + y * cam.width) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      fill(r, g, b);
      push();
      //translate(0,0)
      circle(x + gridSize / 2, y + gridSize / 2, gridSize);
      pop();
    }
  }
  cam.updatePixels();
}

//chaos based on the mouth size
function pixelsChaos(mouthWidth, mouthHeight) {
  //gridSize = 20;
  let mouthSize = mouthWidth * mouthHeight;
  //gridSize = int(map(mouthSize, 500, 1000, gridSize, 19));
  gridSize = int(map(mouthSize, 500, 1000, 20, 10));
  gridSize = int(constrain(gridSize, 10, 20));
  //console.log(mouthSize, gridSize); //200-4000
  
}
