import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './components/customers/customers.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CustomerDetailComponent} from './components/customer-detail/customer-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'detail/:id', component: CustomerDetailComponent}
];

@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(routes)], // forRoot() para cargar en RouterModule las rutas
    // CommonModule ]
  exports: [RouterModule]
})
export class AppRoutingModule { }
