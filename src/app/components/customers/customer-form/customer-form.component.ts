import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customers.service';
import { Customer } from '../../../interfaces/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  model = new Customer(50, 'Alberto', '099123456');

  submitted = false;

  constructor(
    private customerService: CustomerService
  ) { }

  // onSubmit() { this.submitted = true }

  onSubmit(name: string, phone: string) {
    name = name.trim();
    phone = phone.trim();
    // if (!name || !phone) {return;} // se necesitan ambos campos
    // if (!name || !phone) {
    //   alert('Name and phone are required.');
    //   return;
    // }
    this.customerService.addCustomer({name, phone} as Customer)
      .subscribe(customer => {
        // this.customers.push(customer) // COMO ACCEDO A LA COLECCION
      });
  }

  newCustomer() {
    this.model = new Customer(42, '', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model) }

  ngOnInit(): void {
  }

}
