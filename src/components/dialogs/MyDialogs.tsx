import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMessageActionCreator,
  updateNewMessageTextActionCreator,
} from '../../redux/dialogs-reducer';
import { Dialog } from './dialog/Dialog';
import { Message } from './message/Message';
import style from './myDialogs.module.css';

export const MyDialogs = (props: any) => {
  const [valueTextarea, setValueTextarea] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.dialogsPage.messages);

  const addMessage = () => {
    dispatch(addMessageActionCreator());
    setValueTextarea('');
  };

  const handleChangeTextarea = (e: any) => {
    const text = e.target.value;
    setValueTextarea(text);
    dispatch(updateNewMessageTextActionCreator(text));
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

  return (
    <div className={style.dialogs}>
      <div className={style.items}>{dialogsElements}</div>
      <div className={style.messages}>{messagesElements}</div>
      <div>
        <textarea
          className={style.textarea}
          value={valueTextarea}
          onChange={handleChangeTextarea}
        ></textarea>
        <button
          className={style.btn}
          onClick={addMessage}
        >
          Add post
        </button>
      </div>
    </div>
  );
};
