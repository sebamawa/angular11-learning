import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private paymentsApiUrl = 'http://localhost:3000/payments'; // URL to web api (loopback 4)
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  

  constructor(
    private http: HttpClient
  ) { }

  /** POST: add a new customer to the server */
  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentsApiUrl, payment, this.httpOptions)
      .pipe(
        // catchError(this.handleError<Customer>('addCustomer'))
      );
  }  
}
