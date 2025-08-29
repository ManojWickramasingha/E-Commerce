import {ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { User } from '../_services/user';
import { RegisterUser } from '../_module/register.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,MatIconModule,MatInputModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class Register {
  constructor(private userService:User,private router:Router){}
  public registerUser : RegisterUser = {
    username:'',
    firstName:'',
    lastName:'',
    password:''
  }

  register(registerForm:NgForm){
    console.log(registerForm);
    this.userService.register(registerForm).subscribe({
      next:res => {
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
