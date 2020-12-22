import { Customer } from '../interfaces/customer';
import customers_json from './customers.json'; // read json with customers data

// let CUSTOMERS = JSON.parse(localStorage.getItem("customers"));
// if (!CUSTOMERS)
//     CUSTOMERS = [];

export const CUSTOMERS: Customer[] = customers_json;
// [
//     { id: 1, name: 'Pablo' },
//     { id: 2, name: 'Mirna' },
//     { id: 3, name: 'Alejandro' }
// ];

// export { CUSTOMERS };