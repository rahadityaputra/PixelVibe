import LocalStorage from "./LocalStorage.js";
import Project from "./Project.js";

class ProjectManager {
  #storage;
  #currentProject;
  

  constructor() {
    this.#storage = new LocalStorage();
    this.#currentProject = undefined;
  }

  setCurrentProject = (projectId) => {
    const project = this.getProject(projectId);
    this.#currentProject = new Project(project);
  }

  getCurrentProject = () => {
    return this.#currentProject;
  }


  getProject = (projectId) => {
    const project = this.#storage.getProject(projectId);
    return project;
  };

  saveCurrentProject = (contentCanvas) => {
    const URLData = this.createURL(contentCanvas)
    const coloredPoints = this.#currentProject.save();
    this.#storage.saveProject(this.#currentProject.id, coloredPoints, URLData)
  };

  downloadCurrentProject = (contentCanvas) => {
    const dataURL = this.createURL(contentCanvas);
    // Buat elemen <a> untuk download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = this.#currentProject.title + ".png";
    link.click();
  };
  
  createURL = (contentCanvas) => {
    const dataURL = contentCanvas.toDataURL("image/png", 1);
    return dataURL;

  }

  crateProject = ({ title, description, width, height }) => {
    const project = this.#storage.addProject({ title, description,width, height });
    return project;
  };

  getAllProjects = () => {
    const projects = this.#storage.getAllProjects();
    return projects;
  }

  init() {}
}

export default ProjectManager;
