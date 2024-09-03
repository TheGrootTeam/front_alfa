// import { client } from '../../api/client';
import {
  IRegisterApplicantForm,
  IRegisterCompanyForm,
} from '../interfaces/IAuth';

export async function updateApplicantUser(
  updatedUser: IRegisterApplicantForm,
  t: (key: string) => string
): Promise<IRegisterApplicantForm> {
  try {
    // TEMP console log + return del usuario
    console.log(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.message || t('errors.editing_user_error'));
  }
}

export async function updateCompanyUser(
  updatedUser: IRegisterCompanyForm,
  t: (key: string) => string
): Promise<IRegisterCompanyForm> {
  try {
    // TEMP console log + return del usuario
    console.log(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.message || t('errors.editing_user_error'));
  }
}
