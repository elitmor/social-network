import logo from '../../assets/logo.svg';
import style from './header.module.css';

export const Header = () => {
  return (
    <header className={style.header}>
      <img
        className={style.header__logo}
        src={logo}
        alt='logo'
      />
    </header>
  );
};
