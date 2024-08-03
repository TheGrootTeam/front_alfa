export interface IOffers {
  offers: IOffer[];
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

export interface IOfferListingDetail {
  id: string;
  companyOwner: string;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  status: boolean;
}

export interface IErrListings {
  config: any;
  data: dataErr;
  error: string;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

interface dataErr {
  error: string;
}

export interface ICustomErrorListings {
  message: string;
  status: number;
  statusText: string;
}
