import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { appReducer } from './app-reducer';
import { authReducer } from './auth-reducer';
import chatReducer from './chat-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { profileReducer } from './profile-reducer';
import { usersReducer } from './users-reducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>,
> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
