import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOfferMapped, IOffersMapped } from '../../utils/interfaces/IOffer';
import { getOffersAction } from '../actions/offersActions';

const initialState: IOffersMapped = {
  offers: [],
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
      }
    );
  },
});
