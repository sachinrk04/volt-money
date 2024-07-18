import React from "react";
import "./Button.scss";

export default function Button({
  children,
  type,
  className = "",
  onClick,
  disabled = false,
}) {
  const click = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };
  return (
    <button
      className={`button ${className.length ? className : "deault-button"} ${
        disabled ? "disabled-button" : ""
      }`}
      disabled={disabled}
      type={type}
      onClick={click}
    >
      {children}
    </button>
  );
}
