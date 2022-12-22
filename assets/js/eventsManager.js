const EventsManager = (dom) => {
  const _canvas = document.getElementById('canvas');
  const _canvasManager = CanvasManager(_canvas);
  const _dom = dom;

  /*****************
  *    CALLBACKS   *
  ******************/
  const _startDrawingCallback = () => _canvasManager.start();
  const _stopDrawingCallback = () => _canvasManager.stop();
  const _drawCallback = () => _canvasManager.draw();

  const _pickColorCallback = () => {
    const color = _canvasManager.pick();
    // When color picked, we go back to listening for drawing actions
    _canvas.removeEventListener('click', _pickColorCallback);
    _canvas.addEventListener('mousedown', _startDrawingCallback);

    // remove highlight of color picker button
    _dom.deleteActiveButtonClass('color-picker');

    _dom.updateActiveColor(color);
  };

  const _setColorCallback = () => {
    // currentTarget used instead of target to prevent selecting the eraser icon instead of its parent button
    const element = event.currentTarget;
    const color = element.dataset.color;
    _canvasManager.setColor(color);

    _dom.removeCurrentActiveColorClass();

    // remove highlight of eraser button if we go back to drawing
    // also update the active color element
    if (color !== '#ffffff') {
      _dom.deleteActiveButtonClass('eraser');
      _dom.updateActiveColor(color);
    }
  };

  const _sizeCallback = () => {
    const button = event.target;
    const size = button.id;
    _canvasManager.setSize(size);

    const currentActiveButton = document.querySelector('.epaisseur.active-button');
    const previousSize = currentActiveButton.id;

    _dom.deleteActiveButtonClass(previousSize);
    _dom.setActiveButtonClass(size);
  };

  /*****************
  *    LISTENERS   *
  ******************/
  const _setCanvasListeners = () => {
    _canvas.addEventListener('mousedown', _startDrawingCallback);
    _canvas.addEventListener('mouseup', _stopDrawingCallback);
    _canvas.addEventListener('mousemove', _drawCallback);
  };

  const _setEraserListener = () => {
    const eraser = document.getElementById("eraser");
    eraser.dataset.color = '#ffffff';
    eraser.addEventListener("click", () => {
      _dom.setActiveButtonClass('eraser');
      _setColorCallback();
    });
  };

  const _setColorPickerListener = () => {
    const colorPicker = document.getElementById("color-picker");

    colorPicker.addEventListener("click", () => {
      _dom.removeCurrentActiveColorClass();
      _dom.deleteActiveButtonClass('eraser'); // in case it was selected before
      _dom.setActiveButtonClass('color-picker');

      // We stop listening for drawing actions and wait for user to click on canvas to pick color
      _canvas.removeEventListener('mousedown', _startDrawingCallback);
      _canvas.addEventListener('click', _pickColorCallback);
    });
  };

  const _setColorChoiceListeners = () => {
    const colors = document.querySelectorAll('.color');

    colors.forEach(color => color.addEventListener("click", _setColorCallback));
  };

  const _setSizeListeners = () => {
    const sizeButtons = document.querySelectorAll(".epaisseur");

    sizeButtons.forEach(button => button.addEventListener("click", _sizeCallback));
  };

  const setEventListeners = () => {
    _setCanvasListeners();
    _setEraserListener();
    _setColorPickerListener();
    _setColorChoiceListeners();
    _setSizeListeners();
  };

  return { setEventListeners };
};
