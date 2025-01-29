class ColorPalette {
  #colors;
  #currentColor;
  #container;
  selectColor;
  isHided;
  #actionClickChooseColorButton;

  constructor(containerId) {
    this.#container = document.getElementById(containerId);
    this.#colors = ["#FF6347", "#3CB371", "#1E90FF", "#FFD700", "#000000"];
    this.isHided = true;
    this.#currentColor = "#000000";
    this.selectColor = "#000000";
  }

  render = () => {
    this.#container.innerHTML = "";

    this.palettePopup = document.createElement("div");
    this.palettePopup.classList.add("palette-popup");
    this.#container.appendChild(this.palettePopup);

    // Membuat input color
    const label = document.createElement("label");
    label.innerText = "Choice Color:";
    this.palettePopup.appendChild(label);

    this.colorInput = document.createElement("input");
    this.colorInput.type = "color";
    this.colorInput.id = "input-color";
    this.colorInput.value = "#000000"; // Warna default
    this.palettePopup.appendChild(this.colorInput);

    // Membuat elemen palet warna awal
    this.palette = document.createElement("div");
    this.palette.classList.add("palette");

    this.#colors.forEach((color) => {
      this.addColorDiv(color);
    });

    this.colorInput.addEventListener("input", () => {
      this.choiceColorButton.style.backgroundColor = this.colorInput.value;
      this.choiceColorButton.style.color = this.getContrastColor(
        this.colorInput.value
      );

      this.selectColor = this.colorInput.value;
    });

    this.palettePopup.appendChild(this.palette);

    this.choiceColorButton = document.createElement("button");
    this.choiceColorButton.innerText = "Choice";
    this.choiceColorButton.id = "save-color";
    this.palettePopup.appendChild(this.choiceColorButton);

    this.choiceColorButton.addEventListener("click", () => {
      console.log(this.selectColor);
      this.colorInput.value = this.selectColor;
      console.log(this.colorInput.value);

      this.addColor(this.selectColor);
      this.setCurrentColor(this.selectColor);
      this.#actionClickChooseColorButton(this.#currentColor);
      this.hide();
    });
  };

  setActionClickChooseColorButton = (callback) => {
    this.#actionClickChooseColorButton = callback;
  };

  show = () => {
    this.#container.style.display = "block";
  };

  hide = () => {
    this.#container.style.display = "none";
  };

  setCurrentColor = (color) => {
    this.#currentColor = color;
  };

  addColor = (newColor) => {
    for (let i = 0; i < this.#colors.length; i++) {
      if (this.#colors[i] === newColor) {
        return;
      }
    }

    this.#colors.push(newColor);
    this.addColorDiv(newColor);
    console.log(this.#colors);
  };

  getColors = () => {
    return this.#colors;
  };

  getContrastColor = (hex) => {
    // Konversi HEX ke RGB
    hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Hitung luminance
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Jika luminance rendah (gelap), gunakan teks putih, jika tinggi (terang), gunakan teks hitam
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  addColorDiv = (color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;
    this.palette.appendChild(colorDiv);

    colorDiv.addEventListener("click", () => {
      this.choiceColorButton.style.backgroundColor = color;
      this.choiceColorButton.style.color = this.getContrastColor(color);
      this.selectColor = color;
    });
  };
}

export default ColorPalette;
