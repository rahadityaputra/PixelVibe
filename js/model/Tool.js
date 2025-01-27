class Tool {
  constructor({ name, icon, action, text }, containerId) {
    this.name = name;
    this.path = "../../icon/" + icon + ".svg";
    this.action = action;
    this.container = document.getElementById(containerId);
    this.text = text;
    this.icon = icon;
  }

  render = () => {
    const button = document.createElement("button");
    if (this.icon) {
      const icon = document.createElement("img");
      icon.width = 20;
        console.log("p");
        icon.src = this.path;
        button.appendChild(icon);
        
    } else {
        button.textContent = this.text;
    }
    button.classList.add("tool");
    // button.style.backgroundImage = `url("${this.path}")`;
    this.container.appendChild(button);
    button.addEventListener("click", this.action);
  };
}


class ColorPicker extends Tool {
  constructor({ name, icon, func, text }, containerId) {
    super({name, icon, func}, containerId);

    this.name = name;
    this.path = "../../icon/" + icon + ".svg";
    this.func = func;
    this.container = document.getElementById(containerId);
    this.text = text;
    this.icon = icon;
  }
}

export default Tool;
