import { forwardRef } from 'react';
import ImageCard from './ImageCard/ImageCard';
import { Image } from '../App/App.types';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery = forwardRef<HTMLUListElement, ImageGalleryProps>(({ images, onImageClick }, ref) => {
  console.log('ImageGallery rendered, images count:', images.length);
  
  return (
    <ul className="gallery" ref={ref}>
      {images.map(image => (
        <li key={`${image.id}-${image.urls.small}`} className="thumb" onClick={() => onImageClick(image)}>
          <ImageCard info={image} />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;