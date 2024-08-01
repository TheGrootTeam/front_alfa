export interface IOffers {
  offers: IOffer[];
}

export interface IOffer {
  companyOwner: string;
  description: string;
  numberApplicants: number;
  numberVacancies: number;
  position: string;
  publicationDate: string;
  status: boolean;
  __v: number;
  _id: string;
}
