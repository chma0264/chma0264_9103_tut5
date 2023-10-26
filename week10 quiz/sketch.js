let Sound;
let FFT; 
let col;
let xoff = 0.0;

function preload() {
  Sound = loadSound('assets/sample-visualisation.mp3');
}

function setup() {
    createCanvas(400, 400);
    FFT = new p5.FFT();
    col = color(255, 255, 255);
}

function draw() {
    background(50);

    // Change color at a reduced frequency.
    if (frameCount % 50 == 0) {
      col = color(255, random(255), random(255));
    }

    fill(col);
    stroke(200);

    // Analyze the frequencies.
    let spectrum = FFT.analyze();
    let bass = FFT.getEnergy("bass");
    let mid = FFT.getEnergy("mid");
    let treble = FFT.getEnergy("treble");
    
    // Map the average of bass, mid, and treble frequencies to the wave intensity.
    let waveIntensity = map((bass + mid + treble) / 3, 0, 255, 0, 200);

    let yoff = 0.0;
    beginShape();
    for (let x = 0; x <= width; x += 5) {
        let y = height / 2 + map(noise(xoff, yoff), 0, 1, -waveIntensity, waveIntensity);        
        vertex(x, y);
        yoff += 0.01;
    }
    xoff += 0.03;
    endShape();

    fill(255); 
    text("please click", width / 2 - 40, height - 20);
}

// Handle play/pause of the sound on mouse click.
function mousePressed() {
    if (Sound.isPlaying()) {
        Sound.pause();
    } else {
        Sound.play();
    }
}
