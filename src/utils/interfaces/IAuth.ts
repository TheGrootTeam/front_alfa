export interface ILoginData {
  dniCif: string;
  password: string;
  rememberMe: boolean;
}

export interface IToken {
  tokenJWT: string;
  isCompany: boolean;
}

export interface RegisterPayload {
  dniCif: string;
  email: string;
  password: string;
  isCompany: boolean;
}