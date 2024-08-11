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

interface applicantOwner {
  _id: string;
  mail: string;
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
  _id?: string;
  position: string;
  publicationDate: string;
  description: string;
  companyOwner: companyOwner;
  status: boolean;
  numberVacancies: number;
  listApplicants: applicantOwner[];
  numberApplicants: number;
  __v?: number;


}

export interface IOfferMapped {
  companyOwner: companyOwner;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: Date;
  status: boolean;
  __v?: number;
  id?: string;
  //listApplicants: number;
  //DAL
  listApplicants: applicantOwner[];
}

export interface IOfferListingDetail {
  id?: string;
  companyOwner: string;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  //DAL
  publicationDate: Date
  position: string;
  status: boolean;
}
