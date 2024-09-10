// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authLogout, authTokenAction } from '../actions/authActions';
import storage from '../../utils/storage';

const token: string | null = storage.get('key');

const initialState = {
  auth: !!token,
  isCompany: false,
  authLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        state.auth = true;
        state.isCompany = action.payload.isCompany;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.auth = false;
        state.isCompany = false;
      })
      .addCase(authTokenAction.fulfilled, (state, action) => {
        state.auth = true;
        state.isCompany = action.payload.isCompany;
        state.authLoading = false;
      });
  },
});

export default authSlice.reducer;
