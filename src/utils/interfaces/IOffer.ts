export interface IOffers {
  offers: IOffer[];
}

export interface IOffersReduxState {
  offers: IOfferMapped[];
  loadedOffers: boolean;
}

interface companyOwner {
  _id: string;
  name: string;
}

interface applicantOwner {
  _id: string;
  mail: string;
}

export interface NewOfferState {
  offerInfo: IOfferForm | null; // Cambia el tipo a IOfferForm | null
  offerStatus: boolean;

}

// export interface IOffer {
//   companyOwner: companyOwner;
//   description: string;
//   numberApplicants: number;
//   numberVacancies: number;
//   position: string;
//   publicationDate: string;
//   status: boolean;
//   __v: number;
//   _id: string;
//   listApplicants: number;
// }

//DAL
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
  companyOwner: string;
  description: string;
  internJob: string;
  location: string;
  numberApplicants: number;
  numberVacancies: number;
  //DAL
  publicationDate: Date;
  position: string;
  status: boolean;
  typeJob: string;
}

export interface IOfferForm {
  __v?: number;
  _id?: string;
  companyOwner?: companyOwner;
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
