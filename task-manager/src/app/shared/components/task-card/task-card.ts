import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { materialImports } from '../../material/material.imports';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, MatIconModule, materialImports],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
  standalone: true,
})
export class TaskCard {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.task);
  }

  onDelete() {
    this.delete.emit(this.task._id!);
  }

  getStatusClass(): string {
    return this.task.status.toLowerCase().split(' ').join('-');
  }

  getStatusChipColor(): string {
    switch (this.task.status) {
      case 'To Do':
        return '#9e9e9e';
      case 'In Progress':
        return '#ffc107';
      case 'Done':
        return '#4caf50';
      default:
        return '#cccccc';
    }
  }
}
