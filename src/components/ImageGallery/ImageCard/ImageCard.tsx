import PropTypes from 'prop-types';
import s from './ImageCard.module.css';
import { Image } from '../../App/App.types';

interface ImageCardProps {
  info: Pick<Image, 'alt_description' | 'urls'>;
}

const ImageCard = ({ info }: ImageCardProps) => {
  const {
    alt_description,
    urls: { small },
  } = info;

  return (
    <div>
      <img className={s.galleryImage} src={small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;