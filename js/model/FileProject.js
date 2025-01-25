import LocalStorage from "./LocalStorage.js";

class Project {
  constructor(projectId, canvas) {
    const pixelStorage = new LocalStorage();
    this.canvas = canvas;
    this.project = pixelStorage.getProject(projectId);
  }

  save() {}

  download() {
    const dataURL = this.canvas.toDataURL("image/png", 1);
    // Buat elemen <a> untuk download
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = this.project.name +".png"; // Nama file yang akan didownload
    link.click(); // Klik otomatis untuk memulai download
  }

  init() {}
}

export default Project;
