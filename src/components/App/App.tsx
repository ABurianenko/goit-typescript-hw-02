import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import FetchImages from '../../services/API';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import customToast from '../ErrorMessage/Toast/ToastMessage.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/API/ErrorMessage.jsx';
import s from './App.module.css';
import ImageModal from '../ImageModal/ImageModal.jsx';
import { Image } from './App.types.js';

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [isShowButton, setIsShowButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!query) return;

    const renderGallery = async () => {
      try {
        setIsLoading(true);
        const res = await FetchImages(query, page);
        
        if (res.results.length === 0) {
          setIsShowButton(false);
          customToast({type: 'warn', message: 'Sorry, there are no images matching your search'});
          setIsLoading(false);
          return;
        }

        setImages(prev => [...prev, ...res.results]);
        setIsShowButton(page < Math.ceil(res.total / 12) ? true : false);
        setIsLoading(false);
      } catch (_) {
        setError('Something went wrong! Please try again later.');
        setIsLoading(false);
      }
    };

    renderGallery();
  }, [query, page]);

  const getInputValue = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useLayoutEffect(() => {
    if (galleryRef.current && images.length > 0) {
      const { height: cardHeight } = galleryRef.current.firstElementChild!.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1,
        behavior: 'smooth',
      });
    }
  }, [images]);

  return (
    <>
      <SearchBar onSubmit={getInputValue} />
      <Toaster />
      <div className={s.container}>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          images.length > 0 && (
            <ImageGallery images={images} ref={galleryRef} onImageClick={handleImageClick} />
          )
        )}
      </div>
      {isLoading && <Loader />}
      {isShowButton && <LoadMoreBtn onClick={() => setPage(page => page + 1)} />}
      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
    </>
  );
};

export default App;