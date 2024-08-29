// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authLogout } from '../actions/authActions';

const initialState = {
  auth: false,
  isCompany: false,
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
  },
});

export default authSlice.reducer;
