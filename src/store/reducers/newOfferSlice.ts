import { createSlice } from '@reduxjs/toolkit';
import { createOffersAction } from '../actions/offersActions';


export const newOfferSlice = createSlice({
  name: 'newOffer',
  initialState: {
    offerInfo: false,
  },
  reducers: {
    resetNewOfferState: (state) => {
      state.offerInfo = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffersAction.pending, (state) => {
        state.offerInfo = false;
      })
      .addCase(createOffersAction.fulfilled, (state) => {
        state.offerInfo = true;
      })
  },
});

// Export the reducer, not the slice itself
export default newOfferSlice.reducer;

