import ProjectManager from "./ProjectManager.js";

class CarouselProject {
  #container;
  projects;
  constructor(containerId) {
    this.#container = document.getElementById(containerId);

    this.carouselDiv = document.createElement("div");
    this.carouselDiv.classList.add("carousel");
    this.#container.appendChild(this.carouselDiv);
    this.createNavigationDiv();
    this.createContentCarouselDiv();

    const projectManager = new ProjectManager();
    this.projects = projectManager.getAllProjects();
  }

  createContentCarouselDiv = () => {
    this.contentCarouselDiv = document.createElement("div");
    this.contentCarouselDiv.classList.add("content");
    this.carouselDiv.appendChild(this.contentCarouselDiv);
  };

  createNavigationDiv = () => {
    const navigationDiv = document.createElement("div");
    navigationDiv.classList.add("navigation");
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.classList.add("prev-btn");
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("next-btn");
    navigationDiv.appendChild(prevButton);
    navigationDiv.appendChild(nextButton);

    this.carouselDiv.appendChild(navigationDiv);
  };

  loadProjects = () => {
    console.log(this.projects);

    const html = this.projects
      .map((project) => {
        return `<div class="project-item">
            <div class="project-info">
              <img src="${project.URLData}" alt="" width="150">
              <h3 class="project-title">${project.title}</h3>
              <div class="project-details">
                <p class="project-desc">${project.description}</p>
                <p class="project-date">Created At : ${project.createdAt}</p>
                <p class="project-date">Last updated At : ${project.lastUpdatedAt}</p>
                </div>
                <div class="menu">
                  <a href="./project/index.html?id=${project.id}" class="btn continue-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </a>
                  <a href="./project.html?id=${project.id}" class="btn continue-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </a>
                  <a href="./project.html?id=${project.id}" class="btn continue-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </a>
                </div>
            </div>
          </div>`;
      })
      .join("");

    this.contentCarouselDiv.innerHTML = html;
  };

  prev = () => {};

  next = () => {};
}

export default CarouselProject;
