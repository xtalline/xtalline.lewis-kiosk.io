import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import "../assets/styles/logid.css";

const LogID = () => {
  const navigate = useNavigate();
  const navigateToLog = () => {
    navigate("/kiosk-log");
  };

  const [input, setInput] = useState("");
  const [isCapsEnabled, setIsCapsEnabled] = useState(false);
  const [isShiftEnabled, setIsShiftEnabled] = useState(false);

  const onChange = (input) => {
    if (isCapsEnabled | isShiftEnabled) {
      setInput(input.toUpperCase());
    } else {
      setInput(input);
    }
  };

  const onKeyPress = (button) => {
    if (button === "{enter}") {
      console.log("Enter key pressed");
      navigateToLog();
    } else if (button === "{capslock}") {
      setIsCapsEnabled(!isCapsEnabled);
    }
    else if (button === "{shift}") {
      setIsShiftEnabled(!isShiftEnabled);
    }
    else if (button === "{backspace}") {
      setInput(input.slice(0, -1));
    }
    else {
      setInput(input + (isShiftEnabled ? button.toUpperCase() : button));
    }
  }

  const getLayout = () => {
    if (isCapsEnabled) {
      return {
        default: [
          "1 2 3 4 5 6 7 8 9 0 {backspace}",
          "Q W E R T Y U I O P - / *",
          "A S D F G H J K L {enter}",
          "{shift} Z X C V B N M . {shift}",
          "{capslock} {space} {capslock}",
        ],
        shift: [
          "1 2 3 4 5 6 7 8 9 0 {backspace}",
          "q w e r t y u i o p - / *",
          "a s d f g h j k l {enter}",
          "{shift} z x c v b n m . {shift}",
          "{capslock} {space} {capslock}",
        ],
      };
    } else {
      return {
        default: [
          "1 2 3 4 5 6 7 8 9 0 {backspace}",
          "q w e r t y u i o p - / *",
          "a s d f g h j k l {enter}",
          "{shift} z x c v b n m . {shift}",
          "{capslock} {space} {capslock}",
        ],
        shift: [
          "1 2 3 4 5 6 7 8 9 0 {backspace}",
          "Q W E R T Y U I O P - / *",
          "A S D F G H J K L {enter}",
          "{shift} Z X C V B N M . {shift}",
          "{capslock} {space} {capslock}",
        ],
      };
    }
  };

  const keyboardOptions = {
    layout: getLayout(),
    theme: "hg-theme-default hg-layout-numeric numeric-theme",
    buttonTheme: [
      {
        class: "hg-red",
        buttons: "{enter}",
      },
    ],
    inputName: "input",
    onChange: onChange,
    onKeyPress: onKeyPress,
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "CapsLock" || event.key === "Shift") {
        setIsCapsEnabled(!isCapsEnabled);
      }
      else {
        setInput((prevInput) => prevInput + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCapsEnabled]);

  return (
    <div className="log-id-wrapper">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="input"
        inputmode="none"
      />
      <div className="keyboard-container">
        <Keyboard {...keyboardOptions} />
      </div>
    </div>
  );
};

export default LogID;