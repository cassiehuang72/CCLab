// https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://www.auduno.com/clmtrackr/docs/reference.html
//face recognized and speech recognized, pixels appear and twist, last word showing and fading

let cam;
let w = 640,
  h = 480;

let tracker;
let positions;
let mouth = [];
let mouthArraySize = 30;

let gridSize = 20;
let midPointBr;
let pmidPointBr;

function setup() {
  let canvas = createCanvas(w, h);
  canvas.parent("canvasContainer");
  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();

  //colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(cam.elt);
}

function draw() {
  clear();
  background(0);
  translate(w, 0);
  scale(-1, 1);
  //noStroke();
  //image(cam, 0, 0, w, h);
  pixelsDisplay();
  positions = tracker.getCurrentPosition();
  
  if (positions.length > 0 && frameCount % 10 == 0) {
    mouth.push(new Mouth(positions));
  }

  for (let i = 0; i < mouth.length; i++) {
    mouth[i].display();
    mouth[i].measure();
    mouth[i].ifMouthOpened();
    if (mouth[i].opened == true) {
      //background(0);
      //pixelsChaos(mouth[i].mouthWidth, mouth[i].distance);
    } 
  }

  while (mouth.length > mouthArraySize) {
    mouth.splice(0, 1);
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
      circle(x + gridSize / 2, y + gridSize / 2, gridSize);
    }
  }
}

//chaos based on the mouth size
function pixelsChaos(mouthWidth,mouthHeight){
  //gridSize = 20;
  let mouthSize = mouthWidth * mouthHeight
  gridSize = map(mouthSize, 500, 1000, gridSize, 19);
  console.log(mouthSize,gridSize) //200-4000
  
}