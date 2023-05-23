import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import style from './user.module.css';

export const User = ({ user, followingProgress, unfollowUser, followUser }) => {
  return (
    <div key={user.id}>
      <div>
        <NavLink to={`/profile/${user.id}`}>
          <img
            className={style.avatar}
            src={user.photos.small ?? avatar}
            alt='avatar'
          />
        </NavLink>
        {user.followed === true ? (
          <button
            className={style.btn}
            disabled={followingProgress.some((id) => id === user.id)}
            onClick={() => {
              unfollowUser(user.id);
            }}
          >
            UnFollow
          </button>
        ) : (
          <button
            className={style.btn}
            disabled={followingProgress.some((id) => id === user.id)}
            onClick={() => {
              followUser(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <div>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </div>
    </div>
  );
};
