import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.style';

export const Button = ({ onClick }) => {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      Load more
    </ButtonStyled>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
