import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from '../../utils/services/serviceOffers';
import { offersMapped } from '../../utils/utilsOffers';
import { IOfferMapped } from '../../utils/interfaces/IOffer';
import { IOffer } from '../../utils/interfaces/IOffer';
import { createOffer } from '../../utils/services/serviceOffers';
import { RootState } from '../store';
import { getOffersLoaded, getOffersState } from '../selectors';

export const getOffersAction = createAsyncThunk<
  IOfferMapped[],
  void,
  { state: RootState; rejectValue: string }
>('offers/getOffersAction', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const loadedOffers = getOffersLoaded(state);
  if (loadedOffers) {
    return getOffersState(state);
  }
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

export const createOffersAction = createAsyncThunk<
  IOffer,
  IOffer,
  { rejectValue: string }
>('offers/createOffersAction', async (newOffer, { rejectWithValue }) => {
  try {
    const offer = await createOffer(newOffer);
    return offer;
  } catch (error: any) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message as string);
    } else {
      return rejectWithValue(error.error || (error.message as string));
    }
  }
});
