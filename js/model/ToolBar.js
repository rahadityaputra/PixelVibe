import Tool from "./Tool.js";

class ToolBar {
  constructor(name, tools, containerId) {
    this.name = name;
    this.tools = tools;
    this.containerId = containerId;
  }

  render = () => {
    this.tools = this.tools.map((tool) => {
      return new Tool(
        {
          name: tool.name,
          icon: tool.icon,
          isDisable : tool.isDisable,
          action: tool.action,
          text : tool.text
        },
        this.containerId
      );
    });


    this.tools.forEach(tool => {
      tool.render();
    })
  };

  setToolState = (toolName, state) => {
    const tool = this.tools.find((tool) => tool.name === toolName);
    console.log(tool);
    
    if (tool) {
      if(state === "enable") {
        tool.enable();
      } else if (state === "disable") {
        tool.disable();
      }
    }
  }
  
  setToolColor = (toolName, color) =>{
    const tool = this.tools.find((tool) => tool.name === toolName);
    console.log(tool);
    if (tool) {
      tool.setColor(color);
    }
    
  }
}

export default ToolBar;
