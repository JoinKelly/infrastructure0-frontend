import {Component, OnInit} from '@angular/core';
import {User, UserAddition, UserUpdateRequest} from '../../_model/user.model';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../../_services/user.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  user$: Observable<User> | null | undefined;
  isFailed = false;
  errorMessage = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.findById(Number(params.get('id'))))
    );
    this.user$.subscribe(
      data => {
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  onSubmit(user: User): void {

    const userAddition: UserUpdateRequest = {
      fullName: user.email,
      email: user.email
    };

    this.userService.updateUserByAdmin(user.id, userAddition).subscribe(
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
