import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from '../../utils/serviceOffers';
import { offersMapped } from '../../utils/utilsOffers';
import { IOfferMapped } from '../../utils/interfaces/IOffer';

export const getOffersAction = createAsyncThunk<
  IOfferMapped[],
  void,
  { rejectValue: string }
>('offers/getOffersAction', async (_, { rejectWithValue }) => {
  try {
    const offers = await getOffers();
    const mappedOffers = offersMapped(offers);
    return mappedOffers;
  } catch (error: any) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});
