import { FC, ChangeEvent } from "react";

export interface SelectProps {
  options: {
    label: string;
    value: number | string | boolean;
  }[];
  name: string;
  value?: string | number | readonly string[] | undefined;
  label?: string;
  error?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({
  options,
  name,
  value,
  label,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-md text-black">
          {label}
        </label>
      )}
      <select
        className="rounded-lg bg-white border border-black px-4 py-[10px] text-black"
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        {options?.map((option, i) => (
          <option
            key={i}
            className="bg-white text-black"
            value={`${option.value}`}
          >
            {option?.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default Select;
