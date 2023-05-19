import { createSelector } from 'reselect';

const getApp = (state) => state.app;

export const getInitialized = createSelector(
  [getApp],
  (app) => app.initialized,
);
