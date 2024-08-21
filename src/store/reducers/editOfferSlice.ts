import { createSlice } from '@reduxjs/toolkit';
//import { createOffersAction } from '../actions/offersActions';
import { editOffersAction } from '../actions/offersActions';

// import { IOffer } from '../../utils/interfaces/IOffer';
import { IOfferForm } from '../../utils/interfaces/IOffer';

export const editOfferSlice = createSlice({
  name: 'editOffer',
  initialState: {
    offerInfo: {} as IOfferForm,
  },
  reducers: {
    resetEditOfferState: (state) => {
      state.offerInfo = {} as IOfferForm;

    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(editOffersAction.pending, (state) => {
      //   state.offerInfo = ;
      // })
      .addCase(editOffersAction.fulfilled, (state, action) => {
        state.offerInfo = action.payload;
      })
  },
});

// Export the reducer, not the slice itself
export default editOfferSlice.reducer;

