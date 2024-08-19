import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOfferMapped, IOffersReduxState } from '../../utils/interfaces/IOffer';
import { getOffersAction } from '../actions/offersActions';

const initialState: IOffersReduxState = {
  offers: [],
  loadedOffers: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getOffersAction.fulfilled,
      (state, action: PayloadAction<IOfferMapped[]>) => {
        state.offers = action.payload;
        state.loadedOffers = true;
      }
    );
  },
});
