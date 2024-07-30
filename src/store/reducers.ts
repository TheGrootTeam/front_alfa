// @ts-nocheck

import { PayloadAction } from '@reduxjs/toolkit';
import * as t from './types';

export const defaultState = {
  auth: false,
  ui: {
    pending: false,
    error: null,
  },
};

export function auth(
  state = defaultState.auth,
  action: PayloadAction<boolean>
) {
  switch (action.type) {
    case t.AUTH_LOGIN_FULFILLED:
      return true;
    case t.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }

  if (action.type === t.UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type.endsWith('/pending')) {
    return { ...state, pending: true };
  }

  if (action.type.endsWith('/fulfilled')) {
    return { ...state, pending: false, error: null };
  }

  return state;
}
