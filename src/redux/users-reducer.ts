import { usersAPI } from '../api/api';

const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
const UNFOLLOW__SUCCESS = 'UNFOLLOW__SUCCESS';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [],
};

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        users: state.users.map((user: any) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW__SUCCESS:
      return {
        ...state,
        users: state.users.map((user: any) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingProgress: action.isProgress
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

export const setUsersAС = (users: any) => ({ type: SET_USERS, users });

export const followSuccess = (userId: any) => ({
  type: FOLLOW_SUCCESS,
  userId,
});

export const unfollowSuccess = (userId: any) => ({
  type: UNFOLLOW__SUCCESS,
  userId,
});

export const setCurrentPageAC = (currentPage: any) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCountAC = (totalUsersCount: any) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const toggleIsFetchingAC = (isFetching: any) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const toggleFollowingProgressAC = (isProgress: any, userId: any) => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isProgress,
  userId,
});

export const fetchUsers = (currentPage: any, pageSize: any) => {
  return (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setUsersAС(data.items));
      dispatch(setTotalUsersCountAC(data.totalCount));
    });
  };
};

export const follow = (userId: any) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, userId));
    usersAPI.follow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};

export const unfollow = (userId: any) => {
  return (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, userId));
    usersAPI.unfollow(userId).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProgressAC(false, userId));
    });
  };
};
