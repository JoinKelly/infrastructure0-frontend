import {Component, OnInit} from '@angular/core';
import {User} from '../../_model/user.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ProjectCreateRequest, ProjectMember} from '../../_model/project.model';
import {TaskService} from '../../_services/task.service';
import {TaskCreateRequest} from '../../_model/task.model';
import {switchMap} from 'rxjs/operators';
import {ProjectService} from '../../_services/project.service';
import {ProjectMemberService} from '../../_services/project-member.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  projectId: number | null | undefined;
  form: any = {
    title: null,
    description: null,
    userId: null,
    projectId: null,
    deadLine: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  isFailed = false;
  errorMessage = '';

  members: ProjectMember[] = [];

  constructor(private router: Router,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private taskService: TaskService,
              private projectMemberService: ProjectMemberService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.projectId = Number(params.get('projectId'));
          return this.projectMemberService.findAllProjectMembers(this.projectId);
        }
      )).subscribe(
      data => {
        this.form.projectId = this.projectId;
        this.members = data;
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(): void {

    const taskCreateRequest: TaskCreateRequest = this.form;

    this.taskService.addTask(taskCreateRequest).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.router.navigateByUrl('projects/tasks/' + this.projectId);
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

}
