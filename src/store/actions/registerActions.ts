import { createAsyncThunk } from '@reduxjs/toolkit';
import { client, setAuthorizationHeader } from '../../api/client';  
import { IToken, RegisterPayload } from '../../utils/interfaces/IAuth';

export const registerUser: any = createAsyncThunk(
  'register/user',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response:IToken =  await client.post('/register', data); 
      
      // Store the token and set the authorization header
      const { tokenJWT, isCompany } = response;
      localStorage.setItem('token', tokenJWT);
      localStorage.setItem('isCompany', `${isCompany}`);
      setAuthorizationHeader(tokenJWT);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
