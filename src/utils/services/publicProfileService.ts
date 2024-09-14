import { client } from '../../api/client';
import { infoProfileCompanyMapped } from '../utilsProfileCompany';
import { infoProfileApplicantMapped } from '../utilsProfileApplicant';

export async function getPublicInfo(id: string | undefined, type: string) {
  //Falta crear interface y cambiar any per la interface
  const publicInfo: any = await client.get(`/profile/${type}/${id}`);
  const mappedInfo = infoProfileCompanyMapped(publicInfo.companyInfo[0]);
  return mappedInfo;
}

export async function getPublicApplicantInfo(
  id: string | undefined,
  type: string
) {
  //Falta crear interface y cambiar any per la interface
  const publicInfo: any = await client.get(`/profile/${type}/${id}`);
  const mappedInfo = infoProfileApplicantMapped(publicInfo.applicantInfo[0]);
  return mappedInfo;
}
