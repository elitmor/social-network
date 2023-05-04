import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from '../../../redux/profile-reducer';
import style from './myPosts.module.css';
import { Post } from './post/Post';

export const MyPosts = () => {
  const [valueTextarea, setValueTextarea] = useState('');
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.profilePage.posts);

  const addPost = () => {
    dispatch(addPostActionCreator());
    setValueTextarea('');
  };

  const handleChangeTextarea = (e: any) => {
    const text = e.target.value;
    setValueTextarea(text);
    dispatch(updateNewPostTextActionCreator(text));
  };

  const postsElements = posts.map((post: any) => (
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
