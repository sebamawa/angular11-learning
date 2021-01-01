import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  //@Input() customer: Customer;
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // obtengo id de la ruta
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back(); // el service Location usa el stack del historico del browser
  }

  deleteCustomer(id: number) {
    alert("Por ahora no se eliminan customers (http) ...");
  }

  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack())
  }

}
