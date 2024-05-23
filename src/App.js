import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./Hook/use-password-generator";
import PasswordStrengthIndicator from "./Component/StrengthChecker";

const App = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };
  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password text and copy button */}
      <div className="header">
        <div className="title">{password}</div>
        <button className="copyBtn" onClick={() => handleCopy()}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Character length */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          className="range"
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((element, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={element.state}
              />
              <label>{element.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} className='strength'/>

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate button  */}
      <button
        className="generate-btn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
};

export default App;
