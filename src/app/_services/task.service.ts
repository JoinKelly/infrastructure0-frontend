import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project, ProjectCreateRequest} from '../_model/project.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Task, TaskCreateRequest} from '../_model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTask(taskCreateRequest: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(`${environment.operateTaskApi}/add`, taskCreateRequest);
  }

  findAllByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.operateTaskApi}/find_all_by_project/` + projectId);
  }
}
