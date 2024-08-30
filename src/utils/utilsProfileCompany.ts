import { ICompanyPublicProfile, ICompanyPublicProfileMapped } from './interfaces/IProfile';

export const infoProfileCompanyMapped = (company: ICompanyPublicProfile): ICompanyPublicProfileMapped => {
  return {
    id: company._id,
    company: company.name,
    email: company.email,
    phone: company.phone,
    sector: company.sector,
    ubication: company.ubication,
    description: company.description,
    logo: company.logo,
    offers: company.publishedOffers,
    __v: company.__v
  };
};

