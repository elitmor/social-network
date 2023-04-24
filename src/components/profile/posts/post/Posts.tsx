import { Post } from '../Post';
import style from './posts.module.css';

export const Posts = () => {
  return (
    <div className={style.posts}>
      <h3 className={style.title}>My posts</h3>
      <textarea className={style.textarea}></textarea>
      <button className={style.btn}>Add post</button>
      <Post
        message='you'
        likesCount={10}
      />
      <Post
        message='hi'
        likesCount={10}
      />
      <Post
        message='have are you?'
        likesCount={1000}
      />
    </div>
  );
};
