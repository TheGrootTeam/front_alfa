export interface IOffers {
  offers: IOffer[];
}

export interface IOffersMapped {
  offers: IOfferMapped[];
}

interface companyOwner {
  _id: string;
  name: string;
}

export interface IOffer {
  companyOwner: companyOwner;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: string;
  status: boolean;
  __v: number;
  _id: string;
  listApplicants: number;
}

export interface IOfferMapped {
  companyOwner: companyOwner;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: Date;
  status: boolean;
  __v: number;
  id: string;
  listApplicants: number;
}

export interface IOfferListingDetail {
  id: string;
  companyOwner: string;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  status: boolean;
}
