import axios from 'axios';
import { PhotosType, UsersType } from '../types/types';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '61be3eef-56b5-439b-bddf-698a9c9e3f2f',
  },
});

export enum ResultCodes {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10,
}

export type APIResponseType<D = {}, RC = ResultCodes> = {
  photos(photos: PhotosType): PhotosType;
  data: D;
  messages: string[];
  resultCode: RC;
};

export type GetItemsType = {
  items: UsersType[];
  totalCount: number;
  error: string | null;
};
