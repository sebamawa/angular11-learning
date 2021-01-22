import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLogged: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.checkUserLogged();
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

  checkUserLoggued(isLoggued: boolean){
    this.isLogged = isLoggued;
    console.log(this.isLogged);
  }
}
