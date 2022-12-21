const DrawingManager = () => {
    let _currentColor = '#000000';
    let _currentSize = 10;
    let _drawing = true;

    const _drawRect = (canvas, pos) => {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = _currentColor;
        ctx.fillRect(pos.x, pos.y, _currentSize, _currentSize);
    }

    const _pickColor = (canvas, pos) => {
        const ctx = canvas.getContext("2d");

        const imgData = ctx.getImageData(pos.x, pos.y, 1, 1);
        const color = `rgb(${imgData.data[0]}, ${imgData.data[1]}, ${imgData.data[2]})`;

        setColor(color);
    }

    const toggleDrawing = () => _drawing = true;
    const togglePicking = () => _drawing = false;
    const isPicking = () => !_drawing;

    const handleClick = (canvas, pos) => {
        if (_drawing) {
            _drawRect(canvas, pos);
        } else {
            _pickColor(canvas, pos)
        }
    }

    const setColor = color => _currentColor = color;
    const setSize = size => {
        switch(size) {
            case 'fin':
                _currentSize = 5;
                break;
            case 'epais':
                _currentSize = 15;
                break;
            default:
                _currentSize = 10;
        }
    };

    return {
        toggleDrawing,
        togglePicking,
        isPicking,
        handleClick,
        setColor,
        setSize
    }
};
