class Ctx {
  #ctx;
  constructor(canvas, width, height) {
    this.#ctx = canvas.getContext("2d");
    this.width = width;
    this.height = height;
  }

  draw = (x, y, color, pixelSize) => {
   
    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(x, y, pixelSize, pixelSize);
  };

  erase = (x,y, pixelSize) => {
      this.#ctx.clearRect(x, y, pixelSize, pixelSize);
  };

  clear = () => {
    this.#ctx.clearRect(0, 0, this.width, this.height);
  };

  createGrid = (pixelSize) => {
    this.#ctx.strokeStyle = "#ddd";

    for (let x = 0; x < this.width; x += pixelSize) {
      this.#ctx.beginPath();
      this.#ctx.moveTo(x, 0);
      this.#ctx.lineTo(x, this.width);
      this.#ctx.stroke();
      this.#ctx.beginPath();
      
      this.#ctx.moveTo(0, x);
      this.#ctx.lineTo(this.width, x);
      this.#ctx.stroke();
    }
  }
}

export default Ctx;
