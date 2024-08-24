import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../actions/registerActions';
registerUser

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    userInfo: null,
    loading: false,
    error: null as string | null | { message: string } | null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { message: string }; 
      });
  },
});

// Export the actions, including resetRegisterState
export const { resetRegisterState } = registerSlice.actions;

// Export the reducer
export default registerSlice.reducer;
