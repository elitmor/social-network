import { v1 } from 'uuid';

const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const initialState = {
  messages: [
    { id: v1(), name: 'Alex', message: 'Hello' },
    { id: v1(), name: 'Ksy', message: 'You' },
    { id: v1(), name: 'Liza', message: 'How are you?' },
  ],
  newMessageText: '',
};

export const dialogsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: v1(),
        message: state.newMessageText,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageText: '',
      };
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newText,
      };
    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (text: any) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: text,
});
