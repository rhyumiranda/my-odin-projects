const DEFAULT_GRID_SIZE = 16;
const DEFAULT_GRID_MAX_SIZE = 64;

//Create a range slider in which the value will be utilized by the createGrid function.
function createSlider() {
  const rangeSlider = document.createElement("input");
  rangeSlider.type = "range";
  rangeSlider.id = "slider";
  rangeSlider.min = "1";
  rangeSlider.max = DEFAULT_GRID_MAX_SIZE.toString();
  rangeSlider.value = DEFAULT_GRID_SIZE.toString();

  const sliderValInfo = document.getElementById("slider-value-display");

  rangeSlider.addEventListener("input", function () {
    const sliderValue = parseInt(rangeSlider.value);
    clearGrid();
    createGrid(sliderValue);
    sliderValInfo.textContent = `${sliderValue} x ${sliderValue}`;
  });

  const sliderContainer = document.getElementById("slider-container");
  sliderContainer.appendChild(rangeSlider);
}

//Creation of row and column that would accept values and print out divs per row and column.
function createGrid(x) {
  let gridContainer = document.querySelector("#grid-container");

  // Clear existing grid items
  clearGrid();

  // Calculate the width and height of each grid item based on the container size
  const gridItemSize = gridContainer.clientWidth / x;

  for (let row = 0; row < x; row++) {
    for (let column = 0; column < x; column++) {
      const grid = document.createElement("div");
      grid.className = "grid";
      grid.style.width = `${gridItemSize}px`;
      grid.style.height = `${gridItemSize}px`;
      gridContainer.appendChild(grid);
    }
  }

  drawGrid();
  clearGridItems();
}

//This will remove the hovered divs on the grid.
function clearGrid() {
  document.querySelectorAll(".grid").forEach((el) => el.remove());
}

//This will assess the decrementation of the intensity of the color.
//Values of decrementation would subtract 20 for each of RGB for every click.
function shadeColor(rgb, decrement) {
  return [
    Math.max(rgb[0] - decrement, 0),
    Math.max(rgb[1] - decrement, 0),
    Math.max(rgb[2] - decrement, 0),
  ];
}

//Conversion of hex to RGB to be use for the shadeColor().
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");

  let bigint = parseInt(hex, 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

//This will remove the fixed hover of buttons when the user has selected a new button.
function removeHoverEffect(buttons, classList) {
  buttons.forEach((button) => {
    button.classList.remove(classList);
  });
}

//This will decide what mode of drawing is gonna be used in the grid by using true or false values.
function drawGrid() {
  let gridElements = document.querySelectorAll(".grid");

  document.addEventListener("mousedown", () => (userDrawing = true)); //If the userDrawing is true it will use mouseenter event.
  document.addEventListener("mouseup", () => (userDrawing = false)); //If the userDrawing is false it will use click event.

  gridElements.forEach((item) => {
    item.style.setProperty("--darkness-level", 0); //For every element they will have a base of 0 darkness for unique values. The darkness trail wouldn't be the same to every divs.
    item.addEventListener("mouseenter", () => {
      //Mouse Enter Event if True.
      let color = document.getElementById("color-picker").value;

      if (userDrawing == true) {
        if (eraserMode) {
          //Eraser Mode
          item.style.backgroundColor = "transparent";
        } else if (userDrawingRGB == true) {
          //RGB Mode
          let colorRed = Math.floor(Math.random() * 256);
          let colorBlue = Math.floor(Math.random() * 256);
          let colorGreen = Math.floor(Math.random() * 256);
          item.style.backgroundColor =
            "rgb(" + colorRed + "," + colorBlue + "," + colorGreen + ")";
        } else if (userDrawingShade == true) {
          //Shading Mode
          let rgbValues = hexToRgb(color); //Conversion of HEX from the color-picker to RGB values
          let darknessLevel = parseFloat(
            item.style.getPropertyValue("--darkness-level")
          );
          let shadedColor = shadeColor(rgbValues, 10 * darknessLevel); //This will decrement value for Red Green Blue until it reaches the value of 0. This will return the RGB values from the decrementation.
          item.style.backgroundColor = "rgb(" + shadedColor.join(",") + ")"; //This will remove the array brackets and the RGB would be able to utilize the value.
          // Increment the darkness level for shading.
          darknessLevel += 0.5; // Adjust the increment value as needed how fast the darkening effect would be.
          item.style.setProperty("--darkness-level", darknessLevel);
        } else {
          //Color Mode
          item.style.backgroundColor = color; //Color Mode
        }
      }
    });

    item.addEventListener("click", () => {
      // Click Event if false.
      let color = document.getElementById("color-picker").value;

      if (!userDrawing) {
        if (eraserMode) {
          item.style.backgroundColor = "transparent";
        } else if (userDrawingRGB == true) {
          let colorRed = Math.floor(Math.random() * 256);
          let colorBlue = Math.floor(Math.random() * 256);
          let colorGreen = Math.floor(Math.random() * 256);
          item.style.backgroundColor =
            "rgb(" + colorRed + "," + colorBlue + "," + colorGreen + ")";
        } else if (userDrawingShade == true) {
          let rgbValues = hexToRgb(color);
          let darknessLevel = parseFloat(
            item.style.getPropertyValue("--darkness-level")
          );
          let shadedColor = shadeColor(rgbValues, 10 * darknessLevel);
          item.style.backgroundColor = "rgb(" + shadedColor.join(",") + ")";
          // Increment the darkness level for shading.
          darknessLevel += 0.5; // Adjust the increment value as needed how fast the darkening effect would be.
          item.style.setProperty("--darkness-level", darknessLevel);
        } else {
          item.style.backgroundColor = color;
        }
      }
    });
  });
}

//This will be responsible for activating the different modes and will add hover when use selected a button.
function setupButtons() {
  let penBtn = document.getElementById("pen-button");
  let eraserBtn = document.getElementById("eraser-button");
  let shadeBtn = document.getElementById("blend-button");
  let rgbBtn = document.getElementById("rainbow-button");
  let clearBtn = document.getElementById("clear-button");

  eraserBtn.addEventListener("click", () => {
    removeHoverEffect([penBtn, shadeBtn, rgbBtn], "hovered");

    eraserBtn.classList.add("hovered");
    eraserMode = true;
    userDrawingRGB = false;
  });

  penBtn.addEventListener("click", () => {
    removeHoverEffect([eraserBtn, shadeBtn, rgbBtn], "hovered");
    penBtn.classList.add("hovered");
    userDrawingShade = false;
    eraserMode = false;
    userDrawingRGB = false;
  });

  shadeBtn.addEventListener("click", () => {
    removeHoverEffect([penBtn, eraserBtn, rgbBtn], "hovered");

    shadeBtn.classList.add("hovered");
    userDrawingShade = true;
    eraserMode = false;
    userDrawingRGB = false;
  });

  rgbBtn.addEventListener("click", () => {
    removeHoverEffect([penBtn, shadeBtn, eraserBtn], "hovered");

    rgbBtn.classList.add("hovered");
    userDrawingRGB = true;
    eraserMode = false;
    userDrawingShade = false;
  });

  clearBtn.addEventListener("click", () => {
    removeHoverEffect([penBtn, shadeBtn, eraserBtn, rgbBtn], "hovered");
    autoHover(penBtn);
  });
}

//This will refresh and remove the previous grid after the slider range has made a new value for createGrid().
function clearGridItems() {
  let clrGridBtn = document.getElementById("clear-button");
  clrGridBtn.addEventListener("click", function () {
    clearGrid();
    let sliderValue = parseInt(document.getElementById("slider").value);
    createGrid(sliderValue);
  });
}

//This will set the default hover whenever the user has clicked the clear button.
function autoHover(button) {
  button.classList.add("hovered");
  userDrawingShade = false;
  eraserMode = false;
  userDrawingRGB = false;
}

//This initialization is responsible for grid that will set the default grid size and create the slider range.
function initializeGrid() {
  createGrid(DEFAULT_GRID_SIZE);
  createSlider();
}

//This will be the overall initialization of the program.
function initialize() {
  initializeGrid();
  setupButtons();
}

//When the user loads up the website the presets would be prepared.
window.addEventListener("load", () => {
  let penBtn = document.getElementById("pen-button");
  autoHover(penBtn);
  initialize();
});
