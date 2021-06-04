import { Component, OnInit } from '@angular/core';
import {Project} from '../_model/project.model';
import {ProjectService} from '../_services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  isFailed = false;
  errorMessage = '';
  projects: Project[] = [];

  constructor(private projectService: ProjectService,
              private modalService: NgbModal,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.projectService.findAllMyProjects().subscribe(
      data => {
        this.projects = data;
        this.projects.forEach((value, index) => {
          value.startDateStr = this.datePipe.transform(value.startDate, 'yyyy-MM-dd') as string;
          value.endDateStr = this.datePipe.transform(value.endDate, 'yyyy-MM-dd') as string;
        })
      },
      err => {
      }
    );
  }

}
