import { client } from '../../api/client';
import { IDataApiChangePassword } from '../interfaces/IFormElements';

export async function changePasswordService(data: IDataApiChangePassword) {
  await client.patch('/changePassword', data);
}
