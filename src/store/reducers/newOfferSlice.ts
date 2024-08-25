import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOfferForm, NewOfferState } from '../../utils/interfaces/IOffer';
import { createOffersAction } from '../actions/offersActions';

const initialState: NewOfferState = {
  offerInfo: null,
  offerStatus: false,
  error: null,
};

export const newOfferSlice = createSlice({
  name: 'newOffer',
  initialState,
  reducers: {
    resetNewOfferState: (state) => {
      state.offerStatus = false;
      state.offerInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffersAction.pending, (state) => {
        state.offerStatus = false;
        state.offerInfo = null;
        state.error = null;
      })
      .addCase(createOffersAction.fulfilled, (state, action: PayloadAction<IOfferForm>) => {
        state.offerStatus = true;
        state.offerInfo = action.payload;
      })
      .addCase(createOffersAction.rejected, (state, action) => {
        state.offerStatus = false;
        state.error = action.error.message || null;
      });
  },
});

export default newOfferSlice.reducer;