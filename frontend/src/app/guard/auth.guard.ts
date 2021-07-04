import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private userService: UserService,  private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    }
      this.router.navigate(['/']);
      return false;
  }

  
}
