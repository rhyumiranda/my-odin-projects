let digitButtons = document.querySelectorAll('.digit');
let operandButtons = document.querySelectorAll('.operand');
let primaryDisplay = document.getElementById('primary-display');
let secondaryDisplay = document.getElementById('secondary-display');

function userInput(){
  digitButtons.forEach(el => {
    el.addEventListener('click', () => {
      primaryDisplay.textContent += el.textContent;
    })
  });

  operandButtons.forEach(el => {
    el.addEventListener('click', () => {
      primaryDisplay.textContent += el.textContent;
    })
  });
}

function solve(a, b){

  

  const add = (a, b) =>{
    return a + b;
  }
  
  const subtract = (a, b) =>{
    return a - b;
  }
  
  const multiply = (a, b) =>{
    return a * b;
  }
  
  const divide = (a, b) =>{
    return a / b;
  }
}

function clearDisplay(){
  primaryDisplay.textContent = '';
  secondaryDisplay.textContent = '';
}

let clearBtn = document.getElementById('clear-button');

clearBtn.addEventListener('click', () => {
  clearDisplay();
});

userInput();