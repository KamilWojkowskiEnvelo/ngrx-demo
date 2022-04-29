import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '@features/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';
import { AuthActions } from 'app/store/auth';
import { delay, iif, map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.checkToken().subscribe(isAuth => {
      if (!isAuth) {
        this.store.dispatch(AuthActions.setNotAuthenticated());

        return;
      }

      const userFromStorage: User | null = JSON.parse(
        localStorage.getItem('user') as string
      );

      if (!userFromStorage) {
        this.logout();
        return;
      }

      this.setStateAfterAuth(userFromStorage);
    });
  }

  public logout() {
    of(null).subscribe({
      next: () => {
        this.store.dispatch(AuthActions.setNotAuthenticated());
        localStorage.removeItem('token');
        this.router.navigate(['auth']);
      },
      error: () => {
        alert('Podczas wylogowania wystąpił błąd');
      },
    });
  }

  public login(username: string, password: string) {
    of({ username, password })
      .pipe(
        switchMap(credentials => {
          return iif(
            () => credentials.password !== 'test',
            throwError(() => new Error()),
            of(credentials)
          );
        })
      )
      .subscribe({
        next: () => {
          // should come from api
          const user = {
            id: 3215,
            settings: {
              darkMode: true,
              newsletter: false,
            },
            username,
          };

          this.setStateAfterAuth(user);

          localStorage.setItem('token', Math.random().toString().substring(2));
          localStorage.setItem('user', JSON.stringify(user));
        },
        error: () => {
          alert('Błędny login lub hasło');
        },
      });
  }

  public checkToken() {
    return of(localStorage.getItem('token')).pipe(map(Boolean));
  }

  private setStateAfterAuth(user: User) {
    this.userService.setUser(user);
    this.store.dispatch(AuthActions.setAuthenticated());
    this.router.navigate(['app']);
  }
}
