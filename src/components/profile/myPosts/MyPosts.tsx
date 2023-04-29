import style from './myPosts.module.css';
import { Post } from './post/Post';

export const MyPosts = (props: any) => {
  const postsElements = props.posts.posts.map((post: any) => (
    <Post
      key={post.id}
      id={post.id}
      message={post.message}
      likesCount={post.likesCount}
    />
  ));

  return (
    <div className={style.posts}>
      <textarea className={style.textarea}></textarea>
      <button className={style.btn}>Add post</button>
      {postsElements}
    </div>
  );
};
