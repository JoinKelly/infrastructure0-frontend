import { Component, OnInit } from '@angular/core';
import {User} from '../../_model/user.model';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllUserByAdmin().subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      err => {
      }
    );
  }

}
