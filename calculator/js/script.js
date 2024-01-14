// 1. Add keyboard listeners for operator and digit
// 2. Make the decimal work
// 3. Fix the negative first then positive number sum
// 4. Add clear button inside the All Clear or Clear? Add incrementation if the value is one just clear, If the value of the variable is 2 fully clear. If there is a number change value of button into C, if there isn't default to AC. Add a reset on all clear and equal.
// 5. Add a script for changing the sign
// 5. Add a hover when it comes to operators
// 6. Add more realism on the phone container power button etc.


let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("second-display");

let currentValue = "";
let previousValue = "";

let operator = "";
let result = 0;

let isOperatorActive = false;
let removeHover;

function appendNumber(number) {
  if (isOperatorActive) {
    if (previousValue === "0" || previousValue === "") {
      if (result === 0) {
        previousValue = currentValue;
      } else if (result > 0) {
        previousValue = result;
      }
    }
    currentValue = String(number);
    isOperatorActive = false;

    updateDisplay();
    resetOperatorHover()
  } else {
    currentValue += String(number);

    updateDisplay();
    resetOperatorHover()
  }

  calculate(parseFloat(previousValue), parseFloat(currentValue));
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}

function setOperator(op) {
  isOperatorActive = true;
  removeHover = false;
  operator = op;

  setupHoverButton(operator);
}

function updateDisplay() {
  primaryDisplay.textContent = currentValue;

  if(operator === "*"){
    secondaryDisplay.textContent = `${previousValue} × `;
  } else if(operator === "/"){
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

  removeHover = true;
  setupHoverButton();
}

function calculate(numOne, numTwo) {

  switch (operator) {
    case "+":
      result = numOne + numTwo;
      break;

    case "-":
      result = numOne - numTwo;
      break;

    case "*":
      result = numOne * numTwo;
      break;

    case "/":
      if (numTwo !== 0) {
        result = numOne / numTwo;
      } else {
        result = "Error!";
      }
      break;
  }

  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}

function printResult() {
  if(operator === "+" || operator === "-" || operator === "*" || operator === "/" ){
    primaryDisplay.textContent = result;
    secondaryDisplay.textContent += `${currentValue}`;
    previousValue = result;
    currentValue = "";
    removeHover = true;
    setupHoverButton();
  } else {
    primaryDisplay.textContent = result;
  }
  
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}

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

function initialize(){
  setupHoverButton();
}