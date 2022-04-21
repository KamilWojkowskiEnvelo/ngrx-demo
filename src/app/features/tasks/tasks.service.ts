import { Injectable } from '@angular/core';
import { idGenerator } from '@shared/id-generator';
import { of } from 'rxjs';

export interface Task {
  description: string;
  id: number;
  status: 'done' | 'todo' | 'in progress' | 'onhold';
}

export type TaskStatus = Task['status'];

@Injectable()
export class TasksService {
  public getTasks() {
    return of<Task[]>([
      {
        description: 'Ogarnij podstawy NgRx',
        id: idGenerator(),
        status: 'todo',
      },
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addTask(description: string) {
    //todo: add task
  }
}
