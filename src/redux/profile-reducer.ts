import { v1 } from 'uuid';
import { profileAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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

export const getUserProfile = (userId: any) => {
  return (dispatch: any) => {
    profileAPI.getProfile(userId).then((res) => {
      dispatch(setUserProfileAC(res.data));
    });
  };
};

export const setStatus = (status: any) => ({ type: SET_STATUS, status });

export const getStatus = (userId: any) => (dispatch: any) => {
  profileAPI.getStatus(userId).then((res) => {
    dispatch(setStatus(res.data));
  });
};

export const updateStatus = (status: any) => (dispatch: any) => {
  profileAPI.updateStatus(status).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
