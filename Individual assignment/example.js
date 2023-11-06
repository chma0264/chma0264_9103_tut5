//Only as a reference for personal assignments, not for actual calls
// https://github.com/liz-peng/p5.Polar      

// let each sketches have their center point
p5.prototype.setCenter = function(x, y) {
    if(this.center === undefined) {
     this.center = { x, y }
    }
    else {
      this.translate(this.center.x = x, this.center.y = y);
    }
  }
  
  // Triangle
  p5.prototype.polarTriangle = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle)); 
    this.triangle(
      this.sin(0), this.cos(0)*-_radius,
      this.sin(this.TWO_PI*1/3)*_radius, this.cos(this.TWO_PI*1/3)*-_radius,
      this.sin(this.TWO_PI*2/3)*_radius, this.cos(this.TWO_PI*2/3)*-_radius
    );
    this.pop();
  }
  
  p5.prototype.polarTriangles = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarTriangle(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarTriangle(i*_angle, _radius, _distance);
    }
  }
  
  // Ellipse
  p5.prototype.polarEllipse = function(_angle, _radiusW, _radiusH, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.ellipse(0, 0, _radiusW*2, _radiusH*2);
    this.pop();
  }
  
  p5.prototype.polarEllipses = function(_num, _radiusW, _radiusH, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radiusW, _radiusH, _distance);
        this.polarEllipse(_result[0]*_result[1], _result[2], _result[3], _result[4]);
      }
      else this.polarEllipse(i*_angle, _radiusW, _radiusH, _distance);
    }
  }
  
  // Line
  p5.prototype.polarLine = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.line(0, _radius, 0, -_radius);
    this.pop();
  }
  
  p5.prototype.polarLines = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarLine(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarLine(i*_angle, _radius, _distance);
    }
  }
  
  // Square
  p5.prototype.polarSquare = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.square(-_radius, -_radius, _radius*2);
    this.pop();
  }
  
  p5.prototype.polarSquares = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarSquare(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarSquare(i*_angle, _radius, _distance);
    }
  }
  
  // Pentagon
  p5.prototype.polarPentagon = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle)+60);
    this.beginShape();
    for(let i=1; i<=5; i++) {
      this.vertex(this.cos(this.TWO_PI*i/5)*_radius, this.sin(this.TWO_PI*i/5)*_radius);
    }
    this.endShape(this.CLOSE);
    this.pop();
  }
  
  p5.prototype.polarPentagons = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarPentagon(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarPentagon(i*_angle, _radius, _distance);
    }
  }
  
  // Hexagon
  p5.prototype.polarHexagon = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.beginShape();
      for(let i=0; i<6; i++) {
        this.vertex(
          this.cos(this.TWO_PI*i/6)*_radius, this.sin(this.TWO_PI*i/6)*_radius
        );
      }
    this.endShape(this.CLOSE);
    this.pop();
  }
  
  p5.prototype.polarHexagons = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarHexagon(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarHexagon(i*_angle, _radius, _distance);
    }
  }
  
  // Heptagon
  p5.prototype.polarHeptagon = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle)+11);
    this.beginShape();
    for(let i=1; i<=7; i++) {
      this.vertex(this.cos(this.TWO_PI*i/7)*_radius, this.sin(this.TWO_PI*i/7)*_radius);
    }
    this.endShape(this.CLOSE);
    this.pop();
  }
  
  p5.prototype.polarHeptagons = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarHeptagon(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarHeptagon(i*_angle, _radius, _distance);
    }
  }
  
  // Octagon
  p5.prototype.polarOctagon = function(_angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.beginShape();
    for(let i=1; i<=8; i++) {
      this.vertex(this.cos(this.TWO_PI*i/8)*_radius, this.sin(this.TWO_PI*i/8)*_radius);
    }
    this.endShape(this.CLOSE);
    this.pop();
  }
  
  p5.prototype.polarOctagons = function(_num, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _radius, _distance);
        this.polarOctagon(_result[0]*_result[1], _result[2], _result[3]);
      }
      else this.polarOctagon(i*_angle, _radius, _distance);
    }
  }
  
  // Polygon
  p5.prototype.polarPolygon = function(_edge, _angle, _radius, _distance) {
    this.push();
    const _radians = this.radians(_angle);
    this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
    this.rotate(this.radians(_angle));
    this.beginShape();
    for(let i=1; i<=_edge; i++) {
      this.vertex(this.cos(this.TWO_PI*i/_edge)*_radius, this.sin(this.TWO_PI*i/_edge)*_radius);
    }
    this.endShape(this.CLOSE);
    this.pop();
  }
  
  p5.prototype.polarPolygons = function(_num, _edge, _radius, _distance, callback) {
    const _angle = 360/_num;
    for(let i=1; i<=_num; i++) {
      if(callback) {
        const _result = callback(i, _angle, _edge, _radius, _distance);
        this.polarPolygon(_result[2], _result[0]*_result[1], _result[3], _result[4]);
      }
      else this.polarPolygon(_edge, i*_angle, _radius, _distance);
    }
  }
  


function preload(){
	sound = loadSound('04 River Flows In You.mp3'); //
	//sound = loadSound('relaxed-vlog-131746.mp3'); //
}

function setup() {
	let cnv = createCanvas(1112, 834); //
	amplitude = new p5.Amplitude(); //
}

function draw() {
  background(10,150);
	textAlign(CENTER); //
	fill(214, 219, 223, 51);
	textSize(30);
	if (!sound.isPlaying()) text('Tap to play', width/2, 40); //
	
	let level = amplitude.getLevel(); //
	let size = map(level,0,1,0,1500)+50; //
	

	
  setCenter(width/2, height/2);
 
	stroke(218,165,32);
  noFill();
  polarEllipses(45, 300, 100, 100);
	
  stroke(218,165,32);
  noFill();
	//polarEllipses(30, 40+sin(frameCount/10)*20, 100, 100);
	polarEllipses(30, size+sin(frameCount/5)*20, size, 100);

  stroke('lightcyan');
   noFill();
  // polarEllipses(70, 40+sin(frameCount/10)*20, 300, 80);
	polarEllipses(70, size+sin(frameCount/5)*20, size, 80);
  
  //polarLines
  noFill();
  stroke(218,165,32);
  strokeWeight(0.5);
  polarLines(100, 150, 0);
  polarLines(100, 60, 20);
  
  //polarEllipses
  noStroke();
  fill(30,144,255,110);
  polarEllipses(12, 50, 50, 70);
  fill(252, 248, 200, 120);
  polarEllipses(7, 36, 36, 32);
  fill(178, 216, 178, 120);
  polarEllipses(10, 30, 30, 70);
  polarEllipses(10, 30, 30, 120);
  fill(238, 175, 170);
  polarEllipses(12, 8, 8, 40);
  fill(252, 248, 200, 120);
  polarEllipses(10, 16, 16, 32);
  fill(205,92,92,110);
  polarEllipses(14, 50, 50, 155);
	
	let size1 = map(level,0,0.25,0,50)+50; //
  
  //polarHexagon 
  noStroke();
  fill(255,127,80);
	polarHexagon(3,size1+sin(frameCount/10)*15 , 0);
	
	//polarHexagons
  fill(218,165,32,100);
  polarHexagons(15, 10, 80);
	
 // polarHexagons(4,40+sin(frameCount/10)*20, 120);
	polarHexagons(7,size1+sin(frameCount/10)*20, 120);

  
  //polarOctagons
	// fill(255,127,80,100);
  fill(210, 180, 222, 150);
  polarOctagons(30, 6, 60);
	//polarOctagons(25, 1+sin(frameCount/10)*20, 150);
	polarOctagons(10, 1+sin(frameCount/10)*20, 150);

		let size2 = map(level,0,0.25,0,75)+50;
	//polarPentagon
	fill(205,92,92,100);
	//polarPentagons(30, 50, 250);
		polarPentagons(7, size2+sin(frameCount/10)*20 , 250);
	
	  //polarOctagons
	fill(214, 234, 248 ,100);
 //	polarHeptagons(25, 1+sin(frameCount/10)*20, 325);
		polarHeptagons(14, 1+sin(frameCount/10)*20, 250);
	
	
	fill (52, 152, 219, 140);
//	polarTriangles(25, 1+sin(frameCount/10)*20, 350);
	polarTriangles(21, 1+sin(frameCount/10)*20, 350);
	
}
	// save jpg
let lapse = 0;    // mouse timer
function mousePressed(){
  if (millis() - lapse > 400){
    if (sound.isPlaying()) {
			sound.stop();
		} else {
			sound.play();
		}
    lapse = millis();
  } 
}


function keyPressed(){
  save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
}