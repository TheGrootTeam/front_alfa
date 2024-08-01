import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from '../actions/authActions';

const initialState = {
  auth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.fulfilled, (state) => {
      state.auth = true;
    });
  },
});
