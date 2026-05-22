// ─────────────────────────────────────────
//  SHORELINE WAVE  |  Step 5: Water drops
// ─────────────────────────────────────────
//
//  New this step:
//  - class         a blueprint for objects (each drop is one)
//  - arrays        hold all the live droplets
//  - mouseX/mouseY p5's built-in mouse position
//  - gravity       vy increases each frame, pulling drops down
//  - splice()      remove dead drops from the array

// ── Wave settings (unchanged) ─────────────
let amp1    = 50,  freq1  = 0.015, speed1  = 0.025, offset1 = 0;
let amp2    = 70,  freq2  = 0.022, speed2  = 0.04,  offset2 = 0;

// ── Droplet array — fills up as mouse moves ─
let drops = [];

// ── Droplet class ──────────────────────────
//
// A class is a blueprint. Each `new Droplet(x, y)` creates
// an independent object with its own position, speed, and life.

class Droplet {
  constructor(x, y) {
    this.x    = x;
    this.y    = y;
    this.vx   = random(-2.5, 2.5); // horizontal scatter
    this.vy   = random(-5, -1.5);  // launches upward (negative = up in p5)
    this.size = random(4, 10);
    this.alpha = 220;              // starts near-opaque
  }

  update() {
    this.vy   += 0.18;   // gravity — pulls vy toward positive (downward) each frame
    this.x    += this.vx;
    this.y    += this.vy;
    this.alpha -= 4;     // fade out — when alpha hits 0 the drop is invisible
    this.vx   *= 0.98;  // slight air resistance on horizontal movement
  }

  draw() {
    noStroke();
    // slightly elongated in the direction of travel — feels more like water
    let stretch = map(abs(this.vy), 0, 8, 1, 2.2);
    fill(93, 202, 165, this.alpha);
    ellipse(this.x, this.y, this.size / stretch, this.size * stretch);
  }

  isDead() {
    return this.alpha <= 0 || this.y > height + 20;
  }
}

// ── p5 functions ───────────────────────────

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 22, 40);

  // Draw waves (back first)
  fill(24, 95, 165, 120);
  stroke(24, 95, 165, 180);
  strokeWeight(1.5);
  drawWave(amp1, freq1, offset1, 30);

  fill(93, 202, 165, 150);
  stroke(93, 202, 165, 220);
  strokeWeight(2);
  drawWave(amp2, freq2, offset2, 0);

  // Spawn drops where the mouse meets the front wave surface
  // only spawn if the mouse is actually on the canvas
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let waveY = getWaveY(mouseX, amp2, freq2, offset2, 0);

    // Only burst drops if mouse is near the wave surface (within 60px)
    if (abs(mouseY - waveY) < 60) {
      // Spawn 3 drops per frame — more = heavier splash
      for (let i = 0; i < 3; i++) {
        drops.push(new Droplet(mouseX + random(-15, 15), waveY));
      }
    }
  }

  // Update, draw, and clean up drops
  // Loop backwards so splice() doesn't skip elements
  for (let i = drops.length - 1; i >= 0; i--) {
    drops[i].update();
    drops[i].draw();
    if (drops[i].isDead()) {
      drops.splice(i, 1); // remove this drop from the array
    }
  }

  // Advance wave offsets
  offset1 += speed1;
  offset2 += speed2;
}

// ── Helper: wave Y at a given X ────────────
//
// Returns the canvas Y position of a wave at any x.
// Used to spawn drops right on the wave surface.

function getWaveY(x, amplitude, frequency, offset, verticalShift) {
  return height / 2 + verticalShift + sin(x * frequency + offset) * amplitude;
}

// ── Wave drawing function ──────────────────

function drawWave(amplitude, frequency, offset, verticalShift) {
  beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 5) {
      vertex(x, getWaveY(x, amplitude, frequency, offset, verticalShift));
    }
    vertex(width, height);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
