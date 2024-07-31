import type { RootState } from './index'

export const getIsLogged = (state: RootState) => state.auth;
