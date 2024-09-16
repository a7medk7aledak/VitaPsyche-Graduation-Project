import { FC, ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  position?: "centered" | "left";
  variant: "primary" | "secondary";
}

const Heading: FC<HeadingProps> = ({
  children,
  variant,
  position = "centered",
}) => {
  return (
    <h1
      className={`capitalize text-3xl sm:text-4xl lg:text-5xl w-fit ${
        position === "centered" ? "mx-auto " : ""
      }mb-24
            font-normal ${
              variant === "primary" ? "text-heading" : "text-subheading"
            }`}
    >
      {children}
    </h1>
  );
};

export default Heading;
