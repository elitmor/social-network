import { NavLink } from 'react-router-dom';
import style from './navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={style.nav}>
      <ul>
        <li className={style.item}>
          <NavLink
            to='/profile'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
                ':hover': {
                  color: 'red', // Define the hover color here
                },
              };
            }}
          >
            Profile
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to='/dialogs'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Dialogs
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to='/users'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Users
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to='/chat'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Chat
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
