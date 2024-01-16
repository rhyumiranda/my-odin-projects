// 1. Add keyboard listeners for operator and digit
// 2. Fix the negative first then positive number sum
// 3. Add clear button inside the All Clear or Clear? Add incrementation if the value is one just clear, If the value of the variable is 2 fully clear. If there is a number change value of button into C, if there isn't default to AC. Add a reset on all clear and equal.
// 4. Add a script for changing the sign
// 5. Add more realism on the phone container power button etc.


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
  if (operator === "+" || operator === "-" || operator === "*" || operator === "/") {
    primaryDisplay.textContent = currentResult;
    secondaryDisplay.textContent += `${currentValue}`;
    isNewOperation = true; // Set isNewOperation to true after completing an operation
    currentValue = "";
    operationCount = 0;
    resetOperatorHover();
  } else {
    primaryDisplay.textContent = currentValue;
    operationCount = 0;
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
  console.log("result: " + result);
  console.log("===================");
}