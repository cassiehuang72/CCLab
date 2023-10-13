function setup() {
    let canvas = createCanvas(400, 400);
    //canvas.id("illustration") //directly assign an id to the canvas
    canvas.parent("illustration") //add the canvas to a div with id illustration
  }
  
  function draw() {
    background(220);
  }