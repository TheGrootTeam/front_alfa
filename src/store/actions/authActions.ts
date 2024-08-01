import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../pages/auth/service';
import { ILoginData } from '../../utils/interfaces/IAuth';

export const authLogin = createAsyncThunk<void, ILoginData, { rejectValue: string }>(
  'auth/login',
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // }
      await login(data);
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message as string);
      } else {
        return rejectWithValue(error.message as string);
      }
    }
  }
);
