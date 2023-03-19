import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const setUser = createAction(
  '[Auth] SetUserCurrent',
  props<{ user: User }>()
);
export const unSetUser = createAction('[Auth] UnSetUserCurrent');
