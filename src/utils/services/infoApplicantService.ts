import { client } from '../../api/client';
import { IInfoApplicants } from '../interfaces/IInfoApplicant';

export async function getInfoApplicant() {
  const infoApplicant: IInfoApplicants = await client.get(
    '/infoDashboards/applicant'
  );
  return infoApplicant.applicantInfo[0];
}
