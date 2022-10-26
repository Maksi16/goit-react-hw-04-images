import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppStyled } from './APP.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import * as API from './API';

export function App() {
  const [images, setImages] = useState([]);
  const [searchImg, setSearchImg] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  const hendleFormSubmit = searchQvery => {
    if (searchImg !== searchQvery) {
      setSearchImg(searchQvery);
      setImages([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (searchImg === '') {
      return;
    }

    async function getImage() {
      setIsLoading(true);

      try {
        const fetchImages = await API.addImages(searchImg, page);

        if (fetchImages.hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search: ${searchImg}. Please try again.`
          );
          return;
        }
        setImages(prevState => [...prevState, ...fetchImages.hits]);
        setTotalHits(fetchImages.totalHits);
        toast.info(`Hooray! We found ${fetchImages.totalHits} images.`);
      } catch (error) {
        toast.error(`Sorry, something went wrong. Please try again.`);
      } finally {
        setIsLoading(false);
      }
    }
    getImage();
  }, [searchImg, page]);

  const handleLoadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <AppStyled>
      <Searchbar
        onSubmit={hendleFormSubmit}
        isSubmitting={isLoading}
      ></Searchbar>

      {<ToastContainer autoClose={2000} />}

      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}

      {!isLoading && images.length > 0 && images.length < totalHits && (
        <Button onClick={handleLoadMoreBtn} />
      )}
    </AppStyled>
  );
}
