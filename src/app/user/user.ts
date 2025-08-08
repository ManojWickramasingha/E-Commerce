import { Component, OnInit } from '@angular/core';
import { User as user } from '../_services/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  constructor(private userService: user) {}
  ngOnInit(): void {
    this.forUser();
  }
  public message: string = '';
  forUser() {
    this.userService.forUser().subscribe({
      next: (response) => {
        console.log(response);
        this.message = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
