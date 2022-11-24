import { useState } from "react";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitForSecondOperand, setWaitForSecondOperand] = useState(false);

  function updateDisplay() {
    const el = document.querySelector(".screen");
    el.value = displayValue;
  }

  // calculate logic
  function calculate(first, second, op) {
    switch (op) {
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
    const inputValue = parseFloat(displayValue);

    if (operator && waitForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result).toFixed(9)}`);
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setWaitForSecondOperand(true);
  }

  // handles decimal
  function inputDecimal(decimal) {
    if (waitForSecondOperand) {
      setDisplayValue("0.");
      setWaitForSecondOperand(false);
    }

    if (!displayValue.includes(decimal)) {
      setDisplayValue(decimal);
    }
  }

  // reset display
  function resetCalculator() {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitForSecondOperand(false);
  }

  // handles user input
  function inputDigit(digit) {
    if (waitForSecondOperand) {
      setDisplayValue(digit);
      setWaitForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  }

  // event handler for buttons
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
        <input type="text" className="screen" disabled value={displayValue} />
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
