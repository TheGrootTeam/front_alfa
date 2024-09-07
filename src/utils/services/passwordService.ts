import { client } from '../../api/client';
import { IFormChangePassword } from '../interfaces/IFormElements';

export async function changePasswordService(data: IFormChangePassword) {
  await client.post('/changePassword', data);
}
