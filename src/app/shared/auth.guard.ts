import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { tap } from 'rxjs';

const selectIsAuth = (state: AppState) => state.auth.isAuth;

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  public canActivate() {
    return this.store.select(selectIsAuth).pipe(
      // skip(1),
      tap(isAuth => {
        console.log({ isAuth });
        if (isAuth) {
          return;
        }

        this.router.navigate(['auth']);
      })
    );
  }
}
