//LAST
//RP
let primaryDisplay = document.getElementById("primary-display");
let secondaryDisplay = document.getElementById("second-display");
let clearBtn = document.getElementById("clear-button");
let decimalBtn = document.getElementById("decimal-button");
let currentTimeElement = document.getElementById("time");
let currentValue = 0;
let previousValue = "";
let operator = "";
let isOperatorActive = false;
let operationCount = 0;
let removeHover;
let shouldAddDecimal = false;
let isNewOperation = true;
let currentResult = 0;

function appendNumber(number) {
  if (isOperatorActive) {
    if (isNewOperation) {
      previousValue = parseFloat(currentValue);
      isNewOperation = false;
      operationCount = 0;
      logValues();
    }
    
    currentValue = String(number);
    isOperatorActive = false;
    clearBtn.textContent = 'C';
  } else {
    if(currentValue === 0){
      currentValue = "";
      currentValue += String(number);
    } else if(currentValue === '0.'){
      currentValue += String(number);
    }else{
      currentValue += String(number);
    }
  }

  updateDisplay();
  resetOperatorHover();
  logValues();
}

function enableDecimalBtn(){
  if (String(currentValue).includes('.')) {
    return;
  }
  if (currentValue === 0 || currentValue === '') {
    currentValue = '0.';
  } else {
    currentValue += '.';
  }

  primaryDisplay.textContent = currentValue;
}

function setOperator(op) {
  isOperatorActive = true;
  removeHover = false;

  if (!isNewOperation) {
    calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
    currentResult = parseFloat(primaryDisplay.textContent);
  }

  operator = op;
  previousValue = parseFloat(primaryDisplay.textContent) || parseFloat(currentValue);
  isNewOperation = false;

  operationCount++;
  setupHoverButton(operator);
  logValues();
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
  if(parseFloat(currentValue) > 0 || currentValue === '0.'){
    currentValue = "";
    primaryDisplay.textContent = currentValue;
    shouldAddDecimal = false;
  } else if(currentValue === 0 || currentValue === ''){
    clearBtn.textContent = 'AC';
    primaryDisplay.textContent = "0";
    secondaryDisplay.textContent = '';
    operator = "";
    currentValue = 0;
    previousValue = "";
    currentResult = 0;
    operationCount = 0;
    isNewOperation = true;
    isOperatorActive = false;
    shouldAddDecimal = false;
    resetOperatorHover();
  }
  logValues();
}

function calculate(numOne, numTwo, op) {
  switch (op) {
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

  if (operationCount > 0) {
    secondaryDisplay.textContent += `${currentValue}`;
    primaryDisplay.textContent = Math.ceil(currentResult * 100) / 100;
  }
}

function printResult() {
  if(operationCount > 0){
    calculate(parseFloat(previousValue), parseFloat(currentValue), operator);
    primaryDisplay.textContent = Math.ceil(currentResult * 100) / 100;
    isNewOperation = true;
    previousValue = currentResult;
    currentValue = "";
    operationCount = 0;
    isOperatorActive = false;
    shouldAddDecimal = false;
  }else {
    primaryDisplay.textContent = parseFloat(currentValue);
  }
  logValues();
}

function convertSign(){
  if (parseFloat(primaryDisplay.textContent) === parseFloat(currentValue)) {
    currentValue *= -1;
    primaryDisplay.textContent = currentValue;
    return currentValue;
  }

  if (
    parseFloat(primaryDisplay.textContent) === currentResult ||
    primaryDisplay.textContent === String(currentResult)
  ) {
    previousValue *= -1;
    currentResult *= -1;
    primaryDisplay.textContent = currentResult;
    return currentResult;
  }
}

function convertToPercent(){
  if (parseFloat(primaryDisplay.textContent) === parseFloat(currentValue)) {
    currentValue /= 100;
    primaryDisplay.textContent = currentValue;
    return currentValue;
  }

  if (
    parseFloat(primaryDisplay.textContent) === currentResult ||
    primaryDisplay.textContent === String(currentResult)
  ) {
    previousValue /= 100;
    currentResult /= 100;
    primaryDisplay.textContent = currentResult;
    return currentResult;
  }
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
  console.log("operator: " + operator);
  console.log("previousValue: " + previousValue);
  console.log("result: " + currentResult);
  console.log("===================");
}

function updateClock() {
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  minutes = minutes < 10 ? '0' + minutes : minutes;

  var timeString = hours + ':' + minutes + ampm;

  // Set the value of the clock to the content of the currentTime element
  currentTimeElement.textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update
updateClock();