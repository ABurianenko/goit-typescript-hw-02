import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';
import { FC } from 'react';

const Loader:FC = () => {
  return (
    <div className={s.loaderWrapper}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#00BFFF"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;