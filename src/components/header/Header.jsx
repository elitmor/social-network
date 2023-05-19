import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { logout } from '../../redux/auth-reducer';
import style from './header.module.css';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';

export const Header = () => {
  const dispatch = useDispatch();

  const login = useSelector(getLogin);
  const isAuth = useSelector(getIsAuth);

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
            <button onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </div>
    </header>
  );
};
