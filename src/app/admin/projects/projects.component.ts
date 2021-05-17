import { Component, OnInit } from '@angular/core';
import {User} from '../../_model/user.model';
import {Project} from '../../_model/project.model';
import {ProjectService} from '../../_services/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
              private modalService: NgbModal) { }

  ngOnInit(): void {

    this.projectService.findAllProjectByAdmin().subscribe(
      data => {
        console.log(data);
        this.projects = data;
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
