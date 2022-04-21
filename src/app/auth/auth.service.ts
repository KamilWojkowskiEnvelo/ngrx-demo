import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from '@features/user/user.service';
import { delay, iif, map, of, ReplaySubject, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = new ReplaySubject<boolean>(1);

  constructor(private router: Router, private userService: UserService) {
    this.checkToken().subscribe(isAuth => {
      if (!isAuth) {
        this.auth.next(false);

        return;
      }

      const userFromStorage: User | null = JSON.parse(localStorage.getItem('user') as string);

      if (!userFromStorage) {
        this.logout();
        return;
      }

      this.setStateAfterAuth(userFromStorage);
    });
  }

  public get auth$() {
    return this.auth.asObservable();
  }

  public logout() {
    of(null).subscribe({
      next: () => {
        this.auth.next(false);
        localStorage.removeItem('token');
        this.router.navigate(['auth']);
      },
      error: () => alert('Podczas wylogowania wystąpił błąd'),
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

          this.router.navigate(['app']);
        },
        error: () => {
          alert('Błędny login lub hasło');
        },
      });
  }

  public checkToken() {
    return of(localStorage.getItem('token')).pipe(delay(1000), map(Boolean));
  }

  private setStateAfterAuth(user: User) {
    this.userService.setUser(user);
    this.auth.next(true);
  }
}
