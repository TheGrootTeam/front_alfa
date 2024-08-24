import { createAsyncThunk } from '@reduxjs/toolkit';
import { client, setAuthorizationHeader } from '../../api/client';  
import { RegisterPayload } from '../../utils/interfaces/IAuth';

export const registerUser: any = createAsyncThunk(
  'register/user',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await client.post('/register', data); 
      
      // Store the token and set the authorization header
      const { token, isCompany } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('isCompany', isCompany);
      setAuthorizationHeader(token);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
