import { createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';
import { CounterState } from './counter.state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface

const initialState: CounterState = { current: 0 };

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.addOne, state => {
    return {
      ...state,
      current: state.current + 1,
    };
  }),
  on(CounterActions.add, (state, props) => {
    return {
      ...state,
      current: state.current + props.value,
    };
  })
);
