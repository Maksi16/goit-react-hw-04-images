import React, { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Header, SearchForm, SearchInput } from './Searchbar.style';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchImg: '',
  };
  handleNameChenge = e => {
    this.setState({ searchImg: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchImg.trim() === '') {
      toast.info('Please, write the correct query!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    this.props.onSubmit(this.state.searchImg);
    //this.setState({ searchImg: '' });
    //e.target.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <AiOutlineSearch type="submit">
            <span class="button-label">Search</span>
          </AiOutlineSearch>

          <SearchInput
            value={this.state.searchImg}
            onChange={this.handleNameChenge}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
