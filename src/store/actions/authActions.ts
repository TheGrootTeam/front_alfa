import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../pages/auth/service';

export const authLogin = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }
      await login(data);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);