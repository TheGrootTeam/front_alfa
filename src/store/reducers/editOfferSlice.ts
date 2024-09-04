import { createSlice } from '@reduxjs/toolkit';
import { editOffersAction } from '../actions/offersActions';
import { IOfferForm } from '../../utils/interfaces/IOffer';

export const editOfferSlice = createSlice({
  name: 'editOffer',
  initialState: {
    offerInfo: {} as IOfferForm,
    offerStatus: false,
    mustRecharge: false
  },
  reducers: {
    resetEditOfferState: (state) => {
      state.offerInfo = {} as IOfferForm;
      state.offerStatus = false;
    },
    resetMustRecharge: (state) => {
      state.mustRecharge = false; // Reducer to put mustRecharge to false
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
        state.mustRecharge = true;
      })
  },
});

//Export the action that reset 'mustRecharge'
export const { resetMustRecharge } = editOfferSlice.actions;

// Export the reducer, not the slice itself
export default editOfferSlice.reducer;

