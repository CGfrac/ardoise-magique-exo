const DOM = () => {
  const _COLORS = [
      "#000000",
      "#5c2121",
      "#b9121b",
      "#ffbd07",
      "#13b813",
      "#029e9a",
      "#0378a6",
    ];

  let _currentActiveColor = '#000000';

  const setActiveButtonClass = id => {
    const button = document.getElementById(id);
    button.classList.add('active-button');
  };

  const deleteActiveButtonClass = id => {
    const button = document.getElementById(id);
    button.classList.remove('active-button');
  };

  const removeCurrentActiveColorClass = () => {
    const colorDiv = document.querySelector(`[data-color="${_currentActiveColor}"]`);
    colorDiv.classList.remove('active-color');
  };

  const updateActiveColor = color => {
    // Change behavior if color is that of the eraser
    if (color == '#ffffff') {
      setActiveButtonClass('eraser');
    } else {
      const colorDiv = document.querySelector(`[data-color="${color}"]`);
      colorDiv.classList.add('active-color');
      _currentActiveColor = color;
    }
  }

  const _setColorButtons = () => {
    const colorsContainer = document.getElementById("colors");

    _COLORS.forEach(color => {
      const colorDiv = document.createElement("div");

      colorDiv.classList.add("color");
      colorDiv.style.backgroundColor = color;
      colorDiv.dataset.color = color;

      colorsContainer.appendChild(colorDiv);
    });

    updateActiveColor('#000000');
  };

  const init = () => {
    _setColorButtons();
  };

  return {
    setActiveButtonClass,
    deleteActiveButtonClass,
    removeCurrentActiveColorClass,
    updateActiveColor,
    init
  };
};
