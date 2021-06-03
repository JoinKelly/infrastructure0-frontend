import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import {FormsModule} from '@angular/forms';
import { TaskCreateComponent } from './task-create/task-create.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskCreateComponent,
    ProjectTaskComponent,
    TaskUpdateComponent
  ]
})
export class TaskModule {}
