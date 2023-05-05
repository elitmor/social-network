import { v1 } from 'uuid';
import avatar from '../assets/avatar.svg';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [
    {
      id: v1(),
      fullName: 'Alex',
      status: 'Im a boss',
      location: { city: 'Kiev', country: 'Ukraine' },
      followed: true,
      photoUrl: avatar,
    },
    {
      id: v1(),
      fullName: 'Ksy',
      status: 'Im a boss',
      location: { city: 'Odessa', country: 'Ukraine' },
      followed: false,
      photoUrl: avatar,
    },
    {
      id: v1(),
      fullName: 'Liza',
      status: 'Im a boss',
      location: { city: 'Kiev', country: 'Ukraine' },
      followed: true,
      photoUrl: avatar,
    },
  ],
  newPostText: '',
};

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

export const setUsersAС = () => ({ type: SET_USERS });

export const followAС = (userId: any) => ({ type: FOLLOW, userId });

export const unfollowAС = (userId: any) => ({ type: UNFOLLOW, userId });
