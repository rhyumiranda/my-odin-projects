function getNumGrid(){
  let rangeSlider = document.createElement('input');
  rangeSlider.type = 'range';
  rangeSlider.id = 'slider';
  rangeSlider.min = '1';
  rangeSlider.max = '64';
  rangeSlider.defaultValue = '50';
  rangeSlider.value = '50';

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
}

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
}

function drawGrid() {
  let userDrawing = false;

  document.addEventListener('mousedown', function() {
    userDrawing = true;
  });

  document.addEventListener('mouseup', function() {
    userDrawing = false;
  });

  let gridElements = document.querySelectorAll(".grid");
  gridElements.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      if (userDrawing == true) {
        item.style.backgroundColor = 'black';
      }
    });
    item.addEventListener('click', function(){
      if (userDrawing == false) {
        item.style.backgroundColor = 'black';
      }
    })
  });
}
createGrid(16);
getNumGrid();
