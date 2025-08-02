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
      if (role) {
        const match = this.userService.matchRoles(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
