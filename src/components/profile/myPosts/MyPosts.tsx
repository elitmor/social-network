import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../../redux/profile-selectors';
import style from './myPosts.module.css';
import { Post } from './post/Post';
import { actions } from '../../../redux/profile-reducer';

export const MyPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPost);

  const { register, handleSubmit, reset } = useForm();

  const { addPostAC } = actions;

  const onSubmit = (data: any) => {
    dispatch(addPostAC(data.textarea));
    reset();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className={style.textarea}
          placeholder='Enter your message'
          {...register('textarea')}
        ></textarea>
        <button
          className={style.btn}
          type='submit'
        >
          Add post
        </button>
      </form>
      {postsElements}
    </div>
  );
};
