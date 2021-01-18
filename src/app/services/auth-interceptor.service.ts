import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // obtengo jws token del localstorage
    const jwsToken = localStorage.getItem('jws_token');
    let request = req;
    if (jwsToken) {
      // agrego token al header del request
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ jwsToken }`
        }
      });
    } else { // redirijo a login
      this.router.navigateByUrl('/users/login');
    }
    return next.handle(request)
      .pipe(
        catchError(error => {
          alert(JSON.stringify(error.error));
          return of(error)
        })
      );
  }
}
