import { client, setAuthorizationHeader } from '../api/client';
import { authVerify } from './services/authService';

export const authRememberSession = async (token: string) => {
  try {
    setAuthorizationHeader(token);
    const isCompany = await authVerify();

    debugger;
  } catch (error) {}
};
