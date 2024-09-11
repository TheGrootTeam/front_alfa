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

import { MainSkill, WantedRol } from "./IInfoApplicant";
import { IOffer } from "./IOffer";

export interface ICompanyPublicProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  sector: {sector: string};
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
  sector: {sector: string};
  ubication: string;
  description: string;
  logo: string;
  offers?: Array<IOffer>;
  __v?: number;
}

export interface IEditCompanyInfo {
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
  logo: string;
}

export interface IEditApplicantInfo {
  id: string,
  dniCif: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  cv: string;
  ubication: string;
  typeJob: string;
  internType: string;
  wantedRol: WantedRol[];
  mainSkills: MainSkill[];
  geographically_mobile: boolean;
  disponibility: boolean;
}