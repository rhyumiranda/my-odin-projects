let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("second-display");
let currentValue = "";
let previousValue = "";

let operator = "";
let result = 0;

let isOperatorActive = false;
let operationCount = 0;
let removeHover;

let isNewOperation = true;
let currentResult = 0; // Store the current result

function appendNumber(number) {
  if (isOperatorActive) {
    if (isNewOperation) {
      previousValue = parseFloat(currentValue); // Set previousValue based on currentResult
      isNewOperation = false;
    }

    currentValue = String(number);
    isOperatorActive = false;
  } else {
    currentValue += String(number);
  }

  updateDisplay();
  resetOperatorHover();
  logValues();
}

function setOperator(op) {
  isOperatorActive = true;
  removeHover = false;
  operator = op;

  if (!isNewOperation) {
    calculate(parseFloat(previousValue), parseFloat(currentValue)); // Calculate previous operation
    previousValue = currentResult; // Set previousValue based on the current result
  } else {
    previousValue = parseFloat(currentValue); // Set previousValue based on the current value if it's a new operation
    isNewOperation = false;
  }

  operationCount++;
  setupHoverButton(operator);
}


function updateDisplay() {
  primaryDisplay.textContent = currentValue;

  if (operator === "*") {
    secondaryDisplay.textContent = `${previousValue} × `;
  } else if (operator === "/") {
    secondaryDisplay.textContent = `${previousValue} ÷ `;
  } else {
    secondaryDisplay.textContent = `${previousValue} ${operator} `;
  }
}

function clearDisplay() {
  primaryDisplay.textContent = "0";
  secondaryDisplay.textContent = '';
  operator = "";
  currentValue = "";
  previousValue = "";
  operator = "";
  result = 0;
  operationCount = 0;

  isNewOperation = true;
  isOperatorActive = false;

  resetOperatorHover();
}

function calculate(numOne, numTwo) {
  switch (operator) {
    case "+":
      currentResult = numOne + numTwo;
      break;
    case "-":
      currentResult = numOne - numTwo;
      break;
    case "*":
      currentResult = numOne * numTwo;
      break;
    case "/":
      if (numTwo !== 0) {
        currentResult = numOne / numTwo;
      } else {
        currentResult = "Error!";
      }
      break;
  }

  if (operationCount > 1) {
    previousValue = currentResult;
  }
}

function printResult() {
  if (operationCount > 0) {
    calculate(parseFloat(previousValue), parseFloat(currentValue));
    primaryDisplay.textContent = currentResult;
    secondaryDisplay.textContent += `${currentValue}`;
    isNewOperation = true; // Set isNewOperation to true after completing an operation
    currentValue = "";
  } else {
    // If there was no operation, simply display the current value
    primaryDisplay.textContent = parseFloat(currentValue);
  }
  logValues();
}

//==================================================================================================================

function removeHoverEffect(buttons, classList){
  buttons.forEach((button) =>{
    button.classList.remove(classList);
  });
}

function setupHoverButton(btn){
  let additionBtn = document.getElementById('addition');
  let subtractionBtn = document.getElementById('subtraction');
  let multiplicationBtn = document.getElementById('multiplication');
  let divisionBtn = document.getElementById('division');

  if(btn === '+'){
    removeHoverEffect([subtractionBtn, multiplicationBtn, divisionBtn], "hovered");
    additionBtn.classList.add("hovered");
  } else if(btn === '-'){
    removeHoverEffect([additionBtn, multiplicationBtn, divisionBtn], "hovered");
    subtractionBtn.classList.add("hovered");
  } else if(btn === '*'){
    removeHoverEffect([additionBtn, subtractionBtn, divisionBtn], "hovered");
    multiplicationBtn.classList.add("hovered");
  } else if (btn === '/'){
    removeHoverEffect([additionBtn, subtractionBtn, multiplicationBtn], "hovered");
    divisionBtn.classList.add("hovered");
  }
  
  if (removeHover === true) {
    removeHoverEffect([additionBtn, subtractionBtn, multiplicationBtn, divisionBtn], "hovered");
  }
}

function resetOperatorHover(){
  removeHover = true;
  setupHoverButton();
}

function logValues(){
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("result: " + currentResult);
  console.log("===================");
}