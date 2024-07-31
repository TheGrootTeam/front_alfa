import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from '../../api/client';
import { ILoginData, IToken } from '../../utils/interfaces/interfaces';
import storage from '../../utils/storage';

export const login = (data: ILoginData): Promise<void> => {
  const {dniCif, password, rememberMe} = data
  return client.post<IToken, IToken>('login', {dniCif,password}).then((data) => {
    setAuthorizationHeader(data.accessToken);
    if (rememberMe) {
      storage.set('key', data.accessToken);
    }
  });
};

export const logout = () => {
  storage.remove('key');
  removeAuthorizationHeader();
};
