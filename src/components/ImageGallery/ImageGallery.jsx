import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.style';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallURL={webformatURL}
          alt={tags}
          largeURL={largeImageURL}
        />
      ))}
    </Gallery>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
