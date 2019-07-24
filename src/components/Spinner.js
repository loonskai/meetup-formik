import React from 'react';
import '../styles/spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div class="fulfilling-square-spinner">
        <div class="spinner-inner" />
      </div>
    </div>
  );
}
