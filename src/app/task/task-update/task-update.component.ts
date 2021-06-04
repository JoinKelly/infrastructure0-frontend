import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TaskService} from '../../_services/task.service';
import {ProjectMemberService} from '../../_services/project-member.service';
import {ProjectMember} from '../../_model/project.model';
import {switchMap} from 'rxjs/operators';
import {TaskCreateRequest} from '../../_model/task.model';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {

  form: any = {
    id: null,
    title: null,
    description: null,
    userId: null,
    projectId: null,
    deadLine: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  projectId: number | null | undefined;

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
        this.members = data;
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          return this.taskService.findTaskById(Number(params.get('id')));
        }
      )).subscribe(
      data => {

        this.form.id = data.id;
        this.form.title = data.title;
        this.form.description = data.description;
        this.form.userId = data.user?.id;
        this.form.projectId = data.project.id;
        this.form.deadLine = this.datePipe.transform(data.deadLine, 'yyyy-MM-dd');
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(): void {

    const taskCreateRequest: TaskCreateRequest = this.form;

    if (this.projectId) {
      this.taskService.updateTask(this.projectId, this.form.id, taskCreateRequest).subscribe(
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

}
