import type { RootState } from './store';

export const getIsLogged = (state: RootState) => state.auth;

export const getIsCompany = (state: RootState) => state.auth.isCompany;

export const getUi = (state: RootState) => state.ui;

export const getOffersState = (state: RootState) => state.offers.offers;

export const getNewOfferState = (state: RootState) => state.newOffer;

export const getToUpdateOfferState = (state: RootState) => state.editOffer;

export const getOffersLoaded = (state: RootState) => state.offers.loadedOffers;

export const getOffer = (offerId: string | undefined) => (state: RootState) =>
  state.offers.offers.find((offer) => offer.id === offerId);
