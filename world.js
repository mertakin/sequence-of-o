class World {
  constructor(num) {
    this.cells = []; // An array for all creatures
    for (let i = 0; i < num; i++) {
      let l = createVector(random(width), random(height));
      let dna = new DNA();
      this.cells.push(new Cell(l, dna));
    }
  }



  run() {

    for (let i = this.cells.length - 1; i >= 0; i--) {
      let b = this.cells[i];
      b.run();

      let child = b.reproduce();
      if (child != null) this.cells.push(child);
    }
  }
}
