import {
  APIResponseType,
  ResultCodes,
  ResultCodesForCaptcha,
  instance,
} from './api';

type MeResponseDataType = {
  resultCode: ResultCodes;
  data: { id: number; email: string; login: string };
  id: string;
  email: string;
  login: string;
};

type LoginAPIResponseType = {
  userId: string;
};

export const authAPI = {
  me() {
    return instance.get<MeResponseDataType>('auth/me').then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string,
  ) {
    return instance
      .post<
        APIResponseType<
          LoginAPIResponseType,
          ResultCodes | ResultCodesForCaptcha
        >
      >('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete('auth/login');
  },
};
