import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-2.5 border text-sm font-semibold rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-white bg-accent hover:bg-accent-hover hover:shadow-md focus:ring-accent",
    secondary: "border-transparent text-craft-900 bg-craft-100 hover:bg-craft-200 hover:shadow-md focus:ring-craft-800",
    outline: "border-craft-800 text-craft-900 bg-transparent hover:bg-craft-50 hover:shadow-sm focus:ring-craft-800",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 hover:shadow-md focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
