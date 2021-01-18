import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';

import { FormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
