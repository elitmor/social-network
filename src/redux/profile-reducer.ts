import { v1 } from 'uuid';
import { profileAPI } from '../api/api';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';

const initialState = {
  posts: [
    { id: v1(), message: 'Hello', likesCount: 5 },
    { id: v1(), message: 'You', likesCount: 3 },
    { id: v1(), message: 'How are you?', likesCount: 7 },
  ],
  profile: null,
  status: '',
};

export const profileReducer = (state = initialState, action: any) => {
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
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

export const setUserProfileAC = (profile: any) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const addPostAC = (newText: any) => ({ type: ADD_POST, newText });

export const deletePostAC = (postId: any) => ({
  type: DELETE_POST,
  postId: postId,
});

export const getUserProfile = (userId: any) => async (dispatch: any) => {
  const res = await profileAPI.getProfile(userId);

  dispatch(setUserProfileAC(res.data));
};

export const setStatus = (status: any) => ({ type: SET_STATUS, status });

export const getStatus = (userId: any) => async (dispatch: any) => {
  const res = await profileAPI.getStatus(userId);

  dispatch(setStatus(res.data));
};

export const updateStatus = (status: any) => async (dispatch: any) => {
  const res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
