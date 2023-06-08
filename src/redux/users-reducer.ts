import { Dispatch } from 'redux';
import { usersAPI } from '../api/usersAPI';
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../utils/object-helpers';
import { BaseThunkType, InferActionsTypes } from './store';

const initialState = {
  users: [] as UsersType[],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[],
};

export const usersReducer = (
  state = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
      };
    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case 'FOLLOW_SUCCESS':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      };
    case 'UNFOLLOW_SUCCESS':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_FOLLOWING_PROGRESS':
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

export const actions = {
  setUsersAС: (users: UsersType[]) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  followSuccess: (userId: number) =>
    ({
      type: 'FOLLOW_SUCCESS',
      userId,
    } as const),

  unfollowSuccess: (userId: number) =>
    ({
      type: 'UNFOLLOW_SUCCESS',
      userId,
    } as const),

  setCurrentPageAC: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCountAC: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleIsFetchingAC: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgressAC: (isProgress: boolean, userId: number) =>
    ({
      type: 'TOGGLE_FOLLOWING_PROGRESS',
      isProgress,
      userId,
    } as const),
};

export const fetchUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPageAC(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsFetchingAC(false));
    dispatch(actions.setUsersAС(data.items));
    dispatch(actions.setTotalUsersCountAC(data.totalCount));
  };

type DispatchType = Dispatch<ActionsType>;

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsType,
) => {
  dispatch(actions.toggleFollowingProgressAC(true, userId));
  const res = await apiMethod(userId);
  if (res.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgressAC(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow,
      actions.followSuccess,
    );
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow,
      actions.unfollowSuccess,
    );
  };

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
