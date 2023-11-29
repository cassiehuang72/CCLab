// https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://www.auduno.com/clmtrackr/docs/reference.html
//face recognized and speech recognized, last word showing and fading

let cam;
let w = 640,
  h = 480;
let gridSize = 20;

let tracker;
let positions;
let theMouth;

let myRec;
let mostRecentWord;

let img;
let ears = [];

function preload() {
  img = loadImage("ear1.png");
}

function setup() {
  let cimg = createCanvas(w, h);
  //canvas.parent("canvasContainer");
  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();

  //colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(cam.elt);

  myRec = new p5.SpeechRec("en-US");
  myRec.continuous = true;
  myRec.interimResults = true;
  myRec.onResult = parseResult;
  myRec.start();
}

function draw() {
  clear();

  background(0);
  translate(w, 0);
  scale(-1, 1);
  noStroke();
  positions = tracker.getCurrentPosition();

  push();
  translate(width, 0);
  scale(-1, 1);
  //image(img, 0, 0, img.width*0.5,img.height*0.5);
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Speaking Extent", 85, 20);
  pop();

  //image(img, mouseX, mouseY, img.width * 0.3, img.height * 0.3)
  if (mostRecentWord && frameCount % 50 == 0) {
    ears.push(new Ear());
  }
  for (let i = 0; i < ears.length; i++) {
    //ears[i].disappear();
    ears[i].display();
    if (ears[i].checkDuration()) {
      ears.splice(i, 1);
    }
  }
  while (ears.length > 10) {
    ears.splice(0, 1);
  }

  theMouth = new Mouth(positions);
  if (theMouth.positions) {
    theMouth.measure();
    theMouth.ifMouthOpened();
    if (theMouth.opened == true) {
      //background(0);
    } else {
      gridSize = 20;
    }
    theMouth.display();
  }

  textSize(22);
  noStroke();
  if (mostRecentWord) {
    fill("cornflowerblue");
    text(mostRecentWord, 50, 45);
    fill("limegreen");
    text(mostRecentWord, 50, 95);
    
    push();
    textAlign(CENTER, CENTER);
    translate(width, 0);
    scale(-1, 1);
    fill("#9C27B0");
    text(mostRecentWord, width-50, 20);
    fill("#CDDC39");
    text(mostRecentWord, width-50, 70);
    pop();
  }
}

function parseResult() {
  // myRec.resultString is the current result
  text(myRec.resultString, 25, 25);
  console.log(myRec.resultString);

  // grab the most recent word (the word on the right side of the string)
  let wordArray = myRec.resultString.split(" ");
  mostRecentWord = wordArray[wordArray.length - 1];
}
