import LocalStorage from "./LocalStorage.js";
import LovePattern from "./lovePattern.js";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const lovePattern = new LovePattern(grid);
  lovePattern.init();
  lovePattern.start();

  const pixelStorage = new LocalStorage();

  const createProjectButton = document.getElementById("create-project");
  //   const popupForm = document.getElementById("popupForm");
  const backdrop = document.getElementById("backdrop");
  const content = document.querySelector(".content");
  createProjectButton.addEventListener("click", () => {
    backdrop.style.display = "block";
    content.classList.add("blurActived");
  });

  const createProjectForm = document.getElementById("popupForm");
  createProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const projectName = document.getElementById("projectName").value;
      const height = document.getElementById("gridHeight").value;
      const width = document.getElementById("gridWidth").value;
      pixelStorage.addProject({
        name: projectName,
        width: width,
        height: height,
      });
      window.location.pathname = "/project.html";
    } catch (error) {
      console.log(error);
    }
  });
});


import FileProject from "./FileProject.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas");
  const project = new FileProject(1, canvas);
  console.log(project);

});

