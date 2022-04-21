import { Component } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  styles: [
    `
      li {
        list-style-type: '⚪';
      }
    `,
  ],
  template: `
    <hr class="my-6" />

    <input
      #input
      placeholder="Nowe zadanie"
      class="border-b-2 focus:outline-none focus:border-b-black"
      (keyup.enter)="addTask(input.value)" />

    <ul class="mt-4 ml-4">
      <li class="pl-2" *ngFor="let task of tasks$ | async">{{ task.description }}</li>
    </ul>
  `,
})
export class TasksComponent {
  public tasks$ = this.tasksService.getTasks();

  constructor(private tasksService: TasksService) {}

  public addTask(description: string) {
    this.tasksService.addTask(description);
  }
}
