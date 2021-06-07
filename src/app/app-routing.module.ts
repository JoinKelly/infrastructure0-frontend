import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_helpers/auth.guard';
import {HomeComponent} from './home/home.component';
import {MyProjectsComponent} from './my-projects/my-projects.component';
import {MyTasksComponent} from './my-tasks/my-tasks.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'my-projects', component: MyProjectsComponent, canActivate: [AuthGuard]},
  {path: 'my-tasks', component: MyTasksComponent, canActivate: [AuthGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
