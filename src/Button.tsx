import type React from "react"

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "secondary"
}


export const Button = ({ children, onClick, disabled = false, variant = "primary" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`button button--${variant}`}
    >
      {children}
    </button>
  );
};




