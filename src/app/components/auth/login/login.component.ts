import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: {
    email: "emaildeprueba@gmail.com",
    password: "123"
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(email: string, password: string) {
    this.authService.loginUser(email, password)
      .subscribe(token => console.log(token));
  }

}
