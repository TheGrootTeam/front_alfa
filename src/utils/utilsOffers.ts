import { IOffer, IOfferMapped } from './interfaces/IOffer';

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
