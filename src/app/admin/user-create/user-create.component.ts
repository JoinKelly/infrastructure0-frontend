import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  form: any = {
    username: null,
    password: null,
    fullName: null,
    email: null
  };

  constructor() {
  }

  ngOnInit(): void {
    console.log('UserCreateComponent');
  }

  onSubmit(): void {
  }

}
