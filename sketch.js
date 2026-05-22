// ─────────────────────────────────────────
//  SHORELINE WAVE  |  Step 4: Layers + fill
// ─────────────────────────────────────────
//
//  New this step:
//  - fill()          colour inside a shape (with alpha for transparency)
//  - endShape(CLOSE) closes the shape back to the start point
//  - two waves       drawn back-to-front — drawing order is depth

// ── Wave 1 — back, deep ocean ─────────────
let amp1    = 50;
let freq1   = 0.015;  // wider, slower — deep water
let speed1  = 0.025;
let offset1 = 0;

// ── Wave 2 — front, shoreline ─────────────
let amp2    = 70;
let freq2   = 0.022;  // tighter, faster — surface chop
let speed2  = 0.04;
let offset2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10, 22, 40);

  // ── Draw back wave first (it goes behind) ──────────────────────────────
  //
  // fill(R, G, B, Alpha) — alpha 0=invisible, 255=solid
  // stroke is the outline, fill is the inside
  fill(24, 95, 165, 120);   // ocean blue, semi-transparent
  stroke(24, 95, 165, 180);
  strokeWeight(1.5);

  drawWave(amp1, freq1, offset1, 30); // 30px = vertical offset from centre

  // ── Draw front wave on top ─────────────────────────────────────────────
  fill(93, 202, 165, 150);  // seafoam, semi-transparent
  stroke(93, 202, 165, 220);
  strokeWeight(2);

  drawWave(amp2, freq2, offset2, 0);

  // ── Advance both offsets ───────────────────────────────────────────────
  offset1 += speed1;
  offset2 += speed2;
}

// ── Wave drawing function ──────────────────────────────────────────────────
//
// Instead of copy-pasting the loop twice, we wrap it in a function.
// verticalShift nudges a wave up or down from centre.

function drawWave(amplitude, frequency, offset, verticalShift) {
  let centreY = height / 2 + verticalShift;

  beginShape();

    // Start at the bottom-left corner — this anchors the fill
    vertex(0, height);

    // Walk across the screen drawing the wave curve
    for (let x = 0; x <= width; x += 5) {
      let y = centreY + sin(x * frequency + offset) * amplitude;
      vertex(x, y);
    }

    // End at the bottom-right corner — closes the fill area
    vertex(width, height);

  endShape(CLOSE); // CLOSE connects the last point back to the first (bottom-left)
                   // this seals the shape so fill() has something to paint
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
