import {
    HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserAuth } from '../_services/user-auth';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(private userAuthService: UserAuth,private router:Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getJwtToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) =>{
                console.log(err.status);
                if(err.status === 401){
                    this.router.navigate(['/login']);
                }else if(err.status === 403){
                    this.router.navigate(['/forbidden']);
                }
                return throwError('somthing is wrong');
            }
        )
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
