import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';  

interface RegisterPayload {
  dniCif: string;
  email: string;
  password: string;
  isCompany: boolean;
}

export const registerUser: any = createAsyncThunk(
  'auth/register',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await client.post('/register', data); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
