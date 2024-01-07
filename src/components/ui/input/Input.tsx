import { UseFormRegister, FieldValues } from "react-hook-form";
import { ChangeEventHandler } from "react";
import "./Input.scss";

interface IInput {
  type?: string;
  placeholder?: string;
  name: string;
  width?: number;
  register: UseFormRegister<FieldValues>;

  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  type,
  placeholder,
  name,
  width,
  register,
  onChange,
}: IInput) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      autoComplete="off"
      {...register(name, {
        onChange,
      })}
      className={"input"}
      style={{ width: `${width}px` }}
    />
  );
};

export default Input;
