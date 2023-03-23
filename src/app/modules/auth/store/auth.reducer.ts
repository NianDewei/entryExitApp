import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { User } from '../model/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(actions.unSetUser, (state) => ({ ...state, user: null }))
);

export const authReducer = (state: State = initialState, action: Action) => {
  return _authReducer(state, action);
};
