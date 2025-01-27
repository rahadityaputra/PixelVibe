import Ctx from "./Ctx.js";

class Canvas {
  #gridCanvasElement;
  #contentCanvasElement;
  #container;
  #gridCtx;
  #contentCtx;
  #DrawingModeActived;
  #ErasingModeActived;
  #isDragging;
  #coloredPoints;
  #pixelSize;

  constructor(containerId, width, height, coloredPoints) {
    this.#container = document.getElementById(containerId);
    this.#setUpCanvas(width, height);
    this.#DrawingModeActived = true;
    this.#ErasingModeActived = false;
    this.#isDragging = false;
    this.#coloredPoints = coloredPoints || [];
    this.#pixelSize = 10;

    this.#contentCanvasElement.addEventListener("mousedown", (e) => {
      this.#isDragging = true;
      if (this.#ErasingModeActived) {
        this.erase(e);
        return;
      }
      this.draw(e);
    });

    this.#contentCanvasElement.addEventListener("mousemove", (e) => {
      if (this.#isDragging) {
        if (this.#ErasingModeActived) {
          this.erase(e);
          return;
        }
        this.draw(e);
      }
    });

    this.#contentCanvasElement.addEventListener("mouseup", (e) => {
      if (this.#isDragging) {
        this.#isDragging = false;
        if (this.#ErasingModeActived) {
          this.erase(e);
          return;
        }
        this.draw(e);
      }
    });
  }

  #setUpCanvas = (width, height) => {
    this.#gridCanvasElement = document.createElement("canvas");
    this.#contentCanvasElement = document.createElement("canvas");
    this.#gridCanvasElement.style.position = "absolute";
    this.#contentCanvasElement.style.position = "absolute";
    // this.#contentCanvasElement.style.position = "relative";
    this.#gridCanvasElement.style.zIndex = "-1";
    // this.#container.style.position = "relative";
    this.#container.appendChild(this.#gridCanvasElement);
    this.#container.appendChild(this.#contentCanvasElement);
    this.#gridCtx = new Ctx(this.#gridCanvasElement, width, height);
    this.#contentCtx = new Ctx(this.#contentCanvasElement, width, height);
    this.#contentCtx.globalCompositeOperation = "source-over";
    this.#gridCanvasElement.width = width;
    this.#gridCanvasElement.height = height;

    this.#contentCanvasElement.width = width;
    this.#contentCanvasElement.height = height;
  };

  activeEraseMode = () => {
    console.log("haha");
    this.#ErasingModeActived = true;
    this.#DrawingModeActived = false;
  };

  activeDrawingMode = () => {
    this.#ErasingModeActived = false;
    this.#DrawingModeActived = true;
  };

  render = () => {
    this.#gridCtx.createGrid(this.#pixelSize);
    if (this.#coloredPoints.length != 0) {
      for (let i = 0; i < this.#coloredPoints.length; i++) {
        const x = this.#coloredPoints[i].x;
        const y = this.#coloredPoints[i].y;
        const color = this.#coloredPoints[i].color;
        this.#contentCtx.draw(x, y, color, this.#pixelSize);
      }
    }
  };

  draw = (cursor) => {
    const rect = this.#contentCanvasElement.getBoundingClientRect();
    const x =
      Math.floor((cursor.clientX - rect.left) / this.#pixelSize) *
      this.#pixelSize;
    const y =
      Math.floor((cursor.clientY - rect.top) / this.#pixelSize) *
      this.#pixelSize;

      this.#coloredPoints.push({x, y, color : "#000000"})
    //   console.log(this.#coloredPoints);
      
    this.#contentCtx.draw(x, y, "#000000", this.#pixelSize);
  };



  erase = (cursor) => {
    console.log("erase ");
    const rect = this.#contentCanvasElement.getBoundingClientRect();
    const x =
      Math.floor((cursor.clientX - rect.left) / this.#pixelSize) *
      this.#pixelSize;
    const y =
      Math.floor((cursor.clientY - rect.top) / this.#pixelSize) *
      this.#pixelSize;
    this.#contentCtx.erase(x, y, this.#pixelSize);
  };

  clear = () => {
    this.#contentCtx.clear();
  };

  getColoredPaints = () => {
    return this.#coloredPoints;
  }
}

export default Canvas;
