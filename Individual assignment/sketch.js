//Compared to group work, a lot of random data is removed to avoid the subsequent animation effect being too cluttered
let x;
let y;
let rad;
let Colors = [];
let patternCount = 0;

function preload() {
  Sound = loadSound('assets/THE DAWN.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);// Create a canvas that spans the entire width and height of the window.
  background(0, 91, 130);
rad = 70;
//Getting audio properties
fft = new p5.FFT();
amplitude = new p5.Amplitude();
//Create an array of colors
for (let i = 0; i < 100; i++) {
  Colors.push(getRandomPastelColor());
}
}

function draw() {
  let trebleEnergy = fft.getEnergy("treble");
  //Regenerate the color array if the treble energy value exceeds the threshold value
  if (trebleEnergy > 140) {
    generateColors();
  }

  background(0, 91, 130);
  drawInitialPattern();
}


//Generate images and sort them in a certain order，based on drawPattern
function drawInitialPattern() {
  push();
  //Let the image be tilted at a certain angle to correspond to the original image
  translate(width / 2, height / 2);
  rotate(-PI / 12);

  let spaceBetween = rad * 2.5;
  let rowCount = 0;
  // Create a grid of patterns by looping
  for (let j = -height; j < height; j += spaceBetween) {
    let offsetX = 0;
    let columnCount = 0; // Reset the column counter at the start of each new row

    // Determine whether the current row is even or odd, if it is odd, then move one circle radius to the right
    if ((rowCount + height / spaceBetween) % 2 == 1) {
      offsetX = rad; 
    }

    for (let i = -width + offsetX; i < width; i += spaceBetween) {
      // Generate indexes based on row and column positions
      let index = rowCount * Math.ceil(width / spaceBetween) + columnCount;
      drawPattern(i, j, index);
      columnCount++;
    }
    rowCount++;
  }
  pop();

}


//Draw single image，based on other functions below
function drawPattern(x, y, index) {
  fft.analyze();
  let vol = amplitude.getLevel();
  let diam = map(vol, 0, 1, 70, rad * 2);
  //Ring belt section
  drawOuterRing(x, y, rad * 1.35, fft);

  //Select outer layer pattern
  if (index % 4 === 0 || index % 4 === 1) { //Even index
    drawDottedLayer(x, y, rad * 0.65, 8, 10, vol);
  } else { //Odd index
    drawTriangleStripLayer(x, y, diam * 1.25, 80);
  }

  //Select the middle pattern in the same way
  if (index % 4 === 0 || index % 4 === 3) {
    drawRingLayer(x, y, diam * 0.6, 4, vol);
  } else {
    drawDottedLayer(x, y, rad * 0.5, 8, 18, vol);
  }
  //Core section,drawing from the outside in to avoid overlay
  drawCore(x, y, diam);

  if (!isInitialized) {
    //Initialise control points for RandomLine
    initialControlX1 = x + 0.5 * rad;
    initialControlY1 = y
    initialControlX2 = x + ( + 0.5) * rad;
    initialControlY2 = y + (+ 0.5) * rad;
    initialEndX = x + ( + 0.5) * rad;
    initialEndY = y + ( + 0.5) * rad;
    isInitialized = true;
  }
  drawRandomLine(x, y, rad, fft);
  isInitialized = false;
}


//Set random color for colors array
function getRandomPastelColor() {
  let r = random(50, 255);
  let g = random(50, 255);
  let b = random(50, 255);
  return color(r, g, b);
}


//Regenerate the color array
function generateColors() {
  Colors = []; // 清空颜色数组
  for (let i = 0; i < 100; i++) {
    Colors.push(getRandomPastelColor());
  }
}


//Draw the Core Circle
function drawCore(x, y, Rad) {
  noStroke();
  for (let i = 0; i < 5; i++) {
    fill(Colors[i]);
    let currentRad = Rad * (1 - i * 0.2); // Use the amplitude level to set the radius
    ellipse(x, y, currentRad, currentRad);
  }
}


//Draw dot alignments for middle and outer layers
function drawDottedLayer(x, y, rad, numLayers, dotsPerLayer, vol) {
  let layerOffset = rad / numLayers; //Distance between each level
  let angleOffset;
  let dotColor = Colors[77]; 

  //Calculate the radius of the outermost layer
  let outerLayerRad = rad + (numLayers - 1) * layerOffset;

  //Draw a uniform circular background
  fill(Colors[88]);
  ellipse(x, y, outerLayerRad * 2);
  noStroke();

  //Maps the size of the dots to the volume, the louder the volume, the bigger the dot
  let maxDotSize = rad * 0.5; //Maximum Dot Size
  let minDotSize = rad * 0.05; //Minimum Dot Size

  let currentDotSize = map(vol, 0, 1, minDotSize, maxDotSize);


  for (let i = 1; i <= numLayers; i++) {
    let currentRad = rad + (i - 1) * layerOffset; //Radius of the current layer
    angleOffset = TWO_PI / (dotsPerLayer * i); //Angular offset for each point of the current layer
    //Draw dot
    for (let j = 0; j < TWO_PI; j += angleOffset) {
      let dotX = x + currentRad * cos(j);
      let dotY = y + currentRad * sin(j);
      fill(dotColor);
      ellipse(dotX, dotY, currentDotSize);
    }
  }
}


//Draw ring alignments for middle layers
function drawRingLayer(x, y, rad, numLayers, vol) {
  let layerOffset = rad / numLayers; // Distance between each layer

  noStroke();

  for (let i = numLayers; i >= 1; i--) {
    let currentRad = rad + (i - 1) * layerOffset; // Radius of the current layer

    //Calculates transparency based on audio level, the higher the level, the higher the transparency.
    let alpha = map(vol, 0, 1, 150, 255); //Transparency changes from semi-transparent to completely opaque

    let c = Colors[i % Colors.length];
    fill(red(c), green(c), blue(c), alpha); //Application transparency

    ellipse(x, y, currentRad * 2, currentRad * 2);
  }
}


//Draw triangle lines for outer layers
function drawTriangleStripLayer(x, y, rad, numTriangles) {
  let angleOffset = TWO_PI / numTriangles;  //Angular offset for each triangle
  
  //Draw filled background circles without borders
  fill(Colors[81]);
  noStroke();
  ellipse(x, y, 89 * 2);
  
  let innerRad = rad * 0.8;  //Set up a small circle for triangles to be arranged around
  strokeWeight(1);
  stroke(Colors[90]);

  for (let i = 0; i < TWO_PI; i += angleOffset) {
    noFill();
    
    //center of circle
    let centerX = x;
    let centerY = y;
    //The first vertex of the triangle, from the edge of the small circle
    let firstX = centerX + innerRad * cos(i);
    let firstY = centerY + innerRad * sin(i);
    //The second vertex of the triangle, extending to the edge of the great circle
    let secondX = centerX + rad * cos(i);
    let secondY = centerY + rad * sin(i);
    // The third vertex of the triangle, back to the edge of the small circle
    let thirdX = centerX + innerRad * cos(i + angleOffset);
    let thirdY = centerY + innerRad * sin(i + angleOffset);
    //Line vertexs
    beginShape();
    vertex(firstX, firstY);      
    vertex(secondX, secondY);    
    vertex(thirdX, thirdY);      
    endShape(CLOSE);
  }
}


//Draw outer ring belt
function drawOuterRing(centerX, centerY, maxRadius, fft) {
  let angleOffset = radians(15); // Set the angular interval between each element
  //Obtain the energy of the low audio by FFT and mapping it to the rotational velocity
  let bassEnergy = fft.getEnergy("bass");
  let rotationSpeed = map(bassEnergy, 0, 255, 0, radians(0.05)); // No rotation if energy is 0
  let rotationAngle = rotationSpeed * frameCount % 600; // Calculate the rotation angle based on the number of frames

  push(); 
  translate(centerX, centerY);
  rotate(rotationAngle); //Application Rotation

  //Draw Connection Lines
  for (let angle = 0; angle < TWO_PI; angle += angleOffset) {
    //Calculation of the start and end points of the connection line
    let startX = maxRadius * cos(angle);
    let startY = maxRadius * sin(angle);
    let endX = maxRadius * cos(angle + angleOffset);
    let endY = maxRadius * sin(angle + angleOffset);
    stroke(getRandomPastelColor());
    strokeWeight(1.5);
    line(startX, startY, endX, endY); 

    //Draw Black and White Orange Circles
    drawColoredRing(startX, startY, maxRadius * 0.05);

    // Calculate and draw ellipses
    let ellipseX = maxRadius * cos(angle + angleOffset / 2);
    let ellipseY = maxRadius * sin(angle + angleOffset / 2);
    fill(Colors[70]);
    noStroke();
    ellipse(ellipseX, ellipseY, maxRadius * 0.08, maxRadius * 0.06);
  }
  pop();
}

function drawColoredRing(x, y, rad, colorIndex = 0) { // Default parameter value set to 0
  const Colors = ['white', 'black', 'orange']; // Define the color array
  push(); 
  translate(x, y); // Move origin to the center of the ring
  // Draw rings from outer to inner
  for (let i = 0; i < Colors.length; i++) {
    fill(Colors[(colorIndex + i) % Colors.length]); // Select a color from the array
    noStroke();
    ellipse(0, 0, rad * (3 - i), rad * (3 - i)); 
  }
  pop(); 
}


//Since this part of the variable is basically used in the DrawRandomLine part, it is easy to understand by defining it here.
let isMidTriggered = false; //Tracks if the centre tone is triggered
let midAnimationProgress = 0; //Progress of the animation
let midAnimationDuration = 30; //Duration of the animation in frames
// Initial control points for lines
let initialControlX1, initialControlY1, initialControlX2, initialControlY2, initialEndX, initialEndY;
let isInitialized = false; //Check if the random lines have been initialised
//Draw arc at the centre of the circle
function drawRandomLine(x, y, rad, fft) {
  let midEnergy = fft.getEnergy("mid");
  let threshold = 100; //Setting the threshold for triggering an animation
  let highThreshold = 140;//Setting the threshold for increasing the animation amplitude
  let dynamicAdjustmentMultiplier = 1; //Default animation amplitude multiplier

  //Check if the mid energy exceeds the threshold to trigger the animation
  if (midEnergy > threshold && !isMidTriggered) {
    isMidTriggered = true;
    midAnimationProgress = midAnimationDuration; //Reset animation progress
  }

   //If the mid energy exceeds the high threshold, increase the animation amplitude to twice as much
   if (midEnergy > highThreshold) {
    dynamicAdjustmentMultiplier = 2; 
  }

  //If the animation has been triggered, the fluctuation effect is applied according to the progress of the animation.
  let dynamicAdjustment = isMidTriggered ? dynamicAdjustmentMultiplier * (0.1 * sin((midAnimationDuration - midAnimationProgress) * (PI / midAnimationDuration))) : 0;

  noFill();
  stroke(Colors[16]);
  strokeWeight(4);

  //Adjust the control point and end point according to whether it is in the animation state or not
  let controlX1 = initialControlX1 + dynamicAdjustment * (random() - 0.5) * rad;
  let controlY1 = initialControlY1 + dynamicAdjustment * (random() - 0.5) * rad;
  let controlX2 = initialControlX2 + dynamicAdjustment * (random() - 0.5) * rad;
  let controlY2 = initialControlY2 + dynamicAdjustment * (random() - 0.5) * rad;
  let endX = initialEndX + dynamicAdjustment * (random() - 0.5) * rad;
  let endY = initialEndY + dynamicAdjustment * (random() - 0.5) * rad;
  //Draw Bezier curves
  bezier(x, y, controlX1, controlY1, controlX2, controlY2, endX, endY);

  //If the animation is in progress, decrement the animation progress.
  if (isMidTriggered) {
    midAnimationProgress--;
    if (midAnimationProgress <= 0) {
      isMidTriggered = false; //Reset state after animation
    }
  }
}


//Click to start or stop
function mousePressed() {
  if (Sound.isPlaying()) {
      Sound.pause();
  } else {
      Sound.play();
  }
}

//Resize the canvas to fit the new window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}