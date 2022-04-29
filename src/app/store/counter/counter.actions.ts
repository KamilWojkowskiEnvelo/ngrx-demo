import { createAction, props } from '@ngrx/store';

export const CounterActions = {
  addOne: createAction('[Counter] Add 1'),
  add: createAction('[Counter] Add n value', props<{ value: number }>()),
};
