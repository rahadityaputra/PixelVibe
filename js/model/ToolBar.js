import Tool from "./Tool.js";

class ToolBar {
  constructor(name, tools, containerId) {
    this.name = name;
    this.tools = tools;
    this.containerId = containerId;
  }

  render = () => {
    this.tools.forEach((tool) => {
      const newTool = new Tool(
        {
          name: tool.name,
          icon: tool.icon,
          action: tool.action,
          text : tool.text
        },
        this.containerId
      );
      newTool.render();
    });
  };
}

export default ToolBar;
