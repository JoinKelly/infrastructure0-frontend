import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {User} from '../_model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username?: string | null;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      data => {
        console.log(data);
        this.username = data.username;
      },
      err => {
      }
    );
  }
}
