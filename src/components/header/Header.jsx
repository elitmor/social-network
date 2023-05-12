import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { getAuthUserData } from '../../redux/auth-reducer';
import style from './header.module.css';

export const Header = () => {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.auth.login);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getAuthUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <header className={style.header}>
      <img
        className={style.header__logo}
        src={logo}
        alt='logo'
      />
      <div className={style.login}>
        <NavLink to='/login'>{isAuth ? login : 'Login'}</NavLink>
      </div>
    </header>
  );
};
