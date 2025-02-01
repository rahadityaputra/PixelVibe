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
  #pixelSize;
  #coloredPoints;
  #onDragEnd;
  #drawColor;
  #actionListener;

  constructor(containerId) {
    this.#container = document.getElementById(containerId);
    this.#DrawingModeActived = true;
    this.#ErasingModeActived = false;
    this.#isDragging = false;
    this.#pixelSize = 10;
    this.#onDragEnd = null;
    this.#drawColor = "#000000";
  }

  #setUpCanvas = (width, height) => {
    this.#createCanvasElements(width, height);
    this.#gridCtx = new Ctx(this.#gridCanvasElement, width, height);
    this.#contentCtx = new Ctx(this.#contentCanvasElement, width, height);

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
        } else {
          this.draw(e);
        }

        this.#onDragEnd(this.#coloredPoints);
      }
    });

    this.#contentCanvasElement.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.#isDragging = true;
      if (this.#ErasingModeActived) {
        this.erase(e.changedTouches[0]);
        return;
      }
      this.draw(e.changedTouches[0]);
    });

    this.#contentCanvasElement.addEventListener("touchmove", (e) => {
      if (this.#isDragging) {
        if (this.#ErasingModeActived) {
          this.erase(e.changedTouches[0]);
          return;
        }
        this.draw(e.changedTouches[0]);
      }
    });

    this.#contentCanvasElement.addEventListener("touchend", (e) => {
      if (this.#isDragging) {
        this.#isDragging = false;
        if (this.#ErasingModeActived) {
          this.erase(e.changedTouches[0]);
        } else {
          this.draw(e.changedTouches[0]);
        }

        this.#onDragEnd(this.#coloredPoints);
      }
    });
  };

  #createCanvasElements = (width, height) => {
    this.#gridCanvasElement = document.createElement("canvas");
    this.#contentCanvasElement = document.createElement("canvas");
    this.#gridCanvasElement.width = width;
    this.#gridCanvasElement.height = height;
    this.#contentCanvasElement.width = width;
    this.#contentCanvasElement.height = height;
    this.#gridCanvasElement.style.position = "absolute";
    this.#contentCanvasElement.style.position = "absolute";
    this.#gridCanvasElement.style.zIndex = "-1";
    this.#container.appendChild(this.#gridCanvasElement);
    this.#container.appendChild(this.#contentCanvasElement);
  };

  init = (width, height) => {
    this.#setUpCanvas(width, height);
    this.#gridCtx.createGrid(this.#pixelSize);
  };

  setOnDragEnd = (callback) => {
    this.#onDragEnd = callback;
  };

  activeEraseMode = () => {
    console.log("haha");
    this.#ErasingModeActived = true;
    this.#DrawingModeActived = false;
    this.#actionListener("erasing");
  };

  setActionListener = (callback) => {
    this.#actionListener = callback;
  };

  setDrawingColor = (color) => {
    this.#drawColor = color;
  };
  activeDrawingMode = () => {
    this.#ErasingModeActived = false;
    this.#DrawingModeActived = true;
    this.#actionListener("drawing");
  };

  render = (coloredPoints) => {
    // console.log(coloredPoints);

    this.#coloredPoints = coloredPoints;
    if (coloredPoints.length != 0) {
      for (let i = 0; i < coloredPoints.length; i++) {
        const x = coloredPoints[i].x;
        const y = coloredPoints[i].y;
        const color = coloredPoints[i].color;
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

    this.#coloredPoints.push({ x, y, color: this.#drawColor });
    this.#contentCtx.draw(x, y, this.#drawColor, this.#pixelSize);
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
    console.log("clear bro");

    this.#contentCtx.clear();
  };

  getContentCanvas = () => {
    return this.#contentCanvasElement;
  };

  // getColoredPaints = () => {
  //   return this.#coloredPoints;
  // };
}

export default Canvas;
