import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../_services/project.service';
import {Project, ProjectMember} from '../../_model/project.model';
import {ProjectMemberService} from '../../_services/project-member.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserAddition} from '../../_model/user.model';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent implements OnInit {

  form: any = {
    email: null
  };

  projectId = -1;
  isFailed = false;
  errorMessage = '';
  projectMember: ProjectMember | null | undefined;
  projectMembers: ProjectMember[] = [];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private projectMemberService: ProjectMemberService) {
  }

  ngOnInit(): void {
    let projectMembers$: Observable<ProjectMember[]> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.projectId = Number(params.get('id'));
          return this.projectMemberService.findAllProjectMembers(Number(params.get('id')));
        }
      )
    );
    projectMembers$.subscribe(
      data => {
        this.projectMembers = data;
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(): void {
    const member: any = this.form;
    this.projectMemberService.addProjectMemberByEmail(this.projectId, member.email)
      .subscribe(
        data => {
          this.projectMembers.push(data);
          this.form.email = null;
        },
        err => {
          this.isFailed = true;
          this.errorMessage = err.error.message;
        }
      );
    ;
  }

}
