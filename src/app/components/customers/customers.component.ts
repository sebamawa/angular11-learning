import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/customer';

import { CUSTOMERS } from '../../mock-data/mock-customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers = CUSTOMERS; // array de customers

  selectedCustomer: Customer;

  constructor() { }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  ngOnInit(): void {
  }

}
