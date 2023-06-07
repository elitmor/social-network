import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getIsAuth } from '../../redux/auth-selectors';
import { actions } from '../../redux/dialogs-reducer';
import { getMessages } from '../../redux/dialogs-selectors';
import { AppStateType } from '../../redux/store';
import { Dialog } from './dialog/Dialog';
import { Message } from './message/Message';
import style from './myDialogs.module.css';

interface MyDialogsFormData {
  textarea: string;
}

const MyDialogs: FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: AppStateType) => getMessages(state));
  const isAuth = useSelector((state: AppStateType) => getIsAuth(state));

  const { register, handleSubmit, reset } = useForm<MyDialogsFormData>();

  const { addMessage } = actions;

  const onSubmit: SubmitHandler<MyDialogsFormData> = (data) => {
    dispatch(addMessage('Your Name', data.textarea));
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
          type='submit'
        >
          Add post
        </button>
      </form>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default MyDialogs;
