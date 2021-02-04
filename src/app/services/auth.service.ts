import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersApiUrl = 'http://localhost:3000'; 

  // para mostrar items en el navbar si el usuario esta logueado o no
  // si se recarga la pagina solo verifica que el token esta en el localstorage
  private infoUserSource = new BehaviorSubject<Object>({isLoggued: this.checkUserLogged(), username:''});
  public infoUser$ = this.infoUserSource.asObservable(); 

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
        tap(_ => this.infoUserSource.next({isLoggued: true, username: this.getInfoUserLoggued().username})),
        catchError(this.handleError<User>(`loginUser()`))
      );
  }

  setToken(response: Object): void{
    localStorage.setItem("jws_token", Object.values(response)[0]);
    localStorage.setItem("username", (Object.values(response)[1]).username);
  }

  private getToken(): string {
    return localStorage.getItem("jws_token");
  }

  getInfoUserLoggued() {
    return {
      token: localStorage.getItem("jws_token"),
      username: localStorage.getItem("username")
    }
  }

  // private getCurrentUser(): User {
  //   let user_string = localStorage.getItem("currentUser");
  // }

  logoutUser(): void {
    // let jwsToken = localStorage.getItem('JWSToken');
    localStorage.removeItem('jws_token');
    this.infoUserSource.next({isLoggued: false, username:''});
    // window.location.reload();
    // no es necesario hacer logout en el server
    //this.newCustomerEmitted.emit({name, phone} as Customer);
    this.router.navigateByUrl("users/login");
  }

  checkUserLogged(): boolean {
    // mejorar checkeo de user logeado
    // solo verifica si esta el token en el localstorage
    let tk = this.getToken();
    return tk != undefined;
    // if (tk)
    //   return true;
    // else
    //   return false;
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
