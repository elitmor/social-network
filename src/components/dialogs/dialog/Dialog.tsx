import { NavLink } from 'react-router-dom';
import style from './dialog.module.css';

export const Dialog = (props: any) => {
  return (
    <div className={style.item}>
      <NavLink
        to={`/dialogs/${props.id}`}
        style={({ isActive }) => {
          return {
            color: isActive ? '#40c0e7' : 'inherit',
          };
        }}
      >
        {props.name}
      </NavLink>
    </div>
  );
};
