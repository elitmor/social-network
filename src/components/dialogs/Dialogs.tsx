import { NavLink } from 'react-router-dom';
import style from './dialogs.module.css';

export const Dialogs = () => {
  return (
    <div className={style.dialogs}>
      <div className={style.items}>
        <div className={style.item}>
          <NavLink
            to='/dialogs/1'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Alex
          </NavLink>
        </div>
        <div className={style.item}>
          <NavLink
            to='/dialogs/2'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Ksy
          </NavLink>
        </div>
        <div className={style.item}>
          <NavLink
            to='/dialogs/3'
            style={({ isActive }) => {
              return {
                color: isActive ? '#40c0e7' : 'inherit',
              };
            }}
          >
            Liza
          </NavLink>
        </div>
      </div>
      <div className={style.messages}>
        <div className={style.message}>You</div>
        <div className={style.message}>Hi</div>
        <div className={style.message}>How are you?</div>
      </div>
    </div>
  );
};
