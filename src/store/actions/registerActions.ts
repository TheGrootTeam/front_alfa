import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';  
import { RegisterPayload } from '../../utils/interfaces/IAuth';

export const registerUser: any = createAsyncThunk(
  'register/user',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await client.post('/register', data); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
