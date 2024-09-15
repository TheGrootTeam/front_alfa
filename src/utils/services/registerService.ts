import { client } from '../../api/client';
import {
  IRegisterApplicantForm,
  IRegisterCompanyForm,
} from '../interfaces/IAuth';

export async function createApplicantUser(
  newUser: IRegisterApplicantForm,
  t: (key: string) => string
): Promise<IRegisterApplicantForm> {
  try {
    const response = await client.post('/register', newUser,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      // error.response?.data?.message || t('errors.creating_user_error')
      error.data?.message || t('errors.creating_user_error')
    );
  }
}

export async function createCompanyUser(
  newUser: IRegisterCompanyForm,
  t: (key: string) => string
): Promise<IRegisterCompanyForm> {
  try {
    const response = await client.post('/register', newUser
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      //error.response?.data?.message || t('errors.creating_user_error')
      error.data?.message || t('errors.creating_user_error')
    );
  }
}
