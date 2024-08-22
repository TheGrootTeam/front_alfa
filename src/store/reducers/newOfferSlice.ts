import { createSlice } from '@reduxjs/toolkit';
import { createOffersAction } from '../actions/offersActions';
import { IOfferForm } from '../../utils/interfaces/IOffer';
import { NewOfferState } from '../../utils/interfaces/IOffer';

//BAliza: declarada en las interfaces IOFFER
// export interface NewOfferState {
//   offerInfo: IOfferForm | null; // Cambia el tipo a IOfferForm | null
// // }

const initialState: NewOfferState = {
  offerInfo: null, // Estado inicial es null
  offerStatus: false
};

export const newOfferSlice = createSlice({
  name: 'newOffer',
  initialState,
  reducers: {
    resetNewOfferState: (state) => {
      state.offerStatus = false;
      state.offerInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffersAction.pending, (state) => {
        state.offerStatus = false;
        state.offerInfo = null;
      })
      .addCase(createOffersAction.fulfilled, (state, action) => {
        state.offerStatus = true;
        console.log('STORED OfferInfo:', action.payload); // Verifica que se guarden los datos
        state.offerInfo = action.payload; // Almacena la oferta en el estado
      })
  },
});

// Export the reducer, not the slice itself
export default newOfferSlice.reducer;

