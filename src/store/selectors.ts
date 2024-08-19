import type { RootState } from './store';

export const getIsLogged = (state: RootState) => state.auth;

export const getUi = (state: RootState) => state.ui;

export const getOffersState = (state: RootState) => state.offers.offers;

export const getNewOfferState = (state: RootState) => state.newOffer;

export const getOffersLoaded = (state: RootState) => state.offers.loadedOffers;
