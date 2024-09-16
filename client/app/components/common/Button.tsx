import { FC, ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  size: "small" | "medium" | "large";
  roundedValue: "md" | "full";
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  roundedValue,
  size,
  children,
}) => {
  return (
    <button
      className={` btn shadow-md hover:shadow-lg ${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      }
          ${roundedValue === "full" ? "rounded-full" : "rounded-md"}
        ${
          size === "small"
            ? "btn-small"
            : size === "medium"
            ? "btn-medium"
            : "btn-large"
        }
      `}
    >
      {children}
    </button>
  );
};

export default Button;
