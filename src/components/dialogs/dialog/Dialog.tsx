import { NavLink } from 'react-router-dom';
import style from './dialog.module.css';

type DialogPropsType = {
  id: number;
  name: string;
};

export const Dialog = (props: DialogPropsType) => {
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
