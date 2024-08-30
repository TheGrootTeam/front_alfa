
//Interfaz para estado.
export interface ICompanyInfoReduxState {
  infoCompany: ICompanyInfoMapped;
  loadedCompany: boolean;
}

export interface IInfoCompanies {
  //Se usó en "infoApplicantService.ts", aunque la idea es sacar sólo un aplicante
  //companyInfo: ICompanyInfo[];
  companyInfo: ICompanyInfo;
}

export interface ICompanyInfo {
  _id: string;
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: Sector;
  ubication: string;
  description: string;
  logo: string;
  pusblishedOffers: PublishedOffers[];
  __v: number;
}

export interface ICompanyInfoMapped {
  id: string;
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: Sector;
  ubication: string;
  description: string;
  logo: string;
  pusblishedOffers: PublishedOffers[];
  __v: number;
}

export interface PublishedOffers {
  _id: string;
  position: string;
  status: boolean;
}

export interface Sector {
  _id: string;
  sector: string;
}
