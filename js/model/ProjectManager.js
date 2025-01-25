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

  saveProject = () => {};

  downloadProject = () => {
    const dataURL = this.canvas.toDataURL("image/png", 1);
    // Buat elemen <a> untuk download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = this.project.name + ".png"; // Nama file yang akan didownload
    link.click(); // Klik otomatis untuk memulai download
  };

  crateProject = ({ name, width, height }) => {
    this.#storage.addProject({ name, width, height });
  };

  init() {}
}

export default ProjectManager;
