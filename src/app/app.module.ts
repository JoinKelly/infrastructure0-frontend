import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './_helpers/auth.guard';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyProjectsComponent,
    MyTasksComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [AuthGuard, authInterceptorProviders, NgbActiveModal, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
