import React, { useState, useEffect } from 'react';
import { default as ReactModal } from 'react-modal';
import '../styles/modal.css';

ReactModal.setAppElement('#modal');

export default function Modal({ data }) {
  const [isOpen, setIsOpen] = useState(true);

  const afterOpenModal = () => {
    setTimeout(closeModal, 1500);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (data) {
      setIsOpen(true);
    }
  }, [data]);

  return (
    data && (
      <ReactModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
      >
        {data.message}
      </ReactModal>
    )
  );
}
