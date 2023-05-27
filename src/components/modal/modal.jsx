import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, alt, closeModal }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackDropClick}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
