import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../../shared/components/task-card/task-card';
import { materialImports } from '../../shared/material/material.imports';

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, DragDropModule, TaskCard, TaskForm, materialImports],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
  standalone: true,
})
export class TaskBoard {
  tasks: Task[] = [];
  selectedTask?: Task;

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  async loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log('Tasks loaded:', tasks);
      this.tasks = [...tasks].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      this.cd.detectChanges();
    });
  }

  handleSave(task: any): void {
    if (this.selectedTask) {
      this.onUpdate(task);
    } else {
      this.onCreate(task);
    }
  }

  onCreate(task: Task): void {
    this.taskService.createTask(task).subscribe(() => {
      this.loadTasks();
      this.selectedTask = undefined;
    });
  }

  onUpdate(task: Task): void {
    if (!task._id) return;
    this.taskService
      .updateTask(task._id, task)
      .subscribe(() => this.loadTasks());
    this.selectedTask = undefined;
  }

  onDelete(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  onEditRequest(task: Task): void {
    this.selectedTask = { ...task };
  }

  drop(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  trackByTask(index: number, task: Task): string {
    return task._id!;
  }
}
