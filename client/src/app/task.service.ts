import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number | string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/task';

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  create(title: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, { title, completed: false });
  }

  update(id: Task['id'], payload: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: Task['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
