import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from '../../api/client';
import { ILoginData, IToken } from '../../utils/interfaces/interfaces';
import storage from '../../utils/storage';

export const login = (data: ILoginData, checked: boolean): Promise<void> => {
  return client.post<IToken, IToken>('login', data).then((data) => {
    setAuthorizationHeader(data.accessToken);
    if (checked) {
      storage.set('key', data.accessToken);
    }
  });
};

export const logout = () => {
  storage.remove('key');
  removeAuthorizationHeader();
};
