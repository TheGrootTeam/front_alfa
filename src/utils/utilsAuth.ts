import { setAuthorizationHeader } from '../api/client';
import { authVerify } from './services/authService';

export const authRememberSession = async (token: string) => {
  setAuthorizationHeader(token);
  const isCompany = await authVerify();
  return isCompany.isCompany;
};
