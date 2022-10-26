import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Image, Item } from './ImageGalleryItem.style';

export function ImageGalleryItem({ smallURL, alt, largeURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Item>
      <Image src={smallURL} alt={alt} width="200" onClick={setIsModalOpen} />
      {isModalOpen && (
        <Modal closeFn={setIsModalOpen} largeImageURL={largeURL} alt={alt} />
      )}
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  smallURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
};
