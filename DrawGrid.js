import Ctx from "./Ctx.js";

class DrawGrid {
  constructor(canvas, canvasSize, pixelSize) {
    this.show = true;
    this.canvas = canvas;
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;
    this.ctx = new Ctx(canvas, canvasSize);
    this.pixelSize = pixelSize;
    console.log(this.ctx);
  }

  init() {
    this.ctx.createGrid(this.pixelSize);
  }
  zoomIn() {}

  zoomOut() {}

  draw(cursor, color) {
    console.log(color);
    
    const rect = this.canvas.getBoundingClientRect();
    const x =
      Math.floor((cursor.clientX - rect.left) / this.pixelSize) *
      this.pixelSize;
    const y =
      Math.floor((cursor.clientY - rect.top) / this.pixelSize) * this.pixelSize;

      this.ctx.draw(x, y, this.pixelSize, color)
   
  }

  clear() {
    // console.log(this.ctx);
    this.ctx.clear();
  }
}

export default DrawGrid;
