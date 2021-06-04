import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Project, ProjectCreateRequest} from '../_model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  findAllProjectByAdmin(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.operateProjectByAdminApi}/find_all`);
  }

  addProjectByAdmin(projectCreateRequest: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(`${environment.operateProjectByAdminApi}/add`, projectCreateRequest);
  }

  updateProjectByAdmin(projectId: number, projectCreateRequest: ProjectCreateRequest): Observable<Project> {
    return this.http.put<Project>(`${environment.operateProjectByAdminApi}/${projectId}/update`, projectCreateRequest);
  }

  deleteProjectByAdmin(projectId: number): Observable<Project> {
    return this.http.delete<Project>(`${environment.operateProjectByAdminApi}/${projectId}/delete`);
  }

  findById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${environment.findProjectByIdApi}/${projectId}`);
  }

  findAllMyProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.operateProjectApi}/my_projects`);
  }
}
