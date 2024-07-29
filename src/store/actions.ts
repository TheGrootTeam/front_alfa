import * as t from './types';

export const authLogin = () => ({
  type: t.AUTH_LOGIN,
});

export const authLogout = () => ({
  type: t.AUTH_LOGOUT,
});
