const CanvasManager = (canvas) => {
  const _canvas = canvas;
  const _ctx = _canvas.getContext("2d");

  let _currentColor = "#000000";
  let _currentSize = 10;

  let _drawing = false;
  const _pos = { x: 0, y: 0 };

  const _updatePos = () => {
    const rect = _canvas.getBoundingClientRect();
    _pos.x = event.clientX - rect.left;
    _pos.y = event.clientY - rect.top;
  };

  const start = () => {
    _updatePos();
    _drawing = true;
  };

  const stop = () => (_drawing = false);

  const draw = () => {
    if (_drawing) {
      _ctx.beginPath();

      _ctx.lineCap = "round";
      _ctx.strokeStyle = _currentColor;
      _ctx.lineWidth = _currentSize;

      _ctx.moveTo(_pos.x, _pos.y);

      _updatePos();
      _ctx.lineTo(_pos.x, _pos.y);

      _ctx.stroke();
    }
  };

  const pick = () => {
    _updatePos();

    const imgData = _ctx.getImageData(_pos.x, _pos.y, 1, 1);
    const color = `rgb(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]})`;

    setColor(color);
  };

  const setColor = (color) => (_currentColor = color);
  const setSize = (size) => {
    switch (size) {
      case "fin":
        _currentSize = 5;
        break;
      case "epais":
        _currentSize = 15;
        break;
      default:
        _currentSize = 10;
    }
  };

  return {
    start,
    stop,
    draw,
    pick,
    setColor,
    setSize,
  };
};
