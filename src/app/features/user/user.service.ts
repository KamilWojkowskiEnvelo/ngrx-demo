import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  username: string;
  settings: {
    newsletter: boolean;
    darkMode: boolean;
  };
}

export type UserSettings = User['settings'];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: BehaviorSubject<User>;

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(user: User) {
    document.documentElement.classList[user.settings.darkMode ? 'add' : 'remove']('dark');
    this.user = new BehaviorSubject(user);
  }

  public updateSettings(settingsToUpdate: Partial<User['settings']>) {
    if ('darkMode' in settingsToUpdate) {
      document.documentElement.classList[settingsToUpdate.darkMode ? 'add' : 'remove']('dark');
    }

    this.user.next({
      ...this.user.value,
      settings: {
        ...this.user.value.settings,
        ...settingsToUpdate,
      },
    });

    localStorage.setItem('user', JSON.stringify(this.user.value));
  }
}
