import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root',
})
export class User {
  PATH_URL_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({ No_Auth: 'True' });
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuth
  ) {}

  public login(loginData: NgForm) {
    return this.httpClient.post(
      this.PATH_URL_API + '/authenticate',
      loginData.value,
      { headers: this.requestHeader }
    );
  }

  public matchRoles(allowedRoles: any): boolean {
    let isMatch = false;

    const userRoles: any = JSON.parse(this.userAuthService.getRoles()+"");
    
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          //console.log(userRoles[i]);
          if (userRoles[i].name === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return userRoles;
  }
}
