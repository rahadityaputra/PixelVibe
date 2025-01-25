class Ctx {
  constructor(canvasElement, size) {
    this.ctx = canvasElement.getContext("2d");
    this.ctx.width = size;
    this.ctx.height = size;
    // return this.ctx;
  }

  draw(x, y, pixelSize, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, pixelSize, pixelSize);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  createGrid(pixelSize) {
    this.ctx.strokeStyle = "#ddd";
    for (let x = 0; x < this.ctx.width; x += pixelSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.ctx.width);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, x);
      this.ctx.lineTo(this.ctx.width, x);
      this.ctx.stroke();
    }
  }
}

export default Ctx;
