import { v1 } from 'uuid';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
  posts: [
    { id: v1(), message: 'Hello', likesCount: 5 },
    { id: v1(), message: 'You', likesCount: 3 },
    { id: v1(), message: 'How are you?', likesCount: 7 },
  ],
  newPostText: '',
  profile: null,
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
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      };
    default:
      return state;
  }
};

export const setUserProfileAC = (profile: any) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const addPostAC = () => ({ type: ADD_POST });

export const updateNewPostTextAC = (text: any) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
