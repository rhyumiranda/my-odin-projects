//Create a canvas that is made out of grid
//Have a slider where users are able to slide and choose number of grids
//Users are able to draw on hovering the canvas
//Users can erase their drawing using eraser tool
//Users can reset the canvas

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
  gridElements.forEach(function(element) {
    element.style.height = (650 / x) + 'px';
  });
  gridElements.forEach(function(element) {
    element.style.width = (650 / x) + 'px';
  });
};

function refreshGrid(){
  let newGrid = prompt("How many boxes of grid would you like to add?");
  createGrid(newGrid);
}

createGrid(20);