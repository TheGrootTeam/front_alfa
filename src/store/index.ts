import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as r from './reducers';
// We'll use redux-logger just as an example of adding another middleware
import * as auth from '../pages/auth/service';

const reducers = combineReducers(r);

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        thunk: {
          extraArgument: { services: { auth } },
        },
        serializableCheck: false,
      }
      //devTools: process.env.NODE_ENV !== 'production',
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
