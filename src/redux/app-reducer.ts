import { getAuthUserData } from './auth-reducer';

const INITIALIZED__SUCCESS = 'app/INITIALIZED__SUCCESS';

const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED__SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

type InitializedSuccessType = {
  type: typeof INITIALIZED__SUCCESS;
};

export const initializedSuccess = (): InitializedSuccessType => ({
  type: INITIALIZED__SUCCESS,
});

export const initializeApp = () => async (dispatch: any) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};
