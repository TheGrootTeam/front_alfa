import { IOffer } from "./IOffer";

export interface ICompanyPublicProfile {
  company: string;
  phone: string;
  sector: string;
  location: string;
  description: string;
  offers: Array<IOffer>;
}
export interface ICompanyInfo {
  _id: string;
  dniCif: string;
  email: string;
  __v: number;
}

export interface ICompanyInfoMapped {
  id: string;
  dniCif: string;
  email: string;
  __v: number;
}

export interface ICompanyInfoRedux {
  infoCompany: ICompanyInfoMapped;
  loadedCompany: boolean;
}
