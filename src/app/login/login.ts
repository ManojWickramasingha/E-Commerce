import { ChangeDetectionStrategy,Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../_services/user';
import { UserAuth } from '../_services/user-auth';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-login',
  imports: [FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Login {
  constructor(private userService: User,private userAuthService:UserAuth,private router:Router) {}
  login(loginForm: NgForm) {
    this.userService.login(loginForm).subscribe({
      next: (response:any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setJwtToken(response.token);

        const role = response.user.roles[0].name;
        if(role == 'admin'){
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

  register(){
    this.router.navigate(['/register']);
  }
}
