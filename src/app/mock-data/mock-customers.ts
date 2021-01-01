import { Customer } from '../interfaces/customer';
// import customers_json from './customers.json'; // read json with customers data

// let CUSTOMERS = JSON.parse(localStorage.getItem("customers"));
// if (!CUSTOMERS)
//     CUSTOMERS = [];

export const CUSTOMERS: Customer[] = // customers_json;
[
    { id: 1, name: 'Pablo', phone: "099123123" },
    { id: 2, name: 'Mirna', phone: "099321321"},
    { id: 3, name: 'Alejandro', phone: "099456654" }
];

// export { CUSTOMERS };