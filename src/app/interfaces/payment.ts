import { Customer } from "./customer";

export class Payment {
    id?: number;
    date: Date;
    customer?: Customer;
    description: string;
    pending: boolean;
    amount: number;

    constructor(date: Date, customer: Customer, description: string, pending: boolean, amount: number, id?: number) {
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.description = description;
        this.pending = pending;
        this.amount = amount;
    }    
}