import { ICompanyInfo, ICompanyInfoMapped } from "./interfaces/IInfoCompany";


export const infocompanyMapped = (
  company: ICompanyInfo
): ICompanyInfoMapped => {
  return {
    id: company._id,
    dniCif: company.dniCif,
    email: company.email,
    __v: company.__v,
  };
};
