import { Component, OnInit } from '@angular/core';
import {Task} from '../_model/task.model';
import {TaskService} from '../_services/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  isLoadFailed = false;
  loadErrorMessage = '';
  isSuccess = false;
  fetchMode = 'ALL';

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.findAllMyTasks(this.fetchMode).subscribe(
      data => {
        this.tasks = data;
      },
      err => {
        this.isLoadFailed = true;
        this.loadErrorMessage = err.error.message;
      }
    );
  }

  updateState(id: number, newValue: string) {
    this.taskService.updateState(id, newValue).subscribe(
      data => {
        this.isSuccess = true;
      },
      err => {
        this.isLoadFailed = true;
        this.loadErrorMessage = err.error.message;
      }
    );
  }

  refetchTasks(value: string) {
    this.taskService.findAllMyTasks(value).subscribe(
      data => {
        this.tasks = data;
        this.isLoadFailed = false;
      },
      err => {
        this.isLoadFailed = true;
        this.loadErrorMessage = err.error.message;
      }
    );
  }

}
