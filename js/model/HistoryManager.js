class HistoryManager {
  historyStack;
  #indexCurrentHistory;

  constructor(history) {
    this.historyStack = [];
    this.historyStack.push([...history]);
    this.#indexCurrentHistory = this.historyStack.length - 1;
  }

  redo = () => {
    if (this.#indexCurrentHistory == this.historyStack.length - 1) {
      return;
    }

    this.#indexCurrentHistory++;
  };

  undo = () => {
    if (this.#indexCurrentHistory == 0) {
      return;
    }

    this.#indexCurrentHistory = this.#indexCurrentHistory - 1;
  };

  canRedo = () => {
    if (this.#indexCurrentHistory == this.historyStack.length - 1) {
      return false;
    }
    return true;
  };

  canUndo = () => {
    if (this.#indexCurrentHistory == 0) {
      return false;
    }
    return true;
  };

  getCurrentHistory = () => {
    return [...this.historyStack[this.#indexCurrentHistory]];
  };

  addHistory = ([...coloredPoint]) => {
    const historyStackCopy = [...this.historyStack];
    if (this.#indexCurrentHistory == historyStackCopy.length - 1) {
      historyStackCopy.push([...coloredPoint]);
    } else {
      historyStackCopy.splice(
        this.#indexCurrentHistory + 1,
        historyStackCopy.length - 1 - this.#indexCurrentHistory
      );
      historyStackCopy.push([...coloredPoint]);
    }
    this.historyStack = historyStackCopy;
    this.#indexCurrentHistory = this.historyStack.length - 1;
  };
}

export default HistoryManager;
