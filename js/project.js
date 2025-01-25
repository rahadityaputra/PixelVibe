import DrawGrid from "./model/DrawGrid.js";
import Project from "./FileProject.js";
import LocalStorage from "./model/LocalStorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas");
  const colorPicker = document.getElementById("colorPicker");

  let currentColor = "#000000";
  colorPicker.addEventListener("change", () => {
    console.log("ganti warna");

    currentColor = colorPicker.value;
  });
  const downloadButton = document.getElementById("downloadImage");
  const pixelStorage = new LocalStorage();
  const project = new Project(1, canvas);
  const { name, width, height } = pixelStorage.getProject(1);
  const drawGrid = new DrawGrid(canvas, width, 10);
  drawGrid.init();

  // Variabel untuk melacak status drag
  let isDragging = false;

  canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    console.log("Mouse down at:", e.clientX, e.clientY);
    drawGrid.draw(e, currentColor);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      console.log("Mouse dragging at:", e.clientX, e.clientY);
      drawGrid.draw(e, currentColor);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
      console.log("Mouse up at:", e.clientX, e.clientY);
      isDragging = false; // Menghentikan drag
      drawGrid.draw(e, currentColor);
    }
  });

  downloadButton.addEventListener("click", () => {
    project.download();
  });
});

// const clearCanvas = document.getElementById('clearCanvas');
// const downloadImage = document.getElementById('downloadImage');
// const popupForm = document.getElementById('popupForm');
// const openForm = document.getElementById('openForm');
// const createGrid = document.getElementById('createGrid');
// const projectName = document.getElementById('projectName');
// const gridWidth = document.getElementById('gridWidth');
// const gridHeight = document.getElementById('gridHeight');

// // Open popup form
// openForm.addEventListener('click', () => {
// });

// // Create grid
// createGrid.addEventListener('click', () => {
//     const width = parseInt(gridWidth.value, 10);
//     const height = parseInt(gridHeight.value, 10);
//     if (!width || !height) {
//         alert('Please enter valid dimensions.');
//         return;
//     }
//     popupForm.style.display = 'none';
//     createPixelGrid(width, height);
// });

// // Create pixel grid
// function createPixelGrid(width, height) {
//     pixelCanvas.innerHTML = '';
//     pixelCanvas.style.gridTemplateColumns = `repeat(${width}, 20px)`;
//     pixelCanvas.style.gridTemplateRows = `repeat(${height}, 20px)`;
//     for (let i = 0; i < width * height; i++) {
//         const pixel = document.createElement('div');
//         pixel.className = 'pixel';
//         pixel.addEventListener('click', () => {
//             pixel.style.backgroundColor = colorPicker.value;
//         });
//         pixelCanvas.appendChild(pixel);
//     }
// }

// // Clear canvas
// clearCanvas.addEventListener('click', () => {
//     const pixels = document.querySelectorAll('.pixel');
//     pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
// });

// // Download canvas as image
// downloadImage.addEventListener('click', () => {
//     html2canvas(pixelCanvas).then(canvas => {
//         const link = document.createElement('a');
//         link.download = `${projectName.value || 'pixel_art'}.png`;
//         link.href = canvas.toDataURL();
//         link.click();
//     });
// });
