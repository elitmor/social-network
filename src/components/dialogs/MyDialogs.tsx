import { DialogType, MessageType } from '../../../types/types';
import { Dialog } from './dialog/Dialog';
import { Message } from './message/Message';
import style from './myDialogs.module.css';

interface MyDialogsProps {
  dialogs: DialogType[];
  messages: MessageType[];
}

export const MyDialogs = (props: MyDialogsProps) => {
  const dialogsElements = props.dialogs.map((dialog: any) => (
    <Dialog
      key={dialog.id}
      id={dialog.id}
      name={dialog.name}
    />
  ));

  const messagesElements = props.messages.map((m: any) => (
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
    </div>
  );
};
