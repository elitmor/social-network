import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addMessageActionCreator } from '../../redux/dialogs-reducer';
import { Dialog } from './dialog/Dialog';
import { Message } from './message/Message';
import style from './myDialogs.module.css';

export const MyDialogs = (props: any) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.dialogsPage.messages);
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    dispatch(addMessageActionCreator(data.textarea));
    reset();
  };

  const dialogsElements = messages.map((dialog: any) => (
    <Dialog
      key={dialog.id}
      id={dialog.id}
      name={dialog.name}
    />
  ));

  const messagesElements = messages.map((m: any) => (
    <Message
      key={m.id}
      id={m.id}
      message={m.message}
    />
  ));

  return isAuth ? (
    <div className={style.dialogs}>
      <div className={style.items}>{dialogsElements}</div>
      <div className={style.messages}>{messagesElements}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className={style.textarea}
          placeholder='Enter your message'
          {...register('textarea')}
        ></textarea>
        <button
          className={style.btn}
          type={'submit'}
        >
          Add post
        </button>
      </form>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};
