import { v1 } from 'uuid';

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

type MessagesType = {
  id: string;
  name: string;
  message: string;
};

const initialState = {
  messages: [
    { id: v1(), name: 'Alex', message: 'Hello' },
    { id: v1(), name: 'Ksy', message: 'You' },
    { id: v1(), name: 'Liza', message: 'How are you?' },
  ] as MessagesType[],
};

type InitialStateType = typeof initialState;

export const dialogsReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: v1(),
        name: action.name,
        message: action.newText,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    default:
      return state;
  }
};

type AddMessageType = {
  type: typeof ADD_MESSAGE;
  newText: string;
};

export const addMessageActionCreator = (newText: string): AddMessageType => ({
  type: ADD_MESSAGE,
  newText,
});
