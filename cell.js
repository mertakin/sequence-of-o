class Cell {
  constructor(l, dna_) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna_; // DNA
    // DNA will determine size and maxspeed
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);

  }

  run() {
    this.update();
    this.borders();
    this.display();
  }



  reproduce() {
    // mitosis
    if (random(1) < 0.0005) {      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Cell(this.position, childDNA);
    } else {
      return null;
    }
  }

  // Method to update position
  update() {
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    this.health -= 0.2;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > this.width + this.r) this.position.x = -r;
    if (this.position.y > this.height + this.r) this.position.y = -r;
  }

  // Method to display
  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  // Death
  dead() {
    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
