import { Component, OnInit } from '@angular/core';
import {User} from '../../_model/user.model';
import {UserService} from '../../_services/user.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isFailed = false;
  errorMessage = '';
  user: User | null | undefined;
  users: User[] = [];
  constructor(private userService: UserService,
              private modalService: NgbModal,
              private ngbActiveModal: NgbActiveModal) { }

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

  showDeleteConfirmPopup(user: User, deleteConfirmPopup: any): void {
    this.user = user;
    this.modalService.open(deleteConfirmPopup, {backdropClass: 'light-blue-backdrop'});
  }

  deleteUser(id: number, deleteConfirmPopup: any): void {
    this.userService.deleteUserByAdmin(id).subscribe(
      data => {
        this.isFailed = false;
        this.errorMessage = '';
        this.users.forEach( (item, index) => {
          if (item.id === id){
            this.users.splice(index, 1);
          }
        });
        this.modalService.dismissAll();
      },
      err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }
}
