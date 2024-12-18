import { FC, ReactElement, ChangeEvent } from "react";

type InputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  error?: string;
};

const Input: FC<InputProps> = ({
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
  leftIcon,
  rightIcon,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-md text-black">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1 rounded-lg px-4 py-[10px] bg-white border border-black">
        {leftIcon && <>{leftIcon}</>}
        <input
          type={type}
          name={name}
          id={name}
          className="flex-1 outline-none bg-white text-black"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {rightIcon && <>{rightIcon}</>}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
