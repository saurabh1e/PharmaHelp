import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor( private userService: UserService, private router: Router) {

  }

  checkLogin(url: string): boolean {
    if (this.userService.user) {
      return true;
    }

    this.userService.redirectUrl = url;

    this.router.navigate(['/login']).then();
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
