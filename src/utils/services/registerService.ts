import { client } from '../../api/client';
import {
  IRegisterApplicantForm,
  IRegisterCompanyForm,
} from '../interfaces/IAuth';

export async function createApplicantUser(
  newUser: IRegisterApplicantForm,
  userType: boolean,
  t: (key: string) => string
): Promise<IRegisterApplicantForm> {
  try {
    const response = await client.post('/register', {
      ...newUser,
      isCompany: userType,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.response?.data?.message || t('errors.creating_user_error')
    );
  }
}

export async function createCompanyUser(
  newUser: IRegisterCompanyForm,
  userType: boolean,
  t: (key: string) => string
): Promise<IRegisterCompanyForm> {
  try {
    const response = await client.post('/register', {
      ...newUser,
      isCompany: userType,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.response?.data?.message || t('errors.creating_user_error')
    );
  }
}
