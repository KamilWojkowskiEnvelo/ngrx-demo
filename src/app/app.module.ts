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
import { AppState } from './store/app.state';
import { counterReducer } from './store/counter/counter.reducer';
import { authReducer } from './store/auth';

@NgModule({
  declarations: [
    AppComponent,
    LetDirective,
    AuthComponent,
    ShellComponent,
    SettingsComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot<AppState>({
      counter: counterReducer,
      auth: authReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
