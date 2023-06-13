import { Button } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from '../../../redux/chat-reducer';
import { AppStateType } from '../../../redux/store';
import { ChatMessageAPIType } from '../../../types/types';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    // @ts-ignore
    dispatch(startMessagesListening());
    return () => {
      // @ts-ignore
      dispatch(stopMessagesListening());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {status === 'error' && (
        <div>Some error occurred. Please refresh the page</div>
      )}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  );
};

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight,
      ) < 300
    ) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div
      style={{ height: '400px', overflowY: 'auto' }}
      onScroll={scrollHandler}
    >
      {messages.map((m: any) => (
        <Message
          key={m.id}
          message={m}
        />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};

const Message: FC<{ message: ChatMessageAPIType }> = React.memo(
  ({ message }) => {
    console.log('>>>>>>Message');
    return (
      <div>
        <img
          src={message.photo}
          style={{ width: '30px' }}
          alt=''
        />
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  },
);

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    // @ts-ignore
    dispatch(sendMessage(message));
    setMessage('');
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <Button
          disabled={status !== 'ready'}
          onClick={sendMessageHandler}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
