import avatar from '../../../../assets/avatar.svg';
import style from './post.module.css';

type PostPropsType = {
  id: string;
  message: string;
  likesCount: number;
};

export const Post = (props: PostPropsType) => {
  return (
    <div className={style.post}>
      <img
        className={style.avatar}
        src={avatar}
        alt='avatar'
      />
      <span className={style.message}>{props.message}</span>
      <span className={style.like}>like {props.likesCount}</span>
    </div>
  );
};
