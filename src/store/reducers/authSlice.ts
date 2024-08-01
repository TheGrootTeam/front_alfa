import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from '../actions/authActions';

const initialState = {
  auth: false,
  ui: {
    loading: true,
    error: null,
  },
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
