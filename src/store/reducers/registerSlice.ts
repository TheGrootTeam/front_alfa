import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../actions/registerActions';
registerUser

const initialState = {
  userInfo: null
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
  },
});


export default registerSlice.reducer;
