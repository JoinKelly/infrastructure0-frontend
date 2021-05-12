import {Component, OnInit} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {UserAddition} from '../../_model/user.model';
import {Router} from '@angular/router';

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

  isFailed = false;
  errorMessage = '';

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('UserCreateComponent');
  }

  onSubmit(): void {
    const userAddition: UserAddition = this.form;

    this.userService.addUserByAdmin(userAddition).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.router.navigateByUrl('/admin');
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

}
