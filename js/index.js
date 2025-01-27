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
};

const createProject = (e) => {
  e.preventDefault();
  try {
    const projectTitle = document.getElementById("projectTitle").value;
    const projectDiscription =
      document.getElementById("projectDescription").value;
    const height = document.getElementById("gridHeight").value;
    const width = document.getElementById("gridWidth").value;
    const projectManager = new ProjectManager();

    const project = projectManager.crateProject({
      title: projectTitle,
      description: projectDiscription,
      width: width,
      height: height,
    });

    window.location.href = `/project.html?id=${project.id}`;
  } catch (error) {
    console.log(error);
  }
};

const displayProjectHistories = () => {
  const projectManager = new ProjectManager();
  const projects = projectManager.getAllProjects();
  const html = projects
    .map((project) => {
      console.log(project);
      
      return `<div class="project-item">
              <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-details">
                  <span class="project-date">Created At : ${project.createdAt}</span>
                  <span class="project-date">Last updated At : ${project.lastUpdatedAt}</span>
                </div>
                <a href="./project.html?id=${project.id}" class="continue-btn">Lanjutkan</a>
              </div>
            </div>`;
    })
    .join("");

  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
  projectList.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  const createProjectButton = document.getElementById("create-project");
  const backButton = document.getElementById("back");
  const createProjectForm = document.getElementById("popupForm");

  const lovePattern = new LovePattern("grid");
  lovePattern.init();
  lovePattern.start();
  displayProjectHistories();
  createProjectButton.addEventListener("click", showPopupForm);

  backButton.addEventListener("click", hidePopupForm);
  createProjectForm.addEventListener("submit", createProject);
});
