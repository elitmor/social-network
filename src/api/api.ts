import axios from 'axios';
import { ProfileType } from '../types/types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '61be3eef-56b5-439b-bddf-698a9c9e3f2f',
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`, {});
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put('profile/status', { status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: string;
    email: string;
    login: string;
  };
  resultCode: ResultCodes;
  messages: string[];
};

type LoginResponseType = {
  data: {
    userId: string;
  };
  resultCode: ResultCodes | ResultCodesForCaptcha;
  messages: string[];
};

export const authAPI = {
  me() {
    return instance.get<MeResponseType>('auth/me').then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string,
  ) {
    return instance
      .post<LoginResponseType>('auth/login', {
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

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get('/security/get-captcha-url');
  },
};
