import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getDialogsPage = (state: AppStateType) => state.dialogsPage;

export const getMessages = createSelector(
  [getDialogsPage],
  (dialogsPage) => dialogsPage.messages,
);
