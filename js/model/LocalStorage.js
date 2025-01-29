class LocalStorage {
  constructor() {
    this.storage = window.localStorage;
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

  addProject(
    config = { title: "", description: "", width: null, height: null }
  ) {
    this.load();
    let newId;
    if (this.data.projects.length == 0) {
      newId = 1;
    } else {
      newId = this.data.projects[this.data.projects.length - 1].id + 1;
    }
    const createdAt = new Date().toLocaleString(undefined, {
      minute: "2-digit",
      hour: "2-digit",
      weekday: "long",
      day: "numeric",
      year: "numeric",
      month: "long",
    });

    const coloredPoints = [];
    const project = {
      ...config,
      id: newId,
      createdAt,
      lastUpdatedAt: createdAt,
      coloredPoints,
    };
    this.data.projects.push(project);
    this.save();
    return project;
  }

  save() {
    this.storage.setItem(this.storageName, JSON.stringify(this.data));
  }

  getProject(projectId) {
    const projects = this.getAllProjects();

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == projectId) {
        const result = projects[i];
        return result;
      }
    }
    return null;
  }

  getAllProjects = () => {
    this.load();
    const result = this.data.projects;
    return result;
  };

  saveProject = (projectId, coloredPoints, URLData) => {
    const projects = this.getAllProjects();
    let index;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id == projectId) {
        index = i;
        break;
      }
    }

    projects[index].coloredPoints = coloredPoints;
    projects[index].URLData = URLData;
    projects[index].lastUpdatedAt = new Date().toLocaleString(undefined, {
      minute: "2-digit",
      hour: "2-digit",
      weekday: "long",
      day: "numeric",
      year: "numeric",
      month: "long",
    });
    this.data.projects = projects;
    this.save();
  };
}

export default LocalStorage;
