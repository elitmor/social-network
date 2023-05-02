import { useState } from 'react';
import style from './myPosts.module.css';
import { Post } from './post/Post';

export const MyPosts = (props: any) => {
  const [valueTextarea, setValueTextarea] = useState('');

  const addPost = () => {
    props.addPost(valueTextarea);
    setValueTextarea('');
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueTextarea(e.target.value);
  };

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
      <textarea
        className={style.textarea}
        value={valueTextarea}
        onChange={handleChangeTextarea}
      ></textarea>
      <button
        className={style.btn}
        onClick={addPost}
      >
        Add post
      </button>
      {postsElements}
    </div>
  );
};
