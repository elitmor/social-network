import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getAuth = (state: AppStateType) => state.auth;

export const getIsAuth = createSelector([getAuth], (auth) => auth.isAuth);

export const getUserId = createSelector([getAuth], (auth) => auth.userId);

export const getLogin = createSelector([getAuth], (auth) => auth.login);

export const getCaptchaUrl = createSelector(
  [getAuth],
  (auth) => auth.captchaUrl,
);
