import { createSelector } from 'reselect';

const getAuth = (state) => state.auth;

export const getIsAuth = createSelector([getAuth], (auth) => auth.isAuth);

export const getUserId = createSelector([getAuth], (auth) => auth.userId);

export const getLogin = createSelector([getAuth], (auth) => auth.login);
