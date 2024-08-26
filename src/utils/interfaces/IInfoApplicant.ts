export interface IInfoApplicants {
  applicantInfo: IApplicantInfo[];
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

export interface MainSkill {
  _id: string;
  skill: string;
}

export interface WantedRol {
  _id: string;
  rol: string;
}
