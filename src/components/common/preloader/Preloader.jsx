import style from './preloader.module.css';
import preloader from '../../../assets/loader.svg';

export const Preloader = () => {
  return (
    <>
      <img
        className={style.preloader}
        src={preloader}
        alt='preloader'
      />
    </>
  );
};
