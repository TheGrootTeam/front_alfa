import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteOfferService,
  getOffers,
} from '../../utils/services/serviceOffers';
import { offersMapped } from '../../utils/utilsOffers';
import { IOfferForm, IOfferMapped } from '../../utils/interfaces/IOffer';
import { createOffer, updateOffer, /*updateCompanyOffers*/ } from '../../utils/services/serviceOffers';
import { RootState } from '../store';
import { getOffersLoaded, getOffersState } from '../selectors';
import { uiSlice } from '../reducers/uiSlice';
import { router } from '../../router';
import { offersSlice } from '../reducers/offersSlice';

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
      const mappedOffer: IOfferMapped = {
        ...offer,
        id: offer._id!, //  _id never is undefined
      };


      // //BALIZA -> VERIFICAR qcuando se cree edición de compañía
      // console.log('MAPPED_OFFER (ADD_NEW_OFFER): ', mappedOffer);q
      // const companyId = mappedOffer.companyOwner._id;
      // console.log('LAS IDS (empresa-oferta):', companyId, mappedOffer.id);
      // await updateCompanyOffers(companyId, mappedOffer.id)


      return mappedOffer;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editOffersAction = createAsyncThunk<
  IOfferMapped,
  IOfferForm,
  { rejectValue: string }
>(
  'offers/editOffersAction',
  async (updatedOffer: IOfferForm, { rejectWithValue }) => {
    try {
      const offer = await updateOffer(updatedOffer);
      const mappedOffer: IOfferMapped = {
        ...offer,
        id: (offer as any)._id, // Maps _id to id using an explicit conversion
        publicationDate: new Date(offer.publicationDate), // Make sure publicationDate is a Date
      };
      return mappedOffer;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteOfferAction = createAsyncThunk<
  void,
  { id: string; successMessage: string },
  { rejectValue: string; extra: { router: typeof router } }
>(
  'offers/deleteOffersAction',
  async ({ id, successMessage }, { rejectWithValue, dispatch, extra }) => {
    const { router } = extra;
    try {
      await deleteOfferService(id);
      dispatch(uiSlice.actions.setSuccess(successMessage));
      dispatch(offersSlice.actions.resetLoadedOffers());
      await dispatch(getOffersAction() as any);
      setTimeout(() => {
        dispatch(uiSlice.actions.resetSuccess());
        router.navigate(-1);
      }, 3000);
    } catch (error: any) {
      dispatch(uiSlice.actions.resetSuccess());
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message as string);
      } else {
        return rejectWithValue(error.error || (error.message as string));
      }
    }
  }
);
