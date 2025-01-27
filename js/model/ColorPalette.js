class ColorPalette {
    #colors;
    selectedColor;
    container;
    
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    selectColor = (color) => {
        this.selectedColor = color;
    }

    addColor = (color) => {
        this.#colors.push(color);
    }

    getColors = () => {
        return this.#colors;
    }

}


export default ColorPalette;