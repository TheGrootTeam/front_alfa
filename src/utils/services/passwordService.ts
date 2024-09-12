import { client } from '../../api/client';
import { IDataApiChangePassword } from '../interfaces/IFormElements';

export async function changePasswordService(data: IDataApiChangePassword) {
  await client.patch('/changePassword', data);
}

export async function verifyEmailService(email: string) {
  const data = await client.get(`/lost-password/${email}`);
  return data;
}
