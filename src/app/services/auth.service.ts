import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersApiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  registerUser(realm: string, username: string, email: string, password: string): Observable<User> {
    const url = `${this.usersApiUrl}\signup`;

    return this.http.post<User>(url, {realm, username, email, password},
      { headers: this.httpOptions.headers });
    //.pipe()
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.usersApiUrl}/users/login`;

    return this.http
      .post<string>(url, {email, password}, {headers: this.httpOptions.headers})
      ;//.pipe(data => );
  }

  private setToken(token): void{
    localStorage.setItem("JWSToken", token);
  }

  private getToken(): string {
    return localStorage.getItem("JWSToken");
  }

  // private getCurrentUser(): User {
  //   let user_string = localStorage.getItem("currentUser");
  // }

  logoutUser() {
    // let jwsToken = localStorage.getItem('JWSToken');
    localStorage.removeItem('JWSToken');
    // no es necesario hacer logout en el server
  }
}
