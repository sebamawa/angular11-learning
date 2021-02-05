import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Payment } from 'src/app/interfaces/payment';
import { CustomerService } from 'src/app/services/customers.service';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  model = new Payment();
  customers: Customer[];
  customerIdSelected: number;

  constructor(
    private customersService: CustomerService,
    private paymentService: PaymentsService) { }

  onSubmit(datePayment: any, customerId: number, description: string, amount: number, pending: boolean) {
    // console.log(typeof(customerId));
    // let customerId: number = parseInt(idCustomer);
    // console.log(typeof(customerId));
    const [year, month, day] = datePayment.split("-")
    const date = new Date(year, month - 1, day)
    
    const payment: Payment = {date, customerId, description, amount, pending} as Payment;
    this.paymentService.addPayment(payment).subscribe();
  }

  selectChangeHandler (event: any) {
    //update the ui
    // console.log(event.target.value); // id de customer del option del select clickeado
    // console.log(event.target.value);
    this.customerIdSelected = parseInt(event.target.value);
  }

  onChangeDate(value){
    // console.log(value);
  }

  ngOnInit(): void {
    this.model.date = new Date();
    this.customersService.getCustomers()
      .subscribe(
        customers => this.customers = customers
      );
  }

}
