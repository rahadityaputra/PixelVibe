import LovePattern from "./model/LovePattern.js";
import ProjectManager from "./model/ProjectManager.js";


const backdrop = document.getElementById("backdrop");
const content = document.querySelector(".content");

const hidePopupForm = () => {
  backdrop.style.display = "none";
  content.classList.remove("blurActived");
};

const showPopupForm = () => {
    backdrop.style.display = "block";
    content.classList.add("blurActived");
  }

const createProject = (e) => {
  e.preventDefault();
  try {
    const projectName = document.getElementById("projectName").value;
    const height = document.getElementById("gridHeight").value;
    const width = document.getElementById("gridWidth").value;
    const projectManager = new ProjectManager();

    projectManager.crateProject({
      name: projectName,
      width: width,
      height: height,
    });
    
    window.location.pathname = "/project.html";
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const createProjectButton = document.getElementById("create-project");
  const backButton = document.getElementById("back");
  const createProjectForm = document.getElementById("popupForm");

  const lovePattern = new LovePattern("grid");
  lovePattern.init();
  lovePattern.start();

  createProjectButton.addEventListener("click", showPopupForm);

  backButton.addEventListener("click", hidePopupForm);
  createProjectForm.addEventListener("submit", createProject);
});
