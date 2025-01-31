import LovePattern from "./model/LovePattern.js";
import CarouselProject from "./model/ProjectHistories.js";
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

const handleCreateProject = (e) => {
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

    window.location.href = `project/index.html?id=${project.id}`;
  } catch (error) {
    console.log(error);
  }
};
const projectManager = new ProjectManager();

const handleDeleteProject = (projectId) => {
  projectManager.deleteProjects(projectId);
  displayProjectHistories();
};

const handleDownloadProjectImage = (e) => {
  const URLData = e.target.dataset.projectImageUrl;
  const projectTitle = e.target.dataset.projectTitle;
  const link = document.createElement("a");
  link.href = URLData;
  link.download = projectTitle + ".png";
  link.click();
};

const displayProjectHistories = () => {
  const projects = projectManager.getAllProjects();
  const historyProject = document.getElementById("history-projects");
  const contentHistoryProject = historyProject.querySelector(".content");
  contentHistoryProject.innerHTML = "";

  let html;
  if (projects.length == 0) {
    const emptyMessage = document.querySelector(".empty-message");
    emptyMessage.style.display = "block";
  } else {
    html = projects
      .map((project) => {
        console.log(project);

        return `<div class="project-item">
              <div class="project-info">
                <div class="snapshot"  style="background-image: url('${project.URLData}'); background-size: cover; backgourd-position: top;">
                </div>        
                <div class="project-details">
                  <h3 class="project-title">${project.title}</h3>
                  <p class="project-desc">${project.description}</p>
                  <p>Created: ${project.createdAt}</p>
                  <p>Updated: ${project.lastUpdatedAt}</p>
                </div>
                <div class="buttons">
                
                
                <a href="./project/index.html?id=${project.id}" class="btn continue-btn">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </span>
                    Edit
                  </a>
                  <button class="btn delete-btn" data-project-id="${project.id}">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </span>
                    Delete

                  </button>
                  <button class="btn download-btn" data-project-image-url="${project.URLData}" data-project-title="${project.title}">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </span>
                    Download
                  </button>
                </div>
              </div>
            </div>`;
      })
      .join("");
    const projectList = document.createElement("div");
    projectList.classList.add("project-list");
    projectList.innerHTML = html + html + html;
    contentHistoryProject.append(projectList);
  }
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
  createProjectForm.addEventListener("submit", handleCreateProject);
});

const historyProject = document.getElementById("history-projects");

const handleShowPopupDeleteProject = (projectId) => {
  const backdropPopupDelete = document.getElementById("backdrop-popup-delete");
  backdropPopupDelete.style.display = "block";
  const deleteConfirmationButton = document.getElementById(
    "delete-confirmation"
  );
  deleteConfirmationButton.dataset.projectId = projectId;
};

const handleHidePopupDeleteProject = () => {
  const backdropPopupDelete = document.getElementById("backdrop-popup-delete");
  backdropPopupDelete.style.display = "none";
};

const deleteConfirmationButton = document.getElementById("delete-confirmation");
deleteConfirmationButton.addEventListener("click", () => {
  const projectId = deleteConfirmationButton.dataset.projectId;
  handleDeleteProject(projectId);
  handleHidePopupDeleteProject();
});

historyProject.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("delete-btn")) {
    const projectId = e.target.dataset.projectId;
    handleShowPopupDeleteProject(projectId);
  } else if (element.classList.contains("download-btn")) {
    handleDownloadProjectImage(e);
  }
});
