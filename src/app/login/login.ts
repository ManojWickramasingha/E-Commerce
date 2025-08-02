import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../_services/user';
import { UserAuth } from '../_services/user-auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private userService: User,private userAuthService:UserAuth,private router:Router) {}
  login(loginForm: NgForm) {
    this.userService.login(loginForm).subscribe({
      next: (response:any) => {
        this.userAuthService.setRoles(response.userDTO.roles);
        this.userAuthService.setJwtToken(response.token);

        const role = response.userDTO.roles[0].name;
        if(role == 'Admin'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/user']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
