import { useState, useEffect } from 'react';
import Searchbar from './searchbar/searchbar';
import Loader from './loader/loader';
import Images from '../components/imageGallery/imageGallery';
import Button from '../components/button/button';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34925796-aa77653a24e3240cce9cedfc1';

const App = () => {
  const [nameImages, setNameImages] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmit = data => {
    if (data.imageName !== nameImages) {
      setPage(1);
      setImages([]);
    }
    const normalizedImageName = data.imageName.toLowerCase();
    setNameImages(normalizedImageName);
  };

  useEffect(() => {
    if (!nameImages) {
      return;
    }

    setLoading(true);
    fetch(
      `${BASE_URL}?key=${API_KEY}&orientation=horizontal&per_page=12&page=${page}&q=${nameImages}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`${nameImages} not found`));
      })
      .then(image => {
        setImages(state => {
          return [...state, ...image.hits];
        });
      })
      .catch(error => {
        setError(error);
      })
      .finally(setLoading(false));
  }, [nameImages, page]);

  const onLoadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 'center',
        alignItems: 'center',
        fontSize: '16px',
        paddingBottom: '#24px',
      }}
    >
      <Searchbar onSubmit={formSubmit} />
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      {images && <Images images={images} />}
      {images.length >= 12 && <Button onLoadMore={onLoadMore} />}
    </div>
  );
};

export default App;
