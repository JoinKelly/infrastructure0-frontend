import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../_helpers/auth.guard';
import {TaskCreateComponent} from './task-create/task-create.component';
import {ProjectTaskComponent} from './project-task/project-task.component';

const taskRoutes: Routes = [
  {
    path: 'tasks/:projectId/task-create',
    component: TaskCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:projectId',
    component: ProjectTaskComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(taskRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TaskRoutingModule {
}
