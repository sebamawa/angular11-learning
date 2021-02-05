import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Payment } from 'src/app/interfaces/payment';
import { CustomerService } from 'src/app/services/customers.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Input() clienteId: number;
  model = new Payment(null, null, '', false, null);
  customers: Customer[];
  selectedCustomer: Customer;

  constructor(
    private customersService: CustomerService,
    private paymentService: PaymentsService,
    private route: ActivatedRoute) {}

  onSubmit(datePayment: any, customer: Customer, description: string, amount: number, pending: boolean) {
    // console.log(typeof(customerId));
    // let customerId: number = parseInt(idCustomer);
    // console.log(typeof(customerId));
    const [year, month, day] = datePayment.split("-")
    const date = new Date(year, month - 1, day)
    
    // const payment = new Payment(date, customerId, description, amount, pending); //no matchea por CustomerId
    const customerId = customer.id;
    const payment = {date, customerId, description, amount, pending} ;//as Payment; // NO es necesario el as
    console.log(payment);
    this.paymentService.addPayment(payment)
      .subscribe(); //(() => this.router.navigateByUrl(`detail/${customerId}`));
  }

  onChangeSelectOption(customer) {
    this.selectedCustomer  = customer;
    console.log(this.selectedCustomer);
  }

  onChangeDate($event) {}

  ngOnInit(): void {
    //this.model.date = new Date();
    const customerId = +this.route.snapshot.paramMap.get('customerId'); // obtengo id de la ruta
    if (customerId) {
      // this.model.description = "Esto es una prueba"; // OK
      const c = new Customer("Sebastian Martinez", "123", 100);
      this.selectedCustomer = c;
      console.log(this.model.customer);
    }
    this.customersService.getCustomers()
      .subscribe(
        customers => this.customers = customers
      );
  }
}
