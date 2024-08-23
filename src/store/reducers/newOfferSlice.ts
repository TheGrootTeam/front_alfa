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
      state.error = null; // Reinicia también el error si es necesario
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffersAction.pending, (state) => {
        state.offerStatus = false;
        state.offerInfo = null;
        state.error = null; // Resetea el error durante la petición
      })
      .addCase(createOffersAction.fulfilled, (state, action: PayloadAction<IOfferForm>) => {
        state.offerStatus = true;
        console.log('STORED OfferInfo:', action.payload);
        state.offerInfo = action.payload;
      })
      .addCase(createOffersAction.rejected, (state, action) => {
        state.offerStatus = false;
        state.error = action.error.message || null;
      });
  },
});

export default newOfferSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';
// import { createOffersAction } from '../actions/offersActions';
// //import { IOfferForm } from '../../utils/interfaces/IOffer';
// import { NewOfferState } from '../../utils/interfaces/IOffer';

// const initialState: NewOfferState = {
//   offerInfo: null,
//   offerStatus: false,
//   error: null
// };

// export const newOfferSlice = createSlice({
//   name: 'newOffer',
//   initialState,
//   reducers: {
//     resetNewOfferState: (state) => {
//       state.offerStatus = false;
//       state.offerInfo = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createOffersAction.pending, (state) => {
//         state.offerStatus = false;
//         state.offerInfo = null;
//         state.error = null;
//       })
//       .addCase(createOffersAction.fulfilled, (state, action) => {
//         state.offerStatus = true;
//         console.log('STORED OfferInfo:', action.payload); // Verifica que se guarden los datos
//         state.offerInfo = action.payload; // save the offert in the store
//         state.error = null;
//       })
//       .addCase(createOffersAction.rejected, (state, action) => {
//         state.offerStatus = false;
//         state.error = action.payload;

//       });
//   },
// });

// // Export the reducer, not the slice itself
// export default newOfferSlice.reducer;

