import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/customer';

import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  selectedCustomer: Customer;

  customers: Customer[]; // array de customers

  constructor(private customerService: CustomerService) { }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  addCustomer() {
    let name = prompt("Enter name: ");
    if (name) {
      let customer = {
        id: this.customers.length + 1,
        name: name,
      }
      this.customers.push(customer);
    }
  }

  deleteCustomer(customer: Customer) {
    let ok = confirm("Esta seguro que quiere eliminar el customer ?");
    if (ok) {
      this.selectedCustomer = null; // campo enlazado con CustomerDetailComponent
      this.customers = this.customers.filter(item => item != customer);
    }
  }

}
