
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser: any = createAsyncThunk(
  'register/user',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
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
        state.error = action.payload;
      });
  },
});

// Export the reducer, not the slice itself
export default registerSlice.reducer;
