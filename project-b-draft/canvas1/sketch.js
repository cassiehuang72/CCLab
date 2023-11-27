//reference: https://editor.p5js.org/re7l/sketches/Zj-Uya9Fd
//instructions: blow, left,right, up, down.
let myRec;
let bubbles = [];
let wind;
let mostRecentWord;
let computerVoice = new p5.Speech();

function setup() {
  let cnv = createCanvas(450, 450);
  cnv.parent("canvasContainer")
  wind= new Wind();
  strokeWeight(2)
  computerVoice.speak(
    "Which direction do you want the bubbles to go?"
  );
  
  myRec = new p5.SpeechRec("en-US");
  myRec.continuous = true;
  myRec.interimResults = true;
  myRec.onResult = parseResult;
  myRec.start();
  
  // do continuous recognition
  // allow partial results - this will detect words as they are said and will call the parse function as soon as a word is decoded when a pause in conversation occurs the entire string will be sent to the parse function define our parse function (called every time a word/phrase is detected)
  // start the recording engine
}

function draw() {
    background(50);
    noStroke();
    if (mouseIsPressed){
      bubbles.push(new Bubble(mouseX, mouseY));
    }
  
    // update and display bubbles
    for (let i = 0; i < bubbles.length; i++) {
      let p = bubbles[i];
      p.move();
      p.display();
      p.updateDirection(wind)
      if(p.checkDuration() || p.x > width || p.x < 0 || p.y < 0 || p.y > height){
        bubbles.splice(i,1)
      }
    }
  
    while(bubbles.length > 100){
      bubbles.splice(0,1)
    }
  
    wind.update();
    wind.display();
}

// called every time a word/phrase is detected
function parseResult() {
    // myRec.resultString is the current result
    text(myRec.resultString, 25, 25);
    console.log(myRec.resultString);

	// grab the most recent word (the word on the right side of the string)
	let wordArray = myRec.resultString.split(' ');
	mostRecentWord = wordArray[ wordArray.length-1 ];
}
