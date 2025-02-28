import React from 'react';
import '../styles/Button.css';

const Button = ({ children, type = 'primary', onClick }) => {
  return (
    <button
      className={`button button-${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
