// ─────────────────────────────────────────
//  SHORELINE WAVE  |  Step 1: The canvas
// ─────────────────────────────────────────
//
//  Every p5.js sketch has two core functions:
//
//  setup()  → runs ONCE when the page loads
//             use it to create the canvas and set initial values
//
//  draw()   → runs in a LOOP, ~60 times per second
//             use it to draw, update, and animate
//
//  Think of draw() as the tide — it never stops.

function setup() {
  // createCanvas(width, height)
  // windowWidth / windowHeight = the browser window size
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background() repaints the canvas every frame
  // without it, everything you draw stacks up and smears
  // using a dark ocean colour from the Shoreline palette
  background(10, 22, 40);  // R, G, B — deep ocean
}

// Bonus: if the browser window is resized, resize the canvas too
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
