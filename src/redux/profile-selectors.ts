import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getProfilePage = (state: AppStateType) => state.profilePage;

export const getPost = createSelector(
  [getProfilePage],
  (profilePage) => profilePage.posts,
);

export const getUserProfile = createSelector(
  [getProfilePage],
  (profilePage) => profilePage.profile,
);

export const getCurrentStatus = createSelector(
  [getProfilePage],
  (profilePage) => profilePage.status,
);
