// import { client } from '../../api/client';
import {
  IRegisterApplicantForm,
  IRegisterCompanyForm,
} from '../interfaces/IAuth';

export async function createApplicantUser(
  newUser: IRegisterApplicantForm
): Promise<IRegisterApplicantForm> {
  try {
    // const response = await client.post<IRegisterApplicantForm>(`/`, newUser);
    // return response.data;

    // TEMP console log + return del usuario
    console.log(newUser);
    return newUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.message || 'An error occurred while creating the user'
    );
  }
}

export async function createCompanyUser(
  newUser: IRegisterCompanyForm
): Promise<IRegisterCompanyForm> {
  try {
    // const response = await client.post<IRegisterCompanyForm>(`/`, newUser);
    // return response.data;

    // TEMP console log + return del usuario
    console.log(newUser);
    return newUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.message || 'An error occurred while creating the user'
    );
  }
}

export async function updateApplicantUser(
  updatedUser: IRegisterApplicantForm
): Promise<IRegisterApplicantForm> {
  try {
    // const response = await client.patch<IRegisterApplicantForm>(`/edit`, updatedUser);
    // return response.data;

    // TEMP console log + return del usuario
    console.log(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.message || 'An error occurred while creating the user'
    );
  }
}

export async function updateCompanyUser(
  updatedUser: IRegisterCompanyForm
): Promise<IRegisterCompanyForm> {
  try {
    // const response = await client.post<IRegisterCompanyForm>(`/`, newUser);
    // return response.data;

    // TEMP console log + return del usuario
    console.log(updatedUser);
    return updatedUser;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(
      error.message || 'An error occurred while creating the user'
    );
  }
}
