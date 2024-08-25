import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOffers } from '../../utils/services/serviceOffers';
import { offersMapped } from '../../utils/utilsOffers';
import { IOfferForm, IOfferMapped } from '../../utils/interfaces/IOffer';
import { createOffer } from '../../utils/services/serviceOffers';
import { RootState } from '../store';
import { getOffersLoaded, getOffersState } from '../selectors';
import { updateOffer } from '../../utils/services/serviceOffers';


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
  IOfferMapped,
  IOfferForm,
  { rejectValue: string }
>(
  'offers/createOffersAction',
  async (newOffer: IOfferForm, { rejectWithValue }) => {
    try {
      const offer = await createOffer(newOffer);
      return offer; // return the offer, for to be saved in the store
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editOffersAction = createAsyncThunk<
  IOfferMapped,
  IOfferForm,
  { rejectValue: string }
>('offers/editOffersAction', async (updatedOffer: IOfferForm, { rejectWithValue }) => {
  try {
    const offer = await updateOffer(updatedOffer);
    const mappedOffer: IOfferMapped = {
      ...offer,
      id: (offer as any)._id,  // Maps _id to id using an explicit conversion
      publicationDate: new Date(offer.publicationDate)  // Make sure publicationDate is a Date
    };
    return mappedOffer;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
