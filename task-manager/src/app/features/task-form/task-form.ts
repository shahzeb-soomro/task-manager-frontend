import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { materialImports } from '../../shared/material/material.imports';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule, materialImports],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
  standalone: true,
})
export class TaskForm {
  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();

  formTask: Task = { title: '', status: 'To Do' };

  ngOnChanges(): void {
    this.formTask = this.task
      ? { ...this.task }
      : { title: '', status: 'To Do' };
  }

  onSubmit() {
    this.save.emit({ ...this.formTask });
    this.formTask = { title: '', status: 'To Do' };
  }
}
