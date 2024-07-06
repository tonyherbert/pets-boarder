import React from "react";
import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  onClick,
  icon,
  iconPosition = "right",
}: ButtonProps) => {
  return (
    <button className={`dark-mode-button ${iconPosition}`} onClick={onClick}>
      {iconPosition === "left" && icon && <span className="icon">{icon}</span>}
      <span className="text">{children}</span>
      {iconPosition === "right" && icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
