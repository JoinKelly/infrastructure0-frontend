import { Component, OnInit } from '@angular/core';
import {Project} from '../../_model/project.model';
import {ProjectService} from '../../_services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  isFailed = false;
  errorMessage = '';
  project: Project | null | undefined;
  projects: Project[] = [];

  constructor(private projectService: ProjectService,
              private modalService: NgbModal,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.projectService.findAllProjectByAdmin().subscribe(
      data => {
        console.log(data);
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

  showDeleteConfirmPopup(project: Project, deleteConfirmPopup: any): void {
    this.project = project;
    this.modalService.open(deleteConfirmPopup, {backdropClass: 'light-blue-backdrop'});
  }

  deleteProject(id: number, deleteConfirmPopup: any): void {
    this.projectService.deleteProjectByAdmin(id).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.projects.forEach( (item, index) => {
          if (item.id === id){
            this.projects.splice(index, 1);
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
