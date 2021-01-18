import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(email: string, password: string) {
    this.authService.loginUser(email, password)
      .subscribe(token => { 
        console.log(token);
        this.authService.setToken(token);
        this.router.navigateByUrl('/customers');
      });
  }

}
