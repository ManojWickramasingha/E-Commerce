import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuth {
  
  public setRoles(roles:[]):void{
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles():[]{
    return JSON.parse( JSON.stringify(localStorage.getItem("roles")));
  }

  public setJwtToken(jwtToken:string):void{
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getJwtToken():string{
    return  JSON.stringify(localStorage.getItem("jwtToken"));
  }

  public clear():void{
    localStorage.clear();
  }

  public isLogin():boolean{
    return (Boolean)(this.getRoles() && this.getJwtToken());
  }

  public isAdmin():boolean{
    let userRoles:any = JSON.parse(this.getRoles()+"");
    return userRoles[0].name === 'admin';
  }


}
