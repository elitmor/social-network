import { PostType } from '../../../../types/types';
import style from './myPosts.module.css';
import { Post } from './post/Post';

interface MyPostsProps {
  posts: PostType[];
}

export const MyPosts = (props: MyPostsProps) => {
  const postsElements = props.posts.map((post: any) => (
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
