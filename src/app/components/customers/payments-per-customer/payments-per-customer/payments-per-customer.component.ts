import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/app/interfaces/payment';
import { CustomerService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-payments-per-customer',
  templateUrl: './payments-per-customer.component.html',
  styleUrls: ['./payments-per-customer.component.css']
})
export class PaymentsPerCustomerComponent implements OnInit {

  payments: Payment[];
  @Input() customerId: number;

  constructor(
    private customerService: CustomerService 
  ) { }

  getCustomersPerCustomer(id) {
    this.customerService.getPaymentsPerCustomer(id).subscribe(
      payments => this.payments = payments
    );
  }

  ngOnInit(): void {
    this.getCustomersPerCustomer(this.customerId);
  }

}
