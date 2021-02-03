import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Payment } from 'src/app/interfaces/payment';
import { CustomerService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  model = new Payment();
  customers: Customer[];

  constructor(private customersService: CustomerService) { }

  onSubmit() {}

  ngOnInit(): void {
    this.customersService.getCustomers()
      .subscribe(
        customers => this.customers = customers
      );
  }

}
