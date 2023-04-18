import avatar from '../../assets/avatar.svg';
import style from './profile.module.css';

export const Profile = () => {
  return (
    <div className={style.profile}>
      <h3>My posts</h3>
      <div className={style.post}>
        <img
          className={style.avatar}
          src={avatar}
          alt='avatar'
        />
        <span className={style.message}>you</span>
        <span className={style.like}>like</span>
      </div>
    </div>
  );
};
