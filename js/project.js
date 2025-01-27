import Canvas from "./model/Canvas.js";
import ProjectManager from "./model/ProjectManager.js";
import ToolBar from "./model/ToolBar.js";

const getIdFromQuery = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return id;
};

const showProjectCreatedAt = (createdAt) => {
  const createdAtHeader = document.getElementById("created-at");
  createdAtHeader.textContent = `Project created on: ${createdAt}`
}


document.addEventListener("DOMContentLoaded", () => {
  const projectId = getIdFromQuery();
  const projectManager = new ProjectManager();
  const project = projectManager.getProject(projectId);
  const canvas = new Canvas("pixel-canvas-wrapper", project.width, project.height, project.coloredPoints);

  const tools = [
    {
      name: "Color Palette",
      icon: "palette-line",
      action: () => {
        console.log("ppp");
      },
    },
    {
      name: "Pencil",
      icon: "pencil-line",
      action: () => {
        canvas.activeDrawingMode();
      },
    },
    {
      name: "Erase",
      icon: "eraser-line",
      action: () => {
        canvas.activeEraseMode();
      },
    },
    { name: "Undo", icon: "arrow-go-back-line", action: () => {} },
    { name: "Redo", icon: "arrow-go-forward-line", action: () => {} },
    {
      name: "Clear",
      icon: "restart-line",
      action: () => {
        canvas.clear();
      },
    },
    {
      name: "Download",
      icon: "arrow-down-line",
      action: () => {
        projectManager.downloadProject();
      },
    },
    {
      name: "Save",
      icon: "save-line",
      action: () => {
        const coloredPoints = canvas.getColoredPaints();
        projectManager.saveProject(projectId, coloredPoints);
      },
    },
  ];

  const toolbar = new ToolBar("toolbar", tools, "toolbar");
  toolbar.render();
  canvas.render();
  showProjectCreatedAt(project.createdAt);
});
