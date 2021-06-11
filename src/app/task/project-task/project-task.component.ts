import {Component, OnInit} from '@angular/core';
import {Task} from '../../_model/task.model';
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

  isLoadFailed = false;
  loadErrorMessage = '';
  isSuccess = false;
  fetchMode = 'ALL';

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
          return this.taskService.findAllByProject(this.projectId, this.fetchMode);
        }
      )).subscribe(
      data => {
        this.tasks = data;
      },
      err => {
        this.isLoadFailed = true;
        this.loadErrorMessage = err.error.message;
      }
    );
  }

  showDeleteConfirmPopup(task: Task, deleteConfirmPopup: any): void {
    this.task = task;
    this.modalService.open(deleteConfirmPopup, {backdropClass: 'light-blue-backdrop'});
  }

  deleteTask(id: number, deleteConfirmPopup: any): void {
    if(this.projectId) {
      this.taskService.deleteTask(this.projectId, id).subscribe(
        data => {
          this.isFailed = false;
          this.errorMessage = '';
          this.tasks.forEach( (item, index) => {
            if (item.id === id){
              this.tasks.splice(index, 1);
            }
          });
          this.modalService.dismissAll();
        },
        err => {
          this.isFailed = true;
          this.errorMessage = err.error.message;
        }
      );
    }
  }

  refetchTasks(value: string) {
    if(this.projectId) {
      this.fetchMode = value;
      this.taskService.findAllByProject(this.projectId, value).subscribe(
        data => {
          this.isLoadFailed = false;
          this.tasks = data;
        },
        err => {
          this.isLoadFailed = true;
          this.loadErrorMessage = err.error.message;
        }
      );
    }
  }

  updateState(id: number, newValue: string) {
    this.taskService.updateState(id, newValue).subscribe(
      data => {
        this.isSuccess = true;
        if (this.fetchMode !== 'ALL') {
          this.refetchTasks(this.fetchMode);
        }
      },
      err => {
        this.isLoadFailed = true;
        this.loadErrorMessage = err.error.message;
      }
    );
  }
}
