import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

const Input = ({
  type,
  placeholder,
  id,
  name,
  value,
  change,
}: {
  type: HTMLInputTypeAttribute | undefined;
  placeholder: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  value: string | number;
  change: ChangeEventHandler;
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={change}
      className="px-4 py-3 mb-5 rounded-xl bg-backgroundColor border-colorDark border focus:outline-none border-2 w-[200px] text-right text-colorDark md:w-full placeholder:font-bold"
    />
  );
};

export default Input;
