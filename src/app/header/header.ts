import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../_services/user-auth';
import { CommonModule } from '@angular/common';
import { User } from '../_services/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private userAuthService: UserAuth,
    private router: Router,
    private userService: User
  ) {}

  public isLogin(): boolean {
    return this.userAuthService.isLogin();
  }

  public logOut(): void {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

  public roleMatch(allowedRoles: any) {
    return this.userService.matchRoles(allowedRoles);
  
  }
}
