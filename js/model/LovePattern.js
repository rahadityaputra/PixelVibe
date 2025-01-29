class LovePattern {
  constructor(gridElementId) {
    this.grid = document.getElementById(gridElementId);
    this.pattern = [
      383, 384, 385, 386, 387, 391, 392, 393, 394, 395, 361, 362, 363, 364, 365,
      366, 367, 369, 370, 371, 372, 373, 374, 375, 339, 340, 341, 342, 343, 344,
      345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 317, 318, 319, 320,
      321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335,
      296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310,
      311, 312, 313, 314, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285,
      286, 287, 288, 289, 290, 291, 292, 293, 254, 255, 256, 257, 258, 259, 260,
      261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 233, 234, 235,
      236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250,
      251, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226,
      227, 228, 229, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184,
      185, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 133, 134, 135,
      136, 137, 138, 139, 140, 141, 113, 114, 115, 116, 117, 118, 119, 93, 94,
      95, 96, 97, 73, 74, 75, 53,
    ];

    this.totalPixel = 441;
  }

  createPixel() {
    for (let i = 0; i < this.totalPixel; i++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      this.grid.appendChild(pixel);
    }

    let number = this.totalPixel;
    const pixels = this.grid.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
      pixel.dataset.number = number;
      number--;
    });
  }

  init() {
    this.createPixel();
  }

  draw = () => {
    let delay = 0;
    this.pattern.forEach((number) => {
      const pixel = this.grid.querySelector(`.pixel[data-number="${number}"]`);
      setTimeout(() => {
        pixel.classList.add("filled");
      }, delay);
      delay += 10;
    });
  };

  clear = () => {
    let delay = 0;
    this.pattern.forEach((number) => {
      const pixel = this.grid.querySelector(`.pixel[data-number="${number}"]`);
      setTimeout(() => {
        pixel.classList.remove("filled");
      }, delay);
      delay += 10;
    });
  };

  // ini masih salah
  start = async () => {
    this.draw();
    setInterval(() => {
      this.clear();
      setTimeout(() => {
        this.draw();
      }, 4000);
    }, 7000);
  };
}

export default LovePattern;
