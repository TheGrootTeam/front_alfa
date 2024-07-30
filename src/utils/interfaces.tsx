export interface ILoginData {
  dniCif: string;
  password: string;
  isCompany: boolean;
}

export interface IToken {
  accessToken: string;
}

export interface IReducersFormActions {
  type: string;
  payload: {
    name: string;
    value: string | boolean;
  };
}

export interface IReducersFormReducerActions {
  type: string;
  payload: {
    name: string;
    value: string | boolean;
  };
}

export interface IReducersFormReducerState {
  dniCif: string;
  password: string;
  isCompany: null | boolean;
  rememberMe: boolean;
}
