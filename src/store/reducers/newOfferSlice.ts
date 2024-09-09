import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOfferForm, NewOfferState } from '../../utils/interfaces/IOffer';
import { createOffersAction } from '../actions/offersActions';

const initialState: NewOfferState = {
  offerInfo: null,
  offerStatus: false,
  error: null,
  haveToRecharge: false
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
    resetHaveToRecharge: (state) => {
      state.haveToRecharge = false; // Reducer to put haveToRecharge to false
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
        state.haveToRecharge = true;
      })
      .addCase(createOffersAction.rejected, (state, action) => {
        state.offerStatus = false;
        state.error = action.error.message || null;
      });
  },
});

//Export the action that reset 'haveToRecharge'
export const { resetHaveToRecharge } = newOfferSlice.actions;

export default newOfferSlice.reducer;