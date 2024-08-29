import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterPayload } from '../../utils/interfaces/IAuth';
import { register } from '../../utils/services/registerService';

export const registerUser: any = createAsyncThunk(
  'register/user',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      await register(data)
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message as string);
      } else {
        return rejectWithValue(error.error || (error.message as string));
      }
    }
  }
);
