import { Post } from './post/Post';
import style from './myPosts.module.css';

export const MyPosts = () => {
  return (
    <div className={style.posts}>
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
