import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterActions } from 'app/store/counter';
import { AppState } from 'app/store/app.state';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-settings',
  template: `
    <hr class="my-6" />
    <h3 class="text-xl">Zmień ustawienia użytkownika:</h3>
    <div *ngIf="user$ | async">
      <label>
        <input type="checkbox" [formControl]="darkMode" /> użyj ciemnego motywu
      </label>
      <br />
      <label>
        <input type="checkbox" [formControl]="newsletter" /> zapisz się do newslettera
      </label>
    </div>

    <button class="bg-slate-300" (click)="add()">add 1 to current value</button>
    <button class="bg-slate-600" (click)="addN()">add n</button>
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

  constructor(private userService: UserService, private store: Store<AppState>) {}

  public ngOnInit() {
    this.darkMode.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe((darkMode: boolean) => {
        this.userService.updateSettings({ darkMode });
      });

    this.newsletter.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe((newsletter: boolean) => {
        this.userService.updateSettings({ newsletter });
      });
  }

  public add() {
    this.store.dispatch(CounterActions.addOne());
  }

  public addN() {
    const value = prompt('ile?');

    this.store.dispatch(CounterActions.add({ value: value ? +value : 0 }));
  }

  public ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
