
let primaryDisplay = document.getElementById("primary-display");
let currentValue = '';
let previousValue = '';

let numberOne = 0;
let numberTwo = 0;

let operator = '';
let result = '';
let isOperatorActive = false;


function appendNumber(number) {
  if (isOperatorActive) {
    previousValue = currentValue;
    currentValue = String(number);
    numberTwo = parseFloat(currentValue);
    isOperatorActive = false;
    updateDisplay(currentValue);
  } else {
    currentValue += String(number);
    numberOne = parseFloat(currentValue);
    updateDisplay(currentValue);
  }

  calculate(numberOne, numberTwo);
}

function setOperator(op){
  isOperatorActive = true;
  operator = op;
}

function updateDisplay(val){
  primaryDisplay.textContent = val;
}

function clearDisplay() {
  primaryDisplay.textContent = "0";
  operator = '';
  currentValue = '';
  previousValue = '';
  numberOne = 0;
  numberTwo = 0;
  result = 0;
}

function calculate(numOne, numTwo){

  switch(operator){
    case '+':
      result = numOne + numTwo;
      break;

    case '-':
      result = numOne - numTwo;
      break;
    
    case '*':
      result = numOne * numTwo;
      break;
    
    case '/':
      if(numTwo !== 0){
        result = numOne / numTwo;
      } else {
        result = 'Syntax Error!';
      }
      break;
    }

    console.log("==============================")
    console.log("Number One: " + numberOne);
    console.log("Number Two: " + numberTwo);
    console.log("------------------------------")
    console.log("currentValue: " + currentValue);
    console.log("previousValue: " + previousValue);
    console.log("==============================")
}

function printResult(){
  primaryDisplay.textContent = result;

}


