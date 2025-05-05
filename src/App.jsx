import ReactDOM from 'react-dom/client'; 
import { useState} from "react"; 
import './App.css'


function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = /[+\-*/]/;

  const handleClear = () => {
    setInput("");
    setOutput("0");
    setEvaluated(false);
  };

  const handleNumber = (val) => {
    if (evaluated) {
      setInput(val);
      setOutput(val);
      setEvaluated(false);
    } else {
      // prevent multiple leading zeros
      if (/^0$/.test(output) && val === "0") return;
      const newInput =
        output === "0" && val !== "." ? val : input + val;
      setInput(newInput);
      setOutput(newInput.match(/([\d.]+)$/)?.[0] || val);
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setInput("0.");
      setOutput("0.");
      setEvaluated(false);
      return;
    }
    const lastNumber = input.match(/(\d+\.?\d*)$/);
    if (!lastNumber || !lastNumber[0].includes(".")) {
      const newInput = input + ".";
      setInput(newInput);
      setOutput(newInput.match(/(\d+\.?\d*)$/)[0]);
    }
  };

  const handleOperator = (val) => {
    if (evaluated) {
      setInput(output + val);
      setEvaluated(false);
      return;
    }
    if (input === "" && val === "-") {
      setInput("-");
      return;
    }
    // Replace last operator unless it's a minus after an operator
    if (/[-+*/]$/.test(input)) {
      if (val === "-" && !/[-+*/]-$/.test(input)) {
        setInput(input + val);
      } else {
        setInput(input.replace(/[-+*/]+$/, val));
      }
    } else {
      setInput(input + val);
    }
  };

  const handleEquals = () => {
    let expression = input.replace(/[-+*/]+$/, "");
    try {
      const result = eval(expression);
      setOutput(result.toFixed(10).replace(/\.0+$|(?<=\..+?)0+$/, ""));
      setInput(expression + "=" + result);
      setEvaluated(true);
    } catch (err) {
      setOutput("Error");
      setEvaluated(true);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{output}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleOperator("/")}>/</button>
        <button id="multiply" onClick={() => handleOperator("*")}>*</button>

        <button id="seven" onClick={() => handleNumber("7")}>7</button>
        <button id="eight" onClick={() => handleNumber("8")}>8</button>
        <button id="nine" onClick={() => handleNumber("9")}>9</button>
        <button id="subtract" onClick={() => handleOperator("-")}>-</button>

        <button id="four" onClick={() => handleNumber("4")}>4</button>
        <button id="five" onClick={() => handleNumber("5")}>5</button>
        <button id="six" onClick={() => handleNumber("6")}>6</button>
        <button id="add" onClick={() => handleOperator("+")}>+</button>

        <button id="one" onClick={() => handleNumber("1")}>1</button>
        <button id="two" onClick={() => handleNumber("2")}>2</button>
        <button id="three" onClick={() => handleNumber("3")}>3</button>

        <button id="zero" className="zero" onClick={() => handleNumber("0")}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
}
export default App;