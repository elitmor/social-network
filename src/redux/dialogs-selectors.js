import { createSelector } from 'reselect';

const getDialogsPage = (state) => state.dialogsPage;

export const getMessages = createSelector(
  [getDialogsPage],
  (dialogsPage) => dialogsPage.messages,
);
