import { ReactNode } from 'react';

export interface ILoginData {
  dniCif: string;
  password: string;
  rememberMe: boolean;
}

export interface IToken {
  tokenJWT: string;
  isCompany: boolean;
}

export interface RequireAuthProps {
  children: ReactNode;
}

export interface RegisterPayload {
  dniCif: string;
  email: string;
  password: string;
  isCompany: boolean;
}
