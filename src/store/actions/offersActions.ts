import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from '../../utils/serviceOffers';
import { isIErrListings, offersMapped } from '../../utils/utilsOffers';
import {
  ICustomErrorListings,
  IErrListings,
  IOfferMapped,
} from '../../utils/interfaces/IOffer';

export const getOffersAction = createAsyncThunk<
  IOfferMapped[],
  void,
  { rejectValue: ICustomErrorListings | string }
>('offers/getOffersAction', async (_, { rejectWithValue }) => {
  try {
    const offers = await getOffers();
    const mappedOffers = offersMapped(offers);
    return mappedOffers;
  } catch (err) {
    if (isIErrListings(err)) {
      // handling error from API
      const error = err as IErrListings;

      const errorObject: ICustomErrorListings = {
        message: error.error,
        status: error.status,
        statusText: error.statusText,
      };
      return rejectWithValue(errorObject);
    } else {
      // handling unknow error
      return rejectWithValue('Ups, se ha producido un error desconocido.');
    }
  }
});
