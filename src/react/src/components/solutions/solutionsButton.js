import React from "react";
import "./solutionsButton.css";


const STYLES = ["solutions--btn--primary", "solutions--btn--secondary"];

export const SolutionsButton = ({ children, type, onClick, buttonStyle }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  return (
    <button
      className={`solutions--btn ${checkButtonStyle}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
