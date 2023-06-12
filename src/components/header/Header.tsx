import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { logout } from '../../redux/auth-reducer';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import style from './header.module.css';

export const Header = () => {
  const dispatch = useDispatch();

  const login = useSelector(getLogin);
  const isAuth = useSelector(getIsAuth);

  const handleLogout = () => {
    //@ts-ignore
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      <img
        className={style.header__logo}
        src={logo}
        alt='logo'
      />
      <div className={style.login}>
        {isAuth ? (
          <>
            <span>{login}</span>
            <Button
              variant='contained'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </div>
    </header>
  );
};
