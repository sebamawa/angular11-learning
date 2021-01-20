import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/app/services/customers.service';
import { Customer } from '../../../interfaces/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  // para enviar nuevo customer tomado del form al padre customers-list
  @Output() newCustomerEmitted = new EventEmitter<Customer>();

  model = new Customer('', '');

  submitted = false;

  constructor(
    private customerService: CustomerService
  ) { }

  // onSubmit() { this.submitted = true }

  onSubmit(name: string, phone: string) {
    // console.log(`name=${name} - phone=${phone}`);
    name = name.trim();
    phone = phone.trim();
    // el padre customers-list se encarga de hacer el post y actualizar la lista de customers
    //this.newCustomerEmitted.emit(new Customer(name, phone));
    this.newCustomerEmitted.emit({name, phone} as Customer);
    this.model.name=''; // se limpia en el template
    this.model.phone='';
    // this.customerService.addCustomer({name, phone} as Customer)
    //   .subscribe(customer => {
    //     // actualizo la lista de customers en el padre customers-list
    //     this.newCustomerEmitted.emit(customer);
    //   });
  }

  // newCustomer() {
  //   this.model = new Customer(42, '', '');
  // }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model) }

  ngOnInit(): void {
  }

}
