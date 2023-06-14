import { Button, TextareaAutosize } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth-selectors';
import { actions } from '../../redux/dialogs-reducer';
import { getMessages } from '../../redux/dialogs-selectors';
import { DialogType } from '../../types/types';
import { Dialog } from './dialog/Dialog';
import { Message } from './message/Message';
import style from './myDialogs.module.css';
import SendIcon from '@mui/icons-material/Send';

interface MyDialogsFormData {
  textarea: string;
}

const MyDialogs: React.FC = () => {
  const dispatch = useDispatch();
  const messages: Array<DialogType> = useSelector(getMessages);
  const isAuth: boolean = useSelector(getIsAuth);

  const { register, handleSubmit, reset } = useForm<MyDialogsFormData>();

  const { addMessage } = actions;

  const onSubmit = (data: MyDialogsFormData) => {
    dispatch(addMessage('Your Name', data.textarea));
    reset();
  };

  const dialogsElements = messages.map((dialog: DialogType) => (
    <Dialog
      key={dialog.id}
      id={dialog.id}
      name={dialog.name}
    />
  ));

  const messagesElements = messages.map((m) => (
    <Message
      key={m.id}
      id={m.id}
      message={m.message}
    />
  ));

  return isAuth ? (
    <div className={style.dialogs}>
      <div className={style.items}>
        {dialogsElements}
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
      </div>
      <div className={style.messages}>{messagesElements}</div>
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default MyDialogs;
