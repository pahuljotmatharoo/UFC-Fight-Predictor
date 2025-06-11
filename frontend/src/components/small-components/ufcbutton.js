// UfcButton.jsx
import React from 'react';
import './ufcbutton.css';

export default function UfcButton({children, click}) {
  return (
    <button className="ufc-button" onClick={click}>
      {children}
    </button>
  );
}
