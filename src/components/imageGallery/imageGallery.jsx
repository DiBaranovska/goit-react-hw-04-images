import React from 'react';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';
import ImageItem from '../imageGalleryItem/imageGalleryItem';

const Images = ({ images }) => (
  <ul className={css.imageGallery}>
    {images.map(image => {
      return (
        <ImageItem
          key={image.id}
          id={image.id}
          webformatURL={image.webformatURL}
          tag={image.tags}
          largeImageURL={image.largeImageURL}
        />
      );
    })}
  </ul>
);

export default Images;

Images.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
