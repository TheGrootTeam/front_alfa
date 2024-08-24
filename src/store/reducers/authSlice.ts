// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authLogout } from '../actions/authActions';
import { registerUser } from '../actions/registerActions';

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
        console.log('Auth State after login:', state); // Esto debería mostrar el estado correcto
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.auth = false;
        state.isCompany = false;
        console.log('Auth State after logout:', state); // Esto debería mostrar el estado correcto
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.auth = true;
        state.isCompany = action.payload.isCompany;
        console.log('Auth State after register:', state); // Esto debería mostrar el estado correcto
      });
  },
});

export default authSlice.reducer;
