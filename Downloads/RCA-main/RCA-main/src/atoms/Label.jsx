import React from 'react';

function Label({ className, children }) {
  return (
    <label className={`block text-gray-700 text-sm font-bold mb-2 ${className}`}>
      {children}
    </label>
  );
}

export default Label;
