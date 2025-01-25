class LocalStorage {
  constructor() {
    this.storage = window.localStorage;
    console.log(this.storage);
    this.storageName = "PixelVibe";
    this.data = null;
  }

  isEmpty() {
    if (this.storage.getItem(this.storageName)) {
      return false;
    }

    return true;
  }

  load() {
    if (!this.isEmpty()) {
      this.data = JSON.parse(this.storage.getItem(this.storageName));
      return;
    }
    this.data = {
      projects: [],
    };
  }

  addProject(config = { name: "", width: null, height: null }) {
    this.load();
    let newId;
    if (this.data.projects.length == 0) {
      newId = 1;
    } else {
      newId = this.data.projects[this.data.projects.length - 1].id + 1;
    }
    this.data.projects.push({ ...config, id: newId });
    this.save();
  }

  save() {
    this.storage.setItem(this.storageName, JSON.stringify(this.data));
  }

  getProject(projectId) {
    this.load();
    let result;
    const projects = this.data.projects;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == projectId) {
        result = projects[i];
        console.log(result);
        return result;
      }
    }
  }
}

export default LocalStorage;
