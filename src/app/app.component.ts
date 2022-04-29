import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

export type x = {
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public auth$ = this.store.select(state => state.auth.isAuth);

  constructor(private store: Store<AppState>) {}
}
