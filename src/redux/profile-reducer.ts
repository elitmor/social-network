import { v1 } from 'uuid';

import { profileAPI } from '../api/profileAPI';
import { PhotosType, PostsType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './store';

const initialState = {
  posts: [
    { id: v1(), message: 'Hello', likesCount: 5 },
    { id: v1(), message: 'You', likesCount: 3 },
    { id: v1(), message: 'How are you?', likesCount: 7 },
  ] as PostsType[],
  profile: null as ProfileType | null,
  status: '',
};

export const profileReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'profile/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'profile/ADD_POST':
      const newPost = {
        id: v1(),
        message: action.newText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case 'profile/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    case 'profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case 'profile/SET_STATUS':
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const actions = {
  setUserProfileAC: (profile: ProfileType) =>
    ({
      type: 'profile/SET_USER_PROFILE',
      profile,
    } as const),

  addPostAC: (newText: string) =>
    ({
      type: 'profile/ADD_POST',
      newText,
    } as const),
  deletePostAC: (postId: string) =>
    ({
      type: 'profile/DELETE_POST',
      postId: postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'profile/SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
  setStatus: (status: string) =>
    ({ type: 'profile/SET_STATUS', status } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfileAC(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (err) {
      console.log('err');
    }
  };

export const savePhoto =
  (file: Blob): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;

    if (userId !== null) {
      const data = await profileAPI.saveProfile(profile);

      if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
      }
    }
  };

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
