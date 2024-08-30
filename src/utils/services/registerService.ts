import { client } from '../../api/client';
import { RegisterPayload } from '../interfaces/IAuth';

export const register = (data: RegisterPayload): Promise<RegisterPayload> => {
  return client.post<RegisterPayload, RegisterPayload>('register', {
    data
  });
};
