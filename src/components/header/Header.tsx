import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { setAuthUserDataAС } from '../../redux/auth-reducer';
import style from './header.module.css';

export const Header = () => {
  const dispatch = useDispatch();

  const login = useSelector((state: any) => state.auth.login);
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          const { id, email, login } = res.data.data;
          dispatch(setAuthUserDataAС(id, email, login));
        }
      });
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
