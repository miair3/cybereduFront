import React from 'react';

const Input = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="p-2 border rounded"
    />
  );
};

export default Input;