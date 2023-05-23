import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW_SUCCESS = 'users/FOLLOW_SUCCESS';
const UNFOLLOW__SUCCESS = 'users/UNFOLLOW__SUCCESS';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS';

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
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case UNFOLLOW__SUCCESS:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
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

export const fetchUsers =
  (currentPage: any, pageSize: any) => async (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAС(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
  };

const followUnfollowFlow = async (
  dispatch: any,
  userId: any,
  apiMethod: any,
  actionCreator: any,
) => {
  dispatch(toggleFollowingProgressAC(true, userId));
  const res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgressAC(false, userId));
};

export const follow = (userId: any) => async (dispatch: any) => {
  await followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess);
};

export const unfollow = (userId: any) => async (dispatch: any) => {
  await followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow,
    unfollowSuccess,
  );
};
