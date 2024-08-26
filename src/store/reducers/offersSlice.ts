import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOfferMapped, IOffersReduxState } from '../../utils/interfaces/IOffer';
import { getOffersAction, createOffersAction, editOffersAction } from '../actions/offersActions';

const initialState: IOffersReduxState = {
  offers: [],
  loadedOffers: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getOffersAction.fulfilled,
        (state, action: PayloadAction<IOfferMapped[]>) => {
          state.offers = action.payload;
          state.loadedOffers = true;
        }
      )
      //DAL
      .addCase(
        createOffersAction.fulfilled,
        (state, action: PayloadAction<IOfferMapped>) => {
          state.offers.unshift(action.payload);
        }
      )
      .addCase(
        editOffersAction.fulfilled,
        (state, action: PayloadAction<IOfferMapped>) => {
          console.log('En SLICE:', action.payload)
          const index = state.offers.findIndex(offer => offer.id === action.payload.id);
          if (index !== -1) {
            state.offers[index] = { ...state.offers[index], ...action.payload };
          }
        }
      );
  },
});
