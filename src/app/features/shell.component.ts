import { Component } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-shell',
  template: `
    <nav class="flex gap-4 px-8 py-6 mb-6 bg-emerald-300 dark:bg-slate-700 dark:text-white">
      <a exact routerLink="." routerLinkActive="font-semibold" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="settings" routerLinkActive="font-semibold">Ustawienia</a>
      <a routerLink="tasks" routerLinkActive="font-semibold">Lista zadań</a>
      <button class="ml-auto" (click)="logout()">Wyloguj</button>
    </nav>
    <main class="px-8">
      <div *ngIf="user$ | async as user">
        <h3>Użytkownik:</h3>
        <p><span class="font-semibold mr-2">Nazwa: </span>{{ user.username }}</p>
        <p><span class="font-semibold mr-2">Użyj ciemnego motywu: </span>{{ user.settings.darkMode }}</p>
        <p><span class="font-semibold mr-2">Zapisany do newslettera: </span>{{ user.settings.newsletter }}</p>
      </div>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class ShellComponent {
  public user$ = this.userService.user$;

  constructor(private authService: AuthService, private userService: UserService) {}

  public logout() {
    this.authService.logout();
  }
}
