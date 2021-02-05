import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../interfaces/customer';

import { CustomerService } from '../../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  // selectedCustomer: Customer;

  customers: Customer[]; // array de customers
  enableAddCustomer: boolean = false;

  constructor(private customerService: CustomerService) { }

  // onSelect(customer: Customer): void {
  //   this.selectedCustomer = customer;
  // }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  // para form con FormModule
  addCustomer(customer: Customer) {
    if (customer) {
      this.customerService.addCustomer(customer)
      .subscribe(customer => {
        this.customers.push(customer)
      });      
    } 
  }

  add(name: string, phone: string) {
    name = name.trim();
    phone = phone.trim();
    // if (!name || !phone) {return;} // se necesitan ambos campos
    if (!name || !phone) {
      alert('Name and phone are required.');
      return;
    }
    this.customerService.addCustomer({name, phone} as Customer)
      .subscribe(customer => {
        this.customers.push(customer)
      });
  }

  delete(customer: Customer): void {
    let ok = confirm(`Está seguro que desea eliminar el customer: ${customer} con id: ${customer.id}`);
    if (ok) {
      // componente tiene responsabilidad de actualizar la lista de customers
      this.customers = this.customers.filter(c => c !== customer);
      // se espera que el customer se elimine con exito del server
      this.customerService.deleteCustomer(customer).subscribe();
    }
  }

}
