import { ReactNode } from 'react';

export interface ILoginData {
  dniCif: string;
  password: string;
  rememberMe: boolean;
}

export interface IToken {
  tokenJWT: string;
  isCompany: boolean;
}

export interface RequireAuthProps {
  children: ReactNode;
}

// import { WantedRol, MainSkill } from './IInfoApplicant';
export interface IRegisterApplicantForm {
  dniCif: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  photo: string;
  cv: string;
  ubication: string;
  typeJob: string;
  internType: string;
  wantedRol: string[];
  mainSkills: string[];
  geographically_mobile: boolean;
  disponibility: boolean;
}

// import { Sector } from './IInfoCompany';
export interface IRegisterCompanyForm {
  dniCif: string;
  name: string;
  email: string;
  phone: string;
  sector: string;
  ubication: string;
  description: string;
  logo: string;
  password: string;
  confirmPassword: string;
  isCompany:boolean
}

export interface IAuthIsCompany {
  isCompany: boolean;
}
