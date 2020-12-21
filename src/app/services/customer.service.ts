import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Customer } from '../interfaces/customer';
import { CUSTOMERS } from '../mock-data/mock-customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    // return CUSTOMERS;
    return of(CUSTOMERS); // retorna Observable (para pruebas)
  }
}
