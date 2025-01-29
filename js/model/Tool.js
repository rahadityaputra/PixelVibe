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

  setColor = (color) => {
    this.button.style.backgroundColor = color;
    const img = this.button.querySelector("img");
    console.log(img);
    if (this.isSetWhiteColor(color)) {
      console.log("putih");
      
      img.style.filter = "invert(1)";
    } else {
      img.style.filter = "invert(0)";
    }
    
  }
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

  isSetWhiteColor = (hex) => {
    // Konversi HEX ke RGB
    hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Hitung luminance
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Jika luminance rendah (gelap), gunakan teks putih, jika tinggi (terang), gunakan teks hitam
    return luminance < 0.5;
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
