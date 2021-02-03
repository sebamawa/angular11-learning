import { Customer } from "./customer";

export class Payment {
    id?: number;
    date: Date;
    customers: Customer;
    description: string;
    pending: boolean;
    amount: number;
}