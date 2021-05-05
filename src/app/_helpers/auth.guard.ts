import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorageService.getToken() === null) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
