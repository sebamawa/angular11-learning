import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private customerService: CustomerService,
    private router: Router 
  ) { }

  getCustomersPerCustomer(id) {
    this.customerService.getPaymentsPerCustomer(id).subscribe(
      payments => this.payments = payments
    );
  }

  addPaymentFromCustomer() {
    this.router.navigateByUrl(`payment/${this.customerId}`);
  }

  ngOnInit(): void {
    this.getCustomersPerCustomer(this.customerId);
  }

}
