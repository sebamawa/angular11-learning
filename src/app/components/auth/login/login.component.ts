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
      .subscribe(response => { 
        console.log(response);
        this.authService.setToken(response);
        this.router.navigateByUrl('/customers');
        //this.router.navigate(['/customers']);
        // location.reload();
      });
  }

}
