import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setAuthUserDataAС = (
  userId: any,
  email: any,
  login: any,
  isAuth: any,
) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getAuthUserData = () => {
  return (dispatch: any) => {
    authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
        const { id, email, login } = res.data.data;
        dispatch(setAuthUserDataAС(id, email, login, true));
      }
    });
  };
};

export const login = (
  email: any,
  password: any,
  rememberMe: any,
  setError: any,
) => {
  return (dispatch: any) => {
    authAPI.login(email, password, rememberMe).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        const errorMessage =
          res.data.messages.length > 0
            ? res.data.messages[0]
            : 'Invalid email or password';
        setError('password', {
          type: 'manual',
          message: errorMessage,
        });
      }
    });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserDataAС(null, null, null, false));
      }
    });
  };
};
