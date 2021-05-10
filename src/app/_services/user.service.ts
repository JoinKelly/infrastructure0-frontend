import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User, UserAddition} from '../_model/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(environment.userInfoApi);
  }

  findAllUserByAdmin(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.operateUserByAdminApi}/find_all`);
  }

  addUserByAdmin(userAddition: UserAddition): Observable<User> {
    return this.http.post<User>(`${environment.operateUserByAdminApi}/add`, userAddition);
  }

  updateUserByAdmin(userId: number, userAddition: UserAddition): Observable<User> {
    return this.http.put<User>(`${environment.operateUserByAdminApi}/${userId}/update`, userAddition);
  }

  deleteUserByAdmin(userId: number): Observable<User> {
    return this.http.delete<User>(`${environment.operateUserByAdminApi}/${userId}/delete`);
  }
}
