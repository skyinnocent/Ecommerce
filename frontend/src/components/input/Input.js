import React from "react";
import "./Input.css";

function Input(i) {
  return (
    <div className="input">
      <label>{i}</label>
      <input
        type={i}
        name={i}
        // value={value}
        placeholder={`enter you ${i}`}
      ></input>
    </div>
  );
}

export default Input;
