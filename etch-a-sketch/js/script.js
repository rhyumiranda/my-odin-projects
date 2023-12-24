function createSlider(){
  let rangeSlider = document.createElement('input');
  rangeSlider.type = 'range';
  rangeSlider.id = 'slider';
  rangeSlider.min = '1';
  rangeSlider.max = '64';
  rangeSlider.value = '16';

  let sliderValInfo = document.getElementById("slider-value-display");

  rangeSlider.addEventListener('input', function () {
    let sliderValue = parseInt(rangeSlider.value);
    clearGrid();
    createGrid(sliderValue);
    console.log('Slider value:', sliderValue);
    sliderValInfo.textContent = sliderValue + ' x ' + sliderValue;
  });

  const sliderContainer = document.getElementById('slider-container');
  sliderContainer.appendChild(rangeSlider);
};

function createGrid(x){

  for(let row = 0; row < x; row++){
    for(let column = 0; column < x; column++){
      let gridContainer = document.querySelector("#gridContainer");
      let grid = document.createElement("div");
      grid.className = "grid";
      gridContainer.appendChild(grid);
    };
  };

  let gridElements = document.querySelectorAll(".grid");
  gridElements.forEach(el => el.style.height = (500 / x) + 'px');
  gridElements.forEach(el => el.style.width = (500 / x) + 'px');

  drawGrid();
  clearGridItems();
};

function clearGrid() {
  document.querySelectorAll(".grid").forEach(el => el.remove());
};

function shadeColor(rgb, decrement) {
  return [
      Math.max(rgb[0] - decrement, 0),
      Math.max(rgb[1] - decrement, 0),
      Math.max(rgb[2] - decrement, 0)
  ];
}

function hexToRgb(hex) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  var bigint = parseInt(hex, 16);

  // Extract the RGB components
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

function removeHoverEffect(buttons, classList){
  buttons.forEach(button => {
    button.classList.remove(classList);
  });
}; 

function drawGrid() {
  let userDrawing = false;
  let userDrawingRGB = false;
  let userDrawingShade = false;
  let eraserMode = false;
  let gridElements = document.querySelectorAll(".grid");

  document.addEventListener('mousedown', () => userDrawing = true);
  document.addEventListener('mouseup', () => userDrawing = false);

  gridElements.forEach(item => {
    item.style.setProperty('--darkness-level', 0);
    item.addEventListener('mouseenter', () => {
      let color = document.getElementById('color-picker').value;
    
      if (userDrawing == true) {
        if (eraserMode) {
          item.style.backgroundColor = 'transparent';
        } else if (userDrawingRGB == true) {
          let colorRed = Math.floor(Math.random() * 256);
          let colorBlue = Math.floor(Math.random() * 256);
          let colorGreen = Math.floor(Math.random() * 256);
          item.style.backgroundColor = 'rgb('+colorRed + ',' + colorBlue + ',' + colorGreen + ')';
        } else if (userDrawingShade == true) {
          let rgbValues = hexToRgb(color);
          let darknessLevel = parseFloat(item.style.getPropertyValue('--darkness-level'));
          let shadedColor = shadeColor(rgbValues, 10 * darknessLevel);
          item.style.backgroundColor = 'rgb(' + shadedColor.join(',') + ')';
          // Increment the darkness level for shading
          darknessLevel += 0.50; // Adjust the increment value as needed
          item.style.setProperty('--darkness-level', darknessLevel);
        } else {
          item.style.backgroundColor = color;
        }
      }
    });

    item.addEventListener('click', () => {
      let color = document.getElementById('color-picker').value;

      if (!userDrawing) {
        if (eraserMode) {
          item.style.backgroundColor = 'transparent';
        } else if (userDrawingRGB == true) {
          let colorRed = Math.floor(Math.random() * 256);
          let colorBlue = Math.floor(Math.random() * 256);
          let colorGreen = Math.floor(Math.random() * 256);
          item.style.backgroundColor = 'rgb('+colorRed + ',' + colorBlue + ',' + colorGreen + ')';
        } else if (userDrawingShade == true) {
          let rgbValues = hexToRgb(color);
          let darknessLevel = parseFloat(item.style.getPropertyValue('--darkness-level'));
          let shadedColor = shadeColor(rgbValues, 10 * darknessLevel);
          item.style.backgroundColor = 'rgb(' + shadedColor.join(',') + ')';
          // Increment the darkness level for shading
          darknessLevel += 0.50; // Adjust the increment value as needed
          item.style.setProperty('--darkness-level', darknessLevel);
        } else {
          item.style.backgroundColor = color;
        }
      };
    });
  });

  let penBtn = document.getElementById('pen-button');
  let eraserBtn = document.getElementById('eraser-button');
  let shadeBtn = document.getElementById('blend-button');
  let rgbBtn = document.getElementById('rainbow-button');

  eraserBtn.addEventListener('click', () => {
    removeHoverEffect([penBtn, shadeBtn, rgbBtn], 'hovered');

    eraserBtn.classList.add('hovered');
    currentHighlightedButton = eraserBtn;
    eraserMode = true;
    userDrawingRGB = false;
  });

  penBtn.addEventListener('click', () => {
    removeHoverEffect([eraserBtn, shadeBtn, rgbBtn], 'hovered');

    penBtn.classList.add('hovered');
    currentHighlightedButton = penBtn;
    userDrawingShade = false;
    eraserMode = false;
    userDrawingRGB = false;
  });

  shadeBtn.addEventListener('click', () => {
    removeHoverEffect([penBtn, eraserBtn, rgbBtn], 'hovered');

    shadeBtn.classList.add('hovered');
    currentHighlightedButton = shadeBtn;
    userDrawingShade = true;
    eraserMode = false;
    userDrawingRGB = false;
  });

  rgbBtn.addEventListener('click', () => {
    removeHoverEffect([penBtn, shadeBtn, eraserBtn], 'hovered');

    rgbBtn.classList.add('hovered');
    currentHighlightedButton = rgbBtn;
    userDrawingRGB = true;
    eraserMode = false;
    userDrawingShade = false;
  });
  
};

function clearGridItems() {
  let clrGridBtn = document.getElementById('clear-button');
  clrGridBtn.addEventListener('click', function(){
    clearGrid();
    let sliderValue = parseInt(document.getElementById('slider').value);
    createGrid(sliderValue);
  });
}
 


createGrid(16);
createSlider();
