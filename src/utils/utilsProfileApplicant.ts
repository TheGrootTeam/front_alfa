import {
  IApplicantPublicProfile,
  IApplicantPublicProfileMapped,
} from './interfaces/IProfile';

export const infoProfileApplicantMapped = (
  applicant: IApplicantPublicProfile
): IApplicantPublicProfileMapped => {
  return {
    id: applicant._id,
    name: applicant.name,
    lastName: applicant.lastName,
    email: applicant.email,
    wantedRol: applicant.wantedRol,
    ubication: applicant.ubication,
    cv: applicant.cv,
    skills: applicant.mainSkills.map((skill) => skill.skill),
    jobType: applicant.typeJob,
    internType: applicant.internType,
    mobility: applicant.geographically_mobile,
    disponibility: applicant.disponibility,
    __v: applicant.__v,
  };
};
