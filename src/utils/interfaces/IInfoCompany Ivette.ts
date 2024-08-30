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