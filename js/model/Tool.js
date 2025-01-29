class Tool {
  constructor({ name, icon, action, text, isDisable = false }, containerId) {
    this.name = name;
    this.path = "../../icon/" + icon + ".svg";
    this.action = action;
    this.container = document.getElementById(containerId);
    this.text = text;
    this.icon = icon;
    this.isDisable = isDisable;
  }

  render = () => {
    this.button = document.createElement("button");
    if (this.icon) {
      const icon = document.createElement("img");
      icon.width = 20;
      icon.src = this.path;
      this.button.appendChild(icon);
    } else {
      this.button.textContent = this.text;
    }

    if (this.isDisable) {
      this.disable();
    }

    this.button.classList.add("tool");
    this.container.appendChild(this.button);
    this.button.addEventListener("click", () => {
      this.action(this.enable, this.disable);
    });
  };

  disable = () => {
    this.button.classList.add("disabled");
    this.button.disabled = true;
    this.isDisable = true;
  };

  enable = () => {
    this.button.classList.remove("disabled");
    this.button.disabled = false;
    this.isDisable = false;
  };
}

class ColorPicker extends Tool {
  constructor({ name, icon, func, text }, containerId) {
    super({ name, icon, func }, containerId);

    this.name = name;
    this.path = "../../icon/" + icon + ".svg";
    this.func = func;
    this.container = document.getElementById(containerId);
    this.text = text;
    this.icon = icon;
  }
}

export default Tool;
