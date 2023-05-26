import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import css from './imageGalleryItem.module.css';

const ImageItem = ({ webformatURL, id, tag, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem_image}
        src={webformatURL}
        id={id}
        width="150px"
        alt={tag}
        onClick={toggleModal}
        loading="lazy"
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          alt={tag}
          closeModal={toggleModal}
        />
      )}
    </li>
  );
};

export default ImageItem;

ImageItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
