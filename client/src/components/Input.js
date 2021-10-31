import React from 'react';

const Input = ({ id, label, onChange, placeholder, value }) => {
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
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
