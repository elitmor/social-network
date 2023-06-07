import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getApp = (state: AppStateType) => state.app;

export const getInitialized = createSelector(
  [getApp],
  (app) => app.initialized,
);
