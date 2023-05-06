const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
  users: [],
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
        users: state.users.map((user: any) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user: any) => {
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

export const setUsersAС = (users: any) => ({ type: SET_USERS, users });

export const followAС = (userId: any) => ({ type: FOLLOW, userId });

export const unfollowAС = (userId: any) => ({ type: UNFOLLOW, userId });
