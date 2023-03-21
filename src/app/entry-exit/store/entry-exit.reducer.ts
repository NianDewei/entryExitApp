import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './entry-exit.actions';
import { EntryExitModel } from '../model/entry-exit.model';

export interface State {
  items: Array<EntryExitModel>;
}

export const initialState: State = {
  items: [],
};

const _entryExitReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export const entryExitReducer = (state: State = initialState, action: Action) => {
  return _entryExitReducer(state, action);
};
