const DOM = () => {
  const _canvas = document.getElementById('canvas');
  const _canvasManager = CanvasManager(_canvas);

  const _COLORS = [
      "#000000",
      "#5c2121",
      "#b9121b",
      "#ffbd07",
      "#13b813",
      "#029e9a",
      "#0378a6",
    ];

  const _startDrawing = () => {
    _canvasManager.start();
  };

  const _stopDrawing = () => {
    _canvasManager.stop();
  };

  const _draw = () => {
    _canvasManager.draw();
  };

  const _pickColor = () => {
    _canvasManager.pick();
    _canvas.removeEventListener('click', _pickColor);
    _canvas.addEventListener('mousedown', _startDrawing);
  };

  const _setEventListeners = () => {
    _canvas.addEventListener('mousedown', _startDrawing);
    _canvas.addEventListener('mouseup', _stopDrawing);
    _canvas.addEventListener('mousemove', _draw);

    const eraser = document.getElementById("eraser");
    eraser.addEventListener("click", () => {
      _canvasManager.setColor("#ffffff");
    });

    const colorPicker = document.getElementById("color-picker");
    colorPicker.addEventListener("click", () => {
      _canvas.removeEventListener('mousedown', _startDrawing);
      _canvas.addEventListener('click', _pickColor);
    });

    const epaisseurButtons = document.querySelectorAll(".epaisseur");
    epaisseurButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const size = button.textContent.toLowerCase();
        _canvasManager.setSize(size);
      });
    });
  };

  const _setColorButtons = () => {
    const colorsContainer = document.getElementById("colors");

    _COLORS.forEach((color) => {
      const colorDiv = document.createElement("div");

      colorDiv.classList.add("color");
      colorDiv.style.backgroundColor = color;

      colorDiv.addEventListener("click", () => {
        _canvasManager.setColor(color);
      });

      colorsContainer.appendChild(colorDiv);
    });
  };

  const init = () => {
    _setColorButtons();
    _setEventListeners();
  };

  return { init };
};
