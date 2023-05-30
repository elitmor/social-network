import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case GET_CAPTCHA_URL_SUCCESS:
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

export const getCaptchaUrlSuccess = (captchaUrl: any) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => async (dispatch: any) => {
  const res = await authAPI.me();
  if (res.data.resultCode === 0) {
    const { id, email, login } = res.data.data;
    dispatch(setAuthUserDataAС(id, email, login, true));
  }
};

export const login =
  (email: any, password: any, rememberMe: any, setError: any, captcha: any) =>
  async (dispatch: any) => {
    const res = await authAPI.login(email, password, rememberMe, captcha);
    if (res.data.resultCode === 0) {
      await dispatch(getAuthUserData());
    } else {
      if (res.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      const errorMessage =
        res.data.messages.length > 0
          ? res.data.messages[0]
          : 'Invalid email or password';
      setError('password', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

export const getCaptchaUrl = () => async (dispatch: any) => {
  const res = await securityAPI.getCaptchaUrl();
  const captchaUrl = res.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
  const res = await authAPI.logout();

  if (res.data.resultCode === 0) {
    dispatch(setAuthUserDataAС(null, null, null, false));
  }
};
