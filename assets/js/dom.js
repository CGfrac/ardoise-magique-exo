const eventsMap = {};

function setCanvasListeners(canvas, drawingManager) {
  const canvasClickCallback = canvasClick.bind(null, canvas, drawingManager);

  canvas.addEventListener("mousemove", canvasClickCallback);
  canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", canvasClickCallback);
  });
}

function canvasClick(canvas, drawingManager) {
  const pos = getMousePos(canvas);
  drawingManager.handleClick(canvas, pos);

  if (drawingManager.isPicking()) {
    canvas.removeEventListener('click', eventsMap.picker);
    drawingManager.toggleDrawing();
    canvas.addEventListener("mousedown", eventsMap.draw);
  }
}

function setEventListeners(drawingManager) {
  const canvas = document.getElementById("canvas");
  eventsMap.draw = setCanvasListeners.bind(null, canvas, drawingManager);
  canvas.addEventListener("mousedown", eventsMap.draw);

  const eraser = document.getElementById("eraser");
  eraser.addEventListener("click", () => {
    drawingManager.setColor("#ffffff");
  });

  const colorPicker = document.getElementById("color-picker");
  colorPicker.addEventListener("click", () => {
    drawingManager.togglePicking();
    canvas.removeEventListener('mousedown', eventsMap.draw);
    eventsMap.picker = canvasClick.bind(null, canvas, drawingManager);
    canvas.addEventListener('click', eventsMap.picker);
  });

  const epaisseurButtons = document.querySelectorAll(".epaisseur");
  epaisseurButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const size = button.textContent.toLowerCase();
      drawingManager.setSize(size);
    });
  });
}

function init(drawingManager) {
  const COLORS = [
    "#000000",
    "#5c2121",
    "#b9121b",
    "#ffbd07",
    "#13b813",
    "#029e9a",
    "#0378a6",
  ];

  const colorsContainer = document.getElementById("colors");

  COLORS.forEach((color) => {
    const colorDiv = document.createElement("div");

    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;

    colorDiv.addEventListener("click", () => {
      drawingManager.setColor(color);
      drawingManager.toggleDrawing();
    });

    colorsContainer.appendChild(colorDiv);
  });

  setEventListeners(drawingManager);
}
