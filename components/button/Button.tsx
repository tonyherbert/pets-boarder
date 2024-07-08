import React from "react";
import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

const Button = ({
  children,
  onClick,
  icon,
  iconPosition = "right",
  className,
}: ButtonProps) => {
  return (
    <button
      className={`dark-mode-button ${iconPosition} ${className}`}
      onClick={onClick}
    >
      {iconPosition === "left" && icon && <span className="icon">{icon}</span>}
      <span className="text">{children}</span>
      {iconPosition === "right" && icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
