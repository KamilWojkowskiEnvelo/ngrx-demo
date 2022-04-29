import { AuthState } from './auth';
import { CounterState } from './counter/counter.state';

export interface AppState {
  counter: CounterState;
  auth: AuthState;
}
