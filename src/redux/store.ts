import { combineReducers, createStore } from 'redux';
import { dialogsReducer } from './dialogs-reducer';
import { profileReducer } from './profile-reducer';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

const store = createStore(reducers);

export default store;
