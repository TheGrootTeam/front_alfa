import { createSlice } from '@reduxjs/toolkit';
import { editOffersAction } from '../actions/offersActions';
import { IOfferForm } from '../../utils/interfaces/IOffer';

export const editOfferSlice = createSlice({
  name: 'editOffer',
  initialState: {
    offerInfo: {} as IOfferForm,
    offerStatus: false
  },
  reducers: {
    resetEditOfferState: (state) => {
      state.offerInfo = {} as IOfferForm;
      state.offerStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editOffersAction.pending, (state) => {
        state.offerStatus = false;
      })
      .addCase(editOffersAction.fulfilled, (state, action) => {
        state.offerInfo = action.payload;
        state.offerStatus = true;
      })
  },
});

// Export the reducer, not the slice itself
export default editOfferSlice.reducer;

