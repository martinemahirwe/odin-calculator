let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const lastScreenOperation = document.querySelector('.lastScreenOperation');
const currentScreenOperation = document.querySelector('.currentScreenOperation');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.equalsBtn');
const pointButton = document.querySelector('.pointBtn');
const deleteButton = document.querySelector('.deleteBtn');
const clearButton = document.querySelector('.clearBtn');

equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteNumber);
clearButton.addEventListener('click', clear);
pointButton.addEventListener('click',appendPoint);
window.addEventListener('click', handleKeyboardInput)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  }
  );
});
function appendNumber(number){
  if(currentScreenOperation.textContent === '0' || shouldResetScreen){
    resetScreen();
  }
  currentScreenOperation.textContent += number;
}
function resetScreen(){
  currentScreenOperation.textContent = '';
  shouldResetScreen = false;
}
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setOperation(button.textContent);
  })
});
function setOperation(operator){
  if(currentOperation !== null){
    evaluate();
  }
  firstOperand = currentScreenOperation.textContent;
  currentOperation = operator;
  lastScreenOperation.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}
function evaluate(){
  if(currentOperation === null || shouldResetScreen){
    return;
  }
  else if(currentOperation === '/' && currentScreenOperation.textContent === '0'){
    alert('you can not divide by zero!');
    return;
  }
secondOperand = currentScreenOperation.textContent;
currentScreenOperation.textContent = roundResult(operate(currentOperation, firstOperand,secondOperand));
lastScreenOperation.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
currentOperation = null;
}
function roundResult(number){
  return Math.round(number * 1000) / 1000;
}
function clear(){
  currentScreenOperation.textContent = '0';
  lastScreenOperation.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}
function deleteNumber(){
  currentScreenOperation.textContent = currentScreenOperation.textContent
  .toString()
  .slice(0, -1);
}
function appendPoint(){
  if(shouldResetScreen){
    resetScreen();
  }
  else if(currentScreenOperation.textContent === ''){
    currentScreenOperation.textContent = '0';
  }
  else if(currentScreenOperation.textContent.includes('.')){
    return;
  }
  currentScreenOperation.textContent += '.';
}
function handleKeyboardInput(e){
  if(e.key >= 0 && e.key <= 9){
    appendNumber(e.key);
  }
  if(e.key >= 0 && e.key <= 9){
    appendPoint();
  }
  if(e.key === '=' && e.key === 'Enter'){
    evaluate();
  }
  if(e.key === 'Backspace'){
    deleteNumber();
  }
  if(e.key === 'Escape'){
    clear();
  }
  if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
    setOperation(e.key);
  }
  }
function add(a, b){
  return a + b;
  }
  function subtract(a, b){
  return a - b;
  }
  function multiply(a, b){
  return a * b;
  }
  function divide(a, b){
  return a / b;
  }
  
  function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
      case '+':
        return add(a, b);
        case '-':
        return subtract(a, b);
        case '*':
        return multiply(a, b);
        case '/':
        return divide(a, b);
        default:
          return null;
    }
  }