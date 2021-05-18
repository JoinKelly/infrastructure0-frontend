import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../_model/user.model';
import {Project, ProjectCreateRequest} from '../../_model/project.model';
import {UserService} from '../../_services/user.service';
import {ProjectService} from '../../_services/project.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent implements OnInit {

  form: any = {
    id: null,
    title: null,
    description: null,
    leaderId: null,
    startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  users: User[] = [];

  isFailed = false;
  errorMessage = '';

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    this.userService.findAllUserByAdmin().subscribe(
      data => {
        this.users = data;
      },
      err => {
      }
    );

    let project$: Observable<Project> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.projectService.findById(Number(params.get('id'))))
    );
    project$.subscribe(
      data => {
        this.form.id = data.id;
        this.form.title = data.title;
        this.form.description = data.description;
        this.form.startDate = this.datePipe.transform(data.startDate, 'yyyy-MM-dd');
        this.form.endDate = this.datePipe.transform(data.endDate, 'yyyy-MM-dd');
        if (data.leader !== undefined && data.leader !== null) {
          this.form.leaderId = data.leader.id;
        }
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(projectId: number): void {
    const projectUpdateRequest: ProjectCreateRequest = this.form;
    console.log(projectUpdateRequest);

    this.projectService.updateProjectByAdmin(projectId, projectUpdateRequest).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.router.navigateByUrl('/admin/projects');
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

}
