import { FieldError } from 'react-hook-form';
import { Dispatch } from 'redux';
import { ResultCodes, ResultCodesForCaptcha } from '../api/api';
import { authAPI } from '../api/authAPI';
import { securityAPI } from '../api/securityAPI';
import { BaseThunkType, InferActionsTypes } from './store';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export const authReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    case 'auth/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ) =>
    ({
      type: 'auth/SET_USER_DATA',
      payload: { userId, email, login, isAuth },
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: 'auth/GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaUrl },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodes.Success) {
    const { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    setError: (name: string, error: FieldError) => void,
    captcha: string,
  ): ThunkType =>
  async (dispatch) => {
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

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch: Dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === ResultCodes.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
