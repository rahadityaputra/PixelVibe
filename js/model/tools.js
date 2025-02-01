const tools = [
  {
    name: "Color Palette",
    icon: "palette-line",
    action: () => {
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
    action: (enable, disable) => {
      try {
        currentProject.undo();
        enable();
        canvas.clear();
        canvas.render(currentProject.coloredPoints);
      } catch (error) {
        disable();
      }
    },
  },
  {
    name: "Redo",
    icon: "arrow-go-forward-line",
    action: () => {
      try {
        currentProject.redo();
        canvas.clear();
        canvas.render(currentProject.coloredPoints);
      } catch (error) {}
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
      canvas.clear();
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

export default tools;
