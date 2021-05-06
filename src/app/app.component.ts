import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from './_services/user.service';
import {TokenStorageService} from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'infrastructure0-frontend';
  isAuthenticated = false;
  userInfo: any;

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
