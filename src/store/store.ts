import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reducers/authSlice';
import { uiSlice } from './reducers/uiSlice';
import { registerSlice } from './reducers/registerSlice';
import { offersSlice } from './reducers/offersSlice';
import { newOfferSlice } from './reducers/newOfferSlice';
import profileReducer from './reducers/profileSlice';
import { editOfferSlice } from './reducers/editOfferSlice';
import { router } from '../router';
import { applicantInfoSlice } from './reducers/infoApplicantSlice';
// import * as auth from '../pages/auth/service';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    register: registerSlice.reducer,
    offers: offersSlice.reducer,
    newOffer: newOfferSlice.reducer,
    profile: profileReducer,
    editOffer: editOfferSlice.reducer,
    applicantInfo: applicantInfoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        thunk: {
          extraArgument: { router },
        },
        serializableCheck: false,
      }
      //     //devTools: process.env.NODE_ENV !== 'production',
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
