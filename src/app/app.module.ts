import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AuthComponent } from './auth/auth.component';
import { ShellComponent } from '@features/shell.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from '@shared/let.directive';
import { SettingsComponent } from '@features/settings.component';
import { TasksComponent } from '@features/tasks/tasks.component';

@NgModule({
  declarations: [AppComponent, LetDirective, AuthComponent, ShellComponent, SettingsComponent, TasksComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, StoreModule.forRoot({}, {})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
