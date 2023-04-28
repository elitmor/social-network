import style from './message.module.css';

type MessagePropsType = {
  id: number;
  message: string;
};

export const Message = (props: MessagePropsType) => {
  return (
    <>
      <div className={style.message}>{props.message}</div>
    </>
  );
};
