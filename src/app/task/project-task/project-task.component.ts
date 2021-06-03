import {Component, OnInit} from '@angular/core';
import {ProjectCreateRequest, ProjectMember} from '../../_model/project.model';
import {Task} from '../../_model/task.model';
import {ProjectMemberService} from '../../_services/project-member.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TaskService} from '../../_services/task.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {

  projectId = -1;
  isFailed = false;
  errorMessage = '';
  task: Task | null | undefined;
  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.projectId = Number(params.get('projectId'));
          return this.taskService.findAllByProject(this.projectId);
        }
      )).subscribe(
      data => {
        this.tasks = data;
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  showDeleteConfirmPopup(task: Task, deleteConfirmPopup: any): void {
    this.task = task;
    this.modalService.open(deleteConfirmPopup, {backdropClass: 'light-blue-backdrop'});
  }

}
