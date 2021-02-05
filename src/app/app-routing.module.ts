import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './components/customers/customers-list/customers.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CustomerDetailComponent} from './components/customers/customer-detail/customer-detail.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PaymentFormComponent } from './components/payments/payment-form/payment-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'detail/:id', component: CustomerDetailComponent},
  {path: 'users/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'payment', component: PaymentFormComponent},
  {path: 'payment/:customerId', component: PaymentFormComponent}
];

@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(routes)], // forRoot() para cargar en RouterModule las rutas
    // CommonModule ]
  exports: [RouterModule]
})
export class AppRoutingModule { }
