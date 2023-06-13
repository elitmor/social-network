const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';

const closeHandler = () => {
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach((s) => s(newMessages));
};

const openHandler = () => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = () => {
  notifySubscribersAboutStatus('error');
  console.error('Refresh page');
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status));
};

const createChannel = () => {
  cleanUp();
  ws?.close();

  ws = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
  );
  notifySubscribersAboutStatus('pending');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
  ws.addEventListener('open', openHandler);
  ws.addEventListener('error', errorHandler);
};

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    cleanUp();
    ws?.close();
  },
  subscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe(
    eventName: EventsNamesType,
    callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType,
  ) {
    //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(
      (s: any) => s !== callback,
    );
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
type StatusType = 'pending' | 'ready' | 'error';
