import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../api/client';
import { initialAuth } from '../store/reducers/authSlice';
import { store } from '../store/store';
import { authVerify } from './services/authService';
import storage from './storage';

export const authRememberSession = async (token: string) => {
  setAuthorizationHeader(token);
  const isCompany = await authVerify();
  return isCompany.isCompany;
};

export const authToken = async (token: string) => {
  try {
    const isCompany = await authRememberSession(token);
    store.dispatch(initialAuth({ isCompany }));
  } catch (error) {
    removeAuthorizationHeader();
    storage.remove('key');
  }
};
