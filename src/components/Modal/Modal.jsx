import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modale } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ closeFn, largeImageURL, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeFn();
    }
  };
  const handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      closeFn();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrope}>
      <Modale>
        <img src={largeImageURL} alt={alt} />
      </Modale>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  closeFn: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
