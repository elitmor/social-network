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
        ...action.data,
        isAuth: true,
      };

    default:
      return state;
  }
};

export const setAuthUserDataAС = (userId: any, email: any, login: any) => ({
  type: SET_USER_DATA,
  data: { userId, email, login },
});

export const getAuthUserData = () => {
  return (dispatch: any) => {
    authAPI.me().then((res) => {
      if (res.data.resultCode === 0) {
        const { id, email, login } = res.data.data;
        dispatch(setAuthUserDataAС(id, email, login));
      }
    });
  };
};
