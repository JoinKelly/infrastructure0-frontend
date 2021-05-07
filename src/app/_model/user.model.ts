export interface User {
  id: number;

  username: string;

  fullName: string;

  email: string;

  createdDate: Date;

  updatedDate: Date;

  roles: Role[];
}

export interface Role {
  id: number;

  name: string;
}
