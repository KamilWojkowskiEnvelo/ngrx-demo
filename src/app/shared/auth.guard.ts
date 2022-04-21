import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate() {
    return this.authService.auth$.pipe(
      tap(isAuth => {
        if (isAuth) {
          return;
        }

        this.router.navigate(['auth']);
      })
    );
  }
}
