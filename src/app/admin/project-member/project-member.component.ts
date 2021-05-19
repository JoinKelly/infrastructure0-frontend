import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../_services/project.service';
import {Project, ProjectMember} from '../../_model/project.model';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.scss']
})
export class ProjectMemberComponent implements OnInit {

  isFailed = false;
  errorMessage = '';
  projectMember: ProjectMember | null | undefined;
  projectMembers: ProjectMember[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
