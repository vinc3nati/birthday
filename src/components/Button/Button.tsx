import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  customStyle: string;
};

type ButtonType = React.FC<ButtonProps>;

export const Button: ButtonType = (props) => {
  return (
    <button
      className={twMerge(
        "rounded px-2.5 py-2 font-bold tracking-wide shadow bg-purple-500 uppercase select-none disabled:cursor-not-allowed",
        props.customStyle
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
