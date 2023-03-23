import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './modules/auth/store/auth.reducer';
import * as entryExit from './modules/entry-exit/store/entry-exit.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  // entryExit: entryExit.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  // entryExit: entryExit.entryExitReducer,
};
