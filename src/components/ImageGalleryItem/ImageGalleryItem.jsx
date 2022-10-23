import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { Image, Item } from './ImageGalleryItem.style';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { smallURL, alt, largeURL } = this.props;
    return (
      <Item>
        <Image
          src={smallURL}
          alt={alt}
          width="200"
          onClick={this.toggleModal}
        />
        {isModalOpen && (
          <Modal
            closeFn={this.toggleModal}
            largeImageURL={largeURL}
            alt={alt}
          />
        )}
      </Item>
    );
  }
}
ImageGalleryItem.propTypes = {
  smallURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
};
