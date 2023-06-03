import {
  ResultCodes,
  ResultCodesForCaptcha,
  authAPI,
  securityAPI,
} from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null as string | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;

export const authReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
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

type SetAuthUserDataPayloadType = {
  userId: string | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: string | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
): SetAuthUserDataType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getAuthUserData = () => async (dispatch: any) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodes.Success) {
    const { id, email, login } = meData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

type GetCaptchaUrlSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: string,
): GetCaptchaUrlSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    setError: any,
    captcha: string,
  ) =>
  async (dispatch: any) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodes.Success) {
      await dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const errorMessage =
        data.messages.length > 0
          ? data.messages[0]
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

  if (res.data.resultCode === ResultCodes.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
