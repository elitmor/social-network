import { v1 } from 'uuid';
import { InferActionsTypes } from './store';

const initialState = {
  messages: [
    { id: v1(), name: 'Alex', message: 'Hello' },
    { id: v1(), name: 'Ksy', message: 'You' },
    { id: v1(), name: 'Liza', message: 'How are you?' },
  ] as MessagesType[],
};

export const actions = {
  addMessage: (name: string, newText: string) =>
    ({
      type: 'dialogs/ADD_MESSAGE',
      name,
      newText,
    } as const),
};

export const dialogsReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'dialogs/ADD_MESSAGE':
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

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

type MessagesType = {
  id: string;
  name: string;
  message: string;
};
