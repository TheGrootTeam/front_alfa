export interface IOffers {
  offers: IOffer[];
}

export interface IOffersReduxState {
  offers: IOfferMapped[];
  loadedOffers: boolean;
}

interface companyOwner {
  _id: string;
  name?: string;
}

interface applicantOwner {
  _id: string;
  mail: string;
}

export interface NewOfferState {
  offerInfo: IOfferForm | null;
  offerStatus: boolean;
  error: string | null | undefined;

}


export interface IOffer {
  __v: number;
  _id: string;
  companyOwner: companyOwner;
  description: string;
  internJob: string;
  listApplicants: applicantOwner[];
  location: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: Date;
  status: boolean;
  typeJob: string;
}

export interface IOfferMapped {
  __v: number;
  id: string;
  //DAL - For type compatibility, both are kept
  _id?: string;
  companyOwner: companyOwner;
  description: string;
  internJob: string;
  //DAL
  //listApplicants: number;
  listApplicants: applicantOwner[];
  location: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: Date;
  status: boolean;
  typeJob: string;
}

export interface IOfferListingDetail {
  id: string;
  //DAL
  //companyOwner: string;
  companyOwner: companyOwner;
  description: string;
  internJob: string;
  location: string;
  numberApplicants: number;
  numberVacancies: number;
  publicationDate: Date;
  position: string;
  status: boolean;
  typeJob: string;
}

export interface IOfferForm {
  __v?: number;
  _id?: string;
  companyOwner?: companyOwner | string;
  description: string;
  internJob: string;
  //listApplicants: string[];
  listApplicants?: applicantOwner[];
  location: string;
  numberApplicants?: number;
  numberVacancies: number;
  position: string;
  publicationDate?: Date | string;
  status: boolean;
  typeJob: string;
}

export interface offerDashboard {
  _id: string;
  position: string;
  location: string;
  status: boolean;
  publicationDate?: string;
}

export interface ListDashboardOffersCompanyProps {
  publishedOffers: offerDashboard[];
}