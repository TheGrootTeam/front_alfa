import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from '../../api/client';
import { IAuthIsCompany, ILoginData, IToken } from '../interfaces/IAuth';
import storage from '../storage';

export const login = (data: ILoginData): Promise<IToken> => {
  const { dniCif, password, rememberMe } = data;
  return client
    .post<IToken, IToken>('login', { dniCif, password })
    .then((data) => {
      setAuthorizationHeader(data.tokenJWT);
      if (rememberMe) {
        storage.set('key', data.tokenJWT);
      }
      return data;
    });
};

export const logout = () => {
  storage.remove('key');
  removeAuthorizationHeader();
};

export const authVerify = async (): Promise<IAuthIsCompany> => {
  const isCompany: IAuthIsCompany = await client.get('/auth');
  return isCompany;
};
