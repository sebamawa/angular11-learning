import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Subject } from "rxjs";
import { Customer } from '../interfaces/customer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private isLoggedSubjectSource = new Subject<void>();
  //public isLoggedSubject$ = this.isLoggedSubjectSource.asObservable();
  @Output() isUserLogguedEmmit = new EventEmitter<boolean>();

  private usersApiUrl = 'http://localhost:3000'; 

  constructor(
    private http: HttpClient,
    private router: Router) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  registerUser(realm: string, username: string, email: string, password: string): Observable<User> {
    const url = `${this.usersApiUrl}\signup`;

    return this.http.post<User>(url, {realm, username, email, password},
      this.httpOptions); //{ headers: this.httpOptions.headers });
    //.pipe()
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.usersApiUrl}/users/login`;

    return this.http
      .post<string>(url, {email, password}, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>(`loginUser()`))
      );
  }

  setToken(token: string): void{
    localStorage.setItem("jws_token", Object.values(token)[0]);
  }

  private getToken(): string {
    return localStorage.getItem("jws_token");
  }

  // private getCurrentUser(): User {
  //   let user_string = localStorage.getItem("currentUser");
  // }

  logoutUser(): void {
    // let jwsToken = localStorage.getItem('JWSToken');
    localStorage.removeItem('jws_token');
    // window.location.reload();
    // no es necesario hacer logout en el server
    //this.newCustomerEmitted.emit({name, phone} as Customer);
    this.isUserLogguedEmmit.emit(false);
    this.router.navigateByUrl("users/login");
  }

  checkUserLogged(): boolean {
    // mejorar checkeo de user logeado
    // solo verifica si esta el token en el localstorage
    let tk = this.getToken();
    if (tk)
      return true;
    else
      return false;
  }

  /**
   * maneja la operacion Http que falla y permite a la app continuar
   * @param operation - nombre de la operacion que falla
   * @param result - valor opcional para retornar un resultado Observable
   */
  private handleError<T>(operation = 'opeation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      // la app continua corriendo retornando un resultado vacio
      return of(result as T);
    } 
  } 
}
