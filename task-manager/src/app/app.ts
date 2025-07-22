import { Component, signal } from '@angular/core';
import { TaskBoard } from './features/task-board/task-board';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [TaskBoard],
  template: `<app-task-board></app-task-board>`,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('task-manager');
}
