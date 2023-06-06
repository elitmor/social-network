import { getAuthUserData } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './store';

const initialState = {
  initialized: false,
};

export const appReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'app/INITIALIZED__SUCCESS':
      return { ...state, initialized: true };
    default:
      return state;
  }
};

const actions = {
  initializedSuccess: () =>
    ({
      type: 'app/INITIALIZED__SUCCESS',
    } as const),
};

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(actions.initializedSuccess());
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
