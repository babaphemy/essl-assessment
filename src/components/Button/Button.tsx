import { FC, ReactElement } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  text: string | ReactElement;
  variant?: "primary" | "danger" | "warning";
  otherClassNames?: string;
  onClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  disabled?: boolean;
  id?: string;
}

const ButtonVariant = {
  primary: "border-off-dark text-white bg-off-dark",
  warning: "border-yellow-500 text-white bg-yellow-500",
  danger: "border-red-500 text-white bg-red-500",
};

const Button: FC<ButtonProps> = ({
  type,
  onClick,
  text,
  variant = "primary",
  isLoading,
  loadingText = "Loading...",
  otherClassNames = "",
  leftIcon,
  rightIcon,
  disabled,
  id,
}) => {
  return (
    <>
      <button
        type={type}
        className={`flex items-center justify-center gap-1 w-full py-[12.5px] rounded-lg  border font-bold ${ButtonVariant[variant]} ${otherClassNames}`}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {leftIcon && <>{leftIcon}</>} {isLoading ? loadingText : text}{" "}
        {rightIcon && <>{rightIcon}</>}
      </button>
    </>
  );
};

export default Button;
