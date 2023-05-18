import { getAuthUserData } from './auth-reducer';

const INITIALIZED__SUCCESS = 'INITIALIZED__SUCCESS';

const initialState = {
  initialized: false,
};

export const appReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case INITIALIZED__SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED__SUCCESS });

export const initializeApp = () => {
  return async (dispatch: any) => {
    await dispatch(getAuthUserData());
    dispatch(initializedSuccess());
  };
};
