const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitForSecondOperand: false,
};

const updateDisplay = () =>
  (document.querySelector(".screen").value = calculator.displayValue);

updateDisplay();

// handle key press
const keys = document.querySelector(".keys");

keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  } else if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
  } else if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
  } else if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
  } else {
    inputDigit(target.value);
    updateDisplay();
  }
});

// handles user input
const inputDigit = (digit) => {
  const { displayValue, waitForSecondOperand } = calculator;

  if (waitForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

// handles decimal
const inputDecimal = (decimal) => {
  if (calculator.waitForSecondOperand) {
    calculator.displayValue = "0.";
    calculator.waitForSecondOperand = false;
  }

  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue = decimal;
  }
};

// handle operators
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.operator = nextOperator;
  calculator.waitForSecondOperand = true;
};

// calculate logic
const calculate = (firstOperand, secondOperand, operator) => {
  switch (operator) {
    case "*":
      return firstOperand * secondOperand;
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "/":
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
};

// reset display
const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitForSecondOperand = false;
};
