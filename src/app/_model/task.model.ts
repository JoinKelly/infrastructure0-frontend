import {User} from './user.model';
import {Project} from './project.model';
export interface Task {
  id: number;

  title: string;

  description: string;

  deadLine: Date;

  deadLineStr?: string;

  createdDate: Date;

  updatedDate: Date;

  user: User;

  project: Project;
}

export interface TaskCreateRequest {
  title: string;

  description: string;

  startDate: Date;

  deadLine: Date;

  userId: Number;

  projectId: Number;
}
