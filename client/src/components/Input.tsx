import React from 'react';

interface InputArgs {
  className?: string;
  id: string;
  label?: string;
  name?: string;
  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  onChange(e: React.FormEvent<HTMLInputElement>): void;
  placeholder?: string;
  value?: string | undefined;
}

const Input = ({
  id,
  label,
  name,
  onChange,
  placeholder,
  value,
}: InputArgs) => {
  return (
    <>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
