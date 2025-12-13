import type React from "react"

interface ButtonProps {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  variant?: "primary" | "danger" | "secondary",
  type?: "button" | "submit" | "reset" | undefined
}


export const Button = ({ children, onClick, disabled = false, variant = "primary", type = "button" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`button button--${variant}`}
    >
      {children}
    </button>
  );
};




