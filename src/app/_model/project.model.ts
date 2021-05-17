import {User} from './user.model';
export interface Project {
  id: number;

  title: string;

  description: string;

  startDate: Date;

  endDate: Date;

  createdDate: Date;

  updatedDate: Date;

  leader: User;
}

export interface ProjectCreateRequest {
  title: string;

  description: string;

  startDate: Date;

  endDate: Date;

  leaderId: Number;
}
