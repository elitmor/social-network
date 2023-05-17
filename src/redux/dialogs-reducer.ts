import { v1 } from 'uuid';

const ADD_MESSAGE = 'ADD_MESSAGE';

const initialState = {
  messages: [
    { id: v1(), name: 'Alex', message: 'Hello' },
    { id: v1(), name: 'Ksy', message: 'You' },
    { id: v1(), name: 'Liza', message: 'How are you?' },
  ],
};

export const dialogsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const newMessage = {
        id: v1(),
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

export const addMessageActionCreator = (newText: any) => ({
  type: ADD_MESSAGE,
  newText,
});
