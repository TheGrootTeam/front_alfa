export interface ApplicantProfileData {
  dniCif?: string;
  email?: string;
  password?: string;
  name?: string;
  lastName?: string;
  phone?: string;
  ubication?: string;
  typeJob?: string;
  wantedRol?: string;
  mainSkills?: string;
  geographically_mobile?: boolean;
  disponibility?: boolean;
}

export interface CompanyProfileData {
  dniCif: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
}

export interface ApplicantProfileState {
  profileData: any;
  loading: boolean;
  error: string | null;
}

import { IOffer } from "./IOffer";

export interface ICompanyPublicProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
  logo: string;
  publishedOffers: Array<IOffer>;
  __v: number;
}

export interface ICompanyPublicProfileMapped {
  id?: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
  logo: string;
  offers?: Array<IOffer>;
  __v?: number;
}