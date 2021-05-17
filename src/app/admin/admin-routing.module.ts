import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from '../_helpers/auth.guard';
import {UserCreateComponent} from './user-create/user-create.component';
import {UsersComponent} from './users/users.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {ProjectsComponent} from './projects/projects.component';

const adminRoutes: Routes = [
  {
    path: 'user-create',
    component: UserCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-update/:id',
    component: UserUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
