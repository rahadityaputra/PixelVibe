import LocalStorage from "./LocalStorage.js";

class ProjectManager {
  #storage;

  constructor() {
    this.#storage = new LocalStorage();
  }

  getProject = (projectId) => {
    const project = this.#storage.getProject(projectId);
    return project;
  };

  saveProject = (projectId, coloredPoints) => {
    console.log(projectId);
  
    // const project = this.getProject(projectId);
    // console.log(project);
    // project.coloredPoints = coloredPoints;
    this.#storage.saveProject(projectId, coloredPoints)
  };

  downloadProject = () => {
    const dataURL = this.canvas.toDataURL("image/png", 1);
    // Buat elemen <a> untuk download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = this.project.title + ".png";
    link.click();
  };

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
