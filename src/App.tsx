import { SetStateAction, useState } from "react";
import "./App.css";

// main app
function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitForSecondOperand, setWaitForSecondOperand] = useState(false);

  // update display in screen
  function updateDisplay(): void {
    const el: any = document.querySelector(".screen");
    el.value = displayValue;
  }

  // calculate logic
  function calculate(first: number, second: number, op: string): number {
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
  function handleOperator(nextOperator: SetStateAction<null>) {
    const inputValue: any = parseFloat(displayValue);

    if (operator && waitForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result: number = calculate(
        firstOperand as unknown as number,
        inputValue,
        operator
      );

      setDisplayValue(`${parseFloat(result.toFixed(9))}`);
      setFirstOperand(result as unknown as SetStateAction<null>);
    }

    setOperator(nextOperator);
    setWaitForSecondOperand(true);
  }

  // handles decimal
  function inputDecimal(decimal: string): void {
    if (waitForSecondOperand) {
      setDisplayValue("0.");
      setWaitForSecondOperand(false);
    }

    if (!displayValue.includes(decimal)) {
      setDisplayValue(decimal);
    }
  }

  // reset display
  function resetCalculator(): void {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitForSecondOperand(false);
  }

  // handles user input
  function inputDigit(digit: SetStateAction<string>): void {
    if (waitForSecondOperand) {
      setDisplayValue(digit);
      setWaitForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  }

  // event handler for buttons
  function handleClick(event: { target: any }): void {
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
      <div className="keys" onClick={handleClick}>
        <button className="operator" value="+">
          +
        </button>
        <button className="operator" value="-">
          &minus;
        </button>
        <button className="operator" value="*">
          &#215;
        </button>
        <button className="operator" value="/">
          &#247;
        </button>

        <button value="7">7</button>
        <button value="8">8</button>
        <button value="9">9</button>

        <button value="4">4</button>
        <button value="5">5</button>
        <button value="6">6</button>

        <button value="1">1</button>
        <button value="2">2</button>
        <button value="3">3</button>

        <button value="0">0</button>
        <button className="decimal" value=".">
          .
        </button>
        <button className="all-clear" value="all-clear">
          &#128163;
        </button>
        <button className="equal-sign operator" value="=">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
