import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { Image } from '../App/App.types';
import { MouseEvent } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, image }:ImageModalProps) => {

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.overlay}
      className={s.modal}
      shouldCloseOnOverlayClick={true}
    >
      <div onClick={handleOverlayClick} className={s.container}>
        <img src={image?.urls?.regular} alt={image?.alt_description} className={s.image} />
        <p className={s.info}>Author: {image?.user?.name}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;