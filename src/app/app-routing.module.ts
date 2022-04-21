import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from '@features/settings.component';
import { ShellComponent } from '@features/shell.component';
import { TasksComponent } from '@features/tasks/tasks.component';
import { AuthGuard } from '@shared/auth.guard';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: 'app',
        canActivate: [AuthGuard],
        component: ShellComponent,
        children: [
          {
            path: 'settings',
            component: SettingsComponent,
          },
          {
            path: 'tasks',
            component: TasksComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app',
      },
      {
        path: '**',
        redirectTo: 'auth',
      },
    ] as Routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
