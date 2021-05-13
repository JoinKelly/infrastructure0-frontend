import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './_services/user.service';
import {TokenStorageService} from './_services/token-storage.service';
import {User} from './_model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'infrastructure0-frontend';
  isAuthenticated = false;
  userInfo: User | null | undefined;
  isAdmin = false;

  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.tokenStorageService.getToken() !== null;
    if (this.isAuthenticated) {
      this.userService.getUserInfo().subscribe(
        data => {
          console.log(data);
          this.userInfo = data;
          if (this.userInfo.roles !== undefined && this.userInfo.roles !== null) {
            this.userInfo.roles.forEach((value => {
              if (value.name === 'ADMINISTRATOR') {
                this.isAdmin = true;
              }
            }));
          }
        },
        err => {
        }
      );
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
