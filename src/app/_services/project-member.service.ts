import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project, ProjectMember} from '../_model/project.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService {

  constructor(private http: HttpClient) {
  }

  findAllProjectMembers(projectId: number): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${environment.operateProjectApi}/project/` + projectId + `/all_member`);
  }

  addProjectMemberByEmail(projectId: number, email: string): Observable<ProjectMember> {
    return this.http.get<ProjectMember>(`${environment.operateProjectApi}/project/` + projectId + `/add_member_by_email?email=` + email);
  }
}
