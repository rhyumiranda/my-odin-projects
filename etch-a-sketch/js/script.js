function createSlider(){
  let rangeSlider = document.createElement('input');
  rangeSlider.type = 'range';
  rangeSlider.id = 'slider';
  rangeSlider.min = '1';
  rangeSlider.max = '64';
  rangeSlider.value = '16';

  let sliderValInfo = document.getElementById("sliderValInfo");

  rangeSlider.addEventListener('input', function () {
    let sliderValue = parseInt(rangeSlider.value);
    clearGrid();
    createGrid(sliderValue);
    console.log('Slider value:', sliderValue);
    sliderValInfo.textContent = sliderValue + ' x ' + sliderValue;
  });

  const sliderContainer = document.getElementById('sliderContainer');
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
};

function clearGrid() {
  document.querySelectorAll(".grid").forEach(el => el.remove());
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
      let colorRed = Math.floor(Math.random() * 256);
      let colorBlue = Math.floor(Math.random() * 256);
      let colorGreen = Math.floor(Math.random() * 256);

      if (userDrawing == true) {
        if (eraserMode) {
          item.style.backgroundColor = 'transparent';
        } else if (userDrawingRGB == true){
          item.style.backgroundColor = 'rgb('+colorRed + ',' + colorBlue + ',' + colorGreen + ')';
        } else if (userDrawingShade == true){
          let darknessLevel = parseFloat(item.style.getPropertyValue('--darkness-level'));
          if (darknessLevel < 1) {
            darknessLevel += 0.1;
            item.style.setProperty('--darkness-level', darknessLevel);
          }
          item.style.backgroundColor = `rgba(0, 0, 0, ${darknessLevel})`;
        } else {
          item.style.backgroundColor = color;
        }
      }
    });

    item.addEventListener('click', () => {
      let color = document.getElementById('color-picker').value;
      let colorRed = Math.floor(Math.random() * 256);
      let colorBlue = Math.floor(Math.random() * 256);
      let colorGreen = Math.floor(Math.random() * 256);

      if (!userDrawing) {
        if (eraserMode) {
          item.style.backgroundColor = 'transparent';
        } else if (userDrawingRGB == true){
          item.style.backgroundColor = 'rgb('+colorRed + ',' + colorBlue + ',' + colorGreen + ')';
        } else if (userDrawingShade == true){
          let darknessLevel = parseFloat(item.style.getPropertyValue('--darkness-level'));
          if (darknessLevel < 1) {
            darknessLevel += 0.1;
            item.style.setProperty('--darkness-level', darknessLevel);
          }
          item.style.backgroundColor = `rgba(0, 0, 0, ${darknessLevel})`;
        } else {
          item.style.backgroundColor = color;
        }
      };
    });
  });

  let penBtn = document.getElementById('pen-button');
  let eraserBtn = document.getElementById('eraser-button');
  let shadeBtn = document.getElementById('grayscale-button');
  let rgbBtn = document.getElementById('rainbow-button');

  eraserBtn.addEventListener('click', () => {
    eraserMode = true;
    userDrawingRGB = false;
  });

  penBtn.addEventListener('click', () => {
    userDrawingShade = false;
    eraserMode = false;
    userDrawingRGB = false;
  });

  shadeBtn.addEventListener('click', () => {
    userDrawingShade = true;
    eraserMode = false;
    userDrawingRGB = false;
  });

  rgbBtn.addEventListener('click', () => {
    userDrawingRGB = true;
    eraserMode = false;
    userDrawingShade = false;
  });
};

function clearGridItems() {
  let clrGridBtn = document.getElementById('clearButton');
  clrGridBtn.addEventListener('click', function(){
    clearGrid();

    let sliderValue = parseInt(document.getElementById('slider').value);
    createGrid(sliderValue);
  });
}
 


createGrid(16);
clearGridItems();
createSlider();
