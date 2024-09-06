import {
  IApplicantInfo,
  IApplicantInfoMapped,
} from './interfaces/IInfoApplicant';

export const infoApplicantMapped = (
  applicant: IApplicantInfo
): IApplicantInfoMapped => {
  return {
    id: applicant._id,
    dniCif: applicant.dniCif,
    name: applicant.name,
    lastName: applicant.lastName,
    email: applicant.email,
    phone: applicant.phone,
    photo: applicant.photo,
    cv: applicant.cv,
    ubication: applicant.ubication,
    typeJob: applicant.typeJob,
    internType: applicant.internType,
    wantedRol: applicant.wantedRol,
    mainSkills: applicant.mainSkills,
    geographically_mobile: applicant.geographically_mobile,
    disponibility: applicant.disponibility,
    preferredOffers: applicant.preferredOffers,
    suscribedOffers: applicant.suscribedOffers,
    __v: applicant.__v,
  };
};
