let primaryDisplay = document.getElementById("primary-display");

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
    updateDisplay(currentValue);
  } else {
    currentValue += String(number);
    updateDisplay(currentValue);
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

function updateDisplay(val) {
  primaryDisplay.textContent = val;
}

function clearDisplay() {
  primaryDisplay.textContent = "0";
  operator = "";
  currentValue = "";
  previousValue = "";
  numberOne = 0;
  numberTwo = 0;
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
        result = "Syntax Error!";
      }
      break;
  }

  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}

function printResult() {
  primaryDisplay.textContent = result;
  previousValue = result;
  currentValue = "";
  console.log("===================");
  console.log("currentValue: " + currentValue);
  console.log("previousValue: " + previousValue);
  console.log("===================");
}
