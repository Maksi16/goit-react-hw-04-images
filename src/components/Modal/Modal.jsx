import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modale } from './Modal.style';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeFn();
    }
  };
  handleBackdrope = e => {
    if (e.currentTarget === e.target) {
      this.props.closeFn();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdrope}>
        <Modale>
          <img src={largeImageURL} alt={alt} />
        </Modale>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeFn: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
