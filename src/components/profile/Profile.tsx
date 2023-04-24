import { Posts } from './posts/post/Posts';
import style from './profile.module.css';

export const Profile = () => {
  return (
    <div className={style.profile}>
      <Posts />
    </div>
  );
};
