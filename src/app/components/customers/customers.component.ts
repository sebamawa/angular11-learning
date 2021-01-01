import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/customer';

import { CustomerService } from '../../services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  // selectedCustomer: Customer;

  customers: Customer[]; // array de customers

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

  // to remove
  addCustomer() {
    const name = prompt("Enter name: ");
    if (name) {
      const id = this.customers ? this.customers.length + 1 : 0;
      let customer = {
        id: id,
        name: name,
        phone: ''
      }
      this.customers.push(customer);
      // localStorage.setItem("customers", JSON.stringify(this.customers));
    }
  }

  add(name: string, phone: string) {
    name = name.trim();
    phone = phone.trim();
    if (!name) {return;}
    this.customerService.addCustomer({name, phone} as Customer)
      .subscribe(customer => {
        this.customers.push(customer)
      });
  }

  delete(customer: Customer): void {
    let ok = confirm(`Está seguro que desea eliminar el customer: ${customer.name} con id: ${customer.id}`);
    if (ok) {
      // componente tiene responsabilidad de actualizar la lista de customers
      this.customers = this.customers.filter(c => c !== customer);
      // se espera que el customer se elimine con exito del server
      this.customerService.deleteCustomer(customer).subscribe();
    }
  }

}
