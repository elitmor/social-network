import { Dialog } from './dialog/Dialog';
import style from './myDialogs.module.css';
import { Message } from './message/Message';

export const MyDialogs = () => {
  return (
    <div className={style.dialogs}>
      <div className={style.items}>
        <Dialog
          id={1}
          name='Alex'
        />
        <Dialog
          id={2}
          name='Ksy'
        />
        <Dialog
          id={3}
          name='Liza'
        />
      </div>
      <div className={style.messages}>
        <Message message='Hello' />
        <Message message='You' />
        <Message message='How are you?' />
      </div>
    </div>
  );
};
