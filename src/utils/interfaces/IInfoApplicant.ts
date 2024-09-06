export interface IInfoApplicants {
  applicantInfo: IApplicantInfo[];
}

export interface IApplicantInfoReduxState {
  infoApplicant: IApplicantInfoMapped;
  loadedApplicant: boolean;
}

export interface IApplicantInfo {
  _id: string;
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
  preferredOffers: any[];
  suscribedOffers: any[];
  __v: number;
}

export interface IApplicantInfoWithPassword
  extends Omit<
    IApplicantInfo,
    '_id' | 'preferredOffers' | '__v' | 'suscribedOffers'
  > {
  password: string;
  confirmPassword: string;
}

export interface IApplicantInfoMapped {
  id: string;
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
  preferredOffers: any[];
  suscribedOffers: any[];
  __v: number;
}

export interface MainSkill {
  _id: string;
  skill: string;
}

export interface WantedRol {
  _id: string;
  rol: string;
}
