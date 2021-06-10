import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project, ProjectCreateRequest} from '../_model/project.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Task, TaskCreateRequest} from '../_model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  addTask(projectId: number, taskCreateRequest: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(`${environment.operateTaskApi}/` + projectId + `/` + `add`, taskCreateRequest);
  }

  updateTask(projectId: number, id: number, taskCreateRequest: TaskCreateRequest): Observable<Task> {
    return this.http.put<Task>(`${environment.operateTaskApi}/` + projectId + `/` + id + `/update`, taskCreateRequest);
  }

  findAllByProject(projectId: number, fetchMode: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.operateTaskApi}/find_all_by_project/` + projectId + `?fetchMode=` + fetchMode);
  }

  findTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${environment.operateTaskApi}/find_by_id/` + id);
  }

  deleteTask(projectId: number, id: number): Observable<any> {
    return this.http.delete<any>(`${environment.operateTaskApi}/` + projectId + `/` + id + `/delete`);
  }

  findAllMyTasks(fetchMode: string): Observable<Task[]> {
  return this.http.get<Task[]>(`${environment.operateTaskApi}/my_tasks?fetchMode=` + fetchMode);
  }

  updateState(id: number, state: string): Observable<Task> {
    return this.http.put<Task>(`${environment.operateTaskApi}/` + id + `/update_state?state=` + state, {});
  }
}
