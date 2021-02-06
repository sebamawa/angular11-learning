import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { Payment } from 'src/app/interfaces/payment';
import { CustomerService } from 'src/app/services/customers.service';
import { PaymentsService } from 'src/app/services/payments.service';
//import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Input() clienteId: number;
  model = new Payment(new Date().toISOString().slice(0,10), null, '', false, null);
  customers: Customer[] = []; //[new Customer("Fulanito", "099", 100)];
  selectedCustomer: Customer;
  customerAlreadySelected: boolean = false;
  // dateString: string = "2021-11-11";

  constructor(
    private customersService: CustomerService,
    private paymentService: PaymentsService,
    private route: ActivatedRoute,
    private router: Router) {
      //const customerId = +this.route.snapshot.paramMap.get('customerId'); // obtengo id de la ruta
      console.log(this.customers);
    }

  onSubmit(date: string, customer: Customer, description: string, amount: number, pending: boolean) {
    // const [year, month, day] = dateString.split("-")
    // const date = new Date(year, month - 1, day)
    // const payment = new Payment(date, customerId, description, amount, pending); //no matchea por CustomerId
    // const customerId = customer.id;
    const payment = {date, customer, description, amount, pending} ;//as Payment; // NO es necesario el as
    // console.log(payment);
    this.paymentService.addPayment(payment)
      .subscribe(payment => this.router.navigateByUrl(`detail/${customer.id}`));
  }

  onChangeSelectOption(customer) {
    this.selectedCustomer  = customer;
    console.log(this.selectedCustomer);
  }

  onChangeDate($event) {}

  ngOnInit(): void {
    // this.model.date = new Date(Date.parse("2021-10-12"));
    const customerId = +this.route.snapshot.paramMap.get('customerId'); // obtengo id de la ruta
    // si es un pago para cliente ya elegido (desde details cliente)
    if (customerId) {
      this.customersService.getCustomer(customerId)
        .subscribe(customer => {
          this.customerAlreadySelected = true;
          this.selectedCustomer = customer;
          this.model.customer = customer;
          this.customers.push(customer);
          //console.log(this.customers);
        });
    } else { // muestro lista de clientes para seleccionar uno
      this.customersService.getCustomers()
        .subscribe(
          customers => this.customers = customers
        );
    }
  }
}
