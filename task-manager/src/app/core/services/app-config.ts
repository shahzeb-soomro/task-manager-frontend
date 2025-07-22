import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  get apiUrl(): string {
    return environment.apiUrl;
  }
}
