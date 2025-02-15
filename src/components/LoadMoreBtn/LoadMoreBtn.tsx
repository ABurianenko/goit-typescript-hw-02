import PropTypes from 'prop-types';
import s from './LoadMoreBtn.module.css';

interface LoadMorePrors {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }:LoadMorePrors) => {
  return (
    <button className={s.loadMore} onClick={onClick} type="button">
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;