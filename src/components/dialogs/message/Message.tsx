import style from './message.module.css';

type MessagePropsType = {
  id: string;
  message: string;
};

export const Message: React.FC<MessagePropsType> = (props) => {
  return (
    <>
      <div className={style.message}>{props.message}</div>
    </>
  );
};
