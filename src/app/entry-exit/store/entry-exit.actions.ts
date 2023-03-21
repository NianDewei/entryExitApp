import { createAction, props } from '@ngrx/store';
import { EntryExitModel } from '../model/entry-exit.model';

export const unSetItems = createAction('[EntryExit] increment');
export const setItems = createAction(
  '[EntryExit] setItems',
  props<{ items: Array<EntryExitModel> }>()
);
