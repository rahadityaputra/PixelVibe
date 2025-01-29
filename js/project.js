import Canvas from "./model/Canvas.js";
import ProjectManager from "./model/ProjectManager.js";
import ToolBar from "./model/ToolBar.js";
import tools from "./model/tools.js";

const getIdFromQuery = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return id;
};

const showProjectCreatedAt = (createdAt) => {
  const createdAtHeader = document.getElementById("created-at");
  createdAtHeader.textContent = `Project created on: ${createdAt}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const projectId = getIdFromQuery();
  const projectManager = new ProjectManager();
  projectManager.setCurrentProject(projectId);
  const currentProject = projectManager.getCurrentProject();
  const canvas = new Canvas("pixel-canvas-wrapper");

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
    {
      name: "Undo",
      icon: "arrow-go-back-line",
      isDisable: true,
      action: (enable, disable) => {
        currentProject.undo();
        canvas.clear();
        canvas.render(currentProject.coloredPoints);
      },
    },
    {
      name: "Redo",
      icon: "arrow-go-forward-line",
      isDisable: true,
      action: () => {
        currentProject.redo();
        canvas.clear();
        canvas.render(currentProject.coloredPoints);
      },
    },
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
        projectManager.downloadCurrentProject(canvas.getContentCanvas());
      },
    },
    {
      name: "Save",
      icon: "save-line",
      action: () => {
        projectManager.saveCurrentProject(canvas.getContentCanvas());
      },
    },
  ];
  const toolbar = new ToolBar("toolbar", tools, "toolbar");

  toolbar.render();

  canvas.init(currentProject.width, currentProject.height);
  canvas.render(currentProject.coloredPoints);
  canvas.setOnDragEnd((newColoredPoints) => {
    currentProject.addHistory(newColoredPoints);
  });

  currentProject.setActionListener((action) => {
    if (action === "addHistory") {
      toolbar.setToolState("Undo", "enable");
    } else if (action == "undo") {
      toolbar.setToolState("Redo", "enable");
    } else if (action == "redo") {
      toolbar.setToolState("Undo", "enable");
    } else if (action == "not-redo") {
      toolbar.setToolState("Redo", "disable");
    } else if (action == "not-undo") {
      toolbar.setToolState("Undo", "disable");
    } else if (action == "save") {
      toolbar.setToolState("Undo", "disable");
      toolbar.setToolState("Redo", "disable");
    }
  });

  showProjectCreatedAt(currentProject.createdAt);
});
