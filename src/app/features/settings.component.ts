import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-settings',
  template: `
    <hr class="my-6" />
    <h3 class="text-xl">Zmień ustawienia użytkownika:</h3>
    <div *ngIf="user$ | async">
      <label> <input type="checkbox" [formControl]="darkMode" /> użyj ciemnego motywu </label>
      <br />
      <label> <input type="checkbox" [formControl]="newsletter" /> zapisz się do newslettera </label>
    </div>
  `,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public darkMode = new FormControl();
  public newsletter = new FormControl();

  public user$ = this.userService.user$.pipe(
    tap(user => {
      this.darkMode.setValue(user.settings.darkMode, { emitEvent: false });
      this.newsletter.setValue(user.settings.newsletter, { emitEvent: false });
    })
  );

  private _destroy = new Subject<void>();

  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.darkMode.valueChanges.pipe(takeUntil(this._destroy)).subscribe((darkMode: boolean) => {
      this.userService.updateSettings({ darkMode });
    });

    this.newsletter.valueChanges.pipe(takeUntil(this._destroy)).subscribe((newsletter: boolean) => {
      this.userService.updateSettings({ newsletter });
    });
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
