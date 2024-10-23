import React from 'react';

function Input({ className, ...props }) {
  return (
    <input 
      className={`${className}`} 
      {...props} 
    />
  );
}

export default Input;
