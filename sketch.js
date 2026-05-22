// ─────────────────────────────────────────
//  SHORELINE WAVE  |  Step 2: The wave line
// ─────────────────────────────────────────
//
//  New this step:
//  - sin()           smooth oscillation between -1 and +1
//  - beginShape()    start drawing a custom shape
//  - vertex(x, y)    add a point to that shape
//  - endShape()      finish and draw the line

// These two numbers control how the wave looks — tweak them freely
let amplitude = 60;   // how TALL the wave is (pixels up/down from centre)
let frequency = 0.02; // how WIDE each wave is (lower = wider waves)

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 22, 40); // deep ocean — repaint every frame

  // Wave line style
  stroke(93, 202, 165);   // seafoam green from the Shoreline palette
  strokeWeight(2);         // line thickness in pixels
  noFill();                // we're drawing a line, not a filled shape

  // Draw the wave across the full width of the canvas
  beginShape();

    for (let x = 0; x <= width; x += 5) {
      // sin() needs an angle — multiply x by frequency to spread the wave out
      // multiply the result by amplitude to scale it up from ±1 to ±60px
      let y = height / 2 + sin(x * frequency) * amplitude;

      vertex(x, y); // place a point at this (x, y) position
    }

  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
