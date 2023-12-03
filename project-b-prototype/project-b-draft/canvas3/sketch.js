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

let message = "Talk and See What Will Happen";
let duration = 100;
let counter = 0;

function preload() {
  img = loadImage("ear1.png");
}

function setup() {
  let cimg = createCanvas(windowWidth, windowHeight);
  //canvas.parent("canvasContainer");
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
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
  if (counter < duration) {
    fill(255); 
    textSize(20);
    //textAlign(CENTER, CENTER);
    text(message, width / 2-100, height / 2);
    counter++;
  } else {
  clear();

  background(50);
  translate(windowWidth, 0);
  scale(-1, 1);
  noStroke();
  positions = tracker.getCurrentPosition();

  push();
  translate(width, 0);
  scale(-1, 1);
  //image(img, 0, 0, img.width*0.5,img.height*0.5);
  fill("white");
  textAlign(CORNER,CORNER);
  textSize(20);
  text("Speaking Extent", windowWidth/7, windowHeight/3.5);
  pop();

  //image(img, mouseX, mouseY, img.width * 0.3, img.height * 0.3)
  if (mostRecentWord && frameCount % 50 == 0) {
    ears.push(new Ear());
  }
  for (let i = 0; i < ears.length; i++) {
    //ears[i].disappear();
    ears[i].display();
    ears[i].displayText();
    if (ears[i].checkDuration()) {
      ears.splice(i, 1);
    }
  }
  // while (ears.length > 10) {
  //   ears.splice(0, 1);
  // }

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
