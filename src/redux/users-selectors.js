import { createSelector } from 'reselect';

const getUsersPage = (state) => state.usersPage;

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
