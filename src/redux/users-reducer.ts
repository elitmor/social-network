import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api';
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { AppStateType } from './store';

const FOLLOW_SUCCESS = 'users/FOLLOW_SUCCESS';
const UNFOLLOW_SUCCESS = 'users/UNFOLLOW_SUCCESS';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
  users: [] as UsersType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[],
};

type InitialStateType = typeof initialState;

export const usersReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
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
    case UNFOLLOW_SUCCESS:
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

type ActionsType =
  | SetUsersType
  | SetTotalUsersCountType
  | FollowSuccessType
  | UnfollowSuccessType
  | SetCurrentPageType
  | ToggleIsFetchingType
  | ToggleFollowingProgressType;

type SetUsersType = {
  type: typeof SET_USERS;
  users: UsersType[];
};

export const setUsersAС = (users: UsersType[]): SetUsersType => ({
  type: SET_USERS,
  users,
});

type FollowSuccessType = {
  type: typeof FOLLOW_SUCCESS;
  userId: number;
};

export const followSuccess = (userId: number): FollowSuccessType => ({
  type: FOLLOW_SUCCESS,
  userId,
});

type UnfollowSuccessType = {
  type: typeof UNFOLLOW_SUCCESS;
  userId: number;
};

export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
  type: UNFOLLOW_SUCCESS,
  userId,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPageAC = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export const setTotalUsersCountAC = (
  totalUsersCount: number,
): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetchingAC = (
  isFetching: boolean,
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS;
  isProgress: boolean;
  userId: number;
};

export const toggleFollowingProgressAC = (
  isProgress: boolean,
  userId: number,
): ToggleFollowingProgressType => ({
  type: TOGGLE_FOLLOWING_PROGRESS,
  isProgress,
  userId,
});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const fetchUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAС(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
  };

type DispatchType = Dispatch<ActionsType>;

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType,
) => {
  dispatch(toggleFollowingProgressAC(true, userId));
  const res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgressAC(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow, followSuccess);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow,
      unfollowSuccess,
    );
  };
