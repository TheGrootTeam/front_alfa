import { IOffer, IOfferMapped } from './interfaces/IOffer';

export const offersMapped = (offers: IOffer[]): IOfferMapped[] => {
  return offers.map((offer) => ({
    __v: offer.__v,
    id: offer._id,
    companyOwner: offer.companyOwner,
    description: offer.description,
    internJob: offer.internJob,
    listApplicants: offer.listApplicants,
    location: offer.location,
    numberApplicants: offer.numberApplicants,
    numberVacancies: offer.numberVacancies,
    position: offer.position,
    publicationDate: new Date(offer.publicationDate),
    status: offer.status,
    typeJob: offer.typeJob,
  }));
};
