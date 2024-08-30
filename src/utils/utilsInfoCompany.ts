import { ICompanyInfo, ICompanyInfoMapped } from "./interfaces/IInfoCompany";


<<<<<<< HEAD
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
=======
export const infocompanyMapped = (company: ICompanyInfo): ICompanyInfoMapped => {
  return {
    id: company._id,
    dniCif: company.dniCif,
    name: company.name,
    email: company.email,
    phone: company.phone,
    sector: company.sector,
    ubication: company.ubication,
    description: company.description,
    logo: company.logo,
    pusblishedOffers: company.pusblishedOffers,
    __v: company.__v
  };
};

>>>>>>> companyDashboard
