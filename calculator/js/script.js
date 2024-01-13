let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("second-display");

let currentValue = "";
let previousValue = "";

let operator = "";
let result = "";

let isOperatorActive = false;

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
  } else {
    currentValue += String(number);
    updateDisplay();
  }

  calculate(parseFloat(previousValue), parseFloat(currentValue));
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}

function setOperator(op) {
  isOperatorActive = true;
  operator = op;
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
  } else {
    primaryDisplay.textContent = result;
  }
  
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}
