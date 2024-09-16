import { IEditApplicantInfo, IEditCompanyInfo } from '../interfaces/IProfile';
import { client } from '../../api/client';

export async function updateApplicantUser(
  updatedUser: IEditApplicantInfo,
  t: (key: string) => string
): Promise<IEditApplicantInfo> {
  try {
    const infoApplicant: IEditApplicantInfo = await client.patch(
      '/infoDashboards/applicant',
      updatedUser,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return infoApplicant;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.message || t('errors.editing_user_error'));
  }
}

export async function updateCompanyUser(
  updatedUser: IEditCompanyInfo,
  t: (key: string) => string
): Promise<IEditCompanyInfo> {
  try {
    console.log(updatedUser)
    const infoCompany: IEditCompanyInfo = await client.patch(
      '/infoDashboards/company',
      updatedUser,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    console.log(infoCompany)
    return infoCompany;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.message || t('errors.editing_user_error'));
  }
}
