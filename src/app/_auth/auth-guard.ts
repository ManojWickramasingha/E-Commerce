import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserAuth } from '../_services/user-auth';
import { User } from '../_services/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuth,
    private router: Router,
    private userService: User
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userAuthService.getJwtToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      console.log(role);
      if (role) {
        const match = this.userService.matchRoles(role);
        console.log(match);
        if (match) {
          return true;
        } else {
          console.log("awa");
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
