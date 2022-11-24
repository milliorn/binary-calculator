import { useState } from "react";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);

  const calculator = {
    operator: null,
    waitForSecondOperand: false,
  };

  function updateDisplay() {
    const el = document.querySelector(".screen");
    el.value = displayValue;
  }

  // calculate logic
  function calculate(first, second, operator) {
    switch (operator) {
      case "*":
        return first * second;
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "/":
        return first / second;
      default:
        return second;
    }
  }

  // handle operators
  function handleOperator(nextOperator) {
    const { operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setFirstOperand(result);
    }

    calculator.operator = nextOperator;
    calculator.waitForSecondOperand = true;
  }

  // handles decimal
  function inputDecimal(decimal) {
    if (calculator.waitForSecondOperand) {
      setDisplayValue("0.");
      calculator.waitForSecondOperand = false;
    }

    if (!calculator.displayValue.includes(decimal)) {
      setDisplayValue(decimal);
    }
  }

  // reset display
  function resetCalculator() {
    setDisplayValue("0");
    setFirstOperand(null);
    calculator.operator = null;
    calculator.waitForSecondOperand = false;
  }

  // handles user input
  function inputDigit(digit) {
    const { waitForSecondOperand } = calculator;

    if (waitForSecondOperand) {
      setDisplayValue(digit);
      calculator.waitForSecondOperand = false;
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  }

  function handleClick(event) {
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
  }

  return (
    <div className="container">
      <label>
        <input type="text" className="screen" disabled />
      </label>
      <div className="keys">
        <button className="operator" value="+" onClick={handleClick}>
          +
        </button>
        <button className="operator" value="-" onClick={handleClick}>
          &minus;
        </button>
        <button className="operator" value="*" onClick={handleClick}>
          &#215;
        </button>
        <button className="operator" value="/" onClick={handleClick}>
          &#247;
        </button>

        <button value="7" onClick={handleClick}>
          7
        </button>
        <button value="8" onClick={handleClick}>
          8
        </button>
        <button value="9" onClick={handleClick}>
          9
        </button>

        <button value="4" onClick={handleClick}>
          4
        </button>
        <button value="5" onClick={handleClick}>
          5
        </button>
        <button value="6" onClick={handleClick}>
          6
        </button>

        <button value="1" onClick={handleClick}>
          1
        </button>
        <button value="2" onClick={handleClick}>
          2
        </button>
        <button value="3" onClick={handleClick}>
          3
        </button>

        <button value="0" onClick={handleClick}>
          0
        </button>
        <button className="decimal" value="." onClick={handleClick}>
          .
        </button>
        <button className="all-clear" value="all-clear" onClick={handleClick}>
          &#128163;
        </button>
        <button className="equal-sign operator" value="=" onClick={handleClick}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
