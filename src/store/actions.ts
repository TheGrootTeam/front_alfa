// @ts-nocheck

import * as t from './types';

export const authLoginPending = () => ({
  type: t.AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
  type: t.AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error) => ({
  type: t.AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

export const authLogin = (data) => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      await auth.login(data);
      dispatch(authLoginFulfilled());
      router.navigate(router.state.location.state?.pathname || '/');
    } catch (error) {
      dispatch(authLoginRejected(error));
    }
  };
};

export const authLogout = () => ({
  type: t.AUTH_LOGOUT,
});
