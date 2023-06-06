import { v1 } from 'uuid';

import { profileAPI } from '../api/profileAPI';
import { PhotosType, PostsType, ProfileType } from '../types/types';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

const initialState = {
  posts: [
    { id: v1(), message: 'Hello', likesCount: 5 },
    { id: v1(), message: 'You', likesCount: 3 },
    { id: v1(), message: 'How are you?', likesCount: 7 },
  ] as PostsType[],
  profile: null as ProfileType | null,
  status: '',
};

type InitialStateType = typeof initialState;

export const profileReducer = (
  state = initialState,
  action: any,
): InitialStateType => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case ADD_POST:
      const newPost = {
        id: v1(),
        message: action.newText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfileAC = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type AddPostType = {
  type: typeof ADD_POST;
  newText: string;
};

export const addPostAC = (newText: string): AddPostType => ({
  type: ADD_POST,
  newText,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: string;
};

export const deletePostAC = (postId: string): DeletePostType => ({
  type: DELETE_POST,
  postId: postId,
});

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfileAC(data));
};

export const setStatus = (status: string) => ({ type: SET_STATUS, status });

export const getStatus = (userId: number) => async (dispatch: any) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (err) {
    console.log('err');
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    }
  };
