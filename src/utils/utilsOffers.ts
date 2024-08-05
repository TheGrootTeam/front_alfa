import { IErrListings, IOffer, IOfferMapped } from './interfaces/IOffer';

export const isIErrListings = (obj: any): obj is IErrListings => {
  return (
    obj &&
    typeof obj === 'object' &&
    'config' in obj &&
    'data' in obj &&
    'error' in obj &&
    'headers' in obj &&
    'request' in obj &&
    'status' in obj &&
    'statusText' in obj
  );
};

export const offersMapped = (offers: IOffer[]): IOfferMapped[] => {
  return offers.map((offer) => ({
    id: offer._id,
    companyOwner: offer.companyOwner,
    description: offer.description,
    listApplicants: offer.listApplicants,
    numberApplicants: offer.numberApplicants,
    numberVacancies: offer.numberVacancies,
    position: offer.position,
    publicationDate: new Date(offer.publicationDate),
    status: offer.status,
    __v: offer.__v,
  }));
};
