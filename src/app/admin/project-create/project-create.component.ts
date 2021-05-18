import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User, UserAddition} from '../../_model/user.model';
import {ProjectCreateRequest} from '../../_model/project.model';
import {ProjectService} from '../../_services/project.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  providers: [DatePipe]
})
export class ProjectCreateComponent implements OnInit {

  form: any = {
    title: null,
    description: null,
    leaderId: null,
    startDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    endDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  };

  isFailed = false;
  errorMessage = '';

  users: User[] = [];

  constructor(private userService: UserService,
              private projectService: ProjectService,
              private router: Router,
              private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.userService.findAllUserByAdmin().subscribe(
      data => {
        this.users = data;
      },
      err => {
      }
    );
  }

  onSubmit(): void {
    const projectCreateRequest: ProjectCreateRequest = this.form;
    console.log(projectCreateRequest);

    this.projectService.addProjectByAdmin(projectCreateRequest).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.router.navigateByUrl('/admin/projects');
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

}
