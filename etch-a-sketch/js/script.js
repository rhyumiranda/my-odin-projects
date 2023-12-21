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
  let eraserMode = false;
  let gridElements = document.querySelectorAll(".grid");
  

  document.addEventListener('mousedown', () => userDrawing = true);
  document.addEventListener('mouseup', () => userDrawing = false);

  
  gridElements.forEach(item => {

    item.addEventListener('mouseenter', () => {
      let color = document.getElementById('color-picker').value;
      if (userDrawing == true) {
        if (eraserMode) {
          item.style.backgroundColor = 'rgb(236, 236, 236)';
        } else {
          item.style.backgroundColor = color;
        }
      }
    });

    item.addEventListener('click', () => {
      let color = document.getElementById('color-picker').value;
      if (!userDrawing) {
        if (eraserMode) {
          item.style.backgroundColor = 'rgb(236, 236, 236)';
        } else {
          item.style.backgroundColor = color;
        }
      };
    });
  });

  let eraserBtn = document.getElementById('eraserButton');
  let pen = document.getElementById('pen-button');

  eraserBtn.addEventListener('click', () => {
    eraserMode = true;
  });

  pen.addEventListener('click', () => {
    eraserMode = false;
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
