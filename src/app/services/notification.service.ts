import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly messages = signal<ToastMessage[]>([]);
  private nextId = 1;

  success(message: string): void {
    this.push(message, 'success');
  }

  error(message: string): void {
    this.push(message, 'error');
  }

  info(message: string): void {
    this.push(message, 'info');
  }

  dismiss(id: number): void {
    this.messages.update((messages) => messages.filter((message) => message.id !== id));
  }

  private push(message: string, type: ToastMessage['type']): void {
    const id = this.nextId++;
    this.messages.update((messages) => [...messages, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3000);
  }
}
