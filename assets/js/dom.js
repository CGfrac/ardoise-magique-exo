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

  const _setColorButtons = () => {
    const colorsContainer = document.getElementById("colors");

    _COLORS.forEach(color => {
      const colorDiv = document.createElement("div");

      colorDiv.classList.add("color");
      colorDiv.style.backgroundColor = color;
      colorDiv.dataset.color = color;

      colorsContainer.appendChild(colorDiv);
    });
  };

  const init = () => {
    _setColorButtons();
  };

  return { init };
};
