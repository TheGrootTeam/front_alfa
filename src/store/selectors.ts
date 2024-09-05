import type { RootState } from './store';

export const getIsLogged = (state: RootState) => state.auth.auth;

/*This modification assumes that auth.auth is a Boolean that indicates
If the user is authenticated.If the auth state has a different structure,
Adjust the selector in consequence.*/

export const getIsCompany = (state: RootState) => state.auth.isCompany;

export const getUi = (state: RootState) => state.ui;

export const getUiSuccess = (state: RootState) => state.ui.success;

export const getOffersState = (state: RootState) => state.offers.offers;

export const getNewOfferState = (state: RootState) => state.newOffer;

export const getToUpdateOfferState = (state: RootState) => state.editOffer;

export const getOffersLoaded = (state: RootState) => state.offers.loadedOffers;

export const getOffer = (offerId: string | undefined) => (state: RootState) =>
  state.offers.offers.find((offer) => offer.id === offerId);

export const getApplicantInfoLoaded = (state: RootState) =>
  state.applicantInfo.loadedApplicant;

export const getApplicantInfo = (state: RootState) =>
  state.applicantInfo.infoApplicant;

export const getCompanyInfoLoaded = (state: RootState) =>
  state.companyInfo.loadedCompany;

export const getCompanyInfo = (state: RootState) =>
  state.companyInfo.infoCompany;

export const getMustRecharge = (state: RootState) =>
  state.editOffer.mustRecharge;
