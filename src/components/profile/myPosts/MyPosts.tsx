import SendIcon from '@mui/icons-material/Send';
import { Button, TextareaAutosize } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { getPost } from '../../../redux/profile-selectors';
import { AppStateType } from '../../../redux/store';
import style from './myPosts.module.css';
import { Post } from './post/Post';

interface PostData {
  id: string;
  message: string;
  likesCount: number;
}

interface MyPostsFormData {
  textarea: string;
}

export const MyPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: AppStateType) => getPost(state));

  const { register, handleSubmit, reset } = useForm<MyPostsFormData>();

  const onSubmit: SubmitHandler<MyPostsFormData> = (data) => {
    dispatch(actions.addPostAC(data.textarea));
    reset();
  };

  const postsElements = posts.map((post: PostData) => (
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
        <TextareaAutosize
          className={style.textarea}
          placeholder='Enter your message'
          {...register('textarea')}
        ></TextareaAutosize>
        <Button
          variant='contained'
          type='submit'
          endIcon={<SendIcon />}
        >
          Add post
        </Button>
      </form>
      {postsElements}
    </div>
  );
};
