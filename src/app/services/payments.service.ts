import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    const [year, month, day] = payment.date.split("-")
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const paymentToSend = {date:date, customerId:payment.customer.id, description:payment.description,
      amount:payment.amount, pending:payment.pending} 
    return this.http.post<Payment>(this.paymentsApiUrl, paymentToSend, this.httpOptions)
      .pipe(
         catchError(this.handleError<Payment>('addCustomer'))
      );
  } 
  
  /**
   * maneja la operacion Http que falla y permite a la app continuar
   * @param operation - nombre de la operacion que falla
   * @param result - valor opcional para retornar un resultado Observable
   */
  private handleError<T>(operation = 'opeation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      // la app continua corriendo retornando un resultado vacio
      return of(result as T);
    }
  }  
}
