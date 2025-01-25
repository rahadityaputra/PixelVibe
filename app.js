import DrawGrid from "./DrawGrid.js";
import FileProject from "./FileProject.js";

// Ambil elemen DOM
// const colorPicker = document.getElementById("colorPicker");
// const clearButton = document.getElementById("clearCanvas");
// const gridToggle = document.getElementById("gridToggle");

// // Konfigurasi kanvas
// const canvasSize = 500; // Ukuran kanvas (px)
// const pixelSize = 10; // Ukuran satu piksel (px)

// Warna saat ini

// Event listener untuk menggambar
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas");
  const project = new FileProject(1, canvas);
  console.log(project);

  // let currentColor = "#000000";

  // Event listener untuk mengganti warna
  // colorPicker.addEventListener("input", (e) => {
  // currentColor = e.target.value;
  // console.log(currentColor);

  // });

  // const drawGrid = new DrawGrid(canvas, canvasSize, pixelSize, currentColor);
  // drawGrid.init();
  // canvas.addEventListener("mousedown", (e) => {
  //   drawGrid.draw(e, currentColor);
  // });
});

// Event listener untuk membersihkan kanvas

// // Event listener untuk toggle grid
// gridToggle.addEventListener('change', (e) => {
//   drawGrid(e.target.checked);
// });
