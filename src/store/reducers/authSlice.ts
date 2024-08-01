import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authLogout } from '../actions/authActions';

const initialState = {
  auth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.fulfilled, (state) => {
        state.auth = true;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.auth = false;
      });
  },
});
