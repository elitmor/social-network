import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getUsersPage = (state: AppStateType) => state.usersPage;

export const getUsers = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.users,
);

export const getPageSize = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.pageSize,
);

export const getTotalUsersCount = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.totalUsersCount,
);

export const getCurrentPage = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.currentPage,
);

export const getIsFetching = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.isFetching,
);

export const getFollowingProgress = createSelector(
  [getUsersPage],
  (usersPage) => usersPage.followingProgress,
);
