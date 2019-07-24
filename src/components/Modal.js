import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../styles/modal.css';

export default function Modal({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (data) {
      setIsOpen(true);
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 1500);
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div className="overlay">
        <div className="modal">{data.message}</div>
      </div>
    )
  );
}
