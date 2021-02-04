import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Customer } from '../interfaces/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersApiUrl = 'http://localhost:3000/customers'; // URL to web api (loopback 4)
  // para el put en updateCustomer()
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getCustomers(): Observable<Customer[]> {
    // return CUSTOMERS;
    // return of(CUSTOMERS); // retorna Observable (para pruebas)

    // http.get retorna el body de un response (json por defecto)
    // el operador catchError() intercepta un Observable que falla,
    //y pasa el error a handleError()
    return this.http.get<Customer[]>(this.customersApiUrl)
      .pipe(
        tap(_ => console.log('getCustomers')), // (tap es callback)pasa los valores del Observable 
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  }

  getCustomer(id: number): Observable<Customer> {
    // return of(CUSTOMERS.find(customer => customer.id == id)); // retorna Observable para pruebas
    const url = `${this.customersApiUrl}/${id}`;
    return this.http.get<Customer>(url)
      .pipe(
        tap(_ => console.log(`getCustomer id=${id}`)),
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
      );
  }

  /** PUT: update the customer on the server */
  //The customers web API knows which hero to update by looking at the customer's id 
  // (url en loopback para el put: http://localhost:3000/customers/{ID})  
  updateCustomer(customer: Customer): Observable<any> {
    const url = `${this.customersApiUrl}/${customer.id}`;
    //return this.http.put(this.customersApiUrl, customer, this.httpOptions).pipe(
      return this.http.put(url, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateCustomer'))
    );
  }

  /** POST: add a new customer to the server */
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersApiUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<Customer>('addCustomer'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteCustomer(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersApiUrl}/${id}`;

    return this.http.delete<Customer>(url, this.httpOptions).pipe(
      tap(_ => console.log('customer deleted')),
      catchError(this.handleError<Customer>('deleteHero'))
    );
  }

  getPaymentsPerCustomer(clienteId: number): Observable<Payment[]> {
    const url = `${this.customersApiUrl}/${clienteId}/payments`;
    return this.http.get<Payment[]>(url)
      .pipe(
        tap(_ => console.log(`Payments of client: ${clienteId}`)),
        catchError(this.handleError<Payment[]>(`getPaymentsPerCustomer id=${clienteId}`))
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
