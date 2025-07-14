import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`border px-3 py-2 rounded w-full ${props.className || ''}`}
    />
  );
}

export default Input;