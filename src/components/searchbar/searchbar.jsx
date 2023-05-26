import { useState } from 'react';
import { ReactComponent as Icon } from '../../icons/findIcon.svg';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleInputChange = event => {
    setImageName(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      return;
    }
    onSubmit({ imageName });
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchForm_button} type="submit">
          <Icon />
        </button>

        <input
          className={css.searchForm_input}
          name="imageName"
          onChange={handleInputChange}
          value={imageName}
          type="text"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
