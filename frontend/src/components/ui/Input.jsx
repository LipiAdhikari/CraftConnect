import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', id, error, className = '', ...props }, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-craft-900 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`appearance-none block w-full px-3 py-2 border border-craft-800 rounded-md shadow-sm placeholder-craft-100 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
