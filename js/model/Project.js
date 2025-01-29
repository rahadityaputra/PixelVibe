import HistoryManager from "./HistoryManager.js";

class Project {
  id;
  title;
  description;
  width;
  height;
  createdAt;
  lastUpdatedAt;
  coloredPoints;
  coloredPointHistory;
  #actionListener;
  constructor({
    id,
    title,
    description,
    width,
    height,
    createdAt,
    lastUpdatedAt,
    coloredPoints,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.width = width;
    this.height = height;
    this.createdAt = createdAt;
    this.lastUpdatedAt = lastUpdatedAt;
    this.coloredPoints = coloredPoints || [];
    this.coloredPointHistory = new HistoryManager(this.coloredPoints);
  }

  redo = () => {
    this.coloredPointHistory.redo();
    this.coloredPoints = this.coloredPointHistory.getCurrentHistory();
    this.#actionListener("redo");
    if (!this.canRedo()) {
      this.#actionListener("not-redo");
    }
  };

  undo = () => {
    this.coloredPointHistory.undo();
    this.coloredPoints = this.coloredPointHistory.getCurrentHistory();
    this.#actionListener("undo");
    if (!this.canUndo()) {
      this.#actionListener("not-undo");
    }
  };

  setActionListener = (callback) => {
    this.#actionListener = callback;
  };

  canRedo = () => {
    return this.coloredPointHistory.canRedo();
  };

  canUndo = () => {
    return this.coloredPointHistory.canUndo();
  };

  addHistory = (coloredPoint) => {
    this.coloredPointHistory.addHistory(coloredPoint);
    this.coloredPoints = this.coloredPointHistory.getCurrentHistory();
    this.#actionListener("addHistory");
  };

  getCurrentHistory = () => {
    return this.coloredPointHistory.getCurrentHistory();
  };

  save = () => {
    this.#actionListener("save");
    return this.getCurrentHistory();
  };
}

export default Project;
