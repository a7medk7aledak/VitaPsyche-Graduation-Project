import { FC, ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  size: "small" | "medium" | "large" | "extraLarge";
  roundedValue: "md" | "full";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  roundedValue,
  size,
  children,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={` btn shadow-md hover:shadow-lg ${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      }
          ${roundedValue === "full" ? "rounded-full" : "rounded-md"}
        ${
          size === "small"
            ? "btn-small"
            : size === "medium"
            ? "btn-medium"
            : size === "large"
            ? "btn-large"
            : " btn-extraLarge"
        }
      `}
    >
      {children}
    </button>
  );
};

export default Button;
