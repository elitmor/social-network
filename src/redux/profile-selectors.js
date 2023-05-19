import { createSelector } from 'reselect';

const getProfilePage = (state) => state.profilePage;

export const getPost = createSelector(
  [getProfilePage],
  (profilePage) => profilePage.posts,
);

export const getUserProfile = createSelector(
  [getProfilePage],
  (profilePage) => profilePage.profile,
);
