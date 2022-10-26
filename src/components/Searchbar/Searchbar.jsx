import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, SearchForm, SearchInput } from './Searchbar.style';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [searchImg, setSearchImg] = useState('');

  const handleNameChenge = e => {
    setSearchImg(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchImg.trim() === '') {
      toast.info('Please, write the correct query!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    onSubmit(searchImg);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <AiOutlineSearch type="submit">
          <span class="button-label">Search</span>
        </AiOutlineSearch>

        <SearchInput
          value={searchImg}
          onChange={handleNameChenge}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
