import style from './message.module.css';

export const Message = (props: any) => {
  return (
    <>
      <div className={style.message}>{props.message}</div>
    </>
  );
};
