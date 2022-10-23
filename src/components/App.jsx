import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyled } from './APP.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import * as API from './API';

export class App extends Component {
  state = {
    images: [],
    searchImg: '',
    page: 1,
    hitsPerPage: 12,
    isLoading: false,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchImg } = this.state;

    const prevImg = prevState.searchImg;
    const prevPage = prevState.page;

    if (prevPage !== page || prevImg !== searchImg) {
      this.getImage(searchImg, page);
    }
  }

  getImage = async (searchImg, pageAPI) => {
    const { hitsPerPage } = this.state;
    this.setState({ isLoading: true });

    try {
      const images = await API.addImages(searchImg, pageAPI, hitsPerPage);

      if (images.hits.length === 0) {
        toast.error(
          `Sorry, there are no images matching your search: ${searchImg}. Please try again.`
        );
        return;
      }
      this.setState(state => ({
        images: [...state.images, ...images.hits],
        totalHits: images.totalHits,
      }));
      toast.info(`Hooray! We found ${images.totalHits} images.`);
      //console.log(images);
    } catch (error) {
      toast.error(`Sorry, something went wrong. Please try again.`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  hendleFormSubmit = searchImg => {
    if (this.state.searchImg !== searchImg) {
      this.setState({ searchImg, images: [], page: 1 });
    }
  };
  handleLoadMoreBtn = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { images, isLoading, totalHits } = this.state;
    return (
      <AppStyled>
        <Searchbar
          onSubmit={this.hendleFormSubmit}
          isSubmitting={isLoading}
        ></Searchbar>

        {<ToastContainer autoClose={2000} />}

        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} />}

        {!isLoading && images.length > 0 && images.length < totalHits && (
          <Button onClick={this.handleLoadMoreBtn} />
        )}
      </AppStyled>
    );
  }
}
