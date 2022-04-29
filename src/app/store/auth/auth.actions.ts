import { createAction } from '@ngrx/store';

export const AuthActions = {
  setAuthenticated: createAction('[Auth] Set Authenticated'),
  setNotAuthenticated: createAction('[Auth] Set Not Authenticated'),
};
