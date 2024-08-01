import { createSlice } from '@reduxjs/toolkit';
import {  } from '../../utils/interfaces/IAuth';
import { IErrorPayload } from '../../utils/interfaces/IStore';

const initialState = {
  loading: true,
  error: null as string | null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.error,
        (state, action: IErrorPayload) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
