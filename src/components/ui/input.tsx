import React from 'react';

interface MyInputProps {
  id?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  style?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

function HSInput({
  id,
  name,
  onBlur,
  value,
  style,
  type,
  onChange,
  placeholder,
  className, 
}: MyInputProps) {
  return (
    <input
      id={id}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      className={`${className} ${style} bg-grayLight text-black duration-100 outline-none justify-between flex items-center px-4 py-3 w-full rounded-md font-light mt-2 group-hover:border-grayDark border border-gray-400`}
    />
  );
}

export default HSInput;
